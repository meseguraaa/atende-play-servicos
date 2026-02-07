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
            let f = {};
            if (e.protected)
                try {
                    let r = (0, t.decode)(e.protected);
                    f = JSON.parse(s.decoder.decode(r));
                } catch {
                    throw new o.JWSInvalid('JWS Protected Header is invalid');
                }
            if (!(0, d.isDisjoint)(f, e.header))
                throw new o.JWSInvalid(
                    'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                );
            let y = { ...f, ...e.header },
                m = (0, p.validateCrit)(
                    o.JWSInvalid,
                    new Map([['b64', !0]]),
                    a?.crit,
                    f,
                    y
                ),
                w = !0;
            if (m.has('b64') && 'boolean' != typeof (w = f.b64))
                throw new o.JWSInvalid(
                    'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                );
            let { alg: g } = y;
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
            if (w) {
                if ('string' != typeof e.payload)
                    throw new o.JWSInvalid('JWS Payload must be a string');
            } else if (
                'string' != typeof e.payload &&
                !(e.payload instanceof Uint8Array)
            )
                throw new o.JWSInvalid(
                    'JWS Payload must be a string or an Uint8Array instance'
                );
            let S = !1;
            ('function' == typeof r && ((r = await r(f, e)), (S = !0)),
                (0, c.checkKeyType)(g, r, 'verify'));
            let b = (0, s.concat)(
                void 0 !== e.protected
                    ? (0, s.encode)(e.protected)
                    : new Uint8Array(),
                (0, s.encode)('.'),
                'string' == typeof e.payload
                    ? w
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
            let x = await (0, u.normalizeKey)(r, g);
            if (!(await n(g, x, i, b)))
                throw new o.JWSSignatureVerificationFailed();
            if (w)
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
            return (void 0 !== e.protected && (H.protectedHeader = f),
            void 0 !== e.header && (H.unprotectedHeader = e.header),
            S)
                ? { ...H, key: x }
                : H;
        }
        async function f(e, t, r) {
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
        var y = e.i(948880);
        async function m(e, t, r) {
            let a = await f(e, t, r);
            if (
                a.protectedHeader.crit?.includes('b64') &&
                !1 === a.protectedHeader.b64
            )
                throw new o.JWTInvalid('JWTs MUST NOT use unencoded payload');
            let i = {
                payload: (0, y.validateClaimsSet)(
                    a.protectedHeader,
                    a.payload,
                    r
                ),
                protectedHeader: a.protectedHeader,
            };
            return 'function' == typeof t ? { ...i, key: a.key } : i;
        }
        e.s(['jwtVerify', () => m], 595504);
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
                let f = { ...this.#t, ...this.#r },
                    y = (0, c.validateCrit)(
                        s.JWSInvalid,
                        new Map([['b64', !0]]),
                        r?.crit,
                        this.#t,
                        f
                    ),
                    m = !0;
                if (y.has('b64') && 'boolean' != typeof (m = this.#t.b64))
                    throw new s.JWSInvalid(
                        'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                    );
                let { alg: w } = f;
                if ('string' != typeof w || !w)
                    throw new s.JWSInvalid(
                        'JWS "alg" (Algorithm) Header Parameter missing or invalid'
                    );
                ((0, l.checkKeyType)(w, e, 'sign'),
                    m
                        ? ((a = (0, t.encode)(this.#e)), (i = (0, d.encode)(a)))
                        : ((i = this.#e), (a = '')),
                    this.#t
                        ? ((u = (0, t.encode)(JSON.stringify(this.#t))),
                          (h = (0, d.encode)(u)))
                        : ((u = ''), (h = new Uint8Array())));
                let g = (0, d.concat)(h, (0, d.encode)('.'), i),
                    v = await (0, p.normalizeKey)(e, w),
                    S = await n(w, v, g),
                    b = { signature: (0, t.encode)(S), payload: a };
                return (
                    this.#r && (b.header = this.#r),
                    this.#t && (b.protected = u),
                    b
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
        var f = e.i(948880);
        class y {
            #t;
            #i;
            constructor(e = {}) {
                this.#i = new f.JWTClaimsBuilder(e);
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
        e.s(['SignJWT', () => y], 45334);
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
    74849,
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
            f = e.i(46094),
            y = e.i(622730),
            m = e.i(811178),
            w = e.i(193695);
        e.i(629399);
        var g = e.i(377404),
            v = e.i(738342),
            S = e.i(698043),
            b = e.i(453852);
        function x() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        function H(e, t) {
            let r = t.toLowerCase();
            for (let [t, a] of e.headers.entries())
                if (t.toLowerCase() === r) {
                    let e = String(a ?? '').trim();
                    return e.length ? e : null;
                }
            return null;
        }
        async function R(e) {
            let t = e.headers.get('authorization') || '',
                r = t.startsWith('Bearer ') ? t.slice(7).trim() : '';
            if (!r) throw Error('missing_token');
            let a = await (0, b.verifyAppJwt)(r),
                i = 'string' == typeof a?.sub ? String(a.sub).trim() : '';
            if (!i) throw Error('invalid_token');
            let n =
                'string' == typeof a?.companyId
                    ? String(a.companyId).trim()
                    : '';
            if (!n) {
                let t = H(e, 'x-company-id');
                t && (n = t);
            }
            if (!n) throw Error('missing_company_id');
            if (
                !(await S.prisma.companyMember.findFirst({
                    where: { userId: i, companyId: n, isActive: !0 },
                    select: { id: !0, role: !0 },
                }))
            )
                throw Error('forbidden_company');
            return { ...a, sub: i, companyId: n };
        }
        async function A() {
            return new v.NextResponse(null, { status: 204, headers: x() });
        }
        async function E(e) {
            let t = x();
            try {
                let r = (await R(e)).companyId,
                    a = (function (e) {
                        let t = H(e, 'x-forwarded-proto'),
                            r = H(e, 'x-forwarded-host') || H(e, 'host'),
                            a = String(t ?? '')
                                .split(',')[0]
                                .trim()
                                .toLowerCase(),
                            i = String(r ?? '')
                                .split(',')[0]
                                .trim();
                        if (i)
                            return `${'http' === a || 'https' === a ? a : 'https'}://${i}`;
                        try {
                            return new URL(e.url).origin;
                        } catch {
                            return '';
                        }
                    })(e),
                    i = H(e, 'x-company-id');
                if (i && i !== r)
                    return v.NextResponse.json(
                        { error: 'company_id_mismatch' },
                        { status: 400, headers: t }
                    );
                let n = new URL(e.url),
                    o = String(n.searchParams.get('unitId') ?? '').trim(),
                    s = String(n.searchParams.get('serviceId') ?? '').trim();
                if (!o)
                    return v.NextResponse.json(
                        { error: 'unitId é obrigatório' },
                        { status: 400, headers: t }
                    );
                if (
                    !(await S.prisma.unit.findFirst({
                        where: { id: o, companyId: r, isActive: !0 },
                        select: { id: !0 },
                    }))
                )
                    return v.NextResponse.json(
                        { error: 'Unidade não encontrada' },
                        { status: 404, headers: t }
                    );
                let d = {
                    companyId: r,
                    isActive: !0,
                    units: { some: { companyId: r, unitId: o, isActive: !0 } },
                };
                if (s) {
                    if (
                        !(await S.prisma.service.findFirst({
                            where: { id: s, companyId: r, isActive: !0 },
                            select: { id: !0 },
                        }))
                    )
                        return v.NextResponse.json(
                            { error: 'Serviço não encontrado' },
                            { status: 404, headers: t }
                        );
                    d.services = { some: { companyId: r, serviceId: s } };
                }
                let l = (
                        await S.prisma.professional.findMany({
                            where: d,
                            orderBy: { name: 'asc' },
                            select: {
                                id: !0,
                                name: !0,
                                imageUrl: !0,
                                user: { select: { image: !0 } },
                            },
                        })
                    ).map((e) => {
                        let t = e.imageUrl ?? e?.user?.image;
                        return {
                            id: e.id,
                            name: e.name,
                            imageUrl: (function (e, t) {
                                let r = String(t ?? '').trim();
                                if (!r) return null;
                                let a = r.toLowerCase();
                                if (
                                    a.startsWith('http://') ||
                                    a.startsWith('https://') ||
                                    a.startsWith('data:image/')
                                )
                                    return r;
                                let i = r.startsWith('/') ? r : `/${r}`,
                                    n = e.endsWith('/') ? e.slice(0, -1) : e;
                                return n ? `${n}${i}` : i;
                            })(a, t),
                        };
                    }),
                    c = v.NextResponse.json(
                        { ok: !0, professionals: l },
                        { status: 200, headers: t }
                    );
                return (c.headers.set('x-company-id', r), c);
            } catch (r) {
                let e = String(r?.message ?? '');
                if (e.includes('missing_token'))
                    return v.NextResponse.json(
                        { error: 'missing_token' },
                        { status: 401, headers: t }
                    );
                if (e.includes('missing_company_id'))
                    return v.NextResponse.json(
                        { error: 'missing_company_id' },
                        { status: 401, headers: t }
                    );
                if (e.includes('forbidden_company'))
                    return v.NextResponse.json(
                        { error: 'forbidden_company' },
                        { status: 403, headers: t }
                    );
                if (
                    e.includes('Invalid token') ||
                    e.includes('JWT') ||
                    e.toLowerCase().includes('token') ||
                    e.includes('invalid_token')
                )
                    return v.NextResponse.json(
                        { error: 'invalid_token' },
                        { status: 401, headers: t }
                    );
                return (
                    console.error('[mobile/professional] error:', r),
                    v.NextResponse.json(
                        { error: 'server_error' },
                        { status: 500, headers: t }
                    )
                );
            }
        }
        e.s(
            ['GET', () => E, 'OPTIONS', () => A, 'dynamic', 0, 'force-dynamic'],
            495613
        );
        var W = e.i(495613);
        let J = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/professional/route',
                    pathname: '/api/mobile/professional',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/professional/route.ts',
                nextConfigOutput: 'standalone',
                userland: W,
            }),
            {
                workAsyncStorage: T,
                workUnitAsyncStorage: I,
                serverHooks: P,
            } = J;
        function C() {
            return (0, a.patchFetch)({
                workAsyncStorage: T,
                workUnitAsyncStorage: I,
            });
        }
        async function j(e, t, a) {
            J.isDev &&
                (0, i.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let v = '/api/mobile/professional/route';
            v = v.replace(/\/index$/, '') || '/';
            let S = await J.prepare(e, t, {
                srcPage: v,
                multiZoneDraftMode: !1,
            });
            if (!S)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: b,
                    params: x,
                    nextConfig: H,
                    parsedUrl: R,
                    isDraftMode: A,
                    prerenderManifest: E,
                    routerServerContext: W,
                    isOnDemandRevalidate: T,
                    revalidateOnlyGenerated: I,
                    resolvedPathname: P,
                    clientReferenceManifest: C,
                    serverActionsManifest: j,
                } = S,
                _ = (0, d.normalizeAppPath)(v),
                N = !!(E.dynamicRoutes[_] || E.routes[P]),
                k = async () => (
                    (null == W ? void 0 : W.render404)
                        ? await W.render404(e, t, R, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (N && !A) {
                let e = !!E.routes[P],
                    t = E.dynamicRoutes[_];
                if (t && !1 === t.fallback && !e) {
                    if (H.experimental.adapterPath) return await k();
                    throw new w.NoFallbackError();
                }
            }
            let U = null;
            !N || J.isDev || A || (U = '/index' === (U = P) ? '/' : U);
            let O = !0 === J.isDev || !N,
                M = N && !O;
            j &&
                C &&
                (0, o.setReferenceManifestsSingleton)({
                    page: v,
                    clientReferenceManifest: C,
                    serverActionsManifest: j,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let q = e.method || 'GET',
                $ = (0, n.getTracer)(),
                F = $.getActiveScopeSpan(),
                K = {
                    params: x,
                    prerenderManifest: E,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!H.experimental.authInterrupts,
                        },
                        cacheComponents: !!H.cacheComponents,
                        supportsDynamicResponse: O,
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
                            J.onRequestError(e, t, a, W),
                    },
                    sharedContext: { buildId: b },
                },
                D = new l.NodeNextRequest(e),
                L = new l.NodeNextResponse(t),
                B = c.NextRequestAdapter.fromNodeNextRequest(
                    D,
                    (0, c.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        J.handle(B, K).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = $.getRootSpanAttributes();
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
                    s = !!(0, i.getRequestMeta)(e, 'minimalMode'),
                    d = async (i) => {
                        var n, d;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && T && I && !r)
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
                                    e.fetchMetrics = K.renderOpts.fetchMetrics;
                                    let d = K.renderOpts.pendingWaitUntil;
                                    d &&
                                        a.waitUntil &&
                                        (a.waitUntil(d), (d = void 0));
                                    let l = K.renderOpts.collectedTags;
                                    if (!N)
                                        return (
                                            await (0, h.sendResponse)(
                                                D,
                                                L,
                                                n,
                                                K.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await n.blob(),
                                            t = (0,
                                            f.toNodeOutgoingHttpHeaders)(
                                                n.headers
                                            );
                                        (l && (t[m.NEXT_CACHE_TAGS_HEADER] = l),
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
                                                    m.INFINITE_CACHE
                                                ) &&
                                                K.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    K.renderOpts
                                                        .collectedExpire ||
                                                K.renderOpts.collectedExpire >=
                                                    m.INFINITE_CACHE
                                                    ? void 0
                                                    : K.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: g.CachedRouteKind
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
                                            (await J.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: v,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    u.getRevalidateReason)({
                                                        isStaticGeneration: M,
                                                        isOnDemandRevalidate: T,
                                                    }),
                                                },
                                                W
                                            )),
                                        t
                                    );
                                }
                            },
                            c = await J.handleResponse({
                                req: e,
                                nextConfig: H,
                                cacheKey: U,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: E,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: T,
                                revalidateOnlyGenerated: I,
                                responseGenerator: l,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!N) return null;
                        if (
                            (null == c || null == (n = c.value)
                                ? void 0
                                : n.kind) !== g.CachedRouteKind.APP_ROUTE
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
                                T
                                    ? 'REVALIDATED'
                                    : c.isMiss
                                      ? 'MISS'
                                      : c.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            A &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, f.fromNodeOutgoingHttpHeaders)(
                            c.value.headers
                        );
                        return (
                            (s && N) || p.delete(m.NEXT_CACHE_TAGS_HEADER),
                            !c.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, y.getCacheControlHeader)(c.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                D,
                                L,
                                new Response(c.value.body, {
                                    headers: p,
                                    status: c.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                F
                    ? await d(F)
                    : await $.withPropagatedContext(e.headers, () =>
                          $.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${q} ${v}`,
                                  kind: n.SpanKind.SERVER,
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
                    (t instanceof w.NoFallbackError ||
                        (await J.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: _,
                            routeType: 'route',
                            revalidateReason: (0, u.getRevalidateReason)({
                                isStaticGeneration: M,
                                isOnDemandRevalidate: T,
                            }),
                        })),
                    N)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
                        D,
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
                () => j,
                'patchFetch',
                () => C,
                'routeModule',
                () => J,
                'serverHooks',
                () => P,
                'workAsyncStorage',
                () => T,
                'workUnitAsyncStorage',
                () => I,
            ],
            74849
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__832cf304._.js.map
