// src/components/admin/appointment/new-appointment-dialog.tsx
'use client';

import * as React from 'react';
import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

import {
    Calendar as CalendarIcon,
    Check,
    ChevronDown,
    Clock,
    Loader2,
    Phone,
    Search,
    Store,
    User,
    UserCircle,
    Scissors,
    X,
} from 'lucide-react';

import { format, startOfToday } from 'date-fns';
import { IMaskInput } from 'react-imask';

export type UnitOption = { id: string; name: string };

export type ClientOption = {
    id: string;
    name: string;
    phone: string | null;
};

export type ProfessionalOption = {
    id: string;
    name: string;
    imageUrl: string | null;
    isActive: boolean;
};

export type ServiceOption = {
    id: string;
    name: string;
    durationMinutes: number;
    price?: number;
    isActive: boolean;
    unitId?: string | null;
};

export type AppointmentOption = {
    id: string;
    unitId: string;
    clientId: string;
    clientName: string;
    phone: string;
    description: string;
    scheduleAt: string | Date;
    status: 'PENDING' | 'DONE' | 'CANCELED';
    professionalId: string | null;
    serviceId: string | null;
};

type Props = {
    children?: React.ReactNode;

    // escopo do admin-nav
    forcedUnitId?: string | null;

    // dados pré-carregados no server (page.tsx)
    units?: UnitOption[];
    clients?: ClientOption[];
    professionals?: ProfessionalOption[];
    services?: ServiceOption[];
    appointments?: AppointmentOption[];
};

type AvailabilityTimesResponse = {
    ok: boolean;
    error?: string;
    data?: {
        date?: string;
        unitId?: string;
        professionalId?: string;
        source?: string;
        durationMinutes?: number;
        intervals?: Array<{ startTime: string; endTime: string }>;
        times?: string[];
    };
};

function formatDateParamYYYYMMDD(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export default function NewAppointmentDialog({
    children,
    forcedUnitId = null,
    units = [],
    clients = [],
    professionals = [],
    services = [],
    appointments: _appointments = [],
}: Props) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    // ===== ADMIN: cliente picker =====
    const [isClientPickerOpen, setIsClientPickerOpen] = useState(false);
    const [clientQuery, setClientQuery] = useState('');
    const [selectedClientId, setSelectedClientId] = useState<string>('');
    const [clientResults, setClientResults] = useState<ClientOption[]>([]);
    const [isSearchingClients, setIsSearchingClients] = useState(false);

    const [clientName, setClientName] = useState('');
    const [phone, setPhone] = useState('');

    // ===== campos =====
    const [unitId, setUnitId] = useState<string>(forcedUnitId ?? '');
    const [professionalId, setProfessionalId] = useState<string>('');
    const [serviceId, setServiceId] = useState<string>('');
    const [scheduleDate, setScheduleDate] = useState<Date | undefined>(
        undefined
    );
    const [time, setTime] = useState<string>('');

    // ===== horários dinâmicos (por disponibilidade) =====
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [isLoadingTimes, setIsLoadingTimes] = useState(false);
    const [timesError, setTimesError] = useState<string | null>(null);
    const lastTimesAbortRef = useRef<AbortController | null>(null);

    const [submitting, setSubmitting] = useState(false);

    const activeUnits = useMemo(() => units, [units]);

    const forcedUnitLabel = useMemo(() => {
        if (!forcedUnitId) return null;
        return activeUnits.find((u) => u.id === forcedUnitId)?.name ?? null;
    }, [forcedUnitId, activeUnits]);

    const selectedClient = useMemo(() => {
        if (!selectedClientId) return null;
        return clients.find((c) => c.id === selectedClientId) ?? null;
    }, [selectedClientId, clients]);

    const servicesForUnit = useMemo(() => {
        if (!unitId) return services.filter((s) => s.isActive !== false);
        return services
            .filter((s) => s.isActive !== false)
            .filter((s) => (s.unitId ? s.unitId === unitId : true));
    }, [services, unitId]);

    // 👇 gate: só libera o fluxo depois de selecionar “Cliente”
    const canProceed = !!selectedClientId;

    const lastClientSearchAbortRef = useRef<AbortController | null>(null);

    const resetDependentFlow = (keepUnit: boolean) => {
        setProfessionalId('');
        setServiceId('');
        setScheduleDate(undefined);
        setTime('');

        // horários dependem de unidade/profissional/serviço/data
        setAvailableTimes([]);
        setTimesError(null);
        setIsLoadingTimes(false);

        if (keepUnit) return;
        setUnitId(forcedUnitId ?? '');
    };

    const handleSelectClient = (c: ClientOption) => {
        setSelectedClientId(c.id);
        setClientName(c.name ?? '');
        setPhone(c.phone ?? '');
        setClientQuery(`${c.name}${c.phone ? ` • ${c.phone}` : ''}`);
        setIsClientPickerOpen(false);
        resetDependentFlow(true);
    };

    const clearSelectedClient = () => {
        setSelectedClientId('');
        setClientQuery('');
        setClientResults([]);
        setIsClientPickerOpen(false);

        setClientName('');
        setPhone('');
        resetDependentFlow(false);
    };

    // Busca local (até 250). Se quiser depois, liga endpoint /api/admin/clients/search igual no legado.
    React.useEffect(() => {
        if (!open) return;

        const q = clientQuery.trim();
        if (!q) {
            setClientResults([]);
            return;
        }

        // se já selecionou e só abriu novamente, não precisa mexer
        if (selectedClientId && selectedClient) {
            const label = `${selectedClient.name}${selectedClient.phone ? ` • ${selectedClient.phone}` : ''}`;
            if (q === label) return;
        }

        if (q.length < 2) {
            setClientResults(
                clients
                    .filter((c) => {
                        const name = (c.name ?? '').toLowerCase();
                        const ph = (c.phone ?? '').toLowerCase();
                        const qq = q.toLowerCase();
                        return name.includes(qq) || ph.includes(qq);
                    })
                    .slice(0, 20)
            );
            return;
        }

        const debounce = setTimeout(async () => {
            // local
            if (clients.length > 0 && clients.length <= 250) {
                setClientResults(
                    clients
                        .filter((c) => {
                            const name = (c.name ?? '').toLowerCase();
                            const ph = (c.phone ?? '').toLowerCase();
                            const qq = q.toLowerCase();
                            return name.includes(qq) || ph.includes(qq);
                        })
                        .slice(0, 20)
                );
                return;
            }

            // fallback (se algum dia quiser buscar remoto)
            try {
                setIsSearchingClients(true);
                if (lastClientSearchAbortRef.current) {
                    lastClientSearchAbortRef.current.abort();
                }
                const ac = new AbortController();
                lastClientSearchAbortRef.current = ac;

                const params = new URLSearchParams();
                params.set('q', q);
                params.set('take', '20');

                const res = await fetch(
                    `/api/admin/clients/search?${params.toString()}`,
                    {
                        method: 'GET',
                        signal: ac.signal,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!res.ok) {
                    setClientResults([]);
                    return;
                }

                const data = (await res.json()) as { clients?: ClientOption[] };
                setClientResults(
                    Array.isArray(data?.clients) ? data.clients : []
                );
            } catch (err: any) {
                if (err?.name === 'AbortError') return;
                setClientResults([]);
            } finally {
                setIsSearchingClients(false);
            }
        }, 280);

        return () => clearTimeout(debounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientQuery, open]);

    // abre modal: injeta unidade forçada
    React.useEffect(() => {
        if (!open) return;
        if (forcedUnitId) setUnitId(forcedUnitId);
    }, [open, forcedUnitId]);

    // ✅ Carrega horários disponíveis conforme unidade + profissional + serviço + data
    React.useEffect(() => {
        if (!open) return;

        // só faz sentido depois que o fluxo está liberado e campos selecionados
        if (
            !canProceed ||
            !unitId ||
            !professionalId ||
            !serviceId ||
            !scheduleDate
        ) {
            setAvailableTimes([]);
            setTimesError(null);
            setIsLoadingTimes(false);
            return;
        }

        const dateStr = formatDateParamYYYYMMDD(scheduleDate);

        const run = async () => {
            try {
                setIsLoadingTimes(true);
                setTimesError(null);

                // abort anterior
                if (lastTimesAbortRef.current) {
                    lastTimesAbortRef.current.abort();
                }
                const ac = new AbortController();
                lastTimesAbortRef.current = ac;

                const params = new URLSearchParams();
                params.set('unitId', unitId);
                params.set('professionalId', professionalId);
                params.set('serviceId', serviceId); // ✅ aqui!
                params.set('date', dateStr);

                const res = await fetch(
                    `/api/admin/availability/times?${params.toString()}`,
                    {
                        method: 'GET',
                        signal: ac.signal,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                const payload = (await res
                    .json()
                    .catch(() => null)) as AvailabilityTimesResponse | null;

                if (!res.ok || !payload?.ok) {
                    const msg =
                        payload?.error ??
                        'Não foi possível carregar os horários do profissional.';
                    setAvailableTimes([]);
                    setTimesError(msg);
                    return;
                }

                const times = Array.isArray(payload?.data?.times)
                    ? payload!.data!.times!
                    : [];

                setAvailableTimes(times);

                // se o horário selecionado não existe mais, limpa
                if (time && !times.includes(time)) {
                    setTime('');
                }
            } catch (err: any) {
                if (err?.name === 'AbortError') return;
                setAvailableTimes([]);
                setTimesError('Erro ao carregar os horários do profissional.');
            } finally {
                setIsLoadingTimes(false);
            }
        };

        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, canProceed, unitId, professionalId, serviceId, scheduleDate]);

    const handleSubmit = async () => {
        if (!selectedClientId) {
            toast.error('Selecione um cliente para continuar.');
            return;
        }
        if (!clientName.trim()) {
            toast.error('Informe o nome do cliente.');
            return;
        }
        if (!phone.trim()) {
            toast.error('Informe o telefone.');
            return;
        }
        if (!unitId) {
            toast.error('Selecione a unidade.');
            return;
        }
        if (!professionalId) {
            toast.error('Selecione o profissional.');
            return;
        }
        if (!serviceId) {
            toast.error('Selecione o serviço.');
            return;
        }
        if (!scheduleDate) {
            toast.error('Selecione o dia.');
            return;
        }
        if (!time) {
            toast.error('Selecione o horário.');
            return;
        }

        // valida que o horário ainda está disponível
        if (availableTimes.length > 0 && !availableTimes.includes(time)) {
            toast.error(
                'Este horário não está mais disponível. Selecione outro.'
            );
            setTime('');
            return;
        }

        const [hh, mm] = time.split(':').map(Number);
        const scheduleAt = new Date(scheduleDate);
        scheduleAt.setHours(hh, mm, 0, 0);

        const service = services.find((s) => s.id === serviceId);
        const description = service?.name ?? 'Atendimento';

        try {
            setSubmitting(true);

            const res = await fetch('/api/admin/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientId: selectedClientId,
                    clientName: clientName.trim(),
                    phone: phone.trim(),
                    unitId,
                    professionalId,
                    serviceId,
                    description,
                    scheduleAt: scheduleAt.toISOString(),
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(
                    data?.error ?? 'Não foi possível criar o agendamento.'
                );
                return;
            }

            toast.success('Agendamento criado com sucesso!');
            setOpen(false);

            // reseta
            clearSelectedClient();
            setUnitId(forcedUnitId ?? '');
            setProfessionalId('');
            setServiceId('');
            setScheduleDate(undefined);
            setTime('');

            setAvailableTimes([]);
            setTimesError(null);
            setIsLoadingTimes(false);

            router.refresh();
        } catch (err) {
            toast.error('Erro ao criar agendamento.');
        } finally {
            setSubmitting(false);
        }
    };

    const timeSelectDisabled =
        !canProceed ||
        !unitId ||
        !professionalId ||
        !serviceId ||
        !scheduleDate ||
        isLoadingTimes;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span className="inline-flex">{children}</span>
            </DialogTrigger>

            <DialogContent
                variant="appointment"
                overlayVariant="blurred"
                showCloseButton
            >
                <DialogHeader>
                    <DialogTitle size="modal">Novo agendamento</DialogTitle>
                    <DialogDescription size="modal">
                        Selecione um cliente e preencha os dados para realizar o
                        agendamento:
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* 1) CLIENTE */}
                    <div className="space-y-2">
                        <p className="text-label-medium-size text-content-primary">
                            Cliente
                        </p>

                        <Popover
                            open={isClientPickerOpen}
                            onOpenChange={setIsClientPickerOpen}
                        >
                            <PopoverTrigger asChild>
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                                        size={18}
                                    />

                                    <Input
                                        value={clientQuery}
                                        onFocus={() =>
                                            setIsClientPickerOpen(true)
                                        }
                                        onChange={(e) => {
                                            setClientQuery(e.target.value);
                                            if (selectedClientId)
                                                setSelectedClientId('');
                                        }}
                                        placeholder="Digite para buscar um cliente"
                                        className="pl-10 pr-10"
                                    />

                                    {selectedClientId || clientQuery ? (
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-md p-1 text-content-secondary hover:text-content-primary"
                                            onClick={clearSelectedClient}
                                            aria-label="Limpar cliente"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    ) : null}
                                </div>
                            </PopoverTrigger>

                            <PopoverContent
                                className="w-[--radix-popover-trigger-width] p-2"
                                align="start"
                                onOpenAutoFocus={(e) => e.preventDefault()}
                                onCloseAutoFocus={(e) => e.preventDefault()}
                            >
                                <div className="max-h-64 overflow-auto rounded-md border border-border-primary bg-background-secondary">
                                    {!clientQuery.trim() ? null : isSearchingClients ? (
                                        <div className="flex items-center gap-2 px-3 py-3 text-sm text-content-secondary">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Buscando clientes...
                                        </div>
                                    ) : clientQuery.trim().length < 2 ? (
                                        <div className="px-3 py-3 text-sm text-content-secondary">
                                            Dica: digite pelo menos{' '}
                                            <b>2 letras</b> para buscar melhor.
                                        </div>
                                    ) : clientResults.length === 0 ? (
                                        <div className="px-3 py-3 text-sm text-content-secondary">
                                            Nenhum cliente encontrado
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-border-primary">
                                            {clientResults.map((c) => {
                                                const active =
                                                    selectedClientId === c.id;
                                                return (
                                                    <button
                                                        key={c.id}
                                                        type="button"
                                                        className={cn(
                                                            'w-full px-3 py-2 text-left text-sm hover:bg-background-tertiary',
                                                            'flex items-center justify-between gap-3',
                                                            active &&
                                                                'bg-background-tertiary'
                                                        )}
                                                        onClick={() =>
                                                            handleSelectClient(
                                                                c
                                                            )
                                                        }
                                                    >
                                                        <div className="min-w-0">
                                                            <p className="truncate font-medium text-content-primary">
                                                                {c.name}
                                                            </p>
                                                            {c.phone ? (
                                                                <p className="truncate text-xs text-content-secondary">
                                                                    {c.phone}
                                                                </p>
                                                            ) : null}
                                                        </div>

                                                        {active ? (
                                                            <Check className="h-4 w-4 text-content-brand shrink-0" />
                                                        ) : null}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* 2) NOME DO CLIENTE */}
                    <div className="space-y-2">
                        <p className="text-label-medium-size text-content-primary">
                            Nome do cliente
                        </p>

                        <div className="relative">
                            <User
                                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                                size={20}
                            />
                            <Input
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="Nome do cliente"
                                className="pl-10"
                                disabled={!canProceed}
                            />
                        </div>
                    </div>

                    {/* 3) TELEFONE */}
                    <div className="space-y-2">
                        <p className="text-label-medium-size text-content-primary">
                            Telefone
                        </p>

                        <div className="relative">
                            <Phone
                                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                                size={20}
                            />

                            <IMaskInput
                                value={phone ?? ''}
                                onAccept={(v) => setPhone(String(v))}
                                placeholder="(99) 99999-9999"
                                mask="(00) 00000-0000"
                                className="pl-10 flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                                disabled={!canProceed}
                            />
                        </div>
                    </div>

                    {/* 4) UNIDADE */}
                    <div className="space-y-2">
                        <p className="text-label-medium-size text-content-primary">
                            Unidade
                        </p>

                        {forcedUnitId ? (
                            <div className="relative">
                                <Store
                                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                                    size={18}
                                />
                                <Input
                                    value={
                                        forcedUnitLabel ?? 'Unidade selecionada'
                                    }
                                    readOnly
                                    className="pl-10"
                                    disabled
                                />
                            </div>
                        ) : (
                            <Select
                                value={unitId}
                                onValueChange={(v) => {
                                    setUnitId(v);
                                    resetDependentFlow(true);
                                }}
                                disabled={!canProceed}
                            >
                                <SelectTrigger>
                                    <div className="flex items-center gap-2">
                                        <Store className="h-4 w-4 text-content-brand" />
                                        <SelectValue
                                            placeholder={
                                                activeUnits.length === 0
                                                    ? 'Nenhuma unidade disponível'
                                                    : 'Selecione a unidade'
                                            }
                                        />
                                    </div>
                                </SelectTrigger>

                                <SelectContent>
                                    {activeUnits.length === 0 ? (
                                        <SelectItem disabled value="no-units">
                                            Nenhuma unidade cadastrada/ativa
                                        </SelectItem>
                                    ) : (
                                        activeUnits.map((u) => (
                                            <SelectItem key={u.id} value={u.id}>
                                                {u.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* 5) PROFISSIONAL */}
                    <div className="space-y-2">
                        <p className="text-label-medium-size text-content-primary">
                            Profissional
                        </p>

                        <Select
                            value={professionalId}
                            onValueChange={(v) => {
                                setProfessionalId(v);
                                setScheduleDate(undefined);
                                setTime('');
                                setAvailableTimes([]);
                                setTimesError(null);
                            }}
                            disabled={!canProceed || !unitId}
                        >
                            <SelectTrigger
                                className="
                                  w-full justify-between text-left font-normal
                                  bg-background-tertiary border-border-primary text-content-primary
                                  focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand
                                  focus:border-border-brand focus-visible:border-border-brand
                                  disabled:opacity-60 disabled:cursor-not-allowed
                                "
                            >
                                <div className="flex items-center gap-2">
                                    <UserCircle className="h-4 w-4 text-content-brand" />
                                    <SelectValue
                                        placeholder={
                                            !canProceed
                                                ? 'Selecione um cliente'
                                                : !unitId
                                                  ? 'Selecione a unidade'
                                                  : 'Selecione o profissional'
                                        }
                                    />
                                </div>
                            </SelectTrigger>

                            <SelectContent>
                                {professionals.length === 0 ? (
                                    <SelectItem
                                        disabled
                                        value="no-professionals"
                                    >
                                        Nenhum profissional disponível
                                    </SelectItem>
                                ) : (
                                    professionals
                                        .filter((p) => p.isActive !== false)
                                        .map((p) => (
                                            <SelectItem key={p.id} value={p.id}>
                                                {p.name}
                                            </SelectItem>
                                        ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 6) SERVIÇO */}
                    <div className="space-y-2">
                        <p className="text-label-medium-size text-content-primary">
                            Serviço
                        </p>

                        <Select
                            value={serviceId}
                            onValueChange={(v) => {
                                setServiceId(v);
                                setScheduleDate(undefined);
                                setTime('');
                                setAvailableTimes([]);
                                setTimesError(null);
                            }}
                            disabled={!canProceed || !unitId || !professionalId}
                        >
                            <SelectTrigger>
                                <div className="flex items-center gap-2">
                                    <Scissors className="h-4 w-4 text-content-brand" />
                                    <SelectValue
                                        placeholder={
                                            !canProceed
                                                ? 'Selecione um cliente'
                                                : !unitId
                                                  ? 'Selecione a unidade'
                                                  : !professionalId
                                                    ? 'Selecione o profissional'
                                                    : 'Selecione o serviço'
                                        }
                                    />
                                </div>
                            </SelectTrigger>

                            <SelectContent>
                                {servicesForUnit.length === 0 ? (
                                    <SelectItem disabled value="no-services">
                                        Nenhum serviço disponível
                                    </SelectItem>
                                ) : (
                                    servicesForUnit.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.name}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 7) DIA */}
                    <div className="space-y-2">
                        <p className="text-label-medium-size text-content-primary">
                            Dia
                        </p>

                        <Popover
                            open={isDatePickerOpen}
                            onOpenChange={setIsDatePickerOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    disabled={
                                        !canProceed ||
                                        !unitId ||
                                        !professionalId ||
                                        !serviceId
                                    }
                                    className={cn(
                                        'w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand disabled:opacity-60 disabled:cursor-not-allowed',
                                        !scheduleDate &&
                                            'text-content-secondary'
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon
                                            className="text-content-brand"
                                            size={20}
                                        />
                                        {scheduleDate ? (
                                            format(scheduleDate, 'dd/MM/yyyy')
                                        ) : (
                                            <span>
                                                {!canProceed
                                                    ? 'Selecione um cliente'
                                                    : !unitId
                                                      ? 'Selecione a unidade'
                                                      : !professionalId
                                                        ? 'Selecione o profissional'
                                                        : !serviceId
                                                          ? 'Selecione o serviço'
                                                          : 'Selecione um dia'}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronDown className="opacity-50 h-4 w-4" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={scheduleDate}
                                    onSelect={(d) => {
                                        setScheduleDate(d ?? undefined);
                                        setTime('');
                                        setAvailableTimes([]);
                                        setTimesError(null);
                                        if (d) setIsDatePickerOpen(false);
                                    }}
                                    disabled={(d) => d < startOfToday()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* 8) HORÁRIO */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-label-medium-size text-content-primary">
                                Horário
                            </p>

                            {isLoadingTimes ? (
                                <span className="inline-flex items-center gap-2 text-xs text-content-secondary">
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    Carregando horários...
                                </span>
                            ) : null}
                        </div>

                        <Select
                            value={time}
                            onValueChange={(v) => setTime(v)}
                            disabled={timeSelectDisabled}
                        >
                            <SelectTrigger
                                className="
                                  w-full justify-between text-left font-normal
                                  bg-background-tertiary border-border-primary text-content-primary
                                  focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand
                                  focus:border-border-brand focus-visible:border-border-brand
                                  disabled:opacity-60 disabled:cursor-not-allowed
                                "
                            >
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-content-brand" />
                                    <SelectValue
                                        placeholder={
                                            !canProceed
                                                ? 'Selecione um cliente'
                                                : !unitId
                                                  ? 'Selecione a unidade'
                                                  : !professionalId
                                                    ? 'Selecione o profissional'
                                                    : !serviceId
                                                      ? 'Selecione o serviço'
                                                      : !scheduleDate
                                                        ? 'Selecione o dia'
                                                        : isLoadingTimes
                                                          ? 'Carregando horários...'
                                                          : timesError
                                                            ? 'Erro ao carregar horários'
                                                            : availableTimes.length ===
                                                                0
                                                              ? 'Sem horários disponíveis'
                                                              : 'Selecione um horário'
                                        }
                                    />
                                </div>
                            </SelectTrigger>

                            <SelectContent>
                                {timesError ? (
                                    <SelectItem disabled value="times-error">
                                        {timesError}
                                    </SelectItem>
                                ) : isLoadingTimes ? (
                                    <SelectItem disabled value="times-loading">
                                        Carregando...
                                    </SelectItem>
                                ) : availableTimes.length === 0 ? (
                                    <SelectItem disabled value="no-times">
                                        Nenhum horário disponível
                                    </SelectItem>
                                ) : (
                                    availableTimes.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>

                        {timesError ? (
                            <p className="text-xs text-destructive">
                                {timesError}
                            </p>
                        ) : null}
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            type="button"
                            variant="brand"
                            onClick={handleSubmit}
                            disabled={
                                submitting ||
                                !selectedClientId ||
                                !unitId ||
                                !professionalId ||
                                !serviceId ||
                                !scheduleDate ||
                                !time ||
                                isLoadingTimes
                            }
                        >
                            {submitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Agendar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
