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
    951709,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            a = e.i(821498),
            o = e.i(161599),
            i = e.i(182716),
            d = e.i(857635),
            s = e.i(337047),
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
            I = e.i(738342),
            y = e.i(29173),
            f = e.i(698043),
            g = e.i(212669);
        function E(e) {
            return String(e ?? '').trim();
        }
        function A(e, t = 400) {
            return I.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function C(e, t) {
            try {
                let r = await (0, g.requireAdminForModule)('CHECKOUT'),
                    n = r.companyId;
                if (!n) return A('Empresa não encontrada na sessão.', 401);
                let a = r.id;
                if (!a) return A('Usuário não encontrado na sessão.', 401);
                let o = r.canSeeAllUnits,
                    { orderId: i } = await t.params,
                    d = E(i);
                if (!d) return A('orderId é obrigatório.', 400);
                let s = await e.json().catch(() => null),
                    u = E(s?.itemId);
                if (!u) return A('itemId é obrigatório.', 400);
                let l = await f.prisma.order.findFirst({
                    where: { id: d, companyId: n },
                    select: {
                        id: !0,
                        unitId: !0,
                        status: !0,
                        inventoryRevertedAt: !0,
                    },
                });
                if (!l) return A('Pedido não encontrado.', 404);
                if (
                    !o &&
                    !(await f.prisma.adminUnitAccess.findFirst({
                        where: { companyId: n, userId: a, unitId: l.unitId },
                        select: { id: !0 },
                    }))
                )
                    return A('Sem acesso a esta unidade.', 403);
                if ('COMPLETED' === l.status)
                    return A(
                        'Não é possível remover produtos de um pedido pago.',
                        400
                    );
                if ('PENDING' !== l.status && 'PENDING_CHECKIN' !== l.status)
                    return A(
                        `N\xe3o \xe9 poss\xedvel remover produtos de pedido com status "${l.status}".`,
                        400
                    );
                let c = new Date(),
                    p = await f.prisma.$transaction(async (e) => {
                        let t = await e.orderItem.findFirst({
                            where: {
                                id: u,
                                companyId: n,
                                orderId: l.id,
                                productId: { not: null },
                            },
                            select: { id: !0, productId: !0, quantity: !0 },
                        });
                        if (!t)
                            throw Error(
                                'Item de produto não encontrado neste pedido.'
                            );
                        let r = E(t.productId);
                        if (!r)
                            throw Error('Item inválido (productId ausente).');
                        let a =
                            'number' == typeof t.quantity &&
                            Number.isFinite(t.quantity)
                                ? Math.trunc(t.quantity)
                                : 0;
                        if (a <= 0) throw Error('Item inválido (quantity).');
                        (await e.product.updateMany({
                            where: { id: r, companyId: n },
                            data: { stockQuantity: { increment: a } },
                        }),
                            await e.orderItem.deleteMany({
                                where: {
                                    id: t.id,
                                    companyId: n,
                                    orderId: l.id,
                                },
                            }));
                        let o =
                                (
                                    await e.orderItem.aggregate({
                                        where: { companyId: n, orderId: l.id },
                                        _sum: { totalPrice: !0 },
                                    })
                                )._sum.totalPrice ?? new y.Prisma.Decimal(0),
                            i = await e.orderItem.count({
                                where: { companyId: n, orderId: l.id },
                            });
                        if (0 === i)
                            return (
                                await e.order.updateMany({
                                    where: { id: l.id, companyId: n },
                                    data: {
                                        status: 'CANCELED',
                                        totalAmount: new y.Prisma.Decimal(0),
                                        expiredAt: c,
                                        inventoryRevertedAt:
                                            l.inventoryRevertedAt ?? c,
                                    },
                                }),
                                {
                                    orderStatus: 'CANCELED',
                                    removedItemId: t.id,
                                    removedProductId: r,
                                    removedQuantity: a,
                                    inventoryRevertedAt: (
                                        l.inventoryRevertedAt ?? c
                                    ).toISOString(),
                                    orderTotalAmount: '0',
                                    remainingProductItemsCount: 0,
                                }
                            );
                        await e.order.updateMany({
                            where: { id: l.id, companyId: n },
                            data: {
                                totalAmount: o,
                                inventoryRevertedAt: l.inventoryRevertedAt ?? c,
                            },
                        });
                        let d = await e.orderItem.count({
                            where: {
                                companyId: n,
                                orderId: l.id,
                                productId: { not: null },
                            },
                        });
                        return {
                            orderStatus: l.status,
                            removedItemId: t.id,
                            removedProductId: r,
                            removedQuantity: a,
                            inventoryRevertedAt: (
                                l.inventoryRevertedAt ?? c
                            ).toISOString(),
                            orderTotalAmount: o.toString(),
                            remainingProductItemsCount: d,
                        };
                    });
                return (function (e, t = 200) {
                    return I.NextResponse.json(
                        { ok: !0, data: e },
                        { status: t }
                    );
                })({
                    orderId: l.id,
                    orderStatus: p.orderStatus,
                    removedItemId: p.removedItemId,
                    removedProductId: p.removedProductId,
                    removedQuantity: p.removedQuantity,
                    inventoryRevertedAt: p.inventoryRevertedAt,
                    orderTotalAmount: p.orderTotalAmount,
                    remainingProductItemsCount: p.remainingProductItemsCount,
                });
            } catch (r) {
                let e = r?.message ?? 'Erro interno.',
                    t =
                        e.includes('não encontrado') || e.includes('inválido')
                            ? 400
                            : 500;
                return A(e, t);
            }
        }
        e.s(['PATCH', () => C], 181481);
        var P = e.i(181481);
        let N = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/checkout/orders/[orderId]/remove-product-item/route',
                    pathname:
                        '/api/admin/checkout/orders/[orderId]/remove-product-item',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/checkout/orders/[orderId]/remove-product-item/route.ts',
                nextConfigOutput: 'standalone',
                userland: P,
            }),
            {
                workAsyncStorage: S,
                workUnitAsyncStorage: T,
                serverHooks: b,
            } = N;
        function k() {
            return (0, n.patchFetch)({
                workAsyncStorage: S,
                workUnitAsyncStorage: T,
            });
        }
        async function q(e, t, n) {
            N.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let I =
                '/api/admin/checkout/orders/[orderId]/remove-product-item/route';
            I = I.replace(/\/index$/, '') || '/';
            let y = await N.prepare(e, t, {
                srcPage: I,
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
                    buildId: f,
                    params: g,
                    nextConfig: E,
                    parsedUrl: A,
                    isDraftMode: C,
                    prerenderManifest: P,
                    routerServerContext: S,
                    isOnDemandRevalidate: T,
                    revalidateOnlyGenerated: b,
                    resolvedPathname: k,
                    clientReferenceManifest: q,
                    serverActionsManifest: O,
                } = y,
                M = (0, s.normalizeAppPath)(I),
                _ = !!(P.dynamicRoutes[M] || P.routes[k]),
                D = async () => (
                    (null == S ? void 0 : S.render404)
                        ? await S.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (_ && !C) {
                let e = !!P.routes[k],
                    t = P.dynamicRoutes[M];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await D();
                    throw new w.NoFallbackError();
                }
            }
            let j = null;
            !_ || N.isDev || C || (j = '/index' === (j = k) ? '/' : j);
            let H = !0 === N.isDev || !_,
                U = _ && !H;
            O &&
                q &&
                (0, i.setReferenceManifestsSingleton)({
                    page: I,
                    clientReferenceManifest: q,
                    serverActionsManifest: O,
                    serverModuleMap: (0, d.createServerModuleMap)({
                        serverActionsManifest: O,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, o.getTracer)(),
                K = $.getActiveScopeSpan(),
                L = {
                    params: g,
                    prerenderManifest: P,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!E.experimental.authInterrupts,
                        },
                        cacheComponents: !!E.cacheComponents,
                        supportsDynamicResponse: H,
                        incrementalCache: (0, a.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: E.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            N.onRequestError(e, t, n, S),
                    },
                    sharedContext: { buildId: f },
                },
                B = new u.NodeNextRequest(e),
                G = new u.NodeNextResponse(t),
                Q = l.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, l.signalFromNodeResponse)(t)
                );
            try {
                let i = async (e) =>
                        N.handle(Q, L).finally(() => {
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
                            let n = r.get('next.route');
                            if (n) {
                                let t = `${F} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${F} ${I}`);
                        }),
                    d = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    s = async (a) => {
                        var o, s;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!d && T && b && !r)
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
                                    let o = await i(a);
                                    e.fetchMetrics = L.renderOpts.fetchMetrics;
                                    let s = L.renderOpts.pendingWaitUntil;
                                    s &&
                                        n.waitUntil &&
                                        (n.waitUntil(s), (s = void 0));
                                    let u = L.renderOpts.collectedTags;
                                    if (!_)
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
                                            n =
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
                                                    routePath: I,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: U,
                                                        isOnDemandRevalidate: T,
                                                    }),
                                                },
                                                S
                                            )),
                                        t
                                    );
                                }
                            },
                            l = await N.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: j,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: P,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: T,
                                revalidateOnlyGenerated: b,
                                responseGenerator: u,
                                waitUntil: n.waitUntil,
                                isMinimalMode: d,
                            });
                        if (!_) return null;
                        if (
                            (null == l || null == (o = l.value)
                                ? void 0
                                : o.kind) !== x.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == l || null == (s = l.value) ? void 0 : s.kind}`
                                ),
                                '__NEXT_ERROR_CODE',
                                {
                                    value: 'E701',
                                    enumerable: !1,
                                    configurable: !0,
                                }
                            );
                        (d ||
                            t.setHeader(
                                'x-nextjs-cache',
                                T
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
                            (d && _) || c.delete(R.NEXT_CACHE_TAGS_HEADER),
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
                    ? await s(K)
                    : await $.withPropagatedContext(e.headers, () =>
                          $.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${F} ${I}`,
                                  kind: o.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': F,
                                      'http.target': e.url,
                                  },
                              },
                              s
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof w.NoFallbackError ||
                        (await N.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: M,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: U,
                                isOnDemandRevalidate: T,
                            }),
                        })),
                    _)
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
                () => q,
                'patchFetch',
                () => k,
                'routeModule',
                () => N,
                'serverHooks',
                () => b,
                'workAsyncStorage',
                () => S,
                'workUnitAsyncStorage',
                () => T,
            ],
            951709
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5f746eb7._.js.map
