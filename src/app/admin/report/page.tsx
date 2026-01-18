// src/app/admin/reports/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';

import { requireAdminForModule } from '@/lib/admin-permissions';
import { prisma } from '@/lib/prisma';

import { cn } from '@/lib/utils';

import { CalendarClock, Users2, Filter, Wallet, BarChart3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Relatórios',
};

type ReportCard = {
    href: string;
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    badgeTone?: 'ready' | 'soon';
};

const reports: ReportCard[] = [
    {
        href: '/admin/report/occupancy',
        title: 'Ocupação da agenda',
        description:
            'Veja os horários de pico e de ociosidade da agenda por dia e hora. Compare profissionais e encontre oportunidades de encaixe.',
        icon: CalendarClock,
        badgeTone: 'ready',
    },
    {
        href: '/admin/report/retention',
        title: 'Retenção de clientes',
        description:
            'Entenda se os clientes voltam após a primeira compra. Veja retorno em 30/60/90 dias e acompanhe a evolução mês a mês.',
        icon: Users2,
        badgeTone: 'ready',
    },
    {
        href: '/admin/report/funnel',
        title: 'Funil do agendamento',
        description:
            'Acompanhe criados → realizados → pendentes/cancelados. Descubra onde a agenda não vira receita e onde está o gargalo.',
        icon: Filter,
        badgeTone: 'ready',
    },
    {
        href: '/admin/report/revenue',
        title: 'Faturamento, Ticket & Comissão',
        description:
            'Entenda de onde vem o faturamento: mais atendimentos ou venda melhor. Veja receita, ticket médio, comissão e margem por profissional, serviço e produto.',
        icon: Wallet,
        badgeTone: 'ready',
    },
    {
        href: '/admin/report/analytics',
        title: 'Analytics: Acesso & Conversão',
        description:
            'Acompanhe page views, impressões e cliques de produto, add-to-cart e conversões. Veja heatmap de acessos, top páginas e produtos mais quentes.',
        icon: BarChart3,
        badgeTone: 'ready',
    },
];

function badgeClasses(tone?: ReportCard['badgeTone']) {
    if (tone === 'ready') {
        return cn(
            'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
            'shadow-[0_0_0_1px_rgba(16,185,129,0.15)]'
        );
    }
    if (tone === 'soon') {
        return 'border border-border-primary bg-background-secondary text-content-tertiary';
    }
    return '';
}

const COMPANY_COOKIE_NAME = 'admin_company_context';
const UNIT_COOKIE_NAME = 'admin_unit_context';
const UNIT_ALL_VALUE = 'all';

async function requireCompanyIdFromContext(session: any) {
    // 1) session (se vier)
    const sCompanyId = String(session?.companyId ?? '').trim();
    if (sCompanyId) return sCompanyId;

    // 2) cookie (compat)
    const cookieStore = await cookies();
    const cookieCompanyId = cookieStore.get(COMPANY_COOKIE_NAME)?.value;
    if (cookieCompanyId) return cookieCompanyId;

    // 3) fallback: membership pela userId (se vier)
    const userId = String(session?.userId ?? '').trim();
    if (userId) {
        const membership = await prisma.companyMember.findFirst({
            where: { userId, isActive: true },
            orderBy: { createdAt: 'asc' },
            select: { companyId: true },
        });
        if (membership?.companyId) return membership.companyId;
    }

    throw new Error(
        `companyId ausente (session.companyId, cookie "${COMPANY_COOKIE_NAME}" e sem fallback por membership).`
    );
}

type AdminReportsPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminReportsPage({
    searchParams,
}: AdminReportsPageProps) {
    // ✅ segue o padrão: valida permissão no módulo
    const session = await requireAdminForModule('DASHBOARD');

    // ✅ multi-tenant real (igual outras páginas)
    const companyId = await requireCompanyIdFromContext(session);

    // ✅ mantém a mesma base de “contexto de unidade” (mesmo se a UI não usar ainda)
    const cookieStore = await cookies();
    const selectedUnit =
        cookieStore.get(UNIT_COOKIE_NAME)?.value ?? UNIT_ALL_VALUE;

    // ✅ por enquanto só UI: deixamos searchParams preparado
    const sp = await searchParams;

    // (opcional) se quiser no futuro: repassar month etc.
    // const month = typeof sp.month === 'string' ? sp.month : undefined;

    void companyId;
    void selectedUnit;
    void sp;

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <header>
                <h1 className="text-title text-content-primary">Relatórios</h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Relatórios estratégicos para entender tendência, retenção,
                    eficiência e gargalos.
                </p>

                <p className="text-xs text-content-secondary mt-1">
                    Escopo de unidades:{' '}
                    {session?.canSeeAllUnits
                        ? 'todas as unidades'
                        : 'unidade atual'}
                </p>
            </header>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reports.map((r) => {
                    const Icon = r.icon;

                    return (
                        <Link
                            key={r.href}
                            href={r.href}
                            className={cn(
                                'group rounded-xl border border-border-primary bg-background-tertiary p-4',
                                'transition-colors hover:bg-background-tertiary/70'
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <Icon className="h-6 w-6 text-content-secondary shrink-0" />

                                <div className="space-y-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-label-large text-content-primary">
                                            {r.title}
                                        </p>
                                    </div>

                                    <p className="text-paragraph-small text-content-secondary">
                                        {r.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </section>
        </div>
    );
}
