// src/lib/admin-access-map.ts

export type AdminAccessLike = Partial<
    Record<
        | 'canAccessDashboard'
        | 'canAccessReports'
        | 'canAccessCheckout'
        | 'canAccessAppointments'
        | 'canAccessProfessionals'
        | 'canAccessServices'
        | 'canAccessReviews'
        | 'canAccessProducts'
        | 'canAccessClients'
        | 'canAccessClientLevels'
        | 'canAccessFinance'
        | 'canAccessSettings',
        boolean
    >
>;

export type AdminMenuKey =
    | 'dashboard'
    | 'reports'
    | 'checkout'
    | 'appointments'
    | 'professionals'
    | 'services'
    | 'reviews'
    | 'products'
    | 'clients'
    | 'clientLevels'
    | 'finance'
    | 'settings';

const MENU_TO_ACCESS_FIELD: Record<
    AdminMenuKey,
    keyof Required<AdminAccessLike>
> = {
    dashboard: 'canAccessDashboard',
    reports: 'canAccessReports',
    checkout: 'canAccessCheckout',
    appointments: 'canAccessAppointments',
    professionals: 'canAccessProfessionals',
    services: 'canAccessServices',
    reviews: 'canAccessReviews',
    products: 'canAccessProducts',
    clients: 'canAccessClients',
    clientLevels: 'canAccessClientLevels',
    finance: 'canAccessFinance',
    settings: 'canAccessSettings',
};

/**
 * Retorna se o menu/item pode ser exibido para o admin atual.
 * - Se adminAccess vier null/undefined: por padrão não mostra (fail-closed).
 * - Se a flag específica for true: mostra.
 */
export function canAccess(
    adminAccess: AdminAccessLike | null | undefined,
    key: AdminMenuKey
): boolean {
    if (!adminAccess) return false;

    const field = MENU_TO_ACCESS_FIELD[key];
    return Boolean(adminAccess[field]);
}
