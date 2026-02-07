module.exports = [
    781525,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(814574),
            e = a.i(699570),
            f = a.i(866718),
            g = a.i(156916),
            h = a.i(320091),
            i = a.i(789815),
            j = a.i(898062),
            k = a.i(198803),
            l = a.i(368114),
            m = a.i(320146),
            n = a.i(599209),
            o = a.i(773608),
            p = a.i(564092),
            q = a.i(499638),
            r = a.i(587969),
            s = a.i(766153);
        function t(a) {
            return String(a ?? '').replace(/\D/g, '');
        }
        function u(a) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(String(a || '').trim()))
                return null;
            let [b, c, d] = a.split('-').map(Number);
            if (!b || !c || !d) return null;
            let e = new Date(b, c - 1, d);
            return (0, p.isValid)(e) ? e : null;
        }
        function v(a) {
            let {
                icon: c,
                disabledIcon: d,
                inputClassName: e,
                wrapperClassName: g,
                className: h,
                ...i
            } = a;
            return (0, b.jsxs)('div', {
                className: `relative ${g ?? ''}`,
                children: [
                    (0, b.jsx)('div', {
                        className:
                            'absolute left-3 top-1/2 -translate-y-1/2 -mt-px pointer-events-none',
                        children: (0, b.jsx)(c, {
                            width: 20,
                            height: 20,
                            className: d
                                ? 'text-content-secondary/50'
                                : 'text-content-brand',
                        }),
                    }),
                    (0, b.jsx)(f.Input, {
                        ...i,
                        className: ['pl-10', e ?? '', h ?? ''].join(' '),
                    }),
                ],
            });
        }
        function w() {
            let [a, f] = c.useState(!1),
                [p, w] = c.useState(!1),
                [x, y] = c.useState(''),
                [z, A] = c.useState(''),
                [B, C] = c.useState(''),
                [D, E] = c.useState(''),
                [F, G] = c.useState(!1);
            function H() {
                (y(''), A(''), C(''), E(''), G(!1));
            }
            let I = c.useMemo(() => u(D), [D]);
            async function J(a) {
                if ((a.preventDefault(), p)) return;
                let b = x.trim(),
                    c = z.trim().toLowerCase(),
                    d = B.trim(),
                    e = D.trim();
                if (!b) return g.toast.error('Informe o nome do cliente.');
                if (!c) return g.toast.error('Informe o e-mail do cliente.');
                if (!d) return g.toast.error('Informe o telefone do cliente.');
                if (!e) return g.toast.error('Preencha a data de nascimento.');
                if (t(d).length < 10)
                    return g.toast.error(
                        'Informe um telefone válido (com DDD).'
                    );
                if (!u(e))
                    return g.toast.error(
                        'Informe uma data de nascimento válida.'
                    );
                try {
                    w(!0);
                    let a = await fetch('/api/admin/clients', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: b,
                                email: c,
                                phone: d,
                                birthday: e,
                            }),
                        }),
                        h = await a.json().catch(() => null);
                    if (!a.ok || !h?.ok) {
                        let b =
                            h?.error ||
                            (409 === a.status
                                ? 'Já existe um usuário com esse e-mail.'
                                : 'Não foi possível criar o cliente.');
                        g.toast.error(b);
                        return;
                    }
                    (g.toast.success('Cliente criado com sucesso!'),
                        f(!1),
                        H(),
                        window.location.reload());
                } catch {
                    g.toast.error('Falha de rede ao criar o cliente.');
                } finally {
                    w(!1);
                }
            }
            let K =
                    'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                L = new Date().getFullYear();
            return (0, b.jsxs)(d.Dialog, {
                open: a,
                onOpenChange: (a) => {
                    !p && (f(a), a || H());
                },
                children: [
                    (0, b.jsx)(d.DialogTrigger, {
                        asChild: !0,
                        children: (0, b.jsx)(e.Button, {
                            variant: 'brand',
                            children: 'Novo cliente',
                        }),
                    }),
                    (0, b.jsxs)(d.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary sm:max-w-[560px]',
                        children: [
                            (0, b.jsxs)(d.DialogHeader, {
                                children: [
                                    (0, b.jsx)(d.DialogTitle, {
                                        className:
                                            'text-title text-content-primary',
                                        children: 'Novo cliente',
                                    }),
                                    (0, b.jsx)(d.DialogDescription, {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children:
                                            'Cadastre um novo cliente para acompanhar histórico, planos e nível.',
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('form', {
                                onSubmit: J,
                                className: 'space-y-4',
                                children: [
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-medium-size text-content-primary',
                                                htmlFor: 'new-client-name',
                                                children: [
                                                    'Nome ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)(v, {
                                                id: 'new-client-name',
                                                name: 'name',
                                                icon: h.User,
                                                value: x,
                                                onChange: (a) =>
                                                    y(a.target.value),
                                                disabled: p,
                                                disabledIcon: p,
                                                placeholder: 'Nome do cliente',
                                                className: K,
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-medium-size text-content-primary',
                                                htmlFor: 'new-client-email',
                                                children: [
                                                    'E-mail ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)(v, {
                                                id: 'new-client-email',
                                                type: 'email',
                                                name: 'email',
                                                icon: i.Mail,
                                                value: z,
                                                onChange: (a) =>
                                                    A(a.target.value),
                                                disabled: p,
                                                disabledIcon: p,
                                                placeholder:
                                                    'email@exemplo.com',
                                                className: K,
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-medium-size text-content-primary',
                                                htmlFor: 'new-client-phone',
                                                children: [
                                                    'Telefone ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)(v, {
                                                id: 'new-client-phone',
                                                name: 'phone',
                                                type: 'tel',
                                                icon: j.Phone,
                                                placeholder: '(99) 99999-9999',
                                                value: B,
                                                onChange: (a) => {
                                                    let b;
                                                    return C(
                                                        0 ===
                                                            (b = t(
                                                                a.target.value
                                                            ).slice(0, 11))
                                                                .length
                                                            ? ''
                                                            : b.length <= 2
                                                              ? `(${b}`
                                                              : b.length <= 7
                                                                ? `(${b.slice(0, 2)}) ${b.slice(2)}`
                                                                : `(${b.slice(0, 2)}) ${b.slice(2, 7)}-${b.slice(7)}`
                                                    );
                                                },
                                                disabled: p,
                                                disabledIcon: p,
                                                className: K,
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-[11px] text-content-tertiary',
                                                children:
                                                    'Ex.: (11) 99999-9999',
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsxs)('label', {
                                                className:
                                                    'text-label-medium-size text-content-primary',
                                                children: [
                                                    'Data de nascimento',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                        className:
                                                            'text-red-500',
                                                        children: '*',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsxs)(n.Popover, {
                                                open: F,
                                                onOpenChange: G,
                                                children: [
                                                    (0, b.jsx)(
                                                        n.PopoverTrigger,
                                                        {
                                                            asChild: !0,
                                                            children: (0,
                                                            b.jsxs)(e.Button, {
                                                                type: 'button',
                                                                variant:
                                                                    'outline',
                                                                className: (0,
                                                                l.cn)(
                                                                    'w-full justify-between text-left font-normal',
                                                                    'bg-transparent border-border-primary text-content-primary',
                                                                    'hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary',
                                                                    'focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand',
                                                                    'focus:border-border-brand focus-visible:border-border-brand'
                                                                ),
                                                                disabled: p,
                                                                children: [
                                                                    (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex items-center gap-2',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        r.Calendar,
                                                                                        {
                                                                                            className:
                                                                                                'h-4 w-4 text-content-brand',
                                                                                        }
                                                                                    ),
                                                                                    I
                                                                                        ? (0,
                                                                                          o.format)(
                                                                                              I,
                                                                                              'dd/MM/yyyy',
                                                                                              {
                                                                                                  locale: q.ptBR,
                                                                                              }
                                                                                          )
                                                                                        : (0,
                                                                                          b.jsx)(
                                                                                              'span',
                                                                                              {
                                                                                                  className:
                                                                                                      'text-content-secondary',
                                                                                                  children:
                                                                                                      'Selecione uma data',
                                                                                              }
                                                                                          ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    (0, b.jsx)(
                                                                        s.ChevronDown,
                                                                        {
                                                                            className:
                                                                                'h-4 w-4 opacity-50',
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                        }
                                                    ),
                                                    (0, b.jsx)(
                                                        n.PopoverContent,
                                                        {
                                                            className:
                                                                'w-auto p-0',
                                                            align: 'start',
                                                            children: (0,
                                                            b.jsx)(m.Calendar, {
                                                                mode: 'single',
                                                                selected:
                                                                    I ?? void 0,
                                                                onSelect: (
                                                                    a
                                                                ) => {
                                                                    a &&
                                                                        (E(
                                                                            (0,
                                                                            o.format)(
                                                                                a,
                                                                                'yyyy-MM-dd'
                                                                            )
                                                                        ),
                                                                        G(!1));
                                                                },
                                                                autoFocus: !0,
                                                                locale: q.ptBR,
                                                                captionLayout:
                                                                    'dropdown',
                                                                fromYear: 1900,
                                                                toYear: L,
                                                                disabled: (a) =>
                                                                    a >
                                                                    new Date(),
                                                            }),
                                                        }
                                                    ),
                                                ],
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-[11px] text-content-tertiary',
                                                children:
                                                    'Usamos essa data para aniversários e relatórios.',
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)(d.DialogFooter, {
                                        className: 'gap-2 sm:gap-3 pt-2',
                                        children: [
                                            (0, b.jsxs)(e.Button, {
                                                type: 'submit',
                                                variant: 'edit2',
                                                size: 'sm',
                                                disabled: p,
                                                children: [
                                                    p &&
                                                        (0, b.jsx)(k.Loader2, {
                                                            className:
                                                                'mr-2 h-4 w-4 animate-spin',
                                                        }),
                                                    p
                                                        ? 'Salvando...'
                                                        : 'Criar cliente',
                                                ],
                                            }),
                                            (0, b.jsx)(e.Button, {
                                                type: 'button',
                                                variant: 'outline',
                                                size: 'sm',
                                                disabled: p,
                                                onClick: () => {
                                                    p || (f(!1), H());
                                                },
                                                children: 'Cancelar',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        a.s(['AdminNewClientDialog', () => w]);
    },
    433644,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(259849),
            e = a.i(814574),
            f = a.i(699570),
            g = a.i(866718),
            h = a.i(156916),
            i = a.i(587969);
        function j(a) {
            let b = String(a ?? '')
                .replace(/\D/g, '')
                .slice(0, 11);
            return 0 === b.length
                ? ''
                : b.length <= 2
                  ? `(${b}`
                  : b.length <= 7
                    ? `(${b.slice(0, 2)}) ${b.slice(2)}`
                    : `(${b.slice(0, 2)}) ${b.slice(2, 7)}-${b.slice(7)}`;
        }
        function k(a) {
            if (!a) return '';
            let b = String(a.getDate()).padStart(2, '0'),
                c = String(a.getMonth() + 1).padStart(2, '0'),
                d = a.getFullYear();
            return `${b}/${c}/${d}`;
        }
        function l({ client: a }) {
            let l = (0, d.useRouter)(),
                [m, n] = c.useState(!1),
                [o, p] = c.useTransition(),
                [q, r] = c.useState(a.name ?? ''),
                [s, t] = c.useState(a.email ?? ''),
                [u, v] = c.useState(j(a.phone ?? '')),
                [w, x] = c.useState(k(a.birthday));
            return (
                c.useEffect(() => {
                    m &&
                        (r(a.name ?? ''),
                        t(a.email ?? ''),
                        v(j(a.phone ?? '')),
                        x(k(a.birthday)));
                }, [m, a.id, a.name, a.email, a.phone, a.birthday]),
                (0, b.jsxs)(e.Dialog, {
                    open: m,
                    onOpenChange: (a) => {
                        o || n(a);
                    },
                    children: [
                        (0, b.jsx)(e.DialogTrigger, {
                            asChild: !0,
                            children: (0, b.jsx)(f.Button, {
                                variant: 'brand',
                                size: 'sm',
                                className:
                                    'border-border-primary text-paragraph-small',
                                children: 'Editar',
                            }),
                        }),
                        (0, b.jsxs)(e.DialogContent, {
                            className:
                                'bg-background-secondary border border-border-primary',
                            children: [
                                (0, b.jsx)(e.DialogHeader, {
                                    children: (0, b.jsx)(e.DialogTitle, {
                                        className:
                                            'text-title text-content-primary',
                                        children: 'Editar cliente',
                                    }),
                                }),
                                (0, b.jsxs)('form', {
                                    onSubmit: function (b) {
                                        if ((b.preventDefault(), o)) return;
                                        let c = q.trim(),
                                            d = s.trim().toLowerCase(),
                                            e = u.trim(),
                                            f = w.trim();
                                        return c
                                            ? d
                                                ? e
                                                    ? f
                                                        ? /^\d{2}\/\d{2}\/\d{4}$/.test(
                                                              f
                                                          )
                                                            ? e.replace(
                                                                  /\D/g,
                                                                  ''
                                                              ).length < 10
                                                                ? h.toast.error(
                                                                      'Informe um telefone válido (com DDD).'
                                                                  )
                                                                : void p(
                                                                      async () => {
                                                                          try {
                                                                              let b =
                                                                                      await fetch(
                                                                                          '/api/admin/clients',
                                                                                          {
                                                                                              method: 'PATCH',
                                                                                              headers:
                                                                                                  {
                                                                                                      'Content-Type':
                                                                                                          'application/json',
                                                                                                  },
                                                                                              body: JSON.stringify(
                                                                                                  {
                                                                                                      id: a.id,
                                                                                                      name: c,
                                                                                                      email: d,
                                                                                                      phone: e,
                                                                                                      birthday:
                                                                                                          f,
                                                                                                  }
                                                                                              ),
                                                                                          }
                                                                                      ),
                                                                                  g =
                                                                                      await b
                                                                                          .json()
                                                                                          .catch(
                                                                                              () =>
                                                                                                  null
                                                                                          );
                                                                              if (
                                                                                  !b.ok ||
                                                                                  !g ||
                                                                                  !1 ===
                                                                                      g.ok
                                                                              ) {
                                                                                  let a =
                                                                                      g?.error ||
                                                                                      `Erro ao atualizar cliente. (${b.status})`;
                                                                                  h.toast.error(
                                                                                      a
                                                                                  );
                                                                                  return;
                                                                              }
                                                                              (h.toast.success(
                                                                                  'Cliente atualizado com sucesso!'
                                                                              ),
                                                                                  n(
                                                                                      !1
                                                                                  ),
                                                                                  l.refresh());
                                                                          } catch {
                                                                              h.toast.error(
                                                                                  'Falha de rede ao atualizar cliente.'
                                                                              );
                                                                          }
                                                                      }
                                                                  )
                                                            : h.toast.error(
                                                                  'Preencha a data de nascimento no formato DD/MM/AAAA.'
                                                              )
                                                        : h.toast.error(
                                                              'Informe a data de nascimento.'
                                                          )
                                                    : h.toast.error(
                                                          'Informe o telefone do cliente.'
                                                      )
                                                : h.toast.error(
                                                      'Informe o e-mail do cliente.'
                                                  )
                                            : h.toast.error(
                                                  'Informe o nome do cliente.'
                                              );
                                    },
                                    className: 'space-y-4',
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className: 'space-y-1',
                                            children: [
                                                (0, b.jsxs)('label', {
                                                    className:
                                                        'text-label-small text-content-secondary',
                                                    htmlFor: `client-name-${a.id}`,
                                                    children: [
                                                        'Nome ',
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-red-500',
                                                            children: '*',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)(g.Input, {
                                                    id: `client-name-${a.id}`,
                                                    name: 'name',
                                                    value: q,
                                                    onChange: (a) =>
                                                        r(a.target.value),
                                                    disabled: o,
                                                    className:
                                                        'bg-background-tertiary border-border-primary text-content-primary',
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className: 'space-y-1',
                                            children: [
                                                (0, b.jsxs)('label', {
                                                    className:
                                                        'text-label-small text-content-secondary',
                                                    htmlFor: `client-email-${a.id}`,
                                                    children: [
                                                        'E-mail ',
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-red-500',
                                                            children: '*',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)(g.Input, {
                                                    id: `client-email-${a.id}`,
                                                    type: 'email',
                                                    name: 'email',
                                                    value: s,
                                                    onChange: (a) =>
                                                        t(a.target.value),
                                                    disabled: o,
                                                    className:
                                                        'bg-background-tertiary border-border-primary text-content-primary',
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className: 'space-y-1',
                                            children: [
                                                (0, b.jsxs)('label', {
                                                    className:
                                                        'text-label-small text-content-secondary',
                                                    htmlFor: `client-phone-${a.id}`,
                                                    children: [
                                                        'Telefone ',
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-red-500',
                                                            children: '*',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)(g.Input, {
                                                    id: `client-phone-${a.id}`,
                                                    name: 'phone',
                                                    type: 'tel',
                                                    placeholder:
                                                        '(99) 99999-9999',
                                                    value: u,
                                                    onChange: function (a) {
                                                        v(j(a.target.value));
                                                    },
                                                    disabled: o,
                                                    className:
                                                        'bg-background-tertiary border-border-primary text-content-primary',
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className: 'space-y-1',
                                            children: [
                                                (0, b.jsxs)('label', {
                                                    className:
                                                        'text-label-small text-content-secondary',
                                                    htmlFor: `client-birthday-${a.id}`,
                                                    children: [
                                                        'Data de nascimento',
                                                        ' ',
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-red-500',
                                                            children: '*',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'flex items-center gap-2 rounded-lg border border-border-primary bg-background-tertiary px-3 py-2 focus-within:ring-2 focus-within:ring-brand-primary',
                                                    children: [
                                                        (0, b.jsx)(i.Calendar, {
                                                            className:
                                                                'w-4 h-4 text-brand-primary',
                                                        }),
                                                        (0, b.jsx)('input', {
                                                            id: `client-birthday-${a.id}`,
                                                            name: 'birthday',
                                                            type: 'text',
                                                            inputMode:
                                                                'numeric',
                                                            placeholder:
                                                                'DD/MM/AAAA',
                                                            value: w,
                                                            onChange: function (
                                                                a
                                                            ) {
                                                                let b =
                                                                    a.target.value
                                                                        .replace(
                                                                            /\D/g,
                                                                            ''
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            8
                                                                        );
                                                                (b.length >= 5
                                                                    ? (b =
                                                                          b.replace(
                                                                              /(\d{2})(\d{2})(\d{0,4})/,
                                                                              (
                                                                                  a,
                                                                                  b,
                                                                                  c,
                                                                                  d
                                                                              ) =>
                                                                                  `${b}/${c}/${d}`
                                                                          ))
                                                                    : b.length >=
                                                                          3 &&
                                                                      (b =
                                                                          b.replace(
                                                                              /(\d{2})(\d{0,2})/,
                                                                              (
                                                                                  a,
                                                                                  b,
                                                                                  c
                                                                              ) =>
                                                                                  c
                                                                                      ? `${b}/${c}`
                                                                                      : b
                                                                          )),
                                                                    x(b));
                                                            },
                                                            disabled: o,
                                                            className:
                                                                'flex-1 bg-transparent outline-none border-0 text-paragraph-small-size text-content-primary placeholder:text-content-tertiary',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, b.jsx)('div', {
                                            className:
                                                'flex justify-end gap-2 pt-2',
                                            children: (0, b.jsx)(f.Button, {
                                                type: 'submit',
                                                variant: 'brand',
                                                disabled: o,
                                                children: o
                                                    ? 'Salvando...'
                                                    : 'Salvar alterações',
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                })
            );
        }
        a.s(['AdminEditClientDialog', () => l]);
    },
];

//# sourceMappingURL=src_components_admin_clients_f544e8d7._.js.map
