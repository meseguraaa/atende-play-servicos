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
    229182,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            i = e.i(493068),
            a = e.i(821498),
            n = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            l = e.i(337047),
            u = e.i(528171),
            d = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            h = e.i(46094),
            f = e.i(622730),
            g = e.i(811178),
            v = e.i(193695);
        e.i(629399);
        var y = e.i(377404),
            x = e.i(738342),
            R = e.i(387148),
            b = e.i(698043),
            w = e.i(212669);
        let E = 'admin_unit_context';
        function A(e, t) {
            return x.NextResponse.json({ ok: !0, data: e }, t);
        }
        function N(e, t = 400) {
            return x.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function P(e, t, r) {
            let i =
                'number' == typeof e
                    ? e
                    : Number(
                          String(e ?? '')
                              .trim()
                              .replace(',', '.')
                      );
            if (!Number.isFinite(i)) return t;
            let a = Math.floor(i);
            return Math.max(r?.min ?? -1 / 0, Math.min(r?.max ?? 1 / 0, a));
        }
        function C(e) {
            let t = String(e ?? '').trim();
            return t.length ? t : '';
        }
        async function S(e) {
            let t = e.session;
            if (!t?.canSeeAllUnits) return t?.unitId ?? null;
            let r = new URL(e.request.url).searchParams.get('unit');
            if (r && 'all' !== r) return r;
            if ('all' === r) return null;
            let i = await (0, R.cookies)(),
                a = i.get(E)?.value ?? 'all';
            return a && 'all' !== a ? a : null;
        }
        async function k(e) {
            let { companyId: t, activeUnitId: r } = e;
            return r &&
                (await b.prisma.unit.findFirst({
                    where: { id: r, companyId: t },
                    select: { id: !0 },
                }))
                ? r
                : null;
        }
        async function U(e) {
            try {
                let t = await (0, w.requireAdminForModule)('PRODUCTS'),
                    r = String(t?.companyId ?? '').trim();
                if (!r)
                    return N(
                        'Contexto inválido: companyId ausente (multi-tenant).',
                        401
                    );
                let i = await S({ session: t, request: e }),
                    a = await k({ companyId: r, activeUnitId: i });
                if (t?.canSeeAllUnits) {
                    let t = new URL(e.url).searchParams.get('unit');
                    t && (await (0, R.cookies)()).set(E, t, { path: '/' });
                }
                let n = await b.prisma.unit.findMany({
                        where: { companyId: r, ...(a ? { id: a } : {}) },
                        orderBy: { name: 'asc' },
                        select: { id: !0, name: !0, isActive: !0 },
                    }),
                    s = (
                        await b.prisma.product.findMany({
                            where: {
                                ...(a ? { unitId: a } : {}),
                                unit: { companyId: r },
                            },
                            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
                            select: {
                                id: !0,
                                name: !0,
                                imageUrl: !0,
                                description: !0,
                                price: !0,
                                professionalPercentage: !0,
                                category: !0,
                                stockQuantity: !0,
                                isActive: !0,
                                pickupDeadlineDays: !0,
                                unitId: !0,
                                isFeatured: !0,
                                birthdayBenefitEnabled: !0,
                                birthdayPriceLevel: !0,
                                unit: { select: { id: !0, name: !0 } },
                                discounts: {
                                    select: { level: !0, discountPct: !0 },
                                },
                            },
                        })
                    ).map((e) => {
                        let t = {};
                        for (let r of e.discounts ?? []) {
                            let e = Number(r.discountPct);
                            Number.isFinite(e) && (t[r.level] = e);
                        }
                        let r =
                            'number' == typeof e.pickupDeadlineDays &&
                            Number.isFinite(e.pickupDeadlineDays) &&
                            e.pickupDeadlineDays > 0
                                ? e.pickupDeadlineDays
                                : 2;
                        return {
                            id: e.id,
                            name: e.name,
                            imageUrl: String(e.imageUrl ?? ''),
                            description: e.description,
                            price: Number(e.price),
                            barberPercentage: Number(e.professionalPercentage),
                            category: e.category,
                            stockQuantity: e.stockQuantity,
                            isActive: e.isActive,
                            pickupDeadlineDays: r,
                            unitId: e.unit?.id ?? e.unitId,
                            unitName: e.unit?.name ?? '—',
                            birthdayBenefitEnabled: !!e.birthdayBenefitEnabled,
                            birthdayPriceLevel: e.birthdayPriceLevel ?? null,
                            isFeatured: !!e.isFeatured,
                            hasLevelPrices: (e.discounts?.length ?? 0) > 0,
                            levelDiscounts: t,
                        };
                    });
                return A({ products: s, units: n, activeUnitId: a });
            } catch {
                return N('Sem permissão para acessar Produtos.', 403);
            }
        }
        async function D(e) {
            try {
                var t, r;
                let i,
                    a,
                    n = await (0, w.requireAdminForModule)('PRODUCTS'),
                    s = String(n?.companyId ?? '').trim();
                if (!s)
                    return N(
                        'Contexto inválido: companyId ausente (multi-tenant).',
                        401
                    );
                let o = await e.json().catch(() => null);
                if (!o) return N('Body inválido.');
                let l = C(o.unitId),
                    u =
                        (n?.canSeeAllUnits
                            ? ''
                            : String(n?.unitId ?? '').trim()) || l;
                if (!u) return N('unitId é obrigatório.');
                if (
                    !(await b.prisma.unit.findFirst({
                        where: { id: u, companyId: s },
                        select: { id: !0, name: !0 },
                    }))
                )
                    return N('Unidade inválida para esta empresa.', 400);
                let d = C(o.name),
                    c =
                        ((t = o.imageUrl),
                        (i = String(t ?? '').trim()).length ? i : null),
                    p = C(o.description),
                    m = C(o.category);
                if (!d) return N('Nome é obrigatório.');
                if (
                    c &&
                    !(function (e) {
                        let t = String(e ?? '').trim();
                        if (!t) return !1;
                        let r = t.toLowerCase();
                        return (
                            !(
                                r.startsWith('javascript:') ||
                                r.startsWith('data:') ||
                                r.startsWith('blob:')
                            ) &&
                            !!(
                                t.startsWith('/uploads/') ||
                                t.startsWith('/media/') ||
                                r.startsWith('http://') ||
                                r.startsWith('https://')
                            )
                        );
                    })(c)
                )
                    return N(
                        'imageUrl inválida. Envie uma imagem (upload) ou forneça uma URL http(s) válida.',
                        400
                    );
                if (!p) return N('Descrição é obrigatória.');
                if (!m) return N('Categoria é obrigatória.');
                let h =
                    ((r = o.price),
                    (a = Number(
                        String(r ?? '')
                            .trim()
                            .replace(/\s/g, '')
                            .replace(',', '.')
                    )),
                    Number.isFinite(a) ? a : NaN);
                if (!Number.isFinite(h) || h <= 0) return N('Preço inválido.');
                let f = P(o.barberPercentage, 0, { min: 0, max: 100 });
                if (!Number.isFinite(f))
                    return N('Porcentagem do profissional inválida.');
                let g = P(o.stockQuantity, 0, { min: 0, max: 1e6 }),
                    v = P(o.pickupDeadlineDays, 2, { min: 1, max: 30 }),
                    y = 'boolean' != typeof o.isActive || o.isActive,
                    x = !!o.isFeatured,
                    R = !!o.birthdayBenefitEnabled,
                    E = R ? (o.birthdayPriceLevel ?? null) : null,
                    S = (function (e) {
                        if (!e || 'object' != typeof e) return {};
                        let t = {};
                        return (
                            ['BRONZE', 'PRATA', 'OURO', 'DIAMANTE'].forEach(
                                (r) => {
                                    let i = e[r];
                                    if (null == i || '' === String(i).trim())
                                        return;
                                    let a = P(i, 0, { min: 0, max: 100 });
                                    Number.isFinite(a) && (t[r] = a);
                                }
                            ),
                            t
                        );
                    })(o.levelDiscounts),
                    k = await b.prisma.product.create({
                        data: {
                            companyId: s,
                            unitId: u,
                            name: d,
                            imageUrl: c ?? '',
                            description: p,
                            price: h,
                            professionalPercentage: f,
                            category: m,
                            isActive: y,
                            isFeatured: x,
                            stockQuantity: g,
                            pickupDeadlineDays: v,
                            birthdayBenefitEnabled: R,
                            birthdayPriceLevel: E,
                            discounts: {
                                create: Object.entries(S).map(([e, t]) => ({
                                    companyId: s,
                                    level: e,
                                    discountPct: Number(t) || 0,
                                })),
                            },
                        },
                        select: { id: !0 },
                    });
                return A({ id: k.id }, { status: 201 });
            } catch {
                return N('Sem permissão para criar produtos.', 403);
            }
        }
        e.s(
            ['GET', () => U, 'POST', () => D, 'dynamic', 0, 'force-dynamic'],
            815869
        );
        var T = e.i(815869);
        let I = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/products/route',
                    pathname: '/api/admin/products',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/products/route.ts',
                nextConfigOutput: 'standalone',
                userland: T,
            }),
            {
                workAsyncStorage: O,
                workUnitAsyncStorage: M,
                serverHooks: j,
            } = I;
        function F() {
            return (0, i.patchFetch)({
                workAsyncStorage: O,
                workUnitAsyncStorage: M,
            });
        }
        async function q(e, t, i) {
            I.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let x = '/api/admin/products/route';
            x = x.replace(/\/index$/, '') || '/';
            let R = await I.prepare(e, t, {
                srcPage: x,
                multiZoneDraftMode: !1,
            });
            if (!R)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == i.waitUntil ||
                        i.waitUntil.call(i, Promise.resolve()),
                    null
                );
            let {
                    buildId: b,
                    params: w,
                    nextConfig: E,
                    parsedUrl: A,
                    isDraftMode: N,
                    prerenderManifest: P,
                    routerServerContext: C,
                    isOnDemandRevalidate: S,
                    revalidateOnlyGenerated: k,
                    resolvedPathname: U,
                    clientReferenceManifest: D,
                    serverActionsManifest: T,
                } = R,
                O = (0, l.normalizeAppPath)(x),
                M = !!(P.dynamicRoutes[O] || P.routes[U]),
                j = async () => (
                    (null == C ? void 0 : C.render404)
                        ? await C.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (M && !N) {
                let e = !!P.routes[U],
                    t = P.dynamicRoutes[O];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await j();
                    throw new v.NoFallbackError();
                }
            }
            let F = null;
            !M || I.isDev || N || (F = '/index' === (F = U) ? '/' : F);
            let q = !0 === I.isDev || !M,
                _ = M && !q;
            T &&
                D &&
                (0, s.setReferenceManifestsSingleton)({
                    page: x,
                    clientReferenceManifest: D,
                    serverActionsManifest: T,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: T,
                    }),
                });
            let H = e.method || 'GET',
                L = (0, n.getTracer)(),
                B = L.getActiveScopeSpan(),
                W = {
                    params: w,
                    prerenderManifest: P,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!E.experimental.authInterrupts,
                        },
                        cacheComponents: !!E.cacheComponents,
                        supportsDynamicResponse: q,
                        incrementalCache: (0, a.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: E.cacheLife,
                        waitUntil: i.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, i) =>
                            I.onRequestError(e, t, i, C),
                    },
                    sharedContext: { buildId: b },
                },
                $ = new u.NodeNextRequest(e),
                K = new u.NodeNextResponse(t),
                G = d.NextRequestAdapter.fromNodeNextRequest(
                    $,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        I.handle(G, W).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = L.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                c.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let i = r.get('next.route');
                            if (i) {
                                let t = `${H} ${i}`;
                                (e.setAttributes({
                                    'next.route': i,
                                    'http.route': i,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${H} ${x}`);
                        }),
                    o = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    l = async (a) => {
                        var n, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && S && k && !r)
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
                                    let n = await s(a);
                                    e.fetchMetrics = W.renderOpts.fetchMetrics;
                                    let l = W.renderOpts.pendingWaitUntil;
                                    l &&
                                        i.waitUntil &&
                                        (i.waitUntil(l), (l = void 0));
                                    let u = W.renderOpts.collectedTags;
                                    if (!M)
                                        return (
                                            await (0, m.sendResponse)(
                                                $,
                                                K,
                                                n,
                                                W.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await n.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                n.headers
                                            );
                                        (u && (t[g.NEXT_CACHE_TAGS_HEADER] = u),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    W.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    W.renderOpts
                                                        .collectedRevalidate >=
                                                    g.INFINITE_CACHE
                                                ) &&
                                                W.renderOpts
                                                    .collectedRevalidate,
                                            i =
                                                void 0 ===
                                                    W.renderOpts
                                                        .collectedExpire ||
                                                W.renderOpts.collectedExpire >=
                                                    g.INFINITE_CACHE
                                                    ? void 0
                                                    : W.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: y.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: n.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: r,
                                                expire: i,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await I.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: x,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: _,
                                                        isOnDemandRevalidate: S,
                                                    }),
                                                },
                                                C
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await I.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: F,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: P,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: S,
                                revalidateOnlyGenerated: k,
                                responseGenerator: u,
                                waitUntil: i.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!M) return null;
                        if (
                            (null == d || null == (n = d.value)
                                ? void 0
                                : n.kind) !== y.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == d || null == (l = d.value) ? void 0 : l.kind}`
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
                                S
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            N &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (o && M) || c.delete(g.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                $,
                                K,
                                new Response(d.value.body, {
                                    headers: c,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                B
                    ? await l(B)
                    : await L.withPropagatedContext(e.headers, () =>
                          L.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${H} ${x}`,
                                  kind: n.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': H,
                                      'http.target': e.url,
                                  },
                              },
                              l
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof v.NoFallbackError ||
                        (await I.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: O,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: _,
                                isOnDemandRevalidate: S,
                            }),
                        })),
                    M)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        $,
                        K,
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
                () => F,
                'routeModule',
                () => I,
                'serverHooks',
                () => j,
                'workAsyncStorage',
                () => O,
                'workUnitAsyncStorage',
                () => M,
            ],
            229182
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2aac1907._.js.map
