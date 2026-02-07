module.exports = [
    455351,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call AdminNewClientDialog() from the server but AdminNewClientDialog is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/clients/admin-new-client-dialog/admin-new-client-dialog.tsx <module evaluation>',
            'AdminNewClientDialog'
        );
        a.s(['AdminNewClientDialog', 0, b]);
    },
    273334,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call AdminNewClientDialog() from the server but AdminNewClientDialog is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/clients/admin-new-client-dialog/admin-new-client-dialog.tsx',
            'AdminNewClientDialog'
        );
        a.s(['AdminNewClientDialog', 0, b]);
    },
    824398,
    (a) => {
        'use strict';
        a.i(455351);
        var b = a.i(273334);
        a.n(b);
    },
    990413,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call AdminEditClientDialog() from the server but AdminEditClientDialog is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/clients/admin-edit-client-dialog/admin-edit-client-dialog.tsx <module evaluation>',
            'AdminEditClientDialog'
        );
        a.s(['AdminEditClientDialog', 0, b]);
    },
    523107,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call AdminEditClientDialog() from the server but AdminEditClientDialog is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/clients/admin-edit-client-dialog/admin-edit-client-dialog.tsx',
            'AdminEditClientDialog'
        );
        a.s(['AdminEditClientDialog', 0, b]);
    },
    879631,
    (a) => {
        'use strict';
        a.i(990413);
        var b = a.i(523107);
        a.n(b);
    },
    802348,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(468695),
            d = a.i(169513),
            e = a.i(254413),
            f = a.i(816443),
            g = a.i(766518),
            h = a.i(28792),
            i = a.i(819637),
            j = a.i(638904),
            k = a.i(850931),
            l = a.i(593025),
            m = a.i(543474);
        let n = (0, m.default)('chevron-left', [
                ['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }],
            ]),
            o = (0, m.default)('chevron-right', [
                ['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }],
            ]),
            p = (0, m.default)('ellipsis', [
                ['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
                ['circle', { cx: '19', cy: '12', r: '1', key: '1wjl8i' }],
                ['circle', { cx: '5', cy: '12', r: '1', key: '1pcz8c' }],
            ]);
        var q = a.i(139138);
        function r({ className: a, ...c }) {
            return (0, b.jsx)('nav', {
                role: 'navigation',
                'aria-label': 'pagination',
                'data-slot': 'pagination',
                className: (0, q.cn)('mx-auto flex w-full justify-center', a),
                ...c,
            });
        }
        function s({ className: a, ...c }) {
            return (0, b.jsx)('ul', {
                'data-slot': 'pagination-content',
                className: (0, q.cn)('flex flex-row items-center gap-1', a),
                ...c,
            });
        }
        function t({ ...a }) {
            return (0, b.jsx)('li', { 'data-slot': 'pagination-item', ...a });
        }
        function u({ className: a, isActive: c, size: d = 'icon', ...e }) {
            return (0, b.jsx)('a', {
                'aria-current': c ? 'page' : void 0,
                'data-slot': 'pagination-link',
                'data-active': c,
                className: (0, q.cn)(
                    (0, j.buttonVariants)({
                        variant: c ? 'outline' : 'ghost',
                        size: d,
                    }),
                    a
                ),
                ...e,
            });
        }
        function v({ className: a, ...c }) {
            return (0, b.jsxs)(u, {
                'aria-label': 'Go to previous page',
                size: 'default',
                className: (0, q.cn)('gap-1 px-2.5 sm:pl-2.5', a),
                ...c,
                children: [
                    (0, b.jsx)(n, {}),
                    (0, b.jsx)('span', {
                        className: 'hidden sm:block',
                        children: 'Previous',
                    }),
                ],
            });
        }
        function w({ className: a, ...c }) {
            return (0, b.jsxs)(u, {
                'aria-label': 'Go to next page',
                size: 'default',
                className: (0, q.cn)('gap-1 px-2.5 sm:pr-2.5', a),
                ...c,
                children: [
                    (0, b.jsx)('span', {
                        className: 'hidden sm:block',
                        children: 'Next',
                    }),
                    (0, b.jsx)(o, {}),
                ],
            });
        }
        function x({ className: a, ...c }) {
            return (0, b.jsxs)('span', {
                'aria-hidden': !0,
                'data-slot': 'pagination-ellipsis',
                className: (0, q.cn)(
                    'flex size-9 items-center justify-center',
                    a
                ),
                ...c,
                children: [
                    (0, b.jsx)(p, { className: 'size-4' }),
                    (0, b.jsx)('span', {
                        className: 'sr-only',
                        children: 'More pages',
                    }),
                ],
            });
        }
        function y(a) {
            return (0, b.jsxs)('svg', {
                viewBox: '0 0 32 32',
                ...a,
                className: (0, q.cn)('inline-block', a.className),
                'aria-hidden': 'true',
                children: [
                    (0, b.jsx)('circle', {
                        cx: '16',
                        cy: '16',
                        r: '15',
                        fill: 'white',
                    }),
                    (0, b.jsx)('circle', {
                        cx: '16',
                        cy: '16',
                        r: '13.5',
                        fill: '#25D366',
                    }),
                    (0, b.jsx)('path', {
                        fill: '#FFF',
                        d: 'M21.307 18.62c-.307-.154-1.816-.895-2.098-.996-.28-.102-.484-.154-.688.154-.204.307-.79.996-.966 1.2-.178.204-.357.23-.664.077-.307-.154-1.296-.477-2.468-1.52-.912-.81-1.528-1.81-1.706-2.117-.178-.307-.02-.472.134-.623.138-.137.307-.357.46-.536.152-.18.203-.307.305-.51.102-.204.05-.384-.026-.537-.077-.154-.688-1.663-.942-2.279-.248-.6-.5-.518-.688-.528l-.591-.01c-.204 0-.537.077-.82.384-.28.307-1.076 1.05-1.076 2.565 0 1.514 1.102 2.976 1.256 3.18.153.204 2.17 3.315 5.36 4.655.75.323 1.334.515 1.79.659.75.239 1.432.205 1.972.124.602-.09 1.816-.742 2.074-1.46.255-.717.255-1.33.178-1.46-.076-.128-.28-.205-.587-.358',
                    }),
                ],
            });
        }
        var z = a.i(824398),
            A = a.i(879631);
        let B = 'admin_company_context',
            C = { BRONZE: 1, PRATA: 2, OURO: 3, DIAMANTE: 4 };
        function D(a) {
            switch (a) {
                case 'BRONZE':
                    return 'Bronze';
                case 'PRATA':
                    return 'Prata';
                case 'OURO':
                    return 'Ouro';
                case 'DIAMANTE':
                    return 'Diamante';
            }
        }
        function E(a) {
            switch (a) {
                case 'BRONZE':
                    return 'bg-amber-500/10 text-amber-700 border-amber-500/30';
                case 'PRATA':
                    return 'bg-slate-500/10 text-slate-200 border-slate-500/30';
                case 'OURO':
                    return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30';
                case 'DIAMANTE':
                    return 'bg-sky-500/10 text-sky-700 border-sky-500/30';
            }
        }
        function F(a, b) {
            let c = new URLSearchParams();
            for (let [b, d] of Object.entries(a))
                if (null != d)
                    if (Array.isArray(d)) for (let a of d) c.append(b, a);
                    else c.set(b, d);
            return (c.set('page', String(b)), `?${c.toString()}`);
        }
        function G(a) {
            if (null != a) return Array.isArray(a) ? a[0] : a;
        }
        async function H(a) {
            let b = String(a?.companyId ?? '').trim();
            if (b) return b;
            let c = await (0, d.cookies)(),
                e = c.get(B)?.value;
            if (e) return e;
            let f = String(a?.userId ?? '').trim();
            if (f) {
                let a = await g.prisma.companyMember.findFirst({
                    where: { userId: f, isActive: !0 },
                    orderBy: { createdAt: 'asc' },
                    select: { companyId: !0 },
                });
                if (a?.companyId) return a.companyId;
            }
            throw Error(
                `companyId ausente (session.companyId, cookie "${B}" e sem fallback por membership).`
            );
        }
        async function I({ searchParams: a }) {
            var m, n, o;
            let p = await (0, h.requireAdminForModule)('CLIENTS'),
                q = await H(p),
                B = await a,
                I = (G(B.q) ?? '').trim(),
                J =
                    'name_desc' === (m = G(B.sort))
                        ? 'name_desc'
                        : 'createdAt_desc' === m
                          ? 'createdAt_desc'
                          : 'createdAt_asc' === m
                            ? 'createdAt_asc'
                            : 'name_asc',
                K =
                    'active' === (n = G(B.plan))
                        ? 'active'
                        : 'none' === n
                          ? 'none'
                          : 'all',
                L =
                    'BRONZE' === (o = G(B.level))
                        ? 'BRONZE'
                        : 'PRATA' === o
                          ? 'PRATA'
                          : 'OURO' === o
                            ? 'OURO'
                            : 'DIAMANTE' === o
                              ? 'DIAMANTE'
                              : 'all',
                M = B?.page,
                N = Number((Array.isArray(M) ? M[0] : M) ?? '1'),
                O = Number.isFinite(N) ? N : 1,
                P = {
                    companyMemberships: {
                        some: { companyId: q, isActive: !0, role: 'CLIENT' },
                    },
                };
            I.length > 0 &&
                (P.OR = [
                    { name: { contains: I, mode: 'insensitive' } },
                    { email: { contains: I, mode: 'insensitive' } },
                    { phone: { contains: I } },
                ]);
            let Q =
                    'name_desc' === J
                        ? { name: 'desc' }
                        : 'createdAt_desc' === J
                          ? { createdAt: 'desc' }
                          : 'createdAt_asc' === J
                            ? { createdAt: 'asc' }
                            : { name: 'asc' },
                R = await g.prisma.user.count({ where: P }),
                S = Math.max(1, Math.ceil(R / 10)),
                T = Math.max(1, Math.min(S, O)),
                U = await g.prisma.user.findMany({
                    where: P,
                    orderBy: Q,
                    skip: (T - 1) * 10,
                    take: 10,
                }),
                V = await (0, d.cookies)(),
                W = V.get('admin_unit_context')?.value ?? 'all',
                X = U.map((a) => a.id),
                Y = await g.prisma.customerLevelState.findMany({
                    where: {
                        companyId: q,
                        userId: { in: X },
                        ...('all' !== W ? { unitId: W } : {}),
                    },
                    select: { userId: !0, unitId: !0, levelCurrent: !0 },
                }),
                Z = new Map();
            if ('all' !== W) for (let a of Y) Z.set(a.userId, a.levelCurrent);
            else {
                let a = new Map();
                for (let b of Y) {
                    let c = a.get(b.userId) ?? [];
                    (c.push(b.levelCurrent), a.set(b.userId, c));
                }
                for (let [b, c] of a.entries())
                    Z.set(
                        b,
                        (function (a) {
                            let b = 'BRONZE';
                            for (let c of a) C[c] > C[b] && (b = c);
                            return b;
                        })(c)
                    );
            }
            if (0 === U.length)
                return (0, b.jsxs)('div', {
                    className: 'max-w-7xl mx-auto space-y-6',
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
                                            children: 'Clientes',
                                        }),
                                        (0, b.jsx)('p', {
                                            className:
                                                'text-paragraph-medium text-content-secondary',
                                            children:
                                                'Nenhum cliente encontrado com esses filtros.',
                                        }),
                                        (0, b.jsxs)('p', {
                                            className:
                                                'text-xs text-content-secondary mt-1',
                                            children: [
                                                'Escopo de unidades:',
                                                ' ',
                                                p?.canSeeAllUnits
                                                    ? 'todas as unidades'
                                                    : 'unidade atual',
                                            ],
                                        }),
                                    ],
                                }),
                                (0, b.jsx)(z.AdminNewClientDialog, {}),
                            ],
                        }),
                        (0, b.jsx)('section', {
                            className:
                                'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-4',
                            children: (0, b.jsx)('form', {
                                method: 'GET',
                                className: 'space-y-4',
                                children: (0, b.jsxs)('div', {
                                    className:
                                        'flex flex-col md:flex-row gap-3 md:items-end',
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className: 'flex-1',
                                            children: [
                                                (0, b.jsx)('label', {
                                                    className:
                                                        'text-[11px] text-content-secondary',
                                                    children: 'Buscar',
                                                }),
                                                (0, b.jsx)(k.Input, {
                                                    name: 'q',
                                                    defaultValue: I,
                                                    placeholder:
                                                        'Nome, e-mail ou telefone...',
                                                    className:
                                                        'h-10 bg-background-secondary border-border-primary',
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className: 'w-full md:w-55',
                                            children: [
                                                (0, b.jsx)('label', {
                                                    className:
                                                        'text-[11px] text-content-secondary',
                                                    children: 'Ordenar por',
                                                }),
                                                (0, b.jsxs)('select', {
                                                    name: 'sort',
                                                    defaultValue: J,
                                                    className:
                                                        'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                    children: [
                                                        (0, b.jsx)('option', {
                                                            value: 'name_asc',
                                                            children:
                                                                'Nome (A-Z)',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'name_desc',
                                                            children:
                                                                'Nome (Z-A)',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'createdAt_desc',
                                                            children:
                                                                'Cadastro (mais novos)',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'createdAt_asc',
                                                            children:
                                                                'Cadastro (mais antigos)',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className: 'w-full md:w-55',
                                            children: [
                                                (0, b.jsx)('label', {
                                                    className:
                                                        'text-[11px] text-content-secondary',
                                                    children: 'Plano',
                                                }),
                                                (0, b.jsxs)('select', {
                                                    name: 'plan',
                                                    defaultValue: K,
                                                    className:
                                                        'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                    children: [
                                                        (0, b.jsx)('option', {
                                                            value: 'all',
                                                            children: 'Todos',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'active',
                                                            children:
                                                                'Com plano ativo',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'none',
                                                            children:
                                                                'Sem plano ativo',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className: 'w-full md:w-55',
                                            children: [
                                                (0, b.jsx)('label', {
                                                    className:
                                                        'text-[11px] text-content-secondary',
                                                    children: 'Nível',
                                                }),
                                                (0, b.jsxs)('select', {
                                                    name: 'level',
                                                    defaultValue: L,
                                                    className:
                                                        'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                    children: [
                                                        (0, b.jsx)('option', {
                                                            value: 'all',
                                                            children: 'Todos',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'BRONZE',
                                                            children: 'Bronze',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'PRATA',
                                                            children: 'Prata',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'OURO',
                                                            children: 'Ouro',
                                                        }),
                                                        (0, b.jsx)('option', {
                                                            value: 'DIAMANTE',
                                                            children:
                                                                'Diamante',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className:
                                                'flex flex-col w-full md:w-auto',
                                            children: [
                                                (0, b.jsx)('span', {
                                                    className:
                                                        'text-[11px] text-content-secondary invisible select-none',
                                                    children: 'Ações',
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'flex gap-2',
                                                    children: [
                                                        (0, b.jsx)(j.Button, {
                                                            type: 'submit',
                                                            variant: 'edit2',
                                                            className: 'h-10',
                                                            children: 'Filtrar',
                                                        }),
                                                        (0, b.jsx)(j.Button, {
                                                            asChild: !0,
                                                            variant: 'outline',
                                                            className: 'h-10',
                                                            children: (0,
                                                            b.jsx)(c.default, {
                                                                href: '/admin/clients',
                                                                children:
                                                                    'Limpar',
                                                            }),
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        }),
                    ],
                });
            let $ = new Map(
                    (
                        await g.prisma.service.findMany({
                            where: { companyId: q },
                        })
                    ).map((a) => [a.id, Number(a.price)])
                ),
                _ = await g.prisma.appointment.findMany({
                    where: { companyId: q, clientId: { in: X } },
                    orderBy: { scheduleAt: 'asc' },
                }),
                aa = await g.prisma.clientPlan.findMany({
                    where: { companyId: q, clientId: { in: X } },
                    include: { plan: !0 },
                    orderBy: { startDate: 'asc' },
                }),
                ab = await g.prisma.order.findMany({
                    where: {
                        companyId: q,
                        clientId: { in: X },
                        status: 'COMPLETED',
                        items: { some: { productId: { not: null } } },
                    },
                    include: { items: !0 },
                }),
                ac = new Date(),
                ad = U.map((a) => {
                    let b = _.filter((b) => b.clientId === a.id),
                        c = b.length,
                        d = b.filter((a) => 'DONE' === a.status),
                        e = b.filter((a) => 'CANCELED' === a.status),
                        f = e.filter((a) => a.cancelFeeApplied),
                        g = f.length,
                        h = f.reduce(
                            (a, b) =>
                                a +
                                (b.cancelFeeValue
                                    ? Number(b.cancelFeeValue)
                                    : 0),
                            0
                        ),
                        i = aa.filter((b) => b.clientId === a.id),
                        j = i.length,
                        k = i.find((a) => {
                            let b = a.usedBookings < a.plan.totalBookings,
                                c = 'ACTIVE' === a.status,
                                d = a.endDate >= ac;
                            return c && d && b;
                        }),
                        l = d.map((a) => a.scheduleAt),
                        m = (function (a) {
                            if (0 === a.length) return 'Sem histórico';
                            if (1 === a.length) return 'Poucas visitas';
                            let b = [...a].sort(
                                    (a, b) => a.getTime() - b.getTime()
                                ),
                                c = [];
                            for (let a = 1; a < b.length; a++) {
                                let d =
                                    (b[a].getTime() - b[a - 1].getTime()) /
                                    864e5;
                                c.push(d);
                            }
                            if (0 === c.length) return 'Poucas visitas';
                            let d = c.reduce((a, b) => a + b, 0) / c.length;
                            return d <= 10
                                ? 'Muito frequente'
                                : d <= 25
                                  ? `A cada ~${Math.round(d)} dias`
                                  : 'Visita esporádica';
                        })(l),
                        n =
                            l.length > 0
                                ? new Date(
                                      Math.max(...l.map((a) => a.getTime()))
                                  )
                                : null,
                        o = d.reduce((a, b) => {
                            if (b.clientPlanId) return a;
                            let c = b.servicePriceAtTheTime;
                            return null != c
                                ? a + Number(c)
                                : a +
                                      (Number(
                                          b.serviceId && $.get(b.serviceId)
                                      ) || 0);
                        }, 0),
                        p = i.reduce((a, b) => a + Number(b.plan.price), 0),
                        q = ab
                            .filter((b) => b.clientId === a.id)
                            .reduce((a, b) => a + Number(b.totalAmount), 0),
                        r = a.phone ?? '',
                        s = String(r).replace(/\D/g, ''),
                        t = a.name ?? 'cliente',
                        u = `Ol\xe1 ${t}! Tudo bem? Aqui \xe9 da barbearia. Vi seu cadastro aqui no sistema e queria saber se posso te ajudar com um novo agendamento. ✂️`,
                        v =
                            s.length > 0
                                ? `https://wa.me/${s}?text=${encodeURIComponent(u)}`
                                : null;
                    return {
                        id: a.id,
                        name: a.name ?? 'Cliente sem nome',
                        email: a.email ?? '',
                        phone: r,
                        createdAt: a.createdAt,
                        birthday: a.birthday ?? null,
                        image: a.image ?? null,
                        customerLevel: Z.get(a.id) ?? 'BRONZE',
                        totalAppointments: c,
                        doneCount: d.length,
                        canceledCount: e.length,
                        canceledWithFeeCount: g,
                        totalCancelFee: h,
                        totalPlans: j,
                        hasActivePlan: !!k,
                        frequencyLabel: m,
                        lastDoneDate: n,
                        totalSpent: o + p + q,
                        whatsappUrl: v,
                    };
                }),
                ae =
                    'active' === K
                        ? ad.filter((a) => a.hasActivePlan)
                        : 'none' === K
                          ? ad.filter((a) => !a.hasActivePlan)
                          : ad,
                af = 'all' === L ? ae : ae.filter((a) => a.customerLevel === L),
                {
                    pages: ag,
                    showLeftEllipsis: ah,
                    showRightEllipsis: ai,
                    firstPage: aj,
                    lastPage: ak,
                } = (function (a, b) {
                    let c = Math.max(1, a - 2),
                        d = Math.min(b, a + 2),
                        e = [];
                    for (let a = c; a <= d; a++) e.push(a);
                    return {
                        pages: e,
                        firstPage: 1,
                        lastPage: b,
                        showLeftEllipsis: c > 2,
                        showRightEllipsis: d < b - 1,
                        showFirst: b >= 1,
                        showLast: b >= 2,
                    };
                })(T, S);
            return (0, b.jsxs)('div', {
                className: 'space-y-5 max-w-7xl mx-auto',
                children: [
                    (0, b.jsxs)('header', {
                        className: 'flex flex-col gap-4',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'flex items-center justify-between gap-4',
                                children: [
                                    (0, b.jsxs)('div', {
                                        children: [
                                            (0, b.jsx)('h1', {
                                                className:
                                                    'text-title text-content-primary',
                                                children: 'Clientes',
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-paragraph-medium text-content-secondary',
                                                children:
                                                    'Visualize e gerencie os clientes, histórico de atendimentos, planos e níveis.',
                                            }),
                                            (0, b.jsxs)('p', {
                                                className:
                                                    'text-xs text-content-secondary mt-1',
                                                children: [
                                                    'Mostrando',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'font-semibold text-content-primary',
                                                        children:
                                                            (T - 1) * 10 + 1,
                                                    }),
                                                    ' ',
                                                    'a',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'font-semibold text-content-primary',
                                                        children: Math.min(
                                                            10 * T,
                                                            R
                                                        ),
                                                    }),
                                                    ' ',
                                                    'de',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'font-semibold text-content-primary',
                                                        children: R,
                                                    }),
                                                    '.',
                                                    ' ',
                                                    (0, b.jsxs)('span', {
                                                        className: 'ml-2',
                                                        children: [
                                                            'Escopo de unidades:',
                                                            ' ',
                                                            p?.canSeeAllUnits
                                                                ? 'todas as unidades'
                                                                : 'unidade atual',
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsx)(z.AdminNewClientDialog, {}),
                                ],
                            }),
                            (0, b.jsx)('section', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-4',
                                children: (0, b.jsx)('form', {
                                    method: 'GET',
                                    className: 'space-y-4',
                                    children: (0, b.jsxs)('div', {
                                        className:
                                            'flex flex-col md:flex-row gap-3 md:items-end',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                className: 'flex-1',
                                                children: [
                                                    (0, b.jsx)('label', {
                                                        className:
                                                            'text-[11px] text-content-secondary',
                                                        children: 'Buscar',
                                                    }),
                                                    (0, b.jsx)(k.Input, {
                                                        name: 'q',
                                                        defaultValue: I,
                                                        placeholder:
                                                            'Nome, e-mail ou telefone...',
                                                        className:
                                                            'h-10 bg-background-secondary border-border-primary',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'w-full md:w-55',
                                                children: [
                                                    (0, b.jsx)('label', {
                                                        className:
                                                            'text-[11px] text-content-secondary',
                                                        children: 'Ordenar por',
                                                    }),
                                                    (0, b.jsxs)('select', {
                                                        name: 'sort',
                                                        defaultValue: J,
                                                        className:
                                                            'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                        children: [
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'name_asc',
                                                                    children:
                                                                        'Nome (A-Z)',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'name_desc',
                                                                    children:
                                                                        'Nome (Z-A)',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'createdAt_desc',
                                                                    children:
                                                                        'Cadastro (mais novos)',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'createdAt_asc',
                                                                    children:
                                                                        'Cadastro (mais antigos)',
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'w-full md:w-55',
                                                children: [
                                                    (0, b.jsx)('label', {
                                                        className:
                                                            'text-[11px] text-content-secondary',
                                                        children: 'Plano',
                                                    }),
                                                    (0, b.jsxs)('select', {
                                                        name: 'plan',
                                                        defaultValue: K,
                                                        className:
                                                            'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                        children: [
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'all',
                                                                    children:
                                                                        'Todos',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'active',
                                                                    children:
                                                                        'Com plano ativo',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'none',
                                                                    children:
                                                                        'Sem plano ativo',
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'w-full md:w-55',
                                                children: [
                                                    (0, b.jsx)('label', {
                                                        className:
                                                            'text-[11px] text-content-secondary',
                                                        children: 'Nível',
                                                    }),
                                                    (0, b.jsxs)('select', {
                                                        name: 'level',
                                                        defaultValue: L,
                                                        className:
                                                            'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                        children: [
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'all',
                                                                    children:
                                                                        'Todos',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'BRONZE',
                                                                    children:
                                                                        'Bronze',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'PRATA',
                                                                    children:
                                                                        'Prata',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'OURO',
                                                                    children:
                                                                        'Ouro',
                                                                }
                                                            ),
                                                            (0, b.jsx)(
                                                                'option',
                                                                {
                                                                    value: 'DIAMANTE',
                                                                    children:
                                                                        'Diamante',
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'flex gap-2',
                                                children: [
                                                    (0, b.jsx)(j.Button, {
                                                        type: 'submit',
                                                        variant: 'edit2',
                                                        size: 'sm',
                                                        children: 'Filtrar',
                                                    }),
                                                    (0, b.jsx)(j.Button, {
                                                        asChild: !0,
                                                        variant: 'outline',
                                                        size: 'sm',
                                                        children: (0, b.jsx)(
                                                            c.default,
                                                            {
                                                                href: '/admin/client',
                                                                children:
                                                                    'Limpar',
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'space-y-4',
                        children: [
                            (0, b.jsx)(l.Accordion, {
                                type: 'single',
                                collapsible: !0,
                                className: 'space-y-2',
                                children: af.map((a) =>
                                    (0, b.jsxs)(
                                        l.AccordionItem,
                                        {
                                            value: a.id,
                                            className:
                                                'border border-border-primary rounded-xl bg-background-tertiary',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'flex items-center gap-6 px-4 py-3 w-full',
                                                    children: [
                                                        (0, b.jsxs)(
                                                            l.AccordionTrigger,
                                                            {
                                                                className:
                                                                    'flex-1 min-w-0 px-0 py-0 hover:no-underline grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.6fr)_32px] items-center gap-6',
                                                                children: [
                                                                    (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'min-w-0 flex items-center gap-3 text-left',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'div',
                                                                                        {
                                                                                            className:
                                                                                                'h-10 w-10 rounded-full overflow-hidden bg-background-secondary border border-border-primary flex items-center justify-center shrink-0',
                                                                                            children:
                                                                                                a.image
                                                                                                    ? (0,
                                                                                                      b.jsx)(
                                                                                                          'img',
                                                                                                          {
                                                                                                              src: a.image,
                                                                                                              alt: a.name,
                                                                                                              className:
                                                                                                                  'h-full w-full object-cover',
                                                                                                          }
                                                                                                      )
                                                                                                    : (0,
                                                                                                      b.jsx)(
                                                                                                          'span',
                                                                                                          {
                                                                                                              className:
                                                                                                                  'text-xs font-medium text-content-secondary',
                                                                                                              children:
                                                                                                                  a.name
                                                                                                                      .split(
                                                                                                                          ' '
                                                                                                                      )
                                                                                                                      .map(
                                                                                                                          (
                                                                                                                              a
                                                                                                                          ) =>
                                                                                                                              a[0]
                                                                                                                      )
                                                                                                                      .join(
                                                                                                                          ''
                                                                                                                      )
                                                                                                                      .slice(
                                                                                                                          0,
                                                                                                                          2
                                                                                                                      )
                                                                                                                      .toUpperCase(),
                                                                                                          }
                                                                                                      ),
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    b.jsxs)(
                                                                                        'div',
                                                                                        {
                                                                                            className:
                                                                                                'min-w-0',
                                                                                            children:
                                                                                                [
                                                                                                    (0,
                                                                                                    b.jsxs)(
                                                                                                        'div',
                                                                                                        {
                                                                                                            className:
                                                                                                                'flex items-center gap-2 min-w-0',
                                                                                                            children:
                                                                                                                [
                                                                                                                    (0,
                                                                                                                    b.jsx)(
                                                                                                                        'p',
                                                                                                                        {
                                                                                                                            className:
                                                                                                                                'text-paragraph-medium-size font-semibold text-content-primary truncate',
                                                                                                                            children:
                                                                                                                                a.name,
                                                                                                                        }
                                                                                                                    ),
                                                                                                                    a.hasActivePlan &&
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            i.Badge,
                                                                                                                            {
                                                                                                                                variant:
                                                                                                                                    'outline',
                                                                                                                                className:
                                                                                                                                    'text-xs border-green-600/40 text-green-600 shrink-0',
                                                                                                                                children:
                                                                                                                                    'Plano ativo',
                                                                                                                            }
                                                                                                                        ),
                                                                                                                ],
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    b.jsx)(
                                                                                                        'p',
                                                                                                        {
                                                                                                            className:
                                                                                                                'text-xs text-content-secondary truncate',
                                                                                                            children:
                                                                                                                a.email ||
                                                                                                                'Sem e-mail',
                                                                                                        }
                                                                                                    ),
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'hidden sm:flex flex-col text-left min-w-0',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-[11px] text-content-secondary',
                                                                                            children:
                                                                                                'Nível',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'div',
                                                                                        {
                                                                                            className:
                                                                                                'min-w-0',
                                                                                            children:
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    i.Badge,
                                                                                                    {
                                                                                                        variant:
                                                                                                            'outline',
                                                                                                        className: `text-xs ${E(a.customerLevel)}`,
                                                                                                        children:
                                                                                                            D(
                                                                                                                a.customerLevel
                                                                                                            ),
                                                                                                    }
                                                                                                ),
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'hidden md:flex flex-col text-left min-w-0',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-[11px] text-content-secondary',
                                                                                            children:
                                                                                                'Telefone',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-xs text-content-primary truncate',
                                                                                            children:
                                                                                                a.phone ||
                                                                                                '—',
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'hidden sm:flex flex-col text-left min-w-0',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-[11px] text-content-secondary',
                                                                                            children:
                                                                                                'Último agendamento',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-xs text-content-primary truncate',
                                                                                            children:
                                                                                                a.lastDoneDate
                                                                                                    ? (0,
                                                                                                      e.format)(
                                                                                                          a.lastDoneDate,
                                                                                                          'dd/MM/yyyy HH:mm',
                                                                                                          {
                                                                                                              locale: f.ptBR,
                                                                                                          }
                                                                                                      )
                                                                                                    : 'Sem atendimento',
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                ],
                                                            }
                                                        ),
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'ml-auto flex items-center justify-end gap-2 whitespace-nowrap',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    A.AdminEditClientDialog,
                                                                    {
                                                                        client: {
                                                                            id: a.id,
                                                                            name: a.name,
                                                                            email: a.email,
                                                                            phone:
                                                                                a.phone ??
                                                                                '',
                                                                            birthday:
                                                                                a.birthday,
                                                                        },
                                                                    }
                                                                ),
                                                                a.whatsappUrl &&
                                                                    (0, b.jsxs)(
                                                                        'a',
                                                                        {
                                                                            href: a.whatsappUrl,
                                                                            target: '_blank',
                                                                            rel: 'noreferrer',
                                                                            title: 'Enviar mensagem no WhatsApp',
                                                                            className:
                                                                                'inline-flex items-center justify-center size-9',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        y,
                                                                                        {
                                                                                            className:
                                                                                                'h-7 w-7',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'sr-only',
                                                                                            children:
                                                                                                'WhatsApp',
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)(l.AccordionContent, {
                                                    className:
                                                        'border-t border-border-primary px-4 py-4',
                                                    children: (0, b.jsxs)(
                                                        'div',
                                                        {
                                                            className:
                                                                'grid gap-4 md:grid-cols-3',
                                                            children: [
                                                                (0, b.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'rounded-xl border border-border-primary bg-background-secondary p-4 space-y-2',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'p',
                                                                                    {
                                                                                        className:
                                                                                            'text-label-small text-content-primary',
                                                                                        children:
                                                                                            'Dados do cliente',
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'space-y-2 text-paragraph-small',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Nome:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-medium flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.name,
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Nível:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            (0,
                                                                                                                            b.jsx)(
                                                                                                                                i.Badge,
                                                                                                                                {
                                                                                                                                    variant:
                                                                                                                                        'outline',
                                                                                                                                    className: `text-xs ${E(a.customerLevel)}`,
                                                                                                                                    children:
                                                                                                                                        D(
                                                                                                                                            a.customerLevel
                                                                                                                                        ),
                                                                                                                                }
                                                                                                                            ),
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'E-mail:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.email ||
                                                                                                                            '—',
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Telefone:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.phone ||
                                                                                                                            '—',
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Nascimento:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.birthday
                                                                                                                                ? (0,
                                                                                                                                  e.format)(
                                                                                                                                      a.birthday,
                                                                                                                                      'dd/MM/yyyy',
                                                                                                                                      {
                                                                                                                                          locale: f.ptBR,
                                                                                                                                      }
                                                                                                                                  )
                                                                                                                                : 'Não informado',
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Cadastrado em:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            (0,
                                                                                                                            e.format)(
                                                                                                                                a.createdAt,
                                                                                                                                'dd/MM/yyyy HH:mm',
                                                                                                                                {
                                                                                                                                    locale: f.ptBR,
                                                                                                                                }
                                                                                                                            ),
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                                (0, b.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'rounded-xl border border-border-primary bg-background-secondary p-4 space-y-2',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'p',
                                                                                    {
                                                                                        className:
                                                                                            'text-label-small text-content-primary',
                                                                                        children:
                                                                                            'Atendimentos',
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'space-y-2 text-paragraph-small',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Agendamentos:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-semibold flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.totalAppointments,
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Concluídos:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-semibold flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.doneCount,
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Cancelados:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-semibold flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.canceledCount,
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Canc. c/ taxa:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-semibold flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.canceledWithFeeCount,
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Frequência:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-semibold flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.frequencyLabel,
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                                (0, b.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'rounded-xl border border-border-primary bg-background-secondary p-4 space-y-3',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'p',
                                                                                    {
                                                                                        className:
                                                                                            'text-label-small text-content-primary',
                                                                                        children:
                                                                                            'Financeiro',
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'space-y-2 text-paragraph-small',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Total gasto:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-semibold flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.totalSpent.toLocaleString(
                                                                                                                                'pt-BR',
                                                                                                                                {
                                                                                                                                    style: 'currency',
                                                                                                                                    currency:
                                                                                                                                        'BRL',
                                                                                                                                    minimumFractionDigits: 2,
                                                                                                                                }
                                                                                                                            ),
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Planos adquiridos:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-semibold flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.totalPlans,
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Taxas de cancelamento:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary font-semibold flex-1 min-w-0 truncate',
                                                                                                                        children:
                                                                                                                            a.totalCancelFee.toLocaleString(
                                                                                                                                'pt-BR',
                                                                                                                                {
                                                                                                                                    style: 'currency',
                                                                                                                                    currency:
                                                                                                                                        'BRL',
                                                                                                                                    minimumFractionDigits: 2,
                                                                                                                                }
                                                                                                                            ),
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'div',
                                                                                                    {
                                                                                                        className:
                                                                                                            'flex items-center gap-2',
                                                                                                        children:
                                                                                                            [
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-secondary shrink-0',
                                                                                                                        children:
                                                                                                                            'Status do plano:',
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'flex-1 min-w-0',
                                                                                                                    }
                                                                                                                ),
                                                                                                                a.hasActivePlan
                                                                                                                    ? (0,
                                                                                                                      b.jsx)(
                                                                                                                          i.Badge,
                                                                                                                          {
                                                                                                                              className:
                                                                                                                                  'bg-emerald-500/10 text-emerald-600 border-emerald-500/40',
                                                                                                                              children:
                                                                                                                                  'Cliente de plano ativo',
                                                                                                                          }
                                                                                                                      )
                                                                                                                    : (0,
                                                                                                                      b.jsx)(
                                                                                                                          i.Badge,
                                                                                                                          {
                                                                                                                              variant:
                                                                                                                                  'outline',
                                                                                                                              className:
                                                                                                                                  'border-border-primary text-content-secondary',
                                                                                                                              children:
                                                                                                                                  'Sem plano ativo',
                                                                                                                          }
                                                                                                                      ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                            ],
                                                        }
                                                    ),
                                                }),
                                            ],
                                        },
                                        a.id
                                    )
                                ),
                            }),
                            S > 1 &&
                                (0, b.jsx)('div', {
                                    className: 'pt-4 flex justify-center',
                                    children: (0, b.jsx)(r, {
                                        children: (0, b.jsxs)(s, {
                                            children: [
                                                (0, b.jsx)(t, {
                                                    children: (0, b.jsx)(v, {
                                                        href: F(
                                                            B,
                                                            Math.max(1, T - 1)
                                                        ),
                                                        'aria-disabled':
                                                            1 === T,
                                                        className:
                                                            1 === T
                                                                ? 'pointer-events-none opacity-50'
                                                                : '',
                                                    }),
                                                }),
                                                T > 3 &&
                                                    (0, b.jsx)(t, {
                                                        children: (0, b.jsx)(
                                                            u,
                                                            {
                                                                href: F(B, aj),
                                                                children: aj,
                                                            }
                                                        ),
                                                    }),
                                                ah &&
                                                    (0, b.jsx)(t, {
                                                        children: (0, b.jsx)(
                                                            x,
                                                            {}
                                                        ),
                                                    }),
                                                ag.map((a) =>
                                                    (0, b.jsx)(
                                                        t,
                                                        {
                                                            children: (0,
                                                            b.jsx)(u, {
                                                                href: F(B, a),
                                                                isActive:
                                                                    a === T,
                                                                children: a,
                                                            }),
                                                        },
                                                        a
                                                    )
                                                ),
                                                ai &&
                                                    (0, b.jsx)(t, {
                                                        children: (0, b.jsx)(
                                                            x,
                                                            {}
                                                        ),
                                                    }),
                                                T < S - 2 &&
                                                    (0, b.jsx)(t, {
                                                        children: (0, b.jsx)(
                                                            u,
                                                            {
                                                                href: F(B, ak),
                                                                children: ak,
                                                            }
                                                        ),
                                                    }),
                                                (0, b.jsx)(t, {
                                                    children: (0, b.jsx)(w, {
                                                        href: F(
                                                            B,
                                                            Math.min(S, T + 1)
                                                        ),
                                                        'aria-disabled':
                                                            T === S,
                                                        className:
                                                            T === S
                                                                ? 'pointer-events-none opacity-50'
                                                                : '',
                                                    }),
                                                }),
                                            ],
                                        }),
                                    }),
                                }),
                        ],
                    }),
                ],
            });
        }
        a.s(
            [
                'default',
                () => I,
                'dynamic',
                0,
                'force-dynamic',
                'metadata',
                0,
                { title: 'Admin | Clientes' },
            ],
            802348
        );
    },
];

//# sourceMappingURL=src_a8363a03._.js.map
