// src/app/admin/appointments/admin-appointments-client.tsx
'use client';

import * as React from 'react';

type AdminAppointmentsClientProps = {
    scopeLabel: string;
};

export default function AdminAppointmentsClient({
    scopeLabel,
}: AdminAppointmentsClientProps) {
    return (
        <div className="space-y-4 max-w-7xl">
            <header className="flex flex-col gap-4">
                <div>
                    <h1 className="text-title text-content-primary">
                        Agendamentos
                    </h1>

                    <p className="text-paragraph-medium-size text-content-secondary">
                        Gerencie e acompanhe todos os agendamentos da empresa.
                    </p>

                    <p className="text-paragraph-small text-content-tertiary">
                        Escopo:{' '}
                        <span className="font-medium">{scopeLabel}</span>
                    </p>
                </div>
            </header>

            <div className="rounded-xl border border-border-primary bg-background-tertiary p-4">
                <p className="text-paragraph-small text-content-secondary">
                    Área em construção.
                </p>

                <ul className="mt-2 list-disc pl-5 text-paragraph-small text-content-tertiary">
                    <li>Listagem de agendamentos</li>
                    <li>Filtros por status, período e profissional</li>
                    <li>Escopo por unidade (controlado pelo menu)</li>
                    <li>Ações: cancelar, concluir, checkout</li>
                </ul>
            </div>
        </div>
    );
}
