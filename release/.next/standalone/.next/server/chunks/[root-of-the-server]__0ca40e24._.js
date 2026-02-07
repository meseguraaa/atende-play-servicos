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
    408153,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            a = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            h = e.i(902769),
            m = e.i(46094),
            v = e.i(622730),
            x = e.i(811178),
            R = e.i(193695);
        e.i(629399);
        var g = e.i(377404),
            f = e.i(738342),
            y = e.i(698043),
            E = e.i(212669);
        function w(e, t = 200) {
            return f.NextResponse.json({ ok: !0, data: e }, { status: t });
        }
        function A(e, t = 400) {
            return f.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function C() {
            try {
                let e = (await (0, E.requireAdminForModule)('SETTINGS'))
                        .companyId,
                    t = await y.prisma.company.findUnique({
                        where: { id: e },
                        select: { id: !0, name: !0, segment: !0, isActive: !0 },
                    });
                if (!t) return A('company_not_found', 404);
                return w(t);
            } catch (e) {
                return (
                    console.error('[GET /api/admin/settings/company]', e),
                    A('internal_error', 500)
                );
            }
        }
        async function T(e) {
            try {
                var t;
                let r = await (0, E.requireAdminForModule)('SETTINGS');
                if (!r.isOwner) return A('forbidden_owner_only', 403);
                let n = r.companyId,
                    a = {};
                try {
                    a = await e.json();
                } catch {
                    return A('invalid_json', 400);
                }
                let i = String(a.name ?? '').trim(),
                    o =
                        ((t = a.segment),
                        'AESTHETIC' === String(t) ? 'AESTHETIC' : 'BARBERSHOP'),
                    s = 'boolean' == typeof a.isActive ? a.isActive : void 0;
                if (!i) return A('company_name_required', 400);
                let l = await y.prisma.company.update({
                    where: { id: n },
                    data: {
                        name: i,
                        segment: o,
                        ...('boolean' == typeof s ? { isActive: s } : {}),
                    },
                    select: { id: !0, name: !0, segment: !0, isActive: !0 },
                });
                return w(l);
            } catch (e) {
                return (
                    console.error('[PUT /api/admin/settings/company]', e),
                    A('internal_error', 500)
                );
            }
        }
        e.s(['GET', () => C, 'PUT', () => T], 254496);
        var S = e.i(254496);
        let _ = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/settings/company/route',
                    pathname: '/api/admin/settings/company',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/settings/company/route.ts',
                nextConfigOutput: 'standalone',
                userland: S,
            }),
            {
                workAsyncStorage: N,
                workUnitAsyncStorage: b,
                serverHooks: P,
            } = _;
        function q() {
            return (0, n.patchFetch)({
                workAsyncStorage: N,
                workUnitAsyncStorage: b,
            });
        }
        async function O(e, t, n) {
            _.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let f = '/api/admin/settings/company/route';
            f = f.replace(/\/index$/, '') || '/';
            let y = await _.prepare(e, t, {
                srcPage: f,
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
                    buildId: E,
                    params: w,
                    nextConfig: A,
                    parsedUrl: C,
                    isDraftMode: T,
                    prerenderManifest: S,
                    routerServerContext: N,
                    isOnDemandRevalidate: b,
                    revalidateOnlyGenerated: P,
                    resolvedPathname: q,
                    clientReferenceManifest: O,
                    serverActionsManifest: j,
                } = y,
                k = (0, l.normalizeAppPath)(f),
                I = !!(S.dynamicRoutes[k] || S.routes[q]),
                H = async () => (
                    (null == N ? void 0 : N.render404)
                        ? await N.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (I && !T) {
                let e = !!S.routes[q],
                    t = S.dynamicRoutes[k];
                if (t && !1 === t.fallback && !e) {
                    if (A.experimental.adapterPath) return await H();
                    throw new R.NoFallbackError();
                }
            }
            let U = null;
            !I || _.isDev || T || (U = '/index' === (U = q) ? '/' : U);
            let M = !0 === _.isDev || !I,
                D = I && !M;
            j &&
                O &&
                (0, o.setReferenceManifestsSingleton)({
                    page: f,
                    clientReferenceManifest: O,
                    serverActionsManifest: j,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, i.getTracer)(),
                K = $.getActiveScopeSpan(),
                B = {
                    params: w,
                    prerenderManifest: S,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!A.experimental.authInterrupts,
                        },
                        cacheComponents: !!A.cacheComponents,
                        supportsDynamicResponse: M,
                        incrementalCache: (0, a.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: A.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            _.onRequestError(e, t, n, N),
                    },
                    sharedContext: { buildId: E },
                },
                G = new d.NodeNextRequest(e),
                L = new d.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    G,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        _.handle(V, B).finally(() => {
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
                            let n = r.get('next.route');
                            if (n) {
                                let t = `${F} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${F} ${f}`);
                        }),
                    s = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    l = async (a) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && b && P && !r)
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
                                    let i = await o(a);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        n.waitUntil &&
                                        (n.waitUntil(l), (l = void 0));
                                    let d = B.renderOpts.collectedTags;
                                    if (!I)
                                        return (
                                            await (0, h.sendResponse)(
                                                G,
                                                L,
                                                i,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (d && (t[x.NEXT_CACHE_TAGS_HEADER] = d),
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
                                            n =
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
                                                expire: n,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await _.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: f,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: b,
                                                    }),
                                                },
                                                N
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await _.handleResponse({
                                req: e,
                                nextConfig: A,
                                cacheKey: U,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: S,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: b,
                                revalidateOnlyGenerated: P,
                                responseGenerator: d,
                                waitUntil: n.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!I) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== g.CachedRouteKind.APP_ROUTE
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
                        (s ||
                            t.setHeader(
                                'x-nextjs-cache',
                                b
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            T &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, m.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (s && I) || p.delete(x.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, v.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                G,
                                L,
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
                                  kind: i.SpanKind.SERVER,
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
                        (await _.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: k,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: b,
                            }),
                        })),
                    I)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
                        G,
                        L,
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
                () => q,
                'routeModule',
                () => _,
                'serverHooks',
                () => P,
                'workAsyncStorage',
                () => N,
                'workUnitAsyncStorage',
                () => b,
            ],
            408153
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ca40e24._.js.map
