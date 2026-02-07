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
    347058,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            o = e.i(161599),
            s = e.i(182716),
            i = e.i(857635),
            l = e.i(337047),
            u = e.i(528171),
            d = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            h = e.i(902769),
            m = e.i(46094),
            v = e.i(622730),
            x = e.i(811178),
            R = e.i(193695);
        e.i(629399);
        var w = e.i(377404),
            f = e.i(738342),
            g = e.i(698043);
        e.i(212669);
        var y = e.i(331751);
        async function E(e) {
            let t = await (0, y.requirePlatformForModuleApi)('DASHBOARD');
            if (t instanceof f.NextResponse) return t;
            try {
                var r, a, n;
                let t,
                    { searchParams: o } = new URL(e.url),
                    s =
                        ((r = o.get('companyId')),
                        (t = String(r ?? '').trim()) && 'all' !== t ? t : null),
                    i = s ? { companyId: s } : void 0,
                    [l, u] = await Promise.all([
                        g.prisma.company.count({ where: { isActive: !0 } }),
                        g.prisma.company.count({ where: { isActive: !1 } }),
                    ]),
                    [d, p] = await Promise.all([
                        g.prisma.unit.count({
                            where: { ...(i ?? {}), isActive: !0 },
                        }),
                        g.prisma.unit.count({
                            where: { ...(i ?? {}), isActive: !1 },
                        }),
                    ]),
                    [c, h] = await Promise.all([
                        g.prisma.professional.count({
                            where: { ...(i ?? {}), isActive: !0 },
                        }),
                        g.prisma.professional.count({
                            where: { ...(i ?? {}), isActive: !1 },
                        }),
                    ]),
                    [m, v] = await Promise.all([
                        g.prisma.appointment.count({ where: { ...(i ?? {}) } }),
                        g.prisma.order.count({ where: { ...(i ?? {}) } }),
                    ]),
                    x = await g.prisma.service.count({
                        where: { ...(i ?? {}) },
                    }),
                    [R, w, y] = await Promise.all([
                        g.prisma.product.count({
                            where: { ...(i ?? {}), isActive: !0 },
                        }),
                        g.prisma.product.count({
                            where: { ...(i ?? {}), isActive: !1 },
                        }),
                        g.prisma.product.count({
                            where: { ...(i ?? {}), stockQuantity: { lte: 0 } },
                        }),
                    ]),
                    E =
                        (
                            await g.prisma.productSale.aggregate({
                                _sum: { quantity: !0 },
                                where: s ? { companyId: s } : void 0,
                            })
                        )._sum.quantity ?? 0;
                return (
                    (a = {
                        scope: s ? { companyId: s } : { global: !0 },
                        box1: {
                            companiesActive: l,
                            companiesInactive: u,
                            unitsActive: d,
                            unitsInactive: p,
                        },
                        box2: {
                            professionalsActive: c,
                            professionalsInactive: h,
                        },
                        box3: { appointmentsCount: m, checkoutsCount: v },
                        box4: { servicesCount: x },
                        box5: {
                            productsActive: R,
                            productsInactive: w,
                            productsSoldQty: E,
                            productsOutOfStock: y,
                        },
                    }),
                    (n = {
                        status: 200,
                        headers: { 'Cache-Control': 'no-store' },
                    }),
                    f.NextResponse.json({ ok: !0, ...a }, n)
                );
            } catch (e) {
                return (
                    console.error('[platform dashboard summary] error:', e),
                    (function (e, t = 400) {
                        return f.NextResponse.json(
                            { ok: !1, error: e },
                            { status: t }
                        );
                    })('Erro ao carregar o resumo do dashboard.', 500)
                );
            }
        }
        e.s(
            ['GET', () => E, 'dynamic', 0, 'force-dynamic', 'revalidate', 0, 0],
            155929
        );
        var A = e.i(155929);
        let C = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/plataform/dashboard/summary/route',
                    pathname: '/api/plataform/dashboard/summary',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/plataform/dashboard/summary/route.ts',
                nextConfigOutput: 'standalone',
                userland: A,
            }),
            {
                workAsyncStorage: b,
                workUnitAsyncStorage: P,
                serverHooks: N,
            } = C;
        function T() {
            return (0, a.patchFetch)({
                workAsyncStorage: b,
                workUnitAsyncStorage: P,
            });
        }
        async function S(e, t, a) {
            C.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let f = '/api/plataform/dashboard/summary/route';
            f = f.replace(/\/index$/, '') || '/';
            let g = await C.prepare(e, t, {
                srcPage: f,
                multiZoneDraftMode: !1,
            });
            if (!g)
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
                    nextConfig: A,
                    parsedUrl: b,
                    isDraftMode: P,
                    prerenderManifest: N,
                    routerServerContext: T,
                    isOnDemandRevalidate: S,
                    revalidateOnlyGenerated: k,
                    resolvedPathname: q,
                    clientReferenceManifest: O,
                    serverActionsManifest: _,
                } = g,
                j = (0, l.normalizeAppPath)(f),
                H = !!(N.dynamicRoutes[j] || N.routes[q]),
                M = async () => (
                    (null == T ? void 0 : T.render404)
                        ? await T.render404(e, t, b, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (H && !P) {
                let e = !!N.routes[q],
                    t = N.dynamicRoutes[j];
                if (t && !1 === t.fallback && !e) {
                    if (A.experimental.adapterPath) return await M();
                    throw new R.NoFallbackError();
                }
            }
            let U = null;
            !H || C.isDev || P || (U = '/index' === (U = q) ? '/' : U);
            let I = !0 === C.isDev || !H,
                D = H && !I;
            _ &&
                O &&
                (0, s.setReferenceManifestsSingleton)({
                    page: f,
                    clientReferenceManifest: O,
                    serverActionsManifest: _,
                    serverModuleMap: (0, i.createServerModuleMap)({
                        serverActionsManifest: _,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, o.getTracer)(),
                K = $.getActiveScopeSpan(),
                B = {
                    params: E,
                    prerenderManifest: N,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!A.experimental.authInterrupts,
                        },
                        cacheComponents: !!A.cacheComponents,
                        supportsDynamicResponse: I,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: A.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            C.onRequestError(e, t, a, T),
                    },
                    sharedContext: { buildId: y },
                },
                L = new u.NodeNextRequest(e),
                G = new u.NodeNextResponse(t),
                V = d.NextRequestAdapter.fromNodeNextRequest(
                    L,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        C.handle(V, B).finally(() => {
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
                        var o, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!i && S && k && !r)
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
                                    let o = await s(n);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let u = B.renderOpts.collectedTags;
                                    if (!H)
                                        return (
                                            await (0, h.sendResponse)(
                                                L,
                                                G,
                                                o,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await o.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                o.headers
                                            );
                                        (u && (t[x.NEXT_CACHE_TAGS_HEADER] = u),
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
                                                    x.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    x.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: w.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: o.status,
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
                                            (await C.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: f,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: S,
                                                    }),
                                                },
                                                T
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await C.handleResponse({
                                req: e,
                                nextConfig: A,
                                cacheKey: U,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: N,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: S,
                                revalidateOnlyGenerated: k,
                                responseGenerator: u,
                                waitUntil: a.waitUntil,
                                isMinimalMode: i,
                            });
                        if (!H) return null;
                        if (
                            (null == d || null == (o = d.value)
                                ? void 0
                                : o.kind) !== w.CachedRouteKind.APP_ROUTE
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
                        (i ||
                            t.setHeader(
                                'x-nextjs-cache',
                                S
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            P &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, m.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (i && H) || p.delete(x.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, v.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                L,
                                G,
                                new Response(d.value.body, {
                                    headers: p,
                                    status: d.value.status || 200,
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
                                  kind: o.SpanKind.SERVER,
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
                        (await C.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: j,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: S,
                            }),
                        })),
                    H)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
                        L,
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
                () => S,
                'patchFetch',
                () => T,
                'routeModule',
                () => C,
                'serverHooks',
                () => N,
                'workAsyncStorage',
                () => b,
                'workUnitAsyncStorage',
                () => P,
            ],
            347058
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c3a655b0._.js.map
