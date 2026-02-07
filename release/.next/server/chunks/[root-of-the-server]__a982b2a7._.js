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
    487493,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            a = e.i(821498),
            i = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            d = e.i(337047),
            l = e.i(528171),
            u = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            x = e.i(902769),
            h = e.i(46094),
            f = e.i(622730),
            R = e.i(811178),
            v = e.i(193695);
        e.i(629399);
        var m = e.i(377404),
            g = e.i(738342),
            w = e.i(698043),
            E = e.i(212669);
        function y(e, t = 400) {
            return g.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function C(e, t) {
            let r = await (0, E.requireAdminForModuleApi)('FINANCE');
            if (r instanceof g.NextResponse) return r;
            let n = r?.companyId ?? null;
            if (!n) return y('missing_company', 403);
            let a = r?.userId ?? null,
                { expenseId: i } = await t.params,
                s = String(i || '').trim();
            if (!s) return y('expense_id_required', 400);
            let o = null;
            try {
                o = await e.json();
            } catch {
                o = null;
            }
            let d = await w.prisma.expense.findFirst({
                where: { id: s, companyId: n },
                select: { id: !0, unitId: !0, isPaid: !0 },
            });
            if (!d) return y('expense_not_found', 404);
            if (!r?.canSeeAllUnits)
                if (a) {
                    let e = await w.prisma.adminUnitAccess.findFirst({
                        where: { companyId: n, userId: a, unitId: d.unitId },
                        select: { id: !0 },
                    });
                    if (!e?.id) {
                        let e = r?.unitId ?? null;
                        if (!e) return y('missing_admin_unit', 403);
                        if (d.unitId !== e) return y('forbidden_unit', 403);
                    }
                } else {
                    let e = r?.unitId ?? null;
                    if (!e) return y('missing_admin_unit', 403);
                    if (d.unitId !== e) return y('forbidden_unit', 403);
                }
            let l = 'boolean' == typeof o?.isPaid ? o.isPaid : !d.isPaid;
            try {
                var u;
                let e = await w.prisma.expense.update({
                    where: { id: d.id },
                    data: { isPaid: l },
                    select: { id: !0, isPaid: !0 },
                });
                return (
                    (u = { expenseId: e.id, isPaid: e.isPaid }),
                    g.NextResponse.json({ ok: !0, data: u }, void 0)
                );
            } catch {
                return y('internal_error', 500);
            }
        }
        e.s(['PATCH', () => C], 521958);
        var A = e.i(521958);
        let P = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/finance/expenses/[expenseId]/paid/route',
                    pathname: '/api/admin/finance/expenses/[expenseId]/paid',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/finance/expenses/[expenseId]/paid/route.ts',
                nextConfigOutput: 'standalone',
                userland: A,
            }),
            {
                workAsyncStorage: _,
                workUnitAsyncStorage: I,
                serverHooks: N,
            } = P;
        function b() {
            return (0, n.patchFetch)({
                workAsyncStorage: _,
                workUnitAsyncStorage: I,
            });
        }
        async function T(e, t, n) {
            P.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let g = '/api/admin/finance/expenses/[expenseId]/paid/route';
            g = g.replace(/\/index$/, '') || '/';
            let w = await P.prepare(e, t, {
                srcPage: g,
                multiZoneDraftMode: !1,
            });
            if (!w)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == n.waitUntil ||
                        n.waitUntil.call(n, Promise.resolve()),
                    null
                );
            let {
                    buildId: E,
                    params: y,
                    nextConfig: C,
                    parsedUrl: A,
                    isDraftMode: _,
                    prerenderManifest: I,
                    routerServerContext: N,
                    isOnDemandRevalidate: b,
                    revalidateOnlyGenerated: T,
                    resolvedPathname: S,
                    clientReferenceManifest: k,
                    serverActionsManifest: q,
                } = w,
                O = (0, d.normalizeAppPath)(g),
                j = !!(I.dynamicRoutes[O] || I.routes[S]),
                H = async () => (
                    (null == N ? void 0 : N.render404)
                        ? await N.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (j && !_) {
                let e = !!I.routes[S],
                    t = I.dynamicRoutes[O];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await H();
                    throw new v.NoFallbackError();
                }
            }
            let U = null;
            !j || P.isDev || _ || (U = '/index' === (U = S) ? '/' : U);
            let M = !0 === P.isDev || !j,
                D = j && !M;
            q &&
                k &&
                (0, s.setReferenceManifestsSingleton)({
                    page: g,
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
                    params: y,
                    prerenderManifest: I,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!C.experimental.authInterrupts,
                        },
                        cacheComponents: !!C.cacheComponents,
                        supportsDynamicResponse: M,
                        incrementalCache: (0, a.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: C.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            P.onRequestError(e, t, n, N),
                    },
                    sharedContext: { buildId: E },
                },
                L = new l.NodeNextRequest(e),
                G = new l.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    L,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        P.handle(V, B).finally(() => {
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
                            } else e.updateName(`${F} ${g}`);
                        }),
                    o = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    d = async (a) => {
                        var i, d;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && b && T && !r)
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
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let d = B.renderOpts.pendingWaitUntil;
                                    d &&
                                        n.waitUntil &&
                                        (n.waitUntil(d), (d = void 0));
                                    let l = B.renderOpts.collectedTags;
                                    if (!j)
                                        return (
                                            await (0, x.sendResponse)(
                                                L,
                                                G,
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
                                        (l && (t[R.NEXT_CACHE_TAGS_HEADER] = l),
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
                                                    R.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    R.INFINITE_CACHE
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
                                                expire: n,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await P.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: g,
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
                            u = await P.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: U,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: I,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: b,
                                revalidateOnlyGenerated: T,
                                responseGenerator: l,
                                waitUntil: n.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!j) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== m.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == u || null == (d = u.value) ? void 0 : d.kind}`
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
                                b
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            _ &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, h.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && j) || p.delete(R.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, x.sendResponse)(
                                L,
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
                    ? await d(K)
                    : await $.withPropagatedContext(e.headers, () =>
                          $.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${F} ${g}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': F,
                                      'http.target': e.url,
                                  },
                              },
                              d
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof v.NoFallbackError ||
                        (await P.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: O,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: b,
                            }),
                        })),
                    j)
                )
                    throw t;
                return (
                    await (0, x.sendResponse)(
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
                () => T,
                'patchFetch',
                () => b,
                'routeModule',
                () => P,
                'serverHooks',
                () => N,
                'workAsyncStorage',
                () => _,
                'workUnitAsyncStorage',
                () => I,
            ],
            487493
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a982b2a7._.js.map
