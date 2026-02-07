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
    25657,
    (a) => {
        'use strict';
        a.i(106878);
        var b = a.i(154840),
            c = a.i(766518),
            d = a.i(126918),
            e = a.i(250181),
            f = a.i(972677);
        async function g() {
            let a = await (0, d.getCurrentPainelUser)();
            (a || (0, b.redirect)('/painel/login?error=credenciais'),
                'ADMIN' !== a.role &&
                    (0, b.redirect)('/painel/login?error=permissao'));
            let g = String(a.sub || '').trim(),
                h = String(a.companyId || '').trim();
            (g && h) || (0, b.redirect)('/painel/login?error=permissao');
            let i = await c.prisma.user.findUnique({
                where: { id: g },
                select: { id: !0, isActive: !0 },
            });
            (i?.id && i.isActive) ||
                (0, b.redirect)('/painel/login?error=permissao');
            let j = await c.prisma.companyMember.findFirst({
                where: {
                    userId: g,
                    companyId: h,
                    isActive: !0,
                    role: { in: ['OWNER', 'ADMIN'] },
                },
                select: { role: !0 },
            });
            (j?.role || (0, b.redirect)('/painel/login?error=permissao'),
                'OWNER' === j.role && (0, b.redirect)('/admin/dashboard'));
            let k = await c.prisma.adminAccess.findFirst({
                where: { companyId: h, userId: g },
                select: {
                    canAccessDashboard: !0,
                    canAccessReports: !0,
                    canAccessCheckout: !0,
                    canAccessAppointments: !0,
                    canAccessProfessionals: !0,
                    canAccessServices: !0,
                    canAccessReviews: !0,
                    canAccessProducts: !0,
                    canAccessClients: !0,
                    canAccessClientLevels: !0,
                    canAccessFinance: !0,
                    canAccessSettings: !0,
                },
            });
            k || (0, b.redirect)('/painel/login?error=permissao');
            let l = (function (a) {
                if (!a) return null;
                for (let b of e.ADMIN_MENU)
                    if (b.enabled && (0, f.canAccess)(a, b.menuKey))
                        return b.href;
                return null;
            })(k);
            (l || (0, b.redirect)('/painel/login?error=permissao'),
                (0, b.redirect)(l));
        }
        a.s(['default', () => g, 'dynamic', 0, 'force-dynamic']);
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8225cbaf._.js.map
