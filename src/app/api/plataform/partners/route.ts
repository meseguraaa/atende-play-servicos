// src/app/api/plataform/partners/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requirePlatformForModuleApi } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PartnerVisibilityMode = 'ALL' | 'SELECTED';

type CreatePartnerPayload = {
    name?: string;

    // ✅ upload já existe
    logoUrl?: string | null;
    logoKey?: string | null;

    discountPct?: number | string;

    description?: string | null;
    rules?: string | null;

    ctaUrl?: string;
    ctaLabel?: string | null;

    isActive?: boolean;
    visibilityMode?: PartnerVisibilityMode;
    sortOrder?: number | string;

    // ✅ empresas selecionadas para SELECTED
    companyIds?: string[] | null;
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

function normalizeString(raw: unknown) {
    const s = String(raw ?? '').trim();
    return s.length ? s : '';
}

function normalizeNullableString(raw: unknown) {
    const s = String(raw ?? '').trim();
    return s.length ? s : null;
}

// ✅ header case-insensitive
function getHeaderCI(req: Request, key: string): string | null {
    const target = key.toLowerCase();
    for (const [k, v] of req.headers.entries()) {
        if (k.toLowerCase() === target) {
            const s = String(v ?? '').trim();
            return s.length ? s : null;
        }
    }
    return null;
}

/**
 * ✅ resolve origin correto atrás de proxy (ngrok/vercel/etc)
 * - prioriza x-forwarded-proto + x-forwarded-host
 * - fallback host
 * - fallback final: req.url origin
 */
function getRequestOrigin(req: Request): string {
    const protoRaw = getHeaderCI(req, 'x-forwarded-proto');
    const hostRaw =
        getHeaderCI(req, 'x-forwarded-host') || getHeaderCI(req, 'host');

    const proto = String(protoRaw ?? '')
        .split(',')[0]
        .trim()
        .toLowerCase();
    const host = String(hostRaw ?? '')
        .split(',')[0]
        .trim();

    if (host) {
        const safeProto =
            proto === 'http' || proto === 'https' ? proto : 'https';
        return `${safeProto}://${host}`;
    }

    try {
        return new URL(req.url).origin;
    } catch {
        return '';
    }
}

/**
 * ✅ normaliza URL de imagem:
 * - se vier absoluta (http/https), mantém
 * - se vier "/uploads/..." vira "<origin>/uploads/..."
 * - se vier "uploads/..." (sem /) também normaliza
 * - se origin falhar, devolve ao menos o path
 */
function normalizeImageUrl(origin: string, raw: unknown): string | null {
    const s = String(raw ?? '').trim();
    if (!s) return null;

    const lower = s.toLowerCase();
    if (lower.startsWith('http://') || lower.startsWith('https://')) return s;

    const path = s.startsWith('/') ? s : `/${s}`;
    const base = origin.endsWith('/') ? origin.slice(0, -1) : origin;
    return base ? `${base}${path}` : path;
}

function isValidLogoUrl(logoUrl: string) {
    const s = String(logoUrl ?? '').trim();
    if (!s) return false;

    const lowered = s.toLowerCase();
    if (lowered.startsWith('javascript:')) return false;
    if (lowered.startsWith('data:')) return false;

    // dev/prod: nosso endpoint retorna /uploads/...
    if (s.startsWith('/uploads/')) return true;

    // tolera "uploads/..." sem "/"
    if (s.startsWith('uploads/')) return true;

    // fallback: URL absoluta
    if (lowered.startsWith('http://') || lowered.startsWith('https://'))
        return true;

    return false;
}

function normalizeCtaUrl(raw: unknown): string | null {
    const s = String(raw ?? '').trim();
    if (!s) return null;

    const lower = s.toLowerCase();

    if (lower.startsWith('javascript:')) return null;
    if (lower.startsWith('data:')) return null;

    if (lower.startsWith('http://') || lower.startsWith('https://')) return s;

    if (lower.startsWith('www.')) return `https://${s}`;

    return null;
}

function normalizeVisibilityMode(raw: unknown): PartnerVisibilityMode {
    const s = String(raw ?? '')
        .trim()
        .toUpperCase();

    return s === 'SELECTED' ? 'SELECTED' : 'ALL';
}

function normalizeCompanyIds(raw: unknown): string[] {
    if (!Array.isArray(raw)) return [];
    const ids = raw.map((v) => String(v ?? '').trim()).filter(Boolean);

    // unique preservando ordem
    const seen = new Set<string>();
    const out: string[] = [];
    for (const id of ids) {
        if (seen.has(id)) continue;
        seen.add(id);
        out.push(id);
    }
    return out;
}

/**
 * GET /api/plataform/partners
 * ✅ Rota de PLATAFORMA (AtendePlay):
 * - lista parceiros globais (catálogo)
 * - filtros:
 *   ?q=texto (nome)
 *   ?active=1|0
 *
 * ✅ Normaliza logoUrl para absoluta quando for "/uploads/..."
 */
export async function GET(request: Request) {
    const auth = await requirePlatformForModuleApi('PARTNERS');
    if (auth instanceof NextResponse) return auth;

    try {
        const origin = getRequestOrigin(request);

        const url = new URL(request.url);
        const q = String(url.searchParams.get('q') ?? '').trim();
        const activeRaw = String(url.searchParams.get('active') ?? '').trim();

        const activeFilter =
            activeRaw === '1' ? true : activeRaw === '0' ? false : null;

        const where: any = {
            ...(activeFilter === null ? {} : { isActive: activeFilter }),
            ...(q
                ? {
                      name: {
                          contains: q,
                          mode: 'insensitive',
                      },
                  }
                : {}),
        };

        const partners = await prisma.partner.findMany({
            where,
            orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }, { id: 'asc' }],
            select: {
                id: true,
                name: true,
                logoUrl: true,
                logoKey: true,
                discountPct: true,
                description: true,
                rules: true,
                ctaUrl: true,
                ctaLabel: true,
                isActive: true,
                visibilityMode: true,
                sortOrder: true,
                createdAt: true,
                updatedAt: true,

                // ✅ para UI editar SELECTED
                companies: {
                    where: { isEnabled: true },
                    select: { companyId: true },
                },
            },
        });

        return jsonOk({
            partners: partners.map((p) => {
                const ctaUrl = normalizeCtaUrl(p.ctaUrl);

                const visibilityMode = normalizeVisibilityMode(
                    p.visibilityMode
                );

                // ✅ aqui é o “pulo do gato” 🐈‍⬛: deixa pronto pro app/UI
                const logoUrl = normalizeImageUrl(origin, p.logoUrl);

                return {
                    id: p.id,
                    name: p.name,
                    logoUrl,
                    logoKey: p.logoKey ?? null,
                    discountPct: toInt(p.discountPct, 0, { min: 0, max: 100 }),
                    description: p.description ?? null,
                    rules: p.rules ?? null,
                    ctaUrl: ctaUrl ?? null,
                    ctaLabel: p.ctaLabel ?? null,
                    isActive: Boolean(p.isActive),
                    visibilityMode,
                    sortOrder: toInt(p.sortOrder, 100, {
                        min: 0,
                        max: 100000,
                    }),
                    // ✅ só faz sentido quando SELECTED
                    companyIds:
                        visibilityMode === 'SELECTED'
                            ? p.companies.map((c) => c.companyId)
                            : [],
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                };
            }),
        });
    } catch (e) {
        console.error('[platform partners GET] error:', e);
        return jsonErr('Erro ao listar parceiros.', 500);
    }
}

/**
 * POST /api/plataform/partners
 * ✅ Rota de PLATAFORMA (AtendePlay):
 * - cria parceiro
 * - ✅ se visibilityMode=SELECTED, grava vínculos em PartnerVisibility
 */
export async function POST(request: Request) {
    const auth = await requirePlatformForModuleApi('PARTNERS');
    if (auth instanceof NextResponse) return auth;

    try {
        const body = (await request
            .json()
            .catch(() => null)) as CreatePartnerPayload | null;
        if (!body) return jsonErr('Body inválido.');

        const name = normalizeString(body.name);
        if (!name) return jsonErr('Nome é obrigatório.');

        const logoUrl = normalizeNullableString(body.logoUrl);
        if (!logoUrl) return jsonErr('logoUrl é obrigatório.');
        if (!isValidLogoUrl(logoUrl))
            return jsonErr(
                'logoUrl inválida. Envie uma imagem (upload) ou forneça uma URL http(s) válida.',
                400
            );

        const logoKey = normalizeNullableString(body.logoKey);

        const discountPct = toInt(body.discountPct, 0, { min: 0, max: 100 });

        const description = normalizeNullableString(body.description);
        const rules = normalizeNullableString(body.rules);

        const ctaUrl = normalizeCtaUrl(body.ctaUrl);
        if (!ctaUrl)
            return jsonErr(
                'ctaUrl inválida. Informe uma URL http(s) (ou começando com www.).',
                400
            );

        const ctaLabel =
            normalizeNullableString(body.ctaLabel) ||
            'Ativar cashback e ir pra loja';

        const isActive =
            typeof body.isActive === 'boolean' ? body.isActive : true;

        const visibilityMode = normalizeVisibilityMode(body.visibilityMode);

        const sortOrder = toInt(body.sortOrder, 100, { min: 0, max: 100000 });

        const companyIds = normalizeCompanyIds(body.companyIds);

        // ✅ regra do SELECTED
        if (visibilityMode === 'SELECTED' && companyIds.length === 0) {
            return jsonErr(
                'visibilityMode=SELECTED exige pelo menos 1 empresa em companyIds.',
                400
            );
        }

        const created = await prisma.partner.create({
            data: {
                name,
                logoUrl,
                logoKey,
                discountPct,
                description,
                rules,
                ctaUrl,
                ctaLabel,
                isActive,
                visibilityMode: visibilityMode as any, // prisma enum
                sortOrder,

                ...(visibilityMode === 'SELECTED'
                    ? {
                          companies: {
                              create: companyIds.map((companyId) => ({
                                  companyId,
                                  isEnabled: true,
                              })),
                          },
                      }
                    : {}),
            },
            select: { id: true },
        });

        return jsonOk({ id: created.id }, { status: 201 });
    } catch (e) {
        console.error('[platform partners POST] error:', e);
        return jsonErr('Erro ao criar parceiro.', 500);
    }
}
