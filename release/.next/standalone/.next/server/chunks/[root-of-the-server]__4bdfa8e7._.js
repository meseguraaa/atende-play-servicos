module.exports = [
    698043,
    (e) => {
        'use strict';
        var t = e.i(29173);
        let r = globalThis.prisma ?? new t.PrismaClient({ log: ['error'] });
        e.s(['prisma', 0, r]);
    },
    29173,
    (e, t, r) => {
        t.exports = e.x('@prisma/client', () => require('@prisma/client'));
    },
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
    270406,
    (e, t, r) => {
        t.exports = e.x('next/dist/compiled/@opentelemetry/api', () =>
            require('next/dist/compiled/@opentelemetry/api')
        );
    },
    193695,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/shared/lib/no-fallback-error.external.js',
            () => require('next/dist/shared/lib/no-fallback-error.external.js')
        );
    },
    217520,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            s = e.i(161599),
            o = e.i(182716),
            i = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            h = e.i(902769),
            m = e.i(46094),
            x = e.i(622730),
            v = e.i(811178),
            R = e.i(193695);
        e.i(629399);
        var g = e.i(377404),
            f = e.i(738342),
            w = e.i(698043);
        function y() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            };
        }
        async function E() {
            return new f.NextResponse(null, { status: 204, headers: y() });
        }
        async function C(e) {
            try {
                var t;
                let r =
                    ((t = new URL(e.url)),
                    String(
                        t.searchParams.get('key') ??
                            t.searchParams.get('slug') ??
                            t.searchParams.get('tenant') ??
                            t.searchParams.get('companyId') ??
                            t.searchParams.get('company_id') ??
                            '' ??
                            ''
                    ).trim());
                if (!r)
                    return f.NextResponse.json(
                        { ok: !1, error: 'Informe key/slug/companyId' },
                        { status: 400, headers: y() }
                    );
                let a = await w.prisma.company.findFirst({
                    where: { OR: [{ id: r }, { slug: r }] },
                    select: {
                        id: !0,
                        name: !0,
                        slug: !0,
                        segment: !0,
                        isActive: !0,
                    },
                });
                if (!a)
                    return f.NextResponse.json(
                        { ok: !1, error: 'Empresa não encontrada' },
                        { status: 404, headers: y() }
                    );
                if (!a.isActive)
                    return f.NextResponse.json(
                        { ok: !1, error: 'Empresa inativa' },
                        { status: 403, headers: y() }
                    );
                return f.NextResponse.json(
                    {
                        ok: !0,
                        data: {
                            companyId: a.id,
                            name: a.name,
                            slug: a.slug,
                            segment: a.segment,
                        },
                    },
                    { status: 200, headers: y() }
                );
            } catch (e) {
                return (
                    console.error('[mobile companies/resolve]', e),
                    f.NextResponse.json(
                        { ok: !1, error: 'Erro inesperado' },
                        { status: 500, headers: y() }
                    )
                );
            }
        }
        e.s(
            [
                'GET',
                () => C,
                'OPTIONS',
                () => E,
                'dynamic',
                0,
                'force-dynamic',
                'revalidate',
                0,
                0,
            ],
            258265
        );
        var A = e.i(258265);
        let b = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/companies/resolve/route',
                    pathname: '/api/mobile/companies/resolve',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/companies/resolve/route.ts',
                nextConfigOutput: 'standalone',
                userland: A,
            }),
            {
                workAsyncStorage: N,
                workUnitAsyncStorage: P,
                serverHooks: T,
            } = b;
        function k() {
            return (0, a.patchFetch)({
                workAsyncStorage: N,
                workUnitAsyncStorage: P,
            });
        }
        async function O(e, t, a) {
            b.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let f = '/api/mobile/companies/resolve/route';
            f = f.replace(/\/index$/, '') || '/';
            let w = await b.prepare(e, t, {
                srcPage: f,
                multiZoneDraftMode: !1,
            });
            if (!w)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: y,
                    params: E,
                    nextConfig: C,
                    parsedUrl: A,
                    isDraftMode: N,
                    prerenderManifest: P,
                    routerServerContext: T,
                    isOnDemandRevalidate: k,
                    revalidateOnlyGenerated: O,
                    resolvedPathname: S,
                    clientReferenceManifest: j,
                    serverActionsManifest: q,
                } = w,
                I = (0, l.normalizeAppPath)(f),
                _ = !!(P.dynamicRoutes[I] || P.routes[S]),
                H = async () => (
                    (null == T ? void 0 : T.render404)
                        ? await T.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (_ && !N) {
                let e = !!P.routes[S],
                    t = P.dynamicRoutes[I];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await H();
                    throw new R.NoFallbackError();
                }
            }
            let M = null;
            !_ || b.isDev || N || (M = '/index' === (M = S) ? '/' : M);
            let U = !0 === b.isDev || !_,
                D = _ && !U;
            q &&
                j &&
                (0, o.setReferenceManifestsSingleton)({
                    page: f,
                    clientReferenceManifest: j,
                    serverActionsManifest: q,
                    serverModuleMap: (0, i.createServerModuleMap)({
                        serverActionsManifest: q,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, s.getTracer)(),
                K = $.getActiveScopeSpan(),
                L = {
                    params: E,
                    prerenderManifest: P,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!C.experimental.authInterrupts,
                        },
                        cacheComponents: !!C.cacheComponents,
                        supportsDynamicResponse: U,
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
                            b.onRequestError(e, t, a, T),
                    },
                    sharedContext: { buildId: y },
                },
                B = new d.NodeNextRequest(e),
                G = new d.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        b.handle(V, L).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = $.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                p.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = r.get('next.route');
                            if (a) {
                                let t = `${F} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${F} ${f}`);
                        }),
                    i = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var s, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!i && k && O && !r)
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
                                    let s = await o(n);
                                    e.fetchMetrics = L.renderOpts.fetchMetrics;
                                    let l = L.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let d = L.renderOpts.collectedTags;
                                    if (!_)
                                        return (
                                            await (0, h.sendResponse)(
                                                B,
                                                G,
                                                s,
                                                L.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await s.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                s.headers
                                            );
                                        (d && (t[v.NEXT_CACHE_TAGS_HEADER] = d),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    L.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    L.renderOpts
                                                        .collectedRevalidate >=
                                                    v.INFINITE_CACHE
                                                ) &&
                                                L.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    L.renderOpts
                                                        .collectedExpire ||
                                                L.renderOpts.collectedExpire >=
                                                    v.INFINITE_CACHE
                                                    ? void 0
                                                    : L.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: g.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: s.status,
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
                                            (await b.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: f,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: k,
                                                    }),
                                                },
                                                T
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await b.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: P,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: k,
                                revalidateOnlyGenerated: O,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: i,
                            });
                        if (!_) return null;
                        if (
                            (null == u || null == (s = u.value)
                                ? void 0
                                : s.kind) !== g.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == u || null == (l = u.value) ? void 0 : l.kind}`
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
                                k
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            N &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, m.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (i && _) || p.delete(v.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, x.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                B,
                                G,
                                new Response(u.value.body, {
                                    headers: p,
                                    status: u.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                K
                    ? await l(K)
                    : await $.withPropagatedContext(e.headers, () =>
                          $.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${F} ${f}`,
                                  kind: s.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': F,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof R.NoFallbackError ||
                        (await b.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: I,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: k,
                            }),
                        })),
                    _)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
                        B,
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
                () => O,
                'patchFetch',
                () => k,
                'routeModule',
                () => b,
                'serverHooks',
                () => T,
                'workAsyncStorage',
                () => N,
                'workUnitAsyncStorage',
                () => P,
            ],
            217520
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4bdfa8e7._.js.map
