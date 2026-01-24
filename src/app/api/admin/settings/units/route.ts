// src/app/api/admin/settings/units/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentPainelUser } from '@/lib/painel-session';

export const dynamic = 'force-dynamic';

type UnitPayload = {
    name: string;
    phone?: string | null;

    cep?: string | null;
    street?: string | null;
    number?: string | null;
    complement?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;

    isActive?: boolean | null;
};

type MinimalAdminSession = {
    companyId: string;
    isOwner: boolean;
};

function jsonOk<T>(data: T, init?: ResponseInit) {
    return NextResponse.json({ ok: true, data } as const, init);
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error } as const, { status });
}

function asTrimmedOrNull(v: unknown): string | null {
    if (typeof v !== 'string') return null;
    const t = v.trim();
    return t ? t : null;
}

function buildAddressLine(input: {
    street?: string | null;
    number?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;
    cep?: string | null;
    complement?: string | null;
}) {
    const parts: string[] = [];

    const street = asTrimmedOrNull(input.street);
    const number = asTrimmedOrNull(input.number);
    const neighborhood = asTrimmedOrNull(input.neighborhood);
    const city = asTrimmedOrNull(input.city);
    const state = asTrimmedOrNull(input.state);
    const cep = asTrimmedOrNull(input.cep);
    const complement = asTrimmedOrNull(input.complement);

    const streetLine = [street, number ? `, ${number}` : ''].join('').trim();
    if (streetLine) parts.push(streetLine);

    if (complement) parts.push(complement);
    if (neighborhood) parts.push(neighborhood);

    const cityState = [city, state].filter(Boolean).join(' - ');
    if (cityState) parts.push(cityState);

    if (cep) parts.push(`CEP ${cep}`);

    return parts.join(' • ') || null;
}

function isPrismaValidationError(err: any): boolean {
    return (
        !!err &&
        typeof err === 'object' &&
        (err.name === 'PrismaClientValidationError' ||
            err.constructor?.name === 'PrismaClientValidationError')
    );
}

function normalizeUnitRow(row: any) {
    // Garante shape estável para o front, mesmo se o Prisma Client ainda não “enxerga” os campos novos.
    return {
        id: row.id,
        name: row.name,
        phone: row.phone ?? null,

        cep: row.cep ?? null,
        street: row.street ?? null,
        number: row.number ?? null,
        complement: row.complement ?? null,
        neighborhood: row.neighborhood ?? null,
        city: row.city ?? null,
        state: row.state ?? null,

        address: row.address ?? null,
        isActive: typeof row.isActive === 'boolean' ? row.isActive : true,

        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}

async function requireAdminSession(): Promise<MinimalAdminSession> {
    const u = await getCurrentPainelUser();
    if (!u) throw new Error('UNAUTHORIZED');

    // Este endpoint é do painel de tenant (empresa)
    if (!u.companyId) throw new Error('UNAUTHORIZED');

    // Somente ADMIN pode mexer em Settings/Units
    if (String(u.role).toUpperCase() !== 'ADMIN') {
        throw new Error('FORBIDDEN');
    }

    const isOwner = u.canSeeAllUnits === true;

    return {
        companyId: String(u.companyId),
        isOwner,
    };
}

async function getSessionOrErr(): Promise<
    | { ok: true; session: MinimalAdminSession }
    | { ok: false; res: NextResponse }
> {
    try {
        const session = await requireAdminSession();
        return { ok: true, session };
    } catch (e: any) {
        const msg =
            e?.message === 'FORBIDDEN'
                ? 'forbidden'
                : e?.message === 'UNAUTHORIZED'
                  ? 'unauthorized'
                  : 'unauthorized';

        const status = e?.message === 'FORBIDDEN' ? 403 : 401;
        return { ok: false, res: jsonErr(msg, status) };
    }
}

// =====================
// GET /api/admin/settings/units
// =====================
export async function GET() {
    const s = await getSessionOrErr();
    if (!s.ok) return s.res;

    try {
        // Tentativa “completa” (campos novos).
        const units = await prisma.unit.findMany({
            where: { companyId: s.session.companyId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                phone: true,

                cep: true,
                street: true,
                number: true,
                complement: true,
                neighborhood: true,
                city: true,
                state: true,

                address: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return jsonOk(units.map(normalizeUnitRow));
    } catch (err: any) {
        // Se o Prisma Client ainda não foi gerado com os campos novos (ex: "Unknown field `cep`"),
        // fazemos fallback para não quebrar a página.
        if (isPrismaValidationError(err)) {
            const units = await prisma.unit.findMany({
                where: { companyId: s.session.companyId },
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    address: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            return jsonOk(units.map(normalizeUnitRow));
        }

        return jsonErr('internal_error', 500);
    }
}

// =====================
// POST /api/admin/settings/units
// =====================
export async function POST(req: Request) {
    const s = await getSessionOrErr();
    if (!s.ok) return s.res;

    // 🔒 para criar, somente OWNER
    if (!s.session.isOwner) {
        return jsonErr('forbidden_owner_only', 403);
    }

    let body: UnitPayload | null = null;
    try {
        body = (await req.json()) as UnitPayload;
    } catch {
        return jsonErr('invalid_json', 400);
    }

    const name = asTrimmedOrNull(body?.name);
    if (!name) return jsonErr('unit_name_required', 400);

    const phone = asTrimmedOrNull(body?.phone);

    const cep = asTrimmedOrNull(body?.cep);
    const street = asTrimmedOrNull(body?.street);
    const number = asTrimmedOrNull(body?.number);
    const complement = asTrimmedOrNull(body?.complement);
    const neighborhood = asTrimmedOrNull(body?.neighborhood);
    const city = asTrimmedOrNull(body?.city);
    const state = asTrimmedOrNull(body?.state);

    const isActive = typeof body?.isActive === 'boolean' ? body.isActive : true;

    const address = buildAddressLine({
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        cep,
    });

    try {
        // Tentativa “completa” (campos novos).
        const created = await prisma.unit.create({
            data: {
                companyId: s.session.companyId,
                name,
                phone,

                cep,
                street,
                number,
                complement,
                neighborhood,
                city,
                state,

                address,
                isActive,
            },
            select: {
                id: true,
                name: true,
                phone: true,

                cep: true,
                street: true,
                number: true,
                complement: true,
                neighborhood: true,
                city: true,
                state: true,

                address: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return jsonOk(normalizeUnitRow(created), { status: 201 });
    } catch (err: any) {
        // Fallback: se o Prisma Client ainda não conhece os campos novos,
        // salvamos só o essencial + address (linha pronta) para não travar seu fluxo.
        if (isPrismaValidationError(err)) {
            const created = await prisma.unit.create({
                data: {
                    companyId: s.session.companyId,
                    name,
                    phone,
                    address,
                    isActive,
                },
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    address: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            return jsonOk(normalizeUnitRow(created), { status: 201 });
        }

        return jsonErr('internal_error', 500);
    }
}
