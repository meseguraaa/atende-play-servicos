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
            let d = await (0, i.getSigKey)(e, t, 'verify');
            (0, a.checkKeyLength)(e, d);
            let s = (0, r.subtleAlgorithm)(e, d.algorithm);
            try {
                return await crypto.subtle.verify(s, d, n, o);
            } catch {
                return !1;
            }
        }
        var o = e.i(747064),
            d = e.i(468746),
            s = e.i(166278),
            c = e.i(129590),
            l = e.i(30670),
            p = e.i(48414),
            y = e.i(663681);
        async function h(e, r, a) {
            let i, h;
            if (!(0, c.isObject)(e))
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
            if (void 0 !== e.header && !(0, c.isObject)(e.header))
                throw new o.JWSInvalid('JWS Unprotected Header incorrect type');
            let u = {};
            if (e.protected)
                try {
                    let r = (0, t.decode)(e.protected);
                    u = JSON.parse(d.decoder.decode(r));
                } catch {
                    throw new o.JWSInvalid('JWS Protected Header is invalid');
                }
            if (!(0, s.isDisjoint)(u, e.header))
                throw new o.JWSInvalid(
                    'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                );
            let w = { ...u, ...e.header },
                f = (0, p.validateCrit)(
                    o.JWSInvalid,
                    new Map([['b64', !0]]),
                    a?.crit,
                    u,
                    w
                ),
                m = !0;
            if (f.has('b64') && 'boolean' != typeof (m = u.b64))
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
            let S = !1;
            ('function' == typeof r && ((r = await r(u, e)), (S = !0)),
                (0, l.checkKeyType)(g, r, 'verify'));
            let b = (0, d.concat)(
                void 0 !== e.protected
                    ? (0, d.encode)(e.protected)
                    : new Uint8Array(),
                (0, d.encode)('.'),
                'string' == typeof e.payload
                    ? m
                        ? (0, d.encode)(e.payload)
                        : d.encoder.encode(e.payload)
                    : e.payload
            );
            try {
                i = (0, t.decode)(e.signature);
            } catch {
                throw new o.JWSInvalid(
                    'Failed to base64url decode the signature'
                );
            }
            let J = await (0, y.normalizeKey)(r, g);
            if (!(await n(g, J, i, b)))
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
                        ? d.encoder.encode(e.payload)
                        : e.payload;
            let H = { payload: h };
            return (void 0 !== e.protected && (H.protectedHeader = u),
            void 0 !== e.header && (H.unprotectedHeader = e.header),
            S)
                ? { ...H, key: J }
                : H;
        }
        async function u(e, t, r) {
            if (
                (e instanceof Uint8Array && (e = d.decoder.decode(e)),
                'string' != typeof e)
            )
                throw new o.JWSInvalid(
                    'Compact JWS must be a string or Uint8Array'
                );
            let { 0: a, 1: i, 2: n, length: s } = e.split('.');
            if (3 !== s) throw new o.JWSInvalid('Invalid Compact JWS');
            let c = await h({ payload: i, protected: a, signature: n }, t, r),
                l = { payload: c.payload, protectedHeader: c.protectedHeader };
            return 'function' == typeof t ? { ...l, key: c.key } : l;
        }
        var w = e.i(948880);
        async function f(e, t, r) {
            let a = await u(e, t, r);
            if (
                a.protectedHeader.crit?.includes('b64') &&
                !1 === a.protectedHeader.b64
            )
                throw new o.JWTInvalid('JWTs MUST NOT use unencoded payload');
            let i = {
                payload: (0, w.validateClaimsSet)(
                    a.protectedHeader,
                    a.payload,
                    r
                ),
                protectedHeader: a.protectedHeader,
            };
            return 'function' == typeof t ? { ...i, key: a.key } : i;
        }
        e.s(['jwtVerify', () => f], 595504);
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
            d = e.i(747064),
            s = e.i(468746),
            c = e.i(30670),
            l = e.i(48414),
            p = e.i(663681);
        class y {
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
                let a, i, y, h;
                if (!this.#t && !this.#r)
                    throw new d.JWSInvalid(
                        'either setProtectedHeader or setUnprotectedHeader must be called before #sign()'
                    );
                if (!(0, o.isDisjoint)(this.#t, this.#r))
                    throw new d.JWSInvalid(
                        'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                    );
                let u = { ...this.#t, ...this.#r },
                    w = (0, l.validateCrit)(
                        d.JWSInvalid,
                        new Map([['b64', !0]]),
                        r?.crit,
                        this.#t,
                        u
                    ),
                    f = !0;
                if (w.has('b64') && 'boolean' != typeof (f = this.#t.b64))
                    throw new d.JWSInvalid(
                        'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                    );
                let { alg: m } = u;
                if ('string' != typeof m || !m)
                    throw new d.JWSInvalid(
                        'JWS "alg" (Algorithm) Header Parameter missing or invalid'
                    );
                ((0, c.checkKeyType)(m, e, 'sign'),
                    f
                        ? ((a = (0, t.encode)(this.#e)), (i = (0, s.encode)(a)))
                        : ((i = this.#e), (a = '')),
                    this.#t
                        ? ((y = (0, t.encode)(JSON.stringify(this.#t))),
                          (h = (0, s.encode)(y)))
                        : ((y = ''), (h = new Uint8Array())));
                let g = (0, s.concat)(h, (0, s.encode)('.'), i),
                    v = await (0, p.normalizeKey)(e, m),
                    S = await n(m, v, g),
                    b = { signature: (0, t.encode)(S), payload: a };
                return (
                    this.#r && (b.header = this.#r),
                    this.#t && (b.protected = y),
                    b
                );
            }
        }
        class h {
            #a;
            constructor(e) {
                this.#a = new y(e);
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
        var u = e.i(948880);
        class w {
            #t;
            #i;
            constructor(e = {}) {
                this.#i = new u.JWTClaimsBuilder(e);
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
                    throw new d.JWTInvalid(
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
    666680,
    (e, t, r) => {
        t.exports = e.x('node:crypto', () => require('node:crypto'));
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1ba0f630._.js.map
