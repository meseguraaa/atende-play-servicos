// src/app/admin/finance/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';
import AdminFinanceClient, {
    type AdminFinanceSummaryUI,
    type ProfessionalMonthlyEarningsUI,
    type ExpenseRowUI,
} from './admin-finance-client';

import {
    addMonths,
    endOfMonth,
    format,
    isValid,
    parse,
    startOfMonth,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Financeiro',
};

type AdminFinancePageProps = {
    searchParams: Promise<{
        month?: string; // yyyy-MM
        unit?: string; // unitId (mantemos compat com "all", mas redireciona)
    }>;
};

function parseMonthParam(month?: string): Date {
    if (!month) return startOfMonth(new Date());
    const parsed = parse(month, 'yyyy-MM', new Date());
    if (!isValid(parsed)) return startOfMonth(new Date());
    return startOfMonth(parsed);
}

function capitalizeFirst(v: string) {
    if (!v) return v;
    return v.charAt(0).toUpperCase() + v.slice(1);
}

function buildFinanceRedirect(params: { month?: string; unit?: string }) {
    const sp = new URLSearchParams();

    if (params.month) sp.set('month', params.month);
    if (params.unit) sp.set('unit', params.unit);

    const qs = sp.toString();
    return qs ? `/admin/finance?${qs}` : '/admin/finance';
}

function clampDayToMonth(day: number, monthDate: Date): number {
    const last = endOfMonth(monthDate).getDate();
    if (day <= 1) return 1;
    if (day >= last) return last;
    return day;
}

/**
 * ✅ Auto-criação de despesas recorrentes ao entrar no mês:
 * - Busca recorrentes do mês anterior (mesma unidade)
 * - Cria no mês atual o que estiver faltando
 */
async function ensureRecurringExpensesForMonth(args: {
    companyId: string;
    unitId: string;
    monthDate: Date; // startOfMonth
}) {
    const { companyId, unitId, monthDate } = args;

    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    const prevMonth = startOfMonth(addMonths(monthDate, -1));
    const prevStart = startOfMonth(prevMonth);
    const prevEnd = endOfMonth(prevMonth);

    // 1) Recorrentes do mês anterior (fonte)
    const prevRecurring = await prisma.expense.findMany({
        where: {
            companyId,
            unitId,
            isRecurring: true,
            dueDate: { gte: prevStart, lte: prevEnd },
        },
        select: {
            id: true,
            description: true,
            category: true,
            amount: true,
            dueDate: true,
        },
        orderBy: [{ dueDate: 'asc' }, { createdAt: 'asc' }],
    });

    if (prevRecurring.length === 0) return;

    // 2) Recorrentes já existentes no mês atual (para dedupe)
    const currentRecurring = await prisma.expense.findMany({
        where: {
            companyId,
            unitId,
            isRecurring: true,
            dueDate: { gte: monthStart, lte: monthEnd },
        },
        select: {
            description: true,
            category: true,
            amount: true,
            dueDate: true,
        },
    });

    const existingKey = new Set(
        currentRecurring.map((e) => {
            const day = e.dueDate.getDate();
            return [
                companyId,
                unitId,
                'REC',
                e.category,
                e.description.trim().toLowerCase(),
                Number(e.amount).toFixed(2),
                String(day),
            ].join('|');
        })
    );

    const toCreate = prevRecurring
        .map((src) => {
            const day = src.dueDate.getDate();
            const clampedDay = clampDayToMonth(day, monthDate);
            const dueDate = new Date(
                monthDate.getFullYear(),
                monthDate.getMonth(),
                clampedDay
            );

            const key = [
                companyId,
                unitId,
                'REC',
                src.category,
                src.description.trim().toLowerCase(),
                Number(src.amount).toFixed(2),
                String(clampedDay),
            ].join('|');

            return {
                key,
                data: {
                    companyId,
                    unitId,
                    description: src.description,
                    category: src.category,
                    amount: Number(src.amount).toFixed(2), // Decimal string ok
                    dueDate,
                    isRecurring: true,
                    isPaid: false, // novo mês começa em aberto
                },
            };
        })
        .filter((x) => !existingKey.has(x.key));

    if (toCreate.length === 0) return;

    await prisma.expense.createMany({
        data: toCreate.map((x) => x.data),
        skipDuplicates: false,
    });
}

/* -------------------------------------------------------
 * Helpers: cálculo de ganhos e faturamento do mês
 * ------------------------------------------------------*/

function safeNumber(v: unknown): number {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}

function computeServiceProfessionalEarning(args: {
    professionalEarningValue: unknown;
    servicePriceAtTheTime: unknown;
    professionalPercentageAtTheTime: unknown;
}): number {
    const direct = safeNumber(args.professionalEarningValue);
    if (direct > 0) return direct;

    const price = safeNumber(args.servicePriceAtTheTime);
    const pct = safeNumber(args.professionalPercentageAtTheTime);

    if (price > 0 && pct > 0) return (price * pct) / 100;

    return 0;
}

export default async function AdminFinancePage({
    searchParams,
}: AdminFinancePageProps) {
    const session = await requireAdminForModule('FINANCE');

    // 🔒 Hard lock multi-tenant
    const companyId = session.companyId;
    if (!companyId) {
        redirect('/admin');
    }

    // ✅ FIX: AdminSession usa `id` (não `userId`)
    const userId = session.id;
    if (!userId) {
        redirect('/admin');
    }

    const canSeeAllUnits = !!(session as any)?.canSeeAllUnits;

    const { month: monthParam, unit: unitParam } = await searchParams;

    const referenceDate = parseMonthParam(monthParam);
    const monthStart = startOfMonth(referenceDate);
    const monthEnd = endOfMonth(referenceDate);

    const monthQuery = format(referenceDate, 'yyyy-MM');
    const monthLabel = capitalizeFirst(
        format(referenceDate, "MMMM 'de' yyyy", { locale: ptBR })
    );

    const units = canSeeAllUnits
        ? await prisma.unit.findMany({
              where: { companyId, isActive: true },
              select: { id: true, name: true },
              orderBy: { name: 'asc' },
          })
        : await (async () => {
              const access = await prisma.adminUnitAccess.findMany({
                  where: { companyId, userId },
                  select: { unitId: true },
              });

              const unitIds = access.map((a) => a.unitId).filter(Boolean);

              if (!unitIds.length) return [];

              return prisma.unit.findMany({
                  where: {
                      companyId,
                      isActive: true,
                      id: { in: unitIds },
                  },
                  select: { id: true, name: true },
                  orderBy: { name: 'asc' },
              });
          })();

    const defaultUnitId = units.length > 0 ? units[0].id : null;

    // ✅ Se não tiver nenhuma unidade acessível, mantém a página mas tudo desabilitado
    if (!defaultUnitId) {
        const summary: AdminFinanceSummaryUI = {
            netRevenueMonth: 'R$ 0,00',
            servicesNetMonth: 'R$ 0,00',
            productsNetMonth: 'R$ 0,00',
            totalExpenses: 'R$ 0,00',
            netIncome: 'R$ 0,00',
            netIncomeIsPositive: true,
        };

        return (
            <AdminFinanceClient
                scopeLabel={'Nenhuma unidade disponível'}
                monthLabel={monthLabel}
                monthQuery={monthQuery}
                summary={summary}
                professionalEarnings={[]}
                expenses={[]}
                newExpenseDisabled={true}
            />
        );
    }

    // ✅ Regra: sempre ter um unit real na URL (compat: se vier unit=all, cai na default)
    if (!unitParam || unitParam === 'all') {
        redirect(
            buildFinanceRedirect({ month: monthQuery, unit: defaultUnitId })
        );
    }

    // ✅ Unidade ativa (filtro)
    const activeUnitId: string = unitParam;

    // valida na lista acessível (units) + valida no banco (multi-tenant)
    const inAllowedList = units.some((u) => u.id === activeUnitId);

    if (!inAllowedList) {
        redirect(
            buildFinanceRedirect({ month: monthQuery, unit: defaultUnitId })
        );
    }

    const ok = await prisma.unit.findFirst({
        where: { id: activeUnitId, companyId, isActive: true },
        select: { id: true },
    });

    if (!ok) {
        redirect(
            buildFinanceRedirect({ month: monthQuery, unit: defaultUnitId })
        );
    }

    // ✅ AUTO: ao entrar no mês, cria recorrentes faltantes
    await ensureRecurringExpensesForMonth({
        companyId,
        unitId: activeUnitId,
        monthDate: monthStart,
    });

    const scopeLabel = (() => {
        const found = units.find((u) => u.id === activeUnitId);
        return found?.name ?? 'unidade selecionada';
    })();

    const newExpenseDisabled = !activeUnitId;

    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    /* -------------------------------------------------------
     * DESPESAS
     * ------------------------------------------------------*/
    const expensesDb = await prisma.expense.findMany({
        where: {
            companyId,
            unitId: activeUnitId,
            dueDate: { gte: monthStart, lte: monthEnd },
        } as any,
        orderBy: [{ dueDate: 'asc' }, { createdAt: 'asc' }],
        select: {
            id: true,
            description: true,
            dueDate: true,
            amount: true,
            isRecurring: true,
            isPaid: true,
        },
    });

    const expenses: ExpenseRowUI[] = expensesDb.map((e) => ({
        id: e.id,
        description: e.description,
        dueDate: format(e.dueDate, 'dd/MM/yyyy', { locale: ptBR }),
        amount: currencyFormatter.format(Number(e.amount)),
        isRecurring: !!e.isRecurring,
        statusLabel: e.isPaid ? 'Pago' : 'Em aberto',
        statusTone: e.isPaid ? 'success' : 'warning',
    }));

    const totalExpensesNumber = expensesDb.reduce(
        (sum, e) => sum + Number(e.amount),
        0
    );

    /* -------------------------------------------------------
     * FATURAMENTO (pagos no mês)
     * Serviços: Appointment.checkedOutAt dentro do mês
     * Produtos: Order COMPLETED atualizado dentro do mês (proxy de "pago")
     * ------------------------------------------------------*/

    // 1) Profissionais ativos da unidade (para o bloco de cards)
    const professionalUnits = await prisma.professionalUnit.findMany({
        where: {
            companyId,
            unitId: activeUnitId,
            isActive: true,
            professional: { isActive: true },
        },
        select: {
            professional: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'asc' },
    });

    const professionalsBase = professionalUnits
        .map((x) => x.professional)
        .filter(Boolean);

    const professionalsById = new Map<string, { id: string; name: string }>();
    for (const p of professionalsBase) {
        if (!p?.id) continue;
        professionalsById.set(p.id, { id: p.id, name: p.name });
    }

    // 2) Serviços pagos no mês (Checkout)
    const paidAppointments = await prisma.appointment.findMany({
        where: {
            companyId,
            unitId: activeUnitId,
            checkedOutAt: { gte: monthStart, lte: monthEnd },
            // evita cancelados
            status: { not: 'CANCELED' },
        },
        select: {
            professionalId: true,
            servicePriceAtTheTime: true,
            professionalPercentageAtTheTime: true,
            professionalEarningValue: true,
        },
    });

    const servicesNetMonthNumber = paidAppointments.reduce((sum, a) => {
        return sum + safeNumber(a.servicePriceAtTheTime);
    }, 0);

    // Ganho por profissional (serviços)
    const servicesEarningsByProfessional = new Map<string, number>();
    for (const a of paidAppointments) {
        const pid = String(a.professionalId ?? '').trim();
        if (!pid) continue;

        const earn = computeServiceProfessionalEarning({
            professionalEarningValue: a.professionalEarningValue,
            servicePriceAtTheTime: a.servicePriceAtTheTime,
            professionalPercentageAtTheTime: a.professionalPercentageAtTheTime,
        });

        servicesEarningsByProfessional.set(
            pid,
            (servicesEarningsByProfessional.get(pid) ?? 0) + earn
        );
    }

    // 3) Produtos pagos no mês
    //    Regra: pedidos COMPLETED cujo updatedAt está dentro do mês
    //    (não temos completedAt no schema, então updatedAt é o proxy mais pragmático)
    const completedOrders = await prisma.order.findMany({
        where: {
            companyId,
            unitId: activeUnitId,
            status: 'COMPLETED',
            updatedAt: { gte: monthStart, lte: monthEnd },
        },
        select: { id: true },
    });

    const orderIds = completedOrders.map((o) => o.id);

    let productsNetMonthNumber = 0;
    const productsEarningsByProfessional = new Map<string, number>();

    if (orderIds.length > 0) {
        const productItems = await prisma.orderItem.findMany({
            where: {
                companyId,
                orderId: { in: orderIds },
                productId: { not: null },
            },
            select: {
                professionalId: true,
                totalPrice: true,
                product: { select: { professionalPercentage: true } },
            },
        });

        // Net de produtos (valor total de itens de produto)
        productsNetMonthNumber = productItems.reduce((sum, it) => {
            return sum + safeNumber(it.totalPrice);
        }, 0);

        // Comissão por profissional: totalPrice * product.professionalPercentage/100
        for (const it of productItems) {
            const pid = String(it.professionalId ?? '').trim();
            if (!pid) continue;

            const total = safeNumber(it.totalPrice);
            const pct = safeNumber(it.product?.professionalPercentage);

            const commission = total > 0 && pct > 0 ? (total * pct) / 100 : 0;

            productsEarningsByProfessional.set(
                pid,
                (productsEarningsByProfessional.get(pid) ?? 0) + commission
            );
        }
    }

    // 4) Monta lista UI (inclui profissionais da unidade, mesmo com 0)
    const allProfessionalIds = new Set<string>([
        ...Array.from(professionalsById.keys()),
        ...Array.from(servicesEarningsByProfessional.keys()),
        ...Array.from(productsEarningsByProfessional.keys()),
    ]);

    const professionalEarnings: ProfessionalMonthlyEarningsUI[] = Array.from(
        allProfessionalIds
    )
        .map((pid) => {
            const base = professionalsById.get(pid);

            const services = servicesEarningsByProfessional.get(pid) ?? 0;
            const products = productsEarningsByProfessional.get(pid) ?? 0;
            const total = services + products;

            return {
                professionalId: pid,
                name: base?.name ?? 'Profissional',
                servicesEarnings: currencyFormatter.format(services),
                productsEarnings: currencyFormatter.format(products),
                total: currencyFormatter.format(total),
            };
        })
        // ordem: maior total primeiro
        .sort((a, b) => {
            const na = safeNumber(
                a.total
                    .replace(/[^\d,.-]/g, '')
                    .replace('.', '')
                    .replace(',', '.')
            );
            const nb = safeNumber(
                b.total
                    .replace(/[^\d,.-]/g, '')
                    .replace('.', '')
                    .replace(',', '.')
            );
            return nb - na;
        });

    const netRevenueMonthNumber =
        servicesNetMonthNumber + productsNetMonthNumber;

    const netIncomeNumber = netRevenueMonthNumber - totalExpensesNumber;

    const summary: AdminFinanceSummaryUI = {
        netRevenueMonth: currencyFormatter.format(netRevenueMonthNumber),
        servicesNetMonth: currencyFormatter.format(servicesNetMonthNumber),
        productsNetMonth: currencyFormatter.format(productsNetMonthNumber),
        totalExpenses: currencyFormatter.format(totalExpensesNumber),
        netIncome: currencyFormatter.format(netIncomeNumber),
        netIncomeIsPositive: netIncomeNumber >= 0,
    };

    return (
        <AdminFinanceClient
            scopeLabel={scopeLabel}
            monthLabel={monthLabel}
            monthQuery={monthQuery}
            summary={summary}
            professionalEarnings={professionalEarnings}
            expenses={expenses}
            newExpenseDisabled={newExpenseDisabled}
        />
    );
}
