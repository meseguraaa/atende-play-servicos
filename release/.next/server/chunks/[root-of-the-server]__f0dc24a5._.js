module.exports = [
    918622,
    (e, t, n) => {
        t.exports = e.x(
            'next/dist/compiled/next-server/app-page-turbo.runtime.prod.js',
            () =>
                require('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js')
        );
    },
    556704,
    (e, t, n) => {
        t.exports = e.x(
            'next/dist/server/app-render/work-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/work-async-storage.external.js')
        );
    },
    832319,
    (e, t, n) => {
        t.exports = e.x(
            'next/dist/server/app-render/work-unit-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/work-unit-async-storage.external.js')
        );
    },
    324725,
    (e, t, n) => {
        t.exports = e.x(
            'next/dist/server/app-render/after-task-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/after-task-async-storage.external.js')
        );
    },
    120635,
    (e, t, n) => {
        t.exports = e.x(
            'next/dist/server/app-render/action-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/action-async-storage.external.js')
        );
    },
    254799,
    (e, t, n) => {
        t.exports = e.x('crypto', () => require('crypto'));
    },
    84793,
    (e) => {
        'use strict';
        var t = e.i(154154),
            n = e.i(140407),
            s = e.i(493068),
            a = e.i(821498),
            r = e.i(161599),
            c = e.i(182716),
            i = e.i(857635),
            o = e.i(337047),
            l = e.i(528171),
            d = e.i(367300),
            u = e.i(102610),
            p = e.i(670893),
            A = e.i(902769),
            m = e.i(46094),
            h = e.i(622730),
            v = e.i(811178),
            w = e.i(193695);
        e.i(629399);
        var R = e.i(377404),
            f = e.i(738342),
            g = e.i(698043),
            x = e.i(212669),
            y = e.i(254799);
        function C(e, t) {
            return f.NextResponse.json({ ok: !0, data: e }, t);
        }
        function S(e, t = 400) {
            return f.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function E(e) {
            return {
                canAccessDashboard: !!(e?.canAccessDashboard ?? !0),
                canAccessReports: !!e?.canAccessReports,
                canAccessCheckout: !!e?.canAccessCheckout,
                canAccessAppointments: !!(e?.canAccessAppointments ?? !0),
                canAccessProfessionals: !!e?.canAccessProfessionals,
                canAccessServices: !!e?.canAccessServices,
                canAccessReviews: !!e?.canAccessReviews,
                canAccessProducts: !!e?.canAccessProducts,
                canAccessPartners: !!e?.canAccessPartners,
                canAccessClients: !!(e?.canAccessClients ?? !0),
                canAccessClientLevels: !!e?.canAccessClientLevels,
                canAccessFinance: !!e?.canAccessFinance,
                canAccessSettings: !!e?.canAccessSettings,
            };
        }
        async function I() {
            let e = await (0, x.requireAdminForModuleApi)('SETTINGS');
            if (e instanceof f.NextResponse) return e;
            try {
                let t = await g.prisma.companyMember.findMany({
                        where: {
                            companyId: e.companyId,
                            isActive: !0,
                            role: { in: ['ADMIN', 'OWNER'] },
                        },
                        select: {
                            user: {
                                select: {
                                    id: !0,
                                    name: !0,
                                    email: !0,
                                    phone: !0,
                                    isOwner: !0,
                                    isActive: !0,
                                    createdAt: !0,
                                },
                            },
                            userId: !0,
                        },
                        orderBy: [{ createdAt: 'asc' }],
                    }),
                    n = t.map((e) => e.userId).filter(Boolean),
                    s = (
                        n.length
                            ? await g.prisma.adminAccess.findMany({
                                  where: {
                                      companyId: e.companyId,
                                      userId: { in: n },
                                  },
                                  select: {
                                      userId: !0,
                                      canAccessDashboard: !0,
                                      canAccessReports: !0,
                                      canAccessCheckout: !0,
                                      canAccessAppointments: !0,
                                      canAccessProfessionals: !0,
                                      canAccessServices: !0,
                                      canAccessReviews: !0,
                                      canAccessProducts: !0,
                                      canAccessPartners: !0,
                                      canAccessClients: !0,
                                      canAccessClientLevels: !0,
                                      canAccessFinance: !0,
                                      canAccessSettings: !0,
                                  },
                              })
                            : []
                    ).reduce(
                        (e, t) => (
                            (e[t.userId] = {
                                canAccessDashboard: !!t.canAccessDashboard,
                                canAccessReports: !!t.canAccessReports,
                                canAccessCheckout: !!t.canAccessCheckout,
                                canAccessAppointments:
                                    !!t.canAccessAppointments,
                                canAccessProfessionals:
                                    !!t.canAccessProfessionals,
                                canAccessServices: !!t.canAccessServices,
                                canAccessReviews: !!t.canAccessReviews,
                                canAccessProducts: !!t.canAccessProducts,
                                canAccessPartners: !!t.canAccessPartners,
                                canAccessClients: !!t.canAccessClients,
                                canAccessClientLevels:
                                    !!t.canAccessClientLevels,
                                canAccessFinance: !!t.canAccessFinance,
                                canAccessSettings: !!t.canAccessSettings,
                            }),
                            e
                        ),
                        {}
                    ),
                    a = t
                        .map((e) => {
                            let t = e.user,
                                n =
                                    s[t.id] ??
                                    E(
                                        t.isOwner
                                            ? {
                                                  canAccessDashboard: !0,
                                                  canAccessReports: !0,
                                                  canAccessCheckout: !0,
                                                  canAccessAppointments: !0,
                                                  canAccessProfessionals: !0,
                                                  canAccessServices: !0,
                                                  canAccessReviews: !0,
                                                  canAccessProducts: !0,
                                                  canAccessPartners: !0,
                                                  canAccessClients: !0,
                                                  canAccessClientLevels: !0,
                                                  canAccessFinance: !0,
                                                  canAccessSettings: !0,
                                              }
                                            : void 0
                                    );
                            return {
                                id: t.id,
                                name: t.name ?? null,
                                email: t.email,
                                phone: t.phone ?? null,
                                createdAt: t.createdAt.toISOString(),
                                isOwner: !!t.isOwner,
                                isActive: !!t.isActive,
                                permissions: n,
                            };
                        })
                        .sort((e, t) =>
                            e.isOwner !== t.isOwner
                                ? e.isOwner
                                    ? -1
                                    : 1
                                : new Date(t.createdAt).getTime() -
                                  new Date(e.createdAt).getTime()
                        );
                return C(a);
            } catch (e) {
                return S('internal_error', 500);
            }
        }
        async function P(e) {
            let t = await (0, x.requireAdminForModuleApi)('SETTINGS');
            if (t instanceof f.NextResponse) return t;
            if (!t.isOwner) return S('forbidden_owner_only', 403);
            let n = null;
            try {
                n = await e.json();
            } catch {
                return S('invalid_json', 400);
            }
            let s = String(n?.name || '').trim(),
                a = String(n?.email || '')
                    .trim()
                    .toLowerCase(),
                r = String(n?.phone ?? '').trim(),
                c = String(n?.password || '');
            if (!s) return S('admin_name_required', 400);
            if (!a) return S('admin_email_required', 400);
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a))
                return S('admin_email_invalid', 400);
            let i = (r || '').replace(/\D/g, ''),
                o = r || null;
            if (o && i.length > 0 && i.length < 10)
                return S('admin_phone_invalid', 400);
            if (!c || c.length < 6) return S('admin_password_invalid', 400);
            let l = E(n?.permissions),
                d = await g.prisma.unit.findMany({
                    where: { companyId: t.companyId, isActive: !0 },
                    select: { id: !0 },
                });
            if (!d.length) return S('missing_unit', 400);
            let u = await g.prisma.user.findUnique({
                where: { email: a },
                select: { id: !0 },
            });
            if (u?.id) return S('email_in_use', 409);
            try {
                let e = await g.prisma.$transaction(async (e) => {
                    let n,
                        r,
                        u =
                            ((n = y.default.randomBytes(16)),
                            (r = y.default.scryptSync(c, n, 64)),
                            `scrypt:${n.toString('base64')}:${r.toString('base64')}`),
                        p = await e.user.create({
                            data: {
                                name: s,
                                email: a,
                                phone: i ? o : null,
                                passwordHash: u,
                                role: 'ADMIN',
                                isOwner: !1,
                                isActive: !0,
                            },
                            select: {
                                id: !0,
                                name: !0,
                                email: !0,
                                phone: !0,
                                createdAt: !0,
                            },
                        });
                    return (
                        await e.companyMember.create({
                            data: {
                                companyId: t.companyId,
                                userId: p.id,
                                role: 'ADMIN',
                                isActive: !0,
                                lastUnitId: null,
                            },
                            select: { id: !0 },
                        }),
                        await e.adminAccess.create({
                            data: {
                                companyId: t.companyId,
                                userId: p.id,
                                unitId: null,
                                ...l,
                            },
                            select: { id: !0 },
                        }),
                        await e.adminUnitAccess.createMany({
                            data: d.map((e) => ({
                                companyId: t.companyId,
                                userId: p.id,
                                unitId: e.id,
                            })),
                            skipDuplicates: !0,
                        }),
                        {
                            id: p.id,
                            name: p.name ?? null,
                            email: p.email,
                            phone: p.phone ?? null,
                            createdAt: p.createdAt.toISOString(),
                            isOwner: !1,
                            isActive: !0,
                            permissions: l,
                        }
                    );
                });
                return C(e, { status: 201 });
            } catch (e) {
                return S('internal_error', 500);
            }
        }
        e.s(['GET', () => I, 'POST', () => P], 29086);
        var _ = e.i(29086);
        let O = new t.AppRouteRouteModule({
                definition: {
                    kind: n.RouteKind.APP_ROUTE,
                    page: '/api/admin/settings/admins/route',
                    pathname: '/api/admin/settings/admins',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/settings/admins/route.ts',
                nextConfigOutput: 'standalone',
                userland: _,
            }),
            {
                workAsyncStorage: b,
                workUnitAsyncStorage: N,
                serverHooks: T,
            } = O;
        function k() {
            return (0, s.patchFetch)({
                workAsyncStorage: b,
                workUnitAsyncStorage: N,
            });
        }
        async function M(e, t, s) {
            O.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let f = '/api/admin/settings/admins/route';
            f = f.replace(/\/index$/, '') || '/';
            let g = await O.prepare(e, t, {
                srcPage: f,
                multiZoneDraftMode: !1,
            });
            if (!g)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == s.waitUntil ||
                        s.waitUntil.call(s, Promise.resolve()),
                    null
                );
            let {
                    buildId: x,
                    params: y,
                    nextConfig: C,
                    parsedUrl: S,
                    isDraftMode: E,
                    prerenderManifest: I,
                    routerServerContext: P,
                    isOnDemandRevalidate: _,
                    revalidateOnlyGenerated: b,
                    resolvedPathname: N,
                    clientReferenceManifest: T,
                    serverActionsManifest: k,
                } = g,
                M = (0, o.normalizeAppPath)(f),
                D = !!(I.dynamicRoutes[M] || I.routes[N]),
                q = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, S, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (D && !E) {
                let e = !!I.routes[N],
                    t = I.dynamicRoutes[M];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await q();
                    throw new w.NoFallbackError();
                }
            }
            let j = null;
            !D || O.isDev || E || (j = '/index' === (j = N) ? '/' : j);
            let U = !0 === O.isDev || !D,
                H = D && !U;
            k &&
                T &&
                (0, c.setReferenceManifestsSingleton)({
                    page: f,
                    clientReferenceManifest: T,
                    serverActionsManifest: k,
                    serverModuleMap: (0, i.createServerModuleMap)({
                        serverActionsManifest: k,
                    }),
                });
            let F = e.method || 'GET',
                $ = (0, r.getTracer)(),
                L = $.getActiveScopeSpan(),
                B = {
                    params: y,
                    prerenderManifest: I,
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
                        waitUntil: s.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, n, s) =>
                            O.onRequestError(e, t, s, P),
                    },
                    sharedContext: { buildId: x },
                },
                K = new l.NodeNextRequest(e),
                G = new l.NodeNextResponse(t),
                V = d.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let c = async (e) =>
                        O.handle(V, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let n = $.getRootSpanAttributes();
                            if (!n) return;
                            if (
                                n.get('next.span_type') !==
                                u.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${n.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let s = n.get('next.route');
                            if (s) {
                                let t = `${F} ${s}`;
                                (e.setAttributes({
                                    'next.route': s,
                                    'http.route': s,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${F} ${f}`);
                        }),
                    i = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    o = async (a) => {
                        var r, o;
                        let l = async ({ previousCacheEntry: n }) => {
                                try {
                                    if (!i && _ && b && !n)
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
                                    let r = await c(a);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let o = B.renderOpts.pendingWaitUntil;
                                    o &&
                                        s.waitUntil &&
                                        (s.waitUntil(o), (o = void 0));
                                    let l = B.renderOpts.collectedTags;
                                    if (!D)
                                        return (
                                            await (0, A.sendResponse)(
                                                K,
                                                G,
                                                r,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await r.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                r.headers
                                            );
                                        (l && (t[v.NEXT_CACHE_TAGS_HEADER] = l),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let n =
                                                void 0 !==
                                                    B.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    B.renderOpts
                                                        .collectedRevalidate >=
                                                    v.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            s =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    v.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: R.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: r.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: n,
                                                expire: s,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == n ? void 0 : n.isStale) &&
                                            (await O.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: f,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: H,
                                                        isOnDemandRevalidate: _,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await O.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: j,
                                routeKind: n.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: I,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: _,
                                revalidateOnlyGenerated: b,
                                responseGenerator: l,
                                waitUntil: s.waitUntil,
                                isMinimalMode: i,
                            });
                        if (!D) return null;
                        if (
                            (null == d || null == (r = d.value)
                                ? void 0
                                : r.kind) !== R.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == d || null == (o = d.value) ? void 0 : o.kind}`
                                ),
                                '__NEXT_ERROR_CODE',
                                {
                                    value: 'E701',
                                    enumerable: !1,
                                    configurable: !0,
                                }
                            );
                        (i ||
                            t.setHeader(
                                'x-nextjs-cache',
                                _
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            E &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let u = (0, m.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (i && D) || u.delete(v.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                u.get('Cache-Control') ||
                                u.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, A.sendResponse)(
                                K,
                                G,
                                new Response(d.value.body, {
                                    headers: u,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                L
                    ? await o(L)
                    : await $.withPropagatedContext(e.headers, () =>
                          $.trace(
                              u.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${F} ${f}`,
                                  kind: r.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': F,
                                      'http.target': e.url,
                                  },
                              },
                              o
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof w.NoFallbackError ||
                        (await O.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: M,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: H,
                                isOnDemandRevalidate: _,
                            }),
                        })),
                    D)
                )
                    throw t;
                return (
                    await (0, A.sendResponse)(
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
                () => M,
                'patchFetch',
                () => k,
                'routeModule',
                () => O,
                'serverHooks',
                () => T,
                'workAsyncStorage',
                () => b,
                'workUnitAsyncStorage',
                () => N,
            ],
            84793
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f0dc24a5._.js.map
