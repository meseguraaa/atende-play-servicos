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
    255998,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/admin/checkout/admin-checkout-client.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/admin/checkout/admin-checkout-client.tsx <module evaluation>',
            'default'
        );
        a.s(['default', 0, b]);
    },
    664198,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/admin/checkout/admin-checkout-client.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/admin/checkout/admin-checkout-client.tsx',
            'default'
        );
        a.s(['default', 0, b]);
    },
    960661,
    (a) => {
        'use strict';
        a.i(255998);
        var b = a.i(664198);
        a.n(b);
    },
    333054,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(169513),
            d = a.i(28792),
            e = a.i(960661);
        async function f(a) {
            let b = await (0, c.headers)(),
                d = (function (a) {
                    let b = (process.env.PAINEL_BASE_URL || '').trim();
                    if (b) return b.replace(/\/+$/, '');
                    let c = (
                        (a.get('x-forwarded-host') ?? '').trim() ||
                        a.get('host') ||
                        ''
                    ).trim();
                    if (
                        c.endsWith('.atendeplay.com.br') &&
                        'painel.atendeplay.com.br' !== c
                    )
                        return 'https://painel.atendeplay.com.br';
                    let d =
                        (a.get('x-forwarded-proto') ?? 'https').trim() ||
                        'https';
                    return c
                        ? `${d}://${c}`
                        : 'https://painel.atendeplay.com.br';
                })(b),
                e = new URLSearchParams();
            (a.month && e.set('month', a.month),
                a.unit && e.set('unit', a.unit));
            let f = `${d}/api/admin/checkout${e.toString() ? `?${e.toString()}` : ''}`,
                g = await fetch(f, {
                    method: 'GET',
                    cache: 'no-store',
                    headers: { cookie: b.get('cookie') ?? '' },
                }),
                h = await g.json().catch(() => null);
            return g.ok && h
                ? h
                : { ok: !1, error: 'Falha ao carregar dados do checkout.' };
        }
        async function g({ searchParams: a }) {
            let c = await (0, d.requireAdminForModule)('CHECKOUT'),
                g = (await a) ?? {},
                h = g.month,
                i = g.unit,
                j = await f({ month: h, unit: i }),
                k = j.ok ? j.data.monthLabel : '—',
                l = j.ok ? j.data.openAccounts : [],
                m = j.ok ? j.data.monthGroups : [];
            return (0, b.jsx)(e.default, {
                canSeeAllUnits: c.canSeeAllUnits,
                monthLabel: k,
                openAccounts: l,
                monthGroups: m,
            });
        }
        a.s([
            'default',
            () => g,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Admin | Checkout' },
        ]);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b31b99a2._.js.map
