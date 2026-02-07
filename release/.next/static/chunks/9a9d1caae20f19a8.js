(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    295649,
    (e) => {
        'use strict';
        function a(e) {
            return e.json().catch(() => null);
        }
        function s(e, a) {
            return ('string' == typeof e?.error ? e.error : '') || a;
        }
        async function t(e) {
            let t = await fetch('/api/admin/professionals', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    cache: 'no-store',
                    body: JSON.stringify(e),
                }),
                r = await a(t);
            return t.ok && r?.ok
                ? { ok: !0, data: r.data }
                : { ok: !1, error: s(r, 'Erro ao criar profissional.') };
        }
        async function r(e, t) {
            let r = await fetch(
                    `/api/admin/professionals/${encodeURIComponent(e)}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        cache: 'no-store',
                        body: JSON.stringify(t),
                    }
                ),
                i = await a(r);
            return r.ok && i?.ok
                ? { ok: !0, data: i.data }
                : { ok: !1, error: s(i, 'Erro ao atualizar profissional.') };
        }
        e.s(['createProfessional', () => t, 'updateProfessional', () => r]);
    },
    717903,
    (e) => {
        'use strict';
        var a = e.i(565750),
            s = e.i(990341),
            t = e.i(245586),
            r = e.i(995403),
            i = e.i(230902),
            n = e.i(67356),
            l = e.i(519455),
            d = e.i(273443),
            o = e.i(776639),
            c = e.i(793479),
            m = e.i(967489),
            x = e.i(295649),
            p = e.i(975157),
            u = e.i(218074),
            h = e.i(826463),
            b = e.i(212409),
            v = e.i(263942),
            f = e.i(14435),
            g = e.i(559586),
            j = e.i(939397),
            y = e.i(257209);
        function N(e) {
            let { icon: s, className: t, ...r } = e;
            return (0, a.jsxs)('div', {
                className: 'relative',
                children: [
                    (0, a.jsx)('div', {
                        className:
                            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                        children: (0, a.jsx)(s, {
                            className: 'h-4 w-4 text-content-brand',
                        }),
                    }),
                    (0, a.jsx)(c.Input, {
                        ...r,
                        className: (0, p.cn)('pl-10', t),
                    }),
                ],
            });
        }
        let w =
            'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';
        async function S(e) {
            let a = new FormData();
            (a.append('file', e), a.append('module', 'PROFESSIONALS'));
            let s = await fetch('/api/admin/uploads', {
                    method: 'POST',
                    body: a,
                }),
                t = await s.json().catch(() => null);
            return s.ok && t && !0 === t.ok
                ? { ok: !0, data: t.data }
                : {
                      ok: !1,
                      error:
                          (t && !1 === t.ok && t.error) ||
                          'Não foi possível fazer upload da imagem.',
                  };
        }
        function k({ barber: e, units: i, selectedUnitIds: n }) {
            let d = (0, t.useRouter)(),
                k = (0, s.useRef)(null),
                [C, A] = (0, s.useState)(!1),
                [D, T] = (0, s.useState)(!1),
                [U, $] = (0, s.useState)(!1),
                [P, z] = (0, s.useState)(e.name ?? ''),
                [I, E] = (0, s.useState)(e.email ?? ''),
                [R, M] = (0, s.useState)(e.phone ?? ''),
                [O, B] = (0, s.useState)(e.imageUrl ?? ''),
                [q, F] = (0, s.useState)(''),
                L = (i?.length ?? 0) > 0,
                W = (0, s.useMemo)(
                    () => i.find((e) => e.isActive)?.id ?? '',
                    [i]
                ),
                [_, V] = (0, s.useState)(() => (n?.[0] ?? '') || W);
            async function H(e) {
                if (!e.type?.startsWith('image/'))
                    return void r.toast.error(
                        'Selecione um arquivo de imagem.'
                    );
                if (e.size > 5242880)
                    return void r.toast.error(
                        'Imagem muito grande. Máximo: 5MB.'
                    );
                $(!0);
                let a = await S(e);
                ($(!1), a.ok)
                    ? (B(a.data.url), r.toast.success('Imagem enviada!'))
                    : r.toast.error(a.error);
            }
            (0, s.useEffect)(() => {
                !C ||
                    (z(e.name ?? ''),
                    E(e.email ?? ''),
                    M(e.phone ?? ''),
                    B(e.imageUrl ?? ''),
                    F(''),
                    V((n?.[0] ?? '') || W),
                    $(!1),
                    k.current && (k.current.value = ''));
            }, [C, e.name, e.email, e.phone, e.imageUrl, n, W]);
            let K = (0, s.useMemo)(() => {
                    let e = O.trim();
                    if (!e) return null;
                    let a = String(e ?? '').trim();
                    if (!a) return null;
                    let s = a.toLowerCase();
                    if (s.startsWith('http://') || s.startsWith('https://'))
                        return a;
                    let t = a.startsWith('/') ? a : `/${a}`;
                    return `${window.location.origin}${t}`;
                }, [O]),
                Q = D || U,
                J = !L || !_;
            async function X(a) {
                if ((a.preventDefault(), Q)) return;
                if (!L)
                    return void r.toast.error(
                        'Crie pelo menos 1 unidade antes de cadastrar profissionais.'
                    );
                let s = i.find((e) => e.id === _) || null;
                if (!s || !s.isActive)
                    return void r.toast.error('Selecione uma unidade ativa.');
                T(!0);
                let t = await (0, x.updateProfessional)(e.id, {
                    name: P.trim(),
                    email: I.trim().toLowerCase(),
                    phone: R.trim(),
                    imageUrl: K,
                    password: q || void 0,
                    unitIds: [_],
                });
                (T(!1), t.ok)
                    ? (r.toast.success('Alterações salvas!'),
                      A(!1),
                      d.refresh())
                    : r.toast.error(t.error);
            }
            return (0, a.jsxs)(o.Dialog, {
                open: C,
                onOpenChange: (e) => {
                    Q || A(e);
                },
                children: [
                    (0, a.jsx)(o.DialogTrigger, {
                        asChild: !0,
                        children: (0, a.jsx)(l.Button, {
                            variant: 'edit2',
                            size: 'sm',
                            className:
                                'border-border-primary hover:bg-muted/40',
                            children: 'Editar',
                        }),
                    }),
                    (0, a.jsxs)(o.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, a.jsx)(o.DialogHeader, {
                                children: (0, a.jsx)(o.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Editar profissional',
                                }),
                            }),
                            (0, a.jsxs)('form', {
                                onSubmit: X,
                                className: 'space-y-4 pb-2',
                                children: [
                                    (0, a.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, a.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Unidade ',
                                                    (0, a.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, a.jsxs)(m.Select, {
                                                value: _,
                                                onValueChange: (e) => V(e),
                                                disabled: !L || Q,
                                                children: [
                                                    (0, a.jsx)(
                                                        m.SelectTrigger,
                                                        {
                                                            className:
                                                                'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                            children: (0,
                                                            a.jsxs)('div', {
                                                                className:
                                                                    'flex items-center gap-2',
                                                                children: [
                                                                    (0, a.jsx)(
                                                                        v.Building2,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4 text-content-brand',
                                                                        }
                                                                    ),
                                                                    (0, a.jsx)(
                                                                        m.SelectValue,
                                                                        {
                                                                            placeholder:
                                                                                L
                                                                                    ? 'Selecione a unidade'
                                                                                    : 'Nenhuma unidade cadastrada',
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                        }
                                                    ),
                                                    (0, a.jsx)(
                                                        m.SelectContent,
                                                        {
                                                            children: i.map(
                                                                (e) =>
                                                                    (0, a.jsxs)(
                                                                        m.SelectItem,
                                                                        {
                                                                            value: e.id,
                                                                            disabled:
                                                                                !e.isActive,
                                                                            children:
                                                                                [
                                                                                    e.name,
                                                                                    ' ',
                                                                                    e.isActive
                                                                                        ? ''
                                                                                        : '(inativa)',
                                                                                ],
                                                                        },
                                                                        e.id
                                                                    )
                                                            ),
                                                        }
                                                    ),
                                                ],
                                            }),
                                            J
                                                ? (0, a.jsx)('p', {
                                                      className:
                                                          'text-xs text-red-500',
                                                      children:
                                                          'Selecione uma unidade ativa.',
                                                  })
                                                : null,
                                        ],
                                    }),
                                    (0, a.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, a.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children:
                                                    'Foto do profissional',
                                            }),
                                            (0, a.jsx)('input', {
                                                ref: k,
                                                type: 'file',
                                                accept: 'image/*',
                                                className: 'hidden',
                                                disabled: Q,
                                                onChange: (e) => {
                                                    let a =
                                                        e.currentTarget
                                                            .files?.[0];
                                                    a && H(a);
                                                },
                                            }),
                                            (0, a.jsxs)('div', {
                                                className:
                                                    'grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start',
                                                children: [
                                                    (0, a.jsx)('div', {
                                                        className: 'space-y-2',
                                                        children: (0, a.jsxs)(
                                                            'div',
                                                            {
                                                                className:
                                                                    'relative',
                                                                children: [
                                                                    (0, a.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                            children:
                                                                                (0,
                                                                                a.jsx)(
                                                                                    u.Image,
                                                                                    {
                                                                                        className:
                                                                                            'h-4 w-4 text-content-brand',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                    (0, a.jsx)(
                                                                        c.Input,
                                                                        {
                                                                            value:
                                                                                K ??
                                                                                '',
                                                                            readOnly:
                                                                                !0,
                                                                            placeholder:
                                                                                'Escolha seu arquivo clicando em Upload.',
                                                                            className:
                                                                                (0,
                                                                                p.cn)(
                                                                                    'pl-10 pr-10',
                                                                                    w
                                                                                ),
                                                                        }
                                                                    ),
                                                                    K
                                                                        ? (0,
                                                                          a.jsx)(
                                                                              'button',
                                                                              {
                                                                                  type: 'button',
                                                                                  className:
                                                                                      'absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary hover:text-content-primary',
                                                                                  onClick:
                                                                                      () => {
                                                                                          (B(
                                                                                              ''
                                                                                          ),
                                                                                              k.current &&
                                                                                                  (k.current.value =
                                                                                                      ''));
                                                                                      },
                                                                                  disabled:
                                                                                      Q,
                                                                                  title: 'Remover imagem',
                                                                                  children:
                                                                                      (0,
                                                                                      a.jsx)(
                                                                                          b.X,
                                                                                          {
                                                                                              className:
                                                                                                  'h-4 w-4',
                                                                                          }
                                                                                      ),
                                                                              }
                                                                          )
                                                                        : null,
                                                                ],
                                                            }
                                                        ),
                                                    }),
                                                    (0, a.jsx)(l.Button, {
                                                        type: 'button',
                                                        variant: 'brand',
                                                        className: 'h-10',
                                                        onClick: () =>
                                                            k.current?.click(),
                                                        disabled: Q,
                                                        title: U
                                                            ? 'Enviando...'
                                                            : void 0,
                                                        children: (0, a.jsxs)(
                                                            'span',
                                                            {
                                                                className:
                                                                    'inline-flex items-center gap-2',
                                                                children: [
                                                                    (0, a.jsx)(
                                                                        h.Upload,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4',
                                                                        }
                                                                    ),
                                                                    U
                                                                        ? 'Enviando...'
                                                                        : 'Upload',
                                                                ],
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            K
                                                ? (0, a.jsx)('div', {
                                                      className:
                                                          'overflow-hidden rounded-xl border border-border-primary bg-background-tertiary',
                                                      children: (0, a.jsx)(
                                                          'img',
                                                          {
                                                              src: K,
                                                              alt: 'Preview do profissional',
                                                              className:
                                                                  'h-40 w-full object-cover',
                                                          }
                                                      ),
                                                  })
                                                : null,
                                        ],
                                    }),
                                    (0, a.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, a.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Nome ',
                                                    (0, a.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, a.jsx)(N, {
                                                icon: f.User,
                                                name: 'name',
                                                required: !0,
                                                value: P,
                                                onChange: (e) =>
                                                    z(e.target.value),
                                                disabled: Q,
                                                className: w,
                                            }),
                                        ],
                                    }),
                                    (0, a.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, a.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'E-mail ',
                                                    (0, a.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, a.jsx)(N, {
                                                icon: g.Mail,
                                                type: 'email',
                                                name: 'email',
                                                required: !0,
                                                value: I,
                                                onChange: (e) =>
                                                    E(e.target.value),
                                                disabled: Q,
                                                className: w,
                                            }),
                                        ],
                                    }),
                                    (0, a.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, a.jsxs)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: [
                                                    'Telefone ',
                                                    (0, a.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, a.jsx)(N, {
                                                icon: j.Phone,
                                                name: 'phone',
                                                required: !0,
                                                placeholder: '(99) 99999-9999',
                                                value: R ?? '',
                                                onChange: function (e) {
                                                    let a = e.target.value
                                                        .replace(/\D/g, '')
                                                        .slice(0, 11);
                                                    M(
                                                        (a =
                                                            a.length <= 10
                                                                ? a
                                                                      .replace(
                                                                          /(\d{2})(\d)/,
                                                                          '($1) $2'
                                                                      )
                                                                      .replace(
                                                                          /(\d{4})(\d)/,
                                                                          '$1-$2'
                                                                      )
                                                                : a
                                                                      .replace(
                                                                          /(\d{2})(\d)/,
                                                                          '($1) $2'
                                                                      )
                                                                      .replace(
                                                                          /(\d{5})(\d)/,
                                                                          '$1-$2'
                                                                      ))
                                                    );
                                                },
                                                disabled: Q,
                                                className: w,
                                            }),
                                        ],
                                    }),
                                    (0, a.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, a.jsx)('label', {
                                                className:
                                                    'text-label-small text-content-secondary',
                                                children: 'Nova senha',
                                            }),
                                            (0, a.jsx)(N, {
                                                icon: y.KeyRound,
                                                type: 'password',
                                                name: 'password',
                                                value: q,
                                                onChange: (e) =>
                                                    F(e.target.value),
                                                disabled: Q,
                                                placeholder:
                                                    'Preencha para alterar a senha',
                                                className: w,
                                            }),
                                            (0, a.jsxs)('p', {
                                                className:
                                                    'text-[11px] text-content-secondary',
                                                children: [
                                                    'Deixe vazio para manter a senha atual. Se preencher: mín. 6, 1 maiúscula, 1 número e 1 especial (!@#$%^&*()_+-=[]',
                                                    ';\':",.<>/?\\|)',
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, a.jsx)('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: (0, a.jsx)(l.Button, {
                                            type: 'submit',
                                            variant: 'brand',
                                            disabled: Q || J,
                                            title: J
                                                ? 'Selecione uma unidade ativa'
                                                : void 0,
                                            children: U
                                                ? 'Enviando...'
                                                : D
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
        let C = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            A = [
                'Domingo',
                'Segunda-feira',
                'Terça-feira',
                'Quarta-feira',
                'Quinta-feira',
                'Sexta-feira',
                'Sábado',
            ];
        function D(e, a) {
            return String(e.startTime ?? '').localeCompare(
                String(a.startTime ?? '')
            );
        }
        function T({ row: e, units: o }) {
            let c = (0, t.useRouter)(),
                [m, p] = (0, s.useState)(!1),
                u = (0, s.useMemo)(
                    () =>
                        e.imageUrl
                            ? (function (e) {
                                  let a = String(e ?? '').trim();
                                  if (!a) return null;
                                  let s = a.toLowerCase();
                                  if (
                                      s.startsWith('http://') ||
                                      s.startsWith('https://')
                                  )
                                      return a;
                                  let t = a.startsWith('/') ? a : `/${a}`;
                                  return `${window.location.origin}${t}`;
                              })(e.imageUrl)
                            : null,
                    [e.imageUrl]
                ),
                h = !!e.isActive,
                b = e.selectedUnitIds ?? [],
                v = (0, s.useMemo)(() => {
                    if (e.unitsSummaryLabel) return e.unitsSummaryLabel;
                    let a = e.linkedUnits ?? [];
                    return 0 === a.length
                        ? 'Sem unidade'
                        : a.length <= 2
                          ? a.map((e) => e.name).join(' • ')
                          : `${a.length} unidades`;
                }, [e.unitsSummaryLabel, e.linkedUnits]),
                f = (0, s.useMemo)(
                    () =>
                        (e.linkedUnits ?? [])
                            .slice()
                            .sort((e, a) =>
                                e.name.localeCompare(a.name, 'pt-BR')
                            ),
                    [e.linkedUnits]
                ),
                g = e.weeklyAvailabilities ?? [],
                j = e.dailyAvailabilities ?? [],
                y = e.reviewStats ?? null,
                N = (0, s.useMemo)(
                    () =>
                        (function (e) {
                            let a = new Map();
                            for (let s of e ?? []) {
                                let e = (function (e) {
                                    let a = Number(e);
                                    return Number.isFinite(a)
                                        ? a >= 0 && a <= 6
                                            ? a
                                            : a >= 1 && a <= 7
                                              ? a - 1
                                              : -1
                                        : -1;
                                })(s.weekday);
                                e < 0 || a.set(e, s);
                            }
                            return a;
                        })(g),
                    [g]
                ),
                w = y ? y.avgRating.toFixed(2) : '—';
            async function S() {
                if (m) return;
                p(!0);
                let a = await (0, x.updateProfessional)(e.id, { isActive: !h });
                (p(!1), a.ok)
                    ? (r.toast.success(
                          h
                              ? 'Profissional desativado.'
                              : 'Profissional ativado.'
                      ),
                      c.refresh())
                    : r.toast.error(a.error);
            }
            return (0, a.jsxs)(d.AccordionItem, {
                value: e.id,
                className:
                    'border border-border-primary rounded-xl bg-background-tertiary',
                children: [
                    (0, a.jsxs)('div', {
                        className:
                            'grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(0,2fr)_auto] items-center gap-6 px-4 py-3',
                        children: [
                            (0, a.jsx)(d.AccordionTrigger, {
                                className:
                                    'flex items-center gap-3 min-w-0 hover:no-underline px-0 py-0',
                                children: (0, a.jsxs)('div', {
                                    className:
                                        'flex items-center gap-3 min-w-0',
                                    children: [
                                        (0, a.jsx)('div', {
                                            className:
                                                'h-10 w-10 rounded-full bg-background-secondary border border-border-primary overflow-hidden flex items-center justify-center shrink-0',
                                            children: u
                                                ? (0, a.jsx)('img', {
                                                      src: u,
                                                      alt: e.name,
                                                      className:
                                                          'h-full w-full object-cover',
                                                  })
                                                : (0, a.jsx)('span', {
                                                      className:
                                                          'text-xs font-medium text-content-secondary',
                                                      children: (e.name || '?')
                                                          .split(' ')
                                                          .map((e) => e[0])
                                                          .join('')
                                                          .slice(0, 2)
                                                          .toUpperCase(),
                                                  }),
                                        }),
                                        (0, a.jsxs)('div', {
                                            className: 'flex flex-col min-w-0',
                                            children: [
                                                (0, a.jsxs)('div', {
                                                    className:
                                                        'flex items-center gap-2 min-w-0',
                                                    children: [
                                                        (0, a.jsx)('p', {
                                                            className:
                                                                'text-paragraph-medium-size font-semibold text-content-primary truncate',
                                                            children: e.name,
                                                        }),
                                                        'boolean' ==
                                                            typeof e.isActive &&
                                                            (0, a.jsx)('span', {
                                                                className:
                                                                    'shrink-0 text-[11px] px-2 py-0.5 rounded-full border border-border-primary text-content-secondary',
                                                                children: h
                                                                    ? 'Ativo'
                                                                    : 'Inativo',
                                                            }),
                                                    ],
                                                }),
                                                (0, a.jsxs)('p', {
                                                    className:
                                                        'text-xs text-content-secondary truncate',
                                                    children: [
                                                        e.email || 'Sem e-mail',
                                                        ' ',
                                                        (0, a.jsx)('span', {
                                                            className:
                                                                'mx-1 text-content-tertiary',
                                                            children: '•',
                                                        }),
                                                        ' ',
                                                        (0, a.jsx)('span', {
                                                            className:
                                                                'text-content-secondary',
                                                            children: v,
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                            (0, a.jsxs)('div', {
                                className:
                                    'hidden md:block min-w-0 whitespace-nowrap text-xs text-content-primary truncate',
                                children: [
                                    (0, a.jsx)('span', {
                                        className:
                                            'text-content-secondary mr-1',
                                        children: 'Escala semanal:',
                                    }),
                                    e.weeklyScheduleLabel ?? '—',
                                ],
                            }),
                            (0, a.jsxs)('div', {
                                className:
                                    'hidden md:block min-w-0 whitespace-nowrap text-xs text-content-primary truncate',
                                children: [
                                    (0, a.jsx)('span', {
                                        className:
                                            'text-content-secondary mr-1',
                                        children: 'Exceções:',
                                    }),
                                    e.exceptionsLabel ?? '—',
                                ],
                            }),
                            (0, a.jsxs)('div', {
                                className:
                                    'flex items-center justify-end gap-2 whitespace-nowrap',
                                children: [
                                    (0, a.jsx)(k, {
                                        barber: {
                                            id: e.id,
                                            name: e.name,
                                            email: e.email ?? '',
                                            phone: e.phone ?? null,
                                            isActive: h,
                                            createdAt:
                                                e.createdAt ?? new Date(),
                                            updatedAt:
                                                e.updatedAt ?? new Date(),
                                            userId: e.userId ?? null,
                                            imageUrl: e.imageUrl ?? null,
                                        },
                                        units: o,
                                        selectedUnitIds: b,
                                    }),
                                    (0, a.jsx)(l.Button, {
                                        type: 'button',
                                        variant: h ? 'destructive' : 'active',
                                        size: 'sm',
                                        className:
                                            'border-border-primary hover:bg-muted/40',
                                        disabled: m,
                                        onClick: S,
                                        children: m
                                            ? 'Salvando...'
                                            : h
                                              ? 'Desativar'
                                              : 'Ativar',
                                    }),
                                ],
                            }),
                        ],
                    }),
                    (0, a.jsx)(d.AccordionContent, {
                        className: 'border-t border-border-primary px-4 py-4',
                        children: (0, a.jsxs)('div', {
                            className: 'space-y-6',
                            children: [
                                (0, a.jsxs)('div', {
                                    className:
                                        'rounded-2xl border border-border-primary bg-background-secondary p-4 space-y-3',
                                    children: [
                                        (0, a.jsxs)('div', {
                                            children: [
                                                (0, a.jsx)('h2', {
                                                    className:
                                                        'text-label-small text-content-primary',
                                                    children:
                                                        'Unidades vinculadas',
                                                }),
                                                (0, a.jsx)('p', {
                                                    className:
                                                        'text-paragraph-small text-content-secondary',
                                                    children:
                                                        'Onde este profissional pode atuar (vínculos ativos).',
                                                }),
                                            ],
                                        }),
                                        0 === f.length
                                            ? (0, a.jsx)('div', {
                                                  className:
                                                      'rounded-xl border border-dashed border-border-primary bg-background-tertiary px-4 py-6 text-center text-paragraph-small text-content-secondary',
                                                  children:
                                                      'Nenhuma unidade vinculada ainda.',
                                              })
                                            : (0, a.jsx)('div', {
                                                  className:
                                                      'flex flex-wrap gap-2',
                                                  children: f.map((e) =>
                                                      (0, a.jsx)(
                                                          'span',
                                                          {
                                                              className:
                                                                  'rounded-full border border-border-primary bg-background-tertiary px-3 py-1 text-[11px] text-content-secondary',
                                                              children: e.name,
                                                          },
                                                          e.id
                                                      )
                                                  ),
                                              }),
                                    ],
                                }),
                                (0, a.jsxs)('div', {
                                    className:
                                        'rounded-2xl border border-border-primary bg-background-secondary p-4 space-y-4',
                                    children: [
                                        (0, a.jsxs)('div', {
                                            className:
                                                'flex flex-col md:flex-row md:items-center md:justify-between gap-2',
                                            children: [
                                                (0, a.jsxs)('div', {
                                                    children: [
                                                        (0, a.jsx)('h2', {
                                                            className:
                                                                'text-label-small text-content-primary',
                                                            children:
                                                                'Reputação do profissional',
                                                        }),
                                                        (0, a.jsx)('p', {
                                                            className:
                                                                'text-paragraph-small text-content-secondary',
                                                            children:
                                                                'Visão geral das avaliações feitas pelos clientes nos atendimentos deste profissional.',
                                                        }),
                                                    ],
                                                }),
                                                y &&
                                                    (0, a.jsxs)('div', {
                                                        className: 'text-right',
                                                        children: [
                                                            (0, a.jsx)('p', {
                                                                className:
                                                                    'text-paragraph-small text-content-secondary',
                                                                children:
                                                                    'Nota média',
                                                            }),
                                                            (0, a.jsxs)('p', {
                                                                className:
                                                                    'text-title font-semibold text-content-primary',
                                                                children: [
                                                                    w,
                                                                    (0, a.jsx)(
                                                                        'span',
                                                                        {
                                                                            className:
                                                                                'ml-2 text-yellow-500 align-middle',
                                                                            children:
                                                                                '★'.repeat(
                                                                                    Math.max(
                                                                                        0,
                                                                                        Math.min(
                                                                                            5,
                                                                                            Math.round(
                                                                                                y.avgRating
                                                                                            )
                                                                                        )
                                                                                    )
                                                                                ),
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                            (0, a.jsxs)('p', {
                                                                className:
                                                                    'text-paragraph-small text-content-secondary',
                                                                children: [
                                                                    y.totalReviews,
                                                                    ' ',
                                                                    1 ===
                                                                    y.totalReviews
                                                                        ? 'avaliação'
                                                                        : 'avaliações',
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                            ],
                                        }),
                                        y
                                            ? (0, a.jsxs)('div', {
                                                  className:
                                                      'grid gap-4 md:grid-cols-[2fr,3fr]',
                                                  children: [
                                                      (0, a.jsxs)('div', {
                                                          className:
                                                              'space-y-2',
                                                          children: [
                                                              (0, a.jsx)('p', {
                                                                  className:
                                                                      'text-label-small text-content-primary',
                                                                  children:
                                                                      'Distribuição de notas',
                                                              }),
                                                              (0, a.jsx)(
                                                                  'div',
                                                                  {
                                                                      className:
                                                                          'space-y-1 text-[11px] text-content-secondary',
                                                                      children:
                                                                          y.ratingsCount.map(
                                                                              (
                                                                                  e
                                                                              ) =>
                                                                                  (0,
                                                                                  a.jsxs)(
                                                                                      'div',
                                                                                      {
                                                                                          className:
                                                                                              'flex items-center justify-between gap-2',
                                                                                          children:
                                                                                              [
                                                                                                  (0,
                                                                                                  a.jsx)(
                                                                                                      'span',
                                                                                                      {
                                                                                                          className:
                                                                                                              'flex items-center gap-1',
                                                                                                          children:
                                                                                                              (0,
                                                                                                              a.jsxs)(
                                                                                                                  'span',
                                                                                                                  {
                                                                                                                      className:
                                                                                                                          'text-yellow-500',
                                                                                                                      children:
                                                                                                                          [
                                                                                                                              e.rating,
                                                                                                                              '★',
                                                                                                                          ],
                                                                                                                  }
                                                                                                              ),
                                                                                                      }
                                                                                                  ),
                                                                                                  (0,
                                                                                                  a.jsx)(
                                                                                                      'span',
                                                                                                      {
                                                                                                          className:
                                                                                                              'text-content-primary font-medium',
                                                                                                          children:
                                                                                                              e.count,
                                                                                                      }
                                                                                                  ),
                                                                                              ],
                                                                                      },
                                                                                      e.rating
                                                                                  )
                                                                          ),
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, a.jsxs)('div', {
                                                          className:
                                                              'space-y-2',
                                                          children: [
                                                              (0, a.jsx)('p', {
                                                                  className:
                                                                      'text-label-small text-content-primary',
                                                                  children:
                                                                      'Principais motivos citados',
                                                              }),
                                                              0 ===
                                                              y.topTags.length
                                                                  ? (0, a.jsx)(
                                                                        'p',
                                                                        {
                                                                            className:
                                                                                'text-[11px] text-content-secondary',
                                                                            children:
                                                                                'Ainda não há tags suficientes para exibir aqui.',
                                                                        }
                                                                    )
                                                                  : (0, a.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex flex-wrap gap-2',
                                                                            children:
                                                                                y.topTags.map(
                                                                                    (
                                                                                        e
                                                                                    ) =>
                                                                                        (0,
                                                                                        a.jsxs)(
                                                                                            'span',
                                                                                            {
                                                                                                className:
                                                                                                    'rounded-full border border-border-primary bg-background-tertiary px-3 py-1 text-[11px] text-content-secondary',
                                                                                                children:
                                                                                                    [
                                                                                                        e.label,
                                                                                                        ' ',
                                                                                                        (0,
                                                                                                        a.jsxs)(
                                                                                                            'span',
                                                                                                            {
                                                                                                                className:
                                                                                                                    'text-content-tertiary',
                                                                                                                children:
                                                                                                                    [
                                                                                                                        '· ',
                                                                                                                        e.count,
                                                                                                                    ],
                                                                                                            }
                                                                                                        ),
                                                                                                    ],
                                                                                            },
                                                                                            e.label
                                                                                        )
                                                                                ),
                                                                        }
                                                                    ),
                                                          ],
                                                      }),
                                                  ],
                                              })
                                            : (0, a.jsx)('div', {
                                                  className:
                                                      'mt-2 rounded-xl border border-dashed border-border-primary bg-background-tertiary px-4 py-6 text-center text-paragraph-small text-content-secondary',
                                                  children:
                                                      'Ainda não há avaliações registradas para este profissional.',
                                              }),
                                    ],
                                }),
                                (0, a.jsxs)('div', {
                                    className:
                                        'rounded-2xl border border-border-primary bg-background-secondary p-4 space-y-4',
                                    children: [
                                        (0, a.jsxs)('div', {
                                            children: [
                                                (0, a.jsx)('h2', {
                                                    className:
                                                        'text-label-small text-zinc-100',
                                                    children: 'Disponibilidade',
                                                }),
                                                (0, a.jsx)('p', {
                                                    className:
                                                        'text-paragraph-small text-zinc-400',
                                                    children:
                                                        'Visualização dos horários salvos pelo profissional. Alterações devem ser feitas no painel dele.',
                                                }),
                                            ],
                                        }),
                                        (0, a.jsx)('div', {
                                            className:
                                                'grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7',
                                            children: C.map((e, s) => {
                                                let t = A[s],
                                                    r = N.get(s) ?? {
                                                        weekday: s,
                                                        isActive: !1,
                                                        intervals: [],
                                                    },
                                                    i =
                                                        !!r.isActive &&
                                                        (r.intervals?.length ??
                                                            0) > 0;
                                                return (0, a.jsxs)(
                                                    'div',
                                                    {
                                                        className:
                                                            'rounded-xl border border-zinc-700 bg-zinc-900/40 p-3 space-y-3',
                                                        children: [
                                                            (0, a.jsxs)('div', {
                                                                className:
                                                                    'flex items-center justify-between',
                                                                children: [
                                                                    (0, a.jsxs)(
                                                                        'div',
                                                                        {
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    a.jsx)(
                                                                                        'p',
                                                                                        {
                                                                                            className:
                                                                                                'text-xs text-zinc-400',
                                                                                            children:
                                                                                                e,
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    a.jsx)(
                                                                                        'p',
                                                                                        {
                                                                                            className:
                                                                                                'text-paragraph-small text-zinc-100 font-medium',
                                                                                            children:
                                                                                                t,
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    (0, a.jsx)(
                                                                        'span',
                                                                        {
                                                                            className:
                                                                                [
                                                                                    'text-[11px] px-2 py-0.5 rounded-full border',
                                                                                    i
                                                                                        ? 'border-emerald-500/60 text-emerald-300'
                                                                                        : 'border-zinc-700 text-zinc-300',
                                                                                ].join(
                                                                                    ' '
                                                                                ),
                                                                            children:
                                                                                i
                                                                                    ? 'Sim'
                                                                                    : 'Não',
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                            (0, a.jsx)('div', {
                                                                className:
                                                                    'space-y-1 text-[11px] text-zinc-100',
                                                                children: i
                                                                    ? (
                                                                          r.intervals ??
                                                                          []
                                                                      )
                                                                          .slice()
                                                                          .sort(
                                                                              D
                                                                          )
                                                                          .map(
                                                                              (
                                                                                  e,
                                                                                  s
                                                                              ) =>
                                                                                  (0,
                                                                                  a.jsxs)(
                                                                                      'p',
                                                                                      {
                                                                                          children:
                                                                                              [
                                                                                                  'Das',
                                                                                                  ' ',
                                                                                                  (0,
                                                                                                  a.jsx)(
                                                                                                      'span',
                                                                                                      {
                                                                                                          className:
                                                                                                              'font-medium',
                                                                                                          children:
                                                                                                              e.startTime,
                                                                                                      }
                                                                                                  ),
                                                                                                  ' ',
                                                                                                  'até',
                                                                                                  ' ',
                                                                                                  (0,
                                                                                                  a.jsx)(
                                                                                                      'span',
                                                                                                      {
                                                                                                          className:
                                                                                                              'font-medium',
                                                                                                          children:
                                                                                                              e.endTime,
                                                                                                      }
                                                                                                  ),
                                                                                              ],
                                                                                      },
                                                                                      s
                                                                                  )
                                                                          )
                                                                    : (0,
                                                                      a.jsx)(
                                                                          'p',
                                                                          {
                                                                              className:
                                                                                  'text-zinc-400',
                                                                              children:
                                                                                  'Sem horário definido.',
                                                                          }
                                                                      ),
                                                            }),
                                                        ],
                                                    },
                                                    s
                                                );
                                            }),
                                        }),
                                        (0, a.jsx)('p', {
                                            className:
                                                'text-[11px] text-zinc-400',
                                            children:
                                                'As exceções por dia (folgas, eventos, ajustes pontuais) estão listadas abaixo.',
                                        }),
                                    ],
                                }),
                                (0, a.jsxs)('div', {
                                    className: 'space-y-2',
                                    children: [
                                        (0, a.jsx)('h3', {
                                            className:
                                                'text-label-small text-content-primary',
                                            children: 'Exceções por dia',
                                        }),
                                        (0, a.jsx)('p', {
                                            className:
                                                'text-paragraph-small text-content-secondary',
                                            children:
                                                'Visualização de dias com horários diferentes do padrão semanal.',
                                        }),
                                        0 === j.length
                                            ? (0, a.jsx)('div', {
                                                  className:
                                                      'mt-2 rounded-xl border border-dashed border-border-primary bg-background-secondary px-4 py-6 text-center text-paragraph-small text-content-secondary',
                                                  children:
                                                      'Este profissional ainda não possui nenhuma exceção cadastrada.',
                                              })
                                            : (0, a.jsx)('div', {
                                                  className: 'mt-2 space-y-2',
                                                  children: j
                                                      .slice()
                                                      .sort(
                                                          (e, a) =>
                                                              new Date(
                                                                  e.date
                                                              ).getTime() -
                                                              new Date(
                                                                  a.date
                                                              ).getTime()
                                                      )
                                                      .map((e, s) => {
                                                          let t =
                                                              e.date instanceof
                                                              Date
                                                                  ? e.date
                                                                  : new Date(
                                                                        e.date
                                                                    );
                                                          return (0, a.jsxs)(
                                                              'div',
                                                              {
                                                                  className:
                                                                      'rounded-xl border border-border-primary bg-background-secondary px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2',
                                                                  children: [
                                                                      (0,
                                                                      a.jsxs)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'space-y-1',
                                                                              children:
                                                                                  [
                                                                                      (0,
                                                                                      a.jsx)(
                                                                                          'p',
                                                                                          {
                                                                                              className:
                                                                                                  'text-paragraph-small text-content-primary font-medium',
                                                                                              children:
                                                                                                  (0,
                                                                                                  i.format)(
                                                                                                      t,
                                                                                                      'dd/MM/yyyy',
                                                                                                      {
                                                                                                          locale: n.ptBR,
                                                                                                      }
                                                                                                  ),
                                                                                          }
                                                                                      ),
                                                                                      (0,
                                                                                      a.jsx)(
                                                                                          'p',
                                                                                          {
                                                                                              className:
                                                                                                  'text-[11px] text-content-secondary',
                                                                                              children:
                                                                                                  'DAY_OFF' ===
                                                                                                  e.type
                                                                                                      ? 'Dia de folga'
                                                                                                      : 'Horário personalizado',
                                                                                          }
                                                                                      ),
                                                                                  ],
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      a.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'text-[11px] text-content-primary',
                                                                              children:
                                                                                  'DAY_OFF' ===
                                                                                  e.type
                                                                                      ? (0,
                                                                                        a.jsx)(
                                                                                            'p',
                                                                                            {
                                                                                                children:
                                                                                                    'Sem atendimento neste dia.',
                                                                                            }
                                                                                        )
                                                                                      : 0 ===
                                                                                          (
                                                                                              e.intervals ??
                                                                                              []
                                                                                          )
                                                                                              .length
                                                                                        ? (0,
                                                                                          a.jsx)(
                                                                                              'p',
                                                                                              {
                                                                                                  className:
                                                                                                      'text-content-secondary',
                                                                                                  children:
                                                                                                      'Sem intervalos definidos.',
                                                                                              }
                                                                                          )
                                                                                        : (
                                                                                              e.intervals ??
                                                                                              []
                                                                                          ).map(
                                                                                              (
                                                                                                  e,
                                                                                                  s
                                                                                              ) =>
                                                                                                  (0,
                                                                                                  a.jsxs)(
                                                                                                      'p',
                                                                                                      {
                                                                                                          children:
                                                                                                              [
                                                                                                                  'Das',
                                                                                                                  ' ',
                                                                                                                  (0,
                                                                                                                  a.jsx)(
                                                                                                                      'span',
                                                                                                                      {
                                                                                                                          className:
                                                                                                                              'font-medium',
                                                                                                                          children:
                                                                                                                              e.startTime,
                                                                                                                      }
                                                                                                                  ),
                                                                                                                  ' ',
                                                                                                                  'até',
                                                                                                                  ' ',
                                                                                                                  (0,
                                                                                                                  a.jsx)(
                                                                                                                      'span',
                                                                                                                      {
                                                                                                                          className:
                                                                                                                              'font-medium',
                                                                                                                          children:
                                                                                                                              e.endTime,
                                                                                                                      }
                                                                                                                  ),
                                                                                                              ],
                                                                                                      },
                                                                                                      s
                                                                                                  )
                                                                                          ),
                                                                          }
                                                                      ),
                                                                  ],
                                                              },
                                                              s
                                                          );
                                                      }),
                                              }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        e.s(['ProfessionalRow', () => T], 717903);
    },
    6390,
    (e) => {
        'use strict';
        var a = e.i(565750),
            s = e.i(990341),
            t = e.i(995403),
            r = e.i(245586),
            i = e.i(776639),
            n = e.i(519455),
            l = e.i(793479),
            d = e.i(967489),
            o = e.i(295649),
            c = e.i(975157),
            m = e.i(218074),
            x = e.i(826463),
            p = e.i(212409),
            u = e.i(263942),
            h = e.i(14435),
            b = e.i(559586),
            v = e.i(939397),
            f = e.i(257209);
        function g(e) {
            let { icon: s, className: t, ...r } = e;
            return (0, a.jsxs)('div', {
                className: 'relative',
                children: [
                    (0, a.jsx)('div', {
                        className:
                            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                        children: (0, a.jsx)(s, {
                            className: 'h-4 w-4 text-content-brand',
                        }),
                    }),
                    (0, a.jsx)(l.Input, {
                        ...r,
                        className: (0, c.cn)('pl-10', t),
                    }),
                ],
            });
        }
        let j =
            'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';
        async function y(e) {
            let a = new FormData();
            (a.append('file', e), a.append('module', 'PROFESSIONALS'));
            let s = await fetch('/api/admin/uploads', {
                    method: 'POST',
                    body: a,
                }),
                t = await s.json().catch(() => null);
            return s.ok && t && !0 === t.ok
                ? { ok: !0, data: t.data }
                : {
                      ok: !1,
                      error:
                          (t && !1 === t.ok && t.error) ||
                          'Não foi possível fazer upload da imagem.',
                  };
        }
        function N({ units: e }) {
            let N = (0, r.useRouter)(),
                w = (0, s.useRef)(null),
                [S, k] = (0, s.useState)(!1),
                [C, A] = (0, s.useState)(!1),
                [D, T] = (0, s.useState)(!1),
                [U, $] = (0, s.useState)(''),
                [P, z] = (0, s.useState)(''),
                [I, E] = (0, s.useState)(''),
                [R, M] = (0, s.useState)(''),
                O = (e?.length ?? 0) > 0,
                B = (0, s.useMemo)(
                    () => e.find((e) => e.isActive)?.id ?? '',
                    [e]
                ),
                [q, F] = (0, s.useState)(B),
                [L, W] = (0, s.useState)('');
            function _() {
                ($(''),
                    z(''),
                    E(''),
                    M(''),
                    F(B),
                    W(''),
                    T(!1),
                    w.current && (w.current.value = ''));
            }
            async function V(e) {
                if (!e.type?.startsWith('image/'))
                    return void t.toast.error(
                        'Selecione um arquivo de imagem.'
                    );
                if (e.size > 5242880)
                    return void t.toast.error(
                        'Imagem muito grande. Máximo: 5MB.'
                    );
                T(!0);
                let a = await y(e);
                (T(!1), a.ok)
                    ? (W(a.data.url), t.toast.success('Imagem enviada!'))
                    : t.toast.error(a.error);
            }
            (0, s.useEffect)(() => {
                S && F((e) => e || B);
            }, [S, B]);
            let H = (0, s.useMemo)(() => {
                let e = L.trim();
                if (!e) return null;
                let a = String(e ?? '').trim();
                if (!a) return null;
                let s = a.toLowerCase();
                if (s.startsWith('http://') || s.startsWith('https://'))
                    return a;
                let t = a.startsWith('/') ? a : `/${a}`;
                return `${window.location.origin}${t}`;
            }, [L]);
            async function K(a) {
                if ((a.preventDefault(), C || D)) return;
                if (!O)
                    return void t.toast.error(
                        'Crie pelo menos 1 unidade antes de cadastrar profissionais.'
                    );
                let s = e.find((e) => e.id === q) || null;
                if (!s || !s.isActive)
                    return void t.toast.error('Selecione uma unidade ativa.');
                A(!0);
                let r = await (0, o.createProfessional)({
                    name: U.trim(),
                    email: P.trim().toLowerCase(),
                    phone: I.trim(),
                    password: R,
                    unitIds: [q],
                    imageUrl: H,
                });
                (A(!1), r.ok)
                    ? (t.toast.success('Profissional criado com sucesso!'),
                      k(!1),
                      _(),
                      N.refresh())
                    : t.toast.error(r.error);
            }
            let Q = C || D,
                J = !O || !q;
            return (0, a.jsxs)(i.Dialog, {
                open: S,
                onOpenChange: (e) => {
                    !Q && (k(e), e || _());
                },
                children: [
                    (0, a.jsx)(i.DialogTrigger, {
                        asChild: !0,
                        children: (0, a.jsx)(n.Button, {
                            variant: 'brand',
                            disabled: !O,
                            children: 'Novo profissional',
                        }),
                    }),
                    (0, a.jsxs)(i.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, a.jsx)(i.DialogHeader, {
                                children: (0, a.jsx)(i.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Novo profissional',
                                }),
                            }),
                            O
                                ? (0, a.jsxs)('form', {
                                      onSubmit: K,
                                      className: 'space-y-4 pb-2',
                                      children: [
                                          (0, a.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, a.jsxs)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'Unidade ',
                                                          (0, a.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, a.jsxs)(d.Select, {
                                                      value: q,
                                                      onValueChange: (e) =>
                                                          F(e),
                                                      disabled: !O || Q,
                                                      children: [
                                                          (0, a.jsx)(
                                                              d.SelectTrigger,
                                                              {
                                                                  className:
                                                                      'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                                  children: (0,
                                                                  a.jsxs)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'flex items-center gap-2',
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  a.jsx)(
                                                                                      u.Building2,
                                                                                      {
                                                                                          className:
                                                                                              'h-4 w-4 text-content-brand',
                                                                                      }
                                                                                  ),
                                                                                  (0,
                                                                                  a.jsx)(
                                                                                      d.SelectValue,
                                                                                      {
                                                                                          placeholder:
                                                                                              O
                                                                                                  ? 'Selecione a unidade'
                                                                                                  : 'Nenhuma unidade cadastrada',
                                                                                      }
                                                                                  ),
                                                                              ],
                                                                      }
                                                                  ),
                                                              }
                                                          ),
                                                          (0, a.jsx)(
                                                              d.SelectContent,
                                                              {
                                                                  children:
                                                                      e.map(
                                                                          (e) =>
                                                                              (0,
                                                                              a.jsxs)(
                                                                                  d.SelectItem,
                                                                                  {
                                                                                      value: e.id,
                                                                                      disabled:
                                                                                          !e.isActive,
                                                                                      children:
                                                                                          [
                                                                                              e.name,
                                                                                              ' ',
                                                                                              e.isActive
                                                                                                  ? ''
                                                                                                  : '(inativa)',
                                                                                          ],
                                                                                  },
                                                                                  e.id
                                                                              )
                                                                      ),
                                                              }
                                                          ),
                                                      ],
                                                  }),
                                                  J
                                                      ? (0, a.jsx)('p', {
                                                            className:
                                                                'text-xs text-red-500',
                                                            children:
                                                                'Selecione uma unidade ativa.',
                                                        })
                                                      : null,
                                              ],
                                          }),
                                          (0, a.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, a.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children:
                                                          'Foto do profissional',
                                                  }),
                                                  (0, a.jsx)('input', {
                                                      ref: w,
                                                      type: 'file',
                                                      accept: 'image/*',
                                                      className: 'hidden',
                                                      disabled: Q,
                                                      onChange: (e) => {
                                                          let a =
                                                              e.currentTarget
                                                                  .files?.[0];
                                                          a && V(a);
                                                      },
                                                  }),
                                                  (0, a.jsxs)('div', {
                                                      className:
                                                          'grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start',
                                                      children: [
                                                          (0, a.jsx)('div', {
                                                              className:
                                                                  'space-y-2',
                                                              children: (0,
                                                              a.jsxs)('div', {
                                                                  className:
                                                                      'relative',
                                                                  children: [
                                                                      (0,
                                                                      a.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                                                                              children:
                                                                                  (0,
                                                                                  a.jsx)(
                                                                                      m.Image,
                                                                                      {
                                                                                          className:
                                                                                              'h-4 w-4 text-content-brand',
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      a.jsx)(
                                                                          l.Input,
                                                                          {
                                                                              value:
                                                                                  H ??
                                                                                  '',
                                                                              readOnly:
                                                                                  !0,
                                                                              placeholder:
                                                                                  'Escolha seu arquivo clicando em Upload.',
                                                                              className:
                                                                                  (0,
                                                                                  c.cn)(
                                                                                      'pl-10 pr-10',
                                                                                      j
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      H
                                                                          ? (0,
                                                                            a.jsx)(
                                                                                'button',
                                                                                {
                                                                                    type: 'button',
                                                                                    className:
                                                                                        'absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary hover:text-content-primary',
                                                                                    onClick:
                                                                                        () => {
                                                                                            (W(
                                                                                                ''
                                                                                            ),
                                                                                                w.current &&
                                                                                                    (w.current.value =
                                                                                                        ''));
                                                                                        },
                                                                                    disabled:
                                                                                        Q,
                                                                                    title: 'Remover imagem',
                                                                                    children:
                                                                                        (0,
                                                                                        a.jsx)(
                                                                                            p.X,
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
                                                          }),
                                                          (0, a.jsx)(n.Button, {
                                                              type: 'button',
                                                              variant: 'brand',
                                                              className: 'h-10',
                                                              onClick: () =>
                                                                  w.current?.click(),
                                                              disabled: Q,
                                                              title: D
                                                                  ? 'Enviando...'
                                                                  : void 0,
                                                              children: (0,
                                                              a.jsxs)('span', {
                                                                  className:
                                                                      'inline-flex items-center gap-2',
                                                                  children: [
                                                                      (0,
                                                                      a.jsx)(
                                                                          x.Upload,
                                                                          {
                                                                              className:
                                                                                  'h-4 w-4',
                                                                          }
                                                                      ),
                                                                      D
                                                                          ? 'Enviando...'
                                                                          : 'Upload',
                                                                  ],
                                                              }),
                                                          }),
                                                      ],
                                                  }),
                                                  H
                                                      ? (0, a.jsx)('div', {
                                                            className:
                                                                'overflow-hidden rounded-xl border border-border-primary bg-background-tertiary',
                                                            children: (0,
                                                            a.jsx)('img', {
                                                                src: H,
                                                                alt: 'Preview do profissional',
                                                                className:
                                                                    'h-40 w-full object-cover',
                                                            }),
                                                        })
                                                      : null,
                                              ],
                                          }),
                                          (0, a.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, a.jsxs)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'Nome ',
                                                          (0, a.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, a.jsx)(g, {
                                                      icon: h.User,
                                                      name: 'name',
                                                      required: !0,
                                                      value: U,
                                                      onChange: (e) =>
                                                          $(e.target.value),
                                                      disabled: Q,
                                                      className: j,
                                                  }),
                                              ],
                                          }),
                                          (0, a.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, a.jsxs)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'E-mail ',
                                                          (0, a.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, a.jsx)(g, {
                                                      icon: b.Mail,
                                                      type: 'email',
                                                      name: 'email',
                                                      required: !0,
                                                      value: P,
                                                      onChange: (e) =>
                                                          z(e.target.value),
                                                      disabled: Q,
                                                      className: j,
                                                  }),
                                              ],
                                          }),
                                          (0, a.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, a.jsxs)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'Telefone ',
                                                          (0, a.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, a.jsx)(g, {
                                                      icon: v.Phone,
                                                      name: 'phone',
                                                      required: !0,
                                                      placeholder:
                                                          '(99) 99999-9999',
                                                      value: I,
                                                      onChange: function (e) {
                                                          let a = e.target.value
                                                              .replace(
                                                                  /\D/g,
                                                                  ''
                                                              )
                                                              .slice(0, 11);
                                                          E(
                                                              (a =
                                                                  a.length <= 10
                                                                      ? a
                                                                            .replace(
                                                                                /(\d{2})(\d)/,
                                                                                '($1) $2'
                                                                            )
                                                                            .replace(
                                                                                /(\d{4})(\d)/,
                                                                                '$1-$2'
                                                                            )
                                                                      : a
                                                                            .replace(
                                                                                /(\d{2})(\d)/,
                                                                                '($1) $2'
                                                                            )
                                                                            .replace(
                                                                                /(\d{5})(\d)/,
                                                                                '$1-$2'
                                                                            ))
                                                          );
                                                      },
                                                      disabled: Q,
                                                      className: j,
                                                  }),
                                              ],
                                          }),
                                          (0, a.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, a.jsxs)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'Senha ',
                                                          (0, a.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, a.jsx)(g, {
                                                      icon: f.KeyRound,
                                                      type: 'password',
                                                      name: 'password',
                                                      required: !0,
                                                      value: R,
                                                      onChange: (e) =>
                                                          M(e.target.value),
                                                      disabled: Q,
                                                      placeholder:
                                                          'Defina a senha do profissional',
                                                      className: j,
                                                  }),
                                                  (0, a.jsxs)('p', {
                                                      className:
                                                          'text-[11px] text-content-secondary',
                                                      children: [
                                                          'Mín. 6 caracteres, 1 maiúscula, 1 número e 1 especial (!@#$%^&*()_+-=[]',
                                                          ';\':",.<>/?\\|)',
                                                      ],
                                                  }),
                                              ],
                                          }),
                                          (0, a.jsx)('div', {
                                              className:
                                                  'flex justify-end gap-2 pt-2',
                                              children: (0, a.jsx)(n.Button, {
                                                  type: 'submit',
                                                  variant: 'brand',
                                                  disabled: Q || J,
                                                  title: J
                                                      ? 'Selecione uma unidade ativa'
                                                      : void 0,
                                                  children: D
                                                      ? 'Enviando...'
                                                      : C
                                                        ? 'Salvando...'
                                                        : 'Criar profissional',
                                              }),
                                          }),
                                      ],
                                  })
                                : (0, a.jsx)('div', {
                                      className:
                                          'rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary',
                                      children:
                                          'Você ainda não tem unidades ativas. Crie uma unidade primeiro para cadastrar profissionais.',
                                  }),
                        ],
                    }),
                ],
            });
        }
        e.s(['ProfessionalNewDialog', () => N]);
    },
]);
