// src/components/service-new-dialog.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
    Building2,
} from 'lucide-react';

type ProfessionalOption = {
    id: string;
    name: string;
    isActive: boolean;
};

type UnitOption = {
    id: string;
    name: string;
    isActive: boolean;
};

type ServicesApiGetResponse =
    | {
          ok: true;
          data: {
              services: unknown[];
              professionals: ProfessionalOption[];
              units: UnitOption[];
          };
      }
    | { ok: false; error?: string };

type ServicesApiPostResponse =
    | {
          ok: true;
          data: { id: string };
      }
    | { ok: false; error?: string };

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

function parseNumberPtBR(value: string) {
    const normalized = String(value ?? '')
        .trim()
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(',', '.');

    const n = Number(normalized);
    return Number.isFinite(n) ? n : NaN;
}

export function ServiceNewDialog() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const [professionals, setProfessionals] = useState<ProfessionalOption[]>(
        []
    );
    const [units, setUnits] = useState<UnitOption[]>([]);

    // fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState(''); // decimal (R$)
    const [durationMinutes, setDurationMinutes] = useState(''); // int

    const [professionalPercentage, setProfessionalPercentage] = useState('50'); // %
    const [cancelLimitHours, setCancelLimitHours] = useState(''); // int | ''
    const [cancelFeePercentage, setCancelFeePercentage] = useState(''); // decimal | ''

    const [selectedProfessionalIds, setSelectedProfessionalIds] = useState<
        string[]
    >([]);

    const [selectedUnitId, setSelectedUnitId] = useState<string>('');

    const activeProfessionals = useMemo(
        () => professionals.filter((p) => p.isActive),
        [professionals]
    );

    const activeUnits = useMemo(() => units.filter((u) => u.isActive), [units]);

    const hasProfessionals = activeProfessionals.length > 0;
    const hasUnits = activeUnits.length > 0;

    const busy = loading || isPending;
    const selectedCount = selectedProfessionalIds.length;

    function resetForm(nextUnits?: UnitOption[]) {
        const nextActive =
            (nextUnits ?? units).find((u) => u.isActive)?.id ?? '';
        setName('');
        setPrice('');
        setDurationMinutes('');
        setProfessionalPercentage('50');
        setCancelLimitHours('');
        setCancelFeePercentage('');
        setSelectedProfessionalIds([]);
        setSelectedUnitId(nextActive);
    }

    async function loadData() {
        setLoading(true);

        try {
            const res = await fetch('/api/admin/services', {
                method: 'GET',
                cache: 'no-store',
                headers: { accept: 'application/json' },
            });

            const json = (await res
                .json()
                .catch(() => null)) as ServicesApiGetResponse | null;

            if (!res.ok || !json || (json as any).ok !== true) {
                const msg =
                    (json &&
                        (json as any).ok === false &&
                        (json as any).error) ||
                    'Não foi possível carregar dados.';
                setProfessionals([]);
                setUnits([]);
                toast.error(msg);
                return;
            }

            const nextProfessionals = (json as any).data?.professionals ?? [];
            const nextUnits = (json as any).data?.units ?? [];

            setProfessionals(nextProfessionals);
            setUnits(nextUnits);

            // se não tiver selecionado ainda, tenta a primeira unidade ativa
            setSelectedUnitId((prev) => {
                if (prev) return prev;
                return (
                    (nextUnits as UnitOption[]).find((u) => u.isActive)?.id ??
                    ''
                );
            });
        } catch {
            setProfessionals([]);
            setUnits([]);
            toast.error('Não foi possível carregar dados.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!open) return;
        void loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    function toggleProfessional(id: string) {
        setSelectedProfessionalIds((prev) => {
            if (prev.includes(id)) return prev.filter((x) => x !== id);
            return [...prev, id];
        });
    }

    const unitIsValid =
        !!selectedUnitId &&
        (units.find((u) => u.id === selectedUnitId)?.isActive ?? false);

    const requiredOk =
        unitIsValid &&
        name.trim().length > 0 &&
        Number.isFinite(parseNumberPtBR(price)) &&
        parseNumberPtBR(price) >= 0 &&
        Number.isFinite(Number(durationMinutes)) &&
        Number(durationMinutes) > 0 &&
        Number.isFinite(parseNumberPtBR(professionalPercentage)) &&
        parseNumberPtBR(professionalPercentage) >= 0 &&
        parseNumberPtBR(professionalPercentage) <= 100 &&
        selectedCount > 0;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (busy) return;

        if (!hasUnits) {
            toast.error('Crie pelo menos 1 unidade antes de criar serviços.');
            return;
        }

        if (!unitIsValid) {
            toast.error('Selecione uma unidade ativa.');
            return;
        }

        if (!hasProfessionals) {
            toast.error(
                'Cadastre pelo menos 1 profissional antes de criar serviços.'
            );
            return;
        }

        if (!requiredOk) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        const priceNum = parseNumberPtBR(price);
        const pctNum = parseNumberPtBR(professionalPercentage);

        const cancelLimit =
            cancelLimitHours.trim() === '' ? null : Number(cancelLimitHours);

        const cancelFee =
            cancelFeePercentage.trim() === ''
                ? null
                : parseNumberPtBR(cancelFeePercentage);

        if (
            cancelLimit !== null &&
            (!Number.isFinite(cancelLimit) || cancelLimit < 0)
        ) {
            toast.error('Limite de cancelamento inválido.');
            return;
        }

        if (
            cancelFee !== null &&
            (!Number.isFinite(cancelFee) || cancelFee < 0 || cancelFee > 100)
        ) {
            toast.error('Taxa de cancelamento inválida (0 a 100).');
            return;
        }

        setIsPending(true);

        try {
            const res = await fetch('/api/admin/services', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    unitId: selectedUnitId,
                    price: priceNum,
                    durationMinutes: Number(durationMinutes),
                    professionalPercentage: pctNum,
                    cancelLimitHours: cancelLimit,
                    cancelFeePercentage: cancelFee,
                    professionalIds: selectedProfessionalIds,
                }),
            });

            const json = (await res
                .json()
                .catch(() => null)) as ServicesApiPostResponse | null;

            if (!res.ok || !json || (json as any).ok !== true) {
                const msg =
                    (json &&
                        (json as any).ok === false &&
                        (json as any).error) ||
                    'Não foi possível criar o serviço.';
                toast.error(msg);
                return;
            }

            toast.success('Serviço criado com sucesso!');
            setOpen(false);
            resetForm();
            router.refresh();
        } catch {
            toast.error('Não foi possível criar o serviço.');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (busy) return;
                setOpen(next);
                if (!next) resetForm();
            }}
        >
            <DialogTrigger asChild>
                <Button variant="brand">Novo serviço</Button>
            </DialogTrigger>

            <DialogContent className="bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-title text-content-primary">
                        Novo serviço
                    </DialogTitle>
                </DialogHeader>

                {!loading && !hasUnits ? (
                    <div className="rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary">
                        Você ainda não tem unidades ativas. Crie uma unidade
                        antes de cadastrar serviços.
                    </div>
                ) : !loading && !hasProfessionals ? (
                    <div className="rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary">
                        Você ainda não tem profissionais ativos. Cadastre um
                        profissional antes de criar serviços.
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
                            <label
                                className="text-label-small text-content-secondary"
                                htmlFor="name"
                            >
                                Nome do serviço{' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <IconInput
                                id="name"
                                name="name"
                                required
                                icon={Scissors}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={busy}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* VALOR */}
                        <div className="space-y-2">
                            <label
                                className="text-label-small text-content-secondary"
                                htmlFor="price"
                            >
                                Valor (R$){' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <IconInput
                                id="price"
                                name="price"
                                inputMode="decimal"
                                placeholder="Ex: 49,90"
                                required
                                icon={BadgeDollarSign}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                disabled={busy}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* DURAÇÃO */}
                        <div className="space-y-2">
                            <label
                                className="text-label-small text-content-secondary"
                                htmlFor="durationMinutes"
                            >
                                Duração (minutos){' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <IconInput
                                id="durationMinutes"
                                name="durationMinutes"
                                type="number"
                                min={1}
                                required
                                icon={Clock}
                                value={durationMinutes}
                                onChange={(e) =>
                                    setDurationMinutes(e.target.value)
                                }
                                disabled={busy}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* PORCENTAGEM DO PROFISSIONAL */}
                        <div className="space-y-2">
                            <label
                                className="text-label-small text-content-secondary"
                                htmlFor="professionalPercentage"
                            >
                                Porcentagem do profissional (%){' '}
                                <span className="text-red-500">*</span>
                            </label>

                            <IconInput
                                id="professionalPercentage"
                                name="professionalPercentage"
                                type="number"
                                step="0.01"
                                min={0}
                                max={100}
                                required
                                placeholder="Ex: 50"
                                icon={Percent}
                                value={professionalPercentage}
                                onChange={(e) =>
                                    setProfessionalPercentage(e.target.value)
                                }
                                disabled={busy}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* LIMITE DE CANCELAMENTO */}
                        <div className="space-y-2">
                            <label
                                className="text-label-small text-content-secondary"
                                htmlFor="cancelLimitHours"
                            >
                                Limite para cobrança de taxa (horas antes do
                                horário)
                            </label>

                            <IconInput
                                id="cancelLimitHours"
                                name="cancelLimitHours"
                                type="number"
                                min={0}
                                placeholder="Ex: 2 (até 2h antes)"
                                icon={Timer}
                                value={cancelLimitHours}
                                onChange={(e) =>
                                    setCancelLimitHours(e.target.value)
                                }
                                disabled={busy}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* TAXA DE CANCELAMENTO */}
                        <div className="space-y-2">
                            <label
                                className="text-label-small text-content-secondary"
                                htmlFor="cancelFeePercentage"
                            >
                                Taxa de cancelamento (%)
                            </label>

                            <IconInput
                                id="cancelFeePercentage"
                                name="cancelFeePercentage"
                                type="number"
                                step="0.01"
                                min={0}
                                max={100}
                                placeholder="Ex: 50"
                                icon={Receipt}
                                value={cancelFeePercentage}
                                onChange={(e) =>
                                    setCancelFeePercentage(e.target.value)
                                }
                                disabled={busy}
                                className={INPUT_BASE}
                            />
                        </div>

                        {/* PROFISSIONAIS */}
                        <div className="space-y-2">
                            <p className="text-label-small text-content-secondary">
                                Profissionais que realizam este serviço{' '}
                                <span className="text-red-500">*</span>
                            </p>

                            <div className="rounded-lg border border-border-primary bg-background-tertiary p-2">
                                <div className="mb-2 flex items-center gap-2 px-1 text-paragraph-small text-content-secondary">
                                    <Users className="h-4 w-4 text-content-brand" />
                                    <span>
                                        Selecione {selectedCount || 0}{' '}
                                        {selectedCount === 1
                                            ? 'profissional'
                                            : 'profissionais'}
                                    </span>
                                </div>

                                {loading ? (
                                    <div className="px-1 py-3 text-paragraph-small text-content-secondary">
                                        Carregando profissionais...
                                    </div>
                                ) : activeProfessionals.length === 0 ? (
                                    <div className="px-1 py-3 text-paragraph-small text-content-secondary">
                                        Nenhum profissional ativo cadastrado no
                                        momento.
                                    </div>
                                ) : (
                                    <div className="max-h-48 space-y-1 overflow-y-auto px-1">
                                        {activeProfessionals.map((p) => (
                                            <label
                                                key={p.id}
                                                className="flex items-center gap-2 text-paragraph-small text-content-primary"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-border-primary"
                                                    disabled={busy}
                                                    checked={selectedProfessionalIds.includes(
                                                        p.id
                                                    )}
                                                    onChange={() =>
                                                        toggleProfessional(p.id)
                                                    }
                                                />
                                                <span>{p.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {!loading &&
                            hasProfessionals &&
                            selectedCount === 0 ? (
                                <p className="text-xs text-red-500">
                                    Selecione pelo menos 1 profissional.
                                </p>
                            ) : null}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="submit"
                                variant="brand"
                                disabled={busy || !requiredOk}
                                title={
                                    !requiredOk
                                        ? 'Preencha os campos obrigatórios'
                                        : undefined
                                }
                            >
                                {isPending ? 'Salvando...' : 'Criar serviço'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
