import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Profissional | Avaliações',
};

export default function ProfessionalReviewPage() {
    return (
        <main className="mx-auto w-full max-w-7xl p-4">
            <h1 className="text-xl font-semibold">Avaliações</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Página em construção.
            </p>
        </main>
    );
}
