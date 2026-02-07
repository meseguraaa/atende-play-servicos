module.exports = [
    207958,
    (a) => {
        'use strict';
        let b = (0, a.i(203431).default)('calendar', [
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
        a.s(['default', () => b]);
    },
    264738,
    510187,
    912288,
    838441,
    (a) => {
        'use strict';
        var b = a.i(203431);
        let c = (0, b.default)('chevron-left', [
            ['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }],
        ]);
        a.s(['default', () => c], 264738);
        let d = (0, b.default)('chevron-right', [
            ['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }],
        ]);
        a.s(['default', () => d], 510187);
        var e = a.i(788839),
            f = a.i(939968);
        function g(a, b, c) {
            let d = (0, f.toDate)(a, c?.in);
            if (isNaN(b)) return (0, e.constructFrom)(c?.in || a, NaN);
            if (!b) return d;
            let g = d.getDate(),
                h = (0, e.constructFrom)(c?.in || a, d.getTime());
            return (h.setMonth(d.getMonth() + b + 1, 0), g >= h.getDate())
                ? h
                : (d.setFullYear(h.getFullYear(), h.getMonth(), g), d);
        }
        function h(a, b) {
            let c = (0, f.toDate)(a, b?.in);
            return (c.setDate(1), c.setHours(0, 0, 0, 0), c);
        }
        (a.s(['addMonths', () => g], 912288),
            a.s(['startOfMonth', () => h], 838441));
    },
    599209,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(559653),
            e = a.i(594723),
            f = a.i(752993),
            g = a.i(167139),
            h = a.i(859909),
            i = a.i(612655),
            j = a.i(977200),
            k = a.i(397063),
            l = a.i(574917),
            m = a.i(929629),
            n = a.i(256480),
            o = a.i(452662),
            p = a.i(765639),
            q = a.i(516164),
            r = a.i(459454),
            s = 'Popover',
            [t, u] = (0, f.createContextScope)(s, [k.createPopperScope]),
            v = (0, k.createPopperScope)(),
            [w, x] = t(s),
            y = (a) => {
                let {
                        __scopePopover: d,
                        children: e,
                        open: f,
                        defaultOpen: g,
                        onOpenChange: h,
                        modal: i = !1,
                    } = a,
                    l = v(d),
                    m = c.useRef(null),
                    [n, o] = c.useState(!1),
                    [q, r] = (0, p.useControllableState)({
                        prop: f,
                        defaultProp: g ?? !1,
                        onChange: h,
                        caller: s,
                    });
                return (0, b.jsx)(k.Root, {
                    ...l,
                    children: (0, b.jsx)(w, {
                        scope: d,
                        contentId: (0, j.useId)(),
                        triggerRef: m,
                        open: q,
                        onOpenChange: r,
                        onOpenToggle: c.useCallback(() => r((a) => !a), [r]),
                        hasCustomAnchor: n,
                        onCustomAnchorAdd: c.useCallback(() => o(!0), []),
                        onCustomAnchorRemove: c.useCallback(() => o(!1), []),
                        modal: i,
                        children: e,
                    }),
                });
            };
        y.displayName = s;
        var z = 'PopoverAnchor';
        c.forwardRef((a, d) => {
            let { __scopePopover: e, ...f } = a,
                g = x(z, e),
                h = v(e),
                { onCustomAnchorAdd: i, onCustomAnchorRemove: j } = g;
            return (
                c.useEffect(() => (i(), () => j()), [i, j]),
                (0, b.jsx)(k.Anchor, { ...h, ...f, ref: d })
            );
        }).displayName = z;
        var A = 'PopoverTrigger',
            B = c.forwardRef((a, c) => {
                let { __scopePopover: f, ...g } = a,
                    h = x(A, f),
                    i = v(f),
                    j = (0, e.useComposedRefs)(c, h.triggerRef),
                    l = (0, b.jsx)(n.Primitive.button, {
                        type: 'button',
                        'aria-haspopup': 'dialog',
                        'aria-expanded': h.open,
                        'aria-controls': h.contentId,
                        'data-state': N(h.open),
                        ...g,
                        ref: j,
                        onClick: (0, d.composeEventHandlers)(
                            a.onClick,
                            h.onOpenToggle
                        ),
                    });
                return h.hasCustomAnchor
                    ? l
                    : (0, b.jsx)(k.Anchor, { asChild: !0, ...i, children: l });
            });
        B.displayName = A;
        var C = 'PopoverPortal',
            [D, E] = t(C, { forceMount: void 0 }),
            F = (a) => {
                let {
                        __scopePopover: c,
                        forceMount: d,
                        children: e,
                        container: f,
                    } = a,
                    g = x(C, c);
                return (0, b.jsx)(D, {
                    scope: c,
                    forceMount: d,
                    children: (0, b.jsx)(m.Presence, {
                        present: d || g.open,
                        children: (0, b.jsx)(l.Portal, {
                            asChild: !0,
                            container: f,
                            children: e,
                        }),
                    }),
                });
            };
        F.displayName = C;
        var G = 'PopoverContent',
            H = c.forwardRef((a, c) => {
                let d = E(G, a.__scopePopover),
                    { forceMount: e = d.forceMount, ...f } = a,
                    g = x(G, a.__scopePopover);
                return (0, b.jsx)(m.Presence, {
                    present: e || g.open,
                    children: g.modal
                        ? (0, b.jsx)(J, { ...f, ref: c })
                        : (0, b.jsx)(K, { ...f, ref: c }),
                });
            });
        H.displayName = G;
        var I = (0, o.createSlot)('PopoverContent.RemoveScroll'),
            J = c.forwardRef((a, f) => {
                let g = x(G, a.__scopePopover),
                    h = c.useRef(null),
                    i = (0, e.useComposedRefs)(f, h),
                    j = c.useRef(!1);
                return (
                    c.useEffect(() => {
                        let a = h.current;
                        if (a) return (0, q.hideOthers)(a);
                    }, []),
                    (0, b.jsx)(r.RemoveScroll, {
                        as: I,
                        allowPinchZoom: !0,
                        children: (0, b.jsx)(L, {
                            ...a,
                            ref: i,
                            trapFocus: g.open,
                            disableOutsidePointerEvents: !0,
                            onCloseAutoFocus: (0, d.composeEventHandlers)(
                                a.onCloseAutoFocus,
                                (a) => {
                                    (a.preventDefault(),
                                        j.current ||
                                            g.triggerRef.current?.focus());
                                }
                            ),
                            onPointerDownOutside: (0, d.composeEventHandlers)(
                                a.onPointerDownOutside,
                                (a) => {
                                    let b = a.detail.originalEvent,
                                        c = 0 === b.button && !0 === b.ctrlKey;
                                    j.current = 2 === b.button || c;
                                },
                                { checkForDefaultPrevented: !1 }
                            ),
                            onFocusOutside: (0, d.composeEventHandlers)(
                                a.onFocusOutside,
                                (a) => a.preventDefault(),
                                { checkForDefaultPrevented: !1 }
                            ),
                        }),
                    })
                );
            }),
            K = c.forwardRef((a, d) => {
                let e = x(G, a.__scopePopover),
                    f = c.useRef(!1),
                    g = c.useRef(!1);
                return (0, b.jsx)(L, {
                    ...a,
                    ref: d,
                    trapFocus: !1,
                    disableOutsidePointerEvents: !1,
                    onCloseAutoFocus: (b) => {
                        (a.onCloseAutoFocus?.(b),
                            b.defaultPrevented ||
                                (f.current || e.triggerRef.current?.focus(),
                                b.preventDefault()),
                            (f.current = !1),
                            (g.current = !1));
                    },
                    onInteractOutside: (b) => {
                        (a.onInteractOutside?.(b),
                            b.defaultPrevented ||
                                ((f.current = !0),
                                'pointerdown' === b.detail.originalEvent.type &&
                                    (g.current = !0)));
                        let c = b.target;
                        (e.triggerRef.current?.contains(c) &&
                            b.preventDefault(),
                            'focusin' === b.detail.originalEvent.type &&
                                g.current &&
                                b.preventDefault());
                    },
                });
            }),
            L = c.forwardRef((a, c) => {
                let {
                        __scopePopover: d,
                        trapFocus: e,
                        onOpenAutoFocus: f,
                        onCloseAutoFocus: j,
                        disableOutsidePointerEvents: l,
                        onEscapeKeyDown: m,
                        onPointerDownOutside: n,
                        onFocusOutside: o,
                        onInteractOutside: p,
                        ...q
                    } = a,
                    r = x(G, d),
                    s = v(d);
                return (
                    (0, h.useFocusGuards)(),
                    (0, b.jsx)(i.FocusScope, {
                        asChild: !0,
                        loop: !0,
                        trapped: e,
                        onMountAutoFocus: f,
                        onUnmountAutoFocus: j,
                        children: (0, b.jsx)(g.DismissableLayer, {
                            asChild: !0,
                            disableOutsidePointerEvents: l,
                            onInteractOutside: p,
                            onEscapeKeyDown: m,
                            onPointerDownOutside: n,
                            onFocusOutside: o,
                            onDismiss: () => r.onOpenChange(!1),
                            children: (0, b.jsx)(k.Content, {
                                'data-state': N(r.open),
                                role: 'dialog',
                                id: r.contentId,
                                ...s,
                                ...q,
                                ref: c,
                                style: {
                                    ...q.style,
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
            M = 'PopoverClose';
        function N(a) {
            return a ? 'open' : 'closed';
        }
        ((c.forwardRef((a, c) => {
            let { __scopePopover: e, ...f } = a,
                g = x(M, e);
            return (0, b.jsx)(n.Primitive.button, {
                type: 'button',
                ...f,
                ref: c,
                onClick: (0, d.composeEventHandlers)(a.onClick, () =>
                    g.onOpenChange(!1)
                ),
            });
        }).displayName = M),
            (c.forwardRef((a, c) => {
                let { __scopePopover: d, ...e } = a,
                    f = v(d);
                return (0, b.jsx)(k.Arrow, { ...f, ...e, ref: c });
            }).displayName = 'PopoverArrow'));
        var O = a.i(368114);
        function P({ ...a }) {
            return (0, b.jsx)(y, { 'data-slot': 'popover', ...a });
        }
        function Q({ ...a }) {
            return (0, b.jsx)(B, { 'data-slot': 'popover-trigger', ...a });
        }
        function R({
            className: a,
            align: c = 'center',
            sideOffset: d = 4,
            ...e
        }) {
            return (0, b.jsx)(F, {
                children: (0, b.jsx)(H, {
                    'data-slot': 'popover-content',
                    align: c,
                    sideOffset: d,
                    className: (0, O.cn)(
                        'bg-popover text-popover-foreground border border-border-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md p-4 shadow-md outline-hidden',
                        a
                    ),
                    ...e,
                }),
            });
        }
        a.s(
            [
                'Popover',
                () => P,
                'PopoverContent',
                () => R,
                'PopoverTrigger',
                () => Q,
            ],
            599209
        );
    },
];

//# sourceMappingURL=_8b5fd513._.js.map
