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
    599357,
    (e) => {
        'use strict';
        var t = e.i(158166);
        e.s(['ChevronDownIcon', () => t.default]);
    },
    880282,
    (e) => {
        'use strict';
        var t = e.i(990341),
            a = e.i(403078),
            r = e.i(565750),
            n = Object.freeze({
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
            i = t.forwardRef((e, t) =>
                (0, r.jsx)(a.Primitive.span, {
                    ...e,
                    ref: t,
                    style: { ...n, ...e.style },
                })
            );
        ((i.displayName = 'VisuallyHidden'),
            e.s(['Root', () => i, 'VISUALLY_HIDDEN_STYLES', () => n]));
    },
    672687,
    (e) => {
        'use strict';
        var t = e.i(990341);
        function a(e, t) {
            if ('function' == typeof e) return e(t);
            null != e && (e.current = t);
        }
        function r(...e) {
            return (t) => {
                let r = !1,
                    n = e.map((e) => {
                        let n = a(e, t);
                        return (r || 'function' != typeof n || (r = !0), n);
                    });
                if (r)
                    return () => {
                        for (let t = 0; t < n.length; t++) {
                            let r = n[t];
                            'function' == typeof r ? r() : a(e[t], null);
                        }
                    };
            };
        }
        function n(...e) {
            return t.useCallback(r(...e), e);
        }
        e.s(['composeRefs', () => r, 'useComposedRefs', () => n]);
    },
    939476,
    (e) => {
        'use strict';
        var t = e.i(990341),
            a = e.i(672687),
            r = e.i(565750),
            n = Symbol.for('react.lazy'),
            i = t[' use '.trim().toString()];
        function s(e) {
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
                    ((o = t.forwardRef((e, r) => {
                        let { children: n, ...o } = e;
                        if (
                            (s(n) &&
                                'function' == typeof i &&
                                (n = i(n._payload)),
                            t.isValidElement(n))
                        ) {
                            var l;
                            let e,
                                i,
                                s =
                                    ((l = n),
                                    (i =
                                        (e = Object.getOwnPropertyDescriptor(
                                            l.props,
                                            'ref'
                                        )?.get) &&
                                        'isReactWarning' in e &&
                                        e.isReactWarning)
                                        ? l.ref
                                        : (i =
                                                (e =
                                                    Object.getOwnPropertyDescriptor(
                                                        l,
                                                        'ref'
                                                    )?.get) &&
                                                'isReactWarning' in e &&
                                                e.isReactWarning)
                                          ? l.props.ref
                                          : l.props.ref || l.ref),
                                d = (function (e, t) {
                                    let a = { ...t };
                                    for (let r in t) {
                                        let n = e[r],
                                            i = t[r];
                                        /^on[A-Z]/.test(r)
                                            ? n && i
                                                ? (a[r] = (...e) => {
                                                      let t = i(...e);
                                                      return (n(...e), t);
                                                  })
                                                : n && (a[r] = n)
                                            : 'style' === r
                                              ? (a[r] = { ...n, ...i })
                                              : 'className' === r &&
                                                (a[r] = [n, i]
                                                    .filter(Boolean)
                                                    .join(' '));
                                    }
                                    return { ...e, ...a };
                                })(o, n.props);
                            return (
                                n.type !== t.Fragment &&
                                    (d.ref = r ? (0, a.composeRefs)(r, s) : s),
                                t.cloneElement(n, d)
                            );
                        }
                        return t.Children.count(n) > 1
                            ? t.Children.only(null)
                            : null;
                    })).displayName = `${n}.SlotClone`),
                    o),
                d = t.forwardRef((e, a) => {
                    let { children: n, ...o } = e;
                    s(n) && 'function' == typeof i && (n = i(n._payload));
                    let d = t.Children.toArray(n),
                        u = d.find(c);
                    if (u) {
                        let e = u.props.children,
                            n = d.map((a) =>
                                a !== u
                                    ? a
                                    : t.Children.count(e) > 1
                                      ? t.Children.only(null)
                                      : t.isValidElement(e)
                                        ? e.props.children
                                        : null
                            );
                        return (0, r.jsx)(l, {
                            ...o,
                            ref: a,
                            children: t.isValidElement(e)
                                ? t.cloneElement(e, void 0, n)
                                : null,
                        });
                    }
                    return (0, r.jsx)(l, { ...o, ref: a, children: n });
                });
            return ((d.displayName = `${e}.Slot`), d);
        }
        var l = o('Slot'),
            d = Symbol('radix.slottable');
        function c(e) {
            return (
                t.isValidElement(e) &&
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
        var t = e.i(565750),
            a = e.i(939476),
            r = e.i(7284);
        let n = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
            i = r.clsx,
            s = (e, t) => (a) => {
                var r;
                if ((null == t ? void 0 : t.variants) == null)
                    return i(
                        e,
                        null == a ? void 0 : a.class,
                        null == a ? void 0 : a.className
                    );
                let { variants: s, defaultVariants: o } = t,
                    l = Object.keys(s).map((e) => {
                        let t = null == a ? void 0 : a[e],
                            r = null == o ? void 0 : o[e];
                        if (null === t) return null;
                        let i = n(t) || n(r);
                        return s[e][i];
                    }),
                    d =
                        a &&
                        Object.entries(a).reduce((e, t) => {
                            let [a, r] = t;
                            return (void 0 === r || (e[a] = r), e);
                        }, {});
                return i(
                    e,
                    l,
                    null == t || null == (r = t.compoundVariants)
                        ? void 0
                        : r.reduce((e, t) => {
                              let { class: a, className: r, ...n } = t;
                              return Object.entries(n).every((e) => {
                                  let [t, a] = e;
                                  return Array.isArray(a)
                                      ? a.includes({ ...o, ...d }[t])
                                      : { ...o, ...d }[t] === a;
                              })
                                  ? [...e, a, r]
                                  : e;
                          }, []),
                    null == a ? void 0 : a.class,
                    null == a ? void 0 : a.className
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
            variant: r,
            size: n,
            asChild: i = !1,
            ...s
        }) {
            let d = i ? a.Slot : 'button';
            return (0, t.jsx)(d, {
                'data-slot': 'button',
                className: (0, o.cn)(l({ variant: r, size: n, className: e })),
                ...s,
            });
        }
        e.s(['Button', () => d, 'buttonVariants', () => l], 519455);
    },
    861181,
    (e) => {
        'use strict';
        var t = e.i(990341),
            a = e.i(672687),
            r = e.i(150076),
            n = (e) => {
                var n;
                let s,
                    o,
                    { present: l, children: d } = e,
                    c = (function (e) {
                        var a, n;
                        let [s, o] = t.useState(),
                            l = t.useRef(null),
                            d = t.useRef(e),
                            c = t.useRef('none'),
                            [u, m] =
                                ((a = e ? 'mounted' : 'unmounted'),
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
                                t.useReducer((e, t) => n[e][t] ?? e, a));
                        return (
                            t.useEffect(() => {
                                let e = i(l.current);
                                c.current = 'mounted' === u ? e : 'none';
                            }, [u]),
                            (0, r.useLayoutEffect)(() => {
                                let t = l.current,
                                    a = d.current;
                                if (a !== e) {
                                    let r = c.current,
                                        n = i(t);
                                    (e
                                        ? m('MOUNT')
                                        : 'none' === n || t?.display === 'none'
                                          ? m('UNMOUNT')
                                          : a && r !== n
                                            ? m('ANIMATION_OUT')
                                            : m('UNMOUNT'),
                                        (d.current = e));
                                }
                            }, [e, m]),
                            (0, r.useLayoutEffect)(() => {
                                if (s) {
                                    let e,
                                        t =
                                            s.ownerDocument.defaultView ??
                                            window,
                                        a = (a) => {
                                            let r = i(l.current).includes(
                                                CSS.escape(a.animationName)
                                            );
                                            if (
                                                a.target === s &&
                                                r &&
                                                (m('ANIMATION_END'), !d.current)
                                            ) {
                                                let a =
                                                    s.style.animationFillMode;
                                                ((s.style.animationFillMode =
                                                    'forwards'),
                                                    (e = t.setTimeout(() => {
                                                        'forwards' ===
                                                            s.style
                                                                .animationFillMode &&
                                                            (s.style.animationFillMode =
                                                                a);
                                                    })));
                                            }
                                        },
                                        r = (e) => {
                                            e.target === s &&
                                                (c.current = i(l.current));
                                        };
                                    return (
                                        s.addEventListener('animationstart', r),
                                        s.addEventListener(
                                            'animationcancel',
                                            a
                                        ),
                                        s.addEventListener('animationend', a),
                                        () => {
                                            (t.clearTimeout(e),
                                                s.removeEventListener(
                                                    'animationstart',
                                                    r
                                                ),
                                                s.removeEventListener(
                                                    'animationcancel',
                                                    a
                                                ),
                                                s.removeEventListener(
                                                    'animationend',
                                                    a
                                                ));
                                        }
                                    );
                                }
                                m('ANIMATION_END');
                            }, [s, m]),
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
                        'function' == typeof d
                            ? d({ present: c.isPresent })
                            : t.Children.only(d),
                    m = (0, a.useComposedRefs)(
                        c.ref,
                        ((n = u),
                        (o =
                            (s = Object.getOwnPropertyDescriptor(
                                n.props,
                                'ref'
                            )?.get) &&
                            'isReactWarning' in s &&
                            s.isReactWarning)
                            ? n.ref
                            : (o =
                                    (s = Object.getOwnPropertyDescriptor(
                                        n,
                                        'ref'
                                    )?.get) &&
                                    'isReactWarning' in s &&
                                    s.isReactWarning)
                              ? n.props.ref
                              : n.props.ref || n.ref)
                    );
                return 'function' == typeof d || c.isPresent
                    ? t.cloneElement(u, { ref: m })
                    : null;
            };
        function i(e) {
            return e?.animationName || 'none';
        }
        ((n.displayName = 'Presence'), e.s(['Presence', () => n]));
    },
    342413,
    (e) => {
        'use strict';
        var t = e.i(990341),
            a = e.i(291967),
            r = e.i(672687),
            n = e.i(784711),
            i = e.i(910529),
            s = e.i(695145),
            o = e.i(846357),
            l = e.i(60126),
            d = e.i(546354),
            c = e.i(861181),
            u = e.i(403078),
            m = e.i(774621),
            p = e.i(595357),
            f = e.i(73772),
            x = e.i(655875),
            g = e.i(565750),
            v = 'Dialog',
            [h, b] = (0, n.createContextScope)(v),
            [y, j] = h(v),
            N = (e) => {
                let {
                        __scopeDialog: a,
                        children: r,
                        open: n,
                        defaultOpen: o,
                        onOpenChange: l,
                        modal: d = !0,
                    } = e,
                    c = t.useRef(null),
                    u = t.useRef(null),
                    [m, p] = (0, s.useControllableState)({
                        prop: n,
                        defaultProp: o ?? !1,
                        onChange: l,
                        caller: v,
                    });
                return (0, g.jsx)(y, {
                    scope: a,
                    triggerRef: c,
                    contentRef: u,
                    contentId: (0, i.useId)(),
                    titleId: (0, i.useId)(),
                    descriptionId: (0, i.useId)(),
                    open: m,
                    onOpenChange: p,
                    onOpenToggle: t.useCallback(() => p((e) => !e), [p]),
                    modal: d,
                    children: r,
                });
            };
        N.displayName = v;
        var D = 'DialogTrigger',
            T = t.forwardRef((e, t) => {
                let { __scopeDialog: n, ...i } = e,
                    s = j(D, n),
                    o = (0, r.useComposedRefs)(t, s.triggerRef);
                return (0, g.jsx)(u.Primitive.button, {
                    type: 'button',
                    'aria-haspopup': 'dialog',
                    'aria-expanded': s.open,
                    'aria-controls': s.contentId,
                    'data-state': H(s.open),
                    ...i,
                    ref: o,
                    onClick: (0, a.composeEventHandlers)(
                        e.onClick,
                        s.onOpenToggle
                    ),
                });
            });
        T.displayName = D;
        var w = 'DialogPortal',
            [S, C] = h(w, { forceMount: void 0 }),
            k = (e) => {
                let {
                        __scopeDialog: a,
                        forceMount: r,
                        children: n,
                        container: i,
                    } = e,
                    s = j(w, a);
                return (0, g.jsx)(S, {
                    scope: a,
                    forceMount: r,
                    children: t.Children.map(n, (e) =>
                        (0, g.jsx)(c.Presence, {
                            present: r || s.open,
                            children: (0, g.jsx)(d.Portal, {
                                asChild: !0,
                                container: i,
                                children: e,
                            }),
                        })
                    ),
                });
            };
        k.displayName = w;
        var R = 'DialogOverlay',
            A = t.forwardRef((e, t) => {
                let a = C(R, e.__scopeDialog),
                    { forceMount: r = a.forceMount, ...n } = e,
                    i = j(R, e.__scopeDialog);
                return i.modal
                    ? (0, g.jsx)(c.Presence, {
                          present: r || i.open,
                          children: (0, g.jsx)(O, { ...n, ref: t }),
                      })
                    : null;
            });
        A.displayName = R;
        var E = (0, x.createSlot)('DialogOverlay.RemoveScroll'),
            O = t.forwardRef((e, t) => {
                let { __scopeDialog: a, ...r } = e,
                    n = j(R, a);
                return (0, g.jsx)(p.RemoveScroll, {
                    as: E,
                    allowPinchZoom: !0,
                    shards: [n.contentRef],
                    children: (0, g.jsx)(u.Primitive.div, {
                        'data-state': H(n.open),
                        ...r,
                        ref: t,
                        style: { pointerEvents: 'auto', ...r.style },
                    }),
                });
            }),
            I = 'DialogContent',
            P = t.forwardRef((e, t) => {
                let a = C(I, e.__scopeDialog),
                    { forceMount: r = a.forceMount, ...n } = e,
                    i = j(I, e.__scopeDialog);
                return (0, g.jsx)(c.Presence, {
                    present: r || i.open,
                    children: i.modal
                        ? (0, g.jsx)(z, { ...n, ref: t })
                        : (0, g.jsx)(M, { ...n, ref: t }),
                });
            });
        P.displayName = I;
        var z = t.forwardRef((e, n) => {
                let i = j(I, e.__scopeDialog),
                    s = t.useRef(null),
                    o = (0, r.useComposedRefs)(n, i.contentRef, s);
                return (
                    t.useEffect(() => {
                        let e = s.current;
                        if (e) return (0, f.hideOthers)(e);
                    }, []),
                    (0, g.jsx)(F, {
                        ...e,
                        ref: o,
                        trapFocus: i.open,
                        disableOutsidePointerEvents: !0,
                        onCloseAutoFocus: (0, a.composeEventHandlers)(
                            e.onCloseAutoFocus,
                            (e) => {
                                (e.preventDefault(),
                                    i.triggerRef.current?.focus());
                            }
                        ),
                        onPointerDownOutside: (0, a.composeEventHandlers)(
                            e.onPointerDownOutside,
                            (e) => {
                                let t = e.detail.originalEvent,
                                    a = 0 === t.button && !0 === t.ctrlKey;
                                (2 === t.button || a) && e.preventDefault();
                            }
                        ),
                        onFocusOutside: (0, a.composeEventHandlers)(
                            e.onFocusOutside,
                            (e) => e.preventDefault()
                        ),
                    })
                );
            }),
            M = t.forwardRef((e, a) => {
                let r = j(I, e.__scopeDialog),
                    n = t.useRef(!1),
                    i = t.useRef(!1);
                return (0, g.jsx)(F, {
                    ...e,
                    ref: a,
                    trapFocus: !1,
                    disableOutsidePointerEvents: !1,
                    onCloseAutoFocus: (t) => {
                        (e.onCloseAutoFocus?.(t),
                            t.defaultPrevented ||
                                (n.current || r.triggerRef.current?.focus(),
                                t.preventDefault()),
                            (n.current = !1),
                            (i.current = !1));
                    },
                    onInteractOutside: (t) => {
                        (e.onInteractOutside?.(t),
                            t.defaultPrevented ||
                                ((n.current = !0),
                                'pointerdown' === t.detail.originalEvent.type &&
                                    (i.current = !0)));
                        let a = t.target;
                        (r.triggerRef.current?.contains(a) &&
                            t.preventDefault(),
                            'focusin' === t.detail.originalEvent.type &&
                                i.current &&
                                t.preventDefault());
                    },
                });
            }),
            F = t.forwardRef((e, a) => {
                let {
                        __scopeDialog: n,
                        trapFocus: i,
                        onOpenAutoFocus: s,
                        onCloseAutoFocus: d,
                        ...c
                    } = e,
                    u = j(I, n),
                    p = t.useRef(null),
                    f = (0, r.useComposedRefs)(a, p);
                return (
                    (0, m.useFocusGuards)(),
                    (0, g.jsxs)(g.Fragment, {
                        children: [
                            (0, g.jsx)(l.FocusScope, {
                                asChild: !0,
                                loop: !0,
                                trapped: i,
                                onMountAutoFocus: s,
                                onUnmountAutoFocus: d,
                                children: (0, g.jsx)(o.DismissableLayer, {
                                    role: 'dialog',
                                    id: u.contentId,
                                    'aria-describedby': u.descriptionId,
                                    'aria-labelledby': u.titleId,
                                    'data-state': H(u.open),
                                    ...c,
                                    ref: f,
                                    onDismiss: () => u.onOpenChange(!1),
                                }),
                            }),
                            (0, g.jsxs)(g.Fragment, {
                                children: [
                                    (0, g.jsx)(K, { titleId: u.titleId }),
                                    (0, g.jsx)(Q, {
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
            L = t.forwardRef((e, t) => {
                let { __scopeDialog: a, ...r } = e,
                    n = j(_, a);
                return (0, g.jsx)(u.Primitive.h2, {
                    id: n.titleId,
                    ...r,
                    ref: t,
                });
            });
        L.displayName = _;
        var V = 'DialogDescription',
            U = t.forwardRef((e, t) => {
                let { __scopeDialog: a, ...r } = e,
                    n = j(V, a);
                return (0, g.jsx)(u.Primitive.p, {
                    id: n.descriptionId,
                    ...r,
                    ref: t,
                });
            });
        U.displayName = V;
        var B = 'DialogClose',
            $ = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...n } = e,
                    i = j(B, r);
                return (0, g.jsx)(u.Primitive.button, {
                    type: 'button',
                    ...n,
                    ref: t,
                    onClick: (0, a.composeEventHandlers)(e.onClick, () =>
                        i.onOpenChange(!1)
                    ),
                });
            });
        function H(e) {
            return e ? 'open' : 'closed';
        }
        $.displayName = B;
        var W = 'DialogTitleWarning',
            [q, Y] = (0, n.createContext)(W, {
                contentName: I,
                titleName: _,
                docsSlug: 'dialog',
            }),
            K = ({ titleId: e }) => {
                let a = Y(W),
                    r = `\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;
                return (
                    t.useEffect(() => {
                        e && (document.getElementById(e) || console.error(r));
                    }, [r, e]),
                    null
                );
            },
            Q = ({ contentRef: e, descriptionId: a }) => {
                let r = Y('DialogDescriptionWarning'),
                    n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${r.contentName}}.`;
                return (
                    t.useEffect(() => {
                        let t = e.current?.getAttribute('aria-describedby');
                        a &&
                            t &&
                            (document.getElementById(a) || console.warn(n));
                    }, [n, e, a]),
                    null
                );
            };
        e.s([
            'Close',
            () => $,
            'Content',
            () => P,
            'Description',
            () => U,
            'Overlay',
            () => A,
            'Portal',
            () => k,
            'Root',
            () => N,
            'Title',
            () => L,
            'Trigger',
            () => T,
            'WarningProvider',
            () => q,
            'createDialogScope',
            () => b,
        ]);
    },
    776639,
    660214,
    (e) => {
        'use strict';
        var t = e.i(565750),
            a = e.i(342413);
        let r = (0, e.i(383206).default)('x', [
            ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
            ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
        ]);
        e.s(['default', () => r], 660214);
        var n = e.i(294237),
            i = e.i(975157);
        function s({ ...e }) {
            return (0, t.jsx)(a.Root, { 'data-slot': 'dialog', ...e });
        }
        function o({ ...e }) {
            return (0, t.jsx)(a.Trigger, {
                'data-slot': 'dialog-trigger',
                ...e,
            });
        }
        function l({ ...e }) {
            return (0, t.jsx)(a.Portal, { 'data-slot': 'dialog-portal', ...e });
        }
        let d = (0, n.cva)(
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
        function c({ className: e, variant: r, ...n }) {
            return (0, t.jsx)(a.Overlay, {
                'data-slot': 'dialog-overlay',
                className: (0, i.cn)(d({ variant: r }), e),
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
            showCloseButton: s = !0,
            variant: o,
            overlayVariant: d,
            ...m
        }) {
            return (0, t.jsxs)(l, {
                'data-slot': 'dialog-portal',
                children: [
                    (0, t.jsx)(c, { variant: d }),
                    (0, t.jsxs)(a.Content, {
                        'data-slot': 'dialog-content',
                        className: (0, i.cn)(u({ variant: o }), e),
                        ...m,
                        children: [
                            n,
                            s &&
                                (0, t.jsxs)(a.Close, {
                                    'data-slot': 'dialog-close',
                                    className:
                                        "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                                    children: [
                                        (0, t.jsx)(r, {}),
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
        function f({ className: e, align: a, ...r }) {
            return (0, t.jsx)('div', {
                'data-slot': 'dialog-header',
                className: (0, i.cn)(p({ align: a }), e),
                ...r,
            });
        }
        function x({ className: e, ...a }) {
            return (0, t.jsx)('div', {
                'data-slot': 'dialog-footer',
                className: (0, i.cn)(
                    'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                    e
                ),
                ...a,
            });
        }
        let g = (0, n.cva)('leading-none font-semibold', {
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
        function v({ className: e, size: r, ...n }) {
            return (0, t.jsx)(a.Title, {
                'data-slot': 'dialog-title',
                className: (0, i.cn)(g({ size: r }), e),
                ...n,
            });
        }
        let h = (0, n.cva)('text-muted-foreground', {
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
        function b({ className: e, size: r, ...n }) {
            return (0, t.jsx)(a.Description, {
                'data-slot': 'dialog-description',
                className: (0, i.cn)(h({ size: r }), e),
                ...n,
            });
        }
        e.s(
            [
                'Dialog',
                () => s,
                'DialogContent',
                () => m,
                'DialogDescription',
                () => b,
                'DialogFooter',
                () => x,
                'DialogHeader',
                () => f,
                'DialogTitle',
                () => v,
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
    351890,
    (e) => {
        'use strict';
        var t = e.i(738416);
        function a(e) {
            return (0, t.startOfDay)(Date.now(), e);
        }
        e.s(['startOfToday', () => a]);
    },
    868499,
    162069,
    (e) => {
        'use strict';
        var t = e.i(565750),
            a = e.i(990341),
            r = e.i(784711),
            n = e.i(672687),
            i = e.i(342413),
            s = e.i(291967),
            o = e.i(655875),
            l = 'AlertDialog',
            [d, c] = (0, r.createContextScope)(l, [i.createDialogScope]),
            u = (0, i.createDialogScope)(),
            m = (e) => {
                let { __scopeAlertDialog: a, ...r } = e,
                    n = u(a);
                return (0, t.jsx)(i.Root, { ...n, ...r, modal: !0 });
            };
        m.displayName = l;
        var p = a.forwardRef((e, a) => {
            let { __scopeAlertDialog: r, ...n } = e,
                s = u(r);
            return (0, t.jsx)(i.Trigger, { ...s, ...n, ref: a });
        });
        p.displayName = 'AlertDialogTrigger';
        var f = (e) => {
            let { __scopeAlertDialog: a, ...r } = e,
                n = u(a);
            return (0, t.jsx)(i.Portal, { ...n, ...r });
        };
        f.displayName = 'AlertDialogPortal';
        var x = a.forwardRef((e, a) => {
            let { __scopeAlertDialog: r, ...n } = e,
                s = u(r);
            return (0, t.jsx)(i.Overlay, { ...s, ...n, ref: a });
        });
        x.displayName = 'AlertDialogOverlay';
        var g = 'AlertDialogContent',
            [v, h] = d(g),
            b = (0, o.createSlottable)('AlertDialogContent'),
            y = a.forwardRef((e, r) => {
                let { __scopeAlertDialog: o, children: l, ...d } = e,
                    c = u(o),
                    m = a.useRef(null),
                    p = (0, n.useComposedRefs)(r, m),
                    f = a.useRef(null);
                return (0, t.jsx)(i.WarningProvider, {
                    contentName: g,
                    titleName: j,
                    docsSlug: 'alert-dialog',
                    children: (0, t.jsx)(v, {
                        scope: o,
                        cancelRef: f,
                        children: (0, t.jsxs)(i.Content, {
                            role: 'alertdialog',
                            ...c,
                            ...d,
                            ref: p,
                            onOpenAutoFocus: (0, s.composeEventHandlers)(
                                d.onOpenAutoFocus,
                                (e) => {
                                    (e.preventDefault(),
                                        f.current?.focus({
                                            preventScroll: !0,
                                        }));
                                }
                            ),
                            onPointerDownOutside: (e) => e.preventDefault(),
                            onInteractOutside: (e) => e.preventDefault(),
                            children: [
                                (0, t.jsx)(b, { children: l }),
                                (0, t.jsx)(k, { contentRef: m }),
                            ],
                        }),
                    }),
                });
            });
        y.displayName = g;
        var j = 'AlertDialogTitle',
            N = a.forwardRef((e, a) => {
                let { __scopeAlertDialog: r, ...n } = e,
                    s = u(r);
                return (0, t.jsx)(i.Title, { ...s, ...n, ref: a });
            });
        N.displayName = j;
        var D = 'AlertDialogDescription',
            T = a.forwardRef((e, a) => {
                let { __scopeAlertDialog: r, ...n } = e,
                    s = u(r);
                return (0, t.jsx)(i.Description, { ...s, ...n, ref: a });
            });
        T.displayName = D;
        var w = a.forwardRef((e, a) => {
            let { __scopeAlertDialog: r, ...n } = e,
                s = u(r);
            return (0, t.jsx)(i.Close, { ...s, ...n, ref: a });
        });
        w.displayName = 'AlertDialogAction';
        var S = 'AlertDialogCancel',
            C = a.forwardRef((e, a) => {
                let { __scopeAlertDialog: r, ...s } = e,
                    { cancelRef: o } = h(S, r),
                    l = u(r),
                    d = (0, n.useComposedRefs)(a, o);
                return (0, t.jsx)(i.Close, { ...l, ...s, ref: d });
            });
        C.displayName = S;
        var k = ({ contentRef: e }) => {
            let t = `\`${g}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${g}\` by passing a \`${D}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${g}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
            return (
                a.useEffect(() => {
                    document.getElementById(
                        e.current?.getAttribute('aria-describedby')
                    ) || console.warn(t);
                }, [t, e]),
                null
            );
        };
        e.s(
            [
                'Action',
                () => w,
                'Cancel',
                () => C,
                'Content',
                () => y,
                'Description',
                () => T,
                'Overlay',
                () => x,
                'Portal',
                () => f,
                'Root',
                () => m,
                'Title',
                () => N,
                'Trigger',
                () => p,
            ],
            162069
        );
        var R = e.i(975157),
            A = e.i(519455);
        let E = a.forwardRef(({ className: e, ...a }, r) =>
            (0, t.jsx)(x, {
                className: (0, R.cn)(
                    'fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    e
                ),
                ...a,
                ref: r,
            })
        );
        E.displayName = x.displayName;
        let O = a.forwardRef(({ className: e, ...a }, r) =>
            (0, t.jsxs)(f, {
                children: [
                    (0, t.jsx)(E, {}),
                    (0, t.jsx)(y, {
                        ref: r,
                        className: (0, R.cn)(
                            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background-tertiary border-none p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg',
                            e
                        ),
                        ...a,
                    }),
                ],
            })
        );
        O.displayName = y.displayName;
        let I = ({ className: e, ...a }) =>
            (0, t.jsx)('div', {
                className: (0, R.cn)(
                    'flex flex-col space-y-2 text-center sm:text-left',
                    e
                ),
                ...a,
            });
        I.displayName = 'AlertDialogHeader';
        let P = ({ className: e, ...a }) =>
            (0, t.jsx)('div', {
                className: (0, R.cn)(
                    'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
                    e
                ),
                ...a,
            });
        P.displayName = 'AlertDialogFooter';
        let z = a.forwardRef(({ className: e, ...a }, r) =>
            (0, t.jsx)(N, {
                ref: r,
                className: (0, R.cn)(
                    'text-title-modal text-content-primary',
                    e
                ),
                ...a,
            })
        );
        z.displayName = N.displayName;
        let M = a.forwardRef(({ className: e, ...a }, r) =>
            (0, t.jsx)(T, {
                ref: r,
                className: (0, R.cn)(
                    'text-paragraph-medium text-content-secondary',
                    e
                ),
                ...a,
            })
        );
        M.displayName = T.displayName;
        let F = a.forwardRef(({ className: e, ...a }, r) =>
            (0, t.jsx)(w, {
                ref: r,
                className: (0, R.cn)(
                    (0, A.buttonVariants)({ variant: 'destructive' }),
                    'text-label-medium h-10 px-6 rounded-lg',
                    e
                ),
                ...a,
            })
        );
        F.displayName = w.displayName;
        let _ = a.forwardRef(({ className: e, ...a }, r) =>
            (0, t.jsx)(C, {
                ref: r,
                className: (0, R.cn)(
                    (0, A.buttonVariants)({ variant: 'outline' }),
                    'text-label-medium h-10 px-6 rounded-lg mt-2 sm:mt-0',
                    e
                ),
                ...a,
            })
        );
        ((_.displayName = C.displayName),
            e.s(
                [
                    'AlertDialog',
                    () => m,
                    'AlertDialogAction',
                    () => F,
                    'AlertDialogCancel',
                    () => _,
                    'AlertDialogContent',
                    () => O,
                    'AlertDialogDescription',
                    () => M,
                    'AlertDialogFooter',
                    () => P,
                    'AlertDialogHeader',
                    () => I,
                    'AlertDialogTitle',
                    () => z,
                    'AlertDialogTrigger',
                    () => p,
                ],
                868499
            ));
    },
    327948,
    (e) => {
        'use strict';
        var t = e.i(565750),
            a = e.i(990341),
            r = e.i(245586),
            n = e.i(230902),
            i = e.i(351890),
            s = e.i(67356),
            o = e.i(98556),
            o = o,
            l = e.i(136764),
            d = e.i(641304),
            c = e.i(995403),
            u = e.i(519455),
            m = e.i(776639),
            p = e.i(227766),
            f = e.i(337822),
            x = e.i(967489),
            g = e.i(975157);
        let v = (() => {
            let e = [];
            for (let t = 0; t <= 23; t++)
                for (let a = 0; a < 60; a += 30)
                    e.push(
                        `${String(t).padStart(2, '0')}:${String(a).padStart(2, '0')}`
                    );
            return e;
        })();
        function h({ professionalId: e, onSubmitUI: h }) {
            let b = (0, r.useRouter)(),
                [y, j] = (0, a.useState)(!1),
                [N, D] = (0, a.useState)(),
                [T, w] = (0, a.useState)('FULL_DAY'),
                [S, C] = (0, a.useState)([
                    { id: '1', startTime: '09:00', endTime: '19:00' },
                ]),
                [k, R] = (0, a.useState)(!1);
            function A() {
                (D(void 0),
                    w('FULL_DAY'),
                    C([{ id: '1', startTime: '09:00', endTime: '19:00' }]));
            }
            function E(e, t, a) {
                C((r) => r.map((r) => (r.id === e ? { ...r, [t]: a } : r)));
            }
            let O = (0, a.useMemo)(
                    () =>
                        'PARTIAL' === T &&
                        S.some(
                            (e) =>
                                !e.startTime ||
                                !e.endTime ||
                                e.startTime >= e.endTime
                        ),
                    [S, T]
                ),
                I = (0, a.useMemo)(
                    () => !!N && ('PARTIAL' !== T || (!!S.length && !O)) && !0,
                    [N, T, S.length, O]
                );
            async function P() {
                if (!I)
                    return void c.toast.error(
                        'Selecione uma data válida para salvar a exceção.'
                    );
                R(!0);
                let t =
                    'FULL_DAY' === T
                        ? {
                              dateISO: (0, n.format)(N, 'yyyy-MM-dd'),
                              mode: 'FULL_DAY',
                              intervals: [],
                          }
                        : {
                              dateISO: (0, n.format)(N, 'yyyy-MM-dd'),
                              mode: 'PARTIAL',
                              intervals: S.map((e) => ({
                                  startTime: e.startTime,
                                  endTime: e.endTime,
                              })),
                          };
                try {
                    let a = await fetch(
                            '/api/professional/availability/exceptions',
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(t),
                            }
                        ),
                        r = await a.json();
                    if (!a.ok || !r?.ok) {
                        let e =
                            (r && 'error' in r && r.error) ||
                            'Erro ao salvar exceção.';
                        c.toast.error(e);
                        return;
                    }
                    (c.toast.success('Exceção criada com sucesso!'),
                        h?.({ professionalId: e, ...t }),
                        A(),
                        j(!1),
                        window.dispatchEvent(
                            new Event('professional-exceptions:changed')
                        ),
                        b.refresh());
                } catch {
                    c.toast.error('Falha ao salvar exceção. Tente novamente.');
                } finally {
                    R(!1);
                }
            }
            return (0, t.jsxs)(m.Dialog, {
                open: y,
                onOpenChange: (e) => {
                    (j(e), e || A());
                },
                children: [
                    (0, t.jsx)(m.DialogTrigger, {
                        asChild: !0,
                        children: (0, t.jsx)(u.Button, {
                            variant: 'destructive',
                            size: 'sm',
                            children: 'Criar exceção',
                        }),
                    }),
                    (0, t.jsxs)(m.DialogContent, {
                        variant: 'appointment',
                        overlayVariant: 'blurred',
                        showCloseButton: !0,
                        children: [
                            (0, t.jsxs)(m.DialogHeader, {
                                children: [
                                    (0, t.jsx)(m.DialogTitle, {
                                        size: 'modal',
                                        children: 'Criar exceção na agenda',
                                    }),
                                    (0, t.jsx)(m.DialogDescription, {
                                        size: 'modal',
                                        children:
                                            'Bloqueie um dia inteiro ou faixas de horário específicas. A agenda vai respeitar essas exceções acima do padrão semanal.',
                                    }),
                                ],
                            }),
                            (0, t.jsxs)('div', {
                                className: 'space-y-4',
                                children: [
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsx)('span', {
                                                className:
                                                    'text-label-medium-size text-content-primary',
                                                children: 'Dia da exceção',
                                            }),
                                            (0, t.jsxs)(f.Popover, {
                                                children: [
                                                    (0, t.jsx)(
                                                        f.PopoverTrigger,
                                                        {
                                                            asChild: !0,
                                                            children: (0,
                                                            t.jsx)(u.Button, {
                                                                variant:
                                                                    'outline',
                                                                disabled: k,
                                                                className: (0,
                                                                g.cn)(
                                                                    'w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                    !N &&
                                                                        'text-content-secondary'
                                                                ),
                                                                children: (0,
                                                                t.jsxs)('div', {
                                                                    className:
                                                                        'flex items-center gap-2',
                                                                    children: [
                                                                        (0,
                                                                        t.jsx)(
                                                                            o.default,
                                                                            {
                                                                                className:
                                                                                    'text-content-brand',
                                                                                size: 20,
                                                                            }
                                                                        ),
                                                                        N
                                                                            ? (0,
                                                                              t.jsx)(
                                                                                  'span',
                                                                                  {
                                                                                      children:
                                                                                          (0,
                                                                                          n.format)(
                                                                                              N,
                                                                                              "EEEE, dd 'de' MMMM",
                                                                                              {
                                                                                                  locale: s.ptBR,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              )
                                                                            : (0,
                                                                              t.jsx)(
                                                                                  'span',
                                                                                  {
                                                                                      children:
                                                                                          'Selecione uma data',
                                                                                  }
                                                                              ),
                                                                    ],
                                                                }),
                                                            }),
                                                        }
                                                    ),
                                                    (0, t.jsx)(
                                                        f.PopoverContent,
                                                        {
                                                            className:
                                                                'w-auto p-0',
                                                            align: 'start',
                                                            children: (0,
                                                            t.jsx)(p.Calendar, {
                                                                mode: 'single',
                                                                selected: N,
                                                                onSelect: (e) =>
                                                                    D(
                                                                        e ??
                                                                            void 0
                                                                    ),
                                                                disabled: (e) =>
                                                                    e <
                                                                    (0,
                                                                    i.startOfToday)(),
                                                                locale: s.ptBR,
                                                            }),
                                                        }
                                                    ),
                                                ],
                                            }),
                                            N
                                                ? null
                                                : (0, t.jsx)('p', {
                                                      className:
                                                          'text-[11px] text-content-tertiary',
                                                      children:
                                                          'Selecione uma data para habilitar o salvar.',
                                                  }),
                                        ],
                                    }),
                                    (0, t.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, t.jsx)('span', {
                                                className:
                                                    'text-label-medium-size text-content-primary',
                                                children: 'Tipo de exceção',
                                            }),
                                            (0, t.jsxs)(x.Select, {
                                                value: T,
                                                onValueChange: (e) => w(e),
                                                disabled: k,
                                                children: [
                                                    (0, t.jsx)(
                                                        x.SelectTrigger,
                                                        {
                                                            children: (0,
                                                            t.jsx)(
                                                                x.SelectValue,
                                                                {}
                                                            ),
                                                        }
                                                    ),
                                                    (0, t.jsxs)(
                                                        x.SelectContent,
                                                        {
                                                            children: [
                                                                (0, t.jsx)(
                                                                    x.SelectItem,
                                                                    {
                                                                        value: 'FULL_DAY',
                                                                        children:
                                                                            'Dia inteiro indisponível',
                                                                    }
                                                                ),
                                                                (0, t.jsx)(
                                                                    x.SelectItem,
                                                                    {
                                                                        value: 'PARTIAL',
                                                                        children:
                                                                            'Disponível em horários específicos',
                                                                    }
                                                                ),
                                                            ],
                                                        }
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                    'PARTIAL' === T &&
                                        (0, t.jsxs)('div', {
                                            className: 'space-y-3',
                                            children: [
                                                (0, t.jsxs)('div', {
                                                    className:
                                                        'flex items-center justify-between',
                                                    children: [
                                                        (0, t.jsx)('span', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children:
                                                                'Horários disponíveis',
                                                        }),
                                                        (0, t.jsx)(u.Button, {
                                                            type: 'button',
                                                            variant: 'ghost',
                                                            size: 'sm',
                                                            onClick:
                                                                function () {
                                                                    let e =
                                                                        String(
                                                                            Date.now()
                                                                        );
                                                                    C((t) => [
                                                                        ...t,
                                                                        {
                                                                            id: e,
                                                                            startTime:
                                                                                '09:00',
                                                                            endTime:
                                                                                '18:00',
                                                                        },
                                                                    ]);
                                                                },
                                                            disabled: k,
                                                            children:
                                                                '+ Adicionar intervalo',
                                                        }),
                                                    ],
                                                }),
                                                (0, t.jsx)('div', {
                                                    className: 'space-y-2',
                                                    children: S.map((e) => {
                                                        let a =
                                                            !e.startTime ||
                                                            !e.endTime ||
                                                            e.startTime >=
                                                                e.endTime;
                                                        return (0, t.jsxs)(
                                                            'div',
                                                            {
                                                                className:
                                                                    'grid grid-cols-[1fr,1fr,auto] items-center gap-2',
                                                                children: [
                                                                    (0, t.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'space-y-1',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    t.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-label-small text-content-secondary',
                                                                                            children:
                                                                                                'Início',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    t.jsxs)(
                                                                                        x.Select,
                                                                                        {
                                                                                            value: e.startTime,
                                                                                            onValueChange:
                                                                                                (
                                                                                                    t
                                                                                                ) =>
                                                                                                    E(
                                                                                                        e.id,
                                                                                                        'startTime',
                                                                                                        t
                                                                                                    ),
                                                                                            disabled:
                                                                                                k,
                                                                                            children:
                                                                                                [
                                                                                                    (0,
                                                                                                    t.jsx)(
                                                                                                        x.SelectTrigger,
                                                                                                        {
                                                                                                            className:
                                                                                                                (0,
                                                                                                                g.cn)(
                                                                                                                    a &&
                                                                                                                        'border-destructive focus-visible:ring-destructive/40'
                                                                                                                ),
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
                                                                                                                                    l.Clock,
                                                                                                                                    {
                                                                                                                                        className:
                                                                                                                                            'h-4 w-4 text-content-brand',
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                (0,
                                                                                                                                t.jsx)(
                                                                                                                                    x.SelectValue,
                                                                                                                                    {
                                                                                                                                        placeholder:
                                                                                                                                            'Horário inicial',
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                            ],
                                                                                                                    }
                                                                                                                ),
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    t.jsx)(
                                                                                                        x.SelectContent,
                                                                                                        {
                                                                                                            children:
                                                                                                                v.map(
                                                                                                                    (
                                                                                                                        e
                                                                                                                    ) =>
                                                                                                                        (0,
                                                                                                                        t.jsx)(
                                                                                                                            x.SelectItem,
                                                                                                                            {
                                                                                                                                value: e,
                                                                                                                                children:
                                                                                                                                    e,
                                                                                                                            },
                                                                                                                            e
                                                                                                                        )
                                                                                                                ),
                                                                                                        }
                                                                                                    ),
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    (0, t.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'space-y-1',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    t.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-label-small text-content-secondary',
                                                                                            children:
                                                                                                'Fim',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    t.jsxs)(
                                                                                        x.Select,
                                                                                        {
                                                                                            value: e.endTime,
                                                                                            onValueChange:
                                                                                                (
                                                                                                    t
                                                                                                ) =>
                                                                                                    E(
                                                                                                        e.id,
                                                                                                        'endTime',
                                                                                                        t
                                                                                                    ),
                                                                                            disabled:
                                                                                                k,
                                                                                            children:
                                                                                                [
                                                                                                    (0,
                                                                                                    t.jsx)(
                                                                                                        x.SelectTrigger,
                                                                                                        {
                                                                                                            className:
                                                                                                                (0,
                                                                                                                g.cn)(
                                                                                                                    a &&
                                                                                                                        'border-destructive focus-visible:ring-destructive/40'
                                                                                                                ),
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
                                                                                                                                    l.Clock,
                                                                                                                                    {
                                                                                                                                        className:
                                                                                                                                            'h-4 w-4 text-content-brand',
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                (0,
                                                                                                                                t.jsx)(
                                                                                                                                    x.SelectValue,
                                                                                                                                    {
                                                                                                                                        placeholder:
                                                                                                                                            'Horário final',
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                            ],
                                                                                                                    }
                                                                                                                ),
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    t.jsx)(
                                                                                                        x.SelectContent,
                                                                                                        {
                                                                                                            children:
                                                                                                                v.map(
                                                                                                                    (
                                                                                                                        e
                                                                                                                    ) =>
                                                                                                                        (0,
                                                                                                                        t.jsx)(
                                                                                                                            x.SelectItem,
                                                                                                                            {
                                                                                                                                value: e,
                                                                                                                                children:
                                                                                                                                    e,
                                                                                                                            },
                                                                                                                            e
                                                                                                                        )
                                                                                                                ),
                                                                                                        }
                                                                                                    ),
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
                                                                                'flex items-end justify-end pb-0.5',
                                                                            children:
                                                                                S.length >
                                                                                    1 &&
                                                                                (0,
                                                                                t.jsx)(
                                                                                    u.Button,
                                                                                    {
                                                                                        type: 'button',
                                                                                        variant:
                                                                                            'ghost',
                                                                                        size: 'icon',
                                                                                        onClick:
                                                                                            () => {
                                                                                                var t;
                                                                                                return (
                                                                                                    (t =
                                                                                                        e.id),
                                                                                                    void C(
                                                                                                        (
                                                                                                            e
                                                                                                        ) =>
                                                                                                            e.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e.id !==
                                                                                                                    t
                                                                                                            )
                                                                                                    )
                                                                                                );
                                                                                            },
                                                                                        disabled:
                                                                                            k,
                                                                                        children:
                                                                                            '✕',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                ],
                                                            },
                                                            e.id
                                                        );
                                                    }),
                                                }),
                                                (0, t.jsxs)('p', {
                                                    className:
                                                        'text-paragraph-small-size text-content-secondary',
                                                    children: [
                                                        'Esses horários serão ',
                                                        (0, t.jsx)('strong', {
                                                            children:
                                                                'bloqueados',
                                                        }),
                                                        '. O restante do dia ainda poderá receber agendamentos, seguindo o padrão semanal.',
                                                    ],
                                                }),
                                                O
                                                    ? (0, t.jsx)('p', {
                                                          className:
                                                              'text-[11px] text-destructive',
                                                          children:
                                                              'Em cada intervalo, o horário inicial deve ser menor que o final.',
                                                      })
                                                    : null,
                                            ],
                                        }),
                                    (0, t.jsxs)('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: [
                                            (0, t.jsx)(u.Button, {
                                                type: 'button',
                                                variant: 'ghost',
                                                disabled: k,
                                                onClick: () => {
                                                    (A(), j(!1));
                                                },
                                                children: 'Cancelar',
                                            }),
                                            (0, t.jsxs)(u.Button, {
                                                type: 'button',
                                                variant: 'brand',
                                                onClick: P,
                                                disabled: k || !I,
                                                children: [
                                                    k &&
                                                        (0, t.jsx)(d.Loader2, {
                                                            className:
                                                                'mr-2 h-4 w-4 animate-spin',
                                                        }),
                                                    'Salvar exceção',
                                                ],
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
        e.s(['DailyExceptionModal', () => h], 327948);
    },
    697902,
    (e) => {
        'use strict';
        var t = e.i(565750),
            a = e.i(990341),
            r = e.i(245586),
            n = e.i(230902),
            i = e.i(67356),
            s = e.i(995403),
            o = e.i(519455),
            l = e.i(868499);
        function d({ professionalId: e, dateISO: n, onDelete: i }) {
            let d = (0, r.useRouter)(),
                [c, u] = (0, a.useState)(!1),
                m = async () => {
                    try {
                        if ((u(!0), i))
                            return void (await i({
                                professionalId: e,
                                dateISO: n,
                            }));
                        let t = await fetch(
                                `/api/professional/availability/exceptions?dateISO=${encodeURIComponent(n)}`,
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                }
                            ),
                            a = await t.json();
                        if (!t.ok || !a?.ok)
                            return void s.toast.error(
                                a?.error ?? 'Erro ao remover exceção.'
                            );
                        (s.toast.success('Exceção removida com sucesso.'),
                            d.refresh());
                    } catch {
                        s.toast.error(
                            'Falha ao remover exceção. Tente novamente.'
                        );
                    } finally {
                        u(!1);
                    }
                };
            return (0, t.jsxs)(l.AlertDialog, {
                children: [
                    (0, t.jsx)(l.AlertDialogTrigger, {
                        asChild: !0,
                        children: (0, t.jsx)(o.Button, {
                            type: 'button',
                            variant: 'destructive',
                            size: 'sm',
                            disabled: c,
                            children: 'Excluir',
                        }),
                    }),
                    (0, t.jsxs)(l.AlertDialogContent, {
                        children: [
                            (0, t.jsxs)(l.AlertDialogHeader, {
                                children: [
                                    (0, t.jsx)(l.AlertDialogTitle, {
                                        children: 'Remover exceção deste dia?',
                                    }),
                                    (0, t.jsx)(l.AlertDialogDescription, {
                                        children:
                                            'Este dia voltará a seguir apenas o padrão semanal de disponibilidade. Os horários customizados serão apagados.',
                                    }),
                                ],
                            }),
                            (0, t.jsxs)(l.AlertDialogFooter, {
                                children: [
                                    (0, t.jsx)(l.AlertDialogCancel, {
                                        disabled: c,
                                        children: 'Cancelar',
                                    }),
                                    (0, t.jsx)(l.AlertDialogAction, {
                                        asChild: !0,
                                        children: (0, t.jsx)(o.Button, {
                                            onClick: m,
                                            disabled: c,
                                            variant: 'destructive',
                                            type: 'button',
                                            children: c
                                                ? 'Removendo...'
                                                : 'Remover exceção',
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        let c = 'professional-exceptions:changed';
        function u({ professionalId: e }) {
            let o = (0, r.useRouter)(),
                [l, u] = (0, a.useState)([]),
                [m, p] = (0, a.useState)(!0);
            async function f() {
                p(!0);
                try {
                    let e = await fetch(
                            '/api/professional/availability/exceptions',
                            {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' },
                                cache: 'no-store',
                            }
                        ),
                        t = await e.json();
                    if (!e.ok || !t?.ok) {
                        let e =
                            (t && 'error' in t && t.error) ||
                            'Erro ao buscar exceções.';
                        (s.toast.error(e), u([]));
                        return;
                    }
                    let a = (t.data?.exceptions ?? []).map((e) => {
                        var t;
                        let a = ((t = e.dateISO), String(t ?? '').slice(0, 10)),
                            r = (function (e) {
                                let [t, a, r] = e
                                    .split('-')
                                    .map((e) => Number(e));
                                return new Date(t, (a ?? 1) - 1, r ?? 1);
                            })(a);
                        return (
                            console.group('🗓️ DEBUG EXCEPTION'),
                            console.log('RAW dateISO (API):', e.dateISO),
                            console.log('dateKey (yyyy-MM-dd):', a),
                            console.log('Date local:', r),
                            console.log(
                                'Date local formatted:',
                                (0, n.format)(r, 'yyyy-MM-dd')
                            ),
                            console.log(
                                'Timezone offset (min):',
                                r.getTimezoneOffset()
                            ),
                            console.groupEnd(),
                            {
                                id: e.id,
                                dateKey: a,
                                date: r,
                                type: e.type,
                                intervals: (e.intervals ?? []).map((e) => ({
                                    id: e.id,
                                    startTime: e.startTime,
                                    endTime: e.endTime,
                                })),
                            }
                        );
                    });
                    u(a);
                } catch {
                    (s.toast.error(
                        'Falha ao buscar exceções. Tente novamente.'
                    ),
                        u([]));
                } finally {
                    p(!1);
                }
            }
            ((0, a.useEffect)(() => {
                f();
            }, [e]),
                (0, a.useEffect)(() => {
                    let e = () => void f();
                    return (
                        window.addEventListener(c, e),
                        () => window.removeEventListener(c, e)
                    );
                }, []));
            let x = (0, a.useMemo)(
                () =>
                    [...l].sort((e, t) => e.date.getTime() - t.date.getTime()),
                [l]
            );
            async function g(e) {
                u((t) => t.filter((t) => t.dateKey !== e));
                try {
                    let t = await fetch(
                            `/api/professional/availability/exceptions?dateISO=${encodeURIComponent(e)}`,
                            {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                            }
                        ),
                        a = await t.json();
                    if (!t.ok || !a?.ok) {
                        let e = a?.error ?? 'Erro ao remover exceção.';
                        (s.toast.error(e), u(l));
                        return;
                    }
                    (s.toast.success('Exceção removida com sucesso.'),
                        o.refresh());
                } catch {
                    (s.toast.error(
                        'Falha ao remover exceção. Tente novamente.'
                    ),
                        u(l));
                }
            }
            return (0, t.jsxs)('section', {
                className: 'space-y-3',
                children: [
                    (0, t.jsxs)('div', {
                        children: [
                            (0, t.jsx)('h2', {
                                className:
                                    'text-paragraph-large-size text-content-primary font-semibold',
                                children: 'Exceções por dia',
                            }),
                            (0, t.jsx)('p', {
                                className:
                                    'text-paragraph-small-size text-content-secondary',
                                children:
                                    'Veja e gerencie dias com horários diferentes do padrão semanal.',
                            }),
                        ],
                    }),
                    m
                        ? (0, t.jsx)('div', {
                              className:
                                  'mt-2 rounded-lg border border-dashed border-border-secondary px-4 py-6 text-center text-paragraph-small-size text-content-secondary',
                              children: 'Carregando exceções...',
                          })
                        : 0 === x.length
                          ? (0, t.jsxs)('div', {
                                className:
                                    'mt-2 rounded-lg border border-dashed border-border-secondary px-4 py-6 text-center text-paragraph-small-size text-content-secondary',
                                children: [
                                    'Você ainda não possui nenhuma exceção cadastrada. Use o botão ',
                                    (0, t.jsx)('strong', {
                                        children: 'Criar exceção',
                                    }),
                                    ' para bloquear um dia ou alguns horários específicos.',
                                ],
                            })
                          : (0, t.jsx)('div', {
                                className: 'space-y-2',
                                children: x.map((a) => {
                                    let r = (0, n.format)(
                                            a.date,
                                            "EEEE, dd 'de' MMMM",
                                            { locale: i.ptBR }
                                        ),
                                        s = 'DAY_OFF' === a.type;
                                    return (0, t.jsxs)(
                                        'div',
                                        {
                                            className:
                                                'flex items-start justify-between gap-3 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                            children: [
                                                (0, t.jsxs)('div', {
                                                    className: 'space-y-1',
                                                    children: [
                                                        (0, t.jsx)('p', {
                                                            className:
                                                                'text-paragraph-medium-size text-content-primary font-medium',
                                                            children: r,
                                                        }),
                                                        s
                                                            ? (0, t.jsxs)('p', {
                                                                  className:
                                                                      'text-paragraph-small-size text-content-secondary',
                                                                  children: [
                                                                      (0,
                                                                      t.jsx)(
                                                                          'span',
                                                                          {
                                                                              className:
                                                                                  'font-semibold text-content-destructive',
                                                                              children:
                                                                                  'Dia inteiro indisponível',
                                                                          }
                                                                      ),
                                                                      ' ',
                                                                      '– nenhum horário ficará disponível para agendamento.',
                                                                  ],
                                                              })
                                                            : 0 ===
                                                                a.intervals
                                                                    .length
                                                              ? (0, t.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-paragraph-small-size text-content-secondary',
                                                                        children:
                                                                            'Exceção sem intervalos cadastrados.',
                                                                    }
                                                                )
                                                              : (0, t.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'space-y-1 text-paragraph-small-size text-content-secondary',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                t.jsx)(
                                                                                    'p',
                                                                                    {
                                                                                        className:
                                                                                            'font-medium text-content-primary',
                                                                                        children:
                                                                                            'Horários indisponíveis neste dia:',
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                t.jsx)(
                                                                                    'ul',
                                                                                    {
                                                                                        className:
                                                                                            'flex flex-wrap gap-2 text-[12px]',
                                                                                        children:
                                                                                            a.intervals.map(
                                                                                                (
                                                                                                    e
                                                                                                ) =>
                                                                                                    (0,
                                                                                                    t.jsxs)(
                                                                                                        'li',
                                                                                                        {
                                                                                                            className:
                                                                                                                'rounded-full bg-background-secondary px-2 py-0.5',
                                                                                                            children:
                                                                                                                [
                                                                                                                    e.startTime,
                                                                                                                    ' ',
                                                                                                                    '- ',
                                                                                                                    e.endTime,
                                                                                                                ],
                                                                                                        },
                                                                                                        e.id
                                                                                                    )
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                    ],
                                                }),
                                                (0, t.jsx)(d, {
                                                    professionalId: e,
                                                    dateISO: a.dateKey,
                                                    onDelete: ({
                                                        dateISO: e,
                                                    }) => g(e),
                                                }),
                                            ],
                                        },
                                        a.id
                                    );
                                }),
                            }),
                ],
            });
        }
        e.s(['DailyExceptionsList', () => u], 697902);
    },
    376834,
    (e) => {
        'use strict';
        var t = e.i(565750),
            a = e.i(990341),
            r = e.i(245586),
            n = e.i(995403),
            i = e.i(519455),
            s = e.i(975157),
            o = e.i(967489),
            l = e.i(136764);
        let d = { active: !1, startTime: '00:00', endTime: '23:30' },
            c = [
                { key: 1, label: 'Segunda-feira', short: 'Seg' },
                { key: 2, label: 'Terça-feira', short: 'Ter' },
                { key: 3, label: 'Quarta-feira', short: 'Qua' },
                { key: 4, label: 'Quinta-feira', short: 'Qui' },
                { key: 5, label: 'Sexta-feira', short: 'Sex' },
                { key: 6, label: 'Sábado', short: 'Sáb' },
                { key: 0, label: 'Domingo', short: 'Dom' },
            ],
            u = (() => {
                let e = [];
                for (let t = 0; t <= 23; t++)
                    for (let a = 0; a < 60; a += 30)
                        e.push(
                            `${String(t).padStart(2, '0')}:${String(a).padStart(2, '0')}`
                        );
                return e;
            })();
        function m({
            initialValue: e,
            onChange: r,
            onSave: n,
            isSaving: m = !1,
            leftAction: p,
        }) {
            let [f, x] = (0, a.useState)(
                e ?? {
                    0: { ...d, active: !1 },
                    1: { ...d, active: !0 },
                    2: { ...d, active: !0 },
                    3: { ...d, active: !0 },
                    4: { ...d, active: !0 },
                    5: { ...d, active: !0 },
                    6: { ...d, active: !0 },
                }
            );
            ((0, a.useEffect)(() => {
                e && x(e);
            }, [e]),
                (0, a.useEffect)(() => {
                    r?.(f);
                }, [f, r]));
            let g = (e, t, a) => {
                    x((r) => ({ ...r, [e]: { ...r[e], [t]: a } }));
                },
                v = async () => {
                    let e = Object.entries(f).map(([e, t]) => ({
                        weekday: Number(e),
                        active: t.active,
                        startTime: t.startTime,
                        endTime: t.endTime,
                    }));
                    await n({ days: e });
                };
            return (0, t.jsxs)('div', {
                className: 'space-y-4',
                children: [
                    (0, t.jsxs)('div', {
                        className:
                            'flex flex-wrap items-center justify-end gap-3',
                        children: [
                            p,
                            (0, t.jsx)(i.Button, {
                                type: 'button',
                                variant: 'edit2',
                                size: 'sm',
                                onClick: v,
                                disabled: m,
                                children: m
                                    ? 'Salvando...'
                                    : 'Salvar padrão semanal',
                            }),
                        ],
                    }),
                    (0, t.jsx)('div', {
                        className:
                            'grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7',
                        children: c.map((e) => {
                            let a = f[e.key],
                                r =
                                    a.active &&
                                    a.startTime &&
                                    a.endTime &&
                                    a.startTime >= a.endTime;
                            return (0, t.jsxs)(
                                'div',
                                {
                                    className: (0, s.cn)(
                                        'flex flex-col rounded-xl border px-3 py-3 text-paragraph-small-size transition-colors',
                                        a.active
                                            ? 'border-border-brand bg-background-tertiary/80'
                                            : 'border-border-secondary bg-background-tertiary'
                                    ),
                                    children: [
                                        (0, t.jsxs)('div', {
                                            className:
                                                'mb-2 flex items-center justify-between gap-2',
                                            children: [
                                                (0, t.jsxs)('div', {
                                                    className: 'flex flex-col',
                                                    children: [
                                                        (0, t.jsx)('span', {
                                                            className:
                                                                'text-content-primary font-medium',
                                                            children: e.short,
                                                        }),
                                                        (0, t.jsx)('span', {
                                                            className:
                                                                'text-[11px] text-content-primary',
                                                            children: e.label,
                                                        }),
                                                    ],
                                                }),
                                                (0, t.jsx)('button', {
                                                    type: 'button',
                                                    onClick: () => {
                                                        var t;
                                                        return (
                                                            (t = e.key),
                                                            void x((e) => ({
                                                                ...e,
                                                                [t]: {
                                                                    ...e[t],
                                                                    active: !e[
                                                                        t
                                                                    ].active,
                                                                },
                                                            }))
                                                        );
                                                    },
                                                    disabled: m,
                                                    className: (0, s.cn)(
                                                        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors',
                                                        a.active
                                                            ? 'bg-background-brand text-content-on-brand'
                                                            : 'bg-background-primary text-content-secondary border border-border-secondary',
                                                        m &&
                                                            'opacity-60 cursor-not-allowed'
                                                    ),
                                                    children: a.active
                                                        ? 'Sim'
                                                        : 'Não',
                                                }),
                                            ],
                                        }),
                                        (0, t.jsxs)('div', {
                                            className: 'mt-auto space-y-2',
                                            children: [
                                                (0, t.jsxs)('div', {
                                                    className:
                                                        'flex flex-col gap-1',
                                                    children: [
                                                        (0, t.jsx)('span', {
                                                            className:
                                                                'text-[11px] text-content-primary',
                                                            children: 'Das',
                                                        }),
                                                        (0, t.jsxs)(o.Select, {
                                                            value: a.startTime,
                                                            onValueChange: (
                                                                t
                                                            ) =>
                                                                g(
                                                                    e.key,
                                                                    'startTime',
                                                                    t
                                                                ),
                                                            disabled:
                                                                !a.active || m,
                                                            children: [
                                                                (0, t.jsx)(
                                                                    o.SelectTrigger,
                                                                    {
                                                                        className:
                                                                            (0,
                                                                            s.cn)(
                                                                                'h-9 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                                r &&
                                                                                    'border-destructive focus-visible:ring-destructive/40'
                                                                            ),
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
                                                                                                l.Clock,
                                                                                                {
                                                                                                    className:
                                                                                                        'h-4 w-4 text-content-brand',
                                                                                                }
                                                                                            ),
                                                                                            (0,
                                                                                            t.jsx)(
                                                                                                o.SelectValue,
                                                                                                {
                                                                                                    placeholder:
                                                                                                        'Horário inicial',
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                (0, t.jsx)(
                                                                    o.SelectContent,
                                                                    {
                                                                        children:
                                                                            u.map(
                                                                                (
                                                                                    e
                                                                                ) =>
                                                                                    (0,
                                                                                    t.jsx)(
                                                                                        o.SelectItem,
                                                                                        {
                                                                                            value: e,
                                                                                            children:
                                                                                                e,
                                                                                        },
                                                                                        e
                                                                                    )
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, t.jsxs)('div', {
                                                    className:
                                                        'flex flex-col gap-1',
                                                    children: [
                                                        (0, t.jsx)('span', {
                                                            className:
                                                                'text-[11px] text-content-primary',
                                                            children: 'Até',
                                                        }),
                                                        (0, t.jsxs)(o.Select, {
                                                            value: a.endTime,
                                                            onValueChange: (
                                                                t
                                                            ) =>
                                                                g(
                                                                    e.key,
                                                                    'endTime',
                                                                    t
                                                                ),
                                                            disabled:
                                                                !a.active || m,
                                                            children: [
                                                                (0, t.jsx)(
                                                                    o.SelectTrigger,
                                                                    {
                                                                        className:
                                                                            (0,
                                                                            s.cn)(
                                                                                'h-9 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                                r &&
                                                                                    'border-destructive focus-visible:ring-destructive/40'
                                                                            ),
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
                                                                                                l.Clock,
                                                                                                {
                                                                                                    className:
                                                                                                        'h-4 w-4 text-content-brand',
                                                                                                }
                                                                                            ),
                                                                                            (0,
                                                                                            t.jsx)(
                                                                                                o.SelectValue,
                                                                                                {
                                                                                                    placeholder:
                                                                                                        'Horário final',
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                (0, t.jsx)(
                                                                    o.SelectContent,
                                                                    {
                                                                        children:
                                                                            u.map(
                                                                                (
                                                                                    e
                                                                                ) =>
                                                                                    (0,
                                                                                    t.jsx)(
                                                                                        o.SelectItem,
                                                                                        {
                                                                                            value: e,
                                                                                            children:
                                                                                                e,
                                                                                        },
                                                                                        e
                                                                                    )
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                },
                                e.key
                            );
                        }),
                    }),
                    (0, t.jsx)('p', {
                        className: 'text-[11px] text-content-secondary',
                        children:
                            'Marque apenas os dias em que você trabalha e ajuste os horários. As exceções por dia (folgas, eventos, etc.) são configuradas logo abaixo.',
                    }),
                    Object.values(f).some(
                        (e) =>
                            e.active &&
                            e.startTime &&
                            e.endTime &&
                            e.startTime >= e.endTime
                    )
                        ? (0, t.jsx)('p', {
                              className: 'text-[11px] text-destructive',
                              children:
                                  'Em dias ativos, o horário inicial deve ser menor que o final.',
                          })
                        : null,
                ],
            });
        }
        function p({ initialValue: e, leftAction: i }) {
            let s = (0, r.useRouter)(),
                [o, l] = (0, a.useState)(!1);
            async function d(e) {
                l(!0);
                try {
                    let t = await fetch(
                            '/api/professional/availability/weekly',
                            {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(e),
                            }
                        ),
                        a = await t.json();
                    if (!t.ok || !a?.ok) {
                        let e =
                            (a && 'error' in a && a.error) ||
                            'Erro ao salvar disponibilidade.';
                        n.toast.error(e);
                        return;
                    }
                    (n.toast.success(
                        'Disponibilidade semanal salva com sucesso!'
                    ),
                        s.refresh());
                } catch {
                    n.toast.error(
                        'Falha ao salvar disponibilidade. Tente novamente.'
                    );
                } finally {
                    l(!1);
                }
            }
            return (0, t.jsx)(m, {
                initialValue: e,
                onSave: d,
                isSaving: o,
                leftAction: i,
            });
        }
        e.s(['WeeklyAvailabilityClient', () => p], 376834);
    },
]);
