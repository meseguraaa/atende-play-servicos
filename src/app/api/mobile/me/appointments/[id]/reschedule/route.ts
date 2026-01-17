// src/app/api/mobile/me/appointments/[id]/reschedule/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAppJwt } from '@/lib/app-jwt';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type MobileTokenPayload = {
    sub: string;
    role?: 'CLIENT' | 'BARBER' | 'ADMIN';
    companyId: string;
};

const DEFAULT_RESCHEDULE_WINDOW_HOURS = 24;

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
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

function normalizeString(v: unknown) {
    return String(v ?? '').trim();
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

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const headers = corsHeaders();

    try {
        const payload = await requireMobileAuth(req);
        const companyId = payload.companyId;

        // ✅ Mantém padrão do app: cliente apenas
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

        const body = await req.json().catch(() => ({}));

        const unitId = normalizeString(body?.unitId);
        const serviceId = normalizeString(body?.serviceId);

        // ✅ compat: app manda barberId, mas banco é professionalId
        const professionalId = normalizeString(
            body?.professionalId ?? body?.barberId
        );

        const scheduleAtRaw = normalizeString(body?.scheduleAt);

        if (!unitId || !serviceId || !professionalId || !scheduleAtRaw) {
            return NextResponse.json(
                { ok: false, error: 'Parâmetros incompletos' },
                { status: 400, headers }
            );
        }

        const scheduleAt = new Date(scheduleAtRaw);
        if (Number.isNaN(scheduleAt.getTime())) {
            return NextResponse.json(
                { ok: false, error: 'scheduleAt inválido' },
                { status: 400, headers }
            );
        }

        // 1) ✅ garante que o appointment é do tenant + do cliente
        const appt = await prisma.appointment.findFirst({
            where: {
                id: apptId,
                companyId,
                clientId: payload.sub,
                status: { not: 'CANCELED' },
            },
            include: { service: true },
        });

        if (!appt) {
            return NextResponse.json(
                { ok: false, error: 'Agendamento não encontrado' },
                { status: 404, headers }
            );
        }

        // 2) ✅ regra de janela (cancelLimitHours como janela de reagendamento)
        const windowHours =
            normalizeWindowHours(appt.service?.cancelLimitHours) ??
            DEFAULT_RESCHEDULE_WINDOW_HOURS;

        const rules = computeCanReschedule(
            new Date(appt.scheduleAt),
            windowHours
        );

        if (!rules.canReschedule) {
            return NextResponse.json(
                { ok: false, error: rules.reason ?? 'Bloqueado' },
                { status: 409, headers }
            );
        }

        // 3) ✅ valida unidade/serviço/profissional no tenant
        const [unit, service, profUnit, sp] = await Promise.all([
            prisma.unit.findFirst({
                where: { id: unitId, companyId, isActive: true },
                select: { id: true },
            }),
            prisma.service.findFirst({
                where: { id: serviceId, companyId, isActive: true },
                select: { id: true, name: true },
            }),
            prisma.professionalUnit.findFirst({
                where: {
                    companyId,
                    unitId,
                    professionalId,
                    isActive: true,
                },
                select: { id: true },
            }),
            prisma.serviceProfessional.findFirst({
                where: { companyId, serviceId, professionalId },
                select: { id: true },
            }),
        ]);

        if (!unit) {
            return NextResponse.json(
                { ok: false, error: 'Unidade não encontrada' },
                { status: 404, headers }
            );
        }

        if (!service) {
            return NextResponse.json(
                { ok: false, error: 'Serviço não encontrado' },
                { status: 404, headers }
            );
        }

        if (!profUnit) {
            return NextResponse.json(
                {
                    ok: false,
                    error: 'Profissional não vinculado a esta unidade',
                },
                { status: 400, headers }
            );
        }

        if (!sp) {
            return NextResponse.json(
                { ok: false, error: 'Profissional não executa este serviço' },
                { status: 400, headers }
            );
        }

        // 4) ✅ conflito simples: mesmo horário
        const conflict = await prisma.appointment.findFirst({
            where: {
                companyId,
                unitId,
                professionalId,
                scheduleAt,
                status: { not: 'CANCELED' },
                id: { not: apptId },
            },
            select: { id: true },
        });

        if (conflict) {
            return NextResponse.json(
                { ok: false, error: 'Horário indisponível' },
                { status: 409, headers }
            );
        }

        // 5) ✅ update protegido
        const updatedCount = await prisma.appointment.updateMany({
            where: {
                id: apptId,
                companyId,
                clientId: payload.sub,
            },
            data: {
                unitId,
                serviceId,
                professionalId,
                scheduleAt,
                description: service.name ?? appt.description,
            },
        });

        if (updatedCount.count === 0) {
            return NextResponse.json(
                { ok: false, error: 'Agendamento não encontrado' },
                { status: 404, headers }
            );
        }

        const updated = await prisma.appointment.findFirst({
            where: {
                id: apptId,
                companyId,
                clientId: payload.sub,
            },
            select: {
                id: true,
                status: true,
                scheduleAt: true,
                unitId: true,
                serviceId: true,
                professionalId: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(
            { ok: true, appointment: updated },
            { status: 200, headers }
        );
    } catch (err: any) {
        console.error(
            '[mobile/me/appointments/[id]/reschedule POST] error:',
            err
        );

        const msg = String(err?.message || '').toLowerCase();
        const isAuth =
            msg.includes('missing_token') ||
            msg.includes('missing_company_id') ||
            msg.includes('jwt') ||
            msg.includes('token') ||
            msg.includes('signature');

        return NextResponse.json(
            {
                ok: false,
                error: isAuth
                    ? 'Não autorizado'
                    : 'Erro ao alterar agendamento',
            },
            { status: isAuth ? 401 : 500, headers }
        );
    }
}
