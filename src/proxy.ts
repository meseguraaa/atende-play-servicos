// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE_NAME = 'painel_session';
const DEV_DEFAULT_TENANT = 'atendeplay';

function getJwtSecretKey() {
    const secret = process.env.PAINEL_JWT_SECRET;
    if (!secret) throw new Error('PAINEL_JWT_SECRET não definido no .env');
    return new TextEncoder().encode(secret);
}

/**
 * Resolve o tenant pelo subdomínio:
 * clientea.atendeplay.com.br => "clientea"
 */
function getTenantSlugFromHost(host: string): string | null {
    const cleanHost = String(host || '')
        .trim()
        .toLowerCase()
        .split(':')[0];
    if (!cleanHost) return null;

    // DEV: qualquer *.localhost usa tenant padrão
    if (cleanHost === 'localhost' || cleanHost.endsWith('.localhost')) {
        return DEV_DEFAULT_TENANT;
    }

    const parts = cleanHost.split('.').filter(Boolean);
    if (parts.length < 2) return null;

    const first = parts[0] === 'www' ? parts[1] : parts[0];
    if (!first) return null;

    return first;
}

/**
 * Valida o token do painel e garante que ele pertence ao tenant atual.
 */
async function isValidPainelSessionForTenant(
    token: string,
    tenantSlug: string
): Promise<boolean> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        const p = payload as any;

        const tokenTenant = String(p?.tenantSlug ?? '')
            .toLowerCase()
            .trim();

        return tokenTenant === tenantSlug;
    } catch {
        return false;
    }
}

function isPainelArea(pathname: string) {
    return (
        pathname.startsWith('/painel') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/professional')
    );
}

// Next 16.1+: proxy.ts precisa exportar uma função chamada `proxy`
export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // ignora assets e APIs
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname === '/favicon.ico' ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml'
    ) {
        return NextResponse.next();
    }

    const host = req.headers.get('host') ?? '';
    const tenantSlug = getTenantSlugFromHost(host);

    // Login do painel sempre liberado
    if (pathname === '/painel/login') {
        const res = NextResponse.next();
        if (tenantSlug) {
            res.headers.set('x-tenant-slug', tenantSlug);
        }
        return res;
    }

    // Se tentar acessar painel sem tenant, manda pro login
    if (isPainelArea(pathname) && !tenantSlug) {
        const url = req.nextUrl.clone();
        url.pathname = '/painel/login';
        url.search = '?error=tenant_not_found';
        return NextResponse.redirect(url);
    }

    // Protege rotas do painel
    if (isPainelArea(pathname)) {
        // 🔒 Aqui o tenantSlug é garantidamente string
        const safeTenantSlug = tenantSlug as string;

        const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

        if (!token) {
            const url = req.nextUrl.clone();
            url.pathname = '/painel/login';
            return NextResponse.redirect(url);
        }

        const ok = await isValidPainelSessionForTenant(token, safeTenantSlug);

        if (!ok) {
            const url = req.nextUrl.clone();
            url.pathname = '/painel/login';
            const res = NextResponse.redirect(url);
            res.cookies.delete(SESSION_COOKIE_NAME);
            return res;
        }

        const res = NextResponse.next();
        res.headers.set('x-tenant-slug', safeTenantSlug);
        return res;
    }

    const res = NextResponse.next();
    if (tenantSlug) {
        res.headers.set('x-tenant-slug', tenantSlug);
    }
    return res;
}

export const config = {
    matcher: ['/:path*'],
};
