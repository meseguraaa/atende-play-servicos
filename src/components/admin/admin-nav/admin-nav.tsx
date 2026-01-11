// src/components/admin-nav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Scissors,
    ListChecks,
    Package,
    Wallet,
    Users,
    CalendarCheck,
    ShoppingCart,
    Tag,
    Settings,
    BarChart3,
} from 'lucide-react';

import { canAccess } from '@/lib/admin-access-map';
import { ADMIN_MENU } from '@/lib/admin-menu';

type AdminAccessLike = Partial<
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

export type AdminNavProps = {
    className?: string;
    adminAccess?: AdminAccessLike | null;
};

const ICON_BY_KEY: Record<
    (typeof ADMIN_MENU)[number]['menuKey'],
    React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
    dashboard: LayoutDashboard,
    reports: BarChart3,
    appointments: CalendarCheck,
    checkout: ShoppingCart,
    professionals: Scissors,
    services: ListChecks,
    reviews: Tag,
    products: Package,
    clients: Users,
    clientLevels: Users,
    finance: Wallet,
    settings: Settings,
};

export function AdminNav({ className, adminAccess }: AdminNavProps) {
    const pathname = usePathname();

    // ✅ Fail-closed (permissão) + ✅ enabled/disabled (feature flag temporária)
    const visibleLinks = ADMIN_MENU.filter(
        (link) => link.enabled && canAccess(adminAccess as any, link.menuKey)
    );

    return (
        <nav
            className={cn(
                'group fixed left-0 top-0 z-40 flex h-screen flex-col',
                'border-r border-border-primary bg-background-primary',
                'w-14 hover:w-55 transition-[width] duration-200 ease-in-out',
                'pt-5 overflow-hidden',
                className
            )}
        >
            <div className="flex-1 space-y-1 px-2 pb-4">
                {visibleLinks.map((link) => {
                    const isActive = pathname?.startsWith(link.href);
                    const Icon = ICON_BY_KEY[link.menuKey];

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'flex items-center gap-2 px-3 py-2 rounded-lg text-label-small transition-colors',
                                'text-content-secondary hover:bg-background-tertiary/50',
                                isActive &&
                                    'text-content-brand font-medium bg-background-tertiary/50'
                            )}
                        >
                            <Icon
                                className={cn(
                                    'h-4 w-4 shrink-0',
                                    isActive
                                        ? 'text-content-brand'
                                        : 'text-content-secondary'
                                )}
                            />
                            <span
                                className={cn(
                                    'whitespace-nowrap',
                                    'opacity-0 -translate-x-1',
                                    'transition-all duration-200',
                                    'group-hover:opacity-100 group-hover:translate-x-0'
                                )}
                            >
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
