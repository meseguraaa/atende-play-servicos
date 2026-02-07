module.exports = [
    126918,
    (a) => {
        'use strict';
        let b;
        var c = a.i(169513);
        let d = new TextEncoder(),
            e = new TextDecoder();
        function f(...a) {
            let b = new Uint8Array(a.reduce((a, { length: b }) => a + b, 0)),
                c = 0;
            for (let d of a) (b.set(d, c), (c += d.length));
            return b;
        }
        function g(a) {
            let b = new Uint8Array(a.length);
            for (let c = 0; c < a.length; c++) {
                let d = a.charCodeAt(c);
                if (d > 127)
                    throw TypeError('non-ASCII string encountered in encode()');
                b[c] = d;
            }
            return b;
        }
        function h(a) {
            if (Uint8Array.fromBase64)
                return Uint8Array.fromBase64(
                    'string' == typeof a ? a : e.decode(a),
                    { alphabet: 'base64url' }
                );
            let b = a;
            (b instanceof Uint8Array && (b = e.decode(b)),
                (b = b.replace(/-/g, '+').replace(/_/g, '/')));
            try {
                var c = b;
                if (Uint8Array.fromBase64) return Uint8Array.fromBase64(c);
                let a = atob(c),
                    d = new Uint8Array(a.length);
                for (let b = 0; b < a.length; b++) d[b] = a.charCodeAt(b);
                return d;
            } catch {
                throw TypeError(
                    'The input to be decoded is not correctly encoded.'
                );
            }
        }
        function i(a) {
            let b = a;
            return ('string' == typeof b && (b = d.encode(b)),
            Uint8Array.prototype.toBase64)
                ? b.toBase64({ alphabet: 'base64url', omitPadding: !0 })
                : (function (a) {
                      if (Uint8Array.prototype.toBase64) return a.toBase64();
                      let b = [];
                      for (let c = 0; c < a.length; c += 32768)
                          b.push(
                              String.fromCharCode.apply(
                                  null,
                                  a.subarray(c, c + 32768)
                              )
                          );
                      return btoa(b.join(''));
                  })(b)
                      .replace(/=/g, '')
                      .replace(/\+/g, '-')
                      .replace(/\//g, '_');
        }
        class j extends Error {
            static code = 'ERR_JOSE_GENERIC';
            code = 'ERR_JOSE_GENERIC';
            constructor(a, b) {
                (super(a, b),
                    (this.name = this.constructor.name),
                    Error.captureStackTrace?.(this, this.constructor));
            }
        }
        class k extends j {
            static code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
            code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
            claim;
            reason;
            payload;
            constructor(a, b, c = 'unspecified', d = 'unspecified') {
                (super(a, { cause: { claim: c, reason: d, payload: b } }),
                    (this.claim = c),
                    (this.reason = d),
                    (this.payload = b));
            }
        }
        class l extends j {
            static code = 'ERR_JWT_EXPIRED';
            code = 'ERR_JWT_EXPIRED';
            claim;
            reason;
            payload;
            constructor(a, b, c = 'unspecified', d = 'unspecified') {
                (super(a, { cause: { claim: c, reason: d, payload: b } }),
                    (this.claim = c),
                    (this.reason = d),
                    (this.payload = b));
            }
        }
        class m extends j {
            static code = 'ERR_JOSE_ALG_NOT_ALLOWED';
            code = 'ERR_JOSE_ALG_NOT_ALLOWED';
        }
        class n extends j {
            static code = 'ERR_JOSE_NOT_SUPPORTED';
            code = 'ERR_JOSE_NOT_SUPPORTED';
        }
        class o extends j {
            static code = 'ERR_JWS_INVALID';
            code = 'ERR_JWS_INVALID';
        }
        class p extends j {
            static code = 'ERR_JWT_INVALID';
            code = 'ERR_JWT_INVALID';
        }
        class q extends j {
            [Symbol.asyncIterator];
            static code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
            code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
            constructor(
                a = 'multiple matching keys found in the JSON Web Key Set',
                b
            ) {
                super(a, b);
            }
        }
        class r extends j {
            static code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
            code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
            constructor(a = 'signature verification failed', b) {
                super(a, b);
            }
        }
        function s(a, b) {
            let c = `SHA-${a.slice(-3)}`;
            switch (a) {
                case 'HS256':
                case 'HS384':
                case 'HS512':
                    return { hash: c, name: 'HMAC' };
                case 'PS256':
                case 'PS384':
                case 'PS512':
                    return {
                        hash: c,
                        name: 'RSA-PSS',
                        saltLength: parseInt(a.slice(-3), 10) >> 3,
                    };
                case 'RS256':
                case 'RS384':
                case 'RS512':
                    return { hash: c, name: 'RSASSA-PKCS1-v1_5' };
                case 'ES256':
                case 'ES384':
                case 'ES512':
                    return { hash: c, name: 'ECDSA', namedCurve: b.namedCurve };
                case 'Ed25519':
                case 'EdDSA':
                    return { name: 'Ed25519' };
                case 'ML-DSA-44':
                case 'ML-DSA-65':
                case 'ML-DSA-87':
                    return { name: a };
                default:
                    throw new n(
                        `alg ${a} is not supported either by JOSE or your javascript runtime`
                    );
            }
        }
        function t(a, b) {
            if (a.startsWith('RS') || a.startsWith('PS')) {
                let { modulusLength: c } = b.algorithm;
                if ('number' != typeof c || c < 2048)
                    throw TypeError(
                        `${a} requires key modulusLength to be 2048 bits or larger`
                    );
            }
        }
        let u = (a, b = 'algorithm.name') =>
            TypeError(
                `CryptoKey does not support this operation, its ${b} must be ${a}`
            );
        function v(a) {
            return parseInt(a.name.slice(4), 10);
        }
        function w(a, b, ...c) {
            if ((c = c.filter(Boolean)).length > 2) {
                let b = c.pop();
                a += `one of type ${c.join(', ')}, or ${b}.`;
            } else
                2 === c.length
                    ? (a += `one of type ${c[0]} or ${c[1]}.`)
                    : (a += `of type ${c[0]}.`);
            return (
                null == b
                    ? (a += ` Received ${b}`)
                    : 'function' == typeof b && b.name
                      ? (a += ` Received function ${b.name}`)
                      : 'object' == typeof b &&
                        null != b &&
                        b.constructor?.name &&
                        (a += ` Received an instance of ${b.constructor.name}`),
                a
            );
        }
        let x = (a, b, ...c) =>
            w(`Key for the ${a} algorithm must be `, b, ...c);
        async function y(a, b, c) {
            if (b instanceof Uint8Array) {
                if (!a.startsWith('HS'))
                    throw TypeError(
                        ((a, ...b) => w('Key must be ', a, ...b))(
                            b,
                            'CryptoKey',
                            'KeyObject',
                            'JSON Web Key'
                        )
                    );
                return crypto.subtle.importKey(
                    'raw',
                    b,
                    { hash: `SHA-${a.slice(-3)}`, name: 'HMAC' },
                    !1,
                    [c]
                );
            }
            return (
                !(function (a, b, c) {
                    switch (b) {
                        case 'HS256':
                        case 'HS384':
                        case 'HS512': {
                            if ('HMAC' !== a.algorithm.name) throw u('HMAC');
                            let c = parseInt(b.slice(2), 10);
                            if (v(a.algorithm.hash) !== c)
                                throw u(`SHA-${c}`, 'algorithm.hash');
                            break;
                        }
                        case 'RS256':
                        case 'RS384':
                        case 'RS512': {
                            if ('RSASSA-PKCS1-v1_5' !== a.algorithm.name)
                                throw u('RSASSA-PKCS1-v1_5');
                            let c = parseInt(b.slice(2), 10);
                            if (v(a.algorithm.hash) !== c)
                                throw u(`SHA-${c}`, 'algorithm.hash');
                            break;
                        }
                        case 'PS256':
                        case 'PS384':
                        case 'PS512': {
                            if ('RSA-PSS' !== a.algorithm.name)
                                throw u('RSA-PSS');
                            let c = parseInt(b.slice(2), 10);
                            if (v(a.algorithm.hash) !== c)
                                throw u(`SHA-${c}`, 'algorithm.hash');
                            break;
                        }
                        case 'Ed25519':
                        case 'EdDSA':
                            if ('Ed25519' !== a.algorithm.name)
                                throw u('Ed25519');
                            break;
                        case 'ML-DSA-44':
                        case 'ML-DSA-65':
                        case 'ML-DSA-87':
                            let d;
                            if (((d = a.algorithm), d.name !== b)) throw u(b);
                            break;
                        case 'ES256':
                        case 'ES384':
                        case 'ES512': {
                            if ('ECDSA' !== a.algorithm.name) throw u('ECDSA');
                            let c = (function (a) {
                                switch (a) {
                                    case 'ES256':
                                        return 'P-256';
                                    case 'ES384':
                                        return 'P-384';
                                    case 'ES512':
                                        return 'P-521';
                                    default:
                                        throw Error('unreachable');
                                }
                            })(b);
                            if (a.algorithm.namedCurve !== c)
                                throw u(c, 'algorithm.namedCurve');
                            break;
                        }
                        default:
                            throw TypeError(
                                'CryptoKey does not support this operation'
                            );
                    }
                    if (c && !a.usages.includes(c))
                        throw TypeError(
                            `CryptoKey does not support this operation, its usages must include ${c}.`
                        );
                })(b, a, c),
                b
            );
        }
        async function z(a, b, c) {
            let d = await y(a, b, 'sign');
            return (
                t(a, d),
                new Uint8Array(
                    await crypto.subtle.sign(s(a, d.algorithm), d, c)
                )
            );
        }
        function A(...a) {
            let b,
                c = a.filter(Boolean);
            if (0 === c.length || 1 === c.length) return !0;
            for (let a of c) {
                let c = Object.keys(a);
                if (!b || 0 === b.size) {
                    b = new Set(c);
                    continue;
                }
                for (let a of c) {
                    if (b.has(a)) return !1;
                    b.add(a);
                }
            }
            return !0;
        }
        let B = (a) => {
                if (a?.[Symbol.toStringTag] === 'CryptoKey') return !0;
                try {
                    return a instanceof CryptoKey;
                } catch {
                    return !1;
                }
            },
            C = (a) => a?.[Symbol.toStringTag] === 'KeyObject',
            D = (a) => B(a) || C(a);
        function E(a) {
            if (
                'object' != typeof a ||
                null === a ||
                '[object Object]' !== Object.prototype.toString.call(a)
            )
                return !1;
            if (null === Object.getPrototypeOf(a)) return !0;
            let b = a;
            for (; null !== Object.getPrototypeOf(b); )
                b = Object.getPrototypeOf(b);
            return Object.getPrototypeOf(a) === b;
        }
        let F = (a) => E(a) && 'string' == typeof a.kty,
            G = (a) => a?.[Symbol.toStringTag],
            H = (a, b, c) => {
                if (void 0 !== b.use) {
                    let a;
                    switch (c) {
                        case 'sign':
                        case 'verify':
                            a = 'sig';
                            break;
                        case 'encrypt':
                        case 'decrypt':
                            a = 'enc';
                    }
                    if (b.use !== a)
                        throw TypeError(
                            `Invalid key for this operation, its "use" must be "${a}" when present`
                        );
                }
                if (void 0 !== b.alg && b.alg !== a)
                    throw TypeError(
                        `Invalid key for this operation, its "alg" must be "${a}" when present`
                    );
                if (Array.isArray(b.key_ops)) {
                    let d;
                    switch (!0) {
                        case 'sign' === c || 'verify' === c:
                        case 'dir' === a:
                        case a.includes('CBC-HS'):
                            d = c;
                            break;
                        case a.startsWith('PBES2'):
                            d = 'deriveBits';
                            break;
                        case /^A\d{3}(?:GCM)?(?:KW)?$/.test(a):
                            d =
                                !a.includes('GCM') && a.endsWith('KW')
                                    ? 'encrypt' === c
                                        ? 'wrapKey'
                                        : 'unwrapKey'
                                    : c;
                            break;
                        case 'encrypt' === c && a.startsWith('RSA'):
                            d = 'wrapKey';
                            break;
                        case 'decrypt' === c:
                            d = a.startsWith('RSA')
                                ? 'unwrapKey'
                                : 'deriveBits';
                    }
                    if (d && b.key_ops?.includes?.(d) === !1)
                        throw TypeError(
                            `Invalid key for this operation, its "key_ops" must include "${d}" when present`
                        );
                }
                return !0;
            };
        function I(a, b, c) {
            switch (a.substring(0, 2)) {
                case 'A1':
                case 'A2':
                case 'di':
                case 'HS':
                case 'PB':
                    ((a, b, c) => {
                        if (!(b instanceof Uint8Array)) {
                            if (F(b)) {
                                if (
                                    'oct' === b.kty &&
                                    'string' == typeof b.k &&
                                    H(a, b, c)
                                )
                                    return;
                                throw TypeError(
                                    'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present'
                                );
                            }
                            if (!D(b))
                                throw TypeError(
                                    x(
                                        a,
                                        b,
                                        'CryptoKey',
                                        'KeyObject',
                                        'JSON Web Key',
                                        'Uint8Array'
                                    )
                                );
                            if ('secret' !== b.type)
                                throw TypeError(
                                    `${G(b)} instances for symmetric algorithms must be of type "secret"`
                                );
                        }
                    })(a, b, c);
                    break;
                default:
                    ((a, b, c) => {
                        if (F(b))
                            switch (c) {
                                case 'decrypt':
                                case 'sign':
                                    if (
                                        'oct' !== b.kty &&
                                        (('AKP' === b.kty &&
                                            'string' == typeof b.priv) ||
                                            'string' == typeof b.d) &&
                                        H(a, b, c)
                                    )
                                        return;
                                    throw TypeError(
                                        'JSON Web Key for this operation must be a private JWK'
                                    );
                                case 'encrypt':
                                case 'verify':
                                    if (
                                        'oct' !== b.kty &&
                                        void 0 === b.d &&
                                        void 0 === b.priv &&
                                        H(a, b, c)
                                    )
                                        return;
                                    throw TypeError(
                                        'JSON Web Key for this operation must be a public JWK'
                                    );
                            }
                        if (!D(b))
                            throw TypeError(
                                x(
                                    a,
                                    b,
                                    'CryptoKey',
                                    'KeyObject',
                                    'JSON Web Key'
                                )
                            );
                        if ('secret' === b.type)
                            throw TypeError(
                                `${G(b)} instances for asymmetric algorithms must not be of type "secret"`
                            );
                        if ('public' === b.type)
                            switch (c) {
                                case 'sign':
                                    throw TypeError(
                                        `${G(b)} instances for asymmetric algorithm signing must be of type "private"`
                                    );
                                case 'decrypt':
                                    throw TypeError(
                                        `${G(b)} instances for asymmetric algorithm decryption must be of type "private"`
                                    );
                            }
                        if ('private' === b.type)
                            switch (c) {
                                case 'verify':
                                    throw TypeError(
                                        `${G(b)} instances for asymmetric algorithm verifying must be of type "public"`
                                    );
                                case 'encrypt':
                                    throw TypeError(
                                        `${G(b)} instances for asymmetric algorithm encryption must be of type "public"`
                                    );
                            }
                    })(a, b, c);
            }
        }
        function J(a, b, c, d, e) {
            let f;
            if (void 0 !== e.crit && d?.crit === void 0)
                throw new a(
                    '"crit" (Critical) Header Parameter MUST be integrity protected'
                );
            if (!d || void 0 === d.crit) return new Set();
            if (
                !Array.isArray(d.crit) ||
                0 === d.crit.length ||
                d.crit.some((a) => 'string' != typeof a || 0 === a.length)
            )
                throw new a(
                    '"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present'
                );
            for (let g of ((f =
                void 0 !== c
                    ? new Map([...Object.entries(c), ...b.entries()])
                    : b),
            d.crit)) {
                if (!f.has(g))
                    throw new n(
                        `Extension Header Parameter "${g}" is not recognized`
                    );
                if (void 0 === e[g])
                    throw new a(`Extension Header Parameter "${g}" is missing`);
                if (f.get(g) && void 0 === d[g])
                    throw new a(
                        `Extension Header Parameter "${g}" MUST be integrity protected`
                    );
            }
            return new Set(d.crit);
        }
        async function K(a) {
            if (!a.alg)
                throw TypeError(
                    '"alg" argument is required when "jwk.alg" is not present'
                );
            let { algorithm: b, keyUsages: c } = (function (a) {
                    let b, c;
                    switch (a.kty) {
                        case 'AKP':
                            switch (a.alg) {
                                case 'ML-DSA-44':
                                case 'ML-DSA-65':
                                case 'ML-DSA-87':
                                    ((b = { name: a.alg }),
                                        (c = a.priv ? ['sign'] : ['verify']));
                                    break;
                                default:
                                    throw new n(
                                        'Invalid or unsupported JWK "alg" (Algorithm) Parameter value'
                                    );
                            }
                            break;
                        case 'RSA':
                            switch (a.alg) {
                                case 'PS256':
                                case 'PS384':
                                case 'PS512':
                                    ((b = {
                                        name: 'RSA-PSS',
                                        hash: `SHA-${a.alg.slice(-3)}`,
                                    }),
                                        (c = a.d ? ['sign'] : ['verify']));
                                    break;
                                case 'RS256':
                                case 'RS384':
                                case 'RS512':
                                    ((b = {
                                        name: 'RSASSA-PKCS1-v1_5',
                                        hash: `SHA-${a.alg.slice(-3)}`,
                                    }),
                                        (c = a.d ? ['sign'] : ['verify']));
                                    break;
                                case 'RSA-OAEP':
                                case 'RSA-OAEP-256':
                                case 'RSA-OAEP-384':
                                case 'RSA-OAEP-512':
                                    ((b = {
                                        name: 'RSA-OAEP',
                                        hash: `SHA-${parseInt(a.alg.slice(-3), 10) || 1}`,
                                    }),
                                        (c = a.d
                                            ? ['decrypt', 'unwrapKey']
                                            : ['encrypt', 'wrapKey']));
                                    break;
                                default:
                                    throw new n(
                                        'Invalid or unsupported JWK "alg" (Algorithm) Parameter value'
                                    );
                            }
                            break;
                        case 'EC':
                            switch (a.alg) {
                                case 'ES256':
                                    ((b = {
                                        name: 'ECDSA',
                                        namedCurve: 'P-256',
                                    }),
                                        (c = a.d ? ['sign'] : ['verify']));
                                    break;
                                case 'ES384':
                                    ((b = {
                                        name: 'ECDSA',
                                        namedCurve: 'P-384',
                                    }),
                                        (c = a.d ? ['sign'] : ['verify']));
                                    break;
                                case 'ES512':
                                    ((b = {
                                        name: 'ECDSA',
                                        namedCurve: 'P-521',
                                    }),
                                        (c = a.d ? ['sign'] : ['verify']));
                                    break;
                                case 'ECDH-ES':
                                case 'ECDH-ES+A128KW':
                                case 'ECDH-ES+A192KW':
                                case 'ECDH-ES+A256KW':
                                    ((b = { name: 'ECDH', namedCurve: a.crv }),
                                        (c = a.d ? ['deriveBits'] : []));
                                    break;
                                default:
                                    throw new n(
                                        'Invalid or unsupported JWK "alg" (Algorithm) Parameter value'
                                    );
                            }
                            break;
                        case 'OKP':
                            switch (a.alg) {
                                case 'Ed25519':
                                case 'EdDSA':
                                    ((b = { name: 'Ed25519' }),
                                        (c = a.d ? ['sign'] : ['verify']));
                                    break;
                                case 'ECDH-ES':
                                case 'ECDH-ES+A128KW':
                                case 'ECDH-ES+A192KW':
                                case 'ECDH-ES+A256KW':
                                    ((b = { name: a.crv }),
                                        (c = a.d ? ['deriveBits'] : []));
                                    break;
                                default:
                                    throw new n(
                                        'Invalid or unsupported JWK "alg" (Algorithm) Parameter value'
                                    );
                            }
                            break;
                        default:
                            throw new n(
                                'Invalid or unsupported JWK "kty" (Key Type) Parameter value'
                            );
                    }
                    return { algorithm: b, keyUsages: c };
                })(a),
                d = { ...a };
            return (
                'AKP' !== d.kty && delete d.alg,
                delete d.use,
                crypto.subtle.importKey(
                    'jwk',
                    d,
                    b,
                    a.ext ?? (!a.d && !a.priv),
                    a.key_ops ?? c
                )
            );
        }
        let L = async (a, c, d, e = !1) => {
            let f = (b ||= new WeakMap()).get(a);
            if (f?.[d]) return f[d];
            let g = await K({ ...c, alg: d });
            return (
                e && Object.freeze(a),
                f ? (f[d] = g) : b.set(a, { [d]: g }),
                g
            );
        };
        async function M(a, c) {
            if (a instanceof Uint8Array || B(a)) return a;
            if (C(a)) {
                if ('secret' === a.type) return a.export();
                if ('toCryptoKey' in a && 'function' == typeof a.toCryptoKey)
                    try {
                        return ((a, c) => {
                            let d,
                                e = (b ||= new WeakMap()).get(a);
                            if (e?.[c]) return e[c];
                            let f = 'public' === a.type,
                                g = !!f;
                            if ('x25519' === a.asymmetricKeyType) {
                                switch (c) {
                                    case 'ECDH-ES':
                                    case 'ECDH-ES+A128KW':
                                    case 'ECDH-ES+A192KW':
                                    case 'ECDH-ES+A256KW':
                                        break;
                                    default:
                                        throw TypeError(
                                            'given KeyObject instance cannot be used for this algorithm'
                                        );
                                }
                                d = a.toCryptoKey(
                                    a.asymmetricKeyType,
                                    g,
                                    f ? [] : ['deriveBits']
                                );
                            }
                            if ('ed25519' === a.asymmetricKeyType) {
                                if ('EdDSA' !== c && 'Ed25519' !== c)
                                    throw TypeError(
                                        'given KeyObject instance cannot be used for this algorithm'
                                    );
                                d = a.toCryptoKey(a.asymmetricKeyType, g, [
                                    f ? 'verify' : 'sign',
                                ]);
                            }
                            switch (a.asymmetricKeyType) {
                                case 'ml-dsa-44':
                                case 'ml-dsa-65':
                                case 'ml-dsa-87':
                                    if (c !== a.asymmetricKeyType.toUpperCase())
                                        throw TypeError(
                                            'given KeyObject instance cannot be used for this algorithm'
                                        );
                                    d = a.toCryptoKey(a.asymmetricKeyType, g, [
                                        f ? 'verify' : 'sign',
                                    ]);
                            }
                            if ('rsa' === a.asymmetricKeyType) {
                                let b;
                                switch (c) {
                                    case 'RSA-OAEP':
                                        b = 'SHA-1';
                                        break;
                                    case 'RS256':
                                    case 'PS256':
                                    case 'RSA-OAEP-256':
                                        b = 'SHA-256';
                                        break;
                                    case 'RS384':
                                    case 'PS384':
                                    case 'RSA-OAEP-384':
                                        b = 'SHA-384';
                                        break;
                                    case 'RS512':
                                    case 'PS512':
                                    case 'RSA-OAEP-512':
                                        b = 'SHA-512';
                                        break;
                                    default:
                                        throw TypeError(
                                            'given KeyObject instance cannot be used for this algorithm'
                                        );
                                }
                                if (c.startsWith('RSA-OAEP'))
                                    return a.toCryptoKey(
                                        { name: 'RSA-OAEP', hash: b },
                                        g,
                                        f ? ['encrypt'] : ['decrypt']
                                    );
                                d = a.toCryptoKey(
                                    {
                                        name: c.startsWith('PS')
                                            ? 'RSA-PSS'
                                            : 'RSASSA-PKCS1-v1_5',
                                        hash: b,
                                    },
                                    g,
                                    [f ? 'verify' : 'sign']
                                );
                            }
                            if ('ec' === a.asymmetricKeyType) {
                                let b = new Map([
                                    ['prime256v1', 'P-256'],
                                    ['secp384r1', 'P-384'],
                                    ['secp521r1', 'P-521'],
                                ]).get(a.asymmetricKeyDetails?.namedCurve);
                                if (!b)
                                    throw TypeError(
                                        'given KeyObject instance cannot be used for this algorithm'
                                    );
                                ('ES256' === c &&
                                    'P-256' === b &&
                                    (d = a.toCryptoKey(
                                        { name: 'ECDSA', namedCurve: b },
                                        g,
                                        [f ? 'verify' : 'sign']
                                    )),
                                    'ES384' === c &&
                                        'P-384' === b &&
                                        (d = a.toCryptoKey(
                                            { name: 'ECDSA', namedCurve: b },
                                            g,
                                            [f ? 'verify' : 'sign']
                                        )),
                                    'ES512' === c &&
                                        'P-521' === b &&
                                        (d = a.toCryptoKey(
                                            { name: 'ECDSA', namedCurve: b },
                                            g,
                                            [f ? 'verify' : 'sign']
                                        )),
                                    c.startsWith('ECDH-ES') &&
                                        (d = a.toCryptoKey(
                                            { name: 'ECDH', namedCurve: b },
                                            g,
                                            f ? [] : ['deriveBits']
                                        )));
                            }
                            if (!d)
                                throw TypeError(
                                    'given KeyObject instance cannot be used for this algorithm'
                                );
                            return (e ? (e[c] = d) : b.set(a, { [c]: d }), d);
                        })(a, c);
                    } catch (a) {
                        if (a instanceof TypeError) throw a;
                    }
                let d = a.export({ format: 'jwk' });
                return L(a, d, c);
            }
            if (F(a)) return a.k ? h(a.k) : L(a, a, c, !0);
            throw Error('unreachable');
        }
        class N {
            #a;
            #b;
            #c;
            constructor(a) {
                if (!(a instanceof Uint8Array))
                    throw TypeError(
                        'payload must be an instance of Uint8Array'
                    );
                this.#a = a;
            }
            setProtectedHeader(a) {
                if (this.#b)
                    throw TypeError(
                        'setProtectedHeader can only be called once'
                    );
                return ((this.#b = a), this);
            }
            setUnprotectedHeader(a) {
                if (this.#c)
                    throw TypeError(
                        'setUnprotectedHeader can only be called once'
                    );
                return ((this.#c = a), this);
            }
            async sign(a, b) {
                let c, d, e, h;
                if (!this.#b && !this.#c)
                    throw new o(
                        'either setProtectedHeader or setUnprotectedHeader must be called before #sign()'
                    );
                if (!A(this.#b, this.#c))
                    throw new o(
                        'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                    );
                let j = { ...this.#b, ...this.#c },
                    k = J(o, new Map([['b64', !0]]), b?.crit, this.#b, j),
                    l = !0;
                if (k.has('b64') && 'boolean' != typeof (l = this.#b.b64))
                    throw new o(
                        'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                    );
                let { alg: m } = j;
                if ('string' != typeof m || !m)
                    throw new o(
                        'JWS "alg" (Algorithm) Header Parameter missing or invalid'
                    );
                (I(m, a, 'sign'),
                    l ? (d = g((c = i(this.#a)))) : ((d = this.#a), (c = '')),
                    this.#b
                        ? (h = g((e = i(JSON.stringify(this.#b)))))
                        : ((e = ''), (h = new Uint8Array())));
                let n = f(h, g('.'), d),
                    p = await M(a, m),
                    q = { signature: i(await z(m, p, n)), payload: c };
                return (
                    this.#c && (q.header = this.#c),
                    this.#b && (q.protected = e),
                    q
                );
            }
        }
        class O {
            #d;
            constructor(a) {
                this.#d = new N(a);
            }
            setProtectedHeader(a) {
                return (this.#d.setProtectedHeader(a), this);
            }
            async sign(a, b) {
                let c = await this.#d.sign(a, b);
                if (void 0 === c.payload)
                    throw TypeError(
                        'use the flattened module for creating JWS with b64: false'
                    );
                return `${c.protected}.${c.payload}.${c.signature}`;
            }
        }
        let P = (a) => Math.floor(a.getTime() / 1e3),
            Q =
                /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
        function R(a) {
            let b,
                c = Q.exec(a);
            if (!c || (c[4] && c[1]))
                throw TypeError('Invalid time period format');
            let d = parseFloat(c[2]);
            switch (c[3].toLowerCase()) {
                case 'sec':
                case 'secs':
                case 'second':
                case 'seconds':
                case 's':
                    b = Math.round(d);
                    break;
                case 'minute':
                case 'minutes':
                case 'min':
                case 'mins':
                case 'm':
                    b = Math.round(60 * d);
                    break;
                case 'hour':
                case 'hours':
                case 'hr':
                case 'hrs':
                case 'h':
                    b = Math.round(3600 * d);
                    break;
                case 'day':
                case 'days':
                case 'd':
                    b = Math.round(86400 * d);
                    break;
                case 'week':
                case 'weeks':
                case 'w':
                    b = Math.round(604800 * d);
                    break;
                default:
                    b = Math.round(0x1e187e0 * d);
            }
            return '-' === c[1] || 'ago' === c[4] ? -b : b;
        }
        function S(a, b) {
            if (!Number.isFinite(b)) throw TypeError(`Invalid ${a} input`);
            return b;
        }
        let T = (a) =>
            a.includes('/')
                ? a.toLowerCase()
                : `application/${a.toLowerCase()}`;
        class U {
            #a;
            constructor(a) {
                if (!E(a)) throw TypeError('JWT Claims Set MUST be an object');
                this.#a = structuredClone(a);
            }
            data() {
                return d.encode(JSON.stringify(this.#a));
            }
            get iss() {
                return this.#a.iss;
            }
            set iss(a) {
                this.#a.iss = a;
            }
            get sub() {
                return this.#a.sub;
            }
            set sub(a) {
                this.#a.sub = a;
            }
            get aud() {
                return this.#a.aud;
            }
            set aud(a) {
                this.#a.aud = a;
            }
            set jti(a) {
                this.#a.jti = a;
            }
            set nbf(a) {
                'number' == typeof a
                    ? (this.#a.nbf = S('setNotBefore', a))
                    : a instanceof Date
                      ? (this.#a.nbf = S('setNotBefore', P(a)))
                      : (this.#a.nbf = P(new Date()) + R(a));
            }
            set exp(a) {
                'number' == typeof a
                    ? (this.#a.exp = S('setExpirationTime', a))
                    : a instanceof Date
                      ? (this.#a.exp = S('setExpirationTime', P(a)))
                      : (this.#a.exp = P(new Date()) + R(a));
            }
            set iat(a) {
                void 0 === a
                    ? (this.#a.iat = P(new Date()))
                    : a instanceof Date
                      ? (this.#a.iat = S('setIssuedAt', P(a)))
                      : 'string' == typeof a
                        ? (this.#a.iat = S('setIssuedAt', P(new Date()) + R(a)))
                        : (this.#a.iat = S('setIssuedAt', a));
            }
        }
        class V {
            #b;
            #e;
            constructor(a = {}) {
                this.#e = new U(a);
            }
            setIssuer(a) {
                return ((this.#e.iss = a), this);
            }
            setSubject(a) {
                return ((this.#e.sub = a), this);
            }
            setAudience(a) {
                return ((this.#e.aud = a), this);
            }
            setJti(a) {
                return ((this.#e.jti = a), this);
            }
            setNotBefore(a) {
                return ((this.#e.nbf = a), this);
            }
            setExpirationTime(a) {
                return ((this.#e.exp = a), this);
            }
            setIssuedAt(a) {
                return ((this.#e.iat = a), this);
            }
            setProtectedHeader(a) {
                return ((this.#b = a), this);
            }
            async sign(a, b) {
                let c = new O(this.#e.data());
                if (
                    (c.setProtectedHeader(this.#b),
                    Array.isArray(this.#b?.crit) &&
                        this.#b.crit.includes('b64') &&
                        !1 === this.#b.b64)
                )
                    throw new p('JWTs MUST NOT use unencoded payload');
                return c.sign(a, b);
            }
        }
        async function W(a, b, c, d) {
            let e = await y(a, b, 'verify');
            t(a, e);
            let f = s(a, e.algorithm);
            try {
                return await crypto.subtle.verify(f, e, c, d);
            } catch {
                return !1;
            }
        }
        async function X(a, b, c) {
            let i, j;
            if (!E(a)) throw new o('Flattened JWS must be an object');
            if (void 0 === a.protected && void 0 === a.header)
                throw new o(
                    'Flattened JWS must have either of the "protected" or "header" members'
                );
            if (void 0 !== a.protected && 'string' != typeof a.protected)
                throw new o('JWS Protected Header incorrect type');
            if (void 0 === a.payload) throw new o('JWS Payload missing');
            if ('string' != typeof a.signature)
                throw new o('JWS Signature missing or incorrect type');
            if (void 0 !== a.header && !E(a.header))
                throw new o('JWS Unprotected Header incorrect type');
            let k = {};
            if (a.protected)
                try {
                    let b = h(a.protected);
                    k = JSON.parse(e.decode(b));
                } catch {
                    throw new o('JWS Protected Header is invalid');
                }
            if (!A(k, a.header))
                throw new o(
                    'JWS Protected and JWS Unprotected Header Parameter names must be disjoint'
                );
            let l = { ...k, ...a.header },
                n = J(o, new Map([['b64', !0]]), c?.crit, k, l),
                p = !0;
            if (n.has('b64') && 'boolean' != typeof (p = k.b64))
                throw new o(
                    'The "b64" (base64url-encode payload) Header Parameter must be a boolean'
                );
            let { alg: q } = l;
            if ('string' != typeof q || !q)
                throw new o(
                    'JWS "alg" (Algorithm) Header Parameter missing or invalid'
                );
            let s =
                c &&
                (function (a, b) {
                    if (
                        void 0 !== b &&
                        (!Array.isArray(b) ||
                            b.some((a) => 'string' != typeof a))
                    )
                        throw TypeError(
                            `"${a}" option must be an array of strings`
                        );
                    if (b) return new Set(b);
                })('algorithms', c.algorithms);
            if (s && !s.has(q))
                throw new m(
                    '"alg" (Algorithm) Header Parameter value not allowed'
                );
            if (p) {
                if ('string' != typeof a.payload)
                    throw new o('JWS Payload must be a string');
            } else if (
                'string' != typeof a.payload &&
                !(a.payload instanceof Uint8Array)
            )
                throw new o(
                    'JWS Payload must be a string or an Uint8Array instance'
                );
            let t = !1;
            ('function' == typeof b && ((b = await b(k, a)), (t = !0)),
                I(q, b, 'verify'));
            let u = f(
                void 0 !== a.protected ? g(a.protected) : new Uint8Array(),
                g('.'),
                'string' == typeof a.payload
                    ? p
                        ? g(a.payload)
                        : d.encode(a.payload)
                    : a.payload
            );
            try {
                i = h(a.signature);
            } catch {
                throw new o('Failed to base64url decode the signature');
            }
            let v = await M(b, q);
            if (!(await W(q, v, i, u))) throw new r();
            if (p)
                try {
                    j = h(a.payload);
                } catch {
                    throw new o('Failed to base64url decode the payload');
                }
            else
                j =
                    'string' == typeof a.payload
                        ? d.encode(a.payload)
                        : a.payload;
            let w = { payload: j };
            return (void 0 !== a.protected && (w.protectedHeader = k),
            void 0 !== a.header && (w.unprotectedHeader = a.header),
            t)
                ? { ...w, key: v }
                : w;
        }
        async function Y(a, b, c) {
            if (
                (a instanceof Uint8Array && (a = e.decode(a)),
                'string' != typeof a)
            )
                throw new o('Compact JWS must be a string or Uint8Array');
            let { 0: d, 1: f, 2: g, length: h } = a.split('.');
            if (3 !== h) throw new o('Invalid Compact JWS');
            let i = await X({ payload: f, protected: d, signature: g }, b, c),
                j = { payload: i.payload, protectedHeader: i.protectedHeader };
            return 'function' == typeof b ? { ...j, key: i.key } : j;
        }
        async function Z(a, b, c) {
            let d = await Y(a, b, c);
            if (
                d.protectedHeader.crit?.includes('b64') &&
                !1 === d.protectedHeader.b64
            )
                throw new p('JWTs MUST NOT use unencoded payload');
            let f = {
                payload: (function (a, b, c = {}) {
                    var d, f;
                    let g, h;
                    try {
                        g = JSON.parse(e.decode(b));
                    } catch {}
                    if (!E(g))
                        throw new p(
                            'JWT Claims Set must be a top-level JSON object'
                        );
                    let { typ: i } = c;
                    if (i && ('string' != typeof a.typ || T(a.typ) !== T(i)))
                        throw new k(
                            'unexpected "typ" JWT header value',
                            g,
                            'typ',
                            'check_failed'
                        );
                    let {
                            requiredClaims: j = [],
                            issuer: m,
                            subject: n,
                            audience: o,
                            maxTokenAge: q,
                        } = c,
                        r = [...j];
                    for (let a of (void 0 !== q && r.push('iat'),
                    void 0 !== o && r.push('aud'),
                    void 0 !== n && r.push('sub'),
                    void 0 !== m && r.push('iss'),
                    new Set(r.reverse())))
                        if (!(a in g))
                            throw new k(
                                `missing required "${a}" claim`,
                                g,
                                a,
                                'missing'
                            );
                    if (m && !(Array.isArray(m) ? m : [m]).includes(g.iss))
                        throw new k(
                            'unexpected "iss" claim value',
                            g,
                            'iss',
                            'check_failed'
                        );
                    if (n && g.sub !== n)
                        throw new k(
                            'unexpected "sub" claim value',
                            g,
                            'sub',
                            'check_failed'
                        );
                    if (
                        o &&
                        ((d = g.aud),
                        (f = 'string' == typeof o ? [o] : o),
                        'string' == typeof d
                            ? !f.includes(d)
                            : !(
                                  Array.isArray(d) &&
                                  f.some(Set.prototype.has.bind(new Set(d)))
                              ))
                    )
                        throw new k(
                            'unexpected "aud" claim value',
                            g,
                            'aud',
                            'check_failed'
                        );
                    switch (typeof c.clockTolerance) {
                        case 'string':
                            h = R(c.clockTolerance);
                            break;
                        case 'number':
                            h = c.clockTolerance;
                            break;
                        case 'undefined':
                            h = 0;
                            break;
                        default:
                            throw TypeError(
                                'Invalid clockTolerance option type'
                            );
                    }
                    let { currentDate: s } = c,
                        t = P(s || new Date());
                    if ((void 0 !== g.iat || q) && 'number' != typeof g.iat)
                        throw new k(
                            '"iat" claim must be a number',
                            g,
                            'iat',
                            'invalid'
                        );
                    if (void 0 !== g.nbf) {
                        if ('number' != typeof g.nbf)
                            throw new k(
                                '"nbf" claim must be a number',
                                g,
                                'nbf',
                                'invalid'
                            );
                        if (g.nbf > t + h)
                            throw new k(
                                '"nbf" claim timestamp check failed',
                                g,
                                'nbf',
                                'check_failed'
                            );
                    }
                    if (void 0 !== g.exp) {
                        if ('number' != typeof g.exp)
                            throw new k(
                                '"exp" claim must be a number',
                                g,
                                'exp',
                                'invalid'
                            );
                        if (g.exp <= t - h)
                            throw new l(
                                '"exp" claim timestamp check failed',
                                g,
                                'exp',
                                'check_failed'
                            );
                    }
                    if (q) {
                        let a = t - g.iat;
                        if (a - h > ('number' == typeof q ? q : R(q)))
                            throw new l(
                                '"iat" claim timestamp check failed (too far in the past)',
                                g,
                                'iat',
                                'check_failed'
                            );
                        if (a < 0 - h)
                            throw new k(
                                '"iat" claim timestamp check failed (it should be in the past)',
                                g,
                                'iat',
                                'check_failed'
                            );
                    }
                    return g;
                })(d.protectedHeader, d.payload, c),
                protectedHeader: d.protectedHeader,
            };
            return 'function' == typeof b ? { ...f, key: d.key } : f;
        }
        var $ = a.i(766518);
        let _ = 'painel_session',
            aa = 'atendeplay.com.br',
            ab = `.${aa}`;
        function ac() {
            let a = process.env.PAINEL_JWT_SECRET;
            if (!a) throw Error('PAINEL_JWT_SECRET não definido no .env');
            return new TextEncoder().encode(a);
        }
        function ad(a) {
            let b = (
                a.get('x-forwarded-host') ||
                a.get('x-original-host') ||
                a.get('x-vercel-forwarded-host') ||
                a.get('host') ||
                ''
            )
                .trim()
                .toLowerCase();
            return (b.split(',')[0]?.trim() ?? '').split(':')[0];
        }
        async function ae() {
            let a = (function (a) {
                let b = String(a || '')
                    .trim()
                    .toLowerCase()
                    .split(':')[0];
                if (!b) return null;
                if ('localhost' === b || b.endsWith('.localhost'))
                    return 'atendeplay';
                if (b === aa || b === `www.${aa}`) return null;
                if (b.endsWith(`.${aa}`)) {
                    let a = b
                            .slice(0, -`.${aa}`.length)
                            .split('.')
                            .filter(Boolean),
                        c = 'www' === a[0] ? a[1] : a[0];
                    return c ? String(c) : null;
                }
                let c = b.split('.').filter(Boolean);
                if (c.length < 3) return null;
                let d = 'www' === c[0] ? c[1] : c[0];
                return d ? String(d) : null;
            })(ad(await (0, c.headers)()));
            if (!a) throw Error('tenant_not_found');
            return a;
        }
        function af(a) {
            let b = String(a || '').toUpperCase();
            return 'PLATFORM_OWNER' === b || 'PLATFORM_STAFF' === b;
        }
        async function ag(a) {
            let b = await $.prisma.company.findFirst({
                where: { slug: a, isActive: !0 },
                select: { id: !0, slug: !0 },
            });
            if (!b?.id) throw Error('missing_company');
            return { companyId: String(b.id), tenantSlug: String(b.slug ?? a) };
        }
        async function ah(a) {
            let b = {
                    id: !0,
                    units: { where: { isActive: !0 }, select: { unitId: !0 } },
                },
                c =
                    (a.userId
                        ? await $.prisma.professional.findFirst({
                              where: {
                                  companyId: a.companyId,
                                  userId: a.userId,
                                  isActive: !0,
                              },
                              select: b,
                          })
                        : null) ??
                    (a.email
                        ? await $.prisma.professional.findFirst({
                              where: {
                                  companyId: a.companyId,
                                  email: a.email,
                                  isActive: !0,
                              },
                              select: b,
                          })
                        : null);
            if (!c?.id) return null;
            let d = c.units.map((a) => String(a.unitId)).filter(Boolean),
                e = 1 === d.length ? d[0] : null;
            return { professionalId: String(c.id), unitId: e };
        }
        async function ai(a) {
            let b,
                c = String(a.id ?? '').trim(),
                d = String(a.email ?? '')
                    .trim()
                    .toLowerCase(),
                e = a.name ?? null;
            if (!c) throw Error('Sem acesso (id ausente).');
            if (!d) throw Error('Sem acesso (email ausente).');
            let f = String(a.role || '').toUpperCase();
            if (af(f))
                return await new V({ sub: c, role: f, email: d, name: e })
                    .setProtectedHeader({ alg: 'HS256' })
                    .setIssuedAt()
                    .setExpirationTime('28800s')
                    .sign(ac());
            if (
                'ADMIN' !== (b = String(f || '').toUpperCase()) &&
                'PROFESSIONAL' !== b
            )
                throw Error('permissao');
            let g = await ae(),
                { companyId: h, tenantSlug: i } = await ag(g);
            if ('ADMIN' === f) {
                let a = await $.prisma.user.findUnique({
                    where: { id: c },
                    select: {
                        adminAccesses: {
                            where: { companyId: h },
                            select: {
                                companyId: !0,
                                unitId: !0,
                                canAccessDashboard: !0,
                                canAccessReports: !0,
                                canAccessCheckout: !0,
                                canAccessAppointments: !0,
                                canAccessProfessionals: !0,
                                canAccessServices: !0,
                                canAccessReviews: !0,
                                canAccessProducts: !0,
                                canAccessClients: !0,
                                canAccessClientLevels: !0,
                                canAccessFinance: !0,
                                canAccessSettings: !0,
                            },
                        },
                        companyMemberships: {
                            where: { isActive: !0, companyId: h },
                            select: { companyId: !0, role: !0 },
                        },
                    },
                });
                if (!a) throw Error('Sem acesso');
                let b = a.companyMemberships?.[0] ?? null,
                    f = a.adminAccesses?.[0] ?? null;
                if (!b && !f) throw Error('missing_company');
                if ('OWNER' === String(b?.role ?? ''))
                    return await new V({
                        sub: c,
                        role: 'ADMIN',
                        email: d,
                        name: e,
                        tenantSlug: i,
                        companyId: h,
                        unitId: null,
                        canSeeAllUnits: !0,
                    })
                        .setProtectedHeader({ alg: 'HS256' })
                        .setIssuedAt()
                        .setExpirationTime('28800s')
                        .sign(ac());
                if (!b) throw Error('missing_company');
                let g = f;
                g ||
                    (g = await $.prisma.adminAccess.create({
                        data: {
                            companyId: h,
                            userId: c,
                            unitId: null,
                            canAccessDashboard: !0,
                            canAccessReports: !1,
                            canAccessCheckout: !1,
                            canAccessAppointments: !0,
                            canAccessProfessionals: !1,
                            canAccessServices: !1,
                            canAccessReviews: !1,
                            canAccessProducts: !1,
                            canAccessClients: !0,
                            canAccessClientLevels: !1,
                            canAccessFinance: !1,
                            canAccessSettings: !1,
                        },
                        select: {
                            companyId: !0,
                            unitId: !0,
                            canAccessDashboard: !0,
                            canAccessReports: !0,
                            canAccessCheckout: !0,
                            canAccessAppointments: !0,
                            canAccessProfessionals: !0,
                            canAccessServices: !0,
                            canAccessReviews: !0,
                            canAccessProducts: !0,
                            canAccessClients: !0,
                            canAccessClientLevels: !0,
                            canAccessFinance: !0,
                            canAccessSettings: !0,
                        },
                    }));
                let j = {
                    sub: c,
                    role: 'ADMIN',
                    email: d,
                    name: e,
                    tenantSlug: i,
                    companyId: h,
                    unitId: null == g.unitId ? null : String(g.unitId),
                    canSeeAllUnits: !1,
                };
                return await new V(j)
                    .setProtectedHeader({ alg: 'HS256' })
                    .setIssuedAt()
                    .setExpirationTime('28800s')
                    .sign(ac());
            }
            if ('PROFESSIONAL' !== f) throw Error('permissao');
            let j = await ah({ companyId: h, userId: c, email: d });
            if (!j) throw Error('permissao');
            let k = {
                sub: c,
                role: 'PROFESSIONAL',
                email: d,
                name: e,
                tenantSlug: i,
                companyId: h,
                unitId: j.unitId,
                canSeeAllUnits: !1,
                professionalId: j.professionalId,
            };
            return await new V(k)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('28800s')
                .sign(ac());
        }
        async function aj(a) {
            try {
                let { payload: b } = await Z(a, ac()),
                    c = String(b?.role ?? '').toUpperCase();
                if (
                    'ADMIN' !== c &&
                    'PROFESSIONAL' !== c &&
                    'PLATFORM_OWNER' !== c &&
                    'PLATFORM_STAFF' !== c
                )
                    return null;
                let d = {
                    sub: String(b?.sub ?? ''),
                    role: c,
                    email: String(b?.email ?? ''),
                    name: b?.name ?? null,
                    unitId: b?.unitId == null ? null : String(b.unitId),
                    canSeeAllUnits:
                        'boolean' == typeof b?.canSeeAllUnits
                            ? b.canSeeAllUnits
                            : void 0,
                    professionalId:
                        b?.professionalId == null
                            ? null
                            : String(b.professionalId),
                };
                if (af(c)) {
                    if (!d.sub || !d.email) return null;
                    return d;
                }
                let e = String(b?.tenantSlug ?? '')
                        .trim()
                        .toLowerCase(),
                    f = String(b?.companyId ?? '').trim();
                if (!e || !f) return null;
                return { ...d, tenantSlug: e, companyId: f };
            } catch {
                return null;
            }
        }
        async function ak() {
            let a = await (0, c.cookies)(),
                b = a.get(_)?.value;
            return b ? await aj(b) : null;
        }
        async function al(a) {
            let b = await ai(a),
                d = await (0, c.cookies)(),
                e = await (0, c.headers)(),
                f = ad(e),
                g = (function (a) {
                    let b = (a.get('x-forwarded-proto') || '').toLowerCase(),
                        c = b.split(',')[0]?.trim() ?? '';
                    if ('https' === c) return !0;
                    if ('http' === c) return !1;
                    let d = a.get('cf-visitor');
                    return (
                        !!(d && d.toLowerCase().includes('"scheme":"https"')) ||
                        'on' === (a.get('x-forwarded-ssl') || '').toLowerCase()
                    );
                })(e),
                h = (function (a) {
                    let b = String(a || '')
                        .trim()
                        .toLowerCase();
                    if (
                        b &&
                        !('localhost' === b || b.endsWith('.localhost')) &&
                        (b === aa || b.endsWith(`.${aa}`))
                    )
                        return ab;
                })(f);
            d.set(_, b, {
                httpOnly: !0,
                secure: g,
                sameSite: 'lax',
                path: '/',
                maxAge: 28800,
                domain: h,
            });
        }
        a.s(
            [
                'createPainelSessionCookie',
                () => al,
                'getCurrentPainelUser',
                () => ak,
            ],
            126918
        );
    },
];

//# sourceMappingURL=src_lib_painel-session_ts_6e4d8dbf._.js.map
