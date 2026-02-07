module.exports = [
    305405,
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
        let s = 'admin_unit_context';
        function t(a) {
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
        function u(a) {
            let { y: b, m: c } = t(a);
            return new Date(Date.UTC(b, c - 1, 1, 3, 0, 0));
        }
        function v(a) {
            let { y: b, m: c } = t(a);
            return new Date(new Date(Date.UTC(b, c, 1, 3, 0, 0)).getTime() - 1);
        }
        async function w(a) {
            if (!a.canSeeAllUnits) return a.unitId;
            let b = await (0, e.cookies)(),
                c = b.get(s)?.value ?? 'all';
            return c && 'all' !== c ? c : null;
        }
        function x(a) {
            return a ? { unitId: a } : {};
        }
        function y(a) {
            return 'prev_year' === a ? 'ano anterior' : 'mês anterior';
        }
        function z(a, b) {
            return Number.isFinite(a) && Number.isFinite(b) && !(b <= 0)
                ? a / b
                : NaN;
        }
        function A(a, b) {
            let c = z(a, b);
            return Number.isFinite(c) ? 100 * c : NaN;
        }
        function B(a) {
            return Number.isFinite(a)
                ? new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(a)
                : '—';
        }
        function C(a) {
            if (!Number.isFinite(a)) return '—';
            let b = a > 0 ? '+' : '';
            return `${b}${B(a)}`;
        }
        function D(a) {
            return Number.isFinite(a)
                ? `${a > 0 ? '+' : ''}${Math.round(a)}%`
                : '—';
        }
        function E(a) {
            if (null == a) return NaN;
            if ('number' == typeof a) return a;
            if ('string' == typeof a) {
                let b = Number(a.replace(',', '.'));
                return Number.isFinite(b) ? b : NaN;
            }
            if ('object' == typeof a) {
                if ('function' == typeof a.toNumber) {
                    let b = a.toNumber();
                    return Number.isFinite(b) ? b : NaN;
                }
                if ('function' == typeof a.toString) {
                    let b = Number(String(a.toString()).replace(',', '.'));
                    return Number.isFinite(b) ? b : NaN;
                }
            }
            return NaN;
        }
        function F(a) {
            let { y: b, m: c } = t(a);
            return `${b}-${String(c).padStart(2, '0')}`;
        }
        function G(a) {
            let b = E(a.servicePriceAtTheTime);
            if (Number.isFinite(b) && b > 0) return b;
            let c =
                a.order?.status === 'COMPLETED' ? E(a.order?.totalAmount) : NaN;
            if (Number.isFinite(c) && c > 0) return c;
            let d = E(a.service?.price);
            return Number.isFinite(d) && d > 0 ? d : 0;
        }
        function H(a) {
            let b = E(a.professionalEarningValue);
            if (Number.isFinite(b) && b > 0) return b;
            let c = E(a.servicePriceAtTheTime),
                d = E(a.professionalPercentageAtTheTime);
            if (Number.isFinite(c) && c > 0 && Number.isFinite(d) && d >= 0)
                return (c * d) / 100;
            let e = E(a.service?.price),
                f = E(a.service?.professionalPercentage);
            return Number.isFinite(e) && e > 0 && Number.isFinite(f) && f >= 0
                ? (e * f) / 100
                : 0;
        }
        function I(a, b) {
            let c = E(a),
                d = E(b);
            return !Number.isFinite(c) || c <= 0 || !Number.isFinite(d) || d < 0
                ? 0
                : (c * d) / 100;
        }
        function J(a) {
            return (0, b.jsxs)('div', {
                className:
                    'rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                children: [
                    (0, b.jsx)('p', {
                        className: 'text-label-small text-content-secondary',
                        children: a.title,
                    }),
                    (0, b.jsx)('p', {
                        className:
                            'text-title text-content-primary tabular-nums',
                        children: a.value,
                    }),
                    a.sub
                        ? (0, b.jsx)('p', {
                              className:
                                  'mt-1 text-[11px] text-content-tertiary',
                              children: a.sub,
                          })
                        : null,
                ],
            });
        }
        async function K({ searchParams: a }) {
            var t;
            let K = await (0, f.requireAdminForModule)('REPORTS'),
                L = String(K.companyId);
            if (!K?.canSeeAllUnits && !K?.unitId)
                throw Error(
                    'Admin de unidade sem unitId definido. Vincule este admin a uma unidade.'
                );
            let M = await (0, e.cookies)(),
                N = M.get(s)?.value ?? 'all',
                O = K?.canSeeAllUnits ? N : (K?.unitId ?? ''),
                P = await w({
                    unitId: K?.unitId ?? null,
                    canSeeAllUnits: !!K?.canSeeAllUnits,
                });
            P &&
                ((await d.prisma.unit.findFirst({
                    where: { id: P, companyId: L, isActive: !0 },
                    select: { id: !0 },
                })) ||
                    (0, r.redirect)('/admin/dashboard'));
            let { month: Q, professionalId: R, compare: S } = await a,
                T = 'prev_year' === S ? 'prev_year' : 'prev_month',
                U = Q ? (0, m.parse)(Q, 'yyyy-MM', new Date()) : new Date(),
                V =
                    'prev_year' === T
                        ? (0, o.subYears)(U, 1)
                        : (0, n.subMonths)(U, 1),
                W = u(U),
                X = v(U),
                Y = u(V),
                Z = v(V),
                $ = (0, p.format)(U, "MMMM 'de' yyyy", { locale: q.ptBR }),
                _ = [],
                aa = null;
            if (K?.canSeeAllUnits)
                _ = await d.prisma.unit.findMany({
                    where: { companyId: L, isActive: !0 },
                    select: { id: !0, name: !0 },
                    orderBy: { name: 'asc' },
                });
            else if (K?.unitId) {
                let a = await d.prisma.unit.findFirst({
                    where: { id: K.unitId, companyId: L },
                    select: { name: !0 },
                });
                aa = a?.name ?? null;
            }
            let ab = !!K?.canSeeAllUnits && _.length > 1,
                ac = K?.canSeeAllUnits && 1 === _.length ? _[0]?.name : null,
                ad = K?.canSeeAllUnits
                    ? (ac ?? 'Todas as unidades')
                    : (aa ?? ''),
                ae = P
                    ? await d.prisma.professional.findMany({
                          where: {
                              companyId: L,
                              isActive: !0,
                              units: { some: { unitId: P, isActive: !0 } },
                          },
                          select: { id: !0, name: !0 },
                          orderBy: { name: 'asc' },
                      })
                    : await d.prisma.professional.findMany({
                          where: { companyId: L, isActive: !0 },
                          select: { id: !0, name: !0 },
                          orderBy: { name: 'asc' },
                      }),
                af = R && ae.some((a) => a.id === R) ? R : null,
                ag = af ? ae.find((a) => a.id === af)?.name : null,
                ah = 'DONE',
                ai = 'COMPLETED',
                aj = {
                    companyId: L,
                    scheduleAt: { gte: W, lte: X },
                    status: ah,
                    ...x(P),
                    ...(af ? { professioanlId: af } : {}),
                },
                ak = {
                    companyId: L,
                    scheduleAt: { gte: Y, lte: Z },
                    status: ah,
                    ...x(P),
                    ...(af ? { professionalId: af } : {}),
                },
                al = {
                    companyId: L,
                    createdAt: { gte: W, lte: X },
                    status: ai,
                    appointmentId: null,
                    ...x(P),
                    ...(af ? { professionalId: af } : {}),
                },
                am = {
                    companyId: L,
                    createdAt: { gte: Y, lte: Z },
                    status: ai,
                    appointmentId: null,
                    ...x(P),
                    ...(af ? { professionalId: af } : {}),
                },
                an = {
                    companyId: L,
                    soldAt: { gte: W, lte: X },
                    ...x(P),
                    ...(af ? { professionalId: af } : {}),
                },
                ao = {
                    companyId: L,
                    soldAt: { gte: Y, lte: Z },
                    ...x(P),
                    ...(af ? { professionalId: af } : {}),
                },
                [ap, aq, ar, as, at, au] = await Promise.all([
                    d.prisma.appointment.findMany({
                        where: aj,
                        select: {
                            id: !0,
                            unitId: !0,
                            professionalId: !0,
                            scheduleAt: !0,
                            servicePriceAtTheTime: !0,
                            professionalPercentageAtTheTime: !0,
                            professionalEarningValue: !0,
                            service: {
                                select: {
                                    name: !0,
                                    price: !0,
                                    professionalPercentage: !0,
                                },
                            },
                            order: { select: { status: !0, totalAmount: !0 } },
                        },
                        orderBy: { scheduleAt: 'asc' },
                    }),
                    d.prisma.appointment.findMany({
                        where: ak,
                        select: {
                            id: !0,
                            unitId: !0,
                            professionalId: !0,
                            scheduleAt: !0,
                            servicePriceAtTheTime: !0,
                            professionalPercentageAtTheTime: !0,
                            professionalEarningValue: !0,
                            service: {
                                select: {
                                    name: !0,
                                    price: !0,
                                    professionalPercentage: !0,
                                },
                            },
                            order: { select: { status: !0, totalAmount: !0 } },
                        },
                        orderBy: { scheduleAt: 'asc' },
                    }),
                    d.prisma.order.findMany({
                        where: al,
                        select: {
                            id: !0,
                            totalAmount: !0,
                            unitId: !0,
                            professionalId: !0,
                            createdAt: !0,
                        },
                        orderBy: { createdAt: 'asc' },
                    }),
                    d.prisma.order.findMany({
                        where: am,
                        select: {
                            id: !0,
                            totalAmount: !0,
                            unitId: !0,
                            professionalId: !0,
                            createdAt: !0,
                        },
                        orderBy: { createdAt: 'asc' },
                    }),
                    d.prisma.productSale.findMany({
                        where: an,
                        select: {
                            id: !0,
                            unitId: !0,
                            professionalId: !0,
                            soldAt: !0,
                            totalPrice: !0,
                            product: {
                                select: {
                                    name: !0,
                                    professionalPercentage: !0,
                                },
                            },
                        },
                        orderBy: { soldAt: 'asc' },
                    }),
                    d.prisma.productSale.findMany({
                        where: ao,
                        select: {
                            id: !0,
                            unitId: !0,
                            professionalId: !0,
                            soldAt: !0,
                            totalPrice: !0,
                            product: {
                                select: {
                                    name: !0,
                                    professionalPercentage: !0,
                                },
                            },
                        },
                        orderBy: { soldAt: 'asc' },
                    }),
                ]),
                av = ap.map((a) => G(a)).reduce((a, b) => a + b, 0),
                aw = aq.map((a) => G(a)).reduce((a, b) => a + b, 0),
                ax = ar
                    .map((a) => E(a.totalAmount))
                    .map((a) => (Number.isFinite(a) ? a : 0))
                    .reduce((a, b) => a + b, 0),
                ay = as
                    .map((a) => E(a.totalAmount))
                    .map((a) => (Number.isFinite(a) ? a : 0))
                    .reduce((a, b) => a + b, 0),
                az = ap.length,
                aA = aq.length,
                aB = z(av, az),
                aC = z(aw, aA),
                aD = av + ax,
                aE = aw + ay,
                aF = aD - aE,
                aG = A(aF, aE),
                aH = aB - aC,
                aI = A(aH, aC),
                aJ = ax - ay,
                aK = A(aJ, ay),
                aL = ap.map((a) => H(a)).reduce((a, b) => a + b, 0),
                aM = aq.map((a) => H(a)).reduce((a, b) => a + b, 0),
                aN = at
                    .map((a) =>
                        I(a.totalPrice, a.product?.professionalPercentage)
                    )
                    .reduce((a, b) => a + b, 0),
                aO = au
                    .map((a) =>
                        I(a.totalPrice, a.product?.professionalPercentage)
                    )
                    .reduce((a, b) => a + b, 0),
                aP = aL + aN,
                aQ = aM + aO,
                aR = aP - aQ,
                aS = A(aR, aQ),
                aT = aD - aP,
                aU = aE - aQ,
                aV = aT - aU,
                aW = A(aV, aU),
                aX = A(aP, aD),
                aY = aX - A(aQ, aE),
                aZ = new Map(ae.map((a) => [a.id, a.name])),
                a$ = new Map();
            for (let a of ap) {
                let b = a.professionalId ?? 'unknown',
                    c = a$.get(b) ?? {
                        serviceRevenue: 0,
                        doneCount: 0,
                        serviceCommission: 0,
                        productRevenue: 0,
                        productCommission: 0,
                    };
                ((c.serviceRevenue += G(a)),
                    (c.serviceCommission += H(a)),
                    (c.doneCount += 1),
                    a$.set(b, c));
            }
            for (let a of at) {
                let b = a.professionalId ?? 'unknown',
                    c = a$.get(b) ?? {
                        serviceRevenue: 0,
                        doneCount: 0,
                        serviceCommission: 0,
                        productRevenue: 0,
                        productCommission: 0,
                    },
                    d = E(a.totalPrice);
                ((c.productRevenue += Number.isFinite(d) ? d : 0),
                    (c.productCommission += I(
                        a.totalPrice,
                        a.product?.professionalPercentage
                    )),
                    a$.set(b, c));
            }
            let a_ = Array.from(a$.entries()).map(([a, b]) => {
                let c = b.serviceRevenue + b.productRevenue,
                    d = b.serviceCommission + b.productCommission;
                return {
                    professionalId: a,
                    professionalName:
                        'unknown' === a ? '—' : (aZ.get(a) ?? '—'),
                    serviceRevenue: b.serviceRevenue,
                    productRevenue: b.productRevenue,
                    totalRevenue: c,
                    serviceCommission: b.serviceCommission,
                    productCommission: b.productCommission,
                    totalCommission: d,
                    grossProfit: c - d,
                    doneCount: b.doneCount,
                    ticket: z(b.serviceRevenue, b.doneCount),
                };
            });
            a_.sort((a, b) => b.totalRevenue - a.totalRevenue);
            let a0 = new Map();
            for (let a of ap) {
                let b = a.service?.name?.trim() || '(serviço não informado)',
                    c = a0.get(b) ?? { revenue: 0, count: 0, commission: 0 };
                ((c.revenue += G(a)),
                    (c.commission += H(a)),
                    (c.count += 1),
                    a0.set(b, c));
            }
            let a1 = Array.from(a0.entries())
                    .map(([a, b]) => ({
                        service: a,
                        revenue: b.revenue,
                        count: b.count,
                        ticket: z(b.revenue, b.count),
                        commission: b.commission,
                    }))
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 12),
                a2 = new Map();
            for (let a of at) {
                let b = a.product?.name?.trim() || '(produto)',
                    c = a2.get(b) ?? {
                        revenue: 0,
                        commission: 0,
                        salesCount: 0,
                    },
                    d = E(a.totalPrice);
                ((c.revenue += Number.isFinite(d) ? d : 0),
                    (c.commission += I(
                        a.totalPrice,
                        a.product?.professionalPercentage
                    )),
                    (c.salesCount += 1),
                    a2.set(b, c));
            }
            Array.from(a2.entries())
                .map(([a, b]) => ({
                    product: a,
                    revenue: b.revenue,
                    commission: b.commission,
                    salesCount: b.salesCount,
                }))
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 12);
            let a3 = u((0, n.subMonths)(U, 5)),
                a4 = {
                    companyId: L,
                    scheduleAt: { gte: a3, lte: X },
                    status: ah,
                    ...x(P),
                    ...(af ? { professionalId: af } : {}),
                },
                a5 = {
                    companyId: L,
                    createdAt: { gte: a3, lte: X },
                    status: ai,
                    appointmentId: null,
                    ...x(P),
                    ...(af ? { professionalId: af } : {}),
                },
                a6 = {
                    companyId: L,
                    soldAt: { gte: a3, lte: X },
                    ...x(P),
                    ...(af ? { professionalId: af } : {}),
                },
                [a7, a8, a9] = await Promise.all([
                    d.prisma.appointment.findMany({
                        where: a4,
                        select: {
                            scheduleAt: !0,
                            servicePriceAtTheTime: !0,
                            professionalPercentageAtTheTime: !0,
                            professionalEarningValue: !0,
                            service: {
                                select: {
                                    name: !0,
                                    price: !0,
                                    professionalPercentage: !0,
                                },
                            },
                            order: { select: { status: !0, totalAmount: !0 } },
                        },
                        orderBy: { scheduleAt: 'asc' },
                    }),
                    d.prisma.order.findMany({
                        where: a5,
                        select: { createdAt: !0, totalAmount: !0 },
                        orderBy: { createdAt: 'asc' },
                    }),
                    d.prisma.productSale.findMany({
                        where: a6,
                        select: {
                            soldAt: !0,
                            totalPrice: !0,
                            product: { select: { professionalPercentage: !0 } },
                        },
                        orderBy: { soldAt: 'asc' },
                    }),
                ]),
                ba = new Map();
            for (let a of a7) {
                let b = F(a.scheduleAt),
                    c = ba.get(b) ?? {
                        serviceRevenue: 0,
                        doneCount: 0,
                        standaloneRevenue: 0,
                        serviceCommission: 0,
                        productCommission: 0,
                    };
                ((c.serviceRevenue += G(a)),
                    (c.serviceCommission += H(a)),
                    (c.doneCount += 1),
                    ba.set(b, c));
            }
            for (let a of a8) {
                let b = F(a.createdAt),
                    c = ba.get(b) ?? {
                        serviceRevenue: 0,
                        doneCount: 0,
                        standaloneRevenue: 0,
                        serviceCommission: 0,
                        productCommission: 0,
                    },
                    d = E(a.totalAmount);
                ((c.standaloneRevenue += Number.isFinite(d) ? d : 0),
                    ba.set(b, c));
            }
            for (let a of a9) {
                let b = F(a.soldAt),
                    c = ba.get(b) ?? {
                        serviceRevenue: 0,
                        doneCount: 0,
                        standaloneRevenue: 0,
                        serviceCommission: 0,
                        productCommission: 0,
                    };
                ((c.productCommission += I(
                    a.totalPrice,
                    a.product?.professionalPercentage
                )),
                    ba.set(b, c));
            }
            let bb = [];
            for (let a = 5; a >= 0; a--) {
                let b = (0, n.subMonths)(U, a),
                    c = (0, p.format)(b, 'yyyy-MM'),
                    d = (0, p.format)(b, 'MMM/yy', { locale: q.ptBR }),
                    e = ba.get(c) ?? {
                        serviceRevenue: 0,
                        doneCount: 0,
                        standaloneRevenue: 0,
                        serviceCommission: 0,
                        productCommission: 0,
                    },
                    f = e.serviceRevenue + e.standaloneRevenue,
                    g = e.serviceCommission + e.productCommission,
                    h = f - g;
                bb.push({
                    key: c,
                    label: d,
                    totalRevenue: f,
                    serviceRevenue: e.serviceRevenue,
                    standaloneRevenue: e.standaloneRevenue,
                    doneCount: e.doneCount,
                    ticket: z(e.serviceRevenue, e.doneCount),
                    totalCommission: g,
                    grossProfit: h,
                });
            }
            let bc = [];
            if (0 === az && 0 === ax)
                bc.push('Sem receita no período selecionado.');
            else {
                let a = az - aA;
                if (
                    (aF > 0
                        ? a > 0 && aH > 0
                            ? bc.push(
                                  'Você cresceu pelos dois lados: mais atendimentos e ticket médio maior.'
                              )
                            : a > 0
                              ? bc.push(
                                    'Crescimento puxado por volume: mais atendimentos feitos.'
                                )
                              : aH > 0
                                ? bc.push(
                                      'Crescimento puxado por venda melhor: ticket médio subiu.'
                                  )
                                : bc.push(
                                      'Faturamento subiu. Veja se veio mais de produtos.'
                                  )
                        : aF < 0 &&
                          bc.push(
                              'Queda no faturamento. Olhe volume (atendimentos) e ticket para achar o motivo.'
                          ),
                    ax > 0 && bc.push(`Vendas avulsas no m\xeas: ${B(ax)}.`),
                    Number.isFinite(aX))
                ) {
                    let a = A(aT, aD);
                    bc.push(
                        `Comiss\xe3o ~${Math.round(aX)}% da receita (margem bruta simples ~${Math.round(a)}%).`
                    );
                }
                if (
                    (a1.length > 0 &&
                        bc.push(
                            `Servi\xe7o l\xedder em receita: ${a1[0].service}.`
                        ),
                    !af && a_.length > 0)
                ) {
                    let a = a_[0];
                    bc.push(
                        `Top do m\xeas: ${a.professionalName} (${B(a.totalRevenue)}).`
                    );
                }
            }
            let bd = bc.slice(0, 5);
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
                                        children:
                                            'Faturamento, Ticket & Comissão',
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
                            (0, b.jsxs)('div', {
                                className: (0, l.cn)(
                                    'rounded-xl border border-border-primary bg-background-tertiary p-3'
                                ),
                                children: [
                                    (0, b.jsxs)('div', {
                                        className:
                                            'grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end',
                                        children: [
                                            (0, b.jsx)('div', {
                                                className:
                                                    'w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2',
                                                children: ab
                                                    ? (0, b.jsx)(i.UnitFilter, {
                                                          units: _,
                                                          value: O,
                                                      })
                                                    : (0, b.jsxs)('div', {
                                                          className:
                                                              'space-y-2',
                                                          children: [
                                                              (0, b.jsx)('p', {
                                                                  className:
                                                                      'text-label-small text-content-secondary',
                                                                  children:
                                                                      'Unidade',
                                                              }),
                                                              (0, b.jsx)(
                                                                  'div',
                                                                  {
                                                                      className:
                                                                          (0,
                                                                          l.cn)(
                                                                              'h-12 w-full rounded-md border border-border-primary',
                                                                              'bg-background-secondary px-3',
                                                                              'flex items-center',
                                                                              'text-content-primary text-sm'
                                                                          ),
                                                                      title: ad,
                                                                      children:
                                                                          (0,
                                                                          b.jsx)(
                                                                              'span',
                                                                              {
                                                                                  className:
                                                                                      'truncate',
                                                                                  children:
                                                                                      ad,
                                                                              }
                                                                          ),
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                            }),
                                            (0, b.jsx)('div', {
                                                className:
                                                    'w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2',
                                                children: (0, b.jsx)(
                                                    h.ProfessionalFilter,
                                                    {
                                                        professionals: ae,
                                                        value: af,
                                                    }
                                                ),
                                            }),
                                            (0, b.jsx)('div', {
                                                className:
                                                    'w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2',
                                                children: (0, b.jsx)(
                                                    j.CompareWithFilter,
                                                    { value: T }
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
                                    (0, b.jsxs)('div', {
                                        className:
                                            'mt-3 text-[11px] text-content-tertiary',
                                        children: [
                                            'Escopo:',
                                            ' ',
                                            (0, b.jsxs)('span', {
                                                className:
                                                    'text-content-primary',
                                                children: [
                                                    ad,
                                                    ag ? ` • ${ag}` : '',
                                                    ` • ${$}`,
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'grid gap-4 md:grid-cols-4',
                        children: [
                            (0, b.jsx)(J, {
                                title: 'Faturamento total',
                                value: B(aD),
                                sub: `vs ${y(T)}: ${B(aE)} (${C(aF)} | ${D(aG)})`,
                            }),
                            (0, b.jsx)(J, {
                                title: 'Ticket médio (atendimento)',
                                value: B(aB),
                                sub: `vs ${y(T)}: ${B(aC)} (${C(aH)} | ${D(aI)})`,
                            }),
                            (0, b.jsx)(J, {
                                title: 'Comissão total',
                                value: B(aP),
                                sub: `vs ${y(T)}: ${B(aQ)} (${C(aR)} | ${D(aS)})`,
                            }),
                            (0, b.jsx)(J, {
                                title: 'Margem bruta (simples)',
                                value: B(aT),
                                sub: `vs ${y(T)}: ${B(aU)} (${C(aV)} | ${D(aW)}) • Comiss\xe3o: ${Number.isFinite(aX) ? `${Math.round(aX)}%` : '—'}${Number.isFinite(aY) ? ` (${aY > 0 ? '+' : ''}${Math.round(aY)} p.p.)` : ''}`,
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'grid gap-4 md:grid-cols-3',
                        children: [
                            (0, b.jsx)(J, {
                                title: 'Receita de serviços',
                                value: B(av),
                                sub: `Comiss\xe3o servi\xe7os: ${B(aL)}`,
                            }),
                            (0, b.jsx)(J, {
                                title: 'Vendas avulsas',
                                value: B(ax),
                                sub: `Comiss\xe3o produtos: ${B(aN)} • vs ${y(T)}: ${B(ay)} (${C(aJ)} | ${D(aK)})`,
                            }),
                            (0, b.jsx)(J, {
                                title: 'Atendimentos realizados',
                                value: `${az}`,
                                sub: `vs ${y(T)}: ${aA} (${((t = az - aA), `${t > 0 ? '+' : ''}${t}`)})`,
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
                                    (0, b.jsx)('div', {
                                        children: (0, b.jsxs)('p', {
                                            className:
                                                'text-label-large text-content-primary',
                                            children: [
                                                'Evolução mês a mês (últimos ',
                                                6,
                                                ')',
                                            ],
                                        }),
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'text-[11px] text-content-tertiary text-right',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                children: ['Unidade: ', ad],
                                            }),
                                            (0, b.jsxs)('div', {
                                                children: ['Mês: ', $],
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
                                            children: (0, b.jsxs)('tr', {
                                                className:
                                                    'border-b border-border-primary text-content-secondary',
                                                children: [
                                                    (0, b.jsx)('th', {
                                                        className: 'py-2 pr-3',
                                                        children: 'Mês',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Receita',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Serviços',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Pedidos',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Comissão',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Margem',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Atend.',
                                                    }),
                                                    (0, b.jsx)('th', {
                                                        className:
                                                            'py-2 pr-3 text-right',
                                                        children: 'Ticket',
                                                    }),
                                                ],
                                            }),
                                        }),
                                        (0, b.jsx)('tbody', {
                                            children: bb.map((a) =>
                                                (0, b.jsxs)(
                                                    'tr',
                                                    {
                                                        className:
                                                            'border-b border-border-primary/60 last:border-0',
                                                        children: [
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary font-medium whitespace-nowrap',
                                                                children:
                                                                    a.label,
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children: B(
                                                                    a.totalRevenue
                                                                ),
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children: B(
                                                                    a.serviceRevenue
                                                                ),
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children: B(
                                                                    a.standaloneRevenue
                                                                ),
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children: B(
                                                                    a.totalCommission
                                                                ),
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children: B(
                                                                    a.grossProfit
                                                                ),
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children:
                                                                    a.doneCount,
                                                            }),
                                                            (0, b.jsx)('td', {
                                                                className:
                                                                    'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                children: B(
                                                                    a.ticket
                                                                ),
                                                            }),
                                                        ],
                                                    },
                                                    a.key
                                                )
                                            ),
                                        }),
                                    ],
                                }),
                            }),
                            bd.length
                                ? (0, b.jsx)('div', {
                                      className:
                                          'mt-3 text-[11px] text-content-tertiary space-y-1',
                                      children: bd.map((a, c) =>
                                          (0, b.jsxs)(
                                              'div',
                                              { children: ['• ', a] },
                                              c
                                          )
                                      ),
                                  })
                                : null,
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className:
                            'rounded-xl border border-border-primary bg-background-tertiary p-4',
                        children: [
                            (0, b.jsx)('p', {
                                className:
                                    'text-label-large text-content-primary',
                                children:
                                    'Receita, comissão e margem por profissional',
                            }),
                            0 === a_.length
                                ? (0, b.jsx)('div', {
                                      className: (0, l.cn)(
                                          'mt-4 h-28 w-full rounded-lg border border-border-primary',
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
                                                                  'Receita',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Serviços',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Produtos',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Comissão',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Margem',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Atend.',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Ticket',
                                                          }),
                                                      ],
                                                  }),
                                              }),
                                              (0, b.jsx)('tbody', {
                                                  children: a_.map((a) =>
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
                                                                                  af &&
                                                                                  a.professionalId ===
                                                                                      af
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
                                                                              B(
                                                                                  a.totalRevenue
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.serviceRevenue
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.productRevenue
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.totalCommission
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.grossProfit
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              a.doneCount,
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.ticket
                                                                              ),
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
                                children: 'Receita e comissão por serviço',
                            }),
                            0 === a1.length
                                ? (0, b.jsx)('div', {
                                      className: (0, l.cn)(
                                          'mt-4 h-28 w-full rounded-lg border border-border-primary',
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
                                                                  'Serviço',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Receita',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Comissão',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children: 'Qtd',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Ticket',
                                                          }),
                                                      ],
                                                  }),
                                              }),
                                              (0, b.jsx)('tbody', {
                                                  children: a1.map((a) =>
                                                      (0, b.jsxs)(
                                                          'tr',
                                                          {
                                                              className:
                                                                  'border-b border-border-primary/60 last:border-0',
                                                              children: [
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary font-medium',
                                                                          children:
                                                                              a.service,
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.revenue
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.commission
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              a.count,
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              B(
                                                                                  a.ticket
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          a.service
                                                      )
                                                  ),
                                              }),
                                          ],
                                      }),
                                  }),
                        ],
                    }),
                ],
            });
        }
        a.s([
            'default',
            () => K,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Admin | Relatórios' },
        ]);
    },
];

//# sourceMappingURL=src_app_admin_report_revenue_page_tsx_6dfe5a67._.js.map
