// src/app/painel/login/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { loginWithCredentialsWithPrisma, AuthError } from '@/lib/auth';
import { createPainelSessionCookie } from '@/lib/painel-session';
import { ADMIN_MENU } from '@/lib/admin-menu';
import { canAccess } from '@/lib/admin-access-map';

function redirectWithError(code: string): never {
    redirect(`/painel/login?error=${encodeURIComponent(code)}`);
}

const DEV_DEFAULT_TENANT = 'atendeplay';

function getTenantSlugFromHost(host: string): string | null {
    const cleanHost = String(host || '')
        .trim()
        .toLowerCase()
        .split(':')[0];

    if (!cleanHost) return null;

    if (cleanHost === 'localhost' || cleanHost.endsWith('.localhost')) {
        return DEV_DEFAULT_TENANT;
    }

    const parts = cleanHost.split('.').filter(Boolean);
    if (parts.length < 2) return null;

    const first = parts[0] === 'www' ? parts[1] : parts[0];
    return first || null;
}

async function resolveCompanyIdFromRequestHost(): Promise<string> {
    const { headers } = await import('next/headers');
    const h = await headers();
    const host = h.get('host') ?? '';
    const tenantSlug = getTenantSlugFromHost(host);
    if (!tenantSlug) throw new Error('tenant_not_found');

    const company = await prisma.company.findFirst({
        where: { slug: tenantSlug, isActive: true },
        select: { id: true },
    });

    if (!company?.id) throw new Error('missing_company');
    return String(company.id);
}

type AdminAccessRow = {
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

function pickFirstAdminRouteWithFallback(access: AdminAccessRow | null) {
    if (!access) return null;

    // ✅ Mesma ordem do menu + respeita "enabled" (módulo temporariamente desativado)
    for (const item of ADMIN_MENU) {
        if (!item.enabled) continue;
        if (!canAccess(access as any, item.menuKey)) continue;
        return item.href;
    }

    return null;
}

export async function loginPainel(formData: FormData) {
    const email = String(formData.get('email') ?? '')
        .trim()
        .toLowerCase();
    const password = String(formData.get('password') ?? '');

    if (!email || !password) {
        redirectWithError('credenciais');
    }

    try {
        const user = await loginWithCredentialsWithPrisma(
            prisma,
            email,
            password
        );

        await createPainelSessionCookie(user);

        if (user.role === 'ADMIN') {
            const dbUser = await prisma.user.findUnique({
                where: { id: user.id },
                select: { isOwner: true },
            });

            // Owner: segue padrão atual (pode ver tudo)
            if (dbUser?.isOwner) {
                redirect('/admin/dashboard');
            }

            const companyId = await resolveCompanyIdFromRequestHost();

            const access = await prisma.adminAccess.findFirst({
                where: { companyId, userId: user.id },
                select: {
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

            const nextRoute = pickFirstAdminRouteWithFallback(access);

            // Fail-closed: sem nenhum módulo permitido + habilitado => sem acesso
            if (!nextRoute) {
                redirectWithError('permissao');
            }

            return redirect(nextRoute);
        }

        redirect('/professional/dashboard');
    } catch (err: any) {
        if (
            err?.message === 'NEXT_REDIRECT' ||
            String(err?.digest || '').startsWith('NEXT_REDIRECT')
        ) {
            throw err;
        }

        if (err instanceof AuthError) {
            redirectWithError(err.code);
        }

        const msg = String(err?.message ?? '')
            .trim()
            .toLowerCase();

        if (msg.includes('tenant_not_found'))
            redirectWithError('tenant_not_found');
        if (msg.includes('missing_company'))
            redirectWithError('missing_company');
        if (msg.includes('missing_unit')) redirectWithError('missing_unit');
        if (msg === 'permissao') redirectWithError('permissao');

        console.error('[loginPainel] erro real:', err);
        redirectWithError('desconhecido');
    }
}
