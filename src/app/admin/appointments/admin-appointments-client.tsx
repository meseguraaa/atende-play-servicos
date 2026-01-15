// src/app/admin/appointments/admin-appointments-client.tsx
'use client';

import * as React from 'react';

import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';

import NewAppointmentDialog from '@/components/admin/appointment/new-appointment-dialog/new-appointment-dialog';
import { AdminAppointmentRow } from '@/components/admin/appointment/admin-appointment-row/admin-appointment-row';

export type UnitPickerOption = {
    id: string;
    name: string;
};

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
    professional: {
        id: string;
        name: string;
        imageUrl: string | null;
    } | null;

    serviceId: string | null;
};

export type ProfessionalItem = {
    id: string;
    name: string;
    imageUrl: string | null;
    isActive: boolean;
};

export type ServiceItem = {
    id: string;
    name: string;
    durationMinutes: number;
    price?: number;
    isActive: boolean;

    // ✅ schema: Service.unitId é nullable
    unitId?: string | null;
};

export type ClientItem = {
    id: string;
    name: string;
    phone: string | null;
};

type AdminAppointmentsClientProps = {
    scopeLabel: string;

    /**
     * ✅ NOVO: base para reaproveitar o UI legado (sem amarrar rotas antigas)
     * - date: yyyy-MM-dd (São Paulo)
     * - activeUnitId: unidade ativa já resolvida no server
     */
    date?: string;
    activeUnitId?: string | null;

    units?: UnitPickerOption[];

    appointments?: AppointmentItem[];
    professionals?: ProfessionalItem[];
    services?: ServiceItem[];
    clients?: ClientItem[];

    /**
     * ✅ Mantemos essas props opcionais por compatibilidade
     * enquanto o filtro por unidade fica centralizado no admin-nav.
     */
    canSeeAllUnits?: boolean;
    unitPickerDisabled?: boolean;
};

function getInitials(name: string): string {
    return String(name ?? '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function safeLocaleCompare(a: string, b: string): number {
    try {
        // ✅ forma correta: compareString = b, locales = 'pt-BR'
        return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });
    } catch {
        // fallback sem locale (não derruba a página)
        return a.localeCompare(b);
    }
}

export default function AdminAppointmentsClient({
    scopeLabel,
    date,
    activeUnitId,
    units = [],
    appointments = [],
    professionals = [],
    services = [],
    clients = [],
}: AdminAppointmentsClientProps) {
    const groups = React.useMemo(() => {
        // Agrupa por profissional (inclui "Sem profissional" se vier algo assim)
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

        for (const appt of appointments) {
            const key = appt.professionalId ?? 'no-professional';
            const professionalName =
                appt.professional?.name ?? 'Sem profissional';
            const professionalImageUrl = appt.professional?.imageUrl ?? null;

            if (!map.has(key)) {
                map.set(key, {
                    key,
                    professionalId: appt.professionalId ?? null,
                    professionalName,
                    professionalImageUrl,
                    appointments: [],
                });
            }

            map.get(key)!.appointments.push(appt);
        }

        // Se não houver appointments, mas houver lista de profissionais,
        // cria grupos vazios para manter o layout (reaproveito do UI legado).
        if (appointments.length === 0 && professionals.length > 0) {
            for (const p of professionals) {
                const key = p.id;
                if (!map.has(key)) {
                    map.set(key, {
                        key,
                        professionalId: p.id,
                        professionalName: p.name,
                        professionalImageUrl: p.imageUrl ?? null,
                        appointments: [],
                    });
                }
            }
        }

        const arr = Array.from(map.values());

        // Ordena: profissional com nome, "Sem profissional" por último
        arr.sort((a, b) => {
            if (a.key === 'no-professional') return 1;
            if (b.key === 'no-professional') return -1;

            return safeLocaleCompare(a.professionalName, b.professionalName);
        });

        // Ordena appointments dentro do grupo
        for (const g of arr) {
            g.appointments.sort((x, y) => {
                const ax = new Date(x.scheduleAt).getTime();
                const ay = new Date(y.scheduleAt).getTime();
                return ax - ay;
            });
        }

        return arr;
    }, [appointments, professionals]);

    const unitLabel = React.useMemo(() => {
        if (!activeUnitId) return null;
        const u = units.find((x) => x.id === activeUnitId);
        return u?.name ?? null;
    }, [activeUnitId, units]);

    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-title text-content-primary">
                        Agendamentos
                    </h1>
                    <p className="text-paragraph-medium-size text-content-secondary">
                        Gerencie os agendamentos do dia, organizados por
                        profissional.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    <NewAppointmentDialog
                        forcedUnitId={activeUnitId ?? null}
                        units={units}
                        clients={clients}
                        professionals={professionals}
                        services={services}
                        appointments={appointments}
                    >
                        <Button variant="brand">Agendar</Button>
                    </NewAppointmentDialog>

                    <DatePicker />
                </div>
            </div>

            {groups.length === 0 ? (
                <section className="border border-border-primary rounded-xl overflow-hidden bg-background-tertiary">
                    <div className="border-b border-border-primary px-4 py-3 bg-muted/40 flex justify-between items-center">
                        <p className="font-medium text-content-primary">
                            Agendamentos
                        </p>
                    </div>

                    <div className="p-6 text-paragraph-small text-content-secondary text-center">
                        Nenhum agendamento encontrado para esta data.
                    </div>
                </section>
            ) : (
                <section className="space-y-4">
                    {groups.map((group) => {
                        const initials = getInitials(group.professionalName);

                        return (
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
                                                    src={
                                                        group.professionalImageUrl
                                                    }
                                                    alt={group.professionalName}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span>{initials || '?'}</span>
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
                                        Nenhum agendamento para este
                                        profissional.
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
                                                {group.appointments.map(
                                                    (appt) => (
                                                        <AdminAppointmentRow
                                                            key={appt.id}
                                                            appt={appt}
                                                            forcedUnitId={
                                                                activeUnitId ??
                                                                null
                                                            }
                                                            units={units}
                                                            clients={clients}
                                                            professionals={
                                                                professionals
                                                            }
                                                            services={services}
                                                        />
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </section>
            )}
        </div>
    );
}
