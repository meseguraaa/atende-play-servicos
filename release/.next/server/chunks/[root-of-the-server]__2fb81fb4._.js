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
    745534,
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
            u = e.i(528171),
            l = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            h = e.i(46094),
            f = e.i(622730),
            w = e.i(811178),
            v = e.i(193695);
        e.i(629399);
        var x = e.i(377404),
            R = e.i(738342),
            g = e.i(29173),
            E = e.i(698043),
            y = e.i(212669);
        function I(e) {
            return String(e ?? '').trim();
        }
        function A(e, t = 400) {
            return R.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function C(e, t) {
            try {
                let r = await (0, y.requireAdminForModule)('CHECKOUT'),
                    a = r.companyId;
                if (!a) return A('Empresa não encontrada na sessão.', 401);
                let n = r.id;
                if (!n) return A('Usuário não encontrado na sessão.', 401);
                let i = r.canSeeAllUnits,
                    { clientId: o } = await t.params,
                    s = I(o);
                if (!s) return A('clientId é obrigatório.', 400);
                let d = await e.json().catch(() => null),
                    u = I(d?.productId),
                    l = (function (e) {
                        if ('number' == typeof e)
                            return Number.isFinite(e) ? Math.trunc(e) : NaN;
                        if ('string' == typeof e) {
                            let t = Number(e);
                            return Number.isFinite(t) ? Math.trunc(t) : NaN;
                        }
                        return NaN;
                    })(d?.quantity);
                if (!u) return A('productId é obrigatório.', 400);
                if (!Number.isFinite(l) || l <= 0)
                    return A('quantity inválida.', 400);
                let c = await E.prisma.product.findFirst({
                    where: { id: u, companyId: a, isActive: !0 },
                    select: {
                        id: !0,
                        unitId: !0,
                        price: !0,
                        stockQuantity: !0,
                        name: !0,
                    },
                });
                if (!c) return A('Produto não encontrado ou inativo.', 404);
                if (
                    !i &&
                    !(await E.prisma.adminUnitAccess.findFirst({
                        where: { companyId: a, userId: n, unitId: c.unitId },
                        select: { id: !0 },
                    }))
                )
                    return A('Sem acesso a esta unidade.', 403);
                let p = new g.Prisma.Decimal(c.price),
                    m = new g.Prisma.Decimal(l),
                    h = p.mul(m),
                    f = await E.prisma.$transaction(async (e) => {
                        let t,
                            r = await e.product.updateMany({
                                where: {
                                    id: c.id,
                                    companyId: a,
                                    isActive: !0,
                                    stockQuantity: { gte: l },
                                },
                                data: { stockQuantity: { decrement: l } },
                            });
                        if (0 === r.count) {
                            let t = await e.product.findFirst({
                                    where: { id: c.id, companyId: a },
                                    select: { stockQuantity: !0, isActive: !0 },
                                }),
                                r = t?.stockQuantity ?? 0;
                            if (!t?.isActive)
                                throw Error(
                                    'Produto não encontrado ou inativo.'
                                );
                            throw Error(
                                `Estoque insuficiente: dispon\xedvel ${r}, solicitado ${l}.`
                            );
                        }
                        let n = await e.order.findFirst({
                                where: {
                                    companyId: a,
                                    unitId: c.unitId,
                                    clientId: s,
                                    status: {
                                        in: ['PENDING', 'PENDING_CHECKIN'],
                                    },
                                },
                                orderBy: { updatedAt: 'desc' },
                                select: { id: !0, status: !0 },
                            }),
                            i = !1;
                        if (n) ((t = n.id), n.status);
                        else {
                            let r = await e.order.create({
                                data: {
                                    companyId: a,
                                    unitId: c.unitId,
                                    clientId: s,
                                    status: 'PENDING',
                                    totalAmount: new g.Prisma.Decimal(0),
                                },
                                select: { id: !0, status: !0 },
                            });
                            ((t = r.id), r.status, (i = !0));
                        }
                        let o = await e.orderItem.create({
                                data: {
                                    companyId: a,
                                    orderId: t,
                                    productId: c.id,
                                    quantity: l,
                                    unitPrice: p,
                                    totalPrice: h,
                                },
                                select: { id: !0 },
                            }),
                            d =
                                (
                                    await e.orderItem.aggregate({
                                        where: { companyId: a, orderId: t },
                                        _sum: { totalPrice: !0 },
                                    })
                                )._sum.totalPrice ?? new g.Prisma.Decimal(0),
                            u = await e.order.updateMany({
                                where: { id: t, companyId: a },
                                data: { totalAmount: d },
                            });
                        if (0 === u.count)
                            throw Error(
                                'Falha ao atualizar pedido (tenant mismatch).'
                            );
                        let m = await e.order.findFirst({
                            where: { id: t, companyId: a },
                            select: { id: !0, totalAmount: !0, status: !0 },
                        });
                        if (!m)
                            throw Error(
                                'Pedido não encontrado após atualização.'
                            );
                        return {
                            orderId: m.id,
                            orderStatus: m.status,
                            orderTotalAmount: m.totalAmount,
                            itemId: o.id,
                            orderWasCreated: i,
                        };
                    });
                return (function (e, t = 200) {
                    return R.NextResponse.json(
                        { ok: !0, data: e },
                        { status: t }
                    );
                })({
                    clientId: s,
                    orderId: f.orderId,
                    orderStatus: f.orderStatus,
                    itemId: f.itemId,
                    productId: c.id,
                    quantity: l,
                    unitId: c.unitId,
                    unitPrice: String(p),
                    totalPrice: String(h),
                    orderTotalAmount: String(f.orderTotalAmount),
                    orderWasCreated: f.orderWasCreated,
                });
            } catch (r) {
                let e = r?.message ?? 'Erro interno.',
                    t =
                        e.includes('Estoque insuficiente') ||
                        e.includes('Produto não encontrado') ||
                        e.includes('inativo')
                            ? 400
                            : e.includes('Sem acesso')
                              ? 403
                              : 500;
                return A(e, t);
            }
        }
        e.s(['PATCH', () => C], 861355);
        var N = e.i(861355);
        let P = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/checkout/accounts/[clientId]/add-product/route',
                    pathname:
                        '/api/admin/checkout/accounts/[clientId]/add-product',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/checkout/accounts/[clientId]/add-product/route.ts',
                nextConfigOutput: 'standalone',
                userland: N,
            }),
            {
                workAsyncStorage: b,
                workUnitAsyncStorage: k,
                serverHooks: S,
            } = P;
        function T() {
            return (0, a.patchFetch)({
                workAsyncStorage: b,
                workUnitAsyncStorage: k,
            });
        }
        async function q(e, t, a) {
            P.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let R = '/api/admin/checkout/accounts/[clientId]/add-product/route';
            R = R.replace(/\/index$/, '') || '/';
            let g = await P.prepare(e, t, {
                srcPage: R,
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
                    params: y,
                    nextConfig: I,
                    parsedUrl: A,
                    isDraftMode: C,
                    prerenderManifest: N,
                    routerServerContext: b,
                    isOnDemandRevalidate: k,
                    revalidateOnlyGenerated: S,
                    resolvedPathname: T,
                    clientReferenceManifest: q,
                    serverActionsManifest: _,
                } = g,
                O = (0, d.normalizeAppPath)(R),
                M = !!(N.dynamicRoutes[O] || N.routes[T]),
                j = async () => (
                    (null == b ? void 0 : b.render404)
                        ? await b.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (M && !C) {
                let e = !!N.routes[T],
                    t = N.dynamicRoutes[O];
                if (t && !1 === t.fallback && !e) {
                    if (I.experimental.adapterPath) return await j();
                    throw new v.NoFallbackError();
                }
            }
            let D = null;
            !M || P.isDev || C || (D = '/index' === (D = T) ? '/' : D);
            let H = !0 === P.isDev || !M,
                U = M && !H;
            _ &&
                q &&
                (0, o.setReferenceManifestsSingleton)({
                    page: R,
                    clientReferenceManifest: q,
                    serverActionsManifest: _,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: _,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, i.getTracer)(),
                K = $.getActiveScopeSpan(),
                B = {
                    params: y,
                    prerenderManifest: N,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!I.experimental.authInterrupts,
                        },
                        cacheComponents: !!I.cacheComponents,
                        supportsDynamicResponse: H,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: I.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            P.onRequestError(e, t, a, b),
                    },
                    sharedContext: { buildId: E },
                },
                G = new u.NodeNextRequest(e),
                L = new u.NodeNextResponse(t),
                Q = l.NextRequestAdapter.fromNodeNextRequest(
                    G,
                    (0, l.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        P.handle(Q, B).finally(() => {
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
                            } else e.updateName(`${F} ${R}`);
                        }),
                    s = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    d = async (n) => {
                        var i, d;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && k && S && !r)
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
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let d = B.renderOpts.pendingWaitUntil;
                                    d &&
                                        a.waitUntil &&
                                        (a.waitUntil(d), (d = void 0));
                                    let u = B.renderOpts.collectedTags;
                                    if (!M)
                                        return (
                                            await (0, m.sendResponse)(
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
                                            h.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (u && (t[w.NEXT_CACHE_TAGS_HEADER] = u),
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
                                                    w.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    w.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: x.CachedRouteKind
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
                                            (await P.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: R,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: U,
                                                        isOnDemandRevalidate: k,
                                                    }),
                                                },
                                                b
                                            )),
                                        t
                                    );
                                }
                            },
                            l = await P.handleResponse({
                                req: e,
                                nextConfig: I,
                                cacheKey: D,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: N,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: k,
                                revalidateOnlyGenerated: S,
                                responseGenerator: u,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!M) return null;
                        if (
                            (null == l || null == (i = l.value)
                                ? void 0
                                : i.kind) !== x.CachedRouteKind.APP_ROUTE
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
                                k
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
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            l.value.headers
                        );
                        return (
                            (s && M) || c.delete(w.NEXT_CACHE_TAGS_HEADER),
                            !l.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(l.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                G,
                                L,
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
                                  spanName: `${F} ${R}`,
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
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: U,
                                isOnDemandRevalidate: k,
                            }),
                        })),
                    M)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
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
                () => q,
                'patchFetch',
                () => T,
                'routeModule',
                () => P,
                'serverHooks',
                () => S,
                'workAsyncStorage',
                () => b,
                'workUnitAsyncStorage',
                () => k,
            ],
            745534
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2fb81fb4._.js.map
