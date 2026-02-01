'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type AppointmentDoneConfirmDialogProps = {
    appointmentId: string;

    clientName: string;
    timeLabel: string;
    serviceLabel: string;

    /**
     * Se quiser controlar por fora (ex: batch, analytics),
     * retorne uma Promise.
     *
     * Se NÃO passar, este componente:
     * - chama a API
     * - mostra toast
     * - dá refresh
     */
    onConfirm?: () => void | Promise<void>;
};

export function AppointmentDoneConfirmDialog({
    appointmentId,
    clientName,
    timeLabel,
    serviceLabel,
    onConfirm,
}: AppointmentDoneConfirmDialogProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleConfirm = async () => {
        try {
            setIsPending(true);

            // ✅ fluxo controlado pelo pai
            if (onConfirm) {
                await onConfirm();
                return;
            }

            // ✅ fluxo padrão
            const res = await fetch(
                `/api/admin/appointments/${appointmentId}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'done' }),
                }
            );

            const json = (await res.json()) as {
                ok?: boolean;
                error?: string;
            };

            if (!res.ok || !json?.ok) {
                toast.error(
                    json?.error ?? 'Não foi possível concluir o agendamento.'
                );
                return;
            }

            toast.success('Agendamento concluído com sucesso!');
            router.refresh();
        } catch {
            toast.error('Falha ao concluir o agendamento.');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    variant="active"
                    size="sm"
                    disabled={isPending}
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
                        Você está prestes a marcar este atendimento como
                        concluído:
                        <br />
                        <br />
                        <b>Cliente:</b> {clientName}
                        <br />
                        <b>Horário:</b> {timeLabel}
                        <br />
                        <b>Serviço:</b> {serviceLabel}
                        <br />
                        <br />
                        Esta ação não poderá ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Voltar
                    </AlertDialogCancel>

                    {/* ✅ botão VERDE real (mesmo variant do concluir) */}
                    <AlertDialogAction
                        asChild
                        className="p-0 bg-transparent hover:bg-transparent"
                    >
                        <Button
                            onClick={handleConfirm}
                            disabled={isPending}
                            variant="active"
                            type="button"
                        >
                            {isPending
                                ? 'Concluindo...'
                                : 'Concluir agendamento'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
