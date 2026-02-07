module.exports = [
    587969,
    (a) => {
        'use strict';
        var b = a.i(207958);
        a.s(['Calendar', () => b.default]);
    },
    766153,
    (a) => {
        'use strict';
        var b = a.i(727836);
        a.s(['ChevronDown', () => b.default]);
    },
    779184,
    337850,
    335430,
    785259,
    (a) => {
        'use strict';
        var b = a.i(264738);
        a.s(['ChevronLeft', () => b.default], 779184);
        var c = a.i(510187);
        a.s(['ChevronRight', () => c.default], 337850);
        var d = a.i(107439),
            e = a.i(559653),
            f = a.i(594723),
            g = a.i(752993),
            h = a.i(167139),
            i = a.i(977200),
            j = a.i(397063),
            k = a.i(574917),
            l = a.i(929629),
            m = a.i(256480),
            n = a.i(452662),
            o = a.i(765639),
            p = a.i(413813),
            q = a.i(584944),
            [r, s] = (0, g.createContextScope)('Tooltip', [
                j.createPopperScope,
            ]),
            t = (0, j.createPopperScope)(),
            u = 'TooltipProvider',
            v = 'tooltip.open',
            [w, x] = r(u),
            y = (a) => {
                let {
                        __scopeTooltip: b,
                        delayDuration: c = 700,
                        skipDelayDuration: e = 300,
                        disableHoverableContent: f = !1,
                        children: g,
                    } = a,
                    h = d.useRef(!0),
                    i = d.useRef(!1),
                    j = d.useRef(0);
                return (
                    d.useEffect(() => {
                        let a = j.current;
                        return () => window.clearTimeout(a);
                    }, []),
                    (0, q.jsx)(w, {
                        scope: b,
                        isOpenDelayedRef: h,
                        delayDuration: c,
                        onOpen: d.useCallback(() => {
                            (window.clearTimeout(j.current), (h.current = !1));
                        }, []),
                        onClose: d.useCallback(() => {
                            (window.clearTimeout(j.current),
                                (j.current = window.setTimeout(
                                    () => (h.current = !0),
                                    e
                                )));
                        }, [e]),
                        isPointerInTransitRef: i,
                        onPointerInTransitChange: d.useCallback((a) => {
                            i.current = a;
                        }, []),
                        disableHoverableContent: f,
                        children: g,
                    })
                );
            };
        y.displayName = u;
        var z = 'Tooltip',
            [A, B] = r(z),
            C = (a) => {
                let {
                        __scopeTooltip: b,
                        children: c,
                        open: e,
                        defaultOpen: f,
                        onOpenChange: g,
                        disableHoverableContent: h,
                        delayDuration: k,
                    } = a,
                    l = x(z, a.__scopeTooltip),
                    m = t(b),
                    [n, p] = d.useState(null),
                    r = (0, i.useId)(),
                    s = d.useRef(0),
                    u = h ?? l.disableHoverableContent,
                    w = k ?? l.delayDuration,
                    y = d.useRef(!1),
                    [B, C] = (0, o.useControllableState)({
                        prop: e,
                        defaultProp: f ?? !1,
                        onChange: (a) => {
                            (a
                                ? (l.onOpen(),
                                  document.dispatchEvent(new CustomEvent(v)))
                                : l.onClose(),
                                g?.(a));
                        },
                        caller: z,
                    }),
                    D = d.useMemo(
                        () =>
                            B
                                ? y.current
                                    ? 'delayed-open'
                                    : 'instant-open'
                                : 'closed',
                        [B]
                    ),
                    E = d.useCallback(() => {
                        (window.clearTimeout(s.current),
                            (s.current = 0),
                            (y.current = !1),
                            C(!0));
                    }, [C]),
                    F = d.useCallback(() => {
                        (window.clearTimeout(s.current),
                            (s.current = 0),
                            C(!1));
                    }, [C]),
                    G = d.useCallback(() => {
                        (window.clearTimeout(s.current),
                            (s.current = window.setTimeout(() => {
                                ((y.current = !0), C(!0), (s.current = 0));
                            }, w)));
                    }, [w, C]);
                return (
                    d.useEffect(
                        () => () => {
                            s.current &&
                                (window.clearTimeout(s.current),
                                (s.current = 0));
                        },
                        []
                    ),
                    (0, q.jsx)(j.Root, {
                        ...m,
                        children: (0, q.jsx)(A, {
                            scope: b,
                            contentId: r,
                            open: B,
                            stateAttribute: D,
                            trigger: n,
                            onTriggerChange: p,
                            onTriggerEnter: d.useCallback(() => {
                                l.isOpenDelayedRef.current ? G() : E();
                            }, [l.isOpenDelayedRef, G, E]),
                            onTriggerLeave: d.useCallback(() => {
                                u
                                    ? F()
                                    : (window.clearTimeout(s.current),
                                      (s.current = 0));
                            }, [F, u]),
                            onOpen: E,
                            onClose: F,
                            disableHoverableContent: u,
                            children: c,
                        }),
                    })
                );
            };
        C.displayName = z;
        var D = 'TooltipTrigger',
            E = d.forwardRef((a, b) => {
                let { __scopeTooltip: c, ...g } = a,
                    h = B(D, c),
                    i = x(D, c),
                    k = t(c),
                    l = d.useRef(null),
                    n = (0, f.useComposedRefs)(b, l, h.onTriggerChange),
                    o = d.useRef(!1),
                    p = d.useRef(!1),
                    r = d.useCallback(() => (o.current = !1), []);
                return (
                    d.useEffect(
                        () => () =>
                            document.removeEventListener('pointerup', r),
                        [r]
                    ),
                    (0, q.jsx)(j.Anchor, {
                        asChild: !0,
                        ...k,
                        children: (0, q.jsx)(m.Primitive.button, {
                            'aria-describedby': h.open ? h.contentId : void 0,
                            'data-state': h.stateAttribute,
                            ...g,
                            ref: n,
                            onPointerMove: (0, e.composeEventHandlers)(
                                a.onPointerMove,
                                (a) => {
                                    'touch' !== a.pointerType &&
                                        (p.current ||
                                            i.isPointerInTransitRef.current ||
                                            (h.onTriggerEnter(),
                                            (p.current = !0)));
                                }
                            ),
                            onPointerLeave: (0, e.composeEventHandlers)(
                                a.onPointerLeave,
                                () => {
                                    (h.onTriggerLeave(), (p.current = !1));
                                }
                            ),
                            onPointerDown: (0, e.composeEventHandlers)(
                                a.onPointerDown,
                                () => {
                                    (h.open && h.onClose(),
                                        (o.current = !0),
                                        document.addEventListener(
                                            'pointerup',
                                            r,
                                            { once: !0 }
                                        ));
                                }
                            ),
                            onFocus: (0, e.composeEventHandlers)(
                                a.onFocus,
                                () => {
                                    o.current || h.onOpen();
                                }
                            ),
                            onBlur: (0, e.composeEventHandlers)(
                                a.onBlur,
                                h.onClose
                            ),
                            onClick: (0, e.composeEventHandlers)(
                                a.onClick,
                                h.onClose
                            ),
                        }),
                    })
                );
            });
        E.displayName = D;
        var F = 'TooltipPortal',
            [G, H] = r(F, { forceMount: void 0 }),
            I = (a) => {
                let {
                        __scopeTooltip: b,
                        forceMount: c,
                        children: d,
                        container: e,
                    } = a,
                    f = B(F, b);
                return (0, q.jsx)(G, {
                    scope: b,
                    forceMount: c,
                    children: (0, q.jsx)(l.Presence, {
                        present: c || f.open,
                        children: (0, q.jsx)(k.Portal, {
                            asChild: !0,
                            container: e,
                            children: d,
                        }),
                    }),
                });
            };
        I.displayName = F;
        var J = 'TooltipContent',
            K = d.forwardRef((a, b) => {
                let c = H(J, a.__scopeTooltip),
                    { forceMount: d = c.forceMount, side: e = 'top', ...f } = a,
                    g = B(J, a.__scopeTooltip);
                return (0, q.jsx)(l.Presence, {
                    present: d || g.open,
                    children: g.disableHoverableContent
                        ? (0, q.jsx)(P, { side: e, ...f, ref: b })
                        : (0, q.jsx)(L, { side: e, ...f, ref: b }),
                });
            }),
            L = d.forwardRef((a, b) => {
                let c = B(J, a.__scopeTooltip),
                    e = x(J, a.__scopeTooltip),
                    g = d.useRef(null),
                    h = (0, f.useComposedRefs)(b, g),
                    [i, j] = d.useState(null),
                    { trigger: k, onClose: l } = c,
                    m = g.current,
                    { onPointerInTransitChange: n } = e,
                    o = d.useCallback(() => {
                        (j(null), n(!1));
                    }, [n]),
                    p = d.useCallback(
                        (a, b) => {
                            let c,
                                d = a.currentTarget,
                                e = { x: a.clientX, y: a.clientY },
                                f = (function (a, b) {
                                    let c = Math.abs(b.top - a.y),
                                        d = Math.abs(b.bottom - a.y),
                                        e = Math.abs(b.right - a.x),
                                        f = Math.abs(b.left - a.x);
                                    switch (Math.min(c, d, e, f)) {
                                        case f:
                                            return 'left';
                                        case e:
                                            return 'right';
                                        case c:
                                            return 'top';
                                        case d:
                                            return 'bottom';
                                        default:
                                            throw Error('unreachable');
                                    }
                                })(e, d.getBoundingClientRect());
                            (j(
                                ((c = [
                                    ...(function (a, b, c = 5) {
                                        let d = [];
                                        switch (b) {
                                            case 'top':
                                                d.push(
                                                    { x: a.x - c, y: a.y + c },
                                                    { x: a.x + c, y: a.y + c }
                                                );
                                                break;
                                            case 'bottom':
                                                d.push(
                                                    { x: a.x - c, y: a.y - c },
                                                    { x: a.x + c, y: a.y - c }
                                                );
                                                break;
                                            case 'left':
                                                d.push(
                                                    { x: a.x + c, y: a.y - c },
                                                    { x: a.x + c, y: a.y + c }
                                                );
                                                break;
                                            case 'right':
                                                d.push(
                                                    { x: a.x - c, y: a.y - c },
                                                    { x: a.x - c, y: a.y + c }
                                                );
                                        }
                                        return d;
                                    })(e, f),
                                    ...(function (a) {
                                        let {
                                            top: b,
                                            right: c,
                                            bottom: d,
                                            left: e,
                                        } = a;
                                        return [
                                            { x: e, y: b },
                                            { x: c, y: b },
                                            { x: c, y: d },
                                            { x: e, y: d },
                                        ];
                                    })(b.getBoundingClientRect()),
                                ].slice()).sort((a, b) =>
                                    a.x < b.x
                                        ? -1
                                        : a.x > b.x
                                          ? 1
                                          : a.y < b.y
                                            ? -1
                                            : 1 * !!(a.y > b.y)
                                ),
                                (function (a) {
                                    if (a.length <= 1) return a.slice();
                                    let b = [];
                                    for (let c = 0; c < a.length; c++) {
                                        let d = a[c];
                                        for (; b.length >= 2; ) {
                                            let a = b[b.length - 1],
                                                c = b[b.length - 2];
                                            if (
                                                (a.x - c.x) * (d.y - c.y) >=
                                                (a.y - c.y) * (d.x - c.x)
                                            )
                                                b.pop();
                                            else break;
                                        }
                                        b.push(d);
                                    }
                                    b.pop();
                                    let c = [];
                                    for (let b = a.length - 1; b >= 0; b--) {
                                        let d = a[b];
                                        for (; c.length >= 2; ) {
                                            let a = c[c.length - 1],
                                                b = c[c.length - 2];
                                            if (
                                                (a.x - b.x) * (d.y - b.y) >=
                                                (a.y - b.y) * (d.x - b.x)
                                            )
                                                c.pop();
                                            else break;
                                        }
                                        c.push(d);
                                    }
                                    return (c.pop(),
                                    1 === b.length &&
                                        1 === c.length &&
                                        b[0].x === c[0].x &&
                                        b[0].y === c[0].y)
                                        ? b
                                        : b.concat(c);
                                })(c))
                            ),
                                n(!0));
                        },
                        [n]
                    );
                return (
                    d.useEffect(() => () => o(), [o]),
                    d.useEffect(() => {
                        if (k && m) {
                            let a = (a) => p(a, m),
                                b = (a) => p(a, k);
                            return (
                                k.addEventListener('pointerleave', a),
                                m.addEventListener('pointerleave', b),
                                () => {
                                    (k.removeEventListener('pointerleave', a),
                                        m.removeEventListener(
                                            'pointerleave',
                                            b
                                        ));
                                }
                            );
                        }
                    }, [k, m, p, o]),
                    d.useEffect(() => {
                        if (i) {
                            let a = (a) => {
                                let b = a.target,
                                    c = { x: a.clientX, y: a.clientY },
                                    d = k?.contains(b) || m?.contains(b),
                                    e = !(function (a, b) {
                                        let { x: c, y: d } = a,
                                            e = !1;
                                        for (
                                            let a = 0, f = b.length - 1;
                                            a < b.length;
                                            f = a++
                                        ) {
                                            let g = b[a],
                                                h = b[f],
                                                i = g.x,
                                                j = g.y,
                                                k = h.x,
                                                l = h.y;
                                            j > d != l > d &&
                                                c <
                                                    ((k - i) * (d - j)) /
                                                        (l - j) +
                                                        i &&
                                                (e = !e);
                                        }
                                        return e;
                                    })(c, i);
                                d ? o() : e && (o(), l());
                            };
                            return (
                                document.addEventListener('pointermove', a),
                                () =>
                                    document.removeEventListener(
                                        'pointermove',
                                        a
                                    )
                            );
                        }
                    }, [k, m, i, l, o]),
                    (0, q.jsx)(P, { ...a, ref: h })
                );
            }),
            [M, N] = r(z, { isInside: !1 }),
            O = (0, n.createSlottable)('TooltipContent'),
            P = d.forwardRef((a, b) => {
                let {
                        __scopeTooltip: c,
                        children: e,
                        'aria-label': f,
                        onEscapeKeyDown: g,
                        onPointerDownOutside: i,
                        ...k
                    } = a,
                    l = B(J, c),
                    m = t(c),
                    { onClose: n } = l;
                return (
                    d.useEffect(
                        () => (
                            document.addEventListener(v, n),
                            () => document.removeEventListener(v, n)
                        ),
                        [n]
                    ),
                    d.useEffect(() => {
                        if (l.trigger) {
                            let a = (a) => {
                                let b = a.target;
                                b?.contains(l.trigger) && n();
                            };
                            return (
                                window.addEventListener('scroll', a, {
                                    capture: !0,
                                }),
                                () =>
                                    window.removeEventListener('scroll', a, {
                                        capture: !0,
                                    })
                            );
                        }
                    }, [l.trigger, n]),
                    (0, q.jsx)(h.DismissableLayer, {
                        asChild: !0,
                        disableOutsidePointerEvents: !1,
                        onEscapeKeyDown: g,
                        onPointerDownOutside: i,
                        onFocusOutside: (a) => a.preventDefault(),
                        onDismiss: n,
                        children: (0, q.jsxs)(j.Content, {
                            'data-state': l.stateAttribute,
                            ...m,
                            ...k,
                            ref: b,
                            style: {
                                ...k.style,
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
                                (0, q.jsx)(O, { children: e }),
                                (0, q.jsx)(M, {
                                    scope: c,
                                    isInside: !0,
                                    children: (0, q.jsx)(p.Root, {
                                        id: l.contentId,
                                        role: 'tooltip',
                                        children: f || e,
                                    }),
                                }),
                            ],
                        }),
                    })
                );
            });
        K.displayName = J;
        var Q = 'TooltipArrow',
            R = d.forwardRef((a, b) => {
                let { __scopeTooltip: c, ...d } = a,
                    e = t(c);
                return N(Q, c).isInside
                    ? null
                    : (0, q.jsx)(j.Arrow, { ...e, ...d, ref: b });
            });
        ((R.displayName = Q),
            a.s(
                [
                    'Arrow',
                    () => R,
                    'Content',
                    () => K,
                    'Portal',
                    () => I,
                    'Provider',
                    () => y,
                    'Root',
                    () => C,
                    'TooltipProvider',
                    () => y,
                    'Trigger',
                    () => E,
                ],
                335430
            ));
        var S = a.i(368114);
        function T({ delayDuration: a = 0, ...b }) {
            return (0, q.jsx)(y, {
                'data-slot': 'tooltip-provider',
                delayDuration: a,
                ...b,
            });
        }
        function U({ ...a }) {
            return (0, q.jsx)(T, {
                children: (0, q.jsx)(C, { 'data-slot': 'tooltip', ...a }),
            });
        }
        function V({ ...a }) {
            return (0, q.jsx)(E, { 'data-slot': 'tooltip-trigger', ...a });
        }
        function W({ className: a, sideOffset: b = 0, children: c, ...d }) {
            return (0, q.jsx)(I, {
                children: (0, q.jsxs)(K, {
                    'data-slot': 'tooltip-content',
                    sideOffset: b,
                    className: (0, S.cn)(
                        'bg-foreground-primary text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
                        a
                    ),
                    ...d,
                    children: [c, (0, q.jsx)(R, {})],
                }),
            });
        }
        a.s(
            [
                'Tooltip',
                () => U,
                'TooltipContent',
                () => W,
                'TooltipTrigger',
                () => V,
            ],
            785259
        );
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
    300298,
    (a) => {
        'use strict';
        var b = a.i(984927);
        a.s(['X', () => b.default]);
    },
    638446,
    (a) => {
        'use strict';
        var b = a.i(143324);
        a.s(['Check', () => b.default]);
    },
    50900,
    (a) => {
        'use strict';
        let b = (0, a.i(203431).default)('search', [
            ['path', { d: 'm21 21-4.34-4.34', key: '14j7rj' }],
            ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
        ]);
        a.s(['Search', () => b], 50900);
    },
    624126,
    (a) => {
        'use strict';
        let b = (0, a.i(203431).default)('clock', [
            ['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
            ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
        ]);
        a.s(['Clock', () => b], 624126);
    },
    550516,
    (a) => {
        'use strict';
        var b = a.i(42881);
        function c(a) {
            return (0, b.startOfDay)(Date.now(), a);
        }
        a.s(['startOfToday', () => c]);
    },
    486192,
    794729,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(752993),
            e = a.i(594723),
            f = a.i(921923),
            g = a.i(559653),
            h = a.i(452662),
            i = 'AlertDialog',
            [j, k] = (0, d.createContextScope)(i, [f.createDialogScope]),
            l = (0, f.createDialogScope)(),
            m = (a) => {
                let { __scopeAlertDialog: c, ...d } = a,
                    e = l(c);
                return (0, b.jsx)(f.Root, { ...e, ...d, modal: !0 });
            };
        m.displayName = i;
        var n = c.forwardRef((a, c) => {
            let { __scopeAlertDialog: d, ...e } = a,
                g = l(d);
            return (0, b.jsx)(f.Trigger, { ...g, ...e, ref: c });
        });
        n.displayName = 'AlertDialogTrigger';
        var o = (a) => {
            let { __scopeAlertDialog: c, ...d } = a,
                e = l(c);
            return (0, b.jsx)(f.Portal, { ...e, ...d });
        };
        o.displayName = 'AlertDialogPortal';
        var p = c.forwardRef((a, c) => {
            let { __scopeAlertDialog: d, ...e } = a,
                g = l(d);
            return (0, b.jsx)(f.Overlay, { ...g, ...e, ref: c });
        });
        p.displayName = 'AlertDialogOverlay';
        var q = 'AlertDialogContent',
            [r, s] = j(q),
            t = (0, h.createSlottable)('AlertDialogContent'),
            u = c.forwardRef((a, d) => {
                let { __scopeAlertDialog: h, children: i, ...j } = a,
                    k = l(h),
                    m = c.useRef(null),
                    n = (0, e.useComposedRefs)(d, m),
                    o = c.useRef(null);
                return (0, b.jsx)(f.WarningProvider, {
                    contentName: q,
                    titleName: v,
                    docsSlug: 'alert-dialog',
                    children: (0, b.jsx)(r, {
                        scope: h,
                        cancelRef: o,
                        children: (0, b.jsxs)(f.Content, {
                            role: 'alertdialog',
                            ...k,
                            ...j,
                            ref: n,
                            onOpenAutoFocus: (0, g.composeEventHandlers)(
                                j.onOpenAutoFocus,
                                (a) => {
                                    (a.preventDefault(),
                                        o.current?.focus({
                                            preventScroll: !0,
                                        }));
                                }
                            ),
                            onPointerDownOutside: (a) => a.preventDefault(),
                            onInteractOutside: (a) => a.preventDefault(),
                            children: [
                                (0, b.jsx)(t, { children: i }),
                                (0, b.jsx)(C, { contentRef: m }),
                            ],
                        }),
                    }),
                });
            });
        u.displayName = q;
        var v = 'AlertDialogTitle',
            w = c.forwardRef((a, c) => {
                let { __scopeAlertDialog: d, ...e } = a,
                    g = l(d);
                return (0, b.jsx)(f.Title, { ...g, ...e, ref: c });
            });
        w.displayName = v;
        var x = 'AlertDialogDescription',
            y = c.forwardRef((a, c) => {
                let { __scopeAlertDialog: d, ...e } = a,
                    g = l(d);
                return (0, b.jsx)(f.Description, { ...g, ...e, ref: c });
            });
        y.displayName = x;
        var z = c.forwardRef((a, c) => {
            let { __scopeAlertDialog: d, ...e } = a,
                g = l(d);
            return (0, b.jsx)(f.Close, { ...g, ...e, ref: c });
        });
        z.displayName = 'AlertDialogAction';
        var A = 'AlertDialogCancel',
            B = c.forwardRef((a, c) => {
                let { __scopeAlertDialog: d, ...g } = a,
                    { cancelRef: h } = s(A, d),
                    i = l(d),
                    j = (0, e.useComposedRefs)(c, h);
                return (0, b.jsx)(f.Close, { ...i, ...g, ref: j });
            });
        B.displayName = A;
        var C = ({ contentRef: a }) => {
            let b = `\`${q}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${q}\` by passing a \`${x}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${q}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
            return (
                c.useEffect(() => {
                    document.getElementById(
                        a.current?.getAttribute('aria-describedby')
                    ) || console.warn(b);
                }, [b, a]),
                null
            );
        };
        a.s(
            [
                'Action',
                () => z,
                'Cancel',
                () => B,
                'Content',
                () => u,
                'Description',
                () => y,
                'Overlay',
                () => p,
                'Portal',
                () => o,
                'Root',
                () => m,
                'Title',
                () => w,
                'Trigger',
                () => n,
            ],
            794729
        );
        var D = a.i(368114),
            E = a.i(699570);
        let F = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(p, {
                className: (0, D.cn)(
                    'fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    a
                ),
                ...c,
                ref: d,
            })
        );
        F.displayName = p.displayName;
        let G = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsxs)(o, {
                children: [
                    (0, b.jsx)(F, {}),
                    (0, b.jsx)(u, {
                        ref: d,
                        className: (0, D.cn)(
                            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background-tertiary border-none p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg',
                            a
                        ),
                        ...c,
                    }),
                ],
            })
        );
        G.displayName = u.displayName;
        let H = ({ className: a, ...c }) =>
            (0, b.jsx)('div', {
                className: (0, D.cn)(
                    'flex flex-col space-y-2 text-center sm:text-left',
                    a
                ),
                ...c,
            });
        H.displayName = 'AlertDialogHeader';
        let I = ({ className: a, ...c }) =>
            (0, b.jsx)('div', {
                className: (0, D.cn)(
                    'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
                    a
                ),
                ...c,
            });
        I.displayName = 'AlertDialogFooter';
        let J = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(w, {
                ref: d,
                className: (0, D.cn)(
                    'text-title-modal text-content-primary',
                    a
                ),
                ...c,
            })
        );
        J.displayName = w.displayName;
        let K = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(y, {
                ref: d,
                className: (0, D.cn)(
                    'text-paragraph-medium text-content-secondary',
                    a
                ),
                ...c,
            })
        );
        K.displayName = y.displayName;
        let L = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(z, {
                ref: d,
                className: (0, D.cn)(
                    (0, E.buttonVariants)({ variant: 'destructive' }),
                    'text-label-medium h-10 px-6 rounded-lg',
                    a
                ),
                ...c,
            })
        );
        L.displayName = z.displayName;
        let M = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(B, {
                ref: d,
                className: (0, D.cn)(
                    (0, E.buttonVariants)({ variant: 'outline' }),
                    'text-label-medium h-10 px-6 rounded-lg mt-2 sm:mt-0',
                    a
                ),
                ...c,
            })
        );
        ((M.displayName = B.displayName),
            a.s(
                [
                    'AlertDialog',
                    () => m,
                    'AlertDialogAction',
                    () => L,
                    'AlertDialogCancel',
                    () => M,
                    'AlertDialogContent',
                    () => G,
                    'AlertDialogDescription',
                    () => K,
                    'AlertDialogFooter',
                    () => I,
                    'AlertDialogHeader',
                    () => H,
                    'AlertDialogTitle',
                    () => J,
                    'AlertDialogTrigger',
                    () => n,
                ],
                486192
            ));
    },
];

//# sourceMappingURL=_a0a1008f._.js.map
