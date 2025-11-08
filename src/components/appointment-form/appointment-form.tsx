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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Dog, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="tutorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-label-medium-size text-content-primary">
                                        Nome do tutor
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <User
                                                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                                                size={20}
                                            />
                                            <Input
                                                placeholder="Nome do tutor"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="petName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-label-medium-size text-content-primary">
                                        Nome do pet
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Dog
                                                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                                                size={20}
                                            />
                                            <Input
                                                placeholder="Nome do pet"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-label-medium-size text-content-primary">
                                        Descrição do serviço
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descrição do serviço"
                                            className="resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Agendar</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
