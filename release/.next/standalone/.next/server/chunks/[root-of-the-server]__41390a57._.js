module.exports = [
    698043,
    (e) => {
        'use strict';
        var t = e.i(29173);
        let r = globalThis.prisma ?? new t.PrismaClient({ log: ['error'] });
        e.s(['prisma', 0, r]);
    },
    29173,
    (e, t, r) => {
        t.exports = e.x('@prisma/client', () => require('@prisma/client'));
    },
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
    270406,
    (e, t, r) => {
        t.exports = e.x('next/dist/compiled/@opentelemetry/api', () =>
            require('next/dist/compiled/@opentelemetry/api')
        );
    },
    193695,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/shared/lib/no-fallback-error.external.js',
            () => require('next/dist/shared/lib/no-fallback-error.external.js')
        );
    },
    595504,
    (e) => {
        'use strict';
        var t = e.i(716880),
            r = e.i(996646),
            a = e.i(590996),
            n = e.i(704176);
        async function i(e, t, i, o) {
            let s = await (0, n.getSigKey)(e, t, 'verify');
            (0, a.checkKeyLength)(e, s);
            let l = (0, r.subtleAlgorithm)(e, s.algorithm);
            try {
                return await crypto.subtle.verify(l, s, i, o);
            } catch {
                return !1;
            }
        }
        var o = e.i(747064),
            s = e.i(468746),
            l = e.i(166278),
            d = e.i(129590),
            c = e.i(30670),
            u = e.i(48414),
            p = e.i(663681);
        async function h(e, r, a) {
            let n, h;
            if (!(0, d.isObject)(e))
                throw new o.JWSInvalid('Flattened JWS must be an object');
            if (void 0 === e.protected && void 0 === e.header)
                throw new o.JWSInvalid(
                    'Flattened JWS must have either of the "protected" or "header" members'
                );
            if (void 0 !== e.protected && 'string' != typeof e.protected)
                throw new o.JWSInvalid('JWS Protected Header incorrect type');
            if (void 0 === e.payload)
                throw new o.JWSInvalid('JWS Payload missing');
            if ('string' != typeof e.signature)
                throw new o.JWSInvalid(
                    'JWS Signature missing or incorrect type'
                );
            if (void 0 !== e.header && !(0, d.isObject)(e.header))
                throw new o.JWSInvalid('JWS Unprotected Header incorrect type');
            let f = {};
            if (e.protected)
                try {
                    let r = (0, t.decode)(e.protected);
                    f = JSON.parse(s.decoder.decode(r));
                } catch {
                    throw new o.JWSInvalid('JWS Protected Header is invalid');
                }
            if (!(0, l.isDisjoint)(f, e.header))
                throw new o.JWSInvalid(
                    'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                );
            let m = { ...f, ...e.header },
                y = (0, u.validateCrit)(
                    o.JWSInvalid,
                    new Map([['b64', !0]]),
                    a?.crit,
                    f,
                    m
                ),
                v = !0;
            if (y.has('b64') && 'boolean' != typeof (v = f.b64))
                throw new o.JWSInvalid(
                    'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                );
            let { alg: w } = m;
            if ('string' != typeof w || !w)
                throw new o.JWSInvalid(
                    'JWS "alg" (Algorithm) Header Parameter missing or invalid'
                );
            let g =
                a &&
                (function (e, t) {
                    if (
                        void 0 !== t &&
                        (!Array.isArray(t) ||
                            t.some((e) => 'string' != typeof e))
                    )
                        throw TypeError(
                            `"${e}" option must be an array of strings`
                        );
                    if (t) return new Set(t);
                })('algorithms', a.algorithms);
            if (g && !g.has(w))
                throw new o.JOSEAlgNotAllowed(
                    '"alg" (Algorithm) Header Parameter value not allowed'
                );
            if (v) {
                if ('string' != typeof e.payload)
                    throw new o.JWSInvalid('JWS Payload must be a string');
            } else if (
                'string' != typeof e.payload &&
                !(e.payload instanceof Uint8Array)
            )
                throw new o.JWSInvalid(
                    'JWS Payload must be a string or an Uint8Array instance'
                );
            let x = !1;
            ('function' == typeof r && ((r = await r(f, e)), (x = !0)),
                (0, c.checkKeyType)(w, r, 'verify'));
            let S = (0, s.concat)(
                void 0 !== e.protected
                    ? (0, s.encode)(e.protected)
                    : new Uint8Array(),
                (0, s.encode)('.'),
                'string' == typeof e.payload
                    ? v
                        ? (0, s.encode)(e.payload)
                        : s.encoder.encode(e.payload)
                    : e.payload
            );
            try {
                n = (0, t.decode)(e.signature);
            } catch {
                throw new o.JWSInvalid(
                    'Failed to base64url decode the signature'
                );
            }
            let R = await (0, p.normalizeKey)(r, w);
            if (!(await i(w, R, n, S)))
                throw new o.JWSSignatureVerificationFailed();
            if (v)
                try {
                    h = (0, t.decode)(e.payload);
                } catch {
                    throw new o.JWSInvalid(
                        'Failed to base64url decode the payload'
                    );
                }
            else
                h =
                    'string' == typeof e.payload
                        ? s.encoder.encode(e.payload)
                        : e.payload;
            let b = { payload: h };
            return (void 0 !== e.protected && (b.protectedHeader = f),
            void 0 !== e.header && (b.unprotectedHeader = e.header),
            x)
                ? { ...b, key: R }
                : b;
        }
        async function f(e, t, r) {
            if (
                (e instanceof Uint8Array && (e = s.decoder.decode(e)),
                'string' != typeof e)
            )
                throw new o.JWSInvalid(
                    'Compact JWS must be a string or Uint8Array'
                );
            let { 0: a, 1: n, 2: i, length: l } = e.split('.');
            if (3 !== l) throw new o.JWSInvalid('Invalid Compact JWS');
            let d = await h({ payload: n, protected: a, signature: i }, t, r),
                c = { payload: d.payload, protectedHeader: d.protectedHeader };
            return 'function' == typeof t ? { ...c, key: d.key } : c;
        }
        var m = e.i(948880);
        async function y(e, t, r) {
            let a = await f(e, t, r);
            if (
                a.protectedHeader.crit?.includes('b64') &&
                !1 === a.protectedHeader.b64
            )
                throw new o.JWTInvalid('JWTs MUST NOT use unencoded payload');
            let n = {
                payload: (0, m.validateClaimsSet)(
                    a.protectedHeader,
                    a.payload,
                    r
                ),
                protectedHeader: a.protectedHeader,
            };
            return 'function' == typeof t ? { ...n, key: a.key } : n;
        }
        e.s(['jwtVerify', () => y], 595504);
    },
    681996,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            c = e.i(367300),
            u = e.i(102610),
            p = e.i(670893),
            h = e.i(902769),
            f = e.i(46094),
            m = e.i(622730),
            y = e.i(811178),
            v = e.i(193695);
        e.i(629399);
        var w = e.i(377404),
            g = e.i(738342),
            x = e.i(595504),
            S = e.i(698043);
        function R() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            };
        }
        async function b(e) {
            let t = e.headers.get('authorization') || '',
                r = t.startsWith('Bearer ') ? t.slice(7).trim() : '';
            if (!r) throw Error('Token ausente');
            let { payload: a } = await (0, x.jwtVerify)(
                    r,
                    (function () {
                        let e = process.env.APP_JWT_SECRET;
                        if (!e)
                            throw Error('APP_JWT_SECRET não definido no .env');
                        return new TextEncoder().encode(e);
                    })()
                ),
                n = String(a?.sub || '').trim();
            if (!n) throw Error('Token inválido');
            let i =
                'string' == typeof a?.companyId
                    ? String(a.companyId).trim()
                    : '';
            if (!i) throw Error('companyId ausente no token');
            return { sub: n, role: a.role, companyId: i };
        }
        function A(e) {
            if (null == e) return 0;
            if ('number' == typeof e) return e;
            if ('function' == typeof e?.toNumber) return e.toNumber();
            try {
                let t =
                        'function' == typeof e?.toString
                            ? String(e.toString())
                            : '',
                    r = Number(t.replace(',', '.'));
                return Number.isFinite(r) ? r : 0;
            } catch {
                let t = Number(e);
                return Number.isFinite(t) ? t : 0;
            }
        }
        function E(e) {
            let t = A(e);
            try {
                return t.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });
            } catch {
                return `R$ ${t.toFixed(2)}`.replace('.', ',');
            }
        }
        async function I() {
            return new g.NextResponse(null, { status: 204, headers: R() });
        }
        async function P(e) {
            try {
                let t = (await b(e)).companyId,
                    r = new URL(e.url),
                    a = String(r.searchParams.get('unitId') || '').trim(),
                    n =
                        String(
                            r.searchParams.get('professionalId') || ''
                        ).trim() ||
                        String(r.searchParams.get('barberId') || '').trim();
                if (!a)
                    return g.NextResponse.json(
                        { error: 'unitId é obrigatório' },
                        { status: 400, headers: R() }
                    );
                if (
                    !(await S.prisma.unit.findFirst({
                        where: { id: a, companyId: t, isActive: !0 },
                        select: { id: !0 },
                    }))
                )
                    return g.NextResponse.json(
                        { error: 'Unidade inválida' },
                        { status: 404, headers: R() }
                    );
                if (n) {
                    if (
                        !(await S.prisma.professional.findFirst({
                            where: { id: n, companyId: t, isActive: !0 },
                            select: { id: !0 },
                        }))
                    )
                        return g.NextResponse.json(
                            { error: 'Profissional inválido' },
                            { status: 404, headers: R() }
                        );
                    if (
                        !(await S.prisma.professionalUnit.findFirst({
                            where: {
                                companyId: t,
                                unitId: a,
                                professionalId: n,
                                isActive: !0,
                            },
                            select: { id: !0 },
                        }))
                    )
                        return g.NextResponse.json(
                            { ok: !0, services: [] },
                            { status: 200, headers: R() }
                        );
                    let e = await S.prisma.serviceProfessional.findMany({
                            where: {
                                companyId: t,
                                professionalId: n,
                                service: { companyId: t, isActive: !0 },
                            },
                            select: { serviceId: !0 },
                        }),
                        r = Array.from(new Set(e.map((e) => e.serviceId)))
                            .filter(Boolean)
                            .map((e) => String(e));
                    if (0 === r.length)
                        return g.NextResponse.json(
                            { ok: !0, services: [] },
                            { status: 200, headers: R() }
                        );
                    let i = (
                        await S.prisma.service.findMany({
                            where: {
                                companyId: t,
                                id: { in: r },
                                isActive: !0,
                                unitId: a,
                            },
                            orderBy: { name: 'asc' },
                            select: {
                                id: !0,
                                name: !0,
                                durationMinutes: !0,
                                price: !0,
                                cancelFeePercentage: !0,
                                cancelLimitHours: !0,
                            },
                        })
                    ).map((e) => ({
                        id: e.id,
                        name: e.name,
                        durationMinutes: e.durationMinutes ?? 0,
                        priceLabel: E(e.price),
                        price: A(e.price),
                        cancelFeePercentage:
                            null == e.cancelFeePercentage
                                ? null
                                : A(e.cancelFeePercentage),
                        cancelLimitHours: e.cancelLimitHours ?? null,
                    }));
                    return g.NextResponse.json(
                        { ok: !0, services: i },
                        { status: 200, headers: R() }
                    );
                }
                let i = await S.prisma.professionalUnit.findMany({
                        where: {
                            companyId: t,
                            unitId: a,
                            isActive: !0,
                            professional: { companyId: t, isActive: !0 },
                        },
                        select: { professionalId: !0 },
                    }),
                    o = Array.from(new Set(i.map((e) => e.professionalId)))
                        .filter(Boolean)
                        .map((e) => String(e));
                if (0 === o.length)
                    return g.NextResponse.json(
                        { ok: !0, services: [] },
                        { status: 200, headers: R() }
                    );
                let s = await S.prisma.serviceProfessional.findMany({
                        where: {
                            companyId: t,
                            professionalId: { in: o },
                            service: { companyId: t, isActive: !0 },
                        },
                        select: { serviceId: !0 },
                    }),
                    l = Array.from(new Set(s.map((e) => e.serviceId)))
                        .filter(Boolean)
                        .map((e) => String(e));
                if (0 === l.length)
                    return g.NextResponse.json(
                        { ok: !0, services: [] },
                        { status: 200, headers: R() }
                    );
                let d = (
                    await S.prisma.service.findMany({
                        where: {
                            companyId: t,
                            id: { in: l },
                            isActive: !0,
                            unitId: a,
                        },
                        orderBy: { name: 'asc' },
                        select: {
                            id: !0,
                            name: !0,
                            durationMinutes: !0,
                            price: !0,
                            cancelFeePercentage: !0,
                            cancelLimitHours: !0,
                        },
                    })
                ).map((e) => ({
                    id: e.id,
                    name: e.name,
                    durationMinutes: e.durationMinutes ?? 0,
                    priceLabel: E(e.price),
                    price: A(e.price),
                    cancelFeePercentage:
                        null == e.cancelFeePercentage
                            ? null
                            : A(e.cancelFeePercentage),
                    cancelLimitHours: e.cancelLimitHours ?? null,
                }));
                return g.NextResponse.json(
                    { ok: !0, services: d },
                    { status: 200, headers: R() }
                );
            } catch (t) {
                let e = String(t?.message ?? 'Não autorizado').toLowerCase();
                if (
                    e.includes('token') ||
                    e.includes('jwt') ||
                    e.includes('signature') ||
                    e.includes('companyid')
                )
                    return g.NextResponse.json(
                        { error: 'Não autorizado' },
                        { status: 401, headers: R() }
                    );
                return (
                    console.error('[mobile/services] error:', t),
                    g.NextResponse.json(
                        { error: 'Erro ao listar serviços' },
                        { status: 500, headers: R() }
                    )
                );
            }
        }
        e.s(['GET', () => P, 'OPTIONS', () => I], 795014);
        var N = e.i(795014);
        let C = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/services/route',
                    pathname: '/api/mobile/services',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/services/route.ts',
                nextConfigOutput: 'standalone',
                userland: N,
            }),
            {
                workAsyncStorage: T,
                workUnitAsyncStorage: H,
                serverHooks: W,
            } = C;
        function k() {
            return (0, a.patchFetch)({
                workAsyncStorage: T,
                workUnitAsyncStorage: H,
            });
        }
        async function J(e, t, a) {
            C.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let g = '/api/mobile/services/route';
            g = g.replace(/\/index$/, '') || '/';
            let x = await C.prepare(e, t, {
                srcPage: g,
                multiZoneDraftMode: !1,
            });
            if (!x)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: S,
                    params: R,
                    nextConfig: b,
                    parsedUrl: A,
                    isDraftMode: E,
                    prerenderManifest: I,
                    routerServerContext: P,
                    isOnDemandRevalidate: N,
                    revalidateOnlyGenerated: T,
                    resolvedPathname: H,
                    clientReferenceManifest: W,
                    serverActionsManifest: k,
                } = x,
                J = (0, l.normalizeAppPath)(g),
                j = !!(I.dynamicRoutes[J] || I.routes[H]),
                O = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (j && !E) {
                let e = !!I.routes[H],
                    t = I.dynamicRoutes[J];
                if (t && !1 === t.fallback && !e) {
                    if (b.experimental.adapterPath) return await O();
                    throw new v.NoFallbackError();
                }
            }
            let M = null;
            !j || C.isDev || E || (M = '/index' === (M = H) ? '/' : M);
            let U = !0 === C.isDev || !j,
                F = j && !U;
            k &&
                W &&
                (0, o.setReferenceManifestsSingleton)({
                    page: g,
                    clientReferenceManifest: W,
                    serverActionsManifest: k,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: k,
                    }),
                });
            let _ = e.method || 'GET',
                q = (0, i.getTracer)(),
                L = q.getActiveScopeSpan(),
                D = {
                    params: R,
                    prerenderManifest: I,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!b.experimental.authInterrupts,
                        },
                        cacheComponents: !!b.cacheComponents,
                        supportsDynamicResponse: U,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: b.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            C.onRequestError(e, t, a, P),
                    },
                    sharedContext: { buildId: S },
                },
                B = new d.NodeNextRequest(e),
                K = new d.NodeNextResponse(t),
                $ = c.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, c.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        C.handle($, D).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = q.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                u.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = r.get('next.route');
                            if (a) {
                                let t = `${_} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${_} ${g}`);
                        }),
                    s = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && N && T && !r)
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
                                    let i = await o(n);
                                    e.fetchMetrics = D.renderOpts.fetchMetrics;
                                    let l = D.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let d = D.renderOpts.collectedTags;
                                    if (!j)
                                        return (
                                            await (0, h.sendResponse)(
                                                B,
                                                K,
                                                i,
                                                D.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            f.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (d && (t[y.NEXT_CACHE_TAGS_HEADER] = d),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    D.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    D.renderOpts
                                                        .collectedRevalidate >=
                                                    y.INFINITE_CACHE
                                                ) &&
                                                D.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    D.renderOpts
                                                        .collectedExpire ||
                                                D.renderOpts.collectedExpire >=
                                                    y.INFINITE_CACHE
                                                    ? void 0
                                                    : D.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: w.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: i.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: r,
                                                expire: a,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await C.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: g,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: F,
                                                        isOnDemandRevalidate: N,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            c = await C.handleResponse({
                                req: e,
                                nextConfig: b,
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: I,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: N,
                                revalidateOnlyGenerated: T,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!j) return null;
                        if (
                            (null == c || null == (i = c.value)
                                ? void 0
                                : i.kind) !== w.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == c || null == (l = c.value) ? void 0 : l.kind}`
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
                                N
                                    ? 'REVALIDATED'
                                    : c.isMiss
                                      ? 'MISS'
                                      : c.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            E &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let u = (0, f.fromNodeOutgoingHttpHeaders)(
                            c.value.headers
                        );
                        return (
                            (s && j) || u.delete(y.NEXT_CACHE_TAGS_HEADER),
                            !c.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                u.get('Cache-Control') ||
                                u.set(
                                    'Cache-Control',
                                    (0, m.getCacheControlHeader)(c.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                B,
                                K,
                                new Response(c.value.body, {
                                    headers: u,
                                    status: c.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                L
                    ? await l(L)
                    : await q.withPropagatedContext(e.headers, () =>
                          q.trace(
                              u.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${_} ${g}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': _,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof v.NoFallbackError ||
                        (await C.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: J,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: F,
                                isOnDemandRevalidate: N,
                            }),
                        })),
                    j)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
                        B,
                        K,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => J,
                'patchFetch',
                () => k,
                'routeModule',
                () => C,
                'serverHooks',
                () => W,
                'workAsyncStorage',
                () => T,
                'workUnitAsyncStorage',
                () => H,
            ],
            681996
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__41390a57._.js.map
