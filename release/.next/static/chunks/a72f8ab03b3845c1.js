(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    939476,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(672687),
            a = e.i(565750),
            n = Symbol.for('react.lazy'),
            s = t[' use '.trim().toString()];
        function i(e) {
            var t;
            return (
                null != e &&
                'object' == typeof e &&
                '$$typeof' in e &&
                e.$$typeof === n &&
                '_payload' in e &&
                'object' == typeof (t = e._payload) &&
                null !== t &&
                'then' in t
            );
        }
        function l(e) {
            var n;
            let l,
                d =
                    ((n = e),
                    ((l = t.forwardRef((e, a) => {
                        let { children: n, ...l } = e;
                        if (
                            (i(n) &&
                                'function' == typeof s &&
                                (n = s(n._payload)),
                            t.isValidElement(n))
                        ) {
                            var d;
                            let e,
                                s,
                                i =
                                    ((d = n),
                                    (s =
                                        (e = Object.getOwnPropertyDescriptor(
                                            d.props,
                                            'ref'
                                        )?.get) &&
                                        'isReactWarning' in e &&
                                        e.isReactWarning)
                                        ? d.ref
                                        : (s =
                                                (e =
                                                    Object.getOwnPropertyDescriptor(
                                                        d,
                                                        'ref'
                                                    )?.get) &&
                                                'isReactWarning' in e &&
                                                e.isReactWarning)
                                          ? d.props.ref
                                          : d.props.ref || d.ref),
                                o = (function (e, t) {
                                    let r = { ...t };
                                    for (let a in t) {
                                        let n = e[a],
                                            s = t[a];
                                        /^on[A-Z]/.test(a)
                                            ? n && s
                                                ? (r[a] = (...e) => {
                                                      let t = s(...e);
                                                      return (n(...e), t);
                                                  })
                                                : n && (r[a] = n)
                                            : 'style' === a
                                              ? (r[a] = { ...n, ...s })
                                              : 'className' === a &&
                                                (r[a] = [n, s]
                                                    .filter(Boolean)
                                                    .join(' '));
                                    }
                                    return { ...e, ...r };
                                })(l, n.props);
                            return (
                                n.type !== t.Fragment &&
                                    (o.ref = a ? (0, r.composeRefs)(a, i) : i),
                                t.cloneElement(n, o)
                            );
                        }
                        return t.Children.count(n) > 1
                            ? t.Children.only(null)
                            : null;
                    })).displayName = `${n}.SlotClone`),
                    l),
                o = t.forwardRef((e, r) => {
                    let { children: n, ...l } = e;
                    i(n) && 'function' == typeof s && (n = s(n._payload));
                    let o = t.Children.toArray(n),
                        u = o.find(c);
                    if (u) {
                        let e = u.props.children,
                            n = o.map((r) =>
                                r !== u
                                    ? r
                                    : t.Children.count(e) > 1
                                      ? t.Children.only(null)
                                      : t.isValidElement(e)
                                        ? e.props.children
                                        : null
                            );
                        return (0, a.jsx)(d, {
                            ...l,
                            ref: r,
                            children: t.isValidElement(e)
                                ? t.cloneElement(e, void 0, n)
                                : null,
                        });
                    }
                    return (0, a.jsx)(d, { ...l, ref: r, children: n });
                });
            return ((o.displayName = `${e}.Slot`), o);
        }
        var d = l('Slot'),
            o = Symbol('radix.slottable');
        function c(e) {
            return (
                t.isValidElement(e) &&
                'function' == typeof e.type &&
                '__radixId' in e.type &&
                e.type.__radixId === o
            );
        }
        e.s(['Slot', () => d, 'createSlot', () => l]);
    },
    519455,
    294237,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(939476),
            a = e.i(7284);
        let n = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
            s = a.clsx,
            i = (e, t) => (r) => {
                var a;
                if ((null == t ? void 0 : t.variants) == null)
                    return s(
                        e,
                        null == r ? void 0 : r.class,
                        null == r ? void 0 : r.className
                    );
                let { variants: i, defaultVariants: l } = t,
                    d = Object.keys(i).map((e) => {
                        let t = null == r ? void 0 : r[e],
                            a = null == l ? void 0 : l[e];
                        if (null === t) return null;
                        let s = n(t) || n(a);
                        return i[e][s];
                    }),
                    o =
                        r &&
                        Object.entries(r).reduce((e, t) => {
                            let [r, a] = t;
                            return (void 0 === a || (e[r] = a), e);
                        }, {});
                return s(
                    e,
                    d,
                    null == t || null == (a = t.compoundVariants)
                        ? void 0
                        : a.reduce((e, t) => {
                              let { class: r, className: a, ...n } = t;
                              return Object.entries(n).every((e) => {
                                  let [t, r] = e;
                                  return Array.isArray(r)
                                      ? r.includes({ ...l, ...o }[t])
                                      : { ...l, ...o }[t] === r;
                              })
                                  ? [...e, r, a]
                                  : e;
                          }, []),
                    null == r ? void 0 : r.class,
                    null == r ? void 0 : r.className
                );
            };
        e.s(['cva', 0, i], 294237);
        var l = e.i(975157);
        let d = i(
            "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring no-underline hover:no-underline",
            {
                variants: {
                    variant: {
                        default:
                            'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                        brand: 'bg-background-brand font-bold text-label-large text-[#050505] hover:bg-background-highlights rounded-lg',
                        outline:
                            'border border-border-primary bg-background-tertiary text-content-primary hover:bg-background-secondary hover:border-border-secondary transition-colors font-medium',
                        destructive:
                            '!bg-red-600 !text-white hover:!bg-red-700 !border-transparent border transition-colors font-medium rounded-lg',
                        active: 'bg-green-600 text-white hover:bg-green-700 transition-colors font-medium',
                        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                        link: 'text-primary underline-offset-4 hover:underline',
                        remove: 'inline-flex items-center gap-2 rounded-md border border-red-500/50 px-3 py-1 text-sm text-red-500 transition-all hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                        edit: 'inline-flex items-center gap-2 rounded-md border border-blue-500/50 px-3 py-1 text-sm text-blue-500 transition-all hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                        edit2: 'bg-background-brand text-label-large text-[#ffffff] hover:bg-background-highlights rounded-lg',
                    },
                    size: {
                        default: 'h-12 px-4 py-3 has-[>svg]:px-3',
                        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                        lg: 'h-12 rounded-md px-6 has-[>svg]:px-4',
                        icon: 'size-9',
                    },
                },
                defaultVariants: { variant: 'default', size: 'default' },
            }
        );
        function o({
            className: e,
            variant: a,
            size: n,
            asChild: s = !1,
            ...i
        }) {
            let o = s ? r.Slot : 'button';
            return (0, t.jsx)(o, {
                'data-slot': 'button',
                className: (0, l.cn)(d({ variant: a, size: n, className: e })),
                ...i,
            });
        }
        e.s(['Button', () => o, 'buttonVariants', () => d], 519455);
    },
    487486,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(939476),
            a = e.i(294237),
            n = e.i(975157);
        let s = (0, a.cva)(
            'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
            {
                variants: {
                    variant: {
                        default:
                            'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                        secondary:
                            'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                        destructive:
                            'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                        outline:
                            'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
                    },
                },
                defaultVariants: { variant: 'default' },
            }
        );
        function i({ className: e, variant: a, asChild: i = !1, ...l }) {
            let d = i ? r.Slot : 'span';
            return (0, t.jsx)(d, {
                'data-slot': 'badge',
                className: (0, n.cn)(s({ variant: a }), e),
                ...l,
            });
        }
        e.s(['Badge', () => i]);
    },
    834916,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            a = e.i(321838),
            n = e.i(245586),
            s = e.i(995403),
            i = e.i(519455),
            l = e.i(487486);
        function d(e) {
            switch (e) {
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
        function o(e) {
            return 'HAS_ACTIVE_PLAN' === e ? 'Tem plano ativo' : e;
        }
        function c({ initialData: e, error: c, initialCreateMode: u }) {
            let m = (0, n.useRouter)(),
                p = (0, n.usePathname)(),
                x = (0, n.useSearchParams)(),
                b = e?.units ?? [],
                g = e?.activeUnitId ?? '',
                v = e?.levels ?? ['BRONZE', 'PRATA', 'OURO', 'DIAMANTE'],
                f = e?.ruleTypes ?? ['HAS_ACTIVE_PLAN'],
                h = e?.rules ?? [],
                y = h.length > 0,
                j = 1 === b.length,
                N = r.useMemo(() => b.find((e) => e.id === g) ?? null, [b, g]),
                [w, k] = r.useState(g),
                [S, A] = r.useState(!1),
                C = x?.get('create');
            function T(e) {
                let t = new URLSearchParams(x?.toString() ?? '');
                for (let [r, a] of Object.entries(e))
                    a ? t.set(r, a) : t.delete(r);
                let r = t.toString();
                m.push(r ? `${p}?${r}` : p);
            }
            function R() {
                g && T({ unitId: g, create: '1' });
            }
            function E() {
                T({ create: null });
            }
            async function I(e) {
                try {
                    A(!0);
                    let t = await fetch('/api/admin/client-levels/rules', {
                            method: 'POST',
                            body: e,
                        }),
                        r = await t.json();
                    if (!t.ok || !r.ok) {
                        let e = r.ok ? 'Falha ao salvar.' : r.error;
                        return (s.toast.error(e), !1);
                    }
                    return !0;
                } catch (e) {
                    return (
                        s.toast.error(
                            'string' == typeof e?.message
                                ? e.message
                                : 'Falha ao salvar.'
                        ),
                        !1
                    );
                } finally {
                    A(!1);
                }
            }
            async function O(e) {
                if ((e.preventDefault(), !g)) return;
                let t = new FormData(e.currentTarget);
                (t.set('intent', 'create'),
                    t.set('unitId', g),
                    (await I(t)) &&
                        (s.toast.success('Regra criada.'), E(), m.refresh()));
            }
            async function B(e, t) {
                if ((t.preventDefault(), !g)) return;
                let r = new FormData(t.currentTarget);
                (r.set('intent', 'update'),
                    r.set('unitId', g),
                    r.set('ruleId', e),
                    (await I(r)) &&
                        (s.toast.success('Regra atualizada.'), m.refresh()));
            }
            async function P(e) {
                if (!g) return;
                let t = new FormData();
                (t.set('intent', 'delete'),
                    t.set('unitId', g),
                    t.set('ruleId', e),
                    (await I(t)) &&
                        (s.toast.success('Regra excluída.'), m.refresh()));
            }
            return (
                r.useEffect(() => {
                    k(g);
                }, [g]),
                (0, t.jsxs)('div', {
                    className: 'space-y-5 max-w-7xl mx-auto',
                    children: [
                        (0, t.jsxs)('header', {
                            className: 'flex flex-col gap-3',
                            children: [
                                (0, t.jsxs)('div', {
                                    className:
                                        'flex items-start justify-between gap-4',
                                    children: [
                                        (0, t.jsxs)('div', {
                                            children: [
                                                (0, t.jsx)('h1', {
                                                    className:
                                                        'text-title text-content-primary',
                                                    children:
                                                        'Nível para planos',
                                                }),
                                                (0, t.jsx)('p', {
                                                    className:
                                                        'text-paragraph-medium text-content-secondary',
                                                    children:
                                                        'Regras que podem “forçar” um nível, independentemente das contagens do mês.',
                                                }),
                                            ],
                                        }),
                                        (0, t.jsx)('div', {
                                            className:
                                                'flex items-center gap-2',
                                            children: (0, t.jsx)(i.Button, {
                                                asChild: !0,
                                                variant: 'outline',
                                                children: (0, t.jsx)(
                                                    a.default,
                                                    {
                                                        href: '/admin/client-level',
                                                        children: 'Voltar',
                                                    }
                                                ),
                                            }),
                                        }),
                                    ],
                                }),
                                c
                                    ? (0, t.jsxs)('section', {
                                          className:
                                              'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                          children: [
                                              (0, t.jsx)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children:
                                                      'Não foi possível carregar os dados.',
                                              }),
                                              (0, t.jsx)('p', {
                                                  className:
                                                      'mt-1 text-[11px] text-content-tertiary',
                                                  children: c,
                                              }),
                                          ],
                                      })
                                    : null,
                                (0, t.jsxs)('section', {
                                    className:
                                        'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                    children: [
                                        j
                                            ? (0, t.jsxs)('div', {
                                                  className:
                                                      'flex flex-col md:flex-row md:items-end gap-3',
                                                  children: [
                                                      (0, t.jsxs)('div', {
                                                          className:
                                                              'w-full md:w-90',
                                                          children: [
                                                              (0, t.jsx)(
                                                                  'label',
                                                                  {
                                                                      className:
                                                                          'text-[11px] text-content-secondary',
                                                                      children:
                                                                          'Unidade',
                                                                  }
                                                              ),
                                                              (0, t.jsx)(
                                                                  'div',
                                                                  {
                                                                      className:
                                                                          'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary flex items-center',
                                                                      children:
                                                                          N?.name ??
                                                                          g,
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, t.jsx)('div', {
                                                          className:
                                                              'flex items-center gap-2 md:ml-auto',
                                                          children:
                                                              !y &&
                                                              (0, t.jsx)(
                                                                  i.Button,
                                                                  {
                                                                      type: 'button',
                                                                      size: 'sm',
                                                                      variant:
                                                                          'edit2',
                                                                      onClick:
                                                                          R,
                                                                      disabled:
                                                                          !g,
                                                                      children:
                                                                          'Criar',
                                                                  }
                                                              ),
                                                      }),
                                                  ],
                                              })
                                            : (0, t.jsxs)('div', {
                                                  className:
                                                      'flex flex-col md:flex-row gap-3 md:items-end',
                                                  children: [
                                                      (0, t.jsxs)('div', {
                                                          className:
                                                              'w-full md:w-90',
                                                          children: [
                                                              (0, t.jsx)(
                                                                  'label',
                                                                  {
                                                                      className:
                                                                          'text-[11px] text-content-secondary',
                                                                      children:
                                                                          'Unidade',
                                                                  }
                                                              ),
                                                              (0, t.jsx)(
                                                                  'select',
                                                                  {
                                                                      name: 'unitId',
                                                                      value:
                                                                          w ||
                                                                          '',
                                                                      onChange:
                                                                          (e) =>
                                                                              k(
                                                                                  e
                                                                                      .target
                                                                                      .value
                                                                              ),
                                                                      className:
                                                                          'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                                      disabled:
                                                                          0 ===
                                                                          b.length,
                                                                      children:
                                                                          b.map(
                                                                              (
                                                                                  e
                                                                              ) =>
                                                                                  (0,
                                                                                  t.jsx)(
                                                                                      'option',
                                                                                      {
                                                                                          value: e.id,
                                                                                          children:
                                                                                              e.name,
                                                                                      },
                                                                                      e.id
                                                                                  )
                                                                          ),
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, t.jsxs)('div', {
                                                          className:
                                                              'flex items-center gap-2',
                                                          children: [
                                                              (0, t.jsx)(
                                                                  i.Button,
                                                                  {
                                                                      type: 'button',
                                                                      size: 'sm',
                                                                      variant:
                                                                          'edit2',
                                                                      onClick:
                                                                          function () {
                                                                              w &&
                                                                                  T(
                                                                                      {
                                                                                          unitId: w,
                                                                                          create: null,
                                                                                      }
                                                                                  );
                                                                          },
                                                                      disabled:
                                                                          !w,
                                                                      children:
                                                                          'Carregar',
                                                                  }
                                                              ),
                                                              !y &&
                                                                  (0, t.jsx)(
                                                                      i.Button,
                                                                      {
                                                                          type: 'button',
                                                                          size: 'sm',
                                                                          variant:
                                                                              'edit2',
                                                                          onClick:
                                                                              R,
                                                                          disabled:
                                                                              !g,
                                                                          children:
                                                                              'Criar',
                                                                      }
                                                                  ),
                                                              N
                                                                  ? (0, t.jsx)(
                                                                        l.Badge,
                                                                        {
                                                                            className:
                                                                                'bg-emerald-500/10 text-emerald-600 border-emerald-500/40',
                                                                            children:
                                                                                N.name,
                                                                        }
                                                                    )
                                                                  : null,
                                                          ],
                                                      }),
                                                  ],
                                              }),
                                        y
                                            ? (0, t.jsx)('p', {
                                                  className:
                                                      'mt-2 text-[11px] text-content-secondary',
                                                  children:
                                                      'Esta unidade já possui 1 regra. Para remover, basta excluir.',
                                              })
                                            : (0, t.jsx)('p', {
                                                  className:
                                                      'mt-2 text-[11px] text-content-secondary',
                                                  children:
                                                      'Esta tela permite apenas 1 regra por unidade.',
                                              }),
                                    ],
                                }),
                            ],
                        }),
                        (u || '1' === C) && !y
                            ? (0, t.jsxs)('section', {
                                  className:
                                      'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-3',
                                  children: [
                                      (0, t.jsxs)('div', {
                                          children: [
                                              (0, t.jsx)('p', {
                                                  className:
                                                      'text-label-small text-content-primary',
                                                  children: 'Nova regra',
                                              }),
                                              (0, t.jsx)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children:
                                                      'Exemplo: “Tem plano ativo → Diamante”.',
                                              }),
                                          ],
                                      }),
                                      (0, t.jsxs)('form', {
                                          className:
                                              'grid gap-3 md:grid-cols-3 items-end',
                                          method: 'POST',
                                          action: '/api/admin/client-levels/rules',
                                          onSubmit: O,
                                          children: [
                                              (0, t.jsx)('input', {
                                                  type: 'hidden',
                                                  name: 'unitId',
                                                  value: g,
                                              }),
                                              (0, t.jsx)('input', {
                                                  type: 'hidden',
                                                  name: 'intent',
                                                  value: 'create',
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-1',
                                                  children: [
                                                      (0, t.jsx)('label', {
                                                          className:
                                                              'text-[11px] text-content-secondary',
                                                          children: 'Tipo',
                                                      }),
                                                      (0, t.jsx)('select', {
                                                          name: 'type',
                                                          defaultValue:
                                                              'HAS_ACTIVE_PLAN',
                                                          className:
                                                              'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                          children: f.map((e) =>
                                                              (0, t.jsx)(
                                                                  'option',
                                                                  {
                                                                      value: e,
                                                                      children:
                                                                          o(e),
                                                                  },
                                                                  e
                                                              )
                                                          ),
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-1',
                                                  children: [
                                                      (0, t.jsx)('label', {
                                                          className:
                                                              'text-[11px] text-content-secondary',
                                                          children:
                                                              'Nível alvo',
                                                      }),
                                                      (0, t.jsx)('select', {
                                                          name: 'targetLevel',
                                                          defaultValue:
                                                              'DIAMANTE',
                                                          className:
                                                              'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                          children: v.map((e) =>
                                                              (0, t.jsx)(
                                                                  'option',
                                                                  {
                                                                      value: e,
                                                                      children:
                                                                          d(e),
                                                                  },
                                                                  e
                                                              )
                                                          ),
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className:
                                                      'flex items-center justify-end gap-2',
                                                  children: [
                                                      (0, t.jsx)(i.Button, {
                                                          type: 'submit',
                                                          size: 'sm',
                                                          variant: 'edit2',
                                                          disabled: !g || S,
                                                          children: S
                                                              ? 'Salvando...'
                                                              : 'Salvar',
                                                      }),
                                                      (0, t.jsx)(i.Button, {
                                                          type: 'button',
                                                          size: 'sm',
                                                          variant:
                                                              'destructive',
                                                          onClick: E,
                                                          disabled: S,
                                                          children: 'Cancelar',
                                                      }),
                                                  ],
                                              }),
                                          ],
                                      }),
                                  ],
                              })
                            : null,
                        (0, t.jsx)('section', {
                            className: 'space-y-2',
                            children: y
                                ? h.map((e) =>
                                      (0, t.jsxs)(
                                          'div',
                                          {
                                              className:
                                                  'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-3',
                                              children: [
                                                  (0, t.jsx)('div', {
                                                      className:
                                                          'flex items-start justify-between gap-3',
                                                      children: (0, t.jsxs)(
                                                          'div',
                                                          {
                                                              className:
                                                                  'space-y-1',
                                                              children: [
                                                                  (0, t.jsxs)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'flex flex-wrap items-center gap-2',
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  t.jsxs)(
                                                                                      'p',
                                                                                      {
                                                                                          className:
                                                                                              'text-paragraph-medium-size font-semibold text-content-primary',
                                                                                          children:
                                                                                              [
                                                                                                  o(
                                                                                                      e.type
                                                                                                  ),
                                                                                                  ' →',
                                                                                                  ' ',
                                                                                                  d(
                                                                                                      e.targetLevel
                                                                                                  ),
                                                                                              ],
                                                                                      }
                                                                                  ),
                                                                                  e.isEnabled
                                                                                      ? (0,
                                                                                        t.jsx)(
                                                                                            l.Badge,
                                                                                            {
                                                                                                className:
                                                                                                    'bg-emerald-500/10 text-emerald-600 border-emerald-500/40',
                                                                                                children:
                                                                                                    'Ativa',
                                                                                            }
                                                                                        )
                                                                                      : (0,
                                                                                        t.jsx)(
                                                                                            l.Badge,
                                                                                            {
                                                                                                variant:
                                                                                                    'outline',
                                                                                                className:
                                                                                                    'border-border-primary text-content-secondary',
                                                                                                children:
                                                                                                    'Desativada',
                                                                                            }
                                                                                        ),
                                                                              ],
                                                                      }
                                                                  ),
                                                                  (0, t.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-[11px] text-content-secondary',
                                                                          children:
                                                                              [
                                                                                  'Prioridade:',
                                                                                  ' ',
                                                                                  (0,
                                                                                  t.jsx)(
                                                                                      'span',
                                                                                      {
                                                                                          className:
                                                                                              'text-content-primary font-semibold',
                                                                                          children:
                                                                                              e.priority,
                                                                                      }
                                                                                  ),
                                                                                  ' • ',
                                                                                  'Para desativar, exclua a regra.',
                                                                              ],
                                                                      }
                                                                  ),
                                                              ],
                                                          }
                                                      ),
                                                  }),
                                                  (0, t.jsxs)('form', {
                                                      className:
                                                          'grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end',
                                                      method: 'POST',
                                                      action: '/api/admin/client-levels/rules',
                                                      onSubmit: (t) =>
                                                          B(e.id, t),
                                                      children: [
                                                          (0, t.jsx)('input', {
                                                              type: 'hidden',
                                                              name: 'unitId',
                                                              value: g,
                                                          }),
                                                          (0, t.jsx)('input', {
                                                              type: 'hidden',
                                                              name: 'intent',
                                                              value: 'update',
                                                          }),
                                                          (0, t.jsx)('input', {
                                                              type: 'hidden',
                                                              name: 'ruleId',
                                                              value: e.id,
                                                          }),
                                                          (0, t.jsxs)('div', {
                                                              className:
                                                                  'space-y-1',
                                                              children: [
                                                                  (0, t.jsx)(
                                                                      'label',
                                                                      {
                                                                          className:
                                                                              'text-[11px] text-content-secondary',
                                                                          children:
                                                                              'Tipo',
                                                                      }
                                                                  ),
                                                                  (0, t.jsx)(
                                                                      'select',
                                                                      {
                                                                          name: 'type',
                                                                          defaultValue:
                                                                              e.type,
                                                                          className:
                                                                              'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                                          children:
                                                                              f.map(
                                                                                  (
                                                                                      e
                                                                                  ) =>
                                                                                      (0,
                                                                                      t.jsx)(
                                                                                          'option',
                                                                                          {
                                                                                              value: e,
                                                                                              children:
                                                                                                  o(
                                                                                                      e
                                                                                                  ),
                                                                                          },
                                                                                          e
                                                                                      )
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, t.jsxs)('div', {
                                                              className:
                                                                  'space-y-1',
                                                              children: [
                                                                  (0, t.jsx)(
                                                                      'label',
                                                                      {
                                                                          className:
                                                                              'text-[11px] text-content-secondary',
                                                                          children:
                                                                              'Nível alvo',
                                                                      }
                                                                  ),
                                                                  (0, t.jsx)(
                                                                      'select',
                                                                      {
                                                                          name: 'targetLevel',
                                                                          defaultValue:
                                                                              e.targetLevel,
                                                                          className:
                                                                              'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                                          children:
                                                                              v.map(
                                                                                  (
                                                                                      e
                                                                                  ) =>
                                                                                      (0,
                                                                                      t.jsx)(
                                                                                          'option',
                                                                                          {
                                                                                              value: e,
                                                                                              children:
                                                                                                  d(
                                                                                                      e
                                                                                                  ),
                                                                                          },
                                                                                          e
                                                                                      )
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, t.jsxs)('div', {
                                                              className:
                                                                  'flex items-center justify-end gap-2',
                                                              children: [
                                                                  (0, t.jsx)(
                                                                      i.Button,
                                                                      {
                                                                          type: 'submit',
                                                                          size: 'sm',
                                                                          variant:
                                                                              'edit2',
                                                                          disabled:
                                                                              !g ||
                                                                              S,
                                                                          children:
                                                                              S
                                                                                  ? 'Salvando...'
                                                                                  : 'Salvar',
                                                                      }
                                                                  ),
                                                                  (0, t.jsx)(
                                                                      i.Button,
                                                                      {
                                                                          type: 'button',
                                                                          variant:
                                                                              'destructive',
                                                                          size: 'sm',
                                                                          className:
                                                                              'border-border-primary hover:bg-muted/40',
                                                                          disabled:
                                                                              S,
                                                                          onClick:
                                                                              () =>
                                                                                  P(
                                                                                      e.id
                                                                                  ),
                                                                          children:
                                                                              'Excluir',
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                          (0, t.jsx)('input', {
                                                              type: 'hidden',
                                                              name: 'priority',
                                                              value: String(
                                                                  e.priority
                                                              ),
                                                          }),
                                                      ],
                                                  }),
                                              ],
                                          },
                                          e.id
                                      )
                                  )
                                : (0, t.jsx)('div', {
                                      className:
                                          'rounded-xl border border-border-primary bg-background-tertiary px-4 py-6',
                                      children: (0, t.jsx)('p', {
                                          className:
                                              'text-paragraph-small text-content-secondary text-center',
                                          children: 'Nenhuma regra cadastrada.',
                                      }),
                                  }),
                        }),
                    ],
                })
            );
        }
        e.s(['default', () => c]);
    },
]);
