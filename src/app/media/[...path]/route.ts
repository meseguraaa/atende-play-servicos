// src/app/media/[...path]/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Mesma pasta usada pelo upload
const UPLOADS_DIR =
    process.env.UPLOADS_DIR?.trim() || path.join(process.cwd(), 'uploads_data');

// mapeamento simples de mime (suficiente pro seu caso)
function mimeFromExt(ext: string) {
    switch (ext.toLowerCase()) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.webp':
            return 'image/webp';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        case '.avif':
            return 'image/avif';
        default:
            return 'application/octet-stream';
    }
}

// evita path traversal tipo ../../etc/passwd
function safeJoin(base: string, parts: string[]) {
    const joined = path.join(base, ...parts);
    const normalizedBase = path.resolve(base);
    const normalizedJoined = path.resolve(joined);

    if (!normalizedJoined.startsWith(normalizedBase + path.sep)) {
        throw new Error('invalid_path');
    }
    return normalizedJoined;
}

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: parts } = await ctx.params;

        if (!Array.isArray(parts) || parts.length === 0) {
            return new NextResponse('Not Found', { status: 404 });
        }

        const absPath = safeJoin(UPLOADS_DIR, parts);
        const buf = await readFile(absPath);

        const ext = path.extname(absPath);
        const contentType = mimeFromExt(ext);

        // cache leve (pode ajustar depois)
        return new NextResponse(buf, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (e: any) {
        // arquivo inexistente ou path inválido
        return new NextResponse('Not Found', { status: 404 });
    }
}
