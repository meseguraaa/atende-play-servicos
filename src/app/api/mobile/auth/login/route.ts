// src/app/api/mobile/auth-redirect/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function safeUrl(raw: string): URL | null {
    try {
        return new URL(raw);
    } catch {
        return null;
    }
}

function jsonErr(message: string, status = 400) {
    return NextResponse.json({ ok: false, error: message }, { status });
}

/**
 * /api/mobile/auth-redirect
 *
 * Este endpoint é a “ponte” final do OAuth:
 * - Recebe `redirect_uri` (deep link do app)
 * - Recebe `token` (JWT do app) OU `session` (payload serializado)
 * - Faz redirect para o deep link: agendaplay://auth?token=... ou ?session=...
 *
 * Exemplo:
 * /api/mobile/auth-redirect?redirect_uri=agendaplay://auth&token=...&companyId=...
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    // redirect_uri vem URL-encoded pelo app
    const redirectUriEncoded = String(
        searchParams.get('redirect_uri') || ''
    ).trim();
    const redirectUriRaw = redirectUriEncoded
        ? decodeURIComponent(redirectUriEncoded)
        : '';

    const redirectUri = safeUrl(redirectUriRaw);
    if (!redirectUri) {
        return jsonErr('redirect_uri inválida');
    }

    // payload pode vir como token (preferível) ou session (compat)
    const token = String(searchParams.get('token') || '').trim();
    const session = String(searchParams.get('session') || '').trim();

    // erro amigável
    const error = String(searchParams.get('error') || '').trim();
    const message = String(searchParams.get('message') || '').trim();

    // opcional: companyId (não é obrigatório aqui, mas útil pro app)
    const companyId = String(searchParams.get('companyId') || '').trim();

    // Monta a URL final pro app
    const finalUrl = new URL(redirectUri.toString());

    if (error) {
        finalUrl.searchParams.set('error', error);
        if (message) finalUrl.searchParams.set('message', message);
        if (companyId) finalUrl.searchParams.set('companyId', companyId);
        return NextResponse.redirect(finalUrl.toString(), { status: 302 });
    }

    if (!token && !session) {
        finalUrl.searchParams.set('error', 'missing_payload');
        finalUrl.searchParams.set(
            'message',
            'Não recebemos token/sessão do login. Tente novamente.'
        );
        if (companyId) finalUrl.searchParams.set('companyId', companyId);
        return NextResponse.redirect(finalUrl.toString(), { status: 302 });
    }

    if (token) finalUrl.searchParams.set('token', token);
    if (!token && session) finalUrl.searchParams.set('session', session);

    if (companyId) finalUrl.searchParams.set('companyId', companyId);

    return NextResponse.redirect(finalUrl.toString(), { status: 302 });
}
