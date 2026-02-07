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
    285072,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            a = e.i(821498),
            i = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            u = e.i(337047),
            l = e.i(528171),
            d = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            h = e.i(902769),
            m = e.i(46094),
            f = e.i(622730),
            v = e.i(811178),
            x = e.i(193695);
        e.i(629399);
        var R = e.i(377404),
            g = e.i(738342),
            y = e.i(698043),
            w = e.i(212669);
        function E(e, t = 400) {
            return g.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function N(e) {
            try {
                var t;
                let r = await (0, w.requireAdminForModule)('CHECKOUT'),
                    n = r.companyId;
                if (!n) return E('Empresa não encontrada na sessão.', 401);
                let a = r.id;
                if (!a) return E('Usuário não encontrado na sessão.', 401);
                let i = r.canSeeAllUnits,
                    s =
                        ((t = new URL(e.url).searchParams.get('unit')),
                        String(t ?? '').trim()),
                    o = null;
                if (i)
                    if (s && 'all' !== s) {
                        let e = await y.prisma.unit.findFirst({
                            where: { id: s, companyId: n, isActive: !0 },
                            select: { id: !0 },
                        });
                        if (!e) return E('Unidade inválida ou inativa.', 404);
                        o = [e.id];
                    } else o = null;
                else {
                    let e = (
                        await y.prisma.adminUnitAccess.findMany({
                            where: { companyId: n, userId: a },
                            select: { unitId: !0 },
                        })
                    ).map((e) => e.unitId);
                    if (0 === e.length) return E('Sem acesso a unidades.', 403);
                    if (s && 'all' !== s) {
                        if (!e.includes(s))
                            return E('Sem acesso a esta unidade.', 403);
                        o = [s];
                    } else o = e;
                }
                let u = o && o.length > 0 ? { unitId: { in: o } } : {},
                    l = (
                        await y.prisma.product.findMany({
                            where: { companyId: n, ...u, isActive: !0 },
                            orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
                            select: {
                                id: !0,
                                unitId: !0,
                                name: !0,
                                price: !0,
                                stockQuantity: !0,
                                category: !0,
                                isFeatured: !0,
                            },
                        })
                    ).map((e) => {
                        var t;
                        let r, n;
                        return {
                            id: e.id,
                            unitId: e.unitId,
                            name: e.name,
                            category: e.category,
                            isFeatured: e.isFeatured,
                            stockQuantity: e.stockQuantity,
                            price: String(e.price),
                            priceLabel:
                                ((t = e.price),
                                (n =
                                    ((r = (function (e) {
                                        if (null == e) return NaN;
                                        if ('number' == typeof e) return e;
                                        if ('string' == typeof e) {
                                            let t = Number(e.replace(',', '.'));
                                            return Number.isFinite(t) ? t : NaN;
                                        }
                                        if ('object' == typeof e) {
                                            if (
                                                'function' == typeof e.toNumber
                                            ) {
                                                let t = e.toNumber();
                                                return Number.isFinite(t)
                                                    ? t
                                                    : NaN;
                                            }
                                            if (
                                                'function' == typeof e.toString
                                            ) {
                                                let t = Number(
                                                    String(
                                                        e.toString()
                                                    ).replace(',', '.')
                                                );
                                                return Number.isFinite(t)
                                                    ? t
                                                    : NaN;
                                            }
                                        }
                                        return NaN;
                                    })(t)),
                                    Number.isFinite(r)
                                        ? Math.round(
                                              (r + Number.EPSILON) * 100
                                          ) / 100
                                        : 0)),
                                new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    minimumFractionDigits: 2,
                                }).format(n)),
                        };
                    });
                return (function (e, t = 200) {
                    return g.NextResponse.json(
                        { ok: !0, data: e },
                        { status: t }
                    );
                })({
                    products: l,
                    count: l.length,
                    unitScope: o ? 'filtered' : 'all',
                });
            } catch (e) {
                return E(e?.message ?? 'Erro interno.', 500);
            }
        }
        e.s(['GET', () => N], 443817);
        var C = e.i(443817);
        let b = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/checkout/products/route',
                    pathname: '/api/admin/checkout/products',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/checkout/products/route.ts',
                nextConfigOutput: 'standalone',
                userland: C,
            }),
            {
                workAsyncStorage: A,
                workUnitAsyncStorage: S,
                serverHooks: k,
            } = b;
        function T() {
            return (0, n.patchFetch)({
                workAsyncStorage: A,
                workUnitAsyncStorage: S,
            });
        }
        async function P(e, t, n) {
            b.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let g = '/api/admin/checkout/products/route';
            g = g.replace(/\/index$/, '') || '/';
            let y = await b.prepare(e, t, {
                srcPage: g,
                multiZoneDraftMode: !1,
            });
            if (!y)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == n.waitUntil ||
                        n.waitUntil.call(n, Promise.resolve()),
                    null
                );
            let {
                    buildId: w,
                    params: E,
                    nextConfig: N,
                    parsedUrl: C,
                    isDraftMode: A,
                    prerenderManifest: S,
                    routerServerContext: k,
                    isOnDemandRevalidate: T,
                    revalidateOnlyGenerated: P,
                    resolvedPathname: I,
                    clientReferenceManifest: O,
                    serverActionsManifest: U,
                } = y,
                j = (0, u.normalizeAppPath)(g),
                q = !!(S.dynamicRoutes[j] || S.routes[I]),
                F = async () => (
                    (null == k ? void 0 : k.render404)
                        ? await k.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (q && !A) {
                let e = !!S.routes[I],
                    t = S.dynamicRoutes[j];
                if (t && !1 === t.fallback && !e) {
                    if (N.experimental.adapterPath) return await F();
                    throw new x.NoFallbackError();
                }
            }
            let M = null;
            !q || b.isDev || A || (M = '/index' === (M = I) ? '/' : M);
            let _ = !0 === b.isDev || !q,
                H = q && !_;
            U &&
                O &&
                (0, s.setReferenceManifestsSingleton)({
                    page: g,
                    clientReferenceManifest: O,
                    serverActionsManifest: U,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: U,
                    }),
                });
            let D = e.method || 'GET',
                K = (0, i.getTracer)(),
                L = K.getActiveScopeSpan(),
                $ = {
                    params: E,
                    prerenderManifest: S,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!N.experimental.authInterrupts,
                        },
                        cacheComponents: !!N.cacheComponents,
                        supportsDynamicResponse: _,
                        incrementalCache: (0, a.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: N.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            b.onRequestError(e, t, n, k),
                    },
                    sharedContext: { buildId: w },
                },
                B = new l.NodeNextRequest(e),
                G = new l.NodeNextResponse(t),
                Q = d.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        b.handle(Q, $).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = K.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                c.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let n = r.get('next.route');
                            if (n) {
                                let t = `${D} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${D} ${g}`);
                        }),
                    o = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    u = async (a) => {
                        var i, u;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && T && P && !r)
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
                                    let i = await s(a);
                                    e.fetchMetrics = $.renderOpts.fetchMetrics;
                                    let u = $.renderOpts.pendingWaitUntil;
                                    u &&
                                        n.waitUntil &&
                                        (n.waitUntil(u), (u = void 0));
                                    let l = $.renderOpts.collectedTags;
                                    if (!q)
                                        return (
                                            await (0, h.sendResponse)(
                                                B,
                                                G,
                                                i,
                                                $.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (l && (t[v.NEXT_CACHE_TAGS_HEADER] = l),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    $.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    $.renderOpts
                                                        .collectedRevalidate >=
                                                    v.INFINITE_CACHE
                                                ) &&
                                                $.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    $.renderOpts
                                                        .collectedExpire ||
                                                $.renderOpts.collectedExpire >=
                                                    v.INFINITE_CACHE
                                                    ? void 0
                                                    : $.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: R.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: i.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: r,
                                                expire: n,
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
                                                    routePath: g,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: H,
                                                        isOnDemandRevalidate: T,
                                                    }),
                                                },
                                                k
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await b.handleResponse({
                                req: e,
                                nextConfig: N,
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: S,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: T,
                                revalidateOnlyGenerated: P,
                                responseGenerator: l,
                                waitUntil: n.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!q) return null;
                        if (
                            (null == d || null == (i = d.value)
                                ? void 0
                                : i.kind) !== R.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == d || null == (u = d.value) ? void 0 : u.kind}`
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
                                T
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            A &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, m.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (o && q) || c.delete(v.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                B,
                                G,
                                new Response(d.value.body, {
                                    headers: c,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                L
                    ? await u(L)
                    : await K.withPropagatedContext(e.headers, () =>
                          K.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${D} ${g}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': D,
                                      'http.target': e.url,
                                  },
                              },
                              u
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof x.NoFallbackError ||
                        (await b.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: j,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: H,
                                isOnDemandRevalidate: T,
                            }),
                        })),
                    q)
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
                () => P,
                'patchFetch',
                () => T,
                'routeModule',
                () => b,
                'serverHooks',
                () => k,
                'workAsyncStorage',
                () => A,
                'workUnitAsyncStorage',
                () => S,
            ],
            285072
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8ab070ea._.js.map
