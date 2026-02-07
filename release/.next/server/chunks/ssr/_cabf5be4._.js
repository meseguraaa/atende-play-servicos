module.exports = [
    808512,
    (a) => {
        'use strict';
        var b = a.i(727836);
        a.s(['ChevronDownIcon', () => b.default]);
    },
    413813,
    (a) => {
        'use strict';
        var b = a.i(107439),
            c = a.i(256480),
            d = a.i(584944),
            e = Object.freeze({
                position: 'absolute',
                border: 0,
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                wordWrap: 'normal',
            }),
            f = b.forwardRef((a, b) =>
                (0, d.jsx)(c.Primitive.span, {
                    ...a,
                    ref: b,
                    style: { ...e, ...a.style },
                })
            );
        ((f.displayName = 'VisuallyHidden'),
            a.s(['Root', () => f, 'VISUALLY_HIDDEN_STYLES', () => e]));
    },
    594723,
    (a) => {
        'use strict';
        var b = a.i(107439);
        function c(a, b) {
            if ('function' == typeof a) return a(b);
            null != a && (a.current = b);
        }
        function d(...a) {
            return (b) => {
                let d = !1,
                    e = a.map((a) => {
                        let e = c(a, b);
                        return (d || 'function' != typeof e || (d = !0), e);
                    });
                if (d)
                    return () => {
                        for (let b = 0; b < e.length; b++) {
                            let d = e[b];
                            'function' == typeof d ? d() : c(a[b], null);
                        }
                    };
            };
        }
        function e(...a) {
            return b.useCallback(d(...a), a);
        }
        a.s(['composeRefs', () => d, 'useComposedRefs', () => e]);
    },
    315057,
    (a) => {
        'use strict';
        var b = a.i(107439),
            c = a.i(594723),
            d = a.i(584944),
            e = Symbol.for('react.lazy'),
            f = b[' use '.trim().toString()];
        function g(a) {
            var b;
            return (
                null != a &&
                'object' == typeof a &&
                '$$typeof' in a &&
                a.$$typeof === e &&
                '_payload' in a &&
                'object' == typeof (b = a._payload) &&
                null !== b &&
                'then' in b
            );
        }
        function h(a) {
            var e;
            let h,
                i =
                    ((e = a),
                    ((h = b.forwardRef((a, d) => {
                        let { children: e, ...h } = a;
                        if (
                            (g(e) &&
                                'function' == typeof f &&
                                (e = f(e._payload)),
                            b.isValidElement(e))
                        ) {
                            var i;
                            let a,
                                f,
                                g =
                                    ((i = e),
                                    (f =
                                        (a = Object.getOwnPropertyDescriptor(
                                            i.props,
                                            'ref'
                                        )?.get) &&
                                        'isReactWarning' in a &&
                                        a.isReactWarning)
                                        ? i.ref
                                        : (f =
                                                (a =
                                                    Object.getOwnPropertyDescriptor(
                                                        i,
                                                        'ref'
                                                    )?.get) &&
                                                'isReactWarning' in a &&
                                                a.isReactWarning)
                                          ? i.props.ref
                                          : i.props.ref || i.ref),
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
                                })(h, e.props);
                            return (
                                e.type !== b.Fragment &&
                                    (j.ref = d ? (0, c.composeRefs)(d, g) : g),
                                b.cloneElement(e, j)
                            );
                        }
                        return b.Children.count(e) > 1
                            ? b.Children.only(null)
                            : null;
                    })).displayName = `${e}.SlotClone`),
                    h),
                j = b.forwardRef((a, c) => {
                    let { children: e, ...h } = a;
                    g(e) && 'function' == typeof f && (e = f(e._payload));
                    let j = b.Children.toArray(e),
                        l = j.find(k);
                    if (l) {
                        let a = l.props.children,
                            e = j.map((c) =>
                                c !== l
                                    ? c
                                    : b.Children.count(a) > 1
                                      ? b.Children.only(null)
                                      : b.isValidElement(a)
                                        ? a.props.children
                                        : null
                            );
                        return (0, d.jsx)(i, {
                            ...h,
                            ref: c,
                            children: b.isValidElement(a)
                                ? b.cloneElement(a, void 0, e)
                                : null,
                        });
                    }
                    return (0, d.jsx)(i, { ...h, ref: c, children: e });
                });
            return ((j.displayName = `${a}.Slot`), j);
        }
        var i = h('Slot'),
            j = Symbol('radix.slottable');
        function k(a) {
            return (
                b.isValidElement(a) &&
                'function' == typeof a.type &&
                '__radixId' in a.type &&
                a.type.__radixId === j
            );
        }
        a.s(['Slot', () => i, 'createSlot', () => h]);
    },
    699570,
    142261,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(315057),
            d = a.i(239337);
        let e = (a) => ('boolean' == typeof a ? `${a}` : 0 === a ? '0' : a),
            f = d.clsx,
            g = (a, b) => (c) => {
                var d;
                if ((null == b ? void 0 : b.variants) == null)
                    return f(
                        a,
                        null == c ? void 0 : c.class,
                        null == c ? void 0 : c.className
                    );
                let { variants: g, defaultVariants: h } = b,
                    i = Object.keys(g).map((a) => {
                        let b = null == c ? void 0 : c[a],
                            d = null == h ? void 0 : h[a];
                        if (null === b) return null;
                        let f = e(b) || e(d);
                        return g[a][f];
                    }),
                    j =
                        c &&
                        Object.entries(c).reduce((a, b) => {
                            let [c, d] = b;
                            return (void 0 === d || (a[c] = d), a);
                        }, {});
                return f(
                    a,
                    i,
                    null == b || null == (d = b.compoundVariants)
                        ? void 0
                        : d.reduce((a, b) => {
                              let { class: c, className: d, ...e } = b;
                              return Object.entries(e).every((a) => {
                                  let [b, c] = a;
                                  return Array.isArray(c)
                                      ? c.includes({ ...h, ...j }[b])
                                      : { ...h, ...j }[b] === c;
                              })
                                  ? [...a, c, d]
                                  : a;
                          }, []),
                    null == c ? void 0 : c.class,
                    null == c ? void 0 : c.className
                );
            };
        a.s(['cva', 0, g], 142261);
        var h = a.i(368114);
        let i = g(
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
        function j({
            className: a,
            variant: d,
            size: e,
            asChild: f = !1,
            ...g
        }) {
            let j = f ? c.Slot : 'button';
            return (0, b.jsx)(j, {
                'data-slot': 'button',
                className: (0, h.cn)(i({ variant: d, size: e, className: a })),
                ...g,
            });
        }
        a.s(['Button', () => j, 'buttonVariants', () => i], 699570);
    },
    929629,
    (a) => {
        'use strict';
        var b = a.i(107439),
            c = a.i(594723),
            d = a.i(457462),
            e = (a) => {
                var e;
                let g,
                    h,
                    { present: i, children: j } = a,
                    k = (function (a) {
                        var c, e;
                        let [g, h] = b.useState(),
                            i = b.useRef(null),
                            j = b.useRef(a),
                            k = b.useRef('none'),
                            [l, m] =
                                ((c = a ? 'mounted' : 'unmounted'),
                                (e = {
                                    mounted: {
                                        UNMOUNT: 'unmounted',
                                        ANIMATION_OUT: 'unmountSuspended',
                                    },
                                    unmountSuspended: {
                                        MOUNT: 'mounted',
                                        ANIMATION_END: 'unmounted',
                                    },
                                    unmounted: { MOUNT: 'mounted' },
                                }),
                                b.useReducer((a, b) => e[a][b] ?? a, c));
                        return (
                            b.useEffect(() => {
                                let a = f(i.current);
                                k.current = 'mounted' === l ? a : 'none';
                            }, [l]),
                            (0, d.useLayoutEffect)(() => {
                                let b = i.current,
                                    c = j.current;
                                if (c !== a) {
                                    let d = k.current,
                                        e = f(b);
                                    (a
                                        ? m('MOUNT')
                                        : 'none' === e || b?.display === 'none'
                                          ? m('UNMOUNT')
                                          : c && d !== e
                                            ? m('ANIMATION_OUT')
                                            : m('UNMOUNT'),
                                        (j.current = a));
                                }
                            }, [a, m]),
                            (0, d.useLayoutEffect)(() => {
                                if (g) {
                                    let a,
                                        b =
                                            g.ownerDocument.defaultView ??
                                            window,
                                        c = (c) => {
                                            let d = f(i.current).includes(
                                                CSS.escape(c.animationName)
                                            );
                                            if (
                                                c.target === g &&
                                                d &&
                                                (m('ANIMATION_END'), !j.current)
                                            ) {
                                                let c =
                                                    g.style.animationFillMode;
                                                ((g.style.animationFillMode =
                                                    'forwards'),
                                                    (a = b.setTimeout(() => {
                                                        'forwards' ===
                                                            g.style
                                                                .animationFillMode &&
                                                            (g.style.animationFillMode =
                                                                c);
                                                    })));
                                            }
                                        },
                                        d = (a) => {
                                            a.target === g &&
                                                (k.current = f(i.current));
                                        };
                                    return (
                                        g.addEventListener('animationstart', d),
                                        g.addEventListener(
                                            'animationcancel',
                                            c
                                        ),
                                        g.addEventListener('animationend', c),
                                        () => {
                                            (b.clearTimeout(a),
                                                g.removeEventListener(
                                                    'animationstart',
                                                    d
                                                ),
                                                g.removeEventListener(
                                                    'animationcancel',
                                                    c
                                                ),
                                                g.removeEventListener(
                                                    'animationend',
                                                    c
                                                ));
                                        }
                                    );
                                }
                                m('ANIMATION_END');
                            }, [g, m]),
                            {
                                isPresent: [
                                    'mounted',
                                    'unmountSuspended',
                                ].includes(l),
                                ref: b.useCallback((a) => {
                                    ((i.current = a
                                        ? getComputedStyle(a)
                                        : null),
                                        h(a));
                                }, []),
                            }
                        );
                    })(i),
                    l =
                        'function' == typeof j
                            ? j({ present: k.isPresent })
                            : b.Children.only(j),
                    m = (0, c.useComposedRefs)(
                        k.ref,
                        ((e = l),
                        (h =
                            (g = Object.getOwnPropertyDescriptor(
                                e.props,
                                'ref'
                            )?.get) &&
                            'isReactWarning' in g &&
                            g.isReactWarning)
                            ? e.ref
                            : (h =
                                    (g = Object.getOwnPropertyDescriptor(
                                        e,
                                        'ref'
                                    )?.get) &&
                                    'isReactWarning' in g &&
                                    g.isReactWarning)
                              ? e.props.ref
                              : e.props.ref || e.ref)
                    );
                return 'function' == typeof j || k.isPresent
                    ? b.cloneElement(l, { ref: m })
                    : null;
            };
        function f(a) {
            return a?.animationName || 'none';
        }
        ((e.displayName = 'Presence'), a.s(['Presence', () => e]));
    },
    556557,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(587969),
            d = a.i(766153),
            e = a.i(779184),
            f = a.i(337850),
            g = a.i(259849),
            h = a.i(107439),
            i = a.i(665791),
            j = a.i(912288),
            k = a.i(773608),
            l = a.i(564092),
            m = a.i(499638),
            n = a.i(699570),
            o = a.i(320146),
            p = a.i(599209),
            q = a.i(335430),
            r = a.i(785259);
        let s = ({ tooltipText: a, onClick: c, children: d }) =>
            (0, b.jsx)(q.TooltipProvider, {
                children: (0, b.jsxs)(r.Tooltip, {
                    children: [
                        (0, b.jsx)(r.TooltipTrigger, {
                            asChild: !0,
                            children: (0, b.jsx)(n.Button, {
                                variant: 'outline',
                                size: 'icon',
                                onClick: c,
                                className:
                                    'h-12 w-9 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                children: d,
                            }),
                        }),
                        (0, b.jsx)(r.TooltipContent, {
                            className: 'bg-background-tertiary',
                            children: (0, b.jsx)('p', { children: a }),
                        }),
                    ],
                }),
            });
        a.s(
            [
                'DatePicker',
                0,
                ({ mode: a = 'date', hideNavigation: q }) => {
                    let r = (0, g.useRouter)(),
                        t = (0, g.usePathname)(),
                        u = (0, g.useSearchParams)(),
                        v = 'month' === a ? 'month' : 'date',
                        w = u.get(v),
                        x = (0, h.useCallback)(() => {
                            if ('month' === a) {
                                if (!w) return new Date();
                                let [a, b] = w.split('-').map(Number),
                                    c = new Date(a, (b ?? 1) - 1, 1);
                                return (0, l.isValid)(c) ? c : new Date();
                            }
                            if (!w) return new Date();
                            let [b, c, d] = w.split('-').map(Number),
                                e = new Date(b, (c ?? 1) - 1, d ?? 1);
                            return (0, l.isValid)(e) ? e : new Date();
                        }, [a, w]),
                        [y, z] = (0, h.useState)(() => x()),
                        [A, B] = (0, h.useState)(!1),
                        C = (0, h.useMemo)(
                            () =>
                                y
                                    ? 'month' === a
                                        ? (0, k.format)(y, 'MM/yyyy', {
                                              locale: m.ptBR,
                                          })
                                        : (0, k.format)(y, 'dd/MM/yyyy', {
                                              locale: m.ptBR,
                                          })
                                    : 'Selecione uma data',
                            [y, a]
                        ),
                        D = (b) => {
                            let c = new URLSearchParams(u.toString());
                            if (
                                ('month' === a
                                    ? c.delete('date')
                                    : c.delete('month'),
                                'month' === a)
                            ) {
                                var d;
                                let a = new Date(
                                    b.getFullYear(),
                                    b.getMonth(),
                                    1
                                );
                                c.set(
                                    'month',
                                    ((d = a),
                                    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
                                );
                            } else
                                c.set('date', (0, k.format)(b, 'yyyy-MM-dd'));
                            let e = c.toString();
                            r.push(e ? `${t}?${e}` : t);
                        },
                        E = (b) => {
                            let c = y ?? new Date(),
                                d =
                                    'month' === a
                                        ? (0, j.addMonths)(c, b)
                                        : (0, i.addDays)(c, b),
                                e =
                                    'month' === a
                                        ? new Date(
                                              d.getFullYear(),
                                              d.getMonth(),
                                              1
                                          )
                                        : d;
                            (z(e), D(e));
                        };
                    (0, h.useEffect)(() => {
                        z(x());
                    }, [x]);
                    let F = 'month' === a ? 'Mês anterior' : 'Dia anterior',
                        G = 'month' === a ? 'Próximo mês' : 'Próximo dia';
                    return (0, b.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            !q &&
                                (0, b.jsx)(s, {
                                    tooltipText: F,
                                    onClick: () => E(-1),
                                    children: (0, b.jsx)(e.ChevronLeft, {
                                        className: 'h-4 w-4',
                                    }),
                                }),
                            (0, b.jsxs)(p.Popover, {
                                open: A,
                                onOpenChange: B,
                                children: [
                                    (0, b.jsx)(p.PopoverTrigger, {
                                        asChild: !0,
                                        children: (0, b.jsxs)(n.Button, {
                                            variant: 'outline',
                                            className:
                                                'min-w-[180px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'flex items-center gap-2',
                                                    children: [
                                                        (0, b.jsx)(c.Calendar, {
                                                            className:
                                                                'h-4 w-4 text-content-brand',
                                                        }),
                                                        (0, b.jsx)('span', {
                                                            children: C,
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)(d.ChevronDown, {
                                                    className:
                                                        'h-4 w-4 opacity-50',
                                                }),
                                            ],
                                        }),
                                    }),
                                    (0, b.jsx)(p.PopoverContent, {
                                        className: 'w-auto p-0',
                                        children: (0, b.jsx)(o.Calendar, {
                                            mode: 'single',
                                            selected: y,
                                            onSelect: (b) => {
                                                if (b) {
                                                    let c =
                                                        'month' === a
                                                            ? new Date(
                                                                  b.getFullYear(),
                                                                  b.getMonth(),
                                                                  1
                                                              )
                                                            : b;
                                                    (z(c), D(c));
                                                }
                                                B(!1);
                                            },
                                            autoFocus: !0,
                                            locale: m.ptBR,
                                        }),
                                    }),
                                ],
                            }),
                            !q &&
                                (0, b.jsx)(s, {
                                    tooltipText: G,
                                    onClick: () => E(1),
                                    children: (0, b.jsx)(f.ChevronRight, {
                                        className: 'h-4 w-4',
                                    }),
                                }),
                        ],
                    });
                },
            ],
            556557
        );
    },
];

//# sourceMappingURL=_cabf5be4._.js.map
