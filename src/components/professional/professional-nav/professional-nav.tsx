// src/components/professional/professional-nav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CalendarCheck, Wallet, Star } from 'lucide-react';

type ProfessionalLink = {
    href: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const professionalLinks: ProfessionalLink[] = [
    {
        href: '/professional/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        href: '/professional/availability',
        label: 'Disponibilidade',
        icon: CalendarCheck,
    },
    {
        href: '/professional/earnings',
        label: 'Ganhos',
        icon: Wallet,
    },
    {
        href: '/professional/reviews',
        label: 'Avaliações',
        icon: Star,
    },
];

export type ProfessionalNavProps = {
    className?: string;
};

export function ProfessionalNav({ className }: ProfessionalNavProps) {
    const pathname = usePathname();

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
            {/* LINKS */}
            <div className="flex-1 space-y-1 px-2 pb-4">
                {professionalLinks.map((link) => {
                    const isActive = pathname?.startsWith(link.href);
                    const Icon = link.icon;

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
