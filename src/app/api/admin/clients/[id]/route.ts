// src/app/api/admin/clients/[id]/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

const COMPANY_COOKIE_NAME = 'admin_company_context';
const UNIT_COOKIE_NAME = 'admin_unit_context';
const UNIT_ALL_VALUE = 'all';

function jsonOk<T>(data: T, init?: ResponseInit) {
    return NextResponse.json({ ok: true, data } as const, init);
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error } as const, { status });
}

function normalizeString(v: unknown) {
    return String(v ?? '').trim();
}

function onlyDigits(v: string) {
    return String(v ?? '').replace(/\D/g, '');
}

function parseBirthday(input: string): Date | null {
    const raw = normalizeString(input);
    if (!raw) return null;

    // aceita "DD/MM/AAAA"
    if (raw.includes('/')) {
        const m = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!m) return null;

        const dd = Number(m[1]);
        const mm = Number(m[2]);
        const yyyy = Number(m[3]);

        if (!yyyy || mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

        const d = new Date(yyyy, mm - 1, dd);
        if (
            d.getFullYear() !== yyyy ||
            d.getMonth() !== mm - 1 ||
            d.getDate() !== dd
        ) {
            return null;
        }

        return d;
    }

    // aceita "YYYY-MM-DD"
    if (raw.includes('-')) {
        const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!m) return null;

        const yyyy = Number(m[1]);
        const mm = Number(m[2]);
        const dd = Number(m[3]);

        if (!yyyy || mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

        const d = new Date(yyyy, mm - 1, dd);
        if (
            d.getFullYear() !== yyyy ||
            d.getMonth() !== mm - 1 ||
            d.getDate() !== dd
        ) {
            return null;
        }

        return d;
    }

    return null;
}

async function requireCompanyIdFromContext(session: any): Promise<string> {
    const sCompanyId = String(session?.companyId ?? '').trim();
    if (sCompanyId) return sCompanyId;

    const cookieStore = await cookies();
    const cookieCompanyId = cookieStore.get(COMPANY_COOKIE_NAME)?.value;
    if (cookieCompanyId) return cookieCompanyId;

    const userId = String(session?.userId ?? '').trim();
    if (userId) {
        const membership = await prisma.companyMember.findFirst({
            where: { userId, isActive: true },
            orderBy: { createdAt: 'asc' },
            select: { companyId: true },
        });
        if (membership?.companyId) return membership.companyId;
    }

    throw new Error(
        `companyId ausente (session.companyId, cookie "${COMPANY_COOKIE_NAME}" e sem fallback por membership).`
    );
}

async function getSelectedUnitId(): Promise<string | null> {
    const cookieStore = await cookies();
    const selectedUnit =
        cookieStore.get(UNIT_COOKIE_NAME)?.value ?? UNIT_ALL_VALUE;
    if (!selectedUnit || selectedUnit === UNIT_ALL_VALUE) return null;
    return selectedUnit;
}

/**
 * PATCH /api/admin/clients/:id
 * body JSON:
 * - name?: string
 * - email?: string
 * - phone?: string
 * - birthday?: string ("DD/MM/AAAA" ou "YYYY-MM-DD")
 */
export async function PATCH(
    req: Request,
    ctx: { params: Promise<{ id: string }> }
) {
    try {
        const session = await requireAdminForModule('CLIENTS');
        const companyId = await requireCompanyIdFromContext(session);

        const { id } = await ctx.params;
        const userId = normalizeString(id);
        if (!userId) return jsonErr('ID do cliente ausente.');

        const body = await req.json().catch(() => null);
        if (!body) return jsonErr('Body inválido.');

        const name = normalizeString(body.name);
        const email = normalizeString(body.email).toLowerCase();
        const phone = normalizeString(body.phone);
        const birthdayRaw = normalizeString(body.birthday);

        if (!name) return jsonErr('Informe o nome do cliente.');
        if (!email) return jsonErr('Informe o e-mail do cliente.');
        if (!phone) return jsonErr('Informe o telefone do cliente.');

        const digits = onlyDigits(phone);
        if (digits.length < 10) {
            return jsonErr('Informe um telefone válido (com DDD).');
        }

        const birthday = parseBirthday(birthdayRaw);
        if (!birthday) {
            return jsonErr(
                'Informe uma data de nascimento válida (DD/MM/AAAA ou AAAA-MM-DD).'
            );
        }

        // garante que esse user é CLIENT dessa company
        const membership = await prisma.companyMember.findFirst({
            where: {
                companyId,
                userId,
                isActive: true,
                role: 'CLIENT',
            },
            select: { id: true },
        });

        if (!membership) {
            return jsonErr('Cliente não encontrado nesta empresa.', 404);
        }

        const selectedUnitId = await getSelectedUnitId();

        // update user
        const updated = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                email,
                phone,
                birthday,
            },
            select: { id: true },
        });

        // opcional: encosta lastUnitId no membership (ajuda UX multi-unidade)
        if (selectedUnitId) {
            await prisma.companyMember.update({
                where: {
                    companyId_userId: {
                        companyId,
                        userId,
                    },
                },
                data: { lastUnitId: selectedUnitId },
                select: { id: true },
            });
        }

        return jsonOk({ id: updated.id });
    } catch (err: any) {
        const msg = String(err?.message ?? '');

        // conflito de email (unique)
        if (
            msg.toLowerCase().includes('unique') &&
            msg.toLowerCase().includes('email')
        ) {
            return jsonErr('Já existe um usuário com esse e-mail.', 409);
        }

        return jsonErr(msg || 'Erro ao atualizar cliente.', 500);
    }
}
