// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE_NAME = 'painel_session';
const DEV_DEFAULT_TENANT = 'atendeplay';

// ✅ ajuste aqui se seu domínio base for diferente
const BASE_DOMAIN = 'atendeplay.com.br';

function getJwtSecretKey() {
    const secret = process.env.PAINEL_JWT_SECRET;
    if (!secret) throw new Error('PAINEL_JWT_SECRET não definido no .env');
    return new TextEncoder().encode(secret);
}

/**
 * Pega o host "real" da requisição, respeitando proxies.
 * - Vercel/Cloudflare/Nginx normalmente setam x-forwarded-host
 * - Pode vir como lista separada por vírgula
 */
function getHostFromRequest(req: NextRequest): string {
    const xfHost =
        req.headers.get('x-forwarded-host') ||
        req.headers.get('x-original-host') ||
        req.headers.get('x-vercel-forwarded-host') ||
        '';

    const raw = (xfHost || req.headers.get('host') || '').trim().toLowerCase();
    const first = raw.split(',')[0]?.trim() ?? '';
    return first.split(':')[0]; // remove :3000
}

/**
 * Resolve tenant slug pelo subdomínio:
 * clientea.atendeplay.com.br => "clientea"
 * ✅ domínio raiz (atendeplay.com.br / www.atendeplay.com.br) => null
 */
function getTenantSlugFromHost(host: string): string | null {
    const cleanHost = String(host || '')
        .trim()
        .toLowerCase()
        .split(':')[0];

    if (!cleanHost) return null;

    // ✅ DEV: localhost e *.localhost usam tenant padrão
    if (cleanHost === 'localhost' || cleanHost.endsWith('.localhost')) {
        return DEV_DEFAULT_TENANT;
    }

    // ✅ domínio raiz não tem tenant
    if (cleanHost === BASE_DOMAIN || cleanHost === `www.${BASE_DOMAIN}`) {
        return null;
    }

    // ✅ padrão oficial: <tenant>.atendeplay.com.br
    if (cleanHost.endsWith(`.${BASE_DOMAIN}`)) {
        const sub = cleanHost.slice(0, -`.${BASE_DOMAIN}`.length);
        const parts = sub.split('.').filter(Boolean);

        // ignora www caso exista (www.clientea.atendeplay.com.br)
        const first = parts[0] === 'www' ? parts[1] : parts[0];
        return first ? String(first) : null;
    }

    // ✅ fallback: não tenta adivinhar tenant em domínio desconhecido
    return null;
}

function isPlatformRole(role: unknown) {
    const r = String(role ?? '')
        .trim()
        .toUpperCase();
    return r === 'PLATFORM_OWNER' || r === 'PLATFORM_STAFF';
}

/**
 * Valida o token do painel e garante que ele pertence ao tenant atual.
 * ✅ EXCEÇÃO: tokens de PLATAFORMA não são tenant-bound, então passam.
 */
async function isValidPainelSessionForTenant(
    token: string,
    tenantSlug: string
): Promise<boolean> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        const p = payload as any;

        // ✅ plataforma: não valida tenantSlug
        if (isPlatformRole(p?.role)) return true;

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

function redirectToLogin(req: NextRequest, error?: string) {
    const url = req.nextUrl.clone();
    url.pathname = '/painel/login';
    if (error) url.search = `?error=${encodeURIComponent(error)}`;
    return NextResponse.redirect(url);
}

// Next 16.1+: proxy.ts precisa exportar uma função chamada `proxy`
export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // ✅ ignora assets e APIs
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/uploads') ||
        pathname === '/favicon.ico' ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml'
    ) {
        return NextResponse.next();
    }

    const host = getHostFromRequest(req);
    const tenantSlug = getTenantSlugFromHost(host);

    // Login do painel sempre liberado
    if (pathname === '/painel/login') {
        const res = NextResponse.next();
        if (tenantSlug) res.headers.set('x-tenant-slug', tenantSlug);
        return res;
    }

    // Se tentar acessar painel sem tenant, manda pro login
    if (isPainelArea(pathname) && !tenantSlug) {
        return redirectToLogin(req, 'tenant_not_found');
    }

    // Protege rotas do painel
    if (isPainelArea(pathname)) {
        const safeTenantSlug = tenantSlug as string;

        const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

        // ✅ sem cookie: volta pro login com motivo explícito
        if (!token) {
            return redirectToLogin(req, 'session_missing');
        }

        const ok = await isValidPainelSessionForTenant(token, safeTenantSlug);

        // ✅ token inválido/tenant diferente: volta pro login com motivo explícito
        // (não deleta cookie aqui, porque cookie com domain compartilhado pode não ser removido corretamente no Edge)
        if (!ok) {
            return redirectToLogin(req, 'session_invalid');
        }

        const res = NextResponse.next();
        res.headers.set('x-tenant-slug', safeTenantSlug);
        return res;
    }

    const res = NextResponse.next();
    if (tenantSlug) res.headers.set('x-tenant-slug', tenantSlug);
    return res;
}

export const config = {
    matcher: ['/:path*'],
};
