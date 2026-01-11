// src/app/admin/client-levels/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Níveis de Cliente',
};

export default async function AdminClientLevelsPage() {
    const session = await requireAdminForModule('CLIENT_LEVELS');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">
                    Níveis de Cliente
                </h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Configure regras de fidelidade, benefícios e progressão de
                    níveis dos clientes.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Configuração de níveis (Bronze, Prata, Ouro, etc.)</li>
                    <li>Regras de progressão por atendimentos ou compras</li>
                    <li>Benefícios por nível (descontos, vantagens)</li>
                    <li>Períodos de cálculo e reavaliação</li>
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
