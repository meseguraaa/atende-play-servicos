// src/app/admin/checkout/admin-checkout-client.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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

export type ProductOrderUI = {
    id: string;
    createdAtLabel: string;
    itemsLabel: string;
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

export default function AdminCheckoutClient({
    canSeeAllUnits,
    monthLabel,
    openAccounts,
    monthGroups,
}: AdminCheckoutClientProps) {
    const router = useRouter();

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

    const handleCancelProductOrder = React.useCallback(
        async (orderId: string) => {
            if (!orderId) return;
            if (payingClientId) return;
            if (cancelingClientId) return;

            const ok = window.confirm(
                `Cancelar o pedido #${shortId(orderId)}?\n\nEssa ação não pode ser desfeita.`
            );
            if (!ok) return;

            const release = withPayingOrder(orderId);

            try {
                toast.message(`Cancelando #${shortId(orderId)}…`);
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
            cancelOrder,
            cancelingClientId,
            payingClientId,
            router,
            withPayingOrder,
        ]
    );

    const handleCancelAccount = React.useCallback(
        async (account: OpenAccountUI) => {
            if (!account?.clientId) return;
            if (payingClientId) return;
            if (cancelingClientId) return;

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
        [cancelAccount, cancelingClientId, payingClientId, router]
    );

    const handleMarkAllAsPaid = React.useCallback(
        async (account: OpenAccountUI) => {
            if (payingClientId) return;
            if (cancelingClientId) return;

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

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="brand"
                            disabled
                            title="Será conectado depois"
                        >
                            Nova venda
                        </Button>
                    </div>
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

                            const accountOrderIds = [
                                ...account.serviceOrders.map((o) => o.id),
                                ...account.productOrders.map((o) => o.id),
                            ].filter(Boolean);

                            const anyOrderBusy = accountOrderIds.some((id) =>
                                payingOrderIds.has(id)
                            );

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
                                            <p className="text-label-small text-content-secondary">
                                                Produtos pendentes
                                            </p>

                                            <div className="space-y-2">
                                                {account.productOrders.map(
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
                                                                            Pedido
                                                                            (produto)
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
                                                                        <p className="text-paragraph-small text-content-secondary">
                                                                            Produtos:{' '}
                                                                            {order.itemsLabel ||
                                                                                '—'}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex flex-col items-end gap-2">
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
                                                                                )
                                                                            }
                                                                            title={
                                                                                isOrderBusy
                                                                                    ? 'Processando...'
                                                                                    : undefined
                                                                            }
                                                                        >
                                                                            {isOrderBusy
                                                                                ? 'Processando...'
                                                                                : 'Cancelar produto'}
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="pt-2 border-t border-border-primary space-y-2">
                                        <p className="text-label-small text-content-secondary">
                                            Adicionar produto na conta
                                        </p>

                                        <div className="flex flex-wrap items-end gap-2">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs text-content-secondary">
                                                    Produto
                                                </label>
                                                <select
                                                    defaultValue=""
                                                    className="h-9 min-w-60 rounded-md border border-border-primary bg-background-secondary px-2 text-sm text-content-primary"
                                                    disabled
                                                >
                                                    <option value="" disabled>
                                                        Selecione o produto
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs text-content-secondary">
                                                    Qtd
                                                </label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    defaultValue={1}
                                                    className="h-9 w-22.5 rounded-md border border-border-primary bg-background-secondary px-2 text-sm text-content-primary"
                                                    disabled
                                                />
                                            </div>

                                            <Button
                                                type="button"
                                                variant="edit2"
                                                size="sm"
                                                disabled
                                            >
                                                Adicionar produto
                                            </Button>

                                            <p className="text-xs text-content-secondary w-full">
                                                O preço é calculado no checkout
                                                e fica congelado no item.
                                            </p>
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
                                                        Necessário para calcular
                                                        faturamento e comissão
                                                        das vendas de produto.
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
                                                    isCanceling
                                                }
                                                title={
                                                    isPaying ||
                                                    anyOrderBusy ||
                                                    isCanceling
                                                        ? 'Processando...'
                                                        : 'Cancela todos os pedidos pendentes da conta'
                                                }
                                            >
                                                {isCanceling
                                                    ? 'Cancelando...'
                                                    : 'Cancelar conta'}
                                            </Button>

                                            {account.hasProducts ? (
                                                <select
                                                    defaultValue=""
                                                    className="h-9 rounded-md border border-border-primary bg-background-secondary px-2 text-sm text-content-primary"
                                                    disabled
                                                >
                                                    <option value="" disabled>
                                                        Selecione o Profissional
                                                    </option>
                                                </select>
                                            ) : null}

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
                                                    isCanceling
                                                }
                                                title={
                                                    isPaying ||
                                                    anyOrderBusy ||
                                                    isCanceling
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
                totalCountLabel={`${monthGroups.reduce(
                    (sum, g) => sum + g.orders.length,
                    0
                )} pedidos`}
                groups={monthGroups}
            />
        </div>
    );
}
