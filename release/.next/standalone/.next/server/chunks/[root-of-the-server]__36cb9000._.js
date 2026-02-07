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
    596454,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            o = e.i(161599),
            i = e.i(182716),
            s = e.i(857635),
            d = e.i(337047),
            u = e.i(528171),
            l = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            v = e.i(46094),
            h = e.i(622730),
            R = e.i(811178),
            w = e.i(193695);
        e.i(629399);
        var x = e.i(377404),
            y = e.i(738342),
            f = e.i(29173),
            g = e.i(698043),
            A = e.i(212669);
        function E(e) {
            return String(e ?? '').trim();
        }
        function I(e, t = 400) {
            return y.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function C(e, t = 200) {
            return y.NextResponse.json({ ok: !0, data: e }, { status: t });
        }
        async function P(e, t) {
            try {
                let e = await (0, A.requireAdminForModule)('CHECKOUT'),
                    r = e.companyId;
                if (!r) return I('Empresa não encontrada na sessão.', 401);
                let a = e.id;
                if (!a) return I('Usuário não encontrado na sessão.', 401);
                let n = e.canSeeAllUnits,
                    { orderId: o } = await t.params,
                    i = E(o);
                if (!i) return I('orderId é obrigatório.', 400);
                let s = await g.prisma.order.findFirst({
                    where: { id: i, companyId: r },
                    select: {
                        id: !0,
                        unitId: !0,
                        status: !0,
                        inventoryRevertedAt: !0,
                        items: {
                            select: {
                                id: !0,
                                productId: !0,
                                serviceId: !0,
                                quantity: !0,
                                totalPrice: !0,
                            },
                        },
                    },
                });
                if (!s) return I('Pedido não encontrado.', 404);
                if (
                    !n &&
                    !(await g.prisma.adminUnitAccess.findFirst({
                        where: { companyId: r, userId: a, unitId: s.unitId },
                        select: { id: !0 },
                    }))
                )
                    return I('Sem acesso a esta unidade.', 403);
                if ('COMPLETED' === s.status)
                    return I(
                        'Não é possível remover produtos de um pedido pago.',
                        400
                    );
                if ('PENDING' !== s.status && 'PENDING_CHECKIN' !== s.status)
                    return I(
                        `N\xe3o \xe9 poss\xedvel remover produtos de pedido com status "${s.status}".`,
                        400
                    );
                let d = (s.items ?? []).filter((e) => !!e.productId);
                if (0 === d.length) {
                    let e =
                        (
                            await g.prisma.orderItem.aggregate({
                                where: { companyId: r, orderId: s.id },
                                _sum: { totalPrice: !0 },
                            })
                        )._sum.totalPrice ?? new f.Prisma.Decimal(0);
                    return (
                        await g.prisma.order.updateMany({
                            where: { id: s.id, companyId: r },
                            data: { totalAmount: e },
                        }),
                        C({
                            orderId: s.id,
                            status: s.status,
                            removedItemsCount: 0,
                            removedQuantityTotal: 0,
                            inventoryRevertedAt: s.inventoryRevertedAt
                                ? s.inventoryRevertedAt.toISOString()
                                : null,
                            orderTotalAmount: e.toString(),
                        })
                    );
                }
                let u = new Date(),
                    l = await g.prisma.$transaction(async (e) => {
                        let t = new Map(),
                            a = 0;
                        for (let e of d) {
                            let r = E(e.productId);
                            if (!r) continue;
                            let n =
                                'number' == typeof e.quantity ? e.quantity : 0;
                            Number.isFinite(n) &&
                                !(n <= 0) &&
                                ((a += n), t.set(r, (t.get(r) ?? 0) + n));
                        }
                        for (let [a, n] of t.entries())
                            await e.product.updateMany({
                                where: { id: a, companyId: r },
                                data: { stockQuantity: { increment: n } },
                            });
                        let n = await e.orderItem.deleteMany({
                                where: {
                                    companyId: r,
                                    orderId: s.id,
                                    productId: { not: null },
                                },
                            }),
                            o =
                                (
                                    await e.orderItem.aggregate({
                                        where: { companyId: r, orderId: s.id },
                                        _sum: { totalPrice: !0 },
                                    })
                                )._sum.totalPrice ?? new f.Prisma.Decimal(0),
                            i = await e.orderItem.count({
                                where: { companyId: r, orderId: s.id },
                            });
                        return 0 === i
                            ? (await e.order.updateMany({
                                  where: { id: s.id, companyId: r },
                                  data: {
                                      status: 'CANCELED',
                                      totalAmount: new f.Prisma.Decimal(0),
                                      expiredAt: u,
                                      inventoryRevertedAt:
                                          s.inventoryRevertedAt ?? u,
                                  },
                              }),
                              {
                                  status: 'CANCELED',
                                  removedItemsCount: n.count ?? 0,
                                  removedQuantityTotal: a,
                                  inventoryRevertedAt: (
                                      s.inventoryRevertedAt ?? u
                                  ).toISOString(),
                                  orderTotalAmount: '0',
                              })
                            : (await e.order.updateMany({
                                  where: { id: s.id, companyId: r },
                                  data: {
                                      totalAmount: o,
                                      inventoryRevertedAt:
                                          s.inventoryRevertedAt ?? u,
                                  },
                              }),
                              {
                                  status: s.status,
                                  removedItemsCount: n.count ?? 0,
                                  removedQuantityTotal: a,
                                  inventoryRevertedAt: (
                                      s.inventoryRevertedAt ?? u
                                  ).toISOString(),
                                  orderTotalAmount: o.toString(),
                              });
                    });
                return C({
                    orderId: s.id,
                    status: l.status,
                    removedItemsCount: l.removedItemsCount,
                    removedQuantityTotal: l.removedQuantityTotal,
                    inventoryRevertedAt: l.inventoryRevertedAt,
                    orderTotalAmount: l.orderTotalAmount,
                });
            } catch (e) {
                return I(e?.message ?? 'Erro interno.', 500);
            }
        }
        e.s(['PATCH', () => P], 696292);
        var N = e.i(696292);
        let T = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/checkout/orders/[orderId]/remove-products/route',
                    pathname:
                        '/api/admin/checkout/orders/[orderId]/remove-products',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/checkout/orders/[orderId]/remove-products/route.ts',
                nextConfigOutput: 'standalone',
                userland: N,
            }),
            {
                workAsyncStorage: S,
                workUnitAsyncStorage: b,
                serverHooks: k,
            } = T;
        function O() {
            return (0, a.patchFetch)({
                workAsyncStorage: S,
                workUnitAsyncStorage: b,
            });
        }
        async function _(e, t, a) {
            T.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let y =
                '/api/admin/checkout/orders/[orderId]/remove-products/route';
            y = y.replace(/\/index$/, '') || '/';
            let f = await T.prepare(e, t, {
                srcPage: y,
                multiZoneDraftMode: !1,
            });
            if (!f)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: g,
                    params: A,
                    nextConfig: E,
                    parsedUrl: I,
                    isDraftMode: C,
                    prerenderManifest: P,
                    routerServerContext: N,
                    isOnDemandRevalidate: S,
                    revalidateOnlyGenerated: b,
                    resolvedPathname: k,
                    clientReferenceManifest: O,
                    serverActionsManifest: _,
                } = f,
                M = (0, d.normalizeAppPath)(y),
                q = !!(P.dynamicRoutes[M] || P.routes[k]),
                D = async () => (
                    (null == N ? void 0 : N.render404)
                        ? await N.render404(e, t, I, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (q && !C) {
                let e = !!P.routes[k],
                    t = P.dynamicRoutes[M];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await D();
                    throw new w.NoFallbackError();
                }
            }
            let H = null;
            !q || T.isDev || C || (H = '/index' === (H = k) ? '/' : H);
            let U = !0 === T.isDev || !q,
                j = q && !U;
            _ &&
                O &&
                (0, i.setReferenceManifestsSingleton)({
                    page: y,
                    clientReferenceManifest: O,
                    serverActionsManifest: _,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: _,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, o.getTracer)(),
                K = $.getActiveScopeSpan(),
                L = {
                    params: A,
                    prerenderManifest: P,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!E.experimental.authInterrupts,
                        },
                        cacheComponents: !!E.cacheComponents,
                        supportsDynamicResponse: U,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: E.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            T.onRequestError(e, t, a, N),
                    },
                    sharedContext: { buildId: g },
                },
                B = new u.NodeNextRequest(e),
                G = new u.NodeNextResponse(t),
                Q = l.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, l.signalFromNodeResponse)(t)
                );
            try {
                let i = async (e) =>
                        T.handle(Q, L).finally(() => {
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
                            } else e.updateName(`${F} ${y}`);
                        }),
                    s = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    d = async (n) => {
                        var o, d;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && S && b && !r)
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
                                    let o = await i(n);
                                    e.fetchMetrics = L.renderOpts.fetchMetrics;
                                    let d = L.renderOpts.pendingWaitUntil;
                                    d &&
                                        a.waitUntil &&
                                        (a.waitUntil(d), (d = void 0));
                                    let u = L.renderOpts.collectedTags;
                                    if (!q)
                                        return (
                                            await (0, m.sendResponse)(
                                                B,
                                                G,
                                                o,
                                                L.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await o.blob(),
                                            t = (0,
                                            v.toNodeOutgoingHttpHeaders)(
                                                o.headers
                                            );
                                        (u && (t[R.NEXT_CACHE_TAGS_HEADER] = u),
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
                                                    R.INFINITE_CACHE
                                                ) &&
                                                L.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    L.renderOpts
                                                        .collectedExpire ||
                                                L.renderOpts.collectedExpire >=
                                                    R.INFINITE_CACHE
                                                    ? void 0
                                                    : L.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: x.CachedRouteKind
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
                                            (await T.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: y,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: j,
                                                        isOnDemandRevalidate: S,
                                                    }),
                                                },
                                                N
                                            )),
                                        t
                                    );
                                }
                            },
                            l = await T.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: H,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: P,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: S,
                                revalidateOnlyGenerated: b,
                                responseGenerator: u,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!q) return null;
                        if (
                            (null == l || null == (o = l.value)
                                ? void 0
                                : o.kind) !== x.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == l || null == (d = l.value) ? void 0 : d.kind}`
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
                                S
                                    ? 'REVALIDATED'
                                    : l.isMiss
                                      ? 'MISS'
                                      : l.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            C &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, v.fromNodeOutgoingHttpHeaders)(
                            l.value.headers
                        );
                        return (
                            (s && q) || c.delete(R.NEXT_CACHE_TAGS_HEADER),
                            !l.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(l.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                B,
                                G,
                                new Response(l.value.body, {
                                    headers: c,
                                    status: l.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                K
                    ? await d(K)
                    : await $.withPropagatedContext(e.headers, () =>
                          $.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${F} ${y}`,
                                  kind: o.SpanKind.SERVER,
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
                    (t instanceof w.NoFallbackError ||
                        (await T.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: M,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: j,
                                isOnDemandRevalidate: S,
                            }),
                        })),
                    q)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
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
                () => _,
                'patchFetch',
                () => O,
                'routeModule',
                () => T,
                'serverHooks',
                () => k,
                'workAsyncStorage',
                () => S,
                'workUnitAsyncStorage',
                () => b,
            ],
            596454
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__36cb9000._.js.map
