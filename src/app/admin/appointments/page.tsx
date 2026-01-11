// src/app/admin/appointments/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';
import AdminAppointmentsClient from './admin-appointments-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Agendamentos',
};

type AdminAppointmentsPageProps = {
    searchParams: Promise<{
        unit?: string; // "all" | unitId (mantemos compat com "all", mas redireciona)
    }>;
};

function buildAppointmentsRedirect(params: { unit?: string }) {
    const sp = new URLSearchParams();
    if (params.unit) sp.set('unit', params.unit);
    const qs = sp.toString();
    return qs ? `/admin/appointments?${qs}` : '/admin/appointments';
}

export default async function AdminAppointmentsPage({
    searchParams,
}: AdminAppointmentsPageProps) {
    const session = await requireAdminForModule('APPOINTMENTS');

    // 🔒 Hard lock multi-tenant
    const companyId = session.companyId;
    if (!companyId) redirect('/admin');

    // ✅ FIX: AdminSession usa `id` (não `userId`)
    const userId = session.id;
    if (!userId) redirect('/admin');

    const canSeeAllUnits = session.canSeeAllUnits;

    const { unit: unitParam } = await searchParams;

    // ✅ Unidades acessíveis
    const units = canSeeAllUnits
        ? await prisma.unit.findMany({
              where: { companyId, isActive: true },
              select: { id: true, name: true },
              orderBy: { name: 'asc' },
          })
        : await (async () => {
              const access = await prisma.adminUnitAccess.findMany({
                  where: { companyId, userId },
                  select: { unitId: true },
              });

              const unitIds = access.map((a) => a.unitId).filter(Boolean);
              if (!unitIds.length) return [];

              return prisma.unit.findMany({
                  where: {
                      companyId,
                      isActive: true,
                      id: { in: unitIds },
                  },
                  select: { id: true, name: true },
                  orderBy: { name: 'asc' },
              });
          })();

    // ✅ Default unit: sempre cair numa unidade real quando existir
    const defaultUnitId = units.length > 0 ? units[0].id : null;

    // Se veio vazio ou "all", cai na default (compat)
    if (defaultUnitId && (!unitParam || unitParam === 'all')) {
        redirect(buildAppointmentsRedirect({ unit: defaultUnitId }));
    }

    // ✅ Unidade ativa (quando não existe default, fica null)
    const activeUnitId =
        unitParam && unitParam !== 'all' ? unitParam : defaultUnitId;

    // ✅ Valida que a unit está acessível nesta tela
    const activeUnit = activeUnitId
        ? (units.find((u) => u.id === activeUnitId) ?? null)
        : null;

    if (activeUnitId && !activeUnit && defaultUnitId) {
        redirect(buildAppointmentsRedirect({ unit: defaultUnitId }));
    }

    const scopeLabel =
        activeUnit?.name ??
        (canSeeAllUnits ? 'todas as unidades' : 'unidade selecionada');

    // ✅ Se só tem 1 unidade disponível, não tem por que trocar
    // Obs.: como o unit-picker agora vive no menu, isso tende a ser sempre "true" pra tela.
    const unitPickerDisabled = units.length <= 1;

    return (
        <AdminAppointmentsClient
            scopeLabel={scopeLabel}
            units={units}
            canSeeAllUnits={canSeeAllUnits}
            unitPickerDisabled={unitPickerDisabled}
        />
    );
}
