(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    939476,
    (e) => {
        'use strict';
        var r = e.i(990341),
            t = e.i(672687),
            n = e.i(565750),
            i = Symbol.for('react.lazy'),
            a = r[' use '.trim().toString()];
        function s(e) {
            var r;
            return (
                null != e &&
                'object' == typeof e &&
                '$$typeof' in e &&
                e.$$typeof === i &&
                '_payload' in e &&
                'object' == typeof (r = e._payload) &&
                null !== r &&
                'then' in r
            );
        }
        function o(e) {
            var i;
            let o,
                l =
                    ((i = e),
                    ((o = r.forwardRef((e, n) => {
                        let { children: i, ...o } = e;
                        if (
                            (s(i) &&
                                'function' == typeof a &&
                                (i = a(i._payload)),
                            r.isValidElement(i))
                        ) {
                            var l;
                            let e,
                                a,
                                s =
                                    ((l = i),
                                    (a =
                                        (e = Object.getOwnPropertyDescriptor(
                                            l.props,
                                            'ref'
                                        )?.get) &&
                                        'isReactWarning' in e &&
                                        e.isReactWarning)
                                        ? l.ref
                                        : (a =
                                                (e =
                                                    Object.getOwnPropertyDescriptor(
                                                        l,
                                                        'ref'
                                                    )?.get) &&
                                                'isReactWarning' in e &&
                                                e.isReactWarning)
                                          ? l.props.ref
                                          : l.props.ref || l.ref),
                                d = (function (e, r) {
                                    let t = { ...r };
                                    for (let n in r) {
                                        let i = e[n],
                                            a = r[n];
                                        /^on[A-Z]/.test(n)
                                            ? i && a
                                                ? (t[n] = (...e) => {
                                                      let r = a(...e);
                                                      return (i(...e), r);
                                                  })
                                                : i && (t[n] = i)
                                            : 'style' === n
                                              ? (t[n] = { ...i, ...a })
                                              : 'className' === n &&
                                                (t[n] = [i, a]
                                                    .filter(Boolean)
                                                    .join(' '));
                                    }
                                    return { ...e, ...t };
                                })(o, i.props);
                            return (
                                i.type !== r.Fragment &&
                                    (d.ref = n ? (0, t.composeRefs)(n, s) : s),
                                r.cloneElement(i, d)
                            );
                        }
                        return r.Children.count(i) > 1
                            ? r.Children.only(null)
                            : null;
                    })).displayName = `${i}.SlotClone`),
                    o),
                d = r.forwardRef((e, t) => {
                    let { children: i, ...o } = e;
                    s(i) && 'function' == typeof a && (i = a(i._payload));
                    let d = r.Children.toArray(i),
                        u = d.find(c);
                    if (u) {
                        let e = u.props.children,
                            i = d.map((t) =>
                                t !== u
                                    ? t
                                    : r.Children.count(e) > 1
                                      ? r.Children.only(null)
                                      : r.isValidElement(e)
                                        ? e.props.children
                                        : null
                            );
                        return (0, n.jsx)(l, {
                            ...o,
                            ref: t,
                            children: r.isValidElement(e)
                                ? r.cloneElement(e, void 0, i)
                                : null,
                        });
                    }
                    return (0, n.jsx)(l, { ...o, ref: t, children: i });
                });
            return ((d.displayName = `${e}.Slot`), d);
        }
        var l = o('Slot'),
            d = Symbol('radix.slottable');
        function c(e) {
            return (
                r.isValidElement(e) &&
                'function' == typeof e.type &&
                '__radixId' in e.type &&
                e.type.__radixId === d
            );
        }
        e.s(['Slot', () => l, 'createSlot', () => o]);
    },
    519455,
    294237,
    (e) => {
        'use strict';
        var r = e.i(565750),
            t = e.i(939476),
            n = e.i(7284);
        let i = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
            a = n.clsx,
            s = (e, r) => (t) => {
                var n;
                if ((null == r ? void 0 : r.variants) == null)
                    return a(
                        e,
                        null == t ? void 0 : t.class,
                        null == t ? void 0 : t.className
                    );
                let { variants: s, defaultVariants: o } = r,
                    l = Object.keys(s).map((e) => {
                        let r = null == t ? void 0 : t[e],
                            n = null == o ? void 0 : o[e];
                        if (null === r) return null;
                        let a = i(r) || i(n);
                        return s[e][a];
                    }),
                    d =
                        t &&
                        Object.entries(t).reduce((e, r) => {
                            let [t, n] = r;
                            return (void 0 === n || (e[t] = n), e);
                        }, {});
                return a(
                    e,
                    l,
                    null == r || null == (n = r.compoundVariants)
                        ? void 0
                        : n.reduce((e, r) => {
                              let { class: t, className: n, ...i } = r;
                              return Object.entries(i).every((e) => {
                                  let [r, t] = e;
                                  return Array.isArray(t)
                                      ? t.includes({ ...o, ...d }[r])
                                      : { ...o, ...d }[r] === t;
                              })
                                  ? [...e, t, n]
                                  : e;
                          }, []),
                    null == t ? void 0 : t.class,
                    null == t ? void 0 : t.className
                );
            };
        e.s(['cva', 0, s], 294237);
        var o = e.i(975157);
        let l = s(
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
        function d({
            className: e,
            variant: n,
            size: i,
            asChild: a = !1,
            ...s
        }) {
            let d = a ? t.Slot : 'button';
            return (0, r.jsx)(d, {
                'data-slot': 'button',
                className: (0, o.cn)(l({ variant: n, size: i, className: e })),
                ...s,
            });
        }
        e.s(['Button', () => d, 'buttonVariants', () => l], 519455);
    },
    793479,
    (e) => {
        'use strict';
        var r = e.i(565750),
            t = e.i(975157);
        function n({ className: e, type: n, ...i }) {
            return (0, r.jsx)('input', {
                type: n,
                'data-slot': 'input',
                className: (0, t.cn)(
                    'flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50',
                    'hover:border-border-secondary',
                    'focus:border-border-brand focus-visible:border-border-brand',
                    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
                    e
                ),
                ...i,
            });
        }
        e.s(['Input', () => n]);
    },
    487486,
    (e) => {
        'use strict';
        var r = e.i(565750),
            t = e.i(939476),
            n = e.i(294237),
            i = e.i(975157);
        let a = (0, n.cva)(
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
        function s({ className: e, variant: n, asChild: s = !1, ...o }) {
            let l = s ? t.Slot : 'span';
            return (0, r.jsx)(l, {
                'data-slot': 'badge',
                className: (0, i.cn)(a({ variant: n }), e),
                ...o,
            });
        }
        e.s(['Badge', () => s]);
    },
    241861,
    (e) => {
        'use strict';
        var r = e.i(565750),
            t = e.i(990341),
            n = e.i(321838),
            i = e.i(245586),
            a = e.i(995403),
            s = e.i(519455),
            o = e.i(487486),
            l = e.i(793479);
        function d({ initialData: e, error: d }) {
            let c = (0, i.useRouter)(),
                u = (0, i.usePathname)(),
                m = e?.units ?? [],
                b = e?.activeUnitId ?? '',
                p = e?.levels ?? ['BRONZE', 'PRATA', 'OURO', 'DIAMANTE'],
                f = e?.configByLevel ?? {},
                g = t.useMemo(() => m.find((e) => e.id === b) ?? null, [m, b]),
                [v, x] = t.useState(b),
                [h, y] = t.useState(!1);
            async function j(e) {
                if ((e.preventDefault(), b))
                    try {
                        y(!0);
                        let r = new FormData(e.currentTarget),
                            t = await fetch('/api/admin/client-levels/config', {
                                method: 'POST',
                                body: r,
                            }),
                            n = await t.json();
                        if (!t.ok || !n.ok) {
                            let e = n.ok ? 'Falha ao salvar.' : n.error;
                            a.toast.error(e);
                            return;
                        }
                        (a.toast.success('Configurações salvas.'), c.refresh());
                    } catch (e) {
                        a.toast.error(
                            'string' == typeof e?.message
                                ? e.message
                                : 'Falha ao salvar.'
                        );
                    } finally {
                        y(!1);
                    }
            }
            return (
                t.useEffect(() => {
                    x(b);
                }, [b]),
                (0, r.jsxs)('div', {
                    className: 'space-y-5 max-w-7xl mx-auto',
                    children: [
                        (0, r.jsxs)('header', {
                            className: 'flex flex-col gap-3',
                            children: [
                                (0, r.jsxs)('div', {
                                    className:
                                        'flex items-start justify-between gap-4',
                                    children: [
                                        (0, r.jsxs)('div', {
                                            children: [
                                                (0, r.jsx)('h1', {
                                                    className:
                                                        'text-title text-content-primary',
                                                    children:
                                                        'Configurações por nível',
                                                }),
                                                (0, r.jsxs)('p', {
                                                    className:
                                                        'text-paragraph-medium text-content-secondary',
                                                    children: [
                                                        'Defina os mínimos mensais para cada nível: atendimentos',
                                                        ' ',
                                                        (0, r.jsx)('span', {
                                                            className:
                                                                'font-semibold',
                                                            children:
                                                                'concluídos',
                                                        }),
                                                        ' e pedidos',
                                                        ' ',
                                                        (0, r.jsx)('span', {
                                                            className:
                                                                'font-semibold',
                                                            children:
                                                                'entregues',
                                                        }),
                                                        '.',
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, r.jsx)('div', {
                                            className:
                                                'flex items-center gap-2',
                                            children: (0, r.jsx)(s.Button, {
                                                asChild: !0,
                                                variant: 'outline',
                                                children: (0, r.jsx)(
                                                    n.default,
                                                    {
                                                        href: '/admin/client-level',
                                                        children: 'Voltar',
                                                    }
                                                ),
                                            }),
                                        }),
                                    ],
                                }),
                                d
                                    ? (0, r.jsxs)('section', {
                                          className:
                                              'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                          children: [
                                              (0, r.jsx)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children:
                                                      'Não foi possível carregar os dados.',
                                              }),
                                              (0, r.jsx)('p', {
                                                  className:
                                                      'mt-1 text-[11px] text-content-tertiary',
                                                  children: d,
                                              }),
                                          ],
                                      })
                                    : null,
                                (0, r.jsx)('section', {
                                    className:
                                        'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                    children: (0, r.jsxs)('div', {
                                        className:
                                            'flex flex-col md:flex-row gap-3 md:items-end',
                                        children: [
                                            (0, r.jsxs)('div', {
                                                className: 'w-full md:w-90',
                                                children: [
                                                    (0, r.jsx)('label', {
                                                        className:
                                                            'text-[11px] text-content-secondary',
                                                        children: 'Unidade',
                                                    }),
                                                    (0, r.jsx)('select', {
                                                        name: 'unitId',
                                                        value: v || '',
                                                        onChange: (e) => {
                                                            x(e.target.value);
                                                        },
                                                        className:
                                                            'h-10 w-full rounded-md border border-border-primary bg-background-secondary px-3 text-sm text-content-primary',
                                                        disabled:
                                                            0 === m.length,
                                                        children: m.map((e) =>
                                                            (0, r.jsx)(
                                                                'option',
                                                                {
                                                                    value: e.id,
                                                                    children:
                                                                        e.name,
                                                                },
                                                                e.id
                                                            )
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            (0, r.jsxs)('div', {
                                                className:
                                                    'flex items-center gap-2',
                                                children: [
                                                    (0, r.jsx)(s.Button, {
                                                        type: 'button',
                                                        size: 'sm',
                                                        variant: 'edit2',
                                                        onClick: function () {
                                                            v &&
                                                                c.push(
                                                                    `${u}?unitId=${encodeURIComponent(v)}`
                                                                );
                                                        },
                                                        disabled: !v,
                                                        children: 'Carregar',
                                                    }),
                                                    g
                                                        ? (0, r.jsx)(o.Badge, {
                                                              className:
                                                                  'bg-emerald-500/10 text-emerald-600 border-emerald-500/40',
                                                              children: g.name,
                                                          })
                                                        : null,
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                        (0, r.jsx)('section', {
                            className:
                                'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-4',
                            children: (0, r.jsxs)('form', {
                                className: 'space-y-4',
                                method: 'POST',
                                action: '/api/admin/client-levels/config',
                                onSubmit: j,
                                children: [
                                    (0, r.jsx)('input', {
                                        type: 'hidden',
                                        name: 'unitId',
                                        value: b,
                                    }),
                                    (0, r.jsx)('div', {
                                        className: 'grid gap-3 md:grid-cols-2',
                                        children: p.map((e) => {
                                            let t = f[e],
                                                n = t?.minAppointmentsDone ?? 0,
                                                i = t?.minOrdersCompleted ?? 0;
                                            return (0, r.jsxs)(
                                                'div',
                                                {
                                                    className:
                                                        'rounded-xl border border-border-primary bg-background-secondary p-4 space-y-3',
                                                    children: [
                                                        (0, r.jsxs)('div', {
                                                            className:
                                                                'flex items-center justify-between gap-2',
                                                            children: [
                                                                (0, r.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-paragraph-medium-size font-semibold text-content-primary',
                                                                        children:
                                                                            (function (
                                                                                e
                                                                            ) {
                                                                                switch (
                                                                                    e
                                                                                ) {
                                                                                    case 'BRONZE':
                                                                                        return 'Bronze';
                                                                                    case 'PRATA':
                                                                                        return 'Prata';
                                                                                    case 'OURO':
                                                                                        return 'Ouro';
                                                                                    case 'DIAMANTE':
                                                                                        return 'Diamante';
                                                                                }
                                                                            })(
                                                                                e
                                                                            ),
                                                                    }
                                                                ),
                                                                t
                                                                    ? (0,
                                                                      r.jsx)(
                                                                          o.Badge,
                                                                          {
                                                                              className:
                                                                                  'bg-emerald-500/10 text-emerald-600 border-emerald-500/40',
                                                                              children:
                                                                                  'Configurado',
                                                                          }
                                                                      )
                                                                    : (0,
                                                                      r.jsx)(
                                                                          o.Badge,
                                                                          {
                                                                              variant:
                                                                                  'outline',
                                                                              className:
                                                                                  'border-border-primary text-content-secondary',
                                                                              children:
                                                                                  'Novo',
                                                                          }
                                                                      ),
                                                            ],
                                                        }),
                                                        (0, r.jsxs)('div', {
                                                            className:
                                                                'grid grid-cols-2 gap-3',
                                                            children: [
                                                                (0, r.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'space-y-1',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                r.jsx)(
                                                                                    'label',
                                                                                    {
                                                                                        className:
                                                                                            'text-[11px] text-content-secondary',
                                                                                        children:
                                                                                            'Mínimo de agendamentos concluídos',
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                r.jsx)(
                                                                                    l.Input,
                                                                                    {
                                                                                        name: `minAppointmentsDone_${e}`,
                                                                                        defaultValue:
                                                                                            String(
                                                                                                n
                                                                                            ),
                                                                                        inputMode:
                                                                                            'numeric',
                                                                                        className:
                                                                                            'h-10 bg-background-tertiary border-border-primary',
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                                (0, r.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'space-y-1',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                r.jsx)(
                                                                                    'label',
                                                                                    {
                                                                                        className:
                                                                                            'text-[11px] text-content-secondary',
                                                                                        children:
                                                                                            'Mínimo de pedidos entregues',
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                r.jsx)(
                                                                                    l.Input,
                                                                                    {
                                                                                        name: `minOrdersCompleted_${e}`,
                                                                                        defaultValue:
                                                                                            String(
                                                                                                i
                                                                                            ),
                                                                                        inputMode:
                                                                                            'numeric',
                                                                                        className:
                                                                                            'h-10 bg-background-tertiary border-border-primary',
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        (0, r.jsx)('p', {
                                                            className:
                                                                'text-[11px] text-content-secondary',
                                                            children:
                                                                'Dica: coloque 0 para “sem exigência” naquele critério.',
                                                        }),
                                                    ],
                                                },
                                                e
                                            );
                                        }),
                                    }),
                                    (0, r.jsxs)('div', {
                                        className:
                                            'flex items-center justify-end gap-2',
                                        children: [
                                            (0, r.jsx)(s.Button, {
                                                type: 'submit',
                                                size: 'sm',
                                                variant: 'edit2',
                                                disabled: !b || h,
                                                children: h
                                                    ? 'Salvando...'
                                                    : 'Salvar configurações',
                                            }),
                                            (0, r.jsx)(s.Button, {
                                                asChild: !0,
                                                type: 'button',
                                                size: 'sm',
                                                variant: 'destructive',
                                                children: (0, r.jsx)(
                                                    n.default,
                                                    {
                                                        href: '/admin/client-level',
                                                        children: 'Cancelar',
                                                    }
                                                ),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                    ],
                })
            );
        }
        e.s(['default', () => d]);
    },
]);
