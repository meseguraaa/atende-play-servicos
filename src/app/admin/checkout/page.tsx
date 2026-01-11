// src/app/admin/checkout/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Checkout',
};

export default async function AdminCheckoutPage() {
    const session = await requireAdminForModule('CHECKOUT');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">Checkout</h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Finalização de atendimentos, vendas e pagamentos.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Checkout de agendamentos concluídos</li>
                    <li>Venda de produtos avulsos</li>
                    <li>Aplicação de taxas e comissões</li>
                    <li>Geração de snapshot financeiro</li>
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
