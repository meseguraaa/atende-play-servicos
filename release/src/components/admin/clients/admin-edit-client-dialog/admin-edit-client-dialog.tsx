// src/components/admin/clients/admin-edit-client-dialog/admin-edit-client-dialog.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Calendar as CalendarIcon } from 'lucide-react';

type AdminEditClientDialogProps = {
    client: {
        id: string;
        name: string;
        email: string;
        phone: string;
        birthday: Date | null;
    };
};

// máscara tel: (99) 99999-9999
function formatPhone(value: string): string {
    const digits = String(value ?? '')
        .replace(/\D/g, '')
        .slice(0, 11);

    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatBirthdayToDisplay(date: Date | null): string {
    if (!date) return '';
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
}

function isValidBirthdayDisplay(display: string): boolean {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(display);
}

export function AdminEditClientDialog({ client }: AdminEditClientDialogProps) {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();

    const [name, setName] = React.useState(client.name ?? '');
    const [email, setEmail] = React.useState(client.email ?? '');
    const [phone, setPhone] = React.useState(formatPhone(client.phone ?? ''));
    const [birthdayInput, setBirthdayInput] = React.useState(
        formatBirthdayToDisplay(client.birthday)
    );

    // ✅ garante que ao abrir (e ao trocar o cliente) os campos refletem o client atual
    React.useEffect(() => {
        if (!open) return;

        setName(client.name ?? '');
        setEmail(client.email ?? '');
        setPhone(formatPhone(client.phone ?? ''));
        setBirthdayInput(formatBirthdayToDisplay(client.birthday));
    }, [
        open,
        client.id,
        client.name,
        client.email,
        client.phone,
        client.birthday,
    ]);

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPhone(formatPhone(e.target.value));
    }

    function handleBirthdayChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/\D/g, '').slice(0, 8);

        if (value.length >= 5) {
            value = value.replace(
                /(\d{2})(\d{2})(\d{0,4})/,
                (_, d, m, y) => `${d}/${m}/${y}`
            );
        } else if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{0,2})/, (_, d, m) =>
                m ? `${d}/${m}` : d
            );
        }

        setBirthdayInput(value);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isPending) return;

        const n = name.trim();
        const em = email.trim().toLowerCase();
        const p = phone.trim();
        const b = birthdayInput.trim();

        if (!n) return toast.error('Informe o nome do cliente.');
        if (!em) return toast.error('Informe o e-mail do cliente.');
        if (!p) return toast.error('Informe o telefone do cliente.');
        if (!b) return toast.error('Informe a data de nascimento.');
        if (!isValidBirthdayDisplay(b)) {
            return toast.error(
                'Preencha a data de nascimento no formato DD/MM/AAAA.'
            );
        }

        const phoneDigits = p.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            return toast.error('Informe um telefone válido (com DDD).');
        }

        startTransition(async () => {
            try {
                const res = await fetch('/api/admin/clients', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: client.id,
                        name: n,
                        email: em,
                        phone: p,
                        birthday: b, // DD/MM/AAAA (api aceita)
                    }),
                });

                const json = (await res.json().catch(() => null)) as
                    | { ok: true; data: any }
                    | { ok: false; error: string }
                    | null;

                if (!res.ok || !json || (json as any).ok === false) {
                    const msg =
                        (json as any)?.error ||
                        `Erro ao atualizar cliente. (${res.status})`;
                    toast.error(msg);
                    return;
                }

                toast.success('Cliente atualizado com sucesso!');
                setOpen(false);
                router.refresh();
            } catch {
                toast.error('Falha de rede ao atualizar cliente.');
            }
        });
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (isPending) return;
                setOpen(next);
            }}
        >
            <DialogTrigger asChild>
                <Button
                    variant="brand"
                    size="sm"
                    className="border-border-primary text-paragraph-small"
                >
                    Editar
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-background-secondary border border-border-primary">
                <DialogHeader>
                    <DialogTitle className="text-title text-content-primary">
                        Editar cliente
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* NOME */}
                    <div className="space-y-1">
                        <label
                            className="text-label-small text-content-secondary"
                            htmlFor={`client-name-${client.id}`}
                        >
                            Nome <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id={`client-name-${client.id}`}
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isPending}
                            className="bg-background-tertiary border-border-primary text-content-primary"
                        />
                    </div>

                    {/* E-MAIL */}
                    <div className="space-y-1">
                        <label
                            className="text-label-small text-content-secondary"
                            htmlFor={`client-email-${client.id}`}
                        >
                            E-mail <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id={`client-email-${client.id}`}
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isPending}
                            className="bg-background-tertiary border-border-primary text-content-primary"
                        />
                    </div>

                    {/* TELEFONE */}
                    <div className="space-y-1">
                        <label
                            className="text-label-small text-content-secondary"
                            htmlFor={`client-phone-${client.id}`}
                        >
                            Telefone <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id={`client-phone-${client.id}`}
                            name="phone"
                            type="tel"
                            placeholder="(99) 99999-9999"
                            value={phone}
                            onChange={handlePhoneChange}
                            disabled={isPending}
                            className="bg-background-tertiary border-border-primary text-content-primary"
                        />
                    </div>

                    {/* DATA DE NASCIMENTO */}
                    <div className="space-y-1">
                        <label
                            className="text-label-small text-content-secondary"
                            htmlFor={`client-birthday-${client.id}`}
                        >
                            Data de nascimento{' '}
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="flex items-center gap-2 rounded-lg border border-border-primary bg-background-tertiary px-3 py-2 focus-within:ring-2 focus-within:ring-brand-primary">
                            <CalendarIcon className="w-4 h-4 text-brand-primary" />
                            <input
                                id={`client-birthday-${client.id}`}
                                name="birthday"
                                type="text"
                                inputMode="numeric"
                                placeholder="DD/MM/AAAA"
                                value={birthdayInput}
                                onChange={handleBirthdayChange}
                                disabled={isPending}
                                className="flex-1 bg-transparent outline-none border-0 text-paragraph-small-size text-content-primary placeholder:text-content-tertiary"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="submit"
                            variant="brand"
                            disabled={isPending}
                        >
                            {isPending ? 'Salvando...' : 'Salvar alterações'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
