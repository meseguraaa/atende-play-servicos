module.exports = [
    193695,
    (a, b, c) => {
        b.exports = a.x(
            'next/dist/shared/lib/no-fallback-error.external.js',
            () => require('next/dist/shared/lib/no-fallback-error.external.js')
        );
    },
    650645,
    (a) => {
        a.n(a.i(827572));
    },
    262530,
    (a) => {
        a.n(a.i(688848));
    },
    409171,
    (a) => {
        a.n(a.i(753004));
    },
    21802,
    (a) => {
        a.n(a.i(277152));
    },
    155517,
    (a) => {
        a.n(a.i(298906));
    },
    444067,
    (a) => {
        a.n(a.i(436102));
    },
    28792,
    (a) => {
        'use strict';
        a.i(106878);
        var b = a.i(154840);
        a.i(330127);
        var c = a.i(766518),
            d = a.i(126918);
        a.i(110329);
        let e = {
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
        function f(a) {
            switch (a) {
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
        async function g() {
            let a = await (0, d.getCurrentPainelUser)();
            if (!a) return { ok: !1, reason: 'no_session' };
            if ('ADMIN' !== a.role) return { ok: !1, reason: 'not_admin' };
            let b = String(a.sub || '').trim(),
                e = String(a.companyId || '').trim();
            if (!b || !e) return { ok: !1, reason: 'invalid_token' };
            let f = await c.prisma.user.findUnique({
                where: { id: b },
                select: { id: !0, name: !0, email: !0, isActive: !0 },
            });
            if (!f?.id || !f.isActive)
                return { ok: !1, reason: 'user_inactive' };
            let g = await c.prisma.companyMember.findFirst({
                where: {
                    userId: b,
                    companyId: e,
                    isActive: !0,
                    role: { in: ['OWNER', 'ADMIN'] },
                },
                select: { role: !0 },
            });
            if (!g?.role) return { ok: !1, reason: 'no_membership' };
            let h = 'OWNER' === g.role;
            if (!h) {
                let a = await c.prisma.adminAccess.findFirst({
                    where: { userId: b, companyId: e },
                    select: { id: !0 },
                });
                if (!a?.id) return { ok: !1, reason: 'no_access' };
            }
            return {
                ok: !0,
                ctx: {
                    id: f.id,
                    name: f.name ?? null,
                    email: f.email,
                    companyId: e,
                    isOwner: h,
                },
            };
        }
        let h = [
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
        async function i(a) {
            let d = (function (a) {
                if (!a) return null;
                for (let b of h) {
                    let c = f(b.module);
                    if (c && a[c]) return b.href;
                }
                return null;
            })(
                await c.prisma.adminAccess.findFirst({
                    where: { companyId: a.companyId, userId: a.userId },
                    select: e,
                })
            );
            if (d)
                throw (
                    (0, b.redirect)(`${d}?error=permissao`),
                    Error('unreachable')
                );
            throw (
                (0, b.redirect)('/painel/login?error=permissao'),
                Error('unreachable')
            );
        }
        async function j(a) {
            let d = await g();
            d.ok ||
                (function (a) {
                    switch (a) {
                        case 'no_session':
                            (0, b.redirect)('/painel/login?error=credenciais');
                        case 'not_admin':
                            (0, b.redirect)('/painel/login?error=permissao');
                        default:
                            (0, b.redirect)('/painel/login?error=permissao');
                    }
                })(d.reason);
            let h = d.ctx;
            if (h.isOwner) {
                if ('PARTNERS' === a)
                    throw (
                        await i({ companyId: h.companyId, userId: h.id }),
                        Error('unreachable')
                    );
                return {
                    id: h.id,
                    name: h.name,
                    email: h.email,
                    role: 'ADMIN',
                    isOwner: !0,
                    companyId: h.companyId,
                    unitId: null,
                    canSeeAllUnits: !0,
                };
            }
            let j = f(a);
            if (!j)
                throw (
                    await i({ companyId: h.companyId, userId: h.id }),
                    Error('unreachable')
                );
            let k = await c.prisma.adminAccess.findFirst({
                where: { userId: h.id, companyId: h.companyId },
                select: e,
            });
            if (!k || !k[j])
                throw (
                    await i({ companyId: h.companyId, userId: h.id }),
                    Error('unreachable')
                );
            return {
                id: h.id,
                name: h.name,
                email: h.email,
                role: 'ADMIN',
                isOwner: !1,
                companyId: h.companyId,
                unitId: null,
                canSeeAllUnits: !1,
            };
        }
        a.s(['requireAdminForModule', () => j]);
    },
    48838,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/admin/client-level/config/ui-client.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/admin/client-level/config/ui-client.tsx <module evaluation>',
            'default'
        );
        a.s(['default', 0, b]);
    },
    138302,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/admin/client-level/config/ui-client.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/admin/client-level/config/ui-client.tsx',
            'default'
        );
        a.s(['default', 0, b]);
    },
    89849,
    (a) => {
        'use strict';
        a.i(48838);
        var b = a.i(138302);
        a.n(b);
    },
    637649,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(169513),
            d = a.i(28792),
            e = a.i(89849);
        async function f() {
            let a = await (0, c.headers)(),
                b = a.get('x-forwarded-proto') ?? 'http',
                d =
                    a.get('x-forwarded-host') ??
                    a.get('host') ??
                    'localhost:3000';
            return `${b}://${d}`;
        }
        async function g({ searchParams: a }) {
            await (0, d.requireAdminForModule)('CLIENT_LEVELS');
            let g = (await a).unitId,
                h = Array.isArray(g) ? g[0] : g,
                i = new URL('/api/admin/client-levels/config', await f());
            h && i.searchParams.set('unitId', h);
            let j = null,
                k = null;
            try {
                let a = (await (0, c.headers)()).get('cookie') ?? '',
                    b = await fetch(i.toString(), {
                        method: 'GET',
                        cache: 'no-store',
                        headers: { Accept: 'application/json', cookie: a },
                    });
                if (b.status >= 300 && b.status < 400)
                    k =
                        'Sessão não reconhecida na API (redirect). Verifique cookies/autenticação.';
                else {
                    let a = await b.json();
                    b.ok && a.ok
                        ? (j = a.data)
                        : (k =
                              !a.ok && a.error
                                  ? a.error
                                  : 'Falha ao carregar dados.');
                }
            } catch (a) {
                k =
                    'string' == typeof a?.message
                        ? a.message
                        : 'Falha ao carregar dados.';
            }
            return (0, b.jsx)(e.default, { error: k, initialData: j });
        }
        a.s([
            'default',
            () => g,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Admin | Nível de Cliente | Configurações' },
        ]);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f99a7681._.js.map
