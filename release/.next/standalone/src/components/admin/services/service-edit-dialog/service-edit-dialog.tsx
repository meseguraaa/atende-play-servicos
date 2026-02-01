// src/components/service-edit-dialog.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import type { Service } from '@prisma/client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';
import {
    Scissors,
    BadgeDollarSign,
    Clock,
    Percent,
    Timer,
    Receipt,
    Users,
    Loader2,
    Building2,
} from 'lucide-react';

type ServiceEditDialogProps = {
    service: Service;
};

type ProfessionalForPicker = {
    id: string;
    name: string;
    isActive: boolean;
};

type UnitOption = {
    id: string;
    name: string;
    isActive: boolean;
};

type ServiceDetailsApiResponse = {
    ok: boolean;
    data?: {
        service: {
            id: string;
            unitId: string | null;
            name: string;
            price: string; // decimal string
            durationMinutes: number;
            isActive: boolean;
            professionalPercentage: string; // decimal string
            cancelLimitHours: number | null;
            cancelFeePercentage: string | null; // decimal string|null
            createdAt: string | Date;
            updatedAt: string | Date;
        };
        professionals: ProfessionalForPicker[];
        selectedProfessionalIds: string[];
        units: UnitOption[]; // ✅ vem do GET /api/admin/services/[serviceId]
    };
    error?: string;
};

function toStringNumberOrEmpty(value: unknown): string {
    if (value === null || value === undefined) return '';
    const n = Number(value);
    return Number.isFinite(n) ? String(n) : '';
}

function toNumberOrNull(value: unknown): number | null {
    if (value === null || value === undefined) return null;
    const n =
        typeof value === 'string'
            ? Number(value.replace(',', '.').trim())
            : Number(value);
    return Number.isFinite(n) ? n : null;
}

function IconInput(
    props: React.ComponentProps<typeof Input> & {
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }
) {
    const { icon: Icon, className, ...rest } = props;

    return (
        <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <Icon className="h-4 w-4 text-content-brand" />
            </div>

            <Input {...rest} className={cn('pl-10', className)} />
        </div>
    );
}

const INPUT_BASE =
    'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';

const SELECT_TRIGGER =
    'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand';

export function ServiceEditDialog({ service }: ServiceEditDialogProps) {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [professionals, setProfessionals] = useState<ProfessionalForPicker[]>(
        []
    );
    const [selectedProfessionalIds, setSelectedProfessionalIds] = useState<
        Set<string>
    >(new Set());

    const [units, setUnits] = useState<UnitOption[]>([]);
    const activeUnits = useMemo(() => units.filter((u) => u.isActive), [units]);

    // form state
    const [name, setName] = useState((service as any).name ?? '');
    const [price, setPrice] = useState(String((service as any).price ?? ''));
    const [durationMinutes, setDurationMinutes] = useState(
        toStringNumberOrEmpty((service as any).durationMinutes)
    );

    // compat UI field name "barberPercentage" -> API field "professionalPercentage"
    const [barberPercentage, setBarberPercentage] = useState(
        toStringNumberOrEmpty((service as any).barberPercentage) ||
            toStringNumberOrEmpty((service as any).professionalPercentage)
    );

    const [cancelLimitHours, setCancelLimitHours] = useState(
        toStringNumberOrEmpty((service as any).cancelLimitHours)
    );

    const [cancelFeePercentage, setCancelFeePercentage] = useState(
        toStringNumberOrEmpty((service as any).cancelFeePercentage)
    );

    const [selectedUnitId, setSelectedUnitId] = useState<string>(() => {
        const raw = String((service as any).unitId ?? '').trim();
        return raw;
    });

    const busy = loading || saving;

    function resetToInitial() {
        setProfessionals([]);
        setSelectedProfessionalIds(new Set());
        setUnits([]);

        setName((service as any).name ?? '');
        setPrice(String((service as any).price ?? ''));
        setDurationMinutes(
            toStringNumberOrEmpty((service as any).durationMinutes)
        );

        setBarberPercentage(
            toStringNumberOrEmpty((service as any).barberPercentage) ||
                toStringNumberOrEmpty((service as any).professionalPercentage)
        );

        setCancelLimitHours(
            toStringNumberOrEmpty((service as any).cancelLimitHours)
        );
        setCancelFeePercentage(
            toStringNumberOrEmpty((service as any).cancelFeePercentage)
        );

        setSelectedUnitId(String((service as any).unitId ?? '').trim());
    }

    const selectedCount = selectedProfessionalIds.size;

    const professionalsSorted = useMemo(() => {
        const list = [...(professionals ?? [])];
        list.sort((a, b) => a.name.localeCompare(b.name));
        return list;
    }, [professionals]);

    async function fetchDetails() {
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/services/${service.id}`, {
                method: 'GET',
                cache: 'no-store',
                headers: { accept: 'application/json' },
            });

            const json = (await res
                .json()
                .catch(() => null)) as ServiceDetailsApiResponse | null;

            if (!res.ok || !json?.ok || !json.data) {
                const msg =
                    (json && json.ok === false && json.error) ||
                    'Não foi possível carregar os dados do serviço.';
                toast.error(msg);
                return;
            }

            const s = json.data.service;

            setName(s.name ?? '');
            setPrice(String(s.price ?? ''));
            setDurationMinutes(String(s.durationMinutes ?? ''));

            setBarberPercentage(String(s.professionalPercentage ?? ''));
            setCancelLimitHours(
                s.cancelLimitHours === null ? '' : String(s.cancelLimitHours)
            );
            setCancelFeePercentage(
                s.cancelFeePercentage === null
                    ? ''
                    : String(s.cancelFeePercentage)
            );

            setProfessionals(json.data.professionals ?? []);
            setSelectedProfessionalIds(
                new Set(json.data.selectedProfessionalIds ?? [])
            );

            const unitsFromApi = json.data.units ?? [];
            setUnits(unitsFromApi);

            // unit selecionada: do service, senão primeira ativa
            const unitFromService = String(s.unitId ?? '').trim();
            if (unitFromService) {
                setSelectedUnitId(unitFromService);
            } else {
                const firstActive = unitsFromApi.find((u) => u.isActive)?.id;
                setSelectedUnitId(firstActive ?? '');
            }
        } catch {
            toast.error('Não foi possível carregar os dados do serviço.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!open) return;
        void fetchDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    function toggleProfessional(id: string) {
        setSelectedProfessionalIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function normalizePayloadNumberString(value: string) {
        return String(value ?? '')
            .replace(',', '.')
            .trim();
    }

    const unitIsValid =
        !!selectedUnitId &&
        (units.find((u) => u.id === selectedUnitId)?.isActive ?? false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (busy) return;

        if (!unitIsValid) {
            toast.error('Selecione uma unidade ativa.');
            return;
        }

        const nameTrim = String(name ?? '').trim();
        if (!nameTrim) {
            toast.error('Nome do serviço é obrigatório.');
            return;
        }

        const priceNum = toNumberOrNull(normalizePayloadNumberString(price));
        if (priceNum === null || priceNum < 0) {
            toast.error('Preço inválido.');
            return;
        }

        const durationNum = toNumberOrNull(
            normalizePayloadNumberString(durationMinutes)
        );
        if (durationNum === null || durationNum <= 0) {
            toast.error('Duração inválida.');
            return;
        }

        const pctNum = toNumberOrNull(
            normalizePayloadNumberString(barberPercentage)
        );
        if (pctNum === null || pctNum < 0 || pctNum > 100) {
            toast.error('Porcentagem inválida (0 a 100).');
            return;
        }

        const cancelLimitNum =
            cancelLimitHours.trim() === ''
                ? null
                : toNumberOrNull(
                      normalizePayloadNumberString(cancelLimitHours)
                  );

        if (cancelLimitNum !== null && cancelLimitNum < 0) {
            toast.error('Limite de cancelamento inválido.');
            return;
        }

        const cancelFeeNum =
            cancelFeePercentage.trim() === ''
                ? null
                : toNumberOrNull(
                      normalizePayloadNumberString(cancelFeePercentage)
                  );

        if (cancelFeeNum !== null && (cancelFeeNum < 0 || cancelFeeNum > 100)) {
            toast.error('Taxa de cancelamento inválida (0 a 100).');
            return;
        }

        if (selectedCount === 0) {
            toast.error('Selecione pelo menos 1 profissional.');
            return;
        }

        setSaving(true);

        try {
            const payload = {
                unitId: selectedUnitId,

                name: nameTrim,
                price: priceNum,
                durationMinutes: Math.trunc(durationNum),

                // API espera professionalPercentage
                professionalPercentage: pctNum,
                // alias compat também
                barberPercentage: pctNum,

                cancelLimitHours:
                    cancelLimitNum === null ? null : Math.trunc(cancelLimitNum),
                cancelFeePercentage:
                    cancelFeeNum === null ? null : cancelFeeNum,

                professionalIds: Array.from(selectedProfessionalIds),
            };

            const res = await fetch(`/api/admin/services/${service.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const json = (await res.json().catch(() => null)) as
                | { ok: true; data?: any }
                | { ok: false; error?: string }
                | null;

            if (!res.ok || !json || (json as any).ok !== true) {
                const msg =
                    (json &&
                        (json as any).ok === false &&
                        (json as any).error) ||
                    'Não foi possível salvar o serviço.';
                toast.error(msg);
                return;
            }

            toast.success('Serviço atualizado com sucesso!');
            setOpen(false);
            router.refresh();
        } catch {
            toast.error('Não foi possível salvar o serviço.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (busy) return;
                setOpen(next);
                if (!next) resetToInitial();
            }}
        >
            <DialogTrigger asChild>
                <Button
                    variant="edit2"
                    size="sm"
                    className="border-border-primary hover:bg-muted/40"
                    type="button"
                >
                    Editar
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-title text-content-primary">
                        Editar serviço
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary">
                        <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Carregando dados do serviço...
                        </span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 pb-2">
                        {/* UNIDADE */}
                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Unidade <span className="text-red-500">*</span>
                            </label>

                            <Select
                                value={selectedUnitId}
                                onValueChange={(v) => setSelectedUnitId(v)}
                                disabled={busy || activeUnits.length === 0}
                            >
                                <SelectTrigger className={SELECT_TRIGGER}>
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-content-brand" />
                                        <SelectValue placeholder="Selecione a unidade" />
                                    </div>
                                </SelectTrigger>

                                <SelectContent>
                                    {units.map((u) => (
                                        <SelectItem
                                            key={u.id}
                                            value={u.id}
                                            disabled={!u.isActive}
                                        >
                                            {u.name}{' '}
                                            {!u.isActive ? '(inativa)' : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {!unitIsValid ? (
                                <p className="text-xs text-red-500">
                                    Selecione uma unidade ativa.
                                </p>
                            ) : null}
                        </div>

                        {/* NOME */}
                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Nome do serviço{' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <IconInput
                                name="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={busy}
                                icon={Scissors}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* VALOR */}
                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Valor (R$){' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <IconInput
                                name="price"
                                type="number"
                                step="0.01"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                disabled={busy}
                                icon={BadgeDollarSign}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* DURAÇÃO */}
                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Duração (minutos){' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <IconInput
                                name="durationMinutes"
                                type="number"
                                min={1}
                                required
                                value={durationMinutes}
                                onChange={(e) =>
                                    setDurationMinutes(e.target.value)
                                }
                                disabled={busy}
                                icon={Clock}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* PORCENTAGEM DO PROFISSIONAL */}
                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Porcentagem do profissional (%){' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <IconInput
                                name="barberPercentage"
                                type="number"
                                step="0.01"
                                min={0}
                                max={100}
                                required
                                value={barberPercentage}
                                onChange={(e) =>
                                    setBarberPercentage(e.target.value)
                                }
                                disabled={busy}
                                placeholder="Ex: 50"
                                icon={Percent}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* LIMITE DE CANCELAMENTO (opcional) */}
                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Limite para cobrança de taxa (horas antes do
                                horário)
                            </label>

                            <IconInput
                                name="cancelLimitHours"
                                type="number"
                                min={0}
                                value={cancelLimitHours}
                                onChange={(e) =>
                                    setCancelLimitHours(e.target.value)
                                }
                                disabled={busy}
                                placeholder="Ex: 2 (até 2h antes)"
                                icon={Timer}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* TAXA DE CANCELAMENTO (opcional) */}
                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Taxa de cancelamento (%)
                            </label>

                            <IconInput
                                name="cancelFeePercentage"
                                type="number"
                                step="0.01"
                                min={0}
                                max={100}
                                value={cancelFeePercentage}
                                onChange={(e) =>
                                    setCancelFeePercentage(e.target.value)
                                }
                                disabled={busy}
                                placeholder="Ex: 50"
                                icon={Receipt}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* PROFISSIONAIS */}
                        <div className="space-y-2">
                            <p className="text-label-small text-content-secondary">
                                Profissionais que realizam este serviço{' '}
                                <span className="text-red-500">*</span>
                            </p>

                            {professionalsSorted.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary">
                                    Nenhum profissional encontrado para esta
                                    empresa.
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-xl border border-border-primary bg-background-tertiary">
                                    <div className="flex items-center justify-between gap-2 border-b border-border-primary bg-background-secondary px-3 py-2">
                                        <span className="inline-flex items-center gap-2 text-xs text-content-secondary">
                                            <Users className="h-4 w-4 text-content-brand" />
                                            Selecione os profissionais
                                        </span>

                                        <span className="text-xs text-content-secondary">
                                            {selectedCount} selecionado
                                            {selectedCount === 1 ? '' : 's'}
                                        </span>
                                    </div>

                                    <div className="max-h-56 space-y-1 overflow-y-auto p-2">
                                        {professionalsSorted.map((p) => {
                                            const checked =
                                                selectedProfessionalIds.has(
                                                    p.id
                                                );

                                            return (
                                                <label
                                                    key={p.id}
                                                    className={cn(
                                                        'flex items-center gap-2 rounded-lg px-2 text-paragraph-small',
                                                        'hover:bg-muted/30',
                                                        !p.isActive &&
                                                            'opacity-60'
                                                    )}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-border-primary"
                                                        checked={checked}
                                                        onChange={() =>
                                                            toggleProfessional(
                                                                p.id
                                                            )
                                                        }
                                                        disabled={
                                                            busy || !p.isActive
                                                        }
                                                    />
                                                    <span className="text-content-primary">
                                                        {p.name}{' '}
                                                        {!p.isActive
                                                            ? '(inativo)'
                                                            : ''}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {selectedCount === 0 ? (
                                <p className="text-xs text-red-500">
                                    Selecione pelo menos 1 profissional.
                                </p>
                            ) : null}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="submit"
                                variant="brand"
                                disabled={
                                    busy || selectedCount === 0 || !unitIsValid
                                }
                                title={
                                    !unitIsValid
                                        ? 'Selecione uma unidade ativa'
                                        : selectedCount === 0
                                          ? 'Selecione ao menos 1 profissional'
                                          : undefined
                                }
                            >
                                {saving ? (
                                    <span className="inline-flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Salvando...
                                    </span>
                                ) : (
                                    'Salvar alterações'
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
