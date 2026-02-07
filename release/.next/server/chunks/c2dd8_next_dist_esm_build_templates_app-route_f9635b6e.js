module.exports = [
    231825,
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
            f = e.i(46094),
            h = e.i(622730),
            w = e.i(811178),
            g = e.i(193695);
        e.i(629399);
        var R = e.i(377404),
            v = e.i(738342),
            N = e.i(698043),
            A = e.i(453852),
            E = e.i(945310),
            I = e.i(29173);
        function C() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            };
        }
        async function x(e) {
            let t = e.headers.get('authorization') || '',
                r = t.startsWith('Bearer ') ? t.slice(7).trim() : '';
            if (!r) throw Error('missing_token');
            let n = await (0, A.verifyAppJwt)(r),
                i =
                    'string' == typeof n?.companyId
                        ? String(n.companyId).trim()
                        : '';
            if (!i) throw Error('missing_company_id');
            return { ...n, companyId: i };
        }
        function T(e) {
            let t = 'number' == typeof e ? e : Number(e);
            return !Number.isFinite(t) || t <= 0 ? null : t > 720 ? 720 : t;
        }
        function y(e, t) {
            let r = new Date(),
                n = (e.getTime() - r.getTime()) / 36e5,
                i = n >= t;
            return {
                canReschedule: i,
                reason: i ? null : `Menos de ${t}h de anteced\xeancia.`,
                diffHours: n,
                windowHours: t,
            };
        }
        function b(e) {
            return String(e ?? '').trim();
        }
        function k(e) {
            return String(e).padStart(2, '0');
        }
        function S(e, t = 30) {
            let r = Number(e);
            return !Number.isFinite(r) || r <= 0
                ? t
                : Math.max(1, Math.round(r));
        }
        async function P(e) {
            let {
                    companyId: t,
                    professionalId: r,
                    appointmentId: n,
                    scheduleAt: i,
                    durationMinutes: s,
                } = e,
                a = S(s, 30),
                o = (0, E.addMinutes)(i, a),
                l = (0, E.addMinutes)(i, -720),
                u = (0, E.addMinutes)(o, 720);
            for (let e of (await N.prisma.appointment.findMany({
                where: {
                    companyId: t,
                    professionalId: r,
                    status: { not: 'CANCELED' },
                    id: { not: n },
                    scheduleAt: { gte: l, lte: u },
                },
                select: {
                    id: !0,
                    scheduleAt: !0,
                    service: { select: { durationMinutes: !0 } },
                },
                orderBy: { scheduleAt: 'asc' },
            })) ?? []) {
                let t = new Date(e.scheduleAt),
                    r = S(e?.service?.durationMinutes ?? 30, 30),
                    n = (0, E.addMinutes)(t, r);
                if (t.getTime() < o.getTime() && n.getTime() > i.getTime())
                    return 'Este profissional já possui um agendamento que conflita com este horário';
            }
            return null;
        }
        async function j() {
            return new v.NextResponse(null, { status: 204, headers: C() });
        }
        async function M(e, { params: t }) {
            let r = C();
            try {
                let n = await x(e),
                    i = n.companyId;
                if (n.role && 'CLIENT' !== n.role)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Sem permissão' },
                        { status: 403, headers: r }
                    );
                let { id: s } = await t,
                    a = b(s);
                if (!a)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Id ausente' },
                        { status: 400, headers: r }
                    );
                let o = await N.prisma.appointment.findFirst({
                    where: {
                        id: a,
                        companyId: i,
                        clientId: n.sub,
                        status: { not: 'CANCELED' },
                    },
                    select: {
                        id: !0,
                        status: !0,
                        scheduleAt: !0,
                        unitId: !0,
                        serviceId: !0,
                        professionalId: !0,
                        unit: { select: { id: !0, name: !0 } },
                        service: {
                            select: {
                                id: !0,
                                name: !0,
                                durationMinutes: !0,
                                cancelLimitHours: !0,
                            },
                        },
                        professional: { select: { id: !0, name: !0 } },
                    },
                });
                if (!o)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Agendamento não encontrado' },
                        { status: 404, headers: r }
                    );
                let l = T(o.service?.cancelLimitHours) ?? 24,
                    u = y(o.scheduleAt, l),
                    d = await N.prisma.unit.findMany({
                        where: { companyId: i, isActive: !0 },
                        select: { id: !0, name: !0 },
                        orderBy: { name: 'asc' },
                    });
                return v.NextResponse.json(
                    {
                        ok: !0,
                        appointment: {
                            id: o.id,
                            unitId: o.unitId ?? null,
                            unitName: o.unit?.name ?? null,
                            serviceId: o.serviceId ?? null,
                            serviceName: o.service?.name ?? null,
                            barberId: o.professionalId ?? null,
                            barberName: o.professional?.name ?? null,
                            scheduleAt: o.scheduleAt.toISOString(),
                            status: o.status,
                        },
                        units: d,
                        rules: {
                            canReschedule: u.canReschedule,
                            reason: u.reason,
                        },
                    },
                    { status: 200, headers: r }
                );
            } catch (t) {
                let e = String(t?.message ?? '');
                if (
                    'missing_token' === e ||
                    'missing_company_id' === e ||
                    e.includes('Invalid token payload') ||
                    e.toLowerCase().includes('jwt') ||
                    e.toLowerCase().includes('token') ||
                    e.toLowerCase().includes('signature')
                )
                    return v.NextResponse.json(
                        { ok: !1, error: 'Não autorizado' },
                        { status: 401, headers: r }
                    );
                return (
                    console.error(
                        '[mobile/me/appointments/[id]/edit GET] error:',
                        t
                    ),
                    v.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Erro ao validar edição do agendamento',
                        },
                        { status: 500, headers: r }
                    )
                );
            }
        }
        async function O(e, { params: t }) {
            let r = C();
            try {
                let n = await x(e),
                    i = n.companyId;
                if (n.role && 'CLIENT' !== n.role)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Sem permissão' },
                        { status: 403, headers: r }
                    );
                let { id: s } = await t,
                    a = b(s);
                if (!a)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Id ausente' },
                        { status: 400, headers: r }
                    );
                let o = await e.json().catch(() => ({})),
                    l = b(o?.unitId),
                    u = b(o?.serviceId),
                    d = b(o?.professionalId),
                    c = b(o?.barberId),
                    p = b(o?.scheduleAt),
                    m = b(o?.dateISO),
                    f = b(o?.startTime),
                    h = await N.prisma.appointment.findFirst({
                        where: {
                            id: a,
                            companyId: i,
                            clientId: n.sub,
                            status: { not: 'CANCELED' },
                        },
                        select: {
                            id: !0,
                            status: !0,
                            scheduleAt: !0,
                            unitId: !0,
                            serviceId: !0,
                            professionalId: !0,
                            description: !0,
                            service: {
                                select: {
                                    id: !0,
                                    name: !0,
                                    durationMinutes: !0,
                                    cancelLimitHours: !0,
                                    price: !0,
                                    professionalPercentage: !0,
                                    isActive: !0,
                                    unitId: !0,
                                },
                            },
                        },
                    });
                if (!h)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Agendamento não encontrado' },
                        { status: 404, headers: r }
                    );
                let w = T(h.service?.cancelLimitHours) ?? 24,
                    g = y(h.scheduleAt, w);
                if (!g.canReschedule)
                    return v.NextResponse.json(
                        {
                            ok: !1,
                            error:
                                g.reason ||
                                'Este agendamento não pode ser alterado agora.',
                        },
                        { status: 409, headers: r }
                    );
                let R = l || String(h.unitId ?? '').trim(),
                    A = u || String(h.serviceId ?? '').trim(),
                    E = d || c || String(h.professionalId ?? '').trim();
                if (!R || !A || !E)
                    return v.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Parâmetros incompletos para alterar.',
                        },
                        { status: 400, headers: r }
                    );
                let C = null;
                if (p) {
                    let e = new Date(p);
                    Number.isNaN(e.getTime()) || (C = e);
                }
                if (!C) {
                    if (!m || !f)
                        return v.NextResponse.json(
                            { ok: !1, error: 'Informe dateISO e startTime.' },
                            { status: 400, headers: r }
                        );
                    C = (function (e, t) {
                        let r = new Date(String(e ?? '').trim());
                        if (Number.isNaN(r.getTime()))
                            throw Error('dateISO inválido');
                        let n = r.getUTCFullYear(),
                            i = k(r.getUTCMonth() + 1),
                            s = k(r.getUTCDate()),
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
                            `${n}-${i}-${s}T${k(o)}:${k(l)}:00-03:00`
                        );
                        if (Number.isNaN(u.getTime()))
                            throw Error('Falha ao montar scheduleAt');
                        return u;
                    })(m, f);
                }
                if (C.getTime() < Date.now())
                    return v.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Não é possível remarcar para o passado.',
                        },
                        { status: 400, headers: r }
                    );
                if (
                    !(await N.prisma.unit.findFirst({
                        where: { id: R, companyId: i, isActive: !0 },
                        select: { id: !0 },
                    }))
                )
                    return v.NextResponse.json(
                        { ok: !1, error: 'Unidade inválida' },
                        { status: 404, headers: r }
                    );
                let j = await N.prisma.service.findFirst({
                    where: { id: A, companyId: i, isActive: !0 },
                    select: {
                        id: !0,
                        name: !0,
                        unitId: !0,
                        durationMinutes: !0,
                        price: !0,
                        professionalPercentage: !0,
                    },
                });
                if (!j)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Serviço não encontrado' },
                        { status: 404, headers: r }
                    );
                if (j.unitId && j.unitId !== R)
                    return v.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Este serviço não pertence a esta unidade',
                        },
                        { status: 400, headers: r }
                    );
                if (
                    !(await N.prisma.professionalUnit.findFirst({
                        where: {
                            companyId: i,
                            unitId: R,
                            professionalId: E,
                            isActive: !0,
                        },
                        select: { id: !0 },
                    }))
                )
                    return v.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Profissional não vinculado a esta unidade',
                        },
                        { status: 400, headers: r }
                    );
                if (
                    !(await N.prisma.serviceProfessional.findFirst({
                        where: {
                            companyId: i,
                            professionalId: E,
                            serviceId: A,
                        },
                        select: { id: !0 },
                    }))
                )
                    return v.NextResponse.json(
                        {
                            ok: !1,
                            error: 'Este profissional não executa este serviço',
                        },
                        { status: 400, headers: r }
                    );
                let M = S(j.durationMinutes ?? 0, 30),
                    O = await P({
                        companyId: i,
                        professionalId: E,
                        appointmentId: a,
                        scheduleAt: C,
                        durationMinutes: M,
                    });
                if (O)
                    return v.NextResponse.json(
                        { ok: !1, error: O },
                        { status: 409, headers: r }
                    );
                let _ = j.price ?? new I.Prisma.Decimal(0),
                    D = j.professionalPercentage ?? new I.Prisma.Decimal(0),
                    H = _.mul(D).div(new I.Prisma.Decimal(100)),
                    F = await N.prisma.appointment.updateMany({
                        where: {
                            id: a,
                            companyId: i,
                            clientId: n.sub,
                            status: { not: 'CANCELED' },
                        },
                        data: {
                            scheduleAt: C,
                            unitId: R,
                            serviceId: A,
                            professionalId: E,
                            description: j.name,
                            servicePriceAtTheTime: j.price,
                            professionalPercentageAtTheTime:
                                j.professionalPercentage,
                            professionalEarningValue: H,
                        },
                    });
                if (0 === F.count)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Agendamento não encontrado' },
                        { status: 404, headers: r }
                    );
                let L = await N.prisma.appointment.findFirst({
                    where: { id: a, companyId: i, clientId: n.sub },
                    select: {
                        id: !0,
                        status: !0,
                        scheduleAt: !0,
                        unitId: !0,
                        serviceId: !0,
                        professionalId: !0,
                    },
                });
                return v.NextResponse.json(
                    { ok: !0, appointment: L },
                    { status: 200, headers: r }
                );
            } catch (t) {
                let e = String(t?.message ?? '');
                if (
                    'missing_token' === e ||
                    'missing_company_id' === e ||
                    e.includes('Invalid token payload') ||
                    e.toLowerCase().includes('jwt') ||
                    e.toLowerCase().includes('token') ||
                    e.toLowerCase().includes('signature')
                )
                    return v.NextResponse.json(
                        { ok: !1, error: 'Não autorizado' },
                        { status: 401, headers: r }
                    );
                return (
                    console.error(
                        '[mobile/me/appointments/[id]/edit PATCH] error:',
                        t
                    ),
                    v.NextResponse.json(
                        { ok: !1, error: 'Erro ao remarcar o agendamento' },
                        { status: 500, headers: r }
                    )
                );
            }
        }
        e.s(
            [
                'GET',
                () => M,
                'OPTIONS',
                () => j,
                'PATCH',
                () => O,
                'dynamic',
                0,
                'force-dynamic',
            ],
            455697
        );
        var _ = e.i(455697);
        let D = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/me/appointments/[id]/edit/route',
                    pathname: '/api/mobile/me/appointments/[id]/edit',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/me/appointments/[id]/edit/route.ts',
                nextConfigOutput: 'standalone',
                userland: _,
            }),
            {
                workAsyncStorage: H,
                workUnitAsyncStorage: F,
                serverHooks: L,
            } = D;
        function U() {
            return (0, n.patchFetch)({
                workAsyncStorage: H,
                workUnitAsyncStorage: F,
            });
        }
        async function q(e, t, n) {
            D.isDev &&
                (0, i.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let v = '/api/mobile/me/appointments/[id]/edit/route';
            v = v.replace(/\/index$/, '') || '/';
            let N = await D.prepare(e, t, {
                srcPage: v,
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
                    params: E,
                    nextConfig: I,
                    parsedUrl: C,
                    isDraftMode: x,
                    prerenderManifest: T,
                    routerServerContext: y,
                    isOnDemandRevalidate: b,
                    revalidateOnlyGenerated: k,
                    resolvedPathname: S,
                    clientReferenceManifest: P,
                    serverActionsManifest: j,
                } = N,
                M = (0, l.normalizeAppPath)(v),
                O = !!(T.dynamicRoutes[M] || T.routes[S]),
                _ = async () => (
                    (null == y ? void 0 : y.render404)
                        ? await y.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (O && !x) {
                let e = !!T.routes[S],
                    t = T.dynamicRoutes[M];
                if (t && !1 === t.fallback && !e) {
                    if (I.experimental.adapterPath) return await _();
                    throw new g.NoFallbackError();
                }
            }
            let H = null;
            !O || D.isDev || x || (H = '/index' === (H = S) ? '/' : H);
            let F = !0 === D.isDev || !O,
                L = O && !F;
            j &&
                P &&
                (0, a.setReferenceManifestsSingleton)({
                    page: v,
                    clientReferenceManifest: P,
                    serverActionsManifest: j,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let U = e.method || 'GET',
                q = (0, s.getTracer)(),
                $ = q.getActiveScopeSpan(),
                B = {
                    params: E,
                    prerenderManifest: T,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!I.experimental.authInterrupts,
                        },
                        cacheComponents: !!I.cacheComponents,
                        supportsDynamicResponse: F,
                        incrementalCache: (0, i.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: I.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            D.onRequestError(e, t, n, y),
                    },
                    sharedContext: { buildId: A },
                },
                K = new u.NodeNextRequest(e),
                G = new u.NodeNextResponse(t),
                z = d.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let a = async (e) =>
                        D.handle(z, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = q.getRootSpanAttributes();
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
                                let t = `${U} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${U} ${v}`);
                        }),
                    o = !!(0, i.getRequestMeta)(e, 'minimalMode'),
                    l = async (i) => {
                        var s, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && b && k && !r)
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
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        n.waitUntil &&
                                        (n.waitUntil(l), (l = void 0));
                                    let u = B.renderOpts.collectedTags;
                                    if (!O)
                                        return (
                                            await (0, m.sendResponse)(
                                                K,
                                                G,
                                                s,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await s.blob(),
                                            t = (0,
                                            f.toNodeOutgoingHttpHeaders)(
                                                s.headers
                                            );
                                        (u && (t[w.NEXT_CACHE_TAGS_HEADER] = u),
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
                                                    w.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    w.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
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
                                            (await D.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: v,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: L,
                                                        isOnDemandRevalidate: b,
                                                    }),
                                                },
                                                y
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await D.handleResponse({
                                req: e,
                                nextConfig: I,
                                cacheKey: H,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: T,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: b,
                                revalidateOnlyGenerated: k,
                                responseGenerator: u,
                                waitUntil: n.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!O) return null;
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
                            x &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, f.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (o && O) || c.delete(w.NEXT_CACHE_TAGS_HEADER),
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
                $
                    ? await l($)
                    : await q.withPropagatedContext(e.headers, () =>
                          q.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${U} ${v}`,
                                  kind: s.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': U,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof g.NoFallbackError ||
                        (await D.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: M,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: L,
                                isOnDemandRevalidate: b,
                            }),
                        })),
                    O)
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
                () => U,
                'routeModule',
                () => D,
                'serverHooks',
                () => L,
                'workAsyncStorage',
                () => H,
                'workUnitAsyncStorage',
                () => F,
            ],
            231825
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_f9635b6e.js.map
