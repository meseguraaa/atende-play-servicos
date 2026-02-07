module.exports = [
    795661,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call UnitFilter() from the server but UnitFilter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/reports/unit-filter/unit-filter.tsx <module evaluation>',
            'UnitFilter'
        );
        a.s(['UnitFilter', 0, b]);
    },
    52347,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call UnitFilter() from the server but UnitFilter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/admin/reports/unit-filter/unit-filter.tsx',
            'UnitFilter'
        );
        a.s(['UnitFilter', 0, b]);
    },
    790993,
    (a) => {
        'use strict';
        a.i(795661);
        var b = a.i(52347);
        a.n(b);
    },
    23677,
    (a) => {
        'use strict';
        (a.i(790993), a.s([]));
    },
    28792,
    (a) => {
        'use strict';
        a.i(106878);
        var b = a.i(154840);
        a.i(330127);
        var c = a.i(766518),
            d = a.i(126918);
        a.i(110329);
        let e = {
            canAccessDashboard: !0,
            canAccessReports: !0,
            canAccessCheckout: !0,
            canAccessAppointments: !0,
            canAccessProfessionals: !0,
            canAccessServices: !0,
            canAccessReviews: !0,
            canAccessProducts: !0,
            canAccessPartners: !0,
            canAccessClients: !0,
            canAccessClientLevels: !0,
            canAccessFinance: !0,
            canAccessSettings: !0,
        };
        function f(a) {
            switch (a) {
                case 'DASHBOARD':
                    return 'canAccessDashboard';
                case 'REPORTS':
                    return 'canAccessReports';
                case 'CHECKOUT':
                    return 'canAccessCheckout';
                case 'APPOINTMENTS':
                    return 'canAccessAppointments';
                case 'PROFESSIONALS':
                    return 'canAccessProfessionals';
                case 'SERVICES':
                    return 'canAccessServices';
                case 'REVIEWS':
                    return 'canAccessReviews';
                case 'PRODUCTS':
                    return 'canAccessProducts';
                case 'PARTNERS':
                default:
                    return null;
                case 'CLIENTS':
                    return 'canAccessClients';
                case 'CLIENT_LEVELS':
                    return 'canAccessClientLevels';
                case 'FINANCE':
                    return 'canAccessFinance';
                case 'SETTINGS':
                    return 'canAccessSettings';
            }
        }
        async function g() {
            let a = await (0, d.getCurrentPainelUser)();
            if (!a) return { ok: !1, reason: 'no_session' };
            if ('ADMIN' !== a.role) return { ok: !1, reason: 'not_admin' };
            let b = String(a.sub || '').trim(),
                e = String(a.companyId || '').trim();
            if (!b || !e) return { ok: !1, reason: 'invalid_token' };
            let f = await c.prisma.user.findUnique({
                where: { id: b },
                select: { id: !0, name: !0, email: !0, isActive: !0 },
            });
            if (!f?.id || !f.isActive)
                return { ok: !1, reason: 'user_inactive' };
            let g = await c.prisma.companyMember.findFirst({
                where: {
                    userId: b,
                    companyId: e,
                    isActive: !0,
                    role: { in: ['OWNER', 'ADMIN'] },
                },
                select: { role: !0 },
            });
            if (!g?.role) return { ok: !1, reason: 'no_membership' };
            let h = 'OWNER' === g.role;
            if (!h) {
                let a = await c.prisma.adminAccess.findFirst({
                    where: { userId: b, companyId: e },
                    select: { id: !0 },
                });
                if (!a?.id) return { ok: !1, reason: 'no_access' };
            }
            return {
                ok: !0,
                ctx: {
                    id: f.id,
                    name: f.name ?? null,
                    email: f.email,
                    companyId: e,
                    isOwner: h,
                },
            };
        }
        let h = [
            { module: 'APPOINTMENTS', href: '/admin/appointments' },
            { module: 'CHECKOUT', href: '/admin/checkout' },
            { module: 'PROFESSIONALS', href: '/admin/professionals' },
            { module: 'SERVICES', href: '/admin/services' },
            { module: 'PRODUCTS', href: '/admin/products' },
            { module: 'CLIENTS', href: '/admin/clients' },
            { module: 'CLIENT_LEVELS', href: '/admin/client-levels' },
            { module: 'REVIEWS', href: '/admin/review-tags' },
            { module: 'REPORTS', href: '/admin/reports' },
            { module: 'FINANCE', href: '/admin/finance' },
            { module: 'SETTINGS', href: '/admin/setting' },
            { module: 'DASHBOARD', href: '/admin/dashboard' },
        ];
        async function i(a) {
            let d = (function (a) {
                if (!a) return null;
                for (let b of h) {
                    let c = f(b.module);
                    if (c && a[c]) return b.href;
                }
                return null;
            })(
                await c.prisma.adminAccess.findFirst({
                    where: { companyId: a.companyId, userId: a.userId },
                    select: e,
                })
            );
            if (d)
                throw (
                    (0, b.redirect)(`${d}?error=permissao`),
                    Error('unreachable')
                );
            throw (
                (0, b.redirect)('/painel/login?error=permissao'),
                Error('unreachable')
            );
        }
        async function j(a) {
            let d = await g();
            d.ok ||
                (function (a) {
                    switch (a) {
                        case 'no_session':
                            (0, b.redirect)('/painel/login?error=credenciais');
                        case 'not_admin':
                            (0, b.redirect)('/painel/login?error=permissao');
                        default:
                            (0, b.redirect)('/painel/login?error=permissao');
                    }
                })(d.reason);
            let h = d.ctx;
            if (h.isOwner) {
                if ('PARTNERS' === a)
                    throw (
                        await i({ companyId: h.companyId, userId: h.id }),
                        Error('unreachable')
                    );
                return {
                    id: h.id,
                    name: h.name,
                    email: h.email,
                    role: 'ADMIN',
                    isOwner: !0,
                    companyId: h.companyId,
                    unitId: null,
                    canSeeAllUnits: !0,
                };
            }
            let j = f(a);
            if (!j)
                throw (
                    await i({ companyId: h.companyId, userId: h.id }),
                    Error('unreachable')
                );
            let k = await c.prisma.adminAccess.findFirst({
                where: { userId: h.id, companyId: h.companyId },
                select: e,
            });
            if (!k || !k[j])
                throw (
                    await i({ companyId: h.companyId, userId: h.id }),
                    Error('unreachable')
                );
            return {
                id: h.id,
                name: h.name,
                email: h.email,
                role: 'ADMIN',
                isOwner: !1,
                companyId: h.companyId,
                unitId: null,
                canSeeAllUnits: !1,
            };
        }
        a.s(['requireAdminForModule', () => j]);
    },
    638904,
    18351,
    708111,
    (a) => {
        'use strict';
        let b, c, d;
        var e = a.i(623127),
            f = a.i(149919);
        function g(a, b) {
            if ('function' == typeof a) return a(b);
            null != a && (a.current = b);
        }
        var h = Symbol.for('react.lazy'),
            i = f[' use '.trim().toString()];
        function j(a) {
            var b;
            return (
                null != a &&
                'object' == typeof a &&
                '$$typeof' in a &&
                a.$$typeof === h &&
                '_payload' in a &&
                'object' == typeof (b = a._payload) &&
                null !== b &&
                'then' in b
            );
        }
        var k =
                (((d = f.forwardRef((a, b) => {
                    let { children: c, ...d } = a;
                    if (
                        (j(c) && 'function' == typeof i && (c = i(c._payload)),
                        f.isValidElement(c))
                    ) {
                        var e;
                        let a,
                            h,
                            i =
                                ((e = c),
                                (h =
                                    (a = Object.getOwnPropertyDescriptor(
                                        e.props,
                                        'ref'
                                    )?.get) &&
                                    'isReactWarning' in a &&
                                    a.isReactWarning)
                                    ? e.ref
                                    : (h =
                                            (a =
                                                Object.getOwnPropertyDescriptor(
                                                    e,
                                                    'ref'
                                                )?.get) &&
                                            'isReactWarning' in a &&
                                            a.isReactWarning)
                                      ? e.props.ref
                                      : e.props.ref || e.ref),
                            j = (function (a, b) {
                                let c = { ...b };
                                for (let d in b) {
                                    let e = a[d],
                                        f = b[d];
                                    /^on[A-Z]/.test(d)
                                        ? e && f
                                            ? (c[d] = (...a) => {
                                                  let b = f(...a);
                                                  return (e(...a), b);
                                              })
                                            : e && (c[d] = e)
                                        : 'style' === d
                                          ? (c[d] = { ...e, ...f })
                                          : 'className' === d &&
                                            (c[d] = [e, f]
                                                .filter(Boolean)
                                                .join(' '));
                                }
                                return { ...a, ...c };
                            })(d, c.props);
                        return (
                            c.type !== f.Fragment &&
                                (j.ref = b
                                    ? (function (...a) {
                                          return (b) => {
                                              let c = !1,
                                                  d = a.map((a) => {
                                                      let d = g(a, b);
                                                      return (
                                                          c ||
                                                              'function' !=
                                                                  typeof d ||
                                                              (c = !0),
                                                          d
                                                      );
                                                  });
                                              if (c)
                                                  return () => {
                                                      for (
                                                          let b = 0;
                                                          b < d.length;
                                                          b++
                                                      ) {
                                                          let c = d[b];
                                                          'function' == typeof c
                                                              ? c()
                                                              : g(a[b], null);
                                                      }
                                                  };
                                          };
                                      })(b, i)
                                    : i),
                            f.cloneElement(c, j)
                        );
                    }
                    return f.Children.count(c) > 1
                        ? f.Children.only(null)
                        : null;
                })).displayName = 'Slot.SlotClone'),
                (b = d),
                ((c = f.forwardRef((a, c) => {
                    let { children: d, ...g } = a;
                    j(d) && 'function' == typeof i && (d = i(d._payload));
                    let h = f.Children.toArray(d),
                        k = h.find(m);
                    if (k) {
                        let a = k.props.children,
                            d = h.map((b) =>
                                b !== k
                                    ? b
                                    : f.Children.count(a) > 1
                                      ? f.Children.only(null)
                                      : f.isValidElement(a)
                                        ? a.props.children
                                        : null
                            );
                        return (0, e.jsx)(b, {
                            ...g,
                            ref: c,
                            children: f.isValidElement(a)
                                ? f.cloneElement(a, void 0, d)
                                : null,
                        });
                    }
                    return (0, e.jsx)(b, { ...g, ref: c, children: d });
                })).displayName = 'Slot.Slot'),
                c),
            l = Symbol('radix.slottable');
        function m(a) {
            return (
                f.isValidElement(a) &&
                'function' == typeof a.type &&
                '__radixId' in a.type &&
                a.type.__radixId === l
            );
        }
        a.s(['Slot', () => k], 18351);
        var n = a.i(668962);
        let o = (a) => ('boolean' == typeof a ? `${a}` : 0 === a ? '0' : a),
            p = n.clsx,
            q = (a, b) => (c) => {
                var d;
                if ((null == b ? void 0 : b.variants) == null)
                    return p(
                        a,
                        null == c ? void 0 : c.class,
                        null == c ? void 0 : c.className
                    );
                let { variants: e, defaultVariants: f } = b,
                    g = Object.keys(e).map((a) => {
                        let b = null == c ? void 0 : c[a],
                            d = null == f ? void 0 : f[a];
                        if (null === b) return null;
                        let g = o(b) || o(d);
                        return e[a][g];
                    }),
                    h =
                        c &&
                        Object.entries(c).reduce((a, b) => {
                            let [c, d] = b;
                            return (void 0 === d || (a[c] = d), a);
                        }, {});
                return p(
                    a,
                    g,
                    null == b || null == (d = b.compoundVariants)
                        ? void 0
                        : d.reduce((a, b) => {
                              let { class: c, className: d, ...e } = b;
                              return Object.entries(e).every((a) => {
                                  let [b, c] = a;
                                  return Array.isArray(c)
                                      ? c.includes({ ...f, ...h }[b])
                                      : { ...f, ...h }[b] === c;
                              })
                                  ? [...a, c, d]
                                  : a;
                          }, []),
                    null == c ? void 0 : c.class,
                    null == c ? void 0 : c.className
                );
            };
        a.s(['cva', 0, q], 708111);
        var r = a.i(139138);
        let s = q(
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
        function t({
            className: a,
            variant: b,
            size: c,
            asChild: d = !1,
            ...f
        }) {
            return (0, e.jsx)(d ? k : 'button', {
                'data-slot': 'button',
                className: (0, r.cn)(s({ variant: b, size: c, className: a })),
                ...f,
            });
        }
        a.s(['Button', () => t, 'buttonVariants', () => s], 638904);
    },
    583376,
    (a, b, c) => {
        let { createClientModuleProxy: d } = a.r(976286);
        a.n(
            d(
                '[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js <module evaluation>'
            )
        );
    },
    777934,
    (a, b, c) => {
        let { createClientModuleProxy: d } = a.r(976286);
        a.n(
            d(
                '[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js'
            )
        );
    },
    766865,
    (a) => {
        'use strict';
        a.i(583376);
        var b = a.i(777934);
        a.n(b);
    },
    468695,
    (a, b, c) => {
        'use strict';
        Object.defineProperty(c, '__esModule', { value: !0 });
        var d = {
            default: function () {
                return i;
            },
            useLinkStatus: function () {
                return h.useLinkStatus;
            },
        };
        for (var e in d)
            Object.defineProperty(c, e, { enumerable: !0, get: d[e] });
        let f = a.r(254508),
            g = a.r(623127),
            h = f._(a.r(766865));
        function i(a) {
            let b = a.legacyBehavior,
                c =
                    'string' == typeof a.children ||
                    'number' == typeof a.children ||
                    'string' == typeof a.children?.type,
                d =
                    a.children?.type?.$$typeof ===
                    Symbol.for('react.client.reference');
            return (
                !b ||
                    c ||
                    d ||
                    (a.children?.type?.$$typeof === Symbol.for('react.lazy')
                        ? console.error(
                              "Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."
                          )
                        : console.error(
                              "Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag."
                          )),
                (0, g.jsx)(h.default, { ...a })
            );
        }
        ('function' == typeof c.default ||
            ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }),
            Object.assign(c.default, c),
            (b.exports = c.default));
    },
    5408,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call MonthPicker() from the server but MonthPicker is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/month-picker/month-picker.tsx <module evaluation>',
            'MonthPicker'
        );
        a.s(['MonthPicker', 0, b]);
    },
    897710,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call MonthPicker() from the server but MonthPicker is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/month-picker/month-picker.tsx',
            'MonthPicker'
        );
        a.s(['MonthPicker', 0, b]);
    },
    868313,
    (a) => {
        'use strict';
        a.i(5408);
        var b = a.i(897710);
        a.n(b);
    },
    56672,
    (a) => {
        'use strict';
        (a.i(868313), a.s([]));
    },
];

//# sourceMappingURL=_5d76f4b3._.js.map
