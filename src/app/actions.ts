'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

/* ---------------------------------------------------------
 * Schema
 * ---------------------------------------------------------*/
const appointmentSchema = z.object({
    tutorName: z.string(),
    petName: z.string(),
    phone: z.string(),
    description: z.string(),
    scheduleAt: z.date(),
});

export type AppointmentData = z.infer<typeof appointmentSchema>;

/* ---------------------------------------------------------
 * Tabela de janelas de horários (manhã, tarde, noite)
 * ---------------------------------------------------------*/
const SCHEDULE_WINDOWS = [
    { label: 'manhã', start: 9, end: 12 },
    { label: 'tarde', start: 13, end: 18 },
    { label: 'noite', start: 18, end: 21 },
] as const;

/* ---------------------------------------------------------
 * Validação de horário permitido (manhã/tarde/noite)
 * ---------------------------------------------------------*/
function validateScheduleWindow(scheduleAt: Date): string | null {
    const hour = scheduleAt.getHours();

    const isValid = SCHEDULE_WINDOWS.some(
        (window) => hour >= window.start && hour < window.end
    );

    if (!isValid) {
        const allowed = SCHEDULE_WINDOWS.map(
            (w) => `${w.start}h-${w.end}h`
        ).join(', ');

        return `Agendamentos só podem ser feitos entre ${allowed}`;
    }

    return null;
}

/* ---------------------------------------------------------
 * Checar se existe outro agendamento no mesmo horário
 * ---------------------------------------------------------*/
async function ensureAvailability(
    scheduleAt: Date,
    excludeId?: string
): Promise<string | null> {
    const existing = await prisma.appointment.findFirst({
        where: {
            scheduleAt,
            ...(excludeId && { id: { not: excludeId } }),
        },
    });

    if (existing) {
        return 'Já existe um agendamento para esse horário';
    }

    return null;
}

/* ---------------------------------------------------------
 * Wrapper para operações com try/catch + revalidate
 * ---------------------------------------------------------*/
async function withAppointmentMutation(
    operation: () => Promise<void>,
    defaultError: string
) {
    try {
        await operation();
        revalidatePath('/');
    } catch (err) {
        console.log(err);
        return { error: defaultError };
    }
}

/* ---------------------------------------------------------
 * CREATE
 * ---------------------------------------------------------*/
export async function createAppointment(data: AppointmentData) {
    const parsed = appointmentSchema.parse(data);
    const { scheduleAt } = parsed;

    const scheduleError = validateScheduleWindow(scheduleAt);
    if (scheduleError) return { error: scheduleError };

    const availabilityError = await ensureAvailability(scheduleAt);
    if (availabilityError) return { error: availabilityError };

    return withAppointmentMutation(async () => {
        await prisma.appointment.create({ data: parsed });
    }, 'Falha ao criar o agendamento');
}

/* ---------------------------------------------------------
 * UPDATE
 * ---------------------------------------------------------*/
export async function updateAppointment(id: string, data: AppointmentData) {
    const parsed = appointmentSchema.parse(data);
    const { scheduleAt } = parsed;

    const scheduleError = validateScheduleWindow(scheduleAt);
    if (scheduleError) return { error: scheduleError };

    const availabilityError = await ensureAvailability(scheduleAt, id);
    if (availabilityError) return { error: availabilityError };

    return withAppointmentMutation(async () => {
        await prisma.appointment.update({
            where: { id },
            data: parsed,
        });
    }, 'Falha ao atualizar o agendamento');
}

/* ---------------------------------------------------------
 * DELETE
 * ---------------------------------------------------------*/
export async function deleteAppointment(id: string) {
    return withAppointmentMutation(async () => {
        await prisma.appointment.delete({ where: { id } });
    }, 'Falha ao excluir o agendamento');
}
