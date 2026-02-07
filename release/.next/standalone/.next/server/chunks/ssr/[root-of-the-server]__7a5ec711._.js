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
    678978,
    709207,
    (a) => {
        'use strict';
        var b = a.i(382865);
        function c(a, c) {
            let d = (0, b.toDate)(a, c?.in),
                e = d.getMonth();
            return (
                d.setFullYear(d.getFullYear(), e + 1, 0),
                d.setHours(23, 59, 59, 999),
                d
            );
        }
        function d(a, c) {
            let d = (0, b.toDate)(a, c?.in);
            return (d.setDate(1), d.setHours(0, 0, 0, 0), d);
        }
        (a.s(['endOfMonth', () => c], 678978),
            a.s(['startOfMonth', () => d], 709207));
    },
    621962,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/admin/finance/admin-finance-client.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/admin/finance/admin-finance-client.tsx <module evaluation>',
            'default'
        );
        a.s(['default', 0, b]);
    },
    446914,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/admin/finance/admin-finance-client.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/admin/finance/admin-finance-client.tsx',
            'default'
        );
        a.s(['default', 0, b]);
    },
    584918,
    (a) => {
        'use strict';
        a.i(621962);
        var b = a.i(446914);
        a.n(b);
    },
    96323,
    (a) => {
        'use strict';
        var b = a.i(623127);
        a.i(106878);
        var c = a.i(154840),
            d = a.i(766518),
            e = a.i(28792),
            f = a.i(584918),
            g = a.i(729097),
            h = a.i(678978),
            i = a.i(254413),
            j = a.i(149089),
            k = a.i(303223),
            l = a.i(709207),
            m = a.i(816443);
        function n(a) {
            let b = new URLSearchParams();
            (a.month && b.set('month', a.month),
                a.unit && b.set('unit', a.unit));
            let c = b.toString();
            return c ? `/admin/finance?${c}` : '/admin/finance';
        }
        async function o(a) {
            let { companyId: b, unitId: c, monthDate: e } = a,
                f = (0, l.startOfMonth)(e),
                i = (0, h.endOfMonth)(e),
                j = (0, l.startOfMonth)((0, g.addMonths)(e, -1)),
                k = (0, l.startOfMonth)(j),
                m = (0, h.endOfMonth)(j),
                n = await d.prisma.expense.findMany({
                    where: {
                        companyId: b,
                        unitId: c,
                        isRecurring: !0,
                        dueDate: { gte: k, lte: m },
                    },
                    select: {
                        id: !0,
                        description: !0,
                        category: !0,
                        amount: !0,
                        dueDate: !0,
                    },
                    orderBy: [{ dueDate: 'asc' }, { createdAt: 'asc' }],
                });
            if (0 === n.length) return;
            let o = new Set(
                    (
                        await d.prisma.expense.findMany({
                            where: {
                                companyId: b,
                                unitId: c,
                                isRecurring: !0,
                                dueDate: { gte: f, lte: i },
                            },
                            select: {
                                description: !0,
                                category: !0,
                                amount: !0,
                                dueDate: !0,
                            },
                        })
                    ).map((a) => {
                        let d = a.dueDate.getDate();
                        return [
                            b,
                            c,
                            'REC',
                            a.category,
                            a.description.trim().toLowerCase(),
                            Number(a.amount).toFixed(2),
                            String(d),
                        ].join('|');
                    })
                ),
                p = n
                    .map((a) => {
                        var d;
                        let f,
                            g =
                                ((d = a.dueDate.getDate()),
                                (f = (0, h.endOfMonth)(e).getDate()),
                                d <= 1 ? 1 : d >= f ? f : d),
                            i = new Date(e.getFullYear(), e.getMonth(), g);
                        return {
                            key: [
                                b,
                                c,
                                'REC',
                                a.category,
                                a.description.trim().toLowerCase(),
                                Number(a.amount).toFixed(2),
                                String(g),
                            ].join('|'),
                            data: {
                                companyId: b,
                                unitId: c,
                                description: a.description,
                                category: a.category,
                                amount: Number(a.amount).toFixed(2),
                                dueDate: i,
                                isRecurring: !0,
                                isPaid: !1,
                            },
                        };
                    })
                    .filter((a) => !o.has(a.key));
            0 !== p.length &&
                (await d.prisma.expense.createMany({
                    data: p.map((a) => a.data),
                    skipDuplicates: !1,
                }));
        }
        function p(a) {
            let b = Number(a);
            return Number.isFinite(b) ? b : 0;
        }
        async function q({ searchParams: a }) {
            var g;
            let q,
                r = await (0, e.requireAdminForModule)('FINANCE'),
                s = r.companyId;
            s || (0, c.redirect)('/admin');
            let t = r.id;
            t || (0, c.redirect)('/admin');
            let u = !!r?.canSeeAllUnits,
                { month: v, unit: w } = await a,
                x = (function (a) {
                    if (!a) return (0, l.startOfMonth)(new Date());
                    let b = (0, k.parse)(a, 'yyyy-MM', new Date());
                    return (0, j.isValid)(b)
                        ? (0, l.startOfMonth)(b)
                        : (0, l.startOfMonth)(new Date());
                })(v),
                y = (0, l.startOfMonth)(x),
                z = (0, h.endOfMonth)(x),
                A = (0, i.format)(x, 'yyyy-MM'),
                B = (g = (0, i.format)(x, "MMMM 'de' yyyy", { locale: m.ptBR }))
                    ? g.charAt(0).toUpperCase() + g.slice(1)
                    : g,
                C = u
                    ? await d.prisma.unit.findMany({
                          where: { companyId: s, isActive: !0 },
                          select: { id: !0, name: !0 },
                          orderBy: { name: 'asc' },
                      })
                    : await (async () => {
                          let a = (
                              await d.prisma.adminUnitAccess.findMany({
                                  where: { companyId: s, userId: t },
                                  select: { unitId: !0 },
                              })
                          )
                              .map((a) => a.unitId)
                              .filter(Boolean);
                          return a.length
                              ? d.prisma.unit.findMany({
                                    where: {
                                        companyId: s,
                                        isActive: !0,
                                        id: { in: a },
                                    },
                                    select: { id: !0, name: !0 },
                                    orderBy: { name: 'asc' },
                                })
                              : [];
                      })(),
                D = C.length > 0 ? C[0].id : null;
            if (!D)
                return (0, b.jsx)(f.default, {
                    scopeLabel: 'Nenhuma unidade disponível',
                    monthLabel: B,
                    monthQuery: A,
                    summary: {
                        netRevenueMonth: 'R$ 0,00',
                        servicesNetMonth: 'R$ 0,00',
                        productsNetMonth: 'R$ 0,00',
                        totalExpenses: 'R$ 0,00',
                        netIncome: 'R$ 0,00',
                        netIncomeIsPositive: !0,
                    },
                    professionalEarnings: [],
                    expenses: [],
                    newExpenseDisabled: !0,
                });
            ((w && 'all' !== w) || (0, c.redirect)(n({ month: A, unit: D })),
                C.some((a) => a.id === w) ||
                    (0, c.redirect)(n({ month: A, unit: D })),
                (await d.prisma.unit.findFirst({
                    where: { id: w, companyId: s, isActive: !0 },
                    select: { id: !0 },
                })) || (0, c.redirect)(n({ month: A, unit: D })),
                await o({ companyId: s, unitId: w, monthDate: y }));
            let E =
                    ((q = C.find((a) => a.id === w)),
                    q?.name ?? 'unidade selecionada'),
                F = !w,
                G = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                H = await d.prisma.expense.findMany({
                    where: {
                        companyId: s,
                        unitId: w,
                        dueDate: { gte: y, lte: z },
                    },
                    orderBy: [{ dueDate: 'asc' }, { createdAt: 'asc' }],
                    select: {
                        id: !0,
                        description: !0,
                        dueDate: !0,
                        amount: !0,
                        isRecurring: !0,
                        isPaid: !0,
                    },
                }),
                I = H.map((a) => ({
                    id: a.id,
                    description: a.description,
                    dueDate: (0, i.format)(a.dueDate, 'dd/MM/yyyy', {
                        locale: m.ptBR,
                    }),
                    amount: G.format(Number(a.amount)),
                    isRecurring: !!a.isRecurring,
                    statusLabel: a.isPaid ? 'Pago' : 'Em aberto',
                    statusTone: a.isPaid ? 'success' : 'warning',
                })),
                J = H.reduce((a, b) => a + Number(b.amount), 0),
                K = (
                    await d.prisma.professionalUnit.findMany({
                        where: {
                            companyId: s,
                            unitId: w,
                            isActive: !0,
                            professional: { isActive: !0 },
                        },
                        select: {
                            professional: { select: { id: !0, name: !0 } },
                        },
                        orderBy: { createdAt: 'asc' },
                    })
                )
                    .map((a) => a.professional)
                    .filter(Boolean),
                L = new Map();
            for (let a of K) a?.id && L.set(a.id, { id: a.id, name: a.name });
            let M = await d.prisma.appointment.findMany({
                    where: {
                        companyId: s,
                        unitId: w,
                        checkedOutAt: { gte: y, lte: z },
                        status: { not: 'CANCELED' },
                    },
                    select: {
                        professionalId: !0,
                        servicePriceAtTheTime: !0,
                        professionalPercentageAtTheTime: !0,
                        professionalEarningValue: !0,
                    },
                }),
                N = M.reduce((a, b) => a + p(b.servicePriceAtTheTime), 0),
                O = new Map();
            for (let a of M) {
                let b = String(a.professionalId ?? '').trim();
                if (!b) continue;
                let c = (function (a) {
                    let b = p(a.professionalEarningValue);
                    if (b > 0) return b;
                    let c = p(a.servicePriceAtTheTime),
                        d = p(a.professionalPercentageAtTheTime);
                    return c > 0 && d > 0 ? (c * d) / 100 : 0;
                })({
                    professionalEarningValue: a.professionalEarningValue,
                    servicePriceAtTheTime: a.servicePriceAtTheTime,
                    professionalPercentageAtTheTime:
                        a.professionalPercentageAtTheTime,
                });
                O.set(b, (O.get(b) ?? 0) + c);
            }
            let P = (
                    await d.prisma.order.findMany({
                        where: {
                            companyId: s,
                            unitId: w,
                            status: 'COMPLETED',
                            updatedAt: { gte: y, lte: z },
                        },
                        select: { id: !0 },
                    })
                ).map((a) => a.id),
                Q = 0,
                R = new Map();
            if (P.length > 0) {
                let a = await d.prisma.orderItem.findMany({
                    where: {
                        companyId: s,
                        orderId: { in: P },
                        productId: { not: null },
                    },
                    select: {
                        professionalId: !0,
                        totalPrice: !0,
                        product: { select: { professionalPercentage: !0 } },
                    },
                });
                for (let b of ((Q = a.reduce((a, b) => a + p(b.totalPrice), 0)),
                a)) {
                    let a = String(b.professionalId ?? '').trim();
                    if (!a) continue;
                    let c = p(b.totalPrice),
                        d = p(b.product?.professionalPercentage),
                        e = c > 0 && d > 0 ? (c * d) / 100 : 0;
                    R.set(a, (R.get(a) ?? 0) + e);
                }
            }
            let S = Array.from(
                    new Set([
                        ...Array.from(L.keys()),
                        ...Array.from(O.keys()),
                        ...Array.from(R.keys()),
                    ])
                )
                    .map((a) => {
                        let b = L.get(a),
                            c = O.get(a) ?? 0,
                            d = R.get(a) ?? 0;
                        return {
                            professionalId: a,
                            name: b?.name ?? 'Profissional',
                            servicesEarnings: G.format(c),
                            productsEarnings: G.format(d),
                            total: G.format(c + d),
                        };
                    })
                    .sort((a, b) => {
                        let c = p(
                            a.total
                                .replace(/[^\d,.-]/g, '')
                                .replace('.', '')
                                .replace(',', '.')
                        );
                        return (
                            p(
                                b.total
                                    .replace(/[^\d,.-]/g, '')
                                    .replace('.', '')
                                    .replace(',', '.')
                            ) - c
                        );
                    }),
                T = N + Q,
                U = T - J,
                V = {
                    netRevenueMonth: G.format(T),
                    servicesNetMonth: G.format(N),
                    productsNetMonth: G.format(Q),
                    totalExpenses: G.format(J),
                    netIncome: G.format(U),
                    netIncomeIsPositive: U >= 0,
                };
            return (0, b.jsx)(f.default, {
                scopeLabel: E,
                monthLabel: B,
                monthQuery: A,
                summary: V,
                professionalEarnings: S,
                expenses: I,
                newExpenseDisabled: F,
            });
        }
        a.s([
            'default',
            () => q,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Admin | Financeiro' },
        ]);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7a5ec711._.js.map
