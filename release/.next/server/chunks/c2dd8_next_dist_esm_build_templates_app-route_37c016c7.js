module.exports = [
    201197,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            i = e.i(821498),
            a = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            d = e.i(337047),
            l = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            h = e.i(46094),
            f = e.i(622730),
            A = e.i(811178),
            w = e.i(193695);
        e.i(629399);
        var E = e.i(377404),
            C = e.i(738342),
            g = e.i(595504),
            v = e.i(698043),
            y = e.i(451305),
            R = e.i(809448),
            N = e.i(344760),
            x = e.i(646915);
        function T() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        function P(e, t) {
            let r = t.toLowerCase();
            for (let [t, n] of e.headers.entries())
                if (t.toLowerCase() === r) {
                    let e = String(n ?? '').trim();
                    return e.length ? e : null;
                }
            return null;
        }
        async function S(e) {
            let t = P(e, 'authorization') || '',
                r = t.toLowerCase().startsWith('bearer ')
                    ? t.slice(7).trim()
                    : '';
            if (!r) throw Error('missing_token');
            let { payload: n } = await (0, g.jwtVerify)(
                    r,
                    (function () {
                        let e = process.env.APP_JWT_SECRET;
                        if (!e)
                            throw Error('APP_JWT_SECRET não definido no .env');
                        return new TextEncoder().encode(e);
                    })()
                ),
                i = String(n?.sub || '').trim();
            if (!i) throw Error('invalid_token');
            let a =
                'string' == typeof n?.companyId
                    ? String(n.companyId).trim()
                    : '';
            if (!a) {
                let t = P(e, 'x-company-id');
                t && (a = t);
            }
            if (!a) throw Error('missing_company_id');
            if (
                !(await v.prisma.companyMember.findFirst({
                    where: { userId: i, companyId: a, isActive: !0 },
                    select: { id: !0, role: !0 },
                }))
            )
                throw Error('forbidden_company');
            return {
                sub: i,
                role: n.role,
                email: n.email,
                name: n.name ?? null,
                companyId: a,
            };
        }
        async function b(e) {
            let t = new Date();
            await v.prisma.order.updateMany({
                where: {
                    companyId: e.companyId,
                    clientId: e.clientId,
                    status: 'PENDING_CHECKIN',
                    reservedUntil: { not: null, lte: t },
                },
                data: { status: 'CANCELED', expiredAt: t },
            });
        }
        function _(e) {
            return (0, R.isToday)(e)
                ? `Hoje \xe0s ${(0, y.format)(e, 'HH:mm', { locale: x.ptBR })}`
                : (0, N.isYesterday)(e)
                  ? `Ontem \xe0s ${(0, y.format)(e, 'HH:mm', { locale: x.ptBR })}`
                  : (0, y.format)(e, 'dd/MM/yyyy • HH:mm', { locale: x.ptBR });
        }
        function O(e) {
            let t = new Date(e ?? Date.now());
            return Number.isFinite(t.getTime()) ? t : new Date();
        }
        function I(e) {
            let t = String(e?.status ?? '').toUpperCase();
            return O(
                'DONE' === t
                    ? (e?.doneAt ?? e?.checkedOutAt ?? e?.updatedAt)
                    : 'CANCELED' === t
                      ? (e?.cancelledAt ?? e?.updatedAt)
                      : (e?.updatedAt ?? e?.scheduleAt ?? e?.createdAt)
            );
        }
        function D(e) {
            for (let t of [e?.professional?.name]) {
                let e = String(t ?? '').trim();
                if (e) return e;
            }
            return 'Profissional';
        }
        function M(e) {
            for (let t of [e?.service?.name, e?.description]) {
                let e = String(t ?? '').trim();
                if (e) return e;
            }
            return 'Serviço';
        }
        async function $() {
            return new C.NextResponse(null, { status: 204, headers: T() });
        }
        async function H(e) {
            try {
                let t = await S(e);
                if (t.role && 'CLIENT' !== t.role)
                    return C.NextResponse.json(
                        { ok: !1, error: 'Sem permissão' },
                        { status: 403, headers: T() }
                    );
                let r = t.sub,
                    n = t.companyId;
                await b({ companyId: n, clientId: r });
                let [i, a, o, s] = await Promise.all([
                        v.prisma.appointment.findMany({
                            where: {
                                companyId: n,
                                clientId: r,
                                status: 'DONE',
                            },
                            orderBy: { scheduleAt: 'desc' },
                            take: 10,
                            select: {
                                id: !0,
                                status: !0,
                                scheduleAt: !0,
                                createdAt: !0,
                                updatedAt: !0,
                                doneAt: !0,
                                checkedOutAt: !0,
                                description: !0,
                                professional: { select: { name: !0 } },
                                service: { select: { name: !0 } },
                            },
                        }),
                        v.prisma.appointment.findMany({
                            where: {
                                companyId: n,
                                clientId: r,
                                status: 'CANCELED',
                            },
                            orderBy: { scheduleAt: 'desc' },
                            take: 10,
                            select: {
                                id: !0,
                                status: !0,
                                scheduleAt: !0,
                                createdAt: !0,
                                updatedAt: !0,
                                cancelledAt: !0,
                                description: !0,
                                professional: { select: { name: !0 } },
                                service: { select: { name: !0 } },
                            },
                        }),
                        v.prisma.order.findMany({
                            where: { companyId: n, clientId: r },
                            orderBy: { createdAt: 'desc' },
                            take: 20,
                            select: {
                                id: !0,
                                status: !0,
                                createdAt: !0,
                                updatedAt: !0,
                                items: {
                                    select: {
                                        quantity: !0,
                                        productId: !0,
                                        product: {
                                            select: { id: !0, name: !0 },
                                        },
                                    },
                                },
                            },
                        }),
                        v.prisma.appointment.findMany({
                            where: {
                                companyId: n,
                                clientId: r,
                                status: 'DONE',
                                review: { isNot: null },
                            },
                            orderBy: { updatedAt: 'desc' },
                            take: 10,
                            select: {
                                id: !0,
                                status: !0,
                                createdAt: !0,
                                updatedAt: !0,
                                description: !0,
                                professional: { select: { name: !0 } },
                                service: { select: { name: !0 } },
                                review: {
                                    select: {
                                        rating: !0,
                                        createdAt: !0,
                                        updatedAt: !0,
                                    },
                                },
                            },
                        }),
                    ]),
                    d = o
                        .filter((e) =>
                            (e.items ?? []).some(
                                (e) =>
                                    e?.productId != null ||
                                    e?.product?.id != null
                            )
                        )
                        .filter((e) => {
                            let t = String(e?.status ?? '').toUpperCase();
                            return 'PENDING_CHECKIN' !== t;
                        }),
                    l = [];
                for (let e of i) {
                    let t = I(e),
                        r = D(e),
                        n = M(e);
                    l.push({
                        occurredAt: t,
                        item: {
                            id: `done:${e.id}`,
                            title: n,
                            description: `Conclu\xeddo • ${r}`,
                            date: _(t),
                            icon: 'scissors',
                        },
                    });
                }
                for (let e of a) {
                    let t = I(e),
                        r = D(e),
                        n = M(e);
                    l.push({
                        occurredAt: t,
                        item: {
                            id: `cancel:${e.id}`,
                            title: n,
                            description: `Cancelado • ${r}`,
                            date: _(t),
                            icon: 'calendar',
                        },
                    });
                }
                for (let e of d) {
                    let t = (function (e) {
                            let t = String(e?.status ?? '').toUpperCase();
                            return O(
                                'COMPLETED' === t || 'CANCELED' === t
                                    ? (e?.updatedAt ?? e?.createdAt)
                                    : e?.createdAt
                            );
                        })(e),
                        r = (e.items ?? [])
                            .filter(
                                (e) =>
                                    e?.productId != null ||
                                    e?.product?.id != null
                            )
                            .map(
                                (e) =>
                                    `${Number(e.quantity ?? 1)}x ${e.product?.name ?? 'Produto'}`
                            )
                            .join(', '),
                        n = String(e.status ?? '').toUpperCase(),
                        i =
                            'COMPLETED' === n
                                ? 'Retirado'
                                : 'CANCELED' === n
                                  ? 'Cancelado'
                                  : 'Pedido';
                    l.push({
                        occurredAt: t,
                        item: {
                            id: `order:${e.id}`,
                            title: `Pedido #${String(e.id).slice(0, 8)}`,
                            description: r
                                ? `${i} • ${r}`
                                : `${i} • Compra de produto`,
                            date: _(t),
                            icon: 'shopping-bag',
                        },
                    });
                }
                for (let e of s) {
                    let t = e?.review?.createdAt ?? e?.review?.updatedAt,
                        r = O(t ?? e.updatedAt ?? e.createdAt),
                        n = D(e),
                        i = M(e),
                        a = e?.review?.rating
                            ? (function (e) {
                                  let t = Number(e ?? 0);
                                  if (!Number.isFinite(t) || t <= 0) return '';
                                  let r = Math.max(
                                      1,
                                      Math.min(5, Math.round(t))
                                  );
                                  return '★'.repeat(r);
                              })(e.review.rating)
                            : '';
                    l.push({
                        occurredAt: r,
                        item: {
                            id: `review:${e.id}`,
                            title: 'Avaliação enviada',
                            description: a
                                ? `${n} • ${i} • ${a}`
                                : `${n} • ${i}`,
                            date: _(r),
                            icon: 'star',
                        },
                    });
                }
                l.sort(
                    (e, t) => t.occurredAt.getTime() - e.occurredAt.getTime()
                );
                let u = l.slice(0, 5).map((e) => e.item),
                    c = {
                        companyId: n,
                        doneCount: i.length,
                        canceledCount: a.length,
                        ordersTotal: o.length,
                        productOrdersCount: d.length,
                        reviewsDoneCount: s.length,
                        normalizedCount: l.length,
                        topTypes: u.map((e) => String(e.id).split(':')[0]),
                    };
                return C.NextResponse.json(
                    { ok: !0, items: u, _debug: c },
                    { status: 200, headers: T() }
                );
            } catch (r) {
                let e = String(r?.message || 'Erro inesperado')
                        .trim()
                        .toLowerCase(),
                    t =
                        e.includes('missing_token') ||
                        e.includes('invalid_token') ||
                        e.includes('missing_company_id') ||
                        e.includes('forbidden_company') ||
                        e.includes('jwt') ||
                        e.includes('signature');
                return C.NextResponse.json(
                    {
                        ok: !1,
                        error: t
                            ? 'Não autorizado'
                            : 'Erro ao carregar histórico',
                        _debug: void 0,
                    },
                    { status: t ? 401 : 500, headers: T() }
                );
            }
        }
        e.s(
            [
                'GET',
                () => H,
                'OPTIONS',
                () => $,
                'dynamic',
                0,
                'force-dynamic',
                'runtime',
                0,
                'nodejs',
            ],
            857471
        );
        var k = e.i(857471);
        let U = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/me/history/preview/route',
                    pathname: '/api/mobile/me/history/preview',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/me/history/preview/route.ts',
                nextConfigOutput: 'standalone',
                userland: k,
            }),
            {
                workAsyncStorage: L,
                workUnitAsyncStorage: q,
                serverHooks: j,
            } = U;
        function B() {
            return (0, n.patchFetch)({
                workAsyncStorage: L,
                workUnitAsyncStorage: q,
            });
        }
        async function F(e, t, n) {
            U.isDev &&
                (0, i.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let C = '/api/mobile/me/history/preview/route';
            C = C.replace(/\/index$/, '') || '/';
            let g = await U.prepare(e, t, {
                srcPage: C,
                multiZoneDraftMode: !1,
            });
            if (!g)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == n.waitUntil ||
                        n.waitUntil.call(n, Promise.resolve()),
                    null
                );
            let {
                    buildId: v,
                    params: y,
                    nextConfig: R,
                    parsedUrl: N,
                    isDraftMode: x,
                    prerenderManifest: T,
                    routerServerContext: P,
                    isOnDemandRevalidate: S,
                    revalidateOnlyGenerated: b,
                    resolvedPathname: _,
                    clientReferenceManifest: O,
                    serverActionsManifest: I,
                } = g,
                D = (0, d.normalizeAppPath)(C),
                M = !!(T.dynamicRoutes[D] || T.routes[_]),
                $ = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, N, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (M && !x) {
                let e = !!T.routes[_],
                    t = T.dynamicRoutes[D];
                if (t && !1 === t.fallback && !e) {
                    if (R.experimental.adapterPath) return await $();
                    throw new w.NoFallbackError();
                }
            }
            let H = null;
            !M || U.isDev || x || (H = '/index' === (H = _) ? '/' : H);
            let k = !0 === U.isDev || !M,
                L = M && !k;
            I &&
                O &&
                (0, o.setReferenceManifestsSingleton)({
                    page: C,
                    clientReferenceManifest: O,
                    serverActionsManifest: I,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: I,
                    }),
                });
            let q = e.method || 'GET',
                j = (0, a.getTracer)(),
                B = j.getActiveScopeSpan(),
                F = {
                    params: y,
                    prerenderManifest: T,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!R.experimental.authInterrupts,
                        },
                        cacheComponents: !!R.cacheComponents,
                        supportsDynamicResponse: k,
                        incrementalCache: (0, i.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: R.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            U.onRequestError(e, t, n, P),
                    },
                    sharedContext: { buildId: v },
                },
                K = new l.NodeNextRequest(e),
                G = new l.NodeNextResponse(t),
                z = u.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        U.handle(z, F).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = j.getRootSpanAttributes();
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
                                let t = `${q} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${q} ${C}`);
                        }),
                    s = !!(0, i.getRequestMeta)(e, 'minimalMode'),
                    d = async (i) => {
                        var a, d;
                        let l = async ({ previousCacheEntry: r }) => {
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
                                    let a = await o(i);
                                    e.fetchMetrics = F.renderOpts.fetchMetrics;
                                    let d = F.renderOpts.pendingWaitUntil;
                                    d &&
                                        n.waitUntil &&
                                        (n.waitUntil(d), (d = void 0));
                                    let l = F.renderOpts.collectedTags;
                                    if (!M)
                                        return (
                                            await (0, m.sendResponse)(
                                                K,
                                                G,
                                                a,
                                                F.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await a.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                a.headers
                                            );
                                        (l && (t[A.NEXT_CACHE_TAGS_HEADER] = l),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    F.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    F.renderOpts
                                                        .collectedRevalidate >=
                                                    A.INFINITE_CACHE
                                                ) &&
                                                F.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    F.renderOpts
                                                        .collectedExpire ||
                                                F.renderOpts.collectedExpire >=
                                                    A.INFINITE_CACHE
                                                    ? void 0
                                                    : F.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: E.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: a.status,
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
                                            (await U.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: C,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: L,
                                                        isOnDemandRevalidate: S,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await U.handleResponse({
                                req: e,
                                nextConfig: R,
                                cacheKey: H,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: T,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: S,
                                revalidateOnlyGenerated: b,
                                responseGenerator: l,
                                waitUntil: n.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!M) return null;
                        if (
                            (null == u || null == (a = u.value)
                                ? void 0
                                : a.kind) !== E.CachedRouteKind.APP_ROUTE
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
                                S
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            x &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (s && M) || c.delete(A.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                K,
                                G,
                                new Response(u.value.body, {
                                    headers: c,
                                    status: u.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                B
                    ? await d(B)
                    : await j.withPropagatedContext(e.headers, () =>
                          j.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${q} ${C}`,
                                  kind: a.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': q,
                                      'http.target': e.url,
                                  },
                              },
                              d
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof w.NoFallbackError ||
                        (await U.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: D,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: L,
                                isOnDemandRevalidate: S,
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
                () => F,
                'patchFetch',
                () => B,
                'routeModule',
                () => U,
                'serverHooks',
                () => j,
                'workAsyncStorage',
                () => L,
                'workUnitAsyncStorage',
                () => q,
            ],
            201197
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_37c016c7.js.map
