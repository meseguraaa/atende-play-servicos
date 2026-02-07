(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
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
            d = e.i(910529),
            c = e.i(75355),
            u = e.i(546354),
            p = e.i(861181),
            f = e.i(403078),
            h = e.i(655875),
            v = e.i(695145),
            m = e.i(73772),
            g = e.i(595357),
            x = 'Popover',
            [b, y] = (0, a.createContextScope)(x, [c.createPopperScope]),
            C = (0, c.createPopperScope)(),
            [w, j] = b(x),
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
                    [f, h] = r.useState(!1),
                    [m, g] = (0, v.useControllableState)({
                        prop: a,
                        defaultProp: i ?? !1,
                        onChange: s,
                        caller: x,
                    });
                return (0, t.jsx)(c.Root, {
                    ...u,
                    children: (0, t.jsx)(w, {
                        scope: o,
                        contentId: (0, d.useId)(),
                        triggerRef: p,
                        open: m,
                        onOpenChange: g,
                        onOpenToggle: r.useCallback(() => g((e) => !e), [g]),
                        hasCustomAnchor: f,
                        onCustomAnchorAdd: r.useCallback(() => h(!0), []),
                        onCustomAnchorRemove: r.useCallback(() => h(!1), []),
                        modal: l,
                        children: n,
                    }),
                });
            };
        P.displayName = x;
        var T = 'PopoverAnchor';
        r.forwardRef((e, o) => {
            let { __scopePopover: n, ...a } = e,
                i = j(T, n),
                s = C(n),
                { onCustomAnchorAdd: l, onCustomAnchorRemove: d } = i;
            return (
                r.useEffect(() => (l(), () => d()), [l, d]),
                (0, t.jsx)(c.Anchor, { ...s, ...a, ref: o })
            );
        }).displayName = T;
        var R = 'PopoverTrigger',
            E = r.forwardRef((e, r) => {
                let { __scopePopover: a, ...i } = e,
                    s = j(R, a),
                    l = C(a),
                    d = (0, n.useComposedRefs)(r, s.triggerRef),
                    u = (0, t.jsx)(f.Primitive.button, {
                        type: 'button',
                        'aria-haspopup': 'dialog',
                        'aria-expanded': s.open,
                        'aria-controls': s.contentId,
                        'data-state': I(s.open),
                        ...i,
                        ref: d,
                        onClick: (0, o.composeEventHandlers)(
                            e.onClick,
                            s.onOpenToggle
                        ),
                    });
                return s.hasCustomAnchor
                    ? u
                    : (0, t.jsx)(c.Anchor, { asChild: !0, ...l, children: u });
            });
        E.displayName = R;
        var k = 'PopoverPortal',
            [D, M] = b(k, { forceMount: void 0 }),
            N = (e) => {
                let {
                        __scopePopover: r,
                        forceMount: o,
                        children: n,
                        container: a,
                    } = e,
                    i = j(k, r);
                return (0, t.jsx)(D, {
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
        N.displayName = k;
        var O = 'PopoverContent',
            S = r.forwardRef((e, r) => {
                let o = M(O, e.__scopePopover),
                    { forceMount: n = o.forceMount, ...a } = e,
                    i = j(O, e.__scopePopover);
                return (0, t.jsx)(p.Presence, {
                    present: n || i.open,
                    children: i.modal
                        ? (0, t.jsx)(A, { ...a, ref: r })
                        : (0, t.jsx)(L, { ...a, ref: r }),
                });
            });
        S.displayName = O;
        var F = (0, h.createSlot)('PopoverContent.RemoveScroll'),
            A = r.forwardRef((e, a) => {
                let i = j(O, e.__scopePopover),
                    s = r.useRef(null),
                    l = (0, n.useComposedRefs)(a, s),
                    d = r.useRef(!1);
                return (
                    r.useEffect(() => {
                        let e = s.current;
                        if (e) return (0, m.hideOthers)(e);
                    }, []),
                    (0, t.jsx)(g.RemoveScroll, {
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
                                        d.current ||
                                            i.triggerRef.current?.focus());
                                }
                            ),
                            onPointerDownOutside: (0, o.composeEventHandlers)(
                                e.onPointerDownOutside,
                                (e) => {
                                    let t = e.detail.originalEvent,
                                        r = 0 === t.button && !0 === t.ctrlKey;
                                    d.current = 2 === t.button || r;
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
                let n = j(O, e.__scopePopover),
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
                        onCloseAutoFocus: d,
                        disableOutsidePointerEvents: u,
                        onEscapeKeyDown: p,
                        onPointerDownOutside: f,
                        onFocusOutside: h,
                        onInteractOutside: v,
                        ...m
                    } = e,
                    g = j(O, o),
                    x = C(o);
                return (
                    (0, s.useFocusGuards)(),
                    (0, t.jsx)(l.FocusScope, {
                        asChild: !0,
                        loop: !0,
                        trapped: n,
                        onMountAutoFocus: a,
                        onUnmountAutoFocus: d,
                        children: (0, t.jsx)(i.DismissableLayer, {
                            asChild: !0,
                            disableOutsidePointerEvents: u,
                            onInteractOutside: v,
                            onEscapeKeyDown: p,
                            onPointerDownOutside: f,
                            onFocusOutside: h,
                            onDismiss: () => g.onOpenChange(!1),
                            children: (0, t.jsx)(c.Content, {
                                'data-state': I(g.open),
                                role: 'dialog',
                                id: g.contentId,
                                ...x,
                                ...m,
                                ref: r,
                                style: {
                                    ...m.style,
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
            H = 'PopoverClose';
        function I(e) {
            return e ? 'open' : 'closed';
        }
        ((r.forwardRef((e, r) => {
            let { __scopePopover: n, ...a } = e,
                i = j(H, n);
            return (0, t.jsx)(f.Primitive.button, {
                type: 'button',
                ...a,
                ref: r,
                onClick: (0, o.composeEventHandlers)(e.onClick, () =>
                    i.onOpenChange(!1)
                ),
            });
        }).displayName = H),
            (r.forwardRef((e, r) => {
                let { __scopePopover: o, ...n } = e,
                    a = C(o);
                return (0, t.jsx)(c.Arrow, { ...a, ...n, ref: r });
            }).displayName = 'PopoverArrow'));
        var B = e.i(975157);
        function Y({ ...e }) {
            return (0, t.jsx)(P, { 'data-slot': 'popover', ...e });
        }
        function z({ ...e }) {
            return (0, t.jsx)(E, { 'data-slot': 'popover-trigger', ...e });
        }
        function U({
            className: e,
            align: r = 'center',
            sideOffset: o = 4,
            ...n
        }) {
            return (0, t.jsx)(N, {
                children: (0, t.jsx)(S, {
                    'data-slot': 'popover-content',
                    align: r,
                    sideOffset: o,
                    className: (0, B.cn)(
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
                () => Y,
                'PopoverContent',
                () => U,
                'PopoverTrigger',
                () => z,
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
            d = e.i(75355),
            c = e.i(546354),
            u = e.i(861181),
            p = e.i(403078),
            f = e.i(655875),
            h = e.i(695145),
            v = e.i(880282),
            m = e.i(565750),
            [g, x] = (0, i.createContextScope)('Tooltip', [
                d.createPopperScope,
            ]),
            b = (0, d.createPopperScope)(),
            y = 'TooltipProvider',
            C = 'tooltip.open',
            [w, j] = g(y),
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
                    d = o.useRef(0);
                return (
                    o.useEffect(() => {
                        let e = d.current;
                        return () => window.clearTimeout(e);
                    }, []),
                    (0, m.jsx)(w, {
                        scope: t,
                        isOpenDelayedRef: s,
                        delayDuration: r,
                        onOpen: o.useCallback(() => {
                            (window.clearTimeout(d.current), (s.current = !1));
                        }, []),
                        onClose: o.useCallback(() => {
                            (window.clearTimeout(d.current),
                                (d.current = window.setTimeout(
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
        var T = 'Tooltip',
            [R, E] = g(T),
            k = (e) => {
                let {
                        __scopeTooltip: t,
                        children: r,
                        open: n,
                        defaultOpen: a,
                        onOpenChange: i,
                        disableHoverableContent: s,
                        delayDuration: c,
                    } = e,
                    u = j(T, e.__scopeTooltip),
                    p = b(t),
                    [f, v] = o.useState(null),
                    g = (0, l.useId)(),
                    x = o.useRef(0),
                    y = s ?? u.disableHoverableContent,
                    w = c ?? u.delayDuration,
                    P = o.useRef(!1),
                    [E, k] = (0, h.useControllableState)({
                        prop: n,
                        defaultProp: a ?? !1,
                        onChange: (e) => {
                            (e
                                ? (u.onOpen(),
                                  document.dispatchEvent(new CustomEvent(C)))
                                : u.onClose(),
                                i?.(e));
                        },
                        caller: T,
                    }),
                    D = o.useMemo(
                        () =>
                            E
                                ? P.current
                                    ? 'delayed-open'
                                    : 'instant-open'
                                : 'closed',
                        [E]
                    ),
                    M = o.useCallback(() => {
                        (window.clearTimeout(x.current),
                            (x.current = 0),
                            (P.current = !1),
                            k(!0));
                    }, [k]),
                    N = o.useCallback(() => {
                        (window.clearTimeout(x.current),
                            (x.current = 0),
                            k(!1));
                    }, [k]),
                    O = o.useCallback(() => {
                        (window.clearTimeout(x.current),
                            (x.current = window.setTimeout(() => {
                                ((P.current = !0), k(!0), (x.current = 0));
                            }, w)));
                    }, [w, k]);
                return (
                    o.useEffect(
                        () => () => {
                            x.current &&
                                (window.clearTimeout(x.current),
                                (x.current = 0));
                        },
                        []
                    ),
                    (0, m.jsx)(d.Root, {
                        ...p,
                        children: (0, m.jsx)(R, {
                            scope: t,
                            contentId: g,
                            open: E,
                            stateAttribute: D,
                            trigger: f,
                            onTriggerChange: v,
                            onTriggerEnter: o.useCallback(() => {
                                u.isOpenDelayedRef.current ? O() : M();
                            }, [u.isOpenDelayedRef, O, M]),
                            onTriggerLeave: o.useCallback(() => {
                                y
                                    ? N()
                                    : (window.clearTimeout(x.current),
                                      (x.current = 0));
                            }, [N, y]),
                            onOpen: M,
                            onClose: N,
                            disableHoverableContent: y,
                            children: r,
                        }),
                    })
                );
            };
        k.displayName = T;
        var D = 'TooltipTrigger',
            M = o.forwardRef((e, t) => {
                let { __scopeTooltip: r, ...i } = e,
                    s = E(D, r),
                    l = j(D, r),
                    c = b(r),
                    u = o.useRef(null),
                    f = (0, a.useComposedRefs)(t, u, s.onTriggerChange),
                    h = o.useRef(!1),
                    v = o.useRef(!1),
                    g = o.useCallback(() => (h.current = !1), []);
                return (
                    o.useEffect(
                        () => () =>
                            document.removeEventListener('pointerup', g),
                        [g]
                    ),
                    (0, m.jsx)(d.Anchor, {
                        asChild: !0,
                        ...c,
                        children: (0, m.jsx)(p.Primitive.button, {
                            'aria-describedby': s.open ? s.contentId : void 0,
                            'data-state': s.stateAttribute,
                            ...i,
                            ref: f,
                            onPointerMove: (0, n.composeEventHandlers)(
                                e.onPointerMove,
                                (e) => {
                                    'touch' !== e.pointerType &&
                                        (v.current ||
                                            l.isPointerInTransitRef.current ||
                                            (s.onTriggerEnter(),
                                            (v.current = !0)));
                                }
                            ),
                            onPointerLeave: (0, n.composeEventHandlers)(
                                e.onPointerLeave,
                                () => {
                                    (s.onTriggerLeave(), (v.current = !1));
                                }
                            ),
                            onPointerDown: (0, n.composeEventHandlers)(
                                e.onPointerDown,
                                () => {
                                    (s.open && s.onClose(),
                                        (h.current = !0),
                                        document.addEventListener(
                                            'pointerup',
                                            g,
                                            { once: !0 }
                                        ));
                                }
                            ),
                            onFocus: (0, n.composeEventHandlers)(
                                e.onFocus,
                                () => {
                                    h.current || s.onOpen();
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
        M.displayName = D;
        var N = 'TooltipPortal',
            [O, S] = g(N, { forceMount: void 0 }),
            F = (e) => {
                let {
                        __scopeTooltip: t,
                        forceMount: r,
                        children: o,
                        container: n,
                    } = e,
                    a = E(N, t);
                return (0, m.jsx)(O, {
                    scope: t,
                    forceMount: r,
                    children: (0, m.jsx)(u.Presence, {
                        present: r || a.open,
                        children: (0, m.jsx)(c.Portal, {
                            asChild: !0,
                            container: n,
                            children: o,
                        }),
                    }),
                });
            };
        F.displayName = N;
        var A = 'TooltipContent',
            L = o.forwardRef((e, t) => {
                let r = S(A, e.__scopeTooltip),
                    { forceMount: o = r.forceMount, side: n = 'top', ...a } = e,
                    i = E(A, e.__scopeTooltip);
                return (0, m.jsx)(u.Presence, {
                    present: o || i.open,
                    children: i.disableHoverableContent
                        ? (0, m.jsx)(Y, { side: n, ...a, ref: t })
                        : (0, m.jsx)(_, { side: n, ...a, ref: t }),
                });
            }),
            _ = o.forwardRef((e, t) => {
                let r = E(A, e.__scopeTooltip),
                    n = j(A, e.__scopeTooltip),
                    i = o.useRef(null),
                    s = (0, a.useComposedRefs)(t, i),
                    [l, d] = o.useState(null),
                    { trigger: c, onClose: u } = r,
                    p = i.current,
                    { onPointerInTransitChange: f } = n,
                    h = o.useCallback(() => {
                        (d(null), f(!1));
                    }, [f]),
                    v = o.useCallback(
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
                            (d(
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
                                f(!0));
                        },
                        [f]
                    );
                return (
                    o.useEffect(() => () => h(), [h]),
                    o.useEffect(() => {
                        if (c && p) {
                            let e = (e) => v(e, p),
                                t = (e) => v(e, c);
                            return (
                                c.addEventListener('pointerleave', e),
                                p.addEventListener('pointerleave', t),
                                () => {
                                    (c.removeEventListener('pointerleave', e),
                                        p.removeEventListener(
                                            'pointerleave',
                                            t
                                        ));
                                }
                            );
                        }
                    }, [c, p, v, h]),
                    o.useEffect(() => {
                        if (l) {
                            let e = (e) => {
                                let t = e.target,
                                    r = { x: e.clientX, y: e.clientY },
                                    o = c?.contains(t) || p?.contains(t),
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
                                                d = i.y,
                                                c = s.x,
                                                u = s.y;
                                            d > o != u > o &&
                                                r <
                                                    ((c - l) * (o - d)) /
                                                        (u - d) +
                                                        l &&
                                                (n = !n);
                                        }
                                        return n;
                                    })(r, l);
                                o ? h() : n && (h(), u());
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
                    }, [c, p, l, u, h]),
                    (0, m.jsx)(Y, { ...e, ref: s })
                );
            }),
            [H, I] = g(T, { isInside: !1 }),
            B = (0, f.createSlottable)('TooltipContent'),
            Y = o.forwardRef((e, t) => {
                let {
                        __scopeTooltip: r,
                        children: n,
                        'aria-label': a,
                        onEscapeKeyDown: i,
                        onPointerDownOutside: l,
                        ...c
                    } = e,
                    u = E(A, r),
                    p = b(r),
                    { onClose: f } = u;
                return (
                    o.useEffect(
                        () => (
                            document.addEventListener(C, f),
                            () => document.removeEventListener(C, f)
                        ),
                        [f]
                    ),
                    o.useEffect(() => {
                        if (u.trigger) {
                            let e = (e) => {
                                let t = e.target;
                                t?.contains(u.trigger) && f();
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
                    }, [u.trigger, f]),
                    (0, m.jsx)(s.DismissableLayer, {
                        asChild: !0,
                        disableOutsidePointerEvents: !1,
                        onEscapeKeyDown: i,
                        onPointerDownOutside: l,
                        onFocusOutside: (e) => e.preventDefault(),
                        onDismiss: f,
                        children: (0, m.jsxs)(d.Content, {
                            'data-state': u.stateAttribute,
                            ...p,
                            ...c,
                            ref: t,
                            style: {
                                ...c.style,
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
                                (0, m.jsx)(B, { children: n }),
                                (0, m.jsx)(H, {
                                    scope: r,
                                    isInside: !0,
                                    children: (0, m.jsx)(v.Root, {
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
        var z = 'TooltipArrow',
            U = o.forwardRef((e, t) => {
                let { __scopeTooltip: r, ...o } = e,
                    n = b(r);
                return I(z, r).isInside
                    ? null
                    : (0, m.jsx)(d.Arrow, { ...n, ...o, ref: t });
            });
        ((U.displayName = z),
            e.s(
                [
                    'Arrow',
                    () => U,
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
                    () => M,
                ],
                83972
            ));
        var $ = e.i(975157);
        function K({ delayDuration: e = 0, ...t }) {
            return (0, m.jsx)(P, {
                'data-slot': 'tooltip-provider',
                delayDuration: e,
                ...t,
            });
        }
        function V({ ...e }) {
            return (0, m.jsx)(K, {
                children: (0, m.jsx)(k, { 'data-slot': 'tooltip', ...e }),
            });
        }
        function X({ ...e }) {
            return (0, m.jsx)(M, { 'data-slot': 'tooltip-trigger', ...e });
        }
        function q({ className: e, sideOffset: t = 0, children: r, ...o }) {
            return (0, m.jsx)(F, {
                children: (0, m.jsxs)(L, {
                    'data-slot': 'tooltip-content',
                    sideOffset: t,
                    className: (0, $.cn)(
                        'bg-foreground-primary text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
                        e
                    ),
                    ...o,
                    children: [r, (0, m.jsx)(U, {})],
                }),
            });
        }
        e.s(
            [
                'Tooltip',
                () => V,
                'TooltipContent',
                () => q,
                'TooltipTrigger',
                () => X,
            ],
            746798
        );
    },
    825296,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(276389),
            o = e.i(512710),
            n = e.i(51866),
            a = e.i(87912),
            i = e.i(245586),
            s = e.i(990341),
            l = e.i(598279),
            d = e.i(495794),
            c = e.i(230902),
            u = e.i(661977),
            p = e.i(67356),
            f = e.i(519455),
            h = e.i(227766),
            v = e.i(337822),
            m = e.i(83972),
            g = e.i(746798);
        let x = ({ tooltipText: e, onClick: r, children: o }) =>
            (0, t.jsx)(m.TooltipProvider, {
                children: (0, t.jsxs)(g.Tooltip, {
                    children: [
                        (0, t.jsx)(g.TooltipTrigger, {
                            asChild: !0,
                            children: (0, t.jsx)(f.Button, {
                                variant: 'outline',
                                size: 'icon',
                                onClick: r,
                                className:
                                    'h-12 w-9 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                children: o,
                            }),
                        }),
                        (0, t.jsx)(g.TooltipContent, {
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
                ({ mode: e = 'date', hideNavigation: m }) => {
                    let g = (0, i.useRouter)(),
                        b = (0, i.usePathname)(),
                        y = (0, i.useSearchParams)(),
                        C = 'month' === e ? 'month' : 'date',
                        w = y.get(C),
                        j = (0, s.useCallback)(() => {
                            if ('month' === e) {
                                if (!w) return new Date();
                                let [e, t] = w.split('-').map(Number),
                                    r = new Date(e, (t ?? 1) - 1, 1);
                                return (0, u.isValid)(r) ? r : new Date();
                            }
                            if (!w) return new Date();
                            let [t, r, o] = w.split('-').map(Number),
                                n = new Date(t, (r ?? 1) - 1, o ?? 1);
                            return (0, u.isValid)(n) ? n : new Date();
                        }, [e, w]),
                        [P, T] = (0, s.useState)(() => j()),
                        [R, E] = (0, s.useState)(!1),
                        k = (0, s.useMemo)(
                            () =>
                                P
                                    ? 'month' === e
                                        ? (0, c.format)(P, 'MM/yyyy', {
                                              locale: p.ptBR,
                                          })
                                        : (0, c.format)(P, 'dd/MM/yyyy', {
                                              locale: p.ptBR,
                                          })
                                    : 'Selecione uma data',
                            [P, e]
                        ),
                        D = (t) => {
                            let r = new URLSearchParams(y.toString());
                            if (
                                ('month' === e
                                    ? r.delete('date')
                                    : r.delete('month'),
                                'month' === e)
                            ) {
                                var o;
                                let e = new Date(
                                    t.getFullYear(),
                                    t.getMonth(),
                                    1
                                );
                                r.set(
                                    'month',
                                    ((o = e),
                                    `${o.getFullYear()}-${String(o.getMonth() + 1).padStart(2, '0')}`)
                                );
                            } else
                                r.set('date', (0, c.format)(t, 'yyyy-MM-dd'));
                            let n = r.toString();
                            g.push(n ? `${b}?${n}` : b);
                        },
                        M = (t) => {
                            let r = P ?? new Date(),
                                o =
                                    'month' === e
                                        ? (0, d.addMonths)(r, t)
                                        : (0, l.addDays)(r, t),
                                n =
                                    'month' === e
                                        ? new Date(
                                              o.getFullYear(),
                                              o.getMonth(),
                                              1
                                          )
                                        : o;
                            (T(n), D(n));
                        };
                    (0, s.useEffect)(() => {
                        T(j());
                    }, [j]);
                    let N = 'month' === e ? 'Mês anterior' : 'Dia anterior',
                        O = 'month' === e ? 'Próximo mês' : 'Próximo dia';
                    return (0, t.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            !m &&
                                (0, t.jsx)(x, {
                                    tooltipText: N,
                                    onClick: () => M(-1),
                                    children: (0, t.jsx)(n.ChevronLeft, {
                                        className: 'h-4 w-4',
                                    }),
                                }),
                            (0, t.jsxs)(v.Popover, {
                                open: R,
                                onOpenChange: E,
                                children: [
                                    (0, t.jsx)(v.PopoverTrigger, {
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
                                                            children: k,
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
                                    (0, t.jsx)(v.PopoverContent, {
                                        className: 'w-auto p-0',
                                        children: (0, t.jsx)(h.Calendar, {
                                            mode: 'single',
                                            selected: P,
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
                                                    (T(r), D(r));
                                                }
                                                E(!1);
                                            },
                                            autoFocus: !0,
                                            locale: p.ptBR,
                                        }),
                                    }),
                                ],
                            }),
                            !m &&
                                (0, t.jsx)(x, {
                                    tooltipText: O,
                                    onClick: () => M(1),
                                    children: (0, t.jsx)(a.ChevronRight, {
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
