(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
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
            r = e.i(403078),
            n = e.i(565750),
            o = Object.freeze({
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
                (0, n.jsx)(r.Primitive.span, {
                    ...e,
                    ref: t,
                    style: { ...o, ...e.style },
                })
            );
        ((i.displayName = 'VisuallyHidden'),
            e.s(['Root', () => i, 'VISUALLY_HIDDEN_STYLES', () => o]));
    },
    672687,
    (e) => {
        'use strict';
        var t = e.i(990341);
        function r(e, t) {
            if ('function' == typeof e) return e(t);
            null != e && (e.current = t);
        }
        function n(...e) {
            return (t) => {
                let n = !1,
                    o = e.map((e) => {
                        let o = r(e, t);
                        return (n || 'function' != typeof o || (n = !0), o);
                    });
                if (n)
                    return () => {
                        for (let t = 0; t < o.length; t++) {
                            let n = o[t];
                            'function' == typeof n ? n() : r(e[t], null);
                        }
                    };
            };
        }
        function o(...e) {
            return t.useCallback(n(...e), e);
        }
        e.s(['composeRefs', () => n, 'useComposedRefs', () => o]);
    },
    939476,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(672687),
            n = e.i(565750),
            o = Symbol.for('react.lazy'),
            i = t[' use '.trim().toString()];
        function a(e) {
            var t;
            return (
                null != e &&
                'object' == typeof e &&
                '$$typeof' in e &&
                e.$$typeof === o &&
                '_payload' in e &&
                'object' == typeof (t = e._payload) &&
                null !== t &&
                'then' in t
            );
        }
        function l(e) {
            var o;
            let l,
                s =
                    ((o = e),
                    ((l = t.forwardRef((e, n) => {
                        let { children: o, ...l } = e;
                        if (
                            (a(o) &&
                                'function' == typeof i &&
                                (o = i(o._payload)),
                            t.isValidElement(o))
                        ) {
                            var s;
                            let e,
                                i,
                                a =
                                    ((s = o),
                                    (i =
                                        (e = Object.getOwnPropertyDescriptor(
                                            s.props,
                                            'ref'
                                        )?.get) &&
                                        'isReactWarning' in e &&
                                        e.isReactWarning)
                                        ? s.ref
                                        : (i =
                                                (e =
                                                    Object.getOwnPropertyDescriptor(
                                                        s,
                                                        'ref'
                                                    )?.get) &&
                                                'isReactWarning' in e &&
                                                e.isReactWarning)
                                          ? s.props.ref
                                          : s.props.ref || s.ref),
                                u = (function (e, t) {
                                    let r = { ...t };
                                    for (let n in t) {
                                        let o = e[n],
                                            i = t[n];
                                        /^on[A-Z]/.test(n)
                                            ? o && i
                                                ? (r[n] = (...e) => {
                                                      let t = i(...e);
                                                      return (o(...e), t);
                                                  })
                                                : o && (r[n] = o)
                                            : 'style' === n
                                              ? (r[n] = { ...o, ...i })
                                              : 'className' === n &&
                                                (r[n] = [o, i]
                                                    .filter(Boolean)
                                                    .join(' '));
                                    }
                                    return { ...e, ...r };
                                })(l, o.props);
                            return (
                                o.type !== t.Fragment &&
                                    (u.ref = n ? (0, r.composeRefs)(n, a) : a),
                                t.cloneElement(o, u)
                            );
                        }
                        return t.Children.count(o) > 1
                            ? t.Children.only(null)
                            : null;
                    })).displayName = `${o}.SlotClone`),
                    l),
                u = t.forwardRef((e, r) => {
                    let { children: o, ...l } = e;
                    a(o) && 'function' == typeof i && (o = i(o._payload));
                    let u = t.Children.toArray(o),
                        c = u.find(d);
                    if (c) {
                        let e = c.props.children,
                            o = u.map((r) =>
                                r !== c
                                    ? r
                                    : t.Children.count(e) > 1
                                      ? t.Children.only(null)
                                      : t.isValidElement(e)
                                        ? e.props.children
                                        : null
                            );
                        return (0, n.jsx)(s, {
                            ...l,
                            ref: r,
                            children: t.isValidElement(e)
                                ? t.cloneElement(e, void 0, o)
                                : null,
                        });
                    }
                    return (0, n.jsx)(s, { ...l, ref: r, children: o });
                });
            return ((u.displayName = `${e}.Slot`), u);
        }
        var s = l('Slot'),
            u = Symbol('radix.slottable');
        function d(e) {
            return (
                t.isValidElement(e) &&
                'function' == typeof e.type &&
                '__radixId' in e.type &&
                e.type.__radixId === u
            );
        }
        e.s(['Slot', () => s, 'createSlot', () => l]);
    },
    519455,
    294237,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(939476),
            n = e.i(7284);
        let o = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
            i = n.clsx,
            a = (e, t) => (r) => {
                var n;
                if ((null == t ? void 0 : t.variants) == null)
                    return i(
                        e,
                        null == r ? void 0 : r.class,
                        null == r ? void 0 : r.className
                    );
                let { variants: a, defaultVariants: l } = t,
                    s = Object.keys(a).map((e) => {
                        let t = null == r ? void 0 : r[e],
                            n = null == l ? void 0 : l[e];
                        if (null === t) return null;
                        let i = o(t) || o(n);
                        return a[e][i];
                    }),
                    u =
                        r &&
                        Object.entries(r).reduce((e, t) => {
                            let [r, n] = t;
                            return (void 0 === n || (e[r] = n), e);
                        }, {});
                return i(
                    e,
                    s,
                    null == t || null == (n = t.compoundVariants)
                        ? void 0
                        : n.reduce((e, t) => {
                              let { class: r, className: n, ...o } = t;
                              return Object.entries(o).every((e) => {
                                  let [t, r] = e;
                                  return Array.isArray(r)
                                      ? r.includes({ ...l, ...u }[t])
                                      : { ...l, ...u }[t] === r;
                              })
                                  ? [...e, r, n]
                                  : e;
                          }, []),
                    null == r ? void 0 : r.class,
                    null == r ? void 0 : r.className
                );
            };
        e.s(['cva', 0, a], 294237);
        var l = e.i(975157);
        let s = a(
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
        function u({
            className: e,
            variant: n,
            size: o,
            asChild: i = !1,
            ...a
        }) {
            let u = i ? r.Slot : 'button';
            return (0, t.jsx)(u, {
                'data-slot': 'button',
                className: (0, l.cn)(s({ variant: n, size: o, className: e })),
                ...a,
            });
        }
        e.s(['Button', () => u, 'buttonVariants', () => s], 519455);
    },
    861181,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(672687),
            n = e.i(150076),
            o = (e) => {
                var o;
                let a,
                    l,
                    { present: s, children: u } = e,
                    d = (function (e) {
                        var r, o;
                        let [a, l] = t.useState(),
                            s = t.useRef(null),
                            u = t.useRef(e),
                            d = t.useRef('none'),
                            [c, p] =
                                ((r = e ? 'mounted' : 'unmounted'),
                                (o = {
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
                                t.useReducer((e, t) => o[e][t] ?? e, r));
                        return (
                            t.useEffect(() => {
                                let e = i(s.current);
                                d.current = 'mounted' === c ? e : 'none';
                            }, [c]),
                            (0, n.useLayoutEffect)(() => {
                                let t = s.current,
                                    r = u.current;
                                if (r !== e) {
                                    let n = d.current,
                                        o = i(t);
                                    (e
                                        ? p('MOUNT')
                                        : 'none' === o || t?.display === 'none'
                                          ? p('UNMOUNT')
                                          : r && n !== o
                                            ? p('ANIMATION_OUT')
                                            : p('UNMOUNT'),
                                        (u.current = e));
                                }
                            }, [e, p]),
                            (0, n.useLayoutEffect)(() => {
                                if (a) {
                                    let e,
                                        t =
                                            a.ownerDocument.defaultView ??
                                            window,
                                        r = (r) => {
                                            let n = i(s.current).includes(
                                                CSS.escape(r.animationName)
                                            );
                                            if (
                                                r.target === a &&
                                                n &&
                                                (p('ANIMATION_END'), !u.current)
                                            ) {
                                                let r =
                                                    a.style.animationFillMode;
                                                ((a.style.animationFillMode =
                                                    'forwards'),
                                                    (e = t.setTimeout(() => {
                                                        'forwards' ===
                                                            a.style
                                                                .animationFillMode &&
                                                            (a.style.animationFillMode =
                                                                r);
                                                    })));
                                            }
                                        },
                                        n = (e) => {
                                            e.target === a &&
                                                (d.current = i(s.current));
                                        };
                                    return (
                                        a.addEventListener('animationstart', n),
                                        a.addEventListener(
                                            'animationcancel',
                                            r
                                        ),
                                        a.addEventListener('animationend', r),
                                        () => {
                                            (t.clearTimeout(e),
                                                a.removeEventListener(
                                                    'animationstart',
                                                    n
                                                ),
                                                a.removeEventListener(
                                                    'animationcancel',
                                                    r
                                                ),
                                                a.removeEventListener(
                                                    'animationend',
                                                    r
                                                ));
                                        }
                                    );
                                }
                                p('ANIMATION_END');
                            }, [a, p]),
                            {
                                isPresent: [
                                    'mounted',
                                    'unmountSuspended',
                                ].includes(c),
                                ref: t.useCallback((e) => {
                                    ((s.current = e
                                        ? getComputedStyle(e)
                                        : null),
                                        l(e));
                                }, []),
                            }
                        );
                    })(s),
                    c =
                        'function' == typeof u
                            ? u({ present: d.isPresent })
                            : t.Children.only(u),
                    p = (0, r.useComposedRefs)(
                        d.ref,
                        ((o = c),
                        (l =
                            (a = Object.getOwnPropertyDescriptor(
                                o.props,
                                'ref'
                            )?.get) &&
                            'isReactWarning' in a &&
                            a.isReactWarning)
                            ? o.ref
                            : (l =
                                    (a = Object.getOwnPropertyDescriptor(
                                        o,
                                        'ref'
                                    )?.get) &&
                                    'isReactWarning' in a &&
                                    a.isReactWarning)
                              ? o.props.ref
                              : o.props.ref || o.ref)
                    );
                return 'function' == typeof u || d.isPresent
                    ? t.cloneElement(c, { ref: p })
                    : null;
            };
        function i(e) {
            return e?.animationName || 'none';
        }
        ((o.displayName = 'Presence'), e.s(['Presence', () => o]));
    },
    276389,
    (e) => {
        'use strict';
        var t = e.i(98556);
        e.s(['Calendar', () => t.default]);
    },
    512710,
    (e) => {
        'use strict';
        var t = e.i(158166);
        e.s(['ChevronDown', () => t.default]);
    },
    51866,
    87912,
    83972,
    746798,
    (e) => {
        'use strict';
        var t = e.i(926991);
        e.s(['ChevronLeft', () => t.default], 51866);
        var r = e.i(859502);
        e.s(['ChevronRight', () => r.default], 87912);
        var n = e.i(990341),
            o = e.i(291967),
            i = e.i(672687),
            a = e.i(784711),
            l = e.i(846357),
            s = e.i(910529),
            u = e.i(75355),
            d = e.i(546354),
            c = e.i(861181),
            p = e.i(403078),
            f = e.i(655875),
            m = e.i(695145),
            g = e.i(880282),
            h = e.i(565750),
            [v, b] = (0, a.createContextScope)('Tooltip', [
                u.createPopperScope,
            ]),
            x = (0, u.createPopperScope)(),
            y = 'TooltipProvider',
            w = 'tooltip.open',
            [C, T] = v(y),
            j = (e) => {
                let {
                        __scopeTooltip: t,
                        delayDuration: r = 700,
                        skipDelayDuration: o = 300,
                        disableHoverableContent: i = !1,
                        children: a,
                    } = e,
                    l = n.useRef(!0),
                    s = n.useRef(!1),
                    u = n.useRef(0);
                return (
                    n.useEffect(() => {
                        let e = u.current;
                        return () => window.clearTimeout(e);
                    }, []),
                    (0, h.jsx)(C, {
                        scope: t,
                        isOpenDelayedRef: l,
                        delayDuration: r,
                        onOpen: n.useCallback(() => {
                            (window.clearTimeout(u.current), (l.current = !1));
                        }, []),
                        onClose: n.useCallback(() => {
                            (window.clearTimeout(u.current),
                                (u.current = window.setTimeout(
                                    () => (l.current = !0),
                                    o
                                )));
                        }, [o]),
                        isPointerInTransitRef: s,
                        onPointerInTransitChange: n.useCallback((e) => {
                            s.current = e;
                        }, []),
                        disableHoverableContent: i,
                        children: a,
                    })
                );
            };
        j.displayName = y;
        var E = 'Tooltip',
            [N, R] = v(E),
            P = (e) => {
                let {
                        __scopeTooltip: t,
                        children: r,
                        open: o,
                        defaultOpen: i,
                        onOpenChange: a,
                        disableHoverableContent: l,
                        delayDuration: d,
                    } = e,
                    c = T(E, e.__scopeTooltip),
                    p = x(t),
                    [f, g] = n.useState(null),
                    v = (0, s.useId)(),
                    b = n.useRef(0),
                    y = l ?? c.disableHoverableContent,
                    C = d ?? c.delayDuration,
                    j = n.useRef(!1),
                    [R, P] = (0, m.useControllableState)({
                        prop: o,
                        defaultProp: i ?? !1,
                        onChange: (e) => {
                            (e
                                ? (c.onOpen(),
                                  document.dispatchEvent(new CustomEvent(w)))
                                : c.onClose(),
                                a?.(e));
                        },
                        caller: E,
                    }),
                    k = n.useMemo(
                        () =>
                            R
                                ? j.current
                                    ? 'delayed-open'
                                    : 'instant-open'
                                : 'closed',
                        [R]
                    ),
                    M = n.useCallback(() => {
                        (window.clearTimeout(b.current),
                            (b.current = 0),
                            (j.current = !1),
                            P(!0));
                    }, [P]),
                    S = n.useCallback(() => {
                        (window.clearTimeout(b.current),
                            (b.current = 0),
                            P(!1));
                    }, [P]),
                    O = n.useCallback(() => {
                        (window.clearTimeout(b.current),
                            (b.current = window.setTimeout(() => {
                                ((j.current = !0), P(!0), (b.current = 0));
                            }, C)));
                    }, [C, P]);
                return (
                    n.useEffect(
                        () => () => {
                            b.current &&
                                (window.clearTimeout(b.current),
                                (b.current = 0));
                        },
                        []
                    ),
                    (0, h.jsx)(u.Root, {
                        ...p,
                        children: (0, h.jsx)(N, {
                            scope: t,
                            contentId: v,
                            open: R,
                            stateAttribute: k,
                            trigger: f,
                            onTriggerChange: g,
                            onTriggerEnter: n.useCallback(() => {
                                c.isOpenDelayedRef.current ? O() : M();
                            }, [c.isOpenDelayedRef, O, M]),
                            onTriggerLeave: n.useCallback(() => {
                                y
                                    ? S()
                                    : (window.clearTimeout(b.current),
                                      (b.current = 0));
                            }, [S, y]),
                            onOpen: M,
                            onClose: S,
                            disableHoverableContent: y,
                            children: r,
                        }),
                    })
                );
            };
        P.displayName = E;
        var k = 'TooltipTrigger',
            M = n.forwardRef((e, t) => {
                let { __scopeTooltip: r, ...a } = e,
                    l = R(k, r),
                    s = T(k, r),
                    d = x(r),
                    c = n.useRef(null),
                    f = (0, i.useComposedRefs)(t, c, l.onTriggerChange),
                    m = n.useRef(!1),
                    g = n.useRef(!1),
                    v = n.useCallback(() => (m.current = !1), []);
                return (
                    n.useEffect(
                        () => () =>
                            document.removeEventListener('pointerup', v),
                        [v]
                    ),
                    (0, h.jsx)(u.Anchor, {
                        asChild: !0,
                        ...d,
                        children: (0, h.jsx)(p.Primitive.button, {
                            'aria-describedby': l.open ? l.contentId : void 0,
                            'data-state': l.stateAttribute,
                            ...a,
                            ref: f,
                            onPointerMove: (0, o.composeEventHandlers)(
                                e.onPointerMove,
                                (e) => {
                                    'touch' !== e.pointerType &&
                                        (g.current ||
                                            s.isPointerInTransitRef.current ||
                                            (l.onTriggerEnter(),
                                            (g.current = !0)));
                                }
                            ),
                            onPointerLeave: (0, o.composeEventHandlers)(
                                e.onPointerLeave,
                                () => {
                                    (l.onTriggerLeave(), (g.current = !1));
                                }
                            ),
                            onPointerDown: (0, o.composeEventHandlers)(
                                e.onPointerDown,
                                () => {
                                    (l.open && l.onClose(),
                                        (m.current = !0),
                                        document.addEventListener(
                                            'pointerup',
                                            v,
                                            { once: !0 }
                                        ));
                                }
                            ),
                            onFocus: (0, o.composeEventHandlers)(
                                e.onFocus,
                                () => {
                                    m.current || l.onOpen();
                                }
                            ),
                            onBlur: (0, o.composeEventHandlers)(
                                e.onBlur,
                                l.onClose
                            ),
                            onClick: (0, o.composeEventHandlers)(
                                e.onClick,
                                l.onClose
                            ),
                        }),
                    })
                );
            });
        M.displayName = k;
        var S = 'TooltipPortal',
            [O, D] = v(S, { forceMount: void 0 }),
            L = (e) => {
                let {
                        __scopeTooltip: t,
                        forceMount: r,
                        children: n,
                        container: o,
                    } = e,
                    i = R(S, t);
                return (0, h.jsx)(O, {
                    scope: t,
                    forceMount: r,
                    children: (0, h.jsx)(c.Presence, {
                        present: r || i.open,
                        children: (0, h.jsx)(d.Portal, {
                            asChild: !0,
                            container: o,
                            children: n,
                        }),
                    }),
                });
            };
        L.displayName = S;
        var _ = 'TooltipContent',
            A = n.forwardRef((e, t) => {
                let r = D(_, e.__scopeTooltip),
                    { forceMount: n = r.forceMount, side: o = 'top', ...i } = e,
                    a = R(_, e.__scopeTooltip);
                return (0, h.jsx)(c.Presence, {
                    present: n || a.open,
                    children: a.disableHoverableContent
                        ? (0, h.jsx)(V, { side: o, ...i, ref: t })
                        : (0, h.jsx)(I, { side: o, ...i, ref: t }),
                });
            }),
            I = n.forwardRef((e, t) => {
                let r = R(_, e.__scopeTooltip),
                    o = T(_, e.__scopeTooltip),
                    a = n.useRef(null),
                    l = (0, i.useComposedRefs)(t, a),
                    [s, u] = n.useState(null),
                    { trigger: d, onClose: c } = r,
                    p = a.current,
                    { onPointerInTransitChange: f } = o,
                    m = n.useCallback(() => {
                        (u(null), f(!1));
                    }, [f]),
                    g = n.useCallback(
                        (e, t) => {
                            let r,
                                n = e.currentTarget,
                                o = { x: e.clientX, y: e.clientY },
                                i = (function (e, t) {
                                    let r = Math.abs(t.top - e.y),
                                        n = Math.abs(t.bottom - e.y),
                                        o = Math.abs(t.right - e.x),
                                        i = Math.abs(t.left - e.x);
                                    switch (Math.min(r, n, o, i)) {
                                        case i:
                                            return 'left';
                                        case o:
                                            return 'right';
                                        case r:
                                            return 'top';
                                        case n:
                                            return 'bottom';
                                        default:
                                            throw Error('unreachable');
                                    }
                                })(o, n.getBoundingClientRect());
                            (u(
                                ((r = [
                                    ...(function (e, t, r = 5) {
                                        let n = [];
                                        switch (t) {
                                            case 'top':
                                                n.push(
                                                    { x: e.x - r, y: e.y + r },
                                                    { x: e.x + r, y: e.y + r }
                                                );
                                                break;
                                            case 'bottom':
                                                n.push(
                                                    { x: e.x - r, y: e.y - r },
                                                    { x: e.x + r, y: e.y - r }
                                                );
                                                break;
                                            case 'left':
                                                n.push(
                                                    { x: e.x + r, y: e.y - r },
                                                    { x: e.x + r, y: e.y + r }
                                                );
                                                break;
                                            case 'right':
                                                n.push(
                                                    { x: e.x - r, y: e.y - r },
                                                    { x: e.x - r, y: e.y + r }
                                                );
                                        }
                                        return n;
                                    })(o, i),
                                    ...(function (e) {
                                        let {
                                            top: t,
                                            right: r,
                                            bottom: n,
                                            left: o,
                                        } = e;
                                        return [
                                            { x: o, y: t },
                                            { x: r, y: t },
                                            { x: r, y: n },
                                            { x: o, y: n },
                                        ];
                                    })(t.getBoundingClientRect()),
                                ].slice()).sort((e, t) =>
                                    e.x < t.x
                                        ? -1
                                        : e.x > t.x
                                          ? 1
                                          : e.y < t.y
                                            ? -1
                                            : 1 * !!(e.y > t.y)
                                ),
                                (function (e) {
                                    if (e.length <= 1) return e.slice();
                                    let t = [];
                                    for (let r = 0; r < e.length; r++) {
                                        let n = e[r];
                                        for (; t.length >= 2; ) {
                                            let e = t[t.length - 1],
                                                r = t[t.length - 2];
                                            if (
                                                (e.x - r.x) * (n.y - r.y) >=
                                                (e.y - r.y) * (n.x - r.x)
                                            )
                                                t.pop();
                                            else break;
                                        }
                                        t.push(n);
                                    }
                                    t.pop();
                                    let r = [];
                                    for (let t = e.length - 1; t >= 0; t--) {
                                        let n = e[t];
                                        for (; r.length >= 2; ) {
                                            let e = r[r.length - 1],
                                                t = r[r.length - 2];
                                            if (
                                                (e.x - t.x) * (n.y - t.y) >=
                                                (e.y - t.y) * (n.x - t.x)
                                            )
                                                r.pop();
                                            else break;
                                        }
                                        r.push(n);
                                    }
                                    return (r.pop(),
                                    1 === t.length &&
                                        1 === r.length &&
                                        t[0].x === r[0].x &&
                                        t[0].y === r[0].y)
                                        ? t
                                        : t.concat(r);
                                })(r))
                            ),
                                f(!0));
                        },
                        [f]
                    );
                return (
                    n.useEffect(() => () => m(), [m]),
                    n.useEffect(() => {
                        if (d && p) {
                            let e = (e) => g(e, p),
                                t = (e) => g(e, d);
                            return (
                                d.addEventListener('pointerleave', e),
                                p.addEventListener('pointerleave', t),
                                () => {
                                    (d.removeEventListener('pointerleave', e),
                                        p.removeEventListener(
                                            'pointerleave',
                                            t
                                        ));
                                }
                            );
                        }
                    }, [d, p, g, m]),
                    n.useEffect(() => {
                        if (s) {
                            let e = (e) => {
                                let t = e.target,
                                    r = { x: e.clientX, y: e.clientY },
                                    n = d?.contains(t) || p?.contains(t),
                                    o = !(function (e, t) {
                                        let { x: r, y: n } = e,
                                            o = !1;
                                        for (
                                            let e = 0, i = t.length - 1;
                                            e < t.length;
                                            i = e++
                                        ) {
                                            let a = t[e],
                                                l = t[i],
                                                s = a.x,
                                                u = a.y,
                                                d = l.x,
                                                c = l.y;
                                            u > n != c > n &&
                                                r <
                                                    ((d - s) * (n - u)) /
                                                        (c - u) +
                                                        s &&
                                                (o = !o);
                                        }
                                        return o;
                                    })(r, s);
                                n ? m() : o && (m(), c());
                            };
                            return (
                                document.addEventListener('pointermove', e),
                                () =>
                                    document.removeEventListener(
                                        'pointermove',
                                        e
                                    )
                            );
                        }
                    }, [d, p, s, c, m]),
                    (0, h.jsx)(V, { ...e, ref: l })
                );
            }),
            [U, B] = v(E, { isInside: !1 }),
            F = (0, f.createSlottable)('TooltipContent'),
            V = n.forwardRef((e, t) => {
                let {
                        __scopeTooltip: r,
                        children: o,
                        'aria-label': i,
                        onEscapeKeyDown: a,
                        onPointerDownOutside: s,
                        ...d
                    } = e,
                    c = R(_, r),
                    p = x(r),
                    { onClose: f } = c;
                return (
                    n.useEffect(
                        () => (
                            document.addEventListener(w, f),
                            () => document.removeEventListener(w, f)
                        ),
                        [f]
                    ),
                    n.useEffect(() => {
                        if (c.trigger) {
                            let e = (e) => {
                                let t = e.target;
                                t?.contains(c.trigger) && f();
                            };
                            return (
                                window.addEventListener('scroll', e, {
                                    capture: !0,
                                }),
                                () =>
                                    window.removeEventListener('scroll', e, {
                                        capture: !0,
                                    })
                            );
                        }
                    }, [c.trigger, f]),
                    (0, h.jsx)(l.DismissableLayer, {
                        asChild: !0,
                        disableOutsidePointerEvents: !1,
                        onEscapeKeyDown: a,
                        onPointerDownOutside: s,
                        onFocusOutside: (e) => e.preventDefault(),
                        onDismiss: f,
                        children: (0, h.jsxs)(u.Content, {
                            'data-state': c.stateAttribute,
                            ...p,
                            ...d,
                            ref: t,
                            style: {
                                ...d.style,
                                '--radix-tooltip-content-transform-origin':
                                    'var(--radix-popper-transform-origin)',
                                '--radix-tooltip-content-available-width':
                                    'var(--radix-popper-available-width)',
                                '--radix-tooltip-content-available-height':
                                    'var(--radix-popper-available-height)',
                                '--radix-tooltip-trigger-width':
                                    'var(--radix-popper-anchor-width)',
                                '--radix-tooltip-trigger-height':
                                    'var(--radix-popper-anchor-height)',
                            },
                            children: [
                                (0, h.jsx)(F, { children: o }),
                                (0, h.jsx)(U, {
                                    scope: r,
                                    isInside: !0,
                                    children: (0, h.jsx)(g.Root, {
                                        id: c.contentId,
                                        role: 'tooltip',
                                        children: i || o,
                                    }),
                                }),
                            ],
                        }),
                    })
                );
            });
        A.displayName = _;
        var z = 'TooltipArrow',
            H = n.forwardRef((e, t) => {
                let { __scopeTooltip: r, ...n } = e,
                    o = x(r);
                return B(z, r).isInside
                    ? null
                    : (0, h.jsx)(u.Arrow, { ...o, ...n, ref: t });
            });
        ((H.displayName = z),
            e.s(
                [
                    'Arrow',
                    () => H,
                    'Content',
                    () => A,
                    'Portal',
                    () => L,
                    'Provider',
                    () => j,
                    'Root',
                    () => P,
                    'TooltipProvider',
                    () => j,
                    'Trigger',
                    () => M,
                ],
                83972
            ));
        var $ = e.i(975157);
        function W({ delayDuration: e = 0, ...t }) {
            return (0, h.jsx)(j, {
                'data-slot': 'tooltip-provider',
                delayDuration: e,
                ...t,
            });
        }
        function Y({ ...e }) {
            return (0, h.jsx)(W, {
                children: (0, h.jsx)(P, { 'data-slot': 'tooltip', ...e }),
            });
        }
        function K({ ...e }) {
            return (0, h.jsx)(M, { 'data-slot': 'tooltip-trigger', ...e });
        }
        function X({ className: e, sideOffset: t = 0, children: r, ...n }) {
            return (0, h.jsx)(L, {
                children: (0, h.jsxs)(A, {
                    'data-slot': 'tooltip-content',
                    sideOffset: t,
                    className: (0, $.cn)(
                        'bg-foreground-primary text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
                        e
                    ),
                    ...n,
                    children: [r, (0, h.jsx)(H, {})],
                }),
            });
        }
        e.s(
            [
                'Tooltip',
                () => Y,
                'TooltipContent',
                () => X,
                'TooltipTrigger',
                () => K,
            ],
            746798
        );
    },
    825296,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(276389),
            n = e.i(512710),
            o = e.i(51866),
            i = e.i(87912),
            a = e.i(245586),
            l = e.i(990341),
            s = e.i(598279),
            u = e.i(495794),
            d = e.i(230902),
            c = e.i(661977),
            p = e.i(67356),
            f = e.i(519455),
            m = e.i(227766),
            g = e.i(337822),
            h = e.i(83972),
            v = e.i(746798);
        let b = ({ tooltipText: e, onClick: r, children: n }) =>
            (0, t.jsx)(h.TooltipProvider, {
                children: (0, t.jsxs)(v.Tooltip, {
                    children: [
                        (0, t.jsx)(v.TooltipTrigger, {
                            asChild: !0,
                            children: (0, t.jsx)(f.Button, {
                                variant: 'outline',
                                size: 'icon',
                                onClick: r,
                                className:
                                    'h-12 w-9 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                children: n,
                            }),
                        }),
                        (0, t.jsx)(v.TooltipContent, {
                            className: 'bg-background-tertiary',
                            children: (0, t.jsx)('p', { children: e }),
                        }),
                    ],
                }),
            });
        e.s(
            [
                'DatePicker',
                0,
                ({ mode: e = 'date', hideNavigation: h }) => {
                    let v = (0, a.useRouter)(),
                        x = (0, a.usePathname)(),
                        y = (0, a.useSearchParams)(),
                        w = 'month' === e ? 'month' : 'date',
                        C = y.get(w),
                        T = (0, l.useCallback)(() => {
                            if ('month' === e) {
                                if (!C) return new Date();
                                let [e, t] = C.split('-').map(Number),
                                    r = new Date(e, (t ?? 1) - 1, 1);
                                return (0, c.isValid)(r) ? r : new Date();
                            }
                            if (!C) return new Date();
                            let [t, r, n] = C.split('-').map(Number),
                                o = new Date(t, (r ?? 1) - 1, n ?? 1);
                            return (0, c.isValid)(o) ? o : new Date();
                        }, [e, C]),
                        [j, E] = (0, l.useState)(() => T()),
                        [N, R] = (0, l.useState)(!1),
                        P = (0, l.useMemo)(
                            () =>
                                j
                                    ? 'month' === e
                                        ? (0, d.format)(j, 'MM/yyyy', {
                                              locale: p.ptBR,
                                          })
                                        : (0, d.format)(j, 'dd/MM/yyyy', {
                                              locale: p.ptBR,
                                          })
                                    : 'Selecione uma data',
                            [j, e]
                        ),
                        k = (t) => {
                            let r = new URLSearchParams(y.toString());
                            if (
                                ('month' === e
                                    ? r.delete('date')
                                    : r.delete('month'),
                                'month' === e)
                            ) {
                                var n;
                                let e = new Date(
                                    t.getFullYear(),
                                    t.getMonth(),
                                    1
                                );
                                r.set(
                                    'month',
                                    ((n = e),
                                    `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`)
                                );
                            } else
                                r.set('date', (0, d.format)(t, 'yyyy-MM-dd'));
                            let o = r.toString();
                            v.push(o ? `${x}?${o}` : x);
                        },
                        M = (t) => {
                            let r = j ?? new Date(),
                                n =
                                    'month' === e
                                        ? (0, u.addMonths)(r, t)
                                        : (0, s.addDays)(r, t),
                                o =
                                    'month' === e
                                        ? new Date(
                                              n.getFullYear(),
                                              n.getMonth(),
                                              1
                                          )
                                        : n;
                            (E(o), k(o));
                        };
                    (0, l.useEffect)(() => {
                        E(T());
                    }, [T]);
                    let S = 'month' === e ? 'Mês anterior' : 'Dia anterior',
                        O = 'month' === e ? 'Próximo mês' : 'Próximo dia';
                    return (0, t.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            !h &&
                                (0, t.jsx)(b, {
                                    tooltipText: S,
                                    onClick: () => M(-1),
                                    children: (0, t.jsx)(o.ChevronLeft, {
                                        className: 'h-4 w-4',
                                    }),
                                }),
                            (0, t.jsxs)(g.Popover, {
                                open: N,
                                onOpenChange: R,
                                children: [
                                    (0, t.jsx)(g.PopoverTrigger, {
                                        asChild: !0,
                                        children: (0, t.jsxs)(f.Button, {
                                            variant: 'outline',
                                            className:
                                                'min-w-[180px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                            children: [
                                                (0, t.jsxs)('div', {
                                                    className:
                                                        'flex items-center gap-2',
                                                    children: [
                                                        (0, t.jsx)(r.Calendar, {
                                                            className:
                                                                'h-4 w-4 text-content-brand',
                                                        }),
                                                        (0, t.jsx)('span', {
                                                            children: P,
                                                        }),
                                                    ],
                                                }),
                                                (0, t.jsx)(n.ChevronDown, {
                                                    className:
                                                        'h-4 w-4 opacity-50',
                                                }),
                                            ],
                                        }),
                                    }),
                                    (0, t.jsx)(g.PopoverContent, {
                                        className: 'w-auto p-0',
                                        children: (0, t.jsx)(m.Calendar, {
                                            mode: 'single',
                                            selected: j,
                                            onSelect: (t) => {
                                                if (t) {
                                                    let r =
                                                        'month' === e
                                                            ? new Date(
                                                                  t.getFullYear(),
                                                                  t.getMonth(),
                                                                  1
                                                              )
                                                            : t;
                                                    (E(r), k(r));
                                                }
                                                R(!1);
                                            },
                                            autoFocus: !0,
                                            locale: p.ptBR,
                                        }),
                                    }),
                                ],
                            }),
                            !h &&
                                (0, t.jsx)(b, {
                                    tooltipText: O,
                                    onClick: () => M(1),
                                    children: (0, t.jsx)(i.ChevronRight, {
                                        className: 'h-4 w-4',
                                    }),
                                }),
                        ],
                    });
                },
            ],
            825296
        );
    },
]);
