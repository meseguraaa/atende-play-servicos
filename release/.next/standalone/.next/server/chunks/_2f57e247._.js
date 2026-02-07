module.exports = [
    374534,
    (e, r, t) => {
        'use strict';
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'ReadonlyURLSearchParams', {
                enumerable: !0,
                get: function () {
                    return o;
                },
            }));
        class n extends Error {
            constructor() {
                super(
                    'Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams'
                );
            }
        }
        class o extends URLSearchParams {
            append() {
                throw new n();
            }
            delete() {
                throw new n();
            }
            set() {
                throw new n();
            }
            sort() {
                throw new n();
            }
        }
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    534866,
    (e, r, t) => {
        'use strict';
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'RedirectStatusCode', {
                enumerable: !0,
                get: function () {
                    return o;
                },
            }));
        var n,
            o =
                (((n = {})[(n.SeeOther = 303)] = 'SeeOther'),
                (n[(n.TemporaryRedirect = 307)] = 'TemporaryRedirect'),
                (n[(n.PermanentRedirect = 308)] = 'PermanentRedirect'),
                n);
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    774785,
    (e, r, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var n,
            o = {
                REDIRECT_ERROR_CODE: function () {
                    return u;
                },
                RedirectType: function () {
                    return s;
                },
                isRedirectError: function () {
                    return c;
                },
            };
        for (var i in o)
            Object.defineProperty(t, i, { enumerable: !0, get: o[i] });
        let a = e.r(534866),
            u = 'NEXT_REDIRECT';
        var s = (((n = {}).push = 'push'), (n.replace = 'replace'), n);
        function c(e) {
            if (
                'object' != typeof e ||
                null === e ||
                !('digest' in e) ||
                'string' != typeof e.digest
            )
                return !1;
            let r = e.digest.split(';'),
                [t, n] = r,
                o = r.slice(2, -2).join(';'),
                i = Number(r.at(-2));
            return (
                t === u &&
                ('replace' === n || 'push' === n) &&
                'string' == typeof o &&
                !isNaN(i) &&
                i in a.RedirectStatusCode
            );
        }
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    753561,
    (e, r, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var n = {
            getRedirectError: function () {
                return s;
            },
            getRedirectStatusCodeFromError: function () {
                return p;
            },
            getRedirectTypeFromError: function () {
                return f;
            },
            getURLFromRedirectError: function () {
                return d;
            },
            permanentRedirect: function () {
                return l;
            },
            redirect: function () {
                return c;
            },
        };
        for (var o in n)
            Object.defineProperty(t, o, { enumerable: !0, get: n[o] });
        let i = e.r(534866),
            a = e.r(774785),
            u = e.r(120635).actionAsyncStorage;
        function s(e, r, t = i.RedirectStatusCode.TemporaryRedirect) {
            let n = Object.defineProperty(
                Error(a.REDIRECT_ERROR_CODE),
                '__NEXT_ERROR_CODE',
                { value: 'E394', enumerable: !1, configurable: !0 }
            );
            return ((n.digest = `${a.REDIRECT_ERROR_CODE};${r};${e};${t};`), n);
        }
        function c(e, r) {
            throw s(
                e,
                (r ??= u?.getStore()?.isAction
                    ? a.RedirectType.push
                    : a.RedirectType.replace),
                i.RedirectStatusCode.TemporaryRedirect
            );
        }
        function l(e, r = a.RedirectType.replace) {
            throw s(e, r, i.RedirectStatusCode.PermanentRedirect);
        }
        function d(e) {
            return (0, a.isRedirectError)(e)
                ? e.digest.split(';').slice(2, -2).join(';')
                : null;
        }
        function f(e) {
            if (!(0, a.isRedirectError)(e))
                throw Object.defineProperty(
                    Error('Not a redirect error'),
                    '__NEXT_ERROR_CODE',
                    { value: 'E260', enumerable: !1, configurable: !0 }
                );
            return e.digest.split(';', 2)[1];
        }
        function p(e) {
            if (!(0, a.isRedirectError)(e))
                throw Object.defineProperty(
                    Error('Not a redirect error'),
                    '__NEXT_ERROR_CODE',
                    { value: 'E260', enumerable: !1, configurable: !0 }
                );
            return Number(e.digest.split(';').at(-2));
        }
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    411842,
    (e, r, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var n = {
            HTTPAccessErrorStatus: function () {
                return i;
            },
            HTTP_ERROR_FALLBACK_ERROR_CODE: function () {
                return u;
            },
            getAccessFallbackErrorTypeByStatus: function () {
                return l;
            },
            getAccessFallbackHTTPStatus: function () {
                return c;
            },
            isHTTPAccessFallbackError: function () {
                return s;
            },
        };
        for (var o in n)
            Object.defineProperty(t, o, { enumerable: !0, get: n[o] });
        let i = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 },
            a = new Set(Object.values(i)),
            u = 'NEXT_HTTP_ERROR_FALLBACK';
        function s(e) {
            if (
                'object' != typeof e ||
                null === e ||
                !('digest' in e) ||
                'string' != typeof e.digest
            )
                return !1;
            let [r, t] = e.digest.split(';');
            return r === u && a.has(Number(t));
        }
        function c(e) {
            return Number(e.digest.split(';')[1]);
        }
        function l(e) {
            switch (e) {
                case 401:
                    return 'unauthorized';
                case 403:
                    return 'forbidden';
                case 404:
                    return 'not-found';
                default:
                    return;
            }
        }
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    947517,
    (e, r, t) => {
        'use strict';
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'notFound', {
                enumerable: !0,
                get: function () {
                    return i;
                },
            }));
        let n = e.r(411842),
            o = `${n.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
        function i() {
            let e = Object.defineProperty(Error(o), '__NEXT_ERROR_CODE', {
                value: 'E394',
                enumerable: !1,
                configurable: !0,
            });
            throw ((e.digest = o), e);
        }
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    690215,
    (e, r, t) => {
        'use strict';
        function n() {
            throw Object.defineProperty(
                Error(
                    '`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.'
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E488', enumerable: !1, configurable: !0 }
            );
        }
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'forbidden', {
                enumerable: !0,
                get: function () {
                    return n;
                },
            }),
            e.r(411842).HTTP_ERROR_FALLBACK_ERROR_CODE,
            ('function' == typeof t.default ||
                ('object' == typeof t.default && null !== t.default)) &&
                void 0 === t.default.__esModule &&
                (Object.defineProperty(t.default, '__esModule', { value: !0 }),
                Object.assign(t.default, t),
                (r.exports = t.default)));
    },
    476294,
    (e, r, t) => {
        'use strict';
        function n() {
            throw Object.defineProperty(
                Error(
                    '`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.'
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E411', enumerable: !1, configurable: !0 }
            );
        }
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'unauthorized', {
                enumerable: !0,
                get: function () {
                    return n;
                },
            }),
            e.r(411842).HTTP_ERROR_FALLBACK_ERROR_CODE,
            ('function' == typeof t.default ||
                ('object' == typeof t.default && null !== t.default)) &&
                void 0 === t.default.__esModule &&
                (Object.defineProperty(t.default, '__esModule', { value: !0 }),
                Object.assign(t.default, t),
                (r.exports = t.default)));
    },
    548877,
    (e, r, t) => {
        'use strict';
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'isPostpone', {
                enumerable: !0,
                get: function () {
                    return o;
                },
            }));
        let n = Symbol.for('react.postpone');
        function o(e) {
            return 'object' == typeof e && null !== e && e.$$typeof === n;
        }
    },
    378641,
    (e, r, t) => {
        'use strict';
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'isNextRouterError', {
                enumerable: !0,
                get: function () {
                    return i;
                },
            }));
        let n = e.r(411842),
            o = e.r(774785);
        function i(e) {
            return (
                (0, o.isRedirectError)(e) || (0, n.isHTTPAccessFallbackError)(e)
            );
        }
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    363945,
    (e, r, t) => {
        'use strict';
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'unstable_rethrow', {
                enumerable: !0,
                get: function () {
                    return function e(r) {
                        if (
                            (0, a.isNextRouterError)(r) ||
                            (0, i.isBailoutToCSRError)(r) ||
                            (0, s.isDynamicServerError)(r) ||
                            (0, u.isDynamicPostpone)(r) ||
                            (0, o.isPostpone)(r) ||
                            (0, n.isHangingPromiseRejectionError)(r) ||
                            (0, u.isPrerenderInterruptedError)(r)
                        )
                            throw r;
                        r instanceof Error && 'cause' in r && e(r.cause);
                    };
                },
            }));
        let n = e.r(23206),
            o = e.r(548877),
            i = e.r(506941),
            a = e.r(378641),
            u = e.r(581344),
            s = e.r(5996);
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    575576,
    (e, r, t) => {
        'use strict';
        (Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'unstable_rethrow', {
                enumerable: !0,
                get: function () {
                    return n;
                },
            }));
        let n = e.r(363945).unstable_rethrow;
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    609175,
    (e, r, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var n = {
            ReadonlyURLSearchParams: function () {
                return i.ReadonlyURLSearchParams;
            },
            RedirectType: function () {
                return u.RedirectType;
            },
            forbidden: function () {
                return c.forbidden;
            },
            notFound: function () {
                return s.notFound;
            },
            permanentRedirect: function () {
                return a.permanentRedirect;
            },
            redirect: function () {
                return a.redirect;
            },
            unauthorized: function () {
                return l.unauthorized;
            },
            unstable_isUnrecognizedActionError: function () {
                return f;
            },
            unstable_rethrow: function () {
                return d.unstable_rethrow;
            },
        };
        for (var o in n)
            Object.defineProperty(t, o, { enumerable: !0, get: n[o] });
        let i = e.r(374534),
            a = e.r(753561),
            u = e.r(774785),
            s = e.r(947517),
            c = e.r(690215),
            l = e.r(476294),
            d = e.r(575576);
        function f() {
            throw Object.defineProperty(
                Error(
                    '`unstable_isUnrecognizedActionError` can only be used on the client.'
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E776', enumerable: !1, configurable: !0 }
            );
        }
        ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (r.exports = t.default));
    },
    212669,
    331751,
    (e) => {
        'use strict';
        var r = e.i(609175),
            t = e.i(738342),
            n = e.i(698043),
            o = e.i(52359);
        async function i() {
            let e = await (0, o.getCurrentPainelUser)();
            if (!e) return { ok: !1, reason: 'no_session' };
            let r = String(e.role || '').trim();
            if ('PLATFORM_OWNER' !== r && 'PLATFORM_STAFF' !== r)
                return { ok: !1, reason: 'not_platform' };
            let t = String(e.sub || '').trim();
            if (!t) return { ok: !1, reason: 'invalid_token' };
            let i = await n.prisma.user.findUnique({
                where: { id: t },
                select: { id: !0, name: !0, email: !0, isActive: !0, role: !0 },
            });
            if (!i?.id || !i.isActive)
                return { ok: !1, reason: 'user_inactive' };
            let a = String(i.role || '').trim();
            return 'PLATFORM_OWNER' !== a && 'PLATFORM_STAFF' !== a
                ? { ok: !1, reason: 'not_platform' }
                : {
                      ok: !0,
                      ctx: {
                          id: i.id,
                          name: i.name ?? null,
                          email: i.email,
                          role: a,
                      },
                  };
        }
        async function a(e) {
            let r = await i();
            if (!r.ok)
                return t.NextResponse.json(
                    { ok: !1, error: 'unauthorized' },
                    { status: 401 }
                );
            let n = {
                id: r.ctx.id,
                name: r.ctx.name,
                email: r.ctx.email,
                role: r.ctx.role,
            };
            return 'PLATFORM_OWNER' !== n.role &&
                ('PLATFORM_STAFF' !== n.role ||
                    'BILLING' === e ||
                    'SETTINGS' === e)
                ? t.NextResponse.json(
                      { ok: !1, error: 'forbidden' },
                      { status: 403 }
                  )
                : n;
        }
        e.s(['requirePlatformForModuleApi', () => a], 331751);
        let u = {
            canAccessDashboard: !0,
            canAccessReports: !0,
            canAccessCheckout: !0,
            canAccessAppointments: !0,
            canAccessProfessionals: !0,
            canAccessServices: !0,
            canAccessReviews: !0,
            canAccessProducts: !0,
            canAccessPartners: !0,
            canAccessClients: !0,
            canAccessClientLevels: !0,
            canAccessFinance: !0,
            canAccessSettings: !0,
        };
        function s(e) {
            switch (e) {
                case 'DASHBOARD':
                    return 'canAccessDashboard';
                case 'REPORTS':
                    return 'canAccessReports';
                case 'CHECKOUT':
                    return 'canAccessCheckout';
                case 'APPOINTMENTS':
                    return 'canAccessAppointments';
                case 'PROFESSIONALS':
                    return 'canAccessProfessionals';
                case 'SERVICES':
                    return 'canAccessServices';
                case 'REVIEWS':
                    return 'canAccessReviews';
                case 'PRODUCTS':
                    return 'canAccessProducts';
                case 'PARTNERS':
                default:
                    return null;
                case 'CLIENTS':
                    return 'canAccessClients';
                case 'CLIENT_LEVELS':
                    return 'canAccessClientLevels';
                case 'FINANCE':
                    return 'canAccessFinance';
                case 'SETTINGS':
                    return 'canAccessSettings';
            }
        }
        async function c() {
            let e = await (0, o.getCurrentPainelUser)();
            if (!e) return { ok: !1, reason: 'no_session' };
            if ('ADMIN' !== e.role) return { ok: !1, reason: 'not_admin' };
            let r = String(e.sub || '').trim(),
                t = String(e.companyId || '').trim();
            if (!r || !t) return { ok: !1, reason: 'invalid_token' };
            let i = await n.prisma.user.findUnique({
                where: { id: r },
                select: { id: !0, name: !0, email: !0, isActive: !0 },
            });
            if (!i?.id || !i.isActive)
                return { ok: !1, reason: 'user_inactive' };
            let a = await n.prisma.companyMember.findFirst({
                where: {
                    userId: r,
                    companyId: t,
                    isActive: !0,
                    role: { in: ['OWNER', 'ADMIN'] },
                },
                select: { role: !0 },
            });
            if (!a?.role) return { ok: !1, reason: 'no_membership' };
            let u = 'OWNER' === a.role;
            if (!u) {
                let e = await n.prisma.adminAccess.findFirst({
                    where: { userId: r, companyId: t },
                    select: { id: !0 },
                });
                if (!e?.id) return { ok: !1, reason: 'no_access' };
            }
            return {
                ok: !0,
                ctx: {
                    id: i.id,
                    name: i.name ?? null,
                    email: i.email,
                    companyId: t,
                    isOwner: u,
                },
            };
        }
        let l = [
            { module: 'APPOINTMENTS', href: '/admin/appointments' },
            { module: 'CHECKOUT', href: '/admin/checkout' },
            { module: 'PROFESSIONALS', href: '/admin/professionals' },
            { module: 'SERVICES', href: '/admin/services' },
            { module: 'PRODUCTS', href: '/admin/products' },
            { module: 'CLIENTS', href: '/admin/clients' },
            { module: 'CLIENT_LEVELS', href: '/admin/client-levels' },
            { module: 'REVIEWS', href: '/admin/review-tags' },
            { module: 'REPORTS', href: '/admin/reports' },
            { module: 'FINANCE', href: '/admin/finance' },
            { module: 'SETTINGS', href: '/admin/setting' },
            { module: 'DASHBOARD', href: '/admin/dashboard' },
        ];
        function d(e) {
            if (!e) return null;
            for (let r of l) {
                let t = s(r.module);
                if (t && e[t]) return r.href;
            }
            return null;
        }
        async function f(e) {
            let t = d(
                await n.prisma.adminAccess.findFirst({
                    where: { companyId: e.companyId, userId: e.userId },
                    select: u,
                })
            );
            if (t)
                throw (
                    (0, r.redirect)(`${t}?error=permissao`),
                    Error('unreachable')
                );
            throw (
                (0, r.redirect)('/painel/login?error=permissao'),
                Error('unreachable')
            );
        }
        async function p(e) {
            let t = await c();
            t.ok ||
                (function (e) {
                    switch (e) {
                        case 'no_session':
                            (0, r.redirect)('/painel/login?error=credenciais');
                        case 'not_admin':
                            (0, r.redirect)('/painel/login?error=permissao');
                        default:
                            (0, r.redirect)('/painel/login?error=permissao');
                    }
                })(t.reason);
            let o = t.ctx;
            if (o.isOwner) {
                if ('PARTNERS' === e)
                    throw (
                        await f({ companyId: o.companyId, userId: o.id }),
                        Error('unreachable')
                    );
                return {
                    id: o.id,
                    name: o.name,
                    email: o.email,
                    role: 'ADMIN',
                    isOwner: !0,
                    companyId: o.companyId,
                    unitId: null,
                    canSeeAllUnits: !0,
                };
            }
            let i = s(e);
            if (!i)
                throw (
                    await f({ companyId: o.companyId, userId: o.id }),
                    Error('unreachable')
                );
            let a = await n.prisma.adminAccess.findFirst({
                where: { userId: o.id, companyId: o.companyId },
                select: u,
            });
            if (!a || !a[i])
                throw (
                    await f({ companyId: o.companyId, userId: o.id }),
                    Error('unreachable')
                );
            return {
                id: o.id,
                name: o.name,
                email: o.email,
                role: 'ADMIN',
                isOwner: !1,
                companyId: o.companyId,
                unitId: null,
                canSeeAllUnits: !1,
            };
        }
        async function m(e) {
            let r = await c();
            if (!r.ok)
                return t.NextResponse.json(
                    { ok: !1, error: 'unauthorized' },
                    { status: 401 }
                );
            let o = r.ctx;
            if (o.isOwner)
                return 'PARTNERS' === e
                    ? t.NextResponse.json(
                          { ok: !1, error: 'forbidden' },
                          { status: 403 }
                      )
                    : {
                          id: o.id,
                          name: o.name,
                          email: o.email,
                          role: 'ADMIN',
                          isOwner: !0,
                          companyId: o.companyId,
                          unitId: null,
                          canSeeAllUnits: !0,
                      };
            let i = s(e);
            if (!i)
                return t.NextResponse.json(
                    { ok: !1, error: 'forbidden' },
                    { status: 403 }
                );
            let a = await n.prisma.adminAccess.findFirst({
                where: { userId: o.id, companyId: o.companyId },
                select: u,
            });
            if (!a || !a[i]) {
                let e = d(a);
                return t.NextResponse.json(
                    { ok: !1, error: 'forbidden', fallback: e },
                    { status: 403 }
                );
            }
            return {
                id: o.id,
                name: o.name,
                email: o.email,
                role: 'ADMIN',
                isOwner: !1,
                companyId: o.companyId,
                unitId: null,
                canSeeAllUnits: !1,
            };
        }
        e.s(
            [
                'requireAdminForModule',
                () => p,
                'requireAdminForModuleApi',
                () => m,
            ],
            212669
        );
    },
];

//# sourceMappingURL=_2f57e247._.js.map
