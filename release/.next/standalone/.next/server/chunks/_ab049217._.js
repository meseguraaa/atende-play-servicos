module.exports = [
    896407,
    (e) => {
        'use strict';
        var t = e.i(698043),
            n = e.i(52359);
        async function r() {
            let e = await (0, n.getCurrentPainelUser)();
            if (!e || 'PROFESSIONAL' !== e.role)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: '',
                    unitId: '',
                };
            let r = String(e.sub || '').trim(),
                a = String(e.companyId || '').trim();
            if (!r || !a)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: '',
                    unitId: '',
                };
            let i = await t.prisma.professional.findFirst({
                where: { userId: r, companyId: a, isActive: !0 },
                select: { id: !0, name: !0, email: !0 },
            });
            if (!i?.id)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: r,
                    unitId: '',
                };
            let o = await t.prisma.professionalUnit.findFirst({
                where: { companyId: a, professionalId: i.id, isActive: !0 },
                select: { unitId: !0 },
                orderBy: { updatedAt: 'desc' },
            });
            return {
                companyId: a,
                professionalId: i.id,
                userId: r,
                unitId: o?.unitId ?? '',
                name: i.name ?? null,
                email: i.email,
            };
        }
        e.s(['requireProfessionalSession', () => r]);
    },
    409009,
    (e) => {
        'use strict';
        var t = e.i(154154),
            n = e.i(140407),
            r = e.i(493068),
            a = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            f = e.i(902769),
            m = e.i(46094),
            h = e.i(622730),
            R = e.i(811178),
            v = e.i(193695);
        e.i(629399);
        var g = e.i(377404),
            w = e.i(738342),
            y = e.i(698043),
            E = e.i(896407);
        function I(e, t = 400) {
            return w.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function C(e) {
            return String(e ?? '').trim();
        }
        async function A(e) {
            try {
                let t,
                    n,
                    r,
                    a,
                    i = await (0, E.requireProfessionalSession)(),
                    o = C(i.companyId),
                    s = C(i.professionalId);
                if (!o || !s) return I('Sessão do profissional inválida.', 401);
                let l = new URL(e.url).searchParams.get('date'),
                    d =
                        (function (e) {
                            let t = C(e);
                            if (!t) return null;
                            let [n, r, a] = t.split('-').map(Number);
                            return n && r && a ? { y: n, m: r, d: a } : null;
                        })(l ?? void 0) ??
                        ((t = new Date()),
                        (n = new Intl.DateTimeFormat('pt-BR', {
                            timeZone: 'America/Sao_Paulo',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        }).formatToParts(t)),
                        (r = Number(
                            n.find((e) => 'day' === e.type)?.value ?? '1'
                        )),
                        (a = Number(
                            n.find((e) => 'month' === e.type)?.value ?? '1'
                        )),
                        {
                            y: Number(
                                n.find((e) => 'year' === e.type)?.value ??
                                    '1970'
                            ),
                            m: a,
                            d: r,
                        }),
                    { startUtc: u, endUtc: p } = (function (e) {
                        let { y: t, m: n, d: r } = e,
                            a = Date.UTC(t, n - 1, r, 3, 0, 0, 0),
                            i = Date.UTC(t, n - 1, r + 1, 3, 0, 0, 0);
                        return {
                            startUtc: new Date(a),
                            endUtc: new Date(i - 1),
                        };
                    })(d),
                    c = await y.prisma.appointment.findMany({
                        where: {
                            companyId: o,
                            professionalId: s,
                            scheduleAt: { gte: u, lte: p },
                        },
                        orderBy: { scheduleAt: 'asc' },
                        select: {
                            id: !0,
                            unitId: !0,
                            clientId: !0,
                            clientName: !0,
                            phone: !0,
                            description: !0,
                            scheduleAt: !0,
                            status: !0,
                            professionalId: !0,
                            serviceId: !0,
                        },
                    });
                return (function (e, t = 200) {
                    return w.NextResponse.json(
                        { ok: !0, data: e },
                        { status: t }
                    );
                })({
                    date: `${String(d.y).padStart(4, '0')}-${String(d.m).padStart(2, '0')}-${String(d.d).padStart(2, '0')}`,
                    appointments: c,
                });
            } catch (e) {
                return I(e?.message ?? 'Erro interno.', 500);
            }
        }
        e.s(['GET', () => A, 'dynamic', 0, 'force-dynamic'], 102396);
        var S = e.i(102396);
        let x = new t.AppRouteRouteModule({
                definition: {
                    kind: n.RouteKind.APP_ROUTE,
                    page: '/api/professional/appointments/route',
                    pathname: '/api/professional/appointments',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/professional/appointments/route.ts',
                nextConfigOutput: 'standalone',
                userland: S,
            }),
            {
                workAsyncStorage: N,
                workUnitAsyncStorage: P,
                serverHooks: T,
            } = x;
        function b() {
            return (0, r.patchFetch)({
                workAsyncStorage: N,
                workUnitAsyncStorage: P,
            });
        }
        async function O(e, t, r) {
            x.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let w = '/api/professional/appointments/route';
            w = w.replace(/\/index$/, '') || '/';
            let y = await x.prepare(e, t, {
                srcPage: w,
                multiZoneDraftMode: !1,
            });
            if (!y)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == r.waitUntil ||
                        r.waitUntil.call(r, Promise.resolve()),
                    null
                );
            let {
                    buildId: E,
                    params: I,
                    nextConfig: C,
                    parsedUrl: A,
                    isDraftMode: S,
                    prerenderManifest: N,
                    routerServerContext: P,
                    isOnDemandRevalidate: T,
                    revalidateOnlyGenerated: b,
                    resolvedPathname: O,
                    clientReferenceManifest: U,
                    serverActionsManifest: _,
                } = y,
                D = (0, l.normalizeAppPath)(w),
                H = !!(N.dynamicRoutes[D] || N.routes[O]),
                M = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (H && !S) {
                let e = !!N.routes[O],
                    t = N.dynamicRoutes[D];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await M();
                    throw new v.NoFallbackError();
                }
            }
            let q = null;
            !H || x.isDev || S || (q = '/index' === (q = O) ? '/' : q);
            let k = !0 === x.isDev || !H,
                F = H && !k;
            _ &&
                U &&
                (0, o.setReferenceManifestsSingleton)({
                    page: w,
                    clientReferenceManifest: U,
                    serverActionsManifest: _,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: _,
                    }),
                });
            let $ = e.method || 'GET',
                j = (0, i.getTracer)(),
                B = j.getActiveScopeSpan(),
                K = {
                    params: I,
                    prerenderManifest: N,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!C.experimental.authInterrupts,
                        },
                        cacheComponents: !!C.cacheComponents,
                        supportsDynamicResponse: k,
                        incrementalCache: (0, a.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: C.cacheLife,
                        waitUntil: r.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, n, r) =>
                            x.onRequestError(e, t, r, P),
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
                let o = async (e) =>
                        x.handle(V, K).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let n = j.getRootSpanAttributes();
                            if (!n) return;
                            if (
                                n.get('next.span_type') !==
                                p.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${n.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let r = n.get('next.route');
                            if (r) {
                                let t = `${$} ${r}`;
                                (e.setAttributes({
                                    'next.route': r,
                                    'http.route': r,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${$} ${w}`);
                        }),
                    s = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    l = async (a) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: n }) => {
                                try {
                                    if (!s && T && b && !n)
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
                                    e.fetchMetrics = K.renderOpts.fetchMetrics;
                                    let l = K.renderOpts.pendingWaitUntil;
                                    l &&
                                        r.waitUntil &&
                                        (r.waitUntil(l), (l = void 0));
                                    let d = K.renderOpts.collectedTags;
                                    if (!H)
                                        return (
                                            await (0, f.sendResponse)(
                                                L,
                                                G,
                                                i,
                                                K.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (d && (t[R.NEXT_CACHE_TAGS_HEADER] = d),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let n =
                                                void 0 !==
                                                    K.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    K.renderOpts
                                                        .collectedRevalidate >=
                                                    R.INFINITE_CACHE
                                                ) &&
                                                K.renderOpts
                                                    .collectedRevalidate,
                                            r =
                                                void 0 ===
                                                    K.renderOpts
                                                        .collectedExpire ||
                                                K.renderOpts.collectedExpire >=
                                                    R.INFINITE_CACHE
                                                    ? void 0
                                                    : K.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: g.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: i.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: n,
                                                expire: r,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == n ? void 0 : n.isStale) &&
                                            (await x.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: w,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: F,
                                                        isOnDemandRevalidate: T,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await x.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: q,
                                routeKind: n.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: N,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: T,
                                revalidateOnlyGenerated: b,
                                responseGenerator: d,
                                waitUntil: r.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!H) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== g.CachedRouteKind.APP_ROUTE
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
                                T
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            S &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, m.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (s && H) || p.delete(R.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, f.sendResponse)(
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
                B
                    ? await l(B)
                    : await j.withPropagatedContext(e.headers, () =>
                          j.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${$} ${w}`,
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
                    (t instanceof v.NoFallbackError ||
                        (await x.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: D,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: F,
                                isOnDemandRevalidate: T,
                            }),
                        })),
                    H)
                )
                    throw t;
                return (
                    await (0, f.sendResponse)(
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
                () => b,
                'routeModule',
                () => x,
                'serverHooks',
                () => T,
                'workAsyncStorage',
                () => N,
                'workUnitAsyncStorage',
                () => P,
            ],
            409009
        );
    },
];

//# sourceMappingURL=_ab049217._.js.map
