// src/components/admin/partners/partner-row/partner-row.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import type { PartnerForRow } from '@/app/admin/partners/page';
import { PartnerEditDialog } from '@/components/admin/partners/partner-edit-dialog/partner-edit-dialog';

function Pill({
    children,
    variant = 'neutral',
}: {
    children: React.ReactNode;
    variant?: 'neutral' | 'success' | 'danger';
}) {
    const cls =
        variant === 'success'
            ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
            : variant === 'danger'
              ? 'bg-rose-500/10 text-rose-700 border-rose-500/20'
              : 'bg-black/5 text-content-secondary border-border-primary';

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
                cls
            )}
        >
            {children}
        </span>
    );
}

export function PartnerRow({ partner }: { partner: PartnerForRow }) {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();

    function handleToggleActive() {
        startTransition(async () => {
            try {
                const res = await fetch(`/api/admin/partners/${partner.id}`, {
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
                        'Não foi possível alterar o status do parceiro.';
                    toast.error(msg);
                    return;
                }

                toast.success(
                    partner.isActive
                        ? 'Parceiro desativado.'
                        : 'Parceiro ativado.'
                );
                router.refresh();
            } catch {
                toast.error('Erro de rede ao alterar status do parceiro.');
            }
        });
    }

    return (
        <tr className="border-t border-border-primary">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-border-primary bg-background-secondary">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {partner.logoUrl ? (
                            <img
                                src={partner.logoUrl}
                                alt={partner.name}
                                className="h-full w-full object-cover"
                            />
                        ) : null}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-semibold text-content-primary">
                            {partner.name}
                        </p>
                        <p className="truncate text-xs text-content-secondary">
                            {partner.ctaUrl ?? '—'}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-4 py-3">
                <Pill variant="neutral">
                    {Number(partner.discountPct ?? 0) > 0
                        ? `${partner.discountPct}% OFF`
                        : '—'}
                </Pill>
            </td>

            <td className="px-4 py-3">
                <Pill variant="neutral">
                    {partner.visibilityMode === 'SELECTED' ? 'SELECTED' : 'ALL'}
                </Pill>
            </td>

            <td className="px-4 py-3">
                <span className="text-xs font-semibold text-content-secondary">
                    {partner.sortOrder ?? 100}
                </span>
            </td>

            {/* STATUS – padrão product-row */}
            <td className="px-4 py-3">
                <span className="text-xs text-content-secondary">
                    {partner.isActive ? 'Ativo' : 'Inativo'}
                </span>
            </td>

            <td className="px-4 py-3 text-right">
                <div className="inline-flex items-center gap-2">
                    {/* ✅ Editar primeiro */}
                    <PartnerEditDialog
                        partner={{
                            id: partner.id,
                            name: partner.name,

                            logoUrl: partner.logoUrl ?? null,
                            logoKey: partner.logoKey ?? null,

                            discountPct: Number(partner.discountPct ?? 0),

                            description: partner.description ?? null,
                            rules: partner.rules ?? null,

                            ctaUrl: partner.ctaUrl ?? '',
                            ctaLabel: partner.ctaLabel ?? null,

                            isActive: Boolean(partner.isActive),
                            visibilityMode: partner.visibilityMode ?? 'ALL',
                            sortOrder: Number(partner.sortOrder ?? 100),

                            createdAt: partner.createdAt,
                            updatedAt: partner.updatedAt,
                        }}
                    />

                    {/* ✅ Ativar / Desativar depois */}
                    <Button
                        variant={partner.isActive ? 'destructive' : 'active'}
                        size="sm"
                        type="button"
                        className="border-border-primary hover:bg-muted/40"
                        onClick={handleToggleActive}
                        disabled={isPending}
                        title={isPending ? 'Processando...' : undefined}
                    >
                        {isPending
                            ? 'Aguarde...'
                            : partner.isActive
                              ? 'Desativar'
                              : 'Ativar'}
                    </Button>
                </div>
            </td>
        </tr>
    );
}
