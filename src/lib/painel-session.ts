// src/lib/painel-session.ts
import { cookies, headers } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import type { AuthenticatedUser } from './auth';

const SESSION_COOKIE_NAME = 'painel_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8h
const DEV_DEFAULT_TENANT = 'atendeplay';

function getJwtSecretKey() {
    const secret = process.env.PAINEL_JWT_SECRET;
    if (!secret) throw new Error('PAINEL_JWT_SECRET não definido no .env');
    return new TextEncoder().encode(secret);
}

/**
 * Resolve tenant slug pelo subdomínio:
 * clientea.atendeplay.com.br => "clientea"
 */
function getTenantSlugFromHost(host: string): string | null {
    const cleanHost = String(host || '')
        .trim()
        .toLowerCase()
        .split(':')[0]; // remove :3000

    if (!cleanHost) return null;

    // ✅ DEV: localhost e *.localhost usam tenant padrão
    if (cleanHost === 'localhost' || cleanHost.endsWith('.localhost')) {
        return DEV_DEFAULT_TENANT;
    }

    const parts = cleanHost.split('.').filter(Boolean);
    if (parts.length < 2) return null;

    // ignora www
    const first = parts[0] === 'www' ? parts[1] : parts[0];

    if (!first) return null;

    return first;
}

async function getTenantSlugFromRequestHeaders(): Promise<string> {
    const h = await headers();
    const host = h.get('host') ?? '';
    const slug = getTenantSlugFromHost(host);
    if (!slug) throw new Error('tenant_not_found');
    return slug;
}

export type PainelRole =
    | 'ADMIN'
    | 'PROFESSIONAL'
    | 'PLATFORM_OWNER'
    | 'PLATFORM_STAFF';

export type PainelSessionPayload = {
    sub: string; // userId
    role: PainelRole;
    email: string;
    name?: string | null;

    /**
     * ✅ Tenant-only fields
     * (Admin/Professional)
     */
    tenantSlug?: string;
    companyId?: string;

    unitId?: string | null;
    canSeeAllUnits?: boolean;

    professionalId?: string | null;
};

function isPlatformRole(role: string) {
    const r = String(role || '').toUpperCase();
    return r === 'PLATFORM_OWNER' || r === 'PLATFORM_STAFF';
}

function isTenantRole(role: string) {
    const r = String(role || '').toUpperCase();
    return r === 'ADMIN' || r === 'PROFESSIONAL';
}

async function resolveCompanyByTenantSlug(tenantSlug: string) {
    const company = await prisma.company.findFirst({
        where: { slug: tenantSlug, isActive: true },
        select: { id: true, slug: true },
    });

    if (!company?.id) throw new Error('missing_company');
    return {
        companyId: String(company.id),
        tenantSlug: String(company.slug ?? tenantSlug),
    };
}

/**
 * Resolve PROFESSIONAL dentro da company do tenant.
 * - Preferência: userId
 * - Fallback: email
 * - unitId automático se houver 1 unidade ativa
 */
async function resolveProfessionalContext(params: {
    companyId: string;
    userId: string;
    email: string;
}): Promise<{
    professionalId: string;
    unitId: string | null;
} | null> {
    const select = {
        id: true,
        units: {
            where: { isActive: true },
            select: { unitId: true },
        },
    } as const;

    const byUserId = params.userId
        ? await prisma.professional.findFirst({
              where: {
                  companyId: params.companyId,
                  userId: params.userId,
                  isActive: true,
              },
              select,
          })
        : null;

    const prof =
        byUserId ??
        (params.email
            ? await prisma.professional.findFirst({
                  where: {
                      companyId: params.companyId,
                      email: params.email,
                      isActive: true,
                  },
                  select,
              })
            : null);

    if (!prof?.id) return null;

    const unitIds = prof.units.map((u) => String(u.unitId)).filter(Boolean);
    const unitId = unitIds.length === 1 ? unitIds[0] : null;

    return {
        professionalId: String(prof.id),
        unitId,
    };
}

type AdminAccessPerms = {
    canAccessDashboard: boolean;
    canAccessReports: boolean;
    canAccessCheckout: boolean;
    canAccessAppointments: boolean;
    canAccessProfessionals: boolean;
    canAccessServices: boolean;
    canAccessReviews: boolean;
    canAccessProducts: boolean;
    canAccessClients: boolean;
    canAccessClientLevels: boolean;
    canAccessFinance: boolean;
    canAccessSettings: boolean;
};

function defaultAdminPerms(): AdminAccessPerms {
    // ✅ defaults do painel (mesmos que você usa na UI)
    return {
        canAccessDashboard: true,
        canAccessReports: false,
        canAccessCheckout: false,
        canAccessAppointments: true,
        canAccessProfessionals: false,
        canAccessServices: false,
        canAccessReviews: false,
        canAccessProducts: false,
        canAccessClients: true,
        canAccessClientLevels: false,
        canAccessFinance: false,
        canAccessSettings: false,
    };
}

export async function createSessionToken(
    user: AuthenticatedUser
): Promise<string> {
    const userId = String(user.id ?? '').trim();
    const email = String(user.email ?? '')
        .trim()
        .toLowerCase();
    const name = user.name ?? null;

    if (!userId) throw new Error('Sem acesso (id ausente).');
    if (!email) throw new Error('Sem acesso (email ausente).');

    const role = String(user.role || '').toUpperCase();

    // ✅ PLATFORM: não depende de tenantSlug/companyId
    if (isPlatformRole(role)) {
        const payload: PainelSessionPayload = {
            sub: userId,
            role: role as PainelRole,
            email,
            name,
        };

        return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
            .sign(getJwtSecretKey());
    }

    // ✅ Abaixo daqui: tenant-only (ADMIN / PROFESSIONAL)
    if (!isTenantRole(role)) {
        throw new Error('permissao');
    }

    // ✅ Tenant vem do host
    const tenantSlug = await getTenantSlugFromRequestHeaders();

    // ✅ Company vem do tenantSlug
    const { companyId } = await resolveCompanyByTenantSlug(tenantSlug);

    // ===== ADMIN =====
    if (role === 'ADMIN') {
        const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                adminAccesses: {
                    where: { companyId },
                    select: {
                        companyId: true,
                        unitId: true,
                        canAccessDashboard: true,
                        canAccessReports: true,
                        canAccessCheckout: true,
                        canAccessAppointments: true,
                        canAccessProfessionals: true,
                        canAccessServices: true,
                        canAccessReviews: true,
                        canAccessProducts: true,
                        canAccessClients: true,
                        canAccessClientLevels: true,
                        canAccessFinance: true,
                        canAccessSettings: true,
                    },
                },
                companyMemberships: {
                    where: { isActive: true, companyId },
                    select: { companyId: true, role: true },
                },
            },
        });

        if (!dbUser) throw new Error('Sem acesso');

        const membership = dbUser.companyMemberships?.[0] ?? null;
        const access0 = dbUser.adminAccesses?.[0] ?? null;

        // Precisa ter vínculo com a company do tenant
        if (!membership && !access0) {
            throw new Error('missing_company');
        }

        const isOwner = String(membership?.role ?? '') === 'OWNER';

        // OWNER: vê tudo
        if (isOwner) {
            const payload: PainelSessionPayload = {
                sub: userId,
                role: 'ADMIN',
                email,
                name,
                tenantSlug,
                companyId,
                unitId: null,
                canSeeAllUnits: true,
            };

            return await new SignJWT(payload)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
                .sign(getJwtSecretKey());
        }

        // ADMIN configurável: precisa ter membership na company do tenant
        if (!membership) {
            throw new Error('missing_company');
        }

        let access = access0;

        // ✅ auto-heal: cria adminAccess se não existir (evita bloquear login por inconsistência)
        if (!access) {
            const created = await prisma.adminAccess.create({
                data: {
                    companyId,
                    userId,
                    unitId: null,
                    ...defaultAdminPerms(),
                } as any,
                select: {
                    companyId: true,
                    unitId: true,
                    canAccessDashboard: true,
                    canAccessReports: true,
                    canAccessCheckout: true,
                    canAccessAppointments: true,
                    canAccessProfessionals: true,
                    canAccessServices: true,
                    canAccessReviews: true,
                    canAccessProducts: true,
                    canAccessClients: true,
                    canAccessClientLevels: true,
                    canAccessFinance: true,
                    canAccessSettings: true,
                },
            });

            access = created as any;
        }

        const payload: PainelSessionPayload = {
            sub: userId,
            role: 'ADMIN',
            email,
            name,
            tenantSlug,
            companyId,
            unitId: access.unitId == null ? null : String(access.unitId),
            canSeeAllUnits: false,
        };

        return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
            .sign(getJwtSecretKey());
    }

    // ===== PROFESSIONAL =====
    // role já está validado por isTenantRole, mas mantemos a checagem explícita
    if (role !== 'PROFESSIONAL') {
        throw new Error('permissao');
    }

    const professionalCtx = await resolveProfessionalContext({
        companyId,
        userId,
        email,
    });

    if (!professionalCtx) {
        throw new Error('permissao');
    }

    const payload: PainelSessionPayload = {
        sub: userId,
        role: 'PROFESSIONAL',
        email,
        name,
        tenantSlug,
        companyId,
        unitId: professionalCtx.unitId,
        canSeeAllUnits: false,
        professionalId: professionalCtx.professionalId,
    };

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
        .sign(getJwtSecretKey());
}

export async function verifySessionToken(
    token: string
): Promise<PainelSessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        const p = payload as any;

        const role = String(p?.role ?? '').toUpperCase();

        // ✅ Roles válidos
        const isValidRole =
            role === 'ADMIN' ||
            role === 'PROFESSIONAL' ||
            role === 'PLATFORM_OWNER' ||
            role === 'PLATFORM_STAFF';

        if (!isValidRole) return null;

        const base: PainelSessionPayload = {
            sub: String(p?.sub ?? ''),
            role: role as PainelRole,
            email: String(p?.email ?? ''),
            name: (p?.name ?? null) as string | null,
            unitId: p?.unitId == null ? null : String(p.unitId),
            canSeeAllUnits:
                typeof p?.canSeeAllUnits === 'boolean'
                    ? p.canSeeAllUnits
                    : undefined,
            professionalId:
                p?.professionalId == null ? null : String(p.professionalId),
        };

        // ✅ PLATFORM: não exige tenantSlug/companyId
        if (isPlatformRole(role)) {
            if (!base.sub || !base.email) return null;
            return base;
        }

        // ✅ TENANT (ADMIN/PROFESSIONAL): exige tenantSlug + companyId
        const tenantSlug = String(p?.tenantSlug ?? '')
            .trim()
            .toLowerCase();
        const companyId = String(p?.companyId ?? '').trim();

        if (!tenantSlug || !companyId) return null;

        return {
            ...base,
            tenantSlug,
            companyId,
        };
    } catch {
        return null;
    }
}

export async function getCurrentPainelUser(): Promise<PainelSessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
}

export async function createPainelSessionCookie(user: AuthenticatedUser) {
    const token = await createSessionToken(user);
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_MAX_AGE_SECONDS,
    });
}

export async function clearPainelSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
