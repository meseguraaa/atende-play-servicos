module.exports = [
    534375,
    90083,
    384378,
    319895,
    (a) => {
        'use strict';
        var b = a.i(203431);
        let c = (0, b.default)('link', [
            [
                'path',
                {
                    d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
                    key: '1cjeqo',
                },
            ],
            [
                'path',
                {
                    d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
                    key: '19qd67',
                },
            ],
        ]);
        a.s(['Link', () => c], 534375);
        let d = (0, b.default)('arrow-right', [
            ['path', { d: 'M5 12h14', key: '1ays0h' }],
            ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
        ]);
        a.s(['ArrowRight', () => d], 90083);
        let e = (0, b.default)('list-ordered', [
            ['path', { d: 'M11 5h10', key: '1cz7ny' }],
            ['path', { d: 'M11 12h10', key: '1438ji' }],
            ['path', { d: 'M11 19h10', key: '11t30w' }],
            ['path', { d: 'M4 4h1v5', key: '10yrso' }],
            ['path', { d: 'M4 9h2', key: 'r1h2o0' }],
            [
                'path',
                {
                    d: 'M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02',
                    key: 'xtkcd5',
                },
            ],
        ]);
        a.s(['ListOrdered', () => e], 384378);
        let f = (0, b.default)('file-text', [
            [
                'path',
                {
                    d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
                    key: '1oefj6',
                },
            ],
            ['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
            ['path', { d: 'M10 9H8', key: 'b1mrlr' }],
            ['path', { d: 'M16 13H8', key: 't4e002' }],
            ['path', { d: 'M16 17H8', key: 'z1uh3a' }],
        ]);
        a.s(['FileText', () => f], 319895);
    },
    152888,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(259849),
            e = a.i(156916),
            f = a.i(368114),
            g = a.i(699570),
            h = a.i(814574),
            i = a.i(866718),
            j = a.i(429246),
            k = a.i(580701),
            l = a.i(447067),
            m = a.i(273819),
            n = a.i(163061),
            o = a.i(450954),
            p = a.i(534375),
            q = a.i(90083),
            r = a.i(384378);
        let s = (0, a.i(203431).default)('eye', [
            [
                'path',
                {
                    d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
                    key: '1nclc0',
                },
            ],
            ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
        ]);
        var t = a.i(597635),
            u = a.i(300298),
            v = a.i(319895),
            w = a.i(263758),
            x = a.i(50900),
            y = a.i(638446),
            z = a.i(198803);
        function A(a) {
            let b = String(a ?? '').trim();
            if (!b) return null;
            let c = b.toLowerCase();
            return c.startsWith('javascript:') || c.startsWith('data:')
                ? null
                : c.startsWith('http://') || c.startsWith('https://')
                  ? b
                  : c.startsWith('www.')
                    ? `https://${b}`
                    : null;
        }
        function B(a) {
            let b = String(a ?? '').trim();
            if (!b) return !1;
            let c = b.toLowerCase();
            return (
                !(
                    c.startsWith('javascript:') ||
                    c.startsWith('data:') ||
                    c.startsWith('blob:')
                ) &&
                !!(
                    b.startsWith('/media/') ||
                    b.startsWith('/uploads/') ||
                    c.startsWith('http://') ||
                    c.startsWith('https://')
                )
            );
        }
        function C(a) {
            let { icon: c, className: d, ...e } = a;
            return (0, b.jsxs)('div', {
                className: 'relative',
                children: [
                    (0, b.jsx)('div', {
                        className:
                            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                        children: (0, b.jsx)(c, {
                            className: 'h-4 w-4 text-content-brand',
                        }),
                    }),
                    (0, b.jsx)(i.Input, {
                        ...e,
                        className: (0, f.cn)('pl-10', d),
                    }),
                ],
            });
        }
        let D =
                'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
            E =
                'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
            F = [
                { value: 'ALL', label: 'Todas as empresas' },
                { value: 'SELECTED', label: 'Empresas selecionadas' },
            ];
        async function G(a) {
            try {
                return await a.json();
            } catch {
                return null;
            }
        }
        async function H() {
            for (let a of [
                '/api/plataform/companies/options',
                '/api/plataform/companies?active=1',
                '/api/plataform/companies',
            ])
                try {
                    let b = await fetch(a, { method: 'GET' });
                    if (!b.ok) continue;
                    let c = await G(b);
                    if (!c) continue;
                    let d = c.companies ?? c.items ?? c.data ?? c.list ?? null;
                    if (Array.isArray(d)) {
                        let a = d
                            .map((a) => ({
                                id: String(a?.id ?? '').trim(),
                                name: String(a?.name ?? a?.title ?? '').trim(),
                                isActive:
                                    'boolean' == typeof a?.isActive
                                        ? a.isActive
                                        : void 0,
                            }))
                            .filter((a) => a.id && a.name);
                        if (a.length) return a;
                    }
                } catch {}
            return [];
        }
        async function I(a) {
            for (let b of [
                `/api/plataform/partners/${a}`,
                `/api/plataform/partners/${a}/companies`,
                `/api/plataform/partners/${a}/visibility`,
            ])
                try {
                    let a = await fetch(b, { method: 'GET' });
                    if (!a.ok) continue;
                    let c = await G(a);
                    if (!c) continue;
                    let d =
                        c?.companyIds ??
                        c?.data?.companyIds ??
                        c?.data?.selectedCompanyIds ??
                        null;
                    if (Array.isArray(d)) {
                        let a = d
                            .map((a) => String(a ?? '').trim())
                            .filter(Boolean);
                        return Array.from(new Set(a));
                    }
                    let e =
                        c?.companies ??
                        c?.data?.companies ??
                        c?.data?.items ??
                        null;
                    if (Array.isArray(e)) {
                        let a = e
                            .map((a) =>
                                String(a?.companyId ?? a?.id ?? '').trim()
                            )
                            .filter(Boolean);
                        if (a.length) return Array.from(new Set(a));
                    }
                } catch {}
            return [];
        }
        function J({ partner: a }) {
            let G = (0, d.useRouter)(),
                [J, K] = c.useState(!1),
                [L, M] = c.useTransition(),
                [N, O] = c.useState(a.name ?? ''),
                [P, Q] = c.useState(a.logoUrl ?? ''),
                [R, S] = c.useState(() => {
                    let b = String(a.logoKey ?? '').trim();
                    return b.length ? b : '';
                }),
                [T, U] = c.useState(() => {
                    let b = Number(a.discountPct ?? 0);
                    return Number.isFinite(b) ? String(b) : '0';
                }),
                [V, W] = c.useState(String(a.description ?? '')),
                [X, Y] = c.useState(String(a.rules ?? '')),
                [Z, $] = c.useState(a.ctaUrl ?? ''),
                [_, aa] = c.useState(() => {
                    let b = String(a.ctaLabel ?? '').trim();
                    return b.length ? b : 'Ativar cashback e ir pra loja';
                }),
                [ab, ac] = c.useState(() =>
                    'SELECTED' ===
                    String(a.visibilityMode ?? 'ALL')
                        .trim()
                        .toUpperCase()
                        ? 'SELECTED'
                        : 'ALL'
                ),
                [ad, ae] = c.useState(() => {
                    let b = Number(a.sortOrder ?? 100);
                    return Number.isFinite(b) ? String(b) : '100';
                }),
                af = c.useRef(null),
                [ag, ah] = c.useState(!1),
                [ai, aj] = c.useState(!1),
                [ak, al] = c.useState([]),
                [am, an] = c.useState(!1),
                [ao, ap] = c.useState(''),
                [aq, ar] = c.useState([]);
            (c.useEffect(() => {
                J &&
                    (O(a.name ?? ''),
                    Q(a.logoUrl ?? ''),
                    S(() => {
                        let b = String(a.logoKey ?? '').trim();
                        return b.length ? b : '';
                    }),
                    U(() => {
                        let b = Number(a.discountPct ?? 0);
                        return Number.isFinite(b) ? String(b) : '0';
                    }),
                    W(String(a.description ?? '')),
                    Y(String(a.rules ?? '')),
                    $(a.ctaUrl ?? ''),
                    aa(() => {
                        let b = String(a.ctaLabel ?? '').trim();
                        return b.length ? b : 'Ativar cashback e ir pra loja';
                    }),
                    ac(() =>
                        'SELECTED' ===
                        String(a.visibilityMode ?? 'ALL')
                            .trim()
                            .toUpperCase()
                            ? 'SELECTED'
                            : 'ALL'
                    ),
                    ae(() => {
                        let b = Number(a.sortOrder ?? 100);
                        return Number.isFinite(b) ? String(b) : '100';
                    }),
                    ap(''),
                    ar([]),
                    ah(!1),
                    aj(!1),
                    af.current && (af.current.value = ''));
            }, [J, a]),
                c.useEffect(() => {
                    if (!J) return;
                    let b = !0;
                    return (
                        (async function () {
                            an(!0);
                            try {
                                let [c, d] = await Promise.all([H(), I(a.id)]);
                                if (!b) return;
                                (c.length ||
                                    e.toast.error(
                                        'Não encontrei empresas para listar. Verifique o endpoint /api/plataform/companies/options.'
                                    ),
                                    al(c),
                                    ar(d));
                                let f = String(a.visibilityMode ?? 'ALL')
                                    .trim()
                                    .toUpperCase();
                                ac('SELECTED' === f ? 'SELECTED' : 'ALL');
                            } catch {
                                if (!b) return;
                                e.toast.error(
                                    'Erro ao carregar empresas do parceiro.'
                                );
                            } finally {
                                if (!b) return;
                                an(!1);
                            }
                        })(),
                        () => {
                            b = !1;
                        }
                    );
                }, [J, a.id]),
                c.useEffect(() => {
                    aj(!1);
                }, [P]),
                c.useEffect(() => {
                    'ALL' !== ab || (0 !== aq.length && ar([]));
                }, [ab]));
            let as = c.useMemo(() => {
                let a = ao.trim().toLowerCase();
                return a
                    ? ak.filter((b) =>
                          String(b.name ?? '')
                              .toLowerCase()
                              .includes(a)
                      )
                    : ak;
            }, [ak, ao]);
            async function at(a) {
                if (!a.type?.startsWith('image/'))
                    return void e.toast.error(
                        'Selecione um arquivo de imagem.'
                    );
                if (a.size > 5242880)
                    return void e.toast.error(
                        `Imagem muito grande. M\xe1ximo: 5MB.`
                    );
                ah(!0);
                try {
                    let b = new FormData();
                    (b.append('file', a), b.append('module', 'PARTNERS'));
                    let c = await fetch('/api/admin/uploads', {
                            method: 'POST',
                            body: b,
                        }),
                        d = await c.json().catch(() => null);
                    if (!c.ok || !d || !0 !== d.ok) {
                        let a =
                            (d && !1 === d.ok && d.error) ||
                            'Não foi possível fazer upload da imagem.';
                        e.toast.error(a);
                        return;
                    }
                    let f = String(d.data.url ?? '').trim();
                    if (!B(f))
                        return void e.toast.error(
                            'Upload retornou uma URL inválida para o parceiro. O esperado é /media/... (recomendado), /uploads/... (legado) ou http(s).'
                        );
                    (Q(f),
                        S(String(d.data.key ?? '').trim()),
                        aj(!1),
                        e.toast.success('Imagem enviada!'));
                } catch {
                    e.toast.error('Erro de rede ao fazer upload da imagem.');
                } finally {
                    ah(!1);
                }
            }
            let au =
                    !N.trim() ||
                    !P.trim() ||
                    !T.trim() ||
                    !Z.trim() ||
                    !_.trim() ||
                    !ad.trim(),
                av = 'SELECTED' === ab && 0 === aq.length,
                aw = 'SELECTED' === ab && am,
                ax = au || av || ag || aw;
            async function ay() {
                let b, c, d, f;
                if (ax)
                    return aw
                        ? void e.toast.error(
                              'Aguarde carregar as empresas antes de salvar.'
                          )
                        : av
                          ? void e.toast.error(
                                'Selecione pelo menos 1 empresa para SELECTED.'
                            )
                          : P.trim()
                            ? void e.toast.error(
                                  'Preencha os campos obrigatórios antes de salvar.'
                              )
                            : void e.toast.error('Logo é obrigatória.');
                let g =
                    ((b =
                        (function (a) {
                            let b = String(a ?? '').trim();
                            if (!b) return null;
                            let c = Number(b.replace(',', '.'));
                            return Number.isFinite(c)
                                ? Math.max(0, Math.min(100, Math.floor(c)))
                                : null;
                        })(T) ?? 0),
                    (c = (function (a) {
                        let b = String(a ?? '').trim();
                        if (!b) return null;
                        let c = Number(b.replace(',', '.'));
                        return Number.isFinite(c) ? Math.floor(c) : null;
                    })(ad)),
                    (d = A(Z)),
                    (f = 'SELECTED' === ab ? aq : []),
                    {
                        name: N.trim(),
                        logoUrl: P.trim(),
                        logoKey: R.trim() || null,
                        discountPct: b,
                        description: String(V ?? '').trim() || null,
                        rules: String(X ?? '').trim() || null,
                        ctaUrl: d ?? Z.trim(),
                        ctaLabel: _.trim() || 'Ativar cashback e ir pra loja',
                        visibilityMode: ab,
                        sortOrder: Number.isFinite(c) ? Number(c) : 100,
                        companyIds: f,
                    });
                if (!B(g.logoUrl))
                    return void e.toast.error(
                        'logoUrl inválida. Envie uma imagem (/media ou /uploads) ou forneça uma URL http(s) válida.'
                    );
                let h = Number(g.discountPct);
                if (!Number.isFinite(h) || h < 0 || h > 100)
                    return void e.toast.error('Desconto inválido (0 a 100).');
                let i = Number(g.sortOrder);
                if (!Number.isFinite(i) || i < 0)
                    return void e.toast.error('Ordem inválida (0 ou maior).');
                let j = A(g.ctaUrl);
                j
                    ? M(async () => {
                          try {
                              let b = await fetch(
                                      `/api/plataform/partners/${a.id}`,
                                      {
                                          method: 'PATCH',
                                          headers: {
                                              'Content-Type':
                                                  'application/json',
                                          },
                                          body: JSON.stringify({
                                              update: { ...g, ctaUrl: j },
                                          }),
                                      }
                                  ),
                                  c = await b.json().catch(() => null);
                              if (!b.ok || !c || !0 !== c.ok) {
                                  let a =
                                      c?.error ||
                                      'Não foi possível salvar o parceiro. Tente novamente.';
                                  e.toast.error(a);
                                  return;
                              }
                              (e.toast.success('Parceiro atualizado!'),
                                  K(!1),
                                  G.refresh());
                          } catch {
                              e.toast.error('Erro de rede ao salvar parceiro.');
                          }
                      })
                    : e.toast.error(
                          'CTA URL inválida. Use http(s) ou comece com www.'
                      );
            }
            let az = P.trim() ? P.trim() : null;
            return (0, b.jsxs)(h.Dialog, {
                open: J,
                onOpenChange: (a) => !L && !ag && K(a),
                children: [
                    (0, b.jsx)(h.DialogTrigger, {
                        asChild: !0,
                        children: (0, b.jsx)(g.Button, {
                            variant: 'edit2',
                            size: 'sm',
                            className:
                                'border-border-primary hover:bg-muted/40',
                            children: 'Editar',
                        }),
                    }),
                    (0, b.jsxs)(h.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, b.jsx)(h.DialogHeader, {
                                children: (0, b.jsx)(h.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Editar parceiro',
                                }),
                            }),
                            (0, b.jsxs)('div', {
                                className: 'space-y-4 pb-2',
                                children: [
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Nome do parceiro',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)(C, {
                                                icon: l.Handshake,
                                                value: N,
                                                onChange: (a) =>
                                                    O(a.target.value),
                                                disabled: L,
                                                className: D,
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Logo do parceiro',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)('input', {
                                                ref: af,
                                                type: 'file',
                                                accept: 'image/*',
                                                className: 'hidden',
                                                disabled: L || ag,
                                                onChange: (a) => {
                                                    let b =
                                                        a.currentTarget
                                                            .files?.[0];
                                                    b && at(b);
                                                },
                                            }),
                                            (0, b.jsxs)('div', {
                                                className:
                                                    'grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start',
                                                children: [
                                                    (0, b.jsxs)('div', {
                                                        className: 'space-y-2',
                                                        children: [
                                                            (0, b.jsxs)('div', {
                                                                className:
                                                                    'relative',
                                                                children: [
                                                                    (0, b.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                            children:
                                                                                (0,
                                                                                b.jsx)(
                                                                                    m.Image,
                                                                                    {
                                                                                        className:
                                                                                            'h-4 w-4 text-content-brand',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                    (0, b.jsx)(
                                                                        i.Input,
                                                                        {
                                                                            value:
                                                                                az ??
                                                                                '',
                                                                            readOnly:
                                                                                !0,
                                                                            placeholder:
                                                                                'Escolha seu arquivo clicando em Upload.',
                                                                            className:
                                                                                (0,
                                                                                f.cn)(
                                                                                    'pl-10 pr-10',
                                                                                    D
                                                                                ),
                                                                        }
                                                                    ),
                                                                    az
                                                                        ? (0,
                                                                          b.jsx)(
                                                                              'button',
                                                                              {
                                                                                  type: 'button',
                                                                                  className:
                                                                                      'absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary hover:text-content-primary',
                                                                                  onClick:
                                                                                      () => {
                                                                                          (Q(
                                                                                              ''
                                                                                          ),
                                                                                              S(
                                                                                                  ''
                                                                                              ),
                                                                                              aj(
                                                                                                  !1
                                                                                              ),
                                                                                              af.current &&
                                                                                                  (af.current.value =
                                                                                                      ''));
                                                                                      },
                                                                                  disabled:
                                                                                      L ||
                                                                                      ag,
                                                                                  title: 'Remover imagem',
                                                                                  children:
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          u.X,
                                                                                          {
                                                                                              className:
                                                                                                  'h-4 w-4',
                                                                                          }
                                                                                      ),
                                                                              }
                                                                          )
                                                                        : null,
                                                                ],
                                                            }),
                                                            R
                                                                ? (0, b.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-[11px] text-content-secondary/70',
                                                                          children:
                                                                              [
                                                                                  'key:',
                                                                                  ' ',
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      'span',
                                                                                      {
                                                                                          className:
                                                                                              'text-content-primary',
                                                                                          children:
                                                                                              R,
                                                                                      }
                                                                                  ),
                                                                              ],
                                                                      }
                                                                  )
                                                                : null,
                                                        ],
                                                    }),
                                                    (0, b.jsx)(g.Button, {
                                                        type: 'button',
                                                        variant: 'brand',
                                                        className: 'h-10',
                                                        onClick: () =>
                                                            af.current?.click(),
                                                        disabled: L || ag,
                                                        title: ag
                                                            ? 'Enviando...'
                                                            : void 0,
                                                        children: (0, b.jsxs)(
                                                            'span',
                                                            {
                                                                className:
                                                                    'inline-flex items-center gap-2',
                                                                children: [
                                                                    (0, b.jsx)(
                                                                        t.Upload,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4',
                                                                        }
                                                                    ),
                                                                    ag
                                                                        ? 'Enviando...'
                                                                        : 'Upload',
                                                                ],
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            az
                                                ? (0, b.jsx)('div', {
                                                      className:
                                                          'overflow-hidden rounded-xl border border-border-primary bg-background-tertiary',
                                                      children: (0, b.jsx)(
                                                          'div',
                                                          {
                                                              className:
                                                                  'h-40 w-full flex items-center justify-center',
                                                              children: ai
                                                                  ? (0, b.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'h-40 w-full flex items-center justify-center',
                                                                            children:
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'h-16 w-16 rounded-2xl border border-border-primary bg-background-secondary flex items-center justify-center',
                                                                                        children:
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                'span',
                                                                                                {
                                                                                                    className:
                                                                                                        'text-sm font-semibold text-content-secondary',
                                                                                                    children:
                                                                                                        (
                                                                                                            N ||
                                                                                                            '?'
                                                                                                        )
                                                                                                            .trim()
                                                                                                            .split(
                                                                                                                /\s+/
                                                                                                            )
                                                                                                            .filter(
                                                                                                                Boolean
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
                                                                        }
                                                                    )
                                                                  : (0, b.jsx)(
                                                                        'img',
                                                                        {
                                                                            src: az,
                                                                            alt: 'Preview do parceiro',
                                                                            className:
                                                                                'h-40 w-full object-cover',
                                                                            onError:
                                                                                () =>
                                                                                    aj(
                                                                                        !0
                                                                                    ),
                                                                        }
                                                                    ),
                                                          }
                                                      ),
                                                  })
                                                : null,
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Desconto (%) ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)(C, {
                                                icon: o.BadgePercent,
                                                value: T,
                                                onChange: (a) =>
                                                    U(a.target.value),
                                                disabled: L,
                                                inputMode: 'numeric',
                                                placeholder: 'Ex: 10',
                                                className: D,
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-[11px] text-content-secondary/70',
                                                children:
                                                    'O servidor normaliza para 0–100.',
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Descrição',
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'relative',
                                                children: [
                                                    (0, b.jsx)('div', {
                                                        className:
                                                            'pointer-events-none absolute left-3 top-3',
                                                        children: (0, b.jsx)(
                                                            n.AlignLeft,
                                                            {
                                                                className:
                                                                    'h-4 w-4 text-content-brand',
                                                            }
                                                        ),
                                                    }),
                                                    (0, b.jsx)(j.Textarea, {
                                                        value: V,
                                                        onChange: (a) =>
                                                            W(a.target.value),
                                                        disabled: L,
                                                        rows: 3,
                                                        className: (0, f.cn)(
                                                            'pl-10',
                                                            D
                                                        ),
                                                        placeholder:
                                                            'Sobre o parceiro...',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Regras',
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'relative',
                                                children: [
                                                    (0, b.jsx)('div', {
                                                        className:
                                                            'pointer-events-none absolute left-3 top-3',
                                                        children: (0, b.jsx)(
                                                            v.FileText,
                                                            {
                                                                className:
                                                                    'h-4 w-4 text-content-brand',
                                                            }
                                                        ),
                                                    }),
                                                    (0, b.jsx)(j.Textarea, {
                                                        value: X,
                                                        onChange: (a) =>
                                                            Y(a.target.value),
                                                        disabled: L,
                                                        rows: 3,
                                                        className: (0, f.cn)(
                                                            'pl-10',
                                                            D
                                                        ),
                                                        placeholder:
                                                            'Condições e regras...',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'grid gap-3 sm:grid-cols-2',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, b.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Link do parceiro (ctaUrl)',
                                                            ' ',
                                                            (0, b.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, b.jsx)(C, {
                                                        icon: p.Link,
                                                        value: Z,
                                                        onChange: (a) =>
                                                            $(a.target.value),
                                                        disabled: L,
                                                        placeholder:
                                                            'https://... ou www...',
                                                        className: E,
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-[11px] text-content-secondary/70',
                                                        children:
                                                            'Aceita http(s) e “www.” (o servidor normaliza).',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, b.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Texto do botão (ctaLabel)',
                                                            ' ',
                                                            (0, b.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, b.jsx)(C, {
                                                        icon: q.ArrowRight,
                                                        value: _,
                                                        onChange: (a) =>
                                                            aa(a.target.value),
                                                        disabled: L,
                                                        placeholder:
                                                            'Ex: Ativar cashback e ir pra loja',
                                                        className: E,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3',
                                        children: [
                                            (0, b.jsx)('div', {
                                                className:
                                                    'flex items-start justify-between gap-4',
                                                children: (0, b.jsxs)('div', {
                                                    children: [
                                                        (0, b.jsx)('p', {
                                                            className:
                                                                'text-sm font-medium text-content-primary',
                                                            children:
                                                                'Visibilidade',
                                                        }),
                                                        (0, b.jsx)('p', {
                                                            className:
                                                                'text-xs text-content-secondary',
                                                            children:
                                                                'ALL: aparece para todas as empresas. SELECTED: aparece só para empresas selecionadas.',
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            (0, b.jsxs)(k.Select, {
                                                value: ab,
                                                onValueChange: (a) => ac(a),
                                                disabled: L,
                                                children: [
                                                    (0, b.jsx)(
                                                        k.SelectTrigger,
                                                        {
                                                            className:
                                                                'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                            children: (0,
                                                            b.jsxs)('div', {
                                                                className:
                                                                    'flex items-center gap-2',
                                                                children: [
                                                                    (0, b.jsx)(
                                                                        s,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4 text-content-brand',
                                                                        }
                                                                    ),
                                                                    (0, b.jsx)(
                                                                        k.SelectValue,
                                                                        {
                                                                            placeholder:
                                                                                'Selecione',
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                        }
                                                    ),
                                                    (0, b.jsx)(
                                                        k.SelectContent,
                                                        {
                                                            children: F.map(
                                                                (a) =>
                                                                    (0, b.jsx)(
                                                                        k.SelectItem,
                                                                        {
                                                                            value: a.value,
                                                                            children:
                                                                                a.label,
                                                                        },
                                                                        a.value
                                                                    )
                                                            ),
                                                        }
                                                    ),
                                                ],
                                            }),
                                            'SELECTED' === ab
                                                ? (0, b.jsxs)('div', {
                                                      className:
                                                          'mt-3 space-y-2',
                                                      children: [
                                                          (0, b.jsxs)('div', {
                                                              className:
                                                                  'flex items-center justify-between gap-2',
                                                              children: [
                                                                  (0, b.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-xs font-medium text-content-primary',
                                                                          children:
                                                                              [
                                                                                  'Empresas selecionadas (',
                                                                                  aq.length,
                                                                                  ')',
                                                                              ],
                                                                      }
                                                                  ),
                                                                  (0, b.jsxs)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'flex items-center gap-2',
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      g.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'outline',
                                                                                          className:
                                                                                              'h-8 px-3',
                                                                                          onClick:
                                                                                              function () {
                                                                                                  let a =
                                                                                                      as.map(
                                                                                                          (
                                                                                                              a
                                                                                                          ) =>
                                                                                                              a.id
                                                                                                      );
                                                                                                  ar(
                                                                                                      (
                                                                                                          b
                                                                                                      ) => {
                                                                                                          let c =
                                                                                                              new Set(
                                                                                                                  b
                                                                                                              );
                                                                                                          return (
                                                                                                              a.forEach(
                                                                                                                  (
                                                                                                                      a
                                                                                                                  ) =>
                                                                                                                      c.add(
                                                                                                                          a
                                                                                                                      )
                                                                                                              ),
                                                                                                              Array.from(
                                                                                                                  c
                                                                                                              )
                                                                                                          );
                                                                                                      }
                                                                                                  );
                                                                                              },
                                                                                          disabled:
                                                                                              am ||
                                                                                              L,
                                                                                          title: 'Selecionar todas as empresas filtradas',
                                                                                          children:
                                                                                              (0,
                                                                                              b.jsxs)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      className:
                                                                                                          'inline-flex items-center gap-2 text-xs',
                                                                                                      children:
                                                                                                          [
                                                                                                              (0,
                                                                                                              b.jsx)(
                                                                                                                  y.Check,
                                                                                                                  {
                                                                                                                      className:
                                                                                                                          'h-4 w-4',
                                                                                                                  }
                                                                                                              ),
                                                                                                              'Selecionar',
                                                                                                          ],
                                                                                                  }
                                                                                              ),
                                                                                      }
                                                                                  ),
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      g.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'ghost',
                                                                                          className:
                                                                                              'h-8 px-3',
                                                                                          onClick:
                                                                                              function () {
                                                                                                  ar(
                                                                                                      []
                                                                                                  );
                                                                                              },
                                                                                          disabled:
                                                                                              am ||
                                                                                              L,
                                                                                          title: 'Limpar seleção',
                                                                                          children:
                                                                                              (0,
                                                                                              b.jsx)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      className:
                                                                                                          'text-xs',
                                                                                                      children:
                                                                                                          'Limpar',
                                                                                                  }
                                                                                              ),
                                                                                      }
                                                                                  ),
                                                                              ],
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, b.jsxs)('div', {
                                                              className:
                                                                  'relative',
                                                              children: [
                                                                  (0, b.jsx)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                          children:
                                                                              (0,
                                                                              b.jsx)(
                                                                                  x.Search,
                                                                                  {
                                                                                      className:
                                                                                          'h-4 w-4 text-content-brand',
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      i.Input,
                                                                      {
                                                                          value: ao,
                                                                          onChange:
                                                                              (
                                                                                  a
                                                                              ) =>
                                                                                  ap(
                                                                                      a
                                                                                          .target
                                                                                          .value
                                                                                  ),
                                                                          disabled:
                                                                              am ||
                                                                              L,
                                                                          placeholder:
                                                                              'Buscar empresa...',
                                                                          className:
                                                                              (0,
                                                                              f.cn)(
                                                                                  'pl-10',
                                                                                  D
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, b.jsx)('div', {
                                                              className:
                                                                  'rounded-xl border border-border-primary bg-background-secondary p-2',
                                                              children: am
                                                                  ? (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex items-center gap-2 p-2 text-xs text-content-secondary',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        z.Loader2,
                                                                                        {
                                                                                            className:
                                                                                                'h-4 w-4 animate-spin',
                                                                                        }
                                                                                    ),
                                                                                    'Carregando empresas...',
                                                                                ],
                                                                        }
                                                                    )
                                                                  : 0 ===
                                                                      as.length
                                                                    ? (0,
                                                                      b.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'p-2 text-xs text-content-secondary',
                                                                              children:
                                                                                  'Nenhuma empresa encontrada.',
                                                                          }
                                                                      )
                                                                    : (0,
                                                                      b.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'max-h-56 overflow-y-auto',
                                                                              children:
                                                                                  as.map(
                                                                                      (
                                                                                          a
                                                                                      ) => {
                                                                                          let c =
                                                                                              aq.includes(
                                                                                                  a.id
                                                                                              );
                                                                                          return (0,
                                                                                          b.jsxs)(
                                                                                              'label',
                                                                                              {
                                                                                                  className:
                                                                                                      (0,
                                                                                                      f.cn)(
                                                                                                          'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-background-tertiary',
                                                                                                          c
                                                                                                              ? 'bg-background-tertiary'
                                                                                                              : ''
                                                                                                      ),
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
                                                                                                                              w.Building2,
                                                                                                                              {
                                                                                                                                  className:
                                                                                                                                      'h-4 w-4 text-content-brand',
                                                                                                                              }
                                                                                                                          ),
                                                                                                                          (0,
                                                                                                                          b.jsx)(
                                                                                                                              'span',
                                                                                                                              {
                                                                                                                                  className:
                                                                                                                                      'text-sm text-content-primary',
                                                                                                                                  children:
                                                                                                                                      a.name,
                                                                                                                              }
                                                                                                                          ),
                                                                                                                          !1 ===
                                                                                                                          a.isActive
                                                                                                                              ? (0,
                                                                                                                                b.jsx)(
                                                                                                                                    'span',
                                                                                                                                    {
                                                                                                                                        className:
                                                                                                                                            'rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] text-red-500',
                                                                                                                                        children:
                                                                                                                                            'inativa',
                                                                                                                                    }
                                                                                                                                )
                                                                                                                              : null,
                                                                                                                      ],
                                                                                                              }
                                                                                                          ),
                                                                                                          (0,
                                                                                                          b.jsx)(
                                                                                                              'input',
                                                                                                              {
                                                                                                                  type: 'checkbox',
                                                                                                                  checked:
                                                                                                                      c,
                                                                                                                  onChange:
                                                                                                                      () => {
                                                                                                                          var b;
                                                                                                                          return (
                                                                                                                              (b =
                                                                                                                                  a.id),
                                                                                                                              void ar(
                                                                                                                                  (
                                                                                                                                      a
                                                                                                                                  ) =>
                                                                                                                                      a.includes(
                                                                                                                                          b
                                                                                                                                      )
                                                                                                                                          ? a.filter(
                                                                                                                                                (
                                                                                                                                                    a
                                                                                                                                                ) =>
                                                                                                                                                    a !==
                                                                                                                                                    b
                                                                                                                                            )
                                                                                                                                          : [
                                                                                                                                                ...a,
                                                                                                                                                b,
                                                                                                                                            ]
                                                                                                                              )
                                                                                                                          );
                                                                                                                      },
                                                                                                                  disabled:
                                                                                                                      L,
                                                                                                                  className:
                                                                                                                      'h-4 w-4 accent-(--brand)',
                                                                                                              }
                                                                                                          ),
                                                                                                      ],
                                                                                              },
                                                                                              a.id
                                                                                          );
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                          }),
                                                          av
                                                              ? (0, b.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-red-500',
                                                                        children:
                                                                            'Se estiver em SELECTED, você precisa selecionar pelo menos 1 empresa.',
                                                                    }
                                                                )
                                                              : (0, b.jsxs)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-content-secondary/70',
                                                                        children:
                                                                            [
                                                                                'Essas empresas vão no payload como',
                                                                                ' ',
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'span',
                                                                                    {
                                                                                        className:
                                                                                            'text-content-primary',
                                                                                        children:
                                                                                            'companyIds',
                                                                                    }
                                                                                ),
                                                                                ' ',
                                                                                'para o backend atualizar os vínculos.',
                                                                            ],
                                                                    }
                                                                ),
                                                      ],
                                                  })
                                                : (0, b.jsx)('p', {
                                                      className:
                                                          'mt-2 text-[11px] text-content-secondary/70',
                                                      children:
                                                          'Em ALL, não precisa selecionar empresas.',
                                                  }),
                                        ],
                                    }),
                                    (0, b.jsx)('div', {
                                        className: 'grid gap-3 sm:grid-cols-2',
                                        children: (0, b.jsxs)('div', {
                                            className: 'space-y-2',
                                            children: [
                                                (0, b.jsxs)('label', {
                                                    className:
                                                        'text-label-small text-content-secondary',
                                                    children: [
                                                        'Ordem (menor aparece primeiro)',
                                                        ' ',
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-red-500',
                                                            children: '*',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)(C, {
                                                    icon: r.ListOrdered,
                                                    value: ad,
                                                    onChange: (a) =>
                                                        ae(a.target.value),
                                                    disabled: L,
                                                    inputMode: 'numeric',
                                                    placeholder: 'Ex: 100',
                                                    className: D,
                                                }),
                                                (0, b.jsx)('p', {
                                                    className:
                                                        'text-[11px] text-content-secondary/70',
                                                    children:
                                                        'Menor aparece primeiro.',
                                                }),
                                            ],
                                        }),
                                    }),
                                    (0, b.jsx)('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: (0, b.jsx)(g.Button, {
                                            type: 'button',
                                            variant: 'brand',
                                            disabled: L || ax,
                                            onClick: ay,
                                            title: aw
                                                ? 'Aguarde carregar as empresas'
                                                : ag
                                                  ? 'Aguarde o upload da imagem'
                                                  : av
                                                    ? 'Selecione pelo menos 1 empresa'
                                                    : au
                                                      ? 'Preencha os campos obrigatórios'
                                                      : void 0,
                                            children: L
                                                ? 'Salvando...'
                                                : 'Salvar alterações',
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        function K({ children: a, variant: c = 'neutral' }) {
            return (0, b.jsx)('span', {
                className: (0, f.cn)(
                    'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
                    'success' === c
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                        : 'danger' === c
                          ? 'bg-rose-500/10 text-rose-700 border-rose-500/20'
                          : 'bg-black/5 text-content-secondary border-border-primary'
                ),
                children: a,
            });
        }
        function L({ isActive: a, title: c }) {
            return (0, b.jsx)('span', {
                title: c,
                className: (0, f.cn)(
                    'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                    a
                        ? 'bg-green-500/15 text-green-600 border-green-500/30'
                        : 'bg-red-500/15 text-red-600 border-red-500/30'
                ),
                children: a ? 'Ativo' : 'Inativo',
            });
        }
        function M({ src: a, name: d }) {
            let [e, f] = c.useState(!1),
                g = !!(a && String(a).trim().length);
            return (0, b.jsx)('div', {
                className:
                    'h-10 w-10 overflow-hidden rounded-lg border border-border-primary bg-background-secondary flex items-center justify-center',
                children:
                    g && !e
                        ? (0, b.jsx)('img', {
                              src: String(a),
                              alt: d,
                              className: 'h-full w-full object-cover',
                              loading: 'lazy',
                              onError: () => f(!0),
                          })
                        : (0, b.jsx)('span', {
                              className:
                                  'text-[11px] font-semibold text-content-secondary',
                              children: (d || '?')
                                  .trim()
                                  .split(/\s+/)
                                  .filter(Boolean)
                                  .map((a) => a[0])
                                  .join('')
                                  .slice(0, 2)
                                  .toUpperCase(),
                          }),
            });
        }
        function N({ partner: a }) {
            let f = (0, d.useRouter)(),
                [h, i] = c.useTransition();
            return (0, b.jsxs)('tr', {
                className: 'border-t border-border-primary',
                children: [
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsxs)('div', {
                            className: 'flex items-center gap-3',
                            children: [
                                (0, b.jsx)(M, { src: a.logoUrl, name: a.name }),
                                (0, b.jsxs)('div', {
                                    className: 'min-w-0',
                                    children: [
                                        (0, b.jsx)('p', {
                                            className:
                                                'truncate font-semibold text-content-primary',
                                            children: a.name,
                                        }),
                                        (0, b.jsx)('p', {
                                            className:
                                                'truncate text-xs text-content-secondary',
                                            children: a.ctaUrl ?? '—',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsx)(K, {
                            variant: 'neutral',
                            children:
                                Number(a.discountPct ?? 0) > 0
                                    ? `${a.discountPct}% OFF`
                                    : '—',
                        }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsx)(K, {
                            variant: 'neutral',
                            children:
                                'SELECTED' === a.visibilityMode
                                    ? 'SELECTED'
                                    : 'ALL',
                        }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsx)('span', {
                            className:
                                'text-xs font-semibold text-content-secondary',
                            children: a.sortOrder ?? 100,
                        }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsx)(L, { isActive: !!a.isActive }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-right',
                        children: (0, b.jsxs)('div', {
                            className: 'inline-flex items-center gap-2',
                            children: [
                                (0, b.jsx)(J, {
                                    partner: {
                                        id: a.id,
                                        name: a.name,
                                        logoUrl: a.logoUrl ?? null,
                                        logoKey: a.logoKey ?? null,
                                        discountPct: Number(a.discountPct ?? 0),
                                        description: a.description ?? null,
                                        rules: a.rules ?? null,
                                        ctaUrl: a.ctaUrl ?? '',
                                        ctaLabel: a.ctaLabel ?? null,
                                        isActive: !!a.isActive,
                                        visibilityMode:
                                            a.visibilityMode ?? 'ALL',
                                        sortOrder: Number(a.sortOrder ?? 100),
                                        createdAt: a.createdAt,
                                        updatedAt: a.updatedAt,
                                    },
                                }),
                                (0, b.jsx)(g.Button, {
                                    variant: a.isActive
                                        ? 'destructive'
                                        : 'active',
                                    size: 'sm',
                                    type: 'button',
                                    className:
                                        'border-border-primary hover:bg-muted/40',
                                    onClick: function () {
                                        i(async () => {
                                            try {
                                                let b = await fetch(
                                                        `/api/plataform/partners/${a.id}`,
                                                        {
                                                            method: 'PATCH',
                                                            headers: {
                                                                'Content-Type':
                                                                    'application/json',
                                                            },
                                                            body: JSON.stringify(
                                                                {
                                                                    toggleActive:
                                                                        !0,
                                                                }
                                                            ),
                                                        }
                                                    ),
                                                    c = await b
                                                        .json()
                                                        .catch(() => null);
                                                if (
                                                    !b.ok ||
                                                    !c ||
                                                    !0 !== c.ok
                                                ) {
                                                    let a =
                                                        c?.error ||
                                                        'Não foi possível alterar o status do parceiro.';
                                                    e.toast.error(a);
                                                    return;
                                                }
                                                (e.toast.success(
                                                    a.isActive
                                                        ? 'Parceiro desativado.'
                                                        : 'Parceiro ativado.'
                                                ),
                                                    f.refresh());
                                            } catch {
                                                e.toast.error(
                                                    'Erro de rede ao alterar status do parceiro.'
                                                );
                                            }
                                        });
                                    },
                                    disabled: h,
                                    title: h ? 'Processando...' : void 0,
                                    children: h
                                        ? 'Aguarde...'
                                        : a.isActive
                                          ? 'Desativar'
                                          : 'Ativar',
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        a.s(['PartnerRow', () => N], 152888);
    },
    832241,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(259849),
            e = a.i(814574),
            f = a.i(699570),
            g = a.i(866718),
            h = a.i(429246),
            i = a.i(580701),
            j = a.i(156916),
            k = a.i(368114),
            l = a.i(447067),
            m = a.i(273819),
            n = a.i(163061),
            o = a.i(450954),
            p = a.i(534375),
            q = a.i(90083),
            r = a.i(597635),
            s = a.i(300298);
        let t = (0, a.i(203431).default)('sliders-horizontal', [
            ['path', { d: 'M10 5H3', key: '1qgfaw' }],
            ['path', { d: 'M12 19H3', key: 'yhmn1j' }],
            ['path', { d: 'M14 3v4', key: '1sua03' }],
            ['path', { d: 'M16 17v4', key: '1q0r14' }],
            ['path', { d: 'M21 12h-9', key: '1o4lsq' }],
            ['path', { d: 'M21 19h-5', key: '1rlt1p' }],
            ['path', { d: 'M21 5h-7', key: '1oszz2' }],
            ['path', { d: 'M8 10v4', key: 'tgpxqk' }],
            ['path', { d: 'M8 12H3', key: 'a7s4jb' }],
        ]);
        var u = a.i(384378),
            v = a.i(319895),
            w = a.i(263758),
            x = a.i(50900),
            y = a.i(638446),
            z = a.i(198803);
        function A(a) {
            let b = String(a ?? '').trim();
            if (!b) return null;
            let c = b.toLowerCase();
            return c.startsWith('javascript:') || c.startsWith('data:')
                ? null
                : c.startsWith('http://') || c.startsWith('https://')
                  ? b
                  : c.startsWith('www.')
                    ? `https://${b}`
                    : null;
        }
        function B(a) {
            let b = String(a ?? '').trim();
            if (!b) return !1;
            let c = b.toLowerCase();
            return (
                !(
                    c.startsWith('javascript:') ||
                    c.startsWith('data:') ||
                    c.startsWith('blob:')
                ) &&
                !!(
                    b.startsWith('/media/') ||
                    b.startsWith('/uploads/') ||
                    c.startsWith('http://') ||
                    c.startsWith('https://')
                )
            );
        }
        function C(a) {
            let { icon: c, className: d, ...e } = a;
            return (0, b.jsxs)('div', {
                className: 'relative',
                children: [
                    (0, b.jsx)('div', {
                        className:
                            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                        children: (0, b.jsx)(c, {
                            className: 'h-4 w-4 text-content-brand',
                        }),
                    }),
                    (0, b.jsx)(g.Input, {
                        ...e,
                        className: (0, k.cn)('pl-10', d),
                    }),
                ],
            });
        }
        let D =
                'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
            E =
                'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';
        async function F(a) {
            try {
                return await a.json();
            } catch {
                return null;
            }
        }
        async function G() {
            let a = await fetch('/api/plataform/companies/options', {
                method: 'GET',
            });
            if (!a.ok) return [];
            let b = await F(a);
            if (!b || !0 !== b.ok) return [];
            let c = b.companies ?? b.items ?? b.data ?? b.list ?? [];
            return Array.isArray(c)
                ? c
                      .map((a) => ({
                          id: String(a?.id ?? '').trim(),
                          name: String(a?.name ?? a?.title ?? '').trim(),
                          isActive:
                              'boolean' == typeof a?.isActive
                                  ? a.isActive
                                  : void 0,
                      }))
                      .filter((a) => a.id && a.name)
                : [];
        }
        function H() {
            let a = (0, d.useRouter)(),
                [F, H] = c.useState(!1),
                [I, J] = c.useTransition(),
                [K, L] = c.useState(''),
                [M, N] = c.useState(''),
                [O, P] = c.useState(''),
                [Q, R] = c.useState(''),
                [S, T] = c.useState(''),
                [U, V] = c.useState(''),
                [W, X] = c.useState(''),
                [Y, Z] = c.useState('Ativar cashback e ir pra loja'),
                [$, _] = c.useState('ALL'),
                [aa, ab] = c.useState('100'),
                ac = c.useRef(null),
                [ad, ae] = c.useState(!1),
                [af, ag] = c.useState(!1),
                [ah, ai] = c.useState([]),
                [aj, ak] = c.useState(!1),
                [al, am] = c.useState(''),
                [an, ao] = c.useState([]);
            (c.useEffect(() => {
                !F &&
                    (L(''),
                    N(''),
                    P(''),
                    R(''),
                    T(''),
                    V(''),
                    X(''),
                    Z('Ativar cashback e ir pra loja'),
                    _('ALL'),
                    ab('100'),
                    ao([]),
                    am(''),
                    ae(!1),
                    ag(!1),
                    ac.current && (ac.current.value = ''));
            }, [F]),
                c.useEffect(() => {
                    if (!F) return;
                    let a = !0;
                    return (
                        (async function () {
                            ak(!0);
                            try {
                                let b = await G();
                                if (!a) return;
                                (b.length ||
                                    j.toast.error(
                                        'Não encontrei empresas para listar. Verifique /api/plataform/companies/options.'
                                    ),
                                    ai(b));
                            } catch {
                                if (!a) return;
                                j.toast.error('Erro ao carregar empresas.');
                            } finally {
                                if (!a) return;
                                ak(!1);
                            }
                        })(),
                        () => {
                            a = !1;
                        }
                    );
                }, [F]),
                c.useEffect(() => {
                    'ALL' !== $ || (0 !== an.length && ao([]));
                }, [$]),
                c.useEffect(() => {
                    ag(!1);
                }, [M]));
            let ap = c.useMemo(() => {
                    let a = al.trim().toLowerCase();
                    return a
                        ? ah.filter((b) =>
                              String(b.name ?? '')
                                  .toLowerCase()
                                  .includes(a)
                          )
                        : ah;
                }, [ah, al]),
                aq =
                    !K.trim() ||
                    !M.trim() ||
                    !W.trim() ||
                    !Y.trim() ||
                    !aa.trim(),
                ar = 'SELECTED' === $ && 0 === an.length,
                as = 'SELECTED' === $ && aj,
                at = aq || ar || ad || as;
            async function au(a) {
                if (!a.type?.startsWith('image/'))
                    return void j.toast.error(
                        'Selecione um arquivo de imagem.'
                    );
                if (a.size > 5242880)
                    return void j.toast.error(
                        `Imagem muito grande. M\xe1ximo: 5MB.`
                    );
                ae(!0);
                try {
                    let b = new FormData();
                    (b.append('file', a), b.append('module', 'PARTNERS'));
                    let c = await fetch('/api/admin/uploads', {
                            method: 'POST',
                            body: b,
                        }),
                        d = await c.json().catch(() => null);
                    if (!c.ok || !d || !0 !== d.ok) {
                        let a =
                            (d && !1 === d.ok && d.error) ||
                            'Não foi possível fazer upload da imagem.';
                        j.toast.error(a);
                        return;
                    }
                    let e = String(d.data.url ?? '').trim();
                    if (!B(e))
                        return void j.toast.error(
                            'Upload retornou uma URL inválida para o parceiro. O esperado é /media/... (recomendado), /uploads/... (legado) ou http(s).'
                        );
                    (N(e),
                        P(String(d.data.key ?? '').trim()),
                        ag(!1),
                        j.toast.success('Logo enviada!'));
                } catch {
                    j.toast.error('Erro de rede ao fazer upload da logo.');
                } finally {
                    ae(!1);
                }
            }
            async function av() {
                let b, c, d, e;
                if (at)
                    return as
                        ? void j.toast.error(
                              'Aguarde carregar as empresas antes de criar.'
                          )
                        : ar
                          ? void j.toast.error(
                                'Selecione pelo menos 1 empresa para SELECTED.'
                            )
                          : M.trim()
                            ? void j.toast.error(
                                  'Preencha os campos obrigatórios antes de criar.'
                              )
                            : void j.toast.error('Logo é obrigatória.');
                let f =
                    ((b =
                        (function (a) {
                            let b = String(a ?? '').trim();
                            if (!b) return null;
                            let c = Number(b.replace(',', '.'));
                            return Number.isFinite(c)
                                ? Math.max(0, Math.min(100, Math.floor(c)))
                                : null;
                        })(Q) ?? 0),
                    (c = (function (a) {
                        let b = String(a ?? '').trim();
                        if (!b) return null;
                        let c = Number(b.replace(',', '.'));
                        return Number.isFinite(c) ? Math.floor(c) : null;
                    })(aa)),
                    (d = A(W)),
                    (e = 'SELECTED' === $ ? an : []),
                    {
                        name: K.trim(),
                        logoUrl: M.trim(),
                        logoKey: O.trim() || null,
                        discountPct: b,
                        description: String(S ?? '').trim() || null,
                        rules: String(U ?? '').trim() || null,
                        ctaUrl: d ?? W.trim(),
                        ctaLabel: Y.trim() || 'Ativar cashback e ir pra loja',
                        isActive: !0,
                        visibilityMode: $,
                        sortOrder: Number.isFinite(c) ? Number(c) : 100,
                        companyIds: e,
                    });
                if (!f.name) return void j.toast.error('Nome é obrigatório.');
                if (!f.logoUrl)
                    return void j.toast.error('Logo é obrigatória.');
                if (!B(f.logoUrl))
                    return void j.toast.error(
                        'logoUrl inválida. Envie uma imagem (/media ou /uploads) ou forneça uma URL http(s) válida.'
                    );
                let g = Number(f.discountPct);
                if (!Number.isFinite(g) || g < 0 || g > 100)
                    return void j.toast.error('Desconto inválido (0 a 100).');
                let h = Number(f.sortOrder);
                if (!Number.isFinite(h) || h < 0)
                    return void j.toast.error('Ordem inválida (0 ou maior).');
                let i = A(f.ctaUrl);
                i
                    ? J(async () => {
                          try {
                              let b = await fetch('/api/plataform/partners', {
                                      method: 'POST',
                                      headers: {
                                          'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({ ...f, ctaUrl: i }),
                                  }),
                                  c = await b.json().catch(() => null);
                              if (!b.ok || !c || !0 !== c.ok) {
                                  let a =
                                      c?.error ||
                                      'Não foi possível criar o parceiro. Tente novamente.';
                                  j.toast.error(a);
                                  return;
                              }
                              (j.toast.success('Parceiro criado com sucesso!'),
                                  H(!1),
                                  a.refresh());
                          } catch {
                              j.toast.error('Erro de rede ao criar parceiro.');
                          }
                      })
                    : j.toast.error(
                          'CTA URL inválida. Use http(s) ou comece com www.'
                      );
            }
            let aw = M.trim() ? M.trim() : null;
            return (0, b.jsxs)(e.Dialog, {
                open: F,
                onOpenChange: (a) => !I && !ad && H(a),
                children: [
                    (0, b.jsx)(e.DialogTrigger, {
                        asChild: !0,
                        children: (0, b.jsx)(f.Button, {
                            variant: 'brand',
                            children: 'Novo parceiro',
                        }),
                    }),
                    (0, b.jsxs)(e.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, b.jsx)(e.DialogHeader, {
                                children: (0, b.jsx)(e.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Novo parceiro',
                                }),
                            }),
                            (0, b.jsxs)('div', {
                                className: 'space-y-4 pb-2',
                                children: [
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Nome do parceiro',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)(C, {
                                                icon: l.Handshake,
                                                value: K,
                                                onChange: (a) =>
                                                    L(a.target.value),
                                                disabled: I,
                                                className: D,
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Logo / imagem',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)('input', {
                                                ref: ac,
                                                type: 'file',
                                                accept: 'image/*',
                                                className: 'hidden',
                                                disabled: I || ad,
                                                onChange: (a) => {
                                                    let b =
                                                        a.currentTarget
                                                            .files?.[0];
                                                    b && au(b);
                                                },
                                            }),
                                            (0, b.jsxs)('div', {
                                                className:
                                                    'grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start',
                                                children: [
                                                    (0, b.jsxs)('div', {
                                                        className: 'space-y-2',
                                                        children: [
                                                            (0, b.jsxs)('div', {
                                                                className:
                                                                    'relative',
                                                                children: [
                                                                    (0, b.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                            children:
                                                                                (0,
                                                                                b.jsx)(
                                                                                    m.Image,
                                                                                    {
                                                                                        className:
                                                                                            'h-4 w-4 text-content-brand',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                    (0, b.jsx)(
                                                                        g.Input,
                                                                        {
                                                                            value:
                                                                                aw ??
                                                                                '',
                                                                            readOnly:
                                                                                !0,
                                                                            placeholder:
                                                                                'Escolha seu arquivo clicando em Upload.',
                                                                            className:
                                                                                (0,
                                                                                k.cn)(
                                                                                    'pl-10 pr-10',
                                                                                    D
                                                                                ),
                                                                        }
                                                                    ),
                                                                    aw
                                                                        ? (0,
                                                                          b.jsx)(
                                                                              'button',
                                                                              {
                                                                                  type: 'button',
                                                                                  className:
                                                                                      'absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary hover:text-content-primary',
                                                                                  onClick:
                                                                                      () => {
                                                                                          (N(
                                                                                              ''
                                                                                          ),
                                                                                              P(
                                                                                                  ''
                                                                                              ),
                                                                                              ag(
                                                                                                  !1
                                                                                              ),
                                                                                              ac.current &&
                                                                                                  (ac.current.value =
                                                                                                      ''));
                                                                                      },
                                                                                  disabled:
                                                                                      I ||
                                                                                      ad,
                                                                                  title: 'Remover imagem',
                                                                                  children:
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          s.X,
                                                                                          {
                                                                                              className:
                                                                                                  'h-4 w-4',
                                                                                          }
                                                                                      ),
                                                                              }
                                                                          )
                                                                        : null,
                                                                ],
                                                            }),
                                                            O
                                                                ? (0, b.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-[11px] text-content-secondary/70',
                                                                          children:
                                                                              [
                                                                                  'key:',
                                                                                  ' ',
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      'span',
                                                                                      {
                                                                                          className:
                                                                                              'text-content-primary',
                                                                                          children:
                                                                                              O,
                                                                                      }
                                                                                  ),
                                                                              ],
                                                                      }
                                                                  )
                                                                : null,
                                                        ],
                                                    }),
                                                    (0, b.jsx)(f.Button, {
                                                        type: 'button',
                                                        variant: 'brand',
                                                        className: 'h-10',
                                                        onClick: () =>
                                                            ac.current?.click(),
                                                        disabled: I || ad,
                                                        title: ad
                                                            ? 'Enviando...'
                                                            : void 0,
                                                        children: (0, b.jsxs)(
                                                            'span',
                                                            {
                                                                className:
                                                                    'inline-flex items-center gap-2',
                                                                children: [
                                                                    (0, b.jsx)(
                                                                        r.Upload,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4',
                                                                        }
                                                                    ),
                                                                    ad
                                                                        ? 'Enviando...'
                                                                        : 'Upload',
                                                                ],
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            aw
                                                ? (0, b.jsx)('div', {
                                                      className:
                                                          'overflow-hidden rounded-xl border border-border-primary bg-background-tertiary',
                                                      children: (0, b.jsx)(
                                                          'div',
                                                          {
                                                              className:
                                                                  'h-40 w-full flex items-center justify-center',
                                                              children: af
                                                                  ? (0, b.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'h-40 w-full flex items-center justify-center',
                                                                            children:
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'h-16 w-16 rounded-2xl border border-border-primary bg-background-secondary flex items-center justify-center',
                                                                                        children:
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                'span',
                                                                                                {
                                                                                                    className:
                                                                                                        'text-sm font-semibold text-content-secondary',
                                                                                                    children:
                                                                                                        (
                                                                                                            K ||
                                                                                                            '?'
                                                                                                        )
                                                                                                            .trim()
                                                                                                            .split(
                                                                                                                /\s+/
                                                                                                            )
                                                                                                            .filter(
                                                                                                                Boolean
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
                                                                        }
                                                                    )
                                                                  : (0, b.jsx)(
                                                                        'img',
                                                                        {
                                                                            src: aw,
                                                                            alt: 'Preview da logo',
                                                                            className:
                                                                                'h-40 w-full object-cover',
                                                                            onError:
                                                                                () =>
                                                                                    ag(
                                                                                        !0
                                                                                    ),
                                                                        }
                                                                    ),
                                                          }
                                                      ),
                                                  })
                                                : null,
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'grid gap-3 sm:grid-cols-2',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, b.jsx)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children:
                                                            'Desconto (%)',
                                                    }),
                                                    (0, b.jsx)(C, {
                                                        icon: o.BadgePercent,
                                                        value: Q,
                                                        onChange: (a) =>
                                                            R(a.target.value),
                                                        disabled: I,
                                                        inputMode: 'numeric',
                                                        placeholder: 'Ex: 10',
                                                        className: D,
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-[11px] text-content-secondary/70',
                                                        children:
                                                            'O servidor normaliza para 0–100.',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, b.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Ordem (menor aparece primeiro)',
                                                            ' ',
                                                            (0, b.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, b.jsx)(C, {
                                                        icon: u.ListOrdered,
                                                        value: aa,
                                                        onChange: (a) =>
                                                            ab(a.target.value),
                                                        disabled: I,
                                                        inputMode: 'numeric',
                                                        placeholder: 'Ex: 100',
                                                        className: D,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3',
                                        children: [
                                            (0, b.jsx)('div', {
                                                className:
                                                    'flex items-start justify-between gap-4',
                                                children: (0, b.jsx)('div', {
                                                    children: (0, b.jsx)('p', {
                                                        className:
                                                            'text-sm font-medium text-content-primary',
                                                        children:
                                                            'Visibilidade',
                                                    }),
                                                }),
                                            }),
                                            (0, b.jsxs)(i.Select, {
                                                value: $,
                                                onValueChange: (a) => _(a),
                                                disabled: I,
                                                children: [
                                                    (0, b.jsx)(
                                                        i.SelectTrigger,
                                                        {
                                                            className:
                                                                'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                            children: (0,
                                                            b.jsxs)('div', {
                                                                className:
                                                                    'flex items-center gap-2',
                                                                children: [
                                                                    (0, b.jsx)(
                                                                        t,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4 text-content-brand',
                                                                        }
                                                                    ),
                                                                    (0, b.jsx)(
                                                                        i.SelectValue,
                                                                        {
                                                                            placeholder:
                                                                                'Selecione',
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                        }
                                                    ),
                                                    (0, b.jsxs)(
                                                        i.SelectContent,
                                                        {
                                                            children: [
                                                                (0, b.jsx)(
                                                                    i.SelectItem,
                                                                    {
                                                                        value: 'ALL',
                                                                        children:
                                                                            'Todas as empresas',
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    i.SelectItem,
                                                                    {
                                                                        value: 'SELECTED',
                                                                        children:
                                                                            'Empresas selecionadas',
                                                                    }
                                                                ),
                                                            ],
                                                        }
                                                    ),
                                                ],
                                            }),
                                            'SELECTED' === $
                                                ? (0, b.jsxs)('div', {
                                                      className:
                                                          'mt-3 space-y-2',
                                                      children: [
                                                          (0, b.jsxs)('div', {
                                                              className:
                                                                  'flex items-center justify-between gap-2',
                                                              children: [
                                                                  (0, b.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-xs font-medium text-content-primary',
                                                                          children:
                                                                              [
                                                                                  'Empresas selecionadas (',
                                                                                  an.length,
                                                                                  ')',
                                                                              ],
                                                                      }
                                                                  ),
                                                                  (0, b.jsxs)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'flex items-center gap-2',
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      f.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'outline',
                                                                                          className:
                                                                                              'h-8 px-3',
                                                                                          onClick:
                                                                                              function () {
                                                                                                  let a =
                                                                                                      ap.map(
                                                                                                          (
                                                                                                              a
                                                                                                          ) =>
                                                                                                              a.id
                                                                                                      );
                                                                                                  ao(
                                                                                                      (
                                                                                                          b
                                                                                                      ) => {
                                                                                                          let c =
                                                                                                              new Set(
                                                                                                                  b
                                                                                                              );
                                                                                                          return (
                                                                                                              a.forEach(
                                                                                                                  (
                                                                                                                      a
                                                                                                                  ) =>
                                                                                                                      c.add(
                                                                                                                          a
                                                                                                                      )
                                                                                                              ),
                                                                                                              Array.from(
                                                                                                                  c
                                                                                                              )
                                                                                                          );
                                                                                                      }
                                                                                                  );
                                                                                              },
                                                                                          disabled:
                                                                                              aj ||
                                                                                              I,
                                                                                          title: 'Selecionar todas as empresas filtradas',
                                                                                          children:
                                                                                              (0,
                                                                                              b.jsxs)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      className:
                                                                                                          'inline-flex items-center gap-2 text-xs',
                                                                                                      children:
                                                                                                          [
                                                                                                              (0,
                                                                                                              b.jsx)(
                                                                                                                  y.Check,
                                                                                                                  {
                                                                                                                      className:
                                                                                                                          'h-4 w-4',
                                                                                                                  }
                                                                                                              ),
                                                                                                              'Selecionar',
                                                                                                          ],
                                                                                                  }
                                                                                              ),
                                                                                      }
                                                                                  ),
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      f.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'ghost',
                                                                                          className:
                                                                                              'h-8 px-3',
                                                                                          onClick:
                                                                                              function () {
                                                                                                  ao(
                                                                                                      []
                                                                                                  );
                                                                                              },
                                                                                          disabled:
                                                                                              aj ||
                                                                                              I,
                                                                                          title: 'Limpar seleção',
                                                                                          children:
                                                                                              (0,
                                                                                              b.jsx)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      className:
                                                                                                          'text-xs',
                                                                                                      children:
                                                                                                          'Limpar',
                                                                                                  }
                                                                                              ),
                                                                                      }
                                                                                  ),
                                                                              ],
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, b.jsxs)('div', {
                                                              className:
                                                                  'relative',
                                                              children: [
                                                                  (0, b.jsx)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                          children:
                                                                              (0,
                                                                              b.jsx)(
                                                                                  x.Search,
                                                                                  {
                                                                                      className:
                                                                                          'h-4 w-4 text-content-brand',
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, b.jsx)(
                                                                      g.Input,
                                                                      {
                                                                          value: al,
                                                                          onChange:
                                                                              (
                                                                                  a
                                                                              ) =>
                                                                                  am(
                                                                                      a
                                                                                          .target
                                                                                          .value
                                                                                  ),
                                                                          disabled:
                                                                              aj ||
                                                                              I,
                                                                          placeholder:
                                                                              'Buscar empresa...',
                                                                          className:
                                                                              (0,
                                                                              k.cn)(
                                                                                  'pl-10',
                                                                                  D
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, b.jsx)('div', {
                                                              className:
                                                                  'rounded-xl border border-border-primary bg-background-secondary p-2',
                                                              children: aj
                                                                  ? (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex items-center gap-2 p-2 text-xs text-content-secondary',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        z.Loader2,
                                                                                        {
                                                                                            className:
                                                                                                'h-4 w-4 animate-spin',
                                                                                        }
                                                                                    ),
                                                                                    'Carregando empresas...',
                                                                                ],
                                                                        }
                                                                    )
                                                                  : 0 ===
                                                                      ap.length
                                                                    ? (0,
                                                                      b.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'p-2 text-xs text-content-secondary',
                                                                              children:
                                                                                  'Nenhuma empresa encontrada.',
                                                                          }
                                                                      )
                                                                    : (0,
                                                                      b.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'max-h-56 overflow-y-auto',
                                                                              children:
                                                                                  ap.map(
                                                                                      (
                                                                                          a
                                                                                      ) => {
                                                                                          let c =
                                                                                              an.includes(
                                                                                                  a.id
                                                                                              );
                                                                                          return (0,
                                                                                          b.jsxs)(
                                                                                              'label',
                                                                                              {
                                                                                                  className:
                                                                                                      (0,
                                                                                                      k.cn)(
                                                                                                          'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-background-tertiary',
                                                                                                          c
                                                                                                              ? 'bg-background-tertiary'
                                                                                                              : ''
                                                                                                      ),
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
                                                                                                                              w.Building2,
                                                                                                                              {
                                                                                                                                  className:
                                                                                                                                      'h-4 w-4 text-content-brand',
                                                                                                                              }
                                                                                                                          ),
                                                                                                                          (0,
                                                                                                                          b.jsx)(
                                                                                                                              'span',
                                                                                                                              {
                                                                                                                                  className:
                                                                                                                                      'text-sm text-content-primary',
                                                                                                                                  children:
                                                                                                                                      a.name,
                                                                                                                              }
                                                                                                                          ),
                                                                                                                          !1 ===
                                                                                                                          a.isActive
                                                                                                                              ? (0,
                                                                                                                                b.jsx)(
                                                                                                                                    'span',
                                                                                                                                    {
                                                                                                                                        className:
                                                                                                                                            'rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] text-red-500',
                                                                                                                                        children:
                                                                                                                                            'inativa',
                                                                                                                                    }
                                                                                                                                )
                                                                                                                              : null,
                                                                                                                      ],
                                                                                                              }
                                                                                                          ),
                                                                                                          (0,
                                                                                                          b.jsx)(
                                                                                                              'input',
                                                                                                              {
                                                                                                                  type: 'checkbox',
                                                                                                                  checked:
                                                                                                                      c,
                                                                                                                  onChange:
                                                                                                                      () => {
                                                                                                                          var b;
                                                                                                                          return (
                                                                                                                              (b =
                                                                                                                                  a.id),
                                                                                                                              void ao(
                                                                                                                                  (
                                                                                                                                      a
                                                                                                                                  ) =>
                                                                                                                                      a.includes(
                                                                                                                                          b
                                                                                                                                      )
                                                                                                                                          ? a.filter(
                                                                                                                                                (
                                                                                                                                                    a
                                                                                                                                                ) =>
                                                                                                                                                    a !==
                                                                                                                                                    b
                                                                                                                                            )
                                                                                                                                          : [
                                                                                                                                                ...a,
                                                                                                                                                b,
                                                                                                                                            ]
                                                                                                                              )
                                                                                                                          );
                                                                                                                      },
                                                                                                                  disabled:
                                                                                                                      I,
                                                                                                                  className:
                                                                                                                      'h-4 w-4 accent-(--brand)',
                                                                                                              }
                                                                                                          ),
                                                                                                      ],
                                                                                              },
                                                                                              a.id
                                                                                          );
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                          }),
                                                          ar
                                                              ? (0, b.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-red-500',
                                                                        children:
                                                                            'Se estiver em SELECTED, você precisa selecionar pelo menos 1 empresa.',
                                                                    }
                                                                )
                                                              : (0, b.jsxs)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-content-secondary/70',
                                                                        children:
                                                                            [
                                                                                'Essas empresas vão no payload como',
                                                                                ' ',
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'span',
                                                                                    {
                                                                                        className:
                                                                                            'text-content-primary',
                                                                                        children:
                                                                                            'companyIds',
                                                                                    }
                                                                                ),
                                                                                ' ',
                                                                                'para o backend criar os vínculos.',
                                                                            ],
                                                                    }
                                                                ),
                                                      ],
                                                  })
                                                : (0, b.jsx)('p', {
                                                      className:
                                                          'mt-2 text-[11px] text-content-secondary/70',
                                                      children:
                                                          'Em ALL, não precisa selecionar empresas.',
                                                  }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'grid gap-3 sm:grid-cols-2',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, b.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Link do parceiro (ctaUrl)',
                                                            ' ',
                                                            (0, b.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, b.jsx)(C, {
                                                        icon: p.Link,
                                                        value: W,
                                                        onChange: (a) =>
                                                            X(a.target.value),
                                                        disabled: I,
                                                        placeholder:
                                                            'https://... ou www...',
                                                        className: E,
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-[11px] text-content-secondary/70',
                                                        children:
                                                            'Aceita http(s) e “www.” (o servidor normaliza).',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, b.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Texto do botão (ctaLabel)',
                                                            ' ',
                                                            (0, b.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, b.jsx)(C, {
                                                        icon: q.ArrowRight,
                                                        value: Y,
                                                        onChange: (a) =>
                                                            Z(a.target.value),
                                                        disabled: I,
                                                        className: E,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Descrição',
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'relative',
                                                children: [
                                                    (0, b.jsx)('div', {
                                                        className:
                                                            'pointer-events-none absolute left-3 top-3',
                                                        children: (0, b.jsx)(
                                                            n.AlignLeft,
                                                            {
                                                                className:
                                                                    'h-4 w-4 text-content-brand',
                                                            }
                                                        ),
                                                    }),
                                                    (0, b.jsx)(h.Textarea, {
                                                        value: S,
                                                        onChange: (a) =>
                                                            T(a.target.value),
                                                        disabled: I,
                                                        rows: 3,
                                                        className: (0, k.cn)(
                                                            'pl-10',
                                                            D
                                                        ),
                                                        placeholder:
                                                            'Sobre o parceiro...',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Regras',
                                            }),
                                            (0, b.jsxs)('div', {
                                                className: 'relative',
                                                children: [
                                                    (0, b.jsx)('div', {
                                                        className:
                                                            'pointer-events-none absolute left-3 top-3',
                                                        children: (0, b.jsx)(
                                                            v.FileText,
                                                            {
                                                                className:
                                                                    'h-4 w-4 text-content-brand',
                                                            }
                                                        ),
                                                    }),
                                                    (0, b.jsx)(h.Textarea, {
                                                        value: U,
                                                        onChange: (a) =>
                                                            V(a.target.value),
                                                        disabled: I,
                                                        rows: 3,
                                                        className: (0, k.cn)(
                                                            'pl-10',
                                                            D
                                                        ),
                                                        placeholder:
                                                            'Condições e regras...',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, b.jsx)('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: (0, b.jsx)(f.Button, {
                                            type: 'button',
                                            variant: 'brand',
                                            disabled: I || at,
                                            onClick: av,
                                            title: as
                                                ? 'Aguarde carregar as empresas'
                                                : ad
                                                  ? 'Aguarde o upload da imagem'
                                                  : ar
                                                    ? 'Selecione pelo menos 1 empresa'
                                                    : aq
                                                      ? 'Preencha os campos obrigatórios'
                                                      : void 0,
                                            children: I
                                                ? 'Criando...'
                                                : 'Criar parceiro',
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        a.s(['PartnerNewDialog', () => H], 832241);
    },
];

//# sourceMappingURL=_94c60c13._.js.map
