// src/app/painel/login/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { loginWithCredentialsWithPrisma, AuthError } from '@/lib/auth';
import {
    createPainelSessionCookie,
    getCurrentPainelUser,
} from '@/lib/painel-session';
import { ADMIN_MENU } from '@/lib/admin-menu';
import { canAccess } from '@/lib/admin-access-map';

function redirectWithError(code: string): never {
    redirect(`/painel/login?error=${encodeURIComponent(code)}`);
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

function isPlatformRole(role: string) {
    const r = String(role || '').toUpperCase();
    return r === 'PLATFORM_OWNER' || r === 'PLATFORM_STAFF';
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

        // ✅ PLATAFORMA: não depende de tenant nem de AdminAccess
        if (isPlatformRole(user.role)) {
            redirect('/plataform/dashboard');
        }

        // ✅ ADMIN (tenant)
        if (user.role === 'ADMIN') {
            const dbUser = await prisma.user.findUnique({
                where: { id: user.id },
                select: { isOwner: true },
            });

            // Owner: segue padrão atual (pode ver tudo)
            if (dbUser?.isOwner) {
                redirect('/admin/dashboard');
            }

            // ✅ pega o companyId do MESMO payload que o resto do painel vai usar
            const session = await getCurrentPainelUser();
            const companyId = session?.companyId;

            if (!companyId) {
                // se não tem companyId aqui, é porque o tenant não foi resolvido
                redirectWithError('tenant_not_found');
            }

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

        // ✅ PROFESSIONAL
        if (user.role === 'PROFESSIONAL') {
            redirect('/professional/dashboard');
        }

        // ✅ Qualquer role inesperado (fail-closed)
        redirectWithError('permissao');
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
