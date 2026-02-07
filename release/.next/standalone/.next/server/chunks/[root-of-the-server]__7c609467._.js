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
            i = e.i(704176);
        async function n(e, t, n, o) {
            let s = await (0, i.getSigKey)(e, t, 'verify');
            (0, a.checkKeyLength)(e, s);
            let d = (0, r.subtleAlgorithm)(e, s.algorithm);
            try {
                return await crypto.subtle.verify(d, s, n, o);
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
            let i, h;
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
            let f = { ...y, ...e.header },
                w = (0, p.validateCrit)(
                    o.JWSInvalid,
                    new Map([['b64', !0]]),
                    a?.crit,
                    y,
                    f
                ),
                m = !0;
            if (w.has('b64') && 'boolean' != typeof (m = y.b64))
                throw new o.JWSInvalid(
                    'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                );
            let { alg: v } = f;
            if ('string' != typeof v || !v)
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
            if (g && !g.has(v))
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
                (0, c.checkKeyType)(v, r, 'verify'));
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
                i = (0, t.decode)(e.signature);
            } catch {
                throw new o.JWSInvalid(
                    'Failed to base64url decode the signature'
                );
            }
            let x = await (0, u.normalizeKey)(r, v);
            if (!(await n(v, x, i, S)))
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
            let H = { payload: h };
            return (void 0 !== e.protected && (H.protectedHeader = y),
            void 0 !== e.header && (H.unprotectedHeader = e.header),
            b)
                ? { ...H, key: x }
                : H;
        }
        async function y(e, t, r) {
            if (
                (e instanceof Uint8Array && (e = s.decoder.decode(e)),
                'string' != typeof e)
            )
                throw new o.JWSInvalid(
                    'Compact JWS must be a string or Uint8Array'
                );
            let { 0: a, 1: i, 2: n, length: d } = e.split('.');
            if (3 !== d) throw new o.JWSInvalid('Invalid Compact JWS');
            let l = await h({ payload: i, protected: a, signature: n }, t, r),
                c = { payload: l.payload, protectedHeader: l.protectedHeader };
            return 'function' == typeof t ? { ...c, key: l.key } : c;
        }
        var f = e.i(948880);
        async function w(e, t, r) {
            let a = await y(e, t, r);
            if (
                a.protectedHeader.crit?.includes('b64') &&
                !1 === a.protectedHeader.b64
            )
                throw new o.JWTInvalid('JWTs MUST NOT use unencoded payload');
            let i = {
                payload: (0, f.validateClaimsSet)(
                    a.protectedHeader,
                    a.payload,
                    r
                ),
                protectedHeader: a.protectedHeader,
            };
            return 'function' == typeof t ? { ...i, key: a.key } : i;
        }
        e.s(['jwtVerify', () => w], 595504);
    },
    45334,
    (e) => {
        'use strict';
        var t = e.i(716880),
            r = e.i(996646),
            a = e.i(590996),
            i = e.i(704176);
        async function n(e, t, n) {
            let o = await (0, i.getSigKey)(e, t, 'sign');
            return (
                (0, a.checkKeyLength)(e, o),
                new Uint8Array(
                    await crypto.subtle.sign(
                        (0, r.subtleAlgorithm)(e, o.algorithm),
                        o,
                        n
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
                let a, i, u, h;
                if (!this.#t && !this.#r)
                    throw new s.JWSInvalid(
                        'either setProtectedHeader or setUnprotectedHeader must be called before #sign()'
                    );
                if (!(0, o.isDisjoint)(this.#t, this.#r))
                    throw new s.JWSInvalid(
                        'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                    );
                let y = { ...this.#t, ...this.#r },
                    f = (0, c.validateCrit)(
                        s.JWSInvalid,
                        new Map([['b64', !0]]),
                        r?.crit,
                        this.#t,
                        y
                    ),
                    w = !0;
                if (f.has('b64') && 'boolean' != typeof (w = this.#t.b64))
                    throw new s.JWSInvalid(
                        'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                    );
                let { alg: m } = y;
                if ('string' != typeof m || !m)
                    throw new s.JWSInvalid(
                        'JWS "alg" (Algorithm) Header Parameter missing or invalid'
                    );
                ((0, l.checkKeyType)(m, e, 'sign'),
                    w
                        ? ((a = (0, t.encode)(this.#e)), (i = (0, d.encode)(a)))
                        : ((i = this.#e), (a = '')),
                    this.#t
                        ? ((u = (0, t.encode)(JSON.stringify(this.#t))),
                          (h = (0, d.encode)(u)))
                        : ((u = ''), (h = new Uint8Array())));
                let v = (0, d.concat)(h, (0, d.encode)('.'), i),
                    g = await (0, p.normalizeKey)(e, m),
                    b = await n(m, g, v),
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
        class f {
            #t;
            #i;
            constructor(e = {}) {
                this.#i = new y.JWTClaimsBuilder(e);
            }
            setIssuer(e) {
                return ((this.#i.iss = e), this);
            }
            setSubject(e) {
                return ((this.#i.sub = e), this);
            }
            setAudience(e) {
                return ((this.#i.aud = e), this);
            }
            setJti(e) {
                return ((this.#i.jti = e), this);
            }
            setNotBefore(e) {
                return ((this.#i.nbf = e), this);
            }
            setExpirationTime(e) {
                return ((this.#i.exp = e), this);
            }
            setIssuedAt(e) {
                return ((this.#i.iat = e), this);
            }
            setProtectedHeader(e) {
                return ((this.#t = e), this);
            }
            async sign(e, t) {
                let r = new h(this.#i.data());
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
        e.s(['SignJWT', () => f], 45334);
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
        async function i(e) {
            let { payload: r } = await (0, t.jwtVerify)(e, a());
            return r;
        }
        async function n(e, t) {
            let i = t?.expiresIn ?? '30d',
                n = {
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
            return await new r.SignJWT(n)
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
                .setIssuedAt()
                .setExpirationTime(i)
                .sign(a());
        }
        e.s(['signAppJwt', () => n, 'verifyAppJwt', () => i]);
    },
    254799,
    (e, t, r) => {
        t.exports = e.x('crypto', () => require('crypto'));
    },
    702876,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            i = e.i(821498),
            n = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            d = e.i(337047),
            l = e.i(528171),
            c = e.i(367300),
            p = e.i(102610),
            u = e.i(670893),
            h = e.i(902769),
            y = e.i(46094),
            f = e.i(622730),
            w = e.i(811178),
            m = e.i(193695);
        e.i(629399);
        var v = e.i(377404),
            g = e.i(738342),
            b = e.i(698043),
            S = e.i(735796),
            x = e.i(453852);
        function H() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        function A(e, t = 400, r) {
            return g.NextResponse.json(
                { ok: !1, error: e },
                { status: t, headers: r }
            );
        }
        function R(e) {
            return String(e ?? '').trim();
        }
        function T(e, t) {
            let r = t.toLowerCase();
            for (let [t, a] of e.headers.entries())
                if (t.toLowerCase() === r) {
                    let e = String(a ?? '').trim();
                    return e.length ? e : null;
                }
            return null;
        }
        async function E() {
            return new g.NextResponse(null, { status: 204, headers: H() });
        }
        async function I(e) {
            let t = H();
            try {
                var r, a;
                let i,
                    n,
                    o = await e.json().catch(() => null);
                if (!o || 'object' != typeof o)
                    return A('Body inválido', 400, t);
                let s = ((r = o.email), R(r).toLowerCase()),
                    d = R(o.password),
                    l = R(o.companyId),
                    c = T(e, 'x-company-id') || T(e, 'x-companyid') || null,
                    p = l || c || '';
                if (!p) return A('companyId é obrigatório', 400, t);
                if (!s || !s.includes('@')) return A('Email inválido', 400, t);
                if (!d) return A('Senha é obrigatória', 400, t);
                let u = await b.prisma.company.findUnique({
                    where: { id: p },
                    select: { id: !0, isActive: !0 },
                });
                if (!u || !u.isActive)
                    return A('Empresa inválida ou inativa', 400, t);
                let h = await b.prisma.user.findUnique({
                    where: { email: s },
                    select: {
                        id: !0,
                        name: !0,
                        email: !0,
                        phone: !0,
                        birthday: !0,
                        role: !0,
                        isActive: !0,
                        passwordHash: !0,
                        image: !0,
                    },
                });
                if (!h || !h.isActive || !h.passwordHash)
                    return A('Credenciais inválidas', 401, t);
                let y = await b.prisma.companyMember.findUnique({
                    where: { companyId_userId: { companyId: p, userId: h.id } },
                    select: { id: !0, isActive: !0, role: !0, lastUnitId: !0 },
                });
                if (
                    !y ||
                    !y.isActive ||
                    !(await S.default.compare(d, h.passwordHash))
                )
                    return A('Credenciais inválidas', 401, t);
                let f =
                        ((a = {
                            phone: h.phone ?? null,
                            birthday: h.birthday ?? null,
                        }),
                        (i =
                            'string' == typeof a.phone &&
                            a.phone.trim().length > 0),
                        (n =
                            a.birthday instanceof Date &&
                            !Number.isNaN(a.birthday.getTime())),
                        i && n),
                    w = await (0, x.signAppJwt)({
                        sub: h.id,
                        role: h.role ?? 'CLIENT',
                        companyId: p,
                        email: h.email,
                        name: h.name ?? null,
                        profile_complete: f,
                    });
                return (function (e, t = 200, r) {
                    return g.NextResponse.json(
                        { ok: !0, data: e },
                        { status: t, headers: r }
                    );
                })(
                    {
                        token: w,
                        user: {
                            id: h.id,
                            name: h.name,
                            email: h.email,
                            phone: h.phone,
                            birthday: h.birthday,
                            role: h.role,
                            image: h.image,
                            companyId: p,
                            memberRole: y.role,
                            lastUnitId: y.lastUnitId ?? null,
                            profileComplete: f,
                        },
                    },
                    200,
                    t
                );
            } catch (e) {
                return (
                    console.error('[mobile auth/login]', e),
                    A('Erro inesperado ao fazer login', 500, t)
                );
            }
        }
        e.s(
            [
                'OPTIONS',
                () => E,
                'POST',
                () => I,
                'dynamic',
                0,
                'force-dynamic',
            ],
            581228
        );
        var J = e.i(581228);
        let C = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/auth/route',
                    pathname: '/api/mobile/auth',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath: '[project]/src/app/api/mobile/auth/route.ts',
                nextConfigOutput: 'standalone',
                userland: J,
            }),
            {
                workAsyncStorage: P,
                workUnitAsyncStorage: W,
                serverHooks: j,
            } = C;
        function U() {
            return (0, a.patchFetch)({
                workAsyncStorage: P,
                workUnitAsyncStorage: W,
            });
        }
        async function N(e, t, a) {
            C.isDev &&
                (0, i.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let g = '/api/mobile/auth/route';
            g = g.replace(/\/index$/, '') || '/';
            let b = await C.prepare(e, t, {
                srcPage: g,
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
                    nextConfig: H,
                    parsedUrl: A,
                    isDraftMode: R,
                    prerenderManifest: T,
                    routerServerContext: E,
                    isOnDemandRevalidate: I,
                    revalidateOnlyGenerated: J,
                    resolvedPathname: P,
                    clientReferenceManifest: W,
                    serverActionsManifest: j,
                } = b,
                U = (0, d.normalizeAppPath)(g),
                N = !!(T.dynamicRoutes[U] || T.routes[P]),
                O = async () => (
                    (null == E ? void 0 : E.render404)
                        ? await E.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (N && !R) {
                let e = !!T.routes[P],
                    t = T.dynamicRoutes[U];
                if (t && !1 === t.fallback && !e) {
                    if (H.experimental.adapterPath) return await O();
                    throw new m.NoFallbackError();
                }
            }
            let k = null;
            !N || C.isDev || R || (k = '/index' === (k = P) ? '/' : k);
            let _ = !0 === C.isDev || !N,
                q = N && !_;
            j &&
                W &&
                (0, o.setReferenceManifestsSingleton)({
                    page: g,
                    clientReferenceManifest: W,
                    serverActionsManifest: j,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let M = e.method || 'GET',
                D = (0, n.getTracer)(),
                K = D.getActiveScopeSpan(),
                F = {
                    params: x,
                    prerenderManifest: T,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!H.experimental.authInterrupts,
                        },
                        cacheComponents: !!H.cacheComponents,
                        supportsDynamicResponse: _,
                        incrementalCache: (0, i.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: H.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            C.onRequestError(e, t, a, E),
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
                        C.handle(B, F).finally(() => {
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
                                let t = `${M} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${M} ${g}`);
                        }),
                    s = !!(0, i.getRequestMeta)(e, 'minimalMode'),
                    d = async (i) => {
                        var n, d;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && I && J && !r)
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
                                    let n = await o(i);
                                    e.fetchMetrics = F.renderOpts.fetchMetrics;
                                    let d = F.renderOpts.pendingWaitUntil;
                                    d &&
                                        a.waitUntil &&
                                        (a.waitUntil(d), (d = void 0));
                                    let l = F.renderOpts.collectedTags;
                                    if (!N)
                                        return (
                                            await (0, h.sendResponse)(
                                                $,
                                                L,
                                                n,
                                                F.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await n.blob(),
                                            t = (0,
                                            y.toNodeOutgoingHttpHeaders)(
                                                n.headers
                                            );
                                        (l && (t[w.NEXT_CACHE_TAGS_HEADER] = l),
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
                                                    w.INFINITE_CACHE
                                                ) &&
                                                F.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    F.renderOpts
                                                        .collectedExpire ||
                                                F.renderOpts.collectedExpire >=
                                                    w.INFINITE_CACHE
                                                    ? void 0
                                                    : F.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: v.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: n.status,
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
                                                    u.getRevalidateReason)({
                                                        isStaticGeneration: q,
                                                        isOnDemandRevalidate: I,
                                                    }),
                                                },
                                                E
                                            )),
                                        t
                                    );
                                }
                            },
                            c = await C.handleResponse({
                                req: e,
                                nextConfig: H,
                                cacheKey: k,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: T,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: I,
                                revalidateOnlyGenerated: J,
                                responseGenerator: l,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!N) return null;
                        if (
                            (null == c || null == (n = c.value)
                                ? void 0
                                : n.kind) !== v.CachedRouteKind.APP_ROUTE
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
                                I
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
                            (s && N) || p.delete(w.NEXT_CACHE_TAGS_HEADER),
                            !c.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(c.cacheControl)
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
                                  spanName: `${M} ${g}`,
                                  kind: n.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': M,
                                      'http.target': e.url,
                                  },
                              },
                              d
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof m.NoFallbackError ||
                        (await C.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: U,
                            routeType: 'route',
                            revalidateReason: (0, u.getRevalidateReason)({
                                isStaticGeneration: q,
                                isOnDemandRevalidate: I,
                            }),
                        })),
                    N)
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
                () => N,
                'patchFetch',
                () => U,
                'routeModule',
                () => C,
                'serverHooks',
                () => j,
                'workAsyncStorage',
                () => P,
                'workUnitAsyncStorage',
                () => W,
            ],
            702876
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7c609467._.js.map
