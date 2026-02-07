module.exports = [
    98766,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            c = e.i(337047),
            l = e.i(528171),
            d = e.i(367300),
            u = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            g = e.i(46094),
            h = e.i(622730),
            _ = e.i(811178),
            f = e.i(193695);
        e.i(629399);
        var E = e.i(377404),
            v = e.i(738342),
            R = e.i(595504),
            w = e.i(698043),
            y = e.i(666680);
        function C(e) {
            let t = String(e || '').trim();
            return t ? (t.endsWith('/') ? t.slice(0, -1) : t) : '';
        }
        function S(e, t) {
            try {
                let r = new URL(e);
                for (let [e, a] of Object.entries(t)) r.searchParams.set(e, a);
                return r.toString();
            } catch {
                let r = e.includes('?') ? '&' : '?',
                    a = Object.entries(t)
                        .map(
                            ([e, t]) =>
                                `${encodeURIComponent(e)}=${encodeURIComponent(t)}`
                        )
                        .join('&');
                return `${e}${r}${a}`;
            }
        }
        function T(e) {
            let t = v.NextResponse.redirect(e, { status: 302 });
            return (
                t.headers.set(
                    'Cache-Control',
                    'no-store, no-cache, must-revalidate, proxy-revalidate'
                ),
                t.headers.set('Pragma', 'no-cache'),
                t.headers.set('Expires', '0'),
                t
            );
        }
        async function A(e) {
            let t = String(e || '').trim();
            if (!t) return null;
            try {
                let e,
                    { payload: r } = await (0, R.jwtVerify)(
                        t,
                        (function () {
                            let e = (
                                process.env.PAINEL_JWT_SECRET ||
                                process.env.APP_JWT_SECRET ||
                                ''
                            ).trim();
                            if (!e)
                                throw Error(
                                    'PAINEL_JWT_SECRET (ou APP_JWT_SECRET) não definido no .env'
                                );
                            return new TextEncoder().encode(e);
                        })()
                    ),
                    a = String(r?.companyId || '').trim(),
                    n = String(r?.redirectUri || '').trim();
                if (
                    !a ||
                    !n ||
                    !(
                        (e = String(n || '').trim()).startsWith(
                            'agendaplay://'
                        ) || e.startsWith('exp://')
                    )
                )
                    return null;
                return { companyId: a, redirectUri: n, provider: 'google' };
            } catch {
                return null;
            }
        }
        async function P(e) {
            let t = String(process.env.GOOGLE_CLIENT_ID || '').trim(),
                r = String(process.env.GOOGLE_CLIENT_SECRET || '').trim();
            if (!t || !r) throw Error('missing_google_env');
            let a = new URLSearchParams();
            (a.set('client_id', t),
                a.set('client_secret', r),
                a.set('code', e.code),
                a.set('grant_type', 'authorization_code'),
                a.set('redirect_uri', e.redirectUri));
            let n = await fetch('https://oauth2.googleapis.com/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: a.toString(),
                }),
                i = await n.json().catch(() => null);
            if (!n.ok) {
                let e = String(i?.error || 'token_exchange_failed'),
                    t = String(i?.error_description || ''),
                    r = Error(e);
                throw ((r.data = i), (r.desc = t), r);
            }
            return i;
        }
        async function x(e) {
            let t = await fetch(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${e}` } }
                ),
                r = await t.json().catch(() => null);
            if (!t.ok) {
                let e = Error('google_userinfo_failed');
                throw ((e.data = r), e);
            }
            return r;
        }
        async function I(e) {
            let t = String(e.email || '')
                .trim()
                .toLowerCase();
            if (!t) throw Error('missing_email');
            let r = await w.prisma.company.findFirst({
                where: { id: e.companyId },
                select: { id: !0, isActive: !0 },
            });
            if (!r) throw Error('company_not_found');
            if (!1 === r.isActive) throw Error('company_inactive');
            let a = await w.prisma.user.upsert({
                where: { email: t },
                create: {
                    email: t,
                    name: e.name,
                    image: e.image,
                    isActive: !0,
                },
                update: { name: e.name ?? void 0, image: e.image ?? void 0 },
                select: { id: !0, isActive: !0 },
            });
            if (!a.isActive) throw Error('user_inactive');
            return (
                await w.prisma.companyMember.upsert({
                    where: {
                        companyId_userId: {
                            companyId: e.companyId,
                            userId: a.id,
                        },
                    },
                    create: {
                        companyId: e.companyId,
                        userId: a.id,
                        role: 'CLIENT',
                        isActive: !0,
                    },
                    update: { isActive: !0 },
                }),
                { userId: a.id }
            );
        }
        function b(e) {
            return ('string' == typeof e ? Buffer.from(e) : e)
                .toString('base64')
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }
        async function U(e) {
            let t = new URL(e.url),
                r = String(t.searchParams.get('code') || '').trim(),
                a = String(t.searchParams.get('state') || '').trim(),
                n = String(t.searchParams.get('error') || '').trim(),
                i = await A(a),
                o = i?.redirectUri || '';
            if (n)
                return o
                    ? T(
                          S(o, {
                              error: n,
                              message:
                                  'Erro retornado pelo Google durante o login.',
                          })
                      )
                    : v.NextResponse.json(
                          { ok: !1, error: n },
                          { status: 400 }
                      );
            if (!i)
                return v.NextResponse.json(
                    { ok: !1, error: 'invalid_state' },
                    { status: 400 }
                );
            if (!r)
                return T(
                    S(i.redirectUri, {
                        error: 'missing_code',
                        message: 'Código de autorização ausente.',
                    })
                );
            try {
                let t = (function (e) {
                    let t,
                        r,
                        a = C(
                            process.env.PUBLIC_BASE_URL ||
                                process.env.NEXTAUTH_URL ||
                                ''
                        );
                    return a
                        ? a
                        : ((t = e.headers.get('x-forwarded-proto') || 'http'),
                          (r =
                              e.headers.get('x-forwarded-host') ||
                              e.headers.get('host') ||
                              ''),
                          C(`${t}://${r}`));
                })(e);
                if (!t)
                    return T(
                        S(i.redirectUri, {
                            error: 'server_error',
                            message:
                                'Não foi possível determinar a URL pública do backend (PUBLIC_BASE_URL).',
                        })
                    );
                let a = new URL('/api/mobile/auth/google/callback', t),
                    n = await P({ code: r, redirectUri: a.toString() }),
                    o = String(n?.access_token || '').trim();
                if (!o)
                    return T(
                        S(i.redirectUri, {
                            error: 'server_error',
                            message: 'Falha ao obter access_token do Google.',
                        })
                    );
                let s = await x(o),
                    c = String(s.email || '')
                        .trim()
                        .toLowerCase();
                if (!c)
                    return T(
                        S(i.redirectUri, {
                            error: 'missing_email',
                            message:
                                'Não foi possível obter email do Google. Verifique permissões (scope).',
                        })
                    );
                let l = String(s.name || '').trim() || null,
                    d = String(s.picture || '').trim() || null,
                    { userId: u } = await I({
                        companyId: i.companyId,
                        email: c,
                        name: l,
                        image: d,
                    }),
                    p = Math.floor(Date.now() / 1e3),
                    m = (function (e) {
                        let t =
                            process.env.APP_JWT_SECRET?.trim() ||
                            process.env.MOBILE_JWT_SECRET?.trim() ||
                            process.env.JWT_SECRET?.trim() ||
                            process.env.NEXTAUTH_SECRET?.trim() ||
                            '';
                        if (!t) throw Error('missing_app_jwt_secret');
                        let r = b(Buffer.from(JSON.stringify(e))),
                            a = b(
                                y.default
                                    .createHmac('sha256', t)
                                    .update(r)
                                    .digest()
                            );
                        return `${r}.${a}`;
                    })({ userId: u, email: c, iat: p, exp: p + 600 }),
                    g = new URL('/api/mobile/auth-redirect', t);
                return (
                    g.searchParams.set('companyId', i.companyId),
                    g.searchParams.set('redirect_uri', i.redirectUri),
                    g.searchParams.set('sid', m),
                    T(g.toString())
                );
            } catch (a) {
                let e = String(a?.message || 'server_error'),
                    t =
                        'missing_google_env' === e
                            ? 'server_error'
                            : 'company_not_found' === e
                              ? 'company_not_found'
                              : 'company_inactive' === e
                                ? 'company_inactive'
                                : 'user_inactive' === e
                                  ? 'user_inactive'
                                  : 'missing_app_jwt_secret' === e
                                    ? 'missing_app_jwt_secret'
                                    : 'server_error',
                    r =
                        'missing_google_env' === e
                            ? 'GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET não configurados no backend.'
                            : 'company_not_found' === e
                              ? 'Empresa não encontrada.'
                              : 'company_inactive' === e
                                ? 'Empresa inativa.'
                                : 'user_inactive' === e
                                  ? 'Usuário inativo.'
                                  : 'missing_app_jwt_secret' === e
                                    ? 'APP_JWT_SECRET (ou JWT_SECRET/NEXTAUTH_SECRET) não configurado no backend.'
                                    : 'Erro no servidor ao concluir login.';
                if (o) return T(S(o, { error: t, message: r }));
                return v.NextResponse.json(
                    { ok: !1, error: t, message: r },
                    { status: 500 }
                );
            }
        }
        e.s(['GET', () => U, 'dynamic', 0, 'force-dynamic'], 499608);
        var N = e.i(499608);
        let O = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/auth/google/callback/route',
                    pathname: '/api/mobile/auth/google/callback',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/auth/google/callback/route.ts',
                nextConfigOutput: 'standalone',
                userland: N,
            }),
            {
                workAsyncStorage: k,
                workUnitAsyncStorage: L,
                serverHooks: H,
            } = O;
        function j() {
            return (0, a.patchFetch)({
                workAsyncStorage: k,
                workUnitAsyncStorage: L,
            });
        }
        async function M(e, t, a) {
            O.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let v = '/api/mobile/auth/google/callback/route';
            v = v.replace(/\/index$/, '') || '/';
            let R = await O.prepare(e, t, {
                srcPage: v,
                multiZoneDraftMode: !1,
            });
            if (!R)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: w,
                    params: y,
                    nextConfig: C,
                    parsedUrl: S,
                    isDraftMode: T,
                    prerenderManifest: A,
                    routerServerContext: P,
                    isOnDemandRevalidate: x,
                    revalidateOnlyGenerated: I,
                    resolvedPathname: b,
                    clientReferenceManifest: U,
                    serverActionsManifest: N,
                } = R,
                k = (0, c.normalizeAppPath)(v),
                L = !!(A.dynamicRoutes[k] || A.routes[b]),
                H = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, S, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (L && !T) {
                let e = !!A.routes[b],
                    t = A.dynamicRoutes[k];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await H();
                    throw new f.NoFallbackError();
                }
            }
            let j = null;
            !L || O.isDev || T || (j = '/index' === (j = b) ? '/' : j);
            let M = !0 === O.isDev || !L,
                $ = L && !M;
            N &&
                U &&
                (0, o.setReferenceManifestsSingleton)({
                    page: v,
                    clientReferenceManifest: U,
                    serverActionsManifest: N,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: N,
                    }),
                });
            let D = e.method || 'GET',
                q = (0, i.getTracer)(),
                G = q.getActiveScopeSpan(),
                W = {
                    params: y,
                    prerenderManifest: A,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!C.experimental.authInterrupts,
                        },
                        cacheComponents: !!C.cacheComponents,
                        supportsDynamicResponse: M,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: C.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            O.onRequestError(e, t, a, P),
                    },
                    sharedContext: { buildId: w },
                },
                B = new l.NodeNextRequest(e),
                F = new l.NodeNextResponse(t),
                J = d.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        O.handle(J, W).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = q.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                u.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = r.get('next.route');
                            if (a) {
                                let t = `${D} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${D} ${v}`);
                        }),
                    s = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    c = async (n) => {
                        var i, c;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && x && I && !r)
                                        return (
                                            (t.statusCode = 404),
                                            t.setHeader(
                                                'x-nextjs-cache',
                                                'REVALIDATED'
                                            ),
                                            t.end(
                                                'This page could not be found'
                                            ),
                                            null
                                        );
                                    let i = await o(n);
                                    e.fetchMetrics = W.renderOpts.fetchMetrics;
                                    let c = W.renderOpts.pendingWaitUntil;
                                    c &&
                                        a.waitUntil &&
                                        (a.waitUntil(c), (c = void 0));
                                    let l = W.renderOpts.collectedTags;
                                    if (!L)
                                        return (
                                            await (0, m.sendResponse)(
                                                B,
                                                F,
                                                i,
                                                W.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            g.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (l && (t[_.NEXT_CACHE_TAGS_HEADER] = l),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    W.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    W.renderOpts
                                                        .collectedRevalidate >=
                                                    _.INFINITE_CACHE
                                                ) &&
                                                W.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    W.renderOpts
                                                        .collectedExpire ||
                                                W.renderOpts.collectedExpire >=
                                                    _.INFINITE_CACHE
                                                    ? void 0
                                                    : W.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: E.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: i.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: r,
                                                expire: a,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await O.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: v,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: $,
                                                        isOnDemandRevalidate: x,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await O.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: j,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: A,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: x,
                                revalidateOnlyGenerated: I,
                                responseGenerator: l,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!L) return null;
                        if (
                            (null == d || null == (i = d.value)
                                ? void 0
                                : i.kind) !== E.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == d || null == (c = d.value) ? void 0 : c.kind}`
                                ),
                                '__NEXT_ERROR_CODE',
                                {
                                    value: 'E701',
                                    enumerable: !1,
                                    configurable: !0,
                                }
                            );
                        (s ||
                            t.setHeader(
                                'x-nextjs-cache',
                                x
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            T &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let u = (0, g.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (s && L) || u.delete(_.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                u.get('Cache-Control') ||
                                u.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                B,
                                F,
                                new Response(d.value.body, {
                                    headers: u,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                G
                    ? await c(G)
                    : await q.withPropagatedContext(e.headers, () =>
                          q.trace(
                              u.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${D} ${v}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': D,
                                      'http.target': e.url,
                                  },
                              },
                              c
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof f.NoFallbackError ||
                        (await O.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: k,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: $,
                                isOnDemandRevalidate: x,
                            }),
                        })),
                    L)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        B,
                        F,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => M,
                'patchFetch',
                () => j,
                'routeModule',
                () => O,
                'serverHooks',
                () => H,
                'workAsyncStorage',
                () => k,
                'workUnitAsyncStorage',
                () => L,
            ],
            98766
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_f5e3b7a3.js.map
