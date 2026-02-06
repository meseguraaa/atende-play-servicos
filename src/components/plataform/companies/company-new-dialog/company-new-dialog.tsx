// src/components/plataform/companies/company-new-dialog/company-new-dialog.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
    Building2,
    Hash,
    Layers,
    UserPlus,
    Mail,
    User,
    Phone,
    Trash2,
    Plus,
    KeyRound,
} from 'lucide-react';

type CompanySegment = 'BARBERSHOP' | 'AESTHETIC';

type OwnerDraft = {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
};

type CreateCompanyPayload = {
    name: string;
    slug: string | null;
    segment: CompanySegment | string;
    isActive: boolean;
    owners: Array<{
        name: string;
        email: string;
        phone?: string | null;
        password: string;
    }>;
};

type ApiResponse =
    | { ok: true; data?: any }
    | { ok: false; error?: string }
    | null;

const INPUT_BASE =
    'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';

function normalizeString(raw: unknown) {
    const s = String(raw ?? '').trim();
    return s.length ? s : '';
}

function normalizeSlug(raw: unknown): string | null {
    const s = String(raw ?? '').trim();
    if (!s) return null;

    const normalized = s
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-_]/g, '');

    return normalized.length ? normalized : null;
}

function isValidEmail(raw: string): boolean {
    const s = String(raw ?? '')
        .trim()
        .toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isValidPhoneLoose(raw: string): boolean {
    const s = String(raw ?? '').trim();
    if (!s) return true;
    const digits = s.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
}

function isValidPassword(raw: string): boolean {
    return String(raw ?? '').trim().length >= 8;
}

// ✅ input livre -> normaliza pro enum
function normalizeSegment(raw: unknown): CompanySegment {
    const s = String(raw ?? '')
        .trim()
        .toUpperCase();

    if (s === 'AESTHETIC' || s === 'ESTETICA' || s === 'ESTÉTICA')
        return 'AESTHETIC';
    return 'BARBERSHOP';
}

function IconInput(
    props: React.ComponentProps<typeof Input> & {
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }
) {
    const { icon: Icon, className, ...rest } = props;

    return (
        <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <Icon className="h-4 w-4 text-content-brand" />
            </div>

            <Input {...rest} className={cn('pl-10', className)} />
        </div>
    );
}

function newOwnerDraft(): OwnerDraft {
    return {
        id:
            crypto?.randomUUID?.() ??
            String(Date.now()) + String(Math.random()),
        name: '',
        email: '',
        phone: '',
        password: '',
    };
}

export function CompanyNewDialog() {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();

    // company fields
    const [name, setName] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [segmentRaw, setSegmentRaw] = React.useState('BARBERSHOP');
    const [isActive, setIsActive] = React.useState(true);

    // owners (required 1+)
    const [owners, setOwners] = React.useState<OwnerDraft[]>([newOwnerDraft()]);

    function resetForm() {
        setName('');
        setSlug('');
        setSegmentRaw('BARBERSHOP');
        setIsActive(true);
        setOwners([newOwnerDraft()]);
    }

    React.useEffect(() => {
        if (open) return;
        resetForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const normalizedSlug = React.useMemo(() => normalizeSlug(slug), [slug]);
    const normalizedSegment = React.useMemo(
        () => normalizeSegment(segmentRaw),
        [segmentRaw]
    );

    const ownersCleaned = React.useMemo(() => {
        const seen = new Set<string>();
        const list = owners
            .map((o) => ({
                id: o.id,
                name: normalizeString(o.name),
                email: normalizeString(o.email).toLowerCase(),
                phone: normalizeString(o.phone),
                password: String(o.password ?? '').trim(),
            }))
            .filter((o) => o.name || o.email || o.phone || o.password);

        const out: typeof list = [];
        for (const o of list) {
            const key = o.email || `${o.name}:${o.phone}`;
            if (key && seen.has(key)) continue;
            if (key) seen.add(key);
            out.push(o);
        }
        return out;
    }, [owners]);

    const ownerValidation = React.useMemo(() => {
        const validOwners = ownersCleaned.filter(
            (o) =>
                o.name &&
                o.email &&
                isValidEmail(o.email) &&
                isValidPassword(o.password)
        );

        const anyEmailInvalid = ownersCleaned.some(
            (o) => o.email && !isValidEmail(o.email)
        );
        const anyPhoneInvalid = ownersCleaned.some(
            (o) => o.phone && !isValidPhoneLoose(o.phone)
        );
        const anyPasswordInvalid = ownersCleaned.some(
            (o) => (o.name || o.email) && !isValidPassword(o.password)
        );

        const emails = ownersCleaned
            .map((o) => o.email)
            .filter(Boolean) as string[];
        const emailSet = new Set<string>();
        let hasDuplicateEmail = false;
        for (const e of emails) {
            if (emailSet.has(e)) {
                hasDuplicateEmail = true;
                break;
            }
            emailSet.add(e);
        }

        return {
            validOwners,
            anyEmailInvalid,
            anyPhoneInvalid,
            anyPasswordInvalid,
            hasDuplicateEmail,
            count: ownersCleaned.length,
        };
    }, [ownersCleaned]);

    const requiredInvalid = !name.trim();
    const ownersInvalid = ownerValidation.validOwners.length === 0;

    const formInvalid =
        requiredInvalid ||
        ownersInvalid ||
        ownerValidation.anyEmailInvalid ||
        ownerValidation.anyPhoneInvalid ||
        ownerValidation.anyPasswordInvalid ||
        ownerValidation.hasDuplicateEmail;

    function addOwner() {
        setOwners((prev) => [...prev, newOwnerDraft()]);
    }

    function removeOwner(id: string) {
        setOwners((prev) => {
            const next = prev.filter((o) => o.id !== id);
            return next.length ? next : [newOwnerDraft()];
        });
    }

    function updateOwner(id: string, patch: Partial<OwnerDraft>) {
        setOwners((prev) =>
            prev.map((o) => (o.id === id ? { ...o, ...patch } : o))
        );
    }

    function buildPayload(): CreateCompanyPayload {
        return {
            name: name.trim(),
            slug: normalizedSlug,
            segment: normalizedSegment, // ✅ manda normalizado
            isActive,
            owners: ownerValidation.validOwners.map((o) => ({
                name: o.name.trim(),
                email: o.email.trim().toLowerCase(),
                phone: o.phone ? o.phone.trim() : null,
                password: o.password,
            })),
        };
    }

    async function handleCreate() {
        if (formInvalid) {
            if (!name.trim())
                return toast.error('Nome da empresa é obrigatório.');
            if (ownerValidation.hasDuplicateEmail)
                return toast.error('Há e-mails duplicados na lista de donos.');
            if (ownerValidation.anyEmailInvalid)
                return toast.error('Corrija os e-mails inválidos dos donos.');
            if (ownerValidation.anyPhoneInvalid)
                return toast.error(
                    'Telefone inválido. Use 10 a 15 dígitos (DDI opcional).'
                );
            if (ownerValidation.anyPasswordInvalid)
                return toast.error('Senha inválida. Mínimo 8 caracteres.');
            return toast.error(
                'Crie pelo menos 1 admin dono (nome + e-mail válido + senha).'
            );
        }

        const payload = buildPayload();

        startTransition(async () => {
            try {
                const res = await fetch('/api/plataform/companies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const json = (await res
                    .json()
                    .catch(() => null)) as ApiResponse;

                if (!res.ok || !json || (json as any).ok !== true) {
                    const msg =
                        (json as any)?.error ||
                        'Não foi possível criar a empresa. Tente novamente.';
                    toast.error(msg);
                    return;
                }

                toast.success('Empresa criada com sucesso!');
                setOpen(false);
                router.refresh();
            } catch {
                toast.error('Erro de rede ao criar empresa.');
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !isPending && setOpen(v)}>
            <DialogTrigger asChild>
                <Button variant="brand">Nova empresa</Button>
            </DialogTrigger>

            <DialogContent className="bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-title text-content-primary">
                        Nova empresa
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pb-2">
                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Nome da empresa{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <IconInput
                            icon={Building2}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isPending}
                            className={INPUT_BASE}
                            placeholder="Ex: Barbearia do João"
                        />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Slug (opcional)
                            </label>
                            <IconInput
                                icon={Hash}
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                disabled={isPending}
                                className={INPUT_BASE}
                                placeholder="ex: atendeplay"
                            />
                            <p className="text-[11px] text-content-secondary/70">
                                Normaliza para URL:{' '}
                                <span className="text-content-primary">
                                    {normalizedSlug ?? '—'}
                                </span>
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-label-small text-content-secondary">
                                Segmento (input)
                            </label>
                            <IconInput
                                icon={Layers}
                                value={segmentRaw}
                                onChange={(e) => setSegmentRaw(e.target.value)}
                                disabled={isPending}
                                className={INPUT_BASE}
                                placeholder="BARBERSHOP ou AESTHETIC"
                            />
                            <p className="text-[11px] text-content-secondary/70">
                                Vai salvar como:{' '}
                                <span className="text-content-primary">
                                    {normalizedSegment}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Donos */}
                    <div className="space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-content-primary">
                                    Admins donos{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <p className="text-[11px] text-content-secondary/70">
                                    Obrigatório criar 1+ donos agora. Eles terão
                                    acesso ao Admin e precisam de senha.
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="h-9"
                                onClick={addOwner}
                                disabled={isPending}
                                title="Adicionar dono"
                            >
                                <span className="inline-flex items-center gap-2 text-xs">
                                    <Plus className="h-4 w-4" />
                                    Adicionar
                                </span>
                            </Button>
                        </div>

                        <div className="space-y-3 pt-2">
                            {owners.map((o, idx) => {
                                const emailOk =
                                    !o.email.trim() || isValidEmail(o.email);
                                const phoneOk = isValidPhoneLoose(o.phone);
                                const passOk =
                                    !o.password.trim() ||
                                    isValidPassword(o.password);

                                return (
                                    <div
                                        key={o.id}
                                        className="rounded-xl border border-border-primary bg-background-secondary p-3"
                                    >
                                        <div className="flex items-center justify-between gap-3 pb-2">
                                            <div className="inline-flex items-center gap-2">
                                                <UserPlus className="h-4 w-4 text-content-brand" />
                                                <p className="text-sm font-semibold text-content-primary">
                                                    Dono {idx + 1}
                                                </p>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="h-8 px-2"
                                                onClick={() =>
                                                    removeOwner(o.id)
                                                }
                                                disabled={isPending}
                                                title="Remover dono"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <div className="space-y-2 sm:col-span-1">
                                                <label className="text-label-small text-content-secondary">
                                                    Nome{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <IconInput
                                                    icon={User}
                                                    value={o.name}
                                                    onChange={(e) =>
                                                        updateOwner(o.id, {
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    disabled={isPending}
                                                    className={INPUT_BASE}
                                                    placeholder="Ex: Bruno Leal"
                                                />
                                            </div>

                                            <div className="space-y-2 sm:col-span-1">
                                                <label className="text-label-small text-content-secondary">
                                                    E-mail{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <IconInput
                                                    icon={Mail}
                                                    value={o.email}
                                                    onChange={(e) =>
                                                        updateOwner(o.id, {
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    disabled={isPending}
                                                    className={cn(
                                                        INPUT_BASE,
                                                        emailOk
                                                            ? ''
                                                            : 'border-red-500/60'
                                                    )}
                                                    placeholder="email@dominio.com"
                                                    inputMode="email"
                                                />
                                                {!emailOk ? (
                                                    <p className="text-[11px] text-red-500">
                                                        E-mail inválido.
                                                    </p>
                                                ) : null}
                                            </div>

                                            <div className="space-y-2 sm:col-span-1">
                                                <label className="text-label-small text-content-secondary">
                                                    Telefone (opcional)
                                                </label>
                                                <IconInput
                                                    icon={Phone}
                                                    value={o.phone}
                                                    onChange={(e) =>
                                                        updateOwner(o.id, {
                                                            phone: e.target
                                                                .value,
                                                        })
                                                    }
                                                    disabled={isPending}
                                                    className={cn(
                                                        INPUT_BASE,
                                                        phoneOk
                                                            ? ''
                                                            : 'border-red-500/60'
                                                    )}
                                                    placeholder="(11) 99999-9999"
                                                    inputMode="tel"
                                                />
                                                {!phoneOk ? (
                                                    <p className="text-[11px] text-red-500">
                                                        Telefone inválido (10 a
                                                        15 dígitos).
                                                    </p>
                                                ) : null}
                                            </div>

                                            <div className="space-y-2 sm:col-span-3">
                                                <label className="text-label-small text-content-secondary">
                                                    Senha{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <IconInput
                                                    icon={KeyRound}
                                                    value={o.password}
                                                    onChange={(e) =>
                                                        updateOwner(o.id, {
                                                            password:
                                                                e.target.value,
                                                        })
                                                    }
                                                    disabled={isPending}
                                                    className={cn(
                                                        INPUT_BASE,
                                                        passOk
                                                            ? ''
                                                            : 'border-red-500/60'
                                                    )}
                                                    placeholder="mínimo 8 caracteres"
                                                    type="password"
                                                />
                                                {!passOk ? (
                                                    <p className="text-[11px] text-red-500">
                                                        Senha inválida (mínimo 8
                                                        caracteres).
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {ownersInvalid ? (
                            <p className="pt-1 text-[11px] text-red-500">
                                Você precisa informar pelo menos 1 dono com
                                nome, e-mail válido e senha.
                            </p>
                        ) : null}

                        {ownerValidation.hasDuplicateEmail ? (
                            <p className="pt-1 text-[11px] text-red-500">
                                Existem e-mails duplicados na lista de donos.
                            </p>
                        ) : null}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="brand"
                            disabled={isPending || formInvalid}
                            onClick={handleCreate}
                            title={
                                !name.trim()
                                    ? 'Preencha o nome da empresa'
                                    : ownersInvalid
                                      ? 'Adicione pelo menos 1 dono válido'
                                      : ownerValidation.hasDuplicateEmail
                                        ? 'Remova e-mails duplicados'
                                        : ownerValidation.anyEmailInvalid
                                          ? 'Corrija e-mails inválidos'
                                          : ownerValidation.anyPhoneInvalid
                                            ? 'Corrija telefones inválidos'
                                            : ownerValidation.anyPasswordInvalid
                                              ? 'Senha mínimo 8 caracteres'
                                              : undefined
                            }
                        >
                            {isPending ? 'Criando...' : 'Criar empresa'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
