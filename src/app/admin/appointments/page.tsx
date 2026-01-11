// src/app/admin/appointments/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Agendamentos',
};

export default async function AdminAppointmentsPage() {
    const session = await requireAdminForModule('APPOINTMENTS');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">
                    Agendamentos
                </h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Gerencie e acompanhe todos os agendamentos da empresa.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Listagem de agendamentos</li>
                    <li>Filtros por status, período e profissional</li>
                    <li>
                        Filtro por unidade{' '}
                        {session.canSeeAllUnits
                            ? '(todas as unidades)'
                            : '(unidade atual)'}
                    </li>
                    <li>Ações: cancelar, concluir, checkout</li>
                </ul>
            </div>
        </div>
    );
}
