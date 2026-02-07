module.exports = [
    549175,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            l = e.i(857635),
            s = e.i(337047),
            u = e.i(528171),
            d = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            f = e.i(46094),
            h = e.i(622730),
            g = e.i(811178),
            b = e.i(193695);
        e.i(629399);
        var v = e.i(377404),
            A = e.i(738342),
            R = e.i(698043),
            N = e.i(212669);
        function w(e, t = 400) {
            return A.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function y(e) {
            return String(e ?? '').trim();
        }
        function E(e) {
            let t = (function (e) {
                if (null == e) return NaN;
                if ('number' == typeof e) return e;
                if ('string' == typeof e) {
                    let t = Number(e.replace(',', '.'));
                    return Number.isFinite(t) ? t : NaN;
                }
                if ('object' == typeof e) {
                    if ('function' == typeof e.toNumber) {
                        let t = e.toNumber();
                        return Number.isFinite(t) ? t : NaN;
                    }
                    if ('function' == typeof e.toString) {
                        let t = Number(String(e.toString()).replace(',', '.'));
                        return Number.isFinite(t) ? t : NaN;
                    }
                }
                return NaN;
            })(e);
            return Number.isFinite(t)
                ? Math.round((t + Number.EPSILON) * 100) / 100
                : 0;
        }
        function P(e) {
            let t = E(e);
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
            }).format(t);
        }
        function I(e) {
            let t = e.toLocaleDateString('pt-BR'),
                r = e.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                });
            return `${t} \xe0s ${r}`;
        }
        async function S(e) {
            try {
                var t;
                let r,
                    a,
                    n,
                    i,
                    o,
                    l,
                    s,
                    u,
                    d,
                    c,
                    p,
                    m,
                    f = await (0, N.requireAdminForModule)('CHECKOUT'),
                    h = f.companyId;
                if (!h) return w('Empresa não encontrada na sessão.', 401);
                let g = f.id;
                if (!g) return w('Usuário não encontrado na sessão.', 401);
                let b = f.canSeeAllUnits,
                    v = new URL(e.url),
                    S = v.searchParams.get('unit'),
                    L = y(S),
                    {
                        monthQuery: C,
                        monthStart: x,
                        monthEnd: O,
                        monthLabel: T,
                    } = ((t = v.searchParams.get('month')),
                    (r = new Date()),
                    (a = y(t)),
                    (n = /^(\d{4})-(\d{2})$/.exec(a)),
                    (i = r.getFullYear()),
                    (o = r.getMonth()),
                    n &&
                        ((i = Number(n[1])),
                        (o = Number(n[2]) - 1),
                        (Number.isFinite(i) && Number.isFinite(o)) ||
                            ((i = r.getFullYear()), (o = r.getMonth()))),
                    (l = new Date(i, o, 1, 0, 0, 0, 0)),
                    (s = new Date(i, o + 1, 1, 0, 0, 0, 0)),
                    (u = `${i}-${String(o + 1).padStart(2, '0')}`),
                    (d = l.toLocaleDateString('pt-BR', { month: 'long' })),
                    (c = l.getFullYear()),
                    (p = d.charAt(0).toUpperCase() + d.slice(1)),
                    (m = `${p} de ${c}`),
                    {
                        monthQuery: u,
                        monthStart: l,
                        monthEnd: s,
                        monthLabel: m,
                    }),
                    M = null;
                if (b)
                    if (L && 'all' !== L) {
                        let e = await R.prisma.unit.findFirst({
                            where: { id: L, companyId: h, isActive: !0 },
                            select: { id: !0 },
                        });
                        if (!e) return w('Unidade inválida ou inativa.', 404);
                        M = [e.id];
                    } else M = null;
                else {
                    let e = (
                        await R.prisma.adminUnitAccess.findMany({
                            where: { companyId: h, userId: g },
                            select: { unitId: !0 },
                        })
                    ).map((e) => e.unitId);
                    if (0 === e.length) return w('Sem acesso a unidades.', 403);
                    if (L && 'all' !== L) {
                        if (!e.includes(L))
                            return w('Sem acesso a esta unidade.', 403);
                        M = [L];
                    } else M = e;
                }
                let q = M && M.length > 0 ? { unitId: { in: M } } : {},
                    D = await R.prisma.order.findMany({
                        where: {
                            companyId: h,
                            ...q,
                            status: { in: ['PENDING', 'PENDING_CHECKIN'] },
                        },
                        orderBy: { updatedAt: 'desc' },
                        select: {
                            id: !0,
                            status: !0,
                            createdAt: !0,
                            updatedAt: !0,
                            totalAmount: !0,
                            clientId: !0,
                            client: { select: { id: !0, name: !0 } },
                            professional: { select: { id: !0, name: !0 } },
                            appointment: { select: { scheduleAt: !0 } },
                            items: {
                                select: {
                                    id: !0,
                                    quantity: !0,
                                    unitPrice: !0,
                                    totalPrice: !0,
                                    serviceId: !0,
                                    productId: !0,
                                    professionalId: !0,
                                    professional: {
                                        select: { id: !0, name: !0 },
                                    },
                                    service: { select: { id: !0, name: !0 } },
                                    product: { select: { id: !0, name: !0 } },
                                },
                            },
                        },
                    }),
                    U = new Map();
                for (let e of D) {
                    let t = e.clientId ?? `unknown:${e.id}`,
                        r = y(e.client?.name) || 'Cliente não identificado',
                        a = e.updatedAt ?? e.createdAt,
                        n = I(a),
                        i = (e.items ?? []).filter((e) => !!e.serviceId),
                        o = (e.items ?? []).filter((e) => !!e.productId),
                        l = E(i.reduce((e, t) => e + E(t.totalPrice), 0)),
                        s = E(o.reduce((e, t) => e + E(t.totalPrice), 0)),
                        u = i.length > 0,
                        d = o.length > 0,
                        c = e.appointment?.scheduleAt
                            ? I(e.appointment.scheduleAt)
                            : null,
                        p = y(e.professional?.name) || '—',
                        m =
                            i
                                .map((e) => {
                                    let t = e.quantity ?? 1,
                                        r = e.service?.name || 'Serviço';
                                    return `${t}x ${r}`;
                                })
                                .join(', ') || '—',
                        f =
                            o
                                .map((e) => {
                                    let t = e.quantity ?? 1,
                                        r = e.product?.name || 'Produto';
                                    return `${t}x ${r}`;
                                })
                                .join(', ') || '—',
                        h = o.map((e) => ({
                            itemId: e.id,
                            productId: String(e.productId ?? ''),
                            name: y(e.product?.name) || 'Produto',
                            qty: 'number' == typeof e.quantity ? e.quantity : 1,
                            totalLabel: P(e.totalPrice),
                            professionalId: e.professionalId
                                ? String(e.professionalId)
                                : null,
                            professionalName:
                                (e.professional?.name &&
                                    y(e.professional.name)) ||
                                null,
                        })),
                        g = U.get(t);
                    g ||
                        U.set(t, {
                            clientId: e.clientId ?? t,
                            clientLabel: r,
                            latestLabel: n,
                            totalLabel: P(0),
                            totalServicesLabel: P(0),
                            totalProductsLabel: P(0),
                            hasProducts: !1,
                            serviceOrders: [],
                            productOrders: [],
                        });
                    let b = U.get(t),
                        v = E(
                            Number(
                                String(b.totalLabel)
                                    .replace(/[^\d,.-]/g, '')
                                    .replace('.', '')
                                    .replace(',', '.')
                            )
                        ),
                        A = E(
                            Number(
                                String(b.totalServicesLabel)
                                    .replace(/[^\d,.-]/g, '')
                                    .replace('.', '')
                                    .replace(',', '.')
                            )
                        ),
                        R = E(
                            Number(
                                String(b.totalProductsLabel)
                                    .replace(/[^\d,.-]/g, '')
                                    .replace('.', '')
                                    .replace(',', '.')
                            )
                        );
                    ((b.totalLabel = P(v + E(e.totalAmount))),
                        (b.totalServicesLabel = P(A + l)),
                        (b.totalProductsLabel = P(R + s)),
                        (b.hasProducts = b.hasProducts || d),
                        g || (b.latestLabel = n),
                        u &&
                            b.serviceOrders.push({
                                id: e.id,
                                createdAtLabel: I(e.createdAt),
                                appointmentAtLabel: c,
                                professionalName: p,
                                itemsLabel: m,
                                totalLabel: P(l),
                                status: e.status,
                            }),
                        d &&
                            b.productOrders.push({
                                id: e.id,
                                createdAtLabel: I(e.createdAt),
                                itemsLabel: f,
                                items: h,
                                totalLabel: P(s),
                                status: e.status,
                            }));
                }
                let $ = Array.from(U.values()),
                    k = await R.prisma.order.findMany({
                        where: {
                            companyId: h,
                            ...q,
                            status: 'COMPLETED',
                            createdAt: { gte: x, lt: O },
                        },
                        orderBy: { createdAt: 'desc' },
                        select: {
                            id: !0,
                            status: !0,
                            createdAt: !0,
                            updatedAt: !0,
                            totalAmount: !0,
                            clientId: !0,
                            client: { select: { id: !0, name: !0 } },
                            professional: { select: { id: !0, name: !0 } },
                            appointment: { select: { scheduleAt: !0 } },
                            items: {
                                select: {
                                    id: !0,
                                    quantity: !0,
                                    unitPrice: !0,
                                    totalPrice: !0,
                                    serviceId: !0,
                                    productId: !0,
                                    service: { select: { id: !0, name: !0 } },
                                    product: { select: { id: !0, name: !0 } },
                                },
                            },
                        },
                    }),
                    F = new Map();
                for (let e of k) {
                    let t = e.clientId ?? `unknown:${e.id}`,
                        r = y(e.client?.name) || 'Cliente não identificado',
                        a = (e.items ?? []).filter((e) => !!e.serviceId),
                        n = (e.items ?? []).filter((e) => !!e.productId),
                        i = E(a.reduce((e, t) => e + E(t.totalPrice), 0)),
                        o = E(n.reduce((e, t) => e + E(t.totalPrice), 0)),
                        l = (e.items ?? []).map((e) => {
                            let t = e.quantity ?? 1,
                                r =
                                    e.service?.name ||
                                    e.product?.name ||
                                    (e.serviceId
                                        ? 'Serviço'
                                        : e.productId
                                          ? 'Produto'
                                          : 'Item'),
                                a = e.serviceId ? 'service' : 'product';
                            return {
                                id: e.id,
                                name: r,
                                qty: t,
                                unitLabel: P(e.unitPrice),
                                totalLabel: P(e.totalPrice),
                                kind: a,
                            };
                        }),
                        s = {
                            id: e.id,
                            createdAtLabel: I(e.createdAt),
                            appointmentAtLabel: e.appointment?.scheduleAt
                                ? I(e.appointment.scheduleAt)
                                : null,
                            professionalName: y(e.professional?.name) || '—',
                            status: 'COMPLETED',
                            totalLabel: P(e.totalAmount),
                            servicesSubtotalLabel: P(i),
                            productsSubtotalLabel: P(o),
                            items: l,
                        },
                        u = F.get(t);
                    if (!u) {
                        F.set(t, {
                            clientKey: t,
                            clientLabel: r,
                            latestLabel: I(e.createdAt),
                            totalLabel: P(e.totalAmount),
                            servicesLabel: P(i),
                            productsLabel: P(o),
                            orders: [s],
                        });
                        continue;
                    }
                    let d = E(
                            Number(
                                String(u.totalLabel)
                                    .replace(/[^\d,.-]/g, '')
                                    .replace('.', '')
                                    .replace(',', '.')
                            )
                        ),
                        c = E(
                            Number(
                                String(u.servicesLabel)
                                    .replace(/[^\d,.-]/g, '')
                                    .replace('.', '')
                                    .replace(',', '.')
                            )
                        ),
                        p = E(
                            Number(
                                String(u.productsLabel)
                                    .replace(/[^\d,.-]/g, '')
                                    .replace('.', '')
                                    .replace(',', '.')
                            )
                        );
                    ((u.totalLabel = P(d + E(e.totalAmount))),
                        (u.servicesLabel = P(c + i)),
                        (u.productsLabel = P(p + o)),
                        u.orders.push(s));
                }
                let _ = Array.from(F.values());
                return (function (e, t = 200) {
                    return A.NextResponse.json(
                        { ok: !0, data: e },
                        { status: t }
                    );
                })({
                    monthQuery: C,
                    monthLabel: T,
                    unitScope: M ? 'filtered' : 'all',
                    openAccounts: $,
                    openAccountsCount: $.length,
                    monthGroups: _,
                    monthOrdersCount: k.length,
                });
            } catch (e) {
                return w(e?.message ?? 'Erro interno.', 500);
            }
        }
        e.s(['GET', () => S], 536717);
        var L = e.i(536717);
        let C = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/checkout/route',
                    pathname: '/api/admin/checkout',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/checkout/route.ts',
                nextConfigOutput: 'standalone',
                userland: L,
            }),
            {
                workAsyncStorage: x,
                workUnitAsyncStorage: O,
                serverHooks: T,
            } = C;
        function M() {
            return (0, a.patchFetch)({
                workAsyncStorage: x,
                workUnitAsyncStorage: O,
            });
        }
        async function q(e, t, a) {
            C.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let A = '/api/admin/checkout/route';
            A = A.replace(/\/index$/, '') || '/';
            let R = await C.prepare(e, t, {
                srcPage: A,
                multiZoneDraftMode: !1,
            });
            if (!R)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: N,
                    params: w,
                    nextConfig: y,
                    parsedUrl: E,
                    isDraftMode: P,
                    prerenderManifest: I,
                    routerServerContext: S,
                    isOnDemandRevalidate: L,
                    revalidateOnlyGenerated: x,
                    resolvedPathname: O,
                    clientReferenceManifest: T,
                    serverActionsManifest: M,
                } = R,
                q = (0, s.normalizeAppPath)(A),
                D = !!(I.dynamicRoutes[q] || I.routes[O]),
                U = async () => (
                    (null == S ? void 0 : S.render404)
                        ? await S.render404(e, t, E, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (D && !P) {
                let e = !!I.routes[O],
                    t = I.dynamicRoutes[q];
                if (t && !1 === t.fallback && !e) {
                    if (y.experimental.adapterPath) return await U();
                    throw new b.NoFallbackError();
                }
            }
            let $ = null;
            !D || C.isDev || P || ($ = '/index' === ($ = O) ? '/' : $);
            let k = !0 === C.isDev || !D,
                F = D && !k;
            M &&
                T &&
                (0, o.setReferenceManifestsSingleton)({
                    page: A,
                    clientReferenceManifest: T,
                    serverActionsManifest: M,
                    serverModuleMap: (0, l.createServerModuleMap)({
                        serverActionsManifest: M,
                    }),
                });
            let _ = e.method || 'GET',
                H = (0, i.getTracer)(),
                j = H.getActiveScopeSpan(),
                B = {
                    params: w,
                    prerenderManifest: I,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!y.experimental.authInterrupts,
                        },
                        cacheComponents: !!y.cacheComponents,
                        supportsDynamicResponse: k,
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
                            C.onRequestError(e, t, a, S),
                    },
                    sharedContext: { buildId: N },
                },
                K = new u.NodeNextRequest(e),
                G = new u.NodeNextResponse(t),
                V = d.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        C.handle(V, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = H.getRootSpanAttributes();
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
                                let t = `${_} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${_} ${A}`);
                        }),
                    l = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    s = async (n) => {
                        var i, s;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!l && L && x && !r)
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
                                    let s = B.renderOpts.pendingWaitUntil;
                                    s &&
                                        a.waitUntil &&
                                        (a.waitUntil(s), (s = void 0));
                                    let u = B.renderOpts.collectedTags;
                                    if (!D)
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
                                            f.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (u && (t[g.NEXT_CACHE_TAGS_HEADER] = u),
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
                                                kind: v.CachedRouteKind
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
                                            (await C.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: A,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: F,
                                                        isOnDemandRevalidate: L,
                                                    }),
                                                },
                                                S
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await C.handleResponse({
                                req: e,
                                nextConfig: y,
                                cacheKey: $,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: I,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: L,
                                revalidateOnlyGenerated: x,
                                responseGenerator: u,
                                waitUntil: a.waitUntil,
                                isMinimalMode: l,
                            });
                        if (!D) return null;
                        if (
                            (null == d || null == (i = d.value)
                                ? void 0
                                : i.kind) !== v.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == d || null == (s = d.value) ? void 0 : s.kind}`
                                ),
                                '__NEXT_ERROR_CODE',
                                {
                                    value: 'E701',
                                    enumerable: !1,
                                    configurable: !0,
                                }
                            );
                        (l ||
                            t.setHeader(
                                'x-nextjs-cache',
                                L
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            P &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, f.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (l && D) || c.delete(g.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                K,
                                G,
                                new Response(d.value.body, {
                                    headers: c,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                j
                    ? await s(j)
                    : await H.withPropagatedContext(e.headers, () =>
                          H.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${_} ${A}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': _,
                                      'http.target': e.url,
                                  },
                              },
                              s
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof b.NoFallbackError ||
                        (await C.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: q,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: F,
                                isOnDemandRevalidate: L,
                            }),
                        })),
                    D)
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
                () => q,
                'patchFetch',
                () => M,
                'routeModule',
                () => C,
                'serverHooks',
                () => T,
                'workAsyncStorage',
                () => x,
                'workUnitAsyncStorage',
                () => O,
            ],
            549175
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_0c2f9c0e.js.map
