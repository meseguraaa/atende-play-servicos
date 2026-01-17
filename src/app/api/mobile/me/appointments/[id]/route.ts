// src/app/api/mobile/me/appointments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAppJwt } from '@/lib/app-jwt';

export const dynamic = 'force-dynamic';

type MobileTokenPayload = {
    sub: string;
    role: 'CLIENT' | 'BARBER' | 'ADMIN';
    companyId: string; // ✅ multi-tenant obrigatório
    profile_complete?: boolean;
};

const DEFAULT_RESCHEDULE_WINDOW_HOURS = 24;

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

function normalizeWindowHours(raw: unknown): number | null {
    const n = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isFinite(n)) return null;
    if (n <= 0) return null;
    if (n > 24 * 30) return 24 * 30;
    return n;
}

function computeCanReschedule(scheduleAt: Date, windowHours: number) {
    const now = new Date();
    const diffMs = scheduleAt.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    const ok = diffHours >= windowHours;

    return {
        canReschedule: ok,
        reason: ok ? null : `Menos de ${windowHours}h de antecedência.`,
        diffHours,
        windowHours,
    };
}

function pad2(n: number) {
    return String(n).padStart(2, '0');
}

function toMobileDateISOAndStartTime(scheduleAt: Date) {
    // dateISO ao meio-dia local (evita bug de timezone no day picker do app)
    const dateISO = new Date(
        scheduleAt.getFullYear(),
        scheduleAt.getMonth(),
        scheduleAt.getDate(),
        12,
        0,
        0,
        0
    ).toISOString();

    const startTime = `${pad2(scheduleAt.getHours())}:${pad2(
        scheduleAt.getMinutes()
    )}`;

    return { dateISO, startTime };
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const payload = await requireMobileAuth(req);
        const companyId = payload.companyId;

        // ✅ mobile “me/*” é só CLIENT
        if (payload.role !== 'CLIENT') {
            return NextResponse.json(
                { ok: false, error: 'Sem permissão' },
                { status: 403, headers: corsHeaders() }
            );
        }

        const { id } = await params;
        const apptId = String(id ?? '').trim();

        if (!apptId) {
            return NextResponse.json(
                { ok: false, error: 'Id ausente' },
                { status: 400, headers: corsHeaders() }
            );
        }

        const appt = await prisma.appointment.findFirst({
            where: {
                id: apptId,
                companyId,
                clientId: payload.sub,
                status: { not: 'CANCELED' },
            },
            select: {
                id: true,
                status: true,
                scheduleAt: true,
                unitId: true,
                professionalId: true,
                serviceId: true,

                unit: { select: { id: true, name: true } },
                professional: { select: { id: true, name: true } },
                service: {
                    select: {
                        id: true,
                        name: true,
                        durationMinutes: true,
                        cancelLimitHours: true,
                    },
                },
            },
        });

        if (!appt) {
            return NextResponse.json(
                { ok: false, error: 'Agendamento não encontrado' },
                { status: 404, headers: corsHeaders() }
            );
        }

        const windowHours =
            normalizeWindowHours(appt.service?.cancelLimitHours) ??
            DEFAULT_RESCHEDULE_WINDOW_HOURS;

        const rules = computeCanReschedule(appt.scheduleAt, windowHours);
        const mobileParts = toMobileDateISOAndStartTime(appt.scheduleAt);

        return NextResponse.json(
            {
                ok: true,
                appointment: {
                    id: appt.id,
                    status: appt.status,

                    unitId: appt.unitId ?? null,
                    unitName: appt.unit?.name ?? null,

                    serviceId: appt.serviceId ?? null,
                    serviceName: appt.service?.name ?? null,

                    // ✅ compat com o app (barberId/barberName)
                    barberId: appt.professionalId ?? null,
                    barberName: appt.professional?.name ?? null,

                    scheduleAt: appt.scheduleAt.toISOString(),

                    // ✅ extras pro app
                    dateISO: mobileParts.dateISO,
                    startTime: mobileParts.startTime,

                    canReschedule: rules.canReschedule,
                },
                rules: {
                    canReschedule: rules.canReschedule,
                    reason: rules.reason,
                    diffHours: rules.diffHours,
                    windowHours: rules.windowHours,
                },
            },
            { status: 200, headers: corsHeaders() }
        );
    } catch (err: any) {
        console.error('[mobile/me/appointments/[id] GET] error:', err);

        const msg = String(err?.message ?? '');
        const isAuth =
            msg === 'missing_token' ||
            msg === 'missing_company_id' ||
            msg.includes('Invalid token payload') ||
            msg.toLowerCase().includes('jwt') ||
            msg.toLowerCase().includes('token') ||
            msg.toLowerCase().includes('signature');

        return NextResponse.json(
            {
                ok: false,
                error: isAuth
                    ? 'Não autorizado'
                    : 'Erro ao carregar agendamento',
            },
            { status: isAuth ? 401 : 500, headers: corsHeaders() }
        );
    }
}
