// src/middleware.ts
import type { NextRequest } from 'next/server';
import { proxy } from './proxy';

export const runtime = 'nodejs';

export default function middleware(req: NextRequest) {
    return proxy(req);
}

export const config = {
    matcher: ['/:path*'],
};
