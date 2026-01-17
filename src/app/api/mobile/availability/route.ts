// src/app/api/mobile/availability/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAppJwt } from '@/lib/app-jwt';

export const runtime = 'nodejs';

type MobileTokenPayload = {
    sub: string;
    role?: 'CLIENT' | 'BARBER' | 'ADMIN';
    email?: string;
    name?: string | null;
    companyId: string;
};

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
}

async function requireMobileAuth(req: Request): Promise<MobileTokenPayload> {
    const auth = req.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    if (!token) throw new Error('missing_token');

    const payload = (await verifyAppJwt(token)) as any;

    const companyId =
        typeof payload?.companyId === 'string'
            ? String(payload.companyId).trim()
            : '';

    if (!companyId) throw new Error('missing_company_id');

    return { ...(payload as any), companyId } as MobileTokenPayload;
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

function asInt(v: string | null) {
    if (!v) return null;
    const n = Number(v);
    if (!Number.isFinite(n) || n <= 0) return null;
    return Math.round(n);
}

function pad2(n: number) {
    return String(n).padStart(2, '0');
}

function hhmmFromMinutes(total: number) {
    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${pad2(h)}:${pad2(m)}`;
}

function hhmm(d: Date) {
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function isSameLocalDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function normalizeHHMM(v: unknown) {
    const s = String(v ?? '').trim();
    if (!s) return '';
    const m = s.match(/^(\d{1,2}):(\d{2})/);
    if (!m) return '';
    return `${pad2(Number(m[1]))}:${m[2]}`;
}

function timeToMinutes(hhmmStr: string) {
    const m = String(hhmmStr ?? '').match(/^(\d{2}):(\d{2})$/);
    if (!m) return Number.POSITIVE_INFINITY;
    return Number(m[1]) * 60 + Number(m[2]);
}

function buildSlotsForInterval(args: {
    startTime: string; // HH:mm
    endTime: string; // HH:mm  (fim do expediente, não último slot)
    durationMin: number;
    stepMin: number;
}) {
    const start = timeToMinutes(normalizeHHMM(args.startTime));
    const end = timeToMinutes(normalizeHHMM(args.endTime));

    const durationMin =
        Number.isFinite(args.durationMin) && args.durationMin > 0
            ? args.durationMin
            : 30;

    const stepMin =
        Number.isFinite(args.stepMin) && args.stepMin > 0 ? args.stepMin : 30;

    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
        return [];
    }

    // ✅ REGRA: o serviço precisa terminar ATÉ o fim do intervalo
    // então o último início permitido é (end - duration)
    const latestStart = end - durationMin;

    if (!Number.isFinite(latestStart) || latestStart < start) {
        return [];
    }

    const out: string[] = [];
    for (let t = start; t <= latestStart; t += stepMin) {
        out.push(hhmmFromMinutes(t));
    }
    return out;
}

/**
 * ✅ weekday (0=Dom..6=Sáb) em São Paulo.
 */
function getWeekdayInSaoPaulo(date: Date) {
    const wd = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Sao_Paulo',
        weekday: 'short',
    }).format(date);

    const map: Record<string, number> = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
    };

    return map[String(wd)] ?? date.getUTCDay();
}

/**
 * ✅ Range UTC do "dia em São Paulo" (serve pra daily availability e conflitos).
 */
function buildSaoPauloDayUtcRange(dateISO: string) {
    const d = new Date(dateISO);
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(d);

    const get = (type: string) =>
        parts.find((p) => p.type === type)?.value ?? '';

    const y = Number(get('year'));
    const m = Number(get('month'));
    const day = Number(get('day'));

    if (!y || !m || !day) {
        const fallback = new Date(d);
        fallback.setHours(0, 0, 0, 0);
        const end = new Date(d);
        end.setHours(23, 59, 59, 999);
        return {
            startUtc: fallback,
            endUtc: end,
            dateKey: null as string | null,
        };
    }

    // SP -03:00 => 00:00 SP = 03:00Z | 23:59 SP = 02:59Z do dia seguinte
    const startUtc = new Date(Date.UTC(y, m - 1, day, 3, 0, 0, 0));
    const endUtc = new Date(Date.UTC(y, m - 1, day + 1, 2, 59, 59, 999));
    const dateKey = `${y}-${pad2(m)}-${pad2(day)}`;

    return { startUtc, endUtc, dateKey };
}

type Interval = { startTime: string; endTime: string };

function normalizeIntervals(list: Interval[]) {
    return list
        .map((it) => ({
            startTime: normalizeHHMM(it.startTime),
            endTime: normalizeHHMM(it.endTime),
        }))
        .filter((it) => it.startTime && it.endTime)
        .map((it) => {
            const s = timeToMinutes(it.startTime);
            const e = timeToMinutes(it.endTime);
            return { ...it, _s: s, _e: e };
        })
        .filter(
            (it) =>
                Number.isFinite(it._s) &&
                Number.isFinite(it._e) &&
                it._e > it._s
        )
        .sort((a, b) => a._s - b._s);
}

/**
 * ✅ Interseção de intervalos (prof ∩ unidade), retornando lista de overlaps.
 */
function intersectIntervals(prof: Interval[], unit: Interval[]): Interval[] {
    const A = normalizeIntervals(prof);
    const B = normalizeIntervals(unit);
    const out: Interval[] = [];

    if (!A.length || !B.length) return out;

    let i = 0;
    let j = 0;

    while (i < A.length && j < B.length) {
        const a = A[i];
        const b = B[j];

        const start = Math.max(a._s, b._s);
        const end = Math.min(a._e, b._e);

        if (end > start) {
            out.push({
                startTime: hhmmFromMinutes(start),
                endTime: hhmmFromMinutes(end),
            });
        }

        if (a._e < b._e) i++;
        else j++;
    }

    return out;
}

export async function GET(req: Request) {
    const headers = corsHeaders();

    try {
        const payload = await requireMobileAuth(req);
        const companyId = payload.companyId;

        // ✅ Mantém padrão do app: só cliente consulta disponibilidade do fluxo mobile
        if (payload.role && payload.role !== 'CLIENT') {
            return NextResponse.json(
                { ok: false, error: 'Sem permissão' },
                { status: 403, headers }
            );
        }

        const { searchParams } = new URL(req.url);

        // ✅ compat: aceitar professionalId OU barberId (legado)
        const professionalId = String(
            searchParams.get('professionalId') ??
                searchParams.get('barberId') ??
                ''
        ).trim();

        const unitId = String(searchParams.get('unitId') ?? '').trim();
        const dateISO = String(searchParams.get('dateISO') ?? '').trim();

        const appointmentId = String(
            searchParams.get('appointmentId') ?? ''
        ).trim();

        const serviceId = String(searchParams.get('serviceId') ?? '').trim();
        const serviceDurationInMinutesParam = asInt(
            searchParams.get('serviceDurationInMinutes')
        );

        if (!professionalId || !unitId || !dateISO) {
            return NextResponse.json(
                {
                    ok: false,
                    error: 'Parâmetros obrigatórios: professionalId (ou barberId), unitId e dateISO',
                },
                { status: 400, headers }
            );
        }

        const date = new Date(dateISO);
        if (Number.isNaN(date.getTime())) {
            return NextResponse.json(
                { ok: false, error: 'dateISO inválido' },
                { status: 400, headers }
            );
        }

        const unit = await prisma.unit.findFirst({
            where: { id: unitId, companyId, isActive: true },
            select: { id: true },
        });

        if (!unit) {
            return NextResponse.json(
                { ok: false, error: 'Unidade inválida' },
                { status: 404, headers }
            );
        }

        const prof = await prisma.professional.findFirst({
            where: { id: professionalId, companyId, isActive: true },
            select: { id: true },
        });

        if (!prof) {
            return NextResponse.json(
                { ok: false, error: 'Profissional inválido' },
                { status: 404, headers }
            );
        }

        let serviceDurationInMinutes = serviceDurationInMinutesParam;

        if (!serviceDurationInMinutes && serviceId) {
            const svc = await prisma.service.findFirst({
                where: { id: serviceId, companyId, isActive: true },
                select: { durationMinutes: true },
            });

            if (!svc) {
                return NextResponse.json(
                    { ok: false, error: 'Serviço não encontrado' },
                    { status: 404, headers }
                );
            }

            serviceDurationInMinutes =
                Math.max(1, Number(svc?.durationMinutes ?? 0)) || 30;
        }

        if (!serviceDurationInMinutes) {
            return NextResponse.json(
                {
                    ok: false,
                    error: 'Informe serviceId ou serviceDurationInMinutes para calcular os horários.',
                },
                { status: 400, headers }
            );
        }

        const profUnit = await prisma.professionalUnit.findFirst({
            where: {
                companyId,
                unitId,
                professionalId,
                isActive: true,
            },
            select: { id: true },
        });

        if (!profUnit) {
            return NextResponse.json(
                {
                    ok: false,
                    error: 'Profissional não vinculado a esta unidade',
                },
                { status: 400, headers }
            );
        }

        const weekday = getWeekdayInSaoPaulo(date);
        const {
            startUtc: dayStartUtc,
            endUtc: dayEndUtc,
            dateKey,
        } = buildSaoPauloDayUtcRange(dateISO);

        /* ---------------------------------------------------------
         * 1) PROFISSIONAL: weekly + daily exception (DAY_OFF/CUSTOM)
         * ---------------------------------------------------------*/
        const weeklyProf =
            await prisma.professionalWeeklyAvailability.findFirst({
                where: {
                    companyId,
                    professionalId,
                    unitId,
                    weekday,
                    isActive: true,
                },
                include: { intervals: true },
            });

        const weeklyProfIntervals: Interval[] = (weeklyProf?.intervals ?? [])
            .map((it) => ({ startTime: it.startTime, endTime: it.endTime }))
            .map((it) => ({
                startTime: normalizeHHMM(it.startTime),
                endTime: normalizeHHMM(it.endTime),
            }))
            .filter((it) => it.startTime && it.endTime);

        const dailyProf = await prisma.professionalDailyAvailability.findFirst({
            where: {
                companyId,
                professionalId,
                unitId,
                date: { gte: dayStartUtc, lte: dayEndUtc },
            },
            include: { intervals: true },
        });

        let profSource: 'WEEKLY' | 'DAILY_CUSTOM' | 'DAILY_DAY_OFF' | 'NONE' =
            'NONE';
        let profIntervals: Interval[] = [];

        if (dailyProf?.type === 'DAY_OFF') {
            profSource = 'DAILY_DAY_OFF';
            profIntervals = [];
        } else if (dailyProf?.type === 'CUSTOM') {
            profSource = 'DAILY_CUSTOM';
            profIntervals = (dailyProf?.intervals ?? [])
                .map((it) => ({ startTime: it.startTime, endTime: it.endTime }))
                .map((it) => ({
                    startTime: normalizeHHMM(it.startTime),
                    endTime: normalizeHHMM(it.endTime),
                }))
                .filter((it) => it.startTime && it.endTime);
        } else if (weeklyProfIntervals.length) {
            profSource = 'WEEKLY';
            profIntervals = weeklyProfIntervals;
        } else {
            profSource = 'NONE';
            profIntervals = [];
        }

        /* ---------------------------------------------------------
         * 2) UNIDADE: weekly + daily exception (isClosed / custom intervals)
         *    Quem MANDA é a UNIDADE.
         * ---------------------------------------------------------*/
        const weeklyUnit = await prisma.unitWeeklyAvailability.findFirst({
            where: {
                companyId,
                unitId,
                weekday,
                isActive: true,
            },
            include: { intervals: true },
        });

        const weeklyUnitIntervals: Interval[] = (weeklyUnit?.intervals ?? [])
            .map((it) => ({ startTime: it.startTime, endTime: it.endTime }))
            .map((it) => ({
                startTime: normalizeHHMM(it.startTime),
                endTime: normalizeHHMM(it.endTime),
            }))
            .filter((it) => it.startTime && it.endTime);

        const dailyUnit = await prisma.unitDailyAvailability.findFirst({
            where: {
                companyId,
                unitId,
                date: { gte: dayStartUtc, lte: dayEndUtc },
            },
            include: { intervals: true },
        });

        let unitSource: 'WEEKLY' | 'DAILY_CLOSED' | 'DAILY_CUSTOM' | 'NONE' =
            'NONE';
        let unitIntervals: Interval[] = [];

        if (dailyUnit?.isClosed === true) {
            unitSource = 'DAILY_CLOSED';
            unitIntervals = [];
        } else if (dailyUnit) {
            unitSource = 'DAILY_CUSTOM';
            unitIntervals = (dailyUnit?.intervals ?? [])
                .map((it) => ({ startTime: it.startTime, endTime: it.endTime }))
                .map((it) => ({
                    startTime: normalizeHHMM(it.startTime),
                    endTime: normalizeHHMM(it.endTime),
                }))
                .filter((it) => it.startTime && it.endTime);
        } else if (weeklyUnitIntervals.length) {
            unitSource = 'WEEKLY';
            unitIntervals = weeklyUnitIntervals;
        } else {
            unitSource = 'NONE';
            unitIntervals = [];
        }

        /* ---------------------------------------------------------
         * 3) Regra final: (profIntervals ∩ unitIntervals)
         * ---------------------------------------------------------*/
        const effectiveIntervals = intersectIntervals(
            profIntervals,
            unitIntervals
        );

        if (!effectiveIntervals.length) {
            return NextResponse.json(
                {
                    ok: true,
                    slots: [],
                    meta: {
                        unitId,
                        professionalId,
                        serviceId: serviceId || null,
                        serviceDurationInMinutes,
                        slotIntervalInMinutes: 30,
                        appointmentId: appointmentId || null,
                        weekday,
                        dateKeySaoPaulo: dateKey,
                        professionalAvailabilitySource: profSource,
                        unitAvailabilitySource: unitSource,
                        hasAvailability: false,
                    },
                },
                { status: 200, headers }
            );
        }

        /* ---------------------------------------------------------
         * 4) Gera slots por intervalo (já respeitando unidade)
         *    ✅ agora com "latestStart = end - duration"
         * ---------------------------------------------------------*/
        const slotSet = new Set<string>();

        for (const it of effectiveIntervals) {
            const intervalSlots = buildSlotsForInterval({
                startTime: it.startTime,
                endTime: it.endTime,
                durationMin: serviceDurationInMinutes,
                stepMin: 30,
            });
            for (const s of intervalSlots) slotSet.add(s);
        }

        let slots = Array.from(slotSet).sort(
            (a, b) => timeToMinutes(a) - timeToMinutes(b)
        );

        /* ---------------------------------------------------------
         * 5) Remove conflitos (appointments no dia SP)
         * ---------------------------------------------------------*/
        const conflicts = await prisma.appointment.findMany({
            where: {
                companyId,
                unitId,
                professionalId,
                status: { not: 'CANCELED' },
                scheduleAt: { gte: dayStartUtc, lte: dayEndUtc },
                ...(appointmentId ? { id: { not: appointmentId } } : {}),
            } as any,
            select: { scheduleAt: true },
        });

        const blocked = new Set<string>(
            conflicts.map((a) => hhmm(new Date(a.scheduleAt as any)))
        );

        slots = slots.filter((t) => !blocked.has(t));

        /* ---------------------------------------------------------
         * 6) Em edição: manter horário atual visível
         * ---------------------------------------------------------*/
        if (appointmentId) {
            const appt = await prisma.appointment.findFirst({
                where: {
                    id: appointmentId,
                    companyId,
                    clientId: payload.sub,
                    status: { not: 'CANCELED' },
                } as any,
                select: {
                    id: true,
                    scheduleAt: true,
                    unitId: true,
                    professionalId: true,
                } as any,
            });

            if (
                appt &&
                String((appt as any).unitId ?? '') === unitId &&
                String((appt as any).professionalId ?? '') === professionalId &&
                isSameLocalDay(new Date((appt as any).scheduleAt), date)
            ) {
                const t = hhmm(new Date((appt as any).scheduleAt));
                if (t && !slots.includes(t)) slots = [t, ...slots];
            }
        }

        return NextResponse.json(
            {
                ok: true,
                slots,
                meta: {
                    unitId,
                    professionalId,
                    serviceId: serviceId || null,
                    serviceDurationInMinutes,
                    slotIntervalInMinutes: 30,
                    appointmentId: appointmentId || null,
                    weekday,
                    dateKeySaoPaulo: dateKey,
                    professionalAvailabilitySource: profSource,
                    unitAvailabilitySource: unitSource,
                    effectiveIntervals,
                    hasAvailability: slots.length > 0,
                },
            },
            { status: 200, headers }
        );
    } catch (err: any) {
        const msg = String(err?.message ?? 'Não autorizado').toLowerCase();

        if (
            msg.includes('missing_token') ||
            msg.includes('missing_company_id') ||
            msg.includes('token') ||
            msg.includes('jwt') ||
            msg.includes('signature') ||
            msg.includes('companyid')
        ) {
            return NextResponse.json(
                { ok: false, error: 'Não autorizado' },
                { status: 401, headers }
            );
        }

        console.error('[api/mobile/availability] error:', err);
        return NextResponse.json(
            { ok: false, error: 'Erro ao buscar disponibilidade' },
            { status: 500, headers }
        );
    }
}
