// src/app/api/admin/uploads/route.ts
import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // precisamos de fs (salvar em /public)

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

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

function safeExtFrom(fileName: string, mime: string) {
    const byName = path.extname(fileName || '').toLowerCase();

    // lista pequena e segura (pode expandir depois)
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

    // fallback por mime
    const m = String(mime || '').toLowerCase();
    if (m === 'image/jpeg') return '.jpg';
    if (m === 'image/png') return '.png';
    if (m === 'image/webp') return '.webp';
    if (m === 'image/gif') return '.gif';
    if (m === 'image/svg+xml') return '.svg';
    if (m === 'image/avif') return '.avif';

    // se não reconheceu, bloqueia
    return '';
}

/**
 * POST /api/admin/uploads
 * multipart/form-data:
 * - file: File (obrigatório)
 *
 * Retorna:
 * { ok: true, data: { url, key, mime, size, originalName } }
 */
export async function POST(request: Request) {
    try {
        const session = await requireAdminForModule('PRODUCTS');

        const companyId = normalizeString((session as any)?.companyId);
        if (!companyId) {
            return jsonErr(
                'Contexto inválido: companyId ausente (multi-tenant).',
                401
            );
        }

        const form = await request.formData().catch(() => null);
        if (!form) return jsonErr('FormData inválido.', 400);

        const file = form.get('file');
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

        const key = crypto.randomUUID();
        const fileName = `${key}${ext}`;

        // organiza por empresa (evita colisão e mistura de tenants)
        const companyDir = path.join(UPLOADS_DIR, companyId);
        await mkdir(companyDir, { recursive: true });

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const absPath = path.join(companyDir, fileName);
        await writeFile(absPath, buffer);

        const url = `/uploads/${companyId}/${fileName}`;

        return jsonOk(
            {
                url,
                key,
                mime,
                size,
                originalName,
            },
            { status: 201 }
        );
    } catch {
        return jsonErr('Sem permissão para enviar uploads.', 403);
    }
}
