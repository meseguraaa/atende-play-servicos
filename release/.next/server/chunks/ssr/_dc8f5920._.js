module.exports = [
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
    921923,
    (a) => {
        'use strict';
        var b = a.i(107439),
            c = a.i(559653),
            d = a.i(594723),
            e = a.i(752993),
            f = a.i(977200),
            g = a.i(765639),
            h = a.i(167139),
            i = a.i(612655),
            j = a.i(574917),
            k = a.i(929629),
            l = a.i(256480),
            m = a.i(859909),
            n = a.i(459454),
            o = a.i(516164),
            p = a.i(452662),
            q = a.i(584944),
            r = 'Dialog',
            [s, t] = (0, e.createContextScope)(r),
            [u, v] = s(r),
            w = (a) => {
                let {
                        __scopeDialog: c,
                        children: d,
                        open: e,
                        defaultOpen: h,
                        onOpenChange: i,
                        modal: j = !0,
                    } = a,
                    k = b.useRef(null),
                    l = b.useRef(null),
                    [m, n] = (0, g.useControllableState)({
                        prop: e,
                        defaultProp: h ?? !1,
                        onChange: i,
                        caller: r,
                    });
                return (0, q.jsx)(u, {
                    scope: c,
                    triggerRef: k,
                    contentRef: l,
                    contentId: (0, f.useId)(),
                    titleId: (0, f.useId)(),
                    descriptionId: (0, f.useId)(),
                    open: m,
                    onOpenChange: n,
                    onOpenToggle: b.useCallback(() => n((a) => !a), [n]),
                    modal: j,
                    children: d,
                });
            };
        w.displayName = r;
        var x = 'DialogTrigger',
            y = b.forwardRef((a, b) => {
                let { __scopeDialog: e, ...f } = a,
                    g = v(x, e),
                    h = (0, d.useComposedRefs)(b, g.triggerRef);
                return (0, q.jsx)(l.Primitive.button, {
                    type: 'button',
                    'aria-haspopup': 'dialog',
                    'aria-expanded': g.open,
                    'aria-controls': g.contentId,
                    'data-state': S(g.open),
                    ...f,
                    ref: h,
                    onClick: (0, c.composeEventHandlers)(
                        a.onClick,
                        g.onOpenToggle
                    ),
                });
            });
        y.displayName = x;
        var z = 'DialogPortal',
            [A, B] = s(z, { forceMount: void 0 }),
            C = (a) => {
                let {
                        __scopeDialog: c,
                        forceMount: d,
                        children: e,
                        container: f,
                    } = a,
                    g = v(z, c);
                return (0, q.jsx)(A, {
                    scope: c,
                    forceMount: d,
                    children: b.Children.map(e, (a) =>
                        (0, q.jsx)(k.Presence, {
                            present: d || g.open,
                            children: (0, q.jsx)(j.Portal, {
                                asChild: !0,
                                container: f,
                                children: a,
                            }),
                        })
                    ),
                });
            };
        C.displayName = z;
        var D = 'DialogOverlay',
            E = b.forwardRef((a, b) => {
                let c = B(D, a.__scopeDialog),
                    { forceMount: d = c.forceMount, ...e } = a,
                    f = v(D, a.__scopeDialog);
                return f.modal
                    ? (0, q.jsx)(k.Presence, {
                          present: d || f.open,
                          children: (0, q.jsx)(G, { ...e, ref: b }),
                      })
                    : null;
            });
        E.displayName = D;
        var F = (0, p.createSlot)('DialogOverlay.RemoveScroll'),
            G = b.forwardRef((a, b) => {
                let { __scopeDialog: c, ...d } = a,
                    e = v(D, c);
                return (0, q.jsx)(n.RemoveScroll, {
                    as: F,
                    allowPinchZoom: !0,
                    shards: [e.contentRef],
                    children: (0, q.jsx)(l.Primitive.div, {
                        'data-state': S(e.open),
                        ...d,
                        ref: b,
                        style: { pointerEvents: 'auto', ...d.style },
                    }),
                });
            }),
            H = 'DialogContent',
            I = b.forwardRef((a, b) => {
                let c = B(H, a.__scopeDialog),
                    { forceMount: d = c.forceMount, ...e } = a,
                    f = v(H, a.__scopeDialog);
                return (0, q.jsx)(k.Presence, {
                    present: d || f.open,
                    children: f.modal
                        ? (0, q.jsx)(J, { ...e, ref: b })
                        : (0, q.jsx)(K, { ...e, ref: b }),
                });
            });
        I.displayName = H;
        var J = b.forwardRef((a, e) => {
                let f = v(H, a.__scopeDialog),
                    g = b.useRef(null),
                    h = (0, d.useComposedRefs)(e, f.contentRef, g);
                return (
                    b.useEffect(() => {
                        let a = g.current;
                        if (a) return (0, o.hideOthers)(a);
                    }, []),
                    (0, q.jsx)(L, {
                        ...a,
                        ref: h,
                        trapFocus: f.open,
                        disableOutsidePointerEvents: !0,
                        onCloseAutoFocus: (0, c.composeEventHandlers)(
                            a.onCloseAutoFocus,
                            (a) => {
                                (a.preventDefault(),
                                    f.triggerRef.current?.focus());
                            }
                        ),
                        onPointerDownOutside: (0, c.composeEventHandlers)(
                            a.onPointerDownOutside,
                            (a) => {
                                let b = a.detail.originalEvent,
                                    c = 0 === b.button && !0 === b.ctrlKey;
                                (2 === b.button || c) && a.preventDefault();
                            }
                        ),
                        onFocusOutside: (0, c.composeEventHandlers)(
                            a.onFocusOutside,
                            (a) => a.preventDefault()
                        ),
                    })
                );
            }),
            K = b.forwardRef((a, c) => {
                let d = v(H, a.__scopeDialog),
                    e = b.useRef(!1),
                    f = b.useRef(!1);
                return (0, q.jsx)(L, {
                    ...a,
                    ref: c,
                    trapFocus: !1,
                    disableOutsidePointerEvents: !1,
                    onCloseAutoFocus: (b) => {
                        (a.onCloseAutoFocus?.(b),
                            b.defaultPrevented ||
                                (e.current || d.triggerRef.current?.focus(),
                                b.preventDefault()),
                            (e.current = !1),
                            (f.current = !1));
                    },
                    onInteractOutside: (b) => {
                        (a.onInteractOutside?.(b),
                            b.defaultPrevented ||
                                ((e.current = !0),
                                'pointerdown' === b.detail.originalEvent.type &&
                                    (f.current = !0)));
                        let c = b.target;
                        (d.triggerRef.current?.contains(c) &&
                            b.preventDefault(),
                            'focusin' === b.detail.originalEvent.type &&
                                f.current &&
                                b.preventDefault());
                    },
                });
            }),
            L = b.forwardRef((a, c) => {
                let {
                        __scopeDialog: e,
                        trapFocus: f,
                        onOpenAutoFocus: g,
                        onCloseAutoFocus: j,
                        ...k
                    } = a,
                    l = v(H, e),
                    n = b.useRef(null),
                    o = (0, d.useComposedRefs)(c, n);
                return (
                    (0, m.useFocusGuards)(),
                    (0, q.jsxs)(q.Fragment, {
                        children: [
                            (0, q.jsx)(i.FocusScope, {
                                asChild: !0,
                                loop: !0,
                                trapped: f,
                                onMountAutoFocus: g,
                                onUnmountAutoFocus: j,
                                children: (0, q.jsx)(h.DismissableLayer, {
                                    role: 'dialog',
                                    id: l.contentId,
                                    'aria-describedby': l.descriptionId,
                                    'aria-labelledby': l.titleId,
                                    'data-state': S(l.open),
                                    ...k,
                                    ref: o,
                                    onDismiss: () => l.onOpenChange(!1),
                                }),
                            }),
                            (0, q.jsxs)(q.Fragment, {
                                children: [
                                    (0, q.jsx)(W, { titleId: l.titleId }),
                                    (0, q.jsx)(X, {
                                        contentRef: n,
                                        descriptionId: l.descriptionId,
                                    }),
                                ],
                            }),
                        ],
                    })
                );
            }),
            M = 'DialogTitle',
            N = b.forwardRef((a, b) => {
                let { __scopeDialog: c, ...d } = a,
                    e = v(M, c);
                return (0, q.jsx)(l.Primitive.h2, {
                    id: e.titleId,
                    ...d,
                    ref: b,
                });
            });
        N.displayName = M;
        var O = 'DialogDescription',
            P = b.forwardRef((a, b) => {
                let { __scopeDialog: c, ...d } = a,
                    e = v(O, c);
                return (0, q.jsx)(l.Primitive.p, {
                    id: e.descriptionId,
                    ...d,
                    ref: b,
                });
            });
        P.displayName = O;
        var Q = 'DialogClose',
            R = b.forwardRef((a, b) => {
                let { __scopeDialog: d, ...e } = a,
                    f = v(Q, d);
                return (0, q.jsx)(l.Primitive.button, {
                    type: 'button',
                    ...e,
                    ref: b,
                    onClick: (0, c.composeEventHandlers)(a.onClick, () =>
                        f.onOpenChange(!1)
                    ),
                });
            });
        function S(a) {
            return a ? 'open' : 'closed';
        }
        R.displayName = Q;
        var T = 'DialogTitleWarning',
            [U, V] = (0, e.createContext)(T, {
                contentName: H,
                titleName: M,
                docsSlug: 'dialog',
            }),
            W = ({ titleId: a }) => {
                let c = V(T),
                    d = `\`${c.contentName}\` requires a \`${c.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${c.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${c.docsSlug}`;
                return (
                    b.useEffect(() => {
                        a && (document.getElementById(a) || console.error(d));
                    }, [d, a]),
                    null
                );
            },
            X = ({ contentRef: a, descriptionId: c }) => {
                let d = V('DialogDescriptionWarning'),
                    e = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${d.contentName}}.`;
                return (
                    b.useEffect(() => {
                        let b = a.current?.getAttribute('aria-describedby');
                        c &&
                            b &&
                            (document.getElementById(c) || console.warn(e));
                    }, [e, a, c]),
                    null
                );
            };
        a.s([
            'Close',
            () => R,
            'Content',
            () => I,
            'Description',
            () => P,
            'Overlay',
            () => E,
            'Portal',
            () => C,
            'Root',
            () => w,
            'Title',
            () => N,
            'Trigger',
            () => y,
            'WarningProvider',
            () => U,
            'createDialogScope',
            () => t,
        ]);
    },
    814574,
    984927,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(921923);
        let d = (0, a.i(203431).default)('x', [
            ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
            ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
        ]);
        a.s(['default', () => d], 984927);
        var e = a.i(142261),
            f = a.i(368114);
        function g({ ...a }) {
            return (0, b.jsx)(c.Root, { 'data-slot': 'dialog', ...a });
        }
        function h({ ...a }) {
            return (0, b.jsx)(c.Trigger, {
                'data-slot': 'dialog-trigger',
                ...a,
            });
        }
        function i({ ...a }) {
            return (0, b.jsx)(c.Portal, { 'data-slot': 'dialog-portal', ...a });
        }
        let j = (0, e.cva)(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50',
            {
                variants: {
                    variant: {
                        default: 'bg-black/50',
                        blurred: 'bg-black/40 backdrop-blur-[2px]',
                        dark: 'bg-black/60',
                        light: 'bg-black/30',
                    },
                },
                defaultVariants: { variant: 'default' },
            }
        );
        function k({ className: a, variant: d, ...e }) {
            return (0, b.jsx)(c.Overlay, {
                'data-slot': 'dialog-overlay',
                className: (0, f.cn)(j({ variant: d }), a),
                ...e,
            });
        }
        let l = (0, e.cva)(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg duration-200',
            {
                variants: {
                    variant: {
                        default:
                            'bg-background border rounded-lg max-w-[calc(100%-2rem)] sm:max-w-lg',
                        appointment:
                            'bg-background-tertiary border-none rounded-lg max-w-[calc(100%-2rem)] sm:max-w-[477px] max-h-[90vh] overflow-y-auto',
                        large: 'bg-background border rounded-lg max-w-[calc(100%-2rem)] sm:max-w-2xl',
                        fullscreen:
                            'bg-background border rounded-lg max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] sm:max-w-4xl sm:max-h-[90vh] overflow-y-auto',
                    },
                },
                defaultVariants: { variant: 'default' },
            }
        );
        function m({
            className: a,
            children: e,
            showCloseButton: g = !0,
            variant: h,
            overlayVariant: j,
            ...m
        }) {
            return (0, b.jsxs)(i, {
                'data-slot': 'dialog-portal',
                children: [
                    (0, b.jsx)(k, { variant: j }),
                    (0, b.jsxs)(c.Content, {
                        'data-slot': 'dialog-content',
                        className: (0, f.cn)(l({ variant: h }), a),
                        ...m,
                        children: [
                            e,
                            g &&
                                (0, b.jsxs)(c.Close, {
                                    'data-slot': 'dialog-close',
                                    className:
                                        "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                                    children: [
                                        (0, b.jsx)(d, {}),
                                        (0, b.jsx)('span', {
                                            className: 'sr-only',
                                            children: 'Close',
                                        }),
                                    ],
                                }),
                        ],
                    }),
                ],
            });
        }
        let n = (0, e.cva)('flex flex-col gap-2', {
            variants: {
                align: {
                    left: 'text-left',
                    center: 'text-center sm:text-left',
                    right: 'text-right',
                },
            },
            defaultVariants: { align: 'center' },
        });
        function o({ className: a, align: c, ...d }) {
            return (0, b.jsx)('div', {
                'data-slot': 'dialog-header',
                className: (0, f.cn)(n({ align: c }), a),
                ...d,
            });
        }
        function p({ className: a, ...c }) {
            return (0, b.jsx)('div', {
                'data-slot': 'dialog-footer',
                className: (0, f.cn)(
                    'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                    a
                ),
                ...c,
            });
        }
        let q = (0, e.cva)('leading-none font-semibold', {
            variants: {
                size: {
                    sm: 'text-base',
                    default: 'text-lg',
                    lg: 'text-xl',
                    xl: 'text-2xl',
                    modal: 'text-title-modal text-content-primary',
                },
            },
            defaultVariants: { size: 'default' },
        });
        function r({ className: a, size: d, ...e }) {
            return (0, b.jsx)(c.Title, {
                'data-slot': 'dialog-title',
                className: (0, f.cn)(q({ size: d }), a),
                ...e,
            });
        }
        let s = (0, e.cva)('text-muted-foreground', {
            variants: {
                size: {
                    sm: 'text-xs',
                    default: 'text-sm',
                    lg: 'text-base',
                    modal: 'text-paragraph-medium text-content-secondary',
                },
            },
            defaultVariants: { size: 'default' },
        });
        function t({ className: a, size: d, ...e }) {
            return (0, b.jsx)(c.Description, {
                'data-slot': 'dialog-description',
                className: (0, f.cn)(s({ size: d }), a),
                ...e,
            });
        }
        a.s(
            [
                'Dialog',
                () => g,
                'DialogContent',
                () => m,
                'DialogDescription',
                () => t,
                'DialogFooter',
                () => p,
                'DialogHeader',
                () => o,
                'DialogTitle',
                () => r,
                'DialogTrigger',
                () => h,
            ],
            814574
        );
    },
];

//# sourceMappingURL=_dc8f5920._.js.map
