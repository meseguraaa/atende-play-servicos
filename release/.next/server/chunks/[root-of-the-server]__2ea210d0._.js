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
    666938,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            a = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            v = e.i(46094),
            f = e.i(622730),
            g = e.i(811178),
            h = e.i(193695);
        e.i(629399);
        var x = e.i(377404),
            R = e.i(738342),
            y = e.i(387148),
            w = e.i(774785),
            E = e.i(698043),
            C = e.i(212669);
        let A = ['BRONZE', 'PRATA', 'OURO', 'DIAMANTE'];
        function I(e, t) {
            return R.NextResponse.json({ ok: !0, data: e }, t);
        }
        function k(e, t = 400) {
            return R.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        async function N(e) {
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
        function O(e, t = 0) {
            let r = Number.parseInt(String(e ?? ''), 10);
            return !Number.isFinite(r) || Number.isNaN(r) ? t : Math.max(0, r);
        }
        function S(e, t) {
            if (e && 'function' == typeof e.get) return e.get(t);
        }
        async function U(e) {
            let t = await (0, C.requireAdminForModule)('CLIENT_LEVELS'),
                r = await N(t);
            if (!r)
                return {
                    ok: !1,
                    status: 400,
                    error: 'Contexto de empresa ausente (companyId).',
                };
            let n = await (0, y.cookies)(),
                a =
                    String(n.get('admin_unit_context')?.value ?? '').trim() ||
                    'all',
                i = !!t?.canSeeAllUnits,
                o = String(e.requestedUnitId ?? '').trim(),
                s = await E.prisma.unit.findMany({
                    where: { companyId: r },
                    orderBy: { name: 'asc' },
                    select: { id: !0, name: !0, isActive: !0 },
                });
            if (!i) {
                if ('all' === a) {
                    let e = s.find((e) => e.isActive)?.id ?? s[0]?.id;
                    return e
                        ? {
                              ok: !0,
                              companyId: r,
                              canSeeAllUnits: i,
                              unitCookie: a,
                              units: (s = s.filter((t) => t.id === e)),
                              activeUnitId: e,
                          }
                        : {
                              ok: !1,
                              status: 400,
                              error: 'Nenhuma unidade encontrada para o contexto atual.',
                          };
                }
                return s.some((e) => e.id === a)
                    ? ((s = s.filter((e) => e.id === a)),
                      {
                          ok: !0,
                          companyId: r,
                          canSeeAllUnits: i,
                          unitCookie: a,
                          units: s,
                          activeUnitId: a,
                      })
                    : {
                          ok: !1,
                          status: 400,
                          error: 'Unidade do contexto (cookie) inválida para esta empresa.',
                      };
            }
            let l =
                o && 'all' !== o && s.some((e) => e.id === o)
                    ? o
                    : a && 'all' !== a && s.some((e) => e.id === a)
                      ? a
                      : (s.find((e) => e.isActive)?.id ?? s[0]?.id ?? null);
            return l
                ? {
                      ok: !0,
                      companyId: r,
                      canSeeAllUnits: i,
                      unitCookie: a,
                      units: s,
                      activeUnitId: l,
                  }
                : {
                      ok: !1,
                      status: 400,
                      error: 'Nenhuma unidade encontrada para o contexto atual.',
                  };
        }
        async function T(e) {
            try {
                let { searchParams: t } = new URL(e.url),
                    r = t.get('unitId'),
                    n = await U({ requestedUnitId: r });
                if (!n.ok) return k(n.error, n.status);
                let a = await E.prisma.customerLevelConfig.findMany({
                        where: {
                            companyId: n.companyId,
                            unitId: n.activeUnitId,
                        },
                        orderBy: { level: 'asc' },
                        select: {
                            id: !0,
                            level: !0,
                            minAppointmentsDone: !0,
                            minOrdersCompleted: !0,
                        },
                    }),
                    i = {};
                for (let e of a)
                    i[String(e.level)] = {
                        minAppointmentsDone: e.minAppointmentsDone,
                        minOrdersCompleted: e.minOrdersCompleted,
                    };
                return I({
                    scope: {
                        companyId: n.companyId,
                        canSeeAllUnits: n.canSeeAllUnits,
                        unitCookie: n.unitCookie,
                    },
                    units: n.units,
                    activeUnitId: n.activeUnitId,
                    levels: A,
                    configByLevel: i,
                });
            } catch (e) {
                if ((0, w.isRedirectError)(e)) throw e;
                return k(
                    'string' == typeof e?.message
                        ? e.message
                        : 'Erro inesperado ao carregar configurações.',
                    500
                );
            }
        }
        async function _(e) {
            try {
                let t = await e.formData(),
                    r = String(S(t, 'unitId') ?? '').trim(),
                    n = await U({ requestedUnitId: r });
                if (!n.ok) return k(n.error, n.status);
                let a = n.activeUnitId,
                    i = A.map((e) => {
                        let r = O(S(t, `minAppointmentsDone_${e}`), 0),
                            n = O(S(t, `minOrdersCompleted_${e}`), 0);
                        return {
                            level: e,
                            minAppointmentsDone: r,
                            minOrdersCompleted: n,
                        };
                    });
                return (
                    await E.prisma.$transaction(
                        i.map((e) =>
                            E.prisma.customerLevelConfig.upsert({
                                where: {
                                    unitId_level: { unitId: a, level: e.level },
                                },
                                create: {
                                    companyId: n.companyId,
                                    unitId: a,
                                    level: e.level,
                                    minAppointmentsDone: e.minAppointmentsDone,
                                    minOrdersCompleted: e.minOrdersCompleted,
                                },
                                update: {
                                    minAppointmentsDone: e.minAppointmentsDone,
                                    minOrdersCompleted: e.minOrdersCompleted,
                                },
                                select: { id: !0 },
                            })
                        )
                    ),
                    I({ saved: !0, unitId: a })
                );
            } catch (e) {
                if ((0, w.isRedirectError)(e)) throw e;
                return k(
                    'string' == typeof e?.message
                        ? e.message
                        : 'Erro inesperado ao salvar configurações.',
                    500
                );
            }
        }
        e.s(
            ['GET', () => T, 'POST', () => _, 'dynamic', 0, 'force-dynamic'],
            224779
        );
        var b = e.i(224779);
        let P = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/client-levels/config/route',
                    pathname: '/api/admin/client-levels/config',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/client-levels/config/route.ts',
                nextConfigOutput: 'standalone',
                userland: b,
            }),
            {
                workAsyncStorage: D,
                workUnitAsyncStorage: q,
                serverHooks: M,
            } = P;
        function j() {
            return (0, n.patchFetch)({
                workAsyncStorage: D,
                workUnitAsyncStorage: q,
            });
        }
        async function H(e, t, n) {
            P.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let R = '/api/admin/client-levels/config/route';
            R = R.replace(/\/index$/, '') || '/';
            let y = await P.prepare(e, t, {
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
                    isDraftMode: I,
                    prerenderManifest: k,
                    routerServerContext: N,
                    isOnDemandRevalidate: O,
                    revalidateOnlyGenerated: S,
                    resolvedPathname: U,
                    clientReferenceManifest: T,
                    serverActionsManifest: _,
                } = y,
                b = (0, l.normalizeAppPath)(R),
                D = !!(k.dynamicRoutes[b] || k.routes[U]),
                q = async () => (
                    (null == N ? void 0 : N.render404)
                        ? await N.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (D && !I) {
                let e = !!k.routes[U],
                    t = k.dynamicRoutes[b];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await q();
                    throw new h.NoFallbackError();
                }
            }
            let M = null;
            !D || P.isDev || I || (M = '/index' === (M = U) ? '/' : M);
            let j = !0 === P.isDev || !D,
                H = D && !j;
            _ &&
                T &&
                (0, o.setReferenceManifestsSingleton)({
                    page: R,
                    clientReferenceManifest: T,
                    serverActionsManifest: _,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: _,
                    }),
                });
            let $ = e.method || 'GET',
                L = (0, i.getTracer)(),
                F = L.getActiveScopeSpan(),
                B = {
                    params: E,
                    prerenderManifest: k,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!C.experimental.authInterrupts,
                        },
                        cacheComponents: !!C.cacheComponents,
                        supportsDynamicResponse: j,
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
                    sharedContext: { buildId: w },
                },
                K = new d.NodeNextRequest(e),
                G = new d.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        P.handle(V, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = L.getRootSpanAttributes();
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
                                let t = `${$} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${$} ${R}`);
                        }),
                    s = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    l = async (a) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && O && S && !r)
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
                                    let i = await o(a);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        n.waitUntil &&
                                        (n.waitUntil(l), (l = void 0));
                                    let d = B.renderOpts.collectedTags;
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
                                                    routePath: R,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: H,
                                                        isOnDemandRevalidate: O,
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
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: k,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: O,
                                revalidateOnlyGenerated: S,
                                responseGenerator: d,
                                waitUntil: n.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!D) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== x.CachedRouteKind.APP_ROUTE
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
                            I &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, v.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (s && D) || c.delete(g.NEXT_CACHE_TAGS_HEADER),
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
                F
                    ? await l(F)
                    : await L.withPropagatedContext(e.headers, () =>
                          L.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${$} ${R}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': $,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof h.NoFallbackError ||
                        (await P.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: b,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: H,
                                isOnDemandRevalidate: O,
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
                () => H,
                'patchFetch',
                () => j,
                'routeModule',
                () => P,
                'serverHooks',
                () => M,
                'workAsyncStorage',
                () => D,
                'workUnitAsyncStorage',
                () => q,
            ],
            666938
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2ea210d0._.js.map
