// src/app/admin/layout.tsx
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { AdminNav, type UnitOption } from '@/components/admin/admin-nav';
import { prisma } from '@/lib/prisma';
import { getCurrentPainelUser } from '@/lib/painel-session';
import AdminPermissionToast from './admin-permission-toast';

import { ADMIN_MENU } from '@/lib/admin-menu';
import { canAccess } from '@/lib/admin-access-map';

export const dynamic = 'force-dynamic';

type AdminAccessLike = {
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

function getFirstAllowedEnabledHref(
    access: AdminAccessLike | null
): string | null {
    if (!access) return null;

    for (const item of ADMIN_MENU) {
        if (!item.enabled) continue;
        if (!canAccess(access as any, item.menuKey)) continue;
        return item.href;
    }

    return null;
}

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    // ✅ Aqui a gente só garante "é ADMIN logado" (sem exigir módulo).
    const session = await getCurrentPainelUser();

    if (!session) {
        redirect('/painel/login?error=credenciais');
    }

    if (session.role !== 'ADMIN') {
        redirect('/painel/login?error=permissao');
    }

    const userId = String((session as any).sub || '').trim();
    const companyId = String((session as any).companyId || '').trim();

    if (!userId || !companyId) {
        redirect('/painel/login?error=permissao');
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, isActive: true },
    });

    if (!user?.id || !user.isActive) {
        redirect('/painel/login?error=permissao');
    }

    const membership = await prisma.companyMember.findFirst({
        where: {
            userId,
            companyId,
            isActive: true,
            role: { in: ['OWNER', 'ADMIN'] },
        },
        select: { role: true },
    });

    if (!membership?.role) {
        redirect('/painel/login?error=permissao');
    }

    const isOwner = membership.role === 'OWNER';

    // OWNER: mostra tudo no menu
    // Sub-admin: precisa ter AdminAccess no banco
    const adminAccess: AdminAccessLike | null = isOwner
        ? {
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
          }
        : await prisma.adminAccess.findFirst({
              where: { companyId, userId },
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

    if (!isOwner && !adminAccess) {
        redirect('/painel/login?error=permissao');
    }

    // ✅ Regra definitiva:
    // Se não houver NENHUM módulo liberado (e habilitado), não entra no /admin.
    // (E não tenta “forçar” /admin/dashboard).
    if (!isOwner) {
        const firstAllowed = getFirstAllowedEnabledHref(adminAccess);

        if (!firstAllowed) {
            redirect('/painel/login?error=permissao');
        }
    }

    /**
     * ✅ Unit options para o unit-picker no AdminNav
     * - OWNER: todas as unidades ativas da empresa
     * - Sub-admin: apenas unidades associadas via AdminUnitAccess
     *
     * Obs.: não adicionamos "all" agora, pra não deixar usuário selecionar algo
     * que as páginas ainda não tratam.
     */
    const units = await prisma.unit.findMany({
        where: {
            companyId,
            isActive: true,
        },
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            name: 'asc',
        },
    });

    let unitOptions: UnitOption[] = [];

    if (isOwner) {
        unitOptions = units.map((u) => ({ id: u.id, name: u.name }));
    } else {
        const allowed = await prisma.adminUnitAccess.findMany({
            where: {
                companyId,
                userId,
            },
            select: {
                unitId: true,
            },
        });

        const allowedIds = new Set(allowed.map((a) => a.unitId));
        unitOptions = units
            .filter((u) => allowedIds.has(u.id))
            .map((u) => ({ id: u.id, name: u.name }));
    }

    return (
        <div className="min-h-screen bg-background-primary">
            {/* Toast global (client) */}
            <AdminPermissionToast />

            <AdminNav
                adminAccess={adminAccess ?? undefined}
                unitOptions={unitOptions}
            />

            <main className="pl-14">
                <div className="w-full max-w-7xl mx-auto px-4 py-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
