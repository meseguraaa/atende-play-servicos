// src/app/api/mobile/me/appointments/[id]/edit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAppJwt } from '@/lib/app-jwt';

export const dynamic = 'force-dynamic';

type MobileTokenPayload = {
    sub: string;
    role?: 'CLIENT' | 'BARBER' | 'ADMIN';
    companyId: string; // ✅ multi-tenant obrigatório
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

function normalizeString(v: unknown) {
    return String(v ?? '').trim();
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const headers = corsHeaders();

    try {
        const payload = await requireMobileAuth(req);
        const companyId = payload.companyId;

        // ✅ mobile “me/*” é do CLIENT (se vier role)
        if (payload.role && payload.role !== 'CLIENT') {
            return NextResponse.json(
                { ok: false, error: 'Sem permissão' },
                { status: 403, headers }
            );
        }

        const { id } = await params;
        const apptId = normalizeString(id);

        if (!apptId) {
            return NextResponse.json(
                { ok: false, error: 'Id ausente' },
                { status: 400, headers }
            );
        }

        // ✅ appointment do tenant + do cliente
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
                serviceId: true,
                professionalId: true,

                unit: { select: { id: true, name: true } },
                service: {
                    select: {
                        id: true,
                        name: true,
                        durationMinutes: true,
                        cancelLimitHours: true,
                    },
                },
                professional: { select: { id: true, name: true } },
            },
        });

        if (!appt) {
            return NextResponse.json(
                { ok: false, error: 'Agendamento não encontrado' },
                { status: 404, headers }
            );
        }

        const windowHours =
            normalizeWindowHours(appt.service?.cancelLimitHours) ??
            DEFAULT_RESCHEDULE_WINDOW_HOURS;

        const rules = computeCanReschedule(appt.scheduleAt, windowHours);

        // ✅ lista de unidades (o app espera isso no EditPayload)
        const units = await prisma.unit.findMany({
            where: { companyId, isActive: true },
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(
            {
                ok: true,
                appointment: {
                    id: appt.id,

                    unitId: appt.unitId ?? null,
                    unitName: appt.unit?.name ?? null,

                    serviceId: appt.serviceId ?? null,
                    serviceName: appt.service?.name ?? null,

                    // ✅ compat com o app (ainda usa barberId/barberName)
                    barberId: appt.professionalId ?? null,
                    barberName: appt.professional?.name ?? null,

                    scheduleAt: appt.scheduleAt.toISOString(),
                    status: appt.status,
                },
                units,
                rules: {
                    canReschedule: rules.canReschedule,
                    reason: rules.reason,
                },
            },
            { status: 200, headers }
        );
    } catch (err: any) {
        const msg = String(err?.message ?? '');

        const isAuth =
            msg === 'missing_token' ||
            msg === 'missing_company_id' ||
            msg.includes('Invalid token payload') ||
            msg.toLowerCase().includes('jwt') ||
            msg.toLowerCase().includes('token') ||
            msg.toLowerCase().includes('signature');

        if (isAuth) {
            return NextResponse.json(
                { ok: false, error: 'Não autorizado' },
                { status: 401, headers }
            );
        }

        console.error('[mobile/me/appointments/[id]/edit GET] error:', err);

        return NextResponse.json(
            { ok: false, error: 'Erro ao validar edição do agendamento' },
            { status: 500, headers }
        );
    }
}
