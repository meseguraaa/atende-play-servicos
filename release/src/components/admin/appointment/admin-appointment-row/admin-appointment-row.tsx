// src/components/admin/appointment/admin-appointment-row.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// ✅ Radix puro (sem wrapper do shadcn)
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import EditAppointmentDialog, {
    type AppointmentToEdit,
    type UnitOption,
    type ClientOption,
    type ProfessionalOption,
    type ServiceOption,
} from '@/components/admin/appointment/edit-appointment-dialog/edit-appointment-dialog';

type AppointmentStatus = 'PENDING' | 'DONE' | 'CANCELED';

export type AdminAppointmentRowItem = {
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

type Props = {
    appt: AdminAppointmentRowItem;

    forcedUnitId?: string | null;
    units: UnitOption[];
    clients: ClientOption[];
    professionals: ProfessionalOption[];
    services: ServiceOption[];
};

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

export function AdminAppointmentRow({
    appt,
    forcedUnitId = null,
    units,
    clients,
    professionals,
    services,
}: Props) {
    const router = useRouter();
    const [loadingAction, setLoadingAction] = React.useState<
        null | 'done' | 'cancel'
    >(null);

    const isPending = appt.status === 'PENDING';
    const isBusy = loadingAction !== null;

    const runDone = async () => {
        try {
            setLoadingAction('done');

            const res = await fetch(`/api/admin/appointments/${appt.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'done' }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(
                    data?.error ?? 'Não foi possível concluir o agendamento.'
                );
                return;
            }

            toast.success('Agendamento concluído!');
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

            const res = await fetch(`/api/admin/appointments/${appt.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'cancel' }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(
                    data?.error ?? 'Não foi possível cancelar o agendamento.'
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

    const timeLabel = formatTimeHHmm(appt.scheduleAt);

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
                        {/* Editar */}
                        <EditAppointmentDialog
                            appt={apptForEdit}
                            forcedUnitId={forcedUnitId}
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

                        {/* Concluir */}
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
                                    {/* ✅ Voltar agora é Button também */}
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

                        {/* Cancelar */}
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

export default AdminAppointmentRow;
