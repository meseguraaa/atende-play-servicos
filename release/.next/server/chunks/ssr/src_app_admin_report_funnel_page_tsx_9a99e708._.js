module.exports = [
    481207,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(468695),
            d = a.i(766518),
            e = a.i(169513),
            f = a.i(28792);
        a.i(56672);
        var g = a.i(868313),
            h = a.i(491308);
        a.i(23677);
        var i = a.i(790993);
        a.i(887143);
        var j = a.i(13296),
            k = a.i(638904),
            l = a.i(139138),
            m = a.i(303223),
            n = a.i(151748),
            o = a.i(984330),
            p = a.i(254413),
            q = a.i(816443);
        a.i(106878);
        var r = a.i(154840);
        let s = 'admin_unit_context',
            t = 'admin_company_context';
        async function u(a) {
            let b = await (0, e.cookies)(),
                c = b.get(t)?.value;
            if (c) return c;
            let f =
                ('string' == typeof a?.companyId && a.companyId) ||
                ('string' == typeof a?.company?.id && a.company.id);
            if (f) return f;
            let g =
                ('string' == typeof a?.userId && a.userId) ||
                ('string' == typeof a?.id && a.id) ||
                ('string' == typeof a?.sub && a.sub);
            if (!g)
                throw Error(
                    'Não consegui resolver o userId do admin para achar a company.'
                );
            let h = await d.prisma.companyMember.findFirst({
                where: { userId: g, isActive: !0 },
                select: { companyId: !0 },
                orderBy: { createdAt: 'asc' },
            });
            if (!h?.companyId)
                throw Error(
                    `Company n\xe3o definida para este admin. (cookie "${t}" ausente e sem membership ativa).`
                );
            return h.companyId;
        }
        function v(a) {
            let b = new Intl.DateTimeFormat('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).formatToParts(a),
                c = Number(b.find((a) => 'day' === a.type)?.value ?? '1'),
                d = Number(b.find((a) => 'month' === a.type)?.value ?? '1');
            return {
                y: Number(b.find((a) => 'year' === a.type)?.value ?? '1970'),
                m: d,
                d: c,
            };
        }
        function w(a) {
            let { y: b, m: c } = v(a);
            return new Date(Date.UTC(b, c - 1, 1, 3, 0, 0));
        }
        function x(a) {
            let { y: b, m: c } = v(a);
            return new Date(new Date(Date.UTC(b, c, 1, 3, 0, 0)).getTime() - 1);
        }
        async function y(a) {
            if (!a.canSeeAllUnits) return a.unitId;
            let b = await (0, e.cookies)(),
                c = b.get(s)?.value ?? 'all';
            return c && 'all' !== c ? c : null;
        }
        function z(a) {
            return a ? { unitId: a } : {};
        }
        function A(a) {
            return 'prev_year' === a ? 'ano anterior' : 'mês anterior';
        }
        function B(a) {
            return Number.isFinite(a) ? `${Math.round(a)}%` : '—';
        }
        function C(a, b) {
            let c =
                Number.isFinite(a) && Number.isFinite(b) && !(b <= 0)
                    ? a / b
                    : NaN;
            return Number.isFinite(c) ? 100 * c : NaN;
        }
        function D(a) {
            return `${a > 0 ? '+' : ''}${Math.round(a)} p.p.`;
        }
        function E(a) {
            return Number.isFinite(a) ? `${Math.round(a)}d` : '—';
        }
        function F(a) {
            let c =
                    Number.isFinite(a.convFromPrevPct) && a.index > 0
                        ? `${Math.round(a.convFromPrevPct)}%`
                        : null,
                d =
                    Number.isFinite(a.dropFromPrevPct) && a.index > 0
                        ? `${Math.round(a.dropFromPrevPct)}%`
                        : null;
            return (0, b.jsxs)('div', {
                className:
                    'rounded-xl border border-border-primary bg-background-tertiary p-4',
                children: [
                    (0, b.jsxs)('div', {
                        className: 'flex items-start justify-between gap-3',
                        children: [
                            (0, b.jsxs)('div', {
                                children: [
                                    (0, b.jsxs)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: ['Etapa ', a.index + 1],
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-large text-content-primary',
                                        children: a.title,
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className: 'text-right',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-title text-content-primary tabular-nums',
                                        children: a.value,
                                    }),
                                    c
                                        ? (0, b.jsxs)('p', {
                                              className:
                                                  'text-[11px] text-content-tertiary',
                                              children: [
                                                  'Conversão:',
                                                  ' ',
                                                  (0, b.jsx)('span', {
                                                      className:
                                                          'text-content-primary',
                                                      children: c,
                                                  }),
                                              ],
                                          })
                                        : (0, b.jsx)('p', {
                                              className:
                                                  'text-[11px] text-content-tertiary',
                                              children: 'Base do funil',
                                          }),
                                    d
                                        ? (0, b.jsxs)('p', {
                                              className:
                                                  'text-[11px] text-content-tertiary',
                                              children: [
                                                  'Queda:',
                                                  ' ',
                                                  (0, b.jsx)('span', {
                                                      className:
                                                          'text-content-primary',
                                                      children: d,
                                                  }),
                                              ],
                                          })
                                        : null,
                                ],
                            }),
                        ],
                    }),
                    a.sub
                        ? (0, b.jsx)('p', {
                              className:
                                  'mt-2 text-[11px] text-content-tertiary',
                              children: a.sub,
                          })
                        : null,
                ],
            });
        }
        async function G({ searchParams: a }) {
            var t;
            let v = await (0, f.requireAdminForModule)('REPORTS'),
                G = await u(v),
                H = await (0, e.cookies)();
            if (!v?.canSeeAllUnits && !v?.unitId)
                throw Error(
                    'Admin de unidade sem unitId definido. Vincule este admin a uma unidade.'
                );
            let I = H.get(s)?.value ?? 'all',
                J = v?.canSeeAllUnits ? I : (v?.unitId ?? ''),
                K = await y({
                    unitId: v?.unitId ?? null,
                    canSeeAllUnits: !!v?.canSeeAllUnits,
                });
            K &&
                ((await d.prisma.unit.findFirst({
                    where: { id: K, companyId: G, isActive: !0 },
                    select: { id: !0 },
                })) ||
                    (0, r.redirect)('/admin/reports'));
            let { month: L, professionalId: M, compare: N } = await a,
                O = 'prev_year' === N ? 'prev_year' : 'prev_month',
                P = L ? (0, m.parse)(L, 'yyyy-MM', new Date()) : new Date(),
                Q =
                    'prev_year' === O
                        ? (0, o.subYears)(P, 1)
                        : (0, n.subMonths)(P, 1),
                R = w(P),
                S = x(P),
                T = w(Q),
                U = x(Q),
                V = (0, p.format)(P, "MMMM 'de' yyyy", { locale: q.ptBR }),
                W = [],
                X = null;
            if (v?.canSeeAllUnits)
                W = await d.prisma.unit.findMany({
                    where: { companyId: G, isActive: !0 },
                    select: { id: !0, name: !0 },
                    orderBy: { name: 'asc' },
                });
            else if (v?.unitId) {
                let a = await d.prisma.unit.findFirst({
                    where: { id: v.unitId, companyId: G },
                    select: { name: !0 },
                });
                X = a?.name ?? null;
            }
            let Y = !!v?.canSeeAllUnits && W.length > 1,
                Z = v?.canSeeAllUnits && 1 === W.length ? W[0]?.name : null,
                $ = v?.canSeeAllUnits ? (Z ?? 'Todas as unidades') : (X ?? ''),
                _ = K
                    ? await d.prisma.professional.findMany({
                          where: {
                              companyId: G,
                              isActive: !0,
                              units: { some: { unitId: K, isActive: !0 } },
                          },
                          select: { id: !0, name: !0 },
                          orderBy: { name: 'asc' },
                      })
                    : await d.prisma.professional.findMany({
                          where: { companyId: G, isActive: !0 },
                          select: { id: !0, name: !0 },
                          orderBy: { name: 'asc' },
                      }),
                aa = M && _.some((a) => a.id === M) ? M : null,
                ab = aa ? _.find((a) => a.id === aa)?.name : null,
                ac = {
                    companyId: G,
                    scheduleAt: { gte: R, lte: S },
                    ...z(K),
                    ...(aa ? { professionalId: aa } : {}),
                },
                ad = {
                    companyId: G,
                    scheduleAt: { gte: T, lte: U },
                    ...z(K),
                    ...(aa ? { professionalId: aa } : {}),
                },
                ae = { companyId: G, scheduleAt: { gte: R, lte: S }, ...z(K) },
                af = 'PENDING',
                ag = 'DONE',
                ah = 'CANCELED',
                ai = new Date(),
                [aj, ak, al, am, an, ao, ap, aq, ar, as, at, au, av] =
                    await Promise.all([
                        d.prisma.appointment.count({ where: ac }),
                        d.prisma.appointment.count({
                            where: { ...ac, status: af },
                        }),
                        d.prisma.appointment.count({
                            where: { ...ac, status: ag },
                        }),
                        d.prisma.appointment.count({
                            where: { ...ac, status: ah },
                        }),
                        d.prisma.appointment.count({ where: ad }),
                        d.prisma.appointment.count({
                            where: { ...ad, status: af },
                        }),
                        d.prisma.appointment.count({
                            where: { ...ad, status: ag },
                        }),
                        d.prisma.appointment.count({
                            where: { ...ad, status: ah },
                        }),
                        d.prisma.appointment.count({
                            where: {
                                ...ac,
                                status: af,
                                scheduleAt: { gte: ai, lte: S },
                            },
                        }),
                        d.prisma.appointment.count({
                            where: {
                                ...ac,
                                status: af,
                                scheduleAt: { gte: R, lt: ai },
                            },
                        }),
                        d.prisma.appointment.findMany({
                            where: { ...ac, status: ah },
                            select: { createdAt: !0, scheduleAt: !0 },
                        }),
                        d.prisma.appointment.findMany({
                            where: { ...ac },
                            select: { createdAt: !0, scheduleAt: !0 },
                        }),
                        d.prisma.appointment.groupBy({
                            by: ['professionalId', 'status'],
                            where: ae,
                            _count: { _all: !0 },
                        }),
                    ]),
                aw = C(al, aj),
                ax = C(am, aj),
                ay = C(ak, aj),
                az = C(ap, an),
                aA = C(aq, an),
                aB = C(ao, an),
                aC = aw - az,
                aD = ax - aA,
                aE = ay - aB,
                aF = C(ar, aj),
                aG = C(as, aj),
                aH = au
                    .map(
                        (a) =>
                            (a.scheduleAt.getTime() - a.createdAt.getTime()) /
                            864e5
                    )
                    .filter((a) => Number.isFinite(a)),
                aI =
                    aH.length > 0
                        ? aH.reduce((a, b) => a + b, 0) / aH.length
                        : NaN,
                aJ = at
                    .map(
                        (a) =>
                            (a.scheduleAt.getTime() - a.createdAt.getTime()) /
                            864e5
                    )
                    .filter((a) => Number.isFinite(a)),
                aK =
                    aJ.length > 0
                        ? aJ.reduce((a, b) => a + b, 0) / aJ.length
                        : NaN,
                aL = [
                    {
                        key: 'created',
                        title: 'Agendamentos criados',
                        value: aj,
                    },
                    {
                        key: 'done',
                        title: 'Atendimentos realizados',
                        value: al,
                    },
                    {
                        key: 'not_done',
                        title: 'Não realizados (pendentes + cancelados)',
                        value: Math.max(0, aj - al),
                    },
                ],
                aM = aL.map((a, b) => {
                    let c = 0 === b ? null : (aL[b - 1]?.value ?? 0),
                        d = 0 === b ? NaN : C(a.value, c ?? 0),
                        e =
                            0 === b
                                ? NaN
                                : C(Math.max(0, (c ?? 0) - a.value), c ?? 0);
                    return { ...a, idx: b, conv: d, drop: e };
                }),
                aN = new Map(_.map((a) => [a.id, a.name])),
                aO = new Map();
            for (let a of av) {
                let b = a.professionalId;
                if (!b) continue;
                let c = aO.get(b) ?? {
                        created: 0,
                        done: 0,
                        canceled: 0,
                        pending: 0,
                    },
                    d = a._count?._all ?? 0;
                ((c.created += d),
                    a.status === ag && (c.done += d),
                    a.status === ah && (c.canceled += d),
                    a.status === af && (c.pending += d),
                    aO.set(b, c));
            }
            let aP =
                    (await d.prisma.appointment.findMany({
                        where: {
                            ...ae,
                            status: af,
                            scheduleAt: { gte: R, lt: ai },
                            professionalId: { not: null },
                        },
                        select: { professionalId: !0 },
                    })) ?? [],
                aQ = new Map();
            for (let a of aP)
                a.professionalId &&
                    aQ.set(
                        a.professionalId,
                        (aQ.get(a.professionalId) ?? 0) + 1
                    );
            let aR = [];
            if (aa) {
                let a = aO.get(aa) ?? {
                        created: 0,
                        done: 0,
                        canceled: 0,
                        pending: 0,
                    },
                    b = a.created,
                    c = a.done,
                    d = a.canceled,
                    e = a.pending;
                aR = [
                    {
                        professionalId: aa,
                        professionalName: aN.get(aa) ?? '—',
                        created: b,
                        done: c,
                        canceled: d,
                        pending: e,
                        pendingOverdue: aQ.get(aa) ?? 0,
                        donePct: C(c, b),
                        cancelPct: C(d, b),
                    },
                ];
            } else
                (aR = _.map((a) => {
                    let b = aO.get(a.id) ?? {
                            created: 0,
                            done: 0,
                            canceled: 0,
                            pending: 0,
                        },
                        c = b.created,
                        d = b.done,
                        e = b.canceled,
                        f = b.pending;
                    return {
                        professionalId: a.id,
                        professionalName: a.name,
                        created: c,
                        done: d,
                        canceled: e,
                        pending: f,
                        pendingOverdue: aQ.get(a.id) ?? 0,
                        donePct: C(d, c),
                        cancelPct: C(e, c),
                    };
                })).sort((a, b) => {
                    let c = a.created > 0;
                    if (c !== b.created > 0) return c ? -1 : 1;
                    let d = Number.isFinite(a.donePct) ? a.donePct : 999999,
                        e = Number.isFinite(b.donePct) ? b.donePct : 999999;
                    return d !== e
                        ? d - e
                        : (b.pendingOverdue ?? 0) - (a.pendingOverdue ?? 0);
                });
            let aS = [];
            if (0 === aj) aS.push('Sem agendamentos no período selecionado.');
            else if (
                (as > 0 &&
                    aS.push(
                        `${as} agendamento(s) pendente(s) j\xe1 passaram do hor\xe1rio (prov\xe1vel “falta de baixa”).`
                    ),
                Number.isFinite(aG) &&
                    aG >= 10 &&
                    aS.push(
                        `Pendentes vencidos representam ${B(aG)} do total criado. Isso costuma ser processo (n\xe3o \xe9 s\xf3 demanda).`
                    ),
                Number.isFinite(ax) &&
                    ax >= 15 &&
                    aS.push(
                        `Cancelamento alto (${B(ax)}). Vale revisar pol\xedtica, comunica\xe7\xe3o e lembretes.`
                    ),
                Number.isFinite(aw) &&
                    aw < 60 &&
                    aj >= 20 &&
                    aS.push(
                        `A taxa de atendimentos realizados est\xe1 em ${B(aw)}. Bom alvo: subir isso antes de investir em mais tr\xe1fego.`
                    ),
                aH.length > 0 &&
                    Number.isFinite(aI) &&
                    aS.push(
                        `Em m\xe9dia, os clientes agendam com ${E(aI)} de anteced\xeancia.`
                    ),
                aJ.length > 0 &&
                    Number.isFinite(aK) &&
                    aS.push(
                        `Nos cancelamentos, a anteced\xeancia m\xe9dia (cria\xe7\xe3o → data agendada) \xe9 ${E(aK)}.`
                    ),
                !aa && aR.length > 0)
            ) {
                let a = aR.find((a) => a.created > 0) ?? null;
                a &&
                    aS.push(
                        `Ponto de aten\xe7\xe3o: ${a.professionalName} tem ${B(a.donePct)} de atendimentos realizados no m\xeas (entre os profissionais com agendamentos).`
                    );
            }
            let aT = aS.slice(0, 5);
            return (0, b.jsxs)('div', {
                className: 'space-y-6 max-w-7xl',
                children: [
                    (0, b.jsxs)('header', {
                        className: 'space-y-3',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'flex items-center justify-between gap-3',
                                children: [
                                    (0, b.jsx)('h1', {
                                        className:
                                            'text-title text-content-primary',
                                        children: 'Funil de agendamento',
                                    }),
                                    (0, b.jsx)(k.Button, {
                                        variant: 'outline',
                                        asChild: !0,
                                        children: (0, b.jsx)(c.default, {
                                            href: '/admin/report',
                                            children: 'Voltar',
                                        }),
                                    }),
                                ],
                            }),
                            (0, b.jsx)('div', {
                                className: (0, l.cn)(
                                    'rounded-xl border border-border-primary bg-background-tertiary p-3'
                                ),
                                children: (0, b.jsxs)('div', {
                                    className:
                                        'grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end',
                                    children: [
                                        (0, b.jsx)('div', {
                                            className:
                                                'w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2',
                                            children: Y
                                                ? (0, b.jsx)(i.UnitFilter, {
                                                      units: W,
                                                      value: J,
                                                  })
                                                : (0, b.jsxs)('div', {
                                                      className: 'space-y-2',
                                                      children: [
                                                          (0, b.jsx)('p', {
                                                              className:
                                                                  'text-label-small text-content-secondary',
                                                              children:
                                                                  'Unidade',
                                                          }),
                                                          (0, b.jsx)('div', {
                                                              className: (0,
                                                              l.cn)(
                                                                  'h-12 w-full rounded-md border border-border-primary',
                                                                  'bg-background-secondary px-3',
                                                                  'flex items-center',
                                                                  'text-content-primary text-sm'
                                                              ),
                                                              title: $,
                                                              children: (0,
                                                              b.jsx)('span', {
                                                                  className:
                                                                      'truncate',
                                                                  children: $,
                                                              }),
                                                          }),
                                                      ],
                                                  }),
                                        }),
                                        (0, b.jsx)('div', {
                                            className:
                                                'w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2',
                                            children: (0, b.jsx)(
                                                h.ProfessionalFilter,
                                                { professionals: _, value: aa }
                                            ),
                                        }),
                                        (0, b.jsx)('div', {
                                            className:
                                                'w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2',
                                            children: (0, b.jsx)(
                                                j.CompareWithFilter,
                                                { value: O }
                                            ),
                                        }),
                                        (0, b.jsx)('div', {
                                            className: 'justify-self-end',
                                            children: (0, b.jsx)(
                                                g.MonthPicker,
                                                {}
                                            ),
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'grid gap-4 md:grid-cols-4',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Agendamentos criados',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-title text-content-primary tabular-nums',
                                        children: aj,
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'mt-1 text-[11px] text-content-tertiary',
                                        children:
                                            'Total do período (inclui pendentes e cancelados)',
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-1 text-[11px] text-content-tertiary',
                                        children: [
                                            'Comparativo: ',
                                            an,
                                            ' (',
                                            ((t = aj - an),
                                            `${t > 0 ? '+' : ''}${t}`),
                                            ')',
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children:
                                            'Taxa de atendimento realizado',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-title text-content-primary tabular-nums',
                                        children: B(aw),
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-1 text-[11px] text-content-tertiary',
                                        children: [
                                            'Realizados:',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className:
                                                    'text-content-primary',
                                                children: al,
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-1 text-[11px] text-content-tertiary',
                                        children: [
                                            'vs ',
                                            A(O),
                                            ':',
                                            ' ',
                                            Number.isFinite(aC) ? D(aC) : '—',
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Taxa de cancelamento',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-title text-content-primary tabular-nums',
                                        children: B(ax),
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-1 text-[11px] text-content-tertiary',
                                        children: [
                                            'Cancelados:',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className:
                                                    'text-content-primary',
                                                children: am,
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-1 text-[11px] text-content-tertiary',
                                        children: [
                                            'vs ',
                                            A(O),
                                            ':',
                                            ' ',
                                            Number.isFinite(aD) ? D(aD) : '—',
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children:
                                            'Pendentes (ainda não atendidos)',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-title text-content-primary tabular-nums',
                                        children: B(ay),
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-1 text-[11px] text-content-tertiary',
                                        children: [
                                            'Pendentes:',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className:
                                                    'text-content-primary',
                                                children: ak,
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'mt-1 text-[11px] text-content-tertiary',
                                        children: [
                                            'vs ',
                                            A(O),
                                            ':',
                                            ' ',
                                            Number.isFinite(aE) ? D(aE) : '—',
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className:
                            'rounded-xl border border-border-primary bg-background-tertiary p-4',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'flex items-start justify-between gap-3',
                                children: [
                                    (0, b.jsxs)('div', {
                                        children: [
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-label-large text-content-primary',
                                                children: 'Funil (mês)',
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-paragraph-small text-content-tertiary',
                                                children:
                                                    'A conversão principal é “Agendamentos criados → Atendimentos realizados”. O restante aparece como “não realizados”.',
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'text-[11px] text-content-tertiary text-right',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                children: ['Criados: ', aj],
                                            }),
                                            (0, b.jsxs)('div', {
                                                children: ['Realizados: ', al],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsx)('div', {
                                className: 'mt-4 grid gap-3 lg:grid-cols-3',
                                children: aM.map((a) =>
                                    (0, b.jsx)(
                                        F,
                                        {
                                            index: a.idx,
                                            title: a.title,
                                            value: a.value,
                                            convFromPrevPct: a.conv,
                                            dropFromPrevPct: a.drop,
                                            sub:
                                                'created' === a.key
                                                    ? 'Tudo que entrou na agenda no período.'
                                                    : 'done' === a.key
                                                      ? 'Atendimentos finalizados (viraram receita).'
                                                      : 'O que ficou pelo caminho: pendentes + cancelados.',
                                        },
                                        a.key
                                    )
                                ),
                            }),
                            (0, b.jsx)('div', {
                                className: 'mt-4 overflow-x-auto',
                                children: (0, b.jsxs)('table', {
                                    className:
                                        'min-w-full text-left text-[12px]',
                                    children: [
                                        (0, b.jsx)('thead', {
                                            children: (0, b.jsxs)('tr', {
                                                className:
                                                    'border-b border-border-primary text-content-secondary',
                                                children: [
                                                    (0, b.jsx)('th', {
                                                        className: 'py-2 pr-3',
                                                        children: 'Etapa',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Qtd',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Conversão',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Queda',
                                                    }),
                                                ],
                                            }),
                                        }),
                                        (0, b.jsx)('tbody', {
                                            children: aM.map((a) =>
                                                (0, b.jsxs)(
                                                    'tr',
                                                    {
                                                        className:
                                                            'border-b border-border-primary/60 last:border-0',
                                                        children: [
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary font-medium',
                                                                children:
                                                                    a.title,
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children:
                                                                    a.value,
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children:
                                                                    0 === a.idx
                                                                        ? '—'
                                                                        : B(
                                                                              a.conv
                                                                          ),
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children:
                                                                    0 === a.idx
                                                                        ? '—'
                                                                        : B(
                                                                              a.drop
                                                                          ),
                                                            }),
                                                        ],
                                                    },
                                                    `row-${a.key}`
                                                )
                                            ),
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'grid gap-4 lg:grid-cols-2',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-large text-content-primary',
                                        children:
                                            'Pendentes: futuros vs vencidos',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-paragraph-small text-content-tertiary',
                                        children:
                                            'Se “vencidos” estiver alto, geralmente é falta de baixa (atendimento aconteceu mas ficou pendente).',
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'mt-4 grid gap-3 sm:grid-cols-2',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                className:
                                                    'rounded-xl border border-border-primary bg-background-secondary px-4 py-3',
                                                children: [
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children:
                                                            'Agendados no futuro',
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-title text-content-primary tabular-nums',
                                                        children: ar,
                                                    }),
                                                    (0, b.jsxs)('p', {
                                                        className:
                                                            'mt-1 text-[11px] text-content-tertiary',
                                                        children: [
                                                            B(aF),
                                                            ' do total criado',
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className:
                                                    'rounded-xl border border-border-primary bg-background-secondary px-4 py-3',
                                                children: [
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children:
                                                            'Pendentes vencidos',
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-title text-content-primary tabular-nums',
                                                        children: as,
                                                    }),
                                                    (0, b.jsxs)('p', {
                                                        className:
                                                            'mt-1 text-[11px] text-content-tertiary',
                                                        children: [
                                                            B(aG),
                                                            ' do total criado',
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsx)('div', {
                                        className: 'mt-4 overflow-x-auto',
                                        children: (0, b.jsxs)('table', {
                                            className:
                                                'min-w-full text-left text-[12px]',
                                            children: [
                                                (0, b.jsx)('thead', {
                                                    children: (0, b.jsxs)(
                                                        'tr',
                                                        {
                                                            className:
                                                                'border-b border-border-primary text-content-secondary',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    'th',
                                                                    {
                                                                        className:
                                                                            'py-2 pr-3',
                                                                        children:
                                                                            'Leitura',
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    'th',
                                                                    {
                                                                        className:
                                                                            'py-2 pr-3 text-right',
                                                                        children:
                                                                            'Qtd',
                                                                    }
                                                                ),
                                                            ],
                                                        }
                                                    ),
                                                }),
                                                (0, b.jsxs)('tbody', {
                                                    children: [
                                                        (0, b.jsxs)('tr', {
                                                            className:
                                                                'border-b border-border-primary/60',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    'td',
                                                                    {
                                                                        className:
                                                                            'py-2 pr-3 text-content-primary font-medium',
                                                                        children:
                                                                            'Pendentes futuros (ok, agenda pra frente)',
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    'td',
                                                                    {
                                                                        className:
                                                                            'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                        children:
                                                                            ar,
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        (0, b.jsxs)('tr', {
                                                            className:
                                                                'border-b border-border-primary/60',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    'td',
                                                                    {
                                                                        className:
                                                                            'py-2 pr-3 text-content-primary font-medium',
                                                                        children:
                                                                            'Pendentes vencidos (provável baixa não feita)',
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    'td',
                                                                    {
                                                                        className:
                                                                            'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                        children:
                                                                            as,
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        (0, b.jsxs)('tr', {
                                                            className:
                                                                'border-t border-border-primary',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    'td',
                                                                    {
                                                                        className:
                                                                            'py-2 pr-3 text-content-primary font-medium',
                                                                        children:
                                                                            'Total pendentes',
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    'td',
                                                                    {
                                                                        className:
                                                                            'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                        children:
                                                                            ak,
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-large text-content-primary',
                                        children:
                                            'Tempo e comportamento (sinal de processo)',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-paragraph-small text-content-tertiary',
                                        children:
                                            'Ajuda a entender com quanta antecedência as pessoas agendam e como os cancelamentos se comportam.',
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'mt-4 grid gap-3 sm:grid-cols-2',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                className:
                                                    'rounded-xl border border-border-primary bg-background-secondary px-4 py-3',
                                                children: [
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children:
                                                            'Antecedência média (criados)',
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-title text-content-primary tabular-nums',
                                                        children: E(aI),
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'mt-1 text-[11px] text-content-tertiary',
                                                        children:
                                                            'Média de dias entre criação e data agendada',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className:
                                                    'rounded-xl border border-border-primary bg-background-secondary px-4 py-3',
                                                children: [
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children:
                                                            'Antecedência média (cancelados)',
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-title text-content-primary tabular-nums',
                                                        children: E(aK),
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'mt-1 text-[11px] text-content-tertiary',
                                                        children:
                                                            'Se for muito alta, o cancelamento pode estar “longe do compromisso”',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: (0, l.cn)(
                                            'mt-4 rounded-lg border border-border-primary bg-background-secondary p-3'
                                        ),
                                        children: [
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-[12px] text-content-primary font-medium',
                                                children: 'Leitura rápida',
                                            }),
                                            (0, b.jsxs)('p', {
                                                className:
                                                    'mt-1 text-[11px] text-content-tertiary',
                                                children: [
                                                    '• Se a antecedência média é alta, dá para trabalhar lembretes e reengajamento.',
                                                    (0, b.jsx)('br', {}),
                                                    '• Se pendentes vencidos são altos, o principal ganho é processo: “dar baixa” no fim do dia.',
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className:
                            'rounded-xl border border-border-primary bg-background-tertiary p-4',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'flex items-start justify-between gap-3',
                                children: [
                                    (0, b.jsxs)('div', {
                                        children: [
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-label-large text-content-primary',
                                                children:
                                                    'Onde está o gargalo (por profissional)',
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-paragraph-small text-content-tertiary',
                                                children:
                                                    'Ordenado por pior taxa de atendimento realizado (e depois por mais pendentes vencidos).',
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'text-[11px] text-content-tertiary text-right',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                children: ['Unidade: ', $],
                                            }),
                                            (0, b.jsxs)('div', {
                                                children: [
                                                    ab
                                                        ? `Filtro: ${ab} • `
                                                        : '',
                                                    'Mês: ',
                                                    V,
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            0 === aR.length
                                ? (0, b.jsx)('div', {
                                      className: (0, l.cn)(
                                          'mt-4 h-32 w-full rounded-lg border border-border-primary',
                                          'bg-background-secondary',
                                          'flex items-center justify-center',
                                          'text-content-tertiary text-sm'
                                      ),
                                      children: 'Sem dados para o período.',
                                  })
                                : (0, b.jsx)('div', {
                                      className: 'mt-4 overflow-x-auto',
                                      children: (0, b.jsxs)('table', {
                                          className:
                                              'min-w-full text-left text-[12px]',
                                          children: [
                                              (0, b.jsx)('thead', {
                                                  children: (0, b.jsxs)('tr', {
                                                      className:
                                                          'border-b border-border-primary text-content-secondary',
                                                      children: [
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3',
                                                              children:
                                                                  'Profissional',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Criados',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Realizados',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  '% realizados',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Cancelados',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  '% cancel.',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Pend. vencidos',
                                                          }),
                                                      ],
                                                  }),
                                              }),
                                              (0, b.jsx)('tbody', {
                                                  children: aR.map((a) =>
                                                      (0, b.jsxs)(
                                                          'tr',
                                                          {
                                                              className:
                                                                  'border-b border-border-primary/60 last:border-0',
                                                              children: [
                                                                  (0, b.jsxs)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary font-medium whitespace-nowrap',
                                                                          children:
                                                                              [
                                                                                  a.professionalName,
                                                                                  aa &&
                                                                                  a.professionalId ===
                                                                                      aa
                                                                                      ? (0,
                                                                                        b.jsx)(
                                                                                            'span',
                                                                                            {
                                                                                                className:
                                                                                                    'ml-2 text-[11px] text-content-tertiary',
                                                                                                children:
                                                                                                    '(selecionado)',
                                                                                            }
                                                                                        )
                                                                                      : null,
                                                                              ],
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              a.created,
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              a.done,
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.donePct
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              a.canceled,
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.cancelPct
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              a.pendingOverdue,
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          a.professionalId
                                                      )
                                                  ),
                                              }),
                                          ],
                                      }),
                                  }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className:
                            'rounded-xl border border-border-primary bg-background-tertiary p-4',
                        children: [
                            (0, b.jsx)('p', {
                                className:
                                    'text-label-large text-content-primary',
                                children: 'Resumo do mês',
                            }),
                            (0, b.jsx)('p', {
                                className:
                                    'text-paragraph-small text-content-tertiary',
                                children:
                                    'Um diagnóstico curto, para bater o olho e saber o que fazer.',
                            }),
                            0 === aT.length
                                ? (0, b.jsx)('div', {
                                      className: (0, l.cn)(
                                          'mt-4 h-24 w-full rounded-lg border border-border-primary',
                                          'bg-background-secondary',
                                          'flex items-center justify-center',
                                          'text-content-tertiary text-sm'
                                      ),
                                      children: 'Sem insights no momento.',
                                  })
                                : (0, b.jsx)('ul', {
                                      className:
                                          'mt-4 space-y-2 text-[12px] text-content-primary',
                                      children: aT.map((a, c) =>
                                          (0, b.jsxs)(
                                              'li',
                                              {
                                                  className: 'flex gap-2',
                                                  children: [
                                                      (0, b.jsx)('span', {
                                                          className:
                                                              'text-content-tertiary',
                                                          children: '•',
                                                      }),
                                                      (0, b.jsx)('span', {
                                                          children: a,
                                                      }),
                                                  ],
                                              },
                                              c
                                          )
                                      ),
                                  }),
                        ],
                    }),
                ],
            });
        }
        a.s([
            'default',
            () => G,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Admin | Relatórios' },
        ]);
    },
];

//# sourceMappingURL=src_app_admin_report_funnel_page_tsx_9a99e708._.js.map
