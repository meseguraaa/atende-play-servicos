// src/app/api/professional/availability/times/route.ts
import { NextResponse, type NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireProfessionalSession } from '@/lib/professional-permissions';
import { ProfessionalDailyAvailabilityType } from '@prisma/client';

function jsonOk(data?: unknown, status = 200) {
    return NextResponse.json({ ok: true, data }, { status });
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error }, { status });
}

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

function parseDateParam(
    dateStr?: string
): { y: number; m: number; d: number } | null {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return null;
    return { y, m, d };
}

function ymdToUtcDateKeyMidday(ymd: { y: number; m: number; d: number }) {
    // ✅ Exceções (professionalDailyAvailability.date) estão armazenadas como UTC 12:00Z do dia
    return new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 12, 0, 0, 0));
}

const SAO_PAULO_UTC_OFFSET_HOURS = 3; // SP = UTC-03 => 00:00 SP = 03:00 UTC

function buildSaoPauloDayUtcRange(ymd: { y: number; m: number; d: number }) {
    const { y, m, d } = ymd;

    const startUtcMs = Date.UTC(
        y,
        m - 1,
        d,
        SAO_PAULO_UTC_OFFSET_HOURS,
        0,
        0,
        0
    );
    const nextDayStartUtcMs = Date.UTC(
        y,
        m - 1,
        d + 1,
        SAO_PAULO_UTC_OFFSET_HOURS,
        0,
        0,
        0
    );

    return {
        startUtc: new Date(startUtcMs),
        endUtc: new Date(nextDayStartUtcMs - 1),
    };
}

function getWeekdayInSaoPaulo(ymd: {
    y: number;
    m: number;
    d: number;
}): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
    const utcMidday = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 12, 0, 0, 0));

    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Sao_Paulo',
        weekday: 'short',
    }).formatToParts(utcMidday);

    const wd = (
        parts.find((p) => p.type === 'weekday')?.value ?? ''
    ).toLowerCase();

    if (wd.startsWith('sun')) return 0;
    if (wd.startsWith('mon')) return 1;
    if (wd.startsWith('tue')) return 2;
    if (wd.startsWith('wed')) return 3;
    if (wd.startsWith('thu')) return 4;
    if (wd.startsWith('fri')) return 5;
    return 6;
}

function isValidTimeHHMM(v: string) {
    return /^\d{2}:\d{2}$/.test(v);
}

function timeToMinutes(t: string) {
    const [hh, mm] = t.split(':').map(Number);
    return hh * 60 + mm;
}

function minutesToHHmm(mins: number) {
    const hh = String(Math.floor(mins / 60)).padStart(2, '0');
    const mm = String(mins % 60).padStart(2, '0');
    return `${hh}:${mm}`;
}

function formatHHmmInSaoPaulo(date: Date) {
    const parts = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).formatToParts(date);

    const hh = parts.find((p) => p.type === 'hour')?.value ?? '00';
    const mm = parts.find((p) => p.type === 'minute')?.value ?? '00';
    return `${hh}:${mm}`;
}

function buildHalfHourSlotsForDuration(
    startTime: string,
    endTime: string,
    durationMinutes: number
) {
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);

    const dur = Math.max(1, Number(durationMinutes || 0));

    const out: string[] = [];
    for (let m = start; m + dur <= end; m += 30) {
        out.push(minutesToHHmm(m));
    }
    return out;
}

function intervalsOverlap(
    aStart: number,
    aEnd: number,
    bStart: number,
    bEnd: number
) {
    // [start, end) overlap
    return aStart < bEnd && bStart < aEnd;
}

/**
 * ✅ Segurança: garante que o profissional está ativo na unidade solicitada.
 * (Profissional pode ter múltiplas unidades, então validamos sempre.)
 */
async function assertProfessionalUnitAccess(args: {
    companyId: string;
    professionalId: string;
    unitId: string;
}) {
    const ok = await prisma.professionalUnit.findFirst({
        where: {
            companyId: args.companyId,
            professionalId: args.professionalId,
            unitId: args.unitId,
            isActive: true,
        },
        select: { id: true },
    });

    return !!ok;
}

export async function GET(req: NextRequest) {
    try {
        const session = await requireProfessionalSession();

        const companyId = normalizeString(session.companyId);
        const professionalIdSession = normalizeString(session.professionalId);
        const userId = normalizeString(session.userId);

        if (!companyId || !professionalIdSession || !userId) {
            return jsonErr('Sessão do profissional inválida.', 401);
        }

        const { searchParams } = new URL(req.url);

        const unitId = normalizeString(searchParams.get('unitId'));
        const professionalIdParam = normalizeString(
            searchParams.get('professionalId')
        );
        const dateStr = normalizeString(searchParams.get('date')); // yyyy-MM-dd
        const serviceId = normalizeString(searchParams.get('serviceId')); // opcional, mas recomendado
        const appointmentId = normalizeString(
            searchParams.get('appointmentId')
        ); // ✅ edição: excluir o próprio agendamento

        if (!unitId) return jsonErr('unitId é obrigatório.', 400);
        if (!dateStr) return jsonErr('date é obrigatório (yyyy-MM-dd).', 400);

        // 🔒 profissionalId vem do session (se vier na query e for diferente, bloqueia)
        if (
            professionalIdParam &&
            professionalIdParam !== professionalIdSession
        ) {
            return jsonErr('professionalId inválido para a sessão.', 403);
        }

        const ymd = parseDateParam(dateStr);
        if (!ymd) return jsonErr('date inválido. Use yyyy-MM-dd.', 400);

        // ✅ valida unidade (tenant + ativa)
        const unit = await prisma.unit.findFirst({
            where: { id: unitId, companyId, isActive: true },
            select: { id: true },
        });
        if (!unit) return jsonErr('Unidade inválida ou inativa.', 404);

        // 🔒 valida que o profissional tem acesso a essa unidade
        const hasAccessToUnit = await assertProfessionalUnitAccess({
            companyId,
            professionalId: professionalIdSession,
            unitId,
        });
        if (!hasAccessToUnit) return jsonErr('Sem acesso a esta unidade.', 403);

        // ✅ se veio appointmentId (edição), valida tenant + ownership
        if (appointmentId) {
            const appt = await prisma.appointment.findFirst({
                where: {
                    id: appointmentId,
                    companyId,
                    professionalId: professionalIdSession,
                },
                select: { id: true },
            });
            if (!appt) return jsonErr('Agendamento inválido para edição.', 404);
        }

        // ✅ duração desejada (do serviço selecionado)
        let desiredDurationMinutes = 30;

        if (serviceId) {
            const svc = await prisma.service.findFirst({
                where: {
                    id: serviceId,
                    companyId,
                    isActive: true,
                    OR: [{ unitId }, { unitId: null }],
                },
                select: { id: true, durationMinutes: true },
            });

            if (!svc)
                return jsonErr('Serviço inválido para esta unidade.', 404);

            desiredDurationMinutes = Math.max(
                1,
                Number(svc.durationMinutes || 30)
            );
        }

        // ===== 1) EXCEÇÃO DO DIA (prioridade) =====
        const dateUtcKey = ymdToUtcDateKeyMidday(ymd);

        const daily = await prisma.professionalDailyAvailability.findFirst({
            where: {
                companyId,
                professionalId: professionalIdSession,
                unitId,
                date: dateUtcKey,
            },
            include: { intervals: true },
        });

        if (daily?.type === ProfessionalDailyAvailabilityType.DAY_OFF) {
            return jsonOk({
                date: dateStr,
                unitId,
                professionalId: professionalIdSession,
                source: 'DAY_OFF',
                durationMinutes: desiredDurationMinutes,
                times: [] as string[],
            });
        }

        let baseIntervals: Array<{ startTime: string; endTime: string }> = [];

        if (daily && daily.type === ProfessionalDailyAvailabilityType.CUSTOM) {
            baseIntervals = daily.intervals
                .map((i) => ({ startTime: i.startTime, endTime: i.endTime }))
                .filter(
                    (i) =>
                        isValidTimeHHMM(i.startTime) &&
                        isValidTimeHHMM(i.endTime) &&
                        i.startTime < i.endTime
                );
        } else {
            // ===== 2) SEM EXCEÇÃO => SEMANAL =====
            const weekday = getWeekdayInSaoPaulo(ymd);

            const weekly =
                await prisma.professionalWeeklyAvailability.findFirst({
                    where: {
                        companyId,
                        professionalId: professionalIdSession,
                        unitId,
                        weekday,
                    },
                    include: { intervals: true },
                });

            if (!weekly || !weekly.isActive) {
                return jsonOk({
                    date: dateStr,
                    unitId,
                    professionalId: professionalIdSession,
                    source: 'WEEKLY_INACTIVE',
                    durationMinutes: desiredDurationMinutes,
                    times: [] as string[],
                });
            }

            const first = weekly.intervals?.[0];
            if (
                !first ||
                !isValidTimeHHMM(first.startTime) ||
                !isValidTimeHHMM(first.endTime) ||
                first.startTime >= first.endTime
            ) {
                return jsonOk({
                    date: dateStr,
                    unitId,
                    professionalId: professionalIdSession,
                    source: 'WEEKLY_NO_INTERVAL',
                    durationMinutes: desiredDurationMinutes,
                    times: [] as string[],
                });
            }

            baseIntervals = [
                { startTime: first.startTime, endTime: first.endTime },
            ];
        }

        // ===== 3) GERA SLOTS (meia em meia) respeitando duração =====
        let slots = baseIntervals.flatMap((i) =>
            buildHalfHourSlotsForDuration(
                i.startTime,
                i.endTime,
                desiredDurationMinutes
            )
        );

        slots = Array.from(new Set(slots)).sort(
            (a, b) => timeToMinutes(a) - timeToMinutes(b)
        );

        // ===== 4) REMOVE HORÁRIOS OCUPADOS (por intervalo) =====
        const { startUtc, endUtc } = buildSaoPauloDayUtcRange(ymd);

        const busy = await prisma.appointment.findMany({
            where: {
                companyId,
                unitId,
                professionalId: professionalIdSession,
                scheduleAt: { gte: startUtc, lte: endUtc },
                status: { in: ['PENDING', 'DONE'] },

                // ✅ edição: ignora o próprio agendamento (permite manter o horário)
                ...(appointmentId ? { id: { not: appointmentId } } : {}),
            },
            select: {
                scheduleAt: true,
                serviceId: true,
                service: { select: { durationMinutes: true } },
            },
        });

        const busyIntervals = busy.map((a) => {
            const startHHmm = formatHHmmInSaoPaulo(new Date(a.scheduleAt));
            const startMins = timeToMinutes(startHHmm);
            const dur = Math.max(1, Number(a.service?.durationMinutes || 30));
            return { startMins, endMins: startMins + dur };
        });

        slots = slots.filter((t) => {
            const slotStart = timeToMinutes(t);
            const slotEnd = slotStart + desiredDurationMinutes;

            for (const b of busyIntervals) {
                if (
                    intervalsOverlap(slotStart, slotEnd, b.startMins, b.endMins)
                ) {
                    return false;
                }
            }
            return true;
        });

        // ===== 5) Se for hoje em SP, remove horários passados =====
        try {
            const nowParts = new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).formatToParts(new Date());

            const d = Number(
                nowParts.find((p) => p.type === 'day')?.value ?? '0'
            );
            const m = Number(
                nowParts.find((p) => p.type === 'month')?.value ?? '0'
            );
            const y = Number(
                nowParts.find((p) => p.type === 'year')?.value ?? '0'
            );
            const hh = Number(
                nowParts.find((p) => p.type === 'hour')?.value ?? '0'
            );
            const mm = Number(
                nowParts.find((p) => p.type === 'minute')?.value ?? '0'
            );

            const isToday = y === ymd.y && m === ymd.m && d === ymd.d;

            if (isToday) {
                const nowMins = hh * 60 + mm;
                slots = slots.filter((t) => timeToMinutes(t) >= nowMins);
            }
        } catch {
            // noop
        }

        return jsonOk({
            date: dateStr,
            unitId,
            professionalId: professionalIdSession,
            appointmentId: appointmentId || null,
            source: daily ? 'EXCEPTION' : 'WEEKLY',
            intervals: baseIntervals,
            durationMinutes: desiredDurationMinutes,
            times: slots,
        });
    } catch (e: any) {
        return jsonErr(e?.message ?? 'Erro ao calcular disponibilidade.', 500);
    }
}
