// src/app/professional/dashboard/professional-appointments-client.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';

import EditAppointmentDialog, {
    type AppointmentToEdit,
    type UnitOption,
    type ClientOption,
    type ProfessionalOption,
    type ServiceOption,
} from '@/components/admin/appointment/edit-appointment-dialog/edit-appointment-dialog';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// ✅ Radix puro (sem wrapper do shadcn) pra não sobrescrever variant do Button
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/utils';

type AppointmentStatus = 'PENDING' | 'DONE' | 'CANCELED';

export type AppointmentItem = {
    id: string;
    unitId: string;
    clientId: string;
    clientName: string;
    phone: string;
    description: string;
    scheduleAt: string | Date;
    status: AppointmentStatus;
    professionalId: string | null;
    serviceId: string | null;
};

export type UnitPickerOption = {
    id: string;
    name: string;
};

export type ProfessionalAppointmentsClientProps = {
    // apenas informativo / futuro (ex: filtros)
    date?: string;
    unitId: string;
    professionalId: string;

    units: UnitPickerOption[];
    professionals: ProfessionalOption[];
    services: ServiceOption[];
    clients: ClientOption[];
    appointments: AppointmentItem[];
};

function safeLocaleCompare(a: string, b: string): number {
    try {
        return a.localeCompare('pt-BR', undefined as any, {
            sensitivity: 'base',
        });
    } catch {
        return a.localeCompare(b);
    }
}

function formatTimeHHmm(value: string | Date): string {
    const d = value instanceof Date ? value : new Date(value);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
    const label =
        status === 'PENDING'
            ? 'Pendente'
            : status === 'DONE'
              ? 'Concluído'
              : 'Cancelado';

    const toneClass =
        status === 'DONE'
            ? 'bg-green-500/15 text-green-600 border-green-500/30'
            : status === 'PENDING'
              ? 'bg-amber-500/15 text-amber-700 border-amber-500/30'
              : 'bg-red-500/15 text-red-600 border-red-500/30';

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                toneClass
            )}
        >
            {label}
        </span>
    );
}

function AppointmentRow({
    appt,
    forcedUnitId,
    forcedProfessionalId,
    units,
    clients,
    professionals,
    services,
}: {
    appt: AppointmentItem;
    forcedUnitId: string;
    forcedProfessionalId: string;
    units: UnitOption[];
    clients: ClientOption[];
    professionals: ProfessionalOption[];
    services: ServiceOption[];
}) {
    const router = useRouter();
    const [loadingAction, setLoadingAction] = React.useState<
        null | 'done' | 'cancel'
    >(null);

    const isPending = appt.status === 'PENDING';
    const isBusy = loadingAction !== null;

    const timeLabel = formatTimeHHmm(appt.scheduleAt);

    const apptForEdit: AppointmentToEdit = {
        id: appt.id,
        unitId: appt.unitId,
        clientId: appt.clientId,
        clientName: appt.clientName,
        phone: appt.phone,
        description: appt.description,
        scheduleAt: appt.scheduleAt,
        status: appt.status,
        professionalId: appt.professionalId,
        serviceId: appt.serviceId,
    };

    const runDone = async () => {
        try {
            setLoadingAction('done');

            const res = await fetch(
                `/api/professional/appointments/${appt.id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'done' }),
                }
            );

            const payload = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(
                    payload?.error ?? 'Não foi possível concluir o agendamento.'
                );
                return;
            }

            // ✅ opcional: se a API devolver orderCreated/order, mostramos um hint
            if (payload?.data?.orderCreated) {
                toast.success('Concluído! Pedido criado no checkout.');
            } else {
                toast.success('Agendamento concluído!');
            }

            router.refresh();
        } catch {
            toast.error('Erro ao concluir o agendamento.');
        } finally {
            setLoadingAction(null);
        }
    };

    const runCancel = async () => {
        try {
            setLoadingAction('cancel');

            const res = await fetch(
                `/api/professional/appointments/${appt.id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'cancel' }),
                }
            );

            const payload = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(
                    payload?.error ?? 'Não foi possível cancelar o agendamento.'
                );
                return;
            }

            toast.success('Agendamento cancelado.');
            router.refresh();
        } catch {
            toast.error('Erro ao cancelar o agendamento.');
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <tr className="border-b border-border-primary hover:bg-muted/30">
            <td className="px-4 py-3 font-medium text-content-primary">
                {timeLabel}
            </td>

            <td className="px-4 py-3 text-content-primary">
                {appt.clientName}
            </td>

            <td className="px-4 py-3 text-content-secondary">{appt.phone}</td>

            <td className="px-4 py-3 text-content-secondary">
                {appt.description}
            </td>

            <td className="px-4 py-3">
                <StatusBadge status={appt.status} />
            </td>

            <td className="px-4 py-3 text-right">
                {isPending ? (
                    <div className="flex items-center justify-end gap-2">
                        {/* ✅ Editar: MESMO modal do admin, mas em modo professional */}
                        <EditAppointmentDialog
                            appt={apptForEdit}
                            apiNamespace="professional"
                            forcedUnitId={forcedUnitId}
                            forcedProfessionalId={forcedProfessionalId}
                            units={units}
                            clients={clients}
                            professionals={professionals}
                            services={services}
                        >
                            <Button
                                type="button"
                                variant="edit2"
                                size="sm"
                                disabled={isBusy}
                            >
                                Editar
                            </Button>
                        </EditAppointmentDialog>

                        {/* Concluir (com confirmação) */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    type="button"
                                    variant="active"
                                    size="sm"
                                    disabled={isBusy}
                                >
                                    Concluir
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Concluir este agendamento?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Você vai marcar como concluído o
                                        agendamento de <b>{appt.clientName}</b>{' '}
                                        às <b>{timeLabel}</b> (
                                        {appt.description}).
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogPrimitive.Cancel asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={loadingAction === 'done'}
                                        >
                                            Voltar
                                        </Button>
                                    </AlertDialogPrimitive.Cancel>

                                    <AlertDialogPrimitive.Action asChild>
                                        <Button
                                            type="button"
                                            variant="active"
                                            size="sm"
                                            onClick={runDone}
                                            disabled={loadingAction === 'done'}
                                        >
                                            {loadingAction === 'done'
                                                ? 'Concluindo...'
                                                : 'Concluir agendamento'}
                                        </Button>
                                    </AlertDialogPrimitive.Action>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        {/* Cancelar (com confirmação) */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    disabled={isBusy}
                                >
                                    Cancelar
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Cancelar este agendamento?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        O agendamento de{' '}
                                        <b>{appt.clientName}</b> às{' '}
                                        <b>{timeLabel}</b> será cancelado.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogPrimitive.Cancel asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={
                                                loadingAction === 'cancel'
                                            }
                                        >
                                            Voltar
                                        </Button>
                                    </AlertDialogPrimitive.Cancel>

                                    <AlertDialogPrimitive.Action asChild>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={runCancel}
                                            disabled={
                                                loadingAction === 'cancel'
                                            }
                                        >
                                            {loadingAction === 'cancel'
                                                ? 'Cancelando...'
                                                : 'Cancelar agendamento'}
                                        </Button>
                                    </AlertDialogPrimitive.Action>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ) : (
                    <span className="text-paragraph-small text-content-tertiary">
                        —
                    </span>
                )}
            </td>
        </tr>
    );
}

export default function ProfessionalAppointmentsClient({
    date,
    unitId,
    professionalId,
    units,
    professionals,
    services,
    clients,
    appointments,
}: ProfessionalAppointmentsClientProps) {
    // ✅ Mantém a mesma cara do admin: agrupamento por profissional (aqui dá 1 grupo).
    const groups = React.useMemo(() => {
        const map = new Map<
            string,
            {
                key: string;
                professionalId: string | null;
                professionalName: string;
                professionalImageUrl: string | null;
                appointments: AppointmentItem[];
            }
        >();

        const myProfessional =
            professionals.find((p) => p.id === professionalId) ?? null;

        const profName = myProfessional?.name ?? 'Profissional';
        const profImg = myProfessional?.imageUrl ?? null;

        const key = professionalId || 'no-professional';

        map.set(key, {
            key,
            professionalId: professionalId || null,
            professionalName: profName,
            professionalImageUrl: profImg,
            appointments: [...appointments],
        });

        const arr = Array.from(map.values());

        arr.sort((a, b) =>
            safeLocaleCompare(a.professionalName, b.professionalName)
        );

        for (const g of arr) {
            g.appointments.sort((x, y) => {
                const ax = new Date(x.scheduleAt).getTime();
                const ay = new Date(y.scheduleAt).getTime();
                return ax - ay;
            });
        }

        return arr;
    }, [appointments, professionals, professionalId]);

    const unitLabel = React.useMemo(() => {
        const u = units.find((x) => x.id === unitId);
        return u?.name ?? null;
    }, [unitId, units]);

    // 🔧 Adaptadores de tipo pro EditAppointmentDialog (que é “admin”)
    const unitOptions = React.useMemo<UnitOption[]>(
        () => units.map((u) => ({ id: u.id, name: u.name })),
        [units]
    );

    return (
        <div className="space-y-4">
            {/* Headerzinho do bloco (mantive seu DatePicker importado, então uso aqui) */}

            {groups.length === 0 ? (
                <section className="border border-border-primary rounded-xl overflow-hidden bg-background-tertiary">
                    <div className="p-6 text-paragraph-small text-content-secondary text-center">
                        Nenhum agendamento encontrado para esta data.
                    </div>
                </section>
            ) : (
                <section className="space-y-4">
                    {groups.map((group) => (
                        <div
                            key={group.key}
                            className="border border-border-primary rounded-xl overflow-hidden bg-background-tertiary"
                        >
                            <div className="border-b border-border-primary px-4 py-3 bg-muted/40 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-background-secondary border border-border-primary overflow-hidden flex items-center justify-center text-[11px] font-medium text-content-secondary shrink-0">
                                        {group.professionalImageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={group.professionalImageUrl}
                                                alt={group.professionalName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span>
                                                {String(
                                                    group.professionalName ?? ''
                                                )
                                                    .trim()
                                                    .split(/\s+/)
                                                    .filter(Boolean)
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .slice(0, 2)
                                                    .toUpperCase() || '?'}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <h2 className="text-label-large text-content-primary">
                                            {group.professionalName}
                                        </h2>
                                        <p className="text-paragraph-small text-content-secondary">
                                            Agendamento(s):{' '}
                                            {group.appointments.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {group.appointments.length === 0 ? (
                                <div className="p-6 text-paragraph-small text-content-secondary text-center">
                                    Nenhum agendamento para hoje.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border-primary text-content-secondary">
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Hora
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Cliente
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Telefone
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Serviço
                                                </th>
                                                <th className="px-4 py-3 text-left font-medium">
                                                    Status
                                                </th>
                                                <th className="px-4 py-3 text-right font-medium">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {group.appointments.map((appt) => (
                                                <AppointmentRow
                                                    key={appt.id}
                                                    appt={appt}
                                                    forcedUnitId={unitId}
                                                    forcedProfessionalId={
                                                        professionalId
                                                    }
                                                    units={unitOptions}
                                                    clients={clients}
                                                    professionals={
                                                        professionals
                                                    }
                                                    services={services}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}
