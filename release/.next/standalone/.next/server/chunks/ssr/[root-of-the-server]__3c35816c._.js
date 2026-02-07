module.exports = [
    193695,
    (a, b, c) => {
        b.exports = a.x(
            'next/dist/shared/lib/no-fallback-error.external.js',
            () => require('next/dist/shared/lib/no-fallback-error.external.js')
        );
    },
    650645,
    (a) => {
        a.n(a.i(827572));
    },
    262530,
    (a) => {
        a.n(a.i(688848));
    },
    409171,
    (a) => {
        a.n(a.i(753004));
    },
    21802,
    (a) => {
        a.n(a.i(277152));
    },
    155517,
    (a) => {
        a.n(a.i(298906));
    },
    444067,
    (a) => {
        a.n(a.i(436102));
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
    607393,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/admin/appointments/admin-appointments-client.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/admin/appointments/admin-appointments-client.tsx <module evaluation>',
            'default'
        );
        a.s(['default', 0, b]);
    },
    83684,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call the default export of [project]/src/app/admin/appointments/admin-appointments-client.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/app/admin/appointments/admin-appointments-client.tsx',
            'default'
        );
        a.s(['default', 0, b]);
    },
    810556,
    (a) => {
        'use strict';
        a.i(607393);
        var b = a.i(83684);
        a.n(b);
    },
    859262,
    (a) => {
        'use strict';
        var b = a.i(623127);
        a.i(106878);
        var c = a.i(154840),
            d = a.i(766518),
            e = a.i(28792),
            f = a.i(810556);
        function g(a) {
            let b = new URLSearchParams();
            (a.unit && b.set('unit', a.unit), a.date && b.set('date', a.date));
            let c = b.toString();
            return c ? `/admin/appointments?${c}` : '/admin/appointments';
        }
        async function h({ searchParams: a }) {
            let h,
                i,
                j,
                k,
                l,
                m,
                n,
                o = await (0, e.requireAdminForModule)('APPOINTMENTS'),
                p = o.companyId;
            p || (0, c.redirect)('/admin');
            let q = o.id;
            q || (0, c.redirect)('/admin');
            let r = o.canSeeAllUnits,
                { unit: s, date: t } = await a,
                u = r
                    ? await d.prisma.unit.findMany({
                          where: { companyId: p, isActive: !0 },
                          select: { id: !0, name: !0 },
                          orderBy: { name: 'asc' },
                      })
                    : await (async () => {
                          let a = (
                              await d.prisma.adminUnitAccess.findMany({
                                  where: { companyId: p, userId: q },
                                  select: { unitId: !0 },
                              })
                          )
                              .map((a) => a.unitId)
                              .filter(Boolean);
                          return a.length
                              ? d.prisma.unit.findMany({
                                    where: {
                                        companyId: p,
                                        isActive: !0,
                                        id: { in: a },
                                    },
                                    select: { id: !0, name: !0 },
                                    orderBy: { name: 'asc' },
                                })
                              : [];
                      })(),
                v = u.length > 0 ? u[0].id : null,
                w = (function (a) {
                    if (!a) return null;
                    let [b, c, d] = a.split('-').map(Number);
                    return b && c && d ? { y: b, m: c, d } : null;
                })(t),
                x =
                    w ??
                    ((h = new Date()),
                    (i = new Intl.DateTimeFormat('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }).formatToParts(h)),
                    (j = Number(i.find((a) => 'day' === a.type)?.value ?? '1')),
                    (k = Number(
                        i.find((a) => 'month' === a.type)?.value ?? '1'
                    )),
                    {
                        y: Number(
                            i.find((a) => 'year' === a.type)?.value ?? '1970'
                        ),
                        m: k,
                        d: j,
                    }),
                y =
                    ((l = String(x.y).padStart(4, '0')),
                    (m = String(x.m).padStart(2, '0')),
                    (n = String(x.d).padStart(2, '0')),
                    `${l}-${m}-${n}`);
            v &&
                (!s || 'all' === s) &&
                (0, c.redirect)(g({ unit: v, date: y }));
            let z = s && 'all' !== s ? s : v,
                A = z ? (u.find((a) => a.id === z) ?? null) : null;
            (z && !A && v && (0, c.redirect)(g({ unit: v, date: y })),
                !z ||
                    (t && w) ||
                    t === y ||
                    (0, c.redirect)(g({ unit: z, date: y })));
            let B =
                    A?.name ??
                    (r ? 'todas as unidades' : 'unidade selecionada'),
                { startUtc: C, endUtc: D } = (function (a) {
                    let { y: b, m: c, d } = a,
                        e = Date.UTC(b, c - 1, d, 3, 0, 0, 0),
                        f = Date.UTC(b, c - 1, d + 1, 3, 0, 0, 0);
                    return { startUtc: new Date(e), endUtc: new Date(f - 1) };
                })(x);
            if (!z)
                return (0, b.jsx)(f.default, {
                    scopeLabel: B,
                    date: y,
                    activeUnitId: null,
                    units: u,
                    appointments: [],
                    professionals: [],
                    services: [],
                    clients: [],
                });
            let [E, F, G, H] = await Promise.all([
                    d.prisma.appointment.findMany({
                        where: {
                            companyId: p,
                            unitId: z,
                            scheduleAt: { gte: C, lte: D },
                        },
                        orderBy: { scheduleAt: 'asc' },
                        include: {
                            professional: {
                                select: {
                                    id: !0,
                                    name: !0,
                                    imageUrl: !0,
                                    isActive: !0,
                                },
                            },
                            client: {
                                select: {
                                    id: !0,
                                    name: !0,
                                    phone: !0,
                                    image: !0,
                                    isActive: !0,
                                },
                            },
                            service: {
                                select: {
                                    id: !0,
                                    name: !0,
                                    durationMinutes: !0,
                                    price: !0,
                                    isActive: !0,
                                },
                            },
                        },
                    }),
                    d.prisma.professional.findMany({
                        where: {
                            companyId: p,
                            isActive: !0,
                            units: { some: { unitId: z, isActive: !0 } },
                        },
                        orderBy: { name: 'asc' },
                        select: {
                            id: !0,
                            name: !0,
                            imageUrl: !0,
                            isActive: !0,
                        },
                    }),
                    d.prisma.service.findMany({
                        where: {
                            companyId: p,
                            isActive: !0,
                            OR: [{ unitId: z }, { unitId: null }],
                        },
                        orderBy: { name: 'asc' },
                        select: {
                            id: !0,
                            name: !0,
                            durationMinutes: !0,
                            price: !0,
                            isActive: !0,
                            unitId: !0,
                        },
                    }),
                    d.prisma.user.findMany({
                        where: {
                            isActive: !0,
                            companyMemberships: {
                                some: {
                                    companyId: p,
                                    isActive: !0,
                                    role: 'CLIENT',
                                },
                            },
                        },
                        orderBy: { name: 'asc' },
                        take: 200,
                        select: { id: !0, name: !0, phone: !0 },
                    }),
                ]),
                I = E.map((a) => ({
                    id: a.id,
                    unitId: a.unitId,
                    clientId: a.clientId,
                    clientName: a.clientName,
                    phone: a.phone,
                    description: a.description,
                    scheduleAt: a.scheduleAt,
                    status: a.status,
                    professionalId: a.professionalId ?? null,
                    professional: a.professional
                        ? {
                              id: a.professional.id,
                              name: a.professional.name,
                              imageUrl: a.professional.imageUrl ?? null,
                          }
                        : null,
                    serviceId: a.serviceId ?? null,
                })),
                J = F.map((a) => ({
                    id: a.id,
                    name: a.name,
                    imageUrl: a.imageUrl ?? null,
                    isActive: a.isActive,
                })),
                K = G.map((a) => ({
                    id: a.id,
                    name: a.name,
                    durationMinutes: a.durationMinutes,
                    price: a.price ? Number(a.price) : void 0,
                    isActive: a.isActive,
                    unitId: a.unitId ?? null,
                })),
                L = H.map((a) => ({
                    id: a.id,
                    name: (a.name ?? '').trim(),
                    phone: (a.phone ?? '').trim() || null,
                })).filter((a) => a.name.length > 0);
            return (0, b.jsx)(f.default, {
                scopeLabel: B,
                date: y,
                activeUnitId: z,
                units: u,
                appointments: I,
                professionals: J,
                services: K,
                clients: L,
            });
        }
        a.s([
            'default',
            () => h,
            'dynamic',
            0,
            'force-dynamic',
            'metadata',
            0,
            { title: 'Admin | Agendamentos' },
        ]);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3c35816c._.js.map
