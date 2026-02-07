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
    659787,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            d = e.i(337047),
            l = e.i(528171),
            u = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            f = e.i(902769),
            h = e.i(46094),
            m = e.i(622730),
            x = e.i(811178),
            v = e.i(193695);
        e.i(629399);
        var R = e.i(377404),
            w = e.i(738342),
            g = e.i(205918),
            E = e.i(698043),
            I = e.i(212669);
        function y(e) {
            return String(e ?? '').trim();
        }
        function C(e, t = 400) {
            return w.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function N(e, t) {
            try {
                let r = await (0, I.requireAdminForModule)('CHECKOUT'),
                    a = r.companyId;
                if (!a) return C('Empresa não encontrada na sessão.', 401);
                let n = r.id;
                if (!n) return C('Usuário não encontrado na sessão.', 401);
                let i = r.canSeeAllUnits,
                    o = await t.params,
                    s = y(o?.orderId);
                if (!s) return C('orderId é obrigatório.', 400);
                let d = await e.json().catch(() => null),
                    l = y(d?.itemId),
                    u = d?.professionalId === null ? '' : y(d?.professionalId);
                if (!l) return C('itemId é obrigatório.', 400);
                if (!u) return C('professionalId é obrigatório.', 400);
                let p = await E.prisma.order.findFirst({
                    where: { id: s, companyId: a },
                    select: { id: !0, unitId: !0, status: !0 },
                });
                if (!p) return C('Pedido não encontrado.', 404);
                if (
                    !i &&
                    !(await E.prisma.adminUnitAccess.findFirst({
                        where: { companyId: a, userId: n, unitId: p.unitId },
                        select: { id: !0 },
                    }))
                )
                    return C('Sem acesso a esta unidade.', 403);
                if ('COMPLETED' === p.status)
                    return C(
                        'Não é possível alterar profissional de um pedido pago.',
                        400
                    );
                if ('PENDING' !== p.status && 'PENDING_CHECKIN' !== p.status)
                    return C(
                        `N\xe3o \xe9 poss\xedvel alterar profissional em pedido com status "${p.status}".`,
                        400
                    );
                let c = await E.prisma.professional.findFirst({
                    where: { id: u, companyId: a },
                    select: { id: !0, isActive: !0 },
                });
                if (!c) return C('Profissional não encontrado.', 404);
                if (!c.isActive) return C('Profissional inativo.', 400);
                if (
                    !(await E.prisma.professionalUnit.findFirst({
                        where: {
                            companyId: a,
                            professionalId: c.id,
                            unitId: p.unitId,
                            isActive: !0,
                        },
                        select: { id: !0 },
                    }))
                )
                    return C(
                        'Profissional não pertence (ou está inativo) nesta unidade.',
                        400
                    );
                let f = await E.prisma.$transaction(async (e) => {
                    let t = await e.orderItem.findFirst({
                        where: {
                            id: l,
                            companyId: a,
                            orderId: p.id,
                            productId: { not: null },
                        },
                        select: { id: !0 },
                    });
                    if (!t) throw Error('ITEM_NOT_FOUND');
                    let r = await e.orderItem.updateMany({
                        where: { id: t.id, companyId: a, orderId: p.id },
                        data: { professionalId: c.id },
                    });
                    if (0 === r.count) throw Error('ITEM_NOT_FOUND');
                    return t.id;
                });
                return (
                    (0, g.revalidatePath)('/admin/checkout'),
                    (function (e, t = 200) {
                        return w.NextResponse.json(
                            { ok: !0, data: e },
                            { status: t }
                        );
                    })({
                        orderId: p.id,
                        orderStatus: p.status,
                        itemId: f,
                        professionalId: c.id,
                    })
                );
            } catch (t) {
                let e = t?.message ?? 'Erro interno.';
                if ('ITEM_NOT_FOUND' === e)
                    return C(
                        'Item de produto não encontrado neste pedido.',
                        404
                    );
                return C(e, 400);
            }
        }
        e.s(['PATCH', () => N, 'dynamic', 0, 'force-dynamic'], 495174);
        var A = e.i(495174);
        let T = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/checkout/orders/[orderId]/assign-product-item-professional/route',
                    pathname:
                        '/api/admin/checkout/orders/[orderId]/assign-product-item-professional',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/checkout/orders/[orderId]/assign-product-item-professional/route.ts',
                nextConfigOutput: 'standalone',
                userland: A,
            }),
            {
                workAsyncStorage: P,
                workUnitAsyncStorage: O,
                serverHooks: _,
            } = T;
        function b() {
            return (0, a.patchFetch)({
                workAsyncStorage: P,
                workUnitAsyncStorage: O,
            });
        }
        async function k(e, t, a) {
            T.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let w =
                '/api/admin/checkout/orders/[orderId]/assign-product-item-professional/route';
            w = w.replace(/\/index$/, '') || '/';
            let g = await T.prepare(e, t, {
                srcPage: w,
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
                    buildId: E,
                    params: I,
                    nextConfig: y,
                    parsedUrl: C,
                    isDraftMode: N,
                    prerenderManifest: A,
                    routerServerContext: P,
                    isOnDemandRevalidate: O,
                    revalidateOnlyGenerated: _,
                    resolvedPathname: b,
                    clientReferenceManifest: k,
                    serverActionsManifest: S,
                } = g,
                U = (0, d.normalizeAppPath)(w),
                M = !!(A.dynamicRoutes[U] || A.routes[b]),
                j = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (M && !N) {
                let e = !!A.routes[b],
                    t = A.dynamicRoutes[U];
                if (t && !1 === t.fallback && !e) {
                    if (y.experimental.adapterPath) return await j();
                    throw new v.NoFallbackError();
                }
            }
            let q = null;
            !M || T.isDev || N || (q = '/index' === (q = b) ? '/' : q);
            let H = !0 === T.isDev || !M,
                D = M && !H;
            S &&
                k &&
                (0, o.setReferenceManifestsSingleton)({
                    page: w,
                    clientReferenceManifest: k,
                    serverActionsManifest: S,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: S,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, i.getTracer)(),
                K = $.getActiveScopeSpan(),
                L = {
                    params: I,
                    prerenderManifest: A,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!y.experimental.authInterrupts,
                        },
                        cacheComponents: !!y.cacheComponents,
                        supportsDynamicResponse: H,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: y.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            T.onRequestError(e, t, a, P),
                    },
                    sharedContext: { buildId: E },
                },
                B = new l.NodeNextRequest(e),
                G = new l.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        T.handle(V, L).finally(() => {
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
                            } else e.updateName(`${F} ${w}`);
                        }),
                    s = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    d = async (n) => {
                        var i, d;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && O && _ && !r)
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
                                    let i = await o(n);
                                    e.fetchMetrics = L.renderOpts.fetchMetrics;
                                    let d = L.renderOpts.pendingWaitUntil;
                                    d &&
                                        a.waitUntil &&
                                        (a.waitUntil(d), (d = void 0));
                                    let l = L.renderOpts.collectedTags;
                                    if (!M)
                                        return (
                                            await (0, f.sendResponse)(
                                                B,
                                                G,
                                                i,
                                                L.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (l && (t[x.NEXT_CACHE_TAGS_HEADER] = l),
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
                                                    x.INFINITE_CACHE
                                                ) &&
                                                L.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    L.renderOpts
                                                        .collectedExpire ||
                                                L.renderOpts.collectedExpire >=
                                                    x.INFINITE_CACHE
                                                    ? void 0
                                                    : L.renderOpts
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
                                                    routePath: w,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: O,
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
                                nextConfig: y,
                                cacheKey: q,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: A,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: O,
                                revalidateOnlyGenerated: _,
                                responseGenerator: l,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!M) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== R.CachedRouteKind.APP_ROUTE
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
                        (s ||
                            t.setHeader(
                                'x-nextjs-cache',
                                O
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
                        let p = (0, h.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (s && M) || p.delete(x.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, m.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, f.sendResponse)(
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
                    ? await d(K)
                    : await $.withPropagatedContext(e.headers, () =>
                          $.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${F} ${w}`,
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
                        (await T.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: U,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: O,
                            }),
                        })),
                    M)
                )
                    throw t;
                return (
                    await (0, f.sendResponse)(
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
                () => k,
                'patchFetch',
                () => b,
                'routeModule',
                () => T,
                'serverHooks',
                () => _,
                'workAsyncStorage',
                () => P,
                'workUnitAsyncStorage',
                () => O,
            ],
            659787
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5c88cde5._.js.map
