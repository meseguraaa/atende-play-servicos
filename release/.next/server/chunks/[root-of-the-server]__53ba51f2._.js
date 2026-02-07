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
    796944,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            a = e.i(821498),
            i = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            m = e.i(902769),
            v = e.i(46094),
            h = e.i(622730),
            g = e.i(811178),
            x = e.i(193695);
        e.i(629399);
        var f = e.i(377404),
            R = e.i(738342),
            y = e.i(387148),
            w = e.i(774785),
            E = e.i(698043),
            C = e.i(212669);
        function A(e, t = 400) {
            return R.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function S(e) {
            let t = String(e?.companyId ?? '').trim();
            if (t) return t;
            let r = await (0, y.cookies)(),
                n = String(
                    r.get('admin_company_context')?.value ??
                        r.get('companyId')?.value ??
                        ''
                ).trim();
            return n || '';
        }
        async function b() {
            try {
                var e, t;
                let r = await (0, C.requireAdminForModule)('CLIENT_LEVELS'),
                    n = await S(r);
                if (!n)
                    return A(
                        'Contexto de empresa ausente (companyId). Selecione uma empresa antes de acessar.',
                        400
                    );
                let a = await (0, y.cookies)(),
                    i =
                        ((e = a.get('admin_unit_context')?.value),
                        String(e ?? '').trim() || 'all'),
                    s = !!r?.canSeeAllUnits,
                    o = s && 'all' === i,
                    l = o || 'all' === i ? void 0 : i,
                    d = await E.prisma.unit.findMany({
                        where: { companyId: n, ...(l ? { id: l } : {}) },
                        orderBy: { name: 'asc' },
                        select: { id: !0, name: !0, isActive: !0 },
                    }),
                    u = d.map((e) => e.id);
                if (!s && 'all' === i) {
                    let e = d.find((e) => e.isActive)?.id ?? d[0]?.id;
                    u = e ? [e] : [];
                }
                let [p, c] = await Promise.all([
                        E.prisma.customerLevelConfig.findMany({
                            where: {
                                companyId: n,
                                ...(u.length ? { unitId: { in: u } } : {}),
                            },
                            orderBy: [{ unitId: 'asc' }, { level: 'asc' }],
                            select: {
                                id: !0,
                                unitId: !0,
                                level: !0,
                                minAppointmentsDone: !0,
                                minOrdersCompleted: !0,
                            },
                        }),
                        E.prisma.customerLevelRule.findMany({
                            where: {
                                companyId: n,
                                ...(u.length ? { unitId: { in: u } } : {}),
                            },
                            orderBy: [
                                { unitId: 'asc' },
                                { priority: 'desc' },
                                { createdAt: 'asc' },
                            ],
                            select: {
                                id: !0,
                                unitId: !0,
                                type: !0,
                                targetLevel: !0,
                                priority: !0,
                                isEnabled: !0,
                            },
                        }),
                    ]),
                    m = {};
                for (let e of p) {
                    let t = e.unitId;
                    (m[t] || (m[t] = {}),
                        (m[t][String(e.level)] = {
                            minAppointmentsDone: e.minAppointmentsDone,
                            minOrdersCompleted: e.minOrdersCompleted,
                        }));
                }
                let v = {};
                for (let e of c) {
                    let t = e.unitId;
                    (v[t] || (v[t] = []),
                        v[t].push({
                            id: e.id,
                            type: String(e.type),
                            targetLevel: String(e.targetLevel),
                            priority: e.priority,
                            isEnabled: e.isEnabled,
                        }));
                }
                return (
                    (t = {
                        scope: {
                            companyId: n,
                            unitCookie: i,
                            canSeeAllUnits: s,
                            showAllUnits: o,
                        },
                        units: d,
                        configsByUnit: m,
                        rulesByUnit: v,
                    }),
                    R.NextResponse.json({ ok: !0, data: t }, void 0)
                );
            } catch (r) {
                if ((0, w.isRedirectError)(r)) throw r;
                let e =
                        'string' == typeof r?.message
                            ? r.message
                            : 'Erro inesperado ao carregar níveis de cliente.',
                    t = e.toLowerCase();
                if (
                    t.includes('unauthorized') ||
                    t.includes('forbidden') ||
                    t.includes('permiss') ||
                    t.includes('acesso')
                )
                    return A(e, 403);
                return A(e, 500);
            }
        }
        e.s(['GET', () => b, 'dynamic', 0, 'force-dynamic'], 982930);
        var I = e.i(982930);
        let N = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/client-levels/summary/route',
                    pathname: '/api/admin/client-levels/summary',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/client-levels/summary/route.ts',
                nextConfigOutput: 'standalone',
                userland: I,
            }),
            {
                workAsyncStorage: T,
                workUnitAsyncStorage: _,
                serverHooks: O,
            } = N;
        function P() {
            return (0, n.patchFetch)({
                workAsyncStorage: T,
                workUnitAsyncStorage: _,
            });
        }
        async function k(e, t, n) {
            N.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let R = '/api/admin/client-levels/summary/route';
            R = R.replace(/\/index$/, '') || '/';
            let y = await N.prepare(e, t, {
                srcPage: R,
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
                    nextConfig: C,
                    parsedUrl: A,
                    isDraftMode: S,
                    prerenderManifest: b,
                    routerServerContext: I,
                    isOnDemandRevalidate: T,
                    revalidateOnlyGenerated: _,
                    resolvedPathname: O,
                    clientReferenceManifest: P,
                    serverActionsManifest: k,
                } = y,
                q = (0, l.normalizeAppPath)(R),
                M = !!(b.dynamicRoutes[q] || b.routes[O]),
                j = async () => (
                    (null == I ? void 0 : I.render404)
                        ? await I.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (M && !S) {
                let e = !!b.routes[O],
                    t = b.dynamicRoutes[q];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await j();
                    throw new x.NoFallbackError();
                }
            }
            let H = null;
            !M || N.isDev || S || (H = '/index' === (H = O) ? '/' : H);
            let U = !0 === N.isDev || !M,
                D = M && !U;
            k &&
                P &&
                (0, s.setReferenceManifestsSingleton)({
                    page: R,
                    clientReferenceManifest: P,
                    serverActionsManifest: k,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: k,
                    }),
                });
            let L = e.method || 'GET',
                F = (0, i.getTracer)(),
                $ = F.getActiveScopeSpan(),
                B = {
                    params: E,
                    prerenderManifest: b,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!C.experimental.authInterrupts,
                        },
                        cacheComponents: !!C.cacheComponents,
                        supportsDynamicResponse: U,
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
                            N.onRequestError(e, t, n, I),
                    },
                    sharedContext: { buildId: w },
                },
                K = new d.NodeNextRequest(e),
                G = new d.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        N.handle(V, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = F.getRootSpanAttributes();
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
                                let t = `${L} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${L} ${R}`);
                        }),
                    o = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    l = async (a) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && T && _ && !r)
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
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        n.waitUntil &&
                                        (n.waitUntil(l), (l = void 0));
                                    let d = B.renderOpts.collectedTags;
                                    if (!M)
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
                                            v.toNodeOutgoingHttpHeaders)(
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
                                            n =
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
                                                kind: f.CachedRouteKind
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
                                            (await N.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: R,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: T,
                                                    }),
                                                },
                                                I
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await N.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: H,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: b,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: T,
                                revalidateOnlyGenerated: _,
                                responseGenerator: d,
                                waitUntil: n.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!M) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== f.CachedRouteKind.APP_ROUTE
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
                                T
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            S &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, v.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && M) || p.delete(g.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                K,
                                G,
                                new Response(u.value.body, {
                                    headers: p,
                                    status: u.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                $
                    ? await l($)
                    : await F.withPropagatedContext(e.headers, () =>
                          F.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${L} ${R}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': L,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof x.NoFallbackError ||
                        (await N.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: q,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: T,
                            }),
                        })),
                    M)
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
                () => k,
                'patchFetch',
                () => P,
                'routeModule',
                () => N,
                'serverHooks',
                () => O,
                'workAsyncStorage',
                () => T,
                'workUnitAsyncStorage',
                () => _,
            ],
            796944
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__53ba51f2._.js.map
