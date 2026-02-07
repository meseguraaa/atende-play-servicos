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
    329687,
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
            h = e.i(902769),
            v = e.i(46094),
            f = e.i(622730),
            m = e.i(811178),
            x = e.i(193695);
        e.i(629399);
        var R = e.i(377404),
            g = e.i(738342),
            w = e.i(698043),
            E = e.i(212669);
        function A(e, t = 400) {
            return g.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function y(e) {
            return String(e ?? '').trim();
        }
        async function C(e) {
            try {
                let t = await (0, E.requireAdminForModule)('APPOINTMENTS'),
                    r = t.companyId;
                if (!r) return A('Empresa não encontrada na sessão.', 401);
                let n = t.id;
                if (!n) return A('Usuário não encontrado na sessão.', 401);
                let a = t.canSeeAllUnits,
                    i = await e.json().catch(() => null);
                if (!i) return A('Body inválido.');
                let s = y(i.clientId),
                    o = y(i.clientName),
                    l = y(i.phone),
                    d = y(i.unitId),
                    u = y(i.professionalId),
                    p = y(i.serviceId),
                    c = y(i.description),
                    h = y(i.scheduleAt);
                if (!s) return A('clientId é obrigatório.');
                if (!o) return A('clientName é obrigatório.');
                if (!l) return A('phone é obrigatório.');
                if (!d) return A('unitId é obrigatório.');
                if (!c) return A('description é obrigatório.');
                if (!h) return A('scheduleAt é obrigatório.');
                let v = new Date(h);
                if (Number.isNaN(v.getTime())) return A('scheduleAt inválido.');
                if (
                    !(await w.prisma.unit.findFirst({
                        where: { id: d, companyId: r, isActive: !0 },
                        select: { id: !0 },
                    }))
                )
                    return A('Unidade inválida ou inativa.', 404);
                if (
                    !a &&
                    !(await w.prisma.adminUnitAccess.findFirst({
                        where: { companyId: r, userId: n, unitId: d },
                        select: { id: !0 },
                    }))
                )
                    return A('Sem acesso a esta unidade.', 403);
                if (
                    !(await w.prisma.user.findFirst({
                        where: {
                            id: s,
                            isActive: !0,
                            companyMemberships: {
                                some: {
                                    companyId: r,
                                    isActive: !0,
                                    role: 'CLIENT',
                                },
                            },
                        },
                        select: { id: !0 },
                    }))
                )
                    return A('Cliente inválido ou inativo.', 404);
                let f = u || null,
                    m = p || null;
                if (
                    f &&
                    !(await w.prisma.professional.findFirst({
                        where: {
                            id: f,
                            companyId: r,
                            isActive: !0,
                            units: { some: { unitId: d, isActive: !0 } },
                        },
                        select: { id: !0 },
                    }))
                )
                    return A('Profissional inválido para esta unidade.', 400);
                if (
                    m &&
                    !(await w.prisma.service.findFirst({
                        where: {
                            id: m,
                            companyId: r,
                            isActive: !0,
                            OR: [{ unitId: d }, { unitId: null }],
                        },
                        select: { id: !0 },
                    }))
                )
                    return A('Serviço inválido para esta unidade.', 400);
                let x = await w.prisma.appointment.create({
                    data: {
                        companyId: r,
                        unitId: d,
                        clientId: s,
                        clientName: o,
                        phone: l,
                        description: c,
                        scheduleAt: v,
                        professionalId: f,
                        serviceId: m,
                    },
                    select: { id: !0 },
                });
                return g.NextResponse.json({ ok: !0, id: x.id });
            } catch (e) {
                return A(e?.message ?? 'Erro interno.', 500);
            }
        }
        e.s(['POST', () => C], 861116);
        var N = e.i(861116);
        let b = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/appointments/route',
                    pathname: '/api/admin/appointments',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/appointments/route.ts',
                nextConfigOutput: 'standalone',
                userland: N,
            }),
            {
                workAsyncStorage: T,
                workUnitAsyncStorage: P,
                serverHooks: S,
            } = b;
        function I() {
            return (0, n.patchFetch)({
                workAsyncStorage: T,
                workUnitAsyncStorage: P,
            });
        }
        async function O(e, t, n) {
            b.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let g = '/api/admin/appointments/route';
            g = g.replace(/\/index$/, '') || '/';
            let w = await b.prepare(e, t, {
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
                    params: A,
                    nextConfig: y,
                    parsedUrl: C,
                    isDraftMode: N,
                    prerenderManifest: T,
                    routerServerContext: P,
                    isOnDemandRevalidate: S,
                    revalidateOnlyGenerated: I,
                    resolvedPathname: O,
                    clientReferenceManifest: k,
                    serverActionsManifest: j,
                } = w,
                q = (0, l.normalizeAppPath)(g),
                U = !!(T.dynamicRoutes[q] || T.routes[O]),
                _ = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (U && !N) {
                let e = !!T.routes[O],
                    t = T.dynamicRoutes[q];
                if (t && !1 === t.fallback && !e) {
                    if (y.experimental.adapterPath) return await _();
                    throw new x.NoFallbackError();
                }
            }
            let M = null;
            !U || b.isDev || N || (M = '/index' === (M = O) ? '/' : M);
            let H = !0 === b.isDev || !U,
                D = U && !H;
            j &&
                k &&
                (0, s.setReferenceManifestsSingleton)({
                    page: g,
                    clientReferenceManifest: k,
                    serverActionsManifest: j,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, i.getTracer)(),
                K = $.getActiveScopeSpan(),
                B = {
                    params: A,
                    prerenderManifest: T,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!y.experimental.authInterrupts,
                        },
                        cacheComponents: !!y.cacheComponents,
                        supportsDynamicResponse: H,
                        incrementalCache: (0, a.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: y.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            b.onRequestError(e, t, n, P),
                    },
                    sharedContext: { buildId: E },
                },
                L = new d.NodeNextRequest(e),
                G = new d.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    L,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        b.handle(V, B).finally(() => {
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
                    l = async (a) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && S && I && !r)
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
                                    if (!U)
                                        return (
                                            await (0, h.sendResponse)(
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
                                            v.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (d && (t[m.NEXT_CACHE_TAGS_HEADER] = d),
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
                                                    m.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    m.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
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
                                                expire: n,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await b.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: g,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
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
                            u = await b.handleResponse({
                                req: e,
                                nextConfig: y,
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: T,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: S,
                                revalidateOnlyGenerated: I,
                                responseGenerator: d,
                                waitUntil: n.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!U) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== R.CachedRouteKind.APP_ROUTE
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
                        let p = (0, v.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && U) || p.delete(m.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, h.sendResponse)(
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
                    ? await l(K)
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
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof x.NoFallbackError ||
                        (await b.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: q,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: S,
                            }),
                        })),
                    U)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
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
                () => O,
                'patchFetch',
                () => I,
                'routeModule',
                () => b,
                'serverHooks',
                () => S,
                'workAsyncStorage',
                () => T,
                'workUnitAsyncStorage',
                () => P,
            ],
            329687
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00250e66._.js.map
