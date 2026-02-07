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
    120827,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            i = e.i(821498),
            n = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            d = e.i(528171),
            u = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            f = e.i(902769),
            h = e.i(46094),
            v = e.i(622730),
            m = e.i(811178),
            g = e.i(193695);
        e.i(629399);
        var w = e.i(377404),
            x = e.i(738342),
            y = e.i(387148),
            R = e.i(698043),
            A = e.i(212669);
        function E(e, t = 400) {
            return x.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function S(e) {
            return String(e ?? '').trim();
        }
        async function C(t) {
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
        async function I() {
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
                    i = String(t).trim() || 'https';
                if (!a) return '';
                return `${i}://${a}`;
            } catch {
                return '';
            }
        }
        async function P(e) {
            let t = String(e ?? '').trim();
            if (!t) return null;
            let r = t.toLowerCase();
            if (r.startsWith('http://') || r.startsWith('https://')) return t;
            let a = await I(),
                i = t.startsWith('/') ? t : `/${t}`;
            return a ? `${a}${i}` : i;
        }
        async function N(e) {
            let t = e?.params ? await e.params : void 0;
            return S(t?.professionalId);
        }
        async function b(e, t) {
            try {
                var r;
                let a,
                    i = await (0, A.requireAdminForModule)('PROFESSIONALS'),
                    n = String(i.companyId);
                if (!n) return E('Sessão inválida (companyId ausente).', 401);
                let s = await N(t);
                if (!s) return E('professionalId é obrigatório.', 400);
                let o = await e.json().catch(() => null);
                if (!o) return E('Body inválido (JSON).', 400);
                let l = await R.prisma.professional.findFirst({
                    where: { id: s, companyId: n },
                    select: {
                        id: !0,
                        companyId: !0,
                        name: !0,
                        email: !0,
                        phone: !0,
                        imageUrl: !0,
                        isActive: !0,
                        userId: !0,
                    },
                });
                if (!l) return E('Profissional não encontrado.', 404);
                let d = 'string' == typeof o.name ? S(o.name) : void 0,
                    u =
                        'string' == typeof o.email
                            ? S(o.email).toLowerCase()
                            : void 0,
                    p =
                        null === o.phone
                            ? null
                            : 'string' == typeof o.phone
                              ? S(o.phone)
                              : void 0,
                    c =
                        null === o.imageUrl
                            ? null
                            : 'string' == typeof o.imageUrl
                              ? S(o.imageUrl)
                              : void 0,
                    f = 'boolean' == typeof o.isActive ? o.isActive : void 0,
                    h = (function (e) {
                        if (void 0 === e) return;
                        if (!Array.isArray(e)) return [];
                        let t = e.map((e) => S(e)).filter(Boolean),
                            r = new Set(),
                            a = [];
                        for (let e of t) r.has(e) || (r.add(e), a.push(e));
                        return a;
                    })(o.unitIds),
                    v = 'string' == typeof o.password ? S(o.password) : void 0;
                if (void 0 !== d && !d) return E('Nome é obrigatório.', 400);
                if (void 0 !== u) {
                    if (!u) return E('E-mail é obrigatório.', 400);
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u))
                        return E('E-mail inválido.', 400);
                    if (
                        await R.prisma.professional.findFirst({
                            where: { companyId: n, email: u, id: { not: s } },
                            select: { id: !0 },
                        })
                    )
                        return E(
                            'Já existe um profissional com este e-mail.',
                            409
                        );
                }
                if (void 0 !== p && p) {
                    let e = String(p ?? '').replace(/\D/g, '');
                    if (10 !== e.length && 11 !== e.length)
                        return E('Telefone inválido.', 400);
                }
                if (void 0 !== v) {
                    if (!v) return E('Senha inválida.', 400);
                    if (v.length < 6)
                        return E('Senha deve ter no mínimo 6 caracteres.', 400);
                }
                if (void 0 !== h) {
                    if (0 === h.length)
                        return E('Selecione pelo menos 1 unidade ativa.', 400);
                    let e = await R.prisma.unit.findMany({
                            where: {
                                companyId: n,
                                id: { in: h },
                                isActive: !0,
                            },
                            select: { id: !0 },
                        }),
                        t = new Set(e.map((e) => e.id));
                    if (((a = h.filter((e) => t.has(e))), 0 === a.length))
                        return E(
                            'Nenhuma unidade válida/ativa encontrada.',
                            400
                        );
                }
                let m = await R.prisma.$transaction(async (e) => {
                    if (
                        (await e.professional.update({
                            where: { id: s },
                            data: {
                                ...(void 0 !== d ? { name: d } : {}),
                                ...(void 0 !== u ? { email: u } : {}),
                                ...(void 0 !== p ? { phone: p } : {}),
                                ...(void 0 !== c ? { imageUrl: c } : {}),
                                ...(void 0 !== f ? { isActive: f } : {}),
                            },
                        }),
                        a)
                    )
                        for (let t of (await e.professionalUnit.updateMany({
                            where: { companyId: n, professionalId: s },
                            data: { isActive: !1 },
                        }),
                        a))
                            await e.professionalUnit.upsert({
                                where: {
                                    professionalId_unitId: {
                                        professionalId: s,
                                        unitId: t,
                                    },
                                },
                                update: { isActive: !0 },
                                create: {
                                    companyId: n,
                                    professionalId: s,
                                    unitId: t,
                                    isActive: !0,
                                },
                            });
                    if (void 0 !== v) {
                        let t = await C(v),
                            r = u ?? l.email,
                            a = d ?? l.name,
                            i = void 0 !== p ? p : (l.phone ?? null),
                            n = l.userId ?? null;
                        if (n)
                            await e.user.update({
                                where: { id: n },
                                data: {
                                    passwordHash: t,
                                    isActive: !0,
                                    role: 'PROFESSIONAL',
                                    name: a,
                                    phone: i,
                                },
                            });
                        else {
                            let o = await e.user.findUnique({
                                where: { email: r },
                                select: { id: !0 },
                            });
                            (o
                                ? ((n = o.id),
                                  await e.user.update({
                                      where: { id: o.id },
                                      data: {
                                          passwordHash: t,
                                          isActive: !0,
                                          role: 'PROFESSIONAL',
                                          name: a,
                                          phone: i,
                                      },
                                  }))
                                : (n = (
                                      await e.user.create({
                                          data: {
                                              name: a,
                                              email: r,
                                              phone: i,
                                              role: 'PROFESSIONAL',
                                              passwordHash: t,
                                              isActive: !0,
                                          },
                                          select: { id: !0 },
                                      })
                                  ).id),
                                await e.professional.update({
                                    where: { id: s },
                                    data: { userId: n },
                                }));
                        }
                    }
                    return await e.professional.findUnique({
                        where: { id: s },
                        select: {
                            id: !0,
                            name: !0,
                            email: !0,
                            phone: !0,
                            imageUrl: !0,
                            isActive: !0,
                            userId: !0,
                            createdAt: !0,
                            updatedAt: !0,
                        },
                    });
                });
                if (!m) return E('Profissional não encontrado.', 404);
                return (
                    (r = { ...m, imageUrl: await P(m.imageUrl) }),
                    x.NextResponse.json({ ok: !0, data: r }, void 0)
                );
            } catch (t) {
                let e = 'string' == typeof t?.message ? t.message : '';
                if (e.includes('bcryptjs')) return E(e, 500);
                if ('P2002' === String(t?.code))
                    return E('Já existe um registro com estes dados.', 409);
                return E('Não autorizado.', 401);
            }
        }
        e.s(['PATCH', () => b, 'dynamic', 0, 'force-dynamic'], 247161);
        var O = e.i(247161);
        let U = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/professionals/[professionalId]/route',
                    pathname: '/api/admin/professionals/[professionalId]',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/professionals/[professionalId]/route.ts',
                nextConfigOutput: 'standalone',
                userland: O,
            }),
            {
                workAsyncStorage: _,
                workUnitAsyncStorage: T,
                serverHooks: j,
            } = U;
        function k() {
            return (0, a.patchFetch)({
                workAsyncStorage: _,
                workUnitAsyncStorage: T,
            });
        }
        async function q(e, t, a) {
            U.isDev &&
                (0, i.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let x = '/api/admin/professionals/[professionalId]/route';
            x = x.replace(/\/index$/, '') || '/';
            let y = await U.prepare(e, t, {
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
                    prerenderManifest: I,
                    routerServerContext: P,
                    isOnDemandRevalidate: N,
                    revalidateOnlyGenerated: b,
                    resolvedPathname: O,
                    clientReferenceManifest: _,
                    serverActionsManifest: T,
                } = y,
                j = (0, l.normalizeAppPath)(x),
                k = !!(I.dynamicRoutes[j] || I.routes[O]),
                q = async () => (
                    (null == P ? void 0 : P.render404)
                        ? await P.render404(e, t, S, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (k && !C) {
                let e = !!I.routes[O],
                    t = I.dynamicRoutes[j];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await q();
                    throw new g.NoFallbackError();
                }
            }
            let M = null;
            !k || U.isDev || C || (M = '/index' === (M = O) ? '/' : M);
            let H = !0 === U.isDev || !k,
                $ = k && !H;
            T &&
                _ &&
                (0, s.setReferenceManifestsSingleton)({
                    page: x,
                    clientReferenceManifest: _,
                    serverActionsManifest: T,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: T,
                    }),
                });
            let D = e.method || 'GET',
                F = (0, n.getTracer)(),
                L = F.getActiveScopeSpan(),
                B = {
                    params: A,
                    prerenderManifest: I,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!E.experimental.authInterrupts,
                        },
                        cacheComponents: !!E.cacheComponents,
                        supportsDynamicResponse: H,
                        incrementalCache: (0, i.getRequestMeta)(
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
                            U.onRequestError(e, t, a, P),
                    },
                    sharedContext: { buildId: R },
                },
                K = new d.NodeNextRequest(e),
                W = new d.NodeNextResponse(t),
                X = u.NextRequestAdapter.fromNodeNextRequest(
                    K,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        U.handle(X, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = F.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                p.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let a = r.get('next.route');
                            if (a) {
                                let t = `${D} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${D} ${x}`);
                        }),
                    o = !!(0, i.getRequestMeta)(e, 'minimalMode'),
                    l = async (i) => {
                        var n, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && N && b && !r)
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
                                    let n = await s(i);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let d = B.renderOpts.collectedTags;
                                    if (!k)
                                        return (
                                            await (0, f.sendResponse)(
                                                K,
                                                W,
                                                n,
                                                B.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await n.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                n.headers
                                            );
                                        (d && (t[m.NEXT_CACHE_TAGS_HEADER] = d),
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
                                                    m.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    m.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: w.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: n.status,
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
                                            (await U.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: x,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: $,
                                                        isOnDemandRevalidate: N,
                                                    }),
                                                },
                                                P
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await U.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: I,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: N,
                                revalidateOnlyGenerated: b,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!k) return null;
                        if (
                            (null == u || null == (n = u.value)
                                ? void 0
                                : n.kind) !== w.CachedRouteKind.APP_ROUTE
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
                                N
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
                        let p = (0, h.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && k) || p.delete(m.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, v.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, f.sendResponse)(
                                K,
                                W,
                                new Response(u.value.body, {
                                    headers: p,
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
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${D} ${x}`,
                                  kind: n.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': D,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof g.NoFallbackError ||
                        (await U.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: j,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: $,
                                isOnDemandRevalidate: N,
                            }),
                        })),
                    k)
                )
                    throw t;
                return (
                    await (0, f.sendResponse)(
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
                () => q,
                'patchFetch',
                () => k,
                'routeModule',
                () => U,
                'serverHooks',
                () => j,
                'workAsyncStorage',
                () => _,
                'workUnitAsyncStorage',
                () => T,
            ],
            120827
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

//# sourceMappingURL=%5Broot-of-the-server%5D__60039e8d._.js.map
