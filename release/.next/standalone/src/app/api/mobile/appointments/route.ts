// src/app/api/mobile/appointments/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addMinutes } from 'date-fns';
import { Prisma } from '@prisma/client';
import { verifyAppJwt } from '@/lib/app-jwt';

type MobileTokenPayload = {
    sub: string;
    role: 'CLIENT' | 'BARBER' | 'ADMIN' | 'PROFESSIONAL'; // ✅ compat
    companyId: string; // ✅ multi-tenant obrigatório
    profile_complete?: boolean;

    // compat (não garantido no token)
    email?: string;
    name?: string | null;
};

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers':
            'Content-Type, Authorization, x-company-id',
    };
}

// ✅ header case-insensitive (compat)
function getHeaderCI(req: Request, key: string): string | null {
    const target = key.toLowerCase();
    for (const [k, v] of req.headers.entries()) {
        if (k.toLowerCase() === target) {
            const s = String(v ?? '').trim();
            return s.length ? s : null;
        }
    }
    return null;
}

async function requireMobileAuth(req: Request): Promise<MobileTokenPayload> {
    const auth = getHeaderCI(req, 'authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    if (!token) throw new Error('missing_token');

    const payload = await verifyAppJwt(token);
    return payload as MobileTokenPayload;
}

function pad2(n: number) {
    return String(n).padStart(2, '0');
}

/**
 * dateISO: "2025-12-20T15:00:00.000Z" (do day picker, meio-dia)
 * startTime: "09:30" (ou "9:30")
 */
function buildScheduleAtSaoPaulo(dateISO: string, startTime: string): Date {
    const date = new Date(String(dateISO ?? '').trim());
    if (Number.isNaN(date.getTime())) throw new Error('dateISO inválido');

    const yyyy = date.getUTCFullYear();
    const mm = pad2(date.getUTCMonth() + 1);
    const dd = pad2(date.getUTCDate());

    const raw = String(startTime ?? '').trim();
    const m = raw.match(/^(\d{1,2}):(\d{2})/);
    if (!m) throw new Error('startTime inválido');

    const hh = Number(m[1]);
    const mi = Number(m[2]);

    if (
        !Number.isFinite(hh) ||
        !Number.isFinite(mi) ||
        hh < 0 ||
        hh > 23 ||
        mi < 0 ||
        mi > 59
    ) {
        throw new Error('startTime inválido');
    }

    const iso = `${yyyy}-${mm}-${dd}T${pad2(hh)}:${pad2(mi)}:00-03:00`;
    const d = new Date(iso);

    if (Number.isNaN(d.getTime()))
        throw new Error('Falha ao montar scheduleAt');
    return d;
}

function normalizePhone(phone: string): string {
    return String(phone ?? '').replace(/\D/g, '');
}

function isValidPhoneDigits(phoneDigits: string): boolean {
    return phoneDigits.length === 10 || phoneDigits.length === 11;
}

/**
 * ✅ Overlap de intervalos [start, end)
 */
function intervalsOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return (
        aStart.getTime() < bEnd.getTime() && aEnd.getTime() > bStart.getTime()
    );
}

function clampDurationMin(v: unknown, fallback = 30) {
    const n = typeof v === 'number' ? v : Number(v);
    if (!Number.isFinite(n) || n <= 0) return fallback;
    return Math.max(1, Math.round(n));
}

function isThirtyMinuteSlot(d: Date) {
    return d.getMinutes() % 30 === 0;
}

async function ensureAvailability(
    companyId: string,
    scheduleAt: Date,
    professionalId: string,
    durationMinutes: number
): Promise<string | null> {
    // ✅ garante duração válida (evita “0 minutos” matar o bloqueio)
    const durNew = clampDurationMin(durationMinutes, 30);

    const newStart = scheduleAt;
    const newEnd = addMinutes(scheduleAt, durNew);

    // Janela suficiente pra pegar conflitos próximos (inclusive atravessando meia-noite)
    const windowStart = addMinutes(newStart, -12 * 60);
    const windowEnd = addMinutes(newEnd, 12 * 60);

    const candidates = await prisma.appointment.findMany({
        where: {
            companyId,
            professionalId,
            status: { not: 'CANCELED' },
            scheduleAt: { gte: windowStart, lte: windowEnd },
        },
        select: {
            id: true,
            scheduleAt: true,
            service: { select: { durationMinutes: true } },
        },
        orderBy: { scheduleAt: 'asc' },
    });

    for (const appt of candidates) {
        const existingStart = appt.scheduleAt;

        // ✅ saneia duração do existente (se vier null / 0, assume 30)
        const durExisting = clampDurationMin(appt.service?.durationMinutes, 30);

        const existingEnd = addMinutes(existingStart, durExisting);

        if (intervalsOverlap(existingStart, existingEnd, newStart, newEnd)) {
            return 'Este profissional já possui um agendamento que conflita com este horário';
        }
    }

    return null;
}

/**
 * ✅ Garante que o usuário (client) tenha vínculo na empresa (CompanyMember).
 */
async function ensureCompanyMembership(args: {
    companyId: string;
    userId: string;
    unitId?: string | null;
}) {
    const { companyId, userId, unitId } = args;

    await prisma.companyMember.upsert({
        where: {
            companyId_userId: { companyId, userId },
        },
        create: {
            companyId,
            userId,
            role: 'CLIENT',
            isActive: true,
            lastUnitId: unitId ?? undefined,
        },
        update: {
            isActive: true,
            ...(unitId ? { lastUnitId: unitId } : {}),
        },
    });
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(req: Request) {
    try {
        const payload = await requireMobileAuth(req);

        const companyId = String(payload.companyId || '').trim();
        if (!companyId) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401, headers: corsHeaders() }
            );
        }

        if (payload.role !== 'CLIENT') {
            return NextResponse.json(
                { error: 'Sem permissão' },
                { status: 403, headers: corsHeaders() }
            );
        }

        const body = await req.json();

        const clientName = String(body?.clientName ?? '').trim();
        const phoneRaw = String(body?.phone ?? '');
        const phone = normalizePhone(phoneRaw);

        const unitId = String(body?.unitId ?? '').trim();
        const serviceId = String(body?.serviceId ?? '').trim();

        // ✅ compat: aceita professionalId OU barberId
        const professionalId = String(body?.professionalId ?? '').trim();
        const barberIdLegacy = String(body?.barberId ?? '').trim();
        const resolvedProfessionalId = professionalId || barberIdLegacy;

        // ✅ agora aceitamos scheduleAt OU dateISO+startTime
        const scheduleAtRaw = String(body?.scheduleAt ?? '').trim();
        const dateISO = String(body?.dateISO ?? '').trim();
        const startTime = String(body?.startTime ?? '').trim();

        if (!clientName) {
            return NextResponse.json(
                { error: 'Nome é obrigatório' },
                { status: 400, headers: corsHeaders() }
            );
        }

        if (!phone || !isValidPhoneDigits(phone)) {
            return NextResponse.json(
                { error: 'Telefone inválido (use DDD + número)' },
                { status: 400, headers: corsHeaders() }
            );
        }

        if (!unitId || !serviceId || !resolvedProfessionalId) {
            return NextResponse.json(
                { error: 'Parâmetros incompletos' },
                { status: 400, headers: corsHeaders() }
            );
        }

        // ✅ decide scheduleAt
        let scheduleAt: Date | null = null;

        if (scheduleAtRaw) {
            const d = new Date(scheduleAtRaw);
            if (!Number.isNaN(d.getTime())) scheduleAt = d;
        }

        if (!scheduleAt) {
            if (!dateISO || !startTime) {
                return NextResponse.json(
                    { error: 'Parâmetros incompletos' },
                    { status: 400, headers: corsHeaders() }
                );
            }
            scheduleAt = buildScheduleAtSaoPaulo(dateISO, startTime);
        }

        if (scheduleAt.getTime() < Date.now()) {
            return NextResponse.json(
                { error: 'Não é possível agendar para um horário no passado' },
                { status: 400, headers: corsHeaders() }
            );
        }

        // ✅ regra do produto: slots sempre de 30 em 30
        if (!isThirtyMinuteSlot(scheduleAt)) {
            return NextResponse.json(
                { error: 'Horário inválido (use intervalos de 30 minutos).' },
                { status: 400, headers: corsHeaders() }
            );
        }

        const unit = await prisma.unit.findFirst({
            where: { id: unitId, companyId },
            select: { id: true, isActive: true },
        });
        if (!unit) {
            return NextResponse.json(
                { error: 'Unidade não encontrada' },
                { status: 404, headers: corsHeaders() }
            );
        }
        if (unit.isActive === false) {
            return NextResponse.json(
                { error: 'Unidade inativa' },
                { status: 400, headers: corsHeaders() }
            );
        }

        const service = await prisma.service.findFirst({
            where: { id: serviceId, companyId },
            select: {
                id: true,
                name: true,
                unitId: true,
                price: true,
                professionalPercentage: true, // ✅ novo
                isActive: true,
                durationMinutes: true,
            },
        });
        if (!service) {
            return NextResponse.json(
                { error: 'Serviço não encontrado' },
                { status: 404, headers: corsHeaders() }
            );
        }
        if (!service.isActive) {
            return NextResponse.json(
                { error: 'Serviço inativo' },
                { status: 400, headers: corsHeaders() }
            );
        }

        if (service.unitId && service.unitId !== unitId) {
            return NextResponse.json(
                { error: 'Este serviço não pertence a esta unidade' },
                { status: 400, headers: corsHeaders() }
            );
        }

        // ✅ valida que o profissional existe e está ativo no tenant
        const professional = await prisma.professional.findFirst({
            where: { id: resolvedProfessionalId, companyId, isActive: true },
            select: { id: true },
        });
        if (!professional) {
            return NextResponse.json(
                { error: 'Profissional não encontrado ou inativo' },
                { status: 404, headers: corsHeaders() }
            );
        }

        const professionalUnit = await prisma.professionalUnit.findFirst({
            where: {
                professionalId: resolvedProfessionalId,
                unitId,
                isActive: true,
                companyId,
            },
            select: { id: true },
        });
        if (!professionalUnit) {
            return NextResponse.json(
                {
                    error: 'Este profissional não está vinculado a esta unidade',
                },
                { status: 400, headers: corsHeaders() }
            );
        }

        const sp = await prisma.serviceProfessional.findFirst({
            where: {
                professionalId: resolvedProfessionalId,
                serviceId,
                companyId,
            },
            select: { id: true },
        });
        if (!sp) {
            return NextResponse.json(
                { error: 'Este profissional não executa este serviço' },
                { status: 400, headers: corsHeaders() }
            );
        }

        const conflict = await ensureAvailability(
            companyId,
            scheduleAt,
            resolvedProfessionalId,
            service.durationMinutes ?? 0
        );
        if (conflict) {
            return NextResponse.json(
                { error: conflict },
                { status: 409, headers: corsHeaders() }
            );
        }

        const clientId = String(payload.sub || '').trim();
        if (!clientId) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401, headers: corsHeaders() }
            );
        }

        await ensureCompanyMembership({ companyId, userId: clientId, unitId });

        // ✅ decimal-safe
        const price = (service.price ?? new Prisma.Decimal(0)) as any;
        const pct = (service.professionalPercentage ??
            new Prisma.Decimal(0)) as any;

        const professionalEarningValue = price
            .mul(pct)
            .div(new Prisma.Decimal(100));

        const appointment = await prisma.appointment.create({
            data: {
                companyId,

                clientName,
                phone,
                description: service.name,
                scheduleAt,

                serviceId,
                professionalId: resolvedProfessionalId,
                unitId,
                clientId,

                servicePriceAtTheTime: service.price,
                professionalPercentageAtTheTime: service.professionalPercentage,
                professionalEarningValue,
                status: 'PENDING',
            },
            select: {
                id: true,
                status: true,
                scheduleAt: true,
            },
        });

        return NextResponse.json(
            { ok: true, appointment },
            { status: 200, headers: corsHeaders() }
        );
    } catch (err: any) {
        const msg = String(err?.message ?? 'Erro').toLowerCase();

        const isAuth =
            msg.includes('missing_token') ||
            msg.includes('token') ||
            msg.includes('jwt') ||
            msg.includes('signature') ||
            msg.includes('invalid token payload') ||
            msg.includes('companyid');

        if (isAuth) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401, headers: corsHeaders() }
            );
        }

        console.error('[api/mobile/appointments] error:', err);
        return NextResponse.json(
            { error: 'Erro ao criar agendamento' },
            { status: 500, headers: corsHeaders() }
        );
    }
}
