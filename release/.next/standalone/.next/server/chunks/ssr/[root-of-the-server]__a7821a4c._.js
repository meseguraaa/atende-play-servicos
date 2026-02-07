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
    478983,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call ServiceRow() from the server but ServiceRow is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/services/service-row/service-row.tsx <module evaluation>',
            'ServiceRow'
        );
        a.s(['ServiceRow', 0, b]);
    },
    281847,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call ServiceRow() from the server but ServiceRow is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/services/service-row/service-row.tsx',
            'ServiceRow'
        );
        a.s(['ServiceRow', 0, b]);
    },
    175527,
    (a) => {
        'use strict';
        a.i(478983);
        var b = a.i(281847);
        a.n(b);
    },
    115730,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call ServiceNewDialog() from the server but ServiceNewDialog is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/services/service-new-dialog/service-new-dialog.tsx <module evaluation>',
            'ServiceNewDialog'
        );
        a.s(['ServiceNewDialog', 0, b]);
    },
    722343,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call ServiceNewDialog() from the server but ServiceNewDialog is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/services/service-new-dialog/service-new-dialog.tsx',
            'ServiceNewDialog'
        );
        a.s(['ServiceNewDialog', 0, b]);
    },
    658100,
    (a) => {
        'use strict';
        a.i(115730);
        var b = a.i(722343);
        a.n(b);
    },
    688360,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(766518),
            d = a.i(28792),
            e = a.i(175527),
            f = a.i(658100);
        async function g() {
            let a = await (0, d.requireAdminForModule)('SERVICES'),
                g = a.companyId?.trim();
            if (!g)
                return (0, b.jsxs)('div', {
                    className: 'max-w-7xl space-y-6',
                    children: [
                        (0, b.jsxs)('header', {
                            className:
                                'flex items-center justify-between gap-4',
                            children: [
                                (0, b.jsxs)('div', {
                                    children: [
                                        (0, b.jsx)('h1', {
                                            className:
                                                'text-title text-content-primary',
                                            children: 'Serviços',
                                        }),
                                        (0, b.jsx)('p', {
                                            className:
                                                'text-paragraph-medium-size text-content-secondary',
                                            children:
                                                'Gerencie os serviços, duração, comissões e regras de cancelamento.',
                                        }),
                                    ],
                                }),
                                (0, b.jsx)(f.ServiceNewDialog, {}),
                            ],
                        }),
                        (0, b.jsx)('section', {
                            className:
                                'rounded-xl border border-border-primary bg-background-tertiary p-6',
                            children: (0, b.jsxs)('p', {
                                className:
                                    'text-paragraph-medium-size text-content-secondary',
                                children: [
                                    'Sessão sem ',
                                    (0, b.jsx)('b', { children: 'companyId' }),
                                    '. Este painel é multi-tenant: vincule o admin a uma empresa.',
                                ],
                            }),
                        }),
                    ],
                });
            let h = (
                await c.prisma.service.findMany({
                    where: { companyId: g },
                    orderBy: { name: 'asc' },
                    select: {
                        id: !0,
                        unitId: !0,
                        companyId: !0,
                        name: !0,
                        price: !0,
                        durationMinutes: !0,
                        isActive: !0,
                        professionalPercentage: !0,
                        cancelLimitHours: !0,
                        cancelFeePercentage: !0,
                    },
                })
            ).map((a) => {
                let b = Number(a.price.toString()),
                    c = Number(a.professionalPercentage.toString()),
                    d =
                        null === a.cancelFeePercentage
                            ? null
                            : Number(a.cancelFeePercentage.toString());
                return {
                    id: a.id,
                    unitId: a.unitId ?? null,
                    name: a.name,
                    description: null,
                    priceInCents: Number.isFinite(b)
                        ? Math.round(100 * b)
                        : null,
                    durationInMinutes:
                        'number' == typeof a.durationMinutes
                            ? a.durationMinutes
                            : null,
                    barberPercentage: Number.isFinite(c) ? c : null,
                    cancelLimitHours: a.cancelLimitHours ?? null,
                    cancelFeePercentage:
                        null !== d && Number.isFinite(d) ? d : null,
                    isActive: !!a.isActive,
                    companyId: a.companyId ?? null,
                };
            });
            return (0, b.jsxs)('div', {
                className: 'max-w-7xl space-y-6',
                children: [
                    (0, b.jsxs)('header', {
                        className: 'flex items-center justify-between gap-4',
                        children: [
                            (0, b.jsxs)('div', {
                                children: [
                                    (0, b.jsx)('h1', {
                                        className:
                                            'text-title text-content-primary',
                                        children: 'Serviços',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-paragraph-medium-size text-content-secondary',
                                        children:
                                            'Gerencie os serviços, duração, comissões e regras de cancelamento.',
                                    }),
                                ],
                            }),
                            (0, b.jsx)(f.ServiceNewDialog, {}),
                        ],
                    }),
                    (0, b.jsx)('section', {
                        className:
                            'overflow-x-auto rounded-xl border border-border-primary bg-background-tertiary',
                        children: (0, b.jsxs)('table', {
                            className:
                                'w-full table-fixed border-collapse text-sm',
                            children: [
                                (0, b.jsxs)('colgroup', {
                                    children: [
                                        (0, b.jsx)('col', {
                                            className: 'w-60',
                                        }),
                                        (0, b.jsx)('col', {
                                            className: 'w-15',
                                        }),
                                        (0, b.jsx)('col', {
                                            className: 'w-15',
                                        }),
                                        (0, b.jsx)('col', {
                                            className: 'w-15',
                                        }),
                                        (0, b.jsx)('col', {
                                            className: 'w-20',
                                        }),
                                        (0, b.jsx)('col', {
                                            className: 'w-15',
                                        }),
                                        (0, b.jsx)('col', {
                                            className: 'w-15',
                                        }),
                                        (0, b.jsx)('col', {
                                            className: 'w-27.5',
                                        }),
                                    ],
                                }),
                                (0, b.jsx)('thead', {
                                    children: (0, b.jsxs)('tr', {
                                        className:
                                            'border-b border-border-primary bg-background-secondary',
                                        children: [
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-3 text-left text-xs font-medium text-content-secondary',
                                                children: 'Serviço',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-3 text-left text-xs font-medium text-content-secondary',
                                                children: 'Preço',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-3 text-left text-xs font-medium text-content-secondary',
                                                children: 'Duração',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-3 text-left text-xs font-medium text-content-secondary',
                                                children: 'Comissão',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-3 text-left text-xs font-medium text-content-secondary',
                                                children: 'Cancelamento',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-3 text-left text-xs font-medium text-content-secondary',
                                                children: 'Taxa',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-3 text-left text-xs font-medium text-content-secondary',
                                                children: 'Status',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-3 text-right text-xs font-medium text-content-secondary',
                                                children: 'Ações',
                                            }),
                                        ],
                                    }),
                                }),
                                (0, b.jsx)('tbody', {
                                    className: '[&>tr>td]:align-middle',
                                    children:
                                        0 === h.length
                                            ? (0, b.jsx)('tr', {
                                                  className:
                                                      'border-t border-border-primary',
                                                  children: (0, b.jsx)('td', {
                                                      colSpan: 8,
                                                      className:
                                                          'px-4 py-6 text-center text-paragraph-small text-content-secondary',
                                                      children:
                                                          'Nenhum serviço cadastrado ainda.',
                                                  }),
                                              })
                                            : h.map((a) =>
                                                  (0, b.jsx)(
                                                      e.ServiceRow,
                                                      { service: a },
                                                      a.id
                                                  )
                                              ),
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        a.s(
            [
                'default',
                () => g,
                'dynamic',
                0,
                'force-dynamic',
                'metadata',
                0,
                { title: 'Admin | Serviços' },
            ],
            688360
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a7821a4c._.js.map
