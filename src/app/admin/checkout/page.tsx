// src/app/admin/checkout/page.tsx
import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { requireAdminForModule } from '@/lib/admin-permissions';

import AdminCheckoutClient, {
    type OpenAccountUI,
    type MonthGroupUI,
} from './admin-checkout-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Checkout',
};

type CheckoutApiResponse =
    | {
          ok: true;
          data: {
              monthQuery: string;
              monthLabel: string;
              openAccounts: OpenAccountUI[];
              openAccountsCount: number;
              monthGroups: MonthGroupUI[];
              monthOrdersCount: number;
          };
      }
    | { ok: false; error: string };

type AdminCheckoutPageProps = {
    searchParams?: Promise<{
        month?: string; // yyyy-MM
        unit?: string; // "all" | unitId
    }>;
};

async function fetchCheckoutData(params: {
    month?: string;
    unit?: string;
}): Promise<CheckoutApiResponse> {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const baseUrl = host ? `${proto}://${host}` : '';

    const sp = new URLSearchParams();
    if (params.month) sp.set('month', params.month);
    if (params.unit) sp.set('unit', params.unit);

    const url = `${baseUrl}/api/admin/checkout${sp.toString() ? `?${sp.toString()}` : ''}`;

    const res = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            cookie: h.get('cookie') ?? '',
        },
    });

    const json = (await res
        .json()
        .catch(() => null)) as CheckoutApiResponse | null;

    if (!res.ok || !json) {
        return { ok: false, error: 'Falha ao carregar dados do checkout.' };
    }

    return json;
}

export default async function AdminCheckoutPage({
    searchParams,
}: AdminCheckoutPageProps) {
    const session = await requireAdminForModule('CHECKOUT');

    const sp = (await searchParams) ?? {};
    const month = sp.month;
    const unit = sp.unit;

    const api = await fetchCheckoutData({ month, unit });

    const monthLabel = api.ok ? api.data.monthLabel : '—';
    const openAccounts: OpenAccountUI[] = api.ok ? api.data.openAccounts : [];
    const monthGroups: MonthGroupUI[] = api.ok ? api.data.monthGroups : [];

    return (
        <AdminCheckoutClient
            canSeeAllUnits={session.canSeeAllUnits}
            monthLabel={monthLabel}
            openAccounts={openAccounts}
            monthGroups={monthGroups}
        />
    );
}
