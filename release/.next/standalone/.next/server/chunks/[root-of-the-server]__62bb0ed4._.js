module.exports = [
    918622,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/compiled/next-server/app-page-turbo.runtime.prod.js',
            () =>
                require('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js')
        );
    },
    556704,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/server/app-render/work-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/work-async-storage.external.js')
        );
    },
    832319,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/server/app-render/work-unit-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/work-unit-async-storage.external.js')
        );
    },
    324725,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/server/app-render/after-task-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/after-task-async-storage.external.js')
        );
    },
    120635,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/server/app-render/action-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/action-async-storage.external.js')
        );
    },
    19987,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            i = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            u = e.i(528171),
            d = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            f = e.i(46094),
            h = e.i(622730),
            w = e.i(811178),
            v = e.i(193695);
        e.i(629399);
        var g = e.i(377404),
            x = e.i(738342),
            A = e.i(387148),
            y = e.i(698043),
            R = e.i(212669);
        let I = 'admin_company_context';
        function E(e, t) {
            return x.NextResponse.json({ ok: !0, data: e }, t);
        }
        function C(e, t = 400) {
            return x.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function N(e, t, r) {
            return Math.max(t, Math.min(r, e));
        }
        function b(e) {
            return String(e ?? '').replace(/\D/g, '');
        }
        function M(e) {
            return String(e ?? '').trim();
        }
        function _(e) {
            let t = M(e);
            if (!t) return null;
            if (t.includes('/')) {
                let e = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                if (!e) return null;
                let r = Number(e[1]),
                    a = Number(e[2]),
                    n = Number(e[3]);
                if (!n || a < 1 || a > 12 || r < 1 || r > 31) return null;
                let i = new Date(n, a - 1, r);
                return i.getFullYear() !== n ||
                    i.getMonth() !== a - 1 ||
                    i.getDate() !== r
                    ? null
                    : i;
            }
            if (t.includes('-')) {
                let e = t.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                if (!e) return null;
                let r = Number(e[1]),
                    a = Number(e[2]),
                    n = Number(e[3]);
                if (!r || a < 1 || a > 12 || n < 1 || n > 31) return null;
                let i = new Date(r, a - 1, n);
                return i.getFullYear() !== r ||
                    i.getMonth() !== a - 1 ||
                    i.getDate() !== n
                    ? null
                    : i;
            }
            return null;
        }
        async function T(e) {
            let t = String(e?.companyId ?? '').trim();
            if (t) return t;
            let r = await (0, A.cookies)(),
                a = r.get(I)?.value;
            if (a) return a;
            let n = String(e?.userId ?? '').trim();
            if (n) {
                let e = await y.prisma.companyMember.findFirst({
                    where: { userId: n, isActive: !0 },
                    orderBy: { createdAt: 'asc' },
                    select: { companyId: !0 },
                });
                if (e?.companyId) return e.companyId;
            }
            throw Error(
                `companyId ausente (session.companyId, cookie "${I}" e sem fallback por membership).`
            );
        }
        async function D() {
            let e = await (0, A.cookies)(),
                t = e.get('admin_unit_context')?.value ?? 'all';
            return t && 'all' !== t ? t : null;
        }
        async function S(e) {
            try {
                var t;
                let r,
                    a = await (0, R.requireAdminForModuleApi)('CLIENTS');
                if (a instanceof x.NextResponse) return a;
                let n = await T(a),
                    i = new URL(e.url),
                    s = M(i.searchParams.get('q')),
                    o =
                        ((t = i.searchParams.get('sort')),
                        (r = M(t)),
                        'name_desc' === r
                            ? 'name_desc'
                            : 'createdAt_desc' === r
                              ? 'createdAt_desc'
                              : 'createdAt_asc' === r
                                ? 'createdAt_asc'
                                : 'name_asc'),
                    l = Number(i.searchParams.get('page') ?? '1'),
                    u = Number(i.searchParams.get('pageSize') ?? '10'),
                    d = Number.isFinite(l) ? Math.max(1, Math.floor(l)) : 1,
                    c = N(Number.isFinite(u) ? Math.floor(u) : 10, 1, 50),
                    p = {
                        companyMemberships: {
                            some: {
                                companyId: n,
                                isActive: !0,
                                role: 'CLIENT',
                            },
                        },
                    };
                s &&
                    (p.OR = [
                        { name: { contains: s, mode: 'insensitive' } },
                        { email: { contains: s, mode: 'insensitive' } },
                        { phone: { contains: s } },
                    ]);
                let m = await y.prisma.user.count({ where: p }),
                    f = Math.max(1, Math.ceil(m / c)),
                    h = N(d, 1, f),
                    w = await y.prisma.user.findMany({
                        where: p,
                        orderBy:
                            'name_desc' === o
                                ? { name: 'desc' }
                                : 'createdAt_desc' === o
                                  ? { createdAt: 'desc' }
                                  : 'createdAt_asc' === o
                                    ? { createdAt: 'asc' }
                                    : { name: 'asc' },
                        skip: (h - 1) * c,
                        take: c,
                        select: {
                            id: !0,
                            name: !0,
                            email: !0,
                            phone: !0,
                            image: !0,
                            birthday: !0,
                            createdAt: !0,
                        },
                    }),
                    v = await D();
                return E({
                    items: w,
                    page: h,
                    pageSize: c,
                    total: m,
                    totalPages: f,
                    selectedUnitId: v,
                });
            } catch (e) {
                return C(e?.message ?? 'Erro ao buscar clientes.', 500);
            }
        }
        async function P(e) {
            try {
                let t = await (0, R.requireAdminForModuleApi)('CLIENTS');
                if (t instanceof x.NextResponse) return t;
                let r = await T(t),
                    a = await e.json().catch(() => null);
                if (!a) return C('Body inválido.');
                let n = M(a.name),
                    i = M(a.email).toLowerCase(),
                    s = M(a.phone),
                    o = M(a.birthday);
                if (!n) return C('Informe o nome do cliente.');
                if (!i) return C('Informe o e-mail do cliente.');
                if (!s) return C('Informe o telefone do cliente.');
                if (b(s).length < 10)
                    return C('Informe um telefone válido (com DDD).');
                let l = _(o);
                if (!l)
                    return C(
                        'Informe uma data de nascimento válida (DD/MM/AAAA ou AAAA-MM-DD).'
                    );
                let u = await D(),
                    d = await y.prisma.user.upsert({
                        where: { email: i },
                        update: { name: n, phone: s, birthday: l },
                        create: {
                            name: n,
                            email: i,
                            phone: s,
                            birthday: l,
                            role: 'CLIENT',
                            isActive: !0,
                        },
                        select: { id: !0 },
                    });
                return (
                    await y.prisma.companyMember.upsert({
                        where: {
                            companyId_userId: { companyId: r, userId: d.id },
                        },
                        update: {
                            role: 'CLIENT',
                            isActive: !0,
                            ...(u ? { lastUnitId: u } : {}),
                        },
                        create: {
                            companyId: r,
                            userId: d.id,
                            role: 'CLIENT',
                            isActive: !0,
                            ...(u ? { lastUnitId: u } : {}),
                        },
                        select: { id: !0 },
                    }),
                    E({ id: d.id })
                );
            } catch (t) {
                let e = String(t?.message ?? '');
                if (
                    e.toLowerCase().includes('unique') &&
                    e.toLowerCase().includes('email')
                )
                    return C('Já existe um usuário com esse e-mail.', 409);
                return C(e || 'Erro ao criar cliente.', 500);
            }
        }
        async function k(e) {
            try {
                let t = await (0, R.requireAdminForModuleApi)('CLIENTS');
                if (t instanceof x.NextResponse) return t;
                let r = await T(t),
                    a = await e.json().catch(() => null);
                if (!a) return C('Body inválido.');
                let n = M(a.id),
                    i = M(a.name),
                    s = M(a.email).toLowerCase(),
                    o = M(a.phone),
                    l = M(a.birthday);
                if (!n) return C('Informe o id do cliente.');
                if (!i) return C('Informe o nome do cliente.');
                if (!s) return C('Informe o e-mail do cliente.');
                if (!o) return C('Informe o telefone do cliente.');
                if (b(o).length < 10)
                    return C('Informe um telefone válido (com DDD).');
                let u = _(l);
                if (!u)
                    return C(
                        'Informe uma data de nascimento válida (DD/MM/AAAA ou AAAA-MM-DD).'
                    );
                let d = await y.prisma.companyMember.findUnique({
                    where: { companyId_userId: { companyId: r, userId: n } },
                    select: { id: !0, userId: !0, role: !0, isActive: !0 },
                });
                if (!d || !d.isActive || 'CLIENT' !== d.role)
                    return C('Cliente não encontrado para esta empresa.', 404);
                let c = await y.prisma.user.findUnique({
                    where: { email: s },
                    select: { id: !0 },
                });
                if (c && c.id !== n)
                    return C('Já existe um usuário com esse e-mail.', 409);
                let p = await D();
                return (
                    await y.prisma.$transaction(async (e) => {
                        (await e.user.update({
                            where: { id: n },
                            data: { name: i, email: s, phone: o, birthday: u },
                            select: { id: !0 },
                        }),
                            await e.companyMember.update({
                                where: {
                                    companyId_userId: {
                                        companyId: r,
                                        userId: n,
                                    },
                                },
                                data: {
                                    role: 'CLIENT',
                                    isActive: !0,
                                    ...(p ? { lastUnitId: p } : {}),
                                },
                                select: { id: !0 },
                            }));
                    }),
                    E({ id: n })
                );
            } catch (t) {
                let e = String(t?.message ?? '');
                if (
                    e.toLowerCase().includes('unique') &&
                    e.toLowerCase().includes('email')
                )
                    return C('Já existe um usuário com esse e-mail.', 409);
                return C(e || 'Erro ao atualizar cliente.', 500);
            }
        }
        e.s(
            [
                'GET',
                () => S,
                'PATCH',
                () => k,
                'POST',
                () => P,
                'dynamic',
                0,
                'force-dynamic',
            ],
            929173
        );
        var q = e.i(929173);
        let O = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/clients/route',
                    pathname: '/api/admin/clients',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/clients/route.ts',
                nextConfigOutput: 'standalone',
                userland: q,
            }),
            {
                workAsyncStorage: U,
                workUnitAsyncStorage: j,
                serverHooks: L,
            } = O;
        function H() {
            return (0, a.patchFetch)({
                workAsyncStorage: U,
                workUnitAsyncStorage: j,
            });
        }
        async function F(e, t, a) {
            O.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let x = '/api/admin/clients/route';
            x = x.replace(/\/index$/, '') || '/';
            let A = await O.prepare(e, t, {
                srcPage: x,
                multiZoneDraftMode: !1,
            });
            if (!A)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: y,
                    params: R,
                    nextConfig: I,
                    parsedUrl: E,
                    isDraftMode: C,
                    prerenderManifest: N,
                    routerServerContext: b,
                    isOnDemandRevalidate: M,
                    revalidateOnlyGenerated: _,
                    resolvedPathname: T,
                    clientReferenceManifest: D,
                    serverActionsManifest: S,
                } = A,
                P = (0, l.normalizeAppPath)(x),
                k = !!(N.dynamicRoutes[P] || N.routes[T]),
                q = async () => (
                    (null == b ? void 0 : b.render404)
                        ? await b.render404(e, t, E, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (k && !C) {
                let e = !!N.routes[T],
                    t = N.dynamicRoutes[P];
                if (t && !1 === t.fallback && !e) {
                    if (I.experimental.adapterPath) return await q();
                    throw new v.NoFallbackError();
                }
            }
            let U = null;
            !k || O.isDev || C || (U = '/index' === (U = T) ? '/' : U);
            let j = !0 === O.isDev || !k,
                L = k && !j;
            S &&
                D &&
                (0, s.setReferenceManifestsSingleton)({
                    page: x,
                    clientReferenceManifest: D,
                    serverActionsManifest: S,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: S,
                    }),
                });
            let H = e.method || 'GET',
                F = (0, i.getTracer)(),
                $ = F.getActiveScopeSpan(),
                B = {
                    params: R,
                    prerenderManifest: N,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!I.experimental.authInterrupts,
                        },
                        cacheComponents: !!I.cacheComponents,
                        supportsDynamicResponse: j,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: I.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            O.onRequestError(e, t, a, b),
                    },
                    sharedContext: { buildId: y },
                },
                K = new u.NodeNextRequest(e),
                G = new u.NodeNextResponse(t),
                z = d.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        O.handle(z, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = F.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                c.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = r.get('next.route');
                            if (a) {
                                let t = `${H} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${H} ${x}`);
                        }),
                    o = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var i, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && M && _ && !r)
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
                                    let i = await s(n);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let u = B.renderOpts.collectedTags;
                                    if (!k)
                                        return (
                                            await (0, m.sendResponse)(
                                                K,
                                                G,
                                                i,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            f.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (u && (t[w.NEXT_CACHE_TAGS_HEADER] = u),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    B.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    B.renderOpts
                                                        .collectedRevalidate >=
                                                    w.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    w.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: g.CachedRouteKind
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
                                                    routePath: x,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: L,
                                                        isOnDemandRevalidate: M,
                                                    }),
                                                },
                                                b
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await O.handleResponse({
                                req: e,
                                nextConfig: I,
                                cacheKey: U,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: N,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: M,
                                revalidateOnlyGenerated: _,
                                responseGenerator: u,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!k) return null;
                        if (
                            (null == d || null == (i = d.value)
                                ? void 0
                                : i.kind) !== g.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == d || null == (l = d.value) ? void 0 : l.kind}`
                                ),
                                '__NEXT_ERROR_CODE',
                                {
                                    value: 'E701',
                                    enumerable: !1,
                                    configurable: !0,
                                }
                            );
                        (o ||
                            t.setHeader(
                                'x-nextjs-cache',
                                M
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            C &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, f.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (o && k) || c.delete(w.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                K,
                                G,
                                new Response(d.value.body, {
                                    headers: c,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                $
                    ? await l($)
                    : await F.withPropagatedContext(e.headers, () =>
                          F.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${H} ${x}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': H,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof v.NoFallbackError ||
                        (await O.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: P,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: L,
                                isOnDemandRevalidate: M,
                            }),
                        })),
                    k)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        K,
                        G,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => F,
                'patchFetch',
                () => H,
                'routeModule',
                () => O,
                'serverHooks',
                () => L,
                'workAsyncStorage',
                () => U,
                'workUnitAsyncStorage',
                () => j,
            ],
            19987
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__62bb0ed4._.js.map
