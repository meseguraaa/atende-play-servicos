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
    583376,
    (a, b, c) => {
        let { createClientModuleProxy: d } = a.r(976286);
        a.n(
            d(
                '[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js <module evaluation>'
            )
        );
    },
    777934,
    (a, b, c) => {
        let { createClientModuleProxy: d } = a.r(976286);
        a.n(
            d(
                '[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js'
            )
        );
    },
    766865,
    (a) => {
        'use strict';
        a.i(583376);
        var b = a.i(777934);
        a.n(b);
    },
    468695,
    (a, b, c) => {
        'use strict';
        Object.defineProperty(c, '__esModule', { value: !0 });
        var d = {
            default: function () {
                return i;
            },
            useLinkStatus: function () {
                return h.useLinkStatus;
            },
        };
        for (var e in d)
            Object.defineProperty(c, e, { enumerable: !0, get: d[e] });
        let f = a.r(254508),
            g = a.r(623127),
            h = f._(a.r(766865));
        function i(a) {
            let b = a.legacyBehavior,
                c =
                    'string' == typeof a.children ||
                    'number' == typeof a.children ||
                    'string' == typeof a.children?.type,
                d =
                    a.children?.type?.$$typeof ===
                    Symbol.for('react.client.reference');
            return (
                !b ||
                    c ||
                    d ||
                    (a.children?.type?.$$typeof === Symbol.for('react.lazy')
                        ? console.error(
                              "Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."
                          )
                        : console.error(
                              "Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag."
                          )),
                (0, g.jsx)(h.default, { ...a })
            );
        }
        ('function' == typeof c.default ||
            ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }),
            Object.assign(c.default, c),
            (b.exports = c.default));
    },
    543474,
    (a) => {
        'use strict';
        var b = a.i(149919);
        let c = (a) => {
                let b = a.replace(/^([A-Z])|[\s-_]+(\w)/g, (a, b, c) =>
                    c ? c.toUpperCase() : b.toLowerCase()
                );
                return b.charAt(0).toUpperCase() + b.slice(1);
            },
            d = (...a) =>
                a
                    .filter(
                        (a, b, c) =>
                            !!a && '' !== a.trim() && c.indexOf(a) === b
                    )
                    .join(' ')
                    .trim();
        var e = {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        };
        let f = (0, b.forwardRef)(
                (
                    {
                        color: a = 'currentColor',
                        size: c = 24,
                        strokeWidth: f = 2,
                        absoluteStrokeWidth: g,
                        className: h = '',
                        children: i,
                        iconNode: j,
                        ...k
                    },
                    l
                ) =>
                    (0, b.createElement)(
                        'svg',
                        {
                            ref: l,
                            ...e,
                            width: c,
                            height: c,
                            stroke: a,
                            strokeWidth: g ? (24 * Number(f)) / Number(c) : f,
                            className: d('lucide', h),
                            ...(!i &&
                                !((a) => {
                                    for (let b in a)
                                        if (
                                            b.startsWith('aria-') ||
                                            'role' === b ||
                                            'title' === b
                                        )
                                            return !0;
                                })(k) && { 'aria-hidden': 'true' }),
                            ...k,
                        },
                        [
                            ...j.map(([a, c]) => (0, b.createElement)(a, c)),
                            ...(Array.isArray(i) ? i : [i]),
                        ]
                    )
            ),
            g = (a, e) => {
                let g = (0, b.forwardRef)(({ className: g, ...h }, i) =>
                    (0, b.createElement)(f, {
                        ref: i,
                        iconNode: e,
                        className: d(
                            `lucide-${c(a)
                                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                                .toLowerCase()}`,
                            `lucide-${a}`,
                            g
                        ),
                        ...h,
                    })
                );
                return ((g.displayName = c(a)), g);
            };
        a.s(['default', () => g], 543474);
    },
    390788,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(468695),
            d = a.i(169513),
            e = a.i(28792),
            f = a.i(766518),
            g = a.i(139138),
            h = a.i(543474);
        let i = [
                {
                    href: '/admin/report/occupancy',
                    title: 'Ocupação da agenda',
                    description:
                        'Veja os horários de pico e de ociosidade da agenda por dia e hora. Compare profissionais e encontre oportunidades de encaixe.',
                    icon: (0, h.default)('calendar-clock', [
                        ['path', { d: 'M16 14v2.2l1.6 1', key: 'fo4ql5' }],
                        ['path', { d: 'M16 2v4', key: '4m81vk' }],
                        [
                            'path',
                            {
                                d: 'M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5',
                                key: '1osxxc',
                            },
                        ],
                        ['path', { d: 'M3 10h5', key: 'r794hk' }],
                        ['path', { d: 'M8 2v4', key: '1cmpym' }],
                        [
                            'circle',
                            { cx: '16', cy: '16', r: '6', key: 'qoo3c4' },
                        ],
                    ]),
                    badgeTone: 'ready',
                },
                {
                    href: '/admin/report/retention',
                    title: 'Retenção de clientes',
                    description:
                        'Entenda se os clientes voltam após a primeira compra. Veja retorno em 30/60/90 dias e acompanhe a evolução mês a mês.',
                    icon: (0, h.default)('users-round', [
                        ['path', { d: 'M18 21a8 8 0 0 0-16 0', key: '3ypg7q' }],
                        [
                            'circle',
                            { cx: '10', cy: '8', r: '5', key: 'o932ke' },
                        ],
                        [
                            'path',
                            {
                                d: 'M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3',
                                key: '10s06x',
                            },
                        ],
                    ]),
                    badgeTone: 'ready',
                },
                {
                    href: '/admin/report/funnel',
                    title: 'Funil do agendamento',
                    description:
                        'Acompanhe criados → realizados → pendentes/cancelados. Descubra onde a agenda não vira receita e onde está o gargalo.',
                    icon: (0, h.default)('funnel', [
                        [
                            'path',
                            {
                                d: 'M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z',
                                key: 'sc7q7i',
                            },
                        ],
                    ]),
                    badgeTone: 'ready',
                },
                {
                    href: '/admin/report/revenue',
                    title: 'Faturamento, Ticket & Comissão',
                    description:
                        'Entenda de onde vem o faturamento: mais atendimentos ou venda melhor. Veja receita, ticket médio, comissão e margem por profissional, serviço e produto.',
                    icon: (0, h.default)('wallet', [
                        [
                            'path',
                            {
                                d: 'M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1',
                                key: '18etb6',
                            },
                        ],
                        [
                            'path',
                            {
                                d: 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4',
                                key: 'xoc0q4',
                            },
                        ],
                    ]),
                    badgeTone: 'ready',
                },
                {
                    href: '/admin/report/analytics',
                    title: 'Analytics: Acesso & Conversão',
                    description:
                        'Acompanhe page views, impressões e cliques de produto, add-to-cart e conversões. Veja heatmap de acessos, top páginas e produtos mais quentes.',
                    icon: (0, h.default)('chart-column', [
                        [
                            'path',
                            { d: 'M3 3v16a2 2 0 0 0 2 2h16', key: 'c24i48' },
                        ],
                        ['path', { d: 'M18 17V9', key: '2bz60n' }],
                        ['path', { d: 'M13 17V5', key: '1frdt8' }],
                        ['path', { d: 'M8 17v-3', key: '17ska0' }],
                    ]),
                    badgeTone: 'ready',
                },
            ],
            j = 'admin_company_context';
        async function k(a) {
            let b = String(a?.companyId ?? '').trim();
            if (b) return b;
            let c = await (0, d.cookies)(),
                e = c.get(j)?.value;
            if (e) return e;
            let g = String(a?.userId ?? '').trim();
            if (g) {
                let a = await f.prisma.companyMember.findFirst({
                    where: { userId: g, isActive: !0 },
                    orderBy: { createdAt: 'asc' },
                    select: { companyId: !0 },
                });
                if (a?.companyId) return a.companyId;
            }
            throw Error(
                `companyId ausente (session.companyId, cookie "${j}" e sem fallback por membership).`
            );
        }
        async function l({ searchParams: a }) {
            let f = await (0, e.requireAdminForModule)('DASHBOARD');
            await k(f);
            let h = await (0, d.cookies)();
            return (
                h.get('admin_unit_context')?.value,
                await a,
                (0, b.jsxs)('div', {
                    className: 'space-y-6 max-w-7xl mx-auto',
                    children: [
                        (0, b.jsxs)('header', {
                            children: [
                                (0, b.jsx)('h1', {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Relatórios',
                                }),
                                (0, b.jsx)('p', {
                                    className:
                                        'text-paragraph-medium-size text-content-secondary',
                                    children:
                                        'Relatórios estratégicos para entender tendência, retenção, eficiência e gargalos.',
                                }),
                                (0, b.jsxs)('p', {
                                    className:
                                        'text-xs text-content-secondary mt-1',
                                    children: [
                                        'Escopo de unidades:',
                                        ' ',
                                        f?.canSeeAllUnits
                                            ? 'todas as unidades'
                                            : 'unidade atual',
                                    ],
                                }),
                            ],
                        }),
                        (0, b.jsx)('section', {
                            className:
                                'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
                            children: i.map((a) => {
                                let d = a.icon;
                                return (0, b.jsx)(
                                    c.default,
                                    {
                                        href: a.href,
                                        className: (0, g.cn)(
                                            'group rounded-xl border border-border-primary bg-background-tertiary p-4',
                                            'transition-colors hover:bg-background-tertiary/70'
                                        ),
                                        children: (0, b.jsxs)('div', {
                                            className: 'flex items-start gap-3',
                                            children: [
                                                (0, b.jsx)(d, {
                                                    className:
                                                        'h-6 w-6 text-content-secondary shrink-0',
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'space-y-1 min-w-0',
                                                    children: [
                                                        (0, b.jsx)('div', {
                                                            className:
                                                                'flex items-center gap-2',
                                                            children: (0,
                                                            b.jsx)('p', {
                                                                className:
                                                                    'text-label-large text-content-primary',
                                                                children:
                                                                    a.title,
                                                            }),
                                                        }),
                                                        (0, b.jsx)('p', {
                                                            className:
                                                                'text-paragraph-small text-content-secondary',
                                                            children:
                                                                a.description,
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    },
                                    a.href
                                );
                            }),
                        }),
                    ],
                })
            );
        }
        a.s(
            [
                'default',
                () => l,
                'dynamic',
                0,
                'force-dynamic',
                'metadata',
                0,
                { title: 'Admin | Relatórios' },
            ],
            390788
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ed208db3._.js.map
