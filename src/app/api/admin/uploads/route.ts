// src/app/api/admin/uploads/route.ts
import { NextResponse } from 'next/server';
import { mkdir, writeFile, stat } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

import { requireAdminForModule } from '@/lib/admin-permissions';
import { requirePlatformForModuleApi } from '@/lib/plataform-permissions';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // precisamos de fs (salvar em /public)

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * ✅ Locaweb/local friendly:
 * - por padrão salva em <project>/public/uploads
 * - se precisar, você pode setar UPLOADS_PUBLIC_DIR para apontar pra outro lugar
 *   (mas recomendado manter dentro de /public pra servir estático sem proxy)
 */
const UPLOADS_PUBLIC_DIR =
    process.env.UPLOADS_PUBLIC_DIR?.trim() ||
    path.join(process.cwd(), 'public', 'uploads');

type UploadModule = 'PRODUCTS' | 'PROFESSIONALS' | 'PARTNERS';
type UploadCategory = 'products' | 'professionals' | 'partners';

const MODULE_TO_CATEGORY: Record<UploadModule, UploadCategory> = {
    PRODUCTS: 'products',
    PROFESSIONALS: 'professionals',
    PARTNERS: 'partners',
};

// ✅ resolve TS: requireAdminForModule espera AdminModule
type AdminModuleLike = Parameters<typeof requireAdminForModule>[0];

const MODULE_TO_PERMISSION: Record<UploadModule, AdminModuleLike> = {
    PRODUCTS: 'PRODUCTS' as AdminModuleLike,
    PROFESSIONALS: 'PROFESSIONALS' as AdminModuleLike,

    // ✅ Parceiros agora são PLATAFORMA.
    // Mantemos só por compat de tipo, mas não será usado quando module=PARTNERS.
    PARTNERS: 'SETTINGS' as AdminModuleLike,
};

function jsonOk<T>(data: T, init?: ResponseInit) {
    return NextResponse.json({ ok: true, data } as const, init);
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error } as const, { status });
}

function normalizeString(raw: unknown) {
    const s = String(raw ?? '').trim();
    return s.length ? s : '';
}

/**
 * ✅ TS FIX:
 * Em alguns setups, o tipo `FormData` no ambiente server não expõe `.get()`
 */
function formGet(formData: unknown, key: string): unknown {
    const anyForm = formData as any;
    if (anyForm && typeof anyForm.get === 'function') return anyForm.get(key);
    return undefined;
}

function safeExtFrom(fileName: string, mime: string) {
    const byName = path.extname(fileName || '').toLowerCase();

    const allowed = new Set([
        '.jpg',
        '.jpeg',
        '.png',
        '.webp',
        '.gif',
        '.svg',
        '.avif',
    ]);

    if (allowed.has(byName)) return byName;

    const m = String(mime || '').toLowerCase();
    if (m === 'image/jpeg') return '.jpg';
    if (m === 'image/png') return '.png';
    if (m === 'image/webp') return '.webp';
    if (m === 'image/gif') return '.gif';
    if (m === 'image/svg+xml') return '.svg';
    if (m === 'image/avif') return '.avif';

    return '';
}

function parseModule(v: unknown): UploadModule | null {
    const raw = normalizeString(v).toUpperCase();
    if (raw === 'PRODUCTS') return 'PRODUCTS';
    if (raw === 'PROFESSIONALS') return 'PROFESSIONALS';
    if (raw === 'PARTNERS') return 'PARTNERS';
    return null;
}

type UploadScope = { kind: 'company'; companyId: string } | { kind: 'global' };

/**
 * ✅ Resolve permissão + namespace de storage
 * - PRODUCTS/PROFESSIONALS: precisa de ADMIN + companyId
 * - PARTNERS: precisa de PLATFORM + grava em /uploads/global/partners
 */
async function resolveScopeForModule(
    module: UploadModule
): Promise<UploadScope | NextResponse> {
    if (module === 'PARTNERS') {
        const auth = await requirePlatformForModuleApi('PARTNERS');
        if (auth instanceof NextResponse) return auth;
        return { kind: 'global' };
    }

    const permissionModule = MODULE_TO_PERMISSION[module];
    const session = await requireAdminForModule(permissionModule);

    const companyId = normalizeString((session as any)?.companyId);
    if (!companyId) {
        return jsonErr(
            'Contexto inválido: companyId ausente (multi-tenant).',
            401
        );
    }

    return { kind: 'company', companyId };
}

async function ensureWritableDir(dir: string) {
    await mkdir(dir, { recursive: true });

    // “provinha” rápida: stat pra confirmar que existe e é acessível
    await stat(dir);
}

/**
 * POST /api/admin/uploads
 * multipart/form-data:
 * - file: File (obrigatório)
 * - module: "PRODUCTS" | "PROFESSIONALS" | "PARTNERS" (obrigatório)
 *
 * Salva em:
 * - PRODUCTS/PROFESSIONALS: /public/uploads/<companyId>/<category>/<uuid>.<ext>
 * - PARTNERS (PLATFORM):    /public/uploads/global/partners/<uuid>.<ext>
 *
 * Retorna:
 * { ok: true, data: { url, key, mime, size, originalName, module, category } }
 */
export async function POST(request: Request) {
    try {
        const form = await request.formData().catch(() => null);
        if (!form) return jsonErr('FormData inválido.', 400);

        const module = parseModule(formGet(form, 'module'));
        if (!module) {
            return jsonErr(
                'Campo "module" é obrigatório e deve ser "PRODUCTS", "PROFESSIONALS" ou "PARTNERS".',
                400
            );
        }

        // ✅ resolve permissão + scope (company/global)
        const scope = await resolveScopeForModule(module);
        if (scope instanceof NextResponse) return scope;

        const file = formGet(form, 'file');
        if (!file || !(file instanceof File)) {
            return jsonErr('Campo "file" é obrigatório.', 400);
        }

        const originalName = file.name || 'upload';
        const mime = String(file.type || '').toLowerCase();

        if (!mime.startsWith('image/')) {
            return jsonErr('Apenas arquivos de imagem são permitidos.', 400);
        }

        const size = Number(file.size || 0);
        if (!Number.isFinite(size) || size <= 0) {
            return jsonErr('Arquivo inválido (tamanho).', 400);
        }

        if (size > MAX_FILE_SIZE_BYTES) {
            return jsonErr(
                `Imagem muito grande. Máximo: ${Math.floor(
                    MAX_FILE_SIZE_BYTES / (1024 * 1024)
                )}MB.`,
                413
            );
        }

        const ext = safeExtFrom(originalName, mime);
        if (!ext) {
            return jsonErr(
                'Formato de imagem não suportado. Use JPG, PNG, WEBP, GIF, SVG ou AVIF.',
                400
            );
        }

        const category = MODULE_TO_CATEGORY[module];
        const key = crypto.randomUUID();
        const fileName = `${key}${ext}`;

        // ✅ namespace conforme scope
        const namespace = scope.kind === 'global' ? 'global' : scope.companyId;

        const targetDir = path.join(UPLOADS_PUBLIC_DIR, namespace, category);

        // ✅ garante pasta acessível e gravável
        await ensureWritableDir(targetDir);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const absPath = path.join(targetDir, fileName);
        await writeFile(absPath, buffer);

        const url = `/uploads/${namespace}/${category}/${fileName}`;

        return jsonOk(
            {
                url,
                key,
                mime,
                size,
                originalName,
                module,
                category,
            },
            { status: 201 }
        );
    } catch (e: any) {
        // ✅ aqui a gente para de “mascarar” tudo como permissão
        const msg = String(e?.message || e || 'Erro desconhecido');
        const code = String((e as any)?.code || '');

        // erros comuns de filesystem em produção
        if (code === 'EACCES' || code === 'EPERM') {
            return jsonErr(
                `Sem permissão para gravar em "${UPLOADS_PUBLIC_DIR}". Verifique permissões da pasta public/uploads no servidor.`,
                500
            );
        }
        if (code === 'ENOENT') {
            return jsonErr(
                `Caminho inválido para uploads: "${UPLOADS_PUBLIC_DIR}". Verifique se o deploy inclui a pasta public.`,
                500
            );
        }

        // erros de auth/permission vindos dos guards
        if (msg === 'missing_token' || msg === 'unauthorized') {
            return jsonErr('Não autenticado.', 401);
        }

        return jsonErr(`Falha no upload: ${msg}`, 500);
    }
}
