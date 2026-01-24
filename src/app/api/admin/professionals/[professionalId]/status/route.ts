// src/app/api/admin/professionals/[professionalId]/status/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

function jsonOk<T>(data: T, init?: ResponseInit) {
    return NextResponse.json({ ok: true, data } as const, init);
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error } as const, { status });
}

type RouteContext = {
    params: {
        professionalId: string;
    };
};

export async function PATCH(request: Request, { params }: RouteContext) {
    try {
        const session = await requireAdminForModule('PROFESSIONALS');
        const companyId = session.companyId;

        const professionalId = String(params?.professionalId ?? '').trim();

        if (!professionalId) {
            return jsonErr('professionalId é obrigatório.', 400);
        }

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            body = null;
        }

        const isActive = (body as any)?.isActive;
        if (typeof isActive !== 'boolean') {
            return jsonErr('Campo "isActive" deve ser boolean.', 400);
        }

        // 🔒 Hard multi-tenant: só mexe no profissional da empresa logada
        const exists = await prisma.professional.findFirst({
            where: { id: professionalId, companyId },
            select: { id: true },
        });

        if (!exists) {
            return jsonErr('Profissional não encontrado.', 404);
        }

        await prisma.professional.update({
            where: { id: professionalId },
            data: { isActive },
        });

        return jsonOk({ id: professionalId, isActive });
    } catch {
        // Permissão / sessão / etc
        return jsonErr('Não autorizado.', 401);
    }
}
