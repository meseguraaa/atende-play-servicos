// src/app/api/professional/availability/weekly/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { requireProfessionalSession } from '@/lib/professional-permissions';

type WeeklyDayPayload = {
    weekday: number; // 0..6
    active: boolean;
    startTime: string;
    endTime: string;
};

function jsonOk(data?: unknown, status = 200) {
    return NextResponse.json({ ok: true, data }, { status });
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error }, { status });
}

function isValidTimeHHMM(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    return /^\d{2}:\d{2}$/.test(value);
}

function normalizeWeekday(n: unknown) {
    const num = Number(n);
    if (!Number.isInteger(num)) return null;
    if (num < 0 || num > 6) return null;
    return num;
}

async function getProfessionalScopeOrThrow() {
    const session = await requireProfessionalSession();

    const companyId = String(session.companyId || '').trim();
    const professionalId = String(session.professionalId || '').trim();
    const unitId = String(session.unitId || '').trim();

    if (!companyId) throw new Error('missing_company');
    if (!professionalId) throw new Error('missing_professional');
    if (!unitId) throw new Error('missing_active_unit');

    // 🔒 Hard lock: garante que vínculo e unidade estão ativos e na mesma company
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

        const rows = await prisma.professionalWeeklyAvailability.findMany({
            where: {
                companyId: scope.companyId,
                professionalId: scope.professionalId,
                unitId: scope.unitId,
            },
            include: { intervals: true },
            orderBy: { weekday: 'asc' },
        });

        // Monta state 0..6 (mesmo padrão do form)
        const state: Record<
            0 | 1 | 2 | 3 | 4 | 5 | 6,
            { active: boolean; startTime: string; endTime: string }
        > = {
            0: { active: false, startTime: '00:00', endTime: '23:30' },
            1: { active: true, startTime: '00:00', endTime: '23:30' },
            2: { active: true, startTime: '00:00', endTime: '23:30' },
            3: { active: true, startTime: '00:00', endTime: '23:30' },
            4: { active: true, startTime: '00:00', endTime: '23:30' },
            5: { active: true, startTime: '00:00', endTime: '23:30' },
            6: { active: true, startTime: '00:00', endTime: '23:30' },
        };

        for (const item of rows) {
            const wd = item.weekday;
            if (wd < 0 || wd > 6) continue;

            const interval = item.intervals[0];

            if (!interval) {
                state[wd as 0 | 1 | 2 | 3 | 4 | 5 | 6] = {
                    active: item.isActive,
                    startTime: '00:00',
                    endTime: '23:30',
                };
                continue;
            }

            state[wd as 0 | 1 | 2 | 3 | 4 | 5 | 6] = {
                active: item.isActive,
                startTime: interval.startTime,
                endTime: interval.endTime,
            };
        }

        return jsonOk({ state });
    } catch (e: any) {
        const msg =
            e?.message === 'missing_company'
                ? 'Sessão sem companyId.'
                : e?.message === 'missing_professional'
                  ? 'Sessão sem professionalId.'
                  : e?.message === 'missing_active_unit'
                    ? 'Este profissional não possui unidade ativa vinculada.'
                    : 'Erro ao carregar disponibilidade semanal.';

        return jsonErr(msg, 401);
    }
}

export async function PUT(req: NextRequest) {
    try {
        const scope = await getProfessionalScopeOrThrow();

        const body = (await req.json()) as { days?: WeeklyDayPayload[] };

        if (!Array.isArray(body?.days)) {
            return jsonErr('Payload inválido. Envie { days: [...] }.', 400);
        }

        const days = body.days
            .map((d) => ({
                weekday: normalizeWeekday(d.weekday),
                active: Boolean(d.active),
                startTime: d.startTime,
                endTime: d.endTime,
            }))
            .filter((d) => d.weekday !== null) as Array<{
            weekday: number;
            active: boolean;
            startTime: string;
            endTime: string;
        }>;

        // valida horários
        for (const d of days) {
            if (!isValidTimeHHMM(d.startTime) || !isValidTimeHHMM(d.endTime)) {
                return jsonErr(
                    'Horários inválidos. Use formato HH:mm (ex: 09:00).',
                    400
                );
            }
            if (d.active && d.startTime >= d.endTime) {
                return jsonErr(
                    'Em dias ativos, o horário inicial deve ser menor que o final.',
                    400
                );
            }
        }

        await prisma.$transaction(async (tx) => {
            for (const d of days) {
                const weekly = await tx.professionalWeeklyAvailability.upsert({
                    where: {
                        professionalId_unitId_weekday: {
                            professionalId: scope.professionalId,
                            unitId: scope.unitId,
                            weekday: d.weekday,
                        },
                    },
                    create: {
                        companyId: scope.companyId,
                        professionalId: scope.professionalId,
                        unitId: scope.unitId,
                        weekday: d.weekday,
                        isActive: d.active,
                    },
                    update: {
                        isActive: d.active,
                    },
                    select: { id: true },
                });

                // Mantemos 1 intervalo por dia
                await tx.professionalWeeklyTimeInterval.deleteMany({
                    where: { weeklyAvailabilityId: weekly.id },
                });

                // Só cria intervalo se o dia estiver ativo
                if (d.active) {
                    await tx.professionalWeeklyTimeInterval.create({
                        data: {
                            weeklyAvailabilityId: weekly.id,
                            startTime: d.startTime,
                            endTime: d.endTime,
                        },
                    });
                }
            }
        });

        revalidatePath('/professional/availability');

        return jsonOk({ saved: true });
    } catch (e: any) {
        const msg =
            e?.message === 'missing_company'
                ? 'Sessão sem companyId.'
                : e?.message === 'missing_professional'
                  ? 'Sessão sem professionalId.'
                  : e?.message === 'missing_active_unit'
                    ? 'Este profissional não possui unidade ativa vinculada.'
                    : 'Erro ao salvar disponibilidade semanal.';

        return jsonErr(msg, 401);
    }
}
