// src/app/api/professional/appointments/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireProfessionalSession } from '@/lib/professional-permissions';

export const dynamic = 'force-dynamic';

function jsonErr(message: string, status = 400) {
    return NextResponse.json({ ok: false, error: message }, { status });
}

function jsonOk(data: unknown, status = 200) {
    return NextResponse.json({ ok: true, data }, { status });
}

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

/**
 * “Hoje” em São Paulo, independente do timezone do server.
 */
function getSaoPauloTodayYmd(): { y: number; m: number; d: number } {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const parts = formatter.formatToParts(now);
    const d = Number(parts.find((p) => p.type === 'day')?.value ?? '1');
    const m = Number(parts.find((p) => p.type === 'month')?.value ?? '1');
    const y = Number(parts.find((p) => p.type === 'year')?.value ?? '1970');

    return { y, m, d };
}

function parseDateParam(
    dateStr?: string
): { y: number; m: number; d: number } | null {
    const raw = normalizeString(dateStr);
    if (!raw) return null;

    const [y, m, d] = raw.split('-').map(Number);
    if (!y || !m || !d) return null;

    return { y, m, d };
}

/**
 * Converte o “dia SP” para range UTC (pra filtrar scheduleAt em UTC no banco).
 * startUtc = 00:00 SP
 * endUtc = 23:59:59.999 SP
 */
function buildSaoPauloDayUtcRange(ymd: { y: number; m: number; d: number }) {
    // SP = UTC-03 => 00:00 SP = 03:00 UTC
    const SAO_PAULO_UTC_OFFSET_HOURS = 3;

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

    const startUtc = new Date(startUtcMs);
    const endUtc = new Date(nextDayStartUtcMs - 1);

    return { startUtc, endUtc };
}

export async function GET(request: Request) {
    try {
        const session = await requireProfessionalSession();
        const companyId = normalizeString(session.companyId);
        const professionalId = normalizeString(session.professionalId);

        if (!companyId || !professionalId) {
            return jsonErr('Sessão do profissional inválida.', 401);
        }

        const url = new URL(request.url);
        const dateParam = url.searchParams.get('date');

        const ymd = parseDateParam(dateParam) ?? getSaoPauloTodayYmd();
        const { startUtc, endUtc } = buildSaoPauloDayUtcRange(ymd);

        const appointments = await prisma.appointment.findMany({
            where: {
                companyId,
                professionalId,
                scheduleAt: { gte: startUtc, lte: endUtc },
            },
            orderBy: { scheduleAt: 'asc' },
            select: {
                id: true,
                unitId: true,
                clientId: true,
                clientName: true,
                phone: true,
                description: true,
                scheduleAt: true,
                status: true,
                professionalId: true,
                serviceId: true,
            },
        });

        return jsonOk({
            date: `${String(ymd.y).padStart(4, '0')}-${String(ymd.m).padStart(
                2,
                '0'
            )}-${String(ymd.d).padStart(2, '0')}`,
            appointments,
        });
    } catch (err: any) {
        return jsonErr(err?.message ?? 'Erro interno.', 500);
    }
}
