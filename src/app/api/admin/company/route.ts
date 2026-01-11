// src/app/api/admin/company/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

function jsonError(message: string, status = 400) {
    return NextResponse.json({ ok: false, error: message }, { status });
}

function normalizeSegment(v: unknown): 'BARBERSHOP' | 'AESTHETIC' {
    const s = String(v ?? '')
        .trim()
        .toUpperCase();
    return s === 'AESTHETIC' ? 'AESTHETIC' : 'BARBERSHOP';
}

export async function GET() {
    try {
        const admin = await requireAdminForModule('SETTINGS');

        const company = await prisma.company.findUnique({
            where: { id: admin.companyId },
            select: {
                id: true,
                name: true,
                slug: true,
                segment: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!company) return jsonError('Empresa não encontrada.', 404);

        return NextResponse.json({ ok: true, company });
    } catch (err: any) {
        // Em caso de redirect, o Next já trata (throw).
        // Aqui pegamos falhas inesperadas.
        return jsonError(err?.message || 'Erro inesperado.', 500);
    }
}

export async function PUT(req: Request) {
    try {
        const admin = await requireAdminForModule('SETTINGS');

        // Regra: somente OWNER pode editar dados da empresa
        if (!admin.isOwner) {
            return jsonError(
                'Somente o dono pode editar os dados da empresa.',
                403
            );
        }

        let body: any = null;
        try {
            body = await req.json();
        } catch {
            return jsonError('Body JSON inválido.', 400);
        }

        const name = String(body?.name ?? '').trim();
        const isActive =
            typeof body?.isActive === 'boolean' ? body.isActive : undefined;
        const segment = normalizeSegment(body?.segment);

        if (!name) return jsonError('Nome da empresa é obrigatório.', 400);

        const updated = await prisma.company.update({
            where: { id: admin.companyId },
            data: {
                name,
                segment,
                ...(typeof isActive === 'boolean' ? { isActive } : {}),
            },
            select: {
                id: true,
                name: true,
                slug: true,
                segment: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json({ ok: true, company: updated });
    } catch (err: any) {
        return jsonError(err?.message || 'Erro inesperado.', 500);
    }
}
