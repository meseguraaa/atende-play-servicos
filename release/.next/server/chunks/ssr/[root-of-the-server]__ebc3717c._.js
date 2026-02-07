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
    607957,
    (a) => {
        'use strict';
        var b = a.i(382865);
        function c(a, c) {
            let d = (0, b.toDate)(a, c?.in);
            return (d.setHours(0, 0, 0, 0), d);
        }
        a.s(['startOfDay', () => c]);
    },
    640230,
    (a) => {
        a.n(a.i(972760));
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
    975127,
    (a) => {
        'use strict';
        var b = a.i(382865);
        function c(a, c) {
            let d = (0, b.toDate)(a, c?.in);
            return (d.setHours(23, 59, 59, 999), d);
        }
        a.s(['endOfDay', () => c]);
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
    393212,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(766518),
            d = a.i(500908);
        a.i(960905);
        var e = a.i(645321),
            f = a.i(975127),
            g = a.i(678978),
            h = a.i(607957),
            i = a.i(709207);
        let j = 'America/Sao_Paulo';
        function k({ label: a, value: c, hint: d }) {
            return (0, b.jsxs)('div', {
                className:
                    'rounded-xl border border-border-primary bg-background-tertiary p-4',
                children: [
                    (0, b.jsx)('p', {
                        className: 'text-label-small text-content-secondary',
                        children: a,
                    }),
                    (0, b.jsx)('p', {
                        className:
                            'mt-1 text-title font-semibold text-content-primary',
                        children: c,
                    }),
                    d
                        ? (0, b.jsx)('p', {
                              className:
                                  'mt-2 text-paragraph-small text-content-tertiary',
                              children: d,
                          })
                        : null,
                ],
            });
        }
        function l({ rows: a }) {
            return (0, b.jsx)('div', {
                className: 'space-y-2',
                children: a.map((a) =>
                    (0, b.jsxs)(
                        'div',
                        {
                            className:
                                'rounded-xl border border-border-primary bg-background-tertiary px-3 py-3',
                            children: [
                                (0, b.jsxs)('div', {
                                    className:
                                        'flex items-start justify-between gap-3',
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className: 'min-w-0',
                                            children: [
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-paragraph-small text-content-primary font-medium truncate',
                                                    children: a.clientName,
                                                }),
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-[11px] text-content-secondary truncate',
                                                    children: a.description,
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className: 'shrink-0 text-right',
                                            children: [
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-paragraph-small text-content-primary font-semibold',
                                                    children:
                                                        a.earningFormatted,
                                                }),
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-[11px] text-content-tertiary',
                                                    children: a.time,
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, b.jsxs)('div', {
                                    className: 'mt-2 grid gap-2 md:grid-cols-3',
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className:
                                                'rounded-lg border border-border-primary bg-background-secondary px-3 py-2',
                                            children: [
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-[11px] text-content-tertiary',
                                                    children: 'Valor',
                                                }),
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-paragraph-small text-content-primary font-medium',
                                                    children: a.priceFormatted,
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className:
                                                'rounded-lg border border-border-primary bg-background-secondary px-3 py-2',
                                            children: [
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-[11px] text-content-tertiary',
                                                    children: 'Percentual',
                                                }),
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-paragraph-small text-content-primary font-medium',
                                                    children:
                                                        a.percentageFormatted,
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className:
                                                'rounded-lg border border-border-primary bg-background-secondary px-3 py-2',
                                            children: [
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-[11px] text-content-tertiary',
                                                    children: 'Ganho',
                                                }),
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-paragraph-small text-content-primary font-medium',
                                                    children:
                                                        a.earningFormatted,
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        },
                        a.id
                    )
                ),
            });
        }
        function m() {
            let a = new Date(),
                b = new Intl.DateTimeFormat('pt-BR', {
                    timeZone: j,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).formatToParts(a),
                c = Number(b.find((a) => 'day' === a.type)?.value ?? '1'),
                d = Number(b.find((a) => 'month' === a.type)?.value ?? '1');
            return new Date(
                Number(b.find((a) => 'year' === a.type)?.value ?? '1970'),
                d - 1,
                c
            );
        }
        async function n({ searchParams: a }) {
            let n = await (0, d.requireProfessionalSession)();
            if (!n.companyId || !n.professionalId || !n.userId)
                return (0, b.jsxs)('div', {
                    className: 'space-y-4',
                    children: [
                        (0, b.jsx)('h2', {
                            className: 'text-title text-content-primary',
                            children: 'Ganhos',
                        }),
                        (0, b.jsx)('p', {
                            className:
                                'text-paragraph-medium-size text-content-secondary',
                            children:
                                'Não foi possível identificar seu acesso como profissional. Faça login novamente ou peça para um administrador vincular seu usuário a um profissional ativo.',
                        }),
                    ],
                });
            let o = (await a).date,
                p = o
                    ? ((function (a) {
                          if (!a) return null;
                          let [b, c, d] = a.split('-').map(Number);
                          return b && c && d ? new Date(b, c - 1, d) : null;
                      })(o) ?? m())
                    : m(),
                q = (0, h.startOfDay)(p),
                r = (0, f.endOfDay)(p),
                s = (0, i.startOfMonth)(p),
                t = (0, g.endOfMonth)(p),
                u = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                }),
                [v, w, x, y, z, A, B, C] = await Promise.all([
                    c.prisma.appointment.findMany({
                        where: {
                            companyId: n.companyId,
                            professionalId: n.professionalId,
                            status: 'DONE',
                            scheduleAt: { gte: q, lte: r },
                        },
                        include: { service: !0 },
                        orderBy: { scheduleAt: 'asc' },
                    }),
                    c.prisma.appointment.findMany({
                        where: {
                            companyId: n.companyId,
                            professionalId: n.professionalId,
                            status: 'CANCELED',
                            scheduleAt: { gte: q, lte: r },
                        },
                        select: {
                            id: !0,
                            cancelFeeApplied: !0,
                            cancelFeeValue: !0,
                        },
                    }),
                    c.prisma.appointment.findMany({
                        where: {
                            companyId: n.companyId,
                            professionalId: n.professionalId,
                            status: 'DONE',
                            scheduleAt: { gte: s, lte: t },
                        },
                        include: { service: !0 },
                        orderBy: { scheduleAt: 'asc' },
                    }),
                    c.prisma.appointment.findMany({
                        where: {
                            companyId: n.companyId,
                            professionalId: n.professionalId,
                            status: 'CANCELED',
                            scheduleAt: { gte: s, lte: t },
                        },
                        select: {
                            id: !0,
                            cancelFeeApplied: !0,
                            cancelFeeValue: !0,
                        },
                    }),
                    c.prisma.productSale.findMany({
                        where: {
                            companyId: n.companyId,
                            professionalId: n.professionalId,
                            soldAt: { gte: q, lte: r },
                        },
                        include: { product: !0 },
                        orderBy: { soldAt: 'asc' },
                    }),
                    c.prisma.productSale.findMany({
                        where: {
                            companyId: n.companyId,
                            professionalId: n.professionalId,
                            soldAt: { gte: s, lte: t },
                        },
                        include: { product: !0 },
                        orderBy: { soldAt: 'asc' },
                    }),
                    c.prisma.professionalCancellationFee.findMany({
                        where: {
                            companyId: n.companyId,
                            professionalId: n.professionalId,
                            createdAt: { gte: q, lte: r },
                        },
                        select: { id: !0, amount: !0, createdAt: !0 },
                    }),
                    c.prisma.professionalCancellationFee.findMany({
                        where: {
                            companyId: n.companyId,
                            professionalId: n.professionalId,
                            createdAt: { gte: s, lte: t },
                        },
                        select: { id: !0, amount: !0, createdAt: !0 },
                    }),
                ]),
                D = v.reduce((a, b) => {
                    let c = b.professionalEarningValue,
                        d = b.servicePriceAtTheTime,
                        e = b.service?.price ?? 0,
                        f = b.professionalPercentageAtTheTime,
                        g = b.service?.professionalPercentage ?? 0;
                    return c
                        ? a + Number(c)
                        : a +
                              ((d ? Number(d) : Number(e)) *
                                  (f ? Number(f) : Number(g))) /
                                  100;
                }, 0),
                E = x.reduce((a, b) => {
                    let c = b.professionalEarningValue,
                        d = b.servicePriceAtTheTime,
                        e = b.service?.price ?? 0,
                        f = b.professionalPercentageAtTheTime,
                        g = b.service?.professionalPercentage ?? 0;
                    return c
                        ? a + Number(c)
                        : a +
                              ((d ? Number(d) : Number(e)) *
                                  (f ? Number(f) : Number(g))) /
                                  100;
                }, 0),
                F = z.reduce((a, b) => a + b.quantity, 0),
                G = A.reduce((a, b) => a + b.quantity, 0),
                H = z.reduce((a, b) => {
                    let c = b.product?.professionalPercentage ?? 0;
                    return a + (Number(b.totalPrice) * Number(c)) / 100;
                }, 0),
                I = A.reduce((a, b) => {
                    let c = b.product?.professionalPercentage ?? 0;
                    return a + (Number(b.totalPrice) * Number(c)) / 100;
                }, 0),
                J = B.reduce((a, b) => a + Number(b.amount ?? 0), 0),
                K = C.reduce((a, b) => a + Number(b.amount ?? 0), 0),
                L = w
                    .filter((a) => a.cancelFeeApplied)
                    .reduce((a, b) => a + Number(b.cancelFeeValue ?? 0), 0),
                M = y
                    .filter((a) => a.cancelFeeApplied)
                    .reduce((a, b) => a + Number(b.cancelFeeValue ?? 0), 0),
                N = J > 0 ? J : L,
                O = K > 0 ? K : M,
                P = E + I + O,
                Q = v.length,
                R = x.length,
                S = w.length,
                T = y.length,
                U = v.map((a) => {
                    let b = a.scheduleAt.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: j,
                        }),
                        c = a.servicePriceAtTheTime,
                        d = a.service?.price ?? 0,
                        e = c ? Number(c) : Number(d),
                        f = a.professionalPercentageAtTheTime,
                        g = a.service?.professionalPercentage ?? 0,
                        h = f ? Number(f) : Number(g),
                        i = a.professionalEarningValue,
                        k = i ? Number(i) : (e * h) / 100;
                    return {
                        id: a.id,
                        clientName: a.clientName ?? '',
                        description:
                            a.description ?? a.service?.name ?? 'Serviço',
                        time: b,
                        priceFormatted: u.format(e),
                        percentageFormatted: `${h.toFixed(2)}%`,
                        earningFormatted: u.format(k),
                    };
                }),
                V = z.map((a) => {
                    let b = a.soldAt.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: j,
                        }),
                        c = a.product?.name ?? 'Produto',
                        d = Number(a.totalPrice),
                        e = Number(a.product?.professionalPercentage ?? 0),
                        f = (d * e) / 100;
                    return {
                        id: `product-${a.id}`,
                        clientName: '(Produto)',
                        description: `${c} \xb7 ${a.quantity} un.`,
                        time: b,
                        priceFormatted: u.format(d),
                        percentageFormatted: `${e.toFixed(2)}%`,
                        earningFormatted: u.format(f),
                    };
                });
            return (0, b.jsxs)('div', {
                className: 'space-y-6',
                children: [
                    (0, b.jsxs)('header', {
                        className:
                            'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
                        children: [
                            (0, b.jsxs)('div', {
                                className: 'space-y-1',
                                children: [
                                    (0, b.jsx)('h1', {
                                        className:
                                            'text-title text-content-primary',
                                        children: 'Meus ganhos',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-paragraph-medium-size text-content-secondary',
                                        children:
                                            'Ganhos do dia e acumulado no mês (serviços, produtos e taxas quando aplicadas).',
                                    }),
                                ],
                            }),
                            (0, b.jsx)(e.DatePicker, {}),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
                        children: [
                            (0, b.jsx)(k, {
                                label: 'Total do dia',
                                value: u.format(D + H + N),
                                hint: `Servi\xe7os: ${u.format(D)} \xb7 Produtos: ${u.format(H)} \xb7 Taxas: ${u.format(N)}`,
                            }),
                            (0, b.jsx)(k, {
                                label: 'Total do mês',
                                value: u.format(P),
                                hint: `Servi\xe7os: ${u.format(E)} \xb7 Produtos: ${u.format(I)} \xb7 Taxas: ${u.format(O)}`,
                            }),
                            (0, b.jsx)(k, {
                                label: 'Atendimentos',
                                value: `${Q} hoje`,
                                hint: `${R} no m\xeas \xb7 Cancelados: ${S} hoje / ${T} m\xeas`,
                            }),
                            (0, b.jsx)(k, {
                                label: 'Produtos',
                                value: `${F} un. hoje`,
                                hint: `${G} un. no m\xeas \xb7 Ganho: ${u.format(I)}`,
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'space-y-3',
                        children: [
                            (0, b.jsx)('h2', {
                                className: 'text-subtitle text-content-primary',
                                children: 'Detalhamento de atendimentos do dia',
                            }),
                            0 === U.length
                                ? (0, b.jsx)('p', {
                                      className:
                                          'text-paragraph-small text-content-secondary',
                                      children:
                                          'Você não teve atendimentos concluídos neste dia.',
                                  })
                                : (0, b.jsx)(l, { rows: U }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'space-y-3',
                        children: [
                            (0, b.jsx)('h2', {
                                className: 'text-subtitle text-content-primary',
                                children:
                                    'Detalhamento de vendas de produtos do dia',
                            }),
                            0 === V.length
                                ? (0, b.jsx)('p', {
                                      className:
                                          'text-paragraph-small text-content-secondary',
                                      children:
                                          'Você não teve vendas de produtos neste dia.',
                                  })
                                : (0, b.jsx)(l, { rows: V }),
                        ],
                    }),
                ],
            });
        }
        a.s([
            'default',
            () => n,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Profissional | Ganhos' },
        ]);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ebc3717c._.js.map
