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
    753339,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            i = e.i(493068),
            a = e.i(821498),
            n = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            d = e.i(337047),
            l = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            h = e.i(46094),
            v = e.i(622730),
            f = e.i(811178),
            g = e.i(193695);
        e.i(629399);
        var y = e.i(377404),
            b = e.i(738342),
            x = e.i(698043),
            R = e.i(212669);
        function w(e, t) {
            return b.NextResponse.json({ ok: !0, data: e }, t);
        }
        function E(e, t = 400) {
            return b.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function P(e) {
            let t = String(e ?? '').trim();
            return t.length ? t : '';
        }
        function A(e, t, r) {
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
        async function N(e, t) {
            try {
                var r;
                let i,
                    a = await (0, R.requireAdminForModule)('PRODUCTS'),
                    n = P(a?.companyId);
                if (!n)
                    return E(
                        'Contexto inválido: companyId ausente (multi-tenant).',
                        401
                    );
                let { productId: o } = await t.params,
                    s = P(o);
                if (!s) return E('productId é obrigatório.', 400);
                let d = await e.json().catch(() => null);
                if (!d) return E('Body inválido.', 400);
                let l = a?.canSeeAllUnits ? null : P(a?.unitId),
                    u = await x.prisma.product.findFirst({
                        where: {
                            id: s,
                            companyId: n,
                            ...(l ? { unitId: l } : {}),
                        },
                        select: {
                            id: !0,
                            unitId: !0,
                            isActive: !0,
                            isFeatured: !0,
                            name: !0,
                            imageUrl: !0,
                            description: !0,
                            category: !0,
                            price: !0,
                            professionalPercentage: !0,
                            stockQuantity: !0,
                            pickupDeadlineDays: !0,
                            birthdayBenefitEnabled: !0,
                            birthdayPriceLevel: !0,
                            discounts: {
                                select: { level: !0, discountPct: !0 },
                            },
                        },
                    });
                if (!u)
                    return E(
                        'Produto não encontrado (ou fora do seu escopo).',
                        404
                    );
                if ('toggleActive' in d && !0 === d.toggleActive) {
                    let e = await x.prisma.product.update({
                        where: { id: u.id },
                        data: { isActive: !u.isActive },
                        select: { id: !0, isActive: !0 },
                    });
                    return w({ id: e.id, isActive: e.isActive });
                }
                if (
                    !('update' in d) ||
                    !d.update ||
                    'object' != typeof d.update
                )
                    return E('Patch inválido.', 400);
                let c = d.update,
                    p = void 0 !== c.name ? P(c.name) : u.name,
                    m = u.imageUrl ?? '';
                if (void 0 !== c.imageUrl) {
                    let e = String(c.imageUrl ?? '').trim(),
                        t = e.toLowerCase();
                    if (e)
                        if (t.startsWith('blob:')) m = u.imageUrl ?? '';
                        else {
                            if (
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
                                })(e)
                            )
                                return E(
                                    'imageUrl inválida. Use /media/... (do nosso upload), /uploads/... (legado) ou uma URL http(s) válida.',
                                    400
                                );
                            m = e;
                        }
                    else m = '';
                }
                let h =
                        void 0 !== c.description
                            ? P(c.description)
                            : u.description,
                    v = void 0 !== c.category ? P(c.category) : u.category;
                if (!p) return E('Nome é obrigatório.', 400);
                if (!h) return E('Descrição é obrigatória.', 400);
                if (!v) return E('Categoria é obrigatória.', 400);
                let f =
                    ((r = void 0 !== c.price ? c.price : Number(u.price)),
                    (i = Number(
                        String(r ?? '')
                            .trim()
                            .replace(/\s/g, '')
                            .replace(',', '.')
                    )),
                    Number.isFinite(i) ? i : NaN);
                if (!Number.isFinite(f) || f <= 0)
                    return E('Preço inválido.', 400);
                let g =
                        void 0 !== c.barberPercentage
                            ? c.barberPercentage
                            : Number(u.professionalPercentage),
                    y = A(g, 0, { min: 0, max: 100 });
                if (!Number.isFinite(y))
                    return E('Porcentagem do profissional inválida.', 400);
                let b =
                        void 0 !== c.stockQuantity
                            ? c.stockQuantity
                            : u.stockQuantity,
                    N = A(b, 0, { min: 0, max: 1e6 }),
                    C =
                        void 0 !== c.pickupDeadlineDays
                            ? c.pickupDeadlineDays
                            : (u.pickupDeadlineDays ?? 2),
                    k = A(C, 2, { min: 1, max: 30 }),
                    D =
                        'boolean' == typeof c.isFeatured
                            ? c.isFeatured
                            : !!u.isFeatured,
                    I =
                        'boolean' == typeof c.birthdayBenefitEnabled
                            ? c.birthdayBenefitEnabled
                            : !!u.birthdayBenefitEnabled,
                    U = I
                        ? void 0 !== c.birthdayPriceLevel
                            ? c.birthdayPriceLevel
                            : (u.birthdayPriceLevel ?? null)
                        : null,
                    S = void 0 !== c.levelDiscounts,
                    T = S
                        ? (function (e) {
                              if (!e || 'object' != typeof e) return {};
                              let t = {};
                              return (
                                  [
                                      'BRONZE',
                                      'PRATA',
                                      'OURO',
                                      'DIAMANTE',
                                  ].forEach((r) => {
                                      let i = e[r];
                                      if (null == i || '' === String(i).trim())
                                          return;
                                      let a = A(i, 0, { min: 0, max: 100 });
                                      Number.isFinite(a) && (t[r] = a);
                                  }),
                                  t
                              );
                          })(c.levelDiscounts)
                        : (() => {
                              let e = {};
                              for (let t of u.discounts ?? []) {
                                  let r = Number(t.discountPct);
                                  Number.isFinite(r) && (e[t.level] = r);
                              }
                              return e;
                          })(),
                    O = await x.prisma.$transaction(async (e) => {
                        let t = await e.product.update({
                            where: { id: u.id },
                            data: {
                                name: p,
                                imageUrl: m,
                                description: h,
                                category: v,
                                price: f,
                                professionalPercentage: y,
                                stockQuantity: N,
                                pickupDeadlineDays: k,
                                isFeatured: D,
                                birthdayBenefitEnabled: I,
                                birthdayPriceLevel: U,
                            },
                            select: {
                                id: !0,
                                isActive: !0,
                                isFeatured: !0,
                                name: !0,
                                imageUrl: !0,
                                description: !0,
                                category: !0,
                                price: !0,
                                professionalPercentage: !0,
                                stockQuantity: !0,
                                pickupDeadlineDays: !0,
                                birthdayBenefitEnabled: !0,
                                birthdayPriceLevel: !0,
                            },
                        });
                        if (S) {
                            await e.productDiscountByLevel.deleteMany({
                                where: { companyId: n, productId: u.id },
                            });
                            let t = Object.entries(T);
                            t.length &&
                                (await e.productDiscountByLevel.createMany({
                                    data: t.map(([e, t]) => ({
                                        companyId: n,
                                        productId: u.id,
                                        level: e,
                                        discountPct: Number(t) || 0,
                                    })),
                                }));
                        }
                        return t;
                    });
                return w({
                    id: O.id,
                    product: {
                        id: O.id,
                        name: O.name,
                        imageUrl: O.imageUrl,
                        description: O.description,
                        price: Number(O.price),
                        barberPercentage: Number(O.professionalPercentage),
                        category: O.category,
                        stockQuantity: O.stockQuantity,
                        isActive: O.isActive,
                        pickupDeadlineDays: O.pickupDeadlineDays ?? 2,
                        unitId: u.unitId,
                        isFeatured: !!O.isFeatured,
                        birthdayBenefitEnabled: !!O.birthdayBenefitEnabled,
                        birthdayPriceLevel: O.birthdayPriceLevel ?? null,
                        hasLevelPrices: Object.keys(T).length > 0,
                        levelDiscounts: T,
                    },
                });
            } catch {
                return E('Sem permissão para editar produtos.', 403);
            }
        }
        e.s(['PATCH', () => N, 'dynamic', 0, 'force-dynamic'], 745774);
        var C = e.i(745774);
        let k = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/products/[productId]/route',
                    pathname: '/api/admin/products/[productId]',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/products/[productId]/route.ts',
                nextConfigOutput: 'standalone',
                userland: C,
            }),
            {
                workAsyncStorage: D,
                workUnitAsyncStorage: I,
                serverHooks: U,
            } = k;
        function S() {
            return (0, i.patchFetch)({
                workAsyncStorage: D,
                workUnitAsyncStorage: I,
            });
        }
        async function T(e, t, i) {
            k.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let b = '/api/admin/products/[productId]/route';
            b = b.replace(/\/index$/, '') || '/';
            let x = await k.prepare(e, t, {
                srcPage: b,
                multiZoneDraftMode: !1,
            });
            if (!x)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == i.waitUntil ||
                        i.waitUntil.call(i, Promise.resolve()),
                    null
                );
            let {
                    buildId: R,
                    params: w,
                    nextConfig: E,
                    parsedUrl: P,
                    isDraftMode: A,
                    prerenderManifest: N,
                    routerServerContext: C,
                    isOnDemandRevalidate: D,
                    revalidateOnlyGenerated: I,
                    resolvedPathname: U,
                    clientReferenceManifest: S,
                    serverActionsManifest: T,
                } = x,
                O = (0, d.normalizeAppPath)(b),
                j = !!(N.dynamicRoutes[O] || N.routes[U]),
                F = async () => (
                    (null == C ? void 0 : C.render404)
                        ? await C.render404(e, t, P, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (j && !A) {
                let e = !!N.routes[U],
                    t = N.dynamicRoutes[O];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await F();
                    throw new g.NoFallbackError();
                }
            }
            let M = null;
            !j || k.isDev || A || (M = '/index' === (M = U) ? '/' : M);
            let q = !0 === k.isDev || !j,
                _ = j && !q;
            T &&
                S &&
                (0, o.setReferenceManifestsSingleton)({
                    page: b,
                    clientReferenceManifest: S,
                    serverActionsManifest: T,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: T,
                    }),
                });
            let H = e.method || 'GET',
                L = (0, n.getTracer)(),
                B = L.getActiveScopeSpan(),
                W = {
                    params: w,
                    prerenderManifest: N,
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
                            k.onRequestError(e, t, i, C),
                    },
                    sharedContext: { buildId: R },
                },
                $ = new l.NodeNextRequest(e),
                K = new l.NodeNextResponse(t),
                Q = u.NextRequestAdapter.fromNodeNextRequest(
                    $,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        k.handle(Q, W).finally(() => {
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
                            } else e.updateName(`${H} ${b}`);
                        }),
                    s = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    d = async (a) => {
                        var n, d;
                        let l = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && D && I && !r)
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
                                    let n = await o(a);
                                    e.fetchMetrics = W.renderOpts.fetchMetrics;
                                    let d = W.renderOpts.pendingWaitUntil;
                                    d &&
                                        i.waitUntil &&
                                        (i.waitUntil(d), (d = void 0));
                                    let l = W.renderOpts.collectedTags;
                                    if (!j)
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
                                        (l && (t[f.NEXT_CACHE_TAGS_HEADER] = l),
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
                                                    f.INFINITE_CACHE
                                                ) &&
                                                W.renderOpts
                                                    .collectedRevalidate,
                                            i =
                                                void 0 ===
                                                    W.renderOpts
                                                        .collectedExpire ||
                                                W.renderOpts.collectedExpire >=
                                                    f.INFINITE_CACHE
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
                                            (await k.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: b,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: _,
                                                        isOnDemandRevalidate: D,
                                                    }),
                                                },
                                                C
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await k.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: M,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: N,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: D,
                                revalidateOnlyGenerated: I,
                                responseGenerator: l,
                                waitUntil: i.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!j) return null;
                        if (
                            (null == u || null == (n = u.value)
                                ? void 0
                                : n.kind) !== y.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == u || null == (d = u.value) ? void 0 : d.kind}`
                                ),
                                '__NEXT_ERROR_CODE',
                                {
                                    value: 'E701',
                                    enumerable: !1,
                                    configurable: !0,
                                }
                            );
                        (s ||
                            t.setHeader(
                                'x-nextjs-cache',
                                D
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            A &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (s && j) || c.delete(f.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, v.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                $,
                                K,
                                new Response(u.value.body, {
                                    headers: c,
                                    status: u.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                B
                    ? await d(B)
                    : await L.withPropagatedContext(e.headers, () =>
                          L.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${H} ${b}`,
                                  kind: n.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': H,
                                      'http.target': e.url,
                                  },
                              },
                              d
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof g.NoFallbackError ||
                        (await k.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: O,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: _,
                                isOnDemandRevalidate: D,
                            }),
                        })),
                    j)
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
                () => T,
                'patchFetch',
                () => S,
                'routeModule',
                () => k,
                'serverHooks',
                () => U,
                'workAsyncStorage',
                () => D,
                'workUnitAsyncStorage',
                () => I,
            ],
            753339
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18aa9790._.js.map
