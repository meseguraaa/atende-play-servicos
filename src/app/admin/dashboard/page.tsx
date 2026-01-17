// app/admin/dashboard/page.tsx
import type { Metadata } from 'next';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

import {
    endOfDay,
    endOfMonth,
    format,
    startOfDay,
    startOfMonth,
    subMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { DatePicker } from '@/components/date-picker';
import { DashboardDailySummary } from '@/components/admin/dashboard/dashboard-daily-summary';
import { DashboardMonthlySummary } from '@/components/admin/dashboard/dashboard-monthly-summary';
import { DashboardRevenueChart } from '@/components/admin/dashboard/dashboard-charts/dashboard-revenue-chart';
import { DashboardRatingsDistributionChart } from '@/components/admin/dashboard/dashboard-charts/dashboard-ratings-distribution-chart';
import { DashboardProductsVsServicesChart } from '@/components/admin/dashboard/dashboard-charts/dashboard-products-vs-services-chart/dashboard-products-vs-services-chart';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Dashboard',
};

/**
 * ✅ Next (versões recentes) pode tipar `searchParams` como Promise nos tipos gerados.
 * Para evitar conflito com `.next/dev/types/...`, tratamos como Promise<any>.
 */
type PageProps = {
    searchParams?: Promise<any>;
};

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

/* ---------------------------------------------------------
 * ✅ Decimal-safe helpers (evita NaN com Prisma.Decimal)
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
        if (typeof anyObj?.toNumber === 'function') {
            const n = anyObj.toNumber();
            return Number.isFinite(n) ? n : NaN;
        }
        if (typeof anyObj?.toString === 'function') {
            const n = Number(String(anyObj.toString()).replace(',', '.'));
            return Number.isFinite(n) ? n : NaN;
        }
    }

    const n = Number(v as any);
    return Number.isFinite(n) ? n : NaN;
}

function parseDateParam(dateParam?: string): Date {
    const raw = normalizeString(dateParam);
    if (!raw) return new Date();

    // esperado yyyy-MM-dd
    const [y, m, d] = raw.split('-').map(Number);
    if (!y || !m || !d) return new Date();

    return new Date(y, m - 1, d);
}

function parseMonthParam(monthParam?: string): Date {
    const raw = normalizeString(monthParam);
    if (!raw) return startOfMonth(new Date());

    // esperado yyyy-MM
    const [y, m] = raw.split('-').map(Number);
    if (!y || !m) return startOfMonth(new Date());

    return startOfMonth(new Date(y, m - 1, 1));
}

function clampToPct(v: number) {
    if (!Number.isFinite(v)) return 0;
    if (v < 0) return 0;
    if (v > 100) return 100;
    return v;
}

function safeAdd(a: number, b: number) {
    const aa = Number.isFinite(a) ? a : 0;
    const bb = Number.isFinite(b) ? b : 0;
    return aa + bb;
}

function dateKeyLocal(d: Date) {
    return format(d, 'yyyy-MM-dd');
}

export default async function AdminDashboardPage({ searchParams }: PageProps) {
    // ✅ Unwrap do Next (searchParams pode vir como Promise)
    const sp = (await searchParams) as
        | {
              date?: string; // yyyy-MM-dd (filtro do DIA)
              month?: string; // yyyy-MM (filtro do MÊS)
          }
        | undefined;

    // ✅ Guard central (redirect interno)
    const adminCtx = (await requireAdminForModule('DASHBOARD')) as any;

    // ✅ Contexto (best-effort, sem quebrar se seu helper tiver outro shape)
    const companyId: string | undefined =
        adminCtx?.companyId ??
        adminCtx?.company?.id ??
        adminCtx?.session?.companyId ??
        adminCtx?.data?.companyId;

    const unitId: string | undefined =
        adminCtx?.unitId ??
        adminCtx?.unit?.id ??
        adminCtx?.session?.unitId ??
        adminCtx?.data?.unitId;

    if (!companyId) {
        // Se isso acontecer, seu requireAdminForModule não está devolvendo contexto.
        // Prefiro falhar explicitamente do que mostrar número “mágico”.
        throw new Error(
            'AdminDashboardPage: companyId não encontrado no contexto do admin.'
        );
    }

    const dayBase = parseDateParam(sp?.date);
    const monthBase = parseMonthParam(sp?.month);

    const dayStart = startOfDay(dayBase);
    const dayEnd = endOfDay(dayBase);

    const monthStart = startOfMonth(monthBase);
    const monthEnd = endOfMonth(monthBase);

    const prevMonthStart = startOfMonth(subMonths(monthBase, 1));
    const prevMonthEnd = endOfMonth(subMonths(monthBase, 1));

    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    const orderScope = {
        companyId,
        ...(unitId ? { unitId } : {}),
    } as const;

    // ---------------------------------------------------------
    // ✅ ORDERS COMPLETED (DIA) + ITENS (para split e comissões)
    // ---------------------------------------------------------
    const completedOrdersDay = await prisma.order.findMany({
        where: {
            ...orderScope,
            status: 'COMPLETED',
            updatedAt: { gte: dayStart, lte: dayEnd },
        },
        select: {
            id: true,
            totalAmount: true,
            appointment: {
                select: {
                    professionalPercentageAtTheTime: true,
                },
            },
            items: {
                select: {
                    quantity: true,
                    totalPrice: true,
                    serviceId: true,
                    productId: true,
                    service: {
                        select: {
                            professionalPercentage: true,
                        },
                    },
                    product: {
                        select: {
                            professionalPercentage: true,
                        },
                    },
                },
            },
        },
    });

    // ---------------------------------------------------------
    // ✅ ORDERS COMPLETED (MÊS ATUAL) + ITENS
    // ---------------------------------------------------------
    const completedOrdersMonth = await prisma.order.findMany({
        where: {
            ...orderScope,
            status: 'COMPLETED',
            updatedAt: { gte: monthStart, lte: monthEnd },
        },
        select: {
            id: true,
            totalAmount: true,
            updatedAt: true,
            appointment: {
                select: {
                    professionalPercentageAtTheTime: true,
                },
            },
            items: {
                select: {
                    quantity: true,
                    totalPrice: true,
                    serviceId: true,
                    productId: true,
                    service: {
                        select: {
                            professionalPercentage: true,
                        },
                    },
                    product: {
                        select: {
                            professionalPercentage: true,
                        },
                    },
                },
            },
        },
    });

    // ---------------------------------------------------------
    // ✅ ORDERS COMPLETED (MÊS ANTERIOR) para comparativo do gráfico
    // ---------------------------------------------------------
    const completedOrdersPrevMonth = await prisma.order.findMany({
        where: {
            ...orderScope,
            status: 'COMPLETED',
            updatedAt: { gte: prevMonthStart, lte: prevMonthEnd },
        },
        select: {
            id: true,
            totalAmount: true,
            updatedAt: true,
            items: {
                select: {
                    totalPrice: true,
                    serviceId: true,
                    productId: true,
                },
            },
        },
    });

    // ---------------------------------------------------------
    // ✅ CANCEL FEES (DIA/MÊS)
    // ---------------------------------------------------------
    const canceledAppointmentsDay = await prisma.appointment.findMany({
        where: {
            ...orderScope,
            status: 'CANCELED',
            cancelledAt: { gte: dayStart, lte: dayEnd },
        },
        select: {
            id: true,
            cancelFeeApplied: true,
            cancelFeeValue: true,
        },
    });

    const canceledAppointmentsMonth = await prisma.appointment.findMany({
        where: {
            ...orderScope,
            status: 'CANCELED',
            cancelledAt: { gte: monthStart, lte: monthEnd },
        },
        select: {
            id: true,
            cancelFeeApplied: true,
            cancelFeeValue: true,
        },
    });

    // ---------------------------------------------------------
    // ✅ APPOINTMENTS DONE (DIA/MÊS)
    // ---------------------------------------------------------
    const [appointmentsDoneDayCount, appointmentsDoneMonthCount] =
        await Promise.all([
            prisma.appointment.count({
                where: {
                    ...orderScope,
                    status: 'DONE',
                    doneAt: { gte: dayStart, lte: dayEnd },
                },
            }),
            prisma.appointment.count({
                where: {
                    ...orderScope,
                    status: 'DONE',
                    doneAt: { gte: monthStart, lte: monthEnd },
                },
            }),
        ]);

    // ---------------------------------------------------------
    // ✅ APPOINTMENTS CANCELED (DIA/MÊS)
    // ---------------------------------------------------------
    const [appointmentsCanceledDayCount, appointmentsCanceledMonthCount] =
        await Promise.all([
            prisma.appointment.count({
                where: {
                    ...orderScope,
                    status: 'CANCELED',
                    cancelledAt: { gte: dayStart, lte: dayEnd },
                },
            }),
            prisma.appointment.count({
                where: {
                    ...orderScope,
                    status: 'CANCELED',
                    cancelledAt: { gte: monthStart, lte: monthEnd },
                },
            }),
        ]);

    // ---------------------------------------------------------
    // ✅ EXPENSES (MÊS) | Lucro real = liquido - despesas
    // Critério recomendado p/ “real”: isPaid = true
    // ---------------------------------------------------------
    const expensesMonth = await prisma.expense.findMany({
        where: {
            ...orderScope,
            dueDate: { gte: monthStart, lte: monthEnd },
            isPaid: true,
        },
        select: {
            amount: true,
        },
    });

    // ---------------------------------------------------------
    // ✅ PRODUCTS: estoque total e vendas/reservas do mês
    // ---------------------------------------------------------
    const productsInStockAgg = await prisma.product.aggregate({
        where: {
            ...orderScope,
        },
        _sum: {
            stockQuantity: true,
        },
    });

    // vendidos (mês): itens de produto em pedidos COMPLETED no mês
    const soldProductItemsMonth = await prisma.orderItem.findMany({
        where: {
            companyId,
            ...(unitId ? { order: { unitId } } : {}),
            productId: { not: null },
            order: {
                companyId,
                ...(unitId ? { unitId } : {}),
                status: 'COMPLETED',
                updatedAt: { gte: monthStart, lte: monthEnd },
            },
        },
        select: {
            quantity: true,
        },
    });

    // reservados (mês): pedidos em PENDING/PENDING_CHECKIN no mês com itens de produto
    const reservedProductItemsMonth = await prisma.orderItem.findMany({
        where: {
            companyId,
            ...(unitId ? { order: { unitId } } : {}),
            productId: { not: null },
            order: {
                companyId,
                ...(unitId ? { unitId } : {}),
                status: { in: ['PENDING', 'PENDING_CHECKIN'] },
                createdAt: { gte: monthStart, lte: monthEnd },
            },
        },
        select: {
            quantity: true,
        },
    });

    // ---------------------------------------------------------
    // ✅ REVIEWS (mês e geral)
    // ---------------------------------------------------------
    const reviewsMonthAgg = await prisma.appointmentReview.aggregate({
        where: {
            companyId,
            ...(unitId ? { appointment: { unitId } } : {}),
            createdAt: { gte: monthStart, lte: monthEnd },
        },
        _count: { id: true },
        _avg: { rating: true },
    });

    const reviewsOverallAgg = await prisma.appointmentReview.aggregate({
        where: {
            companyId,
            ...(unitId ? { appointment: { unitId } } : {}),
        },
        _count: { id: true },
        _avg: { rating: true },
    });

    // distribuição (1..5) no mês
    const ratingsDist = await prisma.appointmentReview.groupBy({
        by: ['rating'],
        where: {
            companyId,
            ...(unitId ? { appointment: { unitId } } : {}),
            createdAt: { gte: monthStart, lte: monthEnd },
        },
        _count: { rating: true },
    });

    // ranking de profissionais no mês (avg + count)
    const reviewsByProfessional = await prisma.appointmentReview.groupBy({
        by: ['professionalId'],
        where: {
            companyId,
            ...(unitId ? { appointment: { unitId } } : {}),
            createdAt: { gte: monthStart, lte: monthEnd },
        },
        _count: { id: true },
        _avg: { rating: true },
        orderBy: [{ _avg: { rating: 'desc' } }, { _count: { id: 'desc' } }],
    });

    const professionalIds = reviewsByProfessional
        .map((r) => r.professionalId)
        .filter(Boolean);

    const professionals = professionalIds.length
        ? await prisma.professional.findMany({
              where: {
                  companyId,
                  id: { in: professionalIds },
              },
              select: { id: true, name: true },
          })
        : [];

    const professionalNameById = new Map(
        professionals.map((p) => [p.id, p.name])
    );

    // tags (positivas/negativas) mais citadas no mês
    const reviewTagsAgg = await prisma.appointmentReviewTag.groupBy({
        by: ['tagId'],
        where: {
            review: {
                companyId,
                ...(unitId ? { appointment: { unitId } } : {}),
                createdAt: { gte: monthStart, lte: monthEnd },
            },
        },
        _count: { tagId: true },
        orderBy: { _count: { tagId: 'desc' } },
        take: 50,
    });

    const tagIds = reviewTagsAgg.map((t) => t.tagId);
    const tags =
        tagIds.length > 0
            ? await prisma.reviewTag.findMany({
                  where: { companyId, id: { in: tagIds } },
                  select: { id: true, label: true, isNegative: true },
              })
            : [];

    const tagMetaById = new Map(tags.map((t) => [t.id, t]));

    const topPositiveTags = reviewTagsAgg
        .map((row) => {
            const meta = tagMetaById.get(row.tagId);
            if (!meta || meta.isNegative) return null;
            return { label: meta.label, count: row._count.tagId };
        })
        .filter(Boolean)
        .slice(0, 8) as Array<{ label: string; count: number }>;

    const topNegativeTags = reviewTagsAgg
        .map((row) => {
            const meta = tagMetaById.get(row.tagId);
            if (!meta || !meta.isNegative) return null;
            return { label: meta.label, count: row._count.tagId };
        })
        .filter(Boolean)
        .slice(0, 8) as Array<{ label: string; count: number }>;

    // reviews recentes (positivas / negativas) no mês
    const [recentPositiveReviews, recentNegativeReviews] = await Promise.all([
        prisma.appointmentReview.findMany({
            where: {
                companyId,
                ...(unitId ? { appointment: { unitId } } : {}),
                createdAt: { gte: monthStart, lte: monthEnd },
                rating: { gte: 3 },
            },
            orderBy: { createdAt: 'desc' },
            take: 8,
            include: {
                client: { select: { name: true } },
                professional: { select: { name: true } },
                appointment: {
                    select: {
                        service: { select: { name: true } },
                    },
                },
                tags: { include: { tag: { select: { label: true } } } },
            },
        }),
        prisma.appointmentReview.findMany({
            where: {
                companyId,
                ...(unitId ? { appointment: { unitId } } : {}),
                createdAt: { gte: monthStart, lte: monthEnd },
                rating: { lte: 2 },
            },
            orderBy: { createdAt: 'desc' },
            take: 8,
            include: {
                client: { select: { name: true } },
                professional: { select: { name: true } },
                appointment: {
                    select: {
                        service: { select: { name: true } },
                    },
                },
                tags: { include: { tag: { select: { label: true } } } },
            },
        }),
    ]);

    // ---------------------------------------------------------
    // ✅ CÁLCULOS (DIA)
    // Bruto: sempre da Order.totalAmount
    // Split e comissão: pelos itens (service/product)
    // ---------------------------------------------------------
    let totalGrossDay = 0;
    let totalGrossDayServices = 0;
    let totalGrossDayProducts = 0;

    let totalCommissionDay = 0;
    let totalCommissionDayServices = 0;
    let totalCommissionDayProducts = 0;

    for (const o of completedOrdersDay) {
        totalGrossDay = safeAdd(totalGrossDay, toNumberDecimal(o.totalAmount));

        const pctFromAppointment = clampToPct(
            toNumberDecimal(o.appointment?.professionalPercentageAtTheTime)
        );

        for (const it of o.items) {
            const itemTotal = toNumberDecimal(it.totalPrice);

            if (it.serviceId) {
                totalGrossDayServices = safeAdd(
                    totalGrossDayServices,
                    itemTotal
                );

                const pctFromService = clampToPct(
                    toNumberDecimal(it.service?.professionalPercentage)
                );
                const pct = pctFromAppointment || pctFromService;

                const commission = (itemTotal * pct) / 100;
                totalCommissionDayServices = safeAdd(
                    totalCommissionDayServices,
                    commission
                );
                totalCommissionDay = safeAdd(totalCommissionDay, commission);
            } else if (it.productId) {
                totalGrossDayProducts = safeAdd(
                    totalGrossDayProducts,
                    itemTotal
                );

                const pctFromProduct = clampToPct(
                    toNumberDecimal(it.product?.professionalPercentage)
                );
                const commission = (itemTotal * pctFromProduct) / 100;

                totalCommissionDayProducts = safeAdd(
                    totalCommissionDayProducts,
                    commission
                );
                totalCommissionDay = safeAdd(totalCommissionDay, commission);
            }
        }
    }

    const totalNetDay = totalGrossDay - totalCommissionDay;
    const totalNetDayServices =
        totalGrossDayServices - totalCommissionDayServices;
    const totalNetDayProducts =
        totalGrossDayProducts - totalCommissionDayProducts;

    // cancel fee (dia)
    let totalCancelFeeDay = 0;
    let totalCanceledWithFeeDay = 0;

    for (const a of canceledAppointmentsDay) {
        if (!a.cancelFeeApplied) continue;
        const fee = toNumberDecimal(a.cancelFeeValue);
        if (Number.isFinite(fee) && fee > 0) {
            totalCancelFeeDay = safeAdd(totalCancelFeeDay, fee);
            totalCanceledWithFeeDay += 1;
        }
    }

    // ---------------------------------------------------------
    // ✅ CÁLCULOS (MÊS)
    // ---------------------------------------------------------
    let totalGrossMonth = 0;
    let totalGrossMonthServices = 0;
    let totalGrossMonthProducts = 0;

    let totalCommissionMonthServices = 0;
    let totalCommissionMonthProducts = 0;

    // para gráficos (dia a dia)
    const daysInMonth = Number(format(monthEnd, 'd'));
    const revenueCurrent = new Array<number>(daysInMonth).fill(0);
    const revenuePrev = new Array<number>(
        Number(format(prevMonthEnd, 'd'))
    ).fill(0);

    const servicesDaily = new Array<number>(daysInMonth).fill(0);
    const productsDaily = new Array<number>(daysInMonth).fill(0);

    for (const o of completedOrdersMonth) {
        totalGrossMonth = safeAdd(
            totalGrossMonth,
            toNumberDecimal(o.totalAmount)
        );

        const dayIndex = Number(format(o.updatedAt, 'd')) - 1;
        if (dayIndex >= 0 && dayIndex < revenueCurrent.length) {
            revenueCurrent[dayIndex] = safeAdd(
                revenueCurrent[dayIndex],
                toNumberDecimal(o.totalAmount)
            );
        }

        const pctFromAppointment = clampToPct(
            toNumberDecimal(o.appointment?.professionalPercentageAtTheTime)
        );

        for (const it of o.items) {
            const itemTotal = toNumberDecimal(it.totalPrice);

            if (it.serviceId) {
                totalGrossMonthServices = safeAdd(
                    totalGrossMonthServices,
                    itemTotal
                );
                if (dayIndex >= 0 && dayIndex < servicesDaily.length) {
                    servicesDaily[dayIndex] = safeAdd(
                        servicesDaily[dayIndex],
                        itemTotal
                    );
                }

                const pctFromService = clampToPct(
                    toNumberDecimal(it.service?.professionalPercentage)
                );
                const pct = pctFromAppointment || pctFromService;

                const commission = (itemTotal * pct) / 100;
                totalCommissionMonthServices = safeAdd(
                    totalCommissionMonthServices,
                    commission
                );
            } else if (it.productId) {
                totalGrossMonthProducts = safeAdd(
                    totalGrossMonthProducts,
                    itemTotal
                );
                if (dayIndex >= 0 && dayIndex < productsDaily.length) {
                    productsDaily[dayIndex] = safeAdd(
                        productsDaily[dayIndex],
                        itemTotal
                    );
                }

                const pctFromProduct = clampToPct(
                    toNumberDecimal(it.product?.professionalPercentage)
                );
                const commission = (itemTotal * pctFromProduct) / 100;

                totalCommissionMonthProducts = safeAdd(
                    totalCommissionMonthProducts,
                    commission
                );
            }
        }
    }

    for (const o of completedOrdersPrevMonth) {
        const dayIndex = Number(format(o.updatedAt, 'd')) - 1;
        if (dayIndex >= 0 && dayIndex < revenuePrev.length) {
            revenuePrev[dayIndex] = safeAdd(
                revenuePrev[dayIndex],
                toNumberDecimal(o.totalAmount)
            );
        }
    }

    const totalNetMonthServices =
        totalGrossMonthServices - totalCommissionMonthServices;
    const totalNetMonthProducts =
        totalGrossMonthProducts - totalCommissionMonthProducts;
    const totalNetMonth = totalNetMonthServices + totalNetMonthProducts;

    // despesas (mês) - real
    let totalExpensesMonth = 0;
    for (const e of expensesMonth) {
        totalExpensesMonth = safeAdd(
            totalExpensesMonth,
            toNumberDecimal(e.amount)
        );
    }

    const realNetMonth = totalNetMonth - totalExpensesMonth;

    // cancel fee (mês)
    let totalCanceledWithFeeMonth = 0;
    for (const a of canceledAppointmentsMonth) {
        if (!a.cancelFeeApplied) continue;
        const fee = toNumberDecimal(a.cancelFeeValue);
        if (Number.isFinite(fee) && fee > 0) totalCanceledWithFeeMonth += 1;
    }

    // produtos (estoque / vendido / reservado)
    const totalProductsInStock =
        Number(productsInStockAgg._sum.stockQuantity ?? 0) || 0;

    const totalProductsSoldMonth = soldProductItemsMonth.reduce(
        (acc, it) => acc + (it.quantity ?? 0),
        0
    );

    const totalProductsReservedMonth = reservedProductItemsMonth.reduce(
        (acc, it) => acc + (it.quantity ?? 0),
        0
    );

    // ---------------------------------------------------------
    // ✅ Labels e gráficos
    // ---------------------------------------------------------
    const currentMonthLabel = format(monthBase, 'MMM/yyyy', { locale: ptBR });
    const previousMonthLabel = format(subMonths(monthBase, 1), 'MMM/yyyy', {
        locale: ptBR,
    });

    const sumCurrentMonth = revenueCurrent.reduce((a, b) => a + b, 0);
    const sumPrevMonth = revenuePrev.reduce((a, b) => a + b, 0);

    const variationPercentage =
        sumPrevMonth > 0
            ? ((sumCurrentMonth - sumPrevMonth) / sumPrevMonth) * 100
            : 0;

    const revenueChartData = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return {
            day,
            currentMonth: Math.max(0, Math.round(revenueCurrent[i] ?? 0)),
            previousMonth: Math.max(0, Math.round(revenuePrev[i] ?? 0)),
        };
    });

    const productsVsServicesChartData = Array.from(
        { length: daysInMonth },
        (_, i) => {
            const day = i + 1;
            return {
                day,
                label: String(day).padStart(2, '0'),
                services: Math.max(0, Math.round(servicesDaily[i] ?? 0)),
                products: Math.max(0, Math.round(productsDaily[i] ?? 0)),
            };
        }
    );

    const totalOrdersServicesMonth = productsVsServicesChartData.reduce(
        (acc, d) => acc + d.services,
        0
    );
    const totalOrdersProductsMonth = productsVsServicesChartData.reduce(
        (acc, d) => acc + d.products,
        0
    );

    // ---------------------------------------------------------
    // ✅ REVIEWS - números finais para UI
    // ---------------------------------------------------------
    const totalReviewsMonth = reviewsMonthAgg._count.id ?? 0;
    const totalReviewsOverall = reviewsOverallAgg._count.id ?? 0;

    const averageRatingMonth = Number(reviewsMonthAgg._avg.rating ?? 0);
    const averageRatingOverall = Number(reviewsOverallAgg._avg.rating ?? 0);

    const averageRatingMonthDisplay =
        totalReviewsMonth > 0 ? averageRatingMonth.toFixed(2) : '—';
    const averageRatingOverallDisplay =
        totalReviewsOverall > 0 ? averageRatingOverall.toFixed(2) : '—';

    const professionalReviewsRanking = reviewsByProfessional
        .map((row) => {
            const id = row.professionalId;
            if (!id) return null;

            return {
                professionalId: id,
                professionalName:
                    professionalNameById.get(id) ?? 'Profissional',
                totalReviews: row._count.id ?? 0,
                avgRating: Number(row._avg.rating ?? 0),
            };
        })
        .filter(Boolean)
        .sort((a, b) => {
            const aa = a as any;
            const bb = b as any;
            if (bb.avgRating !== aa.avgRating)
                return bb.avgRating - aa.avgRating;
            if (bb.totalReviews !== aa.totalReviews)
                return bb.totalReviews - aa.totalReviews;
            return aa.professionalName.localeCompare(bb.professionalName);
        }) as Array<{
        professionalId: string;
        professionalName: string;
        totalReviews: number;
        avgRating: number;
    }>;

    const ratingBuckets = [1, 2, 3, 4, 5].map((r) => {
        const found = ratingsDist.find((x) => x.rating === r);
        return found?._count.rating ?? 0;
    });

    const ratingsDistributionData = ratingBuckets.map((count, index) => ({
        rating: index + 1,
        count,
    }));

    return (
        <div className="space-y-6">
            {/* HEADER + DATA */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-title text-content-primary">
                        Dashboard
                    </h1>
                    <p className="text-paragraph-medium-size text-content-secondary">
                        Visão geral de todos os agendamentos, serviços, vendas
                        de produtos e satisfação dos clientes.
                    </p>
                </div>

                <DatePicker />
            </div>

            {/* RESUMO FINANCEIRO DO DIA (SERVIÇOS + PRODUTOS) */}
            <DashboardDailySummary
                totalGrossDay={currencyFormatter.format(totalGrossDay)}
                totalGrossDayServices={currencyFormatter.format(
                    totalGrossDayServices
                )}
                totalGrossDayProducts={currencyFormatter.format(
                    totalGrossDayProducts
                )}
                totalCommissionDay={currencyFormatter.format(
                    totalCommissionDay
                )}
                totalCommissionDayServices={currencyFormatter.format(
                    totalCommissionDayServices
                )}
                totalCommissionDayProducts={currencyFormatter.format(
                    totalCommissionDayProducts
                )}
                totalNetDay={currencyFormatter.format(totalNetDay)}
                totalNetDayServices={currencyFormatter.format(
                    totalNetDayServices
                )}
                totalNetDayProducts={currencyFormatter.format(
                    totalNetDayProducts
                )}
                totalCancelFeeDay={currencyFormatter.format(totalCancelFeeDay)}
                totalCanceledWithFeeDay={totalCanceledWithFeeDay}
            />

            {/* RESUMO FINANCEIRO DO MÊS + ATENDIMENTOS + (NOVO) PRODUTOS */}
            <DashboardMonthlySummary
                totalGrossMonth={currencyFormatter.format(totalGrossMonth)}
                totalGrossMonthServices={currencyFormatter.format(
                    totalGrossMonthServices
                )}
                totalGrossMonthProducts={currencyFormatter.format(
                    totalGrossMonthProducts
                )}
                totalNetMonth={currencyFormatter.format(totalNetMonth)}
                totalNetMonthServices={currencyFormatter.format(
                    totalNetMonthServices
                )}
                totalNetMonthProducts={currencyFormatter.format(
                    totalNetMonthProducts
                )}
                totalExpensesMonth={currencyFormatter.format(
                    totalExpensesMonth
                )}
                realNetMonth={currencyFormatter.format(realNetMonth)}
                realNetMonthIsPositive={realNetMonth >= 0}
                totalAppointmentsDoneDay={appointmentsDoneDayCount}
                totalAppointmentsDoneMonth={appointmentsDoneMonthCount}
                totalAppointmentsCanceledDay={appointmentsCanceledDayCount}
                totalAppointmentsCanceledMonth={appointmentsCanceledMonthCount}
                totalCanceledWithFeeDay={totalCanceledWithFeeDay}
                totalCanceledWithFeeMonth={totalCanceledWithFeeMonth}
                productsInStock={totalProductsInStock}
                productsSoldMonth={totalProductsSoldMonth}
                productsReservedMonth={totalProductsReservedMonth}
            />

            {/* GRÁFICO DE FATURAMENTO (MÊS ATUAL VS ANTERIOR) */}
            <DashboardRevenueChart
                data={revenueChartData}
                currentMonthLabel={currentMonthLabel}
                previousMonthLabel={previousMonthLabel}
                variationPercentage={variationPercentage}
            />

            {/* GRÁFICO 5 · PRODUTOS x SERVIÇOS (FATURAMENTO DO MÊS) */}
            <DashboardProductsVsServicesChart
                data={productsVsServicesChartData}
                monthLabel={currentMonthLabel}
                totalServices={totalOrdersServicesMonth}
                totalProducts={totalOrdersProductsMonth}
            />

            {/* AVALIAÇÕES DE CLIENTES */}
            <section className="space-y-4 rounded-xl border border-border-primary bg-background-tertiary p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-label-small text-content-secondary">
                            Satisfação dos clientes (mês selecionado)
                        </p>

                        <p className="text-title font-semibold text-content-primary">
                            Nota média no mês:{' '}
                            <span className="font-semibold">
                                {averageRatingMonthDisplay}
                            </span>
                            {totalReviewsMonth > 0 && (
                                <span className="ml-2 align-middle text-xl text-yellow-500">
                                    {'★'.repeat(
                                        Math.max(
                                            0,
                                            Math.min(
                                                5,
                                                Math.round(averageRatingMonth)
                                            )
                                        )
                                    )}
                                </span>
                            )}
                        </p>

                        <p className="text-paragraph-small text-content-secondary">
                            Nota média geral (histórico):{' '}
                            <span className="font-semibold text-content-primary">
                                {averageRatingOverallDisplay}
                            </span>{' '}
                            {totalReviewsOverall > 0 && (
                                <span className="text-content-tertiary">
                                    ({totalReviewsOverall} avaliações)
                                </span>
                            )}
                        </p>

                        <p className="text-paragraph-small text-content-secondary">
                            Total de avaliações no mês:{' '}
                            <span className="font-semibold text-content-primary">
                                {totalReviewsMonth}
                            </span>
                        </p>

                        <p className="mt-1 text-paragraph-small text-content-tertiary">
                            Algumas avaliações podem ter o nome do cliente
                            oculto para o profissional, quando ele opta por
                            avaliação anônima. Aqui no painel, o administrador
                            sempre vê o cliente real.
                        </p>
                    </div>
                </div>

                {professionalReviewsRanking.length === 0 ? (
                    <p className="text-paragraph-small text-content-secondary">
                        Ainda não há avaliações registradas neste mês.
                    </p>
                ) : (
                    <>
                        {/* RANKING PROFISSIONAIS */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-paragraph-small">
                                <thead>
                                    <tr className="border-b border-border-primary text-content-secondary">
                                        <th className="py-2 pr-4">#</th>
                                        <th className="py-2 pr-4">
                                            Profissional
                                        </th>
                                        <th className="py-2 pr-4">
                                            Nota média
                                        </th>
                                        <th className="py-2 pr-4">
                                            Avaliações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professionalReviewsRanking.map(
                                        (row, index) => (
                                            <tr
                                                key={row.professionalId}
                                                className="border-b border-border-primary/60 last:border-0"
                                            >
                                                <td className="py-2 pr-4 text-content-secondary">
                                                    {index + 1}
                                                </td>
                                                <td className="py-2 pr-4 text-content-primary">
                                                    {row.professionalName}
                                                </td>
                                                <td className="py-2 pr-4 text-content-primary">
                                                    {row.avgRating.toFixed(2)}
                                                </td>
                                                <td className="py-2 pr-4 text-content-secondary">
                                                    {row.totalReviews}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* MOTIVOS POSITIVOS / NEGATIVOS */}
                        <div className="grid gap-4 border-t border-border-primary/60 pt-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <p className="text-label-small text-content-primary">
                                    Motivos positivos mais citados (no mês)
                                </p>

                                {topPositiveTags.length === 0 ? (
                                    <p className="text-paragraph-small text-content-secondary">
                                        Ainda não há tags positivas suficientes
                                        neste mês.
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {topPositiveTags.map((tag) => (
                                            <span
                                                key={tag.label}
                                                className="flex items-center gap-1 rounded-full border border-emerald-500/60 bg-emerald-500/5 px-3 py-1 text-[11px] text-emerald-500"
                                            >
                                                <span>{tag.label}</span>
                                                <span className="text-emerald-500">
                                                    · {tag.count}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <p className="text-label-small text-content-primary">
                                    Motivos negativos mais citados (no mês)
                                </p>

                                {topNegativeTags.length === 0 ? (
                                    <p className="text-paragraph-small text-content-secondary">
                                        Ainda não há feedbacks negativos
                                        suficientes neste mês. ✨
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {topNegativeTags.map((tag) => (
                                            <span
                                                key={tag.label}
                                                className="flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/5 px-3 py-1 text-[11px] text-destructive"
                                            >
                                                <span>{tag.label}</span>
                                                <span className="text-destructive">
                                                    · {tag.count}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* FEEDBACKS RECENTES */}
                        <div className="border-t border-border-primary/60 pt-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <p className="text-label-small text-content-primary">
                                        Feedbacks positivos recentes (3–5
                                        estrelas no mês)
                                    </p>

                                    {recentPositiveReviews.length === 0 ? (
                                        <p className="text-paragraph-small text-content-secondary">
                                            Nenhum feedback positivo registrado
                                            neste mês ainda.
                                        </p>
                                    ) : (
                                        <div className="space-y-2">
                                            {recentPositiveReviews.map(
                                                (rev) => {
                                                    const clientName =
                                                        rev.client?.name ??
                                                        'Cliente';
                                                    const professionalName =
                                                        rev.professional
                                                            ?.name ??
                                                        'Profissional';
                                                    const serviceName =
                                                        rev.appointment?.service
                                                            ?.name ??
                                                        'Atendimento';

                                                    return (
                                                        <div
                                                            key={rev.id}
                                                            className="space-y-1 rounded-xl border border-border-primary bg-background-secondary px-3 py-2 text-[11px]"
                                                        >
                                                            <p className="text-content-primary">
                                                                {clientName} ·{' '}
                                                                <span className="text-content-secondary">
                                                                    {
                                                                        professionalName
                                                                    }{' '}
                                                                    ·{' '}
                                                                    {
                                                                        serviceName
                                                                    }
                                                                </span>{' '}
                                                                ·{' '}
                                                                <span className="text-yellow-500">
                                                                    {rev.rating}
                                                                    ★
                                                                </span>
                                                            </p>

                                                            {rev.tags?.length >
                                                                0 && (
                                                                <p className="text-content-secondary">
                                                                    Motivos:{' '}
                                                                    {rev.tags
                                                                        .map(
                                                                            (
                                                                                t
                                                                            ) =>
                                                                                t
                                                                                    .tag
                                                                                    .label
                                                                        )
                                                                        .join(
                                                                            ', '
                                                                        )}
                                                                </p>
                                                            )}

                                                            {rev.comment && (
                                                                <p className="text-content-secondary">
                                                                    Comentário:{' '}
                                                                    {
                                                                        rev.comment
                                                                    }
                                                                </p>
                                                            )}

                                                            <p className="text-content-tertiary">
                                                                Registrado em:{' '}
                                                                {rev.createdAt.toLocaleString(
                                                                    'pt-BR',
                                                                    {
                                                                        day: '2-digit',
                                                                        month: '2-digit',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <p className="text-label-small text-content-primary">
                                        Feedbacks negativos recentes (1–2
                                        estrelas no mês)
                                    </p>

                                    {recentNegativeReviews.length === 0 ? (
                                        <p className="text-paragraph-small text-content-secondary">
                                            Nenhum feedback negativo registrado
                                            neste mês. 🧡
                                        </p>
                                    ) : (
                                        <div className="space-y-2">
                                            {recentNegativeReviews.map(
                                                (rev) => {
                                                    const clientName =
                                                        rev.client?.name ??
                                                        'Cliente';
                                                    const professionalName =
                                                        rev.professional
                                                            ?.name ??
                                                        'Profissional';
                                                    const serviceName =
                                                        rev.appointment?.service
                                                            ?.name ??
                                                        'Atendimento';

                                                    return (
                                                        <div
                                                            key={rev.id}
                                                            className="space-y-1 rounded-xl border border-border-primary bg-background-secondary px-3 py-2 text-[11px]"
                                                        >
                                                            <p className="text-content-primary">
                                                                {clientName} ·{' '}
                                                                <span className="text-content-secondary">
                                                                    {
                                                                        professionalName
                                                                    }{' '}
                                                                    ·{' '}
                                                                    {
                                                                        serviceName
                                                                    }
                                                                </span>{' '}
                                                                ·{' '}
                                                                <span className="text-yellow-500">
                                                                    {rev.rating}
                                                                    ★
                                                                </span>
                                                            </p>

                                                            {rev.tags?.length >
                                                                0 && (
                                                                <p className="text-content-secondary">
                                                                    Motivos:{' '}
                                                                    {rev.tags
                                                                        .map(
                                                                            (
                                                                                t
                                                                            ) =>
                                                                                t
                                                                                    .tag
                                                                                    .label
                                                                        )
                                                                        .join(
                                                                            ', '
                                                                        )}
                                                                </p>
                                                            )}

                                                            {rev.comment && (
                                                                <p className="text-content-secondary">
                                                                    Comentário:{' '}
                                                                    {
                                                                        rev.comment
                                                                    }
                                                                </p>
                                                            )}

                                                            <p className="text-content-tertiary">
                                                                Registrado em:{' '}
                                                                {rev.createdAt.toLocaleString(
                                                                    'pt-BR',
                                                                    {
                                                                        day: '2-digit',
                                                                        month: '2-digit',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>

            {/* GRÁFICO 4 · SATISFAÇÃO */}
            <DashboardRatingsDistributionChart
                data={ratingsDistributionData}
                monthLabel={currentMonthLabel}
                averageRatingMonth={
                    totalReviewsMonth > 0 ? averageRatingMonth : null
                }
                averageRatingOverall={
                    totalReviewsOverall > 0 ? averageRatingOverall : null
                }
                totalReviewsMonth={totalReviewsMonth}
                totalReviewsOverall={totalReviewsOverall}
            />
        </div>
    );
}
