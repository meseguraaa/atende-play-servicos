module.exports = [
    557989,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            s = e.i(821498),
            o = e.i(161599),
            i = e.i(182716),
            a = e.i(857635),
            l = e.i(337047),
            u = e.i(528171),
            d = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            h = e.i(46094),
            f = e.i(622730),
            R = e.i(811178),
            w = e.i(193695);
        e.i(629399);
        var v = e.i(377404),
            g = e.i(738342),
            N = e.i(698043),
            A = e.i(453852),
            x = e.i(945310);
        function E() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            };
        }
        async function y(e) {
            let t = e.headers.get('authorization') || '',
                r = t.startsWith('Bearer ') ? t.slice(7).trim() : '';
            if (!r) throw Error('missing_token');
            let n = await (0, A.verifyAppJwt)(r),
                s =
                    'string' == typeof n?.companyId
                        ? String(n.companyId).trim()
                        : '';
            if (!s) throw Error('missing_company_id');
            return { ...n, companyId: s };
        }
        function C(e) {
            return String(e ?? '').trim();
        }
        function T(e, t = 30) {
            let r = 'number' == typeof e ? e : Number(e);
            return !Number.isFinite(r) || r <= 0
                ? t
                : Math.max(1, Math.round(r));
        }
        async function b() {
            return new g.NextResponse(null, { status: 204, headers: E() });
        }
        async function k(e, { params: t }) {
            let r = E();
            try {
                var n, s;
                let o,
                    i = await y(e),
                    a = i.companyId;
                if (i.role && 'CLIENT' !== i.role)
                    return g.NextResponse.json(
                        { ok: !1, error: 'Sem permissão' },
                        { status: 403, headers: r }
                    );
                let { id: l } = await t,
                    u = C(l);
                if (!u)
                    return g.NextResponse.json(
                        { ok: !1, error: 'Id ausente' },
                        { status: 400, headers: r }
                    );
                let d = await e.json().catch(() => ({})),
                    c = C(d?.unitId),
                    p = C(d?.serviceId),
                    m = C(d?.professionalId ?? d?.barberId),
                    h = C(d?.scheduleAt);
                if (!c || !p || !m || !h)
                    return g.NextResponse.json(
                        { ok: !1, error: 'Parâmetros incompletos' },
                        { status: 400, headers: r }
                    );
                let f = new Date(h);
                if (Number.isNaN(f.getTime()))
                    return g.NextResponse.json(
                        { ok: !1, error: 'scheduleAt inválido' },
                        { status: 400, headers: r }
                    );
                if (f.getMinutes() % 30 != 0)
                    return g.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Horário inválido (use intervalos de 30 minutos).',
                        },
                        { status: 400, headers: r }
                    );
                if (f.getTime() < Date.now())
                    return g.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Não é possível remarcar para o passado.',
                        },
                        { status: 400, headers: r }
                    );
                let R = await N.prisma.appointment.findFirst({
                    where: {
                        id: u,
                        companyId: a,
                        clientId: i.sub,
                        status: { not: 'CANCELED' },
                    },
                    include: { service: !0 },
                });
                if (!R)
                    return g.NextResponse.json(
                        { ok: !1, error: 'Agendamento não encontrado' },
                        { status: 404, headers: r }
                    );
                let w =
                    ((n = R.service?.cancelLimitHours),
                    (o = 'number' == typeof n ? n : Number(n)),
                    !Number.isFinite(o) || o <= 0 ? null : o > 720 ? 720 : o);
                if (w) {
                    let e,
                        t,
                        n,
                        o =
                            ((s = new Date(R.scheduleAt)),
                            (e = new Date()),
                            {
                                canReschedule: (n =
                                    (t = (s.getTime() - e.getTime()) / 36e5) >=
                                    w),
                                reason: n
                                    ? null
                                    : `Menos de ${w}h de anteced\xeancia.`,
                                diffHours: t,
                                windowHours: w,
                            });
                    if (!o.canReschedule)
                        return g.NextResponse.json(
                            { ok: !1, error: o.reason ?? 'Bloqueado' },
                            { status: 409, headers: r }
                        );
                } else if (new Date(R.scheduleAt).getTime() <= Date.now())
                    return g.NextResponse.json(
                        { ok: !1, error: 'Este agendamento já passou.' },
                        { status: 409, headers: r }
                    );
                let [v, A, E, b, k] = await Promise.all([
                    N.prisma.unit.findFirst({
                        where: { id: c, companyId: a, isActive: !0 },
                        select: { id: !0 },
                    }),
                    N.prisma.service.findFirst({
                        where: { id: p, companyId: a, isActive: !0 },
                        select: { id: !0, name: !0, durationMinutes: !0 },
                    }),
                    N.prisma.professional.findFirst({
                        where: { id: m, companyId: a, isActive: !0 },
                        select: { id: !0 },
                    }),
                    N.prisma.professionalUnit.findFirst({
                        where: {
                            companyId: a,
                            unitId: c,
                            professionalId: m,
                            isActive: !0,
                        },
                        select: { id: !0 },
                    }),
                    N.prisma.serviceProfessional.findFirst({
                        where: {
                            companyId: a,
                            serviceId: p,
                            professionalId: m,
                        },
                        select: { id: !0 },
                    }),
                ]);
                if (!v)
                    return g.NextResponse.json(
                        { ok: !1, error: 'Unidade não encontrada' },
                        { status: 404, headers: r }
                    );
                if (!A)
                    return g.NextResponse.json(
                        { ok: !1, error: 'Serviço não encontrado' },
                        { status: 404, headers: r }
                    );
                if (!E)
                    return g.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Profissional não encontrado ou inativo',
                        },
                        { status: 404, headers: r }
                    );
                if (!b)
                    return g.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Profissional não vinculado a esta unidade',
                        },
                        { status: 400, headers: r }
                    );
                if (!k)
                    return g.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Profissional não executa este serviço',
                        },
                        { status: 400, headers: r }
                    );
                let P = T(A.durationMinutes, 30),
                    I = (0, x.addMinutes)(f, P),
                    M = (0, x.addMinutes)(f, -720),
                    S = (0, x.addMinutes)(I, 720);
                for (let e of await N.prisma.appointment.findMany({
                    where: {
                        companyId: a,
                        unitId: c,
                        professionalId: m,
                        status: { not: 'CANCELED' },
                        id: { not: u },
                        scheduleAt: { gte: M, lte: S },
                    },
                    select: {
                        id: !0,
                        scheduleAt: !0,
                        service: { select: { durationMinutes: !0 } },
                    },
                    orderBy: { scheduleAt: 'asc' },
                })) {
                    let t = new Date(e.scheduleAt),
                        n = T(e.service?.durationMinutes, 30),
                        s = (0, x.addMinutes)(t, n);
                    if (t.getTime() < I.getTime() && s.getTime() > f.getTime())
                        return g.NextResponse.json(
                            { ok: !1, error: 'Horário indisponível' },
                            { status: 409, headers: r }
                        );
                }
                let j = await N.prisma.appointment.updateMany({
                    where: { id: u, companyId: a, clientId: i.sub },
                    data: {
                        unitId: c,
                        serviceId: p,
                        professionalId: m,
                        scheduleAt: f,
                        description: A.name ?? R.description,
                    },
                });
                if (0 === j.count)
                    return g.NextResponse.json(
                        { ok: !1, error: 'Agendamento não encontrado' },
                        { status: 404, headers: r }
                    );
                let O = await N.prisma.appointment.findFirst({
                    where: { id: u, companyId: a, clientId: i.sub },
                    select: {
                        id: !0,
                        status: !0,
                        scheduleAt: !0,
                        unitId: !0,
                        serviceId: !0,
                        professionalId: !0,
                        updatedAt: !0,
                    },
                });
                return g.NextResponse.json(
                    { ok: !0, appointment: O },
                    { status: 200, headers: r }
                );
            } catch (n) {
                console.error(
                    '[mobile/me/appointments/[id]/reschedule POST] error:',
                    n
                );
                let e = String(n?.message || '').toLowerCase(),
                    t =
                        e.includes('missing_token') ||
                        e.includes('missing_company_id') ||
                        e.includes('jwt') ||
                        e.includes('token') ||
                        e.includes('signature');
                return g.NextResponse.json(
                    {
                        ok: !1,
                        error: t
                            ? 'Não autorizado'
                            : 'Erro ao alterar agendamento',
                    },
                    { status: t ? 401 : 500, headers: r }
                );
            }
        }
        e.s(
            [
                'OPTIONS',
                () => b,
                'POST',
                () => k,
                'dynamic',
                0,
                'force-dynamic',
                'runtime',
                0,
                'nodejs',
            ],
            496609
        );
        var P = e.i(496609);
        let I = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/me/appointments/[id]/reschedule/route',
                    pathname: '/api/mobile/me/appointments/[id]/reschedule',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/me/appointments/[id]/reschedule/route.ts',
                nextConfigOutput: 'standalone',
                userland: P,
            }),
            {
                workAsyncStorage: M,
                workUnitAsyncStorage: S,
                serverHooks: j,
            } = I;
        function O() {
            return (0, n.patchFetch)({
                workAsyncStorage: M,
                workUnitAsyncStorage: S,
            });
        }
        async function _(e, t, n) {
            I.isDev &&
                (0, s.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let g = '/api/mobile/me/appointments/[id]/reschedule/route';
            g = g.replace(/\/index$/, '') || '/';
            let N = await I.prepare(e, t, {
                srcPage: g,
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
                    buildId: A,
                    params: x,
                    nextConfig: E,
                    parsedUrl: y,
                    isDraftMode: C,
                    prerenderManifest: T,
                    routerServerContext: b,
                    isOnDemandRevalidate: k,
                    revalidateOnlyGenerated: P,
                    resolvedPathname: M,
                    clientReferenceManifest: S,
                    serverActionsManifest: j,
                } = N,
                O = (0, l.normalizeAppPath)(g),
                _ = !!(T.dynamicRoutes[O] || T.routes[M]),
                D = async () => (
                    (null == b ? void 0 : b.render404)
                        ? await b.render404(e, t, y, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (_ && !C) {
                let e = !!T.routes[M],
                    t = T.dynamicRoutes[O];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await D();
                    throw new w.NoFallbackError();
                }
            }
            let H = null;
            !_ || I.isDev || C || (H = '/index' === (H = M) ? '/' : H);
            let U = !0 === I.isDev || !_,
                F = _ && !U;
            j &&
                S &&
                (0, i.setReferenceManifestsSingleton)({
                    page: g,
                    clientReferenceManifest: S,
                    serverActionsManifest: j,
                    serverModuleMap: (0, a.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let q = e.method || 'GET',
                L = (0, o.getTracer)(),
                $ = L.getActiveScopeSpan(),
                B = {
                    params: x,
                    prerenderManifest: T,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!E.experimental.authInterrupts,
                        },
                        cacheComponents: !!E.cacheComponents,
                        supportsDynamicResponse: U,
                        incrementalCache: (0, s.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: E.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            I.onRequestError(e, t, n, b),
                    },
                    sharedContext: { buildId: A },
                },
                K = new u.NodeNextRequest(e),
                z = new u.NodeNextResponse(t),
                G = d.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let i = async (e) =>
                        I.handle(G, B).finally(() => {
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
                                let t = `${q} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${q} ${g}`);
                        }),
                    a = !!(0, s.getRequestMeta)(e, 'minimalMode'),
                    l = async (s) => {
                        var o, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!a && k && P && !r)
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
                                    let o = await i(s);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        n.waitUntil &&
                                        (n.waitUntil(l), (l = void 0));
                                    let u = B.renderOpts.collectedTags;
                                    if (!_)
                                        return (
                                            await (0, m.sendResponse)(
                                                K,
                                                z,
                                                o,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await o.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                o.headers
                                            );
                                        (u && (t[R.NEXT_CACHE_TAGS_HEADER] = u),
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
                                                    R.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    R.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: v.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: o.status,
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
                                            (await I.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: g,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: F,
                                                        isOnDemandRevalidate: k,
                                                    }),
                                                },
                                                b
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await I.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: H,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: T,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: k,
                                revalidateOnlyGenerated: P,
                                responseGenerator: u,
                                waitUntil: n.waitUntil,
                                isMinimalMode: a,
                            });
                        if (!_) return null;
                        if (
                            (null == d || null == (o = d.value)
                                ? void 0
                                : o.kind) !== v.CachedRouteKind.APP_ROUTE
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
                        (a ||
                            t.setHeader(
                                'x-nextjs-cache',
                                k
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
                            (a && _) || c.delete(R.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                K,
                                z,
                                new Response(d.value.body, {
                                    headers: c,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                $
                    ? await l($)
                    : await L.withPropagatedContext(e.headers, () =>
                          L.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${q} ${g}`,
                                  kind: o.SpanKind.SERVER,
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
                    (t instanceof w.NoFallbackError ||
                        (await I.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: O,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: F,
                                isOnDemandRevalidate: k,
                            }),
                        })),
                    _)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        K,
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
                () => _,
                'patchFetch',
                () => O,
                'routeModule',
                () => I,
                'serverHooks',
                () => j,
                'workAsyncStorage',
                () => M,
                'workUnitAsyncStorage',
                () => S,
            ],
            557989
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_96310530.js.map
