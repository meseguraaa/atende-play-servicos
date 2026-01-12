// src/app/admin/products/page.tsx
import type { Metadata } from 'next';
import { headers, cookies } from 'next/headers';

import { requireAdminForModule } from '@/lib/admin-permissions';

import { ProductRow } from '@/components/admin/products/product-row/product-row';
import { ProductNewDialog } from '@/components/admin/products/product-new-dialog/product-new-dialog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Produtos',
};

export type ProductForRow = {
    id: string;
    name: string;
    imageUrl: string | null;
    description: string | null;
    price: number;
    barberPercentage: number | null;
    category: string | null;
    stockQuantity: number;
    isActive: boolean;

    pickupDeadlineDays: number;

    unitId: string;
    unitName: string;

    birthdayBenefitEnabled?: boolean;
    birthdayPriceLevel?: 'BRONZE' | 'PRATA' | 'OURO' | 'DIAMANTE' | null;

    hasLevelPrices: boolean;
    levelDiscounts?: Partial<
        Record<'BRONZE' | 'PRATA' | 'OURO' | 'DIAMANTE', number>
    >;

    isFeatured: boolean;
};

type UnitOption = { id: string; name: string; isActive: boolean };

type ProductsApiResponse = {
    ok: boolean;
    data?: {
        products: ProductForRow[];
        units: UnitOption[];
        activeUnitId: string | null;
    };
    error?: string;
};

function getBaseUrlFromHeaders(h: Headers) {
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    if (!host) return null;
    return `${proto}://${host}`;
}

export default async function AdminProductsPage() {
    await requireAdminForModule('PRODUCTS');

    // ✅ no seu Next, isso é Promise -> precisa await
    const h = await headers();
    const baseUrl = getBaseUrlFromHeaders(h);

    // ✅ no seu Next, isso é Promise -> precisa await
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
        .join('; ');

    let products: ProductForRow[] = [];
    let units: UnitOption[] = [];

    try {
        const url = baseUrl
            ? `${baseUrl}/api/admin/products`
            : '/api/admin/products';

        const res = await fetch(url, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                // repassa cookies (unit scope + sessão)
                cookie: cookieHeader,
                accept: 'application/json',
            },
        });

        const json = (await res
            .json()
            .catch(() => null)) as ProductsApiResponse | null;

        if (res.ok && json?.ok && json.data) {
            products = json.data.products ?? [];
            units = json.data.units ?? [];
        } else {
            products = [];
            units = [];
        }
    } catch {
        products = [];
        units = [];
    }

    return (
        <div className="max-w-7xl space-y-6">
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-content-primary">
                        Produtos
                    </h1>
                    <p className="text-paragraph-medium-size text-content-secondary">
                        Gerencie os produtos vendidos, estoque, categorias e
                        comissões.
                    </p>
                </div>

                <ProductNewDialog units={units} />
            </header>

            <section className="overflow-x-auto rounded-xl border border-border-primary bg-background-tertiary">
                <table className="w-full table-fixed border-collapse text-sm">
                    <colgroup>
                        <col className="w-95" />
                        <col className="w-55" />
                        <col className="w-27.5" />
                        <col className="w-27.5" />
                        <col className="w-27.5" />
                        <col className="w-27.5" />
                        <col className="w-27.5" />
                        <col className="w-27.5" />
                        <col className="w-60" />
                    </colgroup>

                    <thead>
                        <tr className="border-b border-border-primary bg-background-secondary">
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Produto
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Unidade
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Preço
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Comissão
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Categoria
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Estoque
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Prazo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-content-secondary">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody className="[&>tr>td]:align-middle">
                        {products.length === 0 ? (
                            <tr className="border-t border-border-primary">
                                <td
                                    colSpan={9}
                                    className="px-4 py-6 text-center text-paragraph-small text-content-secondary"
                                >
                                    Nenhum produto cadastrado ainda.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
