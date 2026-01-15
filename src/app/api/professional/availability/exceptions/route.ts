// src/app/api/professional/availability/exceptions/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { format } from 'date-fns';

import { prisma } from '@/lib/prisma';
import { requireProfessionalSession } from '@/lib/professional-permissions';
import { ProfessionalDailyAvailabilityType } from '@prisma/client';

function jsonOk(data?: unknown, status = 200) {
    return NextResponse.json({ ok: true, data }, { status });
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error }, { status });
}

/**
 * ✅ Converte yyyy-MM-dd para Date fixo em UTC (12:00Z) SEM depender do parse do JS.
 * Isso elimina drift entre ambientes e impede “dia anterior/próximo” na UI/DB.
 */
function dateKeyToUTCMidday(dateKey: string) {
    const key = String(dateKey ?? '').slice(0, 10);
    const [yy, mm, dd] = key.split('-');

    const y = Number(yy);
    const m = Number(mm);
    const d = Number(dd);

    if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) {
        return null;
    }
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;

    return new Date(Date.UTC(y, m - 1, d, 12, 0, 0, 0));
}

async function getProfessionalScopeOrThrow() {
    const session = await requireProfessionalSession();

    const companyId = String(session.companyId || '').trim();
    const professionalId = String(session.professionalId || '').trim();
    const unitId = String(session.unitId || '').trim();

    if (!companyId) throw new Error('missing_company');
    if (!professionalId) throw new Error('missing_professional');
    if (!unitId) throw new Error('missing_active_unit');

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

                // ✅ Sempre devolve yyyy-MM-dd (sem hora)
                dateISO: format(ex.date, 'yyyy-MM-dd'),

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
            dateISO?: string; // yyyy-MM-dd
            mode?: 'FULL_DAY' | 'PARTIAL';
            intervals?: { startTime: string; endTime: string }[];
        };

        const dateISO = String(body?.dateISO ?? '');
        const mode = body?.mode;

        if (!dateISO) return jsonErr('dateISO é obrigatório.', 400);
        if (mode !== 'FULL_DAY' && mode !== 'PARTIAL') {
            return jsonErr('mode inválido. Use FULL_DAY ou PARTIAL.', 400);
        }

        const date = dateKeyToUTCMidday(dateISO);
        if (!date) return jsonErr('dateISO inválido. Use yyyy-MM-dd.', 400);

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

        const date = dateKeyToUTCMidday(dateISO);
        if (!date) return jsonErr('dateISO inválido. Use yyyy-MM-dd.', 400);

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
        const code = String(e?.code ?? '');
        const msg = String(e?.message ?? '');

        if (
            code === 'P2025' ||
            msg.includes('Record to delete does not exist')
        ) {
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
