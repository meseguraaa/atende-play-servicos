// src/app/admin/finance/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';
import AdminFinanceClient, {
    type AdminFinanceSummaryUI,
    type BarberMonthlyEarningsUI,
    type ExpenseRowUI,
} from './admin-finance-client';

import {
    addMonths,
    endOfMonth,
    format,
    isValid,
    parse,
    startOfMonth,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Financeiro',
};

type AdminFinancePageProps = {
    searchParams: Promise<{
        month?: string; // yyyy-MM
        unit?: string; // unitId (mantemos compat com "all", mas redireciona)
    }>;
};

function parseMonthParam(month?: string): Date {
    if (!month) return startOfMonth(new Date());
    const parsed = parse(month, 'yyyy-MM', new Date());
    if (!isValid(parsed)) return startOfMonth(new Date());
    return startOfMonth(parsed);
}

function capitalizeFirst(v: string) {
    if (!v) return v;
    return v.charAt(0).toUpperCase() + v.slice(1);
}

function buildFinanceRedirect(params: { month?: string; unit?: string }) {
    const sp = new URLSearchParams();

    if (params.month) sp.set('month', params.month);
    if (params.unit) sp.set('unit', params.unit);

    const qs = sp.toString();
    return qs ? `/admin/finance?${qs}` : '/admin/finance';
}

function clampDayToMonth(day: number, monthDate: Date): number {
    const last = endOfMonth(monthDate).getDate();
    if (day <= 1) return 1;
    if (day >= last) return last;
    return day;
}

/**
 * ✅ Auto-criação de despesas recorrentes ao entrar no mês:
 * - Busca recorrentes do mês anterior (mesma unidade)
 * - Cria no mês atual o que estiver faltando
 *
 * “Chave” de dedupe (pragmática):
 * companyId + unitId + isRecurring=true + category + description + amount + dueDate(dia dentro do mês)
 *
 * (Sem tabela de "templates", essa é a forma mais segura usando só o schema atual.)
 */
async function ensureRecurringExpensesForMonth(args: {
    companyId: string;
    unitId: string;
    monthDate: Date; // startOfMonth
}) {
    const { companyId, unitId, monthDate } = args;

    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    const prevMonth = startOfMonth(addMonths(monthDate, -1));
    const prevStart = startOfMonth(prevMonth);
    const prevEnd = endOfMonth(prevMonth);

    // 1) Recorrentes do mês anterior (fonte)
    const prevRecurring = await prisma.expense.findMany({
        where: {
            companyId,
            unitId,
            isRecurring: true,
            dueDate: { gte: prevStart, lte: prevEnd },
        },
        select: {
            id: true,
            description: true,
            category: true,
            amount: true,
            dueDate: true,
        },
        orderBy: [{ dueDate: 'asc' }, { createdAt: 'asc' }],
    });

    if (prevRecurring.length === 0) return;

    // 2) Recorrentes já existentes no mês atual (para dedupe)
    const currentRecurring = await prisma.expense.findMany({
        where: {
            companyId,
            unitId,
            isRecurring: true,
            dueDate: { gte: monthStart, lte: monthEnd },
        },
        select: {
            description: true,
            category: true,
            amount: true,
            dueDate: true,
        },
    });

    const existingKey = new Set(
        currentRecurring.map((e) => {
            const day = e.dueDate.getDate();
            return [
                companyId,
                unitId,
                'REC',
                e.category,
                e.description.trim().toLowerCase(),
                Number(e.amount).toFixed(2),
                String(day),
            ].join('|');
        })
    );

    const toCreate = prevRecurring
        .map((src) => {
            const day = src.dueDate.getDate();
            const clampedDay = clampDayToMonth(day, monthDate);
            const dueDate = new Date(
                monthDate.getFullYear(),
                monthDate.getMonth(),
                clampedDay
            );

            const key = [
                companyId,
                unitId,
                'REC',
                src.category,
                src.description.trim().toLowerCase(),
                Number(src.amount).toFixed(2),
                String(clampedDay),
            ].join('|');

            return {
                key,
                data: {
                    companyId,
                    unitId,
                    description: src.description,
                    category: src.category,
                    amount: Number(src.amount).toFixed(2), // Decimal string ok
                    dueDate,
                    isRecurring: true,
                    isPaid: false, // novo mês começa em aberto
                },
            };
        })
        .filter((x) => !existingKey.has(x.key));

    if (toCreate.length === 0) return;

    // 3) Cria em lote (idempotente na prática pelo dedupe acima)
    await prisma.expense.createMany({
        data: toCreate.map((x) => x.data),
        skipDuplicates: false,
    });
}

export default async function AdminFinancePage({
    searchParams,
}: AdminFinancePageProps) {
    const session = await requireAdminForModule('FINANCE');

    // 🔒 Hard lock multi-tenant
    const companyId = session.companyId;
    if (!companyId) {
        redirect('/admin');
    }

    // ✅ FIX: AdminSession usa `id` (não `userId`)
    const userId = session.id;
    if (!userId) {
        redirect('/admin');
    }

    const canSeeAllUnits = !!(session as any)?.canSeeAllUnits;

    const { month: monthParam, unit: unitParam } = await searchParams;

    const referenceDate = parseMonthParam(monthParam);
    const monthStart = startOfMonth(referenceDate);
    const monthEnd = endOfMonth(referenceDate);

    const monthQuery = format(referenceDate, 'yyyy-MM');
    const monthLabel = capitalizeFirst(
        format(referenceDate, "MMMM 'de' yyyy", { locale: ptBR })
    );

    const units = canSeeAllUnits
        ? await prisma.unit.findMany({
              where: { companyId, isActive: true },
              select: { id: true, name: true },
              orderBy: { name: 'asc' },
          })
        : await (async () => {
              const access = await prisma.adminUnitAccess.findMany({
                  where: { companyId, userId },
                  select: { unitId: true },
              });

              const unitIds = access.map((a) => a.unitId).filter(Boolean);

              if (!unitIds.length) return [];

              return prisma.unit.findMany({
                  where: {
                      companyId,
                      isActive: true,
                      id: { in: unitIds },
                  },
                  select: { id: true, name: true },
                  orderBy: { name: 'asc' },
              });
          })();

    const defaultUnitId = units.length > 0 ? units[0].id : null;

    // ✅ Se não tiver nenhuma unidade acessível, mantém a página mas tudo desabilitado
    if (!defaultUnitId) {
        const summary: AdminFinanceSummaryUI = {
            netRevenueMonth: 'R$ 0,00',
            servicesNetMonth: 'R$ 0,00',
            productsNetMonth: 'R$ 0,00',
            totalExpenses: 'R$ 0,00',
            netIncome: 'R$ 0,00',
            netIncomeIsPositive: true,
        };

        return (
            <AdminFinanceClient
                scopeLabel={'Nenhuma unidade disponível'}
                monthLabel={monthLabel}
                monthQuery={monthQuery}
                summary={summary}
                barberEarnings={[]}
                expenses={[]}
                newExpenseDisabled={true}
            />
        );
    }

    // ✅ Regra: sempre ter um unit real na URL (compat: se vier unit=all, cai na default)
    if (!unitParam || unitParam === 'all') {
        redirect(
            buildFinanceRedirect({ month: monthQuery, unit: defaultUnitId })
        );
    }

    // ✅ Unidade ativa (filtro)
    const activeUnitId: string = unitParam;

    // valida na lista acessível (units) + valida no banco (multi-tenant)
    const inAllowedList = units.some((u) => u.id === activeUnitId);

    if (!inAllowedList) {
        redirect(
            buildFinanceRedirect({ month: monthQuery, unit: defaultUnitId })
        );
    }

    const ok = await prisma.unit.findFirst({
        where: { id: activeUnitId, companyId, isActive: true },
        select: { id: true },
    });

    if (!ok) {
        redirect(
            buildFinanceRedirect({ month: monthQuery, unit: defaultUnitId })
        );
    }

    // ✅ AUTO: ao entrar no mês, cria recorrentes faltantes
    await ensureRecurringExpensesForMonth({
        companyId,
        unitId: activeUnitId,
        monthDate: monthStart,
    });

    const scopeLabel = (() => {
        const found = units.find((u) => u.id === activeUnitId);
        return found?.name ?? 'unidade selecionada';
    })();

    const newExpenseDisabled = !activeUnitId;

    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const expensesDb = await prisma.expense.findMany({
        where: {
            companyId,
            unitId: activeUnitId,
            dueDate: { gte: monthStart, lte: monthEnd },
        } as any,
        orderBy: [{ dueDate: 'asc' }, { createdAt: 'asc' }],
        select: {
            id: true,
            description: true,
            dueDate: true,
            amount: true,
            isRecurring: true,
            isPaid: true,
        },
    });

    const expenses: ExpenseRowUI[] = expensesDb.map((e) => ({
        id: e.id,
        description: e.description,
        dueDate: format(e.dueDate, 'dd/MM/yyyy', { locale: ptBR }),
        amount: currencyFormatter.format(Number(e.amount)),
        isRecurring: !!e.isRecurring,
        statusLabel: e.isPaid ? 'Pago' : 'Em aberto',
        statusTone: e.isPaid ? 'success' : 'warning',
    }));

    const totalExpensesNumber = expensesDb.reduce(
        (sum, e) => sum + Number(e.amount),
        0
    );

    const netRevenueMonthNumber = 0; // placeholder
    const netIncomeNumber = netRevenueMonthNumber - totalExpensesNumber;

    const summary: AdminFinanceSummaryUI = {
        netRevenueMonth: currencyFormatter.format(netRevenueMonthNumber),
        servicesNetMonth: currencyFormatter.format(0),
        productsNetMonth: currencyFormatter.format(0),
        totalExpenses: currencyFormatter.format(totalExpensesNumber),
        netIncome: currencyFormatter.format(netIncomeNumber),
        netIncomeIsPositive: netIncomeNumber >= 0,
    };

    const barberEarnings: BarberMonthlyEarningsUI[] = [
        {
            barberId: 'b1',
            name: 'Bruno Leal',
            servicesEarnings: 'R$ 2.150,00',
            productsEarnings: 'R$ 320,00',
            total: 'R$ 2.470,00',
        },
        {
            barberId: 'b2',
            name: 'Rafael Souza',
            servicesEarnings: 'R$ 1.780,00',
            productsEarnings: 'R$ 190,00',
            total: 'R$ 1.970,00',
        },
        {
            barberId: 'b3',
            name: 'João Pedro',
            servicesEarnings: 'R$ 1.420,00',
            productsEarnings: 'R$ 410,00',
            total: 'R$ 1.830,00',
        },
    ];

    return (
        <AdminFinanceClient
            scopeLabel={scopeLabel}
            monthLabel={monthLabel}
            monthQuery={monthQuery}
            summary={summary}
            barberEarnings={barberEarnings}
            expenses={expenses}
            newExpenseDisabled={newExpenseDisabled}
        />
    );
}
