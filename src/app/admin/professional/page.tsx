// src/app/admin/professional/page.tsx
import type { Metadata } from 'next';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

import { Accordion } from '@/components/ui/accordion';

import { ProfessionalRow } from '@/components/admin/professionals/professional-row';
import { ProfessionalNewDialog } from '@/components/admin/professionals/professional-new-dialog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Profissionais',
};

const WEEKDAY_SHORT = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
] as const;

type WeeklyAvailabilityRow = {
    weekday: number;
    isActive: boolean;
    intervals: { startTime: string; endTime: string }[];
};

type DailyAvailabilityRow = {
    date: Date;
    type: 'DAY_OFF' | 'CUSTOM';
    intervals: { startTime: string; endTime: string }[];
};

function buildWeeklySummaryLabel(weekly: WeeklyAvailabilityRow[]): string {
    const active = weekly
        .filter((w) => w.isActive && w.intervals.length > 0)
        .sort((a, b) => a.weekday - b.weekday);

    if (active.length === 0) return 'Sem escala semanal';

    if (active.length <= 3) {
        return active
            .map((w) => {
                const day =
                    WEEKDAY_SHORT[w.weekday] ?? `Dia ${String(w.weekday)}`;
                const intervals = w.intervals
                    .slice()
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((it) => `${it.startTime}–${it.endTime}`)
                    .join(', ');
                return `${day}: ${intervals}`;
            })
            .join(' • ');
    }

    return `${active.length} dias com escala`;
}

function buildExceptionsSummaryLabel(daily: DailyAvailabilityRow[]) {
    if (daily.length === 0) return 'Sem exceções';

    const dayOff = daily.filter((d) => d.type === 'DAY_OFF').length;
    const custom = daily.filter((d) => d.type === 'CUSTOM').length;

    const parts: string[] = [];
    if (dayOff > 0)
        parts.push(dayOff === 1 ? '1 dia de folga' : `${dayOff} dias de folga`);
    if (custom > 0)
        parts.push(
            custom === 1
                ? '1 ajuste de horário'
                : `${custom} ajustes de horário`
        );

    return parts.join(' • ') || 'Exceções cadastradas';
}

export default async function AdminProfessionalsPage() {
    const session = await requireAdminForModule('PROFESSIONALS');

    const companyId = String((session as { companyId?: string }).companyId);
    if (!companyId) {
        return (
            <div className="space-y-8 max-w-7xl">
                <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-6">
                    <p className="text-paragraph-small text-content-secondary text-center">
                        Sessão inválida (companyId ausente).
                    </p>
                </div>
            </div>
        );
    }

    // ✅ Unidades (para Novo/Editar)
    const units = await prisma.unit.findMany({
        where: { companyId },
        select: { id: true, name: true, isActive: true },
        orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
    });

    // ✅ Profissionais + vínculos + disponibilidades (para labels)
    const professionals = await prisma.professional.findMany({
        where: { companyId },
        orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
        include: {
            units: {
                where: { companyId },
                include: { unit: true },
                orderBy: { createdAt: 'asc' },
            },
            weeklyAvailabilities: {
                where: { companyId },
                include: { intervals: true },
                orderBy: [{ weekday: 'asc' }, { createdAt: 'asc' }],
            },
            dailyAvailabilities: {
                where: { companyId },
                include: { intervals: true },
                orderBy: [{ date: 'asc' }, { createdAt: 'asc' }],
            },
        },
    });

    const rows = professionals.map((p) => {
        const linkedActive = p.units.filter(
            (pu) => pu.isActive && pu.unit?.isActive
        );

        const selectedUnitIds = linkedActive.map((pu) => pu.unitId);

        const linkedUnits = linkedActive.map((pu) => ({
            id: pu.unit.id,
            name: pu.unit.name,
        }));

        const weekly: WeeklyAvailabilityRow[] = p.weeklyAvailabilities.map(
            (w) => ({
                weekday: w.weekday,
                isActive: w.isActive,
                intervals: w.intervals.map((it) => ({
                    startTime: it.startTime,
                    endTime: it.endTime,
                })),
            })
        );

        const daily: DailyAvailabilityRow[] = p.dailyAvailabilities.map(
            (d) => ({
                date: d.date,
                type: d.type,
                intervals: d.intervals.map((it) => ({
                    startTime: it.startTime,
                    endTime: it.endTime,
                })),
            })
        );

        return {
            id: p.id,
            name: p.name,
            email: p.email,
            phone: p.phone ?? null,
            isActive: p.isActive,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            userId: p.userId ?? null,
            imageUrl: p.imageUrl ?? null,

            selectedUnitIds,
            linkedUnits,

            weeklyScheduleLabel: buildWeeklySummaryLabel(weekly),
            exceptionsLabel: buildExceptionsSummaryLabel(daily),
        };
    });

    const activeRows = rows.filter((r) => r.isActive);
    const inactiveRows = rows.filter((r) => !r.isActive);

    return (
        <div className="space-y-8 max-w-7xl">
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-content-primary">
                        Profissionais
                    </h1>
                    <p className="text-paragraph-medium text-content-secondary">
                        Veja a disponibilidade, reputação e as unidades
                        vinculadas de cada profissional.
                    </p>
                </div>

                <ProfessionalNewDialog units={units} />
            </header>

            <section className="space-y-4">
                <h2 className="text-paragraph-medium text-content-primary">
                    Profissionais ativos
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                    {activeRows.length === 0 ? (
                        <p className="text-paragraph-small text-content-secondary px-2">
                            Nenhum profissional ativo no momento.
                        </p>
                    ) : (
                        activeRows.map((row) => (
                            <ProfessionalRow
                                key={row.id}
                                row={row}
                                units={units}
                            />
                        ))
                    )}
                </Accordion>
            </section>

            <section className="space-y-3">
                <h2 className="text-paragraph-medium text-content-primary">
                    Profissionais inativos
                </h2>

                <Accordion type="single" collapsible className="space-y-2">
                    {inactiveRows.length === 0 ? (
                        <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-6">
                            <p className="text-paragraph-small text-content-secondary text-center">
                                Nenhum profissional inativo no momento.
                            </p>
                        </div>
                    ) : (
                        inactiveRows.map((row) => (
                            <ProfessionalRow
                                key={row.id}
                                row={row}
                                units={units}
                            />
                        ))
                    )}
                </Accordion>
            </section>
        </div>
    );
}
