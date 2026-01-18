// src/app/admin/professional/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

import { Accordion } from '@/components/ui/accordion';

import { ProfessionalRow } from '@/components/admin/professionals/professional-row/professional-row';
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

type ProfessionalReviewStats = {
    avgRating: number;
    totalReviews: number;
    ratingsCount: { rating: number; count: number }[];
    topTags: { label: string; count: number }[];
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

function computeReviewStats(reviews: Array<{ rating: number; tags?: any[] }>) {
    if (!reviews || reviews.length === 0) return null;

    const totalReviews = reviews.length;
    const sumRatings = reviews.reduce((acc, r) => acc + (r.rating ?? 0), 0);
    const avgRating = totalReviews > 0 ? sumRatings / totalReviews : 0;

    // distribuição 1..5
    const ratingsCountMap = new Map<number, number>();
    for (let i = 1; i <= 5; i++) ratingsCountMap.set(i, 0);

    for (const r of reviews) {
        const val = Math.max(1, Math.min(5, Number(r.rating ?? 0)));
        ratingsCountMap.set(val, (ratingsCountMap.get(val) ?? 0) + 1);
    }

    const ratingsCount = Array.from(ratingsCountMap.entries())
        .map(([rating, count]) => ({ rating, count }))
        .sort((a, b) => b.rating - a.rating);

    // top tags
    const tagMap = new Map<string, number>();
    for (const r of reviews) {
        for (const rt of r.tags ?? []) {
            const label = String(rt?.tag?.label ?? '').trim();
            if (!label) continue;
            tagMap.set(label, (tagMap.get(label) ?? 0) + 1);
        }
    }

    const topTags = Array.from(tagMap.entries())
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) =>
            b.count !== a.count
                ? b.count - a.count
                : a.label.localeCompare(b.label, 'pt-BR')
        )
        .slice(0, 5);

    const stats: ProfessionalReviewStats = {
        avgRating,
        totalReviews,
        ratingsCount,
        topTags,
    };

    return stats;
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

    // ✅ Profissionais + vínculos + disponibilidades + reviews
    const professionals = await prisma.professional.findMany({
        where: { companyId },
        orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
        include: {
            user: true,

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

            reviews: {
                where: { companyId },
                include: {
                    tags: { include: { tag: true } },
                },
                orderBy: { createdAt: 'desc' },
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

        const reviewStats = computeReviewStats(p.reviews as any);

        return {
            id: p.id,
            name: p.name,
            email: p.email,
            phone: p.phone ?? null,
            isActive: p.isActive,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            userId: p.userId ?? null,

            // ✅ imagem preferencial: Professional.imageUrl; fallback: User.image
            imageUrl: p.imageUrl ?? p.user?.image ?? null,

            selectedUnitIds,
            linkedUnits,

            // ✅ labels (linha do accordion)
            weeklyScheduleLabel: buildWeeklySummaryLabel(weekly),
            exceptionsLabel: buildExceptionsSummaryLabel(daily),

            // ✅ dados completos (conteúdo do accordion)
            weeklyAvailabilities: weekly,
            dailyAvailabilities: daily,
            reviewStats,
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
