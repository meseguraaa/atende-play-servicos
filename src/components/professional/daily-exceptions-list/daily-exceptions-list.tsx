// src/components/professional/daily-exceptions-list/daily-exceptions-list.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

import { DailyExceptionDeleteButton } from '@/components/professional/daily-exception-delete-button/daily-exception-delete-button';

type DailyExceptionsListProps = {
    professionalId: string;
};

type ExceptionInterval = {
    id: string;
    startTime: string;
    endTime: string;
};

type ExceptionItem = {
    id: string;
    date: Date;
    type: 'DAY_OFF' | 'CUSTOM';
    intervals: ExceptionInterval[];
};

type ApiGetResponse =
    | {
          ok: true;
          data: {
              exceptions: {
                  id: string;
                  dateISO: string;
                  type: 'DAY_OFF' | 'CUSTOM';
                  intervals: {
                      id: string;
                      startTime: string;
                      endTime: string;
                  }[];
              }[];
          };
      }
    | { ok: false; error?: string };

const EXCEPTIONS_CHANGED_EVENT = 'professional-exceptions:changed';

export function DailyExceptionsList({
    professionalId,
}: DailyExceptionsListProps) {
    const router = useRouter();

    const [exceptions, setExceptions] = useState<ExceptionItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function load() {
        setIsLoading(true);

        try {
            const res = await fetch(
                '/api/professional/availability/exceptions',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    cache: 'no-store',
                }
            );

            const json = (await res.json()) as ApiGetResponse;

            if (!res.ok || !json?.ok) {
                const msg =
                    (json && 'error' in json && json.error) ||
                    'Erro ao buscar exceções.';
                toast.error(msg);
                setExceptions([]);
                return;
            }

            const list = (json.data?.exceptions ?? []).map((ex) => ({
                id: ex.id,
                date: new Date(ex.dateISO),
                type: ex.type,
                intervals: (ex.intervals ?? []).map((i) => ({
                    id: i.id,
                    startTime: i.startTime,
                    endTime: i.endTime,
                })),
            }));

            setExceptions(list);
        } catch {
            toast.error('Falha ao buscar exceções. Tente novamente.');
            setExceptions([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // A API usa sessão no server; professionalId aqui é escopo/UI.
        // Mantemos na dependência caso o escopo mude.
        void professionalId;
        void load();

        // ✅ Quando o modal criar/atualizar uma exceção, a lista recarrega sem depender do router.refresh
        const onChanged = () => {
            void load();
        };

        window.addEventListener(EXCEPTIONS_CHANGED_EVENT, onChanged);

        return () => {
            window.removeEventListener(EXCEPTIONS_CHANGED_EVENT, onChanged);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [professionalId]);

    const sorted = useMemo(() => {
        return [...exceptions].sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        );
    }, [exceptions]);

    async function deleteByDateISO(dateISO: string) {
        // UI: remove otimisticamente
        const prev = exceptions;
        setExceptions((cur) =>
            cur.filter((ex) => ex.date.toISOString() !== dateISO)
        );

        try {
            const res = await fetch(
                `/api/professional/availability/exceptions?dateISO=${encodeURIComponent(
                    dateISO
                )}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const json = (await res.json()) as { ok: boolean; error?: string };

            if (!res.ok || !json?.ok) {
                const msg = json?.error ?? 'Erro ao remover exceção.';
                toast.error(msg);
                // rollback
                setExceptions(prev);
                return;
            }

            toast.success('Exceção removida com sucesso.');

            // ✅ avisa outros componentes (e garante reload da lista também)
            window.dispatchEvent(new Event(EXCEPTIONS_CHANGED_EVENT));

            // ✅ e ainda atualiza server components (boa prática)
            router.refresh();
        } catch {
            toast.error('Falha ao remover exceção. Tente novamente.');
            setExceptions(prev);
        }
    }

    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-paragraph-large-size text-content-primary font-semibold">
                    Exceções por dia
                </h2>
                <p className="text-paragraph-small-size text-content-secondary">
                    Veja e gerencie dias com horários diferentes do padrão
                    semanal.
                </p>
            </div>

            {isLoading ? (
                <div className="mt-2 rounded-lg border border-dashed border-border-secondary px-4 py-6 text-center text-paragraph-small-size text-content-secondary">
                    Carregando exceções...
                </div>
            ) : sorted.length === 0 ? (
                <div className="mt-2 rounded-lg border border-dashed border-border-secondary px-4 py-6 text-center text-paragraph-small-size text-content-secondary">
                    Você ainda não possui nenhuma exceção cadastrada. Use o
                    botão <strong>Criar exceção</strong> para bloquear um dia ou
                    alguns horários específicos.
                </div>
            ) : (
                <div className="space-y-2">
                    {sorted.map((ex) => {
                        const dateLabel = format(
                            ex.date,
                            "EEEE, dd 'de' MMMM",
                            {
                                locale: ptBR,
                            }
                        );

                        const isDayOff = ex.type === 'DAY_OFF';

                        return (
                            <div
                                key={ex.id}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3"
                            >
                                <div className="space-y-1">
                                    <p className="text-paragraph-medium-size text-content-primary font-medium">
                                        {dateLabel}
                                    </p>

                                    {isDayOff ? (
                                        <p className="text-paragraph-small-size text-content-secondary">
                                            <span className="font-semibold text-content-destructive">
                                                Dia inteiro indisponível
                                            </span>{' '}
                                            – nenhum horário ficará disponível
                                            para agendamento.
                                        </p>
                                    ) : ex.intervals.length === 0 ? (
                                        <p className="text-paragraph-small-size text-content-secondary">
                                            Exceção sem intervalos cadastrados.
                                        </p>
                                    ) : (
                                        <div className="space-y-1 text-paragraph-small-size text-content-secondary">
                                            <p className="font-medium text-content-primary">
                                                Horários indisponíveis neste
                                                dia:
                                            </p>
                                            <ul className="flex flex-wrap gap-2 text-[12px]">
                                                {ex.intervals.map(
                                                    (interval) => (
                                                        <li
                                                            key={interval.id}
                                                            className="rounded-full bg-background-secondary px-2 py-0.5"
                                                        >
                                                            {interval.startTime}{' '}
                                                            - {interval.endTime}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <DailyExceptionDeleteButton
                                    professionalId={professionalId}
                                    dateISO={ex.date.toISOString()}
                                    onDelete={({ dateISO }) =>
                                        deleteByDateISO(dateISO)
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
