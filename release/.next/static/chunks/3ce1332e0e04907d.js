(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
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
    342413,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(291967),
            a = e.i(672687),
            n = e.i(784711),
            o = e.i(910529),
            s = e.i(695145),
            i = e.i(846357),
            l = e.i(60126),
            d = e.i(546354),
            c = e.i(861181),
            u = e.i(403078),
            p = e.i(774621),
            m = e.i(595357),
            x = e.i(73772),
            h = e.i(655875),
            f = e.i(565750),
            g = 'Dialog',
            [b, v] = (0, n.createContextScope)(g),
            [y, j] = b(g),
            N = (e) => {
                let {
                        __scopeDialog: r,
                        children: a,
                        open: n,
                        defaultOpen: i,
                        onOpenChange: l,
                        modal: d = !0,
                    } = e,
                    c = t.useRef(null),
                    u = t.useRef(null),
                    [p, m] = (0, s.useControllableState)({
                        prop: n,
                        defaultProp: i ?? !1,
                        onChange: l,
                        caller: g,
                    });
                return (0, f.jsx)(y, {
                    scope: r,
                    triggerRef: c,
                    contentRef: u,
                    contentId: (0, o.useId)(),
                    titleId: (0, o.useId)(),
                    descriptionId: (0, o.useId)(),
                    open: p,
                    onOpenChange: m,
                    onOpenToggle: t.useCallback(() => m((e) => !e), [m]),
                    modal: d,
                    children: a,
                });
            };
        N.displayName = g;
        var C = 'DialogTrigger',
            w = t.forwardRef((e, t) => {
                let { __scopeDialog: n, ...o } = e,
                    s = j(C, n),
                    i = (0, a.useComposedRefs)(t, s.triggerRef);
                return (0, f.jsx)(u.Primitive.button, {
                    type: 'button',
                    'aria-haspopup': 'dialog',
                    'aria-expanded': s.open,
                    'aria-controls': s.contentId,
                    'data-state': q(s.open),
                    ...o,
                    ref: i,
                    onClick: (0, r.composeEventHandlers)(
                        e.onClick,
                        s.onOpenToggle
                    ),
                });
            });
        w.displayName = C;
        var k = 'DialogPortal',
            [D, R] = b(k, { forceMount: void 0 }),
            P = (e) => {
                let {
                        __scopeDialog: r,
                        forceMount: a,
                        children: n,
                        container: o,
                    } = e,
                    s = j(k, r);
                return (0, f.jsx)(D, {
                    scope: r,
                    forceMount: a,
                    children: t.Children.map(n, (e) =>
                        (0, f.jsx)(c.Presence, {
                            present: a || s.open,
                            children: (0, f.jsx)(d.Portal, {
                                asChild: !0,
                                container: o,
                                children: e,
                            }),
                        })
                    ),
                });
            };
        P.displayName = k;
        var T = 'DialogOverlay',
            E = t.forwardRef((e, t) => {
                let r = R(T, e.__scopeDialog),
                    { forceMount: a = r.forceMount, ...n } = e,
                    o = j(T, e.__scopeDialog);
                return o.modal
                    ? (0, f.jsx)(c.Presence, {
                          present: a || o.open,
                          children: (0, f.jsx)(O, { ...n, ref: t }),
                      })
                    : null;
            });
        E.displayName = T;
        var S = (0, h.createSlot)('DialogOverlay.RemoveScroll'),
            O = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...a } = e,
                    n = j(T, r);
                return (0, f.jsx)(m.RemoveScroll, {
                    as: S,
                    allowPinchZoom: !0,
                    shards: [n.contentRef],
                    children: (0, f.jsx)(u.Primitive.div, {
                        'data-state': q(n.open),
                        ...a,
                        ref: t,
                        style: { pointerEvents: 'auto', ...a.style },
                    }),
                });
            }),
            M = 'DialogContent',
            F = t.forwardRef((e, t) => {
                let r = R(M, e.__scopeDialog),
                    { forceMount: a = r.forceMount, ...n } = e,
                    o = j(M, e.__scopeDialog);
                return (0, f.jsx)(c.Presence, {
                    present: a || o.open,
                    children: o.modal
                        ? (0, f.jsx)(I, { ...n, ref: t })
                        : (0, f.jsx)(A, { ...n, ref: t }),
                });
            });
        F.displayName = M;
        var I = t.forwardRef((e, n) => {
                let o = j(M, e.__scopeDialog),
                    s = t.useRef(null),
                    i = (0, a.useComposedRefs)(n, o.contentRef, s);
                return (
                    t.useEffect(() => {
                        let e = s.current;
                        if (e) return (0, x.hideOthers)(e);
                    }, []),
                    (0, f.jsx)(_, {
                        ...e,
                        ref: i,
                        trapFocus: o.open,
                        disableOutsidePointerEvents: !0,
                        onCloseAutoFocus: (0, r.composeEventHandlers)(
                            e.onCloseAutoFocus,
                            (e) => {
                                (e.preventDefault(),
                                    o.triggerRef.current?.focus());
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
                let a = j(M, e.__scopeDialog),
                    n = t.useRef(!1),
                    o = t.useRef(!1);
                return (0, f.jsx)(_, {
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
                            (o.current = !1));
                    },
                    onInteractOutside: (t) => {
                        (e.onInteractOutside?.(t),
                            t.defaultPrevented ||
                                ((n.current = !0),
                                'pointerdown' === t.detail.originalEvent.type &&
                                    (o.current = !0)));
                        let r = t.target;
                        (a.triggerRef.current?.contains(r) &&
                            t.preventDefault(),
                            'focusin' === t.detail.originalEvent.type &&
                                o.current &&
                                t.preventDefault());
                    },
                });
            }),
            _ = t.forwardRef((e, r) => {
                let {
                        __scopeDialog: n,
                        trapFocus: o,
                        onOpenAutoFocus: s,
                        onCloseAutoFocus: d,
                        ...c
                    } = e,
                    u = j(M, n),
                    m = t.useRef(null),
                    x = (0, a.useComposedRefs)(r, m);
                return (
                    (0, p.useFocusGuards)(),
                    (0, f.jsxs)(f.Fragment, {
                        children: [
                            (0, f.jsx)(l.FocusScope, {
                                asChild: !0,
                                loop: !0,
                                trapped: o,
                                onMountAutoFocus: s,
                                onUnmountAutoFocus: d,
                                children: (0, f.jsx)(i.DismissableLayer, {
                                    role: 'dialog',
                                    id: u.contentId,
                                    'aria-describedby': u.descriptionId,
                                    'aria-labelledby': u.titleId,
                                    'data-state': q(u.open),
                                    ...c,
                                    ref: x,
                                    onDismiss: () => u.onOpenChange(!1),
                                }),
                            }),
                            (0, f.jsxs)(f.Fragment, {
                                children: [
                                    (0, f.jsx)(W, { titleId: u.titleId }),
                                    (0, f.jsx)(G, {
                                        contentRef: m,
                                        descriptionId: u.descriptionId,
                                    }),
                                ],
                            }),
                        ],
                    })
                );
            }),
            H = 'DialogTitle',
            L = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...a } = e,
                    n = j(H, r);
                return (0, f.jsx)(u.Primitive.h2, {
                    id: n.titleId,
                    ...a,
                    ref: t,
                });
            });
        L.displayName = H;
        var z = 'DialogDescription',
            B = t.forwardRef((e, t) => {
                let { __scopeDialog: r, ...a } = e,
                    n = j(z, r);
                return (0, f.jsx)(u.Primitive.p, {
                    id: n.descriptionId,
                    ...a,
                    ref: t,
                });
            });
        B.displayName = z;
        var V = 'DialogClose',
            $ = t.forwardRef((e, t) => {
                let { __scopeDialog: a, ...n } = e,
                    o = j(V, a);
                return (0, f.jsx)(u.Primitive.button, {
                    type: 'button',
                    ...n,
                    ref: t,
                    onClick: (0, r.composeEventHandlers)(e.onClick, () =>
                        o.onOpenChange(!1)
                    ),
                });
            });
        function q(e) {
            return e ? 'open' : 'closed';
        }
        $.displayName = V;
        var U = 'DialogTitleWarning',
            [Y, K] = (0, n.createContext)(U, {
                contentName: M,
                titleName: H,
                docsSlug: 'dialog',
            }),
            W = ({ titleId: e }) => {
                let r = K(U),
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
            G = ({ contentRef: e, descriptionId: r }) => {
                let a = K('DialogDescriptionWarning'),
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
            () => $,
            'Content',
            () => F,
            'Description',
            () => B,
            'Overlay',
            () => E,
            'Portal',
            () => P,
            'Root',
            () => N,
            'Title',
            () => L,
            'Trigger',
            () => w,
            'WarningProvider',
            () => Y,
            'createDialogScope',
            () => v,
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
            o = e.i(975157);
        function s({ ...e }) {
            return (0, t.jsx)(r.Root, { 'data-slot': 'dialog', ...e });
        }
        function i({ ...e }) {
            return (0, t.jsx)(r.Trigger, {
                'data-slot': 'dialog-trigger',
                ...e,
            });
        }
        function l({ ...e }) {
            return (0, t.jsx)(r.Portal, { 'data-slot': 'dialog-portal', ...e });
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
        function c({ className: e, variant: a, ...n }) {
            return (0, t.jsx)(r.Overlay, {
                'data-slot': 'dialog-overlay',
                className: (0, o.cn)(d({ variant: a }), e),
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
        function p({
            className: e,
            children: n,
            showCloseButton: s = !0,
            variant: i,
            overlayVariant: d,
            ...p
        }) {
            return (0, t.jsxs)(l, {
                'data-slot': 'dialog-portal',
                children: [
                    (0, t.jsx)(c, { variant: d }),
                    (0, t.jsxs)(r.Content, {
                        'data-slot': 'dialog-content',
                        className: (0, o.cn)(u({ variant: i }), e),
                        ...p,
                        children: [
                            n,
                            s &&
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
        let m = (0, n.cva)('flex flex-col gap-2', {
            variants: {
                align: {
                    left: 'text-left',
                    center: 'text-center sm:text-left',
                    right: 'text-right',
                },
            },
            defaultVariants: { align: 'center' },
        });
        function x({ className: e, align: r, ...a }) {
            return (0, t.jsx)('div', {
                'data-slot': 'dialog-header',
                className: (0, o.cn)(m({ align: r }), e),
                ...a,
            });
        }
        function h({ className: e, ...r }) {
            return (0, t.jsx)('div', {
                'data-slot': 'dialog-footer',
                className: (0, o.cn)(
                    'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                    e
                ),
                ...r,
            });
        }
        let f = (0, n.cva)('leading-none font-semibold', {
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
                className: (0, o.cn)(f({ size: a }), e),
                ...n,
            });
        }
        let b = (0, n.cva)('text-muted-foreground', {
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
        function v({ className: e, size: a, ...n }) {
            return (0, t.jsx)(r.Description, {
                'data-slot': 'dialog-description',
                className: (0, o.cn)(b({ size: a }), e),
                ...n,
            });
        }
        e.s(
            [
                'Dialog',
                () => s,
                'DialogContent',
                () => p,
                'DialogDescription',
                () => v,
                'DialogFooter',
                () => h,
                'DialogHeader',
                () => x,
                'DialogTitle',
                () => g,
                'DialogTrigger',
                () => i,
            ],
            776639
        );
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
        let a = (0, t.default)('chevron-right', [
            ['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }],
        ]);
        e.s(['default', () => a], 859502);
        var n = e.i(487122),
            o = e.i(516467);
        function s(e, t, r) {
            let a = (0, o.toDate)(e, r?.in);
            if (isNaN(t)) return (0, n.constructFrom)(r?.in || e, NaN);
            if (!t) return a;
            let s = a.getDate(),
                i = (0, n.constructFrom)(r?.in || e, a.getTime());
            return (i.setMonth(a.getMonth() + t + 1, 0), s >= i.getDate())
                ? i
                : (a.setFullYear(i.getFullYear(), i.getMonth(), s), a);
        }
        function i(e, t) {
            let r = (0, o.toDate)(e, t?.in);
            return (r.setDate(1), r.setHours(0, 0, 0, 0), r);
        }
        (e.s(['addMonths', () => s], 495794),
            e.s(['startOfMonth', () => i], 432286));
    },
    337822,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            a = e.i(291967),
            n = e.i(672687),
            o = e.i(784711),
            s = e.i(846357),
            i = e.i(774621),
            l = e.i(60126),
            d = e.i(910529),
            c = e.i(75355),
            u = e.i(546354),
            p = e.i(861181),
            m = e.i(403078),
            x = e.i(655875),
            h = e.i(695145),
            f = e.i(73772),
            g = e.i(595357),
            b = 'Popover',
            [v, y] = (0, o.createContextScope)(b, [c.createPopperScope]),
            j = (0, c.createPopperScope)(),
            [N, C] = v(b),
            w = (e) => {
                let {
                        __scopePopover: a,
                        children: n,
                        open: o,
                        defaultOpen: s,
                        onOpenChange: i,
                        modal: l = !1,
                    } = e,
                    u = j(a),
                    p = r.useRef(null),
                    [m, x] = r.useState(!1),
                    [f, g] = (0, h.useControllableState)({
                        prop: o,
                        defaultProp: s ?? !1,
                        onChange: i,
                        caller: b,
                    });
                return (0, t.jsx)(c.Root, {
                    ...u,
                    children: (0, t.jsx)(N, {
                        scope: a,
                        contentId: (0, d.useId)(),
                        triggerRef: p,
                        open: f,
                        onOpenChange: g,
                        onOpenToggle: r.useCallback(() => g((e) => !e), [g]),
                        hasCustomAnchor: m,
                        onCustomAnchorAdd: r.useCallback(() => x(!0), []),
                        onCustomAnchorRemove: r.useCallback(() => x(!1), []),
                        modal: l,
                        children: n,
                    }),
                });
            };
        w.displayName = b;
        var k = 'PopoverAnchor';
        r.forwardRef((e, a) => {
            let { __scopePopover: n, ...o } = e,
                s = C(k, n),
                i = j(n),
                { onCustomAnchorAdd: l, onCustomAnchorRemove: d } = s;
            return (
                r.useEffect(() => (l(), () => d()), [l, d]),
                (0, t.jsx)(c.Anchor, { ...i, ...o, ref: a })
            );
        }).displayName = k;
        var D = 'PopoverTrigger',
            R = r.forwardRef((e, r) => {
                let { __scopePopover: o, ...s } = e,
                    i = C(D, o),
                    l = j(o),
                    d = (0, n.useComposedRefs)(r, i.triggerRef),
                    u = (0, t.jsx)(m.Primitive.button, {
                        type: 'button',
                        'aria-haspopup': 'dialog',
                        'aria-expanded': i.open,
                        'aria-controls': i.contentId,
                        'data-state': L(i.open),
                        ...s,
                        ref: d,
                        onClick: (0, a.composeEventHandlers)(
                            e.onClick,
                            i.onOpenToggle
                        ),
                    });
                return i.hasCustomAnchor
                    ? u
                    : (0, t.jsx)(c.Anchor, { asChild: !0, ...l, children: u });
            });
        R.displayName = D;
        var P = 'PopoverPortal',
            [T, E] = v(P, { forceMount: void 0 }),
            S = (e) => {
                let {
                        __scopePopover: r,
                        forceMount: a,
                        children: n,
                        container: o,
                    } = e,
                    s = C(P, r);
                return (0, t.jsx)(T, {
                    scope: r,
                    forceMount: a,
                    children: (0, t.jsx)(p.Presence, {
                        present: a || s.open,
                        children: (0, t.jsx)(u.Portal, {
                            asChild: !0,
                            container: o,
                            children: n,
                        }),
                    }),
                });
            };
        S.displayName = P;
        var O = 'PopoverContent',
            M = r.forwardRef((e, r) => {
                let a = E(O, e.__scopePopover),
                    { forceMount: n = a.forceMount, ...o } = e,
                    s = C(O, e.__scopePopover);
                return (0, t.jsx)(p.Presence, {
                    present: n || s.open,
                    children: s.modal
                        ? (0, t.jsx)(I, { ...o, ref: r })
                        : (0, t.jsx)(A, { ...o, ref: r }),
                });
            });
        M.displayName = O;
        var F = (0, x.createSlot)('PopoverContent.RemoveScroll'),
            I = r.forwardRef((e, o) => {
                let s = C(O, e.__scopePopover),
                    i = r.useRef(null),
                    l = (0, n.useComposedRefs)(o, i),
                    d = r.useRef(!1);
                return (
                    r.useEffect(() => {
                        let e = i.current;
                        if (e) return (0, f.hideOthers)(e);
                    }, []),
                    (0, t.jsx)(g.RemoveScroll, {
                        as: F,
                        allowPinchZoom: !0,
                        children: (0, t.jsx)(_, {
                            ...e,
                            ref: l,
                            trapFocus: s.open,
                            disableOutsidePointerEvents: !0,
                            onCloseAutoFocus: (0, a.composeEventHandlers)(
                                e.onCloseAutoFocus,
                                (e) => {
                                    (e.preventDefault(),
                                        d.current ||
                                            s.triggerRef.current?.focus());
                                }
                            ),
                            onPointerDownOutside: (0, a.composeEventHandlers)(
                                e.onPointerDownOutside,
                                (e) => {
                                    let t = e.detail.originalEvent,
                                        r = 0 === t.button && !0 === t.ctrlKey;
                                    d.current = 2 === t.button || r;
                                },
                                { checkForDefaultPrevented: !1 }
                            ),
                            onFocusOutside: (0, a.composeEventHandlers)(
                                e.onFocusOutside,
                                (e) => e.preventDefault(),
                                { checkForDefaultPrevented: !1 }
                            ),
                        }),
                    })
                );
            }),
            A = r.forwardRef((e, a) => {
                let n = C(O, e.__scopePopover),
                    o = r.useRef(!1),
                    s = r.useRef(!1);
                return (0, t.jsx)(_, {
                    ...e,
                    ref: a,
                    trapFocus: !1,
                    disableOutsidePointerEvents: !1,
                    onCloseAutoFocus: (t) => {
                        (e.onCloseAutoFocus?.(t),
                            t.defaultPrevented ||
                                (o.current || n.triggerRef.current?.focus(),
                                t.preventDefault()),
                            (o.current = !1),
                            (s.current = !1));
                    },
                    onInteractOutside: (t) => {
                        (e.onInteractOutside?.(t),
                            t.defaultPrevented ||
                                ((o.current = !0),
                                'pointerdown' === t.detail.originalEvent.type &&
                                    (s.current = !0)));
                        let r = t.target;
                        (n.triggerRef.current?.contains(r) &&
                            t.preventDefault(),
                            'focusin' === t.detail.originalEvent.type &&
                                s.current &&
                                t.preventDefault());
                    },
                });
            }),
            _ = r.forwardRef((e, r) => {
                let {
                        __scopePopover: a,
                        trapFocus: n,
                        onOpenAutoFocus: o,
                        onCloseAutoFocus: d,
                        disableOutsidePointerEvents: u,
                        onEscapeKeyDown: p,
                        onPointerDownOutside: m,
                        onFocusOutside: x,
                        onInteractOutside: h,
                        ...f
                    } = e,
                    g = C(O, a),
                    b = j(a);
                return (
                    (0, i.useFocusGuards)(),
                    (0, t.jsx)(l.FocusScope, {
                        asChild: !0,
                        loop: !0,
                        trapped: n,
                        onMountAutoFocus: o,
                        onUnmountAutoFocus: d,
                        children: (0, t.jsx)(s.DismissableLayer, {
                            asChild: !0,
                            disableOutsidePointerEvents: u,
                            onInteractOutside: h,
                            onEscapeKeyDown: p,
                            onPointerDownOutside: m,
                            onFocusOutside: x,
                            onDismiss: () => g.onOpenChange(!1),
                            children: (0, t.jsx)(c.Content, {
                                'data-state': L(g.open),
                                role: 'dialog',
                                id: g.contentId,
                                ...b,
                                ...f,
                                ref: r,
                                style: {
                                    ...f.style,
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
        function L(e) {
            return e ? 'open' : 'closed';
        }
        ((r.forwardRef((e, r) => {
            let { __scopePopover: n, ...o } = e,
                s = C(H, n);
            return (0, t.jsx)(m.Primitive.button, {
                type: 'button',
                ...o,
                ref: r,
                onClick: (0, a.composeEventHandlers)(e.onClick, () =>
                    s.onOpenChange(!1)
                ),
            });
        }).displayName = H),
            (r.forwardRef((e, r) => {
                let { __scopePopover: a, ...n } = e,
                    o = j(a);
                return (0, t.jsx)(c.Arrow, { ...o, ...n, ref: r });
            }).displayName = 'PopoverArrow'));
        var z = e.i(975157);
        function B({ ...e }) {
            return (0, t.jsx)(w, { 'data-slot': 'popover', ...e });
        }
        function V({ ...e }) {
            return (0, t.jsx)(R, { 'data-slot': 'popover-trigger', ...e });
        }
        function $({
            className: e,
            align: r = 'center',
            sideOffset: a = 4,
            ...n
        }) {
            return (0, t.jsx)(S, {
                children: (0, t.jsx)(M, {
                    'data-slot': 'popover-content',
                    align: r,
                    sideOffset: a,
                    className: (0, z.cn)(
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
                () => $,
                'PopoverTrigger',
                () => V,
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
        var a = e.i(990341),
            n = e.i(291967),
            o = e.i(672687),
            s = e.i(784711),
            i = e.i(846357),
            l = e.i(910529),
            d = e.i(75355),
            c = e.i(546354),
            u = e.i(861181),
            p = e.i(403078),
            m = e.i(655875),
            x = e.i(695145),
            h = e.i(880282),
            f = e.i(565750),
            [g, b] = (0, s.createContextScope)('Tooltip', [
                d.createPopperScope,
            ]),
            v = (0, d.createPopperScope)(),
            y = 'TooltipProvider',
            j = 'tooltip.open',
            [N, C] = g(y),
            w = (e) => {
                let {
                        __scopeTooltip: t,
                        delayDuration: r = 700,
                        skipDelayDuration: n = 300,
                        disableHoverableContent: o = !1,
                        children: s,
                    } = e,
                    i = a.useRef(!0),
                    l = a.useRef(!1),
                    d = a.useRef(0);
                return (
                    a.useEffect(() => {
                        let e = d.current;
                        return () => window.clearTimeout(e);
                    }, []),
                    (0, f.jsx)(N, {
                        scope: t,
                        isOpenDelayedRef: i,
                        delayDuration: r,
                        onOpen: a.useCallback(() => {
                            (window.clearTimeout(d.current), (i.current = !1));
                        }, []),
                        onClose: a.useCallback(() => {
                            (window.clearTimeout(d.current),
                                (d.current = window.setTimeout(
                                    () => (i.current = !0),
                                    n
                                )));
                        }, [n]),
                        isPointerInTransitRef: l,
                        onPointerInTransitChange: a.useCallback((e) => {
                            l.current = e;
                        }, []),
                        disableHoverableContent: o,
                        children: s,
                    })
                );
            };
        w.displayName = y;
        var k = 'Tooltip',
            [D, R] = g(k),
            P = (e) => {
                let {
                        __scopeTooltip: t,
                        children: r,
                        open: n,
                        defaultOpen: o,
                        onOpenChange: s,
                        disableHoverableContent: i,
                        delayDuration: c,
                    } = e,
                    u = C(k, e.__scopeTooltip),
                    p = v(t),
                    [m, h] = a.useState(null),
                    g = (0, l.useId)(),
                    b = a.useRef(0),
                    y = i ?? u.disableHoverableContent,
                    N = c ?? u.delayDuration,
                    w = a.useRef(!1),
                    [R, P] = (0, x.useControllableState)({
                        prop: n,
                        defaultProp: o ?? !1,
                        onChange: (e) => {
                            (e
                                ? (u.onOpen(),
                                  document.dispatchEvent(new CustomEvent(j)))
                                : u.onClose(),
                                s?.(e));
                        },
                        caller: k,
                    }),
                    T = a.useMemo(
                        () =>
                            R
                                ? w.current
                                    ? 'delayed-open'
                                    : 'instant-open'
                                : 'closed',
                        [R]
                    ),
                    E = a.useCallback(() => {
                        (window.clearTimeout(b.current),
                            (b.current = 0),
                            (w.current = !1),
                            P(!0));
                    }, [P]),
                    S = a.useCallback(() => {
                        (window.clearTimeout(b.current),
                            (b.current = 0),
                            P(!1));
                    }, [P]),
                    O = a.useCallback(() => {
                        (window.clearTimeout(b.current),
                            (b.current = window.setTimeout(() => {
                                ((w.current = !0), P(!0), (b.current = 0));
                            }, N)));
                    }, [N, P]);
                return (
                    a.useEffect(
                        () => () => {
                            b.current &&
                                (window.clearTimeout(b.current),
                                (b.current = 0));
                        },
                        []
                    ),
                    (0, f.jsx)(d.Root, {
                        ...p,
                        children: (0, f.jsx)(D, {
                            scope: t,
                            contentId: g,
                            open: R,
                            stateAttribute: T,
                            trigger: m,
                            onTriggerChange: h,
                            onTriggerEnter: a.useCallback(() => {
                                u.isOpenDelayedRef.current ? O() : E();
                            }, [u.isOpenDelayedRef, O, E]),
                            onTriggerLeave: a.useCallback(() => {
                                y
                                    ? S()
                                    : (window.clearTimeout(b.current),
                                      (b.current = 0));
                            }, [S, y]),
                            onOpen: E,
                            onClose: S,
                            disableHoverableContent: y,
                            children: r,
                        }),
                    })
                );
            };
        P.displayName = k;
        var T = 'TooltipTrigger',
            E = a.forwardRef((e, t) => {
                let { __scopeTooltip: r, ...s } = e,
                    i = R(T, r),
                    l = C(T, r),
                    c = v(r),
                    u = a.useRef(null),
                    m = (0, o.useComposedRefs)(t, u, i.onTriggerChange),
                    x = a.useRef(!1),
                    h = a.useRef(!1),
                    g = a.useCallback(() => (x.current = !1), []);
                return (
                    a.useEffect(
                        () => () =>
                            document.removeEventListener('pointerup', g),
                        [g]
                    ),
                    (0, f.jsx)(d.Anchor, {
                        asChild: !0,
                        ...c,
                        children: (0, f.jsx)(p.Primitive.button, {
                            'aria-describedby': i.open ? i.contentId : void 0,
                            'data-state': i.stateAttribute,
                            ...s,
                            ref: m,
                            onPointerMove: (0, n.composeEventHandlers)(
                                e.onPointerMove,
                                (e) => {
                                    'touch' !== e.pointerType &&
                                        (h.current ||
                                            l.isPointerInTransitRef.current ||
                                            (i.onTriggerEnter(),
                                            (h.current = !0)));
                                }
                            ),
                            onPointerLeave: (0, n.composeEventHandlers)(
                                e.onPointerLeave,
                                () => {
                                    (i.onTriggerLeave(), (h.current = !1));
                                }
                            ),
                            onPointerDown: (0, n.composeEventHandlers)(
                                e.onPointerDown,
                                () => {
                                    (i.open && i.onClose(),
                                        (x.current = !0),
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
                                    x.current || i.onOpen();
                                }
                            ),
                            onBlur: (0, n.composeEventHandlers)(
                                e.onBlur,
                                i.onClose
                            ),
                            onClick: (0, n.composeEventHandlers)(
                                e.onClick,
                                i.onClose
                            ),
                        }),
                    })
                );
            });
        E.displayName = T;
        var S = 'TooltipPortal',
            [O, M] = g(S, { forceMount: void 0 }),
            F = (e) => {
                let {
                        __scopeTooltip: t,
                        forceMount: r,
                        children: a,
                        container: n,
                    } = e,
                    o = R(S, t);
                return (0, f.jsx)(O, {
                    scope: t,
                    forceMount: r,
                    children: (0, f.jsx)(u.Presence, {
                        present: r || o.open,
                        children: (0, f.jsx)(c.Portal, {
                            asChild: !0,
                            container: n,
                            children: a,
                        }),
                    }),
                });
            };
        F.displayName = S;
        var I = 'TooltipContent',
            A = a.forwardRef((e, t) => {
                let r = M(I, e.__scopeTooltip),
                    { forceMount: a = r.forceMount, side: n = 'top', ...o } = e,
                    s = R(I, e.__scopeTooltip);
                return (0, f.jsx)(u.Presence, {
                    present: a || s.open,
                    children: s.disableHoverableContent
                        ? (0, f.jsx)(B, { side: n, ...o, ref: t })
                        : (0, f.jsx)(_, { side: n, ...o, ref: t }),
                });
            }),
            _ = a.forwardRef((e, t) => {
                let r = R(I, e.__scopeTooltip),
                    n = C(I, e.__scopeTooltip),
                    s = a.useRef(null),
                    i = (0, o.useComposedRefs)(t, s),
                    [l, d] = a.useState(null),
                    { trigger: c, onClose: u } = r,
                    p = s.current,
                    { onPointerInTransitChange: m } = n,
                    x = a.useCallback(() => {
                        (d(null), m(!1));
                    }, [m]),
                    h = a.useCallback(
                        (e, t) => {
                            let r,
                                a = e.currentTarget,
                                n = { x: e.clientX, y: e.clientY },
                                o = (function (e, t) {
                                    let r = Math.abs(t.top - e.y),
                                        a = Math.abs(t.bottom - e.y),
                                        n = Math.abs(t.right - e.x),
                                        o = Math.abs(t.left - e.x);
                                    switch (Math.min(r, a, n, o)) {
                                        case o:
                                            return 'left';
                                        case n:
                                            return 'right';
                                        case r:
                                            return 'top';
                                        case a:
                                            return 'bottom';
                                        default:
                                            throw Error('unreachable');
                                    }
                                })(n, a.getBoundingClientRect());
                            (d(
                                ((r = [
                                    ...(function (e, t, r = 5) {
                                        let a = [];
                                        switch (t) {
                                            case 'top':
                                                a.push(
                                                    { x: e.x - r, y: e.y + r },
                                                    { x: e.x + r, y: e.y + r }
                                                );
                                                break;
                                            case 'bottom':
                                                a.push(
                                                    { x: e.x - r, y: e.y - r },
                                                    { x: e.x + r, y: e.y - r }
                                                );
                                                break;
                                            case 'left':
                                                a.push(
                                                    { x: e.x + r, y: e.y - r },
                                                    { x: e.x + r, y: e.y + r }
                                                );
                                                break;
                                            case 'right':
                                                a.push(
                                                    { x: e.x - r, y: e.y - r },
                                                    { x: e.x - r, y: e.y + r }
                                                );
                                        }
                                        return a;
                                    })(n, o),
                                    ...(function (e) {
                                        let {
                                            top: t,
                                            right: r,
                                            bottom: a,
                                            left: n,
                                        } = e;
                                        return [
                                            { x: n, y: t },
                                            { x: r, y: t },
                                            { x: r, y: a },
                                            { x: n, y: a },
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
                                        let a = e[r];
                                        for (; t.length >= 2; ) {
                                            let e = t[t.length - 1],
                                                r = t[t.length - 2];
                                            if (
                                                (e.x - r.x) * (a.y - r.y) >=
                                                (e.y - r.y) * (a.x - r.x)
                                            )
                                                t.pop();
                                            else break;
                                        }
                                        t.push(a);
                                    }
                                    t.pop();
                                    let r = [];
                                    for (let t = e.length - 1; t >= 0; t--) {
                                        let a = e[t];
                                        for (; r.length >= 2; ) {
                                            let e = r[r.length - 1],
                                                t = r[r.length - 2];
                                            if (
                                                (e.x - t.x) * (a.y - t.y) >=
                                                (e.y - t.y) * (a.x - t.x)
                                            )
                                                r.pop();
                                            else break;
                                        }
                                        r.push(a);
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
                                m(!0));
                        },
                        [m]
                    );
                return (
                    a.useEffect(() => () => x(), [x]),
                    a.useEffect(() => {
                        if (c && p) {
                            let e = (e) => h(e, p),
                                t = (e) => h(e, c);
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
                    }, [c, p, h, x]),
                    a.useEffect(() => {
                        if (l) {
                            let e = (e) => {
                                let t = e.target,
                                    r = { x: e.clientX, y: e.clientY },
                                    a = c?.contains(t) || p?.contains(t),
                                    n = !(function (e, t) {
                                        let { x: r, y: a } = e,
                                            n = !1;
                                        for (
                                            let e = 0, o = t.length - 1;
                                            e < t.length;
                                            o = e++
                                        ) {
                                            let s = t[e],
                                                i = t[o],
                                                l = s.x,
                                                d = s.y,
                                                c = i.x,
                                                u = i.y;
                                            d > a != u > a &&
                                                r <
                                                    ((c - l) * (a - d)) /
                                                        (u - d) +
                                                        l &&
                                                (n = !n);
                                        }
                                        return n;
                                    })(r, l);
                                a ? x() : n && (x(), u());
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
                    }, [c, p, l, u, x]),
                    (0, f.jsx)(B, { ...e, ref: i })
                );
            }),
            [H, L] = g(k, { isInside: !1 }),
            z = (0, m.createSlottable)('TooltipContent'),
            B = a.forwardRef((e, t) => {
                let {
                        __scopeTooltip: r,
                        children: n,
                        'aria-label': o,
                        onEscapeKeyDown: s,
                        onPointerDownOutside: l,
                        ...c
                    } = e,
                    u = R(I, r),
                    p = v(r),
                    { onClose: m } = u;
                return (
                    a.useEffect(
                        () => (
                            document.addEventListener(j, m),
                            () => document.removeEventListener(j, m)
                        ),
                        [m]
                    ),
                    a.useEffect(() => {
                        if (u.trigger) {
                            let e = (e) => {
                                let t = e.target;
                                t?.contains(u.trigger) && m();
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
                    }, [u.trigger, m]),
                    (0, f.jsx)(i.DismissableLayer, {
                        asChild: !0,
                        disableOutsidePointerEvents: !1,
                        onEscapeKeyDown: s,
                        onPointerDownOutside: l,
                        onFocusOutside: (e) => e.preventDefault(),
                        onDismiss: m,
                        children: (0, f.jsxs)(d.Content, {
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
                                (0, f.jsx)(z, { children: n }),
                                (0, f.jsx)(H, {
                                    scope: r,
                                    isInside: !0,
                                    children: (0, f.jsx)(h.Root, {
                                        id: u.contentId,
                                        role: 'tooltip',
                                        children: o || n,
                                    }),
                                }),
                            ],
                        }),
                    })
                );
            });
        A.displayName = I;
        var V = 'TooltipArrow',
            $ = a.forwardRef((e, t) => {
                let { __scopeTooltip: r, ...a } = e,
                    n = v(r);
                return L(V, r).isInside
                    ? null
                    : (0, f.jsx)(d.Arrow, { ...n, ...a, ref: t });
            });
        (($.displayName = V),
            e.s(
                [
                    'Arrow',
                    () => $,
                    'Content',
                    () => A,
                    'Portal',
                    () => F,
                    'Provider',
                    () => w,
                    'Root',
                    () => P,
                    'TooltipProvider',
                    () => w,
                    'Trigger',
                    () => E,
                ],
                83972
            ));
        var q = e.i(975157);
        function U({ delayDuration: e = 0, ...t }) {
            return (0, f.jsx)(w, {
                'data-slot': 'tooltip-provider',
                delayDuration: e,
                ...t,
            });
        }
        function Y({ ...e }) {
            return (0, f.jsx)(U, {
                children: (0, f.jsx)(P, { 'data-slot': 'tooltip', ...e }),
            });
        }
        function K({ ...e }) {
            return (0, f.jsx)(E, { 'data-slot': 'tooltip-trigger', ...e });
        }
        function W({ className: e, sideOffset: t = 0, children: r, ...a }) {
            return (0, f.jsx)(F, {
                children: (0, f.jsxs)(A, {
                    'data-slot': 'tooltip-content',
                    sideOffset: t,
                    className: (0, q.cn)(
                        'bg-foreground-primary text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
                        e
                    ),
                    ...a,
                    children: [r, (0, f.jsx)($, {})],
                }),
            });
        }
        e.s(
            [
                'Tooltip',
                () => Y,
                'TooltipContent',
                () => W,
                'TooltipTrigger',
                () => K,
            ],
            746798
        );
    },
    393059,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(276389),
            a = e.i(512710),
            n = e.i(51866),
            o = e.i(87912),
            s = e.i(990341),
            i = e.i(245586),
            l = e.i(495794),
            d = e.i(230902),
            c = e.i(661977),
            u = e.i(432286),
            p = e.i(67356),
            m = e.i(519455),
            x = e.i(337822),
            h = e.i(83972),
            f = e.i(746798);
        let g = ({ tooltipText: e, onClick: r, children: a }) =>
            (0, t.jsx)(h.TooltipProvider, {
                children: (0, t.jsxs)(f.Tooltip, {
                    children: [
                        (0, t.jsx)(f.TooltipTrigger, {
                            asChild: !0,
                            children: (0, t.jsx)(m.Button, {
                                variant: 'outline',
                                size: 'icon',
                                onClick: r,
                                className:
                                    'h-12 w-9 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                children: a,
                            }),
                        }),
                        (0, t.jsx)(f.TooltipContent, {
                            className: 'bg-background-tertiary',
                            children: (0, t.jsx)('p', { children: e }),
                        }),
                    ],
                }),
            });
        var b = e.i(975157);
        e.s(
            [
                'MonthPicker',
                0,
                () => {
                    let e = (0, i.useRouter)(),
                        h = (0, i.usePathname)(),
                        f = (0, i.useSearchParams)(),
                        v = f.get('month'),
                        y = (0, s.useCallback)(() => {
                            if (!v) return (0, u.startOfMonth)(new Date());
                            let [e, t] = v.split('-').map(Number),
                                r = new Date(e, t - 1, 1);
                            return (0, c.isValid)(r)
                                ? (0, u.startOfMonth)(r)
                                : (0, u.startOfMonth)(new Date());
                        }, [v]),
                        [j, N] = (0, s.useState)(() => y()),
                        [C, w] = (0, s.useState)(!1),
                        k = (t) => {
                            let r = new URLSearchParams(f.toString());
                            (r.set('month', (0, d.format)(t, 'yyyy-MM')),
                                r.has('page') && r.set('page', '1'));
                            let a = r.toString();
                            e.push(a ? `${h}?${a}` : h);
                        },
                        D = (e) => {
                            let t = j ?? (0, u.startOfMonth)(new Date()),
                                r = (0, u.startOfMonth)((0, l.addMonths)(t, e));
                            (N(r), k(r));
                        };
                    (0, s.useEffect)(() => {
                        N(y());
                    }, [y]);
                    let R = j.getFullYear(),
                        P = j.getMonth(),
                        T = (0, d.format)(j, "MMMM 'de' yyyy", {
                            locale: p.ptBR,
                        }),
                        E = T.charAt(0).toUpperCase() + T.slice(1),
                        S = Array.from({ length: 12 }, (e, t) => t);
                    return (0, t.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            (0, t.jsx)(g, {
                                tooltipText: 'Mês anterior',
                                onClick: () => D(-1),
                                children: (0, t.jsx)(n.ChevronLeft, {
                                    className: 'h-4 w-4',
                                }),
                            }),
                            (0, t.jsxs)(x.Popover, {
                                open: C,
                                onOpenChange: w,
                                children: [
                                    (0, t.jsx)(x.PopoverTrigger, {
                                        asChild: !0,
                                        children: (0, t.jsxs)(m.Button, {
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
                                                            children: E,
                                                        }),
                                                    ],
                                                }),
                                                (0, t.jsx)(a.ChevronDown, {
                                                    className:
                                                        'h-4 w-4 opacity-50',
                                                }),
                                            ],
                                        }),
                                    }),
                                    (0, t.jsxs)(x.PopoverContent, {
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
                                                        R,
                                                    ],
                                                }),
                                            }),
                                            (0, t.jsx)('div', {
                                                className:
                                                    'grid grid-cols-3 gap-2 p-3',
                                                children: S.map((e) => {
                                                    let r = new Date(R, e, 1),
                                                        a = (0, d.format)(
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
                                                                        j ??
                                                                        (0,
                                                                        u.startOfMonth)(
                                                                            new Date()
                                                                        )),
                                                                    void (N(
                                                                        (r = (0,
                                                                        u.startOfMonth)(
                                                                            new Date(
                                                                                t.getFullYear(),
                                                                                e,
                                                                                1
                                                                            )
                                                                        ))
                                                                    ),
                                                                    k(r),
                                                                    w(!1))
                                                                );
                                                            },
                                                            className: (0,
                                                            b.cn)(
                                                                'flex h-9 items-center justify-center rounded-md border text-label-small transition-colors',
                                                                'border-border-primary text-content-secondary hover:bg-background-tertiary hover:text-content-primary',
                                                                e === P &&
                                                                    'border-border-brand text-content-primary font-semibold bg-background-tertiary/60 shadow-sm'
                                                            ),
                                                            children: a,
                                                        },
                                                        e
                                                    );
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, t.jsx)(g, {
                                tooltipText: 'Próximo mês',
                                onClick: () => D(1),
                                children: (0, t.jsx)(o.ChevronRight, {
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
    773899,
    (e) => {
        'use strict';
        (e.i(393059), e.s([]));
    },
    378008,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341);
        e.i(773899);
        var a = e.i(393059),
            n = e.i(519455),
            o = e.i(776639),
            s = e.i(793479),
            i = e.i(276389),
            l = e.i(512710),
            d = e.i(230902),
            c = e.i(661977),
            u = e.i(67356),
            p = e.i(337822),
            m = e.i(227766),
            x = e.i(975157);
        function h({ name: e, id: a, defaultValue: o }) {
            let s = r.useMemo(() => {
                    if (!o) return;
                    let e = new Date(o);
                    return (0, c.isValid)(e) ? e : void 0;
                }, [o]),
                [h, f] = r.useState(s),
                [g, b] = r.useState(!1);
            return (0, t.jsxs)(t.Fragment, {
                children: [
                    (0, t.jsx)('input', {
                        type: 'hidden',
                        name: e,
                        value: h ? (0, d.format)(h, 'yyyy-MM-dd') : '',
                    }),
                    (0, t.jsxs)(p.Popover, {
                        open: g,
                        onOpenChange: b,
                        children: [
                            (0, t.jsx)(p.PopoverTrigger, {
                                asChild: !0,
                                children: (0, t.jsxs)(n.Button, {
                                    id: a,
                                    type: 'button',
                                    variant: 'outline',
                                    className: (0, x.cn)(
                                        'w-full justify-between text-left font-normal',
                                        'bg-transparent border-border-primary text-content-primary',
                                        'hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary',
                                        'focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand',
                                        'focus:border-border-brand focus-visible:border-border-brand'
                                    ),
                                    children: [
                                        (0, t.jsxs)('div', {
                                            className:
                                                'flex items-center gap-2',
                                            children: [
                                                (0, t.jsx)(i.Calendar, {
                                                    className:
                                                        'h-4 w-4 text-content-brand',
                                                }),
                                                h
                                                    ? (0, t.jsx)('span', {
                                                          children: (0,
                                                          d.format)(
                                                              h,
                                                              'dd/MM/yyyy',
                                                              { locale: u.ptBR }
                                                          ),
                                                      })
                                                    : (0, t.jsx)('span', {
                                                          className:
                                                              'text-content-secondary',
                                                          children:
                                                              'dd/mm/aaaa',
                                                      }),
                                            ],
                                        }),
                                        (0, t.jsx)(l.ChevronDown, {
                                            className: 'h-4 w-4 opacity-50',
                                        }),
                                    ],
                                }),
                            }),
                            (0, t.jsx)(p.PopoverContent, {
                                className:
                                    'w-auto p-0 rounded-xl border border-border-primary bg-background-secondary',
                                children: (0, t.jsx)(m.Calendar, {
                                    mode: 'single',
                                    selected: h,
                                    onSelect: (e) => {
                                        e && (f(e), b(!1));
                                    },
                                    autoFocus: !0,
                                    locale: u.ptBR,
                                }),
                            }),
                        ],
                    }),
                ],
            });
        }
        var f = e.i(245586);
        function g({
            scopeLabel: e,
            monthLabel: r,
            monthQuery: n,
            summary: o,
            professionalEarnings: s,
            barberEarnings: i,
            expenses: l,
            newExpenseDisabled: d,
        }) {
            let c = Array.isArray(s)
                ? s
                : Array.isArray(i)
                  ? i.map((e) => ({
                        professionalId: e.barberId,
                        name: e.name,
                        servicesEarnings: e.servicesEarnings,
                        productsEarnings: e.productsEarnings,
                        total: e.total,
                    }))
                  : [];
            return (0, t.jsxs)('div', {
                className: 'space-y-6 max-w-7xl',
                children: [
                    (0, t.jsxs)('header', {
                        className:
                            'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
                        children: [
                            (0, t.jsxs)('div', {
                                children: [
                                    (0, t.jsx)('h1', {
                                        className:
                                            'text-title text-content-primary',
                                        children: 'Financeiro',
                                    }),
                                    (0, t.jsxs)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children: [
                                            'Mês selecionado:',
                                            ' ',
                                            (0, t.jsx)('span', {
                                                className: 'font-medium',
                                                children: r,
                                            }),
                                        ],
                                    }),
                                    (0, t.jsxs)('p', {
                                        className:
                                            'text-paragraph-small text-content-tertiary',
                                        children: [
                                            'Unidade:',
                                            ' ',
                                            (0, t.jsx)('span', {
                                                className: 'font-medium',
                                                children: e,
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, t.jsx)('div', {
                                className:
                                    'flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end',
                                children: (0, t.jsx)(a.MonthPicker, {}),
                            }),
                        ],
                    }),
                    (0, t.jsxs)('section', {
                        className: 'grid gap-4 md:grid-cols-3',
                        children: [
                            (0, t.jsxs)('div', {
                                className:
                                    'space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, t.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children:
                                            'Faturamento líquido (pagos no mês)',
                                    }),
                                    (0, t.jsx)('p', {
                                        className:
                                            'text-title text-content-primary',
                                        children: o.netRevenueMonth,
                                    }),
                                    (0, t.jsxs)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children: [
                                            'Serviços (líq.):',
                                            ' ',
                                            (0, t.jsx)('span', {
                                                className: 'font-semibold',
                                                children: o.servicesNetMonth,
                                            }),
                                            ' ',
                                            '• Produtos (líq.):',
                                            ' ',
                                            (0, t.jsx)('span', {
                                                className: 'font-semibold',
                                                children: o.productsNetMonth,
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, t.jsxs)('div', {
                                className:
                                    'space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, t.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Despesas (mês)',
                                    }),
                                    (0, t.jsx)('p', {
                                        className:
                                            'text-title text-content-primary',
                                        children: o.totalExpenses,
                                    }),
                                    (0, t.jsx)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children:
                                            'Todas as despesas cadastradas para este mês.',
                                    }),
                                ],
                            }),
                            (0, t.jsxs)('div', {
                                className:
                                    'space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, t.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Lucro líquido (mês)',
                                    }),
                                    (0, t.jsx)('p', {
                                        className: `text-title ${o.netIncomeIsPositive ? 'text-green-500' : 'text-red-600'}`,
                                        children: o.netIncome,
                                    }),
                                    (0, t.jsx)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children:
                                            'Faturamento líquido menos as despesas do mês.',
                                    }),
                                ],
                            }),
                        ],
                    }),
                    (0, t.jsx)(b, { professionalsEarnings: c }),
                    (0, t.jsxs)('div', {
                        className:
                            'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
                        children: [
                            (0, t.jsxs)('div', {
                                children: [
                                    (0, t.jsx)('h2', {
                                        className:
                                            'text-subtitle text-content-primary',
                                        children: 'Cadastro de despesas (mês)',
                                    }),
                                    (0, t.jsx)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children:
                                            'Contas cadastradas para este mês, incluindo despesas recorrentes e avulsas.',
                                    }),
                                ],
                            }),
                            (0, t.jsx)(y, { month: n, disabled: d }),
                        ],
                    }),
                    (0, t.jsx)('section', {
                        className:
                            'overflow-x-auto rounded-xl border border-border-primary bg-background-tertiary',
                        children: (0, t.jsxs)('table', {
                            className: 'min-w-full text-sm',
                            children: [
                                (0, t.jsx)('thead', {
                                    children: (0, t.jsxs)('tr', {
                                        className:
                                            'border-b border-border-primary bg-muted/40 text-left text-label-small text-content-secondary',
                                        children: [
                                            (0, t.jsx)('th', {
                                                className: 'px-4 py-2',
                                                children: 'Descrição',
                                            }),
                                            (0, t.jsx)('th', {
                                                className: 'px-4 py-2',
                                                children: 'Vencimento',
                                            }),
                                            (0, t.jsx)('th', {
                                                className:
                                                    'px-4 py-2 text-right',
                                                children: 'Valor',
                                            }),
                                            (0, t.jsx)('th', {
                                                className:
                                                    'px-4 py-2 text-center',
                                                children: 'Recorrente',
                                            }),
                                            (0, t.jsx)('th', {
                                                className:
                                                    'px-4 py-2 text-center',
                                                children: 'Status',
                                            }),
                                            (0, t.jsx)('th', {
                                                className:
                                                    'px-4 py-2 text-right',
                                                children: 'Ações',
                                            }),
                                        ],
                                    }),
                                }),
                                (0, t.jsx)('tbody', {
                                    children:
                                        0 === l.length
                                            ? (0, t.jsx)('tr', {
                                                  children: (0, t.jsx)('td', {
                                                      colSpan: 6,
                                                      className:
                                                          'px-4 py-6 text-center text-paragraph-small text-content-secondary',
                                                      children:
                                                          'Nenhuma despesa cadastrada para este mês.',
                                                  }),
                                              })
                                            : l.map((e) =>
                                                  (0, t.jsx)(
                                                      v,
                                                      { expense: e },
                                                      e.id
                                                  )
                                              ),
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        function b({ professionalsEarnings: e }) {
            let r = Array.isArray(e) ? e : [];
            return (0, t.jsxs)('section', {
                className: 'space-y-3',
                children: [
                    (0, t.jsxs)('div', {
                        children: [
                            (0, t.jsx)('h2', {
                                className: 'text-subtitle text-content-primary',
                                children: 'Faturamento por profissional (mês)',
                            }),
                            (0, t.jsx)('p', {
                                className:
                                    'text-paragraph-small text-content-secondary',
                                children:
                                    'Valores recebidos em serviços e comissões de produtos (pagos no mês).',
                            }),
                        ],
                    }),
                    0 === r.length
                        ? (0, t.jsx)('p', {
                              className:
                                  'text-paragraph-small text-content-secondary',
                              children: 'Nenhum profissional ativo cadastrado.',
                          })
                        : (0, t.jsx)('div', {
                              className:
                                  'grid gap-4 grid-cols-1 sm:grid-cols-2',
                              style: {
                                  gridTemplateColumns:
                                      r.length <= 0
                                          ? void 0
                                          : `repeat(${Math.min(5, r.length)}, minmax(0, 1fr))`,
                              },
                              children: r.map((e) =>
                                  (0, t.jsxs)(
                                      'div',
                                      {
                                          className:
                                              'space-y-2 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                          children: [
                                              (0, t.jsx)('p', {
                                                  className:
                                                      'text-label-large text-content-primary',
                                                  children: e.name,
                                              }),
                                              (0, t.jsxs)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children: [
                                                      'Serviços:',
                                                      ' ',
                                                      (0, t.jsx)('span', {
                                                          className:
                                                              'font-semibold',
                                                          children:
                                                              e.servicesEarnings,
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children: [
                                                      'Produtos:',
                                                      ' ',
                                                      (0, t.jsx)('span', {
                                                          className:
                                                              'font-semibold',
                                                          children:
                                                              e.productsEarnings,
                                                      }),
                                                  ],
                                              }),
                                              (0, t.jsxs)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children: [
                                                      'Total:',
                                                      ' ',
                                                      (0, t.jsx)('span', {
                                                          className:
                                                              'font-semibold',
                                                          children: e.total,
                                                      }),
                                                  ],
                                              }),
                                          ],
                                      },
                                      e.professionalId
                                  )
                              ),
                          }),
                ],
            });
        }
        function v({ expense: e }) {
            let a = (0, f.useRouter)(),
                s =
                    'success' === e.statusTone ||
                    'pago' === String(e.statusLabel || '').toLowerCase(),
                [i, l] = r.useState(null),
                d = i ?? s,
                c = d ? 'Pago' : 'Em aberto',
                u = d
                    ? 'bg-green-500/15 text-green-600 border-green-500/30'
                    : 'bg-amber-500/15 text-amber-700 border-amber-500/30',
                [p, m] = r.useState(!1),
                [h, g] = r.useState(!1),
                [b, v] = r.useState(null),
                [y, j] = r.useState(!1),
                [N, C] = r.useState(null),
                w = r.useCallback(async () => {
                    (v(null), g(!0));
                    try {
                        let t = await fetch(
                                `/api/admin/finance/expenses/${encodeURIComponent(e.id)}`,
                                { method: 'DELETE' }
                            ),
                            r = await t.json();
                        if (!t.ok || !r.ok) {
                            (v(r.ok ? 'Falha ao excluir.' : r.error), g(!1));
                            return;
                        }
                        (m(!1), a.refresh());
                    } catch {
                        v('Erro de rede. Tente novamente.');
                    } finally {
                        g(!1);
                    }
                }, [e.id, a]),
                k = r.useCallback(async () => {
                    (C(null), j(!0));
                    let t = !d;
                    l(t);
                    try {
                        let r = await fetch(
                                `/api/admin/finance/expenses/${encodeURIComponent(e.id)}/paid`,
                                {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ isPaid: t }),
                                }
                            ),
                            n = await r.json();
                        if (!r.ok || !n.ok) {
                            (l(d),
                                C(
                                    n.ok
                                        ? 'Falha ao atualizar status.'
                                        : n.error
                                ),
                                j(!1));
                            return;
                        }
                        (l(n.data.isPaid), a.refresh());
                    } catch {
                        (l(d), C('Erro de rede. Tente novamente.'));
                    } finally {
                        j(!1);
                    }
                }, [d, e.id, a]);
            return (0, t.jsxs)('tr', {
                className: 'border-b border-border-primary last:border-b-0',
                children: [
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3 text-content-primary',
                        children: e.description,
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3 text-content-secondary',
                        children: e.dueDate,
                    }),
                    (0, t.jsx)('td', {
                        className:
                            'px-4 py-3 text-right text-content-primary font-medium',
                        children: e.amount,
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3 text-center',
                        children: (0, t.jsx)('span', {
                            className: (0, x.cn)(
                                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                                e.isRecurring
                                    ? 'bg-border-brand/10 border-border-brand/30 text-content-primary'
                                    : 'bg-muted/40 border-border-primary text-content-secondary'
                            ),
                            children: e.isRecurring ? 'Sim' : 'Não',
                        }),
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3 text-center',
                        children: (0, t.jsx)('span', {
                            className: (0, x.cn)(
                                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                                u
                            ),
                            title: N ?? void 0,
                            children: c,
                        }),
                    }),
                    (0, t.jsx)('td', {
                        className: 'px-4 py-3 text-right',
                        children: (0, t.jsxs)('div', {
                            className:
                                'inline-flex flex-wrap justify-end gap-2',
                            children: [
                                (0, t.jsx)(n.Button, {
                                    size: 'sm',
                                    variant: 'edit2',
                                    className: 'h-8',
                                    children: 'Editar',
                                }),
                                (0, t.jsx)(n.Button, {
                                    size: 'sm',
                                    variant: 'outline',
                                    className: (0, x.cn)(
                                        'h-8 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand',
                                        y && 'opacity-70 cursor-wait'
                                    ),
                                    onClick: k,
                                    disabled: y || h,
                                    title: d
                                        ? 'Marcar como pendente'
                                        : 'Marcar como paga',
                                    children: y
                                        ? 'Atualizando...'
                                        : d
                                          ? 'Pendente'
                                          : 'Conta paga',
                                }),
                                (0, t.jsxs)(o.Dialog, {
                                    open: p,
                                    onOpenChange: m,
                                    children: [
                                        (0, t.jsx)(o.DialogTrigger, {
                                            asChild: !0,
                                            children: (0, t.jsx)(n.Button, {
                                                size: 'sm',
                                                variant: 'destructive',
                                                className: 'h-8',
                                                disabled: y,
                                                children: 'Excluir',
                                            }),
                                        }),
                                        (0, t.jsxs)(o.DialogContent, {
                                            className:
                                                'bg-background-secondary border border-border-primary',
                                            children: [
                                                (0, t.jsx)(o.DialogHeader, {
                                                    children: (0, t.jsx)(
                                                        o.DialogTitle,
                                                        {
                                                            className:
                                                                'text-title text-content-primary',
                                                            children:
                                                                'Excluir despesa',
                                                        }
                                                    ),
                                                }),
                                                (0, t.jsxs)('div', {
                                                    className: 'space-y-3',
                                                    children: [
                                                        (0, t.jsxs)('div', {
                                                            className:
                                                                'rounded-xl border border-border-primary bg-background-tertiary px-3 py-2',
                                                            children: [
                                                                (0, t.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-paragraph-small text-content-secondary',
                                                                        children:
                                                                            'Você está prestes a excluir:',
                                                                    }
                                                                ),
                                                                (0, t.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-label-large text-content-primary',
                                                                        children:
                                                                            e.description,
                                                                    }
                                                                ),
                                                                (0, t.jsxs)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-paragraph-small text-content-secondary',
                                                                        children:
                                                                            [
                                                                                'Vencimento: ',
                                                                                e.dueDate,
                                                                                ' • Valor:',
                                                                                ' ',
                                                                                (0,
                                                                                t.jsx)(
                                                                                    'span',
                                                                                    {
                                                                                        className:
                                                                                            'font-semibold text-content-primary',
                                                                                        children:
                                                                                            e.amount,
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        e.isRecurring
                                                            ? (0, t.jsx)(
                                                                  'div',
                                                                  {
                                                                      className:
                                                                          'rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2',
                                                                      children:
                                                                          (0,
                                                                          t.jsxs)(
                                                                              'p',
                                                                              {
                                                                                  className:
                                                                                      'text-paragraph-small text-amber-700',
                                                                                  children:
                                                                                      [
                                                                                          'Essa despesa é ',
                                                                                          (0,
                                                                                          t.jsx)(
                                                                                              'b',
                                                                                              {
                                                                                                  children:
                                                                                                      'recorrente',
                                                                                              }
                                                                                          ),
                                                                                          '. Ao excluir, o sistema removerá esta despesa e ',
                                                                                          (0,
                                                                                          t.jsx)(
                                                                                              'b',
                                                                                              {
                                                                                                  children:
                                                                                                      'todas as próximas',
                                                                                              }
                                                                                          ),
                                                                                          '(do mês atual em diante).',
                                                                                      ],
                                                                              }
                                                                          ),
                                                                  }
                                                              )
                                                            : (0, t.jsx)('p', {
                                                                  className:
                                                                      'text-paragraph-small text-content-secondary',
                                                                  children:
                                                                      'Essa ação não pode ser desfeita.',
                                                              }),
                                                        b &&
                                                            (0, t.jsx)('div', {
                                                                className:
                                                                    'rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2',
                                                                children: (0,
                                                                t.jsx)('p', {
                                                                    className:
                                                                        'text-paragraph-small text-red-600',
                                                                    children: b,
                                                                }),
                                                            }),
                                                        (0, t.jsxs)('div', {
                                                            className:
                                                                'flex justify-end gap-2 pt-2',
                                                            children: [
                                                                (0, t.jsx)(
                                                                    n.Button,
                                                                    {
                                                                        type: 'button',
                                                                        variant:
                                                                            'outline',
                                                                        onClick:
                                                                            () =>
                                                                                m(
                                                                                    !1
                                                                                ),
                                                                        disabled:
                                                                            h,
                                                                        className:
                                                                            'bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand',
                                                                        children:
                                                                            'Cancelar',
                                                                    }
                                                                ),
                                                                (0, t.jsx)(
                                                                    n.Button,
                                                                    {
                                                                        type: 'button',
                                                                        variant:
                                                                            'destructive',
                                                                        onClick:
                                                                            w,
                                                                        disabled:
                                                                            h,
                                                                        children:
                                                                            h
                                                                                ? 'Excluindo...'
                                                                                : 'Excluir',
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        function y({ month: e, disabled: a }) {
            let i = (0, f.useRouter)(),
                l = (0, f.useSearchParams)().get('unit') || null,
                [d, c] = r.useState(!1),
                [u, p] = r.useState(!1),
                [m, x] = r.useState(null),
                g = !!l,
                b = r.useCallback(
                    async (t) => {
                        if ((t.preventDefault(), x(null), !l))
                            return void x(
                                'Selecione uma unidade para cadastrar a despesa.'
                            );
                        let r = t.currentTarget,
                            a = new FormData(r),
                            n = String(a.get('description') ?? '').trim(),
                            o = Number(String(a.get('amount') ?? '').trim()),
                            s = null != a.get('isRecurring'),
                            d = String(a.get('recurringDay') ?? '').trim(),
                            u = d ? Number(d) : void 0,
                            m = String(a.get('dueDate') ?? '').trim() || void 0;
                        if (!n) return void x('Informe a descrição.');
                        if (!Number.isFinite(o) || o <= 0)
                            return void x('Informe um valor válido.');
                        if (s) {
                            if (
                                !Number.isFinite(Number(u)) ||
                                1 > Number(u) ||
                                Number(u) > 31
                            )
                                return void x(
                                    'Informe um dia de vencimento (1 a 31).'
                                );
                        } else if (!m)
                            return void x('Informe a data de vencimento.');
                        p(!0);
                        try {
                            let t = await fetch('/api/admin/finance/expenses', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        month: e,
                                        unitId: l,
                                        category: 'OTHER',
                                        description: n,
                                        amount: o,
                                        isRecurring: s,
                                        recurringDay: s ? Number(u) : void 0,
                                        dueDate: s ? void 0 : m,
                                    }),
                                }),
                                a = await t.json();
                            if (!t.ok || !a.ok) {
                                (x(a.ok ? 'Falha ao salvar.' : a.error), p(!1));
                                return;
                            }
                            (c(!1), r.reset(), i.refresh());
                        } catch {
                            x('Erro de rede. Tente novamente.');
                        } finally {
                            p(!1);
                        }
                    },
                    [e, i, l]
                );
            return a
                ? (0, t.jsx)(n.Button, {
                      variant: 'brand',
                      disabled: !0,
                      title: 'Ação indisponível',
                      children: 'Nova despesa',
                  })
                : (0, t.jsxs)(o.Dialog, {
                      open: d,
                      onOpenChange: c,
                      children: [
                          (0, t.jsx)(o.DialogTrigger, {
                              asChild: !0,
                              children: (0, t.jsx)(n.Button, {
                                  variant: 'brand',
                                  children: 'Nova despesa',
                              }),
                          }),
                          (0, t.jsxs)(o.DialogContent, {
                              className:
                                  'bg-background-secondary border border-border-primary',
                              children: [
                                  (0, t.jsx)(o.DialogHeader, {
                                      children: (0, t.jsx)(o.DialogTitle, {
                                          className:
                                              'text-title text-content-primary',
                                          children: 'Nova despesa',
                                      }),
                                  }),
                                  (0, t.jsxs)('form', {
                                      onSubmit: b,
                                      className: 'space-y-4',
                                      children: [
                                          (0, t.jsx)('input', {
                                              type: 'hidden',
                                              name: 'month',
                                              value: e,
                                          }),
                                          (0, t.jsx)('input', {
                                              type: 'hidden',
                                              name: 'category',
                                              value: 'OTHER',
                                          }),
                                          (0, t.jsx)('input', {
                                              type: 'hidden',
                                              name: 'unitId',
                                              value: l ?? '',
                                          }),
                                          !g &&
                                              (0, t.jsx)('div', {
                                                  className:
                                                      'rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2',
                                                  children: (0, t.jsx)('p', {
                                                      className:
                                                          'text-paragraph-small text-amber-700',
                                                      children:
                                                          'Selecione uma unidade no menu lateral para cadastrar a despesa.',
                                                  }),
                                              }),
                                          (0, t.jsxs)('div', {
                                              className: 'space-y-1',
                                              children: [
                                                  (0, t.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      htmlFor: 'description',
                                                      children: 'Descrição',
                                                  }),
                                                  (0, t.jsx)(s.Input, {
                                                      id: 'description',
                                                      name: 'description',
                                                      required: !0,
                                                      placeholder:
                                                          'Ex: Aluguel, Luz, Internet...',
                                                      className:
                                                          'bg-background-tertiary border-border-primary text-content-primary',
                                                  }),
                                              ],
                                          }),
                                          (0, t.jsxs)('div', {
                                              className: 'space-y-1',
                                              children: [
                                                  (0, t.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      htmlFor: 'amount',
                                                      children: 'Valor (R$)',
                                                  }),
                                                  (0, t.jsx)(s.Input, {
                                                      id: 'amount',
                                                      name: 'amount',
                                                      type: 'number',
                                                      step: '0.01',
                                                      min: '0',
                                                      required: !0,
                                                      className:
                                                          'bg-background-tertiary border-border-primary text-content-primary',
                                                  }),
                                              ],
                                          }),
                                          (0, t.jsxs)('div', {
                                              className: 'space-y-3',
                                              children: [
                                                  (0, t.jsx)('input', {
                                                      id: 'isRecurring',
                                                      name: 'isRecurring',
                                                      type: 'checkbox',
                                                      className: 'peer sr-only',
                                                  }),
                                                  (0, t.jsxs)('label', {
                                                      htmlFor: 'isRecurring',
                                                      className:
                                                          ' inline-flex items-center gap-2 cursor-pointer peer-checked:[&_.box]:bg-border-brand peer-checked:[&_.box]:border-border-brand peer-checked:[&_.check]:bg-background-primary ',
                                                      children: [
                                                          (0, t.jsx)('span', {
                                                              className:
                                                                  ' box flex h-4 w-4 items-center justify-center rounded border border-border-primary bg-background-tertiary transition-colors ',
                                                              children: (0,
                                                              t.jsx)('span', {
                                                                  className:
                                                                      'check h-2 w-2 rounded-sm bg-transparent transition-colors',
                                                              }),
                                                          }),
                                                          (0, t.jsx)('span', {
                                                              className:
                                                                  'text-label-small text-content-primary',
                                                              children:
                                                                  'Despesa recorrente',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, t.jsxs)('div', {
                                                      className:
                                                          'space-y-1 hidden peer-checked:block',
                                                      children: [
                                                          (0, t.jsx)('label', {
                                                              className:
                                                                  'text-label-small text-content-secondary',
                                                              htmlFor:
                                                                  'recurringDay',
                                                              children:
                                                                  'Dia de vencimento (se recorrente)',
                                                          }),
                                                          (0, t.jsx)(s.Input, {
                                                              id: 'recurringDay',
                                                              name: 'recurringDay',
                                                              type: 'number',
                                                              min: 1,
                                                              max: 31,
                                                              placeholder:
                                                                  'Ex: 10',
                                                              className:
                                                                  'bg-background-tertiary border-border-primary text-content-primary',
                                                          }),
                                                          (0, t.jsx)('p', {
                                                              className:
                                                                  'text-paragraph-small text-content-secondary',
                                                              children:
                                                                  'Para despesas recorrentes, informe apenas o dia de vencimento (se for 31 e o mês não tiver, cai no último dia do mês).',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, t.jsxs)('div', {
                                                      className:
                                                          'space-y-1 peer-checked:hidden',
                                                      children: [
                                                          (0, t.jsx)('label', {
                                                              className:
                                                                  'text-label-small text-content-secondary',
                                                              htmlFor:
                                                                  'dueDate',
                                                              children:
                                                                  'Data de vencimento (se NÃO recorrente)',
                                                          }),
                                                          (0, t.jsx)(h, {
                                                              id: 'dueDate',
                                                              name: 'dueDate',
                                                          }),
                                                          (0, t.jsx)('p', {
                                                              className:
                                                                  'text-paragraph-small text-content-secondary',
                                                              children:
                                                                  'Use este campo para despesas que acontecem em uma data única.',
                                                          }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                          m &&
                                              (0, t.jsx)('div', {
                                                  className:
                                                      'rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2',
                                                  children: (0, t.jsx)('p', {
                                                      className:
                                                          'text-paragraph-small text-red-600',
                                                      children: m,
                                                  }),
                                              }),
                                          (0, t.jsx)('div', {
                                              className:
                                                  'flex justify-end gap-2 pt-2',
                                              children: (0, t.jsx)(n.Button, {
                                                  type: 'submit',
                                                  variant: 'brand',
                                                  disabled: u || !g,
                                                  title: g
                                                      ? void 0
                                                      : 'Selecione uma unidade para salvar',
                                                  children: u
                                                      ? 'Salvando...'
                                                      : 'Salvar',
                                              }),
                                          }),
                                      ],
                                  }),
                              ],
                          }),
                      ],
                  });
        }
        e.s(['default', () => g], 378008);
    },
]);
