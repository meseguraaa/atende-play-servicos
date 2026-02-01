import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAppJwt } from '@/lib/app-jwt';

export const dynamic = 'force-dynamic';

type MobileTokenPayload = {
    sub: string;
    role?: 'CLIENT' | 'PROFESSIONAL' | 'ADMIN' | 'BARBER';
    email?: string;
    name?: string | null;
    companyId: string;
};

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers':
            'Content-Type, Authorization, x-company-id',
    };
}

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

function toNumberDecimal(v: any): number {
    if (v == null) return NaN;
    if (typeof v === 'number') return v;

    if (typeof v === 'string') {
        const n = Number(v.replace(',', '.'));
        return Number.isFinite(n) ? n : NaN;
    }

    if (typeof v === 'object') {
        try {
            const s =
                typeof (v as any).toString === 'function'
                    ? String((v as any).toString())
                    : '';
            const n = Number(s.replace(',', '.'));
            return Number.isFinite(n) ? n : NaN;
        } catch {
            return NaN;
        }
    }

    return NaN;
}

async function requireMobileAuth(req: Request): Promise<MobileTokenPayload> {
    const auth = getHeaderCI(req, 'authorization') || '';
    const token = auth.toLowerCase().startsWith('bearer ')
        ? auth.slice(7).trim()
        : '';
    if (!token) throw new Error('missing_token');

    const payload = (await verifyAppJwt(token)) as any;

    // ✅ companyId: token primeiro, fallback header
    let companyId =
        typeof payload?.companyId === 'string'
            ? String(payload.companyId).trim()
            : '';

    if (!companyId) {
        const h = getHeaderCI(req, 'x-company-id');
        if (h) companyId = h;
    }

    if (!companyId) throw new Error('missing_company_id');

    return { ...(payload as any), companyId } as MobileTokenPayload;
}

function formatPtBrDateTime(date: Date) {
    const d = new Date(date);
    const dateLabel = d.toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const timeLabel = d.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
    });
    return `${dateLabel} • ${timeLabel}`;
}

function computeStatusLabel(status?: string | null) {
    const s = String(status ?? '').toUpperCase();
    if (s === 'PENDING') return 'CONFIRMADO';
    if (s === 'DONE') return 'CONCLUÍDO';
    if (s === 'CANCELED') return 'CANCELADO';
    return 'CONFIRMADO';
}

function hoursDiff(dateFuture: Date, now: Date) {
    return (dateFuture.getTime() - now.getTime()) / (1000 * 60 * 60);
}

function computePolicy(params: {
    now: Date;
    scheduleAt: Date;
    appointmentStatus: string;
    cancelLimitHours?: number | null;
    cancelFeePercentage?: number | null;
}) {
    const {
        now,
        scheduleAt,
        appointmentStatus,
        cancelLimitHours,
        cancelFeePercentage,
    } = params;

    const statusUpper = String(appointmentStatus ?? '').toUpperCase();

    if (statusUpper !== 'PENDING') {
        return {
            status: statusUpper,
            statusLabel: computeStatusLabel(statusUpper),
            canCancel: false,
            canReschedule: false,
            cancellationFeeEligible: false,
            cancellationFeeNotice: null as string | null,
            isInService: false,
        };
    }

    // ✅ Chegou o horário? Então é ATENDIMENTO no mobile
    const isInService = now.getTime() >= scheduleAt.getTime();
    if (isInService) {
        return {
            status: 'IN_SERVICE',
            statusLabel: 'ATENDIMENTO',
            canCancel: false,
            canReschedule: false,
            cancellationFeeEligible: false,
            cancellationFeeNotice: null,
            isInService: true,
        };
    }

    // Antes do horário: cancelar pode
    const canCancel = true;

    // Alterar: respeita janela cancelLimitHours (política do admin)
    const h = hoursDiff(scheduleAt, now);
    const hasLimit =
        typeof cancelLimitHours === 'number' && cancelLimitHours > 0;
    const canReschedule = !hasLimit || h >= cancelLimitHours;

    // Taxa: se está dentro da janela e existe % de taxa
    const hasFee =
        typeof cancelFeePercentage === 'number' &&
        Number.isFinite(cancelFeePercentage) &&
        cancelFeePercentage > 0;

    const cancellationFeeEligible =
        hasLimit && hasFee && h < (cancelLimitHours as number);

    const cancellationFeeNotice = cancellationFeeEligible
        ? 'Este cancelamento pode ser cobrado em um próximo atendimento, conforme a política do estabelecimento.'
        : null;

    return {
        status: 'PENDING',
        statusLabel: computeStatusLabel('PENDING'),
        canCancel,
        canReschedule,
        cancellationFeeEligible,
        cancellationFeeNotice,
        isInService: false,
    };
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

// ✅ Tipagem explícita alinhada ao schema real (Appointment.professional)
type NextAppointmentRow = {
    id: string;
    status: string;
    scheduleAt: Date;
    description: string | null;
    unit: { id: string; name: string } | null;
    professional: { id: string; name: string } | null;
    service: {
        id: string;
        name: string;
        cancelLimitHours: number | null;
        cancelFeePercentage: any; // Prisma.Decimal | null
    } | null;
};

export async function GET(req: Request) {
    try {
        const payload = await requireMobileAuth(req);

        if (payload.role && payload.role !== 'CLIENT') {
            return NextResponse.json(
                { error: 'Sem permissão' },
                { status: 403, headers: corsHeaders() }
            );
        }

        const now = new Date();

        // ✅ Janela para pegar atendimento em andamento (PENDING no passado recente)
        const LOOKBACK_HOURS = 24;
        const lookbackStart = new Date(
            now.getTime() - LOOKBACK_HOURS * 60 * 60 * 1000
        );

        const next = (await prisma.appointment.findFirst({
            where: {
                companyId: payload.companyId,
                clientId: payload.sub,
                status: 'PENDING',
                scheduleAt: { gte: lookbackStart },
            },
            orderBy: { scheduleAt: 'asc' },
            select: {
                id: true,
                status: true,
                scheduleAt: true,
                description: true,
                unit: { select: { id: true, name: true } },
                professional: { select: { id: true, name: true } },
                service: {
                    select: {
                        id: true,
                        name: true,
                        cancelLimitHours: true,
                        cancelFeePercentage: true,
                    },
                },
            },
        })) as NextAppointmentRow | null;

        if (!next) {
            return NextResponse.json(
                { ok: true, next: null },
                { status: 200, headers: corsHeaders() }
            );
        }

        // ✅ Decimal-safe: converte antes de passar para computePolicy
        const feePct = toNumberDecimal(next.service?.cancelFeePercentage);
        const feePctSafe = Number.isFinite(feePct) ? feePct : null;

        const policy = computePolicy({
            now,
            scheduleAt: next.scheduleAt,
            appointmentStatus: next.status,
            cancelLimitHours: next.service?.cancelLimitHours ?? null,
            cancelFeePercentage: feePctSafe,
        });

        return NextResponse.json(
            {
                ok: true,
                next: {
                    id: next.id,
                    serviceName:
                        next.service?.name ?? next.description ?? 'Serviço',
                    unitName: next.unit?.name ?? 'Unidade',
                    barberName: next.professional?.name ?? 'Profissional', // ✅ mantém contrato do app
                    startsAtLabel: formatPtBrDateTime(next.scheduleAt),

                    status: policy.status,
                    statusLabel: policy.statusLabel,

                    canCancel: policy.canCancel,
                    canReschedule: policy.canReschedule,
                    cancellationFeeEligible: policy.cancellationFeeEligible,
                    cancellationFeeNotice: policy.cancellationFeeNotice,

                    unitId: next.unit?.id ?? null,
                    serviceId: next.service?.id ?? null,

                    // ✅ mantém contrato do app
                    barberId: next.professional?.id ?? null,
                },
            },
            { status: 200, headers: corsHeaders() }
        );
    } catch (err: any) {
        const msg = String(err?.message ?? '');
        const lower = msg.toLowerCase();

        const isAuth =
            msg === 'missing_token' ||
            msg === 'missing_company_id' ||
            lower.includes('jwt') ||
            lower.includes('token') ||
            lower.includes('signature');

        if (isAuth) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401, headers: corsHeaders() }
            );
        }

        console.error('[mobile/me/appointments/next] error:', err);
        return NextResponse.json(
            { error: 'Erro ao buscar próximo agendamento' },
            { status: 500, headers: corsHeaders() }
        );
    }
}
