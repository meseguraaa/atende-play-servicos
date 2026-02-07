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
    814747,
    (e, t, r) => {
        t.exports = e.x('path', () => require('path'));
    },
    924868,
    (e, t, r) => {
        t.exports = e.x('fs/promises', () => require('fs/promises'));
    },
    554497,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            s = e.i(161599),
            i = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            h = e.i(902769),
            x = e.i(46094),
            f = e.i(622730),
            m = e.i(811178),
            g = e.i(193695);
        e.i(629399);
        var v = e.i(377404),
            R = e.i(738342),
            w = e.i(924868),
            E = e.i(814747);
        let y =
            process.env.UPLOADS_DIR?.trim() ||
            E.default.join(process.cwd(), 'uploads_data');
        async function C(e, t) {
            try {
                let { path: e } = await t.params,
                    r =
                        Array.isArray(e) && 0 !== e.length
                            ? e
                                  .map((e) => String(e ?? '').trim())
                                  .filter(Boolean)
                                  .filter((e) => '.' !== e && '..' !== e)
                            : [];
                if (0 === r.length)
                    return new R.NextResponse('Not Found', { status: 404 });
                let a = (function (e, t) {
                        let r = E.default.join(e, ...t),
                            a = E.default.resolve(e),
                            n = E.default.resolve(r);
                        if (n !== a && !n.startsWith(a + E.default.sep))
                            throw Error('invalid_path');
                        return n;
                    })(y, r),
                    n = await (0, w.stat)(a).catch(() => null);
                if (!n || !n.isFile())
                    return new R.NextResponse('Not Found', { status: 404 });
                let s = await (0, w.readFile)(a),
                    i = E.default.extname(a),
                    o = (function (e) {
                        switch (e.toLowerCase()) {
                            case '.jpg':
                            case '.jpeg':
                                return 'image/jpeg';
                            case '.png':
                                return 'image/png';
                            case '.webp':
                                return 'image/webp';
                            case '.gif':
                                return 'image/gif';
                            case '.svg':
                                return 'image/svg+xml';
                            case '.avif':
                                return 'image/avif';
                            default:
                                return 'application/octet-stream';
                        }
                    })(i);
                return new R.NextResponse(s, {
                    status: 200,
                    headers: {
                        'Content-Type': o,
                        'Content-Disposition': 'inline',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                        'X-Content-Type-Options': 'nosniff',
                        Vary: 'Accept-Encoding',
                    },
                });
            } catch (e) {
                if ('invalid_path' === String(e?.message || ''))
                    return new R.NextResponse('Forbidden', { status: 403 });
                return new R.NextResponse('Not Found', { status: 404 });
            }
        }
        e.s(
            [
                'GET',
                () => C,
                'dynamic',
                0,
                'force-dynamic',
                'runtime',
                0,
                'nodejs',
            ],
            788134
        );
        var A = e.i(788134);
        let b = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/media/[...path]/route',
                    pathname: '/media/[...path]',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath: '[project]/src/app/media/[...path]/route.ts',
                nextConfigOutput: 'standalone',
                userland: A,
            }),
            {
                workAsyncStorage: N,
                workUnitAsyncStorage: T,
                serverHooks: P,
            } = b;
        function _() {
            return (0, a.patchFetch)({
                workAsyncStorage: N,
                workUnitAsyncStorage: T,
            });
        }
        async function j(e, t, a) {
            b.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let R = '/media/[...path]/route';
            R = R.replace(/\/index$/, '') || '/';
            let w = await b.prepare(e, t, {
                srcPage: R,
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
                    isDraftMode: N,
                    prerenderManifest: T,
                    routerServerContext: P,
                    isOnDemandRevalidate: _,
                    revalidateOnlyGenerated: j,
                    resolvedPathname: O,
                    clientReferenceManifest: S,
                    serverActionsManifest: q,
                } = w,
                k = (0, l.normalizeAppPath)(R),
                H = !!(T.dynamicRoutes[k] || T.routes[O]),
                U = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (H && !N) {
                let e = !!T.routes[O],
                    t = T.dynamicRoutes[k];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await U();
                    throw new g.NoFallbackError();
                }
            }
            let D = null;
            !H || b.isDev || N || (D = '/index' === (D = O) ? '/' : D);
            let I = !0 === b.isDev || !H,
                M = H && !I;
            q &&
                S &&
                (0, i.setReferenceManifestsSingleton)({
                    page: R,
                    clientReferenceManifest: S,
                    serverActionsManifest: q,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: q,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, s.getTracer)(),
                K = $.getActiveScopeSpan(),
                L = {
                    params: y,
                    prerenderManifest: T,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!C.experimental.authInterrupts,
                        },
                        cacheComponents: !!C.cacheComponents,
                        supportsDynamicResponse: I,
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
                            b.onRequestError(e, t, a, P),
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
                let i = async (e) =>
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
                            } else e.updateName(`${F} ${R}`);
                        }),
                    o = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var s, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && _ && j && !r)
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
                                    let s = await i(n);
                                    e.fetchMetrics = L.renderOpts.fetchMetrics;
                                    let l = L.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let d = L.renderOpts.collectedTags;
                                    if (!H)
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
                                            x.toNodeOutgoingHttpHeaders)(
                                                s.headers
                                            );
                                        (d && (t[m.NEXT_CACHE_TAGS_HEADER] = d),
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
                                                    m.INFINITE_CACHE
                                                ) &&
                                                L.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    L.renderOpts
                                                        .collectedExpire ||
                                                L.renderOpts.collectedExpire >=
                                                    m.INFINITE_CACHE
                                                    ? void 0
                                                    : L.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: v.CachedRouteKind
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
                                                    routePath: R,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: M,
                                                        isOnDemandRevalidate: _,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await b.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: D,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: T,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: _,
                                revalidateOnlyGenerated: j,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!H) return null;
                        if (
                            (null == u || null == (s = u.value)
                                ? void 0
                                : s.kind) !== v.CachedRouteKind.APP_ROUTE
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
                        (o ||
                            t.setHeader(
                                'x-nextjs-cache',
                                _
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
                        let p = (0, x.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && H) || p.delete(m.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(u.cacheControl)
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
                                  spanName: `${F} ${R}`,
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
                    (t instanceof g.NoFallbackError ||
                        (await b.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: k,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: M,
                                isOnDemandRevalidate: _,
                            }),
                        })),
                    H)
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
                () => j,
                'patchFetch',
                () => _,
                'routeModule',
                () => b,
                'serverHooks',
                () => P,
                'workAsyncStorage',
                () => N,
                'workUnitAsyncStorage',
                () => T,
            ],
            554497
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__899ffb75._.js.map
