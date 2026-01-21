// src/app/admin/finance/admin-finance-client.tsx
'use client';

import * as React from 'react';
import { MonthPicker } from '@/components/month-picker';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ExpenseDueDatePicker } from '@/components/expense-due-date-picker';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export type AdminFinanceSummaryUI = {
    netRevenueMonth: string;
    servicesNetMonth: string;
    productsNetMonth: string;
    totalExpenses: string;
    netIncome: string;
    netIncomeIsPositive: boolean;
};

/**
 * ✅ Baseado no schema atual:
 * - Professional.id (professionalId)
 * - ganhos de serviços e comissão de produtos
 */
export type ProfessionalMonthlyEarningsUI = {
    professionalId: string;
    name: string;
    servicesEarnings: string;
    productsEarnings: string;
    total: string;
};

/**
 * ✅ Compat/legado (caso alguma parte do server ainda use "barber")
 */
export type BarberMonthlyEarningsUI = {
    barberId: string;
    name: string;
    servicesEarnings: string;
    productsEarnings: string;
    total: string;
};

export type ExpenseRowUI = {
    id: string;
    description: string;
    dueDate: string; // dd/MM/yyyy (display)
    amount: string; // BRL formatted (display)
    isRecurring: boolean;
    statusLabel: string;
    statusTone?: 'success' | 'warning' | 'danger' | 'neutral';
};

type AdminFinanceClientProps = {
    scopeLabel: string;
    monthLabel: string;
    monthQuery: string;
    summary: AdminFinanceSummaryUI;

    /**
     * ✅ Novo: faturamento por profissional
     * Pode vir undefined se o server ainda não estiver populando.
     */
    professionalEarnings?: ProfessionalMonthlyEarningsUI[];

    /**
     * ✅ Legado: se o server ainda manda barberEarnings, não quebra.
     */
    barberEarnings?: BarberMonthlyEarningsUI[];

    expenses: ExpenseRowUI[];
    newExpenseDisabled?: boolean;

    /**
     * ✅ Agora a seleção de unidade vive no AdminNav (menu).
     * Mantemos apenas o label do escopo vindo do server.
     */
    units?: never;
    canSeeAllUnits?: boolean;
    unitPickerDisabled?: boolean;
};

export default function AdminFinanceClient({
    scopeLabel,
    monthLabel,
    monthQuery,
    summary,
    professionalEarnings,
    barberEarnings,
    expenses,
    newExpenseDisabled,
}: AdminFinanceClientProps) {
    // ✅ Normaliza lista (não deixa undefined nunca)
    const normalizedProfessionalEarnings: ProfessionalMonthlyEarningsUI[] =
        Array.isArray(professionalEarnings)
            ? professionalEarnings
            : Array.isArray(barberEarnings)
              ? barberEarnings.map((b) => ({
                    professionalId: b.barberId,
                    name: b.name,
                    servicesEarnings: b.servicesEarnings,
                    productsEarnings: b.productsEarnings,
                    total: b.total,
                }))
              : [];

    return (
        <div className="space-y-6 max-w-7xl">
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-title text-content-primary">
                        Financeiro
                    </h1>

                    <p className="text-paragraph-small text-content-secondary">
                        Mês selecionado:{' '}
                        <span className="font-medium">{monthLabel}</span>
                    </p>

                    <p className="text-paragraph-small text-content-tertiary">
                        Unidade:{' '}
                        <span className="font-medium">{scopeLabel}</span>
                    </p>
                </div>

                <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
                    <MonthPicker />
                </div>
            </header>

            {/* RESUMO FINANCEIRO DO MÊS */}
            <section className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3">
                    <p className="text-label-small text-content-secondary">
                        Faturamento líquido (pagos no mês)
                    </p>
                    <p className="text-title text-content-primary">
                        {summary.netRevenueMonth}
                    </p>
                    <p className="text-paragraph-small text-content-secondary">
                        Serviços (líq.):{' '}
                        <span className="font-semibold">
                            {summary.servicesNetMonth}
                        </span>{' '}
                        • Produtos (líq.):{' '}
                        <span className="font-semibold">
                            {summary.productsNetMonth}
                        </span>
                    </p>
                </div>

                <div className="space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3">
                    <p className="text-label-small text-content-secondary">
                        Despesas (mês)
                    </p>
                    <p className="text-title text-content-primary">
                        {summary.totalExpenses}
                    </p>
                    <p className="text-paragraph-small text-content-secondary">
                        Todas as despesas cadastradas para este mês.
                    </p>
                </div>

                <div className="space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3">
                    <p className="text-label-small text-content-secondary">
                        Lucro líquido (mês)
                    </p>

                    {/* ✅ Sem cn aqui (tailwind-merge derrubava o text-title por conflito com text-green-500) */}
                    <p
                        className={`text-title ${
                            summary.netIncomeIsPositive
                                ? 'text-green-500'
                                : 'text-red-600'
                        }`}
                    >
                        {summary.netIncome}
                    </p>

                    <p className="text-paragraph-small text-content-secondary">
                        Faturamento líquido menos as despesas do mês.
                    </p>
                </div>
            </section>

            <ProfessionalMonthlyEarningsSection
                professionalsEarnings={normalizedProfessionalEarnings}
            />

            {/* HEADER DO CADASTRO + BOTÃO */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-subtitle text-content-primary">
                        Cadastro de despesas (mês)
                    </h2>
                    <p className="text-paragraph-small text-content-secondary">
                        Contas cadastradas para este mês, incluindo despesas
                        recorrentes e avulsas.
                    </p>
                </div>

                <NewExpenseDialog
                    month={monthQuery}
                    disabled={newExpenseDisabled}
                />
            </div>

            <section className="overflow-x-auto rounded-xl border border-border-primary bg-background-tertiary">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="border-b border-border-primary bg-muted/40 text-left text-label-small text-content-secondary">
                            <th className="px-4 py-2">Descrição</th>
                            <th className="px-4 py-2">Vencimento</th>
                            <th className="px-4 py-2 text-right">Valor</th>
                            <th className="px-4 py-2 text-center">
                                Recorrente
                            </th>
                            <th className="px-4 py-2 text-center">Status</th>
                            <th className="px-4 py-2 text-right">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-6 text-center text-paragraph-small text-content-secondary"
                                >
                                    Nenhuma despesa cadastrada para este mês.
                                </td>
                            </tr>
                        ) : (
                            expenses.map((e) => (
                                <ExpenseRow key={e.id} expense={e} />
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

/* ========= SEÇÃO: FATURAMENTO POR PROFISSIONAL ========= */

function ProfessionalMonthlyEarningsSection({
    professionalsEarnings,
}: {
    professionalsEarnings: ProfessionalMonthlyEarningsUI[];
}) {
    // ✅ extra safety (mesmo que chamem errado)
    const list = Array.isArray(professionalsEarnings)
        ? professionalsEarnings
        : [];

    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-subtitle text-content-primary">
                    Faturamento por profissional (mês)
                </h2>
                <p className="text-paragraph-small text-content-secondary">
                    Valores recebidos em serviços e comissões de produtos (pagos
                    no mês).
                </p>
            </div>

            {list.length === 0 ? (
                <p className="text-paragraph-small text-content-secondary">
                    Nenhum profissional ativo cadastrado.
                </p>
            ) : (
                <div
                    className="grid gap-4 grid-cols-1 sm:grid-cols-2"
                    style={{
                        // ✅ no md+ usa colunas dinâmicas até 5
                        gridTemplateColumns:
                            list.length <= 0
                                ? undefined
                                : `repeat(${Math.min(5, list.length)}, minmax(0, 1fr))`,
                    }}
                >
                    {list.map((p) => (
                        <div
                            key={p.professionalId}
                            className="space-y-2 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3"
                        >
                            <p className="text-label-large text-content-primary">
                                {p.name}
                            </p>

                            <p className="text-paragraph-small text-content-secondary">
                                Serviços:{' '}
                                <span className="font-semibold">
                                    {p.servicesEarnings}
                                </span>
                            </p>

                            <p className="text-paragraph-small text-content-secondary">
                                Produtos:{' '}
                                <span className="font-semibold">
                                    {p.productsEarnings}
                                </span>
                            </p>

                            <p className="text-paragraph-small text-content-secondary">
                                Total:{' '}
                                <span className="font-semibold">{p.total}</span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

/* ========= LINHA DA TABELA ========= */

type DeleteExpenseResponse =
    | {
          ok: true;
          data: {
              deleted: boolean;
              deletedCount: number;
              mode: 'single' | 'series';
          };
      }
    | { ok: false; error: string };

type TogglePaidResponse =
    | {
          ok: true;
          data: { expenseId: string; isPaid: boolean };
      }
    | { ok: false; error: string };

function ExpenseRow({ expense }: { expense: ExpenseRowUI }) {
    const router = useRouter();

    // estado derivado do server (fallback)
    const serverIsPaid =
        expense.statusTone === 'success' ||
        String(expense.statusLabel || '').toLowerCase() === 'pago';

    // estado local (optimistic)
    const [localIsPaid, setLocalIsPaid] = React.useState<boolean | null>(null);
    const effectiveIsPaid = localIsPaid ?? serverIsPaid;

    const statusLabel = effectiveIsPaid ? 'Pago' : 'Em aberto';
    const effectiveToneClass = effectiveIsPaid
        ? 'bg-green-500/15 text-green-600 border-green-500/30'
        : 'bg-amber-500/15 text-amber-700 border-amber-500/30';

    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);
    const [deleteErr, setDeleteErr] = React.useState<string | null>(null);

    const [toggling, setToggling] = React.useState(false);
    const [toggleErr, setToggleErr] = React.useState<string | null>(null);

    const handleDelete = React.useCallback(async () => {
        setDeleteErr(null);
        setDeleting(true);

        try {
            const res = await fetch(
                `/api/admin/finance/expenses/${encodeURIComponent(expense.id)}`,
                { method: 'DELETE' }
            );

            const json = (await res.json()) as DeleteExpenseResponse;

            if (!res.ok || !json.ok) {
                setDeleteErr(!json.ok ? json.error : 'Falha ao excluir.');
                setDeleting(false);
                return;
            }

            setConfirmOpen(false);
            router.refresh();
        } catch {
            setDeleteErr('Erro de rede. Tente novamente.');
        } finally {
            setDeleting(false);
        }
    }, [expense.id, router]);

    const handleTogglePaid = React.useCallback(async () => {
        setToggleErr(null);
        setToggling(true);

        // optimistic: troca já na UI
        const next = !effectiveIsPaid;
        setLocalIsPaid(next);

        try {
            const res = await fetch(
                `/api/admin/finance/expenses/${encodeURIComponent(
                    expense.id
                )}/paid`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isPaid: next }),
                }
            );

            const json = (await res.json()) as TogglePaidResponse;

            if (!res.ok || !json.ok) {
                // rollback
                setLocalIsPaid(effectiveIsPaid);
                setToggleErr(
                    !json.ok ? json.error : 'Falha ao atualizar status.'
                );
                setToggling(false);
                return;
            }

            // garante que refletiu o que o backend retornou
            setLocalIsPaid(json.data.isPaid);

            // consolida com dados do server
            router.refresh();
        } catch {
            // rollback
            setLocalIsPaid(effectiveIsPaid);
            setToggleErr('Erro de rede. Tente novamente.');
        } finally {
            setToggling(false);
        }
    }, [effectiveIsPaid, expense.id, router]);

    return (
        <tr className="border-b border-border-primary last:border-b-0">
            <td className="px-4 py-3 text-content-primary">
                {expense.description}
            </td>

            <td className="px-4 py-3 text-content-secondary">
                {expense.dueDate}
            </td>

            <td className="px-4 py-3 text-right text-content-primary font-medium">
                {expense.amount}
            </td>

            <td className="px-4 py-3 text-center">
                <span
                    className={cn(
                        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                        expense.isRecurring
                            ? 'bg-border-brand/10 border-border-brand/30 text-content-primary'
                            : 'bg-muted/40 border-border-primary text-content-secondary'
                    )}
                >
                    {expense.isRecurring ? 'Sim' : 'Não'}
                </span>
            </td>

            <td className="px-4 py-3 text-center">
                <span
                    className={cn(
                        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                        effectiveToneClass
                    )}
                    title={toggleErr ?? undefined}
                >
                    {statusLabel}
                </span>
            </td>

            <td className="px-4 py-3 text-right">
                <div className="inline-flex flex-wrap justify-end gap-2">
                    <Button size="sm" variant="edit2" className="h-8">
                        Editar
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        className={cn(
                            'h-8 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand',
                            toggling && 'opacity-70 cursor-wait'
                        )}
                        onClick={handleTogglePaid}
                        disabled={toggling || deleting}
                        title={
                            effectiveIsPaid
                                ? 'Marcar como pendente'
                                : 'Marcar como paga'
                        }
                    >
                        {toggling
                            ? 'Atualizando...'
                            : effectiveIsPaid
                              ? 'Pendente'
                              : 'Conta paga'}
                    </Button>

                    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                        <DialogTrigger asChild>
                            <Button
                                size="sm"
                                variant="destructive"
                                className="h-8"
                                disabled={toggling}
                            >
                                Excluir
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-background-secondary border border-border-primary">
                            <DialogHeader>
                                <DialogTitle className="text-title text-content-primary">
                                    Excluir despesa
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-3">
                                <div className="rounded-xl border border-border-primary bg-background-tertiary px-3 py-2">
                                    <p className="text-paragraph-small text-content-secondary">
                                        Você está prestes a excluir:
                                    </p>
                                    <p className="text-label-large text-content-primary">
                                        {expense.description}
                                    </p>
                                    <p className="text-paragraph-small text-content-secondary">
                                        Vencimento: {expense.dueDate} • Valor:{' '}
                                        <span className="font-semibold text-content-primary">
                                            {expense.amount}
                                        </span>
                                    </p>
                                </div>

                                {expense.isRecurring ? (
                                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2">
                                        <p className="text-paragraph-small text-amber-700">
                                            Essa despesa é <b>recorrente</b>. Ao
                                            excluir, o sistema removerá esta
                                            despesa e <b>todas as próximas</b>
                                            (do mês atual em diante).
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-paragraph-small text-content-secondary">
                                        Essa ação não pode ser desfeita.
                                    </p>
                                )}

                                {deleteErr && (
                                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
                                        <p className="text-paragraph-small text-red-600">
                                            {deleteErr}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setConfirmOpen(false)}
                                        disabled={deleting}
                                        className="bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand"
                                    >
                                        Cancelar
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                    >
                                        {deleting ? 'Excluindo...' : 'Excluir'}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </td>
        </tr>
    );
}

/* ========= NOVA DESPESA (POST na route) ========= */

type CreateExpenseResponse =
    | {
          ok: true;
          data: { expenseId: string; monthQuery: string; created: boolean };
      }
    | { ok: false; error: string };

function NewExpenseDialog({
    month,
    disabled,
}: {
    month: string;
    disabled?: boolean;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const unitParam = searchParams.get('unit'); // unitId | null
    const unitId = unitParam ? unitParam : null;

    const [open, setOpen] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

    const hasValidUnit = !!unitId;

    const onSubmit = React.useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setErrorMsg(null);

            if (!unitId) {
                setErrorMsg('Selecione uma unidade para cadastrar a despesa.');
                return;
            }

            const form = e.currentTarget;
            const fd = new FormData(form);

            const description = String(fd.get('description') ?? '').trim();
            const amountRaw = String(fd.get('amount') ?? '').trim();
            const amount = Number(amountRaw);

            const isRecurring = fd.get('isRecurring') != null;
            const recurringDayRaw = String(fd.get('recurringDay') ?? '').trim();
            const recurringDay = recurringDayRaw
                ? Number(recurringDayRaw)
                : undefined;

            const dueDate = String(fd.get('dueDate') ?? '').trim() || undefined;

            // validações mínimas no client (backend valida de verdade)
            if (!description) {
                setErrorMsg('Informe a descrição.');
                return;
            }
            if (!Number.isFinite(amount) || amount <= 0) {
                setErrorMsg('Informe um valor válido.');
                return;
            }
            if (isRecurring) {
                if (
                    !Number.isFinite(Number(recurringDay)) ||
                    Number(recurringDay) < 1 ||
                    Number(recurringDay) > 31
                ) {
                    setErrorMsg('Informe um dia de vencimento (1 a 31).');
                    return;
                }
            } else {
                if (!dueDate) {
                    setErrorMsg('Informe a data de vencimento.');
                    return;
                }
            }

            setSubmitting(true);
            try {
                const res = await fetch('/api/admin/finance/expenses', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        month,
                        unitId,
                        category: 'OTHER',
                        description,
                        amount,
                        isRecurring,
                        recurringDay: isRecurring
                            ? Number(recurringDay)
                            : undefined,
                        dueDate: !isRecurring ? dueDate : undefined,
                    }),
                });

                const json = (await res.json()) as CreateExpenseResponse;

                if (!res.ok || !json.ok) {
                    setErrorMsg(!json.ok ? json.error : 'Falha ao salvar.');
                    setSubmitting(false);
                    return;
                }

                // fecha modal e recarrega dados do server
                setOpen(false);
                form.reset();
                router.refresh();
            } catch {
                setErrorMsg('Erro de rede. Tente novamente.');
            } finally {
                setSubmitting(false);
            }
        },
        [month, router, unitId]
    );

    // ✅ Agora só respeita o disabled vindo do server.
    if (disabled) {
        return (
            <Button variant="brand" disabled title="Ação indisponível">
                Nova despesa
            </Button>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="brand">Nova despesa</Button>
            </DialogTrigger>

            <DialogContent className="bg-background-secondary border border-border-primary">
                <DialogHeader>
                    <DialogTitle className="text-title text-content-primary">
                        Nova despesa
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <input type="hidden" name="month" value={month} />
                    <input type="hidden" name="category" value="OTHER" />
                    <input type="hidden" name="unitId" value={unitId ?? ''} />

                    {!hasValidUnit && (
                        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2">
                            <p className="text-paragraph-small text-amber-700">
                                Selecione uma unidade no menu lateral para
                                cadastrar a despesa.
                            </p>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label
                            className="text-label-small text-content-secondary"
                            htmlFor="description"
                        >
                            Descrição
                        </label>
                        <Input
                            id="description"
                            name="description"
                            required
                            placeholder="Ex: Aluguel, Luz, Internet..."
                            className="bg-background-tertiary border-border-primary text-content-primary"
                        />
                    </div>

                    <div className="space-y-1">
                        <label
                            className="text-label-small text-content-secondary"
                            htmlFor="amount"
                        >
                            Valor (R$)
                        </label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            className="bg-background-tertiary border-border-primary text-content-primary"
                        />
                    </div>

                    <div className="space-y-3">
                        <input
                            id="isRecurring"
                            name="isRecurring"
                            type="checkbox"
                            className="peer sr-only"
                        />

                        <label
                            htmlFor="isRecurring"
                            className="
                inline-flex items-center gap-2 cursor-pointer
                peer-checked:[&_.box]:bg-border-brand
                peer-checked:[&_.box]:border-border-brand
                peer-checked:[&_.check]:bg-background-primary
              "
                        >
                            <span
                                className="
                  box flex h-4 w-4 items-center justify-center
                  rounded border border-border-primary bg-background-tertiary
                  transition-colors
                "
                            >
                                <span className="check h-2 w-2 rounded-sm bg-transparent transition-colors" />
                            </span>
                            <span className="text-label-small text-content-primary">
                                Despesa recorrente
                            </span>
                        </label>

                        <div className="space-y-1 hidden peer-checked:block">
                            <label
                                className="text-label-small text-content-secondary"
                                htmlFor="recurringDay"
                            >
                                Dia de vencimento (se recorrente)
                            </label>
                            <Input
                                id="recurringDay"
                                name="recurringDay"
                                type="number"
                                min={1}
                                max={31}
                                placeholder="Ex: 10"
                                className="bg-background-tertiary border-border-primary text-content-primary"
                            />
                            <p className="text-paragraph-small text-content-secondary">
                                Para despesas recorrentes, informe apenas o dia
                                de vencimento (se for 31 e o mês não tiver, cai
                                no último dia do mês).
                            </p>
                        </div>

                        <div className="space-y-1 peer-checked:hidden">
                            <label
                                className="text-label-small text-content-secondary"
                                htmlFor="dueDate"
                            >
                                Data de vencimento (se NÃO recorrente)
                            </label>

                            <ExpenseDueDatePicker id="dueDate" name="dueDate" />

                            <p className="text-paragraph-small text-content-secondary">
                                Use este campo para despesas que acontecem em
                                uma data única.
                            </p>
                        </div>
                    </div>

                    {errorMsg && (
                        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
                            <p className="text-paragraph-small text-red-600">
                                {errorMsg}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="submit"
                            variant="brand"
                            disabled={submitting || !hasValidUnit}
                            title={
                                !hasValidUnit
                                    ? 'Selecione uma unidade para salvar'
                                    : undefined
                            }
                        >
                            {submitting ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
