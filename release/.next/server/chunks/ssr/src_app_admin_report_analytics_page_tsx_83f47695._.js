module.exports = [
    74e4,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(468695),
            d = a.i(766518),
            e = a.i(169513),
            f = a.i(28792);
        a.i(56672);
        var g = a.i(868313);
        a.i(23677);
        var h = a.i(790993);
        a.i(887143);
        var i = a.i(13296),
            j = a.i(638904),
            k = a.i(139138),
            l = a.i(303223),
            m = a.i(151748),
            n = a.i(984330),
            o = a.i(254413),
            p = a.i(816443);
        a.i(106878);
        var q = a.i(154840);
        let r = 'America/Sao_Paulo',
            s = 'admin_unit_context',
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
                    timeZone: r,
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
        function y(a) {
            let { y: b, m: c, d } = v(a);
            return new Date(Date.UTC(b, c - 1, d, 3, 0, 0));
        }
        function z(a) {
            let { y: b, m: c, d } = v(a);
            return `${b}-${String(c).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        }
        async function A(a) {
            if (!a.canSeeAllUnits) return a.unitId;
            let b = await (0, e.cookies)(),
                c = b.get(s)?.value ?? 'all';
            return c && 'all' !== c ? c : null;
        }
        function B(a) {
            return a ? { unitId: a } : {};
        }
        function C(a) {
            return 'prev_year' === a ? 'ano anterior' : 'mês anterior';
        }
        function D(a, b) {
            let c =
                Number.isFinite(a) && Number.isFinite(b) && !(b <= 0)
                    ? a / b
                    : NaN;
            return Number.isFinite(c) ? 100 * c : NaN;
        }
        function E(a) {
            return Number.isFinite(a)
                ? new Intl.NumberFormat('pt-BR', {
                      maximumFractionDigits: 0,
                  }).format(a)
                : '—';
        }
        function F(a) {
            if (!Number.isFinite(a)) return '—';
            let b = a > 0 ? '+' : '';
            return `${b}${E(a)}`;
        }
        function G(a) {
            return Number.isFinite(a)
                ? `${a > 0 ? '+' : ''}${Math.round(a)}%`
                : '—';
        }
        function H(a, b = 120) {
            let c = ('string' == typeof a ? a : '').trim();
            return c ? (c.length > b ? c.slice(0, b) : c) : '';
        }
        function I(a) {
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
        async function J({ searchParams: a }) {
            let t = await (0, f.requireAdminForModule)('REPORTS'),
                v = await u(t);
            if (!t?.canSeeAllUnits && !t?.unitId)
                throw Error(
                    'Admin de unidade sem unitId definido. Vincule este admin a uma unidade.'
                );
            let J = await (0, e.cookies)(),
                K = J.get(s)?.value ?? 'all',
                L = t?.canSeeAllUnits ? K : (t?.unitId ?? ''),
                M = await A({
                    unitId: t?.unitId ?? null,
                    canSeeAllUnits: !!t?.canSeeAllUnits,
                });
            M &&
                ((await d.prisma.unit.findFirst({
                    where: { id: M, companyId: v, isActive: !0 },
                    select: { id: !0 },
                })) ||
                    (0, q.redirect)('/admin/reports'));
            let { month: N, compare: O } = await a,
                P = 'prev_year' === O ? 'prev_year' : 'prev_month',
                Q = N ? (0, l.parse)(N, 'yyyy-MM', new Date()) : new Date(),
                R =
                    'prev_year' === P
                        ? (0, n.subYears)(Q, 1)
                        : (0, m.subMonths)(Q, 1),
                S = w(Q),
                T = x(Q),
                U = w(R),
                V = x(R),
                W = (0, o.format)(Q, "MMMM 'de' yyyy", { locale: p.ptBR }),
                X = [],
                Y = null;
            if (t?.canSeeAllUnits)
                X = await d.prisma.unit.findMany({
                    where: { companyId: v, isActive: !0 },
                    select: { id: !0, name: !0 },
                    orderBy: { name: 'asc' },
                });
            else if (t?.unitId) {
                let a = await d.prisma.unit.findFirst({
                    where: { id: t.unitId, companyId: v },
                    select: { name: !0 },
                });
                Y = a?.name ?? null;
            }
            let Z = !!t?.canSeeAllUnits && X.length > 1,
                $ = t?.canSeeAllUnits && 1 === X.length ? X[0]?.name : null,
                _ = t?.canSeeAllUnits ? ($ ?? 'Todas as unidades') : (Y ?? ''),
                aa = [
                    'page_viewed',
                    'product_impression',
                    'product_click',
                    'add_to_cart_success',
                    'add_to_cart_attempt',
                    'nav_click',
                    'search_change',
                    'filter_category',
                    'action_click',
                ],
                [ab, ac] = await Promise.all([
                    d.prisma.analyticsEvent.findMany({
                        where: {
                            companyId: v,
                            ts: { gte: S, lte: T },
                            name: { in: aa },
                            ...B(M),
                        },
                        select: {
                            name: !0,
                            ts: !0,
                            userId: !0,
                            source: !0,
                            payload: !0,
                            context: !0,
                        },
                        orderBy: { ts: 'asc' },
                        take: 5e4,
                    }),
                    d.prisma.analyticsEvent.findMany({
                        where: {
                            companyId: v,
                            ts: { gte: U, lte: V },
                            name: { in: aa },
                            ...B(M),
                        },
                        select: {
                            name: !0,
                            ts: !0,
                            userId: !0,
                            source: !0,
                            payload: !0,
                            context: !0,
                        },
                        orderBy: { ts: 'asc' },
                        take: 5e4,
                    }),
                ]),
                ad = (a) => {
                    let b = new Map();
                    for (let c of a) b.set(c.name, (b.get(c.name) ?? 0) + 1);
                    return b;
                },
                ae = ad(ab),
                af = ad(ac),
                ag = ae.get('page_viewed') ?? 0,
                ah = af.get('page_viewed') ?? 0,
                ai = ae.get('product_impression') ?? 0,
                aj = af.get('product_impression') ?? 0,
                ak = ae.get('product_click') ?? 0,
                al = af.get('product_click') ?? 0,
                am = ae.get('add_to_cart_success') ?? 0,
                an = af.get('add_to_cart_success') ?? 0,
                ao = (() => {
                    let a = new Set();
                    for (let b of ab) b.userId && a.add(b.userId);
                    return a.size;
                })(),
                ap = (() => {
                    let a = new Set();
                    for (let b of ac) b.userId && a.add(b.userId);
                    return a.size;
                })(),
                aq = D(ak, ai),
                ar = D(al, aj),
                as = D(am, ak),
                at = D(an, al),
                au = ag - ah,
                av = D(au, ah),
                aw = ao - ap,
                ax = D(aw, ap),
                ay = ai - aj,
                az = D(ay, aj),
                aA = ak - al,
                aB = D(aA, al),
                aC = aq - ar,
                aD = am - an,
                aE = D(aD, an),
                aF = as - at,
                aG = ab.length ? ab[ab.length - 1] : null,
                aH = aG
                    ? `${H(aG.name, 60)} • ${(function (a) {
                          try {
                              return new Intl.DateTimeFormat('pt-BR', {
                                  timeZone: r,
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: !1,
                              }).format(a);
                          } catch {
                              return a.toISOString();
                          }
                      })(aG.ts)} (SP)`
                    : '—',
                aI = new Map(),
                aJ = [];
            {
                let a = y(S),
                    b = new Date(y(T).getTime() + 864e5 - 1);
                for (; a.getTime() <= b.getTime(); ) {
                    let b = z(a),
                        c = (function (a) {
                            try {
                                return new Intl.DateTimeFormat('pt-BR', {
                                    timeZone: r,
                                    day: '2-digit',
                                    month: 'short',
                                }).format(a);
                            } catch {
                                return z(a);
                            }
                        })(a),
                        d = (function (a) {
                            try {
                                let b = new Intl.DateTimeFormat('pt-BR', {
                                    timeZone: r,
                                    weekday: 'short',
                                }).format(a);
                                return String(b).replace('.', '').toLowerCase();
                            } catch {
                                return '';
                            }
                        })(a);
                    (aJ.push({ key: b, date: a, label: c, weekday: d }),
                        aI.set(b, {
                            key: b,
                            label: c,
                            weekday: d,
                            pageViews: 0,
                            impressions: 0,
                            clicks: 0,
                            atc: 0,
                            total: 0,
                        }),
                        (a = new Date(a.getTime() + 864e5)));
                }
            }
            for (let a of ab) {
                let b = z(a.ts),
                    c = aI.get(b);
                c &&
                    ('page_viewed' === a.name && (c.pageViews += 1),
                    'product_impression' === a.name && (c.impressions += 1),
                    'product_click' === a.name && (c.clicks += 1),
                    'add_to_cart_success' === a.name && (c.atc += 1),
                    (c.total += 1));
            }
            aJ.map((a) => aI.get(a.key));
            let aK = new Map();
            aJ.forEach((a, b) => aK.set(a.key, b));
            let aL = Array.from({ length: aJ.length }, () => Array(24).fill(0));
            for (let a of ab) {
                if ('page_viewed' !== a.name) continue;
                let b = z(a.ts),
                    c = aK.get(b);
                if (null == c) continue;
                let { hour: d } = (function (a) {
                    let b = new Intl.DateTimeFormat('pt-BR', {
                        timeZone: r,
                        hour: '2-digit',
                        hour12: !1,
                    }).formatToParts(a);
                    return {
                        hour: Math.max(
                            0,
                            Math.min(
                                23,
                                Number(
                                    b.find((a) => 'hour' === a.type)?.value ??
                                        '00'
                                )
                            )
                        ),
                    };
                })(a.ts);
                aL[c][d] += 1;
            }
            let aM = 0;
            for (let a of aL) for (let b of a) aM = Math.max(aM, b);
            let aN = (() => {
                    let a = new Map();
                    for (let b of ab) {
                        if ('page_viewed' !== b.name) continue;
                        let c = H(b.payload?.page, 80) || '(sem page)';
                        a.set(c, (a.get(c) ?? 0) + 1);
                    }
                    return Array.from(a.entries())
                        .map(([a, b]) => ({ page: a, count: b }))
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 12);
                })(),
                aO = (() => {
                    let a = new Map(),
                        b = (b, c) => {
                            let d = a.get(b) ?? {
                                productId: b,
                                impressions: 0,
                                clicks: 0,
                                atc: 0,
                            };
                            ((d[c] += 1), a.set(b, d));
                        };
                    for (let a of ab) {
                        let c =
                            H(a.payload?.productId, 80) ||
                            H(a.payload?.product?.id, 80) ||
                            '';
                        c &&
                            ('product_impression' === a.name &&
                                b(c, 'impressions'),
                            'product_click' === a.name && b(c, 'clicks'),
                            'add_to_cart_success' === a.name && b(c, 'atc'));
                    }
                    return Array.from(a.values())
                        .sort((a, b) => {
                            let c = 100 * a.atc + 10 * a.clicks + a.impressions;
                            return (
                                100 * b.atc + 10 * b.clicks + b.impressions - c
                            );
                        })
                        .slice(0, 12);
                })(),
                aP = aO.map((a) => a.productId).filter(Boolean),
                aQ = new Map(
                    (aP.length
                        ? await d.prisma.product.findMany({
                              where: { companyId: v, id: { in: aP } },
                              select: { id: !0, name: !0 },
                          })
                        : []
                    ).map((a) => [a.id, a.name])
                ),
                aR = [];
            if (0 === ab.length) aR.push('Sem eventos no período selecionado.');
            else {
                if (
                    (au > 0 && aR.push('Tráfego subiu no período.'),
                    au < 0 && aR.push('Tráfego caiu no período.'),
                    Number.isFinite(aq) &&
                        aR.push(`CTR de produto: ~${Math.round(aq)}%.`),
                    Number.isFinite(as) &&
                        aR.push(
                            `Convers\xe3o clique → carrinho: ~${Math.round(as)}%.`
                        ),
                    aN[0]?.page &&
                        aR.push(`P\xe1gina l\xedder: ${aN[0].page}.`),
                    aO[0]?.productId)
                ) {
                    let a = aQ.get(aO[0].productId);
                    aR.push(
                        `Produto mais quente: ${a ?? aO[0].productId} (ATC: ${aO[0].atc}).`
                    );
                }
                aR.push(`\xdaltimo evento: ${aH}.`);
            }
            let aS = aR.slice(0, 6);
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
                                            'Analytics: Acesso, Interesse & Conversão',
                                    }),
                                    (0, b.jsx)(j.Button, {
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
                                className: (0, k.cn)(
                                    'rounded-xl border border-border-primary bg-background-tertiary p-3'
                                ),
                                children: [
                                    (0, b.jsxs)('div', {
                                        className:
                                            'grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end',
                                        children: [
                                            (0, b.jsx)('div', {
                                                className:
                                                    'w-full [&_select]:h-12 [&_select]:min-h-12 [&_select]:py-2',
                                                children: Z
                                                    ? (0, b.jsx)(h.UnitFilter, {
                                                          units: X,
                                                          value: L,
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
                                                                          k.cn)(
                                                                              'h-12 w-full rounded-md border border-border-primary',
                                                                              'bg-background-secondary px-3',
                                                                              'flex items-center',
                                                                              'text-content-primary text-sm'
                                                                          ),
                                                                      title: _,
                                                                      children:
                                                                          (0,
                                                                          b.jsx)(
                                                                              'span',
                                                                              {
                                                                                  className:
                                                                                      'truncate',
                                                                                  children:
                                                                                      _,
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
                                                    i.CompareWithFilter,
                                                    { value: P }
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
                                                children: [_, ` • ${W}`],
                                            }),
                                            (0, b.jsxs)('span', {
                                                className:
                                                    'ml-2 text-content-tertiary',
                                                children: [
                                                    '· Último evento:',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-content-primary',
                                                        children: aH,
                                                    }),
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
                            (0, b.jsx)(I, {
                                title: 'Page views',
                                value: E(ag),
                                sub: `vs ${C(P)}: ${E(ah)} (${F(au)} | ${G(av)})`,
                            }),
                            (0, b.jsx)(I, {
                                title: 'Usuários únicos (logados)',
                                value: E(ao),
                                sub: `vs ${C(P)}: ${E(ap)} (${F(aw)} | ${G(ax)})`,
                            }),
                            (0, b.jsx)(I, {
                                title: 'Impressões de produto',
                                value: E(ai),
                                sub: `vs ${C(P)}: ${E(aj)} (${F(ay)} | ${G(az)})`,
                            }),
                            (0, b.jsx)(I, {
                                title: 'Cliques em produto',
                                value: E(ak),
                                sub: `vs ${C(P)}: ${E(al)} (${F(aA)} | ${G(aB)}) • CTR: ${Number.isFinite(aq) ? `${Math.round(aq)}%` : '—'}${Number.isFinite(aC) ? ` (${aC > 0 ? '+' : ''}${Math.round(aC)} p.p.)` : ''}`,
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'grid gap-4 md:grid-cols-3',
                        children: [
                            (0, b.jsx)(I, {
                                title: 'Add to cart (sucesso)',
                                value: E(am),
                                sub: `vs ${C(P)}: ${E(an)} (${F(aD)} | ${G(aE)})`,
                            }),
                            (0, b.jsx)(I, {
                                title: 'Conversão (impressão → clique)',
                                value: Number.isFinite(aq)
                                    ? `${Math.round(aq)}%`
                                    : '—',
                                sub: `vs ${C(P)}: ${Number.isFinite(ar) ? `${Math.round(ar)}%` : '—'}${Number.isFinite(aC) ? ` (${aC > 0 ? '+' : ''}${Math.round(aC)} p.p.)` : ''}`,
                            }),
                            (0, b.jsx)(I, {
                                title: 'Conversão (clique → carrinho)',
                                value: Number.isFinite(as)
                                    ? `${Math.round(as)}%`
                                    : '—',
                                sub: `vs ${C(P)}: ${Number.isFinite(at) ? `${Math.round(at)}%` : '—'}${Number.isFinite(aF) ? ` (${aF > 0 ? '+' : ''}${Math.round(aF)} p.p.)` : ''}`,
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className:
                            'rounded-xl border border-border-primary bg-background-tertiary p-4',
                        children: [
                            (0, b.jsx)('div', {
                                className:
                                    'flex items-start justify-between gap-3',
                                children: (0, b.jsxs)('div', {
                                    children: [
                                        (0, b.jsx)('p', {
                                            className:
                                                'text-label-large text-content-primary',
                                            children: 'Insights',
                                        }),
                                        (0, b.jsx)('p', {
                                            className:
                                                'text-[11px] text-content-tertiary',
                                            children:
                                                'Leitura rápida do que mudou no período.',
                                        }),
                                    ],
                                }),
                            }),
                            0 === aS.length
                                ? (0, b.jsx)('div', {
                                      className: (0, k.cn)(
                                          'mt-4 h-20 w-full rounded-lg border border-border-primary',
                                          'bg-background-secondary',
                                          'flex items-center justify-center',
                                          'text-content-tertiary text-sm'
                                      ),
                                      children: 'Sem insights.',
                                  })
                                : (0, b.jsx)('ul', {
                                      className:
                                          'mt-4 grid gap-2 md:grid-cols-2',
                                      children: aS.map((a, c) =>
                                          (0, b.jsx)(
                                              'li',
                                              {
                                                  className: (0, k.cn)(
                                                      'rounded-lg border border-border-primary bg-background-secondary px-3 py-2',
                                                      'text-[12px] text-content-primary'
                                                  ),
                                                  children: a,
                                              },
                                              `${c}-${a}`
                                          )
                                      ),
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
                                                    'Heatmap de acessos (page_viewed)',
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-[11px] text-content-tertiary',
                                                children:
                                                    'Distribuição por dia do mês e hora (São Paulo).',
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'text-[11px] text-content-tertiary text-right',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                children: [
                                                    'Máximo por célula: ',
                                                    E(aM),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                children: [
                                                    'Dias no mês: ',
                                                    aJ.length,
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            0 === ag
                                ? (0, b.jsx)('div', {
                                      className: (0, k.cn)(
                                          'mt-4 h-28 w-full rounded-lg border border-border-primary',
                                          'bg-background-secondary',
                                          'flex items-center justify-center',
                                          'text-content-tertiary text-sm'
                                      ),
                                      children: 'Sem page views no período.',
                                  })
                                : (0, b.jsx)('div', {
                                      className: 'mt-4 overflow-x-auto',
                                      children: (0, b.jsxs)('table', {
                                          className:
                                              'min-w-245 text-left text-[12px]',
                                          children: [
                                              (0, b.jsx)('thead', {
                                                  children: (0, b.jsxs)('tr', {
                                                      className:
                                                          'border-b border-border-primary text-content-secondary',
                                                      children: [
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3',
                                                              children: 'Dia',
                                                          }),
                                                          Array.from(
                                                              { length: 24 },
                                                              (a, c) =>
                                                                  (0, b.jsx)(
                                                                      'th',
                                                                      {
                                                                          className:
                                                                              'py-2 px-2 text-center',
                                                                          children:
                                                                              String(
                                                                                  c
                                                                              ).padStart(
                                                                                  2,
                                                                                  '0'
                                                                              ),
                                                                      },
                                                                      c
                                                                  )
                                                          ),
                                                      ],
                                                  }),
                                              }),
                                              (0, b.jsx)('tbody', {
                                                  children: aL.map((a, c) => {
                                                      let d = aJ[c];
                                                      return (0, b.jsxs)(
                                                          'tr',
                                                          {
                                                              className:
                                                                  'border-b border-border-primary/60 last:border-0',
                                                              children: [
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary font-medium whitespace-nowrap',
                                                                          children:
                                                                              (0,
                                                                              b.jsxs)(
                                                                                  'div',
                                                                                  {
                                                                                      className:
                                                                                          'flex flex-col',
                                                                                      children:
                                                                                          [
                                                                                              (0,
                                                                                              b.jsxs)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      children:
                                                                                                          [
                                                                                                              d.label,
                                                                                                              ' ',
                                                                                                              (0,
                                                                                                              b.jsxs)(
                                                                                                                  'span',
                                                                                                                  {
                                                                                                                      className:
                                                                                                                          'text-[11px] text-content-tertiary',
                                                                                                                      children:
                                                                                                                          [
                                                                                                                              '(',
                                                                                                                              d.weekday,
                                                                                                                              ')',
                                                                                                                          ],
                                                                                                                  }
                                                                                                              ),
                                                                                                          ],
                                                                                                  }
                                                                                              ),
                                                                                              (0,
                                                                                              b.jsx)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      className:
                                                                                                          'text-[11px] text-content-tertiary',
                                                                                                      children:
                                                                                                          d.key,
                                                                                                  }
                                                                                              ),
                                                                                          ],
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                                  a.map(
                                                                      (
                                                                          a,
                                                                          c
                                                                      ) => {
                                                                          var e;
                                                                          let f =
                                                                              0.06 +
                                                                              0.55 *
                                                                                  (Number.isFinite(
                                                                                      (e =
                                                                                          aM >
                                                                                          0
                                                                                              ? a /
                                                                                                aM
                                                                                              : 0)
                                                                                  )
                                                                                      ? Math.max(
                                                                                            0,
                                                                                            Math.min(
                                                                                                1,
                                                                                                e
                                                                                            )
                                                                                        )
                                                                                      : 0);
                                                                          return (0,
                                                                          b.jsx)(
                                                                              'td',
                                                                              {
                                                                                  className:
                                                                                      'py-2 px-2',
                                                                                  children:
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          'div',
                                                                                          {
                                                                                              className:
                                                                                                  (0,
                                                                                                  k.cn)(
                                                                                                      'h-7 w-8 rounded-md border border-border-primary',
                                                                                                      'flex items-center justify-center tabular-nums',
                                                                                                      'text-[11px] text-content-primary'
                                                                                                  ),
                                                                                              style: {
                                                                                                  backgroundColor: `rgba(124,108,255,${f})`,
                                                                                              },
                                                                                              title: `${d.key} • ${String(c).padStart(2, '0')}:00 • ${a} views`,
                                                                                              children:
                                                                                                  a ||
                                                                                                  '',
                                                                                          }
                                                                                      ),
                                                                              },
                                                                              c
                                                                          );
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          d.key
                                                      );
                                                  }),
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
                            (0, b.jsx)('div', {
                                className:
                                    'flex items-start justify-between gap-3',
                                children: (0, b.jsxs)('div', {
                                    children: [
                                        (0, b.jsx)('p', {
                                            className:
                                                'text-label-large text-content-primary',
                                            children:
                                                'Produtos: interesse e ação',
                                        }),
                                        (0, b.jsx)('p', {
                                            className:
                                                'text-[11px] text-content-tertiary',
                                            children:
                                                'Baseado em impressões, cliques e add-to-cart (sucesso).',
                                        }),
                                    ],
                                }),
                            }),
                            0 === aO.length
                                ? (0, b.jsx)('div', {
                                      className: (0, k.cn)(
                                          'mt-4 h-28 w-full rounded-lg border border-border-primary',
                                          'bg-background-secondary',
                                          'flex items-center justify-center',
                                          'text-content-tertiary text-sm'
                                      ),
                                      children:
                                          'Sem eventos de produto no período.',
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
                                                                  'Produto',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Impressões',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Cliques',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children: 'CTR',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Carrinho',
                                                          }),
                                                          (0, b.jsx)('th', {
                                                              className:
                                                                  'py-2 pr-3 text-right',
                                                              children:
                                                                  'Clique → Carrinho',
                                                          }),
                                                      ],
                                                  }),
                                              }),
                                              (0, b.jsx)('tbody', {
                                                  children: aO.map((a) => {
                                                      let c = aQ.get(
                                                              a.productId
                                                          ),
                                                          d = D(
                                                              a.clicks,
                                                              a.impressions
                                                          ),
                                                          e = D(
                                                              a.atc,
                                                              a.clicks
                                                          );
                                                      return (0, b.jsxs)(
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
                                                                              (0,
                                                                              b.jsxs)(
                                                                                  'div',
                                                                                  {
                                                                                      className:
                                                                                          'flex flex-col',
                                                                                      children:
                                                                                          [
                                                                                              (0,
                                                                                              b.jsx)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      className:
                                                                                                          'truncate',
                                                                                                      children:
                                                                                                          c ??
                                                                                                          a.productId,
                                                                                                  }
                                                                                              ),
                                                                                              c
                                                                                                  ? null
                                                                                                  : (0,
                                                                                                    b.jsx)(
                                                                                                        'span',
                                                                                                        {
                                                                                                            className:
                                                                                                                'text-[11px] text-content-tertiary',
                                                                                                            children:
                                                                                                                a.productId,
                                                                                                        }
                                                                                                    ),
                                                                                          ],
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              E(
                                                                                  a.impressions
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              E(
                                                                                  a.clicks
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              Number.isFinite(
                                                                                  d
                                                                              )
                                                                                  ? `${Math.round(d)}%`
                                                                                  : '—',
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              E(
                                                                                  a.atc
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      'td',
                                                                      {
                                                                          className:
                                                                              'py-2 pr-3 text-content-primary text-right tabular-nums',
                                                                          children:
                                                                              Number.isFinite(
                                                                                  e
                                                                              )
                                                                                  ? `${Math.round(e)}%`
                                                                                  : '—',
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          a.productId
                                                      );
                                                  }),
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
            () => J,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Admin | Relatórios' },
        ]);
    },
];

//# sourceMappingURL=src_app_admin_report_analytics_page_tsx_83f47695._.js.map
