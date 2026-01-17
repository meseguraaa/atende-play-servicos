// src/app/admin/checkout/admin-checkout-client.tsx
'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { MonthPicker } from '@/components/month-picker';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type OrderStatus = 'PENDING' | 'PENDING_CHECKIN' | 'COMPLETED' | 'CANCELED';

export type ServiceOrderUI = {
    id: string;
    createdAtLabel: string;
    appointmentAtLabel?: string | null;
    professionalName: string;
    itemsLabel: string;
    totalLabel: string;
    status: OrderStatus;
};

export type ProductOrderItemUI = {
    itemId: string;
    productId: string;
    name: string;
    qty: number;
    totalLabel: string;

    // ✅ novo (best-effort, pode vir ou não do backend)
    professionalId?: string | null;
    professionalName?: string | null;
};

export type ProductOrderUI = {
    id: string;
    createdAtLabel: string;

    // compat (ainda pode vir)
    itemsLabel: string;

    // ✅ novo: itens de produto com itemId (para cancelar 1 por 1)
    items?: ProductOrderItemUI[];

    // subtotal apenas de produtos deste pedido
    totalLabel: string;

    status: OrderStatus;
};

export type OpenAccountUI = {
    clientId: string;
    clientLabel: string;
    latestLabel: string;
    totalLabel: string;
    totalServicesLabel: string;
    totalProductsLabel: string;
    hasProducts: boolean;
    serviceOrders: ServiceOrderUI[];
    productOrders: ProductOrderUI[];
};

export type MonthOrderItemUI = {
    id: string;
    name: string;
    qty: number;
    unitLabel: string;
    totalLabel: string;
    kind: 'service' | 'product';
};

export type MonthOrderUI = {
    id: string;
    createdAtLabel: string;
    appointmentAtLabel?: string | null;
    professionalName: string;
    status: 'COMPLETED';
    totalLabel: string;
    servicesSubtotalLabel: string;
    productsSubtotalLabel: string;
    items: MonthOrderItemUI[];
};

export type MonthGroupUI = {
    clientKey: string;
    clientLabel: string;
    latestLabel: string;
    totalLabel: string;
    servicesLabel: string;
    productsLabel: string;
    orders: MonthOrderUI[];
};

type CompleteCheckoutResponse =
    | {
          ok: true;
          data: {
              orderId: string;
              status: 'COMPLETED';
              totalAmount: string;
              checkedOutAt: string;
              appointmentUpdated: boolean;
          };
      }
    | { ok: false; error: string };

type CancelOrderResponse =
    | {
          ok: true;
          data: {
              orderId: string;
              status: 'CANCELED';
              canceledAt: string;
              inventoryRevertedAt: string | null;
          };
      }
    | { ok: false; error: string };

type CancelAccountResponse =
    | {
          ok: true;
          data: {
              clientId: string;
              canceledCount: number;
              canceledOrderIds: string[];
              alreadyCanceledCount: number;
              skippedCount: number;
              canceledAt: string;
          };
      }
    | { ok: false; error: string };

type ProductsListResponse =
    | {
          ok: true;
          data: {
              products: Array<{
                  id: string;
                  name: string;
                  priceLabel: string;
                  stockQuantity: number;
                  unitId: string;
              }>;
          };
      }
    | { ok: false; error: string };

type ProfessionalsListResponse =
    | {
          ok: true;
          data: {
              professionals: Array<{
                  id: string;
                  name: string;
                  isActive: boolean;
                  unitId: string | null;
              }>;
              count: number;
              unitScope: 'filtered' | 'all';
          };
      }
    | { ok: false; error: string };

type AddProductResponse =
    | {
          ok: true;
          data: {
              clientId: string;
              orderId: string;
              orderStatus: 'PENDING' | 'PENDING_CHECKIN';
              itemId: string;
              productId: string;
              quantity: number;
              unitId: string;
              unitPrice: string;
              totalPrice: string;
              orderTotalAmount: string;
              orderWasCreated: boolean;
          };
      }
    | { ok: false; error: string };

type RemoveProductItemResponse =
    | {
          ok: true;
          data: {
              orderId: string;
              orderStatus: 'PENDING' | 'PENDING_CHECKIN' | 'CANCELED';
              removedItemId: string;
              removedQuantity: number;
              inventoryRevertedAt: string | null;
              orderTotalAmount: string; // decimal string
              remainingProductItemsCount: number;
              orderWasCanceled: boolean;
          };
      }
    | { ok: false; error: string };

type AssignProductItemProfessionalResponse =
    | {
          ok: true;
          data: {
              orderId: string;
              orderStatus: 'PENDING' | 'PENDING_CHECKIN';
              itemId: string;
              professionalId: string;
          };
      }
    | { ok: false; error: string };

type AdminCheckoutClientProps = {
    canSeeAllUnits: boolean;

    // top labels
    monthLabel: string;

    // data
    openAccounts: OpenAccountUI[];
    monthGroups: MonthGroupUI[];
};

/**
 * ✅ Badge padronizado (mesmo padrão do Finance):
 * - rounded-md
 * - border px-2 py-0.5 text-xs
 * - tonalidade via classes
 */
function StatusBadge({ status }: { status: OrderStatus }) {
    const map: Record<OrderStatus, { label: string; toneClass: string }> = {
        PENDING: {
            label: 'Pendente',
            toneClass: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
        },
        PENDING_CHECKIN: {
            label: 'Aguard. check-in',
            toneClass: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
        },
        COMPLETED: {
            label: 'Pago',
            toneClass: 'bg-green-500/15 text-green-600 border-green-500/30',
        },
        CANCELED: {
            label: 'Cancelado',
            toneClass: 'bg-red-500/15 text-red-600 border-red-500/30',
        },
    };

    const cfg = map[status];

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                cfg.toneClass
            )}
        >
            {cfg.label}
        </span>
    );
}

function EmptyState({ title, hint }: { title: string; hint?: string }) {
    return (
        <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-6">
            <p className="text-paragraph-small text-content-secondary text-center">
                {title}
            </p>
            {hint ? (
                <p className="mt-2 text-paragraph-small text-content-tertiary text-center">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}

function OrdersSection({
    monthLabel,
    totalCountLabel,
    groups,
}: {
    monthLabel: string;
    totalCountLabel: string;
    groups: MonthGroupUI[];
}) {
    return (
        <section className="space-y-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-subtitle text-content-primary">
                        Pedidos do mês
                    </h2>
                    <p className="text-paragraph-small text-content-secondary">
                        Lista de todos os pedidos de serviços e produtos
                        registrados neste mês.
                        <br />
                        Mês selecionado:{' '}
                        <span className="font-medium">{monthLabel}</span>
                    </p>

                    <p className="text-paragraph-small text-content-secondary mt-1">
                        Total:{' '}
                        <span className="font-medium">{totalCountLabel}</span>
                    </p>
                </div>
            </div>

            {groups.length === 0 ? (
                <EmptyState title="Nenhum pedido registrado neste mês ainda." />
            ) : (
                <>
                    <div className="space-y-3">
                        {groups.map((g) => (
                            <div
                                key={g.clientKey}
                                className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-3 space-y-3"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-paragraph-small text-content-primary truncate">
                                            Cliente:{' '}
                                            <span className="font-medium">
                                                {g.clientLabel}
                                            </span>
                                        </p>
                                        <p className="text-paragraph-small text-content-secondary">
                                            Última movimentação em{' '}
                                            {g.latestLabel}
                                        </p>

                                        <p className="text-paragraph-small text-content-secondary mt-1">
                                            <span>
                                                Serviços:{' '}
                                                <span className="font-medium">
                                                    {g.servicesLabel}
                                                </span>
                                            </span>
                                            <span className="mx-2">•</span>
                                            <span>
                                                Produtos:{' '}
                                                <span className="font-medium">
                                                    {g.productsLabel}
                                                </span>
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-paragraph-small font-semibold text-content-primary">
                                            Total no mês: {g.totalLabel}
                                        </span>
                                        <StatusBadge status="COMPLETED" />
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-border-primary space-y-2">
                                    <p className="text-label-small text-content-secondary">
                                        Pedidos ({g.orders.length})
                                    </p>

                                    <div className="space-y-2">
                                        {g.orders.map((order) => {
                                            const serviceItems =
                                                order.items.filter(
                                                    (i) => i.kind === 'service'
                                                );
                                            const productItems =
                                                order.items.filter(
                                                    (i) => i.kind === 'product'
                                                );

                                            return (
                                                <details
                                                    key={order.id}
                                                    className="rounded-lg border border-border-primary bg-background-secondary px-3 py-2"
                                                >
                                                    <summary className="cursor-pointer list-none">
                                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                                            <div className="min-w-0">
                                                                <p className="text-paragraph-small text-content-primary truncate">
                                                                    Pedido #
                                                                    {order.id.slice(
                                                                        0,
                                                                        8
                                                                    )}
                                                                </p>
                                                                <p className="text-paragraph-small text-content-secondary">
                                                                    Criado em{' '}
                                                                    {
                                                                        order.createdAtLabel
                                                                    }
                                                                </p>
                                                                {order.appointmentAtLabel ? (
                                                                    <p className="text-paragraph-small text-content-secondary">
                                                                        Atendimento
                                                                        em{' '}
                                                                        {
                                                                            order.appointmentAtLabel
                                                                        }
                                                                    </p>
                                                                ) : null}
                                                                <p className="text-paragraph-small text-content-secondary">
                                                                    Profissional:{' '}
                                                                    {
                                                                        order.professionalName
                                                                    }
                                                                </p>
                                                            </div>

                                                            <div className="flex flex-col items-end gap-1">
                                                                <span className="text-paragraph-small font-semibold text-content-primary">
                                                                    {
                                                                        order.totalLabel
                                                                    }
                                                                </span>
                                                                <StatusBadge status="COMPLETED" />
                                                            </div>
                                                        </div>
                                                    </summary>

                                                    <div className="mt-3 space-y-3">
                                                        {serviceItems.length >
                                                        0 ? (
                                                            <div className="space-y-2">
                                                                <p className="text-label-small text-content-secondary">
                                                                    Serviços
                                                                </p>

                                                                <div className="overflow-x-auto rounded-lg border border-border-primary">
                                                                    <table className="min-w-full text-sm">
                                                                        <thead>
                                                                            <tr className="border-b border-border-primary bg-muted/40 text-left text-label-small text-content-secondary">
                                                                                <th className="px-3 py-2">
                                                                                    Item
                                                                                </th>
                                                                                <th className="px-3 py-2 text-center">
                                                                                    Qtd
                                                                                </th>
                                                                                <th className="px-3 py-2 text-right">
                                                                                    Unit.
                                                                                </th>
                                                                                <th className="px-3 py-2 text-right">
                                                                                    Total
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {serviceItems.map(
                                                                                (
                                                                                    it
                                                                                ) => (
                                                                                    <tr
                                                                                        key={
                                                                                            it.id
                                                                                        }
                                                                                        className="border-t border-border-primary text-paragraph-small text-content-primary"
                                                                                    >
                                                                                        <td className="px-3 py-2">
                                                                                            {
                                                                                                it.name
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-3 py-2 text-center">
                                                                                            {
                                                                                                it.qty
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-3 py-2 text-right">
                                                                                            {
                                                                                                it.unitLabel
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-3 py-2 text-right">
                                                                                            {
                                                                                                it.totalLabel
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            )}
                                                                            <tr className="border-t border-border-primary">
                                                                                <td
                                                                                    className="px-3 py-2 text-right text-content-secondary"
                                                                                    colSpan={
                                                                                        3
                                                                                    }
                                                                                >
                                                                                    Subtotal
                                                                                    serviços
                                                                                </td>
                                                                                <td className="px-3 py-2 text-right font-semibold text-content-primary">
                                                                                    {
                                                                                        order.servicesSubtotalLabel
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        ) : null}

                                                        {productItems.length >
                                                        0 ? (
                                                            <div className="space-y-2">
                                                                <p className="text-label-small text-content-secondary">
                                                                    Produtos
                                                                </p>

                                                                <div className="overflow-x-auto rounded-lg border border-border-primary">
                                                                    <table className="min-w-full text-sm">
                                                                        <thead>
                                                                            <tr className="border-b border-border-primary bg-muted/40 text-left text-label-small text-content-secondary">
                                                                                <th className="px-3 py-2">
                                                                                    Item
                                                                                </th>
                                                                                <th className="px-3 py-2 text-center">
                                                                                    Qtd
                                                                                </th>
                                                                                <th className="px-3 py-2 text-right">
                                                                                    Unit.
                                                                                </th>
                                                                                <th className="px-3 py-2 text-right">
                                                                                    Total
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {productItems.map(
                                                                                (
                                                                                    it
                                                                                ) => (
                                                                                    <tr
                                                                                        key={
                                                                                            it.id
                                                                                        }
                                                                                        className="border-t border-border-primary text-paragraph-small text-content-primary"
                                                                                    >
                                                                                        <td className="px-3 py-2">
                                                                                            {
                                                                                                it.name
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-3 py-2 text-center">
                                                                                            {
                                                                                                it.qty
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-3 py-2 text-right">
                                                                                            {
                                                                                                it.unitLabel
                                                                                            }
                                                                                        </td>
                                                                                        <td className="px-3 py-2 text-right">
                                                                                            {
                                                                                                it.totalLabel
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            )}
                                                                            <tr className="border-t border-border-primary">
                                                                                <td
                                                                                    className="px-3 py-2 text-right text-content-secondary"
                                                                                    colSpan={
                                                                                        3
                                                                                    }
                                                                                >
                                                                                    Subtotal
                                                                                    produtos
                                                                                </td>
                                                                                <td className="px-3 py-2 text-right font-semibold text-content-primary">
                                                                                    {
                                                                                        order.productsSubtotalLabel
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </details>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* UI-only: paginação placeholder */}
                    <div className="flex flex-col gap-2 items-center">
                        <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-3">
                            <p className="text-paragraph-small text-content-secondary">
                                Paginação será conectada quando integrarmos os
                                dados.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

function shortId(id: string) {
    return String(id ?? '').slice(0, 8);
}

function toIntSafe(v: unknown, fallback: number) {
    const n = Number(v);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(1, Math.trunc(n));
}

// compat: quebra "1x A, 1x B" em linhas separadas (caso o backend ainda não mande items[])
function splitItemsLabel(label?: string | null): string[] {
    const raw = String(label ?? '').trim();
    if (!raw || raw === '—') return [];
    return raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
}

export default function AdminCheckoutClient({
    canSeeAllUnits,
    monthLabel,
    openAccounts,
    monthGroups,
}: AdminCheckoutClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [payingClientId, setPayingClientId] = React.useState<string | null>(
        null
    );

    const [payingOrderIds, setPayingOrderIds] = React.useState<Set<string>>(
        () => new Set()
    );

    // trava de cancelamento por cliente
    const [cancelingClientId, setCancelingClientId] = React.useState<
        string | null
    >(null);

    // ====== Produtos (para adicionar no checkout) ======
    const [products, setProducts] = React.useState<
        Array<{
            id: string;
            name: string;
            priceLabel: string;
            stockQuantity: number;
            unitId: string;
        }>
    >([]);

    const [productsLoading, setProductsLoading] = React.useState(false);

    // ====== Profissionais (para vincular venda) ======
    const [professionals, setProfessionals] = React.useState<
        Array<{
            id: string;
            name: string;
            isActive: boolean;
            unitId: string | null;
        }>
    >([]);
    const [professionalsLoading, setProfessionalsLoading] =
        React.useState(false);

    // state por cliente (seleção + qty)
    const [selectedProductByClient, setSelectedProductByClient] =
        React.useState<Record<string, string>>({});

    const [qtyByClient, setQtyByClient] = React.useState<
        Record<string, number>
    >({});

    const [addingProductForClientId, setAddingProductForClientId] =
        React.useState<string | null>(null);

    // ✅ trava por item (cancelar produto por produto)
    const [removingItemIds, setRemovingItemIds] = React.useState<Set<string>>(
        () => new Set()
    );

    // ✅ trava por item (atribuir profissional)
    const [assigningItemIds, setAssigningItemIds] = React.useState<Set<string>>(
        () => new Set()
    );

    // seleção por item (UI controlled)
    const [selectedProfessionalByItem, setSelectedProfessionalByItem] =
        React.useState<Record<string, string>>({});

    // seleção "rápida" por cliente (aplicar em vários itens)
    const [bulkProfessionalByClient, setBulkProfessionalByClient] =
        React.useState<Record<string, string>>({});

    const openAccountsCount = openAccounts.length;

    const orphanServiceOrders: ServiceOrderUI[] = [];
    const orphanProductOrders: ProductOrderUI[] = [];

    const completeOrder = React.useCallback(async (orderId: string) => {
        const res = await fetch(
            `/api/admin/checkout/orders/${encodeURIComponent(orderId)}/complete`,
            { method: 'PATCH' }
        );

        const json = (await res
            .json()
            .catch(() => null)) as CompleteCheckoutResponse | null;

        if (!res.ok || !json || !json.ok) {
            const msg =
                json && !json.ok ? json.error : 'Falha ao concluir checkout.';
            throw new Error(msg);
        }

        return json.data;
    }, []);

    const cancelOrder = React.useCallback(async (orderId: string) => {
        const res = await fetch(
            `/api/admin/checkout/orders/${encodeURIComponent(orderId)}/cancel`,
            { method: 'PATCH' }
        );

        const json = (await res
            .json()
            .catch(() => null)) as CancelOrderResponse | null;

        if (!res.ok || !json || !json.ok) {
            const msg =
                json && !json.ok ? json.error : 'Falha ao cancelar pedido.';
            throw new Error(msg);
        }

        return json.data;
    }, []);

    const cancelAccount = React.useCallback(
        async (clientId: string, orderIds: string[]) => {
            const res = await fetch(
                `/api/admin/checkout/accounts/${encodeURIComponent(clientId)}/cancel`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderIds }),
                }
            );

            const json = (await res
                .json()
                .catch(() => null)) as CancelAccountResponse | null;

            if (!res.ok || !json || !json.ok) {
                const msg =
                    json && !json.ok ? json.error : 'Falha ao cancelar conta.';
                throw new Error(msg);
            }

            return json.data;
        },
        []
    );

    const addProduct = React.useCallback(
        async (clientId: string, productId: string, quantity: number) => {
            const res = await fetch(
                `/api/admin/checkout/accounts/${encodeURIComponent(clientId)}/add-product`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, quantity }),
                }
            );

            const json = (await res
                .json()
                .catch(() => null)) as AddProductResponse | null;

            if (!res.ok || !json || !json.ok) {
                const msg =
                    json && !json.ok
                        ? json.error
                        : 'Falha ao adicionar produto.';
                throw new Error(msg);
            }

            return json.data;
        },
        []
    );

    // ✅ remove UM item de produto (e atualiza totais no backend)
    const removeProductItem = React.useCallback(
        async (orderId: string, itemId: string) => {
            const res = await fetch(
                `/api/admin/checkout/orders/${encodeURIComponent(orderId)}/remove-product-item`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ itemId }),
                }
            );

            const json = (await res
                .json()
                .catch(() => null)) as RemoveProductItemResponse | null;

            if (!res.ok || !json || !json.ok) {
                const msg =
                    json && !json.ok ? json.error : 'Falha ao remover produto.';
                throw new Error(msg);
            }

            return json.data;
        },
        []
    );

    // ✅ atribui profissional para UM item
    const assignProductItemProfessional = React.useCallback(
        async (orderId: string, itemId: string, professionalId: string) => {
            const res = await fetch(
                `/api/admin/checkout/orders/${encodeURIComponent(orderId)}/assign-product-item-professional`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ itemId, professionalId }),
                }
            );

            const json = (await res
                .json()
                .catch(
                    () => null
                )) as AssignProductItemProfessionalResponse | null;

            if (!res.ok || !json || !json.ok) {
                const msg =
                    json && !json.ok
                        ? json.error
                        : 'Falha ao atribuir profissional.';
                throw new Error(msg);
            }

            return json.data;
        },
        []
    );

    const withPayingOrder = React.useCallback((orderId: string) => {
        setPayingOrderIds((prev) => {
            const next = new Set(prev);
            next.add(orderId);
            return next;
        });

        return () => {
            setPayingOrderIds((prev) => {
                const next = new Set(prev);
                next.delete(orderId);
                return next;
            });
        };
    }, []);

    const withRemovingItem = React.useCallback((itemId: string) => {
        setRemovingItemIds((prev) => {
            const next = new Set(prev);
            next.add(itemId);
            return next;
        });

        return () => {
            setRemovingItemIds((prev) => {
                const next = new Set(prev);
                next.delete(itemId);
                return next;
            });
        };
    }, []);

    const withAssigningItem = React.useCallback((itemId: string) => {
        setAssigningItemIds((prev) => {
            const next = new Set(prev);
            next.add(itemId);
            return next;
        });

        return () => {
            setAssigningItemIds((prev) => {
                const next = new Set(prev);
                next.delete(itemId);
                return next;
            });
        };
    }, []);

    // compat (ainda existe no código, mas agora não é o fluxo principal)
    const handleCancelProductOrder = React.useCallback(
        async (orderId: string) => {
            if (!orderId) return;
            if (payingClientId) return;
            if (cancelingClientId) return;
            if (addingProductForClientId) return;

            const ok = window.confirm(
                `Cancelar o pedido #${shortId(orderId)}?\n\nIsso cancelará o pedido inteiro.`
            );
            if (!ok) return;

            const release = withPayingOrder(orderId);

            try {
                toast.message(`Cancelando pedido #${shortId(orderId)}…`);
                await cancelOrder(orderId);
                toast.success('Pedido cancelado.');
                router.refresh();
            } catch (e: any) {
                toast.error(e?.message ?? 'Erro ao cancelar pedido.');
            } finally {
                release();
            }
        },
        [
            addingProductForClientId,
            cancelOrder,
            cancelingClientId,
            payingClientId,
            router,
            withPayingOrder,
        ]
    );

    const handleRemoveProductItem = React.useCallback(
        async (orderId: string, item: ProductOrderItemUI) => {
            if (!orderId || !item?.itemId) return;

            if (payingClientId) return;
            if (cancelingClientId) return;
            if (addingProductForClientId) return;

            if (removingItemIds.has(item.itemId)) return;

            const ok = window.confirm(
                `Remover este produto do pedido #${shortId(orderId)}?\n\n• ${item.qty}x ${item.name}\n• Total do item: ${item.totalLabel}`
            );
            if (!ok) return;

            const releaseItem = withRemovingItem(item.itemId);
            const releaseOrder = withPayingOrder(orderId);

            try {
                toast.message(`Removendo produto de #${shortId(orderId)}…`);
                await removeProductItem(orderId, item.itemId);
                toast.success('Produto removido.');
                router.refresh();
            } catch (e: any) {
                toast.error(e?.message ?? 'Erro ao remover produto.');
            } finally {
                releaseOrder();
                releaseItem();
            }
        },
        [
            addingProductForClientId,
            cancelingClientId,
            payingClientId,
            removeProductItem,
            removingItemIds,
            router,
            withPayingOrder,
            withRemovingItem,
        ]
    );

    const handleAssignProfessionalForItem = React.useCallback(
        async (
            orderId: string,
            item: ProductOrderItemUI,
            professionalId: string
        ) => {
            if (!orderId || !item?.itemId) return;
            if (!professionalId) return;

            if (payingClientId) return;
            if (cancelingClientId) return;
            if (addingProductForClientId) return;

            if (assigningItemIds.has(item.itemId)) return;

            const releaseItem = withAssigningItem(item.itemId);
            const releaseOrder = withPayingOrder(orderId);

            try {
                toast.message(`Salvando profissional do item…`);
                await assignProductItemProfessional(
                    orderId,
                    item.itemId,
                    professionalId
                );
                toast.success('Profissional atribuído.');
                router.refresh();
            } catch (e: any) {
                toast.error(e?.message ?? 'Erro ao atribuir profissional.');
            } finally {
                releaseOrder();
                releaseItem();
            }
        },
        [
            addingProductForClientId,
            assignProductItemProfessional,
            assigningItemIds,
            cancelingClientId,
            payingClientId,
            router,
            withAssigningItem,
            withPayingOrder,
        ]
    );

    const handleBulkAssignForAccount = React.useCallback(
        async (account: OpenAccountUI) => {
            const clientId = account?.clientId;
            if (!clientId) return;

            const professionalId = String(
                bulkProfessionalByClient[clientId] ?? ''
            ).trim();
            if (!professionalId) {
                toast.message('Selecione um profissional para aplicar.');
                return;
            }

            if (payingClientId) return;
            if (cancelingClientId) return;
            if (addingProductForClientId) return;

            const itemsToAssign: Array<{
                orderId: string;
                item: ProductOrderItemUI;
            }> = [];

            for (const order of account.productOrders ?? []) {
                const items = Array.isArray(order.items) ? order.items : [];
                for (const it of items) {
                    if (!it?.itemId) continue;
                    if (it.professionalId) continue; // só aplica nos que estão vazios
                    itemsToAssign.push({ orderId: order.id, item: it });
                }
            }

            if (itemsToAssign.length === 0) {
                toast.message('Todos os itens já têm profissional.');
                return;
            }

            const ok = window.confirm(
                `Aplicar o profissional selecionado em ${itemsToAssign.length} item(ns) sem profissional?`
            );
            if (!ok) return;

            try {
                for (let i = 0; i < itemsToAssign.length; i++) {
                    const { orderId, item } = itemsToAssign[i];
                    const releaseItem = withAssigningItem(item.itemId);
                    const releaseOrder = withPayingOrder(orderId);

                    try {
                        toast.message(
                            `Aplicando ${i + 1}/${itemsToAssign.length}…`
                        );
                        await assignProductItemProfessional(
                            orderId,
                            item.itemId,
                            professionalId
                        );
                    } finally {
                        releaseOrder();
                        releaseItem();
                    }
                }

                toast.success('Profissional aplicado nos itens pendentes.');
                router.refresh();
            } catch (e: any) {
                toast.error(e?.message ?? 'Erro ao aplicar profissional.');
            }
        },
        [
            addingProductForClientId,
            assignProductItemProfessional,
            bulkProfessionalByClient,
            cancelingClientId,
            payingClientId,
            router,
            withAssigningItem,
            withPayingOrder,
        ]
    );

    const handleCancelAccount = React.useCallback(
        async (account: OpenAccountUI) => {
            if (!account?.clientId) return;
            if (payingClientId) return;
            if (cancelingClientId) return;
            if (addingProductForClientId) return;

            const orderIds = [
                ...account.serviceOrders.map((o) => o.id),
                ...account.productOrders.map((o) => o.id),
            ].filter(Boolean);

            if (orderIds.length === 0) {
                toast.message('Nada para cancelar nesta conta.');
                return;
            }

            const ok = window.confirm(
                `Cancelar a conta do cliente "${account.clientLabel}"?\n\nIsso cancelará ${orderIds.length} pedido(s) pendente(s).`
            );
            if (!ok) return;

            setCancelingClientId(account.clientId);

            try {
                toast.message(`Cancelando conta…`);
                const data = await cancelAccount(account.clientId, orderIds);

                if (data.canceledCount === 0) {
                    toast.message('Nenhum pedido foi cancelado.');
                } else {
                    toast.success(
                        `Conta cancelada: ${data.canceledCount} pedido(s).`
                    );
                }

                router.refresh();
            } catch (e: any) {
                toast.error(e?.message ?? 'Erro ao cancelar conta.');
            } finally {
                setCancelingClientId(null);
            }
        },
        [
            addingProductForClientId,
            cancelAccount,
            cancelingClientId,
            payingClientId,
            router,
        ]
    );

    const fetchProducts = React.useCallback(async () => {
        setProductsLoading(true);

        try {
            const unit = searchParams?.get('unit');
            const sp = new URLSearchParams();

            // ✅ Importante: se unit=all, NÃO envia (sua API trata ausência como "todas")
            if (unit && unit !== 'all') sp.set('unit', unit);

            const url = `/api/admin/checkout/products${
                sp.toString() ? `?${sp.toString()}` : ''
            }`;

            const res = await fetch(url, { method: 'GET' });

            const json = (await res
                .json()
                .catch(() => null)) as ProductsListResponse | null;

            if (!res.ok || !json || !json.ok) {
                const msg =
                    json && !json.ok
                        ? json.error
                        : 'Falha ao carregar produtos.';
                throw new Error(msg);
            }

            setProducts(json.data.products ?? []);
        } catch (e: any) {
            toast.error(e?.message ?? 'Erro ao carregar produtos.');
            setProducts([]);
        } finally {
            setProductsLoading(false);
        }
    }, [searchParams]);

    const fetchProfessionals = React.useCallback(async () => {
        setProfessionalsLoading(true);

        try {
            const unit = searchParams?.get('unit');
            const sp = new URLSearchParams();

            // ✅ mesmo padrão: se unit=all, não envia
            if (unit && unit !== 'all') sp.set('unit', unit);

            const url = `/api/admin/checkout/professionals${
                sp.toString() ? `?${sp.toString()}` : ''
            }`;

            const res = await fetch(url, { method: 'GET' });

            const json = (await res
                .json()
                .catch(() => null)) as ProfessionalsListResponse | null;

            if (!res.ok || !json || !json.ok) {
                const msg =
                    json && !json.ok
                        ? json.error
                        : 'Falha ao carregar profissionais.';
                throw new Error(msg);
            }

            // ✅ Importante:
            // - Mantém todos (ativos e inativos) pra não zerar o select por acidente.
            // - Se quiser esconder inativos, faz isso no render (com label).
            setProfessionals(json.data.professionals ?? []);
        } catch (e: any) {
            toast.error(e?.message ?? 'Erro ao carregar profissionais.');
            setProfessionals([]);
        } finally {
            setProfessionalsLoading(false);
        }
    }, [searchParams]);

    React.useEffect(() => {
        // carrega no mount e quando muda o unit (via searchParams)
        fetchProducts();
        fetchProfessionals();
    }, [fetchProducts, fetchProfessionals]);

    const handleAddProduct = React.useCallback(
        async (account: OpenAccountUI) => {
            const clientId = account?.clientId;
            if (!clientId) return;

            if (payingClientId) return;
            if (cancelingClientId) return;
            if (addingProductForClientId) return;

            const productId = selectedProductByClient[clientId] ?? '';
            const quantity = qtyByClient[clientId] ?? 1;

            if (!productId) {
                toast.message('Selecione um produto.');
                return;
            }

            const qty = toIntSafe(quantity, 1);

            // best-effort no front (a garantia real é a transação no backend)
            const product = products.find((p) => p.id === productId);
            if (product && product.stockQuantity < qty) {
                toast.error(
                    `Estoque insuficiente: disponível ${product.stockQuantity}, solicitado ${qty}.`
                );
                return;
            }

            setAddingProductForClientId(clientId);

            try {
                toast.message('Adicionando produto…');
                const data = await addProduct(clientId, productId, qty);

                toast.success(
                    `Produto adicionado${
                        data.orderWasCreated ? ' (novo pedido criado)' : ''
                    }.`
                );

                // reseta inputs do cliente
                setSelectedProductByClient((prev) => {
                    const next = { ...prev };
                    next[clientId] = '';
                    return next;
                });
                setQtyByClient((prev) => {
                    const next = { ...prev };
                    next[clientId] = 1;
                    return next;
                });

                // recarrega lista de produtos para refletir estoque atualizado (nice-to-have)
                fetchProducts();

                router.refresh();
            } catch (e: any) {
                toast.error(e?.message ?? 'Erro ao adicionar produto.');
            } finally {
                setAddingProductForClientId(null);
            }
        },
        [
            addProduct,
            addingProductForClientId,
            cancelingClientId,
            payingClientId,
            products,
            qtyByClient,
            router,
            selectedProductByClient,
            fetchProducts,
        ]
    );

    const handleMarkAllAsPaid = React.useCallback(
        async (account: OpenAccountUI) => {
            if (payingClientId) return;
            if (cancelingClientId) return;
            if (addingProductForClientId) return;

            // ✅ Regra UI: se tem itens de produto (items[]) e algum não tem professionalId, bloqueia
            if (account.hasProducts) {
                const productItems = (account.productOrders ?? [])
                    .flatMap((o) => (Array.isArray(o.items) ? o.items : []))
                    .filter(Boolean);

                if (productItems.length > 0) {
                    const missing = productItems.filter((it) => {
                        const saved = String(it.professionalId ?? '').trim();
                        const staged = String(
                            selectedProfessionalByItem[it.itemId] ?? ''
                        ).trim();
                        return !saved && !staged;
                    });

                    if (missing.length > 0) {
                        toast.error(
                            `Faltou profissional em ${missing.length} item(ns) de produto. Selecione o profissional em cada item antes de concluir.`
                        );

                        return;
                    }
                }
            }

            const orderIds = [
                ...account.serviceOrders.map((o) => o.id),
                ...account.productOrders.map((o) => o.id),
            ].filter(Boolean);

            if (orderIds.length === 0) {
                toast.message('Nada para pagar nesta conta.');
                return;
            }

            setPayingClientId(account.clientId);

            let okCount = 0;
            const failed: Array<{ id: string; error: string }> = [];

            try {
                for (let i = 0; i < orderIds.length; i++) {
                    const id = orderIds[i];
                    const release = withPayingOrder(id);

                    try {
                        toast.message(
                            `Concluindo ${i + 1}/${orderIds.length}: #${shortId(id)}…`
                        );
                        await completeOrder(id);
                        okCount++;
                    } catch (e: any) {
                        failed.push({
                            id,
                            error: e?.message ?? 'Erro ao concluir.',
                        });
                    } finally {
                        release();
                    }
                }

                if (failed.length === 0) {
                    toast.success('Conta marcada como paga.');
                } else if (okCount === 0) {
                    toast.error(
                        `Nenhum pedido foi concluído. Primeiro erro: #${shortId(
                            failed[0].id
                        )} (${failed[0].error})`
                    );
                } else {
                    toast.message(
                        `Finalizado: ${okCount} pago(s), ${failed.length} com erro.`
                    );
                    toast.error(
                        `Erro em #${shortId(failed[0].id)}: ${failed[0].error}`
                    );
                }

                router.refresh();
            } catch (e: any) {
                toast.error(e?.message ?? 'Erro ao concluir checkout.');
            } finally {
                setPayingClientId(null);
            }
        },
        [
            addingProductForClientId,
            cancelingClientId,
            completeOrder,
            payingClientId,
            router,
            withPayingOrder,
        ]
    );

    return (
        <div className="space-y-5 max-w-7xl">
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-content-primary">
                        Checkout
                    </h1>
                    <p className="text-paragraph-medium text-content-secondary">
                        Finalize os pagamentos de atendimentos e pedidos de
                        produtos.
                    </p>

                    <p className="text-paragraph-small text-content-tertiary mt-1">
                        Escopo de unidades:{' '}
                        {canSeeAllUnits ? 'todas as unidades' : 'unidade atual'}
                    </p>
                </div>

                <MonthPicker />
            </header>

            <section className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-subtitle text-content-primary">
                        Contas em aberto{' '}
                        <span className="text-content-secondary font-normal">
                            ({openAccountsCount})
                        </span>
                    </h2>
                </div>

                {openAccounts.length === 0 ? (
                    <EmptyState title="Não há contas aguardando pagamento no momento." />
                ) : (
                    <div className="space-y-3">
                        {openAccounts.map((account) => {
                            const isPaying =
                                payingClientId === account.clientId;

                            const isCanceling =
                                cancelingClientId === account.clientId;

                            const isAdding =
                                addingProductForClientId === account.clientId;

                            const accountOrderIds = [
                                ...account.serviceOrders.map((o) => o.id),
                                ...account.productOrders.map((o) => o.id),
                            ].filter(Boolean);

                            const anyOrderBusy = accountOrderIds.some((id) =>
                                payingOrderIds.has(id)
                            );

                            const selectedProductId =
                                selectedProductByClient[account.clientId] ?? '';

                            const qtyValue = qtyByClient[account.clientId] ?? 1;

                            const isBusyGlobal =
                                Boolean(payingClientId) ||
                                Boolean(cancelingClientId) ||
                                Boolean(addingProductForClientId);

                            const accountProductItems = (
                                account.productOrders ?? []
                            )
                                .flatMap((o) =>
                                    Array.isArray(o.items) ? o.items : []
                                )
                                .filter(Boolean);

                            const missingProfessionalCount =
                                account.hasProducts &&
                                accountProductItems.length > 0
                                    ? accountProductItems.filter((it) => {
                                          const saved = String(
                                              it.professionalId ?? ''
                                          ).trim();
                                          const staged = String(
                                              selectedProfessionalByItem[
                                                  it.itemId
                                              ] ?? ''
                                          ).trim();
                                          return !saved && !staged;
                                      }).length
                                    : 0;

                            const bulkProfessionalId =
                                bulkProfessionalByClient[account.clientId] ??
                                '';

                            return (
                                <div
                                    key={account.clientId}
                                    className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-3 space-y-3"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-paragraph-small text-content-primary truncate">
                                                Cliente:{' '}
                                                <span className="font-medium">
                                                    {account.clientLabel}
                                                </span>
                                            </p>
                                            <p className="text-paragraph-small text-content-secondary">
                                                Última movimentação em{' '}
                                                {account.latestLabel}
                                            </p>

                                            <p className="text-paragraph-small text-content-secondary mt-1">
                                                <span>
                                                    Serviços:{' '}
                                                    <span className="font-medium">
                                                        {
                                                            account.totalServicesLabel
                                                        }
                                                    </span>
                                                </span>
                                                <span className="mx-2">•</span>
                                                <span>
                                                    Produtos:{' '}
                                                    <span className="font-medium">
                                                        {
                                                            account.totalProductsLabel
                                                        }
                                                    </span>
                                                </span>
                                            </p>

                                            {account.hasProducts &&
                                            accountProductItems.length > 0 ? (
                                                <p className="text-paragraph-small text-content-tertiary mt-1">
                                                    Itens de produto sem
                                                    profissional:{' '}
                                                    <span className="font-medium">
                                                        {
                                                            missingProfessionalCount
                                                        }
                                                    </span>
                                                </p>
                                            ) : null}
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-paragraph-small font-semibold text-content-primary">
                                                Total a pagar:{' '}
                                                {account.totalLabel}
                                            </span>
                                            <StatusBadge status="PENDING" />
                                        </div>
                                    </div>

                                    {account.serviceOrders.length > 0 ? (
                                        <div className="space-y-2 pt-2 border-t border-border-primary">
                                            <p className="text-label-small text-content-secondary">
                                                Serviços pendentes
                                            </p>

                                            <div className="space-y-2">
                                                {account.serviceOrders.map(
                                                    (order) => {
                                                        const isOrderBusy =
                                                            payingOrderIds.has(
                                                                order.id
                                                            );

                                                        return (
                                                            <div
                                                                key={order.id}
                                                                className={cn(
                                                                    'rounded-lg border border-border-primary bg-background-secondary px-3 py-2',
                                                                    isOrderBusy &&
                                                                        'opacity-70'
                                                                )}
                                                            >
                                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                                    <div className="min-w-0">
                                                                        <p className="text-paragraph-small text-content-primary truncate">
                                                                            Atendimento
                                                                            #
                                                                            {shortId(
                                                                                order.id
                                                                            )}
                                                                        </p>

                                                                        {order.appointmentAtLabel ? (
                                                                            <p className="text-paragraph-small text-content-secondary">
                                                                                Atendimento
                                                                                em{' '}
                                                                                {
                                                                                    order.appointmentAtLabel
                                                                                }
                                                                            </p>
                                                                        ) : null}

                                                                        <p className="text-paragraph-small text-content-secondary">
                                                                            Profissional:{' '}
                                                                            {
                                                                                order.professionalName
                                                                            }
                                                                        </p>
                                                                        <p className="text-paragraph-small text-content-secondary">
                                                                            Serviços:{' '}
                                                                            {
                                                                                order.itemsLabel
                                                                            }
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex flex-col items-end gap-1">
                                                                        <span className="text-paragraph-small font-semibold text-content-primary">
                                                                            {
                                                                                order.totalLabel
                                                                            }
                                                                        </span>
                                                                        <StatusBadge
                                                                            status={
                                                                                order.status
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    ) : null}

                                    {account.productOrders.length > 0 ? (
                                        <div className="space-y-2 pt-2 border-t border-border-primary">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-label-small text-content-secondary">
                                                        Produtos na conta
                                                    </p>
                                                    <p className="text-xs text-content-tertiary">
                                                        Remova item por item e
                                                        atribua o profissional
                                                        da venda.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                {account.productOrders.map(
                                                    (order) => {
                                                        const isOrderBusy =
                                                            payingOrderIds.has(
                                                                order.id
                                                            );

                                                        const items =
                                                            order.items &&
                                                            Array.isArray(
                                                                order.items
                                                            )
                                                                ? order.items
                                                                : [];

                                                        const fallbackLines =
                                                            items.length === 0
                                                                ? splitItemsLabel(
                                                                      order.itemsLabel
                                                                  )
                                                                : [];

                                                        return (
                                                            <div
                                                                key={order.id}
                                                                className={cn(
                                                                    'rounded-lg border border-border-primary bg-background-secondary px-3 py-2',
                                                                    isOrderBusy &&
                                                                        'opacity-70'
                                                                )}
                                                            >
                                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                                    <div className="min-w-0">
                                                                        <p className="text-paragraph-small text-content-primary truncate">
                                                                            Pedido
                                                                            #
                                                                            {shortId(
                                                                                order.id
                                                                            )}
                                                                        </p>
                                                                        <p className="text-paragraph-small text-content-secondary">
                                                                            Criado
                                                                            em{' '}
                                                                            {
                                                                                order.createdAtLabel
                                                                            }
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex flex-col items-end gap-1">
                                                                        <span className="text-paragraph-small font-semibold text-content-primary">
                                                                            {
                                                                                order.totalLabel
                                                                            }
                                                                        </span>
                                                                        <StatusBadge
                                                                            status={
                                                                                order.status
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* ✅ blocos por produto (com botão individual + profissional) */}
                                                                {items.length >
                                                                0 ? (
                                                                    <div className="mt-3 space-y-2">
                                                                        {items.map(
                                                                            (
                                                                                it
                                                                            ) => {
                                                                                const isRemoving =
                                                                                    removingItemIds.has(
                                                                                        it.itemId
                                                                                    );
                                                                                const isAssigning =
                                                                                    assigningItemIds.has(
                                                                                        it.itemId
                                                                                    );

                                                                                const disabled =
                                                                                    isOrderBusy ||
                                                                                    isRemoving ||
                                                                                    isAssigning ||
                                                                                    Boolean(
                                                                                        payingClientId
                                                                                    ) ||
                                                                                    Boolean(
                                                                                        cancelingClientId
                                                                                    ) ||
                                                                                    Boolean(
                                                                                        addingProductForClientId
                                                                                    );

                                                                                const currentSelection =
                                                                                    selectedProfessionalByItem[
                                                                                        it
                                                                                            .itemId
                                                                                    ] ??
                                                                                    String(
                                                                                        it.professionalId ??
                                                                                            ''
                                                                                    );

                                                                                const selectIsDisabled =
                                                                                    disabled ||
                                                                                    professionalsLoading;

                                                                                const hasAssigned =
                                                                                    Boolean(
                                                                                        String(
                                                                                            it.professionalId ??
                                                                                                ''
                                                                                        ).trim()
                                                                                    );

                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            it.itemId
                                                                                        }
                                                                                        className={cn(
                                                                                            'rounded-lg border border-border-primary bg-background-tertiary px-3 py-2',
                                                                                            (isRemoving ||
                                                                                                isAssigning) &&
                                                                                                'opacity-70'
                                                                                        )}
                                                                                    >
                                                                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                                                                            <div className="min-w-0">
                                                                                                <p className="text-paragraph-small text-content-primary truncate">
                                                                                                    {
                                                                                                        it.qty
                                                                                                    }

                                                                                                    x{' '}
                                                                                                    {
                                                                                                        it.name
                                                                                                    }
                                                                                                </p>
                                                                                                <p className="text-paragraph-small text-content-secondary">
                                                                                                    Total
                                                                                                    do
                                                                                                    item:{' '}
                                                                                                    <span className="font-medium text-content-primary">
                                                                                                        {
                                                                                                            it.totalLabel
                                                                                                        }
                                                                                                    </span>
                                                                                                </p>

                                                                                                {it.professionalName ? (
                                                                                                    <p className="text-xs text-content-tertiary mt-1">
                                                                                                        Profissional
                                                                                                        atual:{' '}
                                                                                                        <span className="font-medium text-content-secondary">
                                                                                                            {
                                                                                                                it.professionalName
                                                                                                            }
                                                                                                        </span>
                                                                                                    </p>
                                                                                                ) : null}
                                                                                            </div>

                                                                                            <div className="flex flex-wrap items-center gap-2 justify-end">
                                                                                                {account.hasProducts ? (
                                                                                                    <>
                                                                                                        <select
                                                                                                            value={
                                                                                                                currentSelection
                                                                                                            }
                                                                                                            onChange={(
                                                                                                                e
                                                                                                            ) => {
                                                                                                                const nextProfessionalId =
                                                                                                                    e
                                                                                                                        .target
                                                                                                                        .value;

                                                                                                                // mantém o select controlado
                                                                                                                setSelectedProfessionalByItem(
                                                                                                                    (
                                                                                                                        prev
                                                                                                                    ) => ({
                                                                                                                        ...prev,
                                                                                                                        [it.itemId]:
                                                                                                                            nextProfessionalId,
                                                                                                                    })
                                                                                                                );

                                                                                                                // salva automático quando selecionar
                                                                                                                const pid =
                                                                                                                    String(
                                                                                                                        nextProfessionalId ??
                                                                                                                            ''
                                                                                                                    ).trim();
                                                                                                                if (
                                                                                                                    !pid
                                                                                                                )
                                                                                                                    return;

                                                                                                                handleAssignProfessionalForItem(
                                                                                                                    order.id,
                                                                                                                    it,
                                                                                                                    pid
                                                                                                                );
                                                                                                            }}
                                                                                                            className={cn(
                                                                                                                'h-9 rounded-md border border-border-primary bg-background-secondary px-2 text-sm text-content-primary',
                                                                                                                !hasAssigned &&
                                                                                                                    'border-amber-500/40'
                                                                                                            )}
                                                                                                            disabled={
                                                                                                                selectIsDisabled
                                                                                                            }
                                                                                                            title={
                                                                                                                professionals.length ===
                                                                                                                0
                                                                                                                    ? 'Sem profissionais disponíveis'
                                                                                                                    : undefined
                                                                                                            }
                                                                                                        >
                                                                                                            <option value="">
                                                                                                                {professionalsLoading
                                                                                                                    ? 'Carregando...'
                                                                                                                    : professionals.length ===
                                                                                                                        0
                                                                                                                      ? 'Sem profissionais'
                                                                                                                      : 'Selecione o profissional'}
                                                                                                            </option>
                                                                                                            {professionals.map(
                                                                                                                (
                                                                                                                    p
                                                                                                                ) => (
                                                                                                                    <option
                                                                                                                        key={
                                                                                                                            p.id
                                                                                                                        }
                                                                                                                        value={
                                                                                                                            p.id
                                                                                                                        }
                                                                                                                        disabled={
                                                                                                                            !p.isActive
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {
                                                                                                                            p.name
                                                                                                                        }
                                                                                                                        {!p.isActive
                                                                                                                            ? ' (inativo)'
                                                                                                                            : ''}
                                                                                                                    </option>
                                                                                                                )
                                                                                                            )}
                                                                                                        </select>
                                                                                                    </>
                                                                                                ) : null}

                                                                                                <Button
                                                                                                    type="button"
                                                                                                    variant="outline"
                                                                                                    size="sm"
                                                                                                    className="text-red-500 border-red-500/40 hover:bg-red-500/5"
                                                                                                    onClick={() =>
                                                                                                        handleRemoveProductItem(
                                                                                                            order.id,
                                                                                                            it
                                                                                                        )
                                                                                                    }
                                                                                                    disabled={
                                                                                                        disabled
                                                                                                    }
                                                                                                    title={
                                                                                                        disabled
                                                                                                            ? 'Processando...'
                                                                                                            : 'Remover este produto'
                                                                                                    }
                                                                                                >
                                                                                                    {isRemoving
                                                                                                        ? 'Removendo...'
                                                                                                        : 'Remover'}
                                                                                                </Button>
                                                                                            </div>
                                                                                        </div>

                                                                                        {account.hasProducts &&
                                                                                        !hasAssigned ? (
                                                                                            <p className="mt-2 text-xs text-amber-700">
                                                                                                Selecione
                                                                                                o
                                                                                                profissional
                                                                                                para
                                                                                                liberar
                                                                                                o
                                                                                                checkout
                                                                                                desta
                                                                                                conta.
                                                                                            </p>
                                                                                        ) : null}
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                ) : fallbackLines.length >
                                                                  0 ? (
                                                                    // compat visual (sem botão individual, porque não tem itemId)
                                                                    <div className="mt-2">
                                                                        <p className="text-paragraph-small text-content-secondary">
                                                                            Itens:
                                                                        </p>
                                                                        <ul className="pl-4 list-disc space-y-0.5">
                                                                            {fallbackLines.map(
                                                                                (
                                                                                    line,
                                                                                    idx
                                                                                ) => (
                                                                                    <li
                                                                                        key={`${order.id}:${idx}`}
                                                                                        className="text-paragraph-small text-content-secondary"
                                                                                    >
                                                                                        {
                                                                                            line
                                                                                        }
                                                                                    </li>
                                                                                )
                                                                            )}
                                                                        </ul>

                                                                        <div className="mt-2">
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="text-red-500 border-red-500/40 hover:bg-red-500/5"
                                                                                onClick={() =>
                                                                                    handleCancelProductOrder(
                                                                                        order.id
                                                                                    )
                                                                                }
                                                                                disabled={
                                                                                    isOrderBusy ||
                                                                                    Boolean(
                                                                                        payingClientId
                                                                                    ) ||
                                                                                    Boolean(
                                                                                        cancelingClientId
                                                                                    ) ||
                                                                                    Boolean(
                                                                                        addingProductForClientId
                                                                                    )
                                                                                }
                                                                            >
                                                                                {isOrderBusy
                                                                                    ? 'Processando...'
                                                                                    : 'Cancelar pedido'}
                                                                            </Button>
                                                                        </div>

                                                                        {account.hasProducts ? (
                                                                            <p className="mt-2 text-xs text-content-tertiary">
                                                                                Para
                                                                                atribuir
                                                                                profissional
                                                                                por
                                                                                produto,
                                                                                o
                                                                                backend
                                                                                precisa
                                                                                enviar{' '}
                                                                                <span className="font-medium">
                                                                                    items[]
                                                                                </span>{' '}
                                                                                com{' '}
                                                                                <span className="font-medium">
                                                                                    itemId
                                                                                </span>

                                                                                .
                                                                            </p>
                                                                        ) : null}
                                                                    </div>
                                                                ) : (
                                                                    <p className="mt-2 text-paragraph-small text-content-secondary">
                                                                        Itens:{' '}
                                                                        {'—'}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="pt-2 border-t border-border-primary space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-label-small text-content-secondary">
                                                Adicionar produto na conta
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-end gap-2">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs text-content-secondary">
                                                    Produto
                                                </label>
                                                <select
                                                    value={selectedProductId}
                                                    onChange={(e) =>
                                                        setSelectedProductByClient(
                                                            (prev) => ({
                                                                ...prev,
                                                                [account.clientId]:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    className="h-9 min-w-60 rounded-md border border-border-primary bg-background-secondary px-2 text-sm text-content-primary"
                                                    disabled={
                                                        isBusyGlobal ||
                                                        productsLoading ||
                                                        products.length === 0
                                                    }
                                                >
                                                    <option value="" disabled>
                                                        {productsLoading
                                                            ? 'Carregando...'
                                                            : products.length ===
                                                                0
                                                              ? 'Sem produtos disponíveis'
                                                              : 'Selecione o produto'}
                                                    </option>
                                                    {products.map((p) => (
                                                        <option
                                                            key={p.id}
                                                            value={p.id}
                                                        >
                                                            {p.name} •{' '}
                                                            {p.priceLabel} •
                                                            estoque:{' '}
                                                            {p.stockQuantity}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs text-content-secondary">
                                                    Qtd
                                                </label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={qtyValue}
                                                    onChange={(e) =>
                                                        setQtyByClient(
                                                            (prev) => ({
                                                                ...prev,
                                                                [account.clientId]:
                                                                    toIntSafe(
                                                                        e.target
                                                                            .value,
                                                                        1
                                                                    ),
                                                            })
                                                        )
                                                    }
                                                    className="h-9 w-24 rounded-md border border-border-primary bg-background-secondary px-2 text-sm text-content-primary"
                                                    disabled={isBusyGlobal}
                                                />
                                            </div>

                                            <Button
                                                type="button"
                                                variant="edit2"
                                                size="sm"
                                                onClick={() =>
                                                    handleAddProduct(account)
                                                }
                                                disabled={
                                                    isBusyGlobal ||
                                                    productsLoading ||
                                                    !selectedProductId ||
                                                    products.length === 0
                                                }
                                                title={
                                                    isAdding
                                                        ? 'Adicionando...'
                                                        : undefined
                                                }
                                            >
                                                {isAdding
                                                    ? 'Adicionando...'
                                                    : 'Adicionar produto'}
                                            </Button>

                                            {products.length === 0 &&
                                            !productsLoading ? (
                                                <p className="text-xs text-content-tertiary w-full">
                                                    Nenhum produto disponível
                                                    para esta unidade/filtro.
                                                </p>
                                            ) : (
                                                <p className="text-xs text-content-secondary w-full">
                                                    O preço é calculado no
                                                    checkout e fica congelado no
                                                    item.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border-primary">
                                        <div className="flex-1 min-w-0">
                                            {account.hasProducts ? (
                                                <>
                                                    <p className="text-label-small text-content-secondary mb-1">
                                                        Profissional responsável
                                                        pela venda dos produtos
                                                    </p>
                                                    <p className="text-paragraph-small text-content-secondary">
                                                        Atribua o profissional
                                                        em cada item de produto
                                                        para calcular
                                                        faturamento e comissão.
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-paragraph-small text-content-secondary">
                                                    Esta conta tem apenas
                                                    serviços. Você pode
                                                    finalizar direto.
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleCancelAccount(account)
                                                }
                                                disabled={
                                                    isPaying ||
                                                    anyOrderBusy ||
                                                    isCanceling ||
                                                    isAdding ||
                                                    (account.hasProducts &&
                                                        missingProfessionalCount >
                                                            0)
                                                }
                                                title={
                                                    isPaying ||
                                                    anyOrderBusy ||
                                                    isCanceling ||
                                                    isAdding
                                                        ? 'Processando...'
                                                        : 'Cancela todos os pedidos pendentes da conta'
                                                }
                                            >
                                                {isCanceling
                                                    ? 'Cancelando...'
                                                    : 'Cancelar conta'}
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="edit2"
                                                size="sm"
                                                onClick={() =>
                                                    handleMarkAllAsPaid(account)
                                                }
                                                disabled={
                                                    isPaying ||
                                                    anyOrderBusy ||
                                                    isCanceling ||
                                                    isAdding ||
                                                    (account.hasProducts &&
                                                        missingProfessionalCount >
                                                            0)
                                                }
                                                title={
                                                    account.hasProducts &&
                                                    missingProfessionalCount > 0
                                                        ? `Faltam ${missingProfessionalCount} item(ns) de produto sem profissional.`
                                                        : isPaying ||
                                                            anyOrderBusy ||
                                                            isCanceling ||
                                                            isAdding
                                                          ? 'Concluindo checkout...'
                                                          : undefined
                                                }
                                            >
                                                {isPaying || anyOrderBusy
                                                    ? 'Concluindo...'
                                                    : 'Marcar tudo como pago'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {orphanServiceOrders.length > 0 ||
                orphanProductOrders.length > 0 ? (
                    <div className="rounded-xl border border-border-primary bg-background-tertiary px-4 py-4 space-y-2">
                        <p className="text-paragraph-small text-content-secondary">
                            Alguns pedidos pendentes não estão vinculados a um
                            cliente e não podem ser agrupados automaticamente.
                        </p>
                    </div>
                ) : null}
            </section>

            <OrdersSection
                monthLabel={monthLabel}
                totalCountLabel={`${monthGroups.reduce((sum, g) => sum + g.orders.length, 0)} pedidos`}
                groups={monthGroups}
            />
        </div>
    );
}
