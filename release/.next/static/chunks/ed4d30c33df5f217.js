(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    136764,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('clock', [
            ['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
            ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
        ]);
        e.s(['Clock', () => t], 136764);
    },
    793479,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(975157);
        function a({ className: e, type: a, ...n }) {
            return (0, t.jsx)('input', {
                type: a,
                'data-slot': 'input',
                className: (0, r.cn)(
                    'flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50',
                    'hover:border-border-secondary',
                    'focus:border-border-brand focus-visible:border-border-brand',
                    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
                    e
                ),
                ...n,
            });
        }
        e.s(['Input', () => a]);
    },
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
        function o(e) {
            var n;
            let o,
                l =
                    ((n = e),
                    ((o = t.forwardRef((e, a) => {
                        let { children: n, ...o } = e;
                        if (
                            (i(n) &&
                                'function' == typeof s &&
                                (n = s(n._payload)),
                            t.isValidElement(n))
                        ) {
                            var l;
                            let e,
                                s,
                                i =
                                    ((l = n),
                                    (s =
                                        (e = Object.getOwnPropertyDescriptor(
                                            l.props,
                                            'ref'
                                        )?.get) &&
                                        'isReactWarning' in e &&
                                        e.isReactWarning)
                                        ? l.ref
                                        : (s =
                                                (e =
                                                    Object.getOwnPropertyDescriptor(
                                                        l,
                                                        'ref'
                                                    )?.get) &&
                                                'isReactWarning' in e &&
                                                e.isReactWarning)
                                          ? l.props.ref
                                          : l.props.ref || l.ref),
                                c = (function (e, t) {
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
                                })(o, n.props);
                            return (
                                n.type !== t.Fragment &&
                                    (c.ref = a ? (0, r.composeRefs)(a, i) : i),
                                t.cloneElement(n, c)
                            );
                        }
                        return t.Children.count(n) > 1
                            ? t.Children.only(null)
                            : null;
                    })).displayName = `${n}.SlotClone`),
                    o),
                c = t.forwardRef((e, r) => {
                    let { children: n, ...o } = e;
                    i(n) && 'function' == typeof s && (n = s(n._payload));
                    let c = t.Children.toArray(n),
                        u = c.find(d);
                    if (u) {
                        let e = u.props.children,
                            n = c.map((r) =>
                                r !== u
                                    ? r
                                    : t.Children.count(e) > 1
                                      ? t.Children.only(null)
                                      : t.isValidElement(e)
                                        ? e.props.children
                                        : null
                            );
                        return (0, a.jsx)(l, {
                            ...o,
                            ref: r,
                            children: t.isValidElement(e)
                                ? t.cloneElement(e, void 0, n)
                                : null,
                        });
                    }
                    return (0, a.jsx)(l, { ...o, ref: r, children: n });
                });
            return ((c.displayName = `${e}.Slot`), c);
        }
        var l = o('Slot'),
            c = Symbol('radix.slottable');
        function d(e) {
            return (
                t.isValidElement(e) &&
                'function' == typeof e.type &&
                '__radixId' in e.type &&
                e.type.__radixId === c
            );
        }
        e.s(['Slot', () => l, 'createSlot', () => o]);
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
                let { variants: i, defaultVariants: o } = t,
                    l = Object.keys(i).map((e) => {
                        let t = null == r ? void 0 : r[e],
                            a = null == o ? void 0 : o[e];
                        if (null === t) return null;
                        let s = n(t) || n(a);
                        return i[e][s];
                    }),
                    c =
                        r &&
                        Object.entries(r).reduce((e, t) => {
                            let [r, a] = t;
                            return (void 0 === a || (e[r] = a), e);
                        }, {});
                return s(
                    e,
                    l,
                    null == t || null == (a = t.compoundVariants)
                        ? void 0
                        : a.reduce((e, t) => {
                              let { class: r, className: a, ...n } = t;
                              return Object.entries(n).every((e) => {
                                  let [t, r] = e;
                                  return Array.isArray(r)
                                      ? r.includes({ ...o, ...c }[t])
                                      : { ...o, ...c }[t] === r;
                              })
                                  ? [...e, r, a]
                                  : e;
                          }, []),
                    null == r ? void 0 : r.class,
                    null == r ? void 0 : r.className
                );
            };
        e.s(['cva', 0, i], 294237);
        var o = e.i(975157);
        let l = i(
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
        function c({
            className: e,
            variant: a,
            size: n,
            asChild: s = !1,
            ...i
        }) {
            let c = s ? r.Slot : 'button';
            return (0, t.jsx)(c, {
                'data-slot': 'button',
                className: (0, o.cn)(l({ variant: a, size: n, className: e })),
                ...i,
            });
        }
        e.s(['Button', () => c, 'buttonVariants', () => l], 519455);
    },
    861181,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(672687),
            a = e.i(150076),
            n = (e) => {
                var n;
                let i,
                    o,
                    { present: l, children: c } = e,
                    d = (function (e) {
                        var r, n;
                        let [i, o] = t.useState(),
                            l = t.useRef(null),
                            c = t.useRef(e),
                            d = t.useRef('none'),
                            [u, m] =
                                ((r = e ? 'mounted' : 'unmounted'),
                                (n = {
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
                                t.useReducer((e, t) => n[e][t] ?? e, r));
                        return (
                            t.useEffect(() => {
                                let e = s(l.current);
                                d.current = 'mounted' === u ? e : 'none';
                            }, [u]),
                            (0, a.useLayoutEffect)(() => {
                                let t = l.current,
                                    r = c.current;
                                if (r !== e) {
                                    let a = d.current,
                                        n = s(t);
                                    (e
                                        ? m('MOUNT')
                                        : 'none' === n || t?.display === 'none'
                                          ? m('UNMOUNT')
                                          : r && a !== n
                                            ? m('ANIMATION_OUT')
                                            : m('UNMOUNT'),
                                        (c.current = e));
                                }
                            }, [e, m]),
                            (0, a.useLayoutEffect)(() => {
                                if (i) {
                                    let e,
                                        t =
                                            i.ownerDocument.defaultView ??
                                            window,
                                        r = (r) => {
                                            let a = s(l.current).includes(
                                                CSS.escape(r.animationName)
                                            );
                                            if (
                                                r.target === i &&
                                                a &&
                                                (m('ANIMATION_END'), !c.current)
                                            ) {
                                                let r =
                                                    i.style.animationFillMode;
                                                ((i.style.animationFillMode =
                                                    'forwards'),
                                                    (e = t.setTimeout(() => {
                                                        'forwards' ===
                                                            i.style
                                                                .animationFillMode &&
                                                            (i.style.animationFillMode =
                                                                r);
                                                    })));
                                            }
                                        },
                                        a = (e) => {
                                            e.target === i &&
                                                (d.current = s(l.current));
                                        };
                                    return (
                                        i.addEventListener('animationstart', a),
                                        i.addEventListener(
                                            'animationcancel',
                                            r
                                        ),
                                        i.addEventListener('animationend', r),
                                        () => {
                                            (t.clearTimeout(e),
                                                i.removeEventListener(
                                                    'animationstart',
                                                    a
                                                ),
                                                i.removeEventListener(
                                                    'animationcancel',
                                                    r
                                                ),
                                                i.removeEventListener(
                                                    'animationend',
                                                    r
                                                ));
                                        }
                                    );
                                }
                                m('ANIMATION_END');
                            }, [i, m]),
                            {
                                isPresent: [
                                    'mounted',
                                    'unmountSuspended',
                                ].includes(u),
                                ref: t.useCallback((e) => {
                                    ((l.current = e
                                        ? getComputedStyle(e)
                                        : null),
                                        o(e));
                                }, []),
                            }
                        );
                    })(l),
                    u =
                        'function' == typeof c
                            ? c({ present: d.isPresent })
                            : t.Children.only(c),
                    m = (0, r.useComposedRefs)(
                        d.ref,
                        ((n = u),
                        (o =
                            (i = Object.getOwnPropertyDescriptor(
                                n.props,
                                'ref'
                            )?.get) &&
                            'isReactWarning' in i &&
                            i.isReactWarning)
                            ? n.ref
                            : (o =
                                    (i = Object.getOwnPropertyDescriptor(
                                        n,
                                        'ref'
                                    )?.get) &&
                                    'isReactWarning' in i &&
                                    i.isReactWarning)
                              ? n.props.ref
                              : n.props.ref || n.ref)
                    );
                return 'function' == typeof c || d.isPresent
                    ? t.cloneElement(u, { ref: m })
                    : null;
            };
        function s(e) {
            return e?.animationName || 'none';
        }
        ((n.displayName = 'Presence'), e.s(['Presence', () => n]));
    },
    342413,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(291967),
            a = e.i(672687),
            n = e.i(784711),
            s = e.i(910529),
            i = e.i(695145),
            o = e.i(846357),
            l = e.i(60126),
            c = e.i(546354),
            d = e.i(861181),
            u = e.i(403078),
            m = e.i(774621),
            p = e.i(595357),
            f = e.i(73772),
            x = e.i(655875),
            b = e.i(565750),
            g = 'Dialog',
            [v, h] = (0, n.createContextScope)(g),
            [y, N] = v(g),
            j = (e) => {
                let {
                        __scopeDialog: r,
                        children: a,
                        open: n,
                        defaultOpen: o,
                        onOpenChange: l,
                        modal: c = !0,
                    } = e,
                    d = t.useRef(null),
                    u = t.useRef(null),
                    [m, p] = (0, i.useControllableState)({
                        prop: n,
                        defaultProp: o ?? !1,
                        onChange: l,
                        caller: g,
                    });
                return (0, b.jsx)(y, {
                    scope: r,
                    triggerRef: d,
                    contentRef: u,
                    contentId: (0, s.useId)(),
                    titleId: (0, s.useId)(),
                    descriptionId: (0, s.useId)(),
                    open: m,
                    onOpenChange: p,
                    onOpenToggle: t.useCallback(() => p((e) => !e), [p]),
                    modal: c,
                    children: a,
                });
            };
        j.displayName = g;
        var S = 'DialogTrigger',
            k = t.forwardRef((e, t) => {
                let { __scopeDialog: n, ...s } = e,
                    i = N(S, n),
                    o = (0, a.useComposedRefs)(t, i.triggerRef);
                return (0, b.jsx)(u.Primitive.button, {
                    type: 'button',
                    'aria-haspopup': 'dialog',
                    'aria-expanded': i.open,
                    'aria-controls': i.contentId,
                    'data-state': U(i.open),
                    ...s,
                    ref: o,
                    onClick: (0, r.composeEventHandlers)(
                        e.onClick,
                        i.onOpenToggle
                    ),
                });
            });
        k.displayName = S;
        var w = 'DialogPortal',
            [P, C] = v(w, { forceMount: void 0 }),
            D = (e) => {
                let {
                        __scopeDialog: r,
                        forceMount: a,
                        children: n,
                        container: s,
                    } = e,
                    i = N(w, r);
                return (0, b.jsx)(P, {
                    scope: r,
                    forceMount: a,
                    children: t.Children.map(n, (e) =>
                        (0, b.jsx)(d.Presence, {
                            present: a || i.open,
                            children: (0, b.jsx)(c.Portal, {
                                asChild: !0,
                                container: s,
                                children: e,
                            }),
                        })
                    ),
                });
            };
        D.displayName = w;
        var F = 'DialogOverlay',
            I = t.forwardRef((e, t) => {
                let r = C(F, e.__scopeDialog),
                    { forceMount: a = r.forceMount, ...n } = e,
                    s = N(F, e.__scopeDialog);
                return s.modal
                    ? (0, b.jsx)(d.Presence, {
                          present: a || s.open,
                          children: (0, b.jsx)(M, { ...n, ref: t }),
                      })
                    : null;
            });
        I.displayName = F;
        var R = (0, x.createSlot)('DialogOverlay.RemoveScroll'),
            M = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...a } = e,
                    n = N(F, r);
                return (0, b.jsx)(p.RemoveScroll, {
                    as: R,
                    allowPinchZoom: !0,
                    shards: [n.contentRef],
                    children: (0, b.jsx)(u.Primitive.div, {
                        'data-state': U(n.open),
                        ...a,
                        ref: t,
                        style: { pointerEvents: 'auto', ...a.style },
                    }),
                });
            }),
            A = 'DialogContent',
            O = t.forwardRef((e, t) => {
                let r = C(A, e.__scopeDialog),
                    { forceMount: a = r.forceMount, ...n } = e,
                    s = N(A, e.__scopeDialog);
                return (0, b.jsx)(d.Presence, {
                    present: a || s.open,
                    children: s.modal
                        ? (0, b.jsx)(E, { ...n, ref: t })
                        : (0, b.jsx)(T, { ...n, ref: t }),
                });
            });
        O.displayName = A;
        var E = t.forwardRef((e, n) => {
                let s = N(A, e.__scopeDialog),
                    i = t.useRef(null),
                    o = (0, a.useComposedRefs)(n, s.contentRef, i);
                return (
                    t.useEffect(() => {
                        let e = i.current;
                        if (e) return (0, f.hideOthers)(e);
                    }, []),
                    (0, b.jsx)(L, {
                        ...e,
                        ref: o,
                        trapFocus: s.open,
                        disableOutsidePointerEvents: !0,
                        onCloseAutoFocus: (0, r.composeEventHandlers)(
                            e.onCloseAutoFocus,
                            (e) => {
                                (e.preventDefault(),
                                    s.triggerRef.current?.focus());
                            }
                        ),
                        onPointerDownOutside: (0, r.composeEventHandlers)(
                            e.onPointerDownOutside,
                            (e) => {
                                let t = e.detail.originalEvent,
                                    r = 0 === t.button && !0 === t.ctrlKey;
                                (2 === t.button || r) && e.preventDefault();
                            }
                        ),
                        onFocusOutside: (0, r.composeEventHandlers)(
                            e.onFocusOutside,
                            (e) => e.preventDefault()
                        ),
                    })
                );
            }),
            T = t.forwardRef((e, r) => {
                let a = N(A, e.__scopeDialog),
                    n = t.useRef(!1),
                    s = t.useRef(!1);
                return (0, b.jsx)(L, {
                    ...e,
                    ref: r,
                    trapFocus: !1,
                    disableOutsidePointerEvents: !1,
                    onCloseAutoFocus: (t) => {
                        (e.onCloseAutoFocus?.(t),
                            t.defaultPrevented ||
                                (n.current || a.triggerRef.current?.focus(),
                                t.preventDefault()),
                            (n.current = !1),
                            (s.current = !1));
                    },
                    onInteractOutside: (t) => {
                        (e.onInteractOutside?.(t),
                            t.defaultPrevented ||
                                ((n.current = !0),
                                'pointerdown' === t.detail.originalEvent.type &&
                                    (s.current = !0)));
                        let r = t.target;
                        (a.triggerRef.current?.contains(r) &&
                            t.preventDefault(),
                            'focusin' === t.detail.originalEvent.type &&
                                s.current &&
                                t.preventDefault());
                    },
                });
            }),
            L = t.forwardRef((e, r) => {
                let {
                        __scopeDialog: n,
                        trapFocus: s,
                        onOpenAutoFocus: i,
                        onCloseAutoFocus: c,
                        ...d
                    } = e,
                    u = N(A, n),
                    p = t.useRef(null),
                    f = (0, a.useComposedRefs)(r, p);
                return (
                    (0, m.useFocusGuards)(),
                    (0, b.jsxs)(b.Fragment, {
                        children: [
                            (0, b.jsx)(l.FocusScope, {
                                asChild: !0,
                                loop: !0,
                                trapped: s,
                                onMountAutoFocus: i,
                                onUnmountAutoFocus: c,
                                children: (0, b.jsx)(o.DismissableLayer, {
                                    role: 'dialog',
                                    id: u.contentId,
                                    'aria-describedby': u.descriptionId,
                                    'aria-labelledby': u.titleId,
                                    'data-state': U(u.open),
                                    ...d,
                                    ref: f,
                                    onDismiss: () => u.onOpenChange(!1),
                                }),
                            }),
                            (0, b.jsxs)(b.Fragment, {
                                children: [
                                    (0, b.jsx)(G, { titleId: u.titleId }),
                                    (0, b.jsx)(J, {
                                        contentRef: p,
                                        descriptionId: u.descriptionId,
                                    }),
                                ],
                            }),
                        ],
                    })
                );
            }),
            _ = 'DialogTitle',
            z = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...a } = e,
                    n = N(_, r);
                return (0, b.jsx)(u.Primitive.h2, {
                    id: n.titleId,
                    ...a,
                    ref: t,
                });
            });
        z.displayName = _;
        var H = 'DialogDescription',
            V = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...a } = e,
                    n = N(H, r);
                return (0, b.jsx)(u.Primitive.p, {
                    id: n.descriptionId,
                    ...a,
                    ref: t,
                });
            });
        V.displayName = H;
        var $ = 'DialogClose',
            B = t.forwardRef((e, t) => {
                let { __scopeDialog: a, ...n } = e,
                    s = N($, a);
                return (0, b.jsx)(u.Primitive.button, {
                    type: 'button',
                    ...n,
                    ref: t,
                    onClick: (0, r.composeEventHandlers)(e.onClick, () =>
                        s.onOpenChange(!1)
                    ),
                });
            });
        function U(e) {
            return e ? 'open' : 'closed';
        }
        B.displayName = $;
        var q = 'DialogTitleWarning',
            [W, Z] = (0, n.createContext)(q, {
                contentName: A,
                titleName: _,
                docsSlug: 'dialog',
            }),
            G = ({ titleId: e }) => {
                let r = Z(q),
                    a = `\`${r.contentName}\` requires a \`${r.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${r.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${r.docsSlug}`;
                return (
                    t.useEffect(() => {
                        e && (document.getElementById(e) || console.error(a));
                    }, [a, e]),
                    null
                );
            },
            J = ({ contentRef: e, descriptionId: r }) => {
                let a = Z('DialogDescriptionWarning'),
                    n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${a.contentName}}.`;
                return (
                    t.useEffect(() => {
                        let t = e.current?.getAttribute('aria-describedby');
                        r &&
                            t &&
                            (document.getElementById(r) || console.warn(n));
                    }, [n, e, r]),
                    null
                );
            };
        e.s([
            'Close',
            () => B,
            'Content',
            () => O,
            'Description',
            () => V,
            'Overlay',
            () => I,
            'Portal',
            () => D,
            'Root',
            () => j,
            'Title',
            () => z,
            'Trigger',
            () => k,
            'WarningProvider',
            () => W,
            'createDialogScope',
            () => h,
        ]);
    },
    776639,
    660214,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(342413);
        let a = (0, e.i(383206).default)('x', [
            ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
            ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
        ]);
        e.s(['default', () => a], 660214);
        var n = e.i(294237),
            s = e.i(975157);
        function i({ ...e }) {
            return (0, t.jsx)(r.Root, { 'data-slot': 'dialog', ...e });
        }
        function o({ ...e }) {
            return (0, t.jsx)(r.Trigger, {
                'data-slot': 'dialog-trigger',
                ...e,
            });
        }
        function l({ ...e }) {
            return (0, t.jsx)(r.Portal, { 'data-slot': 'dialog-portal', ...e });
        }
        let c = (0, n.cva)(
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
        function d({ className: e, variant: a, ...n }) {
            return (0, t.jsx)(r.Overlay, {
                'data-slot': 'dialog-overlay',
                className: (0, s.cn)(c({ variant: a }), e),
                ...n,
            });
        }
        let u = (0, n.cva)(
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
            className: e,
            children: n,
            showCloseButton: i = !0,
            variant: o,
            overlayVariant: c,
            ...m
        }) {
            return (0, t.jsxs)(l, {
                'data-slot': 'dialog-portal',
                children: [
                    (0, t.jsx)(d, { variant: c }),
                    (0, t.jsxs)(r.Content, {
                        'data-slot': 'dialog-content',
                        className: (0, s.cn)(u({ variant: o }), e),
                        ...m,
                        children: [
                            n,
                            i &&
                                (0, t.jsxs)(r.Close, {
                                    'data-slot': 'dialog-close',
                                    className:
                                        "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                                    children: [
                                        (0, t.jsx)(a, {}),
                                        (0, t.jsx)('span', {
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
        let p = (0, n.cva)('flex flex-col gap-2', {
            variants: {
                align: {
                    left: 'text-left',
                    center: 'text-center sm:text-left',
                    right: 'text-right',
                },
            },
            defaultVariants: { align: 'center' },
        });
        function f({ className: e, align: r, ...a }) {
            return (0, t.jsx)('div', {
                'data-slot': 'dialog-header',
                className: (0, s.cn)(p({ align: r }), e),
                ...a,
            });
        }
        function x({ className: e, ...r }) {
            return (0, t.jsx)('div', {
                'data-slot': 'dialog-footer',
                className: (0, s.cn)(
                    'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                    e
                ),
                ...r,
            });
        }
        let b = (0, n.cva)('leading-none font-semibold', {
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
        function g({ className: e, size: a, ...n }) {
            return (0, t.jsx)(r.Title, {
                'data-slot': 'dialog-title',
                className: (0, s.cn)(b({ size: a }), e),
                ...n,
            });
        }
        let v = (0, n.cva)('text-muted-foreground', {
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
        function h({ className: e, size: a, ...n }) {
            return (0, t.jsx)(r.Description, {
                'data-slot': 'dialog-description',
                className: (0, s.cn)(v({ size: a }), e),
                ...n,
            });
        }
        e.s(
            [
                'Dialog',
                () => i,
                'DialogContent',
                () => m,
                'DialogDescription',
                () => h,
                'DialogFooter',
                () => x,
                'DialogHeader',
                () => f,
                'DialogTitle',
                () => g,
                'DialogTrigger',
                () => o,
            ],
            776639
        );
    },
    641304,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('loader-circle', [
            ['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }],
        ]);
        e.s(['Loader2', () => t], 641304);
    },
    153745,
    760228,
    50675,
    868106,
    (e) => {
        'use strict';
        var t = e.i(383206);
        let r = (0, t.default)('badge-dollar-sign', [
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
        e.s(['BadgeDollarSign', () => r], 153745);
        let a = (0, t.default)('percent', [
            ['line', { x1: '19', x2: '5', y1: '5', y2: '19', key: '1x9vlm' }],
            ['circle', { cx: '6.5', cy: '6.5', r: '2.5', key: '4mh3h7' }],
            ['circle', { cx: '17.5', cy: '17.5', r: '2.5', key: '1mdrzq' }],
        ]);
        e.s(['Percent', () => a], 760228);
        let n = (0, t.default)('timer', [
            ['line', { x1: '10', x2: '14', y1: '2', y2: '2', key: '14vaq8' }],
            ['line', { x1: '12', x2: '15', y1: '14', y2: '11', key: '17fdiu' }],
            ['circle', { cx: '12', cy: '14', r: '8', key: '1e1u0o' }],
        ]);
        e.s(['Timer', () => n], 50675);
        let s = (0, t.default)('receipt', [
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
        e.s(['Receipt', () => s], 868106);
    },
    76644,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            a = e.i(245586),
            n = e.i(995403),
            s = e.i(519455),
            i = e.i(776639),
            o = e.i(793479),
            l = e.i(967489),
            c = e.i(975157),
            d = e.i(171312),
            u = e.i(153745),
            m = e.i(136764),
            p = e.i(760228),
            f = e.i(50675),
            x = e.i(868106),
            b = e.i(202724),
            g = e.i(641304),
            v = e.i(263942);
        function h(e) {
            if (null == e) return '';
            let t = Number(e);
            return Number.isFinite(t) ? String(t) : '';
        }
        function y(e) {
            if (null == e) return null;
            let t =
                'string' == typeof e
                    ? Number(e.replace(',', '.').trim())
                    : Number(e);
            return Number.isFinite(t) ? t : null;
        }
        function N(e) {
            let { icon: r, className: a, ...n } = e;
            return (0, t.jsxs)('div', {
                className: 'relative',
                children: [
                    (0, t.jsx)('div', {
                        className:
                            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                        children: (0, t.jsx)(r, {
                            className: 'h-4 w-4 text-content-brand',
                        }),
                    }),
                    (0, t.jsx)(o.Input, {
                        ...n,
                        className: (0, c.cn)('pl-10', a),
                    }),
                ],
            });
        }
        let j =
            'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';
        function S({ service: e }) {
            let o = (0, a.useRouter)(),
                [S, k] = (0, r.useState)(!1),
                [w, P] = (0, r.useState)(!1),
                [C, D] = (0, r.useState)(!1),
                [F, I] = (0, r.useState)([]),
                [R, M] = (0, r.useState)(new Set()),
                [A, O] = (0, r.useState)([]),
                E = (0, r.useMemo)(() => A.filter((e) => e.isActive), [A]),
                [T, L] = (0, r.useState)(e.name ?? ''),
                [_, z] = (0, r.useState)(String(e.price ?? '')),
                [H, V] = (0, r.useState)(h(e.durationMinutes)),
                [$, B] = (0, r.useState)(
                    h(e.barberPercentage) || h(e.professionalPercentage)
                ),
                [U, q] = (0, r.useState)(h(e.cancelLimitHours)),
                [W, Z] = (0, r.useState)(h(e.cancelFeePercentage)),
                [G, J] = (0, r.useState)(() => String(e.unitId ?? '').trim()),
                K = w || C,
                Q = R.size,
                X = (0, r.useMemo)(() => {
                    let e = [...(F ?? [])];
                    return (e.sort((e, t) => e.name.localeCompare(t.name)), e);
                }, [F]);
            async function Y() {
                P(!0);
                try {
                    let t = await fetch(`/api/admin/services/${e.id}`, {
                            method: 'GET',
                            cache: 'no-store',
                            headers: { accept: 'application/json' },
                        }),
                        r = await t.json().catch(() => null);
                    if (!t.ok || !r?.ok || !r.data) {
                        let e =
                            (r && !1 === r.ok && r.error) ||
                            'Não foi possível carregar os dados do serviço.';
                        n.toast.error(e);
                        return;
                    }
                    let a = r.data.service;
                    (L(a.name ?? ''),
                        z(String(a.price ?? '')),
                        V(String(a.durationMinutes ?? '')),
                        B(String(a.professionalPercentage ?? '')),
                        q(
                            null === a.cancelLimitHours
                                ? ''
                                : String(a.cancelLimitHours)
                        ),
                        Z(
                            null === a.cancelFeePercentage
                                ? ''
                                : String(a.cancelFeePercentage)
                        ),
                        I(r.data.professionals ?? []),
                        M(new Set(r.data.selectedProfessionalIds ?? [])));
                    let s = r.data.units ?? [];
                    O(s);
                    let i = String(a.unitId ?? '').trim();
                    if (i) J(i);
                    else {
                        let e = s.find((e) => e.isActive)?.id;
                        J(e ?? '');
                    }
                } catch {
                    n.toast.error(
                        'Não foi possível carregar os dados do serviço.'
                    );
                } finally {
                    P(!1);
                }
            }
            function ee(e) {
                return String(e ?? '')
                    .replace(',', '.')
                    .trim();
            }
            (0, r.useEffect)(() => {
                S && Y();
            }, [S]);
            let et = !!G && (A.find((e) => e.id === G)?.isActive ?? !1);
            async function er(t) {
                if ((t.preventDefault(), K)) return;
                if (!et)
                    return void n.toast.error('Selecione uma unidade ativa.');
                let r = String(T ?? '').trim();
                if (!r)
                    return void n.toast.error('Nome do serviço é obrigatório.');
                let a = y(ee(_));
                if (null === a || a < 0)
                    return void n.toast.error('Preço inválido.');
                let s = y(ee(H));
                if (null === s || s <= 0)
                    return void n.toast.error('Duração inválida.');
                let i = y(ee($));
                if (null === i || i < 0 || i > 100)
                    return void n.toast.error(
                        'Porcentagem inválida (0 a 100).'
                    );
                let l = '' === U.trim() ? null : y(ee(U));
                if (null !== l && l < 0)
                    return void n.toast.error(
                        'Limite de cancelamento inválido.'
                    );
                let c = '' === W.trim() ? null : y(ee(W));
                if (null !== c && (c < 0 || c > 100))
                    return void n.toast.error(
                        'Taxa de cancelamento inválida (0 a 100).'
                    );
                if (0 === Q)
                    return void n.toast.error(
                        'Selecione pelo menos 1 profissional.'
                    );
                D(!0);
                try {
                    let t = {
                            unitId: G,
                            name: r,
                            price: a,
                            durationMinutes: Math.trunc(s),
                            professionalPercentage: i,
                            barberPercentage: i,
                            cancelLimitHours: null === l ? null : Math.trunc(l),
                            cancelFeePercentage: null === c ? null : c,
                            professionalIds: Array.from(R),
                        },
                        d = await fetch(`/api/admin/services/${e.id}`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json',
                                accept: 'application/json',
                            },
                            body: JSON.stringify(t),
                        }),
                        u = await d.json().catch(() => null);
                    if (!d.ok || !u || !0 !== u.ok) {
                        let e =
                            (u && !1 === u.ok && u.error) ||
                            'Não foi possível salvar o serviço.';
                        n.toast.error(e);
                        return;
                    }
                    (n.toast.success('Serviço atualizado com sucesso!'),
                        k(!1),
                        o.refresh());
                } catch {
                    n.toast.error('Não foi possível salvar o serviço.');
                } finally {
                    D(!1);
                }
            }
            return (0, t.jsxs)(i.Dialog, {
                open: S,
                onOpenChange: (t) => {
                    !K &&
                        (k(t),
                        t ||
                            (I([]),
                            M(new Set()),
                            O([]),
                            L(e.name ?? ''),
                            z(String(e.price ?? '')),
                            V(h(e.durationMinutes)),
                            B(
                                h(e.barberPercentage) ||
                                    h(e.professionalPercentage)
                            ),
                            q(h(e.cancelLimitHours)),
                            Z(h(e.cancelFeePercentage)),
                            J(String(e.unitId ?? '').trim())));
                },
                children: [
                    (0, t.jsx)(i.DialogTrigger, {
                        asChild: !0,
                        children: (0, t.jsx)(s.Button, {
                            variant: 'edit2',
                            size: 'sm',
                            className:
                                'border-border-primary hover:bg-muted/40',
                            type: 'button',
                            children: 'Editar',
                        }),
                    }),
                    (0, t.jsxs)(i.DialogContent, {
                        className:
                            'bg-background-secondary border border-border-primary max-h-[80vh] overflow-y-auto',
                        children: [
                            (0, t.jsx)(i.DialogHeader, {
                                children: (0, t.jsx)(i.DialogTitle, {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Editar serviço',
                                }),
                            }),
                            w
                                ? (0, t.jsx)('div', {
                                      className:
                                          'rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary',
                                      children: (0, t.jsxs)('span', {
                                          className:
                                              'inline-flex items-center gap-2',
                                          children: [
                                              (0, t.jsx)(g.Loader2, {
                                                  className:
                                                      'h-4 w-4 animate-spin',
                                              }),
                                              'Carregando dados do serviço...',
                                          ],
                                      }),
                                  })
                                : (0, t.jsxs)('form', {
                                      onSubmit: er,
                                      className: 'space-y-4 pb-2',
                                      children: [
                                          (0, t.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, t.jsxs)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'Unidade ',
                                                          (0, t.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, t.jsxs)(l.Select, {
                                                      value: G,
                                                      onValueChange: (e) =>
                                                          J(e),
                                                      disabled:
                                                          K || 0 === E.length,
                                                      children: [
                                                          (0, t.jsx)(
                                                              l.SelectTrigger,
                                                              {
                                                                  className:
                                                                      'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                                  children: (0,
                                                                  t.jsxs)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'flex items-center gap-2',
                                                                          children:
                                                                              [
                                                                                  (0,
                                                                                  t.jsx)(
                                                                                      v.Building2,
                                                                                      {
                                                                                          className:
                                                                                              'h-4 w-4 text-content-brand',
                                                                                      }
                                                                                  ),
                                                                                  (0,
                                                                                  t.jsx)(
                                                                                      l.SelectValue,
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
                                                          (0, t.jsx)(
                                                              l.SelectContent,
                                                              {
                                                                  children:
                                                                      A.map(
                                                                          (e) =>
                                                                              (0,
                                                                              t.jsxs)(
                                                                                  l.SelectItem,
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
                                                  et
                                                      ? null
                                                      : (0, t.jsx)('p', {
                                                            className:
                                                                'text-xs text-red-500',
                                                            children:
                                                                'Selecione uma unidade ativa.',
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
                                                          'Nome do serviço',
                                                          ' ',
                                                          (0, t.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, t.jsx)(N, {
                                                      name: 'name',
                                                      required: !0,
                                                      value: T,
                                                      onChange: (e) =>
                                                          L(e.target.value),
                                                      disabled: K,
                                                      icon: d.Scissors,
                                                      className: j,
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
                                                          'Valor (R$)',
                                                          ' ',
                                                          (0, t.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, t.jsx)(N, {
                                                      name: 'price',
                                                      type: 'number',
                                                      step: '0.01',
                                                      required: !0,
                                                      value: _,
                                                      onChange: (e) =>
                                                          z(e.target.value),
                                                      disabled: K,
                                                      icon: u.BadgeDollarSign,
                                                      className: j,
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
                                                          'Duração (minutos)',
                                                          ' ',
                                                          (0, t.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, t.jsx)(N, {
                                                      name: 'durationMinutes',
                                                      type: 'number',
                                                      min: 1,
                                                      required: !0,
                                                      value: H,
                                                      onChange: (e) =>
                                                          V(e.target.value),
                                                      disabled: K,
                                                      icon: m.Clock,
                                                      className: j,
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
                                                          'Porcentagem do profissional (%)',
                                                          ' ',
                                                          (0, t.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, t.jsx)(N, {
                                                      name: 'barberPercentage',
                                                      type: 'number',
                                                      step: '0.01',
                                                      min: 0,
                                                      max: 100,
                                                      required: !0,
                                                      value: $,
                                                      onChange: (e) =>
                                                          B(e.target.value),
                                                      disabled: K,
                                                      placeholder: 'Ex: 50',
                                                      icon: p.Percent,
                                                      className: j,
                                                  }),
                                              ],
                                          }),
                                          (0, t.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, t.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children:
                                                          'Limite para cobrança de taxa (horas antes do horário)',
                                                  }),
                                                  (0, t.jsx)(N, {
                                                      name: 'cancelLimitHours',
                                                      type: 'number',
                                                      min: 0,
                                                      value: U,
                                                      onChange: (e) =>
                                                          q(e.target.value),
                                                      disabled: K,
                                                      placeholder:
                                                          'Ex: 2 (até 2h antes)',
                                                      icon: f.Timer,
                                                      className: j,
                                                  }),
                                              ],
                                          }),
                                          (0, t.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, t.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children:
                                                          'Taxa de cancelamento (%)',
                                                  }),
                                                  (0, t.jsx)(N, {
                                                      name: 'cancelFeePercentage',
                                                      type: 'number',
                                                      step: '0.01',
                                                      min: 0,
                                                      max: 100,
                                                      value: W,
                                                      onChange: (e) =>
                                                          Z(e.target.value),
                                                      disabled: K,
                                                      placeholder: 'Ex: 50',
                                                      icon: x.Receipt,
                                                      className: j,
                                                  }),
                                              ],
                                          }),
                                          (0, t.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, t.jsxs)('p', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      children: [
                                                          'Profissionais que realizam este serviço',
                                                          ' ',
                                                          (0, t.jsx)('span', {
                                                              className:
                                                                  'text-red-500',
                                                              children: '*',
                                                          }),
                                                      ],
                                                  }),
                                                  0 === X.length
                                                      ? (0, t.jsx)('div', {
                                                            className:
                                                                'rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary',
                                                            children:
                                                                'Nenhum profissional encontrado para esta empresa.',
                                                        })
                                                      : (0, t.jsxs)('div', {
                                                            className:
                                                                'overflow-hidden rounded-xl border border-border-primary bg-background-tertiary',
                                                            children: [
                                                                (0, t.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'flex items-center justify-between gap-2 border-b border-border-primary bg-background-secondary px-3 py-2',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                t.jsxs)(
                                                                                    'span',
                                                                                    {
                                                                                        className:
                                                                                            'inline-flex items-center gap-2 text-xs text-content-secondary',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                t.jsx)(
                                                                                                    b.Users,
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
                                                                                t.jsxs)(
                                                                                    'span',
                                                                                    {
                                                                                        className:
                                                                                            'text-xs text-content-secondary',
                                                                                        children:
                                                                                            [
                                                                                                Q,
                                                                                                ' selecionado',
                                                                                                1 ===
                                                                                                Q
                                                                                                    ? ''
                                                                                                    : 's',
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                                (0, t.jsx)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'max-h-56 space-y-1 overflow-y-auto p-2',
                                                                        children:
                                                                            X.map(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    let r =
                                                                                        R.has(
                                                                                            e.id
                                                                                        );
                                                                                    return (0,
                                                                                    t.jsxs)(
                                                                                        'label',
                                                                                        {
                                                                                            className:
                                                                                                (0,
                                                                                                c.cn)(
                                                                                                    'flex items-center gap-2 rounded-lg px-2 text-paragraph-small',
                                                                                                    'hover:bg-muted/30',
                                                                                                    !e.isActive &&
                                                                                                        'opacity-60'
                                                                                                ),
                                                                                            children:
                                                                                                [
                                                                                                    (0,
                                                                                                    t.jsx)(
                                                                                                        'input',
                                                                                                        {
                                                                                                            type: 'checkbox',
                                                                                                            className:
                                                                                                                'h-4 w-4 rounded border-border-primary',
                                                                                                            checked:
                                                                                                                r,
                                                                                                            onChange:
                                                                                                                () => {
                                                                                                                    var t;
                                                                                                                    return (
                                                                                                                        (t =
                                                                                                                            e.id),
                                                                                                                        void M(
                                                                                                                            (
                                                                                                                                e
                                                                                                                            ) => {
                                                                                                                                let r =
                                                                                                                                    new Set(
                                                                                                                                        e
                                                                                                                                    );
                                                                                                                                return (
                                                                                                                                    r.has(
                                                                                                                                        t
                                                                                                                                    )
                                                                                                                                        ? r.delete(
                                                                                                                                              t
                                                                                                                                          )
                                                                                                                                        : r.add(
                                                                                                                                              t
                                                                                                                                          ),
                                                                                                                                    r
                                                                                                                                );
                                                                                                                            }
                                                                                                                        )
                                                                                                                    );
                                                                                                                },
                                                                                                            disabled:
                                                                                                                K ||
                                                                                                                !e.isActive,
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    t.jsxs)(
                                                                                                        'span',
                                                                                                        {
                                                                                                            className:
                                                                                                                'text-content-primary',
                                                                                                            children:
                                                                                                                [
                                                                                                                    e.name,
                                                                                                                    ' ',
                                                                                                                    e.isActive
                                                                                                                        ? ''
                                                                                                                        : '(inativo)',
                                                                                                                ],
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
                                                            ],
                                                        }),
                                                  0 === Q
                                                      ? (0, t.jsx)('p', {
                                                            className:
                                                                'text-xs text-red-500',
                                                            children:
                                                                'Selecione pelo menos 1 profissional.',
                                                        })
                                                      : null,
                                              ],
                                          }),
                                          (0, t.jsx)('div', {
                                              className:
                                                  'flex justify-end gap-2 pt-2',
                                              children: (0, t.jsx)(s.Button, {
                                                  type: 'submit',
                                                  variant: 'brand',
                                                  disabled: K || 0 === Q || !et,
                                                  title: et
                                                      ? 0 === Q
                                                          ? 'Selecione ao menos 1 profissional'
                                                          : void 0
                                                      : 'Selecione uma unidade ativa',
                                                  children: C
                                                      ? (0, t.jsxs)('span', {
                                                            className:
                                                                'inline-flex items-center gap-2',
                                                            children: [
                                                                (0, t.jsx)(
                                                                    g.Loader2,
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
        function k(e) {
            if (null == e) return null;
            if ('number' == typeof e) return Number.isFinite(e) ? e : null;
            if ('string' == typeof e) {
                let t = Number(e.trim().replace(',', '.'));
                return Number.isFinite(t) ? t : null;
            }
            return null;
        }
        async function w(e, t) {
            let r = await fetch(`/api/admin/services/${e}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        accept: 'application/json',
                    },
                    body: JSON.stringify(t),
                }),
                a = await r.json().catch(() => null);
            return r.ok && a && !0 === a.ok
                ? { ok: !0, data: a.data }
                : {
                      ok: !1,
                      error:
                          (a && !1 === a.ok && a.error) ||
                          'Não foi possível salvar.',
                  };
        }
        function P({ service: e }) {
            var i;
            let o = (0, a.useRouter)(),
                [l, c] = r.useState(!!e.isActive),
                [d, u] = r.useState(!1);
            async function m() {
                if (d) return;
                let t = !l;
                (u(!0), c(t));
                let r = await w(e.id, { isActive: t });
                if ((u(!1), !r.ok)) {
                    (c(!t), n.toast.error(r.error));
                    return;
                }
                (n.toast.success(
                    t ? 'Serviço ativado!' : 'Serviço desativado!'
                ),
                    o.refresh());
            }
            r.useEffect(() => {
                c(!!e.isActive);
            }, [e.isActive]);
            let p = r.useMemo(() => {
                    let t,
                        r,
                        a,
                        n =
                            'number' == typeof e.priceInCents
                                ? e.priceInCents
                                : null === (t = k(e.price))
                                  ? null
                                  : Math.round(100 * t),
                        s =
                            'number' == typeof e.durationInMinutes
                                ? e.durationInMinutes
                                : 'number' == typeof e.durationMinutes
                                  ? e.durationMinutes
                                  : null;
                    return {
                        priceInCents: n,
                        durationInMinutes: s,
                        commissionPct:
                            'number' == typeof e.barberPercentage
                                ? e.barberPercentage
                                : null === (r = k(e.professionalPercentage))
                                  ? null
                                  : r,
                        cancelFeePct:
                            'number' == typeof e.cancelFeePercentage
                                ? e.cancelFeePercentage
                                : null === (a = k(e.cancelFeePercentage))
                                  ? null
                                  : a,
                    };
                }, [e]),
                f = r.useMemo(() => {
                    var t;
                    return {
                        id: e.id,
                        unitId: e.unitId ?? null,
                        name: e.name,
                        price:
                            'number' == typeof (t = p.priceInCents) &&
                            Number.isFinite(t)
                                ? (t / 100).toFixed(2)
                                : '',
                        durationMinutes: p.durationInMinutes ?? 0,
                        professionalPercentage:
                            null !== p.commissionPct
                                ? String(p.commissionPct)
                                : '50',
                        cancelLimitHours: e.cancelLimitHours ?? null,
                        cancelFeePercentage:
                            null !== p.cancelFeePct
                                ? String(p.cancelFeePct)
                                : null,
                        isActive: !!e.isActive,
                    };
                }, [
                    e,
                    p.priceInCents,
                    p.durationInMinutes,
                    p.commissionPct,
                    p.cancelFeePct,
                ]);
            return (0, t.jsxs)('tr', {
                className: 'border-t border-border-primary',
                children: [
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, t.jsxs)('div', {
                            className: 'space-y-0.5',
                            children: [
                                (0, t.jsx)('p', {
                                    className:
                                        'text-paragraph-medium-size text-content-primary',
                                    children: e.name,
                                }),
                                e.description
                                    ? (0, t.jsx)('p', {
                                          className:
                                              'text-paragraph-small text-content-tertiary line-clamp-2',
                                          children: e.description,
                                      })
                                    : (0, t.jsx)('p', {
                                          className:
                                              'text-paragraph-small text-content-tertiary',
                                      }),
                            ],
                        }),
                    }),
                    (0, t.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children:
                            'number' == typeof (i = p.priceInCents) &&
                            Number.isFinite(i)
                                ? new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL',
                                  }).format(i / 100)
                                : '—',
                    }),
                    (0, t.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children: (function (e) {
                            let t = Number(e ?? 0);
                            if (!Number.isFinite(t) || t <= 0) return '—';
                            if (t < 60) return `${t} min`;
                            let r = Math.floor(t / 60),
                                a = t % 60;
                            return a ? `${r}h ${a}min` : `${r}h`;
                        })(p.durationInMinutes),
                    }),
                    (0, t.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children:
                            'number' == typeof p.commissionPct
                                ? `${p.commissionPct}%`
                                : '—',
                    }),
                    (0, t.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children:
                            'number' == typeof e.cancelLimitHours
                                ? `At\xe9 ${e.cancelLimitHours}h antes`
                                : '—',
                    }),
                    (0, t.jsx)('td', {
                        className:
                            'px-4 py-3 text-paragraph-small text-content-secondary',
                        children:
                            'number' == typeof p.cancelFeePct
                                ? `${p.cancelFeePct}%`
                                : '—',
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, t.jsx)('span', {
                            className: [
                                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                                l
                                    ? 'bg-green-500/15 text-green-600 border-green-500/30'
                                    : 'bg-red-500/15 text-red-600 border-red-500/30',
                            ].join(' '),
                            children: l ? 'Ativo' : 'Inativo',
                        }),
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, t.jsxs)('div', {
                            className: 'flex items-center justify-end gap-2',
                            children: [
                                (0, t.jsx)(S, { service: f }),
                                (0, t.jsx)(s.Button, {
                                    variant: l ? 'destructive' : 'active',
                                    size: 'sm',
                                    type: 'button',
                                    onClick: m,
                                    disabled: d,
                                    className:
                                        'border-border-primary hover:bg-muted/40',
                                    title: d
                                        ? 'Salvando...'
                                        : l
                                          ? 'Desativar serviço'
                                          : 'Ativar serviço',
                                    children: d
                                        ? 'Salvando...'
                                        : l
                                          ? 'Desativar'
                                          : 'Ativar',
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        e.s(['ServiceRow', () => P], 76644);
    },
    124101,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            a = e.i(995403),
            n = e.i(245586),
            s = e.i(776639),
            i = e.i(519455),
            o = e.i(793479),
            l = e.i(967489),
            c = e.i(975157),
            d = e.i(171312),
            u = e.i(153745),
            m = e.i(136764),
            p = e.i(760228),
            f = e.i(50675),
            x = e.i(868106),
            b = e.i(202724),
            g = e.i(263942);
        function v(e) {
            let { icon: r, className: a, ...n } = e;
            return (0, t.jsxs)('div', {
                className: 'relative',
                children: [
                    (0, t.jsx)('div', {
                        className:
                            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                        children: (0, t.jsx)(r, {
                            className: 'h-4 w-4 text-content-brand',
                        }),
                    }),
                    (0, t.jsx)(o.Input, {
                        ...n,
                        className: (0, c.cn)('pl-10', a),
                    }),
                ],
            });
        }
        let h =
            'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0';
        function y(e) {
            let t = Number(
                String(e ?? '')
                    .trim()
                    .replace(/\s/g, '')
                    .replace(/\./g, '')
                    .replace(',', '.')
            );
            return Number.isFinite(t) ? t : NaN;
        }
        function N() {
            let e = (0, n.useRouter)(),
                [o, c] = (0, r.useState)(!1),
                [N, j] = (0, r.useState)(!1),
                [S, k] = (0, r.useState)(!1),
                [w, P] = (0, r.useState)([]),
                [C, D] = (0, r.useState)([]),
                [F, I] = (0, r.useState)(''),
                [R, M] = (0, r.useState)(''),
                [A, O] = (0, r.useState)(''),
                [E, T] = (0, r.useState)('50'),
                [L, _] = (0, r.useState)(''),
                [z, H] = (0, r.useState)(''),
                [V, $] = (0, r.useState)([]),
                [B, U] = (0, r.useState)(''),
                q = (0, r.useMemo)(() => w.filter((e) => e.isActive), [w]),
                W = (0, r.useMemo)(() => C.filter((e) => e.isActive), [C]),
                Z = q.length > 0,
                G = W.length > 0,
                J = N || S,
                K = V.length;
            function Q(e) {
                let t = (e ?? C).find((e) => e.isActive)?.id ?? '';
                (I(''), M(''), O(''), T('50'), _(''), H(''), $([]), U(t));
            }
            async function X() {
                j(!0);
                try {
                    let e = await fetch('/api/admin/services', {
                            method: 'GET',
                            cache: 'no-store',
                            headers: { accept: 'application/json' },
                        }),
                        t = await e.json().catch(() => null);
                    if (!e.ok || !t || !0 !== t.ok) {
                        let e =
                            (t && !1 === t.ok && t.error) ||
                            'Não foi possível carregar dados.';
                        (P([]), D([]), a.toast.error(e));
                        return;
                    }
                    let r = t.data?.professionals ?? [],
                        n = t.data?.units ?? [];
                    (P(r),
                        D(n),
                        U((e) => e || (n.find((e) => e.isActive)?.id ?? '')));
                } catch {
                    (P([]),
                        D([]),
                        a.toast.error('Não foi possível carregar dados.'));
                } finally {
                    j(!1);
                }
            }
            (0, r.useEffect)(() => {
                o && X();
            }, [o]);
            let Y = !!B && (C.find((e) => e.id === B)?.isActive ?? !1),
                ee =
                    Y &&
                    F.trim().length > 0 &&
                    Number.isFinite(y(R)) &&
                    y(R) >= 0 &&
                    Number.isFinite(Number(A)) &&
                    Number(A) > 0 &&
                    Number.isFinite(y(E)) &&
                    y(E) >= 0 &&
                    100 >= y(E) &&
                    K > 0;
            async function et(t) {
                if ((t.preventDefault(), J)) return;
                if (!G)
                    return void a.toast.error(
                        'Crie pelo menos 1 unidade antes de criar serviços.'
                    );
                if (!Y)
                    return void a.toast.error('Selecione uma unidade ativa.');
                if (!Z)
                    return void a.toast.error(
                        'Cadastre pelo menos 1 profissional antes de criar serviços.'
                    );
                if (!ee)
                    return void a.toast.error(
                        'Preencha os campos obrigatórios.'
                    );
                let r = y(R),
                    n = y(E),
                    s = '' === L.trim() ? null : Number(L),
                    i = '' === z.trim() ? null : y(z);
                if (null !== s && (!Number.isFinite(s) || s < 0))
                    return void a.toast.error(
                        'Limite de cancelamento inválido.'
                    );
                if (null !== i && (!Number.isFinite(i) || i < 0 || i > 100))
                    return void a.toast.error(
                        'Taxa de cancelamento inválida (0 a 100).'
                    );
                k(!0);
                try {
                    let t = await fetch('/api/admin/services', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({
                                name: F.trim(),
                                unitId: B,
                                price: r,
                                durationMinutes: Number(A),
                                professionalPercentage: n,
                                cancelLimitHours: s,
                                cancelFeePercentage: i,
                                professionalIds: V,
                            }),
                        }),
                        o = await t.json().catch(() => null);
                    if (!t.ok || !o || !0 !== o.ok) {
                        let e =
                            (o && !1 === o.ok && o.error) ||
                            'Não foi possível criar o serviço.';
                        a.toast.error(e);
                        return;
                    }
                    (a.toast.success('Serviço criado com sucesso!'),
                        c(!1),
                        Q(),
                        e.refresh());
                } catch {
                    a.toast.error('Não foi possível criar o serviço.');
                } finally {
                    k(!1);
                }
            }
            return (0, t.jsxs)(s.Dialog, {
                open: o,
                onOpenChange: (e) => {
                    !J && (c(e), e || Q());
                },
                children: [
                    (0, t.jsx)(s.DialogTrigger, {
                        asChild: !0,
                        children: (0, t.jsx)(i.Button, {
                            variant: 'brand',
                            children: 'Novo serviço',
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
                                    children: 'Novo serviço',
                                }),
                            }),
                            N || G
                                ? N || Z
                                    ? (0, t.jsxs)('form', {
                                          onSubmit: et,
                                          className: 'space-y-4 pb-2',
                                          children: [
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, t.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          children: [
                                                              'Unidade ',
                                                              (0, t.jsx)(
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
                                                      (0, t.jsxs)(l.Select, {
                                                          value: B,
                                                          onValueChange: (e) =>
                                                              U(e),
                                                          disabled:
                                                              J ||
                                                              0 === W.length,
                                                          children: [
                                                              (0, t.jsx)(
                                                                  l.SelectTrigger,
                                                                  {
                                                                      className:
                                                                          'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0 focus-visible:border-border-brand',
                                                                      children:
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
                                                                                              g.Building2,
                                                                                              {
                                                                                                  className:
                                                                                                      'h-4 w-4 text-content-brand',
                                                                                              }
                                                                                          ),
                                                                                          (0,
                                                                                          t.jsx)(
                                                                                              l.SelectValue,
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
                                                              (0, t.jsx)(
                                                                  l.SelectContent,
                                                                  {
                                                                      children:
                                                                          C.map(
                                                                              (
                                                                                  e
                                                                              ) =>
                                                                                  (0,
                                                                                  t.jsxs)(
                                                                                      l.SelectItem,
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
                                                      Y
                                                          ? null
                                                          : (0, t.jsx)('p', {
                                                                className:
                                                                    'text-xs text-red-500',
                                                                children:
                                                                    'Selecione uma unidade ativa.',
                                                            }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, t.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor: 'name',
                                                          children: [
                                                              'Nome do serviço',
                                                              ' ',
                                                              (0, t.jsx)(
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
                                                      (0, t.jsx)(v, {
                                                          id: 'name',
                                                          name: 'name',
                                                          required: !0,
                                                          icon: d.Scissors,
                                                          value: F,
                                                          onChange: (e) =>
                                                              I(e.target.value),
                                                          disabled: J,
                                                          className: h,
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, t.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor: 'price',
                                                          children: [
                                                              'Valor (R$)',
                                                              ' ',
                                                              (0, t.jsx)(
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
                                                      (0, t.jsx)(v, {
                                                          id: 'price',
                                                          name: 'price',
                                                          inputMode: 'decimal',
                                                          placeholder:
                                                              'Ex: 49,90',
                                                          required: !0,
                                                          icon: u.BadgeDollarSign,
                                                          value: R,
                                                          onChange: (e) =>
                                                              M(e.target.value),
                                                          disabled: J,
                                                          className: h,
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, t.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor:
                                                              'durationMinutes',
                                                          children: [
                                                              'Duração (minutos)',
                                                              ' ',
                                                              (0, t.jsx)(
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
                                                      (0, t.jsx)(v, {
                                                          id: 'durationMinutes',
                                                          name: 'durationMinutes',
                                                          type: 'number',
                                                          min: 1,
                                                          required: !0,
                                                          icon: m.Clock,
                                                          value: A,
                                                          onChange: (e) =>
                                                              O(e.target.value),
                                                          disabled: J,
                                                          className: h,
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, t.jsxs)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor:
                                                              'professionalPercentage',
                                                          children: [
                                                              'Porcentagem do profissional (%)',
                                                              ' ',
                                                              (0, t.jsx)(
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
                                                      (0, t.jsx)(v, {
                                                          id: 'professionalPercentage',
                                                          name: 'professionalPercentage',
                                                          type: 'number',
                                                          step: '0.01',
                                                          min: 0,
                                                          max: 100,
                                                          required: !0,
                                                          placeholder: 'Ex: 50',
                                                          icon: p.Percent,
                                                          value: E,
                                                          onChange: (e) =>
                                                              T(e.target.value),
                                                          disabled: J,
                                                          className: h,
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, t.jsx)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor:
                                                              'cancelLimitHours',
                                                          children:
                                                              'Limite para cobrança de taxa (horas antes do horário)',
                                                      }),
                                                      (0, t.jsx)(v, {
                                                          id: 'cancelLimitHours',
                                                          name: 'cancelLimitHours',
                                                          type: 'number',
                                                          min: 0,
                                                          placeholder:
                                                              'Ex: 2 (até 2h antes)',
                                                          icon: f.Timer,
                                                          value: L,
                                                          onChange: (e) =>
                                                              _(e.target.value),
                                                          disabled: J,
                                                          className: h,
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, t.jsx)('label', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          htmlFor:
                                                              'cancelFeePercentage',
                                                          children:
                                                              'Taxa de cancelamento (%)',
                                                      }),
                                                      (0, t.jsx)(v, {
                                                          id: 'cancelFeePercentage',
                                                          name: 'cancelFeePercentage',
                                                          type: 'number',
                                                          step: '0.01',
                                                          min: 0,
                                                          max: 100,
                                                          placeholder: 'Ex: 50',
                                                          icon: x.Receipt,
                                                          value: z,
                                                          onChange: (e) =>
                                                              H(e.target.value),
                                                          disabled: J,
                                                          className: h,
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('div', {
                                                  className: 'space-y-2',
                                                  children: [
                                                      (0, t.jsxs)('p', {
                                                          className:
                                                              'text-label-small text-content-secondary',
                                                          children: [
                                                              'Profissionais que realizam este serviço',
                                                              ' ',
                                                              (0, t.jsx)(
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
                                                      (0, t.jsxs)('div', {
                                                          className:
                                                              'rounded-lg border border-border-primary bg-background-tertiary p-2',
                                                          children: [
                                                              (0, t.jsxs)(
                                                                  'div',
                                                                  {
                                                                      className:
                                                                          'mb-2 flex items-center gap-2 px-1 text-paragraph-small text-content-secondary',
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              t.jsx)(
                                                                                  b.Users,
                                                                                  {
                                                                                      className:
                                                                                          'h-4 w-4 text-content-brand',
                                                                                  }
                                                                              ),
                                                                              (0,
                                                                              t.jsx)(
                                                                                  'span',
                                                                                  {
                                                                                      children:
                                                                                          'Selecione os profissionais',
                                                                                  }
                                                                              ),
                                                                          ],
                                                                  }
                                                              ),
                                                              N
                                                                  ? (0, t.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'px-1 py-3 text-paragraph-small text-content-secondary',
                                                                            children:
                                                                                'Carregando profissionais...',
                                                                        }
                                                                    )
                                                                  : 0 ===
                                                                      q.length
                                                                    ? (0,
                                                                      t.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'px-1 py-3 text-paragraph-small text-content-secondary',
                                                                              children:
                                                                                  'Nenhum profissional ativo cadastrado no momento.',
                                                                          }
                                                                      )
                                                                    : (0,
                                                                      t.jsx)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'max-h-48 space-y-1 overflow-y-auto px-1',
                                                                              children:
                                                                                  q.map(
                                                                                      (
                                                                                          e
                                                                                      ) =>
                                                                                          (0,
                                                                                          t.jsxs)(
                                                                                              'label',
                                                                                              {
                                                                                                  className:
                                                                                                      'flex items-center gap-2 text-paragraph-small text-content-primary',
                                                                                                  children:
                                                                                                      [
                                                                                                          (0,
                                                                                                          t.jsx)(
                                                                                                              'input',
                                                                                                              {
                                                                                                                  type: 'checkbox',
                                                                                                                  className:
                                                                                                                      'h-4 w-4 rounded border-border-primary',
                                                                                                                  disabled:
                                                                                                                      J,
                                                                                                                  checked:
                                                                                                                      V.includes(
                                                                                                                          e.id
                                                                                                                      ),
                                                                                                                  onChange:
                                                                                                                      () => {
                                                                                                                          var t;
                                                                                                                          return (
                                                                                                                              (t =
                                                                                                                                  e.id),
                                                                                                                              void $(
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
                                                                                                              }
                                                                                                          ),
                                                                                                          (0,
                                                                                                          t.jsx)(
                                                                                                              'span',
                                                                                                              {
                                                                                                                  children:
                                                                                                                      e.name,
                                                                                                              }
                                                                                                          ),
                                                                                                      ],
                                                                                              },
                                                                                              e.id
                                                                                          )
                                                                                  ),
                                                                          }
                                                                      ),
                                                          ],
                                                      }),
                                                      !N && Z && 0 === K
                                                          ? (0, t.jsx)('p', {
                                                                className:
                                                                    'text-xs text-red-500',
                                                                children:
                                                                    'Selecione pelo menos 1 profissional.',
                                                            })
                                                          : null,
                                                  ],
                                              }),
                                              (0, t.jsx)('div', {
                                                  className:
                                                      'flex justify-end gap-2 pt-2',
                                                  children: (0, t.jsx)(
                                                      i.Button,
                                                      {
                                                          type: 'submit',
                                                          variant: 'brand',
                                                          disabled: J || !ee,
                                                          title: ee
                                                              ? void 0
                                                              : 'Preencha os campos obrigatórios',
                                                          children: S
                                                              ? 'Salvando...'
                                                              : 'Criar serviço',
                                                      }
                                                  ),
                                              }),
                                          ],
                                      })
                                    : (0, t.jsx)('div', {
                                          className:
                                              'rounded-xl border border-dashed border-border-primary bg-background-tertiary p-4 text-sm text-content-secondary',
                                          children:
                                              'Você ainda não tem profissionais ativos. Cadastre um profissional antes de criar serviços.',
                                      })
                                : (0, t.jsx)('div', {
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
        e.s(['ServiceNewDialog', () => N]);
    },
]);
