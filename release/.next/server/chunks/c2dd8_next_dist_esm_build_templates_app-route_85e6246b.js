module.exports = [
    467370,
    (e) => {
        'use strict';
        var t = e.i(154154),
            i = e.i(140407),
            a = e.i(493068),
            r = e.i(821498),
            n = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            f = e.i(46094),
            h = e.i(622730),
            v = e.i(811178),
            y = e.i(193695);
        e.i(629399);
        var w = e.i(377404),
            R = e.i(738342),
            T = e.i(698043),
            g = e.i(212669),
            E = e.i(29173);
        function A(e, t = 200) {
            return R.NextResponse.json({ ok: !0, data: e }, { status: t });
        }
        function N(e, t = 400) {
            return R.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function b(e) {
            return String(e ?? '').trim();
        }
        function C(e) {
            return /^\d{2}:\d{2}$/.test(e);
        }
        function M(e) {
            let [t, i] = e.split(':').map(Number);
            return 60 * t + i;
        }
        async function x(e) {
            try {
                let t = await (0, g.requireAdminForModule)('APPOINTMENTS'),
                    i = b(t.companyId);
                if (!i) return N('Empresa não encontrada na sessão.', 401);
                let a = b(t.id);
                if (!a) return N('Usuário não encontrado na sessão.', 401);
                let r = !!t.canSeeAllUnits,
                    { searchParams: n } = new URL(e.url),
                    s = b(n.get('unitId')),
                    o = b(n.get('professionalId')),
                    l = b(n.get('date')),
                    d = b(n.get('serviceId')),
                    u = b(n.get('appointmentId'));
                if (!s) return N('unitId é obrigatório.', 400);
                if (!o) return N('professionalId é obrigatório.', 400);
                if (!l) return N('date é obrigatório (yyyy-MM-dd).', 400);
                let c = (function (e) {
                    if (!e) return null;
                    let [t, i, a] = e.split('-').map(Number);
                    return t && i && a ? { y: t, m: i, d: a } : null;
                })(l);
                if (!c) return N('date inválido. Use yyyy-MM-dd.', 400);
                if (
                    !(await T.prisma.unit.findFirst({
                        where: { id: s, companyId: i, isActive: !0 },
                        select: { id: !0 },
                    }))
                )
                    return N('Unidade inválida ou inativa.', 404);
                if (
                    !r &&
                    !(await T.prisma.adminUnitAccess.findFirst({
                        where: { companyId: i, userId: a, unitId: s },
                        select: { id: !0 },
                    }))
                )
                    return N('Sem acesso a esta unidade.', 403);
                if (
                    u &&
                    !(await T.prisma.appointment.findFirst({
                        where: { id: u, companyId: i },
                        select: { id: !0 },
                    }))
                )
                    return N('Agendamento inválido para edição.', 404);
                if (
                    !(await T.prisma.professional.findFirst({
                        where: {
                            id: o,
                            companyId: i,
                            isActive: !0,
                            units: { some: { unitId: s, isActive: !0 } },
                        },
                        select: { id: !0 },
                    }))
                )
                    return N('Profissional inválido para esta unidade.', 404);
                let p = 30;
                if (d) {
                    let e = await T.prisma.service.findFirst({
                        where: {
                            id: d,
                            companyId: i,
                            isActive: !0,
                            OR: [{ unitId: s }, { unitId: null }],
                        },
                        select: { id: !0, durationMinutes: !0 },
                    });
                    if (!e)
                        return N('Serviço inválido para esta unidade.', 404);
                    p = Math.max(1, Number(e.durationMinutes || 30));
                }
                let m = new Date(Date.UTC(c.y, c.m - 1, c.d, 12, 0, 0, 0)),
                    f = await T.prisma.professionalDailyAvailability.findFirst({
                        where: {
                            companyId: i,
                            professionalId: o,
                            unitId: s,
                            date: m,
                        },
                        include: { intervals: !0 },
                    });
                if (f?.type === E.ProfessionalDailyAvailabilityType.DAY_OFF)
                    return A({
                        date: l,
                        unitId: s,
                        professionalId: o,
                        source: 'DAY_OFF',
                        durationMinutes: p,
                        times: [],
                    });
                let h = [];
                if (f && f.type === E.ProfessionalDailyAvailabilityType.CUSTOM)
                    h = f.intervals
                        .map((e) => ({
                            startTime: e.startTime,
                            endTime: e.endTime,
                        }))
                        .filter(
                            (e) =>
                                C(e.startTime) &&
                                C(e.endTime) &&
                                e.startTime < e.endTime
                        );
                else {
                    let e,
                        t,
                        a,
                        r =
                            ((e = new Date(
                                Date.UTC(c.y, c.m - 1, c.d, 12, 0, 0, 0)
                            )),
                            (t = new Intl.DateTimeFormat('en-US', {
                                timeZone: 'America/Sao_Paulo',
                                weekday: 'short',
                            }).formatToParts(e)),
                            (a = (
                                t.find((e) => 'weekday' === e.type)?.value ?? ''
                            ).toLowerCase()).startsWith('sun')
                                ? 0
                                : a.startsWith('mon')
                                  ? 1
                                  : a.startsWith('tue')
                                    ? 2
                                    : a.startsWith('wed')
                                      ? 3
                                      : a.startsWith('thu')
                                        ? 4
                                        : a.startsWith('fri')
                                          ? 5
                                          : 6),
                        n =
                            await T.prisma.professionalWeeklyAvailability.findFirst(
                                {
                                    where: {
                                        companyId: i,
                                        professionalId: o,
                                        unitId: s,
                                        weekday: r,
                                    },
                                    include: { intervals: !0 },
                                }
                            );
                    if (!n || !n.isActive)
                        return A({
                            date: l,
                            unitId: s,
                            professionalId: o,
                            source: 'WEEKLY_INACTIVE',
                            durationMinutes: p,
                            times: [],
                        });
                    let d = n.intervals?.[0];
                    if (
                        !d ||
                        !C(d.startTime) ||
                        !C(d.endTime) ||
                        d.startTime >= d.endTime
                    )
                        return A({
                            date: l,
                            unitId: s,
                            professionalId: o,
                            source: 'WEEKLY_NO_INTERVAL',
                            durationMinutes: p,
                            times: [],
                        });
                    h = [{ startTime: d.startTime, endTime: d.endTime }];
                }
                let v = h.flatMap((e) =>
                    (function (e, t, i) {
                        let a = M(e),
                            r = M(t),
                            n = Math.max(1, Number(i || 0)),
                            s = [];
                        for (let e = a; e + n <= r; e += 30)
                            s.push(
                                (function (e) {
                                    let t = String(Math.floor(e / 60)).padStart(
                                            2,
                                            '0'
                                        ),
                                        i = String(e % 60).padStart(2, '0');
                                    return `${t}:${i}`;
                                })(e)
                            );
                        return s;
                    })(e.startTime, e.endTime, p)
                );
                v = Array.from(new Set(v)).sort((e, t) => M(e) - M(t));
                let { startUtc: y, endUtc: w } = (function (e) {
                        let { y: t, m: i, d: a } = e,
                            r = Date.UTC(t, i - 1, a, 3, 0, 0, 0),
                            n = Date.UTC(t, i - 1, a + 1, 3, 0, 0, 0);
                        return {
                            startUtc: new Date(r),
                            endUtc: new Date(n - 1),
                        };
                    })(c),
                    R = (
                        await T.prisma.appointment.findMany({
                            where: {
                                companyId: i,
                                unitId: s,
                                professionalId: o,
                                scheduleAt: { gte: y, lte: w },
                                status: { in: ['PENDING', 'DONE'] },
                                ...(u ? { id: { not: u } } : {}),
                            },
                            select: {
                                scheduleAt: !0,
                                serviceId: !0,
                                service: { select: { durationMinutes: !0 } },
                            },
                        })
                    ).map((e) => {
                        var t;
                        let i,
                            a,
                            r,
                            n =
                                ((t = new Date(e.scheduleAt)),
                                (i = new Intl.DateTimeFormat('pt-BR', {
                                    timeZone: 'America/Sao_Paulo',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: !1,
                                }).formatToParts(t)),
                                (a =
                                    i.find((e) => 'hour' === e.type)?.value ??
                                    '00'),
                                (r =
                                    i.find((e) => 'minute' === e.type)?.value ??
                                    '00'),
                                `${a}:${r}`),
                            s = M(n),
                            o = Math.max(
                                1,
                                Number(e.service?.durationMinutes || 30)
                            );
                        return { startMins: s, endMins: s + o };
                    });
                v = v.filter((e) => {
                    let t = M(e),
                        i = t + p;
                    for (let e of R) {
                        var a, r;
                        if (
                            ((a = e.startMins), (r = e.endMins), t < r && a < i)
                        )
                            return !1;
                    }
                    return !0;
                });
                try {
                    let e = new Intl.DateTimeFormat('pt-BR', {
                            timeZone: 'America/Sao_Paulo',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: !1,
                        }).formatToParts(new Date()),
                        t = Number(
                            e.find((e) => 'day' === e.type)?.value ?? '0'
                        ),
                        i = Number(
                            e.find((e) => 'month' === e.type)?.value ?? '0'
                        ),
                        a = Number(
                            e.find((e) => 'year' === e.type)?.value ?? '0'
                        ),
                        r = Number(
                            e.find((e) => 'hour' === e.type)?.value ?? '0'
                        ),
                        n = Number(
                            e.find((e) => 'minute' === e.type)?.value ?? '0'
                        );
                    if (a === c.y && i === c.m && t === c.d) {
                        let e = 60 * r + n;
                        v = v.filter((t) => M(t) >= e);
                    }
                } catch {}
                return A({
                    date: l,
                    unitId: s,
                    professionalId: o,
                    appointmentId: u || null,
                    source: f ? 'EXCEPTION' : 'WEEKLY',
                    intervals: h,
                    durationMinutes: p,
                    times: v,
                });
            } catch (e) {
                return N(
                    e?.message ?? 'Erro ao calcular disponibilidade.',
                    500
                );
            }
        }
        e.s(['GET', () => x], 525821);
        var P = e.i(525821);
        let S = new t.AppRouteRouteModule({
                definition: {
                    kind: i.RouteKind.APP_ROUTE,
                    page: '/api/admin/availability/times/route',
                    pathname: '/api/admin/availability/times',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/availability/times/route.ts',
                nextConfigOutput: 'standalone',
                userland: P,
            }),
            {
                workAsyncStorage: I,
                workUnitAsyncStorage: D,
                serverHooks: U,
            } = S;
        function O() {
            return (0, a.patchFetch)({
                workAsyncStorage: I,
                workUnitAsyncStorage: D,
            });
        }
        async function _(e, t, a) {
            S.isDev &&
                (0, r.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let R = '/api/admin/availability/times/route';
            R = R.replace(/\/index$/, '') || '/';
            let T = await S.prepare(e, t, {
                srcPage: R,
                multiZoneDraftMode: !1,
            });
            if (!T)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: g,
                    params: E,
                    nextConfig: A,
                    parsedUrl: N,
                    isDraftMode: b,
                    prerenderManifest: C,
                    routerServerContext: M,
                    isOnDemandRevalidate: x,
                    revalidateOnlyGenerated: P,
                    resolvedPathname: I,
                    clientReferenceManifest: D,
                    serverActionsManifest: U,
                } = T,
                O = (0, l.normalizeAppPath)(R),
                _ = !!(C.dynamicRoutes[O] || C.routes[I]),
                F = async () => (
                    (null == M ? void 0 : M.render404)
                        ? await M.render404(e, t, N, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (_ && !b) {
                let e = !!C.routes[I],
                    t = C.dynamicRoutes[O];
                if (t && !1 === t.fallback && !e) {
                    if (A.experimental.adapterPath) return await F();
                    throw new y.NoFallbackError();
                }
            }
            let k = null;
            !_ || S.isDev || b || (k = '/index' === (k = I) ? '/' : k);
            let H = !0 === S.isDev || !_,
                q = _ && !H;
            U &&
                D &&
                (0, s.setReferenceManifestsSingleton)({
                    page: R,
                    clientReferenceManifest: D,
                    serverActionsManifest: U,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: U,
                    }),
                });
            let $ = e.method || 'GET',
                W = (0, n.getTracer)(),
                K = W.getActiveScopeSpan(),
                L = {
                    params: E,
                    prerenderManifest: C,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!A.experimental.authInterrupts,
                        },
                        cacheComponents: !!A.cacheComponents,
                        supportsDynamicResponse: H,
                        incrementalCache: (0, r.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: A.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, i, a) =>
                            S.onRequestError(e, t, a, M),
                    },
                    sharedContext: { buildId: g },
                },
                j = new d.NodeNextRequest(e),
                B = new d.NodeNextResponse(t),
                G = u.NextRequestAdapter.fromNodeNextRequest(
                    j,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        S.handle(G, L).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let i = W.getRootSpanAttributes();
                            if (!i) return;
                            if (
                                i.get('next.span_type') !==
                                c.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${i.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = i.get('next.route');
                            if (a) {
                                let t = `${$} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${$} ${R}`);
                        }),
                    o = !!(0, r.getRequestMeta)(e, 'minimalMode'),
                    l = async (r) => {
                        var n, l;
                        let d = async ({ previousCacheEntry: i }) => {
                                try {
                                    if (!o && x && P && !i)
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
                                    let n = await s(r);
                                    e.fetchMetrics = L.renderOpts.fetchMetrics;
                                    let l = L.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let d = L.renderOpts.collectedTags;
                                    if (!_)
                                        return (
                                            await (0, m.sendResponse)(
                                                j,
                                                B,
                                                n,
                                                L.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await n.blob(),
                                            t = (0,
                                            f.toNodeOutgoingHttpHeaders)(
                                                n.headers
                                            );
                                        (d && (t[v.NEXT_CACHE_TAGS_HEADER] = d),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let i =
                                                void 0 !==
                                                    L.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    L.renderOpts
                                                        .collectedRevalidate >=
                                                    v.INFINITE_CACHE
                                                ) &&
                                                L.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    L.renderOpts
                                                        .collectedExpire ||
                                                L.renderOpts.collectedExpire >=
                                                    v.INFINITE_CACHE
                                                    ? void 0
                                                    : L.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: w.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: n.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: i,
                                                expire: a,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == i ? void 0 : i.isStale) &&
                                            (await S.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: R,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: q,
                                                        isOnDemandRevalidate: x,
                                                    }),
                                                },
                                                M
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await S.handleResponse({
                                req: e,
                                nextConfig: A,
                                cacheKey: k,
                                routeKind: i.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: C,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: x,
                                revalidateOnlyGenerated: P,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!_) return null;
                        if (
                            (null == u || null == (n = u.value)
                                ? void 0
                                : n.kind) !== w.CachedRouteKind.APP_ROUTE
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
                                x
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            b &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, f.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && _) || c.delete(v.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                j,
                                B,
                                new Response(u.value.body, {
                                    headers: c,
                                    status: u.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                K
                    ? await l(K)
                    : await W.withPropagatedContext(e.headers, () =>
                          W.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${$} ${R}`,
                                  kind: n.SpanKind.SERVER,
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
                    (t instanceof y.NoFallbackError ||
                        (await S.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: O,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: q,
                                isOnDemandRevalidate: x,
                            }),
                        })),
                    _)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        j,
                        B,
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
                () => S,
                'serverHooks',
                () => U,
                'workAsyncStorage',
                () => I,
                'workUnitAsyncStorage',
                () => D,
            ],
            467370
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_85e6246b.js.map
