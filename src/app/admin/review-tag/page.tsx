// src/app/admin/review-tags/page.tsx
import type { Metadata } from 'next';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Tags de Avaliação',
};

export default async function AdminReviewTagsPage() {
    const session = await requireAdminForModule('REVIEWS');

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-title text-content-primary">
                    Tags de Avaliação
                </h1>
                <p className="text-paragraph-medium-size text-content-secondary">
                    Gerencie as tags usadas para avaliações e feedbacks.
                </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Cadastro e edição de tags</li>
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
