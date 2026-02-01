// src/app/api/admin/services/[serviceId]/route.ts
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

function jsonOk<T>(data: T, init?: ResponseInit) {
    return NextResponse.json({ ok: true, data } as const, init);
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error } as const, { status });
}

function normalizeId(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
}

function toFiniteNumber(value: unknown): number | null {
    if (value === null || value === undefined) return null;

    const n =
        typeof value === 'string'
            ? Number(value.replace(',', '.').trim())
            : Number(value);

    return Number.isFinite(n) ? n : null;
}

function uniqStrings(values: unknown): string[] {
    if (!Array.isArray(values)) return [];
    const out: string[] = [];
    const seen = new Set<string>();

    for (const v of values) {
        const s = typeof v === 'string' ? v.trim() : '';
        if (!s) continue;
        if (seen.has(s)) continue;
        seen.add(s);
        out.push(s);
    }

    return out;
}

type UnitOption = {
    id: string;
    name: string;
    isActive: boolean;
};

export async function PATCH(
    request: Request,
    ctx: { params: Promise<{ serviceId: string }> }
) {
    const session = await requireAdminForModule('SERVICES');
    const companyId = (
        session as unknown as { companyId?: string }
    ).companyId?.trim();

    if (!companyId) {
        return jsonErr(
            'Sessão sem companyId. Este painel é multi-tenant: vincule o admin a uma empresa.',
            401
        );
    }

    const { serviceId } = await ctx.params;
    const id = normalizeId(serviceId);
    if (!id) return jsonErr('serviceId é obrigatório.');

    const body = (await request.json().catch(() => null)) as {
        // campos do service
        name?: unknown;
        unitId?: unknown;

        price?: unknown; // decimal
        priceInCents?: unknown; // compat (UI pode mandar cents)
        durationMinutes?: unknown;
        durationInMinutes?: unknown; // alias compat

        professionalPercentage?: unknown; // %
        barberPercentage?: unknown; // alias compat (UI antiga)

        cancelLimitHours?: unknown; // horas
        cancelFeePercentage?: unknown; // %

        isActive?: unknown;

        // vínculos
        professionalIds?: unknown; // string[]
    } | null;

    if (!body) return jsonErr('Body inválido.');

    try {
        // defesa: service precisa ser do tenant
        const current = await prisma.service.findFirst({
            where: { id, companyId },
            select: { id: true },
        });

        if (!current)
            return jsonErr('Serviço não encontrado para esta empresa.', 404);

        // toggle simples (se vier só isActive e nenhum outro campo)
        const hasAnyFieldBesidesIsActive = Object.keys(body).some(
            (k) => k !== 'isActive'
        );

        if (!hasAnyFieldBesidesIsActive && typeof body.isActive === 'boolean') {
            await prisma.service.update({
                where: { id },
                data: { isActive: body.isActive },
                select: { id: true },
            });

            return jsonOk({ id, isActive: body.isActive });
        }

        const name =
            typeof body.name === 'string' ? body.name.trim() : undefined;

        const unitIdRaw =
            typeof body.unitId === 'string' ? body.unitId.trim() : undefined;

        // ✅ price pode vir como decimal (price) OU cents (priceInCents)
        const priceNum =
            body.price === undefined && body.priceInCents === undefined
                ? undefined
                : (() => {
                      const cents = toFiniteNumber(body.priceInCents);
                      if (cents !== null) return cents / 100;
                      return toFiniteNumber(body.price);
                  })();

        const durationMinutesNum =
            body.durationMinutes === undefined &&
            body.durationInMinutes === undefined
                ? undefined
                : (toFiniteNumber(body.durationMinutes) ??
                  toFiniteNumber(body.durationInMinutes));

        const professionalPercentageNum =
            body.professionalPercentage === undefined &&
            body.barberPercentage === undefined
                ? undefined
                : (toFiniteNumber(body.professionalPercentage) ??
                  toFiniteNumber(body.barberPercentage));

        const cancelLimitHoursNum =
            body.cancelLimitHours === undefined
                ? undefined
                : toFiniteNumber(body.cancelLimitHours);

        const cancelFeePercentageNum =
            body.cancelFeePercentage === undefined
                ? undefined
                : toFiniteNumber(body.cancelFeePercentage);

        const isActive =
            body.isActive === undefined
                ? undefined
                : typeof body.isActive === 'boolean'
                  ? body.isActive
                  : undefined;

        const professionalIds =
            body.professionalIds === undefined
                ? undefined
                : uniqStrings(body.professionalIds);

        // validações (somente quando o campo foi enviado)
        if (name !== undefined && !name) return jsonErr('Nome inválido.');
        if (priceNum !== undefined && (priceNum === null || priceNum < 0))
            return jsonErr('Preço inválido.');
        if (
            durationMinutesNum !== undefined &&
            (durationMinutesNum === null || durationMinutesNum <= 0)
        )
            return jsonErr('Duração inválida.');
        if (
            professionalPercentageNum !== undefined &&
            (professionalPercentageNum === null ||
                professionalPercentageNum < 0 ||
                professionalPercentageNum > 100)
        )
            return jsonErr('Porcentagem do profissional inválida (0 a 100).');

        if (
            cancelLimitHoursNum !== undefined &&
            cancelLimitHoursNum !== null &&
            cancelLimitHoursNum < 0
        )
            return jsonErr('Limite de cancelamento inválido.');

        if (
            cancelFeePercentageNum !== undefined &&
            cancelFeePercentageNum !== null &&
            (cancelFeePercentageNum < 0 || cancelFeePercentageNum > 100)
        )
            return jsonErr('Taxa de cancelamento inválida (0 a 100).');

        if (professionalIds !== undefined && professionalIds.length === 0) {
            return jsonErr('Selecione pelo menos 1 profissional.');
        }

        // unitId: se enviado, precisa ser do tenant, e pode ser "" para limpar
        // OBS: em UpdateInput usamos relation `unit` (connect/disconnect)
        let nextUnitId: string | null | undefined = undefined;
        if (unitIdRaw !== undefined) {
            const trimmed = unitIdRaw.trim();
            if (!trimmed) {
                nextUnitId = null;
            } else {
                const unitExists = await prisma.unit.findFirst({
                    where: { id: trimmed, companyId },
                    select: { id: true },
                });
                if (!unitExists)
                    return jsonErr('Unidade inválida para esta empresa.');
                nextUnitId = trimmed;
            }
        }

        // se vierem professionals, valida tenant
        let filteredProfessionalIds: string[] | undefined = undefined;
        if (professionalIds !== undefined) {
            const allowed = await prisma.professional.findMany({
                where: { companyId, id: { in: professionalIds } },
                select: { id: true },
            });

            const allowedSet = new Set(allowed.map((p) => p.id));
            filteredProfessionalIds = professionalIds.filter((pid) =>
                allowedSet.has(pid)
            );

            if (filteredProfessionalIds.length === 0) {
                return jsonErr('Nenhum profissional válido selecionado.');
            }
        }

        await prisma.$transaction(async (tx) => {
            const data: Prisma.ServiceUpdateInput = {};

            if (name !== undefined) data.name = name;

            if (nextUnitId !== undefined) {
                if (nextUnitId === null) data.unit = { disconnect: true };
                else data.unit = { connect: { id: nextUnitId } };
            }

            if (priceNum !== undefined && priceNum !== null) {
                data.price = new Prisma.Decimal(priceNum);
            }

            if (
                durationMinutesNum !== undefined &&
                durationMinutesNum !== null
            ) {
                data.durationMinutes = Math.trunc(durationMinutesNum);
            }

            if (
                professionalPercentageNum !== undefined &&
                professionalPercentageNum !== null
            ) {
                data.professionalPercentage = new Prisma.Decimal(
                    professionalPercentageNum
                );
            }

            if (cancelLimitHoursNum !== undefined) {
                data.cancelLimitHours =
                    cancelLimitHoursNum === null
                        ? null
                        : Math.trunc(cancelLimitHoursNum);
            }

            if (cancelFeePercentageNum !== undefined) {
                data.cancelFeePercentage =
                    cancelFeePercentageNum === null
                        ? null
                        : new Prisma.Decimal(cancelFeePercentageNum);
            }

            if (isActive !== undefined) data.isActive = isActive;

            if (Object.keys(data).length > 0) {
                await tx.service.update({
                    where: { id },
                    data,
                    select: { id: true },
                });
            }

            // atualiza vínculos (substitui lista)
            if (filteredProfessionalIds !== undefined) {
                await tx.serviceProfessional.deleteMany({
                    where: { companyId, serviceId: id },
                });

                await tx.serviceProfessional.createMany({
                    data: filteredProfessionalIds.map((professionalId) => ({
                        companyId,
                        serviceId: id,
                        professionalId,
                    })),
                    skipDuplicates: true,
                });
            }
        });

        return jsonOk({ id });
    } catch {
        return jsonErr('Não foi possível atualizar o serviço.', 500);
    }
}

export async function GET(
    _request: Request,
    ctx: { params: Promise<{ serviceId: string }> }
) {
    const session = await requireAdminForModule('SERVICES');
    const companyId = (
        session as unknown as { companyId?: string }
    ).companyId?.trim();

    if (!companyId) {
        return jsonErr(
            'Sessão sem companyId. Este painel é multi-tenant: vincule o admin a uma empresa.',
            401
        );
    }

    const { serviceId } = await ctx.params;
    const id = normalizeId(serviceId);
    if (!id) return jsonErr('serviceId é obrigatório.');

    try {
        const [service, professionals, links, units] = await Promise.all([
            prisma.service.findFirst({
                where: { id, companyId },
                select: {
                    id: true,
                    unitId: true,
                    name: true,
                    price: true,
                    durationMinutes: true,
                    isActive: true,
                    professionalPercentage: true,
                    cancelLimitHours: true,
                    cancelFeePercentage: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            prisma.professional.findMany({
                where: { companyId },
                orderBy: { name: 'asc' },
                select: { id: true, name: true, isActive: true },
            }),
            prisma.serviceProfessional.findMany({
                where: { companyId, serviceId: id },
                select: { professionalId: true },
            }),
            prisma.unit.findMany({
                where: { companyId },
                orderBy: { name: 'asc' },
                select: { id: true, name: true, isActive: true },
            }),
        ]);

        if (!service) return jsonErr('Serviço não encontrado.', 404);

        const unitsUI: UnitOption[] = units.map((u) => ({
            id: u.id,
            name: u.name,
            isActive: u.isActive,
        }));

        return jsonOk({
            service: {
                id: service.id,
                unitId: service.unitId ?? null,
                name: service.name,
                price: service.price.toString(),
                durationMinutes: service.durationMinutes,
                isActive: service.isActive,
                professionalPercentage:
                    service.professionalPercentage.toString(),
                cancelLimitHours: service.cancelLimitHours ?? null,
                cancelFeePercentage: service.cancelFeePercentage
                    ? service.cancelFeePercentage.toString()
                    : null,
                createdAt: service.createdAt,
                updatedAt: service.updatedAt,
            },
            professionals: professionals.map((p) => ({
                id: p.id,
                name: p.name,
                isActive: p.isActive,
            })),
            selectedProfessionalIds: links.map((l) => l.professionalId),
            units: unitsUI,
        });
    } catch {
        return jsonErr('Não foi possível carregar o serviço.', 500);
    }
}
