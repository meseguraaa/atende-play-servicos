// src/components/plataform/companies/company-edit-dialog/company-edit-dialog.tsx
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
    Pencil,
    KeyRound,
    Loader2,
} from 'lucide-react';

type CompanySegment = 'BARBERSHOP' | 'AESTHETIC';

export type CompanyForEdit = {
    id: string;
    name: string;
    slug: string | null;
    segment: CompanySegment | string;
    isActive: boolean;
};

type OwnerFromApi = {
    userId: string;
    name: string | null;
    email: string;
    phone: string | null;
    isActive: boolean;
};

type CompanyGetResponse =
    | { ok: true; data: { company: CompanyForEdit; owners: OwnerFromApi[] } }
    | { ok: false; error?: string };

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

function normalizeSegment(raw: unknown): CompanySegment {
    const s = String(raw ?? '')
        .trim()
        .toUpperCase();

    if (s === 'AESTHETIC' || s === 'ESTETICA' || s === 'ESTÉTICA')
        return 'AESTHETIC';
    return 'BARBERSHOP';
}

function isValidPassword(raw: string): boolean {
    return String(raw ?? '').trim().length >= 8;
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

type OwnerPasswordDraft = {
    userId: string;
    email: string;
    newPassword: string;
};

export function CompanyEditDialog({
    company,
    triggerVariant = 'outline',
    triggerLabel = 'Editar',
}: {
    company: CompanyForEdit;
    triggerVariant?: React.ComponentProps<typeof Button>['variant'];
    triggerLabel?: string;
}) {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();

    const [loading, setLoading] = React.useState(false);

    const [name, setName] = React.useState(company.name ?? '');
    const [slug, setSlug] = React.useState(company.slug ?? '');
    const [segmentRaw, setSegmentRaw] = React.useState(
        String(company.segment ?? 'BARBERSHOP')
    );
    const [isActive, setIsActive] = React.useState<boolean>(
        Boolean(company.isActive)
    );

    const [owners, setOwners] = React.useState<OwnerFromApi[]>([]);
    const [ownerPass, setOwnerPass] = React.useState<OwnerPasswordDraft[]>([]);

    const normalizedSlug = React.useMemo(() => normalizeSlug(slug), [slug]);
    const normalizedSegment = React.useMemo(
        () => normalizeSegment(segmentRaw),
        [segmentRaw]
    );

    React.useEffect(() => {
        if (!open) return;

        let alive = true;

        async function load() {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/plataform/companies/${company.id}`,
                    { method: 'GET' }
                );
                const json = (await res
                    .json()
                    .catch(() => null)) as CompanyGetResponse | null;

                if (!alive) return;

                if (!res.ok || !json || (json as any).ok !== true) {
                    toast.error(
                        (json as any)?.error ||
                            'Não foi possível carregar a empresa.'
                    );
                    setOwners([]);
                    setOwnerPass([]);
                    return;
                }

                const data = (json as any).data;

                setName(data.company.name ?? '');
                setSlug(data.company.slug ?? '');
                setSegmentRaw(String(data.company.segment ?? 'BARBERSHOP'));
                setIsActive(Boolean(data.company.isActive));

                const list: OwnerFromApi[] = Array.isArray(data.owners)
                    ? data.owners
                    : [];
                setOwners(list);

                // prepara drafts de senha (vazios)
                setOwnerPass(
                    list.map((o) => ({
                        userId: o.userId,
                        email: o.email,
                        newPassword: '',
                    }))
                );
            } catch {
                if (!alive) return;
                toast.error('Erro de rede ao carregar empresa.');
            } finally {
                if (!alive) return;
                setLoading(false);
            }
        }

        void load();

        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const requiredInvalid = !name.trim();

    const anyOwnerPasswordInvalid = ownerPass.some(
        (o) =>
            o.newPassword.trim().length > 0 && !isValidPassword(o.newPassword)
    );

    const formInvalid = requiredInvalid || anyOwnerPasswordInvalid || loading;

    function setOwnerPassword(userId: string, value: string) {
        setOwnerPass((prev) =>
            prev.map((o) =>
                o.userId === userId ? { ...o, newPassword: value } : o
            )
        );
    }

    function buildPayload() {
        const ownerPasswordResets = ownerPass
            .filter((o) => o.newPassword.trim().length > 0)
            .map((o) => ({
                userId: o.userId,
                email: o.email,
                password: o.newPassword.trim(),
            }));

        return {
            update: {
                name: normalizeString(name),
                slug: normalizedSlug, // pode ser null
                segment: normalizedSegment,
                isActive,
                ownerPasswordResets,
            },
        };
    }

    async function handleSave() {
        if (formInvalid) {
            if (!name.trim())
                return toast.error('Nome da empresa é obrigatório.');
            if (anyOwnerPasswordInvalid)
                return toast.error('Senha inválida (mínimo 8 caracteres).');
            return toast.error('Corrija o formulário antes de salvar.');
        }

        const payload = buildPayload();

        startTransition(async () => {
            try {
                const res = await fetch(
                    `/api/plataform/companies/${company.id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }
                );

                const json = (await res.json().catch(() => null)) as
                    | { ok: true; data?: any }
                    | { ok: false; error?: string }
                    | null;

                if (!res.ok || !json || (json as any).ok !== true) {
                    toast.error(
                        (json as any)?.error ||
                            'Não foi possível salvar a empresa.'
                    );
                    return;
                }

                toast.success('Empresa atualizada!');
                setOpen(false);
                router.refresh();
            } catch {
                toast.error('Erro de rede ao salvar empresa.');
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !isPending && setOpen(v)}>
            <DialogTrigger asChild>
                <Button
                    variant={triggerVariant}
                    size="sm"
                    className="border-border-primary hover:bg-muted/40"
                    type="button"
                >
                    <span className="inline-flex items-center gap-2">
                        <Pencil className="h-4 w-4" />
                        {triggerLabel}
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-title text-content-primary">
                        Editar empresa
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center gap-2 py-8 text-sm text-content-secondary">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Carregando...
                    </div>
                ) : (
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
                                    onChange={(e) =>
                                        setSegmentRaw(e.target.value)
                                    }
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

                        <div className="space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-medium text-content-primary">
                                        Status
                                    </p>
                                    <p className="text-[11px] text-content-secondary/70">
                                        Ative/desative sem apagar dados.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant={isActive ? 'outline' : 'brand'}
                                        className="h-9"
                                        disabled={isPending}
                                        onClick={() => setIsActive(false)}
                                    >
                                        Inativa
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={isActive ? 'brand' : 'outline'}
                                        className="h-9"
                                        disabled={isPending}
                                        onClick={() => setIsActive(true)}
                                    >
                                        Ativa
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* ✅ Reset de senha dos donos */}
                        <div className="space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3">
                            <div>
                                <p className="text-sm font-medium text-content-primary">
                                    Donos (reset de senha)
                                </p>
                                <p className="text-[11px] text-content-secondary/70">
                                    Preencha só se quiser trocar a senha. Mínimo
                                    8 caracteres.
                                </p>
                            </div>

                            {owners.length === 0 ? (
                                <p className="text-xs text-content-secondary">
                                    Nenhum dono ativo encontrado.
                                </p>
                            ) : (
                                <div className="space-y-3 pt-2">
                                    {owners.map((o) => {
                                        const draft = ownerPass.find(
                                            (d) => d.userId === o.userId
                                        );
                                        const pass = draft?.newPassword ?? '';
                                        const passOk =
                                            pass.trim().length === 0 ||
                                            isValidPassword(pass);

                                        return (
                                            <div
                                                key={o.userId}
                                                className="rounded-xl border border-border-primary bg-background-secondary p-3"
                                            >
                                                <div className="flex items-center justify-between gap-3 pb-2">
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-content-primary">
                                                            {o.name ?? '—'}
                                                        </p>
                                                        <p className="truncate text-xs text-content-secondary">
                                                            {o.email}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-label-small text-content-secondary">
                                                        Nova senha (opcional)
                                                    </label>
                                                    <IconInput
                                                        icon={KeyRound}
                                                        value={pass}
                                                        onChange={(e) =>
                                                            setOwnerPassword(
                                                                o.userId,
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={isPending}
                                                        className={cn(
                                                            INPUT_BASE,
                                                            passOk
                                                                ? ''
                                                                : 'border-red-500/60'
                                                        )}
                                                        type="password"
                                                        placeholder="mínimo 8 caracteres"
                                                    />
                                                    {!passOk ? (
                                                        <p className="text-[11px] text-red-500">
                                                            Senha inválida
                                                            (mínimo 8
                                                            caracteres).
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="brand"
                                disabled={isPending || formInvalid}
                                onClick={handleSave}
                                title={
                                    !name.trim()
                                        ? 'Preencha o nome da empresa'
                                        : anyOwnerPasswordInvalid
                                          ? 'Senha mínimo 8 caracteres'
                                          : undefined
                                }
                            >
                                {isPending ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
