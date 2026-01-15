// src/app/api/admin/checkout/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

function jsonErr(message: string, status = 400) {
    return NextResponse.json({ ok: false, error: message }, { status });
}

function jsonOk(data: unknown, status = 200) {
    return NextResponse.json({ ok: true, data }, { status });
}

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

/* ---------------------------------------------------------
 * ✅ Decimal-safe helpers (evita NaN quando vem Prisma.Decimal)
 * ---------------------------------------------------------*/
function toNumberDecimal(v: unknown): number {
    if (v == null) return NaN;
    if (typeof v === 'number') return v;

    if (typeof v === 'string') {
        const n = Number(v.replace(',', '.'));
        return Number.isFinite(n) ? n : NaN;
    }

    if (typeof v === 'object') {
        const anyObj = v as any;

        if (typeof anyObj.toNumber === 'function') {
            const n = anyObj.toNumber();
            return Number.isFinite(n) ? n : NaN;
        }

        if (typeof anyObj.toString === 'function') {
            const n = Number(String(anyObj.toString()).replace(',', '.'));
            return Number.isFinite(n) ? n : NaN;
        }
    }

    return NaN;
}

function money(n: unknown): number {
    const v = toNumberDecimal(n);
    if (!Number.isFinite(v)) return 0;
    return Math.round((v + Number.EPSILON) * 100) / 100;
}

function formatBRL(value: unknown) {
    const v = money(value);
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(v);
}

function formatDateTimeLabel(d: Date) {
    // dd/MM/yyyy às HH:mm (aprox, sem depender de date-fns)
    const date = d.toLocaleDateString('pt-BR');
    const time = d.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return `${date} às ${time}`;
}

function formatMonthLabel(dateInMonth: Date) {
    // "Janeiro de 2026"
    const monthName = dateInMonth.toLocaleDateString('pt-BR', {
        month: 'long',
    });
    const year = dateInMonth.getFullYear();
    // garante capitalização padrão pt-BR (alguns ambientes retornam minúsculo)
    const niceMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return `${niceMonth} de ${year}`;
}

function parseMonthQuery(monthRaw: string | null): {
    monthQuery: string;
    monthStart: Date;
    monthEnd: Date;
    monthLabel: string;
} {
    // aceita "yyyy-MM"; fallback: mês atual
    const now = new Date();

    const safe = normalizeString(monthRaw);
    const m = /^(\d{4})-(\d{2})$/.exec(safe);

    let year = now.getFullYear();
    let monthIndex = now.getMonth(); // 0-based

    if (m) {
        year = Number(m[1]);
        monthIndex = Number(m[2]) - 1;
        if (!Number.isFinite(year) || !Number.isFinite(monthIndex)) {
            year = now.getFullYear();
            monthIndex = now.getMonth();
        }
    }

    const monthStart = new Date(year, monthIndex, 1, 0, 0, 0, 0);
    const monthEnd = new Date(year, monthIndex + 1, 1, 0, 0, 0, 0);

    const monthQuery = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
    const monthLabel = formatMonthLabel(monthStart);

    return { monthQuery, monthStart, monthEnd, monthLabel };
}

type CheckoutOpenAccountUI = {
    clientId: string;
    clientLabel: string;
    latestLabel: string;
    totalLabel: string;
    totalServicesLabel: string;
    totalProductsLabel: string;
    hasProducts: boolean;
    serviceOrders: Array<{
        id: string;
        createdAtLabel: string;
        appointmentAtLabel?: string | null;
        professionalName: string;
        itemsLabel: string;
        totalLabel: string;
        status: 'PENDING' | 'PENDING_CHECKIN' | 'COMPLETED' | 'CANCELED';
    }>;
    productOrders: Array<{
        id: string;
        createdAtLabel: string;
        itemsLabel: string;
        totalLabel: string;
        status: 'PENDING' | 'PENDING_CHECKIN' | 'COMPLETED' | 'CANCELED';
    }>;
};

type CheckoutMonthOrderItemUI = {
    id: string;
    name: string;
    qty: number;
    unitLabel: string;
    totalLabel: string;
    kind: 'service' | 'product';
};

type CheckoutMonthOrderUI = {
    id: string;
    createdAtLabel: string;
    appointmentAtLabel?: string | null;
    professionalName: string;
    status: 'COMPLETED';
    totalLabel: string;
    servicesSubtotalLabel: string;
    productsSubtotalLabel: string;
    items: CheckoutMonthOrderItemUI[];
};

type CheckoutMonthGroupUI = {
    clientKey: string;
    clientLabel: string;
    latestLabel: string;
    totalLabel: string;
    servicesLabel: string;
    productsLabel: string;
    orders: CheckoutMonthOrderUI[];
};

export async function GET(request: Request) {
    try {
        const session = await requireAdminForModule('CHECKOUT');

        const companyId = session.companyId;
        if (!companyId)
            return jsonErr('Empresa não encontrada na sessão.', 401);

        const userId = session.id; // AdminSession usa `id`
        if (!userId) return jsonErr('Usuário não encontrado na sessão.', 401);

        const canSeeAllUnits = session.canSeeAllUnits;

        const url = new URL(request.url);

        const unitParamRaw = url.searchParams.get('unit'); // "all" | unitId | null
        const unitParam = normalizeString(unitParamRaw);

        const monthParamRaw = url.searchParams.get('month'); // yyyy-MM
        const { monthQuery, monthStart, monthEnd, monthLabel } =
            parseMonthQuery(monthParamRaw);

        // ==========================
        // 1) Resolve escopo de unidade
        // ==========================
        let allowedUnitIds: string[] | null = null;

        if (canSeeAllUnits) {
            if (!unitParam || unitParam === 'all') {
                allowedUnitIds = null; // todas
            } else {
                const unit = await prisma.unit.findFirst({
                    where: { id: unitParam, companyId, isActive: true },
                    select: { id: true },
                });
                if (!unit) return jsonErr('Unidade inválida ou inativa.', 404);
                allowedUnitIds = [unit.id];
            }
        } else {
            const accesses = await prisma.adminUnitAccess.findMany({
                where: { companyId, userId },
                select: { unitId: true },
            });
            const ids = accesses.map((a) => a.unitId);

            if (ids.length === 0) {
                return jsonErr('Sem acesso a unidades.', 403);
            }

            if (unitParam && unitParam !== 'all') {
                if (!ids.includes(unitParam)) {
                    return jsonErr('Sem acesso a esta unidade.', 403);
                }
                allowedUnitIds = [unitParam];
            } else {
                allowedUnitIds = ids;
            }
        }

        const unitWhere =
            allowedUnitIds && allowedUnitIds.length > 0
                ? { unitId: { in: allowedUnitIds } }
                : {}; // todas

        // ==========================
        // 2) Busca OPEN ACCOUNTS (PENDING / PENDING_CHECKIN)
        // ==========================
        const openOrders = await prisma.order.findMany({
            where: {
                companyId,
                ...unitWhere,
                status: { in: ['PENDING', 'PENDING_CHECKIN'] },
            },
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                totalAmount: true,

                clientId: true,
                client: { select: { id: true, name: true } },

                professional: { select: { id: true, name: true } },

                appointment: {
                    select: {
                        scheduleAt: true,
                    },
                },

                items: {
                    select: {
                        id: true,
                        quantity: true,
                        unitPrice: true,
                        totalPrice: true,
                        serviceId: true,
                        productId: true,
                        service: { select: { id: true, name: true } },
                        product: { select: { id: true, name: true } },
                    },
                },
            },
        });

        const openByClient = new Map<string, CheckoutOpenAccountUI>();

        for (const o of openOrders) {
            const clientKey = o.clientId ?? `unknown:${o.id}`;
            const clientLabel =
                normalizeString(o.client?.name) || 'Cliente não identificado';

            const latestDate = o.updatedAt ?? o.createdAt;
            const latestLabel = formatDateTimeLabel(latestDate);

            const serviceItems = (o.items ?? []).filter((it) => !!it.serviceId);
            const productItems = (o.items ?? []).filter((it) => !!it.productId);

            const servicesTotal = money(
                serviceItems.reduce((s, it) => s + money(it.totalPrice), 0)
            );
            const productsTotal = money(
                productItems.reduce((s, it) => s + money(it.totalPrice), 0)
            );

            const hasProducts = productItems.length > 0;

            const itemsLabelParts: string[] = [];
            for (const it of o.items ?? []) {
                const qty = it.quantity ?? 1;
                const name =
                    it.service?.name ||
                    it.product?.name ||
                    (it.serviceId
                        ? 'Serviço'
                        : it.productId
                          ? 'Produto'
                          : 'Item');
                itemsLabelParts.push(`${qty}x ${name}`);
            }
            const itemsLabel = itemsLabelParts.join(', ') || '—';

            const rowBase = {
                id: o.id,
                createdAtLabel: formatDateTimeLabel(o.createdAt),
                totalLabel: formatBRL(o.totalAmount),
                status: o.status as any,
            };

            const appointmentAtLabel = o.appointment?.scheduleAt
                ? formatDateTimeLabel(o.appointment.scheduleAt)
                : null;

            const professionalName =
                normalizeString(o.professional?.name) || '—';

            const hasService = serviceItems.length > 0;
            const hasProduct = productItems.length > 0;

            const existing = openByClient.get(clientKey);

            if (!existing) {
                openByClient.set(clientKey, {
                    clientId: o.clientId ?? clientKey,
                    clientLabel,
                    latestLabel,
                    totalLabel: formatBRL(o.totalAmount),
                    totalServicesLabel: formatBRL(servicesTotal),
                    totalProductsLabel: formatBRL(productsTotal),
                    hasProducts,
                    serviceOrders: [],
                    productOrders: [],
                });
            }

            const bucket = openByClient.get(clientKey)!;

            // soma totais agregados
            const prevTotal = money(
                Number(
                    String(bucket.totalLabel)
                        .replace(/[^\d,.-]/g, '')
                        .replace('.', '')
                        .replace(',', '.')
                )
            );
            const nextTotal = money(prevTotal + money(o.totalAmount));

            const prevServices = money(
                Number(
                    String(bucket.totalServicesLabel)
                        .replace(/[^\d,.-]/g, '')
                        .replace('.', '')
                        .replace(',', '.')
                )
            );
            const nextServices = money(prevServices + servicesTotal);

            const prevProducts = money(
                Number(
                    String(bucket.totalProductsLabel)
                        .replace(/[^\d,.-]/g, '')
                        .replace('.', '')
                        .replace(',', '.')
                )
            );
            const nextProducts = money(prevProducts + productsTotal);

            bucket.totalLabel = formatBRL(nextTotal);
            bucket.totalServicesLabel = formatBRL(nextServices);
            bucket.totalProductsLabel = formatBRL(nextProducts);
            bucket.hasProducts = bucket.hasProducts || hasProduct;

            // como openOrders vem ordenado por updatedAt desc, o primeiro é o mais recente
            if (!existing) {
                bucket.latestLabel = latestLabel;
            }

            if (hasService) {
                bucket.serviceOrders.push({
                    ...rowBase,
                    appointmentAtLabel,
                    professionalName,
                    itemsLabel,
                });
            }

            if (hasProduct && !hasService) {
                bucket.productOrders.push({
                    ...rowBase,
                    itemsLabel,
                });
            }

            if (hasProduct && hasService) {
                bucket.productOrders.push({
                    ...rowBase,
                    itemsLabel,
                });
            }
        }

        const openAccounts = Array.from(openByClient.values());

        // ==========================
        // 3) Busca pedidos do mês (COMPLETED)
        // ==========================
        // ✅ IMPORTANTE:
        // O mês do "Pedidos do mês" deve refletir quando o checkout foi concluído (pago).
        // Como ainda não temos paidAt/completedAt no Order, usamos updatedAt (que muda no PATCH /complete).
        const completedOrders = await prisma.order.findMany({
            where: {
                companyId,
                ...unitWhere,
                status: 'COMPLETED',
                updatedAt: {
                    gte: monthStart,
                    lt: monthEnd,
                },
            },
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                totalAmount: true,

                clientId: true,
                client: { select: { id: true, name: true } },

                professional: { select: { id: true, name: true } },

                appointment: {
                    select: {
                        scheduleAt: true,
                    },
                },

                items: {
                    select: {
                        id: true,
                        quantity: true,
                        unitPrice: true,
                        totalPrice: true,
                        serviceId: true,
                        productId: true,
                        service: { select: { id: true, name: true } },
                        product: { select: { id: true, name: true } },
                    },
                },
            },
        });

        const monthByClient = new Map<string, CheckoutMonthGroupUI>();

        for (const o of completedOrders) {
            const clientKey = o.clientId ?? `unknown:${o.id}`;
            const clientLabel =
                normalizeString(o.client?.name) || 'Cliente não identificado';

            const serviceItems = (o.items ?? []).filter((it) => !!it.serviceId);
            const productItems = (o.items ?? []).filter((it) => !!it.productId);

            const servicesSubtotal = money(
                serviceItems.reduce((s, it) => s + money(it.totalPrice), 0)
            );
            const productsSubtotal = money(
                productItems.reduce((s, it) => s + money(it.totalPrice), 0)
            );

            const items: CheckoutMonthOrderItemUI[] = (o.items ?? []).map(
                (it) => {
                    const qty = it.quantity ?? 1;
                    const name =
                        it.service?.name ||
                        it.product?.name ||
                        (it.serviceId
                            ? 'Serviço'
                            : it.productId
                              ? 'Produto'
                              : 'Item');

                    const kind: 'service' | 'product' = it.serviceId
                        ? 'service'
                        : 'product';

                    return {
                        id: it.id,
                        name,
                        qty,
                        unitLabel: formatBRL(it.unitPrice),
                        totalLabel: formatBRL(it.totalPrice),
                        kind,
                    };
                }
            );

            const orderUI: CheckoutMonthOrderUI = {
                id: o.id,
                // Mantemos o "Criado em" como createdAt (a UI mostra "Criado em ...")
                createdAtLabel: formatDateTimeLabel(o.createdAt),
                appointmentAtLabel: o.appointment?.scheduleAt
                    ? formatDateTimeLabel(o.appointment.scheduleAt)
                    : null,
                professionalName: normalizeString(o.professional?.name) || '—',
                status: 'COMPLETED',
                totalLabel: formatBRL(o.totalAmount),
                servicesSubtotalLabel: formatBRL(servicesSubtotal),
                productsSubtotalLabel: formatBRL(productsSubtotal),
                items,
            };

            const existing = monthByClient.get(clientKey);

            if (!existing) {
                monthByClient.set(clientKey, {
                    clientKey,
                    clientLabel,
                    // ✅ "Última movimentação" do mês deve refletir quando pagou (updatedAt)
                    latestLabel: formatDateTimeLabel(o.updatedAt),
                    totalLabel: formatBRL(o.totalAmount),
                    servicesLabel: formatBRL(servicesSubtotal),
                    productsLabel: formatBRL(productsSubtotal),
                    orders: [orderUI],
                });
                continue;
            }

            const prevTotal = money(
                Number(
                    String(existing.totalLabel)
                        .replace(/[^\d,.-]/g, '')
                        .replace('.', '')
                        .replace(',', '.')
                )
            );
            const prevServices = money(
                Number(
                    String(existing.servicesLabel)
                        .replace(/[^\d,.-]/g, '')
                        .replace('.', '')
                        .replace(',', '.')
                )
            );
            const prevProducts = money(
                Number(
                    String(existing.productsLabel)
                        .replace(/[^\d,.-]/g, '')
                        .replace('.', '')
                        .replace(',', '.')
                )
            );

            existing.totalLabel = formatBRL(prevTotal + money(o.totalAmount));
            existing.servicesLabel = formatBRL(prevServices + servicesSubtotal);
            existing.productsLabel = formatBRL(prevProducts + productsSubtotal);

            // como a query está ordenada por updatedAt desc, o primeiro pedido do cliente é o mais recente (pagamento)
            // então mantemos o latestLabel já setado no primeiro insert.
            existing.orders.push(orderUI);
        }

        const monthGroups = Array.from(monthByClient.values());

        return jsonOk({
            monthQuery,
            monthLabel,
            unitScope: allowedUnitIds ? 'filtered' : 'all',
            openAccounts,
            openAccountsCount: openAccounts.length,
            monthGroups,
            monthOrdersCount: completedOrders.length,
        });
    } catch (err: any) {
        return jsonErr(err?.message ?? 'Erro interno.', 500);
    }
}
