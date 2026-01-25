// src/app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

const UNIT_COOKIE_NAME = 'admin_unit_context';
const UNIT_ALL_VALUE = 'all';

type CustomerLevel = 'BRONZE' | 'PRATA' | 'OURO' | 'DIAMANTE';

type CreateProductPayload = {
    unitId?: string | null;

    name?: string;
    imageUrl?: string; // agora opcional
    description?: string;

    price?: number | string; // aceita string também
    barberPercentage?: number | string; // no banco é professionalPercentage
    category?: string;

    stockQuantity?: number | string;
    pickupDeadlineDays?: number | string;

    isActive?: boolean;
    isFeatured?: boolean;

    birthdayBenefitEnabled?: boolean;
    birthdayPriceLevel?: CustomerLevel | null;

    // descontos por nível (%)
    levelDiscounts?: Partial<Record<CustomerLevel, number | string>>;
};

function jsonOk<T>(data: T, init?: ResponseInit) {
    return NextResponse.json({ ok: true, data } as const, init);
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error } as const, { status });
}

function toInt(
    raw: unknown,
    fallback: number,
    opts?: { min?: number; max?: number }
) {
    const n =
        typeof raw === 'number'
            ? raw
            : Number(
                  String(raw ?? '')
                      .trim()
                      .replace(',', '.')
              );
    if (!Number.isFinite(n)) return fallback;
    const i = Math.floor(n);
    const min = opts?.min ?? -Infinity;
    const max = opts?.max ?? Infinity;
    return Math.max(min, Math.min(max, i));
}

function toMoneyNumber(raw: unknown): number {
    const s = String(raw ?? '')
        .trim()
        .replace(/\s/g, '')
        .replace(',', '.');
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
}

function normalizeString(raw: unknown) {
    const s = String(raw ?? '').trim();
    return s.length ? s : '';
}

function normalizeNullableString(raw: unknown): string | null {
    const s = String(raw ?? '').trim();
    return s.length ? s : null;
}

function isValidImageUrl(imageUrl: string) {
    const s = String(imageUrl ?? '').trim();
    if (!s) return false;

    // bloqueios óbvios
    const lowered = s.toLowerCase();
    if (lowered.startsWith('javascript:')) return false;
    if (lowered.startsWith('data:')) return false;

    // nosso endpoint retorna /uploads/...
    if (s.startsWith('/uploads/')) return true;

    // fallback: URL absoluta
    if (lowered.startsWith('http://') || lowered.startsWith('https://'))
        return true;

    return false;
}

async function resolveUnitScope(params: { session: any; request: Request }) {
    const session = params.session;

    // Admin de unidade: ignora cookie e força unitId do admin
    if (!session?.canSeeAllUnits) return session?.unitId ?? null;

    // Se vier query param, ele ganha do cookie
    const url = new URL(params.request.url);
    const qp = url.searchParams.get('unit');
    if (qp && qp !== UNIT_ALL_VALUE) return qp;
    if (qp === UNIT_ALL_VALUE) return null;

    // Cookie fallback
    const cookieStore = await cookies();
    const cookieValue =
        cookieStore.get(UNIT_COOKIE_NAME)?.value ?? UNIT_ALL_VALUE;

    if (!cookieValue || cookieValue === UNIT_ALL_VALUE) return null;
    return cookieValue;
}

async function sanitizeUnitScope(params: {
    companyId: string;
    activeUnitId: string | null;
}) {
    const { companyId, activeUnitId } = params;
    if (!activeUnitId) return null;

    const belongs = await prisma.unit.findFirst({
        where: { id: activeUnitId, companyId },
        select: { id: true },
    });

    return belongs ? activeUnitId : null;
}

function normalizeLevelDiscounts(
    ld: unknown
): Partial<Record<CustomerLevel, number>> {
    if (!ld || typeof ld !== 'object') return {};

    const out: Partial<Record<CustomerLevel, number>> = {};
    const obj = ld as Record<string, unknown>;

    (['BRONZE', 'PRATA', 'OURO', 'DIAMANTE'] as CustomerLevel[]).forEach(
        (lvl) => {
            const v = obj[lvl];
            if (v === undefined || v === null || String(v).trim() === '')
                return;

            const n = toInt(v, 0, { min: 0, max: 100 });
            if (Number.isFinite(n)) out[lvl] = n;
        }
    );

    return out;
}

/**
 * GET /api/admin/products
 * - retorna produtos + unidades + activeUnitId
 * - suporta ?unit=all | unitId
 */
export async function GET(request: Request) {
    try {
        const session = await requireAdminForModule('PRODUCTS');

        const companyId = String((session as any)?.companyId ?? '').trim();
        if (!companyId)
            return jsonErr(
                'Contexto inválido: companyId ausente (multi-tenant).',
                401
            );

        const rawActiveUnitId = await resolveUnitScope({ session, request });
        const activeUnitId = await sanitizeUnitScope({
            companyId,
            activeUnitId: rawActiveUnitId,
        });

        // (Opcional) manter cookie sincronizado com query param se vier
        if ((session as any)?.canSeeAllUnits) {
            const url = new URL(request.url);
            const qp = url.searchParams.get('unit');
            if (qp) {
                const cookieStore = await cookies();
                cookieStore.set(UNIT_COOKIE_NAME, qp, { path: '/' });
            }
        }

        const units = await prisma.unit.findMany({
            where: {
                companyId,
                ...(activeUnitId ? { id: activeUnitId } : {}),
            },
            orderBy: { name: 'asc' },
            select: { id: true, name: true, isActive: true },
        });

        const productsPrisma = await prisma.product.findMany({
            where: {
                ...(activeUnitId ? { unitId: activeUnitId } : {}),
                unit: { companyId },
            },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            select: {
                id: true,
                name: true,
                imageUrl: true,
                description: true,
                price: true,
                professionalPercentage: true,
                category: true,
                stockQuantity: true,
                isActive: true,
                pickupDeadlineDays: true,
                unitId: true,
                isFeatured: true,
                birthdayBenefitEnabled: true,
                birthdayPriceLevel: true,
                unit: { select: { id: true, name: true } },
                discounts: { select: { level: true, discountPct: true } },
            },
        });

        const products = productsPrisma.map((p) => {
            const levelDiscounts: Partial<Record<CustomerLevel, number>> = {};
            for (const row of p.discounts ?? []) {
                const pct = Number(row.discountPct);
                if (Number.isFinite(pct))
                    levelDiscounts[row.level as CustomerLevel] = pct;
            }

            const pickupDeadlineDays =
                typeof p.pickupDeadlineDays === 'number' &&
                Number.isFinite(p.pickupDeadlineDays) &&
                p.pickupDeadlineDays > 0
                    ? p.pickupDeadlineDays
                    : 2;

            return {
                id: p.id,
                name: p.name,
                imageUrl: p.imageUrl, // pode ser null
                description: p.description,
                price: Number(p.price),
                barberPercentage: Number(p.professionalPercentage), // compat UI
                category: p.category,
                stockQuantity: p.stockQuantity,
                isActive: p.isActive,

                pickupDeadlineDays,

                unitId: p.unit?.id ?? p.unitId,
                unitName: p.unit?.name ?? '—',

                birthdayBenefitEnabled: Boolean(p.birthdayBenefitEnabled),
                birthdayPriceLevel: (p.birthdayPriceLevel ??
                    null) as CustomerLevel | null,

                isFeatured: Boolean(p.isFeatured),

                hasLevelPrices: (p.discounts?.length ?? 0) > 0,
                levelDiscounts,
            };
        });

        return jsonOk({ products, units, activeUnitId });
    } catch {
        return jsonErr('Sem permissão para acessar Produtos.', 403);
    }
}

/**
 * POST /api/admin/products
 * - cria produto + descontos por nível
 */
export async function POST(request: Request) {
    try {
        const session = await requireAdminForModule('PRODUCTS');

        const companyId = String((session as any)?.companyId ?? '').trim();
        if (!companyId)
            return jsonErr(
                'Contexto inválido: companyId ausente (multi-tenant).',
                401
            );

        const body = (await request
            .json()
            .catch(() => null)) as CreateProductPayload | null;
        if (!body) return jsonErr('Body inválido.');

        // unitId: respeita hard lock de admin de unidade
        const requestedUnitId = normalizeString(body.unitId);
        const lockedUnitId = (session as any)?.canSeeAllUnits
            ? ''
            : String((session as any)?.unitId ?? '').trim();
        const unitId = lockedUnitId || requestedUnitId;

        if (!unitId) return jsonErr('unitId é obrigatório.');

        // valida se unit pertence à company
        const unit = await prisma.unit.findFirst({
            where: { id: unitId, companyId },
            select: { id: true, name: true },
        });
        if (!unit) return jsonErr('Unidade inválida para esta empresa.', 400);

        const name = normalizeString(body.name);
        const imageUrl = normalizeNullableString(body.imageUrl);
        const description = normalizeString(body.description);
        const category = normalizeString(body.category);

        if (!name) return jsonErr('Nome é obrigatório.');

        // ✅ imageUrl opcional: valida só se vier
        if (imageUrl && !isValidImageUrl(imageUrl)) {
            return jsonErr(
                'imageUrl inválida. Envie uma imagem (upload) ou forneça uma URL http(s) válida.',
                400
            );
        }

        if (!description) return jsonErr('Descrição é obrigatória.');
        if (!category) return jsonErr('Categoria é obrigatória.');

        const price = toMoneyNumber(body.price);
        if (!Number.isFinite(price) || price <= 0)
            return jsonErr('Preço inválido.');

        const professionalPercentage = toInt(body.barberPercentage, 0, {
            min: 0,
            max: 100,
        });
        if (!Number.isFinite(professionalPercentage))
            return jsonErr('Porcentagem do profissional inválida.');

        const stockQuantity = toInt(body.stockQuantity, 0, {
            min: 0,
            max: 1_000_000,
        });
        const pickupDeadlineDays = toInt(body.pickupDeadlineDays, 2, {
            min: 1,
            max: 30,
        });

        const isActive =
            typeof body.isActive === 'boolean' ? body.isActive : true;
        const isFeatured = Boolean(body.isFeatured);

        const birthdayBenefitEnabled = Boolean(body.birthdayBenefitEnabled);
        const birthdayPriceLevel = birthdayBenefitEnabled
            ? ((body.birthdayPriceLevel ?? null) as CustomerLevel | null)
            : null;

        const levelDiscounts = normalizeLevelDiscounts(body.levelDiscounts);

        const created = await prisma.product.create({
            data: {
                companyId,
                unitId,
                name,
                imageUrl, // ✅ pode ser null
                description,
                price,
                professionalPercentage,
                category,
                isActive,
                isFeatured,
                stockQuantity,
                pickupDeadlineDays,
                birthdayBenefitEnabled,
                birthdayPriceLevel,
                discounts: {
                    create: Object.entries(levelDiscounts).map(
                        ([level, discountPct]) => ({
                            companyId,
                            level: level as CustomerLevel,
                            discountPct: Number(discountPct) || 0,
                        })
                    ),
                },
            },
            select: { id: true },
        });

        return jsonOk({ id: created.id }, { status: 201 });
    } catch {
        return jsonErr('Sem permissão para criar produtos.', 403);
    }
}
