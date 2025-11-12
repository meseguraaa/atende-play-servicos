'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const appointmentSchema = z.object({
    tutorName: z.string(),
    petName: z.string(),
    phone: z.string(),
    description: z.string(),
    scheduleAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
    try {
        const parsedData = appointmentSchema.parse(data);

        const { scheduleAt } = parsedData;
        const hour = scheduleAt.getHours();

        const isMorning = hour >= 9 && hour < 12;
        const isAfternoon = hour >= 13 && hour < 18;
        const isEvening = hour >= 18 && hour < 21;

        if (!isMorning && !isAfternoon && !isEvening) {
            return {
                error: 'Agendamentos só podem ser feitos entre 9h-12h, 13h-18h e 18h-21h',
            };
        }

        const existingAppointments = await prisma.appointment.findFirst({
            where: { scheduleAt },
        });

        if (existingAppointments) {
            return { error: 'Já existe um agendamento para esse horário' };
        }

        await prisma.appointment.create({ data: { ...parsedData } });
        revalidatePath('/');
    } catch (error) {
        console.log(error);
        return { error: 'Falha ao criar o agendamento' };
    }
}

export async function updateAppointment(id: string, data: AppointmentData) {
    try {
        const parsedData = appointmentSchema.parse(data);

        const { scheduleAt } = parsedData;
        const hour = scheduleAt.getHours();

        const isMorning = hour >= 9 && hour < 12;
        const isAfternoon = hour >= 13 && hour < 18;
        const isEvening = hour >= 18 && hour < 21;

        if (!isMorning && !isAfternoon && !isEvening) {
            return {
                error: 'Agendamentos só podem ser feitos entre 9h-12h, 13h-18h e 18h-21h',
            };
        }

        const existingAppointments = await prisma.appointment.findFirst({
            where: { scheduleAt, id: { not: id } },
        });

        if (existingAppointments) {
            return { error: 'Já existe um agendamento para esse horário' };
        }

        await prisma.appointment.update({
            where: { id },
            data: { ...parsedData },
        });
        revalidatePath('/');
    } catch (error) {
        console.log(error);
        return { error: 'Falha ao atualizar o agendamento' };
    }
}

export async function deleteAppointment(id: string) {
    try {
        await prisma.appointment.delete({ where: { id } });
        revalidatePath('/');
    } catch (error) {
        console.log(error);
        return { error: 'Falha ao excluir o agendamento' };
    }
}
