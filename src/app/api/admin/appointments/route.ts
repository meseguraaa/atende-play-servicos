// src/app/api/admin/appointments/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

function jsonErr(message: string, status = 400) {
    return NextResponse.json({ ok: false, error: message }, { status });
}

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

export async function POST(request: Request) {
    try {
        const session = await requireAdminForModule('APPOINTMENTS');

        const companyId = session.companyId;
        if (!companyId)
            return jsonErr('Empresa não encontrada na sessão.', 401);

        const userId = session.id; // AdminSession usa `id`
        if (!userId) return jsonErr('Usuário não encontrado na sessão.', 401);

        const canSeeAllUnits = session.canSeeAllUnits;

        const body = await request.json().catch(() => null);
        if (!body) return jsonErr('Body inválido.');

        const clientId = normalizeString(body.clientId);
        const clientName = normalizeString(body.clientName);
        const phone = normalizeString(body.phone);
        const unitId = normalizeString(body.unitId);
        const professionalIdRaw = normalizeString(body.professionalId);
        const serviceIdRaw = normalizeString(body.serviceId);
        const description = normalizeString(body.description);
        const scheduleAtRaw = normalizeString(body.scheduleAt);

        if (!clientId) return jsonErr('clientId é obrigatório.');
        if (!clientName) return jsonErr('clientName é obrigatório.');
        if (!phone) return jsonErr('phone é obrigatório.');
        if (!unitId) return jsonErr('unitId é obrigatório.');
        if (!description) return jsonErr('description é obrigatório.');
        if (!scheduleAtRaw) return jsonErr('scheduleAt é obrigatório.');

        const scheduleAt = new Date(scheduleAtRaw);
        if (Number.isNaN(scheduleAt.getTime())) {
            return jsonErr('scheduleAt inválido.');
        }

        // ✅ valida unidade da empresa
        const unit = await prisma.unit.findFirst({
            where: { id: unitId, companyId, isActive: true },
            select: { id: true },
        });
        if (!unit) return jsonErr('Unidade inválida ou inativa.', 404);

        // ✅ se não pode ver tudo, precisa ter acesso na unit
        if (!canSeeAllUnits) {
            const hasAccess = await prisma.adminUnitAccess.findFirst({
                where: { companyId, userId, unitId },
                select: { id: true },
            });
            if (!hasAccess) return jsonErr('Sem acesso a esta unidade.', 403);
        }

        // ✅ valida cliente (membro ativo CLIENT da empresa)
        const client = await prisma.user.findFirst({
            where: {
                id: clientId,
                isActive: true,
                companyMemberships: {
                    some: {
                        companyId,
                        isActive: true,
                        role: 'CLIENT',
                    },
                },
            },
            select: { id: true },
        });
        if (!client) return jsonErr('Cliente inválido ou inativo.', 404);

        const professionalId = professionalIdRaw || null;
        const serviceId = serviceIdRaw || null;

        // ✅ valida profissional (se vier)
        if (professionalId) {
            const prof = await prisma.professional.findFirst({
                where: {
                    id: professionalId,
                    companyId,
                    isActive: true,
                    units: {
                        some: {
                            unitId,
                            isActive: true,
                        },
                    },
                },
                select: { id: true },
            });
            if (!prof)
                return jsonErr('Profissional inválido para esta unidade.', 400);
        }

        // ✅ valida serviço (se vier)
        if (serviceId) {
            const svc = await prisma.service.findFirst({
                where: {
                    id: serviceId,
                    companyId,
                    isActive: true,
                    OR: [{ unitId }, { unitId: null }],
                },
                select: { id: true },
            });
            if (!svc)
                return jsonErr('Serviço inválido para esta unidade.', 400);
        }

        // ✅ cria appointment
        const created = await prisma.appointment.create({
            data: {
                companyId,
                unitId,

                clientId,
                clientName,
                phone,

                description,
                scheduleAt,

                professionalId,
                serviceId,

                // status default PENDING pelo schema
            },
            select: { id: true },
        });

        return NextResponse.json({ ok: true, id: created.id });
    } catch (err: any) {
        // se requireAdminForModule lançar redirect/erro, cai aqui
        return jsonErr(err?.message ?? 'Erro interno.', 500);
    }
}
