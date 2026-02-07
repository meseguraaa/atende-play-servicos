module.exports = [
    896407,
    (e) => {
        'use strict';
        var t = e.i(698043),
            i = e.i(52359);
        async function a() {
            let e = await (0, i.getCurrentPainelUser)();
            if (!e || 'PROFESSIONAL' !== e.role)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: '',
                    unitId: '',
                };
            let a = String(e.sub || '').trim(),
                n = String(e.companyId || '').trim();
            if (!a || !n)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: '',
                    unitId: '',
                };
            let r = await t.prisma.professional.findFirst({
                where: { userId: a, companyId: n, isActive: !0 },
                select: { id: !0, name: !0, email: !0 },
            });
            if (!r?.id)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: a,
                    unitId: '',
                };
            let s = await t.prisma.professionalUnit.findFirst({
                where: { companyId: n, professionalId: r.id, isActive: !0 },
                select: { unitId: !0 },
                orderBy: { updatedAt: 'desc' },
            });
            return {
                companyId: n,
                professionalId: r.id,
                userId: a,
                unitId: s?.unitId ?? '',
                name: r.name ?? null,
                email: r.email,
            };
        }
        e.s(['requireProfessionalSession', () => a]);
    },
    549059,
    (e) => {
        'use strict';
        var t = e.i(154154),
            i = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            r = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            f = e.i(46094),
            v = e.i(622730),
            y = e.i(811178),
            h = e.i(193695);
        e.i(629399);
        var w = e.i(377404),
            I = e.i(738342),
            g = e.i(205918),
            R = e.i(698043),
            T = e.i(896407);
        function E(e, t = 200) {
            return I.NextResponse.json({ ok: !0, data: e }, { status: t });
        }
        function A(e, t = 400) {
            return I.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function C(e) {
            return 'string' == typeof e && /^\d{2}:\d{2}$/.test(e);
        }
        async function b() {
            let e = await (0, T.requireProfessionalSession)(),
                t = String(e.companyId || '').trim(),
                i = String(e.professionalId || '').trim(),
                a = String(e.unitId || '').trim();
            if (!t) throw Error('missing_company');
            if (!i) throw Error('missing_professional');
            if (
                !a ||
                !(await R.prisma.professionalUnit.findFirst({
                    where: {
                        companyId: t,
                        professionalId: i,
                        unitId: a,
                        isActive: !0,
                        unit: { isActive: !0 },
                    },
                    select: { id: !0 },
                }))
            )
                throw Error('missing_active_unit');
            return { companyId: t, professionalId: i, unitId: a };
        }
        async function k() {
            try {
                let e = await b(),
                    t = await R.prisma.professionalWeeklyAvailability.findMany({
                        where: {
                            companyId: e.companyId,
                            professionalId: e.professionalId,
                            unitId: e.unitId,
                        },
                        include: { intervals: !0 },
                        orderBy: { weekday: 'asc' },
                    }),
                    i = {
                        0: { active: !1, startTime: '00:00', endTime: '23:30' },
                        1: { active: !0, startTime: '00:00', endTime: '23:30' },
                        2: { active: !0, startTime: '00:00', endTime: '23:30' },
                        3: { active: !0, startTime: '00:00', endTime: '23:30' },
                        4: { active: !0, startTime: '00:00', endTime: '23:30' },
                        5: { active: !0, startTime: '00:00', endTime: '23:30' },
                        6: { active: !0, startTime: '00:00', endTime: '23:30' },
                    };
                for (let e of t) {
                    let t = e.weekday;
                    if (t < 0 || t > 6) continue;
                    let a = e.intervals[0];
                    if (!a) {
                        i[t] = {
                            active: e.isActive,
                            startTime: '00:00',
                            endTime: '23:30',
                        };
                        continue;
                    }
                    i[t] = {
                        active: e.isActive,
                        startTime: a.startTime,
                        endTime: a.endTime,
                    };
                }
                return E({ state: i });
            } catch (e) {
                return A(
                    e?.message === 'missing_company'
                        ? 'Sessão sem companyId.'
                        : e?.message === 'missing_professional'
                          ? 'Sessão sem professionalId.'
                          : e?.message === 'missing_active_unit'
                            ? 'Este profissional não possui unidade ativa vinculada.'
                            : 'Erro ao carregar disponibilidade semanal.',
                    401
                );
            }
        }
        async function x(e) {
            try {
                let t = await b(),
                    i = await e.json();
                if (!Array.isArray(i?.days))
                    return A('Payload inválido. Envie { days: [...] }.', 400);
                let a = i.days
                    .map((e) => {
                        var t;
                        let i;
                        return {
                            weekday:
                                ((t = e.weekday),
                                (i = Number(t)),
                                !Number.isInteger(i) || i < 0 || i > 6
                                    ? null
                                    : i),
                            active: !!e.active,
                            startTime: e.startTime,
                            endTime: e.endTime,
                        };
                    })
                    .filter((e) => null !== e.weekday);
                for (let e of a) {
                    if (!C(e.startTime) || !C(e.endTime))
                        return A(
                            'Horários inválidos. Use formato HH:mm (ex: 09:00).',
                            400
                        );
                    if (e.active && e.startTime >= e.endTime)
                        return A(
                            'Em dias ativos, o horário inicial deve ser menor que o final.',
                            400
                        );
                }
                return (
                    await R.prisma.$transaction(async (e) => {
                        for (let i of a) {
                            let a =
                                await e.professionalWeeklyAvailability.upsert({
                                    where: {
                                        professionalId_unitId_weekday: {
                                            professionalId: t.professionalId,
                                            unitId: t.unitId,
                                            weekday: i.weekday,
                                        },
                                    },
                                    create: {
                                        companyId: t.companyId,
                                        professionalId: t.professionalId,
                                        unitId: t.unitId,
                                        weekday: i.weekday,
                                        isActive: i.active,
                                    },
                                    update: { isActive: i.active },
                                    select: { id: !0 },
                                });
                            (await e.professionalWeeklyTimeInterval.deleteMany({
                                where: { weeklyAvailabilityId: a.id },
                            }),
                                i.active &&
                                    (await e.professionalWeeklyTimeInterval.create(
                                        {
                                            data: {
                                                weeklyAvailabilityId: a.id,
                                                startTime: i.startTime,
                                                endTime: i.endTime,
                                            },
                                        }
                                    )));
                        }
                    }),
                    (0, g.revalidatePath)('/professional/availability'),
                    E({ saved: !0 })
                );
            } catch (e) {
                return A(
                    e?.message === 'missing_company'
                        ? 'Sessão sem companyId.'
                        : e?.message === 'missing_professional'
                          ? 'Sessão sem professionalId.'
                          : e?.message === 'missing_active_unit'
                            ? 'Este profissional não possui unidade ativa vinculada.'
                            : 'Erro ao salvar disponibilidade semanal.',
                    401
                );
            }
        }
        e.s(['GET', () => k, 'PUT', () => x], 682224);
        var _ = e.i(682224);
        let S = new t.AppRouteRouteModule({
                definition: {
                    kind: i.RouteKind.APP_ROUTE,
                    page: '/api/professional/availability/weekly/route',
                    pathname: '/api/professional/availability/weekly',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/professional/availability/weekly/route.ts',
                nextConfigOutput: 'standalone',
                userland: _,
            }),
            {
                workAsyncStorage: P,
                workUnitAsyncStorage: N,
                serverHooks: O,
            } = S;
        function U() {
            return (0, a.patchFetch)({
                workAsyncStorage: P,
                workUnitAsyncStorage: N,
            });
        }
        async function H(e, t, a) {
            S.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let I = '/api/professional/availability/weekly/route';
            I = I.replace(/\/index$/, '') || '/';
            let g = await S.prepare(e, t, {
                srcPage: I,
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
                    buildId: R,
                    params: T,
                    nextConfig: E,
                    parsedUrl: A,
                    isDraftMode: C,
                    prerenderManifest: b,
                    routerServerContext: k,
                    isOnDemandRevalidate: x,
                    revalidateOnlyGenerated: _,
                    resolvedPathname: P,
                    clientReferenceManifest: N,
                    serverActionsManifest: O,
                } = g,
                U = (0, l.normalizeAppPath)(I),
                H = !!(b.dynamicRoutes[U] || b.routes[P]),
                M = async () => (
                    (null == k ? void 0 : k.render404)
                        ? await k.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (H && !C) {
                let e = !!b.routes[P],
                    t = b.dynamicRoutes[U];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await M();
                    throw new h.NoFallbackError();
                }
            }
            let q = null;
            !H || S.isDev || C || (q = '/index' === (q = P) ? '/' : q);
            let D = !0 === S.isDev || !H,
                F = H && !D;
            O &&
                N &&
                (0, s.setReferenceManifestsSingleton)({
                    page: I,
                    clientReferenceManifest: N,
                    serverActionsManifest: O,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: O,
                    }),
                });
            let $ = e.method || 'GET',
                j = (0, r.getTracer)(),
                K = j.getActiveScopeSpan(),
                B = {
                    params: T,
                    prerenderManifest: b,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!E.experimental.authInterrupts,
                        },
                        cacheComponents: !!E.cacheComponents,
                        supportsDynamicResponse: D,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: E.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, i, a) =>
                            S.onRequestError(e, t, a, k),
                    },
                    sharedContext: { buildId: R },
                },
                L = new d.NodeNextRequest(e),
                W = new d.NodeNextResponse(t),
                G = u.NextRequestAdapter.fromNodeNextRequest(
                    L,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        S.handle(G, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let i = j.getRootSpanAttributes();
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
                            } else e.updateName(`${$} ${I}`);
                        }),
                    o = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var r, l;
                        let d = async ({ previousCacheEntry: i }) => {
                                try {
                                    if (!o && x && _ && !i)
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
                                    let r = await s(n);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let d = B.renderOpts.collectedTags;
                                    if (!H)
                                        return (
                                            await (0, m.sendResponse)(
                                                L,
                                                W,
                                                r,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await r.blob(),
                                            t = (0,
                                            f.toNodeOutgoingHttpHeaders)(
                                                r.headers
                                            );
                                        (d && (t[y.NEXT_CACHE_TAGS_HEADER] = d),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let i =
                                                void 0 !==
                                                    B.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    B.renderOpts
                                                        .collectedRevalidate >=
                                                    y.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    y.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: w.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: r.status,
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
                                                    routePath: I,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: F,
                                                        isOnDemandRevalidate: x,
                                                    }),
                                                },
                                                k
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await S.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: q,
                                routeKind: i.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: b,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: x,
                                revalidateOnlyGenerated: _,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!H) return null;
                        if (
                            (null == u || null == (r = u.value)
                                ? void 0
                                : r.kind) !== w.CachedRouteKind.APP_ROUTE
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
                            C &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, f.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && H) || c.delete(y.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, v.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                L,
                                W,
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
                    : await j.withPropagatedContext(e.headers, () =>
                          j.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${$} ${I}`,
                                  kind: r.SpanKind.SERVER,
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
                        (await S.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: U,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: F,
                                isOnDemandRevalidate: x,
                            }),
                        })),
                    H)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        L,
                        W,
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
                () => U,
                'routeModule',
                () => S,
                'serverHooks',
                () => O,
                'workAsyncStorage',
                () => P,
                'workUnitAsyncStorage',
                () => N,
            ],
            549059
        );
    },
];

//# sourceMappingURL=_a5386245._.js.map
