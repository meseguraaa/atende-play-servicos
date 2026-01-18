// app/admin/reports/funnel/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { requireAdminForModule } from '@/lib/admin-permissions';
import { MonthPicker } from '@/components/month-picker';
import { ProfessionalFilter } from '@/components/admin/reports/professional-filter/professional-filter';
import { UnitFilter } from '@/components/admin/reports/unit-filter';
import { CompareWithFilter } from '@/components/admin/reports/compare-with-filter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { parse, subMonths, subYears, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { AppointmentStatus } from '@prisma/client';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Relatórios',
};

type AdminReportsFunnelPageProps = {
    searchParams: Promise<{
        month?: string; // yyyy-MM
        professionalId?: string;
        compare?: string; // "prev_month" | "prev_year"
    }>;
};

const SAO_PAULO_TIMEZONE = 'America/Sao_Paulo';
const UNIT_COOKIE_NAME = 'admin_unit_context';
const UNIT_ALL_VALUE = 'all';
const COMPANY_COOKIE_NAME = 'admin_company_context';

// ===============================
// ✅ Company resolver (sem te jogar pro login)
// ===============================
async function resolveCompanyIdOrThrow(admin: any): Promise<string> {
    const cookieStore = await cookies();
    const fromCookie = cookieStore.get(COMPANY_COOKIE_NAME)?.value;
    if (fromCookie) return fromCookie;

    const fromAdmin =
        (typeof admin?.companyId === 'string' && admin.companyId) ||
        (typeof admin?.company?.id === 'string' && admin.company.id);
    if (fromAdmin) return fromAdmin;

    const userId =
        (typeof admin?.userId === 'string' && admin.userId) ||
        (typeof admin?.id === 'string' && admin.id) ||
        (typeof admin?.sub === 'string' && admin.sub);

    if (!userId) {
        throw new Error(
            'Não consegui resolver o userId do admin para achar a company.'
        );
    }

    const membership = await prisma.companyMember.findFirst({
        where: { userId, isActive: true },
        select: { companyId: true },
        orderBy: { createdAt: 'asc' } as any,
    });

    if (!membership?.companyId) {
        throw new Error(
            `Company não definida para este admin. (cookie "${COMPANY_COOKIE_NAME}" ausente e sem membership ativa).`
        );
    }

    return membership.companyId;
}

// ===============================
// Timezone helpers (SP)
// ===============================
function getSaoPauloYMD(date: Date): { y: number; m: number; d: number } {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: SAO_PAULO_TIMEZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const parts = formatter.formatToParts(date);
    const d = Number(parts.find((p) => p.type === 'day')?.value ?? '1');
    const m = Number(parts.find((p) => p.type === 'month')?.value ?? '1');
    const y = Number(parts.find((p) => p.type === 'year')?.value ?? '1970');
    return { y, m, d };
}

// 00:00 em SP (UTC-03) = 03:00 UTC
function startOfMonthSP(date: Date): Date {
    const { y, m } = getSaoPauloYMD(date);
    return new Date(Date.UTC(y, m - 1, 1, 3, 0, 0));
}

function endOfMonthSP(date: Date): Date {
    const { y, m } = getSaoPauloYMD(date);
    const nextMonth = new Date(Date.UTC(y, m, 1, 3, 0, 0));
    return new Date(nextMonth.getTime() - 1);
}

// ===============================
// Unidade (mesma regra dos outros)
// ===============================
async function resolveUnitScope(admin: {
    unitId: string | null;
    canSeeAllUnits: boolean;
}) {
    if (!admin.canSeeAllUnits) return admin.unitId;

    const cookieStore = await cookies();
    const cookieValue =
        cookieStore.get(UNIT_COOKIE_NAME)?.value ?? UNIT_ALL_VALUE;

    if (!cookieValue || cookieValue === UNIT_ALL_VALUE) return null;
    return cookieValue;
}

function whereAppointmentUnit(unitId: string | null) {
    return unitId ? { unitId } : {};
}

type UnitOption = { id: string; name: string };

type CompareMode = 'prev_month' | 'prev_year';
function safeCompareMode(raw?: string): CompareMode {
    return raw === 'prev_year' ? 'prev_year' : 'prev_month';
}
function compareLabel(mode: CompareMode) {
    return mode === 'prev_year' ? 'ano anterior' : 'mês anterior';
}

function formatPercent(value: number) {
    if (!Number.isFinite(value)) return '—';
    return `${Math.round(value)}%`;
}
function safeDiv(num: number, den: number) {
    if (!Number.isFinite(num) || !Number.isFinite(den) || den <= 0) return NaN;
    return num / den;
}
function pct(num: number, den: number) {
    const v = safeDiv(num, den);
    return Number.isFinite(v) ? v * 100 : NaN;
}
function formatSignedPP(pp: number) {
    const sign = pp > 0 ? '+' : '';
    return `${sign}${Math.round(pp)} p.p.`;
}
function formatSignedInt(n: number) {
    const sign = n > 0 ? '+' : '';
    return `${sign}${n}`;
}
function formatDays(value: number) {
    if (!Number.isFinite(value)) return '—';
    return `${Math.round(value)}d`;
}

// ===============================
// UI helper
// ===============================
function FunnelStepCard(props: {
    index: number;
    title: string;
    value: number;
    sub?: string;
    convFromPrevPct?: number; // 0..100
    dropFromPrevPct?: number; // 0..100
}) {
    const conv =
        Number.isFinite(props.convFromPrevPct) && props.index > 0
            ? `${Math.round(props.convFromPrevPct!)}%`
            : null;

    const drop =
        Number.isFinite(props.dropFromPrevPct) && props.index > 0
            ? `${Math.round(props.dropFromPrevPct!)}%`
            : null;

    return (
        <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-label-small text-content-secondary">
                        Etapa {props.index + 1}
                    </p>
                    <p className="text-label-large text-content-primary">
                        {props.title}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-title text-content-primary tabular-nums">
                        {props.value}
                    </p>

                    {conv ? (
                        <p className="text-[11px] text-content-tertiary">
                            Conversão:{' '}
                            <span className="text-content-primary">{conv}</span>
                        </p>
                    ) : (
                        <p className="text-[11px] text-content-tertiary">
                            Base do funil
                        </p>
                    )}

                    {drop ? (
                        <p className="text-[11px] text-content-tertiary">
                            Queda:{' '}
                            <span className="text-content-primary">{drop}</span>
                        </p>
                    ) : null}
                </div>
            </div>

            {props.sub ? (
                <p className="mt-2 text-[11px] text-content-tertiary">
                    {props.sub}
                </p>
            ) : null}
        </div>
    );
}

export default async function AdminReportsFunnelPage({
    searchParams,
}: AdminReportsFunnelPageProps) {
    const session = await requireAdminForModule('REPORTS');

    // ✅ resolve companyId sem depender do cookie (não redireciona pro login)
    const companyId = await resolveCompanyIdOrThrow(session);

    const cookieStore = await cookies();

    if (!session?.canSeeAllUnits && !session?.unitId) {
        throw new Error(
            'Admin de unidade sem unitId definido. Vincule este admin a uma unidade.'
        );
    }

    const unitCookieValue =
        cookieStore.get(UNIT_COOKIE_NAME)?.value ?? UNIT_ALL_VALUE;

    const selectedUnitValue = session?.canSeeAllUnits
        ? unitCookieValue
        : (session?.unitId ?? '');

    const activeUnitId = await resolveUnitScope({
        unitId: session?.unitId ?? null,
        canSeeAllUnits: !!session?.canSeeAllUnits,
    });

    // 🔒 sanity check: unidade pertence à empresa
    if (activeUnitId) {
        const ok = await prisma.unit.findFirst({
            where: { id: activeUnitId, companyId, isActive: true },
            select: { id: true },
        });
        if (!ok) {
            redirect('/admin/reports');
        }
    }

    const { month: monthParam, professionalId, compare } = await searchParams;

    const compareMode = safeCompareMode(compare);

    const referenceDate = monthParam
        ? parse(monthParam, 'yyyy-MM', new Date())
        : new Date();

    const compareDate =
        compareMode === 'prev_year'
            ? subYears(referenceDate, 1)
            : subMonths(referenceDate, 1);

    const monthStart = startOfMonthSP(referenceDate);
    const monthEnd = endOfMonthSP(referenceDate);

    const compareStart = startOfMonthSP(compareDate);
    const compareEnd = endOfMonthSP(compareDate);

    const monthLabel = format(referenceDate, "MMMM 'de' yyyy", {
        locale: ptBR,
    });

    // ===== Unidades (para filtro) ✅ companyId
    let units: UnitOption[] = [];
    let fixedUnitName: string | null = null;

    if (session?.canSeeAllUnits) {
        units = await prisma.unit.findMany({
            where: { companyId, isActive: true },
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });
    } else if (session?.unitId) {
        const u = await prisma.unit.findFirst({
            where: { id: session.unitId, companyId },
            select: { name: true },
        });
        fixedUnitName = u?.name ?? null;
    }

    const ownerHasMultipleUnits = !!session?.canSeeAllUnits && units.length > 1;
    const ownerSingleUnitName =
        !!session?.canSeeAllUnits && units.length === 1 ? units[0]?.name : null;

    const unitLabel = session?.canSeeAllUnits
        ? (ownerSingleUnitName ?? 'Todas as unidades')
        : (fixedUnitName ?? '');

    // ===== Barbeiros ✅ companyId
    const professionals = activeUnitId
        ? await prisma.professional.findMany({
              where: {
                  companyId,
                  isActive: true,
                  units: { some: { unitId: activeUnitId, isActive: true } },
              },
              select: { id: true, name: true },
              orderBy: { name: 'asc' },
          })
        : await prisma.professional.findMany({
              where: { companyId, isActive: true },
              select: { id: true, name: true },
              orderBy: { name: 'asc' },
          });

    const professionalIdSafe =
        professionalId && professionals.some((b) => b.id === professionalId)
            ? professionalId
            : null;

    const selectedProfessionalName = professionalIdSafe
        ? professionals.find((b) => b.id === professionalIdSafe)?.name
        : null;

    // ===============================
    // Dados (PENDING | DONE | CANCELED) ✅ companyId
    // ===============================
    const baseWhere = {
        companyId,
        scheduleAt: { gte: monthStart, lte: monthEnd },
        ...whereAppointmentUnit(activeUnitId),
        ...(professionalIdSafe ? { professionalId: professionalIdSafe } : {}),
    };

    const compareWhere = {
        companyId,
        scheduleAt: { gte: compareStart, lte: compareEnd },
        ...whereAppointmentUnit(activeUnitId),
        ...(professionalIdSafe ? { professionalId: professionalIdSafe } : {}),
    };

    const unitOnlyBaseWhere = {
        companyId,
        scheduleAt: { gte: monthStart, lte: monthEnd },
        ...whereAppointmentUnit(activeUnitId),
    };

    const STATUS_PENDING: AppointmentStatus = 'PENDING';
    const STATUS_DONE: AppointmentStatus = 'DONE';
    const STATUS_CANCELED: AppointmentStatus = 'CANCELED';

    const now = new Date();

    const [
        createdCountBase,
        pendingCountBase,
        doneCountBase,
        canceledCountBase,

        createdCountCompare,
        pendingCountCompare,
        doneCountCompare,
        canceledCountCompare,

        pendingFutureCountBase,
        pendingOverdueCountBase,

        canceledBaseRows,
        createdBaseRows,

        groupByProfessionalStatus,
    ] = await Promise.all([
        prisma.appointment.count({ where: baseWhere }),
        prisma.appointment.count({
            where: { ...baseWhere, status: STATUS_PENDING },
        }),
        prisma.appointment.count({
            where: { ...baseWhere, status: STATUS_DONE },
        }),
        prisma.appointment.count({
            where: { ...baseWhere, status: STATUS_CANCELED },
        }),

        prisma.appointment.count({ where: compareWhere }),
        prisma.appointment.count({
            where: { ...compareWhere, status: STATUS_PENDING },
        }),
        prisma.appointment.count({
            where: { ...compareWhere, status: STATUS_DONE },
        }),
        prisma.appointment.count({
            where: { ...compareWhere, status: STATUS_CANCELED },
        }),

        prisma.appointment.count({
            where: {
                ...baseWhere,
                status: STATUS_PENDING,
                scheduleAt: { gte: now, lte: monthEnd },
            },
        }),
        prisma.appointment.count({
            where: {
                ...baseWhere,
                status: STATUS_PENDING,
                scheduleAt: { gte: monthStart, lt: now },
            },
        }),

        prisma.appointment.findMany({
            where: { ...baseWhere, status: STATUS_CANCELED },
            select: { createdAt: true, scheduleAt: true },
        }),
        prisma.appointment.findMany({
            where: { ...baseWhere },
            select: { createdAt: true, scheduleAt: true },
        }),

        prisma.appointment.groupBy({
            by: ['professionalId', 'status'],
            where: unitOnlyBaseWhere,
            _count: { _all: true },
        }),
    ]);

    // KPIs %
    const completionPctBase = pct(doneCountBase, createdCountBase);
    const cancelPctBase = pct(canceledCountBase, createdCountBase);
    const pendingPctBase = pct(pendingCountBase, createdCountBase);

    const completionPctCompare = pct(doneCountCompare, createdCountCompare);
    const cancelPctCompare = pct(canceledCountCompare, createdCountCompare);
    const pendingPctCompare = pct(pendingCountCompare, createdCountCompare);

    const completionDeltaPP = completionPctBase - completionPctCompare;
    const cancelDeltaPP = cancelPctBase - cancelPctCompare;
    const pendingDeltaPP = pendingPctBase - pendingPctCompare;

    // Pendentes: futuros vs vencidos
    const pendingFuturePctBase = pct(pendingFutureCountBase, createdCountBase);
    const pendingOverduePctBase = pct(
        pendingOverdueCountBase,
        createdCountBase
    );

    // Tempo médio de antecedência (criados -> data agendada)
    const leadTimesAllDays = createdBaseRows
        .map((r) => (r.scheduleAt.getTime() - r.createdAt.getTime()) / 86400000)
        .filter((v) => Number.isFinite(v));

    const avgLeadTimeDays =
        leadTimesAllDays.length > 0
            ? leadTimesAllDays.reduce((a, b) => a + b, 0) /
              leadTimesAllDays.length
            : NaN;

    // “Tempo até perder”: antecedência nos cancelados (criação → data agendada)
    const leadTimesCancelDays = canceledBaseRows
        .map((r) => (r.scheduleAt.getTime() - r.createdAt.getTime()) / 86400000)
        .filter((v) => Number.isFinite(v));

    const avgCancelLeadTimeDays =
        leadTimesCancelDays.length > 0
            ? leadTimesCancelDays.reduce((a, b) => a + b, 0) /
              leadTimesCancelDays.length
            : NaN;

    // Funil principal
    const funnel = [
        {
            key: 'created',
            title: 'Agendamentos criados',
            value: createdCountBase,
        },
        { key: 'done', title: 'Atendimentos realizados', value: doneCountBase },
        {
            key: 'not_done',
            title: 'Não realizados (pendentes + cancelados)',
            value: Math.max(0, createdCountBase - doneCountBase),
        },
    ] as const;

    const funWithRates = funnel.map((s, idx) => {
        const prev = idx === 0 ? null : (funnel[idx - 1]?.value ?? 0);
        const conv = idx === 0 ? NaN : pct(s.value, prev ?? 0);
        const drop =
            idx === 0
                ? NaN
                : pct(Math.max(0, (prev ?? 0) - s.value), prev ?? 0);
        return { ...s, idx, conv, drop };
    });

    // ===============================
    // Ranking por profissional (unidade)
    // ===============================
    type ProfessionalRankRow = {
        professionalId: string;
        professionalName: string;
        created: number;
        done: number;
        canceled: number;
        pending: number;
        pendingOverdue: number;
        donePct: number;
        cancelPct: number;
    };

    const professionalNameById = new Map(
        professionals.map((b) => [b.id, b.name])
    );

    const countsByProfessional = new Map<
        string,
        { created: number; done: number; canceled: number; pending: number }
    >();

    for (const g of groupByProfessionalStatus) {
        const pId = g.professionalId;
        if (!pId) continue;

        const curr = countsByProfessional.get(pId) ?? {
            created: 0,
            done: 0,
            canceled: 0,
            pending: 0,
        };

        const c = (g._count as any)?._all ?? 0;

        curr.created += c;

        if (g.status === STATUS_DONE) curr.done += c;
        if (g.status === STATUS_CANCELED) curr.canceled += c;
        if (g.status === STATUS_PENDING) curr.pending += c;

        countsByProfessional.set(pId, curr);
    }

    // pendentes vencidos por barbeiro (query única, agrega em JS)
    const overduePendingByBarber =
        (await prisma.appointment.findMany({
            where: {
                ...unitOnlyBaseWhere,
                status: STATUS_PENDING,
                scheduleAt: { gte: monthStart, lt: now },
                professionalId: { not: null },
            },
            select: { professionalId: true },
        })) ?? [];

    const overdueCountByProfessional = new Map<string, number>();
    for (const a of overduePendingByBarber) {
        if (!a.professionalId) continue;
        overdueCountByProfessional.set(
            a.professionalId,
            (overdueCountByProfessional.get(a.professionalId) ?? 0) + 1
        );
    }

    let rankingRows: ProfessionalRankRow[] = [];

    if (professionalIdSafe) {
        const base = countsByProfessional.get(professionalIdSafe) ?? {
            created: 0,
            done: 0,
            canceled: 0,
            pending: 0,
        };

        const created = base.created;
        const done = base.done;
        const canceled = base.canceled;
        const pending = base.pending;

        rankingRows = [
            {
                professionalId: professionalIdSafe,
                professionalName:
                    professionalNameById.get(professionalIdSafe) ?? '—',
                created,
                done,
                canceled,
                pending,
                pendingOverdue:
                    overdueCountByProfessional.get(professionalIdSafe) ?? 0,
                donePct: pct(done, created),
                cancelPct: pct(canceled, created),
            },
        ];
    } else {
        rankingRows = professionals.map((b) => {
            const base = countsByProfessional.get(b.id) ?? {
                created: 0,
                done: 0,
                canceled: 0,
                pending: 0,
            };

            const created = base.created;
            const done = base.done;
            const canceled = base.canceled;
            const pending = base.pending;

            return {
                professionalId: b.id,
                professionalName: b.name,
                created,
                done,
                canceled,
                pending,
                pendingOverdue: overdueCountByProfessional.get(b.id) ?? 0,
                donePct: pct(done, created),
                cancelPct: pct(canceled, created),
            };
        });

        rankingRows.sort((a, b) => {
            const aHas = a.created > 0;
            const bHas = b.created > 0;
            if (aHas !== bHas) return aHas ? -1 : 1;

            const aDone = Number.isFinite(a.donePct) ? a.donePct : 999999;
            const bDone = Number.isFinite(b.donePct) ? b.donePct : 999999;
            if (aDone !== bDone) return aDone - bDone;

            return (b.pendingOverdue ?? 0) - (a.pendingOverdue ?? 0);
        });
    }

    // ===============================
    // Insights automáticos (texto)
    // ===============================
    const insights: string[] = [];

    if (createdCountBase === 0) {
        insights.push('Sem agendamentos no período selecionado.');
    } else {
        if (pendingOverdueCountBase > 0) {
            insights.push(
                `${pendingOverdueCountBase} agendamento(s) pendente(s) já passaram do horário (provável “falta de baixa”).`
            );
        }

        if (
            Number.isFinite(pendingOverduePctBase) &&
            pendingOverduePctBase >= 10
        ) {
            insights.push(
                `Pendentes vencidos representam ${formatPercent(
                    pendingOverduePctBase
                )} do total criado. Isso costuma ser processo (não é só demanda).`
            );
        }

        if (Number.isFinite(cancelPctBase) && cancelPctBase >= 15) {
            insights.push(
                `Cancelamento alto (${formatPercent(
                    cancelPctBase
                )}). Vale revisar política, comunicação e lembretes.`
            );
        }

        if (
            Number.isFinite(completionPctBase) &&
            completionPctBase < 60 &&
            createdCountBase >= 20
        ) {
            insights.push(
                `A taxa de atendimentos realizados está em ${formatPercent(
                    completionPctBase
                )}. Bom alvo: subir isso antes de investir em mais tráfego.`
            );
        }

        if (leadTimesAllDays.length > 0 && Number.isFinite(avgLeadTimeDays)) {
            insights.push(
                `Em média, os clientes agendam com ${formatDays(
                    avgLeadTimeDays
                )} de antecedência.`
            );
        }

        if (
            leadTimesCancelDays.length > 0 &&
            Number.isFinite(avgCancelLeadTimeDays)
        ) {
            insights.push(
                `Nos cancelamentos, a antecedência média (criação → data agendada) é ${formatDays(
                    avgCancelLeadTimeDays
                )}.`
            );
        }

        if (!professionalIdSafe && rankingRows.length > 0) {
            const worst = rankingRows.find((r) => r.created > 0) ?? null;
            if (worst) {
                insights.push(
                    `Ponto de atenção: ${worst.professionalName} tem ${formatPercent(
                        worst.donePct
                    )} de atendimentos realizados no mês (entre os profissionais com agendamentos).`
                );
            }
        }
    }

    const limitedInsights = insights.slice(0, 5);

    return (
        <div className="space-y-6 max-w-7xl">
            <header className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-title text-content-primary">
                        Funil de agendamento
                    </h1>

                    <Button variant="outline" asChild>
                        <Link href="/admin/report">Voltar</Link>
                    </Button>
                </div>

                <div
                    className={cn(
                        'rounded-xl border border-border-primary bg-background-tertiary p-3'
                    )}
                >
                    <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                        <div className="w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2">
                            {ownerHasMultipleUnits ? (
                                <UnitFilter
                                    units={units}
                                    value={selectedUnitValue}
                                />
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-label-small text-content-secondary">
                                        Unidade
                                    </p>
                                    <div
                                        className={cn(
                                            'h-12 w-full rounded-md border border-border-primary',
                                            'bg-background-secondary px-3',
                                            'flex items-center',
                                            'text-content-primary text-sm'
                                        )}
                                        title={unitLabel}
                                    >
                                        <span className="truncate">
                                            {unitLabel}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2">
                            <ProfessionalFilter
                                professionals={professionals}
                                value={professionalIdSafe}
                            />
                        </div>

                        <div className="w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2">
                            <CompareWithFilter value={compareMode} />
                        </div>

                        <div className="justify-self-end">
                            <MonthPicker />
                        </div>
                    </div>
                </div>
            </header>

            {/* KPIs */}
            <section className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-3">
                    <p className="text-label-small text-content-secondary">
                        Agendamentos criados
                    </p>
                    <p className="text-title text-content-primary tabular-nums">
                        {createdCountBase}
                    </p>
                    <p className="mt-1 text-[11px] text-content-tertiary">
                        Total do período (inclui pendentes e cancelados)
                    </p>
                    <p className="mt-1 text-[11px] text-content-tertiary">
                        Comparativo: {createdCountCompare} (
                        {formatSignedInt(
                            createdCountBase - createdCountCompare
                        )}
                        )
                    </p>
                </div>

                <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-3">
                    <p className="text-label-small text-content-secondary">
                        Taxa de atendimento realizado
                    </p>
                    <p className="text-title text-content-primary tabular-nums">
                        {formatPercent(completionPctBase)}
                    </p>
                    <p className="mt-1 text-[11px] text-content-tertiary">
                        Realizados:{' '}
                        <span className="text-content-primary">
                            {doneCountBase}
                        </span>
                    </p>
                    <p className="mt-1 text-[11px] text-content-tertiary">
                        vs {compareLabel(compareMode)}:{' '}
                        {Number.isFinite(completionDeltaPP)
                            ? formatSignedPP(completionDeltaPP)
                            : '—'}
                    </p>
                </div>

                <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-3">
                    <p className="text-label-small text-content-secondary">
                        Taxa de cancelamento
                    </p>
                    <p className="text-title text-content-primary tabular-nums">
                        {formatPercent(cancelPctBase)}
                    </p>
                    <p className="mt-1 text-[11px] text-content-tertiary">
                        Cancelados:{' '}
                        <span className="text-content-primary">
                            {canceledCountBase}
                        </span>
                    </p>
                    <p className="mt-1 text-[11px] text-content-tertiary">
                        vs {compareLabel(compareMode)}:{' '}
                        {Number.isFinite(cancelDeltaPP)
                            ? formatSignedPP(cancelDeltaPP)
                            : '—'}
                    </p>
                </div>

                <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-3">
                    <p className="text-label-small text-content-secondary">
                        Pendentes (ainda não atendidos)
                    </p>
                    <p className="text-title text-content-primary tabular-nums">
                        {formatPercent(pendingPctBase)}
                    </p>
                    <p className="mt-1 text-[11px] text-content-tertiary">
                        Pendentes:{' '}
                        <span className="text-content-primary">
                            {pendingCountBase}
                        </span>
                    </p>
                    <p className="mt-1 text-[11px] text-content-tertiary">
                        vs {compareLabel(compareMode)}:{' '}
                        {Number.isFinite(pendingDeltaPP)
                            ? formatSignedPP(pendingDeltaPP)
                            : '—'}
                    </p>
                </div>
            </section>

            {/* Funil */}
            <section className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-label-large text-content-primary">
                            Funil (mês)
                        </p>
                        <p className="text-paragraph-small text-content-tertiary">
                            A conversão principal é “Agendamentos criados →
                            Atendimentos realizados”. O restante aparece como
                            “não realizados”.
                        </p>
                    </div>

                    <div className="text-[11px] text-content-tertiary text-right">
                        <div>Criados: {createdCountBase}</div>
                        <div>Realizados: {doneCountBase}</div>
                    </div>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    {funWithRates.map((s) => (
                        <FunnelStepCard
                            key={s.key}
                            index={s.idx}
                            title={s.title}
                            value={s.value}
                            convFromPrevPct={s.conv}
                            dropFromPrevPct={s.drop}
                            sub={
                                s.key === 'created'
                                    ? 'Tudo que entrou na agenda no período.'
                                    : s.key === 'done'
                                      ? 'Atendimentos finalizados (viraram receita).'
                                      : 'O que ficou pelo caminho: pendentes + cancelados.'
                            }
                        />
                    ))}
                </div>

                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-left text-[12px]">
                        <thead>
                            <tr className="border-b border-border-primary text-content-secondary">
                                <th className="py-2 pr-3">Etapa</th>
                                <th className="py-2 pr-3 text-right">Qtd</th>
                                <th className="py-2 pr-3 text-right">
                                    Conversão
                                </th>
                                <th className="py-2 pr-3 text-right">Queda</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funWithRates.map((s) => (
                                <tr
                                    key={`row-${s.key}`}
                                    className="border-b border-border-primary/60 last:border-0"
                                >
                                    <td className="py-2 pr-3 text-content-primary font-medium">
                                        {s.title}
                                    </td>
                                    <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                        {s.value}
                                    </td>
                                    <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                        {s.idx === 0
                                            ? '—'
                                            : formatPercent(s.conv)}
                                    </td>
                                    <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                        {s.idx === 0
                                            ? '—'
                                            : formatPercent(s.drop)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Motivos / Quebra: Pendentes futuros vs vencidos + Tempo médio */}
            <section className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                    <p className="text-label-large text-content-primary">
                        Pendentes: futuros vs vencidos
                    </p>
                    <p className="text-paragraph-small text-content-tertiary">
                        Se “vencidos” estiver alto, geralmente é falta de baixa
                        (atendimento aconteceu mas ficou pendente).
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-border-primary bg-background-secondary px-4 py-3">
                            <p className="text-label-small text-content-secondary">
                                Agendados no futuro
                            </p>
                            <p className="text-title text-content-primary tabular-nums">
                                {pendingFutureCountBase}
                            </p>
                            <p className="mt-1 text-[11px] text-content-tertiary">
                                {formatPercent(pendingFuturePctBase)} do total
                                criado
                            </p>
                        </div>

                        <div className="rounded-xl border border-border-primary bg-background-secondary px-4 py-3">
                            <p className="text-label-small text-content-secondary">
                                Pendentes vencidos
                            </p>
                            <p className="text-title text-content-primary tabular-nums">
                                {pendingOverdueCountBase}
                            </p>
                            <p className="mt-1 text-[11px] text-content-tertiary">
                                {formatPercent(pendingOverduePctBase)} do total
                                criado
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-[12px]">
                            <thead>
                                <tr className="border-b border-border-primary text-content-secondary">
                                    <th className="py-2 pr-3">Leitura</th>
                                    <th className="py-2 pr-3 text-right">
                                        Qtd
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border-primary/60">
                                    <td className="py-2 pr-3 text-content-primary font-medium">
                                        Pendentes futuros (ok, agenda pra
                                        frente)
                                    </td>
                                    <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                        {pendingFutureCountBase}
                                    </td>
                                </tr>
                                <tr className="border-b border-border-primary/60">
                                    <td className="py-2 pr-3 text-content-primary font-medium">
                                        Pendentes vencidos (provável baixa não
                                        feita)
                                    </td>
                                    <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                        {pendingOverdueCountBase}
                                    </td>
                                </tr>
                                <tr className="border-t border-border-primary">
                                    <td className="py-2 pr-3 text-content-primary font-medium">
                                        Total pendentes
                                    </td>
                                    <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                        {pendingCountBase}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                    <p className="text-label-large text-content-primary">
                        Tempo e comportamento (sinal de processo)
                    </p>
                    <p className="text-paragraph-small text-content-tertiary">
                        Ajuda a entender com quanta antecedência as pessoas
                        agendam e como os cancelamentos se comportam.
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-border-primary bg-background-secondary px-4 py-3">
                            <p className="text-label-small text-content-secondary">
                                Antecedência média (criados)
                            </p>
                            <p className="text-title text-content-primary tabular-nums">
                                {formatDays(avgLeadTimeDays)}
                            </p>
                            <p className="mt-1 text-[11px] text-content-tertiary">
                                Média de dias entre criação e data agendada
                            </p>
                        </div>

                        <div className="rounded-xl border border-border-primary bg-background-secondary px-4 py-3">
                            <p className="text-label-small text-content-secondary">
                                Antecedência média (cancelados)
                            </p>
                            <p className="text-title text-content-primary tabular-nums">
                                {formatDays(avgCancelLeadTimeDays)}
                            </p>
                            <p className="mt-1 text-[11px] text-content-tertiary">
                                Se for muito alta, o cancelamento pode estar
                                “longe do compromisso”
                            </p>
                        </div>
                    </div>

                    <div
                        className={cn(
                            'mt-4 rounded-lg border border-border-primary bg-background-secondary p-3'
                        )}
                    >
                        <p className="text-[12px] text-content-primary font-medium">
                            Leitura rápida
                        </p>
                        <p className="mt-1 text-[11px] text-content-tertiary">
                            • Se a antecedência média é alta, dá para trabalhar
                            lembretes e reengajamento.
                            <br />• Se pendentes vencidos são altos, o principal
                            ganho é processo: “dar baixa” no fim do dia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Ranking por profissional */}
            <section className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-label-large text-content-primary">
                            Onde está o gargalo (por profissional)
                        </p>
                        <p className="text-paragraph-small text-content-tertiary">
                            Ordenado por pior taxa de atendimento realizado (e
                            depois por mais pendentes vencidos).
                        </p>
                    </div>
                    <div className="text-[11px] text-content-tertiary text-right">
                        <div>Unidade: {unitLabel}</div>
                        <div>
                            {selectedProfessionalName
                                ? `Filtro: ${selectedProfessionalName} • `
                                : ''}
                            Mês: {monthLabel}
                        </div>
                    </div>
                </div>

                {rankingRows.length === 0 ? (
                    <div
                        className={cn(
                            'mt-4 h-32 w-full rounded-lg border border-border-primary',
                            'bg-background-secondary',
                            'flex items-center justify-center',
                            'text-content-tertiary text-sm'
                        )}
                    >
                        Sem dados para o período.
                    </div>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-[12px]">
                            <thead>
                                <tr className="border-b border-border-primary text-content-secondary">
                                    <th className="py-2 pr-3">Profissional</th>
                                    <th className="py-2 pr-3 text-right">
                                        Criados
                                    </th>
                                    <th className="py-2 pr-3 text-right">
                                        Realizados
                                    </th>
                                    <th className="py-2 pr-3 text-right">
                                        % realizados
                                    </th>
                                    <th className="py-2 pr-3 text-right">
                                        Cancelados
                                    </th>
                                    <th className="py-2 pr-3 text-right">
                                        % cancel.
                                    </th>
                                    <th className="py-2 pr-3 text-right">
                                        Pend. vencidos
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankingRows.map((r) => (
                                    <tr
                                        key={r.professionalId}
                                        className="border-b border-border-primary/60 last:border-0"
                                    >
                                        <td className="py-2 pr-3 text-content-primary font-medium whitespace-nowrap">
                                            {r.professionalName}
                                            {professionalIdSafe &&
                                            r.professionalId ===
                                                professionalIdSafe ? (
                                                <span className="ml-2 text-[11px] text-content-tertiary">
                                                    (selecionado)
                                                </span>
                                            ) : null}
                                        </td>
                                        <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                            {r.created}
                                        </td>
                                        <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                            {r.done}
                                        </td>
                                        <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                            {formatPercent(r.donePct)}
                                        </td>
                                        <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                            {r.canceled}
                                        </td>
                                        <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                            {formatPercent(r.cancelPct)}
                                        </td>
                                        <td className="py-2 pr-3 text-content-primary text-right tabular-nums">
                                            {r.pendingOverdue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* Insights automáticos */}
            <section className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-label-large text-content-primary">
                    Resumo do mês
                </p>
                <p className="text-paragraph-small text-content-tertiary">
                    Um diagnóstico curto, para bater o olho e saber o que fazer.
                </p>

                {limitedInsights.length === 0 ? (
                    <div
                        className={cn(
                            'mt-4 h-24 w-full rounded-lg border border-border-primary',
                            'bg-background-secondary',
                            'flex items-center justify-center',
                            'text-content-tertiary text-sm'
                        )}
                    >
                        Sem insights no momento.
                    </div>
                ) : (
                    <ul className="mt-4 space-y-2 text-[12px] text-content-primary">
                        {limitedInsights.map((t, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="text-content-tertiary">•</span>
                                <span>{t}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
