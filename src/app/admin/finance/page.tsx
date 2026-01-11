// src/app/admin/finance/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Financeiro',
};

export default async function AdminFinancePage() {
    const session = await requireAdminForModule('FINANCE');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">Financeiro</h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Acompanhe receitas, despesas, comissões e resultados da
                    empresa.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Receitas por serviços e produtos</li>
                    <li>Despesas fixas e variáveis</li>
                    <li>Comissões de profissionais</li>
                    <li>Resultado líquido por período</li>
                    <li>
                        Escopo:{' '}
                        {session.canSeeAllUnits
                            ? 'todas as unidades'
                            : 'unidade atual'}
                    </li>
                </ul>
            </div>
        </div>
    );
}
