import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type UnitPayload = {
    name?: string;
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

/**
 * ✅ TEMPORÁRIO
 * Em produção bloqueia; em dev assume primeira company como owner.
 */
async function requireAdminSessionTemp(): Promise<MinimalAdminSession> {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('UNAUTHORIZED');
    }

    const company = await prisma.company.findFirst({
        select: { id: true },
        orderBy: { createdAt: 'asc' },
    });

    if (!company?.id) throw new Error('NO_COMPANY');

    return { companyId: company.id, isOwner: true };
}

/**
 * ✅ Next 15/14: ctx.params pode ser Promise (sync-dynamic-apis)
 */
type Ctx = { params: Promise<{ unitId: string }> };

// =====================
// GET /api/admin/settings/units/:unitId
// =====================
export async function GET(_req: Request, ctx: Ctx) {
    let session: MinimalAdminSession;
    try {
        session = await requireAdminSessionTemp();
    } catch (e: any) {
        const msg =
            e?.message === 'NO_COMPANY' ? 'company_not_found' : 'unauthorized';
        return jsonErr(msg, 401);
    }

    const { unitId } = await ctx.params;
    if (!unitId) return jsonErr('unit_id_required', 400);

    const unit = await prisma.unit.findFirst({
        where: { id: unitId, companyId: session.companyId },
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

    if (!unit) return jsonErr('unit_not_found', 404);
    return jsonOk(unit);
}

// =====================
// PUT /api/admin/settings/units/:unitId
// =====================
export async function PUT(req: Request, ctx: Ctx) {
    let session: MinimalAdminSession;
    try {
        session = await requireAdminSessionTemp();
    } catch (e: any) {
        const msg =
            e?.message === 'NO_COMPANY' ? 'company_not_found' : 'unauthorized';
        return jsonErr(msg, 401);
    }

    if (!session.isOwner) {
        return jsonErr('forbidden_owner_only', 403);
    }

    const { unitId } = await ctx.params;
    if (!unitId) return jsonErr('unit_id_required', 400);

    let body: UnitPayload | null = null;
    try {
        body = (await req.json()) as UnitPayload;
    } catch {
        return jsonErr('invalid_json', 400);
    }

    const current = await prisma.unit.findFirst({
        where: { id: unitId, companyId: session.companyId },
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

            isActive: true,
        },
    });

    if (!current) return jsonErr('unit_not_found', 404);

    const name =
        body?.name !== undefined ? asTrimmedOrNull(body.name) : current.name;
    if (!name) return jsonErr('unit_name_required', 400);

    const phone =
        body?.phone !== undefined ? asTrimmedOrNull(body.phone) : current.phone;

    const cep =
        body?.cep !== undefined ? asTrimmedOrNull(body.cep) : current.cep;
    const street =
        body?.street !== undefined
            ? asTrimmedOrNull(body.street)
            : current.street;
    const number =
        body?.number !== undefined
            ? asTrimmedOrNull(body.number)
            : current.number;
    const complement =
        body?.complement !== undefined
            ? asTrimmedOrNull(body.complement)
            : current.complement;
    const neighborhood =
        body?.neighborhood !== undefined
            ? asTrimmedOrNull(body.neighborhood)
            : current.neighborhood;
    const city =
        body?.city !== undefined ? asTrimmedOrNull(body.city) : current.city;
    const state =
        body?.state !== undefined ? asTrimmedOrNull(body.state) : current.state;

    const isActive =
        typeof body?.isActive === 'boolean' ? body.isActive : current.isActive;

    const address = buildAddressLine({
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        cep,
    });

    const updated = await prisma.unit.update({
        where: { id: unitId },
        data: {
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

    return jsonOk(updated);
}
