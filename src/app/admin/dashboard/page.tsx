// app/admin/dashboard/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

import { DatePicker } from '@/components/date-picker';
import { DashboardDailySummary } from '@/components/admin/dashboard-daily-summary';
import { DashboardMonthlySummary } from '@/components/admin/dashboard-monthly-summary';
import { DashboardRevenueChart } from '@/components/admin/dashboard-charts/dashboard-revenue-chart';
import { DashboardRatingsDistributionChart } from '@/components/admin/dashboard-charts/dashboard-ratings-distribution-chart';
import { DashboardProductsVsServicesChart } from '@/components/admin/dashboard-charts/dashboard-products-vs-services-chart/dashboard-products-vs-services-chart';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Dashboard',
};

export default async function AdminDashboardPage() {
    // ✅ Guard central (redirect interno)
    await requireAdminForModule('DASHBOARD');

    // ====== MOCKS (UI only) ======
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    const totalGrossDay = 1250.5;
    const totalGrossDayServices = 840.0;
    const totalGrossDayProducts = 410.5;

    const totalCommissionDay = 290.0;
    const totalCommissionDayServices = 210.0;
    const totalCommissionDayProducts = 80.0;

    const totalNetDay = totalGrossDay - totalCommissionDay;
    const totalNetDayServices =
        totalGrossDayServices - totalCommissionDayServices;
    const totalNetDayProducts =
        totalGrossDayProducts - totalCommissionDayProducts;

    const totalCancelFeeDay = 25.0;
    const totalCanceledWithFeeDay = 1;

    const totalGrossMonth = 28650.75;
    const totalGrossMonthServices = 20100.0;
    const totalGrossMonthProducts = 8550.75;

    const totalCommissionMonthServices = 5200.0;
    const totalCommissionMonthProducts = 1650.0;

    const totalNetMonthServices =
        totalGrossMonthServices - totalCommissionMonthServices;
    const totalNetMonthProducts =
        totalGrossMonthProducts - totalCommissionMonthProducts;

    const totalNetMonth = totalNetMonthServices + totalNetMonthProducts;

    const totalExpensesMonth = 7200.0;
    const realNetMonth = totalNetMonth - totalExpensesMonth;

    const totalAppointmentsDoneDay = 11;
    const totalAppointmentsDoneMonth = 242;

    const totalAppointmentsCanceledDay = 2;
    const totalAppointmentsCanceledMonth = 18;

    const totalCanceledWithFeeMonth = 6;

    const totalProductsInStock = 380;
    const totalProductsSoldMonth = 215;
    const totalProductsReservedMonth = 64;

    const currentMonthLabel = 'jan/2026';
    const previousMonthLabel = 'dez/2025';
    const variationPercentage = 12.4;

    const revenueChartData = Array.from({ length: 31 }, (_, index) => {
        const day = index + 1;
        return {
            day,
            currentMonth: Math.max(
                0,
                Math.round(900 + Math.sin(day / 2) * 220 + (day % 5) * 35)
            ),
            previousMonth: Math.max(
                0,
                Math.round(820 + Math.cos(day / 2) * 180 + (day % 4) * 28)
            ),
        };
    });

    const productsVsServicesChartData = Array.from(
        { length: 31 },
        (_, index) => {
            const day = index + 1;
            const services = Math.max(
                0,
                Math.round(520 + Math.sin(day / 2.2) * 140 + (day % 6) * 22)
            );
            const products = Math.max(
                0,
                Math.round(280 + Math.cos(day / 2.3) * 110 + (day % 5) * 18)
            );
            return {
                day,
                label: String(day).padStart(2, '0'),
                services,
                products,
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

    const totalReviewsMonth = 37;
    const totalReviewsOverall = 412;

    const averageRatingMonth = 4.42;
    const averageRatingOverall = 4.31;

    const averageRatingMonthDisplay =
        totalReviewsMonth > 0 ? averageRatingMonth.toFixed(2) : '—';
    const averageRatingOverallDisplay =
        totalReviewsOverall > 0 ? averageRatingOverall.toFixed(2) : '—';

    const professionalReviewsRanking = [
        {
            professionalId: 'p1',
            professionalName: 'Amanda',
            totalReviews: 12,
            avgRating: 4.8,
        },
        {
            professionalId: 'p2',
            professionalName: 'Bruno',
            totalReviews: 9,
            avgRating: 4.6,
        },
        {
            professionalId: 'p3',
            professionalName: 'Carla',
            totalReviews: 6,
            avgRating: 4.5,
        },
        {
            professionalId: 'p4',
            professionalName: 'Diego',
            totalReviews: 10,
            avgRating: 4.2,
        },
    ].sort((a, b) => {
        if (b.avgRating !== a.avgRating) return b.avgRating - a.avgRating;
        if (b.totalReviews !== a.totalReviews)
            return b.totalReviews - a.totalReviews;
        return a.professionalName.localeCompare(b.professionalName);
    });

    const topPositiveTags = [
        { label: 'Atendimento', count: 18 },
        { label: 'Pontualidade', count: 12 },
        { label: 'Ambiente', count: 9 },
        { label: 'Resultado', count: 7 },
        { label: 'Preço justo', count: 5 },
    ].slice(0, 8);

    const topNegativeTags = [
        { label: 'Atraso', count: 4 },
        { label: 'Comunicação', count: 3 },
        { label: 'Organização', count: 2 },
    ].slice(0, 8);

    const recentPositiveReviews = [
        {
            id: 'r1',
            rating: 5,
            comment: 'Excelente, voltarei com certeza.',
            createdAt: new Date(),
            client: { name: 'Mariana' },
            professional: { name: 'Amanda' },
            appointment: { service: { name: 'Corte + Barba' } },
            tags: [
                { tag: { label: 'Atendimento' } },
                { tag: { label: 'Resultado' } },
            ],
        },
        {
            id: 'r2',
            rating: 4,
            comment: 'Muito bom, super atenciosos.',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
            client: { name: 'Rafael' },
            professional: { name: 'Bruno' },
            appointment: { service: { name: 'Corte' } },
            tags: [{ tag: { label: 'Pontualidade' } }],
        },
    ];

    const recentNegativeReviews = [
        {
            id: 'r3',
            rating: 2,
            comment: 'Demorou mais do que o esperado.',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
            client: { name: 'Lucas' },
            professional: { name: 'Diego' },
            appointment: { service: { name: 'Corte' } },
            tags: [{ tag: { label: 'Atraso' } }],
        },
    ];

    const ratingBuckets = [1, 2, 4, 12, 18]; // 1..5
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
                totalAppointmentsDoneDay={totalAppointmentsDoneDay}
                totalAppointmentsDoneMonth={totalAppointmentsDoneMonth}
                totalAppointmentsCanceledDay={totalAppointmentsCanceledDay}
                totalAppointmentsCanceledMonth={totalAppointmentsCanceledMonth}
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
                                    {'★'.repeat(Math.round(averageRatingMonth))}
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
