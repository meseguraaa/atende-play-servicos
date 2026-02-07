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
    450301,
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
            l = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            h = e.i(902769),
            m = e.i(46094),
            x = e.i(622730),
            f = e.i(811178),
            g = e.i(193695);
        e.i(629399);
        var R = e.i(377404),
            w = e.i(738342),
            v = e.i(29173),
            E = e.i(698043),
            A = e.i(212669);
        function I(e, t = 400) {
            return w.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function C(e, t = 200) {
            return w.NextResponse.json({ ok: !0, data: e }, { status: t });
        }
        async function O(e, t) {
            try {
                let e = await (0, A.requireAdminForModule)('CHECKOUT'),
                    r = e.companyId;
                if (!r) return I('Empresa não encontrada na sessão.', 401);
                let a = e.id;
                if (!a) return I('Usuário não encontrado na sessão.', 401);
                let n = e.canSeeAllUnits,
                    { orderId: o } = await t.params,
                    i = String(o ?? '').trim();
                if (!i) return I('orderId é obrigatório.', 400);
                let s = await E.prisma.order.findFirst({
                    where: { id: i, companyId: r },
                    select: {
                        id: !0,
                        unitId: !0,
                        status: !0,
                        appointmentId: !0,
                        clientId: !0,
                        professionalId: !0,
                        totalAmount: !0,
                        createdAt: !0,
                        updatedAt: !0,
                    },
                });
                if (!s) return I('Pedido não encontrado.', 404);
                if (
                    !n &&
                    !(await E.prisma.adminUnitAccess.findFirst({
                        where: { companyId: r, userId: a, unitId: s.unitId },
                        select: { id: !0 },
                    }))
                )
                    return I('Sem acesso a esta unidade.', 403);
                if ('COMPLETED' === s.status) {
                    let e = s.updatedAt.toISOString();
                    if (s.appointmentId) {
                        let t = await E.prisma.appointment.findFirst({
                            where: { id: s.appointmentId, companyId: r },
                            select: { checkedOutAt: !0 },
                        });
                        t?.checkedOutAt && (e = t.checkedOutAt.toISOString());
                    }
                    return C({
                        orderId: s.id,
                        status: 'COMPLETED',
                        totalAmount: s.totalAmount
                            ? s.totalAmount.toString()
                            : '0',
                        checkedOutAt: e,
                        appointmentUpdated: !1,
                    });
                }
                if ('PENDING' !== s.status && 'PENDING_CHECKIN' !== s.status)
                    return I(
                        `N\xe3o \xe9 poss\xedvel concluir checkout com status "${s.status}".`,
                        400
                    );
                let d = new Date(),
                    l =
                        (
                            await E.prisma.orderItem.aggregate({
                                where: { orderId: s.id, companyId: r },
                                _sum: { totalPrice: !0 },
                            })
                        )._sum.totalPrice ?? new v.Prisma.Decimal(0),
                    u = await E.prisma.$transaction(async (e) => {
                        let t = await e.order.update({
                                where: { id: s.id },
                                data: { status: 'COMPLETED', totalAmount: l },
                                select: { id: !0, status: !0, totalAmount: !0 },
                            }),
                            n = !1;
                        if (s.appointmentId) {
                            let t = await e.appointment.findFirst({
                                where: { id: s.appointmentId, companyId: r },
                                select: {
                                    id: !0,
                                    status: !0,
                                    checkedOutAt: !0,
                                },
                            });
                            t &&
                                (await e.appointment.update({
                                    where: { id: t.id },
                                    data: {
                                        checkedOutAt: d,
                                        checkedOutByUserId: a,
                                        checkoutFinancialSnapshot: {
                                            orderId: s.id,
                                            unitId: s.unitId,
                                            clientId: s.clientId,
                                            professionalId: s.professionalId,
                                            totalAmount: l.toString(),
                                            createdAt:
                                                s.createdAt.toISOString(),
                                            checkedOutAt: d.toISOString(),
                                            source: 'admin_checkout_complete',
                                        },
                                    },
                                    select: { id: !0 },
                                }),
                                (n = !0));
                        }
                        return { updatedOrder: t, appointmentUpdated: n };
                    });
                return C({
                    orderId: u.updatedOrder.id,
                    status: 'COMPLETED',
                    totalAmount: u.updatedOrder.totalAmount.toString(),
                    checkedOutAt: d.toISOString(),
                    appointmentUpdated: u.appointmentUpdated,
                });
            } catch (e) {
                return I(e?.message ?? 'Erro interno.', 500);
            }
        }
        e.s(['PATCH', () => O], 274920);
        var y = e.i(274920);
        let k = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/checkout/orders/[orderId]/complete/route',
                    pathname: '/api/admin/checkout/orders/[orderId]/complete',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/checkout/orders/[orderId]/complete/route.ts',
                nextConfigOutput: 'standalone',
                userland: y,
            }),
            {
                workAsyncStorage: S,
                workUnitAsyncStorage: P,
                serverHooks: N,
            } = k;
        function T() {
            return (0, a.patchFetch)({
                workAsyncStorage: S,
                workUnitAsyncStorage: P,
            });
        }
        async function _(e, t, a) {
            k.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let w = '/api/admin/checkout/orders/[orderId]/complete/route';
            w = w.replace(/\/index$/, '') || '/';
            let v = await k.prepare(e, t, {
                srcPage: w,
                multiZoneDraftMode: !1,
            });
            if (!v)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: E,
                    params: A,
                    nextConfig: I,
                    parsedUrl: C,
                    isDraftMode: O,
                    prerenderManifest: y,
                    routerServerContext: S,
                    isOnDemandRevalidate: P,
                    revalidateOnlyGenerated: N,
                    resolvedPathname: T,
                    clientReferenceManifest: _,
                    serverActionsManifest: b,
                } = v,
                U = (0, d.normalizeAppPath)(w),
                D = !!(y.dynamicRoutes[U] || y.routes[T]),
                M = async () => (
                    (null == S ? void 0 : S.render404)
                        ? await S.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (D && !O) {
                let e = !!y.routes[T],
                    t = y.dynamicRoutes[U];
                if (t && !1 === t.fallback && !e) {
                    if (I.experimental.adapterPath) return await M();
                    throw new g.NoFallbackError();
                }
            }
            let q = null;
            !D || k.isDev || O || (q = '/index' === (q = T) ? '/' : q);
            let H = !0 === k.isDev || !D,
                j = D && !H;
            b &&
                _ &&
                (0, i.setReferenceManifestsSingleton)({
                    page: w,
                    clientReferenceManifest: _,
                    serverActionsManifest: b,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: b,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, o.getTracer)(),
                K = $.getActiveScopeSpan(),
                L = {
                    params: A,
                    prerenderManifest: y,
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
                            k.onRequestError(e, t, a, S),
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
                let i = async (e) =>
                        k.handle(V, L).finally(() => {
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
                            } else e.updateName(`${F} ${w}`);
                        }),
                    s = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    d = async (n) => {
                        var o, d;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && P && N && !r)
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
                                    let l = L.renderOpts.collectedTags;
                                    if (!D)
                                        return (
                                            await (0, h.sendResponse)(
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
                                            m.toNodeOutgoingHttpHeaders)(
                                                o.headers
                                            );
                                        (l && (t[f.NEXT_CACHE_TAGS_HEADER] = l),
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
                                                    f.INFINITE_CACHE
                                                ) &&
                                                L.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    L.renderOpts
                                                        .collectedExpire ||
                                                L.renderOpts.collectedExpire >=
                                                    f.INFINITE_CACHE
                                                    ? void 0
                                                    : L.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: R.CachedRouteKind
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
                                            (await k.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: w,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: j,
                                                        isOnDemandRevalidate: P,
                                                    }),
                                                },
                                                S
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await k.handleResponse({
                                req: e,
                                nextConfig: I,
                                cacheKey: q,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: y,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: P,
                                revalidateOnlyGenerated: N,
                                responseGenerator: l,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!D) return null;
                        if (
                            (null == u || null == (o = u.value)
                                ? void 0
                                : o.kind) !== R.CachedRouteKind.APP_ROUTE
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
                                P
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            O &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, m.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (s && D) || c.delete(f.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, x.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                B,
                                G,
                                new Response(u.value.body, {
                                    headers: c,
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
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${F} ${w}`,
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
                    (t instanceof g.NoFallbackError ||
                        (await k.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: U,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: j,
                                isOnDemandRevalidate: P,
                            }),
                        })),
                    D)
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
                () => _,
                'patchFetch',
                () => T,
                'routeModule',
                () => k,
                'serverHooks',
                () => N,
                'workAsyncStorage',
                () => S,
                'workUnitAsyncStorage',
                () => P,
            ],
            450301
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7766532c._.js.map
