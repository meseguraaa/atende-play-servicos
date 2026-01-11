// src/app/admin/professional/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Profissionais',
};

export default async function AdminProfessionalsPage() {
    const session = await requireAdminForModule('PROFESSIONALS');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">
                    Profissionais
                </h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Gerencie os profissionais da empresa e seus vínculos com as
                    unidades.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Cadastro e edição de profissionais</li>
                    <li>Vínculo com unidades</li>
                    <li>Ativação / desativação</li>
                    <li>Configuração de comissões</li>
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
