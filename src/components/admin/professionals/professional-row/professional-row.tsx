// src/components/admin/professional/professional-row.tsx
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

import { ProfessionalEditDialog } from '@/components/admin/professionals/professional-edit-dialog';
import { updateProfessional } from '@/lib/admin-professionals-api';

type UnitOption = {
    id: string;
    name: string;
    isActive: boolean;
};

export type ProfessionalRowUIData = {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    isActive?: boolean;

    imageUrl?: string | null;

    weeklyScheduleLabel?: string;
    exceptionsLabel?: string;

    selectedUnitIds?: string[];
    unitsSummaryLabel?: string;
    linkedUnits?: { id: string; name: string }[];

    createdAt?: Date;
    updatedAt?: Date;
    userId?: string | null;
};

type ProfessionalRowProps = {
    row: ProfessionalRowUIData;
    units: UnitOption[];
};

export function ProfessionalRow({ row, units }: ProfessionalRowProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const avatarToShow = row.imageUrl ?? null;
    const isActive = Boolean(row.isActive);

    const selectedUnitIds = row.selectedUnitIds ?? [];

    const unitsSummary = useMemo(() => {
        if (row.unitsSummaryLabel) return row.unitsSummaryLabel;

        const linkedUnits = row.linkedUnits ?? [];
        if (linkedUnits.length === 0) return 'Sem unidade';

        if (linkedUnits.length <= 2) {
            return linkedUnits.map((u) => u.name).join(' • ');
        }

        return `${linkedUnits.length} unidades`;
    }, [row.unitsSummaryLabel, row.linkedUnits]);

    async function handleToggleActive() {
        if (isPending) return;
        setIsPending(true);

        const res = await updateProfessional(row.id, {
            isActive: !isActive,
        });

        setIsPending(false);

        if (!res.ok) {
            toast.error(res.error);
            return;
        }

        toast.success(
            isActive ? 'Profissional desativado.' : 'Profissional ativado.'
        );

        // ✅ mesma regra do "criar/editar": revalida a page e puxa do banco
        router.refresh();
    }

    return (
        <AccordionItem
            value={row.id}
            className="border border-border-primary rounded-xl bg-background-tertiary"
        >
            <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,2fr)_auto] items-center gap-6 px-4 py-3">
                <AccordionTrigger className="flex items-center gap-3 min-w-0 hover:no-underline px-0 py-0">
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div className="h-10 w-10 rounded-full bg-background-secondary border border-border-primary overflow-hidden flex items-center justify-center shrink-0">
                            {avatarToShow ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={avatarToShow}
                                    alt={row.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-xs font-medium text-content-secondary">
                                    {(row.name || '?')
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </span>
                            )}
                        </div>

                        {/* Infos */}
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                                <p className="text-paragraph-medium-size font-semibold text-content-primary truncate">
                                    {row.name}
                                </p>

                                {typeof row.isActive === 'boolean' && (
                                    <span className="shrink-0 text-[11px] px-2 py-0.5 rounded-full border border-border-primary text-content-secondary">
                                        {isActive ? 'Ativo' : 'Inativo'}
                                    </span>
                                )}
                            </div>

                            <p className="text-xs text-content-secondary truncate">
                                {row.email || 'Sem e-mail'}{' '}
                                <span className="mx-1 text-content-tertiary">
                                    •
                                </span>{' '}
                                <span className="text-content-secondary">
                                    {unitsSummary}
                                </span>
                            </p>
                        </div>
                    </div>
                </AccordionTrigger>

                {/* Escala */}
                <div className="hidden md:block min-w-0 whitespace-nowrap text-xs text-content-primary truncate">
                    <span className="text-content-secondary mr-1">
                        Escala semanal:
                    </span>
                    {row.weeklyScheduleLabel ?? '—'}
                </div>

                {/* Exceções */}
                <div className="hidden md:block min-w-0 whitespace-nowrap text-xs text-content-primary truncate">
                    <span className="text-content-secondary mr-1">
                        Exceções:
                    </span>
                    {row.exceptionsLabel ?? '—'}
                </div>

                {/* Ações */}
                <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <ProfessionalEditDialog
                        barber={{
                            id: row.id,
                            name: row.name,
                            email: row.email ?? '',
                            phone: row.phone ?? null,
                            isActive: isActive,
                            createdAt: row.createdAt ?? new Date(),
                            updatedAt: row.updatedAt ?? new Date(),
                            userId: row.userId ?? null,
                            imageUrl: row.imageUrl ?? null,
                        }}
                        units={units}
                        selectedUnitIds={selectedUnitIds}
                    />

                    <Button
                        type="button"
                        variant={isActive ? 'destructive' : 'active'}
                        size="sm"
                        className="border-border-primary hover:bg-muted/40"
                        disabled={isPending}
                        onClick={handleToggleActive}
                    >
                        {isPending
                            ? 'Salvando...'
                            : isActive
                              ? 'Desativar'
                              : 'Ativar'}
                    </Button>
                </div>
            </div>

            <AccordionContent className="border-t border-border-primary px-4 py-4">
                <div className="space-y-6">
                    {/* Disponibilidade (placeholder por enquanto) */}
                    <div className="rounded-2xl border border-border-primary bg-background-secondary p-4 space-y-4">
                        <div>
                            <h2 className="text-label-small text-content-primary">
                                Disponibilidade
                            </h2>
                            <p className="text-paragraph-small text-content-secondary">
                                Em breve: visualização da escala semanal e
                                exceções por dia.
                            </p>
                        </div>

                        <div className="rounded-xl border border-dashed border-border-primary bg-background-tertiary px-4 py-6 text-center text-paragraph-small text-content-secondary">
                            Área em construção.
                        </div>
                    </div>

                    {/* Reputação (placeholder por enquanto) */}
                    <div className="rounded-2xl border border-border-primary bg-background-secondary p-4 space-y-4">
                        <div>
                            <h2 className="text-label-small text-content-primary">
                                Reputação do profissional
                            </h2>
                            <p className="text-paragraph-small text-content-secondary">
                                Em breve: média de avaliações, distribuição de
                                notas e tags.
                            </p>
                        </div>

                        <div className="rounded-xl border border-dashed border-border-primary bg-background-tertiary px-4 py-6 text-center text-paragraph-small text-content-secondary">
                            Área em construção.
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
