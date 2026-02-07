(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    530090,
    (e, t, r) => {
        'use strict';
        (Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'warnOnce', {
                enumerable: !0,
                get: function () {
                    return n;
                },
            }));
        let n = (e) => {};
    },
    245586,
    (e, t, r) => {
        t.exports = e.r(12438);
    },
    383206,
    (e) => {
        'use strict';
        var t = e.i(990341);
        let r = (e) => {
                let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) =>
                    r ? r.toUpperCase() : t.toLowerCase()
                );
                return t.charAt(0).toUpperCase() + t.slice(1);
            },
            n = (...e) =>
                e
                    .filter(
                        (e, t, r) =>
                            !!e && '' !== e.trim() && r.indexOf(e) === t
                    )
                    .join(' ')
                    .trim();
        var a = {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        };
        let o = (0, t.forwardRef)(
                (
                    {
                        color: e = 'currentColor',
                        size: r = 24,
                        strokeWidth: o = 2,
                        absoluteStrokeWidth: i,
                        className: l = '',
                        children: u,
                        iconNode: s,
                        ...c
                    },
                    f
                ) =>
                    (0, t.createElement)(
                        'svg',
                        {
                            ref: f,
                            ...a,
                            width: r,
                            height: r,
                            stroke: e,
                            strokeWidth: i ? (24 * Number(o)) / Number(r) : o,
                            className: n('lucide', l),
                            ...(!u &&
                                !((e) => {
                                    for (let t in e)
                                        if (
                                            t.startsWith('aria-') ||
                                            'role' === t ||
                                            'title' === t
                                        )
                                            return !0;
                                })(c) && { 'aria-hidden': 'true' }),
                            ...c,
                        },
                        [
                            ...s.map(([e, r]) => (0, t.createElement)(e, r)),
                            ...(Array.isArray(u) ? u : [u]),
                        ]
                    )
            ),
            i = (e, a) => {
                let i = (0, t.forwardRef)(({ className: i, ...l }, u) =>
                    (0, t.createElement)(o, {
                        ref: u,
                        iconNode: a,
                        className: n(
                            `lucide-${r(e)
                                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                                .toLowerCase()}`,
                            `lucide-${e}`,
                            i
                        ),
                        ...l,
                    })
                );
                return ((i.displayName = r(e)), i);
            };
        e.s(['default', () => i], 383206);
    },
    61767,
    (e, t, r) => {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        var n = {
            assign: function () {
                return u;
            },
            searchParamsToUrlQuery: function () {
                return o;
            },
            urlQueryToSearchParams: function () {
                return l;
            },
        };
        for (var a in n)
            Object.defineProperty(r, a, { enumerable: !0, get: n[a] });
        function o(e) {
            let t = {};
            for (let [r, n] of e.entries()) {
                let e = t[r];
                void 0 === e
                    ? (t[r] = n)
                    : Array.isArray(e)
                      ? e.push(n)
                      : (t[r] = [e, n]);
            }
            return t;
        }
        function i(e) {
            return 'string' == typeof e
                ? e
                : ('number' != typeof e || isNaN(e)) && 'boolean' != typeof e
                  ? ''
                  : String(e);
        }
        function l(e) {
            let t = new URLSearchParams();
            for (let [r, n] of Object.entries(e))
                if (Array.isArray(n)) for (let e of n) t.append(r, i(e));
                else t.set(r, i(n));
            return t;
        }
        function u(e, ...t) {
            for (let r of t) {
                for (let t of r.keys()) e.delete(t);
                for (let [t, n] of r.entries()) e.append(t, n);
            }
            return e;
        }
    },
    366521,
    (e, t, r) => {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        var n = {
            formatUrl: function () {
                return l;
            },
            formatWithValidation: function () {
                return s;
            },
            urlObjectKeys: function () {
                return u;
            },
        };
        for (var a in n)
            Object.defineProperty(r, a, { enumerable: !0, get: n[a] });
        let o = e.r(744066)._(e.r(61767)),
            i = /https?|ftp|gopher|file/;
        function l(e) {
            let { auth: t, hostname: r } = e,
                n = e.protocol || '',
                a = e.pathname || '',
                l = e.hash || '',
                u = e.query || '',
                s = !1;
            ((t = t ? encodeURIComponent(t).replace(/%3A/i, ':') + '@' : ''),
                e.host
                    ? (s = t + e.host)
                    : r &&
                      ((s = t + (~r.indexOf(':') ? `[${r}]` : r)),
                      e.port && (s += ':' + e.port)),
                u &&
                    'object' == typeof u &&
                    (u = String(o.urlQueryToSearchParams(u))));
            let c = e.search || (u && `?${u}`) || '';
            return (
                n && !n.endsWith(':') && (n += ':'),
                e.slashes || ((!n || i.test(n)) && !1 !== s)
                    ? ((s = '//' + (s || '')),
                      a && '/' !== a[0] && (a = '/' + a))
                    : s || (s = ''),
                l && '#' !== l[0] && (l = '#' + l),
                c && '?' !== c[0] && (c = '?' + c),
                (a = a.replace(/[?#]/g, encodeURIComponent)),
                (c = c.replace('#', '%23')),
                `${n}${s}${a}${c}${l}`
            );
        }
        let u = [
            'auth',
            'hash',
            'host',
            'hostname',
            'href',
            'path',
            'pathname',
            'port',
            'protocol',
            'query',
            'search',
            'slashes',
        ];
        function s(e) {
            return l(e);
        }
    },
    605364,
    (e, t, r) => {
        'use strict';
        (Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'useMergedRef', {
                enumerable: !0,
                get: function () {
                    return a;
                },
            }));
        let n = e.r(990341);
        function a(e, t) {
            let r = (0, n.useRef)(null),
                a = (0, n.useRef)(null);
            return (0, n.useCallback)(
                (n) => {
                    if (null === n) {
                        let e = r.current;
                        e && ((r.current = null), e());
                        let t = a.current;
                        t && ((a.current = null), t());
                    } else
                        (e && (r.current = o(e, n)),
                            t && (a.current = o(t, n)));
                },
                [e, t]
            );
        }
        function o(e, t) {
            if ('function' != typeof e)
                return (
                    (e.current = t),
                    () => {
                        e.current = null;
                    }
                );
            {
                let r = e(t);
                return 'function' == typeof r ? r : () => e(null);
            }
        }
        ('function' == typeof r.default ||
            ('object' == typeof r.default && null !== r.default)) &&
            void 0 === r.default.__esModule &&
            (Object.defineProperty(r.default, '__esModule', { value: !0 }),
            Object.assign(r.default, r),
            (t.exports = r.default));
    },
    465127,
    (e, t, r) => {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        var n = {
            DecodeError: function () {
                return g;
            },
            MiddlewareNotFoundError: function () {
                return w;
            },
            MissingStaticPage: function () {
                return x;
            },
            NormalizeError: function () {
                return b;
            },
            PageNotFoundError: function () {
                return v;
            },
            SP: function () {
                return y;
            },
            ST: function () {
                return m;
            },
            WEB_VITALS: function () {
                return o;
            },
            execOnce: function () {
                return i;
            },
            getDisplayName: function () {
                return f;
            },
            getLocationOrigin: function () {
                return s;
            },
            getURL: function () {
                return c;
            },
            isAbsoluteUrl: function () {
                return u;
            },
            isResSent: function () {
                return d;
            },
            loadGetInitialProps: function () {
                return h;
            },
            normalizeRepeatedSlashes: function () {
                return p;
            },
            stringifyError: function () {
                return j;
            },
        };
        for (var a in n)
            Object.defineProperty(r, a, { enumerable: !0, get: n[a] });
        let o = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'];
        function i(e) {
            let t,
                r = !1;
            return (...n) => (r || ((r = !0), (t = e(...n))), t);
        }
        let l = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
            u = (e) => l.test(e);
        function s() {
            let { protocol: e, hostname: t, port: r } = window.location;
            return `${e}//${t}${r ? ':' + r : ''}`;
        }
        function c() {
            let { href: e } = window.location,
                t = s();
            return e.substring(t.length);
        }
        function f(e) {
            return 'string' == typeof e
                ? e
                : e.displayName || e.name || 'Unknown';
        }
        function d(e) {
            return e.finished || e.headersSent;
        }
        function p(e) {
            let t = e.split('?');
            return (
                t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') +
                (t[1] ? `?${t.slice(1).join('?')}` : '')
            );
        }
        async function h(e, t) {
            let r = t.res || (t.ctx && t.ctx.res);
            if (!e.getInitialProps)
                return t.ctx && t.Component
                    ? { pageProps: await h(t.Component, t.ctx) }
                    : {};
            let n = await e.getInitialProps(t);
            if (r && d(r)) return n;
            if (!n)
                throw Object.defineProperty(
                    Error(
                        `"${f(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`
                    ),
                    '__NEXT_ERROR_CODE',
                    { value: 'E394', enumerable: !1, configurable: !0 }
                );
            return n;
        }
        let y = 'undefined' != typeof performance,
            m =
                y &&
                ['mark', 'measure', 'getEntriesByName'].every(
                    (e) => 'function' == typeof performance[e]
                );
        class g extends Error {}
        class b extends Error {}
        class v extends Error {
            constructor(e) {
                (super(),
                    (this.code = 'ENOENT'),
                    (this.name = 'PageNotFoundError'),
                    (this.message = `Cannot find module for page: ${e}`));
            }
        }
        class x extends Error {
            constructor(e, t) {
                (super(),
                    (this.message = `Failed to load static file for page: ${e} ${t}`));
            }
        }
        class w extends Error {
            constructor() {
                (super(),
                    (this.code = 'ENOENT'),
                    (this.message = 'Cannot find the middleware module'));
            }
        }
        function j(e) {
            return JSON.stringify({ message: e.message, stack: e.stack });
        }
    },
    415307,
    (e, t, r) => {
        'use strict';
        (Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'isLocalURL', {
                enumerable: !0,
                get: function () {
                    return o;
                },
            }));
        let n = e.r(465127),
            a = e.r(104132);
        function o(e) {
            if (!(0, n.isAbsoluteUrl)(e)) return !0;
            try {
                let t = (0, n.getLocationOrigin)(),
                    r = new URL(e, t);
                return r.origin === t && (0, a.hasBasePath)(r.pathname);
            } catch (e) {
                return !1;
            }
        }
    },
    90112,
    (e, t, r) => {
        'use strict';
        (Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'errorOnce', {
                enumerable: !0,
                get: function () {
                    return n;
                },
            }));
        let n = (e) => {};
    },
    321838,
    (e, t, r) => {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        var n = {
            default: function () {
                return g;
            },
            useLinkStatus: function () {
                return v;
            },
        };
        for (var a in n)
            Object.defineProperty(r, a, { enumerable: !0, get: n[a] });
        let o = e.r(744066),
            i = e.r(565750),
            l = o._(e.r(990341)),
            u = e.r(366521),
            s = e.r(537805),
            c = e.r(605364),
            f = e.r(465127),
            d = e.r(873598);
        e.r(530090);
        let p = e.r(611604),
            h = e.r(415307),
            y = e.r(795486);
        function m(e) {
            return 'string' == typeof e ? e : (0, u.formatUrl)(e);
        }
        function g(t) {
            var r;
            let n,
                a,
                o,
                [u, g] = (0, l.useOptimistic)(p.IDLE_LINK_STATUS),
                v = (0, l.useRef)(null),
                {
                    href: x,
                    as: w,
                    children: j,
                    prefetch: k = null,
                    passHref: P,
                    replace: E,
                    shallow: _,
                    scroll: N,
                    onClick: O,
                    onMouseEnter: C,
                    onTouchStart: M,
                    legacyBehavior: T = !1,
                    onNavigate: S,
                    ref: L,
                    unstable_dynamicOnHover: R,
                    ...A
                } = t;
            ((n = j),
                T &&
                    ('string' == typeof n || 'number' == typeof n) &&
                    (n = (0, i.jsx)('a', { children: n })));
            let U = l.default.useContext(s.AppRouterContext),
                $ = !1 !== k,
                I =
                    !1 !== k
                        ? null === (r = k) || 'auto' === r
                            ? y.FetchStrategy.PPR
                            : y.FetchStrategy.Full
                        : y.FetchStrategy.PPR,
                { href: D, as: B } = l.default.useMemo(() => {
                    let e = m(x);
                    return { href: e, as: w ? m(w) : e };
                }, [x, w]);
            if (T) {
                if (n?.$$typeof === Symbol.for('react.lazy'))
                    throw Object.defineProperty(
                        Error(
                            "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."
                        ),
                        '__NEXT_ERROR_CODE',
                        { value: 'E863', enumerable: !1, configurable: !0 }
                    );
                a = l.default.Children.only(n);
            }
            let F = T ? a && 'object' == typeof a && a.ref : L,
                z = l.default.useCallback(
                    (e) => (
                        null !== U &&
                            (v.current = (0, p.mountLinkInstance)(
                                e,
                                D,
                                U,
                                I,
                                $,
                                g
                            )),
                        () => {
                            (v.current &&
                                ((0, p.unmountLinkForCurrentNavigation)(
                                    v.current
                                ),
                                (v.current = null)),
                                (0, p.unmountPrefetchableInstance)(e));
                        }
                    ),
                    [$, D, U, I, g]
                ),
                K = {
                    ref: (0, c.useMergedRef)(z, F),
                    onClick(t) {
                        (T || 'function' != typeof O || O(t),
                            T &&
                                a.props &&
                                'function' == typeof a.props.onClick &&
                                a.props.onClick(t),
                            !U ||
                                t.defaultPrevented ||
                                (function (t, r, n, a, o, i, u) {
                                    if ('undefined' != typeof window) {
                                        let s,
                                            { nodeName: c } = t.currentTarget;
                                        if (
                                            ('A' === c.toUpperCase() &&
                                                (((s =
                                                    t.currentTarget.getAttribute(
                                                        'target'
                                                    )) &&
                                                    '_self' !== s) ||
                                                    t.metaKey ||
                                                    t.ctrlKey ||
                                                    t.shiftKey ||
                                                    t.altKey ||
                                                    (t.nativeEvent &&
                                                        2 ===
                                                            t.nativeEvent
                                                                .which))) ||
                                            t.currentTarget.hasAttribute(
                                                'download'
                                            )
                                        )
                                            return;
                                        if (!(0, h.isLocalURL)(r)) {
                                            o &&
                                                (t.preventDefault(),
                                                location.replace(r));
                                            return;
                                        }
                                        if ((t.preventDefault(), u)) {
                                            let e = !1;
                                            if (
                                                (u({
                                                    preventDefault: () => {
                                                        e = !0;
                                                    },
                                                }),
                                                e)
                                            )
                                                return;
                                        }
                                        let { dispatchNavigateAction: f } =
                                            e.r(562274);
                                        l.default.startTransition(() => {
                                            f(
                                                n || r,
                                                o ? 'replace' : 'push',
                                                i ?? !0,
                                                a.current
                                            );
                                        });
                                    }
                                })(t, D, B, v, E, N, S));
                    },
                    onMouseEnter(e) {
                        (T || 'function' != typeof C || C(e),
                            T &&
                                a.props &&
                                'function' == typeof a.props.onMouseEnter &&
                                a.props.onMouseEnter(e),
                            U &&
                                $ &&
                                (0, p.onNavigationIntent)(
                                    e.currentTarget,
                                    !0 === R
                                ));
                    },
                    onTouchStart: function (e) {
                        (T || 'function' != typeof M || M(e),
                            T &&
                                a.props &&
                                'function' == typeof a.props.onTouchStart &&
                                a.props.onTouchStart(e),
                            U &&
                                $ &&
                                (0, p.onNavigationIntent)(
                                    e.currentTarget,
                                    !0 === R
                                ));
                    },
                };
            return (
                (0, f.isAbsoluteUrl)(B)
                    ? (K.href = B)
                    : (T && !P && ('a' !== a.type || 'href' in a.props)) ||
                      (K.href = (0, d.addBasePath)(B)),
                (o = T
                    ? l.default.cloneElement(a, K)
                    : (0, i.jsx)('a', { ...A, ...K, children: n })),
                (0, i.jsx)(b.Provider, { value: u, children: o })
            );
        }
        e.r(90112);
        let b = (0, l.createContext)(p.IDLE_LINK_STATUS),
            v = () => (0, l.useContext)(b);
        ('function' == typeof r.default ||
            ('object' == typeof r.default && null !== r.default)) &&
            void 0 === r.default.__esModule &&
            (Object.defineProperty(r.default, '__esModule', { value: !0 }),
            Object.assign(r.default, r),
            (t.exports = r.default));
    },
    263942,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('building-2', [
            ['path', { d: 'M10 12h4', key: 'a56b0p' }],
            ['path', { d: 'M10 8h4', key: '1sr2af' }],
            ['path', { d: 'M14 21v-3a2 2 0 0 0-4 0v3', key: '1rgiei' }],
            [
                'path',
                {
                    d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2',
                    key: 'secmi2',
                },
            ],
            [
                'path',
                {
                    d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16',
                    key: '16ra0t',
                },
            ],
        ]);
        e.s(['Building2', () => t], 263942);
    },
    874134,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('layout-dashboard', [
            [
                'rect',
                {
                    width: '7',
                    height: '9',
                    x: '3',
                    y: '3',
                    rx: '1',
                    key: '10lvy0',
                },
            ],
            [
                'rect',
                {
                    width: '7',
                    height: '5',
                    x: '14',
                    y: '3',
                    rx: '1',
                    key: '16une8',
                },
            ],
            [
                'rect',
                {
                    width: '7',
                    height: '9',
                    x: '14',
                    y: '12',
                    rx: '1',
                    key: '1hutg5',
                },
            ],
            [
                'rect',
                {
                    width: '7',
                    height: '5',
                    x: '3',
                    y: '16',
                    rx: '1',
                    key: 'ldoo1y',
                },
            ],
        ]);
        e.s(['LayoutDashboard', () => t], 874134);
    },
    927291,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('wallet', [
            [
                'path',
                {
                    d: 'M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1',
                    key: '18etb6',
                },
            ],
            [
                'path',
                {
                    d: 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4',
                    key: 'xoc0q4',
                },
            ],
        ]);
        e.s(['Wallet', () => t], 927291);
    },
    977247,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('calendar-check', [
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
            ['path', { d: 'm9 16 2 2 4-4', key: '19s6y9' }],
        ]);
        e.s(['CalendarCheck', () => t], 977247);
    },
    94988,
    (e) => {
        'use strict';
        var t = e.i(565750),
            r = e.i(990341),
            n = e.i(321838),
            a = e.i(245586),
            o = e.i(975157),
            i = e.i(874134),
            l = e.i(977247),
            u = e.i(927291);
        let s = (0, e.i(383206).default)('star', [
            [
                'path',
                {
                    d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
                    key: 'r04s7s',
                },
            ],
        ]);
        var c = e.i(263942);
        let f = [
            {
                href: '/professional/dashboard',
                label: 'Dashboard',
                icon: i.LayoutDashboard,
            },
            {
                href: '/professional/availability',
                label: 'Disponibilidade',
                icon: l.CalendarCheck,
            },
            { href: '/professional/earning', label: 'Ganhos', icon: u.Wallet },
            { href: '/professional/review', label: 'Avaliações', icon: s },
        ];
        async function d(e) {
            for (let t of [
                '/api/professional/unit',
                '/api/professional/me',
                '/api/professional/profile',
            ])
                try {
                    let r = await fetch(t, {
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        signal: e,
                    });
                    if (!r.ok) continue;
                    let n = await r.json().catch(() => null);
                    if (!n) continue;
                    let a = n?.id && n?.name ? n : null,
                        o = n?.data ?? null,
                        i = o?.id && o?.name ? o : null,
                        l = o?.unit?.id && o?.unit?.name ? o.unit : null,
                        u = n?.unit?.id && n?.unit?.name ? n.unit : null,
                        s = a ?? i ?? l ?? u;
                    if (s?.id && s?.name) return s;
                } catch {}
            return null;
        }
        function p({ className: e, unit: i }) {
            let l = (0, a.usePathname)(),
                [u, s] = r.default.useState(i ?? null);
            return (
                r.default.useEffect(() => {
                    if (i) return void s(i);
                    let e = new AbortController();
                    return (
                        d(e.signal).then((e) => {
                            e && s(e);
                        }),
                        () => e.abort()
                    );
                }, [i]),
                (0, t.jsxs)('nav', {
                    className: (0, o.cn)(
                        'group fixed left-0 top-0 z-40 flex h-screen flex-col',
                        'border-r border-border-primary bg-background-primary',
                        'w-14 hover:w-55 transition-[width] duration-200 ease-in-out',
                        'pt-5 overflow-hidden',
                        e
                    ),
                    children: [
                        u?.name
                            ? (0, t.jsx)('div', {
                                  className: 'px-2 pb-3',
                                  children: (0, t.jsxs)('div', {
                                      className: (0, o.cn)('rounded-xl p-2'),
                                      children: [
                                          (0, t.jsxs)('div', {
                                              className:
                                                  'flex items-center gap-2 px-2 pb-2',
                                              children: [
                                                  (0, t.jsx)(c.Building2, {
                                                      className:
                                                          'h-4 w-4 shrink-0 text-content-brand',
                                                  }),
                                                  (0, t.jsx)('span', {
                                                      className: (0, o.cn)(
                                                          'text-label-small text-content-secondary whitespace-nowrap',
                                                          'opacity-0 -translate-x-1',
                                                          'transition-all duration-200',
                                                          'group-hover:opacity-100 group-hover:translate-x-0'
                                                      ),
                                                      children: 'Unidade',
                                                  }),
                                              ],
                                          }),
                                          (0, t.jsx)('div', {
                                              className: (0, o.cn)(
                                                  'opacity-0 -translate-x-1 pointer-events-none',
                                                  'transition-all duration-200',
                                                  'group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto'
                                              ),
                                              children: (0, t.jsx)('div', {
                                                  className: (0, o.cn)(
                                                      'h-9 w-full flex items-center px-3 rounded-lg',
                                                      'bg-background-secondary border border-border-primary',
                                                      'text-content-primary'
                                                  ),
                                                  title: u.name,
                                                  children: (0, t.jsx)('span', {
                                                      className:
                                                          'truncate text-label-small',
                                                      children: u.name,
                                                  }),
                                              }),
                                          }),
                                      ],
                                  }),
                              })
                            : null,
                        (0, t.jsx)('div', {
                            className: 'flex-1 space-y-1 px-2 pb-4',
                            children: f.map((e) => {
                                let r = l?.startsWith(e.href),
                                    a = e.icon;
                                return (0, t.jsxs)(
                                    n.default,
                                    {
                                        href: e.href,
                                        className: (0, o.cn)(
                                            'flex items-center gap-2 px-3 py-2 rounded-lg text-label-small transition-colors',
                                            'text-content-secondary hover:bg-background-tertiary/50',
                                            r &&
                                                'text-content-brand font-medium bg-background-tertiary/50'
                                        ),
                                        children: [
                                            (0, t.jsx)(a, {
                                                className: (0, o.cn)(
                                                    'h-4 w-4 shrink-0',
                                                    r
                                                        ? 'text-content-brand'
                                                        : 'text-content-secondary'
                                                ),
                                            }),
                                            (0, t.jsx)('span', {
                                                className: (0, o.cn)(
                                                    'whitespace-nowrap',
                                                    'opacity-0 -translate-x-1',
                                                    'transition-all duration-200',
                                                    'group-hover:opacity-100 group-hover:translate-x-0'
                                                ),
                                                children: e.label,
                                            }),
                                        ],
                                    },
                                    e.href
                                );
                            }),
                        }),
                    ],
                })
            );
        }
        e.s(['ProfessionalNav', () => p], 94988);
    },
]);
