module.exports = [
    193695,
    (a, b, c) => {
        b.exports = a.x(
            'next/dist/shared/lib/no-fallback-error.external.js',
            () => require('next/dist/shared/lib/no-fallback-error.external.js')
        );
    },
    650645,
    (a) => {
        a.n(a.i(827572));
    },
    262530,
    (a) => {
        a.n(a.i(688848));
    },
    409171,
    (a) => {
        a.n(a.i(753004));
    },
    21802,
    (a) => {
        a.n(a.i(277152));
    },
    155517,
    (a) => {
        a.n(a.i(298906));
    },
    638904,
    18351,
    708111,
    (a) => {
        'use strict';
        let b, c, d;
        var e = a.i(623127),
            f = a.i(149919);
        function g(a, b) {
            if ('function' == typeof a) return a(b);
            null != a && (a.current = b);
        }
        var h = Symbol.for('react.lazy'),
            i = f[' use '.trim().toString()];
        function j(a) {
            var b;
            return (
                null != a &&
                'object' == typeof a &&
                '$$typeof' in a &&
                a.$$typeof === h &&
                '_payload' in a &&
                'object' == typeof (b = a._payload) &&
                null !== b &&
                'then' in b
            );
        }
        var k =
                (((d = f.forwardRef((a, b) => {
                    let { children: c, ...d } = a;
                    if (
                        (j(c) && 'function' == typeof i && (c = i(c._payload)),
                        f.isValidElement(c))
                    ) {
                        var e;
                        let a,
                            h,
                            i =
                                ((e = c),
                                (h =
                                    (a = Object.getOwnPropertyDescriptor(
                                        e.props,
                                        'ref'
                                    )?.get) &&
                                    'isReactWarning' in a &&
                                    a.isReactWarning)
                                    ? e.ref
                                    : (h =
                                            (a =
                                                Object.getOwnPropertyDescriptor(
                                                    e,
                                                    'ref'
                                                )?.get) &&
                                            'isReactWarning' in a &&
                                            a.isReactWarning)
                                      ? e.props.ref
                                      : e.props.ref || e.ref),
                            j = (function (a, b) {
                                let c = { ...b };
                                for (let d in b) {
                                    let e = a[d],
                                        f = b[d];
                                    /^on[A-Z]/.test(d)
                                        ? e && f
                                            ? (c[d] = (...a) => {
                                                  let b = f(...a);
                                                  return (e(...a), b);
                                              })
                                            : e && (c[d] = e)
                                        : 'style' === d
                                          ? (c[d] = { ...e, ...f })
                                          : 'className' === d &&
                                            (c[d] = [e, f]
                                                .filter(Boolean)
                                                .join(' '));
                                }
                                return { ...a, ...c };
                            })(d, c.props);
                        return (
                            c.type !== f.Fragment &&
                                (j.ref = b
                                    ? (function (...a) {
                                          return (b) => {
                                              let c = !1,
                                                  d = a.map((a) => {
                                                      let d = g(a, b);
                                                      return (
                                                          c ||
                                                              'function' !=
                                                                  typeof d ||
                                                              (c = !0),
                                                          d
                                                      );
                                                  });
                                              if (c)
                                                  return () => {
                                                      for (
                                                          let b = 0;
                                                          b < d.length;
                                                          b++
                                                      ) {
                                                          let c = d[b];
                                                          'function' == typeof c
                                                              ? c()
                                                              : g(a[b], null);
                                                      }
                                                  };
                                          };
                                      })(b, i)
                                    : i),
                            f.cloneElement(c, j)
                        );
                    }
                    return f.Children.count(c) > 1
                        ? f.Children.only(null)
                        : null;
                })).displayName = 'Slot.SlotClone'),
                (b = d),
                ((c = f.forwardRef((a, c) => {
                    let { children: d, ...g } = a;
                    j(d) && 'function' == typeof i && (d = i(d._payload));
                    let h = f.Children.toArray(d),
                        k = h.find(m);
                    if (k) {
                        let a = k.props.children,
                            d = h.map((b) =>
                                b !== k
                                    ? b
                                    : f.Children.count(a) > 1
                                      ? f.Children.only(null)
                                      : f.isValidElement(a)
                                        ? a.props.children
                                        : null
                            );
                        return (0, e.jsx)(b, {
                            ...g,
                            ref: c,
                            children: f.isValidElement(a)
                                ? f.cloneElement(a, void 0, d)
                                : null,
                        });
                    }
                    return (0, e.jsx)(b, { ...g, ref: c, children: d });
                })).displayName = 'Slot.Slot'),
                c),
            l = Symbol('radix.slottable');
        function m(a) {
            return (
                f.isValidElement(a) &&
                'function' == typeof a.type &&
                '__radixId' in a.type &&
                a.type.__radixId === l
            );
        }
        a.s(['Slot', () => k], 18351);
        var n = a.i(668962);
        let o = (a) => ('boolean' == typeof a ? `${a}` : 0 === a ? '0' : a),
            p = n.clsx,
            q = (a, b) => (c) => {
                var d;
                if ((null == b ? void 0 : b.variants) == null)
                    return p(
                        a,
                        null == c ? void 0 : c.class,
                        null == c ? void 0 : c.className
                    );
                let { variants: e, defaultVariants: f } = b,
                    g = Object.keys(e).map((a) => {
                        let b = null == c ? void 0 : c[a],
                            d = null == f ? void 0 : f[a];
                        if (null === b) return null;
                        let g = o(b) || o(d);
                        return e[a][g];
                    }),
                    h =
                        c &&
                        Object.entries(c).reduce((a, b) => {
                            let [c, d] = b;
                            return (void 0 === d || (a[c] = d), a);
                        }, {});
                return p(
                    a,
                    g,
                    null == b || null == (d = b.compoundVariants)
                        ? void 0
                        : d.reduce((a, b) => {
                              let { class: c, className: d, ...e } = b;
                              return Object.entries(e).every((a) => {
                                  let [b, c] = a;
                                  return Array.isArray(c)
                                      ? c.includes({ ...f, ...h }[b])
                                      : { ...f, ...h }[b] === c;
                              })
                                  ? [...a, c, d]
                                  : a;
                          }, []),
                    null == c ? void 0 : c.class,
                    null == c ? void 0 : c.className
                );
            };
        a.s(['cva', 0, q], 708111);
        var r = a.i(139138);
        let s = q(
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
        function t({
            className: a,
            variant: b,
            size: c,
            asChild: d = !1,
            ...f
        }) {
            return (0, e.jsx)(d ? k : 'button', {
                'data-slot': 'button',
                className: (0, r.cn)(s({ variant: b, size: c, className: a })),
                ...f,
            });
        }
        a.s(['Button', () => t, 'buttonVariants', () => s], 638904);
    },
    850931,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(139138);
        function d({ className: a, type: d, ...e }) {
            return (0, b.jsx)('input', {
                type: d,
                'data-slot': 'input',
                className: (0, c.cn)(
                    'flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50',
                    'hover:border-border-secondary',
                    'focus:border-border-brand focus-visible:border-border-brand',
                    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
                    a
                ),
                ...e,
            });
        }
        a.s(['Input', () => d]);
    },
    84534,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call Label() from the server but Label is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/ui/label.tsx <module evaluation>',
            'Label'
        );
        a.s(['Label', 0, b]);
    },
    507604,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call Label() from the server but Label is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/ui/label.tsx',
            'Label'
        );
        a.s(['Label', 0, b]);
    },
    443562,
    (a) => {
        'use strict';
        a.i(84534);
        var b = a.i(507604);
        a.n(b);
    },
    867796,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(928624),
            d = a.i(638904),
            e = a.i(850931),
            f = a.i(443562),
            g = a.i(169513);
        async function h({ searchParams: a }) {
            let h = ((await a) ?? {}).error ?? '',
                i = (await (0, g.headers)()).get('host') ?? '',
                j = (function (a) {
                    if (!a) return null;
                    switch (a) {
                        case 'credenciais':
                            return 'E-mail ou senha inválidos.';
                        case 'permissao':
                            return 'Você não tem permissão para acessar este painel.';
                        case 'missing_company':
                            return 'Sua conta não tem vínculo com esta empresa.';
                        case 'missing_unit':
                            return 'Sua conta admin não tem unidade vinculada nesta empresa.';
                        case 'tenant_not_found':
                            return 'Não foi possível identificar a empresa pelo subdomínio.';
                        default:
                            return 'Ocorreu um erro ao fazer login. Tente novamente.';
                    }
                })(
                    (i.includes('localhost') || i.startsWith('127.0.0.1')) &&
                        'tenant_not_found' === h
                        ? void 0
                        : h
                );
            return (0, b.jsx)('div', {
                className: 'min-h-screen flex items-center justify-center px-4',
                children: (0, b.jsxs)('div', {
                    className:
                        'w-full max-w-lg rounded-2xl bg-background-secondary border border-border-primary shadow-lg px-8 py-10 space-y-8',
                    children: [
                        (0, b.jsxs)('header', {
                            className: 'space-y-2',
                            children: [
                                (0, b.jsx)('h1', {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Acesse sua conta',
                                }),
                                (0, b.jsxs)('p', {
                                    className:
                                        'text-paragraph-small text-content-tertiary',
                                    children: [
                                        'Painel disponível apenas para ',
                                        (0, b.jsx)('b', {
                                            children: 'Administradores',
                                        }),
                                        ' e',
                                        ' ',
                                        (0, b.jsx)('b', {
                                            children: 'Profissionais',
                                        }),
                                        '.',
                                    ],
                                }),
                            ],
                        }),
                        j &&
                            (0, b.jsx)('div', {
                                className:
                                    'text-paragraph-small text-destructive bg-destructive/10 border border-destructive/40 rounded-md px-3 py-2',
                                children: j,
                            }),
                        (0, b.jsxs)('form', {
                            action: c.loginPainel,
                            className: 'space-y-5',
                            children: [
                                (0, b.jsxs)('div', {
                                    className: 'space-y-2',
                                    children: [
                                        (0, b.jsx)(f.Label, {
                                            htmlFor: 'email',
                                            className:
                                                'text-label-small text-content-secondary',
                                            children: 'E-mail',
                                        }),
                                        (0, b.jsx)(e.Input, {
                                            id: 'email',
                                            name: 'email',
                                            type: 'email',
                                            required: !0,
                                            placeholder: 'Seu e-mail',
                                        }),
                                    ],
                                }),
                                (0, b.jsxs)('div', {
                                    className: 'space-y-2',
                                    children: [
                                        (0, b.jsx)(f.Label, {
                                            htmlFor: 'password',
                                            className:
                                                'text-label-small text-content-secondary',
                                            children: 'Senha',
                                        }),
                                        (0, b.jsx)(e.Input, {
                                            id: 'password',
                                            name: 'password',
                                            type: 'password',
                                            autoComplete: 'current-password',
                                            required: !0,
                                            placeholder: 'Sua senha',
                                        }),
                                    ],
                                }),
                                (0, b.jsx)(d.Button, {
                                    type: 'submit',
                                    className: 'w-full',
                                    variant: 'brand',
                                    children: 'Entrar',
                                }),
                            ],
                        }),
                    ],
                }),
            });
        }
        a.s(['default', () => h]);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__531a875e._.js.map
