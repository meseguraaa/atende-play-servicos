module.exports = [
    67667,
    (__turbopack_context__) => {
        'use strict';
        var __TURBOPACK__imported__module__154154__ =
                __turbopack_context__.i(154154),
            __TURBOPACK__imported__module__140407__ =
                __turbopack_context__.i(140407),
            __TURBOPACK__imported__module__493068__ =
                __turbopack_context__.i(493068),
            __TURBOPACK__imported__module__821498__ =
                __turbopack_context__.i(821498),
            __TURBOPACK__imported__module__161599__ =
                __turbopack_context__.i(161599),
            __TURBOPACK__imported__module__182716__ =
                __turbopack_context__.i(182716),
            __TURBOPACK__imported__module__857635__ =
                __turbopack_context__.i(857635),
            __TURBOPACK__imported__module__337047__ =
                __turbopack_context__.i(337047),
            __TURBOPACK__imported__module__528171__ =
                __turbopack_context__.i(528171),
            __TURBOPACK__imported__module__367300__ =
                __turbopack_context__.i(367300),
            __TURBOPACK__imported__module__102610__ =
                __turbopack_context__.i(102610),
            __TURBOPACK__imported__module__670893__ =
                __turbopack_context__.i(670893),
            __TURBOPACK__imported__module__902769__ =
                __turbopack_context__.i(902769),
            __TURBOPACK__imported__module__46094__ =
                __turbopack_context__.i(46094),
            __TURBOPACK__imported__module__622730__ =
                __turbopack_context__.i(622730),
            __TURBOPACK__imported__module__811178__ =
                __turbopack_context__.i(811178),
            __TURBOPACK__imported__module__193695__ =
                __turbopack_context__.i(193695),
            __TURBOPACK__imported__module__629399__ =
                __turbopack_context__.i(629399),
            __TURBOPACK__imported__module__377404__ =
                __turbopack_context__.i(377404),
            __TURBOPACK__imported__module__738342__ =
                __turbopack_context__.i(738342),
            __TURBOPACK__imported__module__698043__ =
                __turbopack_context__.i(698043),
            __TURBOPACK__imported__module__666680__ =
                __turbopack_context__.i(666680),
            __TURBOPACK__imported__module__453852__ =
                __turbopack_context__.i(453852);
        let dynamic = 'force-dynamic';
        function mapMemberRoleToAppRole(e) {
            return 'OWNER' === e || 'ADMIN' === e
                ? 'ADMIN'
                : 'STAFF' === e
                  ? 'PROFESSIONAL'
                  : 'CLIENT';
        }
        function mapOauthError(e) {
            let t = String(e || '').trim();
            return 'OAuthAccountNotLinked' === t
                ? 'Essa conta já existe com outro método de login. Use o método anterior ou peça para vincular o Google.'
                : 'AccessDenied' === t
                  ? 'Acesso negado. Tente novamente.'
                  : 'Configuration' === t
                    ? 'Configuração de login inválida.'
                    : 'user_inactive' === t
                      ? 'Usuário inativo.'
                      : 'user_not_found' === t
                        ? 'Usuário não encontrado.'
                        : 'not_authenticated' === t
                          ? 'Não autenticado.'
                          : 'missing_user_id' === t
                            ? 'Falha ao identificar usuário.'
                            : 'missing_company_id' === t
                              ? 'Falha ao identificar empresa.'
                              : 'company_not_allowed' === t
                                ? 'Você não tem acesso a esta empresa neste app.'
                                : 'company_inactive' === t
                                  ? 'Empresa inativa.'
                                  : 'company_not_found' === t
                                    ? 'Empresa não encontrada.'
                                    : 'invalid_redirect_uri' === t
                                      ? 'Redirect inválido.'
                                      : 'server_error' === t
                                        ? 'Erro no servidor.'
                                        : 'nextauth_secret_missing' === t
                                          ? 'NEXTAUTH_SECRET não configurado no backend.'
                                          : 'invalid_sid' === t
                                            ? 'Sessão temporária inválida ou expirada.'
                                            : 'missing_app_jwt_secret' === t
                                              ? 'APP_JWT_SECRET (ou JWT_SECRET) não configurado no backend.'
                                              : 'Não foi possível autenticar. Tente novamente.';
        }
        function computeProfileComplete(e) {
            let t = 'string' == typeof e.phone && e.phone.trim().length > 0,
                r =
                    e.birthday instanceof Date &&
                    !Number.isNaN(e.birthday.getTime());
            return t && r;
        }
        function readCompanyKey(e) {
            return String(
                e.searchParams.get('companyId') ??
                    e.searchParams.get('company_id') ??
                    e.searchParams.get('tenant') ??
                    e.searchParams.get('slug') ??
                    ''
            ).trim();
        }
        function withParams(e, t) {
            try {
                let r = new URL(e);
                for (let [e, n] of Object.entries(t)) r.searchParams.set(e, n);
                return r.toString();
            } catch {
                let [r, n] = e.split('#'),
                    a = r.includes('?') ? '&' : '?',
                    i = Object.entries(t)
                        .map(
                            ([e, t]) =>
                                `${encodeURIComponent(e)}=${encodeURIComponent(t)}`
                        )
                        .join('&'),
                    o = `${r}${a}${i}`;
                return n ? `${o}#${n}` : o;
            }
        }
        function redirect302(e) {
            let t =
                __TURBOPACK__imported__module__738342__.NextResponse.redirect(
                    e,
                    { status: 302 }
                );
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
        function isAllowedRedirectUri(e) {
            let t = String(e || '').trim();
            return t.startsWith('agendaplay://') || t.startsWith('exp://');
        }
        async function tryGetNextAuthToken(req) {
            if (!process.env.NEXTAUTH_SECRET) return null;
            try {
                let dynamicRequire = eval('require'),
                    mod = dynamicRequire('next-auth/jwt');
                if ('function' != typeof mod?.getToken) return null;
                let t = await mod.getToken({
                    req: req,
                    secret: process.env.NEXTAUTH_SECRET,
                });
                return t ?? null;
            } catch {
                return null;
            }
        }
        function getSharedSecretForSid() {
            return (
                process.env.APP_JWT_SECRET?.trim() ||
                process.env.MOBILE_JWT_SECRET?.trim() ||
                process.env.JWT_SECRET?.trim() ||
                process.env.NEXTAUTH_SECRET?.trim() ||
                ''
            );
        }
        function base64UrlEncode(e) {
            return ('string' == typeof e ? Buffer.from(e) : e)
                .toString('base64')
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }
        function base64UrlDecodeToBuffer(e) {
            let t = String(e || '')
                    .replace(/-/g, '+')
                    .replace(/_/g, '/'),
                r = t.length % 4 == 0 ? '' : '='.repeat(4 - (t.length % 4));
            return Buffer.from(`${t}${r}`, 'base64');
        }
        function signHs256(e, t) {
            return base64UrlEncode(
                __TURBOPACK__imported__module__666680__.default
                    .createHmac('sha256', e)
                    .update(t)
                    .digest()
            );
        }
        function safeJsonParse(e) {
            try {
                return JSON.parse(e);
            } catch {
                return null;
            }
        }
        function timingSafeEq(e, t) {
            let r = Buffer.from(e),
                n = Buffer.from(t);
            return (
                r.length === n.length &&
                __TURBOPACK__imported__module__666680__.default.timingSafeEqual(
                    r,
                    n
                )
            );
        }
        function verifySid(e) {
            let t = getSharedSecretForSid();
            if (!t) return null;
            let [r, n] = String(e || '')
                .trim()
                .split('.');
            if (!r || !n || !timingSafeEq(n, signHs256(t, r))) return null;
            let a = safeJsonParse(base64UrlDecodeToBuffer(r).toString('utf8'));
            if (!a?.userId || !a?.exp) return null;
            let i = Math.floor(Date.now() / 1e3);
            return a.exp < i ? null : a;
        }
        function extractUserIdFromNextAuthToken(e) {
            return e
                ? 'string' == typeof e.id
                    ? String(e.id).trim()
                    : 'string' == typeof e.sub
                      ? String(e.sub).trim()
                      : ''
                : '';
        }
        async function GET(e) {
            let t = new URL(e.url),
                r = t.searchParams.get('redirect_uri');
            if (!r)
                return __TURBOPACK__imported__module__738342__.NextResponse.json(
                    { error: 'redirect_uri ausente' },
                    { status: 400 }
                );
            let n = String(r).trim();
            if (!isAllowedRedirectUri(n))
                return __TURBOPACK__imported__module__738342__.NextResponse.json(
                    { ok: !1, error: 'invalid_redirect_uri' },
                    { status: 400 }
                );
            let a = t.searchParams.get('error');
            if (a) {
                let e = mapOauthError(a);
                return redirect302(
                    withParams(n, { error: String(a), message: e })
                );
            }
            try {
                let r = readCompanyKey(t),
                    a = String(process.env.DEFAULT_TENANT_SLUG || '').trim(),
                    i = await tryGetNextAuthToken(e),
                    o = extractUserIdFromNextAuthToken(i),
                    s = String(t.searchParams.get('sid') || '').trim(),
                    l = s ? verifySid(s) : null;
                if (s && !l && !o) {
                    let e = mapOauthError('invalid_sid');
                    return redirect302(
                        withParams(n, { error: 'invalid_sid', message: e })
                    );
                }
                let u = o || l?.userId || '';
                if (!u) {
                    let e = mapOauthError('not_authenticated');
                    return redirect302(
                        withParams(n, {
                            error: 'not_authenticated',
                            message: e,
                        })
                    );
                }
                let c =
                        'string' == typeof i?.companyId
                            ? String(i.companyId).trim()
                            : '',
                    d = r || c || a;
                if (!d) {
                    let e = mapOauthError('missing_company_id');
                    return redirect302(
                        withParams(n, {
                            error: 'missing_company_id',
                            message: e,
                        })
                    );
                }
                let p =
                    await __TURBOPACK__imported__module__698043__.prisma.company.findFirst(
                        {
                            where: {
                                isActive: !0,
                                OR: [{ id: d }, { slug: d }],
                            },
                            select: { id: !0 },
                        }
                    );
                if (!p) {
                    if (
                        !(await __TURBOPACK__imported__module__698043__.prisma.company.findFirst(
                            {
                                where: { OR: [{ id: d }, { slug: d }] },
                                select: { id: !0, isActive: !0 },
                            }
                        ))
                    ) {
                        let e = mapOauthError('company_not_found');
                        return redirect302(
                            withParams(n, {
                                error: 'company_not_found',
                                message: e,
                            })
                        );
                    }
                    let e = mapOauthError('company_inactive');
                    return redirect302(
                        withParams(n, { error: 'company_inactive', message: e })
                    );
                }
                let m = p.id,
                    f =
                        await __TURBOPACK__imported__module__698043__.prisma.user.findFirst(
                            {
                                where: { id: u },
                                select: {
                                    id: !0,
                                    name: !0,
                                    email: !0,
                                    image: !0,
                                    phone: !0,
                                    birthday: !0,
                                    isActive: !0,
                                },
                            }
                        );
                if (!f) {
                    let e = mapOauthError('user_not_found');
                    return redirect302(
                        withParams(n, { error: 'user_not_found', message: e })
                    );
                }
                if (!f.isActive) {
                    let e = mapOauthError('user_inactive');
                    return redirect302(
                        withParams(n, { error: 'user_inactive', message: e })
                    );
                }
                let h =
                    await __TURBOPACK__imported__module__698043__.prisma.companyMember.findFirst(
                        {
                            where: { companyId: m, userId: f.id, isActive: !0 },
                            select: {
                                role: !0,
                                companyId: !0,
                                lastUnitId: !0,
                                isActive: !0,
                            },
                        }
                    );
                if (!h || !1 === h.isActive) {
                    let e = mapOauthError('company_not_allowed');
                    return redirect302(
                        withParams(n, {
                            error: 'company_not_allowed',
                            message: e,
                        })
                    );
                }
                let g = computeProfileComplete({
                        phone: f.phone ?? null,
                        birthday: f.birthday ?? null,
                    }),
                    _ = mapMemberRoleToAppRole(h.role),
                    v = await (0,
                    __TURBOPACK__imported__module__453852__.signAppJwt)({
                        sub: f.id,
                        role: _,
                        companyId: h.companyId,
                        email: f.email ?? void 0,
                        name: f.name ?? null,
                    });
                return redirect302(
                    withParams(n, {
                        token: v,
                        companyId: h.companyId,
                        profile_complete: g ? '1' : '0',
                    })
                );
            } catch (t) {
                let e = String(t?.message || '');
                if (
                    e.includes('APP_JWT_SECRET') ||
                    e.includes('missing_app_jwt_secret')
                )
                    return redirect302(
                        withParams(n, {
                            error: 'missing_app_jwt_secret',
                            message: mapOauthError('missing_app_jwt_secret'),
                        })
                    );
                return (
                    console.error('[mobile auth-redirect] error:', t),
                    redirect302(
                        withParams(n, {
                            error: 'server_error',
                            message: mapOauthError('server_error'),
                        })
                    )
                );
            }
        }
        __turbopack_context__.s(
            ['GET', () => GET, 'dynamic', 0, dynamic],
            740174
        );
        var __TURBOPACK__imported__module__740174__ =
            __turbopack_context__.i(740174);
        let nextConfigOutput = 'standalone',
            routeModule =
                new __TURBOPACK__imported__module__154154__.AppRouteRouteModule(
                    {
                        definition: {
                            kind: __TURBOPACK__imported__module__140407__
                                .RouteKind.APP_ROUTE,
                            page: '/api/mobile/auth-redirect/route',
                            pathname: '/api/mobile/auth-redirect',
                            filename: 'route',
                            bundlePath: '',
                        },
                        distDir: '.next',
                        relativeProjectDir: '',
                        resolvedPagePath:
                            '[project]/src/app/api/mobile/auth-redirect/route.ts',
                        nextConfigOutput,
                        userland: __TURBOPACK__imported__module__740174__,
                    }
                ),
            { workAsyncStorage, workUnitAsyncStorage, serverHooks } =
                routeModule;
        function patchFetch() {
            return (0, __TURBOPACK__imported__module__493068__.patchFetch)({
                workAsyncStorage,
                workUnitAsyncStorage,
            });
        }
        async function handler(e, t, r) {
            routeModule.isDev &&
                (0, __TURBOPACK__imported__module__821498__.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let n = '/api/mobile/auth-redirect/route';
            n = n.replace(/\/index$/, '') || '/';
            let a = !1,
                i = await routeModule.prepare(e, t, {
                    srcPage: n,
                    multiZoneDraftMode: a,
                });
            if (!i)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == r.waitUntil ||
                        r.waitUntil.call(r, Promise.resolve()),
                    null
                );
            let {
                    buildId: o,
                    params: s,
                    nextConfig: l,
                    parsedUrl: u,
                    isDraftMode: c,
                    prerenderManifest: d,
                    routerServerContext: p,
                    isOnDemandRevalidate: m,
                    revalidateOnlyGenerated: f,
                    resolvedPathname: h,
                    clientReferenceManifest: g,
                    serverActionsManifest: _,
                } = i,
                v = (0,
                __TURBOPACK__imported__module__337047__.normalizeAppPath)(n),
                R = !!(d.dynamicRoutes[v] || d.routes[h]),
                E = async () => (
                    (null == p ? void 0 : p.render404)
                        ? await p.render404(e, t, u, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (R && !c) {
                let e = !!d.routes[h],
                    t = d.dynamicRoutes[v];
                if (t && !1 === t.fallback && !e) {
                    if (l.experimental.adapterPath) return await E();
                    throw new __TURBOPACK__imported__module__193695__.NoFallbackError();
                }
            }
            let y = null;
            !R ||
                routeModule.isDev ||
                c ||
                (y = '/index' === (y = h) ? '/' : y);
            let w = !0 === routeModule.isDev || !R,
                T = R && !w;
            _ &&
                g &&
                (0,
                __TURBOPACK__imported__module__182716__.setReferenceManifestsSingleton)(
                    {
                        page: n,
                        clientReferenceManifest: g,
                        serverActionsManifest: _,
                        serverModuleMap: (0,
                        __TURBOPACK__imported__module__857635__.createServerModuleMap)(
                            { serverActionsManifest: _ }
                        ),
                    }
                );
            let A = e.method || 'GET',
                S = (0, __TURBOPACK__imported__module__161599__.getTracer)(),
                C = S.getActiveScopeSpan(),
                N = {
                    params: s,
                    prerenderManifest: d,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!l.experimental.authInterrupts,
                        },
                        cacheComponents: !!l.cacheComponents,
                        supportsDynamicResponse: w,
                        incrementalCache: (0,
                        __TURBOPACK__imported__module__821498__.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: l.cacheLife,
                        waitUntil: r.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            routeModule.onRequestError(e, t, n, p),
                    },
                    sharedContext: { buildId: o },
                },
                b = new __TURBOPACK__imported__module__528171__.NodeNextRequest(
                    e
                ),
                x =
                    new __TURBOPACK__imported__module__528171__.NodeNextResponse(
                        t
                    ),
                P =
                    __TURBOPACK__imported__module__367300__.NextRequestAdapter.fromNodeNextRequest(
                        b,
                        (0,
                        __TURBOPACK__imported__module__367300__.signalFromNodeResponse)(
                            t
                        )
                    );
            try {
                let a = async (e) =>
                        routeModule.handle(P, N).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = S.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                __TURBOPACK__imported__module__102610__
                                    .BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = r.get('next.route');
                            if (a) {
                                let t = `${A} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${A} ${n}`);
                        }),
                    i = !!(0,
                    __TURBOPACK__imported__module__821498__.getRequestMeta)(
                        e,
                        'minimalMode'
                    ),
                    o = async (o) => {
                        var s, u;
                        let h = async ({ previousCacheEntry: s }) => {
                                try {
                                    if (!i && m && f && !s)
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
                                    let n = await a(o);
                                    e.fetchMetrics = N.renderOpts.fetchMetrics;
                                    let l = N.renderOpts.pendingWaitUntil;
                                    l &&
                                        r.waitUntil &&
                                        (r.waitUntil(l), (l = void 0));
                                    let u = N.renderOpts.collectedTags;
                                    if (!R)
                                        return (
                                            await (0,
                                            __TURBOPACK__imported__module__902769__.sendResponse)(
                                                b,
                                                x,
                                                n,
                                                N.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await n.blob(),
                                            t = (0,
                                            __TURBOPACK__imported__module__46094__.toNodeOutgoingHttpHeaders)(
                                                n.headers
                                            );
                                        (u &&
                                            (t[
                                                __TURBOPACK__imported__module__811178__.NEXT_CACHE_TAGS_HEADER
                                            ] = u),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    N.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    N.renderOpts
                                                        .collectedRevalidate >=
                                                    __TURBOPACK__imported__module__811178__.INFINITE_CACHE
                                                ) &&
                                                N.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    N.renderOpts
                                                        .collectedExpire ||
                                                N.renderOpts.collectedExpire >=
                                                    __TURBOPACK__imported__module__811178__.INFINITE_CACHE
                                                    ? void 0
                                                    : N.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: __TURBOPACK__imported__module__377404__
                                                    .CachedRouteKind.APP_ROUTE,
                                                status: n.status,
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
                                        (null == s ? void 0 : s.isStale) &&
                                            (await routeModule.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: n,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    __TURBOPACK__imported__module__670893__.getRevalidateReason)(
                                                        {
                                                            isStaticGeneration:
                                                                T,
                                                            isOnDemandRevalidate:
                                                                m,
                                                        }
                                                    ),
                                                },
                                                p
                                            )),
                                        t
                                    );
                                }
                            },
                            g = await routeModule.handleResponse({
                                req: e,
                                nextConfig: l,
                                cacheKey: y,
                                routeKind:
                                    __TURBOPACK__imported__module__140407__
                                        .RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: d,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: m,
                                revalidateOnlyGenerated: f,
                                responseGenerator: h,
                                waitUntil: r.waitUntil,
                                isMinimalMode: i,
                            });
                        if (!R) return null;
                        if (
                            (null == g || null == (s = g.value)
                                ? void 0
                                : s.kind) !==
                            __TURBOPACK__imported__module__377404__
                                .CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == g || null == (u = g.value) ? void 0 : u.kind}`
                                ),
                                '__NEXT_ERROR_CODE',
                                {
                                    value: 'E701',
                                    enumerable: !1,
                                    configurable: !0,
                                }
                            );
                        (i ||
                            t.setHeader(
                                'x-nextjs-cache',
                                m
                                    ? 'REVALIDATED'
                                    : g.isMiss
                                      ? 'MISS'
                                      : g.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            c &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let _ = (0,
                        __TURBOPACK__imported__module__46094__.fromNodeOutgoingHttpHeaders)(
                            g.value.headers
                        );
                        return (
                            (i && R) ||
                                _.delete(
                                    __TURBOPACK__imported__module__811178__.NEXT_CACHE_TAGS_HEADER
                                ),
                            !g.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                _.get('Cache-Control') ||
                                _.set(
                                    'Cache-Control',
                                    (0,
                                    __TURBOPACK__imported__module__622730__.getCacheControlHeader)(
                                        g.cacheControl
                                    )
                                ),
                            await (0,
                            __TURBOPACK__imported__module__902769__.sendResponse)(
                                b,
                                x,
                                new Response(g.value.body, {
                                    headers: _,
                                    status: g.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                C
                    ? await o(C)
                    : await S.withPropagatedContext(e.headers, () =>
                          S.trace(
                              __TURBOPACK__imported__module__102610__
                                  .BaseServerSpan.handleRequest,
                              {
                                  spanName: `${A} ${n}`,
                                  kind: __TURBOPACK__imported__module__161599__
                                      .SpanKind.SERVER,
                                  attributes: {
                                      'http.method': A,
                                      'http.target': e.url,
                                  },
                              },
                              o
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof
                        __TURBOPACK__imported__module__193695__.NoFallbackError ||
                        (await routeModule.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: v,
                            routeType: 'route',
                            revalidateReason: (0,
                            __TURBOPACK__imported__module__670893__.getRevalidateReason)(
                                {
                                    isStaticGeneration: T,
                                    isOnDemandRevalidate: m,
                                }
                            ),
                        })),
                    R)
                )
                    throw t;
                return (
                    await (0,
                    __TURBOPACK__imported__module__902769__.sendResponse)(
                        b,
                        x,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        __turbopack_context__.s(
            [
                'handler',
                () => handler,
                'patchFetch',
                () => patchFetch,
                'routeModule',
                () => routeModule,
                'serverHooks',
                () => serverHooks,
                'workAsyncStorage',
                () => workAsyncStorage,
                'workUnitAsyncStorage',
                () => workUnitAsyncStorage,
            ],
            67667
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_d1bd73c6.js.map
