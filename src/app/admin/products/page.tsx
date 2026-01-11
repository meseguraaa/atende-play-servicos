// src/app/admin/products/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Produtos',
};

export default async function AdminProductsPage() {
    const session = await requireAdminForModule('PRODUCTS');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">Produtos</h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Gerencie os produtos vendidos, estoque, categorias e
                    comissões.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Cadastro e edição de produtos</li>
                    <li>Controle de estoque</li>
                    <li>Categorias e destaques</li>
                    <li>Comissão do profissional</li>
                    <li>Venda avulsa e reserva</li>
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
