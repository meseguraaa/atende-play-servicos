module.exports = [
    542677,
    300647,
    864199,
    757844,
    (a) => {
        'use strict';
        var b = a.i(203431);
        let c = (0, b.default)('badge-dollar-sign', [
            [
                'path',
                {
                    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
                    key: '3c2336',
                },
            ],
            [
                'path',
                {
                    d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8',
                    key: '1h4pet',
                },
            ],
            ['path', { d: 'M12 18V6', key: 'zqpxq5' }],
        ]);
        a.s(['BadgeDollarSign', () => c], 542677);
        let d = (0, b.default)('percent', [
            ['line', { x1: '19', x2: '5', y1: '5', y2: '19', key: '1x9vlm' }],
            ['circle', { cx: '6.5', cy: '6.5', r: '2.5', key: '4mh3h7' }],
            ['circle', { cx: '17.5', cy: '17.5', r: '2.5', key: '1mdrzq' }],
        ]);
        a.s(['Percent', () => d], 300647);
        let e = (0, b.default)('timer', [
            ['line', { x1: '10', x2: '14', y1: '2', y2: '2', key: '14vaq8' }],
            ['line', { x1: '12', x2: '15', y1: '14', y2: '11', key: '17fdiu' }],
            ['circle', { cx: '12', cy: '14', r: '8', key: '1e1u0o' }],
        ]);
        a.s(['Timer', () => e], 864199);
        let f = (0, b.default)('receipt', [
            [
                'path',
                {
                    d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z',
                    key: 'q3az6g',
                },
            ],
            [
                'path',
                {
                    d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8',
                    key: '1h4pet',
                },
            ],
            ['path', { d: 'M12 17.5v-11', key: '1jc1ny' }],
        ]);
        a.s(['Receipt', () => f], 757844);
    },
    227642,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(259849),
            e = a.i(156916),
            f = a.i(699570),
            g = a.i(814574),
            h = a.i(866718),
            i = a.i(580701),
            j = a.i(368114),
            k = a.i(853754),
            l = a.i(542677),
            m = a.i(624126),
            n = a.i(300647),
            o = a.i(864199),
            p = a.i(757844),
            q = a.i(101482),
            r = a.i(198803),
            s = a.i(263758);
        function t(a) {
            if (null == a) return '';
            let b = Number(a);
            return Number.isFinite(b) ? String(b) : '';
        }
        function u(a) {
            if (null == a) return null;
            let b =
                'string' == typeof a
                    ? Number(a.replace(',', '.').trim())
                    : Number(a);
            return Number.isFinite(b) ? b : null;
        }
        function v(a) {
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
                    (0, b.jsx)(h.Input, {
                        ...e,
                        className: (0, j.cn)('pl-10', d),
                    }),
                ],
            });
        }
        let w =
            'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';
        function x({ service: a }) {
            let h = (0, d.useRouter)(),
                [x, y] = (0, c.useState)(!1),
                [z, A] = (0, c.useState)(!1),
                [B, C] = (0, c.useState)(!1),
                [D, E] = (0, c.useState)([]),
                [F, G] = (0, c.useState)(new Set()),
                [H, I] = (0, c.useState)([]),
                J = (0, c.useMemo)(() => H.filter((a) => a.isActive), [H]),
                [K, L] = (0, c.useState)(a.name ?? ''),
                [M, N] = (0, c.useState)(String(a.price ?? '')),
                [O, P] = (0, c.useState)(t(a.durationMinutes)),
                [Q, R] = (0, c.useState)(
                    t(a.barberPercentage) || t(a.professionalPercentage)
                ),
                [S, T] = (0, c.useState)(t(a.cancelLimitHours)),
                [U, V] = (0, c.useState)(t(a.cancelFeePercentage)),
                [W, X] = (0, c.useState)(() => String(a.unitId ?? '').trim()),
                Y = z || B,
                Z = F.size,
                $ = (0, c.useMemo)(() => {
                    let a = [...(D ?? [])];
                    return (a.sort((a, b) => a.name.localeCompare(b.name)), a);
                }, [D]);
            async function _() {
                A(!0);
                try {
                    let b = await fetch(`/api/admin/services/${a.id}`, {
                            method: 'GET',
                            cache: 'no-store',
                            headers: { accept: 'application/json' },
                        }),
                        c = await b.json().catch(() => null);
                    if (!b.ok || !c?.ok || !c.data) {
                        let a =
                            (c && !1 === c.ok && c.error) ||
                            'Não foi possível carregar os dados do serviço.';
                        e.toast.error(a);
                        return;
                    }
                    let d = c.data.service;
                    (L(d.name ?? ''),
                        N(String(d.price ?? '')),
                        P(String(d.durationMinutes ?? '')),
                        R(String(d.professionalPercentage ?? '')),
                        T(
                            null === d.cancelLimitHours
                                ? ''
                                : String(d.cancelLimitHours)
                        ),
                        V(
                            null === d.cancelFeePercentage
                                ? ''
                                : String(d.cancelFeePercentage)
                        ),
                        E(c.data.professionals ?? []),
                        G(new Set(c.data.selectedProfessionalIds ?? [])));
                    let f = c.data.units ?? [];
                    I(f);
                    let g = String(d.unitId ?? '').trim();
                    if (g) X(g);
                    else {
                        let a = f.find((a) => a.isActive)?.id;
                        X(a ?? '');
                    }
                } catch {
                    e.toast.error(
                        'Não foi possível carregar os dados do serviço.'
                    );
                } finally {
                    A(!1);
                }
            }
            function aa(a) {
                return String(a ?? '')
                    .replace(',', '.')
                    .trim();
            }
            (0, c.useEffect)(() => {
                x && _();
            }, [x]);
            let ab = !!W && (H.find((a) => a.id === W)?.isActive ?? !1);
            async function ac(b) {
                if ((b.preventDefault(), Y)) return;
                if (!ab)
                    return void e.toast.error('Selecione uma unidade ativa.');
                let c = String(K ?? '').trim();
                if (!c)
                    return void e.toast.error('Nome do serviço é obrigatório.');
                let d = u(aa(M));
                if (null === d || d < 0)
                    return void e.toast.error('Preço inválido.');
                let f = u(aa(O));
                if (null === f || f <= 0)
                    return void e.toast.error('Duração inválida.');
                let g = u(aa(Q));
                if (null === g || g < 0 || g > 100)
                    return void e.toast.error(
                        'Porcentagem inválida (0 a 100).'
                    );
                let i = '' === S.trim() ? null : u(aa(S));
                if (null !== i && i < 0)
                    return void e.toast.error(
                        'Limite de cancelamento inválido.'
                    );
                let j = '' === U.trim() ? null : u(aa(U));
                if (null !== j && (j < 0 || j > 100))
                    return void e.toast.error(
                        'Taxa de cancelamento inválida (0 a 100).'
                    );
                if (0 === Z)
                    return void e.toast.error(
                        'Selecione pelo menos 1 profissional.'
                    );
                C(!0);
                try {
                    let b = {
                            unitId: W,
                            name: c,
                            price: d,
                            durationMinutes: Math.trunc(f),
                            professionalPercentage: g,
                            barberPercentage: g,
                            cancelLimitHours: null === i ? null : Math.trunc(i),
                            cancelFeePercentage: null === j ? null : j,
                            professionalIds: Array.from(F),
                        },
                        k = await fetch(`/api/admin/services/${a.id}`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json',
                                accept: 'application/json',
                            },
                            body: JSON.stringify(b),
                        }),
                        l = await k.json().catch(() => null);
                    if (!k.ok || !l || !0 !== l.ok) {
                        let a =
                            (l && !1 === l.ok && l.error) ||
                            'Não foi possível salvar o serviço.';
                        e.toast.error(a);
                        return;
                    }
                    (e.toast.success('Serviço atualizado com sucesso!'),
                        y(!1),
                        h.refresh());
                } catch {
                    e.toast.error('Não foi possível salvar o serviço.');
                } finally {
                    C(!1);
                }
            }
            return (0, b.jsxs)(g.Dialog, {
                open: x,
                onOpenChange: (b) => {
                    !Y &&
                        (y(b),
                        b ||
                            (E([]),
                            G(new Set()),
                            I([]),
                            L(a.name ?? ''),
                            N(String(a.price ?? '')),
                            P(t(a.durationMinutes)),
                            R(
                                t(a.barberPercentage) ||
                                    t(a.professionalPercentage)
                            ),
                            T(t(a.cancelLimitHours)),
                            V(t(a.cancelFeePercentage)),
                            X(String(a.unitId ?? '').trim())));
                },
                children: [
                    (0, b.jsx)(g.DialogTrigger, {
                        asChild: !0,
                        children: (0, b.jsx)(f.Button, {
                            variant: 'edit2',
                            size: 'sm',
                            className:
                                'border-border-primary hover:bg-muted/40',
                            type: 'button',
                            children: 'Editar',
                        }),
                    }),
                    (0, b.jsxs)(g.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, b.jsx)(g.DialogHeader, {
                                children: (0, b.jsx)(g.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Editar serviço',
                                }),
                            }),
                            z
                                ? (0, b.jsx)('div', {
                                      className:
                                          'rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary',
                                      children: (0, b.jsxs)('span', {
                                          className:
                                              'inline-flex items-center gap-2',
                                          children: [
                                              (0, b.jsx)(r.Loader2, {
                                                  className:
                                                      'h-4 w-4 animate-spin',
                                              }),
                                              'Carregando dados do serviço...',
                                          ],
                                      }),
                                  })
                                : (0, b.jsxs)('form', {
                                      onSubmit: ac,
                                      className: 'space-y-4 pb-2',
                                      children: [
                                          (0, b.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, b.jsxs)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'Unidade ',
                                                          (0, b.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, b.jsxs)(i.Select, {
                                                      value: W,
                                                      onValueChange: (a) =>
                                                          X(a),
                                                      disabled:
                                                          Y || 0 === J.length,
                                                      children: [
                                                          (0, b.jsx)(
                                                              i.SelectTrigger,
                                                              {
                                                                  className:
                                                                      'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                                  children: (0,
                                                                  b.jsxs)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'flex items-center gap-2',
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      s.Building2,
                                                                                      {
                                                                                          className:
                                                                                              'h-4 w-4 text-content-brand',
                                                                                      }
                                                                                  ),
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      i.SelectValue,
                                                                                      {
                                                                                          placeholder:
                                                                                              'Selecione a unidade',
                                                                                      }
                                                                                  ),
                                                                              ],
                                                                      }
                                                                  ),
                                                              }
                                                          ),
                                                          (0, b.jsx)(
                                                              i.SelectContent,
                                                              {
                                                                  children:
                                                                      H.map(
                                                                          (a) =>
                                                                              (0,
                                                                              b.jsxs)(
                                                                                  i.SelectItem,
                                                                                  {
                                                                                      value: a.id,
                                                                                      disabled:
                                                                                          !a.isActive,
                                                                                      children:
                                                                                          [
                                                                                              a.name,
                                                                                              ' ',
                                                                                              a.isActive
                                                                                                  ? ''
                                                                                                  : '(inativa)',
                                                                                          ],
                                                                                  },
                                                                                  a.id
                                                                              )
                                                                      ),
                                                              }
                                                          ),
                                                      ],
                                                  }),
                                                  ab
                                                      ? null
                                                      : (0, b.jsx)('p', {
                                                            className:
                                                                'text-xs text-red-500',
                                                            children:
                                                                'Selecione uma unidade ativa.',
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
                                                          'Nome do serviço',
                                                          ' ',
                                                          (0, b.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, b.jsx)(v, {
                                                      name: 'name',
                                                      required: !0,
                                                      value: K,
                                                      onChange: (a) =>
                                                          L(a.target.value),
                                                      disabled: Y,
                                                      icon: k.Scissors,
                                                      className: w,
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
                                                          'Valor (R$)',
                                                          ' ',
                                                          (0, b.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, b.jsx)(v, {
                                                      name: 'price',
                                                      type: 'number',
                                                      step: '0.01',
                                                      required: !0,
                                                      value: M,
                                                      onChange: (a) =>
                                                          N(a.target.value),
                                                      disabled: Y,
                                                      icon: l.BadgeDollarSign,
                                                      className: w,
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
                                                          'Duração (minutos)',
                                                          ' ',
                                                          (0, b.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, b.jsx)(v, {
                                                      name: 'durationMinutes',
                                                      type: 'number',
                                                      min: 1,
                                                      required: !0,
                                                      value: O,
                                                      onChange: (a) =>
                                                          P(a.target.value),
                                                      disabled: Y,
                                                      icon: m.Clock,
                                                      className: w,
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
                                                          'Porcentagem do profissional (%)',
                                                          ' ',
                                                          (0, b.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, b.jsx)(v, {
                                                      name: 'barberPercentage',
                                                      type: 'number',
                                                      step: '0.01',
                                                      min: 0,
                                                      max: 100,
                                                      required: !0,
                                                      value: Q,
                                                      onChange: (a) =>
                                                          R(a.target.value),
                                                      disabled: Y,
                                                      placeholder: 'Ex: 50',
                                                      icon: n.Percent,
                                                      className: w,
                                                  }),
                                              ],
                                          }),
                                          (0, b.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, b.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children:
                                                          'Limite para cobrança de taxa (horas antes do horário)',
                                                  }),
                                                  (0, b.jsx)(v, {
                                                      name: 'cancelLimitHours',
                                                      type: 'number',
                                                      min: 0,
                                                      value: S,
                                                      onChange: (a) =>
                                                          T(a.target.value),
                                                      disabled: Y,
                                                      placeholder:
                                                          'Ex: 2 (até 2h antes)',
                                                      icon: o.Timer,
                                                      className: w,
                                                  }),
                                              ],
                                          }),
                                          (0, b.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, b.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children:
                                                          'Taxa de cancelamento (%)',
                                                  }),
                                                  (0, b.jsx)(v, {
                                                      name: 'cancelFeePercentage',
                                                      type: 'number',
                                                      step: '0.01',
                                                      min: 0,
                                                      max: 100,
                                                      value: U,
                                                      onChange: (a) =>
                                                          V(a.target.value),
                                                      disabled: Y,
                                                      placeholder: 'Ex: 50',
                                                      icon: p.Receipt,
                                                      className: w,
                                                  }),
                                              ],
                                          }),
                                          (0, b.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, b.jsxs)('p', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'Profissionais que realizam este serviço',
                                                          ' ',
                                                          (0, b.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  0 === $.length
                                                      ? (0, b.jsx)('div', {
                                                            className:
                                                                'rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary',
                                                            children:
                                                                'Nenhum profissional encontrado para esta empresa.',
                                                        })
                                                      : (0, b.jsxs)('div', {
                                                            className:
                                                                'overflow-hidden rounded-xl border border-border-primary bg-background-tertiary',
                                                            children: [
                                                                (0, b.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'flex items-center justify-between gap-2 border-b border-border-primary bg-background-secondary px-3 py-2',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'span',
                                                                                    {
                                                                                        className:
                                                                                            'inline-flex items-center gap-2 text-xs text-content-secondary',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    q.Users,
                                                                                                    {
                                                                                                        className:
                                                                                                            'h-4 w-4 text-content-brand',
                                                                                                    }
                                                                                                ),
                                                                                                'Selecione os profissionais',
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'span',
                                                                                    {
                                                                                        className:
                                                                                            'text-xs text-content-secondary',
                                                                                        children:
                                                                                            [
                                                                                                Z,
                                                                                                ' selecionado',
                                                                                                1 ===
                                                                                                Z
                                                                                                    ? ''
                                                                                                    : 's',
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'max-h-56 space-y-1 overflow-y-auto p-2',
                                                                        children:
                                                                            $.map(
                                                                                (
                                                                                    a
                                                                                ) => {
                                                                                    let c =
                                                                                        F.has(
                                                                                            a.id
                                                                                        );
                                                                                    return (0,
                                                                                    b.jsxs)(
                                                                                        'label',
                                                                                        {
                                                                                            className:
                                                                                                (0,
                                                                                                j.cn)(
                                                                                                    'flex items-center gap-2 rounded-lg px-2 text-paragraph-small',
                                                                                                    'hover:bg-muted/30',
                                                                                                    !a.isActive &&
                                                                                                        'opacity-60'
                                                                                                ),
                                                                                            children:
                                                                                                [
                                                                                                    (0,
                                                                                                    b.jsx)(
                                                                                                        'input',
                                                                                                        {
                                                                                                            type: 'checkbox',
                                                                                                            className:
                                                                                                                'h-4 w-4 rounded border-border-primary',
                                                                                                            checked:
                                                                                                                c,
                                                                                                            onChange:
                                                                                                                () => {
                                                                                                                    var b;
                                                                                                                    return (
                                                                                                                        (b =
                                                                                                                            a.id),
                                                                                                                        void G(
                                                                                                                            (
                                                                                                                                a
                                                                                                                            ) => {
                                                                                                                                let c =
                                                                                                                                    new Set(
                                                                                                                                        a
                                                                                                                                    );
                                                                                                                                return (
                                                                                                                                    c.has(
                                                                                                                                        b
                                                                                                                                    )
                                                                                                                                        ? c.delete(
                                                                                                                                              b
                                                                                                                                          )
                                                                                                                                        : c.add(
                                                                                                                                              b
                                                                                                                                          ),
                                                                                                                                    c
                                                                                                                                );
                                                                                                                            }
                                                                                                                        )
                                                                                                                    );
                                                                                                                },
                                                                                                            disabled:
                                                                                                                Y ||
                                                                                                                !a.isActive,
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    b.jsxs)(
                                                                                                        'span',
                                                                                                        {
                                                                                                            className:
                                                                                                                'text-content-primary',
                                                                                                            children:
                                                                                                                [
                                                                                                                    a.name,
                                                                                                                    ' ',
                                                                                                                    a.isActive
                                                                                                                        ? ''
                                                                                                                        : '(inativo)',
                                                                                                                ],
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
                                                            ],
                                                        }),
                                                  0 === Z
                                                      ? (0, b.jsx)('p', {
                                                            className:
                                                                'text-xs text-red-500',
                                                            children:
                                                                'Selecione pelo menos 1 profissional.',
                                                        })
                                                      : null,
                                              ],
                                          }),
                                          (0, b.jsx)('div', {
                                              className:
                                                  'flex justify-end gap-2 pt-2',
                                              children: (0, b.jsx)(f.Button, {
                                                  type: 'submit',
                                                  variant: 'brand',
                                                  disabled: Y || 0 === Z || !ab,
                                                  title: ab
                                                      ? 0 === Z
                                                          ? 'Selecione ao menos 1 profissional'
                                                          : void 0
                                                      : 'Selecione uma unidade ativa',
                                                  children: B
                                                      ? (0, b.jsxs)('span', {
                                                            className:
                                                                'inline-flex items-center gap-2',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    r.Loader2,
                                                                    {
                                                                        className:
                                                                            'h-4 w-4 animate-spin',
                                                                    }
                                                                ),
                                                                'Salvando...',
                                                            ],
                                                        })
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
        function y(a) {
            if (null == a) return null;
            if ('number' == typeof a) return Number.isFinite(a) ? a : null;
            if ('string' == typeof a) {
                let b = Number(a.trim().replace(',', '.'));
                return Number.isFinite(b) ? b : null;
            }
            return null;
        }
        async function z(a, b) {
            let c = await fetch(`/api/admin/services/${a}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        accept: 'application/json',
                    },
                    body: JSON.stringify(b),
                }),
                d = await c.json().catch(() => null);
            return c.ok && d && !0 === d.ok
                ? { ok: !0, data: d.data }
                : {
                      ok: !1,
                      error:
                          (d && !1 === d.ok && d.error) ||
                          'Não foi possível salvar.',
                  };
        }
        function A({ service: a }) {
            var g;
            let h = (0, d.useRouter)(),
                [i, j] = c.useState(!!a.isActive),
                [k, l] = c.useState(!1);
            async function m() {
                if (k) return;
                let b = !i;
                (l(!0), j(b));
                let c = await z(a.id, { isActive: b });
                if ((l(!1), !c.ok)) {
                    (j(!b), e.toast.error(c.error));
                    return;
                }
                (e.toast.success(
                    b ? 'Serviço ativado!' : 'Serviço desativado!'
                ),
                    h.refresh());
            }
            c.useEffect(() => {
                j(!!a.isActive);
            }, [a.isActive]);
            let n = c.useMemo(() => {
                    let b,
                        c,
                        d,
                        e =
                            'number' == typeof a.priceInCents
                                ? a.priceInCents
                                : null === (b = y(a.price))
                                  ? null
                                  : Math.round(100 * b),
                        f =
                            'number' == typeof a.durationInMinutes
                                ? a.durationInMinutes
                                : 'number' == typeof a.durationMinutes
                                  ? a.durationMinutes
                                  : null;
                    return {
                        priceInCents: e,
                        durationInMinutes: f,
                        commissionPct:
                            'number' == typeof a.barberPercentage
                                ? a.barberPercentage
                                : null === (c = y(a.professionalPercentage))
                                  ? null
                                  : c,
                        cancelFeePct:
                            'number' == typeof a.cancelFeePercentage
                                ? a.cancelFeePercentage
                                : null === (d = y(a.cancelFeePercentage))
                                  ? null
                                  : d,
                    };
                }, [a]),
                o = c.useMemo(() => {
                    var b;
                    return {
                        id: a.id,
                        unitId: a.unitId ?? null,
                        name: a.name,
                        price:
                            'number' == typeof (b = n.priceInCents) &&
                            Number.isFinite(b)
                                ? (b / 100).toFixed(2)
                                : '',
                        durationMinutes: n.durationInMinutes ?? 0,
                        professionalPercentage:
                            null !== n.commissionPct
                                ? String(n.commissionPct)
                                : '50',
                        cancelLimitHours: a.cancelLimitHours ?? null,
                        cancelFeePercentage:
                            null !== n.cancelFeePct
                                ? String(n.cancelFeePct)
                                : null,
                        isActive: !!a.isActive,
                    };
                }, [
                    a,
                    n.priceInCents,
                    n.durationInMinutes,
                    n.commissionPct,
                    n.cancelFeePct,
                ]);
            return (0, b.jsxs)('tr', {
                className: 'border-t border-border-primary',
                children: [
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsxs)('div', {
                            className: 'space-y-0.5',
                            children: [
                                (0, b.jsx)('p', {
                                    className:
                                        'text-paragraph-medium-size text-content-primary',
                                    children: a.name,
                                }),
                                a.description
                                    ? (0, b.jsx)('p', {
                                          className:
                                              'text-paragraph-small text-content-tertiary line-clamp-2',
                                          children: a.description,
                                      })
                                    : (0, b.jsx)('p', {
                                          className:
                                              'text-paragraph-small text-content-tertiary',
                                      }),
                            ],
                        }),
                    }),
                    (0, b.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children:
                            'number' == typeof (g = n.priceInCents) &&
                            Number.isFinite(g)
                                ? new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL',
                                  }).format(g / 100)
                                : '—',
                    }),
                    (0, b.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children: (function (a) {
                            let b = Number(a ?? 0);
                            if (!Number.isFinite(b) || b <= 0) return '—';
                            if (b < 60) return `${b} min`;
                            let c = Math.floor(b / 60),
                                d = b % 60;
                            return d ? `${c}h ${d}min` : `${c}h`;
                        })(n.durationInMinutes),
                    }),
                    (0, b.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children:
                            'number' == typeof n.commissionPct
                                ? `${n.commissionPct}%`
                                : '—',
                    }),
                    (0, b.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children:
                            'number' == typeof a.cancelLimitHours
                                ? `At\xe9 ${a.cancelLimitHours}h antes`
                                : '—',
                    }),
                    (0, b.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children:
                            'number' == typeof n.cancelFeePct
                                ? `${n.cancelFeePct}%`
                                : '—',
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsx)('span', {
                            className: [
                                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                                i
                                    ? 'bg-green-500/15 text-green-600 border-green-500/30'
                                    : 'bg-red-500/15 text-red-600 border-red-500/30',
                            ].join(' '),
                            children: i ? 'Ativo' : 'Inativo',
                        }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsxs)('div', {
                            className: 'flex items-center justify-end gap-2',
                            children: [
                                (0, b.jsx)(x, { service: o }),
                                (0, b.jsx)(f.Button, {
                                    variant: i ? 'destructive' : 'active',
                                    size: 'sm',
                                    type: 'button',
                                    onClick: m,
                                    disabled: k,
                                    className:
                                        'border-border-primary hover:bg-muted/40',
                                    title: k
                                        ? 'Salvando...'
                                        : i
                                          ? 'Desativar serviço'
                                          : 'Ativar serviço',
                                    children: k
                                        ? 'Salvando...'
                                        : i
                                          ? 'Desativar'
                                          : 'Ativar',
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        a.s(['ServiceRow', () => A], 227642);
    },
    266205,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(156916),
            e = a.i(259849),
            f = a.i(814574),
            g = a.i(699570),
            h = a.i(866718),
            i = a.i(580701),
            j = a.i(368114),
            k = a.i(853754),
            l = a.i(542677),
            m = a.i(624126),
            n = a.i(300647),
            o = a.i(864199),
            p = a.i(757844),
            q = a.i(101482),
            r = a.i(263758);
        function s(a) {
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
                    (0, b.jsx)(h.Input, {
                        ...e,
                        className: (0, j.cn)('pl-10', d),
                    }),
                ],
            });
        }
        let t =
            'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';
        function u(a) {
            let b = Number(
                String(a ?? '')
                    .trim()
                    .replace(/\s/g, '')
                    .replace(/\./g, '')
                    .replace(',', '.')
            );
            return Number.isFinite(b) ? b : NaN;
        }
        function v() {
            let a = (0, e.useRouter)(),
                [h, j] = (0, c.useState)(!1),
                [v, w] = (0, c.useState)(!1),
                [x, y] = (0, c.useState)(!1),
                [z, A] = (0, c.useState)([]),
                [B, C] = (0, c.useState)([]),
                [D, E] = (0, c.useState)(''),
                [F, G] = (0, c.useState)(''),
                [H, I] = (0, c.useState)(''),
                [J, K] = (0, c.useState)('50'),
                [L, M] = (0, c.useState)(''),
                [N, O] = (0, c.useState)(''),
                [P, Q] = (0, c.useState)([]),
                [R, S] = (0, c.useState)(''),
                T = (0, c.useMemo)(() => z.filter((a) => a.isActive), [z]),
                U = (0, c.useMemo)(() => B.filter((a) => a.isActive), [B]),
                V = T.length > 0,
                W = U.length > 0,
                X = v || x,
                Y = P.length;
            function Z(a) {
                let b = (a ?? B).find((a) => a.isActive)?.id ?? '';
                (E(''), G(''), I(''), K('50'), M(''), O(''), Q([]), S(b));
            }
            async function $() {
                w(!0);
                try {
                    let a = await fetch('/api/admin/services', {
                            method: 'GET',
                            cache: 'no-store',
                            headers: { accept: 'application/json' },
                        }),
                        b = await a.json().catch(() => null);
                    if (!a.ok || !b || !0 !== b.ok) {
                        let a =
                            (b && !1 === b.ok && b.error) ||
                            'Não foi possível carregar dados.';
                        (A([]), C([]), d.toast.error(a));
                        return;
                    }
                    let c = b.data?.professionals ?? [],
                        e = b.data?.units ?? [];
                    (A(c),
                        C(e),
                        S((a) => a || (e.find((a) => a.isActive)?.id ?? '')));
                } catch {
                    (A([]),
                        C([]),
                        d.toast.error('Não foi possível carregar dados.'));
                } finally {
                    w(!1);
                }
            }
            (0, c.useEffect)(() => {
                h && $();
            }, [h]);
            let _ = !!R && (B.find((a) => a.id === R)?.isActive ?? !1),
                aa =
                    _ &&
                    D.trim().length > 0 &&
                    Number.isFinite(u(F)) &&
                    u(F) >= 0 &&
                    Number.isFinite(Number(H)) &&
                    Number(H) > 0 &&
                    Number.isFinite(u(J)) &&
                    u(J) >= 0 &&
                    100 >= u(J) &&
                    Y > 0;
            async function ab(b) {
                if ((b.preventDefault(), X)) return;
                if (!W)
                    return void d.toast.error(
                        'Crie pelo menos 1 unidade antes de criar serviços.'
                    );
                if (!_)
                    return void d.toast.error('Selecione uma unidade ativa.');
                if (!V)
                    return void d.toast.error(
                        'Cadastre pelo menos 1 profissional antes de criar serviços.'
                    );
                if (!aa)
                    return void d.toast.error(
                        'Preencha os campos obrigatórios.'
                    );
                let c = u(F),
                    e = u(J),
                    f = '' === L.trim() ? null : Number(L),
                    g = '' === N.trim() ? null : u(N);
                if (null !== f && (!Number.isFinite(f) || f < 0))
                    return void d.toast.error(
                        'Limite de cancelamento inválido.'
                    );
                if (null !== g && (!Number.isFinite(g) || g < 0 || g > 100))
                    return void d.toast.error(
                        'Taxa de cancelamento inválida (0 a 100).'
                    );
                y(!0);
                try {
                    let b = await fetch('/api/admin/services', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({
                                name: D.trim(),
                                unitId: R,
                                price: c,
                                durationMinutes: Number(H),
                                professionalPercentage: e,
                                cancelLimitHours: f,
                                cancelFeePercentage: g,
                                professionalIds: P,
                            }),
                        }),
                        h = await b.json().catch(() => null);
                    if (!b.ok || !h || !0 !== h.ok) {
                        let a =
                            (h && !1 === h.ok && h.error) ||
                            'Não foi possível criar o serviço.';
                        d.toast.error(a);
                        return;
                    }
                    (d.toast.success('Serviço criado com sucesso!'),
                        j(!1),
                        Z(),
                        a.refresh());
                } catch {
                    d.toast.error('Não foi possível criar o serviço.');
                } finally {
                    y(!1);
                }
            }
            return (0, b.jsxs)(f.Dialog, {
                open: h,
                onOpenChange: (a) => {
                    !X && (j(a), a || Z());
                },
                children: [
                    (0, b.jsx)(f.DialogTrigger, {
                        asChild: !0,
                        children: (0, b.jsx)(g.Button, {
                            variant: 'brand',
                            children: 'Novo serviço',
                        }),
                    }),
                    (0, b.jsxs)(f.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, b.jsx)(f.DialogHeader, {
                                children: (0, b.jsx)(f.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Novo serviço',
                                }),
                            }),
                            v || W
                                ? v || V
                                    ? (0, b.jsxs)('form', {
                                          onSubmit: ab,
                                          className: 'space-y-4 pb-2',
                                          children: [
                                              (0, b.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, b.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          children: [
                                                              'Unidade ',
                                                              (0, b.jsx)(
                                                                  'span',
                                                                  {
                                                                      className:
                                                                          'text-red-500',
                                                                      children:
                                                                          '*',
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, b.jsxs)(i.Select, {
                                                          value: R,
                                                          onValueChange: (a) =>
                                                              S(a),
                                                          disabled:
                                                              X ||
                                                              0 === U.length,
                                                          children: [
                                                              (0, b.jsx)(
                                                                  i.SelectTrigger,
                                                                  {
                                                                      className:
                                                                          'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                                      children:
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
                                                                                              r.Building2,
                                                                                              {
                                                                                                  className:
                                                                                                      'h-4 w-4 text-content-brand',
                                                                                              }
                                                                                          ),
                                                                                          (0,
                                                                                          b.jsx)(
                                                                                              i.SelectValue,
                                                                                              {
                                                                                                  placeholder:
                                                                                                      'Selecione a unidade',
                                                                                              }
                                                                                          ),
                                                                                      ],
                                                                              }
                                                                          ),
                                                                  }
                                                              ),
                                                              (0, b.jsx)(
                                                                  i.SelectContent,
                                                                  {
                                                                      children:
                                                                          B.map(
                                                                              (
                                                                                  a
                                                                              ) =>
                                                                                  (0,
                                                                                  b.jsxs)(
                                                                                      i.SelectItem,
                                                                                      {
                                                                                          value: a.id,
                                                                                          disabled:
                                                                                              !a.isActive,
                                                                                          children:
                                                                                              [
                                                                                                  a.name,
                                                                                                  ' ',
                                                                                                  a.isActive
                                                                                                      ? ''
                                                                                                      : '(inativa)',
                                                                                              ],
                                                                                      },
                                                                                      a.id
                                                                                  )
                                                                          ),
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      _
                                                          ? null
                                                          : (0, b.jsx)('p', {
                                                                className:
                                                                    'text-xs text-red-500',
                                                                children:
                                                                    'Selecione uma unidade ativa.',
                                                            }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, b.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor: 'name',
                                                          children: [
                                                              'Nome do serviço',
                                                              ' ',
                                                              (0, b.jsx)(
                                                                  'span',
                                                                  {
                                                                      className:
                                                                          'text-red-500',
                                                                      children:
                                                                          '*',
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, b.jsx)(s, {
                                                          id: 'name',
                                                          name: 'name',
                                                          required: !0,
                                                          icon: k.Scissors,
                                                          value: D,
                                                          onChange: (a) =>
                                                              E(a.target.value),
                                                          disabled: X,
                                                          className: t,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, b.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor: 'price',
                                                          children: [
                                                              'Valor (R$)',
                                                              ' ',
                                                              (0, b.jsx)(
                                                                  'span',
                                                                  {
                                                                      className:
                                                                          'text-red-500',
                                                                      children:
                                                                          '*',
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, b.jsx)(s, {
                                                          id: 'price',
                                                          name: 'price',
                                                          inputMode: 'decimal',
                                                          placeholder:
                                                              'Ex: 49,90',
                                                          required: !0,
                                                          icon: l.BadgeDollarSign,
                                                          value: F,
                                                          onChange: (a) =>
                                                              G(a.target.value),
                                                          disabled: X,
                                                          className: t,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, b.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor:
                                                              'durationMinutes',
                                                          children: [
                                                              'Duração (minutos)',
                                                              ' ',
                                                              (0, b.jsx)(
                                                                  'span',
                                                                  {
                                                                      className:
                                                                          'text-red-500',
                                                                      children:
                                                                          '*',
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, b.jsx)(s, {
                                                          id: 'durationMinutes',
                                                          name: 'durationMinutes',
                                                          type: 'number',
                                                          min: 1,
                                                          required: !0,
                                                          icon: m.Clock,
                                                          value: H,
                                                          onChange: (a) =>
                                                              I(a.target.value),
                                                          disabled: X,
                                                          className: t,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, b.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor:
                                                              'professionalPercentage',
                                                          children: [
                                                              'Porcentagem do profissional (%)',
                                                              ' ',
                                                              (0, b.jsx)(
                                                                  'span',
                                                                  {
                                                                      className:
                                                                          'text-red-500',
                                                                      children:
                                                                          '*',
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, b.jsx)(s, {
                                                          id: 'professionalPercentage',
                                                          name: 'professionalPercentage',
                                                          type: 'number',
                                                          step: '0.01',
                                                          min: 0,
                                                          max: 100,
                                                          required: !0,
                                                          placeholder: 'Ex: 50',
                                                          icon: n.Percent,
                                                          value: J,
                                                          onChange: (a) =>
                                                              K(a.target.value),
                                                          disabled: X,
                                                          className: t,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, b.jsx)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor:
                                                              'cancelLimitHours',
                                                          children:
                                                              'Limite para cobrança de taxa (horas antes do horário)',
                                                      }),
                                                      (0, b.jsx)(s, {
                                                          id: 'cancelLimitHours',
                                                          name: 'cancelLimitHours',
                                                          type: 'number',
                                                          min: 0,
                                                          placeholder:
                                                              'Ex: 2 (até 2h antes)',
                                                          icon: o.Timer,
                                                          value: L,
                                                          onChange: (a) =>
                                                              M(a.target.value),
                                                          disabled: X,
                                                          className: t,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, b.jsx)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor:
                                                              'cancelFeePercentage',
                                                          children:
                                                              'Taxa de cancelamento (%)',
                                                      }),
                                                      (0, b.jsx)(s, {
                                                          id: 'cancelFeePercentage',
                                                          name: 'cancelFeePercentage',
                                                          type: 'number',
                                                          step: '0.01',
                                                          min: 0,
                                                          max: 100,
                                                          placeholder: 'Ex: 50',
                                                          icon: p.Receipt,
                                                          value: N,
                                                          onChange: (a) =>
                                                              O(a.target.value),
                                                          disabled: X,
                                                          className: t,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, b.jsxs)('p', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          children: [
                                                              'Profissionais que realizam este serviço',
                                                              ' ',
                                                              (0, b.jsx)(
                                                                  'span',
                                                                  {
                                                                      className:
                                                                          'text-red-500',
                                                                      children:
                                                                          '*',
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, b.jsxs)('div', {
                                                          className:
                                                              'rounded-lg border border-border-primary bg-background-tertiary p-2',
                                                          children: [
                                                              (0, b.jsxs)(
                                                                  'div',
                                                                  {
                                                                      className:
                                                                          'mb-2 flex items-center gap-2 px-1 text-paragraph-small text-content-secondary',
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              b.jsx)(
                                                                                  q.Users,
                                                                                  {
                                                                                      className:
                                                                                          'h-4 w-4 text-content-brand',
                                                                                  }
                                                                              ),
                                                                              (0,
                                                                              b.jsx)(
                                                                                  'span',
                                                                                  {
                                                                                      children:
                                                                                          'Selecione os profissionais',
                                                                                  }
                                                                              ),
                                                                          ],
                                                                  }
                                                              ),
                                                              v
                                                                  ? (0, b.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'px-1 py-3 text-paragraph-small text-content-secondary',
                                                                            children:
                                                                                'Carregando profissionais...',
                                                                        }
                                                                    )
                                                                  : 0 ===
                                                                      T.length
                                                                    ? (0,
                                                                      b.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'px-1 py-3 text-paragraph-small text-content-secondary',
                                                                              children:
                                                                                  'Nenhum profissional ativo cadastrado no momento.',
                                                                          }
                                                                      )
                                                                    : (0,
                                                                      b.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'max-h-48 space-y-1 overflow-y-auto px-1',
                                                                              children:
                                                                                  T.map(
                                                                                      (
                                                                                          a
                                                                                      ) =>
                                                                                          (0,
                                                                                          b.jsxs)(
                                                                                              'label',
                                                                                              {
                                                                                                  className:
                                                                                                      'flex items-center gap-2 text-paragraph-small text-content-primary',
                                                                                                  children:
                                                                                                      [
                                                                                                          (0,
                                                                                                          b.jsx)(
                                                                                                              'input',
                                                                                                              {
                                                                                                                  type: 'checkbox',
                                                                                                                  className:
                                                                                                                      'h-4 w-4 rounded border-border-primary',
                                                                                                                  disabled:
                                                                                                                      X,
                                                                                                                  checked:
                                                                                                                      P.includes(
                                                                                                                          a.id
                                                                                                                      ),
                                                                                                                  onChange:
                                                                                                                      () => {
                                                                                                                          var b;
                                                                                                                          return (
                                                                                                                              (b =
                                                                                                                                  a.id),
                                                                                                                              void Q(
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
                                                                                                              }
                                                                                                          ),
                                                                                                          (0,
                                                                                                          b.jsx)(
                                                                                                              'span',
                                                                                                              {
                                                                                                                  children:
                                                                                                                      a.name,
                                                                                                              }
                                                                                                          ),
                                                                                                      ],
                                                                                              },
                                                                                              a.id
                                                                                          )
                                                                                  ),
                                                                          }
                                                                      ),
                                                          ],
                                                      }),
                                                      !v && V && 0 === Y
                                                          ? (0, b.jsx)('p', {
                                                                className:
                                                                    'text-xs text-red-500',
                                                                children:
                                                                    'Selecione pelo menos 1 profissional.',
                                                            })
                                                          : null,
                                                  ],
                                              }),
                                              (0, b.jsx)('div', {
                                                  className:
                                                      'flex justify-end gap-2 pt-2',
                                                  children: (0, b.jsx)(
                                                      g.Button,
                                                      {
                                                          type: 'submit',
                                                          variant: 'brand',
                                                          disabled: X || !aa,
                                                          title: aa
                                                              ? void 0
                                                              : 'Preencha os campos obrigatórios',
                                                          children: x
                                                              ? 'Salvando...'
                                                              : 'Criar serviço',
                                                      }
                                                  ),
                                              }),
                                          ],
                                      })
                                    : (0, b.jsx)('div', {
                                          className:
                                              'rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary',
                                          children:
                                              'Você ainda não tem profissionais ativos. Cadastre um profissional antes de criar serviços.',
                                      })
                                : (0, b.jsx)('div', {
                                      className:
                                          'rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary',
                                      children:
                                          'Você ainda não tem unidades ativas. Crie uma unidade antes de cadastrar serviços.',
                                  }),
                        ],
                    }),
                ],
            });
        }
        a.s(['ServiceNewDialog', () => v]);
    },
];

//# sourceMappingURL=_48b88836._.js.map
