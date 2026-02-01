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
        date?: string; // yyyy-MM-dd (São Paulo)
    }>;
};

const SAO_PAULO_UTC_OFFSET_HOURS = 3; // SP = UTC-03 => 00:00 SP = 03:00 UTC

function buildAppointmentsRedirect(params: { unit?: string; date?: string }) {
    const sp = new URLSearchParams();
    if (params.unit) sp.set('unit', params.unit);
    if (params.date) sp.set('date', params.date);
    const qs = sp.toString();
    return qs ? `/admin/appointments?${qs}` : '/admin/appointments';
}

function parseDateParam(
    dateStr?: string
): { y: number; m: number; d: number } | null {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return null;
    return { y, m, d };
}

function ymdToString(ymd: { y: number; m: number; d: number }): string {
    const y = String(ymd.y).padStart(4, '0');
    const m = String(ymd.m).padStart(2, '0');
    const d = String(ymd.d).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * “Hoje” em São Paulo (retorna Y/M/D), independente do timezone do server.
 */
function getSaoPauloTodayYmd(): { y: number; m: number; d: number } {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const parts = formatter.formatToParts(now);
    const d = Number(parts.find((p) => p.type === 'day')?.value ?? '1');
    const m = Number(parts.find((p) => p.type === 'month')?.value ?? '1');
    const y = Number(parts.find((p) => p.type === 'year')?.value ?? '1970');

    return { y, m, d };
}

/**
 * Converte o “dia SP” para range UTC (pra filtrar scheduleAt em UTC no banco).
 * startUtc = 00:00 SP (03:00Z)
 * endUtc   = 23:59:59.999 SP (02:59:59.999Z do dia seguinte)
 */
function buildSaoPauloDayUtcRange(ymd: { y: number; m: number; d: number }) {
    const { y, m, d } = ymd;

    const startUtcMs = Date.UTC(
        y,
        m - 1,
        d,
        SAO_PAULO_UTC_OFFSET_HOURS,
        0,
        0,
        0
    );
    const nextDayStartUtcMs = Date.UTC(
        y,
        m - 1,
        d + 1,
        SAO_PAULO_UTC_OFFSET_HOURS,
        0,
        0,
        0
    );

    const startUtc = new Date(startUtcMs);
    const endUtc = new Date(nextDayStartUtcMs - 1);

    return { startUtc, endUtc };
}

export default async function AdminAppointmentsPage({
    searchParams,
}: AdminAppointmentsPageProps) {
    const session = await requireAdminForModule('APPOINTMENTS');

    // 🔒 Hard lock multi-tenant
    const companyId = session.companyId;
    if (!companyId) redirect('/admin');

    // ✅ AdminSession usa `id` (não `userId`)
    const userId = session.id;
    if (!userId) redirect('/admin');

    const canSeeAllUnits = session.canSeeAllUnits;

    const { unit: unitParam, date: dateParam } = await searchParams;

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

    // ✅ Data (dia SP) padronizada
    const parsed = parseDateParam(dateParam);
    const ymd = parsed ?? getSaoPauloTodayYmd();
    const dateStrSp = ymdToString(ymd);

    // ✅ Canoniza a unit (compat com "all" / vazio)
    if (defaultUnitId && (!unitParam || unitParam === 'all')) {
        redirect(
            buildAppointmentsRedirect({ unit: defaultUnitId, date: dateStrSp })
        );
    }

    // ✅ Unidade ativa (quando não existe default, fica null)
    const activeUnitId =
        unitParam && unitParam !== 'all' ? unitParam : defaultUnitId;

    // ✅ Valida que a unit está acessível nesta tela
    const activeUnit = activeUnitId
        ? (units.find((u) => u.id === activeUnitId) ?? null)
        : null;

    if (activeUnitId && !activeUnit && defaultUnitId) {
        redirect(
            buildAppointmentsRedirect({ unit: defaultUnitId, date: dateStrSp })
        );
    }

    // ✅ Canoniza a date: se veio vazia/inválida, redireciona com a data calculada
    // (evita UI mostrando “hoje”, mas URL sem date)
    if (activeUnitId && (!dateParam || !parsed)) {
        // evita loop se por algum motivo já estiver igual
        if (dateParam !== dateStrSp) {
            redirect(
                buildAppointmentsRedirect({
                    unit: activeUnitId,
                    date: dateStrSp,
                })
            );
        }
    }

    const scopeLabel =
        activeUnit?.name ??
        (canSeeAllUnits ? 'todas as unidades' : 'unidade selecionada');

    // ✅ range UTC do “dia SP”
    const { startUtc, endUtc } = buildSaoPauloDayUtcRange(ymd);

    // ✅ Se não há unidade acessível, devolve tela vazia (sem quebrar)
    if (!activeUnitId) {
        return (
            <AdminAppointmentsClient
                scopeLabel={scopeLabel}
                date={dateStrSp}
                activeUnitId={null}
                units={units}
                appointments={[]}
                professionals={[]}
                services={[]}
                clients={[]}
            />
        );
    }

    const [
        appointmentsPrisma,
        professionalsPrisma,
        servicesPrisma,
        clientsPrisma,
    ] = await Promise.all([
        prisma.appointment.findMany({
            where: {
                companyId,
                unitId: activeUnitId,
                scheduleAt: {
                    gte: startUtc,
                    lte: endUtc,
                },
            },
            orderBy: { scheduleAt: 'asc' },
            include: {
                professional: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        isActive: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                        image: true,
                        isActive: true,
                    },
                },
                service: {
                    select: {
                        id: true,
                        name: true,
                        durationMinutes: true,
                        price: true,
                        isActive: true,
                    },
                },
            },
        }),

        prisma.professional.findMany({
            where: {
                companyId,
                isActive: true,
                units: {
                    some: {
                        unitId: activeUnitId,
                        isActive: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                isActive: true,
            },
        }),

        prisma.service.findMany({
            where: {
                companyId,
                isActive: true,
                OR: [{ unitId: activeUnitId }, { unitId: null }],
            },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                durationMinutes: true,
                price: true,
                isActive: true,
                unitId: true, // ✅ necessário pro modal filtrar serviços por unidade
            },
        }),

        prisma.user.findMany({
            where: {
                isActive: true,
                companyMemberships: {
                    some: {
                        companyId,
                        isActive: true,
                        role: 'CLIENT',
                    },
                },
            },
            orderBy: { name: 'asc' },
            take: 200,
            select: {
                id: true,
                name: true,
                phone: true,
            },
        }),
    ]);

    const appointments = appointmentsPrisma.map((a) => ({
        id: a.id,
        unitId: a.unitId,

        clientId: a.clientId,
        clientName: a.clientName,
        phone: a.phone,

        description: a.description,

        scheduleAt: a.scheduleAt,

        status: a.status,

        professionalId: a.professionalId ?? null,
        professional: a.professional
            ? {
                  id: a.professional.id,
                  name: a.professional.name,
                  imageUrl: a.professional.imageUrl ?? null,
              }
            : null,

        serviceId: a.serviceId ?? null,
    }));

    const professionals = professionalsPrisma.map((p) => ({
        id: p.id,
        name: p.name,
        imageUrl: p.imageUrl ?? null,
        isActive: p.isActive,
    }));

    const services = servicesPrisma.map((s) => ({
        id: s.id,
        name: s.name,
        durationMinutes: s.durationMinutes,
        price: s.price ? Number(s.price) : undefined,
        isActive: s.isActive,
        unitId: s.unitId ?? null, // ✅ necessário pro modal
    }));

    const clients = clientsPrisma
        .map((c) => ({
            id: c.id,
            name: (c.name ?? '').trim(),
            phone: (c.phone ?? '').trim() || null,
        }))
        .filter((c) => c.name.length > 0);

    return (
        <AdminAppointmentsClient
            scopeLabel={scopeLabel}
            date={dateStrSp}
            activeUnitId={activeUnitId}
            units={units}
            appointments={appointments}
            professionals={professionals}
            services={services}
            clients={clients}
        />
    );
}
