// src/app/admin/services/page.tsx
import type { Metadata } from 'next';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

import { ServiceRow } from '@/components/admin/services/service-row';
import { ServiceNewDialog } from '@/components/admin/services/service-new-dialog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Serviços',
};

type SessionWithCompanyId = { companyId?: string };

export default async function AdminServicesPage() {
    const session = (await requireAdminForModule(
        'SERVICES'
    )) as unknown as SessionWithCompanyId;

    const companyId = session.companyId?.trim();

    // Se por algum motivo a sessão vier sem companyId, mostramos mensagem clara
    if (!companyId) {
        return (
            <div className="max-w-7xl space-y-6">
                <header className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-title text-content-primary">
                            Serviços
                        </h1>
                        <p className="text-paragraph-medium-size text-content-secondary">
                            Gerencie os serviços, duração, comissões e regras de
                            cancelamento.
                        </p>
                    </div>

                    <ServiceNewDialog />
                </header>

                <section className="rounded-xl border border-border-primary bg-background-tertiary p-6">
                    <p className="text-paragraph-medium-size text-content-secondary">
                        Sessão sem <b>companyId</b>. Este painel é multi-tenant:
                        vincule o admin a uma empresa.
                    </p>
                </section>
            </div>
        );
    }

    // ✅ Busca direta no Prisma (evita fetch interno + cookies + baseUrl em prod)
    const services = await prisma.service.findMany({
        where: { companyId },
        orderBy: { name: 'asc' },
        select: {
            id: true,
            unitId: true,
            companyId: true,
            name: true,
            price: true,
            durationMinutes: true,
            isActive: true,
            professionalPercentage: true,
            cancelLimitHours: true,
            cancelFeePercentage: true,
        },
    });

    // ✅ Shape que o ServiceRow espera (UI)
    const servicesForTable = services.map((s) => {
        const priceNum = Number(s.price.toString());
        const pctNum = Number(s.professionalPercentage.toString());
        const feePctNum =
            s.cancelFeePercentage === null
                ? null
                : Number(s.cancelFeePercentage.toString());

        return {
            id: s.id,
            unitId: s.unitId ?? null,

            name: s.name,
            description: null as string | null,

            priceInCents: Number.isFinite(priceNum)
                ? Math.round(priceNum * 100)
                : null,

            durationInMinutes:
                typeof s.durationMinutes === 'number'
                    ? s.durationMinutes
                    : null,

            barberPercentage: Number.isFinite(pctNum) ? pctNum : null,

            cancelLimitHours: s.cancelLimitHours ?? null,
            cancelFeePercentage:
                feePctNum !== null && Number.isFinite(feePctNum)
                    ? feePctNum
                    : null,

            isActive: Boolean(s.isActive),
            companyId: s.companyId ?? null,
        };
    });

    return (
        <div className="max-w-7xl space-y-6">
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-content-primary">
                        Serviços
                    </h1>
                    <p className="text-paragraph-medium-size text-content-secondary">
                        Gerencie os serviços, duração, comissões e regras de
                        cancelamento.
                    </p>
                </div>

                {/* O dialog já faz o GET interno pra puxar profissionais/unidades */}
                <ServiceNewDialog />
            </header>

            <section className="overflow-x-auto rounded-xl border border-border-primary bg-background-tertiary">
                <table className="w-full table-fixed border-collapse text-sm">
                    <colgroup>
                        <col className="w-60" />
                        <col className="w-15" />
                        <col className="w-15" />
                        <col className="w-15" />
                        <col className="w-20" />
                        <col className="w-15" />
                        <col className="w-15" />
                        <col className="w-27.5" />
                    </colgroup>

                    <thead>
                        <tr className="border-b border-border-primary bg-background-secondary">
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Serviço
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Preço
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Duração
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Comissão
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Cancelamento
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Taxa
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-content-secondary">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody className="[&>tr>td]:align-middle">
                        {servicesForTable.length === 0 ? (
                            <tr className="border-t border-border-primary">
                                <td
                                    colSpan={8}
                                    className="px-4 py-6 text-center text-paragraph-small text-content-secondary"
                                >
                                    Nenhum serviço cadastrado ainda.
                                </td>
                            </tr>
                        ) : (
                            servicesForTable.map((service) => (
                                <ServiceRow
                                    key={service.id}
                                    service={service as any}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
