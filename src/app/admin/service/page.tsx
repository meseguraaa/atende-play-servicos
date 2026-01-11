// src/app/admin/services/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Serviços',
};

export default async function AdminServicesPage() {
    const session = await requireAdminForModule('SERVICES');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">Serviços</h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Gerencie os serviços oferecidos, preços, duração e regras de
                    cancelamento.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Cadastro e edição de serviços</li>
                    <li>Preço e duração</li>
                    <li>Percentual do profissional</li>
                    <li>Regras de cancelamento</li>
                    <li>Vínculo com profissionais</li>
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
