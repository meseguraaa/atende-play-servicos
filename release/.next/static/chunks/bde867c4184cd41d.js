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
            a = t.forwardRef((e, t) =>
                (0, n.jsx)(r.Primitive.span, {
                    ...e,
                    ref: t,
                    style: { ...o, ...e.style },
                })
            );
        ((a.displayName = 'VisuallyHidden'),
            e.s(['Root', () => a, 'VISUALLY_HIDDEN_STYLES', () => o]));
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
            a = t[' use '.trim().toString()];
        function i(e) {
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
                            (i(o) &&
                                'function' == typeof a &&
                                (o = a(o._payload)),
                            t.isValidElement(o))
                        ) {
                            var s;
                            let e,
                                a,
                                i =
                                    ((s = o),
                                    (a =
                                        (e = Object.getOwnPropertyDescriptor(
                                            s.props,
                                            'ref'
                                        )?.get) &&
                                        'isReactWarning' in e &&
                                        e.isReactWarning)
                                        ? s.ref
                                        : (a =
                                                (e =
                                                    Object.getOwnPropertyDescriptor(
                                                        s,
                                                        'ref'
                                                    )?.get) &&
                                                'isReactWarning' in e &&
                                                e.isReactWarning)
                                          ? s.props.ref
                                          : s.props.ref || s.ref),
                                d = (function (e, t) {
                                    let r = { ...t };
                                    for (let n in t) {
                                        let o = e[n],
                                            a = t[n];
                                        /^on[A-Z]/.test(n)
                                            ? o && a
                                                ? (r[n] = (...e) => {
                                                      let t = a(...e);
                                                      return (o(...e), t);
                                                  })
                                                : o && (r[n] = o)
                                            : 'style' === n
                                              ? (r[n] = { ...o, ...a })
                                              : 'className' === n &&
                                                (r[n] = [o, a]
                                                    .filter(Boolean)
                                                    .join(' '));
                                    }
                                    return { ...e, ...r };
                                })(l, o.props);
                            return (
                                o.type !== t.Fragment &&
                                    (d.ref = n ? (0, r.composeRefs)(n, i) : i),
                                t.cloneElement(o, d)
                            );
                        }
                        return t.Children.count(o) > 1
                            ? t.Children.only(null)
                            : null;
                    })).displayName = `${o}.SlotClone`),
                    l),
                d = t.forwardRef((e, r) => {
                    let { children: o, ...l } = e;
                    i(o) && 'function' == typeof a && (o = a(o._payload));
                    let d = t.Children.toArray(o),
                        c = d.find(u);
                    if (c) {
                        let e = c.props.children,
                            o = d.map((r) =>
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
            return ((d.displayName = `${e}.Slot`), d);
        }
        var s = l('Slot'),
            d = Symbol('radix.slottable');
        function u(e) {
            return (
                t.isValidElement(e) &&
                'function' == typeof e.type &&
                '__radixId' in e.type &&
                e.type.__radixId === d
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
            a = n.clsx,
            i = (e, t) => (r) => {
                var n;
                if ((null == t ? void 0 : t.variants) == null)
                    return a(
                        e,
                        null == r ? void 0 : r.class,
                        null == r ? void 0 : r.className
                    );
                let { variants: i, defaultVariants: l } = t,
                    s = Object.keys(i).map((e) => {
                        let t = null == r ? void 0 : r[e],
                            n = null == l ? void 0 : l[e];
                        if (null === t) return null;
                        let a = o(t) || o(n);
                        return i[e][a];
                    }),
                    d =
                        r &&
                        Object.entries(r).reduce((e, t) => {
                            let [r, n] = t;
                            return (void 0 === n || (e[r] = n), e);
                        }, {});
                return a(
                    e,
                    s,
                    null == t || null == (n = t.compoundVariants)
                        ? void 0
                        : n.reduce((e, t) => {
                              let { class: r, className: n, ...o } = t;
                              return Object.entries(o).every((e) => {
                                  let [t, r] = e;
                                  return Array.isArray(r)
                                      ? r.includes({ ...l, ...d }[t])
                                      : { ...l, ...d }[t] === r;
                              })
                                  ? [...e, r, n]
                                  : e;
                          }, []),
                    null == r ? void 0 : r.class,
                    null == r ? void 0 : r.className
                );
            };
        e.s(['cva', 0, i], 294237);
        var l = e.i(975157);
        let s = i(
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
            size: o,
            asChild: a = !1,
            ...i
        }) {
            let d = a ? r.Slot : 'button';
            return (0, t.jsx)(d, {
                'data-slot': 'button',
                className: (0, l.cn)(s({ variant: n, size: o, className: e })),
                ...i,
            });
        }
        e.s(['Button', () => d, 'buttonVariants', () => s], 519455);
    },
    861181,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(672687),
            n = e.i(150076),
            o = (e) => {
                var o;
                let i,
                    l,
                    { present: s, children: d } = e,
                    u = (function (e) {
                        var r, o;
                        let [i, l] = t.useState(),
                            s = t.useRef(null),
                            d = t.useRef(e),
                            u = t.useRef('none'),
                            [c, f] =
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
                                let e = a(s.current);
                                u.current = 'mounted' === c ? e : 'none';
                            }, [c]),
                            (0, n.useLayoutEffect)(() => {
                                let t = s.current,
                                    r = d.current;
                                if (r !== e) {
                                    let n = u.current,
                                        o = a(t);
                                    (e
                                        ? f('MOUNT')
                                        : 'none' === o || t?.display === 'none'
                                          ? f('UNMOUNT')
                                          : r && n !== o
                                            ? f('ANIMATION_OUT')
                                            : f('UNMOUNT'),
                                        (d.current = e));
                                }
                            }, [e, f]),
                            (0, n.useLayoutEffect)(() => {
                                if (i) {
                                    let e,
                                        t =
                                            i.ownerDocument.defaultView ??
                                            window,
                                        r = (r) => {
                                            let n = a(s.current).includes(
                                                CSS.escape(r.animationName)
                                            );
                                            if (
                                                r.target === i &&
                                                n &&
                                                (f('ANIMATION_END'), !d.current)
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
                                        n = (e) => {
                                            e.target === i &&
                                                (u.current = a(s.current));
                                        };
                                    return (
                                        i.addEventListener('animationstart', n),
                                        i.addEventListener(
                                            'animationcancel',
                                            r
                                        ),
                                        i.addEventListener('animationend', r),
                                        () => {
                                            (t.clearTimeout(e),
                                                i.removeEventListener(
                                                    'animationstart',
                                                    n
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
                                f('ANIMATION_END');
                            }, [i, f]),
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
                        'function' == typeof d
                            ? d({ present: u.isPresent })
                            : t.Children.only(d),
                    f = (0, r.useComposedRefs)(
                        u.ref,
                        ((o = c),
                        (l =
                            (i = Object.getOwnPropertyDescriptor(
                                o.props,
                                'ref'
                            )?.get) &&
                            'isReactWarning' in i &&
                            i.isReactWarning)
                            ? o.ref
                            : (l =
                                    (i = Object.getOwnPropertyDescriptor(
                                        o,
                                        'ref'
                                    )?.get) &&
                                    'isReactWarning' in i &&
                                    i.isReactWarning)
                              ? o.props.ref
                              : o.props.ref || o.ref)
                    );
                return 'function' == typeof d || u.isPresent
                    ? t.cloneElement(c, { ref: f })
                    : null;
            };
        function a(e) {
            return e?.animationName || 'none';
        }
        ((o.displayName = 'Presence'), e.s(['Presence', () => o]));
    },
    793479,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(975157);
        function n({ className: e, type: n, ...o }) {
            return (0, t.jsx)('input', {
                type: n,
                'data-slot': 'input',
                className: (0, r.cn)(
                    'flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50',
                    'hover:border-border-secondary',
                    'focus:border-border-brand focus-visible:border-border-brand',
                    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
                    e
                ),
                ...o,
            });
        }
        e.s(['Input', () => n]);
    },
    342413,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(291967),
            n = e.i(672687),
            o = e.i(784711),
            a = e.i(910529),
            i = e.i(695145),
            l = e.i(846357),
            s = e.i(60126),
            d = e.i(546354),
            u = e.i(861181),
            c = e.i(403078),
            f = e.i(774621),
            p = e.i(595357),
            g = e.i(73772),
            m = e.i(655875),
            b = e.i(565750),
            v = 'Dialog',
            [x, y] = (0, o.createContextScope)(v),
            [h, w] = x(v),
            j = (e) => {
                let {
                        __scopeDialog: r,
                        children: n,
                        open: o,
                        defaultOpen: l,
                        onOpenChange: s,
                        modal: d = !0,
                    } = e,
                    u = t.useRef(null),
                    c = t.useRef(null),
                    [f, p] = (0, i.useControllableState)({
                        prop: o,
                        defaultProp: l ?? !1,
                        onChange: s,
                        caller: v,
                    });
                return (0, b.jsx)(h, {
                    scope: r,
                    triggerRef: u,
                    contentRef: c,
                    contentId: (0, a.useId)(),
                    titleId: (0, a.useId)(),
                    descriptionId: (0, a.useId)(),
                    open: f,
                    onOpenChange: p,
                    onOpenToggle: t.useCallback(() => p((e) => !e), [p]),
                    modal: d,
                    children: n,
                });
            };
        j.displayName = v;
        var k = 'DialogTrigger',
            N = t.forwardRef((e, t) => {
                let { __scopeDialog: o, ...a } = e,
                    i = w(k, o),
                    l = (0, n.useComposedRefs)(t, i.triggerRef);
                return (0, b.jsx)(c.Primitive.button, {
                    type: 'button',
                    'aria-haspopup': 'dialog',
                    'aria-expanded': i.open,
                    'aria-controls': i.contentId,
                    'data-state': $(i.open),
                    ...a,
                    ref: l,
                    onClick: (0, r.composeEventHandlers)(
                        e.onClick,
                        i.onOpenToggle
                    ),
                });
            });
        N.displayName = k;
        var D = 'DialogPortal',
            [R, C] = x(D, { forceMount: void 0 }),
            O = (e) => {
                let {
                        __scopeDialog: r,
                        forceMount: n,
                        children: o,
                        container: a,
                    } = e,
                    i = w(D, r);
                return (0, b.jsx)(R, {
                    scope: r,
                    forceMount: n,
                    children: t.Children.map(o, (e) =>
                        (0, b.jsx)(u.Presence, {
                            present: n || i.open,
                            children: (0, b.jsx)(d.Portal, {
                                asChild: !0,
                                container: a,
                                children: e,
                            }),
                        })
                    ),
                });
            };
        O.displayName = D;
        var I = 'DialogOverlay',
            E = t.forwardRef((e, t) => {
                let r = C(I, e.__scopeDialog),
                    { forceMount: n = r.forceMount, ...o } = e,
                    a = w(I, e.__scopeDialog);
                return a.modal
                    ? (0, b.jsx)(u.Presence, {
                          present: n || a.open,
                          children: (0, b.jsx)(T, { ...o, ref: t }),
                      })
                    : null;
            });
        E.displayName = I;
        var P = (0, m.createSlot)('DialogOverlay.RemoveScroll'),
            T = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...n } = e,
                    o = w(I, r);
                return (0, b.jsx)(p.RemoveScroll, {
                    as: P,
                    allowPinchZoom: !0,
                    shards: [o.contentRef],
                    children: (0, b.jsx)(c.Primitive.div, {
                        'data-state': $(o.open),
                        ...n,
                        ref: t,
                        style: { pointerEvents: 'auto', ...n.style },
                    }),
                });
            }),
            _ = 'DialogContent',
            S = t.forwardRef((e, t) => {
                let r = C(_, e.__scopeDialog),
                    { forceMount: n = r.forceMount, ...o } = e,
                    a = w(_, e.__scopeDialog);
                return (0, b.jsx)(u.Presence, {
                    present: n || a.open,
                    children: a.modal
                        ? (0, b.jsx)(M, { ...o, ref: t })
                        : (0, b.jsx)(A, { ...o, ref: t }),
                });
            });
        S.displayName = _;
        var M = t.forwardRef((e, o) => {
                let a = w(_, e.__scopeDialog),
                    i = t.useRef(null),
                    l = (0, n.useComposedRefs)(o, a.contentRef, i);
                return (
                    t.useEffect(() => {
                        let e = i.current;
                        if (e) return (0, g.hideOthers)(e);
                    }, []),
                    (0, b.jsx)(z, {
                        ...e,
                        ref: l,
                        trapFocus: a.open,
                        disableOutsidePointerEvents: !0,
                        onCloseAutoFocus: (0, r.composeEventHandlers)(
                            e.onCloseAutoFocus,
                            (e) => {
                                (e.preventDefault(),
                                    a.triggerRef.current?.focus());
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
            A = t.forwardRef((e, r) => {
                let n = w(_, e.__scopeDialog),
                    o = t.useRef(!1),
                    a = t.useRef(!1);
                return (0, b.jsx)(z, {
                    ...e,
                    ref: r,
                    trapFocus: !1,
                    disableOutsidePointerEvents: !1,
                    onCloseAutoFocus: (t) => {
                        (e.onCloseAutoFocus?.(t),
                            t.defaultPrevented ||
                                (o.current || n.triggerRef.current?.focus(),
                                t.preventDefault()),
                            (o.current = !1),
                            (a.current = !1));
                    },
                    onInteractOutside: (t) => {
                        (e.onInteractOutside?.(t),
                            t.defaultPrevented ||
                                ((o.current = !0),
                                'pointerdown' === t.detail.originalEvent.type &&
                                    (a.current = !0)));
                        let r = t.target;
                        (n.triggerRef.current?.contains(r) &&
                            t.preventDefault(),
                            'focusin' === t.detail.originalEvent.type &&
                                a.current &&
                                t.preventDefault());
                    },
                });
            }),
            z = t.forwardRef((e, r) => {
                let {
                        __scopeDialog: o,
                        trapFocus: a,
                        onOpenAutoFocus: i,
                        onCloseAutoFocus: d,
                        ...u
                    } = e,
                    c = w(_, o),
                    p = t.useRef(null),
                    g = (0, n.useComposedRefs)(r, p);
                return (
                    (0, f.useFocusGuards)(),
                    (0, b.jsxs)(b.Fragment, {
                        children: [
                            (0, b.jsx)(s.FocusScope, {
                                asChild: !0,
                                loop: !0,
                                trapped: a,
                                onMountAutoFocus: i,
                                onUnmountAutoFocus: d,
                                children: (0, b.jsx)(l.DismissableLayer, {
                                    role: 'dialog',
                                    id: c.contentId,
                                    'aria-describedby': c.descriptionId,
                                    'aria-labelledby': c.titleId,
                                    'data-state': $(c.open),
                                    ...u,
                                    ref: g,
                                    onDismiss: () => c.onOpenChange(!1),
                                }),
                            }),
                            (0, b.jsxs)(b.Fragment, {
                                children: [
                                    (0, b.jsx)(Z, { titleId: c.titleId }),
                                    (0, b.jsx)(Y, {
                                        contentRef: p,
                                        descriptionId: c.descriptionId,
                                    }),
                                ],
                            }),
                        ],
                    })
                );
            }),
            F = 'DialogTitle',
            U = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...n } = e,
                    o = w(F, r);
                return (0, b.jsx)(c.Primitive.h2, {
                    id: o.titleId,
                    ...n,
                    ref: t,
                });
            });
        U.displayName = F;
        var V = 'DialogDescription',
            L = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...n } = e,
                    o = w(V, r);
                return (0, b.jsx)(c.Primitive.p, {
                    id: o.descriptionId,
                    ...n,
                    ref: t,
                });
            });
        L.displayName = V;
        var H = 'DialogClose',
            W = t.forwardRef((e, t) => {
                let { __scopeDialog: n, ...o } = e,
                    a = w(H, n);
                return (0, b.jsx)(c.Primitive.button, {
                    type: 'button',
                    ...o,
                    ref: t,
                    onClick: (0, r.composeEventHandlers)(e.onClick, () =>
                        a.onOpenChange(!1)
                    ),
                });
            });
        function $(e) {
            return e ? 'open' : 'closed';
        }
        W.displayName = H;
        var B = 'DialogTitleWarning',
            [q, K] = (0, o.createContext)(B, {
                contentName: _,
                titleName: F,
                docsSlug: 'dialog',
            }),
            Z = ({ titleId: e }) => {
                let r = K(B),
                    n = `\`${r.contentName}\` requires a \`${r.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${r.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${r.docsSlug}`;
                return (
                    t.useEffect(() => {
                        e && (document.getElementById(e) || console.error(n));
                    }, [n, e]),
                    null
                );
            },
            Y = ({ contentRef: e, descriptionId: r }) => {
                let n = K('DialogDescriptionWarning'),
                    o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${n.contentName}}.`;
                return (
                    t.useEffect(() => {
                        let t = e.current?.getAttribute('aria-describedby');
                        r &&
                            t &&
                            (document.getElementById(r) || console.warn(o));
                    }, [o, e, r]),
                    null
                );
            };
        e.s([
            'Close',
            () => W,
            'Content',
            () => S,
            'Description',
            () => L,
            'Overlay',
            () => E,
            'Portal',
            () => O,
            'Root',
            () => j,
            'Title',
            () => U,
            'Trigger',
            () => N,
            'WarningProvider',
            () => q,
            'createDialogScope',
            () => y,
        ]);
    },
    776639,
    660214,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(342413);
        let n = (0, e.i(383206).default)('x', [
            ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
            ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
        ]);
        e.s(['default', () => n], 660214);
        var o = e.i(294237),
            a = e.i(975157);
        function i({ ...e }) {
            return (0, t.jsx)(r.Root, { 'data-slot': 'dialog', ...e });
        }
        function l({ ...e }) {
            return (0, t.jsx)(r.Trigger, {
                'data-slot': 'dialog-trigger',
                ...e,
            });
        }
        function s({ ...e }) {
            return (0, t.jsx)(r.Portal, { 'data-slot': 'dialog-portal', ...e });
        }
        let d = (0, o.cva)(
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
        function u({ className: e, variant: n, ...o }) {
            return (0, t.jsx)(r.Overlay, {
                'data-slot': 'dialog-overlay',
                className: (0, a.cn)(d({ variant: n }), e),
                ...o,
            });
        }
        let c = (0, o.cva)(
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
        function f({
            className: e,
            children: o,
            showCloseButton: i = !0,
            variant: l,
            overlayVariant: d,
            ...f
        }) {
            return (0, t.jsxs)(s, {
                'data-slot': 'dialog-portal',
                children: [
                    (0, t.jsx)(u, { variant: d }),
                    (0, t.jsxs)(r.Content, {
                        'data-slot': 'dialog-content',
                        className: (0, a.cn)(c({ variant: l }), e),
                        ...f,
                        children: [
                            o,
                            i &&
                                (0, t.jsxs)(r.Close, {
                                    'data-slot': 'dialog-close',
                                    className:
                                        "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                                    children: [
                                        (0, t.jsx)(n, {}),
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
        let p = (0, o.cva)('flex flex-col gap-2', {
            variants: {
                align: {
                    left: 'text-left',
                    center: 'text-center sm:text-left',
                    right: 'text-right',
                },
            },
            defaultVariants: { align: 'center' },
        });
        function g({ className: e, align: r, ...n }) {
            return (0, t.jsx)('div', {
                'data-slot': 'dialog-header',
                className: (0, a.cn)(p({ align: r }), e),
                ...n,
            });
        }
        function m({ className: e, ...r }) {
            return (0, t.jsx)('div', {
                'data-slot': 'dialog-footer',
                className: (0, a.cn)(
                    'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                    e
                ),
                ...r,
            });
        }
        let b = (0, o.cva)('leading-none font-semibold', {
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
        function v({ className: e, size: n, ...o }) {
            return (0, t.jsx)(r.Title, {
                'data-slot': 'dialog-title',
                className: (0, a.cn)(b({ size: n }), e),
                ...o,
            });
        }
        let x = (0, o.cva)('text-muted-foreground', {
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
        function y({ className: e, size: n, ...o }) {
            return (0, t.jsx)(r.Description, {
                'data-slot': 'dialog-description',
                className: (0, a.cn)(x({ size: n }), e),
                ...o,
            });
        }
        e.s(
            [
                'Dialog',
                () => i,
                'DialogContent',
                () => f,
                'DialogDescription',
                () => y,
                'DialogFooter',
                () => m,
                'DialogHeader',
                () => g,
                'DialogTitle',
                () => v,
                'DialogTrigger',
                () => l,
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
    212409,
    (e) => {
        'use strict';
        var t = e.i(660214);
        e.s(['X', () => t.default]);
    },
    287268,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('search', [
            ['path', { d: 'm21 21-4.34-4.34', key: '14j7rj' }],
            ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
        ]);
        e.s(['Search', () => t], 287268);
    },
    79254,
    (e) => {
        'use strict';
        var t = e.i(814549);
        e.s(['Check', () => t.default]);
    },
    218074,
    826463,
    (e) => {
        'use strict';
        var t = e.i(383206);
        let r = (0, t.default)('image', [
            [
                'rect',
                {
                    width: '18',
                    height: '18',
                    x: '3',
                    y: '3',
                    rx: '2',
                    ry: '2',
                    key: '1m3agn',
                },
            ],
            ['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
            [
                'path',
                {
                    d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21',
                    key: '1xmnt7',
                },
            ],
        ]);
        e.s(['Image', () => r], 218074);
        let n = (0, t.default)('upload', [
            ['path', { d: 'M12 3v12', key: '1x0j5s' }],
            ['path', { d: 'm17 8-5-5-5 5', key: '7q97r8' }],
            [
                'path',
                {
                    d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
                    key: 'ih7n3h',
                },
            ],
        ]);
        e.s(['Upload', () => n], 826463);
    },
    624687,
    255376,
    906325,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            n = e.i(975157);
        let o = r.forwardRef(({ className: e, ...r }, o) =>
            (0, t.jsx)('textarea', {
                className: (0, n.cn)(
                    'flex min-h-20 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary',
                    e
                ),
                ref: o,
                ...r,
            })
        );
        ((o.displayName = 'Textarea'), e.s(['Textarea', () => o], 624687));
        var a = e.i(383206);
        let i = (0, a.default)('text-align-start', [
            ['path', { d: 'M21 5H3', key: '1fi0y6' }],
            ['path', { d: 'M15 12H3', key: '6jk70r' }],
            ['path', { d: 'M17 19H3', key: 'z6ezky' }],
        ]);
        e.s(['AlignLeft', () => i], 255376);
        let l = (0, a.default)('badge-percent', [
            [
                'path',
                {
                    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
                    key: '3c2336',
                },
            ],
            ['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
            ['path', { d: 'M9 9h.01', key: '1q5me6' }],
            ['path', { d: 'M15 15h.01', key: 'lqbp3k' }],
        ]);
        e.s(['BadgePercent', () => l], 906325);
    },
]);
