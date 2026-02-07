module.exports = [
    36903,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            i = e.i(821498),
            s = e.i(161599),
            a = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            u = e.i(528171),
            d = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            h = e.i(46094),
            f = e.i(622730),
            g = e.i(811178),
            v = e.i(193695);
        e.i(629399);
        var R = e.i(377404),
            w = e.i(738342),
            N = e.i(698043),
            E = e.i(945310),
            x = e.i(29173),
            A = e.i(453852);
        function T() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        async function C(e) {
            let t =
                    (function (e, t) {
                        let r = t.toLowerCase();
                        for (let [t, n] of e.headers.entries())
                            if (t.toLowerCase() === r) {
                                let e = String(n ?? '').trim();
                                return e.length ? e : null;
                            }
                        return null;
                    })(e, 'authorization') || '',
                r = t.startsWith('Bearer ') ? t.slice(7).trim() : '';
            if (!r) throw Error('missing_token');
            return await (0, A.verifyAppJwt)(r);
        }
        function S(e) {
            return String(e).padStart(2, '0');
        }
        function y(e, t = 30) {
            let r = 'number' == typeof e ? e : Number(e);
            return !Number.isFinite(r) || r <= 0
                ? t
                : Math.max(1, Math.round(r));
        }
        async function b(e, t, r, n) {
            let i = y(n, 30),
                s = (0, E.addMinutes)(t, i),
                a = (0, E.addMinutes)(t, -720),
                o = (0, E.addMinutes)(s, 720);
            for (let n of await N.prisma.appointment.findMany({
                where: {
                    companyId: e,
                    professionalId: r,
                    status: { not: 'CANCELED' },
                    scheduleAt: { gte: a, lte: o },
                },
                select: {
                    id: !0,
                    scheduleAt: !0,
                    service: { select: { durationMinutes: !0 } },
                },
                orderBy: { scheduleAt: 'asc' },
            })) {
                let e = n.scheduleAt,
                    r = y(n.service?.durationMinutes, 30),
                    i = (0, E.addMinutes)(e, r);
                if (e.getTime() < s.getTime() && i.getTime() > t.getTime())
                    return 'Este profissional já possui um agendamento que conflita com este horário';
            }
            return null;
        }
        async function P(e) {
            let { companyId: t, userId: r, unitId: n } = e;
            await N.prisma.companyMember.upsert({
                where: { companyId_userId: { companyId: t, userId: r } },
                create: {
                    companyId: t,
                    userId: r,
                    role: 'CLIENT',
                    isActive: !0,
                    lastUnitId: n ?? void 0,
                },
                update: { isActive: !0, ...(n ? { lastUnitId: n } : {}) },
            });
        }
        async function I() {
            return new w.NextResponse(null, { status: 204, headers: T() });
        }
        async function j(e) {
            try {
                var t;
                let r = await C(e),
                    n = String(r.companyId || '').trim();
                if (!n)
                    return w.NextResponse.json(
                        { error: 'Não autorizado' },
                        { status: 401, headers: T() }
                    );
                if ('CLIENT' !== r.role)
                    return w.NextResponse.json(
                        { error: 'Sem permissão' },
                        { status: 403, headers: T() }
                    );
                let i = await e.json(),
                    s = String(i?.clientName ?? '').trim(),
                    a =
                        ((t = String(i?.phone ?? '')),
                        String(t ?? '').replace(/\D/g, '')),
                    o = String(i?.unitId ?? '').trim(),
                    l = String(i?.serviceId ?? '').trim(),
                    u = String(i?.professionalId ?? '').trim(),
                    d = String(i?.barberId ?? '').trim(),
                    c = u || d,
                    p = String(i?.scheduleAt ?? '').trim(),
                    m = String(i?.dateISO ?? '').trim(),
                    h = String(i?.startTime ?? '').trim();
                if (!s)
                    return w.NextResponse.json(
                        { error: 'Nome é obrigatório' },
                        { status: 400, headers: T() }
                    );
                if (!a || (10 !== a.length && 11 !== a.length))
                    return w.NextResponse.json(
                        { error: 'Telefone inválido (use DDD + número)' },
                        { status: 400, headers: T() }
                    );
                if (!o || !l || !c)
                    return w.NextResponse.json(
                        { error: 'Parâmetros incompletos' },
                        { status: 400, headers: T() }
                    );
                let f = null;
                if (p) {
                    let e = new Date(p);
                    Number.isNaN(e.getTime()) || (f = e);
                }
                if (!f) {
                    if (!m || !h)
                        return w.NextResponse.json(
                            { error: 'Parâmetros incompletos' },
                            { status: 400, headers: T() }
                        );
                    f = (function (e, t) {
                        let r = new Date(String(e ?? '').trim());
                        if (Number.isNaN(r.getTime()))
                            throw Error('dateISO inválido');
                        let n = r.getUTCFullYear(),
                            i = S(r.getUTCMonth() + 1),
                            s = S(r.getUTCDate()),
                            a = String(t ?? '')
                                .trim()
                                .match(/^(\d{1,2}):(\d{2})/);
                        if (!a) throw Error('startTime inválido');
                        let o = Number(a[1]),
                            l = Number(a[2]);
                        if (
                            !Number.isFinite(o) ||
                            !Number.isFinite(l) ||
                            o < 0 ||
                            o > 23 ||
                            l < 0 ||
                            l > 59
                        )
                            throw Error('startTime inválido');
                        let u = new Date(
                            `${n}-${i}-${s}T${S(o)}:${S(l)}:00-03:00`
                        );
                        if (Number.isNaN(u.getTime()))
                            throw Error('Falha ao montar scheduleAt');
                        return u;
                    })(m, h);
                }
                if (f.getTime() < Date.now())
                    return w.NextResponse.json(
                        {
                            error: 'Não é possível agendar para um horário no passado',
                        },
                        { status: 400, headers: T() }
                    );
                if (f.getMinutes() % 30 != 0)
                    return w.NextResponse.json(
                        {
                            error: 'Horário inválido (use intervalos de 30 minutos).',
                        },
                        { status: 400, headers: T() }
                    );
                let g = await N.prisma.unit.findFirst({
                    where: { id: o, companyId: n },
                    select: { id: !0, isActive: !0 },
                });
                if (!g)
                    return w.NextResponse.json(
                        { error: 'Unidade não encontrada' },
                        { status: 404, headers: T() }
                    );
                if (!1 === g.isActive)
                    return w.NextResponse.json(
                        { error: 'Unidade inativa' },
                        { status: 400, headers: T() }
                    );
                let v = await N.prisma.service.findFirst({
                    where: { id: l, companyId: n },
                    select: {
                        id: !0,
                        name: !0,
                        unitId: !0,
                        price: !0,
                        professionalPercentage: !0,
                        isActive: !0,
                        durationMinutes: !0,
                    },
                });
                if (!v)
                    return w.NextResponse.json(
                        { error: 'Serviço não encontrado' },
                        { status: 404, headers: T() }
                    );
                if (!v.isActive)
                    return w.NextResponse.json(
                        { error: 'Serviço inativo' },
                        { status: 400, headers: T() }
                    );
                if (v.unitId && v.unitId !== o)
                    return w.NextResponse.json(
                        { error: 'Este serviço não pertence a esta unidade' },
                        { status: 400, headers: T() }
                    );
                if (
                    !(await N.prisma.professional.findFirst({
                        where: { id: c, companyId: n, isActive: !0 },
                        select: { id: !0 },
                    }))
                )
                    return w.NextResponse.json(
                        { error: 'Profissional não encontrado ou inativo' },
                        { status: 404, headers: T() }
                    );
                if (
                    !(await N.prisma.professionalUnit.findFirst({
                        where: {
                            professionalId: c,
                            unitId: o,
                            isActive: !0,
                            companyId: n,
                        },
                        select: { id: !0 },
                    }))
                )
                    return w.NextResponse.json(
                        {
                            error: 'Este profissional não está vinculado a esta unidade',
                        },
                        { status: 400, headers: T() }
                    );
                if (
                    !(await N.prisma.serviceProfessional.findFirst({
                        where: {
                            professionalId: c,
                            serviceId: l,
                            companyId: n,
                        },
                        select: { id: !0 },
                    }))
                )
                    return w.NextResponse.json(
                        { error: 'Este profissional não executa este serviço' },
                        { status: 400, headers: T() }
                    );
                let R = await b(n, f, c, v.durationMinutes ?? 0);
                if (R)
                    return w.NextResponse.json(
                        { error: R },
                        { status: 409, headers: T() }
                    );
                let E = String(r.sub || '').trim();
                if (!E)
                    return w.NextResponse.json(
                        { error: 'Não autorizado' },
                        { status: 401, headers: T() }
                    );
                await P({ companyId: n, userId: E, unitId: o });
                let A = v.price ?? new x.Prisma.Decimal(0),
                    y = v.professionalPercentage ?? new x.Prisma.Decimal(0),
                    I = A.mul(y).div(new x.Prisma.Decimal(100)),
                    j = await N.prisma.appointment.create({
                        data: {
                            companyId: n,
                            clientName: s,
                            phone: a,
                            description: v.name,
                            scheduleAt: f,
                            serviceId: l,
                            professionalId: c,
                            unitId: o,
                            clientId: E,
                            servicePriceAtTheTime: v.price,
                            professionalPercentageAtTheTime:
                                v.professionalPercentage,
                            professionalEarningValue: I,
                            status: 'PENDING',
                        },
                        select: { id: !0, status: !0, scheduleAt: !0 },
                    });
                return w.NextResponse.json(
                    { ok: !0, appointment: j },
                    { status: 200, headers: T() }
                );
            } catch (t) {
                let e = String(t?.message ?? 'Erro').toLowerCase();
                if (
                    e.includes('missing_token') ||
                    e.includes('token') ||
                    e.includes('jwt') ||
                    e.includes('signature') ||
                    e.includes('invalid token payload') ||
                    e.includes('companyid')
                )
                    return w.NextResponse.json(
                        { error: 'Não autorizado' },
                        { status: 401, headers: T() }
                    );
                return (
                    console.error('[api/mobile/appointments] error:', t),
                    w.NextResponse.json(
                        { error: 'Erro ao criar agendamento' },
                        { status: 500, headers: T() }
                    )
                );
            }
        }
        e.s(['OPTIONS', () => I, 'POST', () => j], 459539);
        var M = e.i(459539);
        let O = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/appointments/route',
                    pathname: '/api/mobile/appointments',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/appointments/route.ts',
                nextConfigOutput: 'standalone',
                userland: M,
            }),
            {
                workAsyncStorage: D,
                workUnitAsyncStorage: U,
                serverHooks: _,
            } = O;
        function H() {
            return (0, n.patchFetch)({
                workAsyncStorage: D,
                workUnitAsyncStorage: U,
            });
        }
        async function k(e, t, n) {
            O.isDev &&
                (0, i.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let w = '/api/mobile/appointments/route';
            w = w.replace(/\/index$/, '') || '/';
            let N = await O.prepare(e, t, {
                srcPage: w,
                multiZoneDraftMode: !1,
            });
            if (!N)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == n.waitUntil ||
                        n.waitUntil.call(n, Promise.resolve()),
                    null
                );
            let {
                    buildId: E,
                    params: x,
                    nextConfig: A,
                    parsedUrl: T,
                    isDraftMode: C,
                    prerenderManifest: S,
                    routerServerContext: y,
                    isOnDemandRevalidate: b,
                    revalidateOnlyGenerated: P,
                    resolvedPathname: I,
                    clientReferenceManifest: j,
                    serverActionsManifest: M,
                } = N,
                D = (0, l.normalizeAppPath)(w),
                U = !!(S.dynamicRoutes[D] || S.routes[I]),
                _ = async () => (
                    (null == y ? void 0 : y.render404)
                        ? await y.render404(e, t, T, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (U && !C) {
                let e = !!S.routes[I],
                    t = S.dynamicRoutes[D];
                if (t && !1 === t.fallback && !e) {
                    if (A.experimental.adapterPath) return await _();
                    throw new v.NoFallbackError();
                }
            }
            let H = null;
            !U || O.isDev || C || (H = '/index' === (H = I) ? '/' : H);
            let k = !0 === O.isDev || !U,
                F = U && !k;
            M &&
                j &&
                (0, a.setReferenceManifestsSingleton)({
                    page: w,
                    clientReferenceManifest: j,
                    serverActionsManifest: M,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: M,
                    }),
                });
            let q = e.method || 'GET',
                $ = (0, s.getTracer)(),
                L = $.getActiveScopeSpan(),
                K = {
                    params: x,
                    prerenderManifest: S,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!A.experimental.authInterrupts,
                        },
                        cacheComponents: !!A.cacheComponents,
                        supportsDynamicResponse: k,
                        incrementalCache: (0, i.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: A.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            O.onRequestError(e, t, n, y),
                    },
                    sharedContext: { buildId: E },
                },
                B = new u.NodeNextRequest(e),
                z = new u.NodeNextResponse(t),
                G = d.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let a = async (e) =>
                        O.handle(G, K).finally(() => {
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
                            let n = r.get('next.route');
                            if (n) {
                                let t = `${q} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${q} ${w}`);
                        }),
                    o = !!(0, i.getRequestMeta)(e, 'minimalMode'),
                    l = async (i) => {
                        var s, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && b && P && !r)
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
                                    let s = await a(i);
                                    e.fetchMetrics = K.renderOpts.fetchMetrics;
                                    let l = K.renderOpts.pendingWaitUntil;
                                    l &&
                                        n.waitUntil &&
                                        (n.waitUntil(l), (l = void 0));
                                    let u = K.renderOpts.collectedTags;
                                    if (!U)
                                        return (
                                            await (0, m.sendResponse)(
                                                B,
                                                z,
                                                s,
                                                K.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await s.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                s.headers
                                            );
                                        (u && (t[g.NEXT_CACHE_TAGS_HEADER] = u),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    K.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    K.renderOpts
                                                        .collectedRevalidate >=
                                                    g.INFINITE_CACHE
                                                ) &&
                                                K.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    K.renderOpts
                                                        .collectedExpire ||
                                                K.renderOpts.collectedExpire >=
                                                    g.INFINITE_CACHE
                                                    ? void 0
                                                    : K.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: R.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: s.status,
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
                                            (await O.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: w,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: F,
                                                        isOnDemandRevalidate: b,
                                                    }),
                                                },
                                                y
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await O.handleResponse({
                                req: e,
                                nextConfig: A,
                                cacheKey: H,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: S,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: b,
                                revalidateOnlyGenerated: P,
                                responseGenerator: u,
                                waitUntil: n.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!U) return null;
                        if (
                            (null == d || null == (s = d.value)
                                ? void 0
                                : s.kind) !== R.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == d || null == (l = d.value) ? void 0 : l.kind}`
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
                                b
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            C &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (o && U) || c.delete(g.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                B,
                                z,
                                new Response(d.value.body, {
                                    headers: c,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                L
                    ? await l(L)
                    : await $.withPropagatedContext(e.headers, () =>
                          $.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${q} ${w}`,
                                  kind: s.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': q,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof v.NoFallbackError ||
                        (await O.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: D,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: F,
                                isOnDemandRevalidate: b,
                            }),
                        })),
                    U)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        B,
                        z,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => k,
                'patchFetch',
                () => H,
                'routeModule',
                () => O,
                'serverHooks',
                () => _,
                'workAsyncStorage',
                () => D,
                'workUnitAsyncStorage',
                () => U,
            ],
            36903
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_d7543ffd.js.map
