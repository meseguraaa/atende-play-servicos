'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

import { Clock } from 'lucide-react';
import { toast } from 'sonner';

const WEEKDAY_SHORT = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
] as const;

const WEEKDAY_FULL = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
] as const;

export type WeeklyDayUI = {
    isActive: boolean;
    startTime: string;
    endTime: string;
};

type Props = {
    unitId: string;

    weekly: Record<number, WeeklyDayUI> | undefined;

    setWeeklyByUnitId: React.Dispatch<
        React.SetStateAction<Record<string, Record<number, WeeklyDayUI>>>
    >;

    onSubmitWeekly: (unitId: string, e: React.FormEvent) => void;

    onCreateException?: () => void; // (mantido por compatibilidade; não usamos mais aqui)
};

type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok: false; error: string };
type ApiResp<T> = ApiOk<T> | ApiErr;

type UnitExceptionApi = {
    id: string;
    date: string; // "YYYY-MM-DD"
    isClosed: boolean;
    intervals: Array<{
        id: string;
        startTime: string; // "HH:mm"
        endTime: string; // "HH:mm"
    }>;
};

type ExceptionMode = 'FULL_DAY' | 'INTERVALS';

type IntervalUI = {
    startTime: string;
    endTime: string;
};

// ✅ 00:00 → 23:30 (30 em 30)
const TIME_OPTIONS = (() => {
    const times: string[] = [];
    for (let hour = 0; hour <= 23; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            times.push(
                `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
            );
        }
    }
    return times; // inclui 23:30
})();

function safeApiError(json: unknown): string {
    if (
        json &&
        typeof json === 'object' &&
        'ok' in json &&
        (json as any).ok === false &&
        typeof (json as any).error === 'string'
    ) {
        return String((json as any).error);
    }
    return 'internal_error';
}

function toExceptionMessage(code: string) {
    const map: Record<string, string> = {
        forbidden_owner_only: 'Somente o dono pode criar exceções.',
        unit_not_found: 'Não foi possível encontrar essa unidade.',
        unit_id_required: 'Unidade inválida.',
        exception_id_required: 'Exceção inválida.',
        invalid_json: 'Erro ao enviar dados. Tente novamente.',
        date_required: 'Informe uma data válida.',
        invalid_time_format: 'Informe horário no formato correto (HH:mm).',
        invalid_time_range: 'O horário final deve ser maior que o inicial.',
        intervals_overlap: 'Os intervalos não podem se sobrepor.',
        unauthorized: 'Você não tem permissão para realizar esta ação.',
        internal_error: 'Erro interno. Tente novamente.',
        exception_not_found: 'Exceção não encontrada.',
    };

    return map[code] ?? 'Algo deu errado. Tente novamente.';
}

function isValidHHmm(v: string) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v.trim());
}

function timeToMinutes(hhmm: string) {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
}

function todayISO() {
    // "YYYY-MM-DD" no timezone local do navegador
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function formatDateBR(iso: string) {
    // iso "YYYY-MM-DD"
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    try {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(y, m - 1, d));
    } catch {
        return iso;
    }
}

function sortExceptionsDesc(list: UnitExceptionApi[]) {
    return [...list].sort((a, b) => {
        // "YYYY-MM-DD" ordena lexicograficamente igual à ordem de data
        if (a.date === b.date) return 0;
        return a.date < b.date ? 1 : -1;
    });
}

/**
 * Pega weekday (0-6) a partir de "YYYY-MM-DD" no timezone local do browser.
 * Obs: isso é OK para UI; no backend você já está tratando UTC pro armazenamento.
 */
function weekdayFromISODate(dateISO: string): number | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) return null;
    const [y, m, d] = dateISO.split('-').map(Number);
    if (!y || !m || !d) return null;
    const dt = new Date(y, m - 1, d);
    const wd = dt.getDay();
    return Number.isFinite(wd) ? wd : null;
}

function sortIntervalsAsc<T extends { startTime: string; endTime: string }>(
    list: T[]
) {
    return [...list].sort(
        (a, b) =>
            timeToMinutes(a.startTime) - timeToMinutes(b.startTime) ||
            timeToMinutes(a.endTime) - timeToMinutes(b.endTime)
    );
}

function hasOverlap(list: Array<{ startTime: string; endTime: string }>) {
    const sorted = sortIntervalsAsc(list);
    for (let i = 1; i < sorted.length; i++) {
        const prevEnd = timeToMinutes(sorted[i - 1].endTime);
        const currStart = timeToMinutes(sorted[i].startTime);
        if (currStart < prevEnd) return true;
    }
    return false;
}

export function UnitAvailabilityCard({
    unitId,
    weekly,
    setWeeklyByUnitId,
    onSubmitWeekly,
}: Props) {
    const days = React.useMemo(() => {
        const w = weekly || {};
        return Array.from({ length: 7 }).map((_, weekday) => {
            const d = w[weekday] || {
                isActive: false,
                startTime: '',
                endTime: '',
            };

            return {
                weekday,
                short: WEEKDAY_SHORT[weekday] ?? `Dia ${weekday}`,
                full: WEEKDAY_FULL[weekday] ?? `Dia ${weekday}`,
                isActive: d.isActive,
                startTime: d.startTime,
                endTime: d.endTime,
            };
        });
    }, [weekly]);

    const hasAnyWeeklyError = React.useMemo(() => {
        return days.some((d) => {
            if (!d.isActive) return false;
            const s = String(d.startTime || '').trim();
            const e = String(d.endTime || '').trim();
            if (!isValidHHmm(s) || !isValidHHmm(e)) return false; // mantém compat: vazio não “quebra”
            return timeToMinutes(s) >= timeToMinutes(e);
        });
    }, [days]);

    // =========================
    // EXCEÇÕES (LISTAR)
    // =========================
    const [exceptions, setExceptions] = React.useState<UnitExceptionApi[]>([]);
    const [exceptionsLoading, setExceptionsLoading] = React.useState(true);
    const [exceptionsError, setExceptionsError] = React.useState<string | null>(
        null
    );

    const exceptionsAbortRef = React.useRef<AbortController | null>(null);

    const fetchExceptions = React.useCallback(async () => {
        setExceptionsLoading(true);
        setExceptionsError(null);

        if (exceptionsAbortRef.current) exceptionsAbortRef.current.abort();
        const controller = new AbortController();
        exceptionsAbortRef.current = controller;

        try {
            const res = await fetch(
                `/api/admin/settings/units/${unitId}/exceptions`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    signal: controller.signal,
                }
            );

            let json: ApiResp<UnitExceptionApi[]> | null = null;
            try {
                json = (await res.json()) as ApiResp<UnitExceptionApi[]>;
            } catch {
                json = null;
            }

            if (!res.ok || !json || !json.ok) {
                const code = json ? safeApiError(json) : 'internal_error';
                const msg = toExceptionMessage(code);
                setExceptions([]);
                setExceptionsError(msg);
                return;
            }

            const data = Array.isArray(json.data) ? json.data : [];
            setExceptions(sortExceptionsDesc(data));
        } catch (err: any) {
            if (err?.name === 'AbortError') return;
            setExceptions([]);
            setExceptionsError(
                'Não foi possível carregar as exceções. Verifique sua conexão.'
            );
        } finally {
            setExceptionsLoading(false);
        }
    }, [unitId]);

    React.useEffect(() => {
        fetchExceptions();
        return () => {
            if (exceptionsAbortRef.current) exceptionsAbortRef.current.abort();
        };
    }, [fetchExceptions]);

    // =========================
    // EXCEÇÕES (REMOVER)
    // =========================
    const [deletingExceptionId, setDeletingExceptionId] = React.useState<
        string | null
    >(null);

    async function handleDeleteException(exceptionId: string) {
        if (!exceptionId) return;

        setDeletingExceptionId(exceptionId);
        try {
            const res = await fetch(
                `/api/admin/settings/units/${unitId}/exceptions/${exceptionId}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            let json: ApiResp<unknown> | null = null;
            try {
                json = (await res.json()) as ApiResp<unknown>;
            } catch {
                json = null;
            }

            if (!res.ok || !json || !json.ok) {
                const code = json ? safeApiError(json) : 'internal_error';
                toast.error(toExceptionMessage(code));
                return;
            }

            toast.success('Exceção removida ✅');
            await fetchExceptions();
        } catch {
            toast.error(
                'Não foi possível remover a exceção. Verifique a conexão.'
            );
        } finally {
            setDeletingExceptionId(null);
        }
    }

    // =========================
    // MODAL: CRIAR EXCEÇÃO (PAUSA/BLOQUEIO)
    // =========================
    const [exceptionOpen, setExceptionOpen] = React.useState(false);
    const [exceptionSaving, setExceptionSaving] = React.useState(false);

    const [exceptionForm, setExceptionForm] = React.useState<{
        date: string;
        mode: ExceptionMode;
        intervals: IntervalUI[];
    }>({
        date: todayISO(),
        mode: 'INTERVALS',
        intervals: [{ startTime: '12:00', endTime: '14:00' }],
    });

    function resetExceptionForm() {
        setExceptionForm({
            date: todayISO(),
            mode: 'INTERVALS',
            intervals: [{ startTime: '12:00', endTime: '14:00' }],
        });
    }

    function openExceptionModal() {
        resetExceptionForm();
        setExceptionOpen(true);
    }

    function closeExceptionModal() {
        if (exceptionSaving) return;
        setExceptionOpen(false);
    }

    function addInterval() {
        setExceptionForm((p) => ({
            ...p,
            mode: 'INTERVALS',
            intervals: [
                ...p.intervals,
                { startTime: '12:00', endTime: '14:00' },
            ],
        }));
    }

    function removeInterval(idx: number) {
        setExceptionForm((p) => {
            const next = [...p.intervals];
            next.splice(idx, 1);
            return {
                ...p,
                intervals: next.length
                    ? next
                    : [{ startTime: '12:00', endTime: '14:00' }],
            };
        });
    }

    function updateInterval(idx: number, patch: Partial<IntervalUI>) {
        setExceptionForm((p) => {
            const next = [...p.intervals];
            next[idx] = { ...next[idx], ...patch };
            return { ...p, intervals: next };
        });
    }

    function resolveFullDayRange(
        dateISO: string
    ): { startTime: string; endTime: string } | null {
        const wd = weekdayFromISODate(dateISO);
        if (wd === null) return null;

        const day = weekly?.[wd];
        if (!day?.isActive) return null;

        const startTime = String(day.startTime || '').trim();
        const endTime = String(day.endTime || '').trim();

        if (!isValidHHmm(startTime) || !isValidHHmm(endTime)) return null;

        const sMin = timeToMinutes(startTime);
        const eMin = timeToMinutes(endTime);
        if (eMin <= sMin) return null;

        return { startTime, endTime };
    }

    async function handleCreateException(e: React.FormEvent) {
        e.preventDefault();

        const date = String(exceptionForm.date || '').trim();
        const mode = exceptionForm.mode;

        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            toast.error('Informe uma data válida.');
            return;
        }

        let intervalsToSend: IntervalUI[] = [];

        if (mode === 'FULL_DAY') {
            const range = resolveFullDayRange(date);
            if (!range) {
                const wd = weekdayFromISODate(date);
                const dayName =
                    wd !== null ? (WEEKDAY_FULL[wd] ?? `Dia ${wd}`) : 'o dia';
                toast.error(
                    `Não dá pra bloquear o dia inteiro: ${dayName} não está com horário válido no padrão semanal.`
                );
                return;
            }

            intervalsToSend = [range];
        } else {
            // INTERVALS
            const intervals = exceptionForm.intervals.map((it) => ({
                startTime: String(it.startTime || '').trim(),
                endTime: String(it.endTime || '').trim(),
            }));

            for (let i = 0; i < intervals.length; i++) {
                const it = intervals[i];

                if (!isValidHHmm(it.startTime) || !isValidHHmm(it.endTime)) {
                    toast.error(`Intervalo #${i + 1}: horários inválidos.`);
                    return;
                }

                const sMin = timeToMinutes(it.startTime);
                const eMin = timeToMinutes(it.endTime);
                if (eMin <= sMin) {
                    toast.error(
                        `Intervalo #${i + 1}: o horário final deve ser maior que o inicial.`
                    );
                    return;
                }
            }

            if (hasOverlap(intervals)) {
                toast.error('Os intervalos não podem se sobrepor.');
                return;
            }

            intervalsToSend = sortIntervalsAsc(intervals);
        }

        setExceptionSaving(true);
        try {
            const res = await fetch(
                `/api/admin/settings/units/${unitId}/exceptions`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        date,
                        mode,
                        intervals: intervalsToSend,
                    }),
                }
            );

            let json: ApiResp<unknown> | null = null;
            try {
                json = (await res.json()) as ApiResp<unknown>;
            } catch {
                json = null;
            }

            if (!res.ok || !json || !json.ok) {
                const code = json ? safeApiError(json) : 'internal_error';
                toast.error(toExceptionMessage(code));
                return;
            }

            toast.success(
                mode === 'FULL_DAY'
                    ? 'Exceção criada (dia inteiro) ✅'
                    : 'Exceção criada ✅'
            );
            setExceptionOpen(false);

            // ✅ refresh da lista
            await fetchExceptions();
        } catch {
            toast.error(
                'Não foi possível criar a exceção. Verifique a conexão.'
            );
        } finally {
            setExceptionSaving(false);
        }
    }

    return (
        <div className="rounded-2xl border border-border-primary bg-background-secondary p-4 space-y-4">
            {/* =========================
             * MODAL: CRIAR EXCEÇÃO
             * ========================= */}
            <Dialog open={exceptionOpen} onOpenChange={setExceptionOpen}>
                <DialogContent className="sm:max-w-[560px]">
                    <DialogHeader>
                        <DialogTitle>Criar exceção</DialogTitle>
                        <DialogDescription>
                            Bloqueie o dia inteiro (com base no padrão semanal)
                            ou crie pausas por intervalos.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={handleCreateException}
                        className="space-y-4"
                    >
                        <div className="grid gap-3">
                            <div className="space-y-1">
                                <p className="text-[11px] text-content-secondary">
                                    Data
                                </p>
                                <Input
                                    type="date"
                                    value={exceptionForm.date}
                                    onChange={(e) =>
                                        setExceptionForm((p) => ({
                                            ...p,
                                            date: e.target.value,
                                        }))
                                    }
                                    className="bg-background-secondary border-border-primary text-content-primary"
                                />
                            </div>

                            <div className="space-y-1">
                                <p className="text-[11px] text-content-secondary">
                                    Tipo de bloqueio
                                </p>

                                {/* Select simples (sem depender de outro componente) */}
                                <select
                                    value={exceptionForm.mode}
                                    onChange={(e) => {
                                        const v = e.target
                                            .value as ExceptionMode;
                                        setExceptionForm((p) => ({
                                            ...p,
                                            mode: v,
                                        }));
                                    }}
                                    className="h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary outline-none focus:ring-2 focus:ring-brand-primary/30"
                                >
                                    <option value="FULL_DAY">
                                        Dia inteiro
                                    </option>
                                    <option value="INTERVALS">
                                        Intervalos
                                    </option>
                                </select>

                                <p className="text-[11px] text-content-secondary/80">
                                    {exceptionForm.mode === 'FULL_DAY'
                                        ? 'Vai bloquear o período de atendimento do dia, baseado no padrão semanal.'
                                        : 'Você pode adicionar vários intervalos de pausa/bloqueio.'}
                                </p>
                            </div>

                            {exceptionForm.mode === 'FULL_DAY' ? (
                                <div className="rounded-xl border border-border-primary bg-background-tertiary p-3">
                                    {(() => {
                                        const wd = weekdayFromISODate(
                                            exceptionForm.date
                                        );
                                        const name =
                                            wd !== null
                                                ? (WEEKDAY_FULL[wd] ??
                                                  `Dia ${wd}`)
                                                : '—';
                                        const range = resolveFullDayRange(
                                            exceptionForm.date
                                        );

                                        return (
                                            <>
                                                <p className="text-[11px] text-content-secondary">
                                                    Dia selecionado:{' '}
                                                    <span className="text-content-primary font-medium">
                                                        {name}
                                                    </span>
                                                </p>

                                                {range ? (
                                                    <p className="mt-1 text-[11px] text-content-secondary">
                                                        Horário do padrão
                                                        semanal:{' '}
                                                        <span className="text-content-primary">
                                                            {range.startTime} às{' '}
                                                            {range.endTime}
                                                        </span>
                                                    </p>
                                                ) : (
                                                    <p className="mt-1 text-[11px] text-destructive">
                                                        Esse dia não tem horário
                                                        válido no padrão semanal
                                                        (ou está desativado).
                                                    </p>
                                                )}

                                                <p className="mt-2 text-[11px] text-content-secondary/80">
                                                    Dica: ajuste o padrão
                                                    semanal se quiser que “dia
                                                    inteiro” funcione nesse dia.
                                                </p>
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-[11px] text-content-secondary">
                                            Intervalos
                                        </p>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addInterval}
                                        >
                                            + Adicionar intervalo
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        {exceptionForm.intervals.map(
                                            (it, idx) => (
                                                <div
                                                    key={`${idx}-${it.startTime}-${it.endTime}`}
                                                    className="rounded-xl border border-border-primary bg-background-tertiary p-3"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className="text-[11px] text-content-secondary">
                                                            Intervalo #{idx + 1}
                                                        </p>

                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeInterval(
                                                                    idx
                                                                )
                                                            }
                                                            disabled={
                                                                exceptionForm
                                                                    .intervals
                                                                    .length <= 1
                                                            }
                                                        >
                                                            Remover
                                                        </Button>
                                                    </div>

                                                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-1">
                                                            <p className="text-[11px] text-content-secondary">
                                                                Início
                                                            </p>
                                                            <Input
                                                                type="time"
                                                                value={
                                                                    it.startTime
                                                                }
                                                                onChange={(e) =>
                                                                    updateInterval(
                                                                        idx,
                                                                        {
                                                                            startTime:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    )
                                                                }
                                                                className="bg-background-secondary border-border-primary text-content-primary"
                                                            />
                                                        </div>

                                                        <div className="space-y-1">
                                                            <p className="text-[11px] text-content-secondary">
                                                                Fim
                                                            </p>
                                                            <Input
                                                                type="time"
                                                                value={
                                                                    it.endTime
                                                                }
                                                                onChange={(e) =>
                                                                    updateInterval(
                                                                        idx,
                                                                        {
                                                                            endTime:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    )
                                                                }
                                                                className="bg-background-secondary border-border-primary text-content-primary"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <div className="rounded-xl border border-border-primary bg-background-tertiary p-3">
                                        <p className="text-[11px] text-content-secondary">
                                            Exemplo: <strong>12:00</strong> até{' '}
                                            <strong>14:00</strong> para a pausa
                                            do almoço. 🥪
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeExceptionModal}
                                disabled={exceptionSaving}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={exceptionSaving}
                            >
                                {exceptionSaving ? 'Criando…' : 'Criar exceção'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <form
                onSubmit={(e) => onSubmitWeekly(unitId, e)}
                className="space-y-4"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h3 className="text-label-small text-content-primary">
                            Disponibilidade da unidade
                        </h3>
                        <p className="text-paragraph-small text-content-secondary">
                            Ajuste o padrão semanal de atendimento desta
                            unidade.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="submit"
                            variant="edit2"
                            size="sm"
                            disabled={hasAnyWeeklyError}
                            title={
                                hasAnyWeeklyError
                                    ? 'Corrija os horários inválidos antes de salvar.'
                                    : undefined
                            }
                        >
                            Salvar padrão semanal
                        </Button>

                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={openExceptionModal}
                        >
                            Criar exceção
                        </Button>
                    </div>
                </div>

                {/* ✅ MESMO PADRÃO VISUAL do outro componente */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
                    {days.map((d) => {
                        const startOk = isValidHHmm(String(d.startTime || ''));
                        const endOk = isValidHHmm(String(d.endTime || ''));
                        const hasError =
                            d.isActive &&
                            startOk &&
                            endOk &&
                            timeToMinutes(d.startTime) >=
                                timeToMinutes(d.endTime);

                        return (
                            <div
                                key={d.weekday}
                                className={cn(
                                    'flex flex-col rounded-xl border px-3 py-3 text-paragraph-small-size transition-colors',
                                    d.isActive
                                        ? 'border-border-brand bg-background-tertiary/80'
                                        : 'border-border-secondary bg-background-tertiary'
                                )}
                            >
                                {/* Cabeçalho do dia */}
                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <div className="flex flex-col">
                                        <span className="text-content-primary font-medium">
                                            {d.short}
                                        </span>
                                        <span className="text-[11px] text-content-primary">
                                            {d.full}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const nextActive = !d.isActive;

                                            setWeeklyByUnitId((prev) => ({
                                                ...prev,
                                                [unitId]: {
                                                    ...(prev[unitId] || {}),
                                                    [d.weekday]: {
                                                        ...(prev[unitId]?.[
                                                            d.weekday
                                                        ] || {
                                                            isActive: false,
                                                            startTime: '',
                                                            endTime: '',
                                                        }),
                                                        isActive: nextActive,
                                                    },
                                                },
                                            }));
                                        }}
                                        className={cn(
                                            'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors',
                                            d.isActive
                                                ? 'bg-background-brand text-content-on-brand'
                                                : 'bg-background-primary text-content-secondary border border-border-secondary'
                                        )}
                                    >
                                        {d.isActive ? 'Sim' : 'Não'}
                                    </button>
                                </div>

                                {/* Inputs de horário (dropdowns) */}
                                <div className="mt-auto space-y-2">
                                    {/* Das */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[11px] text-content-primary">
                                            Das
                                        </span>

                                        <Select
                                            value={d.startTime || ''}
                                            onValueChange={(value) => {
                                                setWeeklyByUnitId((prev) => ({
                                                    ...prev,
                                                    [unitId]: {
                                                        ...(prev[unitId] || {}),
                                                        [d.weekday]: {
                                                            ...(prev[unitId]?.[
                                                                d.weekday
                                                            ] || {
                                                                isActive: false,
                                                                startTime: '',
                                                                endTime: '',
                                                            }),
                                                            startTime: value,
                                                        },
                                                    },
                                                }));
                                            }}
                                            disabled={!d.isActive}
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    'h-9 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                    hasError &&
                                                        'border-destructive focus-visible:ring-destructive/40'
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-content-brand" />
                                                    <SelectValue placeholder="00:00" />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TIME_OPTIONS.map((time) => (
                                                    <SelectItem
                                                        key={time}
                                                        value={time}
                                                    >
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Até */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[11px] text-content-primary">
                                            Até
                                        </span>

                                        <Select
                                            value={d.endTime || ''}
                                            onValueChange={(value) => {
                                                setWeeklyByUnitId((prev) => ({
                                                    ...prev,
                                                    [unitId]: {
                                                        ...(prev[unitId] || {}),
                                                        [d.weekday]: {
                                                            ...(prev[unitId]?.[
                                                                d.weekday
                                                            ] || {
                                                                isActive: false,
                                                                startTime: '',
                                                                endTime: '',
                                                            }),
                                                            endTime: value,
                                                        },
                                                    },
                                                }));
                                            }}
                                            disabled={!d.isActive}
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    'h-9 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                    hasError &&
                                                        'border-destructive focus-visible:ring-destructive/40'
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-content-brand" />
                                                    <SelectValue placeholder="00:00" />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TIME_OPTIONS.map((time) => (
                                                    <SelectItem
                                                        key={time}
                                                        value={time}
                                                    >
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {hasError && (
                                    <p className="mt-2 text-[11px] text-destructive">
                                        Em dias ativos, o horário inicial deve
                                        ser menor que o final.
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {hasAnyWeeklyError && (
                    <p className="text-[11px] text-destructive">
                        Existem dias ativos com horário inválido (início
                        maior/igual ao fim).
                    </p>
                )}

                <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-label-small text-content-primary">
                                Exceções
                            </p>
                            <p className="text-[11px] text-content-secondary">
                                Pausas/bloqueios em datas específicas.
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={fetchExceptions}
                            disabled={exceptionsLoading}
                        >
                            {exceptionsLoading ? 'Atualizando…' : 'Atualizar'}
                        </Button>
                    </div>

                    {exceptionsError ? (
                        <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4">
                            <p className="text-[11px] text-destructive">
                                {exceptionsError}
                            </p>
                        </div>
                    ) : exceptionsLoading ? (
                        <div className="rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-2">
                            <div className="h-9 w-full rounded-lg bg-background-secondary/60" />
                            <div className="h-9 w-full rounded-lg bg-background-secondary/60" />
                            <p className="text-[11px] text-content-secondary">
                                Carregando exceções…
                            </p>
                        </div>
                    ) : exceptions.length === 0 ? (
                        <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                            <p className="text-paragraph-small text-content-secondary">
                                Nenhuma exceção cadastrada ainda.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {exceptions.map((ex) => {
                                const isDeleting =
                                    deletingExceptionId === ex.id;

                                const intervals = Array.isArray(ex.intervals)
                                    ? ex.intervals
                                    : [];

                                return (
                                    <div
                                        key={ex.id}
                                        className="rounded-xl border border-border-primary bg-background-tertiary p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-paragraph-small text-content-primary font-medium">
                                                    {formatDateBR(ex.date)}
                                                </p>

                                                {ex.isClosed ? (
                                                    <p className="text-[11px] text-content-secondary mt-1">
                                                        Dia fechado (sem
                                                        atendimento)
                                                    </p>
                                                ) : intervals.length ? (
                                                    <div className="mt-1 space-y-1">
                                                        {intervals.map((it) => (
                                                            <p
                                                                key={it.id}
                                                                className="text-[11px] text-content-secondary"
                                                            >
                                                                Pausa:{' '}
                                                                <span className="text-content-primary">
                                                                    {
                                                                        it.startTime
                                                                    }{' '}
                                                                    às{' '}
                                                                    {it.endTime}
                                                                </span>
                                                            </p>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-[11px] text-content-secondary mt-1">
                                                        Exceção sem intervalos
                                                        (vazia)
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="shrink-0 rounded-full border border-border-primary px-3 py-1 text-[11px] text-content-secondary">
                                                    Bloqueio
                                                </span>

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={isDeleting}
                                                    onClick={() =>
                                                        handleDeleteException(
                                                            ex.id
                                                        )
                                                    }
                                                >
                                                    {isDeleting
                                                        ? 'Removendo…'
                                                        : 'Remover'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
