// src/app/admin/services/page.tsx
import type { Metadata } from 'next';
import { headers, cookies } from 'next/headers';

import { requireAdminForModule } from '@/lib/admin-permissions';

import { ServiceRow } from '@/components/admin/services/service-row';
import { ServiceNewDialog } from '@/components/admin/services/service-new-dialog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin | Serviços',
};

export type ServiceForRow = {
    id: string;
    unitId: string | null;

    name: string;

    // Prisma Decimal -> string (vindo da API)
    price: string;
    durationMinutes: number;

    isActive: boolean;

    // Prisma Decimal -> string (vindo da API)
    professionalPercentage: string;
    cancelLimitHours: number | null;
    cancelFeePercentage: string | null;

    createdAt: string | Date;
    updatedAt: string | Date;
};

type ProfessionalForPicker = {
    id: string;
    name: string;
    isActive: boolean;
};

type ServicesApiResponse = {
    ok: boolean;
    data?: {
        services: ServiceForRow[];
        professionals: ProfessionalForPicker[];
        units?: { id: string; name: string; isActive: boolean }[];
    };
    error?: string;
};

function getBaseUrlFromHeaders(h: Headers) {
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    if (!host) return null;
    return `${proto}://${host}`;
}

// ✅ parser robusto pt-BR: "1.234,56" -> 1234.56
function toNumberOrNull(value: unknown): number | null {
    if (value === null || value === undefined) return null;

    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : null;
    }

    if (typeof value === 'string') {
        const normalized = value
            .trim()
            .replace(/\s/g, '')
            .replace(/\./g, '')
            .replace(',', '.');

        if (!normalized) return null;

        const n = Number(normalized);
        return Number.isFinite(n) ? n : null;
    }

    return null;
}

function decimalToCents(value: unknown): number | null {
    const n = toNumberOrNull(value);
    if (n === null) return null;
    return Math.round(n * 100);
}

export default async function AdminServicesPage() {
    await requireAdminForModule('SERVICES');

    const h = await headers();
    const baseUrl = getBaseUrlFromHeaders(h);

    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
        .join('; ');

    let services: ServiceForRow[] = [];

    try {
        const url = baseUrl
            ? `${baseUrl}/api/admin/services`
            : '/api/admin/services';

        const res = await fetch(url, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                cookie: cookieHeader,
                accept: 'application/json',
            },
        });

        const json = (await res
            .json()
            .catch(() => null)) as ServicesApiResponse | null;

        if (res.ok && json?.ok && json.data) {
            services = json.data.services ?? [];
        } else {
            services = [];
        }
    } catch {
        services = [];
    }

    // Bridge: ServiceRow aceita tanto shape UI quanto "prisma-like".
    // Aqui entregamos um shape UI consistente (priceInCents/durationInMinutes/barberPercentage)
    // para a tabela renderizar corretamente.
    const servicesForTable = services.map((s) => {
        const priceInCents =
            // se por acaso vier no formato novo no futuro
            (s as any).priceInCents !== undefined
                ? (s as any).priceInCents
                : decimalToCents((s as any).price);

        const durationInMinutes =
            (s as any).durationInMinutes !== undefined
                ? (s as any).durationInMinutes
                : typeof (s as any).durationMinutes === 'number'
                  ? (s as any).durationMinutes
                  : null;

        const barberPercentage =
            (s as any).barberPercentage !== undefined
                ? (s as any).barberPercentage
                : toNumberOrNull((s as any).professionalPercentage);

        const cancelFeePercentage =
            (s as any).cancelFeePercentage === null ||
            (s as any).cancelFeePercentage === undefined
                ? null
                : typeof (s as any).cancelFeePercentage === 'number'
                  ? (s as any).cancelFeePercentage
                  : toNumberOrNull((s as any).cancelFeePercentage);

        return {
            id: s.id,
            unitId: s.unitId ?? null,

            name: s.name,
            description: null as string | null,

            priceInCents,
            durationInMinutes,

            barberPercentage,
            cancelLimitHours: s.cancelLimitHours ?? null,
            cancelFeePercentage,

            isActive: Boolean(s.isActive),
            companyId: (s as any).companyId ?? null,
        };
    });

    return (
        <div className="max-w-7xl space-y-6">
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-content-primary">
                        Serviços
                    </h1>
                    <p className="text-paragraph-medium-size text-content-secondary">
                        Gerencie os serviços, duração, comissões e regras de
                        cancelamento.
                    </p>
                </div>

                {/* O dialog já faz o GET interno pra puxar profissionais/unidades */}
                <ServiceNewDialog />
            </header>

            <section className="overflow-x-auto rounded-xl border border-border-primary bg-background-tertiary">
                <table className="w-full table-fixed border-collapse text-sm">
                    <colgroup>
                        <col className="w-60" />
                        <col className="w-15" />
                        <col className="w-15" />
                        <col className="w-15" />
                        <col className="w-20" />
                        <col className="w-15" />
                        <col className="w-15" />
                        <col className="w-27.5" />
                    </colgroup>

                    <thead>
                        <tr className="border-b border-border-primary bg-background-secondary">
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Serviço
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Preço
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Duração
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Comissão
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Cancelamento
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-content-secondary">
                                Taxa
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
                        {servicesForTable.length === 0 ? (
                            <tr className="border-t border-border-primary">
                                <td
                                    colSpan={8}
                                    className="px-4 py-6 text-center text-paragraph-small text-content-secondary"
                                >
                                    Nenhum serviço cadastrado ainda.
                                </td>
                            </tr>
                        ) : (
                            servicesForTable.map((service) => (
                                <ServiceRow
                                    key={service.id}
                                    service={service as any}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
