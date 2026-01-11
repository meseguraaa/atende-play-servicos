// src/lib/admin-menu.ts
import type { AdminMenuKey } from '@/lib/admin-access-map';

export type AdminMenuItem = {
    href: string;
    label: string;
    menuKey: AdminMenuKey;
    enabled: boolean;
};

/**
 * Desativar módulos temporariamente (sem mexer em permissões):
 * - Use ENV: ADMIN_DISABLED_MODULES="reviews,finance"
 * - Ou no client: NEXT_PUBLIC_ADMIN_DISABLED_MODULES="reviews,finance"
 *
 * Observação:
 * - Faz match por "menuKey" (ex: "reviews", "finance", "settings")
 * - Espaços são ignorados
 */
function readDisabledKeys(): Set<string> {
    const raw =
        process.env.ADMIN_DISABLED_MODULES ??
        process.env.NEXT_PUBLIC_ADMIN_DISABLED_MODULES ??
        '';

    const keys = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

    return new Set(keys);
}

const DISABLED_KEYS = readDisabledKeys();

function isEnabled(menuKey: AdminMenuKey): boolean {
    return !DISABLED_KEYS.has(String(menuKey));
}

/**
 * ✅ Fonte única do menu (ordem + href + key).
 * O "enabled" permite desativar módulo temporariamente e ter fallback automático.
 */
export const ADMIN_MENU: AdminMenuItem[] = [
    {
        href: '/admin/dashboard',
        label: 'Dashboard',
        menuKey: 'dashboard',
        enabled: isEnabled('dashboard'),
    },
    {
        href: '/admin/reports',
        label: 'Relatórios',
        menuKey: 'reports',
        enabled: isEnabled('reports'),
    },
    {
        href: '/admin/appointments',
        label: 'Agendamentos',
        menuKey: 'appointments',
        enabled: isEnabled('appointments'),
    },
    {
        href: '/admin/checkout',
        label: 'Checkout',
        menuKey: 'checkout',
        enabled: isEnabled('checkout'),
    },
    {
        href: '/admin/professional',
        label: 'Profissionais',
        menuKey: 'professionals',
        enabled: isEnabled('professionals'),
    },
    {
        href: '/admin/services',
        label: 'Serviços',
        menuKey: 'services',
        enabled: isEnabled('services'),
    },
    {
        href: '/admin/review-tags',
        label: 'Avaliação',
        menuKey: 'reviews',
        enabled: isEnabled('reviews'),
    },
    {
        href: '/admin/products',
        label: 'Produtos',
        menuKey: 'products',
        enabled: isEnabled('products'),
    },
    {
        href: '/admin/clients',
        label: 'Clientes',
        menuKey: 'clients',
        enabled: isEnabled('clients'),
    },
    {
        href: '/admin/client-levels',
        label: 'Nível de Cliente',
        menuKey: 'clientLevels',
        enabled: isEnabled('clientLevels'),
    },
    {
        href: '/admin/finance',
        label: 'Financeiro',
        menuKey: 'finance',
        enabled: isEnabled('finance'),
    },
    {
        href: '/admin/setting',
        label: 'Configurações',
        menuKey: 'settings',
        enabled: isEnabled('settings'),
    },
];

/**
 * Helper: retorna o próximo href "válido" (enabled) na ordem do menu.
 */
export function getFirstEnabledAdminHref(): string | null {
    return ADMIN_MENU.find((i) => i.enabled)?.href ?? null;
}
