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
    160168,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(766518),
            d = a.i(975127),
            e = a.i(607957);
        async function f({ searchParams: a }) {
            let f = await a,
                g = (function (a) {
                    if (!a) return new Date();
                    let [b, c, d] = a.split('-').map(Number);
                    return b && c && d ? new Date(b, c - 1, d) : new Date();
                })(f?.date),
                h = (0, e.startOfDay)(g),
                i = (0, d.endOfDay)(g),
                j = await c.prisma.appointment.findMany({
                    where: { scheduleAt: { gte: h, lte: i } },
                    orderBy: { scheduleAt: 'asc' },
                    select: {
                        id: !0,
                        scheduleAt: !0,
                        clientName: !0,
                        description: !0,
                    },
                }),
                k = g.toLocaleDateString('pt-BR');
            return (0, b.jsxs)('main', {
                className: 'mx-auto w-full max-w-5xl p-6',
                children: [
                    (0, b.jsx)('h1', {
                        className: 'text-xl font-semibold',
                        children: 'Agendamentos do dia',
                    }),
                    (0, b.jsxs)('p', {
                        className: 'mt-1 text-sm text-muted-foreground',
                        children: [
                            'Data:',
                            ' ',
                            (0, b.jsx)('span', {
                                className: 'font-medium text-foreground',
                                children: k,
                            }),
                            ' ',
                            '• ',
                            j.length,
                            ' agendamento(s)',
                        ],
                    }),
                    0 === j.length
                        ? (0, b.jsx)('div', {
                              className:
                                  'mt-6 rounded-lg border p-4 text-sm text-muted-foreground',
                              children:
                                  'Nenhum agendamento encontrado para este dia.',
                          })
                        : (0, b.jsx)('ul', {
                              className: 'mt-6 space-y-3',
                              children: j.map((a) => {
                                  let c = a.scheduleAt.toLocaleTimeString(
                                      'pt-BR',
                                      { hour: '2-digit', minute: '2-digit' }
                                  );
                                  return (0, b.jsxs)(
                                      'li',
                                      {
                                          className: 'rounded-lg border p-4',
                                          children: [
                                              (0, b.jsxs)('div', {
                                                  className:
                                                      'flex flex-wrap items-baseline justify-between gap-2',
                                                  children: [
                                                      (0, b.jsx)('div', {
                                                          className:
                                                              'font-medium',
                                                          children:
                                                              a.clientName?.trim() ||
                                                              'Cliente',
                                                      }),
                                                      (0, b.jsx)('div', {
                                                          className:
                                                              'text-sm text-muted-foreground',
                                                          children: c,
                                                      }),
                                                  ],
                                              }),
                                              a.description?.trim()
                                                  ? (0, b.jsx)('p', {
                                                        className:
                                                            'mt-2 text-sm text-muted-foreground',
                                                        children: a.description,
                                                    })
                                                  : null,
                                          ],
                                      },
                                      a.id
                                  );
                              }),
                          }),
                ],
            });
        }
        a.s(['default', () => f, 'dynamic', 0, 'force-dynamic']);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__89d5ddf1._.js.map
