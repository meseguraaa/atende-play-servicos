'use server';

import { prisma } from '@/lib/prisma';
import z from 'zod';

const appointmentFormSchema = z.object({
    tutorName: z.string(),
    petName: z.string(),
    phone: z.string(),
    description: z.string(),
    scheduleAt: z.date(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export async function createAppointment(data: any) {
    try {
        const parsedData = appointmentFormSchema.parse(data);
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
            where: {
                scheduleAt: parsedData.scheduleAt,
            },
        });

        if (existingAppointments) {
            return {
                error: 'Já existe um agendamento para esse horário',
            };
        }

        await prisma.appointment.create({
            data: {
                ...parsedData,
            },
        });

        return {
            success: true,
        };
    } catch (error) {
        return {
            error: 'Erro ao criar agendamento',
        };
    }
}
