module.exports = [
    918622,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/compiled/next-server/app-page-turbo.runtime.prod.js',
            () =>
                require('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js')
        );
    },
    556704,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/server/app-render/work-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/work-async-storage.external.js')
        );
    },
    832319,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/server/app-render/work-unit-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/work-unit-async-storage.external.js')
        );
    },
    324725,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/server/app-render/after-task-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/after-task-async-storage.external.js')
        );
    },
    120635,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/server/app-render/action-async-storage.external.js',
            () =>
                require('next/dist/server/app-render/action-async-storage.external.js')
        );
    },
    386136,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            i = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            h = e.i(902769),
            m = e.i(46094),
            f = e.i(622730),
            v = e.i(811178),
            g = e.i(193695);
        e.i(629399);
        var w = e.i(377404),
            x = e.i(738342),
            y = e.i(387148),
            R = e.i(698043),
            A = e.i(212669);
        function E(e, t) {
            return x.NextResponse.json({ ok: !0, data: e }, t);
        }
        function S(e, t = 400) {
            return x.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function C(e) {
            return String(e ?? '').trim();
        }
        async function N(t) {
            try {
                let r = await e.A(989651),
                    a = await r.genSalt(10);
                return await r.hash(t, a);
            } catch {
                throw Error(
                    'Dependência de hash não encontrada (bcryptjs). Instale bcryptjs para usar senha.'
                );
            }
        }
        async function P() {
            try {
                let e = await (0, y.headers)(),
                    t = e.get('x-forwarded-proto') || 'https',
                    r =
                        e.get('x-forwarded-host') ||
                        e.get('host') ||
                        process.env.NEXT_PUBLIC_APP_URL?.replace(
                            /^https?:\/\//,
                            ''
                        ) ||
                        '',
                    a = String(r).trim(),
                    n = String(t).trim() || 'https';
                if (!a) return '';
                return `${n}://${a}`;
            } catch {
                return '';
            }
        }
        async function I(e) {
            let t = String(e ?? '').trim();
            if (!t) return null;
            let r = t.toLowerCase();
            if (r.startsWith('http://') || r.startsWith('https://')) return t;
            let a = await P(),
                n = t.startsWith('/') ? t : `/${t}`;
            return a ? `${a}${n}` : n;
        }
        async function O() {
            try {
                let e = await (0, A.requireAdminForModule)('PROFESSIONALS'),
                    t = String(e.companyId);
                if (!t) return S('Sessão inválida (companyId ausente).', 401);
                let r = await R.prisma.professional.findMany({
                        where: { companyId: t },
                        orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
                        include: {
                            units: {
                                where: { companyId: t },
                                include: { unit: !0 },
                                orderBy: { createdAt: 'asc' },
                            },
                        },
                    }),
                    a = await Promise.all(
                        r.map(async (e) => ({
                            id: e.id,
                            name: e.name,
                            email: e.email,
                            phone: e.phone,
                            isActive: e.isActive,
                            imageUrl: await I(e.imageUrl),
                            createdAt: e.createdAt,
                            updatedAt: e.updatedAt,
                            userId: e.userId,
                            units: e.units.map((e) => ({
                                id: e.unit.id,
                                name: e.unit.name,
                                isActive: e.unit.isActive,
                                linkIsActive: e.isActive,
                            })),
                        }))
                    );
                return E(a);
            } catch {
                return S('Não autorizado.', 401);
            }
        }
        async function b(e) {
            try {
                let t = await (0, A.requireAdminForModule)('PROFESSIONALS'),
                    r = String(t.companyId);
                if (!r) return S('Sessão inválida (companyId ausente).', 401);
                let a = await e.json().catch(() => null);
                if (!a) return S('Body inválido (JSON).', 400);
                let n = C(a.name),
                    i = C(a.email).toLowerCase(),
                    s = a.phone ? C(a.phone) : '',
                    o = s ? String(s ?? '').replace(/\D/g, '') : '',
                    l = s || null,
                    d = a.imageUrl ? C(a.imageUrl) : null,
                    u = (function (e) {
                        if (!Array.isArray(e)) return [];
                        let t = e.map((e) => C(e)).filter(Boolean),
                            r = new Set(),
                            a = [];
                        for (let e of t) r.has(e) || (r.add(e), a.push(e));
                        return a;
                    })(a.unitIds),
                    c = a.password ? C(a.password) : null;
                if (!n) return S('Nome é obrigatório.', 400);
                if (!i) return S('E-mail é obrigatório.', 400);
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i))
                    return S('E-mail inválido.', 400);
                if (l && 10 !== o.length && 11 !== o.length)
                    return S('Telefone inválido.', 400);
                if (0 === u.length)
                    return S('Selecione pelo menos 1 unidade ativa.', 400);
                let p = await R.prisma.unit.findMany({
                        where: { companyId: r, id: { in: u }, isActive: !0 },
                        select: { id: !0 },
                    }),
                    h = new Set(p.map((e) => e.id)),
                    m = u.filter((e) => h.has(e));
                if (0 === m.length)
                    return S('Nenhuma unidade válida/ativa encontrada.', 400);
                if (
                    await R.prisma.professional.findFirst({
                        where: { companyId: r, email: i },
                        select: { id: !0 },
                    })
                )
                    return S('Já existe um profissional com este e-mail.', 409);
                let f = null;
                if (c) {
                    if (c.length < 6)
                        return S('Senha deve ter no mínimo 6 caracteres.', 400);
                    let e = await N(c),
                        t = await R.prisma.user.findUnique({
                            where: { email: i },
                            select: { id: !0 },
                        });
                    t
                        ? ((f = t.id),
                          await R.prisma.user.update({
                              where: { id: t.id },
                              data: {
                                  name: n,
                                  phone: l,
                                  role: 'PROFESSIONAL',
                                  passwordHash: e,
                                  isActive: !0,
                              },
                          }))
                        : (f = (
                              await R.prisma.user.create({
                                  data: {
                                      name: n,
                                      email: i,
                                      phone: l,
                                      role: 'PROFESSIONAL',
                                      passwordHash: e,
                                      isActive: !0,
                                  },
                                  select: { id: !0 },
                              })
                          ).id);
                }
                let v = await R.prisma.$transaction(async (e) => {
                    let t = await e.professional.create({
                        data: {
                            companyId: r,
                            name: n,
                            email: i,
                            phone: l,
                            imageUrl: d,
                            isActive: !0,
                            userId: f,
                        },
                    });
                    return (
                        await e.professionalUnit.createMany({
                            data: m.map((e) => ({
                                companyId: r,
                                professionalId: t.id,
                                unitId: e,
                                isActive: !0,
                            })),
                            skipDuplicates: !0,
                        }),
                        t
                    );
                });
                return E(
                    {
                        id: v.id,
                        name: v.name,
                        email: v.email,
                        phone: v.phone,
                        imageUrl: await I(v.imageUrl),
                        isActive: v.isActive,
                        createdAt: v.createdAt,
                        updatedAt: v.updatedAt,
                        userId: v.userId,
                    },
                    { status: 201 }
                );
            } catch (t) {
                let e = 'string' == typeof t?.message ? t.message : '';
                if (e.includes('bcryptjs')) return S(e, 500);
                if ('P2002' === String(t?.code))
                    return S('Já existe um registro com estes dados.', 409);
                return S('Não autorizado.', 401);
            }
        }
        e.s(
            ['GET', () => O, 'POST', () => b, 'dynamic', 0, 'force-dynamic'],
            862795
        );
        var _ = e.i(862795);
        let T = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/professionals/route',
                    pathname: '/api/admin/professionals',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/professionals/route.ts',
                nextConfigOutput: 'standalone',
                userland: _,
            }),
            {
                workAsyncStorage: j,
                workUnitAsyncStorage: U,
                serverHooks: k,
            } = T;
        function q() {
            return (0, a.patchFetch)({
                workAsyncStorage: j,
                workUnitAsyncStorage: U,
            });
        }
        async function M(e, t, a) {
            T.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let x = '/api/admin/professionals/route';
            x = x.replace(/\/index$/, '') || '/';
            let y = await T.prepare(e, t, {
                srcPage: x,
                multiZoneDraftMode: !1,
            });
            if (!y)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: R,
                    params: A,
                    nextConfig: E,
                    parsedUrl: S,
                    isDraftMode: C,
                    prerenderManifest: N,
                    routerServerContext: P,
                    isOnDemandRevalidate: I,
                    revalidateOnlyGenerated: O,
                    resolvedPathname: b,
                    clientReferenceManifest: _,
                    serverActionsManifest: j,
                } = y,
                U = (0, l.normalizeAppPath)(x),
                k = !!(N.dynamicRoutes[U] || N.routes[b]),
                q = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, S, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (k && !C) {
                let e = !!N.routes[b],
                    t = N.dynamicRoutes[U];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await q();
                    throw new g.NoFallbackError();
                }
            }
            let M = null;
            !k || T.isDev || C || (M = '/index' === (M = b) ? '/' : M);
            let H = !0 === T.isDev || !k,
                D = k && !H;
            j &&
                _ &&
                (0, s.setReferenceManifestsSingleton)({
                    page: x,
                    clientReferenceManifest: _,
                    serverActionsManifest: j,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let $ = e.method || 'GET',
                F = (0, i.getTracer)(),
                L = F.getActiveScopeSpan(),
                B = {
                    params: A,
                    prerenderManifest: N,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!E.experimental.authInterrupts,
                        },
                        cacheComponents: !!E.cacheComponents,
                        supportsDynamicResponse: H,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: E.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            T.onRequestError(e, t, a, P),
                    },
                    sharedContext: { buildId: R },
                },
                K = new d.NodeNextRequest(e),
                W = new d.NodeNextResponse(t),
                G = u.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        T.handle(G, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = F.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                c.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = r.get('next.route');
                            if (a) {
                                let t = `${$} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${$} ${x}`);
                        }),
                    o = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && I && O && !r)
                                        return (
                                            (t.statusCode = 404),
                                            t.setHeader(
                                                'x-nextjs-cache',
                                                'REVALIDATED'
                                            ),
                                            t.end(
                                                'This page could not be found'
                                            ),
                                            null
                                        );
                                    let i = await s(n);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let d = B.renderOpts.collectedTags;
                                    if (!k)
                                        return (
                                            await (0, h.sendResponse)(
                                                K,
                                                W,
                                                i,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (d && (t[v.NEXT_CACHE_TAGS_HEADER] = d),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    B.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    B.renderOpts
                                                        .collectedRevalidate >=
                                                    v.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    v.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: w.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: i.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: r,
                                                expire: a,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await T.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: x,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: I,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await T.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: N,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: I,
                                revalidateOnlyGenerated: O,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!k) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== w.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == u || null == (l = u.value) ? void 0 : l.kind}`
                                ),
                                '__NEXT_ERROR_CODE',
                                {
                                    value: 'E701',
                                    enumerable: !1,
                                    configurable: !0,
                                }
                            );
                        (o ||
                            t.setHeader(
                                'x-nextjs-cache',
                                I
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            C &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, m.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && k) || c.delete(v.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                K,
                                W,
                                new Response(u.value.body, {
                                    headers: c,
                                    status: u.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                L
                    ? await l(L)
                    : await F.withPropagatedContext(e.headers, () =>
                          F.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${$} ${x}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': $,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof g.NoFallbackError ||
                        (await T.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: U,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: I,
                            }),
                        })),
                    k)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
                        K,
                        W,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => M,
                'patchFetch',
                () => q,
                'routeModule',
                () => T,
                'serverHooks',
                () => k,
                'workAsyncStorage',
                () => j,
                'workUnitAsyncStorage',
                () => U,
            ],
            386136
        );
    },
    989651,
    (e) => {
        e.v((t) =>
            Promise.all(
                [
                    'server/chunks/[externals]_crypto_c412f66b._.js',
                    'server/chunks/2f573_bcryptjs_index_6869504d.js',
                ].map((t) => e.l(t))
            ).then(() => t(735796))
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3fd35e66._.js.map
