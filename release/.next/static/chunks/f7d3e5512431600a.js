(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    388313,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            o = e.i(245586),
            n = e.i(975157);
        function a({
            professionals: e,
            value: a,
            paramKey: i = 'professionalId',
            label: s = 'Profissional',
            className: l,
        }) {
            let c = (0, o.useRouter)(),
                d = (0, o.usePathname)(),
                u = (0, o.useSearchParams)(),
                p = (0, r.useMemo)(
                    () => (e ?? []).map((e) => ({ id: e.id, name: e.name })),
                    [e]
                );
            return (0, t.jsxs)('div', {
                className: (0, n.cn)('space-y-1', l),
                children: [
                    (0, t.jsx)('p', {
                        className: 'text-label-small text-content-secondary',
                        children: s,
                    }),
                    (0, t.jsxs)('select', {
                        value: a ?? '',
                        onChange: (e) => {
                            var t;
                            let r, o;
                            return (
                                (t = e.target.value),
                                (r = new URLSearchParams(u?.toString() ?? '')),
                                t ? r.set(i, t) : r.delete(i),
                                (o = r.toString()),
                                void (c.push(o ? `${d}?${o}` : d), c.refresh())
                            );
                        },
                        className: (0, n.cn)(
                            'w-full h-10 rounded-md px-3',
                            'bg-background-tertiary border border-border-primary',
                            'text-content-primary text-sm',
                            'focus:outline-none focus:ring-2 focus:ring-border-brand'
                        ),
                        children: [
                            (0, t.jsx)('option', {
                                value: '',
                                children: 'Todos',
                            }),
                            p.map((e) =>
                                (0, t.jsx)(
                                    'option',
                                    { value: e.id, children: e.name },
                                    e.id
                                )
                            ),
                        ],
                    }),
                ],
            });
        }
        e.s(['ProfessionalFilter', () => a]);
    },
    98556,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('calendar', [
            ['path', { d: 'M8 2v4', key: '1cmpym' }],
            ['path', { d: 'M16 2v4', key: '4m81vk' }],
            [
                'rect',
                {
                    width: '18',
                    height: '18',
                    x: '3',
                    y: '4',
                    rx: '2',
                    key: '1hopcy',
                },
            ],
            ['path', { d: 'M3 10h18', key: '8toen8' }],
        ]);
        e.s(['default', () => t]);
    },
    926991,
    859502,
    495794,
    432286,
    (e) => {
        'use strict';
        var t = e.i(383206);
        let r = (0, t.default)('chevron-left', [
            ['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }],
        ]);
        e.s(['default', () => r], 926991);
        let o = (0, t.default)('chevron-right', [
            ['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }],
        ]);
        e.s(['default', () => o], 859502);
        var n = e.i(487122),
            a = e.i(516467);
        function i(e, t, r) {
            let o = (0, a.toDate)(e, r?.in);
            if (isNaN(t)) return (0, n.constructFrom)(r?.in || e, NaN);
            if (!t) return o;
            let i = o.getDate(),
                s = (0, n.constructFrom)(r?.in || e, o.getTime());
            return (s.setMonth(o.getMonth() + t + 1, 0), i >= s.getDate())
                ? s
                : (o.setFullYear(s.getFullYear(), s.getMonth(), i), o);
        }
        function s(e, t) {
            let r = (0, a.toDate)(e, t?.in);
            return (r.setDate(1), r.setHours(0, 0, 0, 0), r);
        }
        (e.s(['addMonths', () => i], 495794),
            e.s(['startOfMonth', () => s], 432286));
    },
    337822,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            o = e.i(291967),
            n = e.i(672687),
            a = e.i(784711),
            i = e.i(846357),
            s = e.i(774621),
            l = e.i(60126),
            c = e.i(910529),
            d = e.i(75355),
            u = e.i(546354),
            p = e.i(861181),
            h = e.i(403078),
            m = e.i(655875),
            f = e.i(695145),
            v = e.i(73772),
            x = e.i(595357),
            g = 'Popover',
            [b, y] = (0, a.createContextScope)(g, [d.createPopperScope]),
            C = (0, d.createPopperScope)(),
            [j, w] = b(g),
            P = (e) => {
                let {
                        __scopePopover: o,
                        children: n,
                        open: a,
                        defaultOpen: i,
                        onOpenChange: s,
                        modal: l = !1,
                    } = e,
                    u = C(o),
                    p = r.useRef(null),
                    [h, m] = r.useState(!1),
                    [v, x] = (0, f.useControllableState)({
                        prop: a,
                        defaultProp: i ?? !1,
                        onChange: s,
                        caller: g,
                    });
                return (0, t.jsx)(d.Root, {
                    ...u,
                    children: (0, t.jsx)(j, {
                        scope: o,
                        contentId: (0, c.useId)(),
                        triggerRef: p,
                        open: v,
                        onOpenChange: x,
                        onOpenToggle: r.useCallback(() => x((e) => !e), [x]),
                        hasCustomAnchor: h,
                        onCustomAnchorAdd: r.useCallback(() => m(!0), []),
                        onCustomAnchorRemove: r.useCallback(() => m(!1), []),
                        modal: l,
                        children: n,
                    }),
                });
            };
        P.displayName = g;
        var R = 'PopoverAnchor';
        r.forwardRef((e, o) => {
            let { __scopePopover: n, ...a } = e,
                i = w(R, n),
                s = C(n),
                { onCustomAnchorAdd: l, onCustomAnchorRemove: c } = i;
            return (
                r.useEffect(() => (l(), () => c()), [l, c]),
                (0, t.jsx)(d.Anchor, { ...s, ...a, ref: o })
            );
        }).displayName = R;
        var T = 'PopoverTrigger',
            S = r.forwardRef((e, r) => {
                let { __scopePopover: a, ...i } = e,
                    s = w(T, a),
                    l = C(a),
                    c = (0, n.useComposedRefs)(r, s.triggerRef),
                    u = (0, t.jsx)(h.Primitive.button, {
                        type: 'button',
                        'aria-haspopup': 'dialog',
                        'aria-expanded': s.open,
                        'aria-controls': s.contentId,
                        'data-state': H(s.open),
                        ...i,
                        ref: c,
                        onClick: (0, o.composeEventHandlers)(
                            e.onClick,
                            s.onOpenToggle
                        ),
                    });
                return s.hasCustomAnchor
                    ? u
                    : (0, t.jsx)(d.Anchor, { asChild: !0, ...l, children: u });
            });
        S.displayName = T;
        var k = 'PopoverPortal',
            [M, N] = b(k, { forceMount: void 0 }),
            E = (e) => {
                let {
                        __scopePopover: r,
                        forceMount: o,
                        children: n,
                        container: a,
                    } = e,
                    i = w(k, r);
                return (0, t.jsx)(M, {
                    scope: r,
                    forceMount: o,
                    children: (0, t.jsx)(p.Presence, {
                        present: o || i.open,
                        children: (0, t.jsx)(u.Portal, {
                            asChild: !0,
                            container: a,
                            children: n,
                        }),
                    }),
                });
            };
        E.displayName = k;
        var D = 'PopoverContent',
            O = r.forwardRef((e, r) => {
                let o = N(D, e.__scopePopover),
                    { forceMount: n = o.forceMount, ...a } = e,
                    i = w(D, e.__scopePopover);
                return (0, t.jsx)(p.Presence, {
                    present: n || i.open,
                    children: i.modal
                        ? (0, t.jsx)(A, { ...a, ref: r })
                        : (0, t.jsx)(L, { ...a, ref: r }),
                });
            });
        O.displayName = D;
        var F = (0, m.createSlot)('PopoverContent.RemoveScroll'),
            A = r.forwardRef((e, a) => {
                let i = w(D, e.__scopePopover),
                    s = r.useRef(null),
                    l = (0, n.useComposedRefs)(a, s),
                    c = r.useRef(!1);
                return (
                    r.useEffect(() => {
                        let e = s.current;
                        if (e) return (0, v.hideOthers)(e);
                    }, []),
                    (0, t.jsx)(x.RemoveScroll, {
                        as: F,
                        allowPinchZoom: !0,
                        children: (0, t.jsx)(_, {
                            ...e,
                            ref: l,
                            trapFocus: i.open,
                            disableOutsidePointerEvents: !0,
                            onCloseAutoFocus: (0, o.composeEventHandlers)(
                                e.onCloseAutoFocus,
                                (e) => {
                                    (e.preventDefault(),
                                        c.current ||
                                            i.triggerRef.current?.focus());
                                }
                            ),
                            onPointerDownOutside: (0, o.composeEventHandlers)(
                                e.onPointerDownOutside,
                                (e) => {
                                    let t = e.detail.originalEvent,
                                        r = 0 === t.button && !0 === t.ctrlKey;
                                    c.current = 2 === t.button || r;
                                },
                                { checkForDefaultPrevented: !1 }
                            ),
                            onFocusOutside: (0, o.composeEventHandlers)(
                                e.onFocusOutside,
                                (e) => e.preventDefault(),
                                { checkForDefaultPrevented: !1 }
                            ),
                        }),
                    })
                );
            }),
            L = r.forwardRef((e, o) => {
                let n = w(D, e.__scopePopover),
                    a = r.useRef(!1),
                    i = r.useRef(!1);
                return (0, t.jsx)(_, {
                    ...e,
                    ref: o,
                    trapFocus: !1,
                    disableOutsidePointerEvents: !1,
                    onCloseAutoFocus: (t) => {
                        (e.onCloseAutoFocus?.(t),
                            t.defaultPrevented ||
                                (a.current || n.triggerRef.current?.focus(),
                                t.preventDefault()),
                            (a.current = !1),
                            (i.current = !1));
                    },
                    onInteractOutside: (t) => {
                        (e.onInteractOutside?.(t),
                            t.defaultPrevented ||
                                ((a.current = !0),
                                'pointerdown' === t.detail.originalEvent.type &&
                                    (i.current = !0)));
                        let r = t.target;
                        (n.triggerRef.current?.contains(r) &&
                            t.preventDefault(),
                            'focusin' === t.detail.originalEvent.type &&
                                i.current &&
                                t.preventDefault());
                    },
                });
            }),
            _ = r.forwardRef((e, r) => {
                let {
                        __scopePopover: o,
                        trapFocus: n,
                        onOpenAutoFocus: a,
                        onCloseAutoFocus: c,
                        disableOutsidePointerEvents: u,
                        onEscapeKeyDown: p,
                        onPointerDownOutside: h,
                        onFocusOutside: m,
                        onInteractOutside: f,
                        ...v
                    } = e,
                    x = w(D, o),
                    g = C(o);
                return (
                    (0, s.useFocusGuards)(),
                    (0, t.jsx)(l.FocusScope, {
                        asChild: !0,
                        loop: !0,
                        trapped: n,
                        onMountAutoFocus: a,
                        onUnmountAutoFocus: c,
                        children: (0, t.jsx)(i.DismissableLayer, {
                            asChild: !0,
                            disableOutsidePointerEvents: u,
                            onInteractOutside: f,
                            onEscapeKeyDown: p,
                            onPointerDownOutside: h,
                            onFocusOutside: m,
                            onDismiss: () => x.onOpenChange(!1),
                            children: (0, t.jsx)(d.Content, {
                                'data-state': H(x.open),
                                role: 'dialog',
                                id: x.contentId,
                                ...g,
                                ...v,
                                ref: r,
                                style: {
                                    ...v.style,
                                    '--radix-popover-content-transform-origin':
                                        'var(--radix-popper-transform-origin)',
                                    '--radix-popover-content-available-width':
                                        'var(--radix-popper-available-width)',
                                    '--radix-popover-content-available-height':
                                        'var(--radix-popper-available-height)',
                                    '--radix-popover-trigger-width':
                                        'var(--radix-popper-anchor-width)',
                                    '--radix-popover-trigger-height':
                                        'var(--radix-popper-anchor-height)',
                                },
                            }),
                        }),
                    })
                );
            }),
            I = 'PopoverClose';
        function H(e) {
            return e ? 'open' : 'closed';
        }
        ((r.forwardRef((e, r) => {
            let { __scopePopover: n, ...a } = e,
                i = w(I, n);
            return (0, t.jsx)(h.Primitive.button, {
                type: 'button',
                ...a,
                ref: r,
                onClick: (0, o.composeEventHandlers)(e.onClick, () =>
                    i.onOpenChange(!1)
                ),
            });
        }).displayName = I),
            (r.forwardRef((e, r) => {
                let { __scopePopover: o, ...n } = e,
                    a = C(o);
                return (0, t.jsx)(d.Arrow, { ...a, ...n, ref: r });
            }).displayName = 'PopoverArrow'));
        var U = e.i(975157);
        function B({ ...e }) {
            return (0, t.jsx)(P, { 'data-slot': 'popover', ...e });
        }
        function $({ ...e }) {
            return (0, t.jsx)(S, { 'data-slot': 'popover-trigger', ...e });
        }
        function z({
            className: e,
            align: r = 'center',
            sideOffset: o = 4,
            ...n
        }) {
            return (0, t.jsx)(E, {
                children: (0, t.jsx)(O, {
                    'data-slot': 'popover-content',
                    align: r,
                    sideOffset: o,
                    className: (0, U.cn)(
                        'bg-popover text-popover-foreground border border-border-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md p-4 shadow-md outline-hidden',
                        e
                    ),
                    ...n,
                }),
            });
        }
        e.s(
            [
                'Popover',
                () => B,
                'PopoverContent',
                () => z,
                'PopoverTrigger',
                () => $,
            ],
            337822
        );
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
        var o = e.i(990341),
            n = e.i(291967),
            a = e.i(672687),
            i = e.i(784711),
            s = e.i(846357),
            l = e.i(910529),
            c = e.i(75355),
            d = e.i(546354),
            u = e.i(861181),
            p = e.i(403078),
            h = e.i(655875),
            m = e.i(695145),
            f = e.i(880282),
            v = e.i(565750),
            [x, g] = (0, i.createContextScope)('Tooltip', [
                c.createPopperScope,
            ]),
            b = (0, c.createPopperScope)(),
            y = 'TooltipProvider',
            C = 'tooltip.open',
            [j, w] = x(y),
            P = (e) => {
                let {
                        __scopeTooltip: t,
                        delayDuration: r = 700,
                        skipDelayDuration: n = 300,
                        disableHoverableContent: a = !1,
                        children: i,
                    } = e,
                    s = o.useRef(!0),
                    l = o.useRef(!1),
                    c = o.useRef(0);
                return (
                    o.useEffect(() => {
                        let e = c.current;
                        return () => window.clearTimeout(e);
                    }, []),
                    (0, v.jsx)(j, {
                        scope: t,
                        isOpenDelayedRef: s,
                        delayDuration: r,
                        onOpen: o.useCallback(() => {
                            (window.clearTimeout(c.current), (s.current = !1));
                        }, []),
                        onClose: o.useCallback(() => {
                            (window.clearTimeout(c.current),
                                (c.current = window.setTimeout(
                                    () => (s.current = !0),
                                    n
                                )));
                        }, [n]),
                        isPointerInTransitRef: l,
                        onPointerInTransitChange: o.useCallback((e) => {
                            l.current = e;
                        }, []),
                        disableHoverableContent: a,
                        children: i,
                    })
                );
            };
        P.displayName = y;
        var R = 'Tooltip',
            [T, S] = x(R),
            k = (e) => {
                let {
                        __scopeTooltip: t,
                        children: r,
                        open: n,
                        defaultOpen: a,
                        onOpenChange: i,
                        disableHoverableContent: s,
                        delayDuration: d,
                    } = e,
                    u = w(R, e.__scopeTooltip),
                    p = b(t),
                    [h, f] = o.useState(null),
                    x = (0, l.useId)(),
                    g = o.useRef(0),
                    y = s ?? u.disableHoverableContent,
                    j = d ?? u.delayDuration,
                    P = o.useRef(!1),
                    [S, k] = (0, m.useControllableState)({
                        prop: n,
                        defaultProp: a ?? !1,
                        onChange: (e) => {
                            (e
                                ? (u.onOpen(),
                                  document.dispatchEvent(new CustomEvent(C)))
                                : u.onClose(),
                                i?.(e));
                        },
                        caller: R,
                    }),
                    M = o.useMemo(
                        () =>
                            S
                                ? P.current
                                    ? 'delayed-open'
                                    : 'instant-open'
                                : 'closed',
                        [S]
                    ),
                    N = o.useCallback(() => {
                        (window.clearTimeout(g.current),
                            (g.current = 0),
                            (P.current = !1),
                            k(!0));
                    }, [k]),
                    E = o.useCallback(() => {
                        (window.clearTimeout(g.current),
                            (g.current = 0),
                            k(!1));
                    }, [k]),
                    D = o.useCallback(() => {
                        (window.clearTimeout(g.current),
                            (g.current = window.setTimeout(() => {
                                ((P.current = !0), k(!0), (g.current = 0));
                            }, j)));
                    }, [j, k]);
                return (
                    o.useEffect(
                        () => () => {
                            g.current &&
                                (window.clearTimeout(g.current),
                                (g.current = 0));
                        },
                        []
                    ),
                    (0, v.jsx)(c.Root, {
                        ...p,
                        children: (0, v.jsx)(T, {
                            scope: t,
                            contentId: x,
                            open: S,
                            stateAttribute: M,
                            trigger: h,
                            onTriggerChange: f,
                            onTriggerEnter: o.useCallback(() => {
                                u.isOpenDelayedRef.current ? D() : N();
                            }, [u.isOpenDelayedRef, D, N]),
                            onTriggerLeave: o.useCallback(() => {
                                y
                                    ? E()
                                    : (window.clearTimeout(g.current),
                                      (g.current = 0));
                            }, [E, y]),
                            onOpen: N,
                            onClose: E,
                            disableHoverableContent: y,
                            children: r,
                        }),
                    })
                );
            };
        k.displayName = R;
        var M = 'TooltipTrigger',
            N = o.forwardRef((e, t) => {
                let { __scopeTooltip: r, ...i } = e,
                    s = S(M, r),
                    l = w(M, r),
                    d = b(r),
                    u = o.useRef(null),
                    h = (0, a.useComposedRefs)(t, u, s.onTriggerChange),
                    m = o.useRef(!1),
                    f = o.useRef(!1),
                    x = o.useCallback(() => (m.current = !1), []);
                return (
                    o.useEffect(
                        () => () =>
                            document.removeEventListener('pointerup', x),
                        [x]
                    ),
                    (0, v.jsx)(c.Anchor, {
                        asChild: !0,
                        ...d,
                        children: (0, v.jsx)(p.Primitive.button, {
                            'aria-describedby': s.open ? s.contentId : void 0,
                            'data-state': s.stateAttribute,
                            ...i,
                            ref: h,
                            onPointerMove: (0, n.composeEventHandlers)(
                                e.onPointerMove,
                                (e) => {
                                    'touch' !== e.pointerType &&
                                        (f.current ||
                                            l.isPointerInTransitRef.current ||
                                            (s.onTriggerEnter(),
                                            (f.current = !0)));
                                }
                            ),
                            onPointerLeave: (0, n.composeEventHandlers)(
                                e.onPointerLeave,
                                () => {
                                    (s.onTriggerLeave(), (f.current = !1));
                                }
                            ),
                            onPointerDown: (0, n.composeEventHandlers)(
                                e.onPointerDown,
                                () => {
                                    (s.open && s.onClose(),
                                        (m.current = !0),
                                        document.addEventListener(
                                            'pointerup',
                                            x,
                                            { once: !0 }
                                        ));
                                }
                            ),
                            onFocus: (0, n.composeEventHandlers)(
                                e.onFocus,
                                () => {
                                    m.current || s.onOpen();
                                }
                            ),
                            onBlur: (0, n.composeEventHandlers)(
                                e.onBlur,
                                s.onClose
                            ),
                            onClick: (0, n.composeEventHandlers)(
                                e.onClick,
                                s.onClose
                            ),
                        }),
                    })
                );
            });
        N.displayName = M;
        var E = 'TooltipPortal',
            [D, O] = x(E, { forceMount: void 0 }),
            F = (e) => {
                let {
                        __scopeTooltip: t,
                        forceMount: r,
                        children: o,
                        container: n,
                    } = e,
                    a = S(E, t);
                return (0, v.jsx)(D, {
                    scope: t,
                    forceMount: r,
                    children: (0, v.jsx)(u.Presence, {
                        present: r || a.open,
                        children: (0, v.jsx)(d.Portal, {
                            asChild: !0,
                            container: n,
                            children: o,
                        }),
                    }),
                });
            };
        F.displayName = E;
        var A = 'TooltipContent',
            L = o.forwardRef((e, t) => {
                let r = O(A, e.__scopeTooltip),
                    { forceMount: o = r.forceMount, side: n = 'top', ...a } = e,
                    i = S(A, e.__scopeTooltip);
                return (0, v.jsx)(u.Presence, {
                    present: o || i.open,
                    children: i.disableHoverableContent
                        ? (0, v.jsx)(B, { side: n, ...a, ref: t })
                        : (0, v.jsx)(_, { side: n, ...a, ref: t }),
                });
            }),
            _ = o.forwardRef((e, t) => {
                let r = S(A, e.__scopeTooltip),
                    n = w(A, e.__scopeTooltip),
                    i = o.useRef(null),
                    s = (0, a.useComposedRefs)(t, i),
                    [l, c] = o.useState(null),
                    { trigger: d, onClose: u } = r,
                    p = i.current,
                    { onPointerInTransitChange: h } = n,
                    m = o.useCallback(() => {
                        (c(null), h(!1));
                    }, [h]),
                    f = o.useCallback(
                        (e, t) => {
                            let r,
                                o = e.currentTarget,
                                n = { x: e.clientX, y: e.clientY },
                                a = (function (e, t) {
                                    let r = Math.abs(t.top - e.y),
                                        o = Math.abs(t.bottom - e.y),
                                        n = Math.abs(t.right - e.x),
                                        a = Math.abs(t.left - e.x);
                                    switch (Math.min(r, o, n, a)) {
                                        case a:
                                            return 'left';
                                        case n:
                                            return 'right';
                                        case r:
                                            return 'top';
                                        case o:
                                            return 'bottom';
                                        default:
                                            throw Error('unreachable');
                                    }
                                })(n, o.getBoundingClientRect());
                            (c(
                                ((r = [
                                    ...(function (e, t, r = 5) {
                                        let o = [];
                                        switch (t) {
                                            case 'top':
                                                o.push(
                                                    { x: e.x - r, y: e.y + r },
                                                    { x: e.x + r, y: e.y + r }
                                                );
                                                break;
                                            case 'bottom':
                                                o.push(
                                                    { x: e.x - r, y: e.y - r },
                                                    { x: e.x + r, y: e.y - r }
                                                );
                                                break;
                                            case 'left':
                                                o.push(
                                                    { x: e.x + r, y: e.y - r },
                                                    { x: e.x + r, y: e.y + r }
                                                );
                                                break;
                                            case 'right':
                                                o.push(
                                                    { x: e.x - r, y: e.y - r },
                                                    { x: e.x - r, y: e.y + r }
                                                );
                                        }
                                        return o;
                                    })(n, a),
                                    ...(function (e) {
                                        let {
                                            top: t,
                                            right: r,
                                            bottom: o,
                                            left: n,
                                        } = e;
                                        return [
                                            { x: n, y: t },
                                            { x: r, y: t },
                                            { x: r, y: o },
                                            { x: n, y: o },
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
                                        let o = e[r];
                                        for (; t.length >= 2; ) {
                                            let e = t[t.length - 1],
                                                r = t[t.length - 2];
                                            if (
                                                (e.x - r.x) * (o.y - r.y) >=
                                                (e.y - r.y) * (o.x - r.x)
                                            )
                                                t.pop();
                                            else break;
                                        }
                                        t.push(o);
                                    }
                                    t.pop();
                                    let r = [];
                                    for (let t = e.length - 1; t >= 0; t--) {
                                        let o = e[t];
                                        for (; r.length >= 2; ) {
                                            let e = r[r.length - 1],
                                                t = r[r.length - 2];
                                            if (
                                                (e.x - t.x) * (o.y - t.y) >=
                                                (e.y - t.y) * (o.x - t.x)
                                            )
                                                r.pop();
                                            else break;
                                        }
                                        r.push(o);
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
                                h(!0));
                        },
                        [h]
                    );
                return (
                    o.useEffect(() => () => m(), [m]),
                    o.useEffect(() => {
                        if (d && p) {
                            let e = (e) => f(e, p),
                                t = (e) => f(e, d);
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
                    }, [d, p, f, m]),
                    o.useEffect(() => {
                        if (l) {
                            let e = (e) => {
                                let t = e.target,
                                    r = { x: e.clientX, y: e.clientY },
                                    o = d?.contains(t) || p?.contains(t),
                                    n = !(function (e, t) {
                                        let { x: r, y: o } = e,
                                            n = !1;
                                        for (
                                            let e = 0, a = t.length - 1;
                                            e < t.length;
                                            a = e++
                                        ) {
                                            let i = t[e],
                                                s = t[a],
                                                l = i.x,
                                                c = i.y,
                                                d = s.x,
                                                u = s.y;
                                            c > o != u > o &&
                                                r <
                                                    ((d - l) * (o - c)) /
                                                        (u - c) +
                                                        l &&
                                                (n = !n);
                                        }
                                        return n;
                                    })(r, l);
                                o ? m() : n && (m(), u());
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
                    }, [d, p, l, u, m]),
                    (0, v.jsx)(B, { ...e, ref: s })
                );
            }),
            [I, H] = x(R, { isInside: !1 }),
            U = (0, h.createSlottable)('TooltipContent'),
            B = o.forwardRef((e, t) => {
                let {
                        __scopeTooltip: r,
                        children: n,
                        'aria-label': a,
                        onEscapeKeyDown: i,
                        onPointerDownOutside: l,
                        ...d
                    } = e,
                    u = S(A, r),
                    p = b(r),
                    { onClose: h } = u;
                return (
                    o.useEffect(
                        () => (
                            document.addEventListener(C, h),
                            () => document.removeEventListener(C, h)
                        ),
                        [h]
                    ),
                    o.useEffect(() => {
                        if (u.trigger) {
                            let e = (e) => {
                                let t = e.target;
                                t?.contains(u.trigger) && h();
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
                    }, [u.trigger, h]),
                    (0, v.jsx)(s.DismissableLayer, {
                        asChild: !0,
                        disableOutsidePointerEvents: !1,
                        onEscapeKeyDown: i,
                        onPointerDownOutside: l,
                        onFocusOutside: (e) => e.preventDefault(),
                        onDismiss: h,
                        children: (0, v.jsxs)(c.Content, {
                            'data-state': u.stateAttribute,
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
                                (0, v.jsx)(U, { children: n }),
                                (0, v.jsx)(I, {
                                    scope: r,
                                    isInside: !0,
                                    children: (0, v.jsx)(f.Root, {
                                        id: u.contentId,
                                        role: 'tooltip',
                                        children: a || n,
                                    }),
                                }),
                            ],
                        }),
                    })
                );
            });
        L.displayName = A;
        var $ = 'TooltipArrow',
            z = o.forwardRef((e, t) => {
                let { __scopeTooltip: r, ...o } = e,
                    n = b(r);
                return H($, r).isInside
                    ? null
                    : (0, v.jsx)(c.Arrow, { ...n, ...o, ref: t });
            });
        ((z.displayName = $),
            e.s(
                [
                    'Arrow',
                    () => z,
                    'Content',
                    () => L,
                    'Portal',
                    () => F,
                    'Provider',
                    () => P,
                    'Root',
                    () => k,
                    'TooltipProvider',
                    () => P,
                    'Trigger',
                    () => N,
                ],
                83972
            ));
        var V = e.i(975157);
        function Y({ delayDuration: e = 0, ...t }) {
            return (0, v.jsx)(P, {
                'data-slot': 'tooltip-provider',
                delayDuration: e,
                ...t,
            });
        }
        function K({ ...e }) {
            return (0, v.jsx)(Y, {
                children: (0, v.jsx)(k, { 'data-slot': 'tooltip', ...e }),
            });
        }
        function W({ ...e }) {
            return (0, v.jsx)(N, { 'data-slot': 'tooltip-trigger', ...e });
        }
        function X({ className: e, sideOffset: t = 0, children: r, ...o }) {
            return (0, v.jsx)(F, {
                children: (0, v.jsxs)(L, {
                    'data-slot': 'tooltip-content',
                    sideOffset: t,
                    className: (0, V.cn)(
                        'bg-foreground-primary text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
                        e
                    ),
                    ...o,
                    children: [r, (0, v.jsx)(z, {})],
                }),
            });
        }
        e.s(
            [
                'Tooltip',
                () => K,
                'TooltipContent',
                () => X,
                'TooltipTrigger',
                () => W,
            ],
            746798
        );
    },
    393059,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(276389),
            o = e.i(512710),
            n = e.i(51866),
            a = e.i(87912),
            i = e.i(990341),
            s = e.i(245586),
            l = e.i(495794),
            c = e.i(230902),
            d = e.i(661977),
            u = e.i(432286),
            p = e.i(67356),
            h = e.i(519455),
            m = e.i(337822),
            f = e.i(83972),
            v = e.i(746798);
        let x = ({ tooltipText: e, onClick: r, children: o }) =>
            (0, t.jsx)(f.TooltipProvider, {
                children: (0, t.jsxs)(v.Tooltip, {
                    children: [
                        (0, t.jsx)(v.TooltipTrigger, {
                            asChild: !0,
                            children: (0, t.jsx)(h.Button, {
                                variant: 'outline',
                                size: 'icon',
                                onClick: r,
                                className:
                                    'h-12 w-9 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                children: o,
                            }),
                        }),
                        (0, t.jsx)(v.TooltipContent, {
                            className: 'bg-background-tertiary',
                            children: (0, t.jsx)('p', { children: e }),
                        }),
                    ],
                }),
            });
        var g = e.i(975157);
        e.s(
            [
                'MonthPicker',
                0,
                () => {
                    let e = (0, s.useRouter)(),
                        f = (0, s.usePathname)(),
                        v = (0, s.useSearchParams)(),
                        b = v.get('month'),
                        y = (0, i.useCallback)(() => {
                            if (!b) return (0, u.startOfMonth)(new Date());
                            let [e, t] = b.split('-').map(Number),
                                r = new Date(e, t - 1, 1);
                            return (0, d.isValid)(r)
                                ? (0, u.startOfMonth)(r)
                                : (0, u.startOfMonth)(new Date());
                        }, [b]),
                        [C, j] = (0, i.useState)(() => y()),
                        [w, P] = (0, i.useState)(!1),
                        R = (t) => {
                            let r = new URLSearchParams(v.toString());
                            (r.set('month', (0, c.format)(t, 'yyyy-MM')),
                                r.has('page') && r.set('page', '1'));
                            let o = r.toString();
                            e.push(o ? `${f}?${o}` : f);
                        },
                        T = (e) => {
                            let t = C ?? (0, u.startOfMonth)(new Date()),
                                r = (0, u.startOfMonth)((0, l.addMonths)(t, e));
                            (j(r), R(r));
                        };
                    (0, i.useEffect)(() => {
                        j(y());
                    }, [y]);
                    let S = C.getFullYear(),
                        k = C.getMonth(),
                        M = (0, c.format)(C, "MMMM 'de' yyyy", {
                            locale: p.ptBR,
                        }),
                        N = M.charAt(0).toUpperCase() + M.slice(1),
                        E = Array.from({ length: 12 }, (e, t) => t);
                    return (0, t.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            (0, t.jsx)(x, {
                                tooltipText: 'Mês anterior',
                                onClick: () => T(-1),
                                children: (0, t.jsx)(n.ChevronLeft, {
                                    className: 'h-4 w-4',
                                }),
                            }),
                            (0, t.jsxs)(m.Popover, {
                                open: w,
                                onOpenChange: P,
                                children: [
                                    (0, t.jsx)(m.PopoverTrigger, {
                                        asChild: !0,
                                        children: (0, t.jsxs)(h.Button, {
                                            variant: 'outline',
                                            className:
                                                'min-w-[220px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
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
                                                            className:
                                                                'truncate',
                                                            children: N,
                                                        }),
                                                    ],
                                                }),
                                                (0, t.jsx)(o.ChevronDown, {
                                                    className:
                                                        'h-4 w-4 opacity-50',
                                                }),
                                            ],
                                        }),
                                    }),
                                    (0, t.jsxs)(m.PopoverContent, {
                                        className:
                                            'w-[272px] p-0 rounded-xl border border-border-primary bg-background-secondary',
                                        children: [
                                            (0, t.jsx)('div', {
                                                className:
                                                    'flex items-center justify-between border-b border-border-primary px-3 py-2',
                                                children: (0, t.jsxs)('span', {
                                                    className:
                                                        'text-label-small text-content-secondary',
                                                    children: [
                                                        'Selecione um mês de ',
                                                        S,
                                                    ],
                                                }),
                                            }),
                                            (0, t.jsx)('div', {
                                                className:
                                                    'grid grid-cols-3 gap-2 p-3',
                                                children: E.map((e) => {
                                                    let r = new Date(S, e, 1),
                                                        o = (0, c.format)(
                                                            r,
                                                            'MMM',
                                                            { locale: p.ptBR }
                                                        );
                                                    return (0, t.jsx)(
                                                        'button',
                                                        {
                                                            type: 'button',
                                                            onClick: () => {
                                                                let t, r;
                                                                return (
                                                                    (t =
                                                                        C ??
                                                                        (0,
                                                                        u.startOfMonth)(
                                                                            new Date()
                                                                        )),
                                                                    void (j(
                                                                        (r = (0,
                                                                        u.startOfMonth)(
                                                                            new Date(
                                                                                t.getFullYear(),
                                                                                e,
                                                                                1
                                                                            )
                                                                        ))
                                                                    ),
                                                                    R(r),
                                                                    P(!1))
                                                                );
                                                            },
                                                            className: (0,
                                                            g.cn)(
                                                                'flex h-9 items-center justify-center rounded-md border text-label-small transition-colors',
                                                                'border-border-primary text-content-secondary hover:bg-background-tertiary hover:text-content-primary',
                                                                e === k &&
                                                                    'border-border-brand text-content-primary font-semibold bg-background-tertiary/60 shadow-sm'
                                                            ),
                                                            children: o,
                                                        },
                                                        e
                                                    );
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, t.jsx)(x, {
                                tooltipText: 'Próximo mês',
                                onClick: () => T(1),
                                children: (0, t.jsx)(a.ChevronRight, {
                                    className: 'h-4 w-4',
                                }),
                            }),
                        ],
                    });
                },
            ],
            393059
        );
    },
    735068,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            o = e.i(245586),
            n = e.i(967489);
        function a({
            units: e,
            value: a,
            label: i = 'Unidade',
            cookieName: s = 'admin_unit_context',
            allValue: l = 'all',
        }) {
            let c = (0, o.useRouter)(),
                d = r.useMemo(() => [{ id: l, name: 'Todas' }, ...e], [e, l]),
                u = r.useMemo(
                    () => (a && d.some((e) => e.id === a) ? a : l),
                    [a, d, l]
                );
            return (0, t.jsxs)('div', {
                className: 'space-y-2',
                children: [
                    (0, t.jsx)('p', {
                        className: 'text-label-small text-content-secondary',
                        children: i,
                    }),
                    (0, t.jsxs)(n.Select, {
                        value: u,
                        onValueChange: (e) => {
                            ((document.cookie = `${encodeURIComponent(s)}=${encodeURIComponent(e)}; Path=/; Max-Age=31536000; SameSite=Lax`),
                                c.refresh());
                        },
                        children: [
                            (0, t.jsx)(n.SelectTrigger, {
                                className: 'w-full',
                                children: (0, t.jsx)(n.SelectValue, {
                                    placeholder: 'Selecione',
                                }),
                            }),
                            (0, t.jsx)(n.SelectContent, {
                                children: d.map((e) =>
                                    (0, t.jsx)(
                                        n.SelectItem,
                                        { value: e.id, children: e.name },
                                        e.id
                                    )
                                ),
                            }),
                        ],
                    }),
                ],
            });
        }
        e.s(['UnitFilter', () => a]);
    },
    945145,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            o = e.i(245586),
            n = e.i(967489);
        let a = [
            { value: 'prev_month', label: 'Mês anterior' },
            { value: 'prev_year', label: 'Mesmo mês do ano anterior' },
        ];
        function i({
            value: e,
            paramKey: i = 'compare',
            label: s = 'Comparar com',
            options: l = a,
        }) {
            let c = (0, o.useRouter)(),
                d = (0, o.usePathname)(),
                u = (0, o.useSearchParams)(),
                p = (0, r.useMemo)(
                    () =>
                        (l.some((t) => t.value === e) ? e : null) ??
                        'prev_month',
                    [l, e]
                );
            return (0, t.jsxs)('div', {
                className: 'space-y-2',
                children: [
                    (0, t.jsx)('p', {
                        className: 'text-label-small text-content-secondary',
                        children: s,
                    }),
                    (0, t.jsxs)(n.Select, {
                        value: p,
                        onValueChange: (e) => {
                            let t, r;
                            return (
                                (t = new URLSearchParams(u?.toString())).set(
                                    i,
                                    e
                                ),
                                (r = t.toString()),
                                void c.push(r ? `${d}?${r}` : d)
                            );
                        },
                        children: [
                            (0, t.jsx)(n.SelectTrigger, {
                                className: 'h-12 min-h-12 py-2',
                                children: (0, t.jsx)(n.SelectValue, {
                                    placeholder: 'Selecione',
                                }),
                            }),
                            (0, t.jsx)(n.SelectContent, {
                                children: l.map((e) =>
                                    (0, t.jsx)(
                                        n.SelectItem,
                                        { value: e.value, children: e.label },
                                        e.value
                                    )
                                ),
                            }),
                        ],
                    }),
                ],
            });
        }
        e.s(['CompareWithFilter', () => i]);
    },
    788980,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            o = e.i(245586),
            n = e.i(967489);
        let a = [
            { value: 30, label: '30 dias' },
            { value: 60, label: '60 dias' },
            { value: 90, label: '90 dias' },
        ];
        function i(e) {
            return 60 === e ? 60 : 90 === e ? 90 : 30;
        }
        function s({
            value: e,
            paramKey: s = 'window',
            label: l = 'Janela',
            options: c = a,
        }) {
            let d = (0, o.useRouter)(),
                u = (0, o.usePathname)(),
                p = (0, o.useSearchParams)(),
                h = (0, r.useMemo)(() => String(i(e)), [e]);
            return (0, t.jsxs)('div', {
                className: 'space-y-2',
                children: [
                    (0, t.jsx)('p', {
                        className: 'text-label-small text-content-secondary',
                        children: l,
                    }),
                    (0, t.jsxs)(n.Select, {
                        value: h,
                        onValueChange: function (e) {
                            let t = Number(e),
                                r = i(Number.isFinite(t) ? t : null),
                                o = new URLSearchParams(p?.toString());
                            o.set(s, String(r));
                            let n = o.toString();
                            d.push(n ? `${u}?${n}` : u);
                        },
                        children: [
                            (0, t.jsx)(n.SelectTrigger, {
                                className: 'h-12 min-h-12 py-2',
                                children: (0, t.jsx)(n.SelectValue, {
                                    placeholder: 'Selecione',
                                }),
                            }),
                            (0, t.jsx)(n.SelectContent, {
                                children: c.map((e) =>
                                    (0, t.jsx)(
                                        n.SelectItem,
                                        {
                                            value: String(e.value),
                                            children: e.label,
                                        },
                                        e.value
                                    )
                                ),
                            }),
                        ],
                    }),
                ],
            });
        }
        e.s(['RetentionWindowFilter', () => s]);
    },
]);
