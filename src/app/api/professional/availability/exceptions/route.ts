// src/app/api/professional/availability/exceptions/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { requireProfessionalSession } from '@/lib/professional-permissions';
import { ProfessionalDailyAvailabilityType } from '@prisma/client';

function jsonOk(data?: unknown, status = 200) {
    return NextResponse.json({ ok: true, data }, { status });
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error }, { status });
}

function normalizeDateToUTCStart(dateISO: string) {
    const d = new Date(dateISO);
    if (Number.isNaN(d.getTime())) return null;
    d.setUTCHours(0, 0, 0, 0);
    return d;
}

async function getProfessionalScopeOrThrow() {
    const session = await requireProfessionalSession();

    const companyId = String(session.companyId || '').trim();
    const professionalId = String(session.professionalId || '').trim();
    const unitId = String(session.unitId || '').trim();

    if (!companyId) throw new Error('missing_company');
    if (!professionalId) throw new Error('missing_professional');
    if (!unitId) throw new Error('missing_active_unit');

    // 🔒 Hard lock: garante vínculo e unidade ativos dentro da mesma company
    const active = await prisma.professionalUnit.findFirst({
        where: {
            companyId,
            professionalId,
            unitId,
            isActive: true,
            unit: { isActive: true },
        },
        select: { id: true },
    });

    if (!active) throw new Error('missing_active_unit');

    return { companyId, professionalId, unitId };
}

export async function GET() {
    try {
        const scope = await getProfessionalScopeOrThrow();

        const exceptions = await prisma.professionalDailyAvailability.findMany({
            where: {
                companyId: scope.companyId,
                professionalId: scope.professionalId,
                unitId: scope.unitId,
            },
            include: { intervals: true },
            orderBy: { date: 'asc' },
        });

        return jsonOk({
            exceptions: exceptions.map((ex) => ({
                id: ex.id,
                dateISO: ex.date.toISOString(),
                type:
                    ex.type === ProfessionalDailyAvailabilityType.DAY_OFF
                        ? 'DAY_OFF'
                        : 'CUSTOM',
                intervals: ex.intervals.map((i) => ({
                    id: i.id,
                    startTime: i.startTime,
                    endTime: i.endTime,
                })),
            })),
        });
    } catch (e: any) {
        const msg =
            e?.message === 'missing_company'
                ? 'Sessão sem companyId.'
                : e?.message === 'missing_professional'
                  ? 'Sessão sem professionalId.'
                  : e?.message === 'missing_active_unit'
                    ? 'Este profissional não possui unidade ativa vinculada.'
                    : 'Erro ao buscar exceções.';

        return jsonErr(msg, 401);
    }
}

export async function POST(req: NextRequest) {
    try {
        const scope = await getProfessionalScopeOrThrow();

        const body = (await req.json()) as {
            dateISO?: string;
            mode?: 'FULL_DAY' | 'PARTIAL';
            intervals?: { startTime: string; endTime: string }[];
        };

        const dateISO = String(body?.dateISO ?? '');
        const mode = body?.mode;

        if (!dateISO) return jsonErr('dateISO é obrigatório.', 400);
        if (mode !== 'FULL_DAY' && mode !== 'PARTIAL') {
            return jsonErr('mode inválido. Use FULL_DAY ou PARTIAL.', 400);
        }

        const date = normalizeDateToUTCStart(dateISO);
        if (!date) return jsonErr('dateISO inválido.', 400);

        const intervalsInput = Array.isArray(body?.intervals)
            ? body.intervals
            : [];

        if (mode === 'PARTIAL') {
            if (!intervalsInput.length) {
                return jsonErr('Adicione pelo menos 1 intervalo.', 400);
            }
            for (const i of intervalsInput) {
                if (!i?.startTime || !i?.endTime || i.startTime >= i.endTime) {
                    return jsonErr(
                        'Intervalos inválidos: o horário inicial deve ser menor que o final.',
                        400
                    );
                }
            }
        }

        const type =
            mode === 'FULL_DAY'
                ? ProfessionalDailyAvailabilityType.DAY_OFF
                : ProfessionalDailyAvailabilityType.CUSTOM;

        const saved = await prisma.$transaction(async (tx) => {
            const daily = await tx.professionalDailyAvailability.upsert({
                where: {
                    professionalId_unitId_date: {
                        professionalId: scope.professionalId,
                        unitId: scope.unitId,
                        date,
                    },
                },
                create: {
                    companyId: scope.companyId,
                    professionalId: scope.professionalId,
                    unitId: scope.unitId,
                    date,
                    type,
                },
                update: { type },
                select: { id: true },
            });

            await tx.professionalDailyTimeInterval.deleteMany({
                where: { dailyAvailabilityId: daily.id },
            });

            if (mode === 'PARTIAL') {
                await tx.professionalDailyTimeInterval.createMany({
                    data: intervalsInput.map((i) => ({
                        dailyAvailabilityId: daily.id,
                        startTime: i.startTime,
                        endTime: i.endTime,
                    })),
                });
            }

            return daily;
        });

        revalidatePath('/professional/availability');

        return jsonOk({ id: saved.id });
    } catch (e: any) {
        const msg =
            e?.message === 'missing_company'
                ? 'Sessão sem companyId.'
                : e?.message === 'missing_professional'
                  ? 'Sessão sem professionalId.'
                  : e?.message === 'missing_active_unit'
                    ? 'Este profissional não possui unidade ativa vinculada.'
                    : 'Erro ao salvar exceção.';

        return jsonErr(msg, 401);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const scope = await getProfessionalScopeOrThrow();

        const { searchParams } = new URL(req.url);
        const dateISO = searchParams.get('dateISO');

        if (!dateISO) return jsonErr('dateISO é obrigatório.', 400);

        const date = normalizeDateToUTCStart(dateISO);
        if (!date) return jsonErr('dateISO inválido.', 400);

        await prisma.professionalDailyAvailability.delete({
            where: {
                professionalId_unitId_date: {
                    professionalId: scope.professionalId,
                    unitId: scope.unitId,
                    date,
                },
            },
        });

        revalidatePath('/professional/availability');

        return jsonOk({ deleted: true });
    } catch (e: any) {
        // idempotência
        const msg = String(e?.message ?? '');
        if (msg.includes('Record to delete does not exist')) {
            return jsonOk({ deleted: true });
        }

        const human =
            e?.message === 'missing_company'
                ? 'Sessão sem companyId.'
                : e?.message === 'missing_professional'
                  ? 'Sessão sem professionalId.'
                  : e?.message === 'missing_active_unit'
                    ? 'Este profissional não possui unidade ativa vinculada.'
                    : 'Erro ao remover exceção.';

        return jsonErr(human, 401);
    }
}
