// src/app/api/mobile/auth-redirect/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto';

export const dynamic = 'force-dynamic';

type AppRole = 'CLIENT' | 'PROFESSIONAL' | 'ADMIN';
type MemberRole = 'OWNER' | 'ADMIN' | 'STAFF' | 'CLIENT';

type NextAuthJwtTokenLike = {
    id?: string;
    sub?: string;
    companyId?: string | null;
    email?: string | null;
    [k: string]: unknown;
};

type SidPayload = {
    userId: string;
    email?: string;
    iat: number;
    exp: number;
};

function mapMemberRoleToAppRole(role: MemberRole): AppRole {
    if (role === 'OWNER') return 'ADMIN';
    if (role === 'ADMIN') return 'ADMIN';
    if (role === 'STAFF') return 'PROFESSIONAL';
    return 'CLIENT';
}

function mapOauthError(code: string) {
    const c = String(code || '').trim();

    if (c === 'OAuthAccountNotLinked') {
        return 'Essa conta já existe com outro método de login. Use o método anterior ou peça para vincular o Google.';
    }
    if (c === 'AccessDenied') return 'Acesso negado. Tente novamente.';
    if (c === 'Configuration') return 'Configuração de login inválida.';

    if (c === 'user_inactive') return 'Usuário inativo.';
    if (c === 'user_not_found') return 'Usuário não encontrado.';
    if (c === 'not_authenticated') return 'Não autenticado.';
    if (c === 'missing_user_id') return 'Falha ao identificar usuário.';
    if (c === 'missing_company_id') return 'Falha ao identificar empresa.';
    if (c === 'company_not_allowed')
        return 'Você não tem acesso a esta empresa neste app.';
    if (c === 'company_inactive') return 'Empresa inativa.';
    if (c === 'company_not_found') return 'Empresa não encontrada.';
    if (c === 'invalid_redirect_uri') return 'Redirect inválido.';
    if (c === 'server_error') return 'Erro no servidor.';
    if (c === 'nextauth_secret_missing')
        return 'NEXTAUTH_SECRET não configurado no backend.';
    if (c === 'invalid_sid') return 'Sessão temporária inválida ou expirada.';
    if (c === 'missing_app_jwt_secret')
        return 'APP_JWT_SECRET (ou JWT_SECRET) não configurado no backend.';

    return 'Não foi possível autenticar. Tente novamente.';
}

function computeProfileComplete(u: {
    phone: string | null;
    birthday: Date | null;
}) {
    const phoneOk = typeof u.phone === 'string' && u.phone.trim().length > 0;
    const birthdayOk =
        u.birthday instanceof Date && !Number.isNaN(u.birthday.getTime());
    return phoneOk && birthdayOk;
}

/**
 * companyKey pode vir como:
 * - companyId
 * - company_id
 * - tenant
 * - slug
 */
function readCompanyKey(url: URL): string {
    const raw =
        url.searchParams.get('companyId') ??
        url.searchParams.get('company_id') ??
        url.searchParams.get('tenant') ??
        url.searchParams.get('slug') ??
        '';
    return String(raw).trim();
}

/**
 * ✅ Monta URL final anexando params com segurança (funciona bem com deep links).
 * Evita quebrar quando o baseUrl já tem querystring.
 *
 * Observação: em alguns runtimes, `new URL("agendaplay://...")` pode falhar.
 * Por isso tem fallback que usa concatenação simples quando necessário.
 *
 * Extra: preserva hash (#) no fallback.
 */
function withParams(baseUrl: string, params: Record<string, string>) {
    try {
        const u = new URL(baseUrl);
        for (const [k, v] of Object.entries(params)) {
            u.searchParams.set(k, v);
        }
        return u.toString();
    } catch {
        // fallback: preserva fragment (#)
        const [noHash, hash] = baseUrl.split('#');
        const sep = noHash.includes('?') ? '&' : '?';
        const qs = Object.entries(params)
            .map(
                ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
            )
            .join('&');
        const full = `${noHash}${sep}${qs}`;
        return hash ? `${full}#${hash}` : full;
    }
}

/** Redirect 302 + no-store (mobile deep link friendly) */
function redirect302(target: string) {
    const res = NextResponse.redirect(target, { status: 302 });
    res.headers.set(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
}

/**
 * Segurança básica contra open-redirect:
 * Aceita apenas deep links do app (agendaplay://) ou exp:// (Expo)
 */
function isAllowedRedirectUri(uri: string) {
    const u = String(uri || '').trim();
    return u.startsWith('agendaplay://') || u.startsWith('exp://');
}

/**
 * ✅ Lê token do NextAuth (se NextAuth existir).
 * Sem import estático (evita TS2307).
 */
async function tryGetNextAuthToken(
    req: Request
): Promise<NextAuthJwtTokenLike | null> {
    if (!process.env.NEXTAUTH_SECRET) return null;

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require('next-auth/jwt') as {
            getToken?: (args: { req: any; secret: string }) => Promise<any>;
        };

        if (typeof mod?.getToken !== 'function') return null;

        const t = await mod.getToken({
            req: req as any,
            secret: process.env.NEXTAUTH_SECRET,
        });

        return (t ?? null) as NextAuthJwtTokenLike | null;
    } catch {
        return null;
    }
}

// -----------------------------
// ✅ JWT HS256 inline (substitui "@/lib/app-jwt")
// -----------------------------
function base64UrlEncode(input: Buffer | string) {
    const buf = typeof input === 'string' ? Buffer.from(input) : input;
    return buf
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function base64UrlDecodeToBuffer(input: string) {
    const s = String(input || '')
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
    return Buffer.from(`${s}${pad}`, 'base64');
}

function base64UrlEncodeJson(obj: unknown) {
    return base64UrlEncode(Buffer.from(JSON.stringify(obj)));
}

function signHs256(secret: string, data: string) {
    const sig = crypto.createHmac('sha256', secret).update(data).digest();
    return base64UrlEncode(sig);
}

function safeJsonParse<T>(raw: string): T | null {
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

function timingSafeEq(a: string, b: string) {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ab.length !== bb.length) return false;
    return crypto.timingSafeEqual(ab, bb);
}

function getAppJwtSecret() {
    return (
        process.env.APP_JWT_SECRET?.trim() ||
        process.env.MOBILE_JWT_SECRET?.trim() ||
        process.env.JWT_SECRET?.trim() ||
        process.env.NEXTAUTH_SECRET?.trim() ||
        ''
    );
}

async function signAppJwt(payload: {
    sub: string;
    role: AppRole;
    companyId: string;
    profile_complete: boolean;
}): Promise<string> {
    const secret = getAppJwtSecret();
    if (!secret) throw new Error('missing_app_jwt_secret');

    const header = { alg: 'HS256', typ: 'JWT' as const };

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 60 * 60 * 24 * 30; // 30 dias

    const body = {
        sub: payload.sub,
        role: payload.role,
        companyId: payload.companyId,
        profile_complete: payload.profile_complete,
        iat: now,
        exp,
    };

    const h = base64UrlEncodeJson(header);
    const b = base64UrlEncodeJson(body);
    const data = `${h}.${b}`;
    const s = signHs256(secret, data);

    return `${data}.${s}`;
}

/**
 * ✅ SID (fallback sem NextAuth cookie)
 * Formato: base64url(payload).base64url(hmac(payload))
 */
function verifySid(sid: string): SidPayload | null {
    const secret = getAppJwtSecret();
    if (!secret) return null;

    const raw = String(sid || '').trim();
    const [b64, sig] = raw.split('.');
    if (!b64 || !sig) return null;

    const expected = signHs256(secret, b64);
    if (!timingSafeEq(sig, expected)) return null;

    const json = base64UrlDecodeToBuffer(b64).toString('utf8');
    const payload = safeJsonParse<SidPayload>(json);
    if (!payload?.userId || !payload?.exp) return null;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;

    return payload;
}

function extractUserIdFromNextAuthToken(token: NextAuthJwtTokenLike | null) {
    if (!token) return '';
    return typeof token.id === 'string'
        ? String(token.id).trim()
        : typeof token.sub === 'string'
          ? String(token.sub).trim()
          : '';
}

// -----------------------------
// Handler
// -----------------------------
export async function GET(req: Request) {
    const url = new URL(req.url);

    const redirectUriRaw = url.searchParams.get('redirect_uri');
    if (!redirectUriRaw) {
        return NextResponse.json(
            { error: 'redirect_uri ausente' },
            { status: 400 }
        );
    }

    /**
     * ⚠️ Importante:
     * Não faça decodeURIComponent aqui.
     * Em vários pontos do fluxo você já manda redirect_uri "cru" via URLSearchParams,
     * e um decode aqui pode corromper a URL (especialmente se tiver % já válido).
     */
    const redirectUri = String(redirectUriRaw).trim();

    if (!isAllowedRedirectUri(redirectUri)) {
        return NextResponse.json(
            { ok: false, error: 'invalid_redirect_uri' },
            { status: 400 }
        );
    }

    const oauthError = url.searchParams.get('error');
    if (oauthError) {
        const message = mapOauthError(oauthError);
        return redirect302(
            withParams(redirectUri, { error: String(oauthError), message })
        );
    }

    try {
        // companyKey preferido: querystring do app
        const requestedCompanyKey = readCompanyKey(url);

        // fallback: DEFAULT_TENANT_SLUG (dev)
        const defaultSlug = String(
            process.env.DEFAULT_TENANT_SLUG || ''
        ).trim();

        // 1) tenta NextAuth cookie
        const nextAuthToken = await tryGetNextAuthToken(req);
        const nextAuthUserId = extractUserIdFromNextAuthToken(nextAuthToken);

        // 2) fallback: sid assinado (vindo do callback)
        const sid = String(url.searchParams.get('sid') || '').trim();
        const sidPayload = sid ? verifySid(sid) : null;

        // ✅ se veio sid mas é inválido/expirou e não há NextAuth, devolve erro explícito
        if (sid && !sidPayload && !nextAuthUserId) {
            const message = mapOauthError('invalid_sid');
            return redirect302(
                withParams(redirectUri, { error: 'invalid_sid', message })
            );
        }

        const userId = nextAuthUserId || sidPayload?.userId || '';

        if (!userId) {
            const message = mapOauthError('not_authenticated');
            return redirect302(
                withParams(redirectUri, { error: 'not_authenticated', message })
            );
        }

        // token companyId (compat) só existe se NextAuth setar (no mobile não confiamos nele)
        const tokenCompanyId =
            typeof nextAuthToken?.companyId === 'string'
                ? String(nextAuthToken.companyId).trim()
                : '';

        // ✅ ordem clara: querystring > token (web) > default slug (dev)
        const companyKey = requestedCompanyKey || tokenCompanyId || defaultSlug;

        if (!companyKey) {
            const message = mapOauthError('missing_company_id');
            return redirect302(
                withParams(redirectUri, {
                    error: 'missing_company_id',
                    message,
                })
            );
        }

        // ✅ resolve company por id OU slug (e só ativa)
        const company = await prisma.company.findFirst({
            where: {
                isActive: true,
                OR: [{ id: companyKey }, { slug: companyKey }],
            },
            select: { id: true },
        });

        if (!company) {
            const exists = await prisma.company.findFirst({
                where: { OR: [{ id: companyKey }, { slug: companyKey }] },
                select: { id: true, isActive: true },
            });

            if (!exists) {
                const message = mapOauthError('company_not_found');
                return redirect302(
                    withParams(redirectUri, {
                        error: 'company_not_found',
                        message,
                    })
                );
            }

            const message = mapOauthError('company_inactive');
            return redirect302(
                withParams(redirectUri, { error: 'company_inactive', message })
            );
        }

        const companyId = company.id;

        // ✅ valida user (existência + isActive + dados necessários)
        const dbUser = await prisma.user.findFirst({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                birthday: true,
                isOwner: true,
                isActive: true,
            },
        });

        if (!dbUser) {
            const message = mapOauthError('user_not_found');
            return redirect302(
                withParams(redirectUri, { error: 'user_not_found', message })
            );
        }

        if (!dbUser.isActive) {
            const message = mapOauthError('user_inactive');
            return redirect302(
                withParams(redirectUri, { error: 'user_inactive', message })
            );
        }

        // ✅ valida membership ativo nessa company
        const membership = await prisma.companyMember.findFirst({
            where: { companyId, userId: dbUser.id, isActive: true },
            select: {
                role: true,
                companyId: true,
                lastUnitId: true,
                isActive: true,
            },
        });

        if (!membership || membership.isActive === false) {
            const message = mapOauthError('company_not_allowed');
            return redirect302(
                withParams(redirectUri, {
                    error: 'company_not_allowed',
                    message,
                })
            );
        }

        const profileComplete = computeProfileComplete({
            phone: dbUser.phone ?? null,
            birthday: dbUser.birthday ?? null,
        });

        const derivedRole = mapMemberRoleToAppRole(
            membership.role as MemberRole
        );

        const appToken = await signAppJwt({
            sub: dbUser.id,
            role: derivedRole,
            companyId: membership.companyId,
            profile_complete: profileComplete,
        });

        /**
         * ✅ Payload enxuto pro deep link (evita URL enorme e bug em alguns devices)
         * O app já chama refreshMe() depois, então ele pode buscar nome/email/image/etc.
         */
        const payload = {
            appToken,
            user: {
                id: dbUser.id,
                companyId: membership.companyId,
                role: derivedRole,
                profileComplete,
                lastUnitId: membership.lastUnitId,
            },
        };

        const encoded = encodeURIComponent(JSON.stringify(payload));
        return redirect302(withParams(redirectUri, { token: encoded }));
    } catch (err: any) {
        const msg = String(err?.message || '');

        // ✅ se faltou segredo do app jwt, devolve erro claro no deep link
        if (msg === 'missing_app_jwt_secret') {
            const message = mapOauthError('missing_app_jwt_secret');
            return redirect302(
                withParams(redirectUri, {
                    error: 'missing_app_jwt_secret',
                    message,
                })
            );
        }

        console.error('[mobile auth-redirect] error:', err);
        const message = mapOauthError('server_error');
        return redirect302(
            withParams(redirectUri, { error: 'server_error', message })
        );
    }
}
