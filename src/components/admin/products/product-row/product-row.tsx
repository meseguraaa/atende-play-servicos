// src/components/product-row/product-row.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import type { ProductForRow } from '@/app/admin/products/page';
import { Button } from '@/components/ui/button';
import { ProductEditDialog } from '@/components/admin/products/product-edit-dialog';
import { toast } from 'sonner';

type ProductRowProps = {
    product: ProductForRow;
};

const MAX_TEXT_LENGTH = 50;

function truncate(
    text: string | null | undefined,
    max: number = MAX_TEXT_LENGTH
): string {
    if (!text) return '';
    if (text.length <= max) return text;
    return text.slice(0, max - 1) + '…';
}

function formatDeadline(days: number) {
    if (!Number.isFinite(days) || days <= 0) return '—';
    if (days === 1) return '1 dia';
    return `${days} dias`;
}

function Badge({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <span
            title={title}
            className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs bg-muted/40 border-border-primary text-content-secondary"
        >
            {children}
        </span>
    );
}

function StatusBadge({
    isActive,
    title,
}: {
    isActive: boolean;
    title?: string;
}) {
    const toneClass = isActive
        ? 'bg-green-500/15 text-green-600 border-green-500/30'
        : 'bg-red-500/15 text-red-600 border-red-500/30';

    return (
        <span
            title={title}
            className={[
                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                toneClass,
            ].join(' ')}
        >
            {isActive ? 'Ativo' : 'Inativo'}
        </span>
    );
}

export function ProductRow({ product }: ProductRowProps) {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();

    const displayName = truncate(product.name);
    const deadlineText = formatDeadline(product.pickupDeadlineDays);

    const birthdayBenefitEnabled = Boolean(product.birthdayBenefitEnabled);
    const hasLevelPrices = Boolean(product.hasLevelPrices);
    const isFeatured = Boolean(product.isFeatured);

    const hasAnyBadge = isFeatured || birthdayBenefitEnabled || hasLevelPrices;

    // ✅ fallback caso a URL esteja quebrada (evita ícone de imagem quebrada)
    const [imgFailed, setImgFailed] = React.useState(false);
    const imgSrc = String(product.imageUrl ?? '').trim();
    const shouldShowImg = Boolean(imgSrc) && !imgFailed;

    React.useEffect(() => {
        // quando trocar de produto/URL, reseta o erro
        setImgFailed(false);
    }, [imgSrc]);

    function handleToggleActive() {
        startTransition(async () => {
            try {
                const res = await fetch(`/api/admin/products/${product.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ toggleActive: true }),
                });

                const json = (await res.json().catch(() => null)) as
                    | { ok: true; data?: any }
                    | { ok: false; error?: string }
                    | null;

                if (!res.ok || !json || (json as any).ok !== true) {
                    const msg =
                        (json as any)?.error ||
                        'Não foi possível alterar o status do produto.';
                    toast.error(msg);
                    return;
                }

                toast.success(
                    product.isActive
                        ? 'Produto desativado.'
                        : 'Produto ativado.'
                );
                router.refresh();
            } catch {
                toast.error('Erro de rede ao alterar status do produto.');
            }
        });
    }

    return (
        <tr className="border-t border-border-primary">
            {/* NOME + FOTO */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border-primary bg-background-secondary">
                        {shouldShowImg ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={imgSrc}
                                alt={product.name}
                                className="h-full w-full object-cover"
                                onError={() => setImgFailed(true)}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-content-secondary">
                                Sem foto
                            </div>
                        )}
                    </div>

                    <div className="flex min-w-0 flex-col gap-2">
                        <span className="font-medium text-content-primary leading-tight">
                            {displayName}
                        </span>

                        {hasAnyBadge && (
                            <div className="flex flex-wrap items-center gap-2">
                                {isFeatured && (
                                    <Badge title="Este produto aparece no carrossel de Destaques do app.">
                                        ⭐ Destaque
                                    </Badge>
                                )}

                                {hasLevelPrices && (
                                    <Badge title="Este produto tem descontos por nível.">
                                        💎 Níveis
                                    </Badge>
                                )}

                                {birthdayBenefitEnabled && (
                                    <Badge title="Este produto tem benefício de aniversário.">
                                        🎂 Aniversário
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </td>

            {/* UNIDADE */}
            <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                    <span className="text-content-primary">
                        {product.unitName || '—'}
                    </span>
                    <span className="text-[11px] text-content-secondary">
                        Estoque da unidade
                    </span>
                </div>
            </td>

            {/* PREÇO */}
            <td className="px-4 py-3 whitespace-nowrap">
                R$ {Number(product.price).toFixed(2)}
            </td>

            {/* COMISSÃO */}
            <td className="px-4 py-3 whitespace-nowrap">
                {product.barberPercentage !== null &&
                product.barberPercentage !== undefined
                    ? `${Number(product.barberPercentage)}%`
                    : '-'}
            </td>

            {/* CATEGORIA */}
            <td className="px-4 py-3">{product.category || '—'}</td>

            {/* ESTOQUE */}
            <td className="px-4 py-3 whitespace-nowrap">
                {product.stockQuantity} un.
            </td>

            {/* PRAZO */}
            <td className="px-4 py-3">
                <span className="text-content-primary">{deadlineText}</span>
                <span className="block text-[11px] text-content-secondary">
                    Retirada
                </span>
            </td>

            {/* STATUS (padronizado) */}
            <td className="px-4 py-3">
                <StatusBadge isActive={Boolean(product.isActive)} />
            </td>

            {/* AÇÕES */}
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                    <ProductEditDialog product={product} />

                    <Button
                        variant={product.isActive ? 'destructive' : 'active'}
                        size="sm"
                        type="button"
                        className="border-border-primary hover:bg-muted/40"
                        onClick={handleToggleActive}
                        disabled={isPending}
                        title={isPending ? 'Processando...' : undefined}
                    >
                        {isPending
                            ? 'Aguarde...'
                            : product.isActive
                              ? 'Desativar'
                              : 'Ativar'}
                    </Button>
                </div>
            </td>
        </tr>
    );
}
