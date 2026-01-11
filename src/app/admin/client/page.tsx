// src/app/admin/clients/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Clientes',
};

export default async function AdminClientsPage() {
    const session = await requireAdminForModule('CLIENTS');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">Clientes</h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Visualize e gerencie os clientes, histórico de atendimentos,
                    planos e níveis.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Listagem de clientes</li>
                    <li>Busca por nome, e-mail ou telefone</li>
                    <li>Histórico de atendimentos e compras</li>
                    <li>Planos ativos e status</li>
                    <li>Nível do cliente (fidelidade)</li>
                    <li>
                        Escopo de unidades:{' '}
                        {session.canSeeAllUnits
                            ? 'todas as unidades'
                            : 'unidade atual'}
                    </li>
                </ul>
            </div>
        </div>
    );
}
