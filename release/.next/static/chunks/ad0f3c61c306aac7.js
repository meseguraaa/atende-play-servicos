(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    694288,
    486506,
    364245,
    606661,
    (e) => {
        'use strict';
        var t = e.i(383206);
        let a = (0, t.default)('link', [
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
        e.s(['Link', () => a], 694288);
        let r = (0, t.default)('arrow-right', [
            ['path', { d: 'M5 12h14', key: '1ays0h' }],
            ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
        ]);
        e.s(['ArrowRight', () => r], 486506);
        let s = (0, t.default)('list-ordered', [
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
        e.s(['ListOrdered', () => s], 364245);
        let i = (0, t.default)('file-text', [
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
        e.s(['FileText', () => i], 606661);
    },
    729576,
    (e) => {
        'use strict';
        var t = e.i(565750),
            a = e.i(990341),
            r = e.i(245586),
            s = e.i(995403),
            i = e.i(975157),
            n = e.i(519455),
            l = e.i(776639),
            o = e.i(793479),
            c = e.i(624687),
            d = e.i(967489),
            m = e.i(942233),
            u = e.i(218074),
            p = e.i(255376),
            x = e.i(906325),
            h = e.i(694288),
            b = e.i(486506),
            v = e.i(364245);
        let g = (0, e.i(383206).default)('eye', [
            [
                'path',
                {
                    d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
                    key: '1nclc0',
                },
            ],
            ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
        ]);
        var f = e.i(826463),
            y = e.i(212409),
            j = e.i(606661),
            N = e.i(263942),
            S = e.i(287268),
            w = e.i(79254),
            E = e.i(641304);
        function k(e) {
            let t = String(e ?? '').trim();
            if (!t) return null;
            let a = t.toLowerCase();
            return a.startsWith('javascript:') || a.startsWith('data:')
                ? null
                : a.startsWith('http://') || a.startsWith('https://')
                  ? t
                  : a.startsWith('www.')
                    ? `https://${t}`
                    : null;
        }
        function L(e) {
            let t = String(e ?? '').trim();
            if (!t) return !1;
            let a = t.toLowerCase();
            return (
                !(
                    a.startsWith('javascript:') ||
                    a.startsWith('data:') ||
                    a.startsWith('blob:')
                ) &&
                !!(
                    t.startsWith('/media/') ||
                    t.startsWith('/uploads/') ||
                    a.startsWith('http://') ||
                    a.startsWith('https://')
                )
            );
        }
        function C(e) {
            let { icon: a, className: r, ...s } = e;
            return (0, t.jsxs)('div', {
                className: 'relative',
                children: [
                    (0, t.jsx)('div', {
                        className:
                            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                        children: (0, t.jsx)(a, {
                            className: 'h-4 w-4 text-content-brand',
                        }),
                    }),
                    (0, t.jsx)(o.Input, {
                        ...s,
                        className: (0, i.cn)('pl-10', r),
                    }),
                ],
            });
        }
        let A =
                'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
            T =
                'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
            M = [
                { value: 'ALL', label: 'Todas as empresas' },
                { value: 'SELECTED', label: 'Empresas selecionadas' },
            ];
        async function U(e) {
            try {
                return await e.json();
            } catch {
                return null;
            }
        }
        async function D() {
            for (let e of [
                '/api/plataform/companies/options',
                '/api/plataform/companies?active=1',
                '/api/plataform/companies',
            ])
                try {
                    let t = await fetch(e, { method: 'GET' });
                    if (!t.ok) continue;
                    let a = await U(t);
                    if (!a) continue;
                    let r = a.companies ?? a.items ?? a.data ?? a.list ?? null;
                    if (Array.isArray(r)) {
                        let e = r
                            .map((e) => ({
                                id: String(e?.id ?? '').trim(),
                                name: String(e?.name ?? e?.title ?? '').trim(),
                                isActive:
                                    'boolean' == typeof e?.isActive
                                        ? e.isActive
                                        : void 0,
                            }))
                            .filter((e) => e.id && e.name);
                        if (e.length) return e;
                    }
                } catch {}
            return [];
        }
        async function P(e) {
            for (let t of [
                `/api/plataform/partners/${e}`,
                `/api/plataform/partners/${e}/companies`,
                `/api/plataform/partners/${e}/visibility`,
            ])
                try {
                    let e = await fetch(t, { method: 'GET' });
                    if (!e.ok) continue;
                    let a = await U(e);
                    if (!a) continue;
                    let r =
                        a?.companyIds ??
                        a?.data?.companyIds ??
                        a?.data?.selectedCompanyIds ??
                        null;
                    if (Array.isArray(r)) {
                        let e = r
                            .map((e) => String(e ?? '').trim())
                            .filter(Boolean);
                        return Array.from(new Set(e));
                    }
                    let s =
                        a?.companies ??
                        a?.data?.companies ??
                        a?.data?.items ??
                        null;
                    if (Array.isArray(s)) {
                        let e = s
                            .map((e) =>
                                String(e?.companyId ?? e?.id ?? '').trim()
                            )
                            .filter(Boolean);
                        if (e.length) return Array.from(new Set(e));
                    }
                } catch {}
            return [];
        }
        function O({ partner: e }) {
            let U = (0, r.useRouter)(),
                [O, B] = a.useState(!1),
                [W, R] = a.useTransition(),
                [z, F] = a.useState(e.name ?? ''),
                [I, q] = a.useState(e.logoUrl ?? ''),
                [H, V] = a.useState(() => {
                    let t = String(e.logoKey ?? '').trim();
                    return t.length ? t : '';
                }),
                [K, $] = a.useState(() => {
                    let t = Number(e.discountPct ?? 0);
                    return Number.isFinite(t) ? String(t) : '0';
                }),
                [G, J] = a.useState(String(e.description ?? '')),
                [X, _] = a.useState(String(e.rules ?? '')),
                [Q, Y] = a.useState(e.ctaUrl ?? ''),
                [Z, ee] = a.useState(() => {
                    let t = String(e.ctaLabel ?? '').trim();
                    return t.length ? t : 'Ativar cashback e ir pra loja';
                }),
                [et, ea] = a.useState(() =>
                    'SELECTED' ===
                    String(e.visibilityMode ?? 'ALL')
                        .trim()
                        .toUpperCase()
                        ? 'SELECTED'
                        : 'ALL'
                ),
                [er, es] = a.useState(() => {
                    let t = Number(e.sortOrder ?? 100);
                    return Number.isFinite(t) ? String(t) : '100';
                }),
                ei = a.useRef(null),
                [en, el] = a.useState(!1),
                [eo, ec] = a.useState(!1),
                [ed, em] = a.useState([]),
                [eu, ep] = a.useState(!1),
                [ex, eh] = a.useState(''),
                [eb, ev] = a.useState([]);
            (a.useEffect(() => {
                O &&
                    (F(e.name ?? ''),
                    q(e.logoUrl ?? ''),
                    V(() => {
                        let t = String(e.logoKey ?? '').trim();
                        return t.length ? t : '';
                    }),
                    $(() => {
                        let t = Number(e.discountPct ?? 0);
                        return Number.isFinite(t) ? String(t) : '0';
                    }),
                    J(String(e.description ?? '')),
                    _(String(e.rules ?? '')),
                    Y(e.ctaUrl ?? ''),
                    ee(() => {
                        let t = String(e.ctaLabel ?? '').trim();
                        return t.length ? t : 'Ativar cashback e ir pra loja';
                    }),
                    ea(() =>
                        'SELECTED' ===
                        String(e.visibilityMode ?? 'ALL')
                            .trim()
                            .toUpperCase()
                            ? 'SELECTED'
                            : 'ALL'
                    ),
                    es(() => {
                        let t = Number(e.sortOrder ?? 100);
                        return Number.isFinite(t) ? String(t) : '100';
                    }),
                    eh(''),
                    ev([]),
                    el(!1),
                    ec(!1),
                    ei.current && (ei.current.value = ''));
            }, [O, e]),
                a.useEffect(() => {
                    if (!O) return;
                    let t = !0;
                    return (
                        (async function () {
                            ep(!0);
                            try {
                                let [a, r] = await Promise.all([D(), P(e.id)]);
                                if (!t) return;
                                (a.length ||
                                    s.toast.error(
                                        'Não encontrei empresas para listar. Verifique o endpoint /api/plataform/companies/options.'
                                    ),
                                    em(a),
                                    ev(r));
                                let i = String(e.visibilityMode ?? 'ALL')
                                    .trim()
                                    .toUpperCase();
                                ea('SELECTED' === i ? 'SELECTED' : 'ALL');
                            } catch {
                                if (!t) return;
                                s.toast.error(
                                    'Erro ao carregar empresas do parceiro.'
                                );
                            } finally {
                                if (!t) return;
                                ep(!1);
                            }
                        })(),
                        () => {
                            t = !1;
                        }
                    );
                }, [O, e.id]),
                a.useEffect(() => {
                    ec(!1);
                }, [I]),
                a.useEffect(() => {
                    'ALL' !== et || (0 !== eb.length && ev([]));
                }, [et]));
            let eg = a.useMemo(() => {
                let e = ex.trim().toLowerCase();
                return e
                    ? ed.filter((t) =>
                          String(t.name ?? '')
                              .toLowerCase()
                              .includes(e)
                      )
                    : ed;
            }, [ed, ex]);
            async function ef(e) {
                if (!e.type?.startsWith('image/'))
                    return void s.toast.error(
                        'Selecione um arquivo de imagem.'
                    );
                if (e.size > 5242880)
                    return void s.toast.error(
                        `Imagem muito grande. M\xe1ximo: 5MB.`
                    );
                el(!0);
                try {
                    let t = new FormData();
                    (t.append('file', e), t.append('module', 'PARTNERS'));
                    let a = await fetch('/api/admin/uploads', {
                            method: 'POST',
                            body: t,
                        }),
                        r = await a.json().catch(() => null);
                    if (!a.ok || !r || !0 !== r.ok) {
                        let e =
                            (r && !1 === r.ok && r.error) ||
                            'Não foi possível fazer upload da imagem.';
                        s.toast.error(e);
                        return;
                    }
                    let i = String(r.data.url ?? '').trim();
                    if (!L(i))
                        return void s.toast.error(
                            'Upload retornou uma URL inválida para o parceiro. O esperado é /media/... (recomendado), /uploads/... (legado) ou http(s).'
                        );
                    (q(i),
                        V(String(r.data.key ?? '').trim()),
                        ec(!1),
                        s.toast.success('Imagem enviada!'));
                } catch {
                    s.toast.error('Erro de rede ao fazer upload da imagem.');
                } finally {
                    el(!1);
                }
            }
            let ey =
                    !z.trim() ||
                    !I.trim() ||
                    !K.trim() ||
                    !Q.trim() ||
                    !Z.trim() ||
                    !er.trim(),
                ej = 'SELECTED' === et && 0 === eb.length,
                eN = 'SELECTED' === et && eu,
                eS = ey || ej || en || eN;
            async function ew() {
                let t, a, r, i;
                if (eS)
                    return eN
                        ? void s.toast.error(
                              'Aguarde carregar as empresas antes de salvar.'
                          )
                        : ej
                          ? void s.toast.error(
                                'Selecione pelo menos 1 empresa para SELECTED.'
                            )
                          : I.trim()
                            ? void s.toast.error(
                                  'Preencha os campos obrigatórios antes de salvar.'
                              )
                            : void s.toast.error('Logo é obrigatória.');
                let n =
                    ((t =
                        (function (e) {
                            let t = String(e ?? '').trim();
                            if (!t) return null;
                            let a = Number(t.replace(',', '.'));
                            return Number.isFinite(a)
                                ? Math.max(0, Math.min(100, Math.floor(a)))
                                : null;
                        })(K) ?? 0),
                    (a = (function (e) {
                        let t = String(e ?? '').trim();
                        if (!t) return null;
                        let a = Number(t.replace(',', '.'));
                        return Number.isFinite(a) ? Math.floor(a) : null;
                    })(er)),
                    (r = k(Q)),
                    (i = 'SELECTED' === et ? eb : []),
                    {
                        name: z.trim(),
                        logoUrl: I.trim(),
                        logoKey: H.trim() || null,
                        discountPct: t,
                        description: String(G ?? '').trim() || null,
                        rules: String(X ?? '').trim() || null,
                        ctaUrl: r ?? Q.trim(),
                        ctaLabel: Z.trim() || 'Ativar cashback e ir pra loja',
                        visibilityMode: et,
                        sortOrder: Number.isFinite(a) ? Number(a) : 100,
                        companyIds: i,
                    });
                if (!L(n.logoUrl))
                    return void s.toast.error(
                        'logoUrl inválida. Envie uma imagem (/media ou /uploads) ou forneça uma URL http(s) válida.'
                    );
                let l = Number(n.discountPct);
                if (!Number.isFinite(l) || l < 0 || l > 100)
                    return void s.toast.error('Desconto inválido (0 a 100).');
                let o = Number(n.sortOrder);
                if (!Number.isFinite(o) || o < 0)
                    return void s.toast.error('Ordem inválida (0 ou maior).');
                let c = k(n.ctaUrl);
                c
                    ? R(async () => {
                          try {
                              let t = await fetch(
                                      `/api/plataform/partners/${e.id}`,
                                      {
                                          method: 'PATCH',
                                          headers: {
                                              'Content-Type':
                                                  'application/json',
                                          },
                                          body: JSON.stringify({
                                              update: { ...n, ctaUrl: c },
                                          }),
                                      }
                                  ),
                                  a = await t.json().catch(() => null);
                              if (!t.ok || !a || !0 !== a.ok) {
                                  let e =
                                      a?.error ||
                                      'Não foi possível salvar o parceiro. Tente novamente.';
                                  s.toast.error(e);
                                  return;
                              }
                              (s.toast.success('Parceiro atualizado!'),
                                  B(!1),
                                  U.refresh());
                          } catch {
                              s.toast.error('Erro de rede ao salvar parceiro.');
                          }
                      })
                    : s.toast.error(
                          'CTA URL inválida. Use http(s) ou comece com www.'
                      );
            }
            let eE = I.trim() ? I.trim() : null;
            return (0, t.jsxs)(l.Dialog, {
                open: O,
                onOpenChange: (e) => !W && !en && B(e),
                children: [
                    (0, t.jsx)(l.DialogTrigger, {
                        asChild: !0,
                        children: (0, t.jsx)(n.Button, {
                            variant: 'edit2',
                            size: 'sm',
                            className:
                                'border-border-primary hover:bg-muted/40',
                            children: 'Editar',
                        }),
                    }),
                    (0, t.jsxs)(l.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, t.jsx)(l.DialogHeader, {
                                children: (0, t.jsx)(l.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Editar parceiro',
                                }),
                            }),
                            (0, t.jsxs)('div', {
                                className: 'space-y-4 pb-2',
                                children: [
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Nome do parceiro',
                                                    ' ',
                                                    (0, t.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, t.jsx)(C, {
                                                icon: m.Handshake,
                                                value: z,
                                                onChange: (e) =>
                                                    F(e.target.value),
                                                disabled: W,
                                                className: A,
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Logo do parceiro',
                                                    ' ',
                                                    (0, t.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, t.jsx)('input', {
                                                ref: ei,
                                                type: 'file',
                                                accept: 'image/*',
                                                className: 'hidden',
                                                disabled: W || en,
                                                onChange: (e) => {
                                                    let t =
                                                        e.currentTarget
                                                            .files?.[0];
                                                    t && ef(t);
                                                },
                                            }),
                                            (0, t.jsxs)('div', {
                                                className:
                                                    'grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start',
                                                children: [
                                                    (0, t.jsxs)('div', {
                                                        className: 'space-y-2',
                                                        children: [
                                                            (0, t.jsxs)('div', {
                                                                className:
                                                                    'relative',
                                                                children: [
                                                                    (0, t.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                            children:
                                                                                (0,
                                                                                t.jsx)(
                                                                                    u.Image,
                                                                                    {
                                                                                        className:
                                                                                            'h-4 w-4 text-content-brand',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                    (0, t.jsx)(
                                                                        o.Input,
                                                                        {
                                                                            value:
                                                                                eE ??
                                                                                '',
                                                                            readOnly:
                                                                                !0,
                                                                            placeholder:
                                                                                'Escolha seu arquivo clicando em Upload.',
                                                                            className:
                                                                                (0,
                                                                                i.cn)(
                                                                                    'pl-10 pr-10',
                                                                                    A
                                                                                ),
                                                                        }
                                                                    ),
                                                                    eE
                                                                        ? (0,
                                                                          t.jsx)(
                                                                              'button',
                                                                              {
                                                                                  type: 'button',
                                                                                  className:
                                                                                      'absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary hover:text-content-primary',
                                                                                  onClick:
                                                                                      () => {
                                                                                          (q(
                                                                                              ''
                                                                                          ),
                                                                                              V(
                                                                                                  ''
                                                                                              ),
                                                                                              ec(
                                                                                                  !1
                                                                                              ),
                                                                                              ei.current &&
                                                                                                  (ei.current.value =
                                                                                                      ''));
                                                                                      },
                                                                                  disabled:
                                                                                      W ||
                                                                                      en,
                                                                                  title: 'Remover imagem',
                                                                                  children:
                                                                                      (0,
                                                                                      t.jsx)(
                                                                                          y.X,
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
                                                            H
                                                                ? (0, t.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-[11px] text-content-secondary/70',
                                                                          children:
                                                                              [
                                                                                  'key:',
                                                                                  ' ',
                                                                                  (0,
                                                                                  t.jsx)(
                                                                                      'span',
                                                                                      {
                                                                                          className:
                                                                                              'text-content-primary',
                                                                                          children:
                                                                                              H,
                                                                                      }
                                                                                  ),
                                                                              ],
                                                                      }
                                                                  )
                                                                : null,
                                                        ],
                                                    }),
                                                    (0, t.jsx)(n.Button, {
                                                        type: 'button',
                                                        variant: 'brand',
                                                        className: 'h-10',
                                                        onClick: () =>
                                                            ei.current?.click(),
                                                        disabled: W || en,
                                                        title: en
                                                            ? 'Enviando...'
                                                            : void 0,
                                                        children: (0, t.jsxs)(
                                                            'span',
                                                            {
                                                                className:
                                                                    'inline-flex items-center gap-2',
                                                                children: [
                                                                    (0, t.jsx)(
                                                                        f.Upload,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4',
                                                                        }
                                                                    ),
                                                                    en
                                                                        ? 'Enviando...'
                                                                        : 'Upload',
                                                                ],
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            eE
                                                ? (0, t.jsx)('div', {
                                                      className:
                                                          'overflow-hidden rounded-xl border border-border-primary bg-background-tertiary',
                                                      children: (0, t.jsx)(
                                                          'div',
                                                          {
                                                              className:
                                                                  'h-40 w-full flex items-center justify-center',
                                                              children: eo
                                                                  ? (0, t.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'h-40 w-full flex items-center justify-center',
                                                                            children:
                                                                                (0,
                                                                                t.jsx)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'h-16 w-16 rounded-2xl border border-border-primary bg-background-secondary flex items-center justify-center',
                                                                                        children:
                                                                                            (0,
                                                                                            t.jsx)(
                                                                                                'span',
                                                                                                {
                                                                                                    className:
                                                                                                        'text-sm font-semibold text-content-secondary',
                                                                                                    children:
                                                                                                        (
                                                                                                            z ||
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
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e[0]
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
                                                                  : (0, t.jsx)(
                                                                        'img',
                                                                        {
                                                                            src: eE,
                                                                            alt: 'Preview do parceiro',
                                                                            className:
                                                                                'h-40 w-full object-cover',
                                                                            onError:
                                                                                () =>
                                                                                    ec(
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
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Desconto (%) ',
                                                    (0, t.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, t.jsx)(C, {
                                                icon: x.BadgePercent,
                                                value: K,
                                                onChange: (e) =>
                                                    $(e.target.value),
                                                disabled: W,
                                                inputMode: 'numeric',
                                                placeholder: 'Ex: 10',
                                                className: A,
                                            }),
                                            (0, t.jsx)('p', {
                                                className:
                                                    'text-[11px] text-content-secondary/70',
                                                children:
                                                    'O servidor normaliza para 0–100.',
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Descrição',
                                            }),
                                            (0, t.jsxs)('div', {
                                                className: 'relative',
                                                children: [
                                                    (0, t.jsx)('div', {
                                                        className:
                                                            'pointer-events-none absolute left-3 top-3',
                                                        children: (0, t.jsx)(
                                                            p.AlignLeft,
                                                            {
                                                                className:
                                                                    'h-4 w-4 text-content-brand',
                                                            }
                                                        ),
                                                    }),
                                                    (0, t.jsx)(c.Textarea, {
                                                        value: G,
                                                        onChange: (e) =>
                                                            J(e.target.value),
                                                        disabled: W,
                                                        rows: 3,
                                                        className: (0, i.cn)(
                                                            'pl-10',
                                                            A
                                                        ),
                                                        placeholder:
                                                            'Sobre o parceiro...',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Regras',
                                            }),
                                            (0, t.jsxs)('div', {
                                                className: 'relative',
                                                children: [
                                                    (0, t.jsx)('div', {
                                                        className:
                                                            'pointer-events-none absolute left-3 top-3',
                                                        children: (0, t.jsx)(
                                                            j.FileText,
                                                            {
                                                                className:
                                                                    'h-4 w-4 text-content-brand',
                                                            }
                                                        ),
                                                    }),
                                                    (0, t.jsx)(c.Textarea, {
                                                        value: X,
                                                        onChange: (e) =>
                                                            _(e.target.value),
                                                        disabled: W,
                                                        rows: 3,
                                                        className: (0, i.cn)(
                                                            'pl-10',
                                                            A
                                                        ),
                                                        placeholder:
                                                            'Condições e regras...',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'grid gap-3 sm:grid-cols-2',
                                        children: [
                                            (0, t.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, t.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Link do parceiro (ctaUrl)',
                                                            ' ',
                                                            (0, t.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, t.jsx)(C, {
                                                        icon: h.Link,
                                                        value: Q,
                                                        onChange: (e) =>
                                                            Y(e.target.value),
                                                        disabled: W,
                                                        placeholder:
                                                            'https://... ou www...',
                                                        className: T,
                                                    }),
                                                    (0, t.jsx)('p', {
                                                        className:
                                                            'text-[11px] text-content-secondary/70',
                                                        children:
                                                            'Aceita http(s) e “www.” (o servidor normaliza).',
                                                    }),
                                                ],
                                            }),
                                            (0, t.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, t.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Texto do botão (ctaLabel)',
                                                            ' ',
                                                            (0, t.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, t.jsx)(C, {
                                                        icon: b.ArrowRight,
                                                        value: Z,
                                                        onChange: (e) =>
                                                            ee(e.target.value),
                                                        disabled: W,
                                                        placeholder:
                                                            'Ex: Ativar cashback e ir pra loja',
                                                        className: T,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className:
                                            'space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3',
                                        children: [
                                            (0, t.jsx)('div', {
                                                className:
                                                    'flex items-start justify-between gap-4',
                                                children: (0, t.jsxs)('div', {
                                                    children: [
                                                        (0, t.jsx)('p', {
                                                            className:
                                                                'text-sm font-medium text-content-primary',
                                                            children:
                                                                'Visibilidade',
                                                        }),
                                                        (0, t.jsx)('p', {
                                                            className:
                                                                'text-xs text-content-secondary',
                                                            children:
                                                                'ALL: aparece para todas as empresas. SELECTED: aparece só para empresas selecionadas.',
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            (0, t.jsxs)(d.Select, {
                                                value: et,
                                                onValueChange: (e) => ea(e),
                                                disabled: W,
                                                children: [
                                                    (0, t.jsx)(
                                                        d.SelectTrigger,
                                                        {
                                                            className:
                                                                'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                            children: (0,
                                                            t.jsxs)('div', {
                                                                className:
                                                                    'flex items-center gap-2',
                                                                children: [
                                                                    (0, t.jsx)(
                                                                        g,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4 text-content-brand',
                                                                        }
                                                                    ),
                                                                    (0, t.jsx)(
                                                                        d.SelectValue,
                                                                        {
                                                                            placeholder:
                                                                                'Selecione',
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                        }
                                                    ),
                                                    (0, t.jsx)(
                                                        d.SelectContent,
                                                        {
                                                            children: M.map(
                                                                (e) =>
                                                                    (0, t.jsx)(
                                                                        d.SelectItem,
                                                                        {
                                                                            value: e.value,
                                                                            children:
                                                                                e.label,
                                                                        },
                                                                        e.value
                                                                    )
                                                            ),
                                                        }
                                                    ),
                                                ],
                                            }),
                                            'SELECTED' === et
                                                ? (0, t.jsxs)('div', {
                                                      className:
                                                          'mt-3 space-y-2',
                                                      children: [
                                                          (0, t.jsxs)('div', {
                                                              className:
                                                                  'flex items-center justify-between gap-2',
                                                              children: [
                                                                  (0, t.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-xs font-medium text-content-primary',
                                                                          children:
                                                                              [
                                                                                  'Empresas selecionadas (',
                                                                                  eb.length,
                                                                                  ')',
                                                                              ],
                                                                      }
                                                                  ),
                                                                  (0, t.jsxs)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'flex items-center gap-2',
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  t.jsx)(
                                                                                      n.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'outline',
                                                                                          className:
                                                                                              'h-8 px-3',
                                                                                          onClick:
                                                                                              function () {
                                                                                                  let e =
                                                                                                      eg.map(
                                                                                                          (
                                                                                                              e
                                                                                                          ) =>
                                                                                                              e.id
                                                                                                      );
                                                                                                  ev(
                                                                                                      (
                                                                                                          t
                                                                                                      ) => {
                                                                                                          let a =
                                                                                                              new Set(
                                                                                                                  t
                                                                                                              );
                                                                                                          return (
                                                                                                              e.forEach(
                                                                                                                  (
                                                                                                                      e
                                                                                                                  ) =>
                                                                                                                      a.add(
                                                                                                                          e
                                                                                                                      )
                                                                                                              ),
                                                                                                              Array.from(
                                                                                                                  a
                                                                                                              )
                                                                                                          );
                                                                                                      }
                                                                                                  );
                                                                                              },
                                                                                          disabled:
                                                                                              eu ||
                                                                                              W,
                                                                                          title: 'Selecionar todas as empresas filtradas',
                                                                                          children:
                                                                                              (0,
                                                                                              t.jsxs)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      className:
                                                                                                          'inline-flex items-center gap-2 text-xs',
                                                                                                      children:
                                                                                                          [
                                                                                                              (0,
                                                                                                              t.jsx)(
                                                                                                                  w.Check,
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
                                                                                  t.jsx)(
                                                                                      n.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'ghost',
                                                                                          className:
                                                                                              'h-8 px-3',
                                                                                          onClick:
                                                                                              function () {
                                                                                                  ev(
                                                                                                      []
                                                                                                  );
                                                                                              },
                                                                                          disabled:
                                                                                              eu ||
                                                                                              W,
                                                                                          title: 'Limpar seleção',
                                                                                          children:
                                                                                              (0,
                                                                                              t.jsx)(
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
                                                          (0, t.jsxs)('div', {
                                                              className:
                                                                  'relative',
                                                              children: [
                                                                  (0, t.jsx)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                          children:
                                                                              (0,
                                                                              t.jsx)(
                                                                                  S.Search,
                                                                                  {
                                                                                      className:
                                                                                          'h-4 w-4 text-content-brand',
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, t.jsx)(
                                                                      o.Input,
                                                                      {
                                                                          value: ex,
                                                                          onChange:
                                                                              (
                                                                                  e
                                                                              ) =>
                                                                                  eh(
                                                                                      e
                                                                                          .target
                                                                                          .value
                                                                                  ),
                                                                          disabled:
                                                                              eu ||
                                                                              W,
                                                                          placeholder:
                                                                              'Buscar empresa...',
                                                                          className:
                                                                              (0,
                                                                              i.cn)(
                                                                                  'pl-10',
                                                                                  A
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, t.jsx)('div', {
                                                              className:
                                                                  'rounded-xl border border-border-primary bg-background-secondary p-2',
                                                              children: eu
                                                                  ? (0, t.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex items-center gap-2 p-2 text-xs text-content-secondary',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    t.jsx)(
                                                                                        E.Loader2,
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
                                                                      eg.length
                                                                    ? (0,
                                                                      t.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'p-2 text-xs text-content-secondary',
                                                                              children:
                                                                                  'Nenhuma empresa encontrada.',
                                                                          }
                                                                      )
                                                                    : (0,
                                                                      t.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'max-h-56 overflow-y-auto',
                                                                              children:
                                                                                  eg.map(
                                                                                      (
                                                                                          e
                                                                                      ) => {
                                                                                          let a =
                                                                                              eb.includes(
                                                                                                  e.id
                                                                                              );
                                                                                          return (0,
                                                                                          t.jsxs)(
                                                                                              'label',
                                                                                              {
                                                                                                  className:
                                                                                                      (0,
                                                                                                      i.cn)(
                                                                                                          'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-background-tertiary',
                                                                                                          a
                                                                                                              ? 'bg-background-tertiary'
                                                                                                              : ''
                                                                                                      ),
                                                                                                  children:
                                                                                                      [
                                                                                                          (0,
                                                                                                          t.jsxs)(
                                                                                                              'div',
                                                                                                              {
                                                                                                                  className:
                                                                                                                      'flex items-center gap-2',
                                                                                                                  children:
                                                                                                                      [
                                                                                                                          (0,
                                                                                                                          t.jsx)(
                                                                                                                              N.Building2,
                                                                                                                              {
                                                                                                                                  className:
                                                                                                                                      'h-4 w-4 text-content-brand',
                                                                                                                              }
                                                                                                                          ),
                                                                                                                          (0,
                                                                                                                          t.jsx)(
                                                                                                                              'span',
                                                                                                                              {
                                                                                                                                  className:
                                                                                                                                      'text-sm text-content-primary',
                                                                                                                                  children:
                                                                                                                                      e.name,
                                                                                                                              }
                                                                                                                          ),
                                                                                                                          !1 ===
                                                                                                                          e.isActive
                                                                                                                              ? (0,
                                                                                                                                t.jsx)(
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
                                                                                                          t.jsx)(
                                                                                                              'input',
                                                                                                              {
                                                                                                                  type: 'checkbox',
                                                                                                                  checked:
                                                                                                                      a,
                                                                                                                  onChange:
                                                                                                                      () => {
                                                                                                                          var t;
                                                                                                                          return (
                                                                                                                              (t =
                                                                                                                                  e.id),
                                                                                                                              void ev(
                                                                                                                                  (
                                                                                                                                      e
                                                                                                                                  ) =>
                                                                                                                                      e.includes(
                                                                                                                                          t
                                                                                                                                      )
                                                                                                                                          ? e.filter(
                                                                                                                                                (
                                                                                                                                                    e
                                                                                                                                                ) =>
                                                                                                                                                    e !==
                                                                                                                                                    t
                                                                                                                                            )
                                                                                                                                          : [
                                                                                                                                                ...e,
                                                                                                                                                t,
                                                                                                                                            ]
                                                                                                                              )
                                                                                                                          );
                                                                                                                      },
                                                                                                                  disabled:
                                                                                                                      W,
                                                                                                                  className:
                                                                                                                      'h-4 w-4 accent-(--brand)',
                                                                                                              }
                                                                                                          ),
                                                                                                      ],
                                                                                              },
                                                                                              e.id
                                                                                          );
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                          }),
                                                          ej
                                                              ? (0, t.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-red-500',
                                                                        children:
                                                                            'Se estiver em SELECTED, você precisa selecionar pelo menos 1 empresa.',
                                                                    }
                                                                )
                                                              : (0, t.jsxs)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-content-secondary/70',
                                                                        children:
                                                                            [
                                                                                'Essas empresas vão no payload como',
                                                                                ' ',
                                                                                (0,
                                                                                t.jsx)(
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
                                                : (0, t.jsx)('p', {
                                                      className:
                                                          'mt-2 text-[11px] text-content-secondary/70',
                                                      children:
                                                          'Em ALL, não precisa selecionar empresas.',
                                                  }),
                                        ],
                                    }),
                                    (0, t.jsx)('div', {
                                        className: 'grid gap-3 sm:grid-cols-2',
                                        children: (0, t.jsxs)('div', {
                                            className: 'space-y-2',
                                            children: [
                                                (0, t.jsxs)('label', {
                                                    className:
                                                        'text-label-small text-content-secondary',
                                                    children: [
                                                        'Ordem (menor aparece primeiro)',
                                                        ' ',
                                                        (0, t.jsx)('span', {
                                                            className:
                                                                'text-red-500',
                                                            children: '*',
                                                        }),
                                                    ],
                                                }),
                                                (0, t.jsx)(C, {
                                                    icon: v.ListOrdered,
                                                    value: er,
                                                    onChange: (e) =>
                                                        es(e.target.value),
                                                    disabled: W,
                                                    inputMode: 'numeric',
                                                    placeholder: 'Ex: 100',
                                                    className: A,
                                                }),
                                                (0, t.jsx)('p', {
                                                    className:
                                                        'text-[11px] text-content-secondary/70',
                                                    children:
                                                        'Menor aparece primeiro.',
                                                }),
                                            ],
                                        }),
                                    }),
                                    (0, t.jsx)('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: (0, t.jsx)(n.Button, {
                                            type: 'button',
                                            variant: 'brand',
                                            disabled: W || eS,
                                            onClick: ew,
                                            title: eN
                                                ? 'Aguarde carregar as empresas'
                                                : en
                                                  ? 'Aguarde o upload da imagem'
                                                  : ej
                                                    ? 'Selecione pelo menos 1 empresa'
                                                    : ey
                                                      ? 'Preencha os campos obrigatórios'
                                                      : void 0,
                                            children: W
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
        function B({ children: e, variant: a = 'neutral' }) {
            return (0, t.jsx)('span', {
                className: (0, i.cn)(
                    'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
                    'success' === a
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                        : 'danger' === a
                          ? 'bg-rose-500/10 text-rose-700 border-rose-500/20'
                          : 'bg-black/5 text-content-secondary border-border-primary'
                ),
                children: e,
            });
        }
        function W({ isActive: e, title: a }) {
            return (0, t.jsx)('span', {
                title: a,
                className: (0, i.cn)(
                    'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                    e
                        ? 'bg-green-500/15 text-green-600 border-green-500/30'
                        : 'bg-red-500/15 text-red-600 border-red-500/30'
                ),
                children: e ? 'Ativo' : 'Inativo',
            });
        }
        function R({ src: e, name: r }) {
            let [s, i] = a.useState(!1),
                n = !!(e && String(e).trim().length);
            return (0, t.jsx)('div', {
                className:
                    'h-10 w-10 overflow-hidden rounded-lg border border-border-primary bg-background-secondary flex items-center justify-center',
                children:
                    n && !s
                        ? (0, t.jsx)('img', {
                              src: String(e),
                              alt: r,
                              className: 'h-full w-full object-cover',
                              loading: 'lazy',
                              onError: () => i(!0),
                          })
                        : (0, t.jsx)('span', {
                              className:
                                  'text-[11px] font-semibold text-content-secondary',
                              children: (r || '?')
                                  .trim()
                                  .split(/\s+/)
                                  .filter(Boolean)
                                  .map((e) => e[0])
                                  .join('')
                                  .slice(0, 2)
                                  .toUpperCase(),
                          }),
            });
        }
        function z({ partner: e }) {
            let i = (0, r.useRouter)(),
                [l, o] = a.useTransition();
            return (0, t.jsxs)('tr', {
                className: 'border-t border-border-primary',
                children: [
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, t.jsxs)('div', {
                            className: 'flex items-center gap-3',
                            children: [
                                (0, t.jsx)(R, { src: e.logoUrl, name: e.name }),
                                (0, t.jsxs)('div', {
                                    className: 'min-w-0',
                                    children: [
                                        (0, t.jsx)('p', {
                                            className:
                                                'truncate font-semibold text-content-primary',
                                            children: e.name,
                                        }),
                                        (0, t.jsx)('p', {
                                            className:
                                                'truncate text-xs text-content-secondary',
                                            children: e.ctaUrl ?? '—',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, t.jsx)(B, {
                            variant: 'neutral',
                            children:
                                Number(e.discountPct ?? 0) > 0
                                    ? `${e.discountPct}% OFF`
                                    : '—',
                        }),
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, t.jsx)(B, {
                            variant: 'neutral',
                            children:
                                'SELECTED' === e.visibilityMode
                                    ? 'SELECTED'
                                    : 'ALL',
                        }),
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, t.jsx)('span', {
                            className:
                                'text-xs font-semibold text-content-secondary',
                            children: e.sortOrder ?? 100,
                        }),
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, t.jsx)(W, { isActive: !!e.isActive }),
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3 text-right',
                        children: (0, t.jsxs)('div', {
                            className: 'inline-flex items-center gap-2',
                            children: [
                                (0, t.jsx)(O, {
                                    partner: {
                                        id: e.id,
                                        name: e.name,
                                        logoUrl: e.logoUrl ?? null,
                                        logoKey: e.logoKey ?? null,
                                        discountPct: Number(e.discountPct ?? 0),
                                        description: e.description ?? null,
                                        rules: e.rules ?? null,
                                        ctaUrl: e.ctaUrl ?? '',
                                        ctaLabel: e.ctaLabel ?? null,
                                        isActive: !!e.isActive,
                                        visibilityMode:
                                            e.visibilityMode ?? 'ALL',
                                        sortOrder: Number(e.sortOrder ?? 100),
                                        createdAt: e.createdAt,
                                        updatedAt: e.updatedAt,
                                    },
                                }),
                                (0, t.jsx)(n.Button, {
                                    variant: e.isActive
                                        ? 'destructive'
                                        : 'active',
                                    size: 'sm',
                                    type: 'button',
                                    className:
                                        'border-border-primary hover:bg-muted/40',
                                    onClick: function () {
                                        o(async () => {
                                            try {
                                                let t = await fetch(
                                                        `/api/plataform/partners/${e.id}`,
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
                                                    a = await t
                                                        .json()
                                                        .catch(() => null);
                                                if (
                                                    !t.ok ||
                                                    !a ||
                                                    !0 !== a.ok
                                                ) {
                                                    let e =
                                                        a?.error ||
                                                        'Não foi possível alterar o status do parceiro.';
                                                    s.toast.error(e);
                                                    return;
                                                }
                                                (s.toast.success(
                                                    e.isActive
                                                        ? 'Parceiro desativado.'
                                                        : 'Parceiro ativado.'
                                                ),
                                                    i.refresh());
                                            } catch {
                                                s.toast.error(
                                                    'Erro de rede ao alterar status do parceiro.'
                                                );
                                            }
                                        });
                                    },
                                    disabled: l,
                                    title: l ? 'Processando...' : void 0,
                                    children: l
                                        ? 'Aguarde...'
                                        : e.isActive
                                          ? 'Desativar'
                                          : 'Ativar',
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        e.s(['PartnerRow', () => z], 729576);
    },
    503942,
    (e) => {
        'use strict';
        var t = e.i(565750),
            a = e.i(990341),
            r = e.i(245586),
            s = e.i(776639),
            i = e.i(519455),
            n = e.i(793479),
            l = e.i(624687),
            o = e.i(967489),
            c = e.i(995403),
            d = e.i(975157),
            m = e.i(942233),
            u = e.i(218074),
            p = e.i(255376),
            x = e.i(906325),
            h = e.i(694288),
            b = e.i(486506),
            v = e.i(826463),
            g = e.i(212409);
        let f = (0, e.i(383206).default)('sliders-horizontal', [
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
        var y = e.i(364245),
            j = e.i(606661),
            N = e.i(263942),
            S = e.i(287268),
            w = e.i(79254),
            E = e.i(641304);
        function k(e) {
            let t = String(e ?? '').trim();
            if (!t) return null;
            let a = t.toLowerCase();
            return a.startsWith('javascript:') || a.startsWith('data:')
                ? null
                : a.startsWith('http://') || a.startsWith('https://')
                  ? t
                  : a.startsWith('www.')
                    ? `https://${t}`
                    : null;
        }
        function L(e) {
            let t = String(e ?? '').trim();
            if (!t) return !1;
            let a = t.toLowerCase();
            return (
                !(
                    a.startsWith('javascript:') ||
                    a.startsWith('data:') ||
                    a.startsWith('blob:')
                ) &&
                !!(
                    t.startsWith('/media/') ||
                    t.startsWith('/uploads/') ||
                    a.startsWith('http://') ||
                    a.startsWith('https://')
                )
            );
        }
        function C(e) {
            let { icon: a, className: r, ...s } = e;
            return (0, t.jsxs)('div', {
                className: 'relative',
                children: [
                    (0, t.jsx)('div', {
                        className:
                            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                        children: (0, t.jsx)(a, {
                            className: 'h-4 w-4 text-content-brand',
                        }),
                    }),
                    (0, t.jsx)(n.Input, {
                        ...s,
                        className: (0, d.cn)('pl-10', r),
                    }),
                ],
            });
        }
        let A =
                'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
            T =
                'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';
        async function M(e) {
            try {
                return await e.json();
            } catch {
                return null;
            }
        }
        async function U() {
            let e = await fetch('/api/plataform/companies/options', {
                method: 'GET',
            });
            if (!e.ok) return [];
            let t = await M(e);
            if (!t || !0 !== t.ok) return [];
            let a = t.companies ?? t.items ?? t.data ?? t.list ?? [];
            return Array.isArray(a)
                ? a
                      .map((e) => ({
                          id: String(e?.id ?? '').trim(),
                          name: String(e?.name ?? e?.title ?? '').trim(),
                          isActive:
                              'boolean' == typeof e?.isActive
                                  ? e.isActive
                                  : void 0,
                      }))
                      .filter((e) => e.id && e.name)
                : [];
        }
        function D() {
            let e = (0, r.useRouter)(),
                [M, D] = a.useState(!1),
                [P, O] = a.useTransition(),
                [B, W] = a.useState(''),
                [R, z] = a.useState(''),
                [F, I] = a.useState(''),
                [q, H] = a.useState(''),
                [V, K] = a.useState(''),
                [$, G] = a.useState(''),
                [J, X] = a.useState(''),
                [_, Q] = a.useState('Ativar cashback e ir pra loja'),
                [Y, Z] = a.useState('ALL'),
                [ee, et] = a.useState('100'),
                ea = a.useRef(null),
                [er, es] = a.useState(!1),
                [ei, en] = a.useState(!1),
                [el, eo] = a.useState([]),
                [ec, ed] = a.useState(!1),
                [em, eu] = a.useState(''),
                [ep, ex] = a.useState([]);
            (a.useEffect(() => {
                !M &&
                    (W(''),
                    z(''),
                    I(''),
                    H(''),
                    K(''),
                    G(''),
                    X(''),
                    Q('Ativar cashback e ir pra loja'),
                    Z('ALL'),
                    et('100'),
                    ex([]),
                    eu(''),
                    es(!1),
                    en(!1),
                    ea.current && (ea.current.value = ''));
            }, [M]),
                a.useEffect(() => {
                    if (!M) return;
                    let e = !0;
                    return (
                        (async function () {
                            ed(!0);
                            try {
                                let t = await U();
                                if (!e) return;
                                (t.length ||
                                    c.toast.error(
                                        'Não encontrei empresas para listar. Verifique /api/plataform/companies/options.'
                                    ),
                                    eo(t));
                            } catch {
                                if (!e) return;
                                c.toast.error('Erro ao carregar empresas.');
                            } finally {
                                if (!e) return;
                                ed(!1);
                            }
                        })(),
                        () => {
                            e = !1;
                        }
                    );
                }, [M]),
                a.useEffect(() => {
                    'ALL' !== Y || (0 !== ep.length && ex([]));
                }, [Y]),
                a.useEffect(() => {
                    en(!1);
                }, [R]));
            let eh = a.useMemo(() => {
                    let e = em.trim().toLowerCase();
                    return e
                        ? el.filter((t) =>
                              String(t.name ?? '')
                                  .toLowerCase()
                                  .includes(e)
                          )
                        : el;
                }, [el, em]),
                eb =
                    !B.trim() ||
                    !R.trim() ||
                    !J.trim() ||
                    !_.trim() ||
                    !ee.trim(),
                ev = 'SELECTED' === Y && 0 === ep.length,
                eg = 'SELECTED' === Y && ec,
                ef = eb || ev || er || eg;
            async function ey(e) {
                if (!e.type?.startsWith('image/'))
                    return void c.toast.error(
                        'Selecione um arquivo de imagem.'
                    );
                if (e.size > 5242880)
                    return void c.toast.error(
                        `Imagem muito grande. M\xe1ximo: 5MB.`
                    );
                es(!0);
                try {
                    let t = new FormData();
                    (t.append('file', e), t.append('module', 'PARTNERS'));
                    let a = await fetch('/api/admin/uploads', {
                            method: 'POST',
                            body: t,
                        }),
                        r = await a.json().catch(() => null);
                    if (!a.ok || !r || !0 !== r.ok) {
                        let e =
                            (r && !1 === r.ok && r.error) ||
                            'Não foi possível fazer upload da imagem.';
                        c.toast.error(e);
                        return;
                    }
                    let s = String(r.data.url ?? '').trim();
                    if (!L(s))
                        return void c.toast.error(
                            'Upload retornou uma URL inválida para o parceiro. O esperado é /media/... (recomendado), /uploads/... (legado) ou http(s).'
                        );
                    (z(s),
                        I(String(r.data.key ?? '').trim()),
                        en(!1),
                        c.toast.success('Logo enviada!'));
                } catch {
                    c.toast.error('Erro de rede ao fazer upload da logo.');
                } finally {
                    es(!1);
                }
            }
            async function ej() {
                let t, a, r, s;
                if (ef)
                    return eg
                        ? void c.toast.error(
                              'Aguarde carregar as empresas antes de criar.'
                          )
                        : ev
                          ? void c.toast.error(
                                'Selecione pelo menos 1 empresa para SELECTED.'
                            )
                          : R.trim()
                            ? void c.toast.error(
                                  'Preencha os campos obrigatórios antes de criar.'
                              )
                            : void c.toast.error('Logo é obrigatória.');
                let i =
                    ((t =
                        (function (e) {
                            let t = String(e ?? '').trim();
                            if (!t) return null;
                            let a = Number(t.replace(',', '.'));
                            return Number.isFinite(a)
                                ? Math.max(0, Math.min(100, Math.floor(a)))
                                : null;
                        })(q) ?? 0),
                    (a = (function (e) {
                        let t = String(e ?? '').trim();
                        if (!t) return null;
                        let a = Number(t.replace(',', '.'));
                        return Number.isFinite(a) ? Math.floor(a) : null;
                    })(ee)),
                    (r = k(J)),
                    (s = 'SELECTED' === Y ? ep : []),
                    {
                        name: B.trim(),
                        logoUrl: R.trim(),
                        logoKey: F.trim() || null,
                        discountPct: t,
                        description: String(V ?? '').trim() || null,
                        rules: String($ ?? '').trim() || null,
                        ctaUrl: r ?? J.trim(),
                        ctaLabel: _.trim() || 'Ativar cashback e ir pra loja',
                        isActive: !0,
                        visibilityMode: Y,
                        sortOrder: Number.isFinite(a) ? Number(a) : 100,
                        companyIds: s,
                    });
                if (!i.name) return void c.toast.error('Nome é obrigatório.');
                if (!i.logoUrl)
                    return void c.toast.error('Logo é obrigatória.');
                if (!L(i.logoUrl))
                    return void c.toast.error(
                        'logoUrl inválida. Envie uma imagem (/media ou /uploads) ou forneça uma URL http(s) válida.'
                    );
                let n = Number(i.discountPct);
                if (!Number.isFinite(n) || n < 0 || n > 100)
                    return void c.toast.error('Desconto inválido (0 a 100).');
                let l = Number(i.sortOrder);
                if (!Number.isFinite(l) || l < 0)
                    return void c.toast.error('Ordem inválida (0 ou maior).');
                let o = k(i.ctaUrl);
                o
                    ? O(async () => {
                          try {
                              let t = await fetch('/api/plataform/partners', {
                                      method: 'POST',
                                      headers: {
                                          'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({ ...i, ctaUrl: o }),
                                  }),
                                  a = await t.json().catch(() => null);
                              if (!t.ok || !a || !0 !== a.ok) {
                                  let e =
                                      a?.error ||
                                      'Não foi possível criar o parceiro. Tente novamente.';
                                  c.toast.error(e);
                                  return;
                              }
                              (c.toast.success('Parceiro criado com sucesso!'),
                                  D(!1),
                                  e.refresh());
                          } catch {
                              c.toast.error('Erro de rede ao criar parceiro.');
                          }
                      })
                    : c.toast.error(
                          'CTA URL inválida. Use http(s) ou comece com www.'
                      );
            }
            let eN = R.trim() ? R.trim() : null;
            return (0, t.jsxs)(s.Dialog, {
                open: M,
                onOpenChange: (e) => !P && !er && D(e),
                children: [
                    (0, t.jsx)(s.DialogTrigger, {
                        asChild: !0,
                        children: (0, t.jsx)(i.Button, {
                            variant: 'brand',
                            children: 'Novo parceiro',
                        }),
                    }),
                    (0, t.jsxs)(s.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, t.jsx)(s.DialogHeader, {
                                children: (0, t.jsx)(s.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Novo parceiro',
                                }),
                            }),
                            (0, t.jsxs)('div', {
                                className: 'space-y-4 pb-2',
                                children: [
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Nome do parceiro',
                                                    ' ',
                                                    (0, t.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, t.jsx)(C, {
                                                icon: m.Handshake,
                                                value: B,
                                                onChange: (e) =>
                                                    W(e.target.value),
                                                disabled: P,
                                                className: A,
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Logo / imagem',
                                                    ' ',
                                                    (0, t.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, t.jsx)('input', {
                                                ref: ea,
                                                type: 'file',
                                                accept: 'image/*',
                                                className: 'hidden',
                                                disabled: P || er,
                                                onChange: (e) => {
                                                    let t =
                                                        e.currentTarget
                                                            .files?.[0];
                                                    t && ey(t);
                                                },
                                            }),
                                            (0, t.jsxs)('div', {
                                                className:
                                                    'grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start',
                                                children: [
                                                    (0, t.jsxs)('div', {
                                                        className: 'space-y-2',
                                                        children: [
                                                            (0, t.jsxs)('div', {
                                                                className:
                                                                    'relative',
                                                                children: [
                                                                    (0, t.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                            children:
                                                                                (0,
                                                                                t.jsx)(
                                                                                    u.Image,
                                                                                    {
                                                                                        className:
                                                                                            'h-4 w-4 text-content-brand',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                    (0, t.jsx)(
                                                                        n.Input,
                                                                        {
                                                                            value:
                                                                                eN ??
                                                                                '',
                                                                            readOnly:
                                                                                !0,
                                                                            placeholder:
                                                                                'Escolha seu arquivo clicando em Upload.',
                                                                            className:
                                                                                (0,
                                                                                d.cn)(
                                                                                    'pl-10 pr-10',
                                                                                    A
                                                                                ),
                                                                        }
                                                                    ),
                                                                    eN
                                                                        ? (0,
                                                                          t.jsx)(
                                                                              'button',
                                                                              {
                                                                                  type: 'button',
                                                                                  className:
                                                                                      'absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary hover:text-content-primary',
                                                                                  onClick:
                                                                                      () => {
                                                                                          (z(
                                                                                              ''
                                                                                          ),
                                                                                              I(
                                                                                                  ''
                                                                                              ),
                                                                                              en(
                                                                                                  !1
                                                                                              ),
                                                                                              ea.current &&
                                                                                                  (ea.current.value =
                                                                                                      ''));
                                                                                      },
                                                                                  disabled:
                                                                                      P ||
                                                                                      er,
                                                                                  title: 'Remover imagem',
                                                                                  children:
                                                                                      (0,
                                                                                      t.jsx)(
                                                                                          g.X,
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
                                                            F
                                                                ? (0, t.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-[11px] text-content-secondary/70',
                                                                          children:
                                                                              [
                                                                                  'key:',
                                                                                  ' ',
                                                                                  (0,
                                                                                  t.jsx)(
                                                                                      'span',
                                                                                      {
                                                                                          className:
                                                                                              'text-content-primary',
                                                                                          children:
                                                                                              F,
                                                                                      }
                                                                                  ),
                                                                              ],
                                                                      }
                                                                  )
                                                                : null,
                                                        ],
                                                    }),
                                                    (0, t.jsx)(i.Button, {
                                                        type: 'button',
                                                        variant: 'brand',
                                                        className: 'h-10',
                                                        onClick: () =>
                                                            ea.current?.click(),
                                                        disabled: P || er,
                                                        title: er
                                                            ? 'Enviando...'
                                                            : void 0,
                                                        children: (0, t.jsxs)(
                                                            'span',
                                                            {
                                                                className:
                                                                    'inline-flex items-center gap-2',
                                                                children: [
                                                                    (0, t.jsx)(
                                                                        v.Upload,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4',
                                                                        }
                                                                    ),
                                                                    er
                                                                        ? 'Enviando...'
                                                                        : 'Upload',
                                                                ],
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            eN
                                                ? (0, t.jsx)('div', {
                                                      className:
                                                          'overflow-hidden rounded-xl border border-border-primary bg-background-tertiary',
                                                      children: (0, t.jsx)(
                                                          'div',
                                                          {
                                                              className:
                                                                  'h-40 w-full flex items-center justify-center',
                                                              children: ei
                                                                  ? (0, t.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'h-40 w-full flex items-center justify-center',
                                                                            children:
                                                                                (0,
                                                                                t.jsx)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'h-16 w-16 rounded-2xl border border-border-primary bg-background-secondary flex items-center justify-center',
                                                                                        children:
                                                                                            (0,
                                                                                            t.jsx)(
                                                                                                'span',
                                                                                                {
                                                                                                    className:
                                                                                                        'text-sm font-semibold text-content-secondary',
                                                                                                    children:
                                                                                                        (
                                                                                                            B ||
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
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e[0]
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
                                                                  : (0, t.jsx)(
                                                                        'img',
                                                                        {
                                                                            src: eN,
                                                                            alt: 'Preview da logo',
                                                                            className:
                                                                                'h-40 w-full object-cover',
                                                                            onError:
                                                                                () =>
                                                                                    en(
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
                                    (0, t.jsxs)('div', {
                                        className: 'grid gap-3 sm:grid-cols-2',
                                        children: [
                                            (0, t.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, t.jsx)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children:
                                                            'Desconto (%)',
                                                    }),
                                                    (0, t.jsx)(C, {
                                                        icon: x.BadgePercent,
                                                        value: q,
                                                        onChange: (e) =>
                                                            H(e.target.value),
                                                        disabled: P,
                                                        inputMode: 'numeric',
                                                        placeholder: 'Ex: 10',
                                                        className: A,
                                                    }),
                                                    (0, t.jsx)('p', {
                                                        className:
                                                            'text-[11px] text-content-secondary/70',
                                                        children:
                                                            'O servidor normaliza para 0–100.',
                                                    }),
                                                ],
                                            }),
                                            (0, t.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, t.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Ordem (menor aparece primeiro)',
                                                            ' ',
                                                            (0, t.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, t.jsx)(C, {
                                                        icon: y.ListOrdered,
                                                        value: ee,
                                                        onChange: (e) =>
                                                            et(e.target.value),
                                                        disabled: P,
                                                        inputMode: 'numeric',
                                                        placeholder: 'Ex: 100',
                                                        className: A,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className:
                                            'space-y-2 rounded-xl border border-border-primary bg-background-tertiary p-3',
                                        children: [
                                            (0, t.jsx)('div', {
                                                className:
                                                    'flex items-start justify-between gap-4',
                                                children: (0, t.jsx)('div', {
                                                    children: (0, t.jsx)('p', {
                                                        className:
                                                            'text-sm font-medium text-content-primary',
                                                        children:
                                                            'Visibilidade',
                                                    }),
                                                }),
                                            }),
                                            (0, t.jsxs)(o.Select, {
                                                value: Y,
                                                onValueChange: (e) => Z(e),
                                                disabled: P,
                                                children: [
                                                    (0, t.jsx)(
                                                        o.SelectTrigger,
                                                        {
                                                            className:
                                                                'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                            children: (0,
                                                            t.jsxs)('div', {
                                                                className:
                                                                    'flex items-center gap-2',
                                                                children: [
                                                                    (0, t.jsx)(
                                                                        f,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4 text-content-brand',
                                                                        }
                                                                    ),
                                                                    (0, t.jsx)(
                                                                        o.SelectValue,
                                                                        {
                                                                            placeholder:
                                                                                'Selecione',
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                        }
                                                    ),
                                                    (0, t.jsxs)(
                                                        o.SelectContent,
                                                        {
                                                            children: [
                                                                (0, t.jsx)(
                                                                    o.SelectItem,
                                                                    {
                                                                        value: 'ALL',
                                                                        children:
                                                                            'Todas as empresas',
                                                                    }
                                                                ),
                                                                (0, t.jsx)(
                                                                    o.SelectItem,
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
                                            'SELECTED' === Y
                                                ? (0, t.jsxs)('div', {
                                                      className:
                                                          'mt-3 space-y-2',
                                                      children: [
                                                          (0, t.jsxs)('div', {
                                                              className:
                                                                  'flex items-center justify-between gap-2',
                                                              children: [
                                                                  (0, t.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-xs font-medium text-content-primary',
                                                                          children:
                                                                              [
                                                                                  'Empresas selecionadas (',
                                                                                  ep.length,
                                                                                  ')',
                                                                              ],
                                                                      }
                                                                  ),
                                                                  (0, t.jsxs)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'flex items-center gap-2',
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  t.jsx)(
                                                                                      i.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'outline',
                                                                                          className:
                                                                                              'h-8 px-3',
                                                                                          onClick:
                                                                                              function () {
                                                                                                  let e =
                                                                                                      eh.map(
                                                                                                          (
                                                                                                              e
                                                                                                          ) =>
                                                                                                              e.id
                                                                                                      );
                                                                                                  ex(
                                                                                                      (
                                                                                                          t
                                                                                                      ) => {
                                                                                                          let a =
                                                                                                              new Set(
                                                                                                                  t
                                                                                                              );
                                                                                                          return (
                                                                                                              e.forEach(
                                                                                                                  (
                                                                                                                      e
                                                                                                                  ) =>
                                                                                                                      a.add(
                                                                                                                          e
                                                                                                                      )
                                                                                                              ),
                                                                                                              Array.from(
                                                                                                                  a
                                                                                                              )
                                                                                                          );
                                                                                                      }
                                                                                                  );
                                                                                              },
                                                                                          disabled:
                                                                                              ec ||
                                                                                              P,
                                                                                          title: 'Selecionar todas as empresas filtradas',
                                                                                          children:
                                                                                              (0,
                                                                                              t.jsxs)(
                                                                                                  'span',
                                                                                                  {
                                                                                                      className:
                                                                                                          'inline-flex items-center gap-2 text-xs',
                                                                                                      children:
                                                                                                          [
                                                                                                              (0,
                                                                                                              t.jsx)(
                                                                                                                  w.Check,
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
                                                                                  t.jsx)(
                                                                                      i.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'ghost',
                                                                                          className:
                                                                                              'h-8 px-3',
                                                                                          onClick:
                                                                                              function () {
                                                                                                  ex(
                                                                                                      []
                                                                                                  );
                                                                                              },
                                                                                          disabled:
                                                                                              ec ||
                                                                                              P,
                                                                                          title: 'Limpar seleção',
                                                                                          children:
                                                                                              (0,
                                                                                              t.jsx)(
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
                                                          (0, t.jsxs)('div', {
                                                              className:
                                                                  'relative',
                                                              children: [
                                                                  (0, t.jsx)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                          children:
                                                                              (0,
                                                                              t.jsx)(
                                                                                  S.Search,
                                                                                  {
                                                                                      className:
                                                                                          'h-4 w-4 text-content-brand',
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                                  (0, t.jsx)(
                                                                      n.Input,
                                                                      {
                                                                          value: em,
                                                                          onChange:
                                                                              (
                                                                                  e
                                                                              ) =>
                                                                                  eu(
                                                                                      e
                                                                                          .target
                                                                                          .value
                                                                                  ),
                                                                          disabled:
                                                                              ec ||
                                                                              P,
                                                                          placeholder:
                                                                              'Buscar empresa...',
                                                                          className:
                                                                              (0,
                                                                              d.cn)(
                                                                                  'pl-10',
                                                                                  A
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, t.jsx)('div', {
                                                              className:
                                                                  'rounded-xl border border-border-primary bg-background-secondary p-2',
                                                              children: ec
                                                                  ? (0, t.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex items-center gap-2 p-2 text-xs text-content-secondary',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    t.jsx)(
                                                                                        E.Loader2,
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
                                                                      eh.length
                                                                    ? (0,
                                                                      t.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'p-2 text-xs text-content-secondary',
                                                                              children:
                                                                                  'Nenhuma empresa encontrada.',
                                                                          }
                                                                      )
                                                                    : (0,
                                                                      t.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'max-h-56 overflow-y-auto',
                                                                              children:
                                                                                  eh.map(
                                                                                      (
                                                                                          e
                                                                                      ) => {
                                                                                          let a =
                                                                                              ep.includes(
                                                                                                  e.id
                                                                                              );
                                                                                          return (0,
                                                                                          t.jsxs)(
                                                                                              'label',
                                                                                              {
                                                                                                  className:
                                                                                                      (0,
                                                                                                      d.cn)(
                                                                                                          'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-background-tertiary',
                                                                                                          a
                                                                                                              ? 'bg-background-tertiary'
                                                                                                              : ''
                                                                                                      ),
                                                                                                  children:
                                                                                                      [
                                                                                                          (0,
                                                                                                          t.jsxs)(
                                                                                                              'div',
                                                                                                              {
                                                                                                                  className:
                                                                                                                      'flex items-center gap-2',
                                                                                                                  children:
                                                                                                                      [
                                                                                                                          (0,
                                                                                                                          t.jsx)(
                                                                                                                              N.Building2,
                                                                                                                              {
                                                                                                                                  className:
                                                                                                                                      'h-4 w-4 text-content-brand',
                                                                                                                              }
                                                                                                                          ),
                                                                                                                          (0,
                                                                                                                          t.jsx)(
                                                                                                                              'span',
                                                                                                                              {
                                                                                                                                  className:
                                                                                                                                      'text-sm text-content-primary',
                                                                                                                                  children:
                                                                                                                                      e.name,
                                                                                                                              }
                                                                                                                          ),
                                                                                                                          !1 ===
                                                                                                                          e.isActive
                                                                                                                              ? (0,
                                                                                                                                t.jsx)(
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
                                                                                                          t.jsx)(
                                                                                                              'input',
                                                                                                              {
                                                                                                                  type: 'checkbox',
                                                                                                                  checked:
                                                                                                                      a,
                                                                                                                  onChange:
                                                                                                                      () => {
                                                                                                                          var t;
                                                                                                                          return (
                                                                                                                              (t =
                                                                                                                                  e.id),
                                                                                                                              void ex(
                                                                                                                                  (
                                                                                                                                      e
                                                                                                                                  ) =>
                                                                                                                                      e.includes(
                                                                                                                                          t
                                                                                                                                      )
                                                                                                                                          ? e.filter(
                                                                                                                                                (
                                                                                                                                                    e
                                                                                                                                                ) =>
                                                                                                                                                    e !==
                                                                                                                                                    t
                                                                                                                                            )
                                                                                                                                          : [
                                                                                                                                                ...e,
                                                                                                                                                t,
                                                                                                                                            ]
                                                                                                                              )
                                                                                                                          );
                                                                                                                      },
                                                                                                                  disabled:
                                                                                                                      P,
                                                                                                                  className:
                                                                                                                      'h-4 w-4 accent-(--brand)',
                                                                                                              }
                                                                                                          ),
                                                                                                      ],
                                                                                              },
                                                                                              e.id
                                                                                          );
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                          }),
                                                          ev
                                                              ? (0, t.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-red-500',
                                                                        children:
                                                                            'Se estiver em SELECTED, você precisa selecionar pelo menos 1 empresa.',
                                                                    }
                                                                )
                                                              : (0, t.jsxs)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-content-secondary/70',
                                                                        children:
                                                                            [
                                                                                'Essas empresas vão no payload como',
                                                                                ' ',
                                                                                (0,
                                                                                t.jsx)(
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
                                                : (0, t.jsx)('p', {
                                                      className:
                                                          'mt-2 text-[11px] text-content-secondary/70',
                                                      children:
                                                          'Em ALL, não precisa selecionar empresas.',
                                                  }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'grid gap-3 sm:grid-cols-2',
                                        children: [
                                            (0, t.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, t.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Link do parceiro (ctaUrl)',
                                                            ' ',
                                                            (0, t.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, t.jsx)(C, {
                                                        icon: h.Link,
                                                        value: J,
                                                        onChange: (e) =>
                                                            X(e.target.value),
                                                        disabled: P,
                                                        placeholder:
                                                            'https://... ou www...',
                                                        className: T,
                                                    }),
                                                    (0, t.jsx)('p', {
                                                        className:
                                                            'text-[11px] text-content-secondary/70',
                                                        children:
                                                            'Aceita http(s) e “www.” (o servidor normaliza).',
                                                    }),
                                                ],
                                            }),
                                            (0, t.jsxs)('div', {
                                                className: 'space-y-2',
                                                children: [
                                                    (0, t.jsxs)('label', {
                                                        className:
                                                            'text-label-small text-content-secondary',
                                                        children: [
                                                            'Texto do botão (ctaLabel)',
                                                            ' ',
                                                            (0, t.jsx)('span', {
                                                                className:
                                                                    'text-red-500',
                                                                children: '*',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, t.jsx)(C, {
                                                        icon: b.ArrowRight,
                                                        value: _,
                                                        onChange: (e) =>
                                                            Q(e.target.value),
                                                        disabled: P,
                                                        className: T,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Descrição',
                                            }),
                                            (0, t.jsxs)('div', {
                                                className: 'relative',
                                                children: [
                                                    (0, t.jsx)('div', {
                                                        className:
                                                            'pointer-events-none absolute left-3 top-3',
                                                        children: (0, t.jsx)(
                                                            p.AlignLeft,
                                                            {
                                                                className:
                                                                    'h-4 w-4 text-content-brand',
                                                            }
                                                        ),
                                                    }),
                                                    (0, t.jsx)(l.Textarea, {
                                                        value: V,
                                                        onChange: (e) =>
                                                            K(e.target.value),
                                                        disabled: P,
                                                        rows: 3,
                                                        className: (0, d.cn)(
                                                            'pl-10',
                                                            A
                                                        ),
                                                        placeholder:
                                                            'Sobre o parceiro...',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Regras',
                                            }),
                                            (0, t.jsxs)('div', {
                                                className: 'relative',
                                                children: [
                                                    (0, t.jsx)('div', {
                                                        className:
                                                            'pointer-events-none absolute left-3 top-3',
                                                        children: (0, t.jsx)(
                                                            j.FileText,
                                                            {
                                                                className:
                                                                    'h-4 w-4 text-content-brand',
                                                            }
                                                        ),
                                                    }),
                                                    (0, t.jsx)(l.Textarea, {
                                                        value: $,
                                                        onChange: (e) =>
                                                            G(e.target.value),
                                                        disabled: P,
                                                        rows: 3,
                                                        className: (0, d.cn)(
                                                            'pl-10',
                                                            A
                                                        ),
                                                        placeholder:
                                                            'Condições e regras...',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, t.jsx)('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: (0, t.jsx)(i.Button, {
                                            type: 'button',
                                            variant: 'brand',
                                            disabled: P || ef,
                                            onClick: ej,
                                            title: eg
                                                ? 'Aguarde carregar as empresas'
                                                : er
                                                  ? 'Aguarde o upload da imagem'
                                                  : ev
                                                    ? 'Selecione pelo menos 1 empresa'
                                                    : eb
                                                      ? 'Preencha os campos obrigatórios'
                                                      : void 0,
                                            children: P
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
        e.s(['PartnerNewDialog', () => D], 503942);
    },
]);
