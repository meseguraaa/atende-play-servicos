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
    934064,
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
            f = e.i(46094),
            x = e.i(622730),
            v = e.i(811178),
            R = e.i(193695);
        e.i(629399);
        var m = e.i(377404),
            g = e.i(738342),
            w = e.i(698043),
            E = e.i(212669);
        function y(e, t = 400) {
            return g.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function C(e, t) {
            try {
                var r;
                let a,
                    n = (await (0, E.requireAdminForModule)('PROFESSIONALS'))
                        .companyId,
                    { professionalId: s } = await t.params,
                    o = String(s ?? '').trim();
                if (!o) return y('professionalId é obrigatório.', 400);
                try {
                    a = await e.json();
                } catch {
                    a = null;
                }
                let i = a?.isActive;
                if ('boolean' != typeof i)
                    return y('Campo "isActive" deve ser boolean.', 400);
                if (
                    !(await w.prisma.professional.findFirst({
                        where: { id: o, companyId: n },
                        select: { id: !0 },
                    }))
                )
                    return y('Profissional não encontrado.', 404);
                return (
                    await w.prisma.professional.update({
                        where: { id: o },
                        data: { isActive: i },
                    }),
                    (r = { id: o, isActive: i }),
                    g.NextResponse.json({ ok: !0, data: r }, void 0)
                );
            } catch {
                return y('Não autorizado.', 401);
            }
        }
        e.s(['PATCH', () => C, 'dynamic', 0, 'force-dynamic'], 156100);
        var A = e.i(156100);
        let N = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/professionals/[professionalId]/status/route',
                    pathname:
                        '/api/admin/professionals/[professionalId]/status',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/professionals/[professionalId]/status/route.ts',
                nextConfigOutput: 'standalone',
                userland: A,
            }),
            {
                workAsyncStorage: b,
                workUnitAsyncStorage: P,
                serverHooks: T,
            } = N;
        function S() {
            return (0, a.patchFetch)({
                workAsyncStorage: b,
                workUnitAsyncStorage: P,
            });
        }
        async function O(e, t, a) {
            N.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let g = '/api/admin/professionals/[professionalId]/status/route';
            g = g.replace(/\/index$/, '') || '/';
            let w = await N.prepare(e, t, {
                srcPage: g,
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
                    buildId: E,
                    params: y,
                    nextConfig: C,
                    parsedUrl: A,
                    isDraftMode: b,
                    prerenderManifest: P,
                    routerServerContext: T,
                    isOnDemandRevalidate: S,
                    revalidateOnlyGenerated: O,
                    resolvedPathname: I,
                    clientReferenceManifest: k,
                    serverActionsManifest: j,
                } = w,
                q = (0, l.normalizeAppPath)(g),
                _ = !!(P.dynamicRoutes[q] || P.routes[I]),
                H = async () => (
                    (null == T ? void 0 : T.render404)
                        ? await T.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (_ && !b) {
                let e = !!P.routes[I],
                    t = P.dynamicRoutes[q];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await H();
                    throw new R.NoFallbackError();
                }
            }
            let M = null;
            !_ || N.isDev || b || (M = '/index' === (M = I) ? '/' : M);
            let U = !0 === N.isDev || !_,
                D = _ && !U;
            j &&
                k &&
                (0, o.setReferenceManifestsSingleton)({
                    page: g,
                    clientReferenceManifest: k,
                    serverActionsManifest: j,
                    serverModuleMap: (0, i.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, s.getTracer)(),
                K = $.getActiveScopeSpan(),
                L = {
                    params: y,
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
                            N.onRequestError(e, t, a, T),
                    },
                    sharedContext: { buildId: E },
                },
                B = new d.NodeNextRequest(e),
                G = new d.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        N.handle(V, L).finally(() => {
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
                            } else e.updateName(`${F} ${g}`);
                        }),
                    i = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var s, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!i && S && O && !r)
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
                                            f.toNodeOutgoingHttpHeaders)(
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
                                                kind: m.CachedRouteKind
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
                                            (await N.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: g,
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
                            u = await N.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: P,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: S,
                                revalidateOnlyGenerated: O,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: i,
                            });
                        if (!_) return null;
                        if (
                            (null == u || null == (s = u.value)
                                ? void 0
                                : s.kind) !== m.CachedRouteKind.APP_ROUTE
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
                                S
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            b &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, f.fromNodeOutgoingHttpHeaders)(
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
                                  spanName: `${F} ${g}`,
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
                        (await N.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: q,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: S,
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
                () => S,
                'routeModule',
                () => N,
                'serverHooks',
                () => T,
                'workAsyncStorage',
                () => b,
                'workUnitAsyncStorage',
                () => P,
            ],
            934064
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b0aae01a._.js.map
