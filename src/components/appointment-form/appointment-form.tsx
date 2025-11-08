'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';

const appointmentFormSchema = z.object({
    tutorName: z
        .string()
        .min(3, 'O nome do tutor deve ter no mínimo 3 caracteres'),
    petName: z.string().min(3, 'O nome do pet deve ter no mínimo 3 caracteres'),
    phone: z.string().min(11, 'O telefone deve ter no mínimo 10 caracteres'),
    description: z
        .string()
        .min(3, 'A descrição deve ter no mínimo 3 caracteres'),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export const AppointmentForm = () => {
    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentFormSchema),
        defaultValues: {
            tutorName: '',
            petName: '',
            phone: '',
            description: '',
        },
    });

    const onSubmit = (data: AppointmentFormValues) => {
        console.log(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="brand">Agendar Consulta</Button>
            </DialogTrigger>

            <DialogContent
                variant="appointment"
                overlayVariant="blurred"
                showCloseButton
            >
                <DialogHeader>
                    <DialogTitle size="modal">Agendar Consulta</DialogTitle>
                    <DialogDescription size="modal">
                        Preencha o formulário abaixo para agendar uma consulta
                        para o seu pet.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="Nome do Tutor"
                            {...form.register('tutorName')}
                        />
                        <Button type="submit">Agendar</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
