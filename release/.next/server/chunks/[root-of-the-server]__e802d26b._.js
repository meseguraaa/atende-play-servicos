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
            let d = (0, r.subtleAlgorithm)(e, s.algorithm);
            try {
                return await crypto.subtle.verify(d, s, i, o);
            } catch {
                return !1;
            }
        }
        var o = e.i(747064),
            s = e.i(468746),
            d = e.i(166278),
            l = e.i(129590),
            c = e.i(30670),
            p = e.i(48414),
            u = e.i(663681);
        async function h(e, r, a) {
            let n, h;
            if (!(0, l.isObject)(e))
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
            if (void 0 !== e.header && !(0, l.isObject)(e.header))
                throw new o.JWSInvalid('JWS Unprotected Header incorrect type');
            let y = {};
            if (e.protected)
                try {
                    let r = (0, t.decode)(e.protected);
                    y = JSON.parse(s.decoder.decode(r));
                } catch {
                    throw new o.JWSInvalid('JWS Protected Header is invalid');
                }
            if (!(0, d.isDisjoint)(y, e.header))
                throw new o.JWSInvalid(
                    'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                );
            let w = { ...y, ...e.header },
                f = (0, p.validateCrit)(
                    o.JWSInvalid,
                    new Map([['b64', !0]]),
                    a?.crit,
                    y,
                    w
                ),
                m = !0;
            if (f.has('b64') && 'boolean' != typeof (m = y.b64))
                throw new o.JWSInvalid(
                    'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                );
            let { alg: g } = w;
            if ('string' != typeof g || !g)
                throw new o.JWSInvalid(
                    'JWS "alg" (Algorithm) Header Parameter missing or invalid'
                );
            let v =
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
            if (v && !v.has(g))
                throw new o.JOSEAlgNotAllowed(
                    '"alg" (Algorithm) Header Parameter value not allowed'
                );
            if (m) {
                if ('string' != typeof e.payload)
                    throw new o.JWSInvalid('JWS Payload must be a string');
            } else if (
                'string' != typeof e.payload &&
                !(e.payload instanceof Uint8Array)
            )
                throw new o.JWSInvalid(
                    'JWS Payload must be a string or an Uint8Array instance'
                );
            let b = !1;
            ('function' == typeof r && ((r = await r(y, e)), (b = !0)),
                (0, c.checkKeyType)(g, r, 'verify'));
            let S = (0, s.concat)(
                void 0 !== e.protected
                    ? (0, s.encode)(e.protected)
                    : new Uint8Array(),
                (0, s.encode)('.'),
                'string' == typeof e.payload
                    ? m
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
            let x = await (0, u.normalizeKey)(r, g);
            if (!(await i(g, x, n, S)))
                throw new o.JWSSignatureVerificationFailed();
            if (m)
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
            let A = { payload: h };
            return (void 0 !== e.protected && (A.protectedHeader = y),
            void 0 !== e.header && (A.unprotectedHeader = e.header),
            b)
                ? { ...A, key: x }
                : A;
        }
        async function y(e, t, r) {
            if (
                (e instanceof Uint8Array && (e = s.decoder.decode(e)),
                'string' != typeof e)
            )
                throw new o.JWSInvalid(
                    'Compact JWS must be a string or Uint8Array'
                );
            let { 0: a, 1: n, 2: i, length: d } = e.split('.');
            if (3 !== d) throw new o.JWSInvalid('Invalid Compact JWS');
            let l = await h({ payload: n, protected: a, signature: i }, t, r),
                c = { payload: l.payload, protectedHeader: l.protectedHeader };
            return 'function' == typeof t ? { ...c, key: l.key } : c;
        }
        var w = e.i(948880);
        async function f(e, t, r) {
            let a = await y(e, t, r);
            if (
                a.protectedHeader.crit?.includes('b64') &&
                !1 === a.protectedHeader.b64
            )
                throw new o.JWTInvalid('JWTs MUST NOT use unencoded payload');
            let n = {
                payload: (0, w.validateClaimsSet)(
                    a.protectedHeader,
                    a.payload,
                    r
                ),
                protectedHeader: a.protectedHeader,
            };
            return 'function' == typeof t ? { ...n, key: a.key } : n;
        }
        e.s(['jwtVerify', () => f], 595504);
    },
    45334,
    (e) => {
        'use strict';
        var t = e.i(716880),
            r = e.i(996646),
            a = e.i(590996),
            n = e.i(704176);
        async function i(e, t, i) {
            let o = await (0, n.getSigKey)(e, t, 'sign');
            return (
                (0, a.checkKeyLength)(e, o),
                new Uint8Array(
                    await crypto.subtle.sign(
                        (0, r.subtleAlgorithm)(e, o.algorithm),
                        o,
                        i
                    )
                )
            );
        }
        var o = e.i(166278),
            s = e.i(747064),
            d = e.i(468746),
            l = e.i(30670),
            c = e.i(48414),
            p = e.i(663681);
        class u {
            #e;
            #t;
            #r;
            constructor(e) {
                if (!(e instanceof Uint8Array))
                    throw TypeError(
                        'payload must be an instance of Uint8Array'
                    );
                this.#e = e;
            }
            setProtectedHeader(e) {
                if (this.#t)
                    throw TypeError(
                        'setProtectedHeader can only be called once'
                    );
                return ((this.#t = e), this);
            }
            setUnprotectedHeader(e) {
                if (this.#r)
                    throw TypeError(
                        'setUnprotectedHeader can only be called once'
                    );
                return ((this.#r = e), this);
            }
            async sign(e, r) {
                let a, n, u, h;
                if (!this.#t && !this.#r)
                    throw new s.JWSInvalid(
                        'either setProtectedHeader or setUnprotectedHeader must be called before #sign()'
                    );
                if (!(0, o.isDisjoint)(this.#t, this.#r))
                    throw new s.JWSInvalid(
                        'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                    );
                let y = { ...this.#t, ...this.#r },
                    w = (0, c.validateCrit)(
                        s.JWSInvalid,
                        new Map([['b64', !0]]),
                        r?.crit,
                        this.#t,
                        y
                    ),
                    f = !0;
                if (w.has('b64') && 'boolean' != typeof (f = this.#t.b64))
                    throw new s.JWSInvalid(
                        'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                    );
                let { alg: m } = y;
                if ('string' != typeof m || !m)
                    throw new s.JWSInvalid(
                        'JWS "alg" (Algorithm) Header Parameter missing or invalid'
                    );
                ((0, l.checkKeyType)(m, e, 'sign'),
                    f
                        ? ((a = (0, t.encode)(this.#e)), (n = (0, d.encode)(a)))
                        : ((n = this.#e), (a = '')),
                    this.#t
                        ? ((u = (0, t.encode)(JSON.stringify(this.#t))),
                          (h = (0, d.encode)(u)))
                        : ((u = ''), (h = new Uint8Array())));
                let g = (0, d.concat)(h, (0, d.encode)('.'), n),
                    v = await (0, p.normalizeKey)(e, m),
                    b = await i(m, v, g),
                    S = { signature: (0, t.encode)(b), payload: a };
                return (
                    this.#r && (S.header = this.#r),
                    this.#t && (S.protected = u),
                    S
                );
            }
        }
        class h {
            #a;
            constructor(e) {
                this.#a = new u(e);
            }
            setProtectedHeader(e) {
                return (this.#a.setProtectedHeader(e), this);
            }
            async sign(e, t) {
                let r = await this.#a.sign(e, t);
                if (void 0 === r.payload)
                    throw TypeError(
                        'use the flattened module for creating JWS with b64: false'
                    );
                return `${r.protected}.${r.payload}.${r.signature}`;
            }
        }
        var y = e.i(948880);
        class w {
            #t;
            #n;
            constructor(e = {}) {
                this.#n = new y.JWTClaimsBuilder(e);
            }
            setIssuer(e) {
                return ((this.#n.iss = e), this);
            }
            setSubject(e) {
                return ((this.#n.sub = e), this);
            }
            setAudience(e) {
                return ((this.#n.aud = e), this);
            }
            setJti(e) {
                return ((this.#n.jti = e), this);
            }
            setNotBefore(e) {
                return ((this.#n.nbf = e), this);
            }
            setExpirationTime(e) {
                return ((this.#n.exp = e), this);
            }
            setIssuedAt(e) {
                return ((this.#n.iat = e), this);
            }
            setProtectedHeader(e) {
                return ((this.#t = e), this);
            }
            async sign(e, t) {
                let r = new h(this.#n.data());
                if (
                    (r.setProtectedHeader(this.#t),
                    Array.isArray(this.#t?.crit) &&
                        this.#t.crit.includes('b64') &&
                        !1 === this.#t.b64)
                )
                    throw new s.JWTInvalid(
                        'JWTs MUST NOT use unencoded payload'
                    );
                return r.sign(e, t);
            }
        }
        e.s(['SignJWT', () => w], 45334);
    },
    453852,
    (e) => {
        'use strict';
        var t = e.i(595504),
            r = e.i(45334);
        function a() {
            let e = process.env.APP_JWT_SECRET;
            if (!e) throw Error('APP_JWT_SECRET não definido no .env');
            return new TextEncoder().encode(e);
        }
        async function n(e) {
            let { payload: r } = await (0, t.jwtVerify)(e, a());
            return r;
        }
        async function i(e, t) {
            let n = t?.expiresIn ?? '30d',
                i = {
                    ...e,
                    sub: e?.sub ? String(e.sub) : e?.sub,
                    role: e?.role,
                    companyId: e?.companyId
                        ? String(e.companyId)
                        : e?.companyId,
                    email: e?.email ? String(e.email) : e?.email,
                    name:
                        e?.name === null || e?.name === void 0
                            ? e?.name
                            : String(e.name),
                    profile_complete:
                        'boolean' == typeof e?.profile_complete
                            ? e.profile_complete
                            : void 0,
                };
            return await new r.SignJWT(i)
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
                .setIssuedAt()
                .setExpirationTime(n)
                .sign(a());
        }
        e.s(['signAppJwt', () => i, 'verifyAppJwt', () => n]);
    },
    772159,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            d = e.i(337047),
            l = e.i(528171),
            c = e.i(367300),
            p = e.i(102610),
            u = e.i(670893),
            h = e.i(902769),
            y = e.i(46094),
            w = e.i(622730),
            f = e.i(811178),
            m = e.i(193695);
        e.i(629399);
        var g = e.i(377404),
            v = e.i(738342),
            b = e.i(698043),
            S = e.i(453852);
        function x() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        function A(e, t) {
            let r = t.toLowerCase();
            for (let [t, a] of e.headers.entries())
                if (t.toLowerCase() === r) {
                    let e = String(a ?? '').trim();
                    return e.length ? e : null;
                }
            return null;
        }
        async function H(e) {
            let t = e.headers.get('authorization') || '',
                r = t.startsWith('Bearer ') ? t.slice(7).trim() : '';
            if (!r) throw Error('missing_token');
            let a = await (0, S.verifyAppJwt)(r),
                n = 'string' == typeof a?.sub ? String(a.sub).trim() : '';
            if (!n) throw Error('invalid_token');
            let i =
                'string' == typeof a?.companyId
                    ? String(a.companyId).trim()
                    : '';
            if (!i) {
                let t = A(e, 'x-company-id');
                t && (i = t);
            }
            if (!i) throw Error('missing_company_id');
            if (
                !(await b.prisma.companyMember.findFirst({
                    where: { userId: n, companyId: i, isActive: !0 },
                    select: { id: !0, role: !0 },
                }))
            )
                throw Error('forbidden_company');
            return { ...a, sub: n, companyId: i };
        }
        async function R() {
            return new v.NextResponse(null, { status: 204, headers: x() });
        }
        async function E(e) {
            let t = x();
            try {
                let r = await H(e),
                    a = r.companyId;
                if (r.role && 'CLIENT' !== r.role)
                    return v.NextResponse.json(
                        { ok: !1, error: 'Sem permissão.' },
                        { status: 403, headers: t }
                    );
                let n = A(e, 'x-company-id');
                if (n && n !== a)
                    return v.NextResponse.json(
                        { ok: !1, error: 'company_id_mismatch' },
                        { status: 400, headers: t }
                    );
                let i = r.sub,
                    o = (
                        await b.prisma.appointment.findMany({
                            where: {
                                companyId: a,
                                clientId: i,
                                status: 'DONE',
                                professionalId: { not: null },
                                review: { is: null },
                                reviewModalShown: !1,
                            },
                            orderBy: [
                                { doneAt: 'desc' },
                                { checkedOutAt: 'desc' },
                                { updatedAt: 'desc' },
                            ],
                            take: 20,
                            select: {
                                id: !0,
                                scheduleAt: !0,
                                updatedAt: !0,
                                doneAt: !0,
                                checkedOutAt: !0,
                                description: !0,
                                professional: { select: { name: !0 } },
                                service: { select: { name: !0 } },
                            },
                        })
                    ).map((e) => {
                        let t;
                        return {
                            appointmentId: e.id,
                            scheduleAt:
                                ((t = new Date(
                                    e?.doneAt ??
                                        e?.checkedOutAt ??
                                        e?.scheduleAt ??
                                        e?.updatedAt ??
                                        Date.now()
                                )),
                                Number.isFinite(t.getTime())
                                    ? t.toISOString()
                                    : new Date().toISOString()),
                            barberName:
                                e.professional?.name?.trim() || 'Profissional',
                            serviceName:
                                e.service?.name?.trim() ||
                                e.description?.trim() ||
                                'Serviço',
                        };
                    }),
                    s = await b.prisma.reviewTag.findMany({
                        where: { companyId: a, isActive: !0 },
                        orderBy: [{ label: 'asc' }],
                        select: { id: !0, label: !0 },
                        take: 50,
                    }),
                    d = v.NextResponse.json(
                        { ok: !0, pendings: o, tags: s, _debug: void 0 },
                        { status: 200, headers: t }
                    );
                return (d.headers.set('x-company-id', a), d);
            } catch (r) {
                let e = String(r?.message ?? '');
                if (e.includes('missing_token'))
                    return v.NextResponse.json(
                        { ok: !1, error: 'missing_token' },
                        { status: 401, headers: t }
                    );
                if (e.includes('missing_company_id'))
                    return v.NextResponse.json(
                        { ok: !1, error: 'missing_company_id' },
                        { status: 401, headers: t }
                    );
                if (e.includes('forbidden_company'))
                    return v.NextResponse.json(
                        { ok: !1, error: 'forbidden_company' },
                        { status: 403, headers: t }
                    );
                if (
                    e.includes('Invalid token') ||
                    e.includes('JWT') ||
                    e.toLowerCase().includes('token') ||
                    e.includes('invalid_token')
                )
                    return v.NextResponse.json(
                        { ok: !1, error: 'invalid_token' },
                        { status: 401, headers: t }
                    );
                return (
                    console.error('[mobile reviews pending] error:', r),
                    v.NextResponse.json(
                        { ok: !1, error: 'server_error' },
                        { status: 500, headers: t }
                    )
                );
            }
        }
        e.s(
            [
                'GET',
                () => E,
                'OPTIONS',
                () => R,
                'dynamic',
                0,
                'force-dynamic',
                'runtime',
                0,
                'nodejs',
            ],
            840797
        );
        var T = e.i(840797);
        let I = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/reviews/pending/route',
                    pathname: '/api/mobile/reviews/pending',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/reviews/pending/route.ts',
                nextConfigOutput: 'standalone',
                userland: T,
            }),
            {
                workAsyncStorage: J,
                workUnitAsyncStorage: W,
                serverHooks: P,
            } = I;
        function C() {
            return (0, a.patchFetch)({
                workAsyncStorage: J,
                workUnitAsyncStorage: W,
            });
        }
        async function k(e, t, a) {
            I.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let v = '/api/mobile/reviews/pending/route';
            v = v.replace(/\/index$/, '') || '/';
            let b = await I.prepare(e, t, {
                srcPage: v,
                multiZoneDraftMode: !1,
            });
            if (!b)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: S,
                    params: x,
                    nextConfig: A,
                    parsedUrl: H,
                    isDraftMode: R,
                    prerenderManifest: E,
                    routerServerContext: T,
                    isOnDemandRevalidate: J,
                    revalidateOnlyGenerated: W,
                    resolvedPathname: P,
                    clientReferenceManifest: C,
                    serverActionsManifest: k,
                } = b,
                j = (0, d.normalizeAppPath)(v),
                _ = !!(E.dynamicRoutes[j] || E.routes[P]),
                N = async () => (
                    (null == T ? void 0 : T.render404)
                        ? await T.render404(e, t, H, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (_ && !R) {
                let e = !!E.routes[P],
                    t = E.dynamicRoutes[j];
                if (t && !1 === t.fallback && !e) {
                    if (A.experimental.adapterPath) return await N();
                    throw new m.NoFallbackError();
                }
            }
            let O = null;
            !_ || I.isDev || R || (O = '/index' === (O = P) ? '/' : O);
            let U = !0 === I.isDev || !_,
                M = _ && !U;
            k &&
                C &&
                (0, o.setReferenceManifestsSingleton)({
                    page: v,
                    clientReferenceManifest: C,
                    serverActionsManifest: k,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: k,
                    }),
                });
            let q = e.method || 'GET',
                D = (0, i.getTracer)(),
                K = D.getActiveScopeSpan(),
                F = {
                    params: x,
                    prerenderManifest: E,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!A.experimental.authInterrupts,
                        },
                        cacheComponents: !!A.cacheComponents,
                        supportsDynamicResponse: U,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: A.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            I.onRequestError(e, t, a, T),
                    },
                    sharedContext: { buildId: S },
                },
                $ = new l.NodeNextRequest(e),
                L = new l.NodeNextResponse(t),
                B = c.NextRequestAdapter.fromNodeNextRequest(
                    $,
                    (0, c.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        I.handle(B, F).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = D.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                p.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = r.get('next.route');
                            if (a) {
                                let t = `${q} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${q} ${v}`);
                        }),
                    s = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    d = async (n) => {
                        var i, d;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && J && W && !r)
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
                                    e.fetchMetrics = F.renderOpts.fetchMetrics;
                                    let d = F.renderOpts.pendingWaitUntil;
                                    d &&
                                        a.waitUntil &&
                                        (a.waitUntil(d), (d = void 0));
                                    let l = F.renderOpts.collectedTags;
                                    if (!_)
                                        return (
                                            await (0, h.sendResponse)(
                                                $,
                                                L,
                                                i,
                                                F.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            y.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (l && (t[f.NEXT_CACHE_TAGS_HEADER] = l),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    F.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    F.renderOpts
                                                        .collectedRevalidate >=
                                                    f.INFINITE_CACHE
                                                ) &&
                                                F.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    F.renderOpts
                                                        .collectedExpire ||
                                                F.renderOpts.collectedExpire >=
                                                    f.INFINITE_CACHE
                                                    ? void 0
                                                    : F.renderOpts
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
                                                revalidate: r,
                                                expire: a,
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
                                                    routePath: v,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    u.getRevalidateReason)({
                                                        isStaticGeneration: M,
                                                        isOnDemandRevalidate: J,
                                                    }),
                                                },
                                                T
                                            )),
                                        t
                                    );
                                }
                            },
                            c = await I.handleResponse({
                                req: e,
                                nextConfig: A,
                                cacheKey: O,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: E,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: J,
                                revalidateOnlyGenerated: W,
                                responseGenerator: l,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!_) return null;
                        if (
                            (null == c || null == (i = c.value)
                                ? void 0
                                : i.kind) !== g.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == c || null == (d = c.value) ? void 0 : d.kind}`
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
                                J
                                    ? 'REVALIDATED'
                                    : c.isMiss
                                      ? 'MISS'
                                      : c.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            R &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, y.fromNodeOutgoingHttpHeaders)(
                            c.value.headers
                        );
                        return (
                            (s && _) || p.delete(f.NEXT_CACHE_TAGS_HEADER),
                            !c.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, w.getCacheControlHeader)(c.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                $,
                                L,
                                new Response(c.value.body, {
                                    headers: p,
                                    status: c.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                K
                    ? await d(K)
                    : await D.withPropagatedContext(e.headers, () =>
                          D.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${q} ${v}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': q,
                                      'http.target': e.url,
                                  },
                              },
                              d
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof m.NoFallbackError ||
                        (await I.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: j,
                            routeType: 'route',
                            revalidateReason: (0, u.getRevalidateReason)({
                                isStaticGeneration: M,
                                isOnDemandRevalidate: J,
                            }),
                        })),
                    _)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
                        $,
                        L,
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
                () => C,
                'routeModule',
                () => I,
                'serverHooks',
                () => P,
                'workAsyncStorage',
                () => J,
                'workUnitAsyncStorage',
                () => W,
            ],
            772159
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e802d26b._.js.map
