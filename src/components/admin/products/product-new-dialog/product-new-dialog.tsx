// src/components/product-new-dialog/product-new-dialog.tsx
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
import { Textarea } from '@/components/ui/textarea';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import {
    Building2,
    Package,
    Image as ImageIcon,
    AlignLeft,
    Wallet,
    Scissors,
    Boxes,
    Tag as TagIcon,
    Clock,
    Cake,
    BadgePercent,
    Upload,
    X,
} from 'lucide-react';

type UnitOption = {
    id: string;
    name: string;
    isActive: boolean;
};

type CustomerLevel = 'BRONZE' | 'PRATA' | 'OURO' | 'DIAMANTE';

const LEVEL_OPTIONS: Array<{ value: CustomerLevel; label: string }> = [
    { value: 'BRONZE', label: 'Bronze' },
    { value: 'PRATA', label: 'Prata' },
    { value: 'OURO', label: 'Ouro' },
    { value: 'DIAMANTE', label: 'Diamante' },
];

type UploadResponse =
    | {
          ok: true;
          data: {
              url: string;
              key: string;
              mime: string;
              size: number;
              originalName: string;
              module?: 'PRODUCTS' | 'PROFESSIONALS';
              category?: 'products' | 'professionals';
          };
      }
    | { ok: false; error?: string };

const MAX_UPLOAD_MB = 5;
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

function toMoneyNumber(raw: string): number {
    const s = String(raw ?? '')
        .trim()
        .replace(/\s/g, '')
        .replace(',', '.');
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
}

function clampPct(raw: string): number | null {
    const s = String(raw ?? '').trim();
    if (!s) return null;
    const n = Number(s.replace(',', '.'));
    if (!Number.isFinite(n)) return null;
    return Math.max(0, Math.min(100, Math.floor(n)));
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

const INPUT_BASE =
    'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';

const INPUT_SECONDARY =
    'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';

const SELECT_TRIGGER =
    'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand';

// ✅ Mantém o front alinhado com a validação do backend
function normalizeUploadedImageUrl(raw: string): string {
    const s = String(raw ?? '').trim();
    if (!s) return '';

    const lowered = s.toLowerCase();

    // preview local do browser, nunca deve ir pro backend
    if (lowered.startsWith('blob:')) return '';

    // se vier "uploads/..." sem barra, normaliza
    if (s.startsWith('uploads/')) return `/${s}`;

    return s;
}

function isAcceptableImageUrlForApi(url: string): boolean {
    const s = String(url ?? '').trim();
    if (!s) return false;

    const lowered = s.toLowerCase();
    if (lowered.startsWith('javascript:')) return false;
    if (lowered.startsWith('data:')) return false;
    if (lowered.startsWith('blob:')) return false;

    // backend aceita /uploads/...
    if (s.startsWith('/uploads/')) return true;

    // backend aceita URL absoluta
    if (lowered.startsWith('http://') || lowered.startsWith('https://'))
        return true;

    return false;
}

export function ProductNewDialog({
    units = [],
}: {
    units?: UnitOption[];
    defaultUnitId?: string | null; // compat
    canSeeAllUnits?: boolean; // compat
}) {
    const router = useRouter();
    const hasUnits = units.length > 0;

    const firstActiveUnitId = React.useMemo(() => {
        return units.find((u) => u.isActive)?.id ?? '';
    }, [units]);

    const [open, setOpen] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();

    const [selectedUnitId, setSelectedUnitId] =
        React.useState<string>(firstActiveUnitId);

    const [isFeatured, setIsFeatured] = React.useState(false);

    const [name, setName] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState(''); // preenchido pelo upload (opcional)
    const [description, setDescription] = React.useState('');

    const [price, setPrice] = React.useState('');
    const [barberPercentage, setBarberPercentage] = React.useState('');
    const [stockQuantity, setStockQuantity] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [pickupDeadlineDays, setPickupDeadlineDays] = React.useState('2');

    const [birthdayEnabled, setBirthdayEnabled] = React.useState(false);
    const [birthdayLevel, setBirthdayLevel] =
        React.useState<CustomerLevel>('DIAMANTE');

    const [levelDiscounts, setLevelDiscounts] = React.useState<
        Record<CustomerLevel, string>
    >({
        BRONZE: '',
        PRATA: '',
        OURO: '',
        DIAMANTE: '',
    });

    // upload UI state
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [uploadingImage, setUploadingImage] = React.useState(false);

    React.useEffect(() => {
        if (!open) return;
        setSelectedUnitId((prev) => prev || firstActiveUnitId);
    }, [open, firstActiveUnitId]);

    function resetForm() {
        setSelectedUnitId(firstActiveUnitId);
        setIsFeatured(false);

        setName('');
        setImageUrl('');
        setDescription('');

        setPrice('');
        setBarberPercentage('');
        setStockQuantity('');
        setCategory('');
        setPickupDeadlineDays('2');

        setBirthdayEnabled(false);
        setBirthdayLevel('DIAMANTE');

        setLevelDiscounts({ BRONZE: '', PRATA: '', OURO: '', DIAMANTE: '' });
        setUploadingImage(false);

        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    const unitInvalid = !hasUnits || !selectedUnitId;
    const birthdayInvalid = birthdayEnabled && !birthdayLevel;

    // ✅ imagem NÃO é obrigatória aqui (backend também não exige mais)
    const requiredInvalid =
        !name.trim() ||
        !description.trim() ||
        !category.trim() ||
        !price.trim() ||
        !barberPercentage.trim() ||
        !stockQuantity.trim() ||
        !pickupDeadlineDays.trim();

    const formInvalid =
        unitInvalid || birthdayInvalid || requiredInvalid || uploadingImage;

    async function uploadImage(file: File) {
        // validações client-side (UX + evita bater no limite do server)
        if (!file.type?.startsWith('image/')) {
            toast.error('Selecione um arquivo de imagem.');
            return;
        }
        if (file.size > MAX_UPLOAD_BYTES) {
            toast.error(`Imagem muito grande. Máximo: ${MAX_UPLOAD_MB}MB.`);
            return;
        }

        setUploadingImage(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('module', 'PRODUCTS');

            const res = await fetch('/api/admin/uploads', {
                method: 'POST',
                body: fd,
            });

            const json = (await res
                .json()
                .catch(() => null)) as UploadResponse | null;

            if (!res.ok || !json || json.ok !== true) {
                const msg =
                    (json && json.ok === false && json.error) ||
                    'Não foi possível fazer upload da imagem.';
                toast.error(msg);
                return;
            }

            const normalized = normalizeUploadedImageUrl(json.data.url);

            // ✅ proteção extra: se o upload devolver algo fora do padrão aceito no backend,
            // não salvamos e mostramos um erro claro (pra não “travar” depois no POST)
            if (!isAcceptableImageUrlForApi(normalized)) {
                toast.error(
                    'Upload retornou uma URL inválida para o produto. O esperado é /uploads/... ou http(s).'
                );
                return;
            }

            setImageUrl(normalized);
            toast.success('Imagem enviada!');
        } catch {
            toast.error('Erro de rede ao fazer upload da imagem.');
        } finally {
            setUploadingImage(false);
        }
    }

    function buildPayload() {
        const priceN = toMoneyNumber(price);
        const barberPct = Number(String(barberPercentage).replace(',', '.'));
        const stockN = Number(String(stockQuantity).replace(',', '.'));
        const deadlineN = Number(String(pickupDeadlineDays).replace(',', '.'));

        const discounts: Partial<Record<CustomerLevel, number>> = {};
        (Object.keys(levelDiscounts) as CustomerLevel[]).forEach((lvl) => {
            const pct = clampPct(levelDiscounts[lvl]);
            if (pct !== null) discounts[lvl] = pct;
        });

        const payload: any = {
            unitId: selectedUnitId,
            name: name.trim(),
            description: description.trim(),
            category: category.trim(),

            price: priceN,
            barberPercentage: barberPct,

            stockQuantity: stockN,
            pickupDeadlineDays: deadlineN,

            isActive: true,
            isFeatured,

            birthdayBenefitEnabled: birthdayEnabled,
            birthdayPriceLevel: birthdayEnabled ? birthdayLevel : null,

            levelDiscounts: discounts,
        };

        // ✅ só manda imageUrl se existir
        const img = imageUrl.trim();
        if (img) payload.imageUrl = img;

        return payload;
    }

    async function handleCreate() {
        if (formInvalid) {
            toast.error('Preencha os campos obrigatórios antes de criar.');
            return;
        }

        const payload = buildPayload();

        if (!Number.isFinite(payload.price) || payload.price <= 0) {
            toast.error('Preço inválido.');
            return;
        }
        if (
            !Number.isFinite(payload.barberPercentage) ||
            payload.barberPercentage < 0 ||
            payload.barberPercentage > 100
        ) {
            toast.error('Porcentagem do barbeiro inválida (0 a 100).');
            return;
        }
        if (
            !Number.isFinite(payload.stockQuantity) ||
            payload.stockQuantity < 0
        ) {
            toast.error('Estoque inválido.');
            return;
        }
        if (
            !Number.isFinite(payload.pickupDeadlineDays) ||
            payload.pickupDeadlineDays < 1 ||
            payload.pickupDeadlineDays > 30
        ) {
            toast.error('Prazo para retirada inválido (1 a 30).');
            return;
        }

        startTransition(async () => {
            try {
                const res = await fetch('/api/admin/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const json = (await res.json().catch(() => null)) as
                    | { ok: true; data?: any }
                    | { ok: false; error?: string }
                    | null;

                if (!res.ok || !json || (json as any).ok !== true) {
                    const msg =
                        (json as any)?.error ||
                        'Não foi possível criar o produto. Tente novamente.';
                    toast.error(msg);
                    return;
                }

                toast.success('Produto criado com sucesso!');
                setOpen(false);
                resetForm();
                router.refresh();
            } catch {
                toast.error('Erro de rede ao criar produto.');
            }
        });
    }

    const previewUrl = imageUrl.trim() ? imageUrl.trim() : null;

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => !isPending && !uploadingImage && setOpen(v)}
        >
            <DialogTrigger asChild>
                <Button variant="brand">Novo produto</Button>
            </DialogTrigger>

            <DialogContent className="bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-title text-content-primary">
                        Novo produto
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pb-2">
                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Unidade do estoque{' '}
                            <span className="text-red-500">*</span>
                        </label>

                        <Select
                            value={selectedUnitId}
                            onValueChange={(v) => setSelectedUnitId(v)}
                            disabled={!hasUnits || isPending}
                        >
                            <SelectTrigger className={SELECT_TRIGGER}>
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-content-brand" />
                                    <SelectValue
                                        placeholder={
                                            hasUnits
                                                ? 'Selecione a unidade'
                                                : 'Nenhuma unidade cadastrada'
                                        }
                                    />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {units.map((u) => (
                                    <SelectItem
                                        key={u.id}
                                        value={u.id}
                                        disabled={!u.isActive}
                                    >
                                        {u.name}{' '}
                                        {!u.isActive ? '(inativa)' : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-content-primary">
                                    ⭐ Destaque no app
                                </p>
                                <p className="text-xs text-content-secondary">
                                    Quando ativo, este produto aparece no
                                    carrossel de Destaques no app.
                                </p>
                            </div>

                            <label className="inline-flex items-center gap-2 text-xs text-content-secondary">
                                <input
                                    type="checkbox"
                                    checked={isFeatured}
                                    disabled={isPending}
                                    onChange={(e) =>
                                        setIsFeatured(e.target.checked)
                                    }
                                    className="h-4 w-4 accent-current"
                                />
                                Ativar
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Nome do produto{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <IconInput
                            icon={Package}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isPending}
                            className={INPUT_BASE}
                        />
                    </div>

                    {/* IMAGEM (UPLOAD) */}
                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Foto do produto{' '}
                            <span className="text-content-secondary/70">
                                (opcional)
                            </span>
                        </label>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isPending || uploadingImage}
                            onChange={(e) => {
                                const f = e.currentTarget.files?.[0];
                                if (!f) return;
                                void uploadImage(f);
                            }}
                        />

                        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                            <div className="space-y-2">
                                <div className="relative">
                                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                                        <ImageIcon className="h-4 w-4 text-content-brand" />
                                    </div>

                                    <Input
                                        value={previewUrl ?? ''}
                                        readOnly
                                        placeholder="Clique em Upload para escolher uma imagem."
                                        className={cn(
                                            'pl-10 pr-10',
                                            INPUT_BASE
                                        )}
                                    />

                                    {previewUrl ? (
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary hover:text-content-primary"
                                            onClick={() => {
                                                setImageUrl('');
                                                if (fileInputRef.current)
                                                    fileInputRef.current.value =
                                                        '';
                                            }}
                                            disabled={
                                                isPending || uploadingImage
                                            }
                                            title="Remover imagem"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    ) : null}
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="brand"
                                className="h-10"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isPending || uploadingImage}
                                title={
                                    uploadingImage ? 'Enviando...' : undefined
                                }
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    {uploadingImage ? 'Enviando...' : 'Upload'}
                                </span>
                            </Button>
                        </div>

                        {previewUrl ? (
                            <div className="overflow-hidden rounded-xl border border-border-primary bg-background-tertiary">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={previewUrl}
                                    alt="Preview do produto"
                                    className="h-40 w-full object-cover"
                                />
                            </div>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Descrição <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute left-3 top-3">
                                <AlignLeft className="h-4 w-4 text-content-brand" />
                            </div>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isPending}
                                rows={3}
                                className={cn('pl-10', INPUT_BASE)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Valor (R$) <span className="text-red-500">*</span>
                        </label>
                        <IconInput
                            icon={Wallet}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            disabled={isPending}
                            placeholder="Ex: 79.90"
                            className={INPUT_BASE}
                        />
                        <p className="text-[11px] text-content-secondary/70">
                            Preço base. Os descontos por nível são opcionais.
                        </p>
                    </div>

                    <div className="space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-content-primary">
                                    Desconto por nível (%)
                                </p>
                                <p className="text-xs text-content-secondary">
                                    Deixe vazio para não definir.
                                </p>
                            </div>

                            <div className="text-xs text-content-secondary">
                                Base:{' '}
                                <span className="text-content-primary">
                                    R$ {price || '—'}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {LEVEL_OPTIONS.map((opt) => (
                                <div key={opt.value} className="space-y-1">
                                    <label className="text-xs text-content-secondary">
                                        {opt.label}
                                    </label>
                                    <IconInput
                                        icon={BadgePercent}
                                        value={levelDiscounts[opt.value]}
                                        onChange={(e) =>
                                            setLevelDiscounts((prev) => ({
                                                ...prev,
                                                [opt.value]: e.target.value,
                                            }))
                                        }
                                        disabled={isPending}
                                        inputMode="numeric"
                                        placeholder="Ex: 10"
                                        className={INPUT_SECONDARY}
                                    />
                                </div>
                            ))}
                        </div>

                        <p className="text-[11px] text-content-secondary/70">
                            O servidor normaliza para 0–100 e ignora campos
                            vazios.
                        </p>
                    </div>

                    <div className="space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-content-primary">
                                    Benefício de aniversário
                                </p>
                                <p className="text-xs text-content-secondary">
                                    Ativo por 3 dias antes, no dia, e 3 dias
                                    depois. Você escolhe qual “nível” aplicar.
                                </p>
                            </div>

                            <label className="inline-flex items-center gap-2 text-xs text-content-secondary">
                                <input
                                    type="checkbox"
                                    checked={birthdayEnabled}
                                    disabled={isPending}
                                    onChange={(e) =>
                                        setBirthdayEnabled(e.target.checked)
                                    }
                                    className="h-4 w-4 accent-current"
                                />
                                Ativar
                            </label>
                        </div>

                        {birthdayEnabled ? (
                            <div className="space-y-2">
                                <label className="text-xs text-content-secondary">
                                    Aplicar desconto como{' '}
                                    <span className="text-red-500">*</span>
                                </label>

                                <Select
                                    value={birthdayLevel}
                                    onValueChange={(v) =>
                                        setBirthdayLevel(v as CustomerLevel)
                                    }
                                    disabled={isPending}
                                >
                                    <SelectTrigger
                                        className={cn(
                                            'h-10 w-full justify-between text-left font-normal bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0'
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Cake className="h-4 w-4 text-content-brand" />
                                            <SelectValue placeholder="Selecione o nível" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {LEVEL_OPTIONS.map((opt) => (
                                            <SelectItem
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {birthdayInvalid ? (
                                    <p className="text-xs text-red-500">
                                        Se o benefício está ativo, selecione o
                                        nível.
                                    </p>
                                ) : (
                                    <p className="text-[11px] text-content-secondary/70">
                                        Ex.: “Diamante” aplica o desconto
                                        Diamante durante a janela do
                                        aniversário.
                                    </p>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Porcentagem do profissional (%){' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <IconInput
                            icon={Scissors}
                            value={barberPercentage}
                            onChange={(e) =>
                                setBarberPercentage(e.target.value)
                            }
                            disabled={isPending}
                            type="number"
                            min={0}
                            max={100}
                            placeholder="Ex: 20"
                            className={INPUT_BASE}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Estoque <span className="text-red-500">*</span>
                        </label>
                        <IconInput
                            icon={Boxes}
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                            disabled={isPending}
                            type="number"
                            min={0}
                            placeholder="Ex: 10"
                            className={INPUT_BASE}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Categoria / Finalidade{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <IconInput
                            icon={TagIcon}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            disabled={isPending}
                            placeholder="Ex: Barba, Cabelo, Hidratação..."
                            className={INPUT_BASE}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-label-small text-content-secondary">
                            Prazo para retirada (dias){' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <IconInput
                            icon={Clock}
                            value={pickupDeadlineDays}
                            onChange={(e) =>
                                setPickupDeadlineDays(e.target.value)
                            }
                            disabled={isPending}
                            type="number"
                            min={1}
                            max={30}
                            className={INPUT_BASE}
                        />
                        <p className="text-xs text-content-secondary">
                            Após esse prazo, a reserva pode expirar e o produto
                            volta ao estoque.
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="brand"
                            disabled={isPending || formInvalid}
                            onClick={handleCreate}
                            title={
                                unitInvalid
                                    ? 'Selecione uma unidade'
                                    : uploadingImage
                                      ? 'Aguarde o upload da imagem'
                                      : birthdayInvalid
                                        ? 'Selecione o nível do benefício de aniversário'
                                        : requiredInvalid
                                          ? 'Preencha os campos obrigatórios'
                                          : undefined
                            }
                        >
                            {isPending ? 'Criando...' : 'Criar produto'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
