// src/app/admin/reports/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Relatórios',
};

export default async function AdminReportsPage() {
    await requireAdminForModule('REPORTS');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">Relatórios</h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Área em construção. Aqui vão entrar relatórios de receita,
                    atendimentos, produtos e performance.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    TODO: adicionar filtros de período e unidade (quando tiver
                    unit switcher), gráficos e tabelas.
                </p>
            </div>
        </div>
    );
}
