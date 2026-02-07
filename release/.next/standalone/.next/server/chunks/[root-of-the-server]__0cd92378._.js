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
    781364,
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
            d = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            v = e.i(902769),
            h = e.i(46094),
            x = e.i(622730),
            g = e.i(811178),
            R = e.i(193695);
        e.i(629399);
        var m = e.i(377404),
            f = e.i(738342),
            w = e.i(698043),
            y = e.i(212669);
        function E(e, t) {
            return f.NextResponse.json({ ok: !0, data: e }, t);
        }
        function A(e, t = 400) {
            return f.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function C(e) {
            let t,
                r = (await (0, y.requireAdminForModule)('REVIEWS')).companyId;
            if (!r) return A('Empresa não encontrada na sessão.', 401);
            let a = new URL(e.url).searchParams.get('isActive');
            return (
                'true' === a && (t = !0),
                'false' === a && (t = !1),
                E(
                    await w.prisma.reviewTag.findMany({
                        where: {
                            companyId: r,
                            ...('boolean' == typeof t ? { isActive: t } : {}),
                        },
                        orderBy: { label: 'asc' },
                        select: {
                            id: !0,
                            companyId: !0,
                            label: !0,
                            isActive: !0,
                            isNegative: !0,
                            createdAt: !0,
                            updatedAt: !0,
                        },
                    })
                )
            );
        }
        async function N(e) {
            let t,
                r = (await (0, y.requireAdminForModule)('REVIEWS')).companyId;
            if (!r) return A('Empresa não encontrada na sessão.', 401);
            try {
                t = await e.json();
            } catch {
                return A('Body inválido (JSON).');
            }
            let a = String(t?.label ?? '')
                    .trim()
                    .replace(/\s+/g, ' '),
                n = !!t?.isNegative;
            if (!a) return A('Informe o texto da tag.');
            if (a.length < 2)
                return A('A tag precisa ter pelo menos 2 letras.');
            if (a.length > 80)
                return A('A tag pode ter no máximo 80 caracteres.');
            try {
                let e = await w.prisma.reviewTag.create({
                    data: {
                        companyId: r,
                        label: a,
                        isNegative: n,
                        isActive: !0,
                    },
                    select: {
                        id: !0,
                        companyId: !0,
                        label: !0,
                        isActive: !0,
                        isNegative: !0,
                        createdAt: !0,
                        updatedAt: !0,
                    },
                });
                return E(e, { status: 201 });
            } catch (e) {
                if ('P2002' === e?.code)
                    return A('Já existe uma tag com esse texto.', 409);
                return A('Não foi possível criar a tag.', 500);
            }
        }
        e.s(
            ['GET', () => C, 'POST', () => N, 'dynamic', 0, 'force-dynamic'],
            746075
        );
        var b = e.i(746075);
        let T = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/review-tags/route',
                    pathname: '/api/admin/review-tags',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/review-tags/route.ts',
                nextConfigOutput: 'standalone',
                userland: b,
            }),
            {
                workAsyncStorage: P,
                workUnitAsyncStorage: S,
                serverHooks: O,
            } = T;
        function I() {
            return (0, a.patchFetch)({
                workAsyncStorage: P,
                workUnitAsyncStorage: S,
            });
        }
        async function k(e, t, a) {
            T.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let f = '/api/admin/review-tags/route';
            f = f.replace(/\/index$/, '') || '/';
            let w = await T.prepare(e, t, {
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
                    nextConfig: A,
                    parsedUrl: C,
                    isDraftMode: N,
                    prerenderManifest: b,
                    routerServerContext: P,
                    isOnDemandRevalidate: S,
                    revalidateOnlyGenerated: O,
                    resolvedPathname: I,
                    clientReferenceManifest: k,
                    serverActionsManifest: q,
                } = w,
                j = (0, l.normalizeAppPath)(f),
                _ = !!(b.dynamicRoutes[j] || b.routes[I]),
                M = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (_ && !N) {
                let e = !!b.routes[I],
                    t = b.dynamicRoutes[j];
                if (t && !1 === t.fallback && !e) {
                    if (A.experimental.adapterPath) return await M();
                    throw new R.NoFallbackError();
                }
            }
            let H = null;
            !_ || T.isDev || N || (H = '/index' === (H = I) ? '/' : H);
            let U = !0 === T.isDev || !_,
                D = _ && !U;
            q &&
                k &&
                (0, s.setReferenceManifestsSingleton)({
                    page: f,
                    clientReferenceManifest: k,
                    serverActionsManifest: q,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: q,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, i.getTracer)(),
                K = $.getActiveScopeSpan(),
                B = {
                    params: E,
                    prerenderManifest: b,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!A.experimental.authInterrupts,
                        },
                        cacheComponents: !!A.cacheComponents,
                        supportsDynamicResponse: U,
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
                            T.onRequestError(e, t, a, P),
                    },
                    sharedContext: { buildId: y },
                },
                L = new d.NodeNextRequest(e),
                V = new d.NodeNextResponse(t),
                G = u.NextRequestAdapter.fromNodeNextRequest(
                    L,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        T.handle(G, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = $.getRootSpanAttributes();
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
                                let t = `${F} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${F} ${f}`);
                        }),
                    o = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && S && O && !r)
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
                                    let d = B.renderOpts.collectedTags;
                                    if (!_)
                                        return (
                                            await (0, v.sendResponse)(
                                                L,
                                                V,
                                                i,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (d && (t[g.NEXT_CACHE_TAGS_HEADER] = d),
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
                                                    g.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    g.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: m.CachedRouteKind
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
                                            (await T.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: f,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: S,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await T.handleResponse({
                                req: e,
                                nextConfig: A,
                                cacheKey: H,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: b,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: S,
                                revalidateOnlyGenerated: O,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!_) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== m.CachedRouteKind.APP_ROUTE
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
                                S
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
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && _) || c.delete(g.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, x.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, v.sendResponse)(
                                L,
                                V,
                                new Response(u.value.body, {
                                    headers: c,
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
                              c.BaseServerSpan.handleRequest,
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
                        (await T.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: j,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: S,
                            }),
                        })),
                    _)
                )
                    throw t;
                return (
                    await (0, v.sendResponse)(
                        L,
                        V,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => k,
                'patchFetch',
                () => I,
                'routeModule',
                () => T,
                'serverHooks',
                () => O,
                'workAsyncStorage',
                () => P,
                'workUnitAsyncStorage',
                () => S,
            ],
            781364
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0cd92378._.js.map
