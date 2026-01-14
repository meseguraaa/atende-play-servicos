// src/app/professional/dashboard/page.tsx
import type { Metadata } from 'next';

import { DatePicker } from '@/components/date-picker';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Profissional | Dashboard',
};

export default function ProfessionalDashboardPage() {
    // ====== MOCKS (UI only) ======
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    const appointmentsToday = 6;
    const appointmentsDoneToday = 2;
    const appointmentsPendingToday = appointmentsToday - appointmentsDoneToday;

    const grossToday = 420.0;
    const commissionToday = 185.0;
    const netToday = grossToday - commissionToday;

    const grossMonth = 6840.0;
    const commissionMonth = 2920.0;
    const netMonth = grossMonth - commissionMonth;

    const averageRatingMonth = 4.6;
    const totalReviewsMonth = 14;

    return (
        <div className="space-y-6">
            {/* HEADER + DATA */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-title text-content-primary">
                        Dashboard
                    </h1>
                    <p className="text-paragraph-medium-size text-content-secondary">
                        Sua visão geral: atendimentos, ganhos e avaliações no
                        período selecionado.
                    </p>
                </div>

                <DatePicker />
            </div>

            {/* KPIs */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                    <p className="text-label-small text-content-secondary">
                        Atendimentos hoje
                    </p>
                    <p className="mt-1 text-title font-semibold text-content-primary">
                        {appointmentsToday}
                    </p>
                    <p className="mt-2 text-paragraph-small text-content-tertiary">
                        Pendentes:{' '}
                        <span className="text-content-primary font-medium">
                            {appointmentsPendingToday}
                        </span>{' '}
                        · Concluídos:{' '}
                        <span className="text-content-primary font-medium">
                            {appointmentsDoneToday}
                        </span>
                    </p>
                </div>

                <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                    <p className="text-label-small text-content-secondary">
                        Líquido hoje
                    </p>
                    <p className="mt-1 text-title font-semibold text-content-primary">
                        {currencyFormatter.format(netToday)}
                    </p>
                    <p className="mt-2 text-paragraph-small text-content-tertiary">
                        Bruto: {currencyFormatter.format(grossToday)} ·
                        Comissão: {currencyFormatter.format(commissionToday)}
                    </p>
                </div>

                <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                    <p className="text-label-small text-content-secondary">
                        Líquido no mês
                    </p>
                    <p className="mt-1 text-title font-semibold text-content-primary">
                        {currencyFormatter.format(netMonth)}
                    </p>
                    <p className="mt-2 text-paragraph-small text-content-tertiary">
                        Bruto: {currencyFormatter.format(grossMonth)} ·
                        Comissão: {currencyFormatter.format(commissionMonth)}
                    </p>
                </div>

                <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                    <p className="text-label-small text-content-secondary">
                        Nota no mês
                    </p>
                    <p className="mt-1 text-title font-semibold text-content-primary">
                        {averageRatingMonth.toFixed(2)}
                        <span className="ml-2 align-middle text-xl text-yellow-500">
                            {'★'.repeat(Math.round(averageRatingMonth))}
                        </span>
                    </p>
                    <p className="mt-2 text-paragraph-small text-content-tertiary">
                        {totalReviewsMonth} avaliações no período
                    </p>
                </div>
            </section>

            {/* PRÓXIMOS ATENDIMENTOS (mock) */}
            <section className="space-y-3 rounded-xl border border-border-primary bg-background-tertiary p-4">
                <div>
                    <p className="text-label-small text-content-secondary">
                        Próximos atendimentos
                    </p>
                    <p className="text-paragraph-medium-size text-content-primary">
                        Hoje (exemplo)
                    </p>
                </div>

                <div className="space-y-2">
                    {[
                        {
                            time: '10:00',
                            client: 'Mariana',
                            service: 'Corte',
                            status: 'Pendente',
                        },
                        {
                            time: '11:30',
                            client: 'Rafael',
                            service: 'Barba',
                            status: 'Pendente',
                        },
                        {
                            time: '14:00',
                            client: 'Lucas',
                            service: 'Corte + Barba',
                            status: 'Concluído',
                        },
                    ].map((row) => (
                        <div
                            key={`${row.time}-${row.client}`}
                            className="flex items-center justify-between gap-3 rounded-xl border border-border-primary bg-background-secondary px-3 py-2"
                        >
                            <div className="min-w-0">
                                <p className="text-paragraph-small text-content-primary">
                                    <span className="font-medium">
                                        {row.time}
                                    </span>{' '}
                                    · {row.client}{' '}
                                    <span className="text-content-tertiary">
                                        · {row.service}
                                    </span>
                                </p>
                                <p className="text-[11px] text-content-secondary">
                                    Status: {row.status}
                                </p>
                            </div>

                            <span className="shrink-0 text-[11px] text-content-tertiary">
                                {/* Placeholder futuro: botão/ver detalhe */}
                                Ver
                            </span>
                        </div>
                    ))}
                </div>

                <p className="text-paragraph-small text-content-tertiary">
                    Aqui entra a lista real filtrada por unidade e por você
                    (professionalId). Por enquanto é só UI.
                </p>
            </section>
        </div>
    );
}
