module.exports = [
    193695,
    (a, b, c) => {
        b.exports = a.x(
            'next/dist/shared/lib/no-fallback-error.external.js',
            () => require('next/dist/shared/lib/no-fallback-error.external.js')
        );
    },
    29173,
    (a, b, c) => {
        b.exports = a.x('@prisma/client', () => require('@prisma/client'));
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
    640230,
    (a) => {
        a.n(a.i(972760));
    },
    766518,
    (a) => {
        'use strict';
        var b = a.i(29173);
        let c = globalThis.prisma ?? new b.PrismaClient({ log: ['error'] });
        a.s(['prisma', 0, c]);
    },
    382865,
    118489,
    208768,
    (a) => {
        'use strict';
        let b = Symbol.for('constructDateFrom');
        function c(a, c) {
            return 'function' == typeof a
                ? a(c)
                : a && 'object' == typeof a && b in a
                  ? a[b](c)
                  : a instanceof Date
                    ? new a.constructor(c)
                    : new Date(c);
        }
        function d(a, b) {
            return c(b || a, a);
        }
        (a.s(
            [
                'constructFromSymbol',
                0,
                b,
                'millisecondsInDay',
                0,
                864e5,
                'millisecondsInHour',
                0,
                36e5,
                'millisecondsInMinute',
                0,
                6e4,
                'millisecondsInSecond',
                0,
                1e3,
                'millisecondsInWeek',
                0,
                6048e5,
            ],
            118489
        ),
            a.s(['constructFrom', () => c], 208768),
            a.s(['toDate', () => d], 382865));
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
    208292,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call DatePicker() from the server but DatePicker is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/date-picker/date-picker.tsx <module evaluation>',
            'DatePicker'
        );
        a.s(['DatePicker', 0, b]);
    },
    607978,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call DatePicker() from the server but DatePicker is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/date-picker/date-picker.tsx',
            'DatePicker'
        );
        a.s(['DatePicker', 0, b]);
    },
    645321,
    (a) => {
        'use strict';
        a.i(208292);
        var b = a.i(607978);
        a.n(b);
    },
    960905,
    (a) => {
        'use strict';
        (a.i(645321), a.s([]));
    },
    500908,
    (a) => {
        'use strict';
        var b = a.i(766518),
            c = a.i(126918);
        async function d() {
            let a = await (0, c.getCurrentPainelUser)();
            if (!a || 'PROFESSIONAL' !== a.role)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: '',
                    unitId: '',
                };
            let d = String(a.sub || '').trim(),
                e = String(a.companyId || '').trim();
            if (!d || !e)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: '',
                    unitId: '',
                };
            let f = await b.prisma.professional.findFirst({
                where: { userId: d, companyId: e, isActive: !0 },
                select: { id: !0, name: !0, email: !0 },
            });
            if (!f?.id)
                return {
                    companyId: '',
                    professionalId: '',
                    userId: d,
                    unitId: '',
                };
            let g = await b.prisma.professionalUnit.findFirst({
                where: { companyId: e, professionalId: f.id, isActive: !0 },
                select: { unitId: !0 },
                orderBy: { updatedAt: 'desc' },
            });
            return {
                companyId: e,
                professionalId: f.id,
                userId: d,
                unitId: g?.unitId ?? '',
                name: f.name ?? null,
                email: f.email,
            };
        }
        a.s(['requireProfessionalSession', () => d]);
    },
    259633,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/professional/dashboard/professional-appointments-client.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/professional/dashboard/professional-appointments-client.tsx <module evaluation>',
            'default'
        );
        a.s(['default', 0, b]);
    },
    774107,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/professional/dashboard/professional-appointments-client.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/professional/dashboard/professional-appointments-client.tsx',
            'default'
        );
        a.s(['default', 0, b]);
    },
    562890,
    (a) => {
        'use strict';
        a.i(259633);
        var b = a.i(774107);
        a.n(b);
    },
    14590,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(766518),
            d = a.i(500908),
            e = a.i(678978),
            f = a.i(709207);
        a.i(960905);
        var g = a.i(645321),
            h = a.i(562890);
        function i(a) {
            return String(a ?? '').trim();
        }
        function j(a) {
            if (null == a) return NaN;
            if ('number' == typeof a) return a;
            if ('string' == typeof a) {
                let b = Number(a.replace(',', '.'));
                return Number.isFinite(b) ? b : NaN;
            }
            if ('object' == typeof a) {
                if ('function' == typeof a?.toNumber) {
                    let b = a.toNumber();
                    return Number.isFinite(b) ? b : NaN;
                }
                if ('function' == typeof a?.toString) {
                    let b = Number(String(a.toString()).replace(',', '.'));
                    return Number.isFinite(b) ? b : NaN;
                }
            }
            let b = Number(a);
            return Number.isFinite(b) ? b : NaN;
        }
        function k(a) {
            return !Number.isFinite(a) || a < 0 ? 0 : a > 100 ? 100 : a;
        }
        function l(a, b) {
            return (Number.isFinite(a) ? a : 0) + (Number.isFinite(b) ? b : 0);
        }
        async function m({ searchParams: a }) {
            let m,
                n,
                o = await a,
                p = await (0, d.requireProfessionalSession)(),
                q = i(p.companyId),
                r = i(p.professionalId),
                s = i(p.unitId);
            if (!q || !r)
                throw Error(
                    'ProfessionalDashboardPage: companyId/professionalId não encontrado na sessão.'
                );
            if (!s) {
                let a = await c.prisma.professionalUnit.findFirst({
                    where: { companyId: q, professionalId: r, isActive: !0 },
                    select: { unitId: !0 },
                    orderBy: { updatedAt: 'desc' },
                });
                s = i(a?.unitId);
            }
            if (!s)
                throw Error(
                    'ProfessionalDashboardPage: unitId não encontrado para o profissional.'
                );
            let t =
                    (function (a) {
                        let b = i(a);
                        if (!b) return null;
                        let [c, d, e] = b.split('-').map(Number);
                        return c && d && e ? { y: c, m: d, d: e } : null;
                    })(o?.date) ??
                    ((m = new Intl.DateTimeFormat('en-CA', {
                        timeZone: 'America/Sao_Paulo',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }).formatToParts(new Date())),
                    (n = Number(
                        m.find((a) => 'year' === a.type)?.value ?? '0'
                    )),
                    {
                        y: n,
                        m: Number(
                            m.find((a) => 'month' === a.type)?.value ?? '0'
                        ),
                        d: Number(
                            m.find((a) => 'day' === a.type)?.value ?? '0'
                        ),
                    }),
                { startUtc: u, endUtc: v } = (function (a) {
                    let { y: b, m: c, d } = a,
                        e = Date.UTC(b, c - 1, d, 3, 0, 0, 0),
                        f = Date.UTC(b, c - 1, d + 1, 3, 0, 0, 0);
                    return { startUtc: new Date(e), endUtc: new Date(f - 1) };
                })(t),
                w = (function (a) {
                    let b = i(a);
                    if (!b) return (0, f.startOfMonth)(new Date());
                    let [c, d] = b.split('-').map(Number);
                    return c && d
                        ? (0, f.startOfMonth)(new Date(c, d - 1, 1))
                        : (0, f.startOfMonth)(new Date());
                })(o?.month),
                x = (0, f.startOfMonth)(w),
                y = (0, e.endOfMonth)(w),
                z = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }),
                [A, B] = await Promise.all([
                    c.prisma.appointment.count({
                        where: {
                            companyId: q,
                            unitId: s,
                            professionalId: r,
                            scheduleAt: { gte: u, lte: v },
                            status: { in: ['PENDING', 'DONE'] },
                        },
                    }),
                    c.prisma.appointment.count({
                        where: {
                            companyId: q,
                            unitId: s,
                            professionalId: r,
                            scheduleAt: { gte: u, lte: v },
                            status: 'DONE',
                        },
                    }),
                ]),
                [C, D] = await Promise.all([
                    c.prisma.order.findMany({
                        where: {
                            companyId: q,
                            unitId: s,
                            status: 'COMPLETED',
                            updatedAt: { gte: u, lte: v },
                            OR: [
                                { professionalId: r },
                                { items: { some: { professionalId: r } } },
                            ],
                        },
                        select: {
                            id: !0,
                            professionalId: !0,
                            appointment: {
                                select: { professionalPercentageAtTheTime: !0 },
                            },
                            items: {
                                select: {
                                    professionalId: !0,
                                    totalPrice: !0,
                                    serviceId: !0,
                                    productId: !0,
                                    service: {
                                        select: { professionalPercentage: !0 },
                                    },
                                    product: {
                                        select: { professionalPercentage: !0 },
                                    },
                                },
                            },
                        },
                    }),
                    c.prisma.order.findMany({
                        where: {
                            companyId: q,
                            unitId: s,
                            status: 'COMPLETED',
                            updatedAt: { gte: x, lte: y },
                            OR: [
                                { professionalId: r },
                                { items: { some: { professionalId: r } } },
                            ],
                        },
                        select: {
                            id: !0,
                            professionalId: !0,
                            appointment: {
                                select: { professionalPercentageAtTheTime: !0 },
                            },
                            items: {
                                select: {
                                    professionalId: !0,
                                    totalPrice: !0,
                                    serviceId: !0,
                                    productId: !0,
                                    service: {
                                        select: { professionalPercentage: !0 },
                                    },
                                    product: {
                                        select: { professionalPercentage: !0 },
                                    },
                                },
                            },
                        },
                    }),
                ]),
                E = 0,
                F = 0;
            for (let a of C) {
                let b = a.professionalId === r,
                    c = k(j(a.appointment?.professionalPercentageAtTheTime));
                for (let d of a.items) {
                    if (!(d.professionalId === r || (b && !d.professionalId)))
                        continue;
                    let a = j(d.totalPrice);
                    if (((E = l(E, a)), d.serviceId)) {
                        let b = k(j(d.service?.professionalPercentage));
                        F = l(F, (a * (c || b)) / 100);
                    } else
                        d.productId &&
                            (F = l(
                                F,
                                (a * k(j(d.product?.professionalPercentage))) /
                                    100
                            ));
                }
            }
            let G = E - F,
                H = 0,
                I = 0;
            for (let a of D) {
                let b = a.professionalId === r,
                    c = k(j(a.appointment?.professionalPercentageAtTheTime));
                for (let d of a.items) {
                    if (!(d.professionalId === r || (b && !d.professionalId)))
                        continue;
                    let a = j(d.totalPrice);
                    if (((H = l(H, a)), d.serviceId)) {
                        let b = k(j(d.service?.professionalPercentage));
                        I = l(I, (a * (c || b)) / 100);
                    } else
                        d.productId &&
                            (I = l(
                                I,
                                (a * k(j(d.product?.professionalPercentage))) /
                                    100
                            ));
                }
            }
            let J = H - I,
                K = await c.prisma.appointmentReview.aggregate({
                    where: {
                        companyId: q,
                        professionalId: r,
                        createdAt: { gte: x, lte: y },
                    },
                    _count: { id: !0 },
                    _avg: { rating: !0 },
                }),
                L = K._count.id ?? 0,
                M = Number(K._avg.rating ?? 0),
                N = L > 0 ? M.toFixed(2) : '—',
                [O, P, Q, R] = await Promise.all([
                    c.prisma.appointment.findMany({
                        where: {
                            companyId: q,
                            unitId: s,
                            professionalId: r,
                            scheduleAt: { gte: u, lte: v },
                            status: { in: ['PENDING', 'DONE', 'CANCELED'] },
                        },
                        orderBy: { scheduleAt: 'asc' },
                        select: {
                            id: !0,
                            unitId: !0,
                            clientId: !0,
                            clientName: !0,
                            phone: !0,
                            description: !0,
                            scheduleAt: !0,
                            status: !0,
                            professionalId: !0,
                            serviceId: !0,
                        },
                    }),
                    c.prisma.unit.findFirst({
                        where: { id: s, companyId: q },
                        select: { id: !0, name: !0 },
                    }),
                    c.prisma.service.findMany({
                        where: {
                            companyId: q,
                            isActive: !0,
                            OR: [{ unitId: s }, { unitId: null }],
                        },
                        orderBy: { name: 'asc' },
                        select: {
                            id: !0,
                            name: !0,
                            durationMinutes: !0,
                            price: !0,
                            isActive: !0,
                            unitId: !0,
                        },
                    }),
                    c.prisma.user.findMany({
                        where: {
                            isActive: !0,
                            companyMemberships: {
                                some: {
                                    companyId: q,
                                    isActive: !0,
                                    role: 'CLIENT',
                                },
                            },
                        },
                        orderBy: { name: 'asc' },
                        take: 200,
                        select: { id: !0, name: !0, phone: !0 },
                    }),
                ]),
                S = O.map((a) => ({
                    id: a.id,
                    unitId: a.unitId,
                    clientId: a.clientId,
                    clientName: a.clientName,
                    phone: a.phone,
                    description: a.description,
                    scheduleAt: a.scheduleAt,
                    status: a.status,
                    professionalId: a.professionalId ?? null,
                    serviceId: a.serviceId ?? null,
                })),
                T = [
                    {
                        id: r,
                        name: p.name ?? 'Profissional',
                        imageUrl: null,
                        isActive: !0,
                    },
                ],
                U = Q.map((a) => ({
                    id: a.id,
                    name: a.name,
                    durationMinutes: a.durationMinutes,
                    price: null != a.price ? String(a.price) : void 0,
                    isActive: a.isActive,
                    unitId: a.unitId ?? null,
                })),
                V = R.map((a) => ({
                    id: a.id,
                    name: i(a.name),
                    phone: i(a.phone) || null,
                })).filter((a) => a.name.length > 0),
                W = [{ id: s, name: P?.name ?? 'Unidade' }],
                X =
                    i(o?.date) ||
                    `${String(t.y).padStart(4, '0')}-${String(t.m).padStart(2, '0')}-${String(t.d).padStart(2, '0')}`;
            return (0, b.jsxs)('div', {
                className: 'space-y-6',
                children: [
                    (0, b.jsxs)('div', {
                        className:
                            'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
                        children: [
                            (0, b.jsxs)('div', {
                                children: [
                                    (0, b.jsx)('h1', {
                                        className:
                                            'text-title text-content-primary',
                                        children: 'Dashboard',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-paragraph-medium-size text-content-secondary',
                                        children:
                                            'Sua visão geral: atendimentos, ganhos e avaliações no período selecionado.',
                                    }),
                                ],
                            }),
                            (0, b.jsx)(g.DatePicker, {}),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Atendimentos hoje',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'mt-1 text-title font-semibold text-content-primary',
                                        children: A,
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-2 text-paragraph-small text-content-tertiary',
                                        children: [
                                            'Pendentes:',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className:
                                                    'text-content-primary font-medium',
                                                children: A - B,
                                            }),
                                            ' ',
                                            '· Concluídos:',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className:
                                                    'text-content-primary font-medium',
                                                children: B,
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Ganhos do dia',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'mt-1 text-title font-semibold text-content-primary',
                                        children: z.format(G),
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-2 text-paragraph-small text-content-tertiary',
                                        children: [
                                            'Bruto: ',
                                            z.format(E),
                                            ' · Comissão: ',
                                            z.format(F),
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Ganhos do mês',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'mt-1 text-title font-semibold text-content-primary',
                                        children: z.format(J),
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-2 text-paragraph-small text-content-tertiary',
                                        children: [
                                            'Bruto: ',
                                            z.format(H),
                                            ' · Comissão: ',
                                            z.format(I),
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Nota no mês',
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-1 text-title font-semibold text-content-primary',
                                        children: [
                                            N,
                                            L > 0 &&
                                                (0, b.jsx)('span', {
                                                    className:
                                                        'ml-2 align-middle text-xl text-yellow-500',
                                                    children: '★'.repeat(
                                                        Math.max(
                                                            0,
                                                            Math.min(
                                                                5,
                                                                Math.round(M)
                                                            )
                                                        )
                                                    ),
                                                }),
                                        ],
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-2 text-paragraph-small text-content-tertiary',
                                        children: [L, ' avaliações no período'],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    (0, b.jsx)(h.default, {
                        date: X,
                        unitId: s,
                        professionalId: r,
                        appointments: S,
                        units: W,
                        professionals: T,
                        services: U,
                        clients: V,
                    }),
                ],
            });
        }
        a.s([
            'default',
            () => m,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Profissional | Dashboard' },
        ]);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__15848451._.js.map
