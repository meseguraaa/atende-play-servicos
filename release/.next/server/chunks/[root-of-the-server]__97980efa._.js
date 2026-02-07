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
            u = e.i(48414),
            p = e.i(663681);
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
            let f = { ...y, ...e.header },
                w = (0, u.validateCrit)(
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
            let { alg: g } = f;
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
            let x = await (0, p.normalizeKey)(r, g);
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
            let { 0: a, 1: n, 2: i, length: d } = e.split('.');
            if (3 !== d) throw new o.JWSInvalid('Invalid Compact JWS');
            let l = await h({ payload: n, protected: a, signature: i }, t, r),
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
            let n = {
                payload: (0, f.validateClaimsSet)(
                    a.protectedHeader,
                    a.payload,
                    r
                ),
                protectedHeader: a.protectedHeader,
            };
            return 'function' == typeof t ? { ...n, key: a.key } : n;
        }
        e.s(['jwtVerify', () => w], 595504);
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
            u = e.i(663681);
        class p {
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
                let a, n, p, h;
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
                        ? ((a = (0, t.encode)(this.#e)), (n = (0, d.encode)(a)))
                        : ((n = this.#e), (a = '')),
                    this.#t
                        ? ((p = (0, t.encode)(JSON.stringify(this.#t))),
                          (h = (0, d.encode)(p)))
                        : ((p = ''), (h = new Uint8Array())));
                let g = (0, d.concat)(h, (0, d.encode)('.'), n),
                    v = await (0, u.normalizeKey)(e, m),
                    b = await i(m, v, g),
                    S = { signature: (0, t.encode)(b), payload: a };
                return (
                    this.#r && (S.header = this.#r),
                    this.#t && (S.protected = p),
                    S
                );
            }
        }
        class h {
            #a;
            constructor(e) {
                this.#a = new p(e);
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
    717008,
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
            u = e.i(102610),
            p = e.i(670893),
            h = e.i(902769),
            y = e.i(46094),
            f = e.i(622730),
            w = e.i(811178),
            m = e.i(193695);
        e.i(629399);
        var g = e.i(377404),
            v = e.i(738342),
            b = e.i(698043),
            S = e.i(453852),
            x = e.i(78091);
        function H() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        async function I(e) {
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
                let t = (function (e, t) {
                    let r = t.toLowerCase();
                    for (let [t, a] of e.headers.entries())
                        if (t.toLowerCase() === r) {
                            let e = String(a ?? '').trim();
                            return e.length ? e : null;
                        }
                    return null;
                })(e, 'x-company-id');
                t && (i = t);
            }
            if (!i) throw Error('missing_company_id');
            if (
                !(await b.prisma.companyMember.findFirst({
                    where: { userId: n, companyId: i, isActive: !0 },
                    select: { id: !0 },
                }))
            )
                throw Error('forbidden_company');
            return { ...a, sub: n, companyId: i };
        }
        async function R() {
            return new v.NextResponse(null, { status: 204, headers: H() });
        }
        async function A(e, t, r) {
            try {
                return await e.orderItem.create({
                    data: { ...t, companyId: r },
                });
            } catch {
                return await e.orderItem.create({ data: t });
            }
        }
        let E = x.z.object({
            productId: x.z.string().min(1, 'productId obrigatório'),
            quantity: x.z.coerce
                .number()
                .int()
                .min(1, 'quantity deve ser >= 1'),
        });
        async function T(e) {
            let t = H();
            try {
                let r = await I(e),
                    a = r.companyId;
                if ('CLIENT' !== r.role)
                    return v.NextResponse.json(
                        { error: 'forbidden' },
                        { status: 403, headers: t }
                    );
                let n = null;
                try {
                    n = await e.json();
                } catch {
                    return v.NextResponse.json(
                        { error: 'invalid_json' },
                        { status: 400, headers: t }
                    );
                }
                let i = E.safeParse(n);
                if (!i.success)
                    return v.NextResponse.json(
                        { error: i.error.issues[0]?.message ?? 'invalid_body' },
                        { status: 400, headers: t }
                    );
                let { productId: o, quantity: s } = i.data,
                    d = r.sub,
                    l = await b.prisma.$transaction(async (e) => {
                        let t = await e.product.findFirst({
                            where: { id: o, companyId: a, isActive: !0 },
                            select: {
                                id: !0,
                                stockQuantity: !0,
                                price: !0,
                                pickupDeadlineDays: !0,
                                unitId: !0,
                            },
                        });
                        if (!t)
                            return {
                                ok: !1,
                                status: 404,
                                error: 'product_not_found',
                            };
                        if (!t.unitId)
                            return {
                                ok: !1,
                                status: 400,
                                error: 'product_missing_unit',
                            };
                        if (
                            !(await e.unit.findFirst({
                                where: { id: t.unitId, companyId: a },
                                select: { id: !0 },
                            }))
                        )
                            return {
                                ok: !1,
                                status: 400,
                                error: 'invalid_unit',
                            };
                        if (t.stockQuantity < s)
                            return {
                                ok: !1,
                                status: 400,
                                error: 'out_of_stock',
                            };
                        let r =
                                'number' == typeof t.pickupDeadlineDays &&
                                Number.isFinite(t.pickupDeadlineDays) &&
                                t.pickupDeadlineDays > 0
                                    ? t.pickupDeadlineDays
                                    : 2,
                            n = new Date();
                        n.setDate(n.getDate() + r);
                        let i = t.price,
                            l = i.mul(s),
                            c = await e.order.create({
                                data: {
                                    companyId: a,
                                    clientId: d,
                                    appointmentId: null,
                                    status: 'PENDING_CHECKIN',
                                    reservedUntil: n,
                                    totalAmount: l,
                                    unitId: t.unitId,
                                },
                                select: { id: !0, reservedUntil: !0 },
                            });
                        return (
                            await A(
                                e,
                                {
                                    orderId: c.id,
                                    productId: t.id,
                                    quantity: s,
                                    unitPrice: i,
                                    totalPrice: l,
                                },
                                a
                            ),
                            {
                                ok: !0,
                                orderId: c.id,
                                reservedUntil: c.reservedUntil,
                            }
                        );
                    });
                if (!l.ok)
                    return v.NextResponse.json(
                        { error: l.error },
                        { status: l.status, headers: t }
                    );
                return v.NextResponse.json(
                    {
                        ok: !0,
                        orderId: l.orderId,
                        reservedUntil: l.reservedUntil,
                    },
                    { status: 200, headers: t }
                );
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
                    e.includes('token') ||
                    e.includes('invalid_token')
                )
                    return v.NextResponse.json(
                        { error: 'invalid_token' },
                        { status: 401, headers: t }
                    );
                return (
                    console.error('[mobile product-sale] error:', r),
                    v.NextResponse.json(
                        { error: 'server_error' },
                        { status: 500, headers: t }
                    )
                );
            }
        }
        e.s(['OPTIONS', () => R, 'POST', () => T], 393893);
        var J = e.i(393893);
        let P = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/orders/product-sale/route',
                    pathname: '/api/mobile/orders/product-sale',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/orders/product-sale/route.ts',
                nextConfigOutput: 'standalone',
                userland: J,
            }),
            {
                workAsyncStorage: W,
                workUnitAsyncStorage: k,
                serverHooks: C,
            } = P;
        function _() {
            return (0, a.patchFetch)({
                workAsyncStorage: W,
                workUnitAsyncStorage: k,
            });
        }
        async function j(e, t, a) {
            P.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let v = '/api/mobile/orders/product-sale/route';
            v = v.replace(/\/index$/, '') || '/';
            let b = await P.prepare(e, t, {
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
                    nextConfig: H,
                    parsedUrl: I,
                    isDraftMode: R,
                    prerenderManifest: A,
                    routerServerContext: E,
                    isOnDemandRevalidate: T,
                    revalidateOnlyGenerated: J,
                    resolvedPathname: W,
                    clientReferenceManifest: k,
                    serverActionsManifest: C,
                } = b,
                _ = (0, d.normalizeAppPath)(v),
                j = !!(A.dynamicRoutes[_] || A.routes[W]),
                N = async () => (
                    (null == E ? void 0 : E.render404)
                        ? await E.render404(e, t, I, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (j && !R) {
                let e = !!A.routes[W],
                    t = A.dynamicRoutes[_];
                if (t && !1 === t.fallback && !e) {
                    if (H.experimental.adapterPath) return await N();
                    throw new m.NoFallbackError();
                }
            }
            let U = null;
            !j || P.isDev || R || (U = '/index' === (U = W) ? '/' : U);
            let O = !0 === P.isDev || !j,
                D = j && !O;
            C &&
                k &&
                (0, o.setReferenceManifestsSingleton)({
                    page: v,
                    clientReferenceManifest: k,
                    serverActionsManifest: C,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: C,
                    }),
                });
            let q = e.method || 'GET',
                M = (0, i.getTracer)(),
                F = M.getActiveScopeSpan(),
                K = {
                    params: x,
                    prerenderManifest: A,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!H.experimental.authInterrupts,
                        },
                        cacheComponents: !!H.cacheComponents,
                        supportsDynamicResponse: O,
                        incrementalCache: (0, n.getRequestMeta)(
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
                            P.onRequestError(e, t, a, E),
                    },
                    sharedContext: { buildId: S },
                },
                $ = new l.NodeNextRequest(e),
                L = new l.NodeNextResponse(t),
                z = c.NextRequestAdapter.fromNodeNextRequest(
                    $,
                    (0, c.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        P.handle(z, K).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = M.getRootSpanAttributes();
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
                                    if (!s && T && J && !r)
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
                                    e.fetchMetrics = K.renderOpts.fetchMetrics;
                                    let d = K.renderOpts.pendingWaitUntil;
                                    d &&
                                        a.waitUntil &&
                                        (a.waitUntil(d), (d = void 0));
                                    let l = K.renderOpts.collectedTags;
                                    if (!j)
                                        return (
                                            await (0, h.sendResponse)(
                                                $,
                                                L,
                                                i,
                                                K.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            y.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (l && (t[w.NEXT_CACHE_TAGS_HEADER] = l),
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
                                                    w.INFINITE_CACHE
                                                ) &&
                                                K.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    K.renderOpts
                                                        .collectedExpire ||
                                                K.renderOpts.collectedExpire >=
                                                    w.INFINITE_CACHE
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
                                                revalidate: r,
                                                expire: a,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await P.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: v,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: T,
                                                    }),
                                                },
                                                E
                                            )),
                                        t
                                    );
                                }
                            },
                            c = await P.handleResponse({
                                req: e,
                                nextConfig: H,
                                cacheKey: U,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: A,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: T,
                                revalidateOnlyGenerated: J,
                                responseGenerator: l,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!j) return null;
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
                                T
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
                        let u = (0, y.fromNodeOutgoingHttpHeaders)(
                            c.value.headers
                        );
                        return (
                            (s && j) || u.delete(w.NEXT_CACHE_TAGS_HEADER),
                            !c.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                u.get('Cache-Control') ||
                                u.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(c.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                $,
                                L,
                                new Response(c.value.body, {
                                    headers: u,
                                    status: c.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                F
                    ? await d(F)
                    : await M.withPropagatedContext(e.headers, () =>
                          M.trace(
                              u.BaseServerSpan.handleRequest,
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
                        (await P.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: _,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: T,
                            }),
                        })),
                    j)
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
                () => j,
                'patchFetch',
                () => _,
                'routeModule',
                () => P,
                'serverHooks',
                () => C,
                'workAsyncStorage',
                () => W,
                'workUnitAsyncStorage',
                () => k,
            ],
            717008
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__97980efa._.js.map
