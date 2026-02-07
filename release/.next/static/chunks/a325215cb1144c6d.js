(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    291967,
    (e) => {
        'use strict';
        function t(e, n, { checkForDefaultPrevented: r = !0 } = {}) {
            return function (t) {
                if ((e?.(t), !1 === r || !t.defaultPrevented)) return n?.(t);
            };
        }
        ('undefined' != typeof window &&
            window.document &&
            window.document.createElement,
            e.s(['composeEventHandlers', () => t]));
    },
    784711,
    (e) => {
        'use strict';
        var t = e.i(990341),
            n = e.i(565750);
        function r(e, r) {
            let o = t.createContext(r),
                i = (e) => {
                    let { children: r, ...i } = e,
                        a = t.useMemo(() => i, Object.values(i));
                    return (0, n.jsx)(o.Provider, { value: a, children: r });
                };
            return (
                (i.displayName = e + 'Provider'),
                [
                    i,
                    function (n) {
                        let i = t.useContext(o);
                        if (i) return i;
                        if (void 0 !== r) return r;
                        throw Error(`\`${n}\` must be used within \`${e}\``);
                    },
                ]
            );
        }
        function o(e, r = []) {
            let i = [],
                a = () => {
                    let n = i.map((e) => t.createContext(e));
                    return function (r) {
                        let o = r?.[e] || n;
                        return t.useMemo(
                            () => ({ [`__scope${e}`]: { ...r, [e]: o } }),
                            [r, o]
                        );
                    };
                };
            return (
                (a.scopeName = e),
                [
                    function (r, o) {
                        let a = t.createContext(o),
                            l = i.length;
                        i = [...i, o];
                        let u = (r) => {
                            let { scope: o, children: i, ...u } = r,
                                c = o?.[e]?.[l] || a,
                                s = t.useMemo(() => u, Object.values(u));
                            return (0, n.jsx)(c.Provider, {
                                value: s,
                                children: i,
                            });
                        };
                        return (
                            (u.displayName = r + 'Provider'),
                            [
                                u,
                                function (n, i) {
                                    let u = i?.[e]?.[l] || a,
                                        c = t.useContext(u);
                                    if (c) return c;
                                    if (void 0 !== o) return o;
                                    throw Error(
                                        `\`${n}\` must be used within \`${r}\``
                                    );
                                },
                            ]
                        );
                    },
                    (function (...e) {
                        let n = e[0];
                        if (1 === e.length) return n;
                        let r = () => {
                            let r = e.map((e) => ({
                                useScope: e(),
                                scopeName: e.scopeName,
                            }));
                            return function (e) {
                                let o = r.reduce(
                                    (t, { useScope: n, scopeName: r }) => {
                                        let o = n(e)[`__scope${r}`];
                                        return { ...t, ...o };
                                    },
                                    {}
                                );
                                return t.useMemo(
                                    () => ({ [`__scope${n.scopeName}`]: o }),
                                    [o]
                                );
                            };
                        };
                        return ((r.scopeName = n.scopeName), r);
                    })(a, ...r),
                ]
            );
        }
        e.s(['createContext', () => r, 'createContextScope', () => o]);
    },
    655875,
    (e) => {
        'use strict';
        var t = e.i(990341),
            n = e.i(672687),
            r = e.i(565750);
        function o(e) {
            var o;
            let i,
                a =
                    ((o = e),
                    ((i = t.forwardRef((e, r) => {
                        let { children: o, ...i } = e;
                        if (t.isValidElement(o)) {
                            var a;
                            let e,
                                l,
                                u =
                                    ((a = o),
                                    (l =
                                        (e = Object.getOwnPropertyDescriptor(
                                            a.props,
                                            'ref'
                                        )?.get) &&
                                        'isReactWarning' in e &&
                                        e.isReactWarning)
                                        ? a.ref
                                        : (l =
                                                (e =
                                                    Object.getOwnPropertyDescriptor(
                                                        a,
                                                        'ref'
                                                    )?.get) &&
                                                'isReactWarning' in e &&
                                                e.isReactWarning)
                                          ? a.props.ref
                                          : a.props.ref || a.ref),
                                c = (function (e, t) {
                                    let n = { ...t };
                                    for (let r in t) {
                                        let o = e[r],
                                            i = t[r];
                                        /^on[A-Z]/.test(r)
                                            ? o && i
                                                ? (n[r] = (...e) => {
                                                      let t = i(...e);
                                                      return (o(...e), t);
                                                  })
                                                : o && (n[r] = o)
                                            : 'style' === r
                                              ? (n[r] = { ...o, ...i })
                                              : 'className' === r &&
                                                (n[r] = [o, i]
                                                    .filter(Boolean)
                                                    .join(' '));
                                    }
                                    return { ...e, ...n };
                                })(i, o.props);
                            return (
                                o.type !== t.Fragment &&
                                    (c.ref = r ? (0, n.composeRefs)(r, u) : u),
                                t.cloneElement(o, c)
                            );
                        }
                        return t.Children.count(o) > 1
                            ? t.Children.only(null)
                            : null;
                    })).displayName = `${o}.SlotClone`),
                    i),
                u = t.forwardRef((e, n) => {
                    let { children: o, ...i } = e,
                        u = t.Children.toArray(o),
                        c = u.find(l);
                    if (c) {
                        let e = c.props.children,
                            o = u.map((n) =>
                                n !== c
                                    ? n
                                    : t.Children.count(e) > 1
                                      ? t.Children.only(null)
                                      : t.isValidElement(e)
                                        ? e.props.children
                                        : null
                            );
                        return (0, r.jsx)(a, {
                            ...i,
                            ref: n,
                            children: t.isValidElement(e)
                                ? t.cloneElement(e, void 0, o)
                                : null,
                        });
                    }
                    return (0, r.jsx)(a, { ...i, ref: n, children: o });
                });
            return ((u.displayName = `${e}.Slot`), u);
        }
        var i = Symbol('radix.slottable');
        function a(e) {
            let t = ({ children: e }) =>
                (0, r.jsx)(r.Fragment, { children: e });
            return ((t.displayName = `${e}.Slottable`), (t.__radixId = i), t);
        }
        function l(e) {
            return (
                t.isValidElement(e) &&
                'function' == typeof e.type &&
                '__radixId' in e.type &&
                e.type.__radixId === i
            );
        }
        e.s(['createSlot', () => o, 'createSlottable', () => a]);
    },
    403078,
    (e) => {
        'use strict';
        var t = e.i(990341),
            n = e.i(940842),
            r = e.i(655875),
            o = e.i(565750),
            i = [
                'a',
                'button',
                'div',
                'form',
                'h2',
                'h3',
                'img',
                'input',
                'label',
                'li',
                'nav',
                'ol',
                'p',
                'select',
                'span',
                'svg',
                'ul',
            ].reduce((e, n) => {
                let i = (0, r.createSlot)(`Primitive.${n}`),
                    a = t.forwardRef((e, t) => {
                        let { asChild: r, ...a } = e;
                        return (
                            'undefined' != typeof window &&
                                (window[Symbol.for('radix-ui')] = !0),
                            (0, o.jsx)(r ? i : n, { ...a, ref: t })
                        );
                    });
                return ((a.displayName = `Primitive.${n}`), { ...e, [n]: a });
            }, {});
        function a(e, t) {
            e && n.flushSync(() => e.dispatchEvent(t));
        }
        e.s(['Primitive', () => i, 'dispatchDiscreteCustomEvent', () => a]);
    },
    846357,
    461404,
    (e) => {
        'use strict';
        var t,
            n = e.i(990341),
            r = e.i(291967),
            o = e.i(403078),
            i = e.i(672687);
        function a(e) {
            let t = n.useRef(e);
            return (
                n.useEffect(() => {
                    t.current = e;
                }),
                n.useMemo(
                    () =>
                        (...e) =>
                            t.current?.(...e),
                    []
                )
            );
        }
        e.s(['useCallbackRef', () => a], 461404);
        var l = e.i(565750),
            u = 'dismissableLayer.update',
            c = n.createContext({
                layers: new Set(),
                layersWithOutsidePointerEventsDisabled: new Set(),
                branches: new Set(),
            }),
            s = n.forwardRef((e, s) => {
                let {
                        disableOutsidePointerEvents: p = !1,
                        onEscapeKeyDown: m,
                        onPointerDownOutside: h,
                        onFocusOutside: v,
                        onInteractOutside: g,
                        onDismiss: y,
                        ...w
                    } = e,
                    b = n.useContext(c),
                    [x, E] = n.useState(null),
                    S = x?.ownerDocument ?? globalThis?.document,
                    [, R] = n.useState({}),
                    C = (0, i.useComposedRefs)(s, (e) => E(e)),
                    A = Array.from(b.layers),
                    [L] = [...b.layersWithOutsidePointerEventsDisabled].slice(
                        -1
                    ),
                    P = A.indexOf(L),
                    T = x ? A.indexOf(x) : -1,
                    O = b.layersWithOutsidePointerEventsDisabled.size > 0,
                    k = T >= P,
                    N = (function (e, t = globalThis?.document) {
                        let r = a(e),
                            o = n.useRef(!1),
                            i = n.useRef(() => {});
                        return (
                            n.useEffect(() => {
                                let e = (e) => {
                                        if (e.target && !o.current) {
                                            let n = function () {
                                                    d(
                                                        'dismissableLayer.pointerDownOutside',
                                                        r,
                                                        o,
                                                        { discrete: !0 }
                                                    );
                                                },
                                                o = { originalEvent: e };
                                            'touch' === e.pointerType
                                                ? (t.removeEventListener(
                                                      'click',
                                                      i.current
                                                  ),
                                                  (i.current = n),
                                                  t.addEventListener(
                                                      'click',
                                                      i.current,
                                                      { once: !0 }
                                                  ))
                                                : n();
                                        } else
                                            t.removeEventListener(
                                                'click',
                                                i.current
                                            );
                                        o.current = !1;
                                    },
                                    n = window.setTimeout(() => {
                                        t.addEventListener('pointerdown', e);
                                    }, 0);
                                return () => {
                                    (window.clearTimeout(n),
                                        t.removeEventListener('pointerdown', e),
                                        t.removeEventListener(
                                            'click',
                                            i.current
                                        ));
                                };
                            }, [t, r]),
                            { onPointerDownCapture: () => (o.current = !0) }
                        );
                    })((e) => {
                        let t = e.target,
                            n = [...b.branches].some((e) => e.contains(t));
                        k &&
                            !n &&
                            (h?.(e), g?.(e), e.defaultPrevented || y?.());
                    }, S),
                    D = (function (e, t = globalThis?.document) {
                        let r = a(e),
                            o = n.useRef(!1);
                        return (
                            n.useEffect(() => {
                                let e = (e) => {
                                    e.target &&
                                        !o.current &&
                                        d(
                                            'dismissableLayer.focusOutside',
                                            r,
                                            { originalEvent: e },
                                            { discrete: !1 }
                                        );
                                };
                                return (
                                    t.addEventListener('focusin', e),
                                    () => t.removeEventListener('focusin', e)
                                );
                            }, [t, r]),
                            {
                                onFocusCapture: () => (o.current = !0),
                                onBlurCapture: () => (o.current = !1),
                            }
                        );
                    })((e) => {
                        let t = e.target;
                        ![...b.branches].some((e) => e.contains(t)) &&
                            (v?.(e), g?.(e), e.defaultPrevented || y?.());
                    }, S);
                return (
                    !(function (e, t = globalThis?.document) {
                        let r = a(e);
                        n.useEffect(() => {
                            let e = (e) => {
                                'Escape' === e.key && r(e);
                            };
                            return (
                                t.addEventListener('keydown', e, {
                                    capture: !0,
                                }),
                                () =>
                                    t.removeEventListener('keydown', e, {
                                        capture: !0,
                                    })
                            );
                        }, [r, t]);
                    })((e) => {
                        T === b.layers.size - 1 &&
                            (m?.(e),
                            !e.defaultPrevented &&
                                y &&
                                (e.preventDefault(), y()));
                    }, S),
                    n.useEffect(() => {
                        if (x)
                            return (
                                p &&
                                    (0 ===
                                        b.layersWithOutsidePointerEventsDisabled
                                            .size &&
                                        ((t = S.body.style.pointerEvents),
                                        (S.body.style.pointerEvents = 'none')),
                                    b.layersWithOutsidePointerEventsDisabled.add(
                                        x
                                    )),
                                b.layers.add(x),
                                f(),
                                () => {
                                    p &&
                                        1 ===
                                            b
                                                .layersWithOutsidePointerEventsDisabled
                                                .size &&
                                        (S.body.style.pointerEvents = t);
                                }
                            );
                    }, [x, S, p, b]),
                    n.useEffect(
                        () => () => {
                            x &&
                                (b.layers.delete(x),
                                b.layersWithOutsidePointerEventsDisabled.delete(
                                    x
                                ),
                                f());
                        },
                        [x, b]
                    ),
                    n.useEffect(() => {
                        let e = () => R({});
                        return (
                            document.addEventListener(u, e),
                            () => document.removeEventListener(u, e)
                        );
                    }, []),
                    (0, l.jsx)(o.Primitive.div, {
                        ...w,
                        ref: C,
                        style: {
                            pointerEvents: O ? (k ? 'auto' : 'none') : void 0,
                            ...e.style,
                        },
                        onFocusCapture: (0, r.composeEventHandlers)(
                            e.onFocusCapture,
                            D.onFocusCapture
                        ),
                        onBlurCapture: (0, r.composeEventHandlers)(
                            e.onBlurCapture,
                            D.onBlurCapture
                        ),
                        onPointerDownCapture: (0, r.composeEventHandlers)(
                            e.onPointerDownCapture,
                            N.onPointerDownCapture
                        ),
                    })
                );
            });
        function f() {
            let e = new CustomEvent(u);
            document.dispatchEvent(e);
        }
        function d(e, t, n, { discrete: r }) {
            let i = n.originalEvent.target,
                a = new CustomEvent(e, {
                    bubbles: !1,
                    cancelable: !0,
                    detail: n,
                });
            (t && i.addEventListener(e, t, { once: !0 }),
                r
                    ? (0, o.dispatchDiscreteCustomEvent)(i, a)
                    : i.dispatchEvent(a));
        }
        ((s.displayName = 'DismissableLayer'),
            (n.forwardRef((e, t) => {
                let r = n.useContext(c),
                    a = n.useRef(null),
                    u = (0, i.useComposedRefs)(t, a);
                return (
                    n.useEffect(() => {
                        let e = a.current;
                        if (e)
                            return (
                                r.branches.add(e),
                                () => {
                                    r.branches.delete(e);
                                }
                            );
                    }, [r.branches]),
                    (0, l.jsx)(o.Primitive.div, { ...e, ref: u })
                );
            }).displayName = 'DismissableLayerBranch'),
            e.s(['DismissableLayer', () => s], 846357));
    },
    774621,
    (e) => {
        'use strict';
        var t = e.i(990341),
            n = 0;
        function r() {
            t.useEffect(() => {
                let e = document.querySelectorAll('[data-radix-focus-guard]');
                return (
                    document.body.insertAdjacentElement(
                        'afterbegin',
                        e[0] ?? o()
                    ),
                    document.body.insertAdjacentElement(
                        'beforeend',
                        e[1] ?? o()
                    ),
                    n++,
                    () => {
                        (1 === n &&
                            document
                                .querySelectorAll('[data-radix-focus-guard]')
                                .forEach((e) => e.remove()),
                            n--);
                    }
                );
            }, []);
        }
        function o() {
            let e = document.createElement('span');
            return (
                e.setAttribute('data-radix-focus-guard', ''),
                (e.tabIndex = 0),
                (e.style.outline = 'none'),
                (e.style.opacity = '0'),
                (e.style.position = 'fixed'),
                (e.style.pointerEvents = 'none'),
                e
            );
        }
        e.s(['useFocusGuards', () => r]);
    },
    150076,
    (e) => {
        'use strict';
        var t = e.i(990341),
            n = globalThis?.document ? t.useLayoutEffect : () => {};
        e.s(['useLayoutEffect', () => n]);
    },
    910529,
    (e) => {
        'use strict';
        var t = e.i(990341),
            n = e.i(150076),
            r = t[' useId '.trim().toString()] || (() => void 0),
            o = 0;
        function i(e) {
            let [i, a] = t.useState(r());
            return (
                (0, n.useLayoutEffect)(() => {
                    e || a((e) => e ?? String(o++));
                }, [e]),
                e || (i ? `radix-${i}` : '')
            );
        }
        e.s(['useId', () => i]);
    },
    75355,
    (e) => {
        'use strict';
        var t = e.i(990341);
        let n = ['top', 'right', 'bottom', 'left'],
            r = Math.min,
            o = Math.max,
            i = Math.round,
            a = Math.floor,
            l = (e) => ({ x: e, y: e }),
            u = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
            c = { start: 'end', end: 'start' };
        function s(e, t) {
            return 'function' == typeof e ? e(t) : e;
        }
        function f(e) {
            return e.split('-')[0];
        }
        function d(e) {
            return e.split('-')[1];
        }
        function p(e) {
            return 'x' === e ? 'y' : 'x';
        }
        function m(e) {
            return 'y' === e ? 'height' : 'width';
        }
        let h = new Set(['top', 'bottom']);
        function v(e) {
            return h.has(f(e)) ? 'y' : 'x';
        }
        function g(e) {
            return e.replace(/start|end/g, (e) => c[e]);
        }
        let y = ['left', 'right'],
            w = ['right', 'left'],
            b = ['top', 'bottom'],
            x = ['bottom', 'top'];
        function E(e) {
            return e.replace(/left|right|bottom|top/g, (e) => u[e]);
        }
        function S(e) {
            return 'number' != typeof e
                ? { top: 0, right: 0, bottom: 0, left: 0, ...e }
                : { top: e, right: e, bottom: e, left: e };
        }
        function R(e) {
            let { x: t, y: n, width: r, height: o } = e;
            return {
                width: r,
                height: o,
                top: n,
                left: t,
                right: t + r,
                bottom: n + o,
                x: t,
                y: n,
            };
        }
        function C(e, t, n) {
            let r,
                { reference: o, floating: i } = e,
                a = v(t),
                l = p(v(t)),
                u = m(l),
                c = f(t),
                s = 'y' === a,
                h = o.x + o.width / 2 - i.width / 2,
                g = o.y + o.height / 2 - i.height / 2,
                y = o[u] / 2 - i[u] / 2;
            switch (c) {
                case 'top':
                    r = { x: h, y: o.y - i.height };
                    break;
                case 'bottom':
                    r = { x: h, y: o.y + o.height };
                    break;
                case 'right':
                    r = { x: o.x + o.width, y: g };
                    break;
                case 'left':
                    r = { x: o.x - i.width, y: g };
                    break;
                default:
                    r = { x: o.x, y: o.y };
            }
            switch (d(t)) {
                case 'start':
                    r[l] -= y * (n && s ? -1 : 1);
                    break;
                case 'end':
                    r[l] += y * (n && s ? -1 : 1);
            }
            return r;
        }
        async function A(e, t) {
            var n;
            void 0 === t && (t = {});
            let {
                    x: r,
                    y: o,
                    platform: i,
                    rects: a,
                    elements: l,
                    strategy: u,
                } = e,
                {
                    boundary: c = 'clippingAncestors',
                    rootBoundary: f = 'viewport',
                    elementContext: d = 'floating',
                    altBoundary: p = !1,
                    padding: m = 0,
                } = s(t, e),
                h = S(m),
                v = l[p ? ('floating' === d ? 'reference' : 'floating') : d],
                g = R(
                    await i.getClippingRect({
                        element:
                            null ==
                                (n = await (null == i.isElement
                                    ? void 0
                                    : i.isElement(v))) || n
                                ? v
                                : v.contextElement ||
                                  (await (null == i.getDocumentElement
                                      ? void 0
                                      : i.getDocumentElement(l.floating))),
                        boundary: c,
                        rootBoundary: f,
                        strategy: u,
                    })
                ),
                y =
                    'floating' === d
                        ? {
                              x: r,
                              y: o,
                              width: a.floating.width,
                              height: a.floating.height,
                          }
                        : a.reference,
                w = await (null == i.getOffsetParent
                    ? void 0
                    : i.getOffsetParent(l.floating)),
                b = ((await (null == i.isElement ? void 0 : i.isElement(w))) &&
                    (await (null == i.getScale ? void 0 : i.getScale(w)))) || {
                    x: 1,
                    y: 1,
                },
                x = R(
                    i.convertOffsetParentRelativeRectToViewportRelativeRect
                        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect(
                              {
                                  elements: l,
                                  rect: y,
                                  offsetParent: w,
                                  strategy: u,
                              }
                          )
                        : y
                );
            return {
                top: (g.top - x.top + h.top) / b.y,
                bottom: (x.bottom - g.bottom + h.bottom) / b.y,
                left: (g.left - x.left + h.left) / b.x,
                right: (x.right - g.right + h.right) / b.x,
            };
        }
        let L = async (e, t, n) => {
            let {
                    placement: r = 'bottom',
                    strategy: o = 'absolute',
                    middleware: i = [],
                    platform: a,
                } = n,
                l = i.filter(Boolean),
                u = await (null == a.isRTL ? void 0 : a.isRTL(t)),
                c = await a.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: o,
                }),
                { x: s, y: f } = C(c, r, u),
                d = r,
                p = {},
                m = 0;
            for (let n = 0; n < l.length; n++) {
                var h;
                let { name: i, fn: v } = l[n],
                    {
                        x: g,
                        y: y,
                        data: w,
                        reset: b,
                    } = await v({
                        x: s,
                        y: f,
                        initialPlacement: r,
                        placement: d,
                        strategy: o,
                        middlewareData: p,
                        rects: c,
                        platform: {
                            ...a,
                            detectOverflow:
                                null != (h = a.detectOverflow) ? h : A,
                        },
                        elements: { reference: e, floating: t },
                    });
                ((s = null != g ? g : s),
                    (f = null != y ? y : f),
                    (p = { ...p, [i]: { ...p[i], ...w } }),
                    b &&
                        m <= 50 &&
                        (m++,
                        'object' == typeof b &&
                            (b.placement && (d = b.placement),
                            b.rects &&
                                (c =
                                    !0 === b.rects
                                        ? await a.getElementRects({
                                              reference: e,
                                              floating: t,
                                              strategy: o,
                                          })
                                        : b.rects),
                            ({ x: s, y: f } = C(c, d, u))),
                        (n = -1)));
            }
            return { x: s, y: f, placement: d, strategy: o, middlewareData: p };
        };
        function P(e, t) {
            return {
                top: e.top - t.height,
                right: e.right - t.width,
                bottom: e.bottom - t.height,
                left: e.left - t.width,
            };
        }
        function T(e) {
            return n.some((t) => e[t] >= 0);
        }
        let O = new Set(['left', 'top']);
        async function k(e, t) {
            let { placement: n, platform: r, elements: o } = e,
                i = await (null == r.isRTL ? void 0 : r.isRTL(o.floating)),
                a = f(n),
                l = d(n),
                u = 'y' === v(n),
                c = O.has(a) ? -1 : 1,
                p = i && u ? -1 : 1,
                m = s(t, e),
                {
                    mainAxis: h,
                    crossAxis: g,
                    alignmentAxis: y,
                } = 'number' == typeof m
                    ? { mainAxis: m, crossAxis: 0, alignmentAxis: null }
                    : {
                          mainAxis: m.mainAxis || 0,
                          crossAxis: m.crossAxis || 0,
                          alignmentAxis: m.alignmentAxis,
                      };
            return (
                l && 'number' == typeof y && (g = 'end' === l ? -1 * y : y),
                u ? { x: g * p, y: h * c } : { x: h * c, y: g * p }
            );
        }
        function N() {
            return 'undefined' != typeof window;
        }
        function D(e) {
            return F(e) ? (e.nodeName || '').toLowerCase() : '#document';
        }
        function M(e) {
            var t;
            return (
                (null == e || null == (t = e.ownerDocument)
                    ? void 0
                    : t.defaultView) || window
            );
        }
        function W(e) {
            var t;
            return null ==
                (t = (F(e) ? e.ownerDocument : e.document) || window.document)
                ? void 0
                : t.documentElement;
        }
        function F(e) {
            return !!N() && (e instanceof Node || e instanceof M(e).Node);
        }
        function j(e) {
            return !!N() && (e instanceof Element || e instanceof M(e).Element);
        }
        function _(e) {
            return (
                !!N() &&
                (e instanceof HTMLElement || e instanceof M(e).HTMLElement)
            );
        }
        function I(e) {
            return (
                !!N() &&
                'undefined' != typeof ShadowRoot &&
                (e instanceof ShadowRoot || e instanceof M(e).ShadowRoot)
            );
        }
        let $ = new Set(['inline', 'contents']);
        function H(e) {
            let { overflow: t, overflowX: n, overflowY: r, display: o } = J(e);
            return (
                /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !$.has(o)
            );
        }
        let B = new Set(['table', 'td', 'th']),
            z = [':popover-open', ':modal'];
        function V(e) {
            return z.some((t) => {
                try {
                    return e.matches(t);
                } catch (e) {
                    return !1;
                }
            });
        }
        let Y = ['transform', 'translate', 'scale', 'rotate', 'perspective'],
            X = [
                'transform',
                'translate',
                'scale',
                'rotate',
                'perspective',
                'filter',
            ],
            K = ['paint', 'layout', 'strict', 'content'];
        function q(e) {
            let t = U(),
                n = j(e) ? J(e) : e;
            return (
                Y.some((e) => !!n[e] && 'none' !== n[e]) ||
                (!!n.containerType && 'normal' !== n.containerType) ||
                (!t && !!n.backdropFilter && 'none' !== n.backdropFilter) ||
                (!t && !!n.filter && 'none' !== n.filter) ||
                X.some((e) => (n.willChange || '').includes(e)) ||
                K.some((e) => (n.contain || '').includes(e))
            );
        }
        function U() {
            return (
                'undefined' != typeof CSS &&
                !!CSS.supports &&
                CSS.supports('-webkit-backdrop-filter', 'none')
            );
        }
        let Z = new Set(['html', 'body', '#document']);
        function G(e) {
            return Z.has(D(e));
        }
        function J(e) {
            return M(e).getComputedStyle(e);
        }
        function Q(e) {
            return j(e)
                ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
                : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
        }
        function ee(e) {
            if ('html' === D(e)) return e;
            let t = e.assignedSlot || e.parentNode || (I(e) && e.host) || W(e);
            return I(t) ? t.host : t;
        }
        function et(e, t, n) {
            var r;
            (void 0 === t && (t = []), void 0 === n && (n = !0));
            let o = (function e(t) {
                    let n = ee(t);
                    return G(n)
                        ? t.ownerDocument
                            ? t.ownerDocument.body
                            : t.body
                        : _(n) && H(n)
                          ? n
                          : e(n);
                })(e),
                i = o === (null == (r = e.ownerDocument) ? void 0 : r.body),
                a = M(o);
            if (i) {
                let e = en(a);
                return t.concat(
                    a,
                    a.visualViewport || [],
                    H(o) ? o : [],
                    e && n ? et(e) : []
                );
            }
            return t.concat(o, et(o, [], n));
        }
        function en(e) {
            return e.parent && Object.getPrototypeOf(e.parent)
                ? e.frameElement
                : null;
        }
        function er(e) {
            let t = J(e),
                n = parseFloat(t.width) || 0,
                r = parseFloat(t.height) || 0,
                o = _(e),
                a = o ? e.offsetWidth : n,
                l = o ? e.offsetHeight : r,
                u = i(n) !== a || i(r) !== l;
            return (u && ((n = a), (r = l)), { width: n, height: r, $: u });
        }
        function eo(e) {
            return j(e) ? e : e.contextElement;
        }
        function ei(e) {
            let t = eo(e);
            if (!_(t)) return l(1);
            let n = t.getBoundingClientRect(),
                { width: r, height: o, $: a } = er(t),
                u = (a ? i(n.width) : n.width) / r,
                c = (a ? i(n.height) : n.height) / o;
            return (
                (u && Number.isFinite(u)) || (u = 1),
                (c && Number.isFinite(c)) || (c = 1),
                { x: u, y: c }
            );
        }
        let ea = l(0);
        function el(e) {
            let t = M(e);
            return U() && t.visualViewport
                ? {
                      x: t.visualViewport.offsetLeft,
                      y: t.visualViewport.offsetTop,
                  }
                : ea;
        }
        function eu(e, t, n, r) {
            var o;
            (void 0 === t && (t = !1), void 0 === n && (n = !1));
            let i = e.getBoundingClientRect(),
                a = eo(e),
                u = l(1);
            t && (r ? j(r) && (u = ei(r)) : (u = ei(e)));
            let c = (void 0 === (o = n) && (o = !1),
                r && (!o || r === M(a)) && o)
                    ? el(a)
                    : l(0),
                s = (i.left + c.x) / u.x,
                f = (i.top + c.y) / u.y,
                d = i.width / u.x,
                p = i.height / u.y;
            if (a) {
                let e = M(a),
                    t = r && j(r) ? M(r) : r,
                    n = e,
                    o = en(n);
                for (; o && r && t !== n; ) {
                    let e = ei(o),
                        t = o.getBoundingClientRect(),
                        r = J(o),
                        i =
                            t.left +
                            (o.clientLeft + parseFloat(r.paddingLeft)) * e.x,
                        a =
                            t.top +
                            (o.clientTop + parseFloat(r.paddingTop)) * e.y;
                    ((s *= e.x),
                        (f *= e.y),
                        (d *= e.x),
                        (p *= e.y),
                        (s += i),
                        (f += a),
                        (o = en((n = M(o)))));
                }
            }
            return R({ width: d, height: p, x: s, y: f });
        }
        function ec(e, t) {
            let n = Q(e).scrollLeft;
            return t ? t.left + n : eu(W(e)).left + n;
        }
        function es(e, t) {
            let n = e.getBoundingClientRect();
            return {
                x: n.left + t.scrollLeft - ec(e, n),
                y: n.top + t.scrollTop,
            };
        }
        let ef = new Set(['absolute', 'fixed']);
        function ed(e, t, n) {
            var r;
            let i;
            if ('viewport' === t)
                i = (function (e, t) {
                    let n = M(e),
                        r = W(e),
                        o = n.visualViewport,
                        i = r.clientWidth,
                        a = r.clientHeight,
                        l = 0,
                        u = 0;
                    if (o) {
                        ((i = o.width), (a = o.height));
                        let e = U();
                        (!e || (e && 'fixed' === t)) &&
                            ((l = o.offsetLeft), (u = o.offsetTop));
                    }
                    let c = ec(r);
                    if (c <= 0) {
                        let e = r.ownerDocument,
                            t = e.body,
                            n = getComputedStyle(t),
                            o =
                                ('CSS1Compat' === e.compatMode &&
                                    parseFloat(n.marginLeft) +
                                        parseFloat(n.marginRight)) ||
                                0,
                            a = Math.abs(r.clientWidth - t.clientWidth - o);
                        a <= 25 && (i -= a);
                    } else c <= 25 && (i += c);
                    return { width: i, height: a, x: l, y: u };
                })(e, n);
            else if ('document' === t) {
                let t, n, a, l, u, c, s;
                ((r = W(e)),
                    (t = W(r)),
                    (n = Q(r)),
                    (a = r.ownerDocument.body),
                    (l = o(
                        t.scrollWidth,
                        t.clientWidth,
                        a.scrollWidth,
                        a.clientWidth
                    )),
                    (u = o(
                        t.scrollHeight,
                        t.clientHeight,
                        a.scrollHeight,
                        a.clientHeight
                    )),
                    (c = -n.scrollLeft + ec(r)),
                    (s = -n.scrollTop),
                    'rtl' === J(a).direction &&
                        (c += o(t.clientWidth, a.clientWidth) - l),
                    (i = { width: l, height: u, x: c, y: s }));
            } else if (j(t)) {
                let e, r, o, a, u, c;
                ((r = (e = eu(t, !0, 'fixed' === n)).top + t.clientTop),
                    (o = e.left + t.clientLeft),
                    (a = _(t) ? ei(t) : l(1)),
                    (u = t.clientWidth * a.x),
                    (c = t.clientHeight * a.y),
                    (i = { width: u, height: c, x: o * a.x, y: r * a.y }));
            } else {
                let n = el(e);
                i = {
                    x: t.x - n.x,
                    y: t.y - n.y,
                    width: t.width,
                    height: t.height,
                };
            }
            return R(i);
        }
        function ep(e) {
            return 'static' === J(e).position;
        }
        function em(e, t) {
            if (!_(e) || 'fixed' === J(e).position) return null;
            if (t) return t(e);
            let n = e.offsetParent;
            return (W(e) === n && (n = n.ownerDocument.body), n);
        }
        function eh(e, t) {
            var n;
            let r = M(e);
            if (V(e)) return r;
            if (!_(e)) {
                let t = ee(e);
                for (; t && !G(t); ) {
                    if (j(t) && !ep(t)) return t;
                    t = ee(t);
                }
                return r;
            }
            let o = em(e, t);
            for (; o && ((n = o), B.has(D(n))) && ep(o); ) o = em(o, t);
            return o && G(o) && ep(o) && !q(o)
                ? r
                : o ||
                      (function (e) {
                          let t = ee(e);
                          for (; _(t) && !G(t); ) {
                              if (q(t)) return t;
                              if (V(t)) break;
                              t = ee(t);
                          }
                          return null;
                      })(e) ||
                      r;
        }
        let ev = async function (e) {
                let t = this.getOffsetParent || eh,
                    n = this.getDimensions,
                    r = await n(e.floating);
                return {
                    reference: (function (e, t, n) {
                        let r = _(t),
                            o = W(t),
                            i = 'fixed' === n,
                            a = eu(e, !0, i, t),
                            u = { scrollLeft: 0, scrollTop: 0 },
                            c = l(0);
                        if (r || (!r && !i))
                            if ((('body' !== D(t) || H(o)) && (u = Q(t)), r)) {
                                let e = eu(t, !0, i, t);
                                ((c.x = e.x + t.clientLeft),
                                    (c.y = e.y + t.clientTop));
                            } else o && (c.x = ec(o));
                        i && !r && o && (c.x = ec(o));
                        let s = !o || r || i ? l(0) : es(o, u);
                        return {
                            x: a.left + u.scrollLeft - c.x - s.x,
                            y: a.top + u.scrollTop - c.y - s.y,
                            width: a.width,
                            height: a.height,
                        };
                    })(e.reference, await t(e.floating), e.strategy),
                    floating: { x: 0, y: 0, width: r.width, height: r.height },
                };
            },
            eg = {
                convertOffsetParentRelativeRectToViewportRelativeRect:
                    function (e) {
                        let {
                                elements: t,
                                rect: n,
                                offsetParent: r,
                                strategy: o,
                            } = e,
                            i = 'fixed' === o,
                            a = W(r),
                            u = !!t && V(t.floating);
                        if (r === a || (u && i)) return n;
                        let c = { scrollLeft: 0, scrollTop: 0 },
                            s = l(1),
                            f = l(0),
                            d = _(r);
                        if (
                            (d || (!d && !i)) &&
                            (('body' !== D(r) || H(a)) && (c = Q(r)), _(r))
                        ) {
                            let e = eu(r);
                            ((s = ei(r)),
                                (f.x = e.x + r.clientLeft),
                                (f.y = e.y + r.clientTop));
                        }
                        let p = !a || d || i ? l(0) : es(a, c);
                        return {
                            width: n.width * s.x,
                            height: n.height * s.y,
                            x: n.x * s.x - c.scrollLeft * s.x + f.x + p.x,
                            y: n.y * s.y - c.scrollTop * s.y + f.y + p.y,
                        };
                    },
                getDocumentElement: W,
                getClippingRect: function (e) {
                    let {
                            element: t,
                            boundary: n,
                            rootBoundary: i,
                            strategy: a,
                        } = e,
                        l = [
                            ...('clippingAncestors' === n
                                ? V(t)
                                    ? []
                                    : (function (e, t) {
                                          let n = t.get(e);
                                          if (n) return n;
                                          let r = et(e, [], !1).filter(
                                                  (e) => j(e) && 'body' !== D(e)
                                              ),
                                              o = null,
                                              i = 'fixed' === J(e).position,
                                              a = i ? ee(e) : e;
                                          for (; j(a) && !G(a); ) {
                                              let t = J(a),
                                                  n = q(a);
                                              (n ||
                                                  'fixed' !== t.position ||
                                                  (o = null),
                                                  (
                                                      i
                                                          ? !n && !o
                                                          : (!n &&
                                                                'static' ===
                                                                    t.position &&
                                                                !!o &&
                                                                ef.has(
                                                                    o.position
                                                                )) ||
                                                            (H(a) &&
                                                                !n &&
                                                                (function e(
                                                                    t,
                                                                    n
                                                                ) {
                                                                    let r =
                                                                        ee(t);
                                                                    return (
                                                                        !(
                                                                            r ===
                                                                                n ||
                                                                            !j(
                                                                                r
                                                                            ) ||
                                                                            G(r)
                                                                        ) &&
                                                                        ('fixed' ===
                                                                            J(r)
                                                                                .position ||
                                                                            e(
                                                                                r,
                                                                                n
                                                                            ))
                                                                    );
                                                                })(e, a))
                                                  )
                                                      ? (r = r.filter(
                                                            (e) => e !== a
                                                        ))
                                                      : (o = t),
                                                  (a = ee(a)));
                                          }
                                          return (t.set(e, r), r);
                                      })(t, this._c)
                                : [].concat(n)),
                            i,
                        ],
                        u = l[0],
                        c = l.reduce(
                            (e, n) => {
                                let i = ed(t, n, a);
                                return (
                                    (e.top = o(i.top, e.top)),
                                    (e.right = r(i.right, e.right)),
                                    (e.bottom = r(i.bottom, e.bottom)),
                                    (e.left = o(i.left, e.left)),
                                    e
                                );
                            },
                            ed(t, u, a)
                        );
                    return {
                        width: c.right - c.left,
                        height: c.bottom - c.top,
                        x: c.left,
                        y: c.top,
                    };
                },
                getOffsetParent: eh,
                getElementRects: ev,
                getClientRects: function (e) {
                    return Array.from(e.getClientRects());
                },
                getDimensions: function (e) {
                    let { width: t, height: n } = er(e);
                    return { width: t, height: n };
                },
                getScale: ei,
                isElement: j,
                isRTL: function (e) {
                    return 'rtl' === J(e).direction;
                },
            };
        function ey(e, t) {
            return (
                e.x === t.x &&
                e.y === t.y &&
                e.width === t.width &&
                e.height === t.height
            );
        }
        let ew = (e) => ({
            name: 'arrow',
            options: e,
            async fn(t) {
                let {
                        x: n,
                        y: i,
                        placement: a,
                        rects: l,
                        platform: u,
                        elements: c,
                        middlewareData: f,
                    } = t,
                    { element: h, padding: g = 0 } = s(e, t) || {};
                if (null == h) return {};
                let y = S(g),
                    w = { x: n, y: i },
                    b = p(v(a)),
                    x = m(b),
                    E = await u.getDimensions(h),
                    R = 'y' === b,
                    C = R ? 'clientHeight' : 'clientWidth',
                    A = l.reference[x] + l.reference[b] - w[b] - l.floating[x],
                    L = w[b] - l.reference[b],
                    P = await (null == u.getOffsetParent
                        ? void 0
                        : u.getOffsetParent(h)),
                    T = P ? P[C] : 0;
                (T &&
                    (await (null == u.isElement ? void 0 : u.isElement(P)))) ||
                    (T = c.floating[C] || l.floating[x]);
                let O = T / 2 - E[x] / 2 - 1,
                    k = r(y[R ? 'top' : 'left'], O),
                    N = r(y[R ? 'bottom' : 'right'], O),
                    D = T - E[x] - N,
                    M = T / 2 - E[x] / 2 + (A / 2 - L / 2),
                    W = o(k, r(M, D)),
                    F =
                        !f.arrow &&
                        null != d(a) &&
                        M !== W &&
                        l.reference[x] / 2 - (M < k ? k : N) - E[x] / 2 < 0,
                    j = F ? (M < k ? M - k : M - D) : 0;
                return {
                    [b]: w[b] + j,
                    data: {
                        [b]: W,
                        centerOffset: M - W - j,
                        ...(F && { alignmentOffset: j }),
                    },
                    reset: F,
                };
            },
        });
        var eb = e.i(940842),
            ex =
                'undefined' != typeof document
                    ? t.useLayoutEffect
                    : function () {};
        function eE(e, t) {
            let n, r, o;
            if (e === t) return !0;
            if (typeof e != typeof t) return !1;
            if ('function' == typeof e && e.toString() === t.toString())
                return !0;
            if (e && t && 'object' == typeof e) {
                if (Array.isArray(e)) {
                    if ((n = e.length) !== t.length) return !1;
                    for (r = n; 0 != r--; ) if (!eE(e[r], t[r])) return !1;
                    return !0;
                }
                if ((n = (o = Object.keys(e)).length) !== Object.keys(t).length)
                    return !1;
                for (r = n; 0 != r--; )
                    if (!{}.hasOwnProperty.call(t, o[r])) return !1;
                for (r = n; 0 != r--; ) {
                    let n = o[r];
                    if (('_owner' !== n || !e.$$typeof) && !eE(e[n], t[n]))
                        return !1;
                }
                return !0;
            }
            return e != e && t != t;
        }
        function eS(e) {
            return 'undefined' == typeof window
                ? 1
                : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
        }
        function eR(e, t) {
            let n = eS(e);
            return Math.round(t * n) / n;
        }
        function eC(e) {
            let n = t.useRef(e);
            return (
                ex(() => {
                    n.current = e;
                }),
                n
            );
        }
        var eA = e.i(403078),
            eL = e.i(565750),
            eP = t.forwardRef((e, t) => {
                let { children: n, width: r = 10, height: o = 5, ...i } = e;
                return (0, eL.jsx)(eA.Primitive.svg, {
                    ...i,
                    ref: t,
                    width: r,
                    height: o,
                    viewBox: '0 0 30 10',
                    preserveAspectRatio: 'none',
                    children: e.asChild
                        ? n
                        : (0, eL.jsx)('polygon', { points: '0,0 30,0 15,10' }),
                });
            });
        eP.displayName = 'Arrow';
        var eT = e.i(672687),
            eO = e.i(784711),
            ek = e.i(461404),
            eN = e.i(150076),
            eD = 'Popper',
            [eM, eW] = (0, eO.createContextScope)(eD),
            [eF, ej] = eM(eD),
            e_ = (e) => {
                let { __scopePopper: n, children: r } = e,
                    [o, i] = t.useState(null);
                return (0, eL.jsx)(eF, {
                    scope: n,
                    anchor: o,
                    onAnchorChange: i,
                    children: r,
                });
            };
        e_.displayName = eD;
        var eI = 'PopperAnchor',
            e$ = t.forwardRef((e, n) => {
                let { __scopePopper: r, virtualRef: o, ...i } = e,
                    a = ej(eI, r),
                    l = t.useRef(null),
                    u = (0, eT.useComposedRefs)(n, l),
                    c = t.useRef(null);
                return (
                    t.useEffect(() => {
                        let e = c.current;
                        ((c.current = o?.current || l.current),
                            e !== c.current && a.onAnchorChange(c.current));
                    }),
                    o ? null : (0, eL.jsx)(eA.Primitive.div, { ...i, ref: u })
                );
            });
        e$.displayName = eI;
        var eH = 'PopperContent',
            [eB, ez] = eM(eH),
            eV = t.forwardRef((e, n) => {
                var i,
                    l,
                    u,
                    c,
                    h,
                    S,
                    R,
                    C,
                    A,
                    N,
                    D,
                    M,
                    F,
                    j,
                    _,
                    I,
                    $,
                    H,
                    B,
                    z,
                    V;
                let {
                        __scopePopper: Y,
                        side: X = 'bottom',
                        sideOffset: K = 0,
                        align: q = 'center',
                        alignOffset: U = 0,
                        arrowPadding: Z = 0,
                        avoidCollisions: G = !0,
                        collisionBoundary: J = [],
                        collisionPadding: Q = 0,
                        sticky: ee = 'partial',
                        hideWhenDetached: en = !1,
                        updatePositionStrategy: er = 'optimized',
                        onPlaced: ei,
                        ...ea
                    } = e,
                    el = ej(eH, Y),
                    [ec, es] = t.useState(null),
                    ef = (0, eT.useComposedRefs)(n, (e) => es(e)),
                    [ed, ep] = t.useState(null),
                    em = (function (e) {
                        let [n, r] = t.useState(void 0);
                        return (
                            (0, eN.useLayoutEffect)(() => {
                                if (e) {
                                    r({
                                        width: e.offsetWidth,
                                        height: e.offsetHeight,
                                    });
                                    let t = new ResizeObserver((t) => {
                                        let n, o;
                                        if (!Array.isArray(t) || !t.length)
                                            return;
                                        let i = t[0];
                                        if ('borderBoxSize' in i) {
                                            let e = i.borderBoxSize,
                                                t = Array.isArray(e) ? e[0] : e;
                                            ((n = t.inlineSize),
                                                (o = t.blockSize));
                                        } else
                                            ((n = e.offsetWidth),
                                                (o = e.offsetHeight));
                                        r({ width: n, height: o });
                                    });
                                    return (
                                        t.observe(e, { box: 'border-box' }),
                                        () => t.unobserve(e)
                                    );
                                }
                                r(void 0);
                            }, [e]),
                            n
                        );
                    })(ed),
                    eh = em?.width ?? 0,
                    ev = em?.height ?? 0,
                    eP =
                        'number' == typeof Q
                            ? Q
                            : { top: 0, right: 0, bottom: 0, left: 0, ...Q },
                    eO = Array.isArray(J) ? J : [J],
                    eD = eO.length > 0,
                    eM = {
                        padding: eP,
                        boundary: eO.filter(eq),
                        altBoundary: eD,
                    },
                    {
                        refs: eW,
                        floatingStyles: eF,
                        placement: e_,
                        isPositioned: eI,
                        middlewareData: e$,
                    } = (function (e) {
                        void 0 === e && (e = {});
                        let {
                                placement: n = 'bottom',
                                strategy: r = 'absolute',
                                middleware: o = [],
                                platform: i,
                                elements: { reference: a, floating: l } = {},
                                transform: u = !0,
                                whileElementsMounted: c,
                                open: s,
                            } = e,
                            [f, d] = t.useState({
                                x: 0,
                                y: 0,
                                strategy: r,
                                placement: n,
                                middlewareData: {},
                                isPositioned: !1,
                            }),
                            [p, m] = t.useState(o);
                        eE(p, o) || m(o);
                        let [h, v] = t.useState(null),
                            [g, y] = t.useState(null),
                            w = t.useCallback((e) => {
                                e !== S.current && ((S.current = e), v(e));
                            }, []),
                            b = t.useCallback((e) => {
                                e !== R.current && ((R.current = e), y(e));
                            }, []),
                            x = a || h,
                            E = l || g,
                            S = t.useRef(null),
                            R = t.useRef(null),
                            C = t.useRef(f),
                            A = null != c,
                            P = eC(c),
                            T = eC(i),
                            O = eC(s),
                            k = t.useCallback(() => {
                                var e, t;
                                let o, i, a;
                                if (!S.current || !R.current) return;
                                let l = {
                                    placement: n,
                                    strategy: r,
                                    middleware: p,
                                };
                                (T.current && (l.platform = T.current),
                                    ((e = S.current),
                                    (t = R.current),
                                    (o = new Map()),
                                    (a = {
                                        ...(i = { platform: eg, ...l })
                                            .platform,
                                        _c: o,
                                    }),
                                    L(e, t, { ...i, platform: a })).then(
                                        (e) => {
                                            let t = {
                                                ...e,
                                                isPositioned: !1 !== O.current,
                                            };
                                            N.current &&
                                                !eE(C.current, t) &&
                                                ((C.current = t),
                                                eb.flushSync(() => {
                                                    d(t);
                                                }));
                                        }
                                    ));
                            }, [p, n, r, T, O]);
                        ex(() => {
                            !1 === s &&
                                C.current.isPositioned &&
                                ((C.current.isPositioned = !1),
                                d((e) => ({ ...e, isPositioned: !1 })));
                        }, [s]);
                        let N = t.useRef(!1);
                        (ex(
                            () => (
                                (N.current = !0),
                                () => {
                                    N.current = !1;
                                }
                            ),
                            []
                        ),
                            ex(() => {
                                if (
                                    (x && (S.current = x),
                                    E && (R.current = E),
                                    x && E)
                                ) {
                                    if (P.current) return P.current(x, E, k);
                                    k();
                                }
                            }, [x, E, k, P, A]));
                        let D = t.useMemo(
                                () => ({
                                    reference: S,
                                    floating: R,
                                    setReference: w,
                                    setFloating: b,
                                }),
                                [w, b]
                            ),
                            M = t.useMemo(
                                () => ({ reference: x, floating: E }),
                                [x, E]
                            ),
                            W = t.useMemo(() => {
                                let e = { position: r, left: 0, top: 0 };
                                if (!M.floating) return e;
                                let t = eR(M.floating, f.x),
                                    n = eR(M.floating, f.y);
                                return u
                                    ? {
                                          ...e,
                                          transform:
                                              'translate(' +
                                              t +
                                              'px, ' +
                                              n +
                                              'px)',
                                          ...(eS(M.floating) >= 1.5 && {
                                              willChange: 'transform',
                                          }),
                                      }
                                    : { position: r, left: t, top: n };
                            }, [r, u, M.floating, f.x, f.y]);
                        return t.useMemo(
                            () => ({
                                ...f,
                                update: k,
                                refs: D,
                                elements: M,
                                floatingStyles: W,
                            }),
                            [f, k, D, M, W]
                        );
                    })({
                        strategy: 'fixed',
                        placement: X + ('center' !== q ? '-' + q : ''),
                        whileElementsMounted: (...e) =>
                            (function (e, t, n, i) {
                                let l;
                                void 0 === i && (i = {});
                                let {
                                        ancestorScroll: u = !0,
                                        ancestorResize: c = !0,
                                        elementResize: s = 'function' ==
                                            typeof ResizeObserver,
                                        layoutShift: f = 'function' ==
                                            typeof IntersectionObserver,
                                        animationFrame: d = !1,
                                    } = i,
                                    p = eo(e),
                                    m =
                                        u || c
                                            ? [...(p ? et(p) : []), ...et(t)]
                                            : [];
                                m.forEach((e) => {
                                    (u &&
                                        e.addEventListener('scroll', n, {
                                            passive: !0,
                                        }),
                                        c && e.addEventListener('resize', n));
                                });
                                let h =
                                        p && f
                                            ? (function (e, t) {
                                                  let n,
                                                      i = null,
                                                      l = W(e);
                                                  function u() {
                                                      var e;
                                                      (clearTimeout(n),
                                                          null == (e = i) ||
                                                              e.disconnect(),
                                                          (i = null));
                                                  }
                                                  return (
                                                      !(function c(s, f) {
                                                          (void 0 === s &&
                                                              (s = !1),
                                                              void 0 === f &&
                                                                  (f = 1),
                                                              u());
                                                          let d =
                                                                  e.getBoundingClientRect(),
                                                              {
                                                                  left: p,
                                                                  top: m,
                                                                  width: h,
                                                                  height: v,
                                                              } = d;
                                                          if (
                                                              (s || t(),
                                                              !h || !v)
                                                          )
                                                              return;
                                                          let g = {
                                                                  rootMargin:
                                                                      -a(m) +
                                                                      'px ' +
                                                                      -a(
                                                                          l.clientWidth -
                                                                              (p +
                                                                                  h)
                                                                      ) +
                                                                      'px ' +
                                                                      -a(
                                                                          l.clientHeight -
                                                                              (m +
                                                                                  v)
                                                                      ) +
                                                                      'px ' +
                                                                      -a(p) +
                                                                      'px',
                                                                  threshold:
                                                                      o(
                                                                          0,
                                                                          r(
                                                                              1,
                                                                              f
                                                                          )
                                                                      ) || 1,
                                                              },
                                                              y = !0;
                                                          function w(t) {
                                                              let r =
                                                                  t[0]
                                                                      .intersectionRatio;
                                                              if (r !== f) {
                                                                  if (!y)
                                                                      return c();
                                                                  r
                                                                      ? c(!1, r)
                                                                      : (n =
                                                                            setTimeout(
                                                                                () => {
                                                                                    c(
                                                                                        !1,
                                                                                        1e-7
                                                                                    );
                                                                                },
                                                                                1e3
                                                                            ));
                                                              }
                                                              (1 !== r ||
                                                                  ey(
                                                                      d,
                                                                      e.getBoundingClientRect()
                                                                  ) ||
                                                                  c(),
                                                                  (y = !1));
                                                          }
                                                          try {
                                                              i =
                                                                  new IntersectionObserver(
                                                                      w,
                                                                      {
                                                                          ...g,
                                                                          root: l.ownerDocument,
                                                                      }
                                                                  );
                                                          } catch (e) {
                                                              i =
                                                                  new IntersectionObserver(
                                                                      w,
                                                                      g
                                                                  );
                                                          }
                                                          i.observe(e);
                                                      })(!0),
                                                      u
                                                  );
                                              })(p, n)
                                            : null,
                                    v = -1,
                                    g = null;
                                s &&
                                    ((g = new ResizeObserver((e) => {
                                        let [r] = e;
                                        (r &&
                                            r.target === p &&
                                            g &&
                                            (g.unobserve(t),
                                            cancelAnimationFrame(v),
                                            (v = requestAnimationFrame(() => {
                                                var e;
                                                null == (e = g) || e.observe(t);
                                            }))),
                                            n());
                                    })),
                                    p && !d && g.observe(p),
                                    g.observe(t));
                                let y = d ? eu(e) : null;
                                return (
                                    d &&
                                        (function t() {
                                            let r = eu(e);
                                            (y && !ey(y, r) && n(),
                                                (y = r),
                                                (l = requestAnimationFrame(t)));
                                        })(),
                                    n(),
                                    () => {
                                        var e;
                                        (m.forEach((e) => {
                                            (u &&
                                                e.removeEventListener(
                                                    'scroll',
                                                    n
                                                ),
                                                c &&
                                                    e.removeEventListener(
                                                        'resize',
                                                        n
                                                    ));
                                        }),
                                            null == h || h(),
                                            null == (e = g) || e.disconnect(),
                                            (g = null),
                                            d && cancelAnimationFrame(l));
                                    }
                                );
                            })(...e, { animationFrame: 'always' === er }),
                        elements: { reference: el.anchor },
                        middleware: [
                            {
                                ...{
                                    name: 'offset',
                                    options:
                                        (u = i =
                                            {
                                                mainAxis: K + ev,
                                                alignmentAxis: U,
                                            }),
                                    async fn(e) {
                                        var t, n;
                                        let {
                                                x: r,
                                                y: o,
                                                placement: i,
                                                middlewareData: a,
                                            } = e,
                                            l = await k(e, u);
                                        return i ===
                                            (null == (t = a.offset)
                                                ? void 0
                                                : t.placement) &&
                                            null != (n = a.arrow) &&
                                            n.alignmentOffset
                                            ? {}
                                            : {
                                                  x: r + l.x,
                                                  y: o + l.y,
                                                  data: { ...l, placement: i },
                                              };
                                    },
                                },
                                options: [i, l],
                            },
                            G && {
                                ...{
                                    name: 'shift',
                                    options:
                                        (A = R =
                                            {
                                                mainAxis: !0,
                                                crossAxis: !1,
                                                limiter:
                                                    'partial' === ee
                                                        ? {
                                                              ...(void 0 ===
                                                                  (S = c) &&
                                                                  (S = {}),
                                                              {
                                                                  options: S,
                                                                  fn(e) {
                                                                      let {
                                                                              x: t,
                                                                              y: n,
                                                                              placement:
                                                                                  r,
                                                                              rects: o,
                                                                              middlewareData:
                                                                                  i,
                                                                          } = e,
                                                                          {
                                                                              offset: a = 0,
                                                                              mainAxis:
                                                                                  l = !0,
                                                                              crossAxis:
                                                                                  u = !0,
                                                                          } = s(
                                                                              S,
                                                                              e
                                                                          ),
                                                                          c = {
                                                                              x: t,
                                                                              y: n,
                                                                          },
                                                                          d =
                                                                              v(
                                                                                  r
                                                                              ),
                                                                          m =
                                                                              p(
                                                                                  d
                                                                              ),
                                                                          h =
                                                                              c[
                                                                                  m
                                                                              ],
                                                                          g =
                                                                              c[
                                                                                  d
                                                                              ],
                                                                          y = s(
                                                                              a,
                                                                              e
                                                                          ),
                                                                          w =
                                                                              'number' ==
                                                                              typeof y
                                                                                  ? {
                                                                                        mainAxis:
                                                                                            y,
                                                                                        crossAxis: 0,
                                                                                    }
                                                                                  : {
                                                                                        mainAxis: 0,
                                                                                        crossAxis: 0,
                                                                                        ...y,
                                                                                    };
                                                                      if (l) {
                                                                          let e =
                                                                                  'y' ===
                                                                                  m
                                                                                      ? 'height'
                                                                                      : 'width',
                                                                              t =
                                                                                  o
                                                                                      .reference[
                                                                                      m
                                                                                  ] -
                                                                                  o
                                                                                      .floating[
                                                                                      e
                                                                                  ] +
                                                                                  w.mainAxis,
                                                                              n =
                                                                                  o
                                                                                      .reference[
                                                                                      m
                                                                                  ] +
                                                                                  o
                                                                                      .reference[
                                                                                      e
                                                                                  ] -
                                                                                  w.mainAxis;
                                                                          h < t
                                                                              ? (h =
                                                                                    t)
                                                                              : h >
                                                                                    n &&
                                                                                (h =
                                                                                    n);
                                                                      }
                                                                      if (u) {
                                                                          var b,
                                                                              x;
                                                                          let e =
                                                                                  'y' ===
                                                                                  m
                                                                                      ? 'width'
                                                                                      : 'height',
                                                                              t =
                                                                                  O.has(
                                                                                      f(
                                                                                          r
                                                                                      )
                                                                                  ),
                                                                              n =
                                                                                  o
                                                                                      .reference[
                                                                                      d
                                                                                  ] -
                                                                                  o
                                                                                      .floating[
                                                                                      e
                                                                                  ] +
                                                                                  ((t &&
                                                                                      (null ==
                                                                                      (b =
                                                                                          i.offset)
                                                                                          ? void 0
                                                                                          : b[
                                                                                                d
                                                                                            ])) ||
                                                                                      0) +
                                                                                  (t
                                                                                      ? 0
                                                                                      : w.crossAxis),
                                                                              a =
                                                                                  o
                                                                                      .reference[
                                                                                      d
                                                                                  ] +
                                                                                  o
                                                                                      .reference[
                                                                                      e
                                                                                  ] +
                                                                                  (t
                                                                                      ? 0
                                                                                      : (null ==
                                                                                        (x =
                                                                                            i.offset)
                                                                                            ? void 0
                                                                                            : x[
                                                                                                  d
                                                                                              ]) ||
                                                                                        0) -
                                                                                  (t
                                                                                      ? w.crossAxis
                                                                                      : 0);
                                                                          g < n
                                                                              ? (g =
                                                                                    n)
                                                                              : g >
                                                                                    a &&
                                                                                (g =
                                                                                    a);
                                                                      }
                                                                      return {
                                                                          [m]: h,
                                                                          [d]: g,
                                                                      };
                                                                  },
                                                              }),
                                                              options: [c, h],
                                                          }
                                                        : void 0,
                                                ...eM,
                                            }),
                                    async fn(e) {
                                        let {
                                                x: t,
                                                y: n,
                                                placement: i,
                                                platform: a,
                                            } = e,
                                            {
                                                mainAxis: l = !0,
                                                crossAxis: u = !1,
                                                limiter: c = {
                                                    fn: (e) => {
                                                        let { x: t, y: n } = e;
                                                        return { x: t, y: n };
                                                    },
                                                },
                                                ...d
                                            } = s(A, e),
                                            m = { x: t, y: n },
                                            h = await a.detectOverflow(e, d),
                                            g = v(f(i)),
                                            y = p(g),
                                            w = m[y],
                                            b = m[g];
                                        if (l) {
                                            let e = 'y' === y ? 'top' : 'left',
                                                t =
                                                    'y' === y
                                                        ? 'bottom'
                                                        : 'right',
                                                n = w + h[e],
                                                i = w - h[t];
                                            w = o(n, r(w, i));
                                        }
                                        if (u) {
                                            let e = 'y' === g ? 'top' : 'left',
                                                t =
                                                    'y' === g
                                                        ? 'bottom'
                                                        : 'right',
                                                n = b + h[e],
                                                i = b - h[t];
                                            b = o(n, r(b, i));
                                        }
                                        let x = c.fn({ ...e, [y]: w, [g]: b });
                                        return {
                                            ...x,
                                            data: {
                                                x: x.x - t,
                                                y: x.y - n,
                                                enabled: { [y]: l, [g]: u },
                                            },
                                        };
                                    },
                                },
                                options: [R, C],
                            },
                            G && {
                                ...{
                                    name: 'flip',
                                    options: (M = N = { ...eM }),
                                    async fn(e) {
                                        var t, n, r, o, i, a, l, u;
                                        let c,
                                            h,
                                            S,
                                            {
                                                placement: R,
                                                middlewareData: C,
                                                rects: A,
                                                initialPlacement: L,
                                                platform: P,
                                                elements: T,
                                            } = e,
                                            {
                                                mainAxis: O = !0,
                                                crossAxis: k = !0,
                                                fallbackPlacements: N,
                                                fallbackStrategy: D = 'bestFit',
                                                fallbackAxisSideDirection:
                                                    W = 'none',
                                                flipAlignment: F = !0,
                                                ...j
                                            } = s(M, e);
                                        if (
                                            null != (t = C.arrow) &&
                                            t.alignmentOffset
                                        )
                                            return {};
                                        let _ = f(R),
                                            I = v(L),
                                            $ = f(L) === L,
                                            H = await (null == P.isRTL
                                                ? void 0
                                                : P.isRTL(T.floating)),
                                            B =
                                                N ||
                                                ($ || !F
                                                    ? [E(L)]
                                                    : ((c = E(L)),
                                                      [g(L), c, g(c)])),
                                            z = 'none' !== W;
                                        !N &&
                                            z &&
                                            B.push(
                                                ...((h = d(L)),
                                                (S = (function (e, t, n) {
                                                    switch (e) {
                                                        case 'top':
                                                        case 'bottom':
                                                            if (n)
                                                                return t
                                                                    ? w
                                                                    : y;
                                                            return t ? y : w;
                                                        case 'left':
                                                        case 'right':
                                                            return t ? b : x;
                                                        default:
                                                            return [];
                                                    }
                                                })(f(L), 'start' === W, H)),
                                                h &&
                                                    ((S = S.map(
                                                        (e) => e + '-' + h
                                                    )),
                                                    F &&
                                                        (S = S.concat(
                                                            S.map(g)
                                                        ))),
                                                S)
                                            );
                                        let V = [L, ...B],
                                            Y = await P.detectOverflow(e, j),
                                            X = [],
                                            K =
                                                (null == (n = C.flip)
                                                    ? void 0
                                                    : n.overflows) || [];
                                        if ((O && X.push(Y[_]), k)) {
                                            let e,
                                                t,
                                                n,
                                                r,
                                                o =
                                                    ((a = R),
                                                    (l = A),
                                                    void 0 === (u = H) &&
                                                        (u = !1),
                                                    (e = d(a)),
                                                    (n = m((t = p(v(a))))),
                                                    (r =
                                                        'x' === t
                                                            ? e ===
                                                              (u
                                                                  ? 'end'
                                                                  : 'start')
                                                                ? 'right'
                                                                : 'left'
                                                            : 'start' === e
                                                              ? 'bottom'
                                                              : 'top'),
                                                    l.reference[n] >
                                                        l.floating[n] &&
                                                        (r = E(r)),
                                                    [r, E(r)]);
                                            X.push(Y[o[0]], Y[o[1]]);
                                        }
                                        if (
                                            ((K = [
                                                ...K,
                                                { placement: R, overflows: X },
                                            ]),
                                            !X.every((e) => e <= 0))
                                        ) {
                                            let e =
                                                    ((null == (r = C.flip)
                                                        ? void 0
                                                        : r.index) || 0) + 1,
                                                t = V[e];
                                            if (
                                                t &&
                                                ('alignment' !== k ||
                                                    I === v(t) ||
                                                    K.every(
                                                        (e) =>
                                                            v(e.placement) !==
                                                                I ||
                                                            e.overflows[0] > 0
                                                    ))
                                            )
                                                return {
                                                    data: {
                                                        index: e,
                                                        overflows: K,
                                                    },
                                                    reset: { placement: t },
                                                };
                                            let n =
                                                null ==
                                                (o = K.filter(
                                                    (e) => e.overflows[0] <= 0
                                                ).sort(
                                                    (e, t) =>
                                                        e.overflows[1] -
                                                        t.overflows[1]
                                                )[0])
                                                    ? void 0
                                                    : o.placement;
                                            if (!n)
                                                switch (D) {
                                                    case 'bestFit': {
                                                        let e =
                                                            null ==
                                                            (i = K.filter(
                                                                (e) => {
                                                                    if (z) {
                                                                        let t =
                                                                            v(
                                                                                e.placement
                                                                            );
                                                                        return (
                                                                            t ===
                                                                                I ||
                                                                            'y' ===
                                                                                t
                                                                        );
                                                                    }
                                                                    return !0;
                                                                }
                                                            )
                                                                .map((e) => [
                                                                    e.placement,
                                                                    e.overflows
                                                                        .filter(
                                                                            (
                                                                                e
                                                                            ) =>
                                                                                e >
                                                                                0
                                                                        )
                                                                        .reduce(
                                                                            (
                                                                                e,
                                                                                t
                                                                            ) =>
                                                                                e +
                                                                                t,
                                                                            0
                                                                        ),
                                                                ])
                                                                .sort(
                                                                    (e, t) =>
                                                                        e[1] -
                                                                        t[1]
                                                                )[0])
                                                                ? void 0
                                                                : i[0];
                                                        e && (n = e);
                                                        break;
                                                    }
                                                    case 'initialPlacement':
                                                        n = L;
                                                }
                                            if (R !== n)
                                                return {
                                                    reset: { placement: n },
                                                };
                                        }
                                        return {};
                                    },
                                },
                                options: [N, D],
                            },
                            {
                                ...{
                                    name: 'size',
                                    options:
                                        (_ = F =
                                            {
                                                ...eM,
                                                apply: ({
                                                    elements: e,
                                                    rects: t,
                                                    availableWidth: n,
                                                    availableHeight: r,
                                                }) => {
                                                    let {
                                                            width: o,
                                                            height: i,
                                                        } = t.reference,
                                                        a = e.floating.style;
                                                    (a.setProperty(
                                                        '--radix-popper-available-width',
                                                        `${n}px`
                                                    ),
                                                        a.setProperty(
                                                            '--radix-popper-available-height',
                                                            `${r}px`
                                                        ),
                                                        a.setProperty(
                                                            '--radix-popper-anchor-width',
                                                            `${o}px`
                                                        ),
                                                        a.setProperty(
                                                            '--radix-popper-anchor-height',
                                                            `${i}px`
                                                        ));
                                                },
                                            }),
                                    async fn(e) {
                                        var t, n;
                                        let i,
                                            a,
                                            {
                                                placement: l,
                                                rects: u,
                                                platform: c,
                                                elements: p,
                                            } = e,
                                            { apply: m = () => {}, ...h } = s(
                                                _,
                                                e
                                            ),
                                            g = await c.detectOverflow(e, h),
                                            y = f(l),
                                            w = d(l),
                                            b = 'y' === v(l),
                                            { width: x, height: E } =
                                                u.floating;
                                        'top' === y || 'bottom' === y
                                            ? ((i = y),
                                              (a =
                                                  w ===
                                                  ((await (null == c.isRTL
                                                      ? void 0
                                                      : c.isRTL(p.floating)))
                                                      ? 'start'
                                                      : 'end')
                                                      ? 'left'
                                                      : 'right'))
                                            : ((a = y),
                                              (i =
                                                  'end' === w
                                                      ? 'top'
                                                      : 'bottom'));
                                        let S = E - g.top - g.bottom,
                                            R = x - g.left - g.right,
                                            C = r(E - g[i], S),
                                            A = r(x - g[a], R),
                                            L = !e.middlewareData.shift,
                                            P = C,
                                            T = A;
                                        if (
                                            (null !=
                                                (t = e.middlewareData.shift) &&
                                                t.enabled.x &&
                                                (T = R),
                                            null !=
                                                (n = e.middlewareData.shift) &&
                                                n.enabled.y &&
                                                (P = S),
                                            L && !w)
                                        ) {
                                            let e = o(g.left, 0),
                                                t = o(g.right, 0),
                                                n = o(g.top, 0),
                                                r = o(g.bottom, 0);
                                            b
                                                ? (T =
                                                      x -
                                                      2 *
                                                          (0 !== e || 0 !== t
                                                              ? e + t
                                                              : o(
                                                                    g.left,
                                                                    g.right
                                                                )))
                                                : (P =
                                                      E -
                                                      2 *
                                                          (0 !== n || 0 !== r
                                                              ? n + r
                                                              : o(
                                                                    g.top,
                                                                    g.bottom
                                                                )));
                                        }
                                        await m({
                                            ...e,
                                            availableWidth: T,
                                            availableHeight: P,
                                        });
                                        let O = await c.getDimensions(
                                            p.floating
                                        );
                                        return x !== O.width || E !== O.height
                                            ? { reset: { rects: !0 } }
                                            : {};
                                    },
                                },
                                options: [F, j],
                            },
                            ed && {
                                ...{
                                    name: 'arrow',
                                    options:
                                        (H = I = { element: ed, padding: Z }),
                                    fn(e) {
                                        let { element: t, padding: n } =
                                            'function' == typeof H ? H(e) : H;
                                        return t &&
                                            {}.hasOwnProperty.call(t, 'current')
                                            ? null != t.current
                                                ? ew({
                                                      element: t.current,
                                                      padding: n,
                                                  }).fn(e)
                                                : {}
                                            : t
                                              ? ew({
                                                    element: t,
                                                    padding: n,
                                                }).fn(e)
                                              : {};
                                    },
                                },
                                options: [I, $],
                            },
                            eU({ arrowWidth: eh, arrowHeight: ev }),
                            en && {
                                ...{
                                    name: 'hide',
                                    options:
                                        (V = B =
                                            {
                                                strategy: 'referenceHidden',
                                                ...eM,
                                            }),
                                    async fn(e) {
                                        let { rects: t, platform: n } = e,
                                            {
                                                strategy: r = 'referenceHidden',
                                                ...o
                                            } = s(V, e);
                                        switch (r) {
                                            case 'referenceHidden': {
                                                let r = P(
                                                    await n.detectOverflow(e, {
                                                        ...o,
                                                        elementContext:
                                                            'reference',
                                                    }),
                                                    t.reference
                                                );
                                                return {
                                                    data: {
                                                        referenceHiddenOffsets:
                                                            r,
                                                        referenceHidden: T(r),
                                                    },
                                                };
                                            }
                                            case 'escaped': {
                                                let r = P(
                                                    await n.detectOverflow(e, {
                                                        ...o,
                                                        altBoundary: !0,
                                                    }),
                                                    t.floating
                                                );
                                                return {
                                                    data: {
                                                        escapedOffsets: r,
                                                        escaped: T(r),
                                                    },
                                                };
                                            }
                                            default:
                                                return {};
                                        }
                                    },
                                },
                                options: [B, z],
                            },
                        ],
                    }),
                    [ez, eV] = eZ(e_),
                    eY = (0, ek.useCallbackRef)(ei);
                (0, eN.useLayoutEffect)(() => {
                    eI && eY?.();
                }, [eI, eY]);
                let eX = e$.arrow?.x,
                    eK = e$.arrow?.y,
                    eG = e$.arrow?.centerOffset !== 0,
                    [eJ, eQ] = t.useState();
                return (
                    (0, eN.useLayoutEffect)(() => {
                        ec && eQ(window.getComputedStyle(ec).zIndex);
                    }, [ec]),
                    (0, eL.jsx)('div', {
                        ref: eW.setFloating,
                        'data-radix-popper-content-wrapper': '',
                        style: {
                            ...eF,
                            transform: eI
                                ? eF.transform
                                : 'translate(0, -200%)',
                            minWidth: 'max-content',
                            zIndex: eJ,
                            '--radix-popper-transform-origin': [
                                e$.transformOrigin?.x,
                                e$.transformOrigin?.y,
                            ].join(' '),
                            ...(e$.hide?.referenceHidden && {
                                visibility: 'hidden',
                                pointerEvents: 'none',
                            }),
                        },
                        dir: e.dir,
                        children: (0, eL.jsx)(eB, {
                            scope: Y,
                            placedSide: ez,
                            onArrowChange: ep,
                            arrowX: eX,
                            arrowY: eK,
                            shouldHideArrow: eG,
                            children: (0, eL.jsx)(eA.Primitive.div, {
                                'data-side': ez,
                                'data-align': eV,
                                ...ea,
                                ref: ef,
                                style: {
                                    ...ea.style,
                                    animation: eI ? void 0 : 'none',
                                },
                            }),
                        }),
                    })
                );
            });
        eV.displayName = eH;
        var eY = 'PopperArrow',
            eX = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
            eK = t.forwardRef(function (e, t) {
                let { __scopePopper: n, ...r } = e,
                    o = ez(eY, n),
                    i = eX[o.placedSide];
                return (0, eL.jsx)('span', {
                    ref: o.onArrowChange,
                    style: {
                        position: 'absolute',
                        left: o.arrowX,
                        top: o.arrowY,
                        [i]: 0,
                        transformOrigin: {
                            top: '',
                            right: '0 0',
                            bottom: 'center 0',
                            left: '100% 0',
                        }[o.placedSide],
                        transform: {
                            top: 'translateY(100%)',
                            right: 'translateY(50%) rotate(90deg) translateX(-50%)',
                            bottom: 'rotate(180deg)',
                            left: 'translateY(50%) rotate(-90deg) translateX(50%)',
                        }[o.placedSide],
                        visibility: o.shouldHideArrow ? 'hidden' : void 0,
                    },
                    children: (0, eL.jsx)(eP, {
                        ...r,
                        ref: t,
                        style: { ...r.style, display: 'block' },
                    }),
                });
            });
        function eq(e) {
            return null !== e;
        }
        eK.displayName = eY;
        var eU = (e) => ({
            name: 'transformOrigin',
            options: e,
            fn(t) {
                let { placement: n, rects: r, middlewareData: o } = t,
                    i = o.arrow?.centerOffset !== 0,
                    a = i ? 0 : e.arrowWidth,
                    l = i ? 0 : e.arrowHeight,
                    [u, c] = eZ(n),
                    s = { start: '0%', center: '50%', end: '100%' }[c],
                    f = (o.arrow?.x ?? 0) + a / 2,
                    d = (o.arrow?.y ?? 0) + l / 2,
                    p = '',
                    m = '';
                return (
                    'bottom' === u
                        ? ((p = i ? s : `${f}px`), (m = `${-l}px`))
                        : 'top' === u
                          ? ((p = i ? s : `${f}px`),
                            (m = `${r.floating.height + l}px`))
                          : 'right' === u
                            ? ((p = `${-l}px`), (m = i ? s : `${d}px`))
                            : 'left' === u &&
                              ((p = `${r.floating.width + l}px`),
                              (m = i ? s : `${d}px`)),
                    { data: { x: p, y: m } }
                );
            },
        });
        function eZ(e) {
            let [t, n = 'center'] = e.split('-');
            return [t, n];
        }
        e.s(
            [
                'Anchor',
                () => e$,
                'Arrow',
                () => eK,
                'Content',
                () => eV,
                'Root',
                () => e_,
                'createPopperScope',
                () => eW,
            ],
            75355
        );
    },
    60126,
    546354,
    (e) => {
        'use strict';
        let t;
        var n = e.i(990341),
            r = e.i(672687),
            o = e.i(403078),
            i = e.i(461404),
            a = e.i(565750),
            l = 'focusScope.autoFocusOnMount',
            u = 'focusScope.autoFocusOnUnmount',
            c = { bubbles: !1, cancelable: !0 },
            s = n.forwardRef((e, t) => {
                let {
                        loop: s = !1,
                        trapped: h = !1,
                        onMountAutoFocus: v,
                        onUnmountAutoFocus: g,
                        ...y
                    } = e,
                    [w, b] = n.useState(null),
                    x = (0, i.useCallbackRef)(v),
                    E = (0, i.useCallbackRef)(g),
                    S = n.useRef(null),
                    R = (0, r.useComposedRefs)(t, (e) => b(e)),
                    C = n.useRef({
                        paused: !1,
                        pause() {
                            this.paused = !0;
                        },
                        resume() {
                            this.paused = !1;
                        },
                    }).current;
                (n.useEffect(() => {
                    if (h) {
                        let e = function (e) {
                                if (C.paused || !w) return;
                                let t = e.target;
                                w.contains(t)
                                    ? (S.current = t)
                                    : p(S.current, { select: !0 });
                            },
                            t = function (e) {
                                if (C.paused || !w) return;
                                let t = e.relatedTarget;
                                null !== t &&
                                    (w.contains(t) ||
                                        p(S.current, { select: !0 }));
                            };
                        (document.addEventListener('focusin', e),
                            document.addEventListener('focusout', t));
                        let n = new MutationObserver(function (e) {
                            if (document.activeElement === document.body)
                                for (let t of e)
                                    t.removedNodes.length > 0 && p(w);
                        });
                        return (
                            w && n.observe(w, { childList: !0, subtree: !0 }),
                            () => {
                                (document.removeEventListener('focusin', e),
                                    document.removeEventListener('focusout', t),
                                    n.disconnect());
                            }
                        );
                    }
                }, [h, w, C.paused]),
                    n.useEffect(() => {
                        if (w) {
                            m.add(C);
                            let e = document.activeElement;
                            if (!w.contains(e)) {
                                let t = new CustomEvent(l, c);
                                (w.addEventListener(l, x),
                                    w.dispatchEvent(t),
                                    t.defaultPrevented ||
                                        ((function (
                                            e,
                                            { select: t = !1 } = {}
                                        ) {
                                            let n = document.activeElement;
                                            for (let r of e)
                                                if (
                                                    (p(r, { select: t }),
                                                    document.activeElement !==
                                                        n)
                                                )
                                                    return;
                                        })(
                                            f(w).filter(
                                                (e) => 'A' !== e.tagName
                                            ),
                                            { select: !0 }
                                        ),
                                        document.activeElement === e && p(w)));
                            }
                            return () => {
                                (w.removeEventListener(l, x),
                                    setTimeout(() => {
                                        let t = new CustomEvent(u, c);
                                        (w.addEventListener(u, E),
                                            w.dispatchEvent(t),
                                            t.defaultPrevented ||
                                                p(e ?? document.body, {
                                                    select: !0,
                                                }),
                                            w.removeEventListener(u, E),
                                            m.remove(C));
                                    }, 0));
                            };
                        }
                    }, [w, x, E, C]));
                let A = n.useCallback(
                    (e) => {
                        if ((!s && !h) || C.paused) return;
                        let t =
                                'Tab' === e.key &&
                                !e.altKey &&
                                !e.ctrlKey &&
                                !e.metaKey,
                            n = document.activeElement;
                        if (t && n) {
                            var r;
                            let t,
                                o = e.currentTarget,
                                [i, a] = [
                                    d((t = f((r = o))), r),
                                    d(t.reverse(), r),
                                ];
                            i && a
                                ? e.shiftKey || n !== a
                                    ? e.shiftKey &&
                                      n === i &&
                                      (e.preventDefault(),
                                      s && p(a, { select: !0 }))
                                    : (e.preventDefault(),
                                      s && p(i, { select: !0 }))
                                : n === o && e.preventDefault();
                        }
                    },
                    [s, h, C.paused]
                );
                return (0, a.jsx)(o.Primitive.div, {
                    tabIndex: -1,
                    ...y,
                    ref: R,
                    onKeyDown: A,
                });
            });
        function f(e) {
            let t = [],
                n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
                    acceptNode: (e) => {
                        let t = 'INPUT' === e.tagName && 'hidden' === e.type;
                        return e.disabled || e.hidden || t
                            ? NodeFilter.FILTER_SKIP
                            : e.tabIndex >= 0
                              ? NodeFilter.FILTER_ACCEPT
                              : NodeFilter.FILTER_SKIP;
                    },
                });
            for (; n.nextNode(); ) t.push(n.currentNode);
            return t;
        }
        function d(e, t) {
            for (let n of e)
                if (
                    !(function (e, { upTo: t }) {
                        if ('hidden' === getComputedStyle(e).visibility)
                            return !0;
                        for (; e && (void 0 === t || e !== t); ) {
                            if ('none' === getComputedStyle(e).display)
                                return !0;
                            e = e.parentElement;
                        }
                        return !1;
                    })(n, { upTo: t })
                )
                    return n;
        }
        function p(e, { select: t = !1 } = {}) {
            if (e && e.focus) {
                var n;
                let r = document.activeElement;
                (e.focus({ preventScroll: !0 }),
                    e !== r &&
                        (n = e) instanceof HTMLInputElement &&
                        'select' in n &&
                        t &&
                        e.select());
            }
        }
        s.displayName = 'FocusScope';
        var m =
            ((t = []),
            {
                add(e) {
                    let n = t[0];
                    (e !== n && n?.pause(), (t = h(t, e)).unshift(e));
                },
                remove(e) {
                    ((t = h(t, e)), t[0]?.resume());
                },
            });
        function h(e, t) {
            let n = [...e],
                r = n.indexOf(t);
            return (-1 !== r && n.splice(r, 1), n);
        }
        e.s(['FocusScope', () => s], 60126);
        var v = e.i(940842),
            g = e.i(150076),
            y = n.forwardRef((e, t) => {
                let { container: r, ...i } = e,
                    [l, u] = n.useState(!1);
                (0, g.useLayoutEffect)(() => u(!0), []);
                let c = r || (l && globalThis?.document?.body);
                return c
                    ? v.default.createPortal(
                          (0, a.jsx)(o.Primitive.div, { ...i, ref: t }),
                          c
                      )
                    : null;
            });
        ((y.displayName = 'Portal'), e.s(['Portal', () => y], 546354));
    },
    695145,
    (e) => {
        'use strict';
        var t = e.i(990341),
            n = e.i(150076);
        (t[' useEffectEvent '.trim().toString()],
            t[' useInsertionEffect '.trim().toString()]);
        var r =
            t[' useInsertionEffect '.trim().toString()] || n.useLayoutEffect;
        function o({
            prop: e,
            defaultProp: n,
            onChange: o = () => {},
            caller: i,
        }) {
            let [a, l, u] = (function ({ defaultProp: e, onChange: n }) {
                    let [o, i] = t.useState(e),
                        a = t.useRef(o),
                        l = t.useRef(n);
                    return (
                        r(() => {
                            l.current = n;
                        }, [n]),
                        t.useEffect(() => {
                            a.current !== o &&
                                (l.current?.(o), (a.current = o));
                        }, [o, a]),
                        [o, i, l]
                    );
                })({ defaultProp: n, onChange: o }),
                c = void 0 !== e,
                s = c ? e : a;
            {
                let n = t.useRef(void 0 !== e);
                t.useEffect(() => {
                    let e = n.current;
                    if (e !== c) {
                        let t = c ? 'controlled' : 'uncontrolled';
                        console.warn(
                            `${i} is changing from ${e ? 'controlled' : 'uncontrolled'} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
                        );
                    }
                    n.current = c;
                }, [c, i]);
            }
            return [
                s,
                t.useCallback(
                    (t) => {
                        if (c) {
                            let n = 'function' == typeof t ? t(e) : t;
                            n !== e && u.current?.(n);
                        } else l(t);
                    },
                    [c, e, l, u]
                ),
            ];
        }
        (Symbol('RADIX:SYNC_STATE'),
            e.s(['useControllableState', () => o], 695145));
    },
    73772,
    (e) => {
        'use strict';
        var t = new WeakMap(),
            n = new WeakMap(),
            r = {},
            o = 0,
            i = function (e) {
                return e && (e.host || i(e.parentNode));
            },
            a = function (e, a, l, u) {
                var c = (Array.isArray(e) ? e : [e])
                    .map(function (e) {
                        if (a.contains(e)) return e;
                        var t = i(e);
                        return t && a.contains(t)
                            ? t
                            : (console.error(
                                  'aria-hidden',
                                  e,
                                  'in not contained inside',
                                  a,
                                  '. Doing nothing'
                              ),
                              null);
                    })
                    .filter(function (e) {
                        return !!e;
                    });
                r[l] || (r[l] = new WeakMap());
                var s = r[l],
                    f = [],
                    d = new Set(),
                    p = new Set(c),
                    m = function (e) {
                        !e || d.has(e) || (d.add(e), m(e.parentNode));
                    };
                c.forEach(m);
                var h = function (e) {
                    !e ||
                        p.has(e) ||
                        Array.prototype.forEach.call(e.children, function (e) {
                            if (d.has(e)) h(e);
                            else
                                try {
                                    var r = e.getAttribute(u),
                                        o = null !== r && 'false' !== r,
                                        i = (t.get(e) || 0) + 1,
                                        a = (s.get(e) || 0) + 1;
                                    (t.set(e, i),
                                        s.set(e, a),
                                        f.push(e),
                                        1 === i && o && n.set(e, !0),
                                        1 === a && e.setAttribute(l, 'true'),
                                        o || e.setAttribute(u, 'true'));
                                } catch (t) {
                                    console.error(
                                        'aria-hidden: cannot operate on ',
                                        e,
                                        t
                                    );
                                }
                        });
                };
                return (
                    h(a),
                    d.clear(),
                    o++,
                    function () {
                        (f.forEach(function (e) {
                            var r = t.get(e) - 1,
                                o = s.get(e) - 1;
                            (t.set(e, r),
                                s.set(e, o),
                                r ||
                                    (n.has(e) || e.removeAttribute(u),
                                    n.delete(e)),
                                o || e.removeAttribute(l));
                        }),
                            --o ||
                                ((t = new WeakMap()),
                                (t = new WeakMap()),
                                (n = new WeakMap()),
                                (r = {})));
                    }
                );
            },
            l = function (e, t, n) {
                void 0 === n && (n = 'data-aria-hidden');
                var r = Array.from(Array.isArray(e) ? e : [e]),
                    o =
                        t ||
                        ('undefined' == typeof document
                            ? null
                            : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
                return o
                    ? (r.push.apply(
                          r,
                          Array.from(o.querySelectorAll('[aria-live], script'))
                      ),
                      a(r, o, n, 'aria-hidden'))
                    : function () {
                          return null;
                      };
            };
        e.s(['hideOthers', () => l]);
    },
    595357,
    (e) => {
        'use strict';
        var t,
            n,
            r,
            o,
            i,
            a,
            l,
            u = function () {
                return (u =
                    Object.assign ||
                    function (e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var o in (t = arguments[n]))
                                Object.prototype.hasOwnProperty.call(t, o) &&
                                    (e[o] = t[o]);
                        return e;
                    }).apply(this, arguments);
            };
        function c(e, t) {
            var n = {};
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) &&
                    0 > t.indexOf(r) &&
                    (n[r] = e[r]);
            if (null != e && 'function' == typeof Object.getOwnPropertySymbols)
                for (
                    var o = 0, r = Object.getOwnPropertySymbols(e);
                    o < r.length;
                    o++
                )
                    0 > t.indexOf(r[o]) &&
                        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                        (n[r[o]] = e[r[o]]);
            return n;
        }
        var s =
                ('function' == typeof SuppressedError && SuppressedError,
                e.i(990341)),
            f = 'right-scroll-bar-position',
            d = 'width-before-scroll-bar';
        function p(e, t) {
            return ('function' == typeof e ? e(t) : e && (e.current = t), e);
        }
        var m = 'undefined' != typeof window ? s.useLayoutEffect : s.useEffect,
            h = new WeakMap(),
            v =
                (void 0 === t && (t = {}),
                ((void 0 === n &&
                    (n = function (e) {
                        return e;
                    }),
                (r = []),
                (o = !1),
                (i = {
                    read: function () {
                        if (o)
                            throw Error(
                                'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.'
                            );
                        return r.length ? r[r.length - 1] : null;
                    },
                    useMedium: function (e) {
                        var t = n(e, o);
                        return (
                            r.push(t),
                            function () {
                                r = r.filter(function (e) {
                                    return e !== t;
                                });
                            }
                        );
                    },
                    assignSyncMedium: function (e) {
                        for (o = !0; r.length; ) {
                            var t = r;
                            ((r = []), t.forEach(e));
                        }
                        r = {
                            push: function (t) {
                                return e(t);
                            },
                            filter: function () {
                                return r;
                            },
                        };
                    },
                    assignMedium: function (e) {
                        o = !0;
                        var t = [];
                        if (r.length) {
                            var n = r;
                            ((r = []), n.forEach(e), (t = r));
                        }
                        var i = function () {
                                var n = t;
                                ((t = []), n.forEach(e));
                            },
                            a = function () {
                                return Promise.resolve().then(i);
                            };
                        (a(),
                            (r = {
                                push: function (e) {
                                    (t.push(e), a());
                                },
                                filter: function (e) {
                                    return ((t = t.filter(e)), r);
                                },
                            }));
                    },
                })).options = u({ async: !0, ssr: !1 }, t)),
                i),
            g = function () {},
            y = s.forwardRef(function (e, t) {
                var n,
                    r,
                    o,
                    i,
                    a = s.useRef(null),
                    l = s.useState({
                        onScrollCapture: g,
                        onWheelCapture: g,
                        onTouchMoveCapture: g,
                    }),
                    f = l[0],
                    d = l[1],
                    y = e.forwardProps,
                    w = e.children,
                    b = e.className,
                    x = e.removeScrollBar,
                    E = e.enabled,
                    S = e.shards,
                    R = e.sideCar,
                    C = e.noRelative,
                    A = e.noIsolation,
                    L = e.inert,
                    P = e.allowPinchZoom,
                    T = e.as,
                    O = e.gapMode,
                    k = c(e, [
                        'forwardProps',
                        'children',
                        'className',
                        'removeScrollBar',
                        'enabled',
                        'shards',
                        'sideCar',
                        'noRelative',
                        'noIsolation',
                        'inert',
                        'allowPinchZoom',
                        'as',
                        'gapMode',
                    ]),
                    N =
                        ((n = [a, t]),
                        (r = function (e) {
                            return n.forEach(function (t) {
                                return p(t, e);
                            });
                        }),
                        ((o = (0, s.useState)(function () {
                            return {
                                value: null,
                                callback: r,
                                facade: {
                                    get current() {
                                        return o.value;
                                    },
                                    set current(value) {
                                        var e = o.value;
                                        e !== value &&
                                            ((o.value = value),
                                            o.callback(value, e));
                                    },
                                },
                            };
                        })[0]).callback = r),
                        (i = o.facade),
                        m(
                            function () {
                                var e = h.get(i);
                                if (e) {
                                    var t = new Set(e),
                                        r = new Set(n),
                                        o = i.current;
                                    (t.forEach(function (e) {
                                        r.has(e) || p(e, null);
                                    }),
                                        r.forEach(function (e) {
                                            t.has(e) || p(e, o);
                                        }));
                                }
                                h.set(i, n);
                            },
                            [n]
                        ),
                        i),
                    D = u(u({}, k), f);
                return s.createElement(
                    s.Fragment,
                    null,
                    E &&
                        s.createElement(R, {
                            sideCar: v,
                            removeScrollBar: x,
                            shards: S,
                            noRelative: C,
                            noIsolation: A,
                            inert: L,
                            setCallbacks: d,
                            allowPinchZoom: !!P,
                            lockRef: a,
                            gapMode: O,
                        }),
                    y
                        ? s.cloneElement(
                              s.Children.only(w),
                              u(u({}, D), { ref: N })
                          )
                        : s.createElement(
                              void 0 === T ? 'div' : T,
                              u({}, D, { className: b, ref: N }),
                              w
                          )
                );
            });
        ((y.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
            (y.classNames = { fullWidth: d, zeroRight: f }));
        var w = function (e) {
            var t = e.sideCar,
                n = c(e, ['sideCar']);
            if (!t)
                throw Error(
                    'Sidecar: please provide `sideCar` property to import the right car'
                );
            var r = t.read();
            if (!r) throw Error('Sidecar medium not found');
            return s.createElement(r, u({}, n));
        };
        w.isSideCarExport = !0;
        var b = function () {
                var e = 0,
                    t = null;
                return {
                    add: function (n) {
                        if (
                            0 == e &&
                            (t = (function () {
                                if (!document) return null;
                                var e = document.createElement('style');
                                e.type = 'text/css';
                                var t =
                                    l ||
                                    ('undefined' != typeof __webpack_nonce__
                                        ? __webpack_nonce__
                                        : void 0);
                                return (t && e.setAttribute('nonce', t), e);
                            })())
                        ) {
                            var r, o;
                            ((r = t).styleSheet
                                ? (r.styleSheet.cssText = n)
                                : r.appendChild(document.createTextNode(n)),
                                (o = t),
                                (
                                    document.head ||
                                    document.getElementsByTagName('head')[0]
                                ).appendChild(o));
                        }
                        e++;
                    },
                    remove: function () {
                        --e ||
                            !t ||
                            (t.parentNode && t.parentNode.removeChild(t),
                            (t = null));
                    },
                };
            },
            x = function () {
                var e = b();
                return function (t, n) {
                    s.useEffect(
                        function () {
                            return (
                                e.add(t),
                                function () {
                                    e.remove();
                                }
                            );
                        },
                        [t && n]
                    );
                };
            },
            E = function () {
                var e = x();
                return function (t) {
                    return (e(t.styles, t.dynamic), null);
                };
            },
            S = { left: 0, top: 0, right: 0, gap: 0 },
            R = function (e) {
                return parseInt(e || '', 10) || 0;
            },
            C = function (e) {
                var t = window.getComputedStyle(document.body),
                    n = t['padding' === e ? 'paddingLeft' : 'marginLeft'],
                    r = t['padding' === e ? 'paddingTop' : 'marginTop'],
                    o = t['padding' === e ? 'paddingRight' : 'marginRight'];
                return [R(n), R(r), R(o)];
            },
            A = function (e) {
                if (
                    (void 0 === e && (e = 'margin'),
                    'undefined' == typeof window)
                )
                    return S;
                var t = C(e),
                    n = document.documentElement.clientWidth,
                    r = window.innerWidth;
                return {
                    left: t[0],
                    top: t[1],
                    right: t[2],
                    gap: Math.max(0, r - n + t[2] - t[0]),
                };
            },
            L = E(),
            P = 'data-scroll-locked',
            T = function (e, t, n, r) {
                var o = e.left,
                    i = e.top,
                    a = e.right,
                    l = e.gap;
                return (
                    void 0 === n && (n = 'margin'),
                    '\n  .'
                        .concat(
                            'with-scroll-bars-hidden',
                            ' {\n   overflow: hidden '
                        )
                        .concat(r, ';\n   padding-right: ')
                        .concat(l, 'px ')
                        .concat(r, ';\n  }\n  body[')
                        .concat(P, '] {\n    overflow: hidden ')
                        .concat(r, ';\n    overscroll-behavior: contain;\n    ')
                        .concat(
                            [
                                t && 'position: relative '.concat(r, ';'),
                                'margin' === n &&
                                    '\n    padding-left: '
                                        .concat(o, 'px;\n    padding-top: ')
                                        .concat(i, 'px;\n    padding-right: ')
                                        .concat(
                                            a,
                                            'px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: '
                                        )
                                        .concat(l, 'px ')
                                        .concat(r, ';\n    '),
                                'padding' === n &&
                                    'padding-right: '
                                        .concat(l, 'px ')
                                        .concat(r, ';'),
                            ]
                                .filter(Boolean)
                                .join(''),
                            '\n  }\n  \n  .'
                        )
                        .concat(f, ' {\n    right: ')
                        .concat(l, 'px ')
                        .concat(r, ';\n  }\n  \n  .')
                        .concat(d, ' {\n    margin-right: ')
                        .concat(l, 'px ')
                        .concat(r, ';\n  }\n  \n  .')
                        .concat(f, ' .')
                        .concat(f, ' {\n    right: 0 ')
                        .concat(r, ';\n  }\n  \n  .')
                        .concat(d, ' .')
                        .concat(d, ' {\n    margin-right: 0 ')
                        .concat(r, ';\n  }\n  \n  body[')
                        .concat(P, '] {\n    ')
                        .concat('--removed-body-scroll-bar-size', ': ')
                        .concat(l, 'px;\n  }\n')
                );
            },
            O = function () {
                var e = parseInt(document.body.getAttribute(P) || '0', 10);
                return isFinite(e) ? e : 0;
            },
            k = function () {
                s.useEffect(function () {
                    return (
                        document.body.setAttribute(P, (O() + 1).toString()),
                        function () {
                            var e = O() - 1;
                            e <= 0
                                ? document.body.removeAttribute(P)
                                : document.body.setAttribute(P, e.toString());
                        }
                    );
                }, []);
            },
            N = function (e) {
                var t = e.noRelative,
                    n = e.noImportant,
                    r = e.gapMode,
                    o = void 0 === r ? 'margin' : r;
                k();
                var i = s.useMemo(
                    function () {
                        return A(o);
                    },
                    [o]
                );
                return s.createElement(L, {
                    styles: T(i, !t, o, n ? '' : '!important'),
                });
            },
            D = !1;
        if ('undefined' != typeof window)
            try {
                var M = Object.defineProperty({}, 'passive', {
                    get: function () {
                        return ((D = !0), !0);
                    },
                });
                (window.addEventListener('test', M, M),
                    window.removeEventListener('test', M, M));
            } catch (e) {
                D = !1;
            }
        var W = !!D && { passive: !1 },
            F = function (e, t) {
                if (!(e instanceof Element)) return !1;
                var n = window.getComputedStyle(e);
                return (
                    'hidden' !== n[t] &&
                    (n.overflowY !== n.overflowX ||
                        'TEXTAREA' === e.tagName ||
                        'visible' !== n[t])
                );
            },
            j = function (e, t) {
                var n = t.ownerDocument,
                    r = t;
                do {
                    if (
                        ('undefined' != typeof ShadowRoot &&
                            r instanceof ShadowRoot &&
                            (r = r.host),
                        _(e, r))
                    ) {
                        var o = I(e, r);
                        if (o[1] > o[2]) return !0;
                    }
                    r = r.parentNode;
                } while (r && r !== n.body);
                return !1;
            },
            _ = function (e, t) {
                return 'v' === e ? F(t, 'overflowY') : F(t, 'overflowX');
            },
            I = function (e, t) {
                return 'v' === e
                    ? [t.scrollTop, t.scrollHeight, t.clientHeight]
                    : [t.scrollLeft, t.scrollWidth, t.clientWidth];
            },
            $ = function (e, t, n, r, o) {
                var i,
                    a =
                        ((i = window.getComputedStyle(t).direction),
                        'h' === e && 'rtl' === i ? -1 : 1),
                    l = a * r,
                    u = n.target,
                    c = t.contains(u),
                    s = !1,
                    f = l > 0,
                    d = 0,
                    p = 0;
                do {
                    if (!u) break;
                    var m = I(e, u),
                        h = m[0],
                        v = m[1] - m[2] - a * h;
                    (h || v) && _(e, u) && ((d += v), (p += h));
                    var g = u.parentNode;
                    u =
                        g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE
                            ? g.host
                            : g;
                } while (
                    (!c && u !== document.body) ||
                    (c && (t.contains(u) || t === u))
                );
                return (
                    f && ((o && 1 > Math.abs(d)) || (!o && l > d))
                        ? (s = !0)
                        : !f &&
                          ((o && 1 > Math.abs(p)) || (!o && -l > p)) &&
                          (s = !0),
                    s
                );
            },
            H = function (e) {
                return 'changedTouches' in e
                    ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
                    : [0, 0];
            },
            B = function (e) {
                return [e.deltaX, e.deltaY];
            },
            z = function (e) {
                return e && 'current' in e ? e.current : e;
            },
            V = 0,
            Y = [];
        let X =
            ((a = function (e) {
                var t = s.useRef([]),
                    n = s.useRef([0, 0]),
                    r = s.useRef(),
                    o = s.useState(V++)[0],
                    i = s.useState(E)[0],
                    a = s.useRef(e);
                (s.useEffect(
                    function () {
                        a.current = e;
                    },
                    [e]
                ),
                    s.useEffect(
                        function () {
                            if (e.inert) {
                                document.body.classList.add(
                                    'block-interactivity-'.concat(o)
                                );
                                var t = (function (e, t, n) {
                                    if (n || 2 == arguments.length)
                                        for (
                                            var r, o = 0, i = t.length;
                                            o < i;
                                            o++
                                        )
                                            (!r && o in t) ||
                                                (r ||
                                                    (r =
                                                        Array.prototype.slice.call(
                                                            t,
                                                            0,
                                                            o
                                                        )),
                                                (r[o] = t[o]));
                                    return e.concat(
                                        r || Array.prototype.slice.call(t)
                                    );
                                })(
                                    [e.lockRef.current],
                                    (e.shards || []).map(z),
                                    !0
                                ).filter(Boolean);
                                return (
                                    t.forEach(function (e) {
                                        return e.classList.add(
                                            'allow-interactivity-'.concat(o)
                                        );
                                    }),
                                    function () {
                                        (document.body.classList.remove(
                                            'block-interactivity-'.concat(o)
                                        ),
                                            t.forEach(function (e) {
                                                return e.classList.remove(
                                                    'allow-interactivity-'.concat(
                                                        o
                                                    )
                                                );
                                            }));
                                    }
                                );
                            }
                        },
                        [e.inert, e.lockRef.current, e.shards]
                    ));
                var l = s.useCallback(function (e, t) {
                        if (
                            ('touches' in e && 2 === e.touches.length) ||
                            ('wheel' === e.type && e.ctrlKey)
                        )
                            return !a.current.allowPinchZoom;
                        var o,
                            i = H(e),
                            l = n.current,
                            u = 'deltaX' in e ? e.deltaX : l[0] - i[0],
                            c = 'deltaY' in e ? e.deltaY : l[1] - i[1],
                            s = e.target,
                            f = Math.abs(u) > Math.abs(c) ? 'h' : 'v';
                        if ('touches' in e && 'h' === f && 'range' === s.type)
                            return !1;
                        var d = window.getSelection(),
                            p = d && d.anchorNode;
                        if (p && (p === s || p.contains(s))) return !1;
                        var m = j(f, s);
                        if (!m) return !0;
                        if (
                            (m
                                ? (o = f)
                                : ((o = 'v' === f ? 'h' : 'v'), (m = j(f, s))),
                            !m)
                        )
                            return !1;
                        if (
                            (!r.current &&
                                'changedTouches' in e &&
                                (u || c) &&
                                (r.current = o),
                            !o)
                        )
                            return !0;
                        var h = r.current || o;
                        return $(h, t, e, 'h' === h ? u : c, !0);
                    }, []),
                    u = s.useCallback(function (e) {
                        if (Y.length && Y[Y.length - 1] === i) {
                            var n = 'deltaY' in e ? B(e) : H(e),
                                r = t.current.filter(function (t) {
                                    var r;
                                    return (
                                        t.name === e.type &&
                                        (t.target === e.target ||
                                            e.target === t.shadowParent) &&
                                        ((r = t.delta),
                                        r[0] === n[0] && r[1] === n[1])
                                    );
                                })[0];
                            if (r && r.should) {
                                e.cancelable && e.preventDefault();
                                return;
                            }
                            if (!r) {
                                var o = (a.current.shards || [])
                                    .map(z)
                                    .filter(Boolean)
                                    .filter(function (t) {
                                        return t.contains(e.target);
                                    });
                                (o.length > 0
                                    ? l(e, o[0])
                                    : !a.current.noIsolation) &&
                                    e.cancelable &&
                                    e.preventDefault();
                            }
                        }
                    }, []),
                    c = s.useCallback(function (e, n, r, o) {
                        var i = {
                            name: e,
                            delta: n,
                            target: r,
                            should: o,
                            shadowParent: (function (e) {
                                for (var t = null; null !== e; )
                                    (e instanceof ShadowRoot &&
                                        ((t = e.host), (e = e.host)),
                                        (e = e.parentNode));
                                return t;
                            })(r),
                        };
                        (t.current.push(i),
                            setTimeout(function () {
                                t.current = t.current.filter(function (e) {
                                    return e !== i;
                                });
                            }, 1));
                    }, []),
                    f = s.useCallback(function (e) {
                        ((n.current = H(e)), (r.current = void 0));
                    }, []),
                    d = s.useCallback(function (t) {
                        c(t.type, B(t), t.target, l(t, e.lockRef.current));
                    }, []),
                    p = s.useCallback(function (t) {
                        c(t.type, H(t), t.target, l(t, e.lockRef.current));
                    }, []);
                s.useEffect(function () {
                    return (
                        Y.push(i),
                        e.setCallbacks({
                            onScrollCapture: d,
                            onWheelCapture: d,
                            onTouchMoveCapture: p,
                        }),
                        document.addEventListener('wheel', u, W),
                        document.addEventListener('touchmove', u, W),
                        document.addEventListener('touchstart', f, W),
                        function () {
                            ((Y = Y.filter(function (e) {
                                return e !== i;
                            })),
                                document.removeEventListener('wheel', u, W),
                                document.removeEventListener('touchmove', u, W),
                                document.removeEventListener(
                                    'touchstart',
                                    f,
                                    W
                                ));
                        }
                    );
                }, []);
                var m = e.removeScrollBar,
                    h = e.inert;
                return s.createElement(
                    s.Fragment,
                    null,
                    h
                        ? s.createElement(i, {
                              styles: '\n  .block-interactivity-'
                                  .concat(
                                      o,
                                      ' {pointer-events: none;}\n  .allow-interactivity-'
                                  )
                                  .concat(o, ' {pointer-events: all;}\n'),
                          })
                        : null,
                    m
                        ? s.createElement(N, {
                              noRelative: e.noRelative,
                              gapMode: e.gapMode,
                          })
                        : null
                );
            }),
            v.useMedium(a),
            w);
        var K = s.forwardRef(function (e, t) {
            return s.createElement(y, u({}, e, { ref: t, sideCar: X }));
        });
        ((K.classNames = y.classNames), e.s(['RemoveScroll', 0, K], 595357));
    },
    158166,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('chevron-down', [
            ['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }],
        ]);
        e.s(['default', () => t]);
    },
]);
