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
    483355,
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
            u = e.i(528171),
            d = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            h = e.i(46094),
            f = e.i(622730),
            v = e.i(811178),
            g = e.i(193695);
        e.i(629399);
        var x = e.i(377404),
            R = e.i(738342),
            E = e.i(698043);
        e.i(212669);
        var w = e.i(331751);
        function y(e, t) {
            return R.NextResponse.json({ ok: !0, data: e }, t);
        }
        function A(e, t = 400) {
            return R.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function C(e, t, r) {
            let a =
                'number' == typeof e
                    ? e
                    : Number(
                          String(e ?? '')
                              .trim()
                              .replace(',', '.')
                      );
            if (!Number.isFinite(a)) return t;
            let n = Math.floor(a);
            return Math.max(r?.min ?? -1 / 0, Math.min(r?.max ?? 1 / 0, n));
        }
        function S(e) {
            let t = String(e ?? '').trim();
            return t.length ? t : null;
        }
        function b(e, t) {
            let r = t.toLowerCase();
            for (let [t, a] of e.headers.entries())
                if (t.toLowerCase() === r) {
                    let e = String(a ?? '').trim();
                    return e.length ? e : null;
                }
            return null;
        }
        function T(e) {
            let t = String(e ?? '').trim();
            if (!t) return null;
            let r = t.toLowerCase();
            return r.startsWith('javascript:') || r.startsWith('data:')
                ? null
                : r.startsWith('http://') || r.startsWith('https://')
                  ? t
                  : r.startsWith('www.')
                    ? `https://${t}`
                    : null;
        }
        function P(e) {
            return 'SELECTED' ===
                String(e ?? '')
                    .trim()
                    .toUpperCase()
                ? 'SELECTED'
                : 'ALL';
        }
        async function N(e) {
            let t = await (0, w.requirePlatformForModuleApi)('PARTNERS');
            if (t instanceof R.NextResponse) return t;
            try {
                let t = (function (e) {
                        let t = b(e, 'x-forwarded-proto'),
                            r = b(e, 'x-forwarded-host') || b(e, 'host'),
                            a = String(t ?? '')
                                .split(',')[0]
                                .trim()
                                .toLowerCase(),
                            n = String(r ?? '')
                                .split(',')[0]
                                .trim();
                        if (n)
                            return `${'http' === a || 'https' === a ? a : 'https'}://${n}`;
                        try {
                            return new URL(e.url).origin;
                        } catch {
                            return '';
                        }
                    })(e),
                    r = new URL(e.url),
                    a = String(r.searchParams.get('q') ?? '').trim(),
                    n = String(r.searchParams.get('active') ?? '').trim(),
                    i = '1' === n || ('0' !== n && null),
                    s = {
                        ...(null === i ? {} : { isActive: i }),
                        ...(a
                            ? { name: { contains: a, mode: 'insensitive' } }
                            : {}),
                    },
                    o = await E.prisma.partner.findMany({
                        where: s,
                        orderBy: [
                            { sortOrder: 'asc' },
                            { name: 'asc' },
                            { id: 'asc' },
                        ],
                        select: {
                            id: !0,
                            name: !0,
                            logoUrl: !0,
                            logoKey: !0,
                            discountPct: !0,
                            description: !0,
                            rules: !0,
                            ctaUrl: !0,
                            ctaLabel: !0,
                            isActive: !0,
                            visibilityMode: !0,
                            sortOrder: !0,
                            createdAt: !0,
                            updatedAt: !0,
                            companies: {
                                where: { isEnabled: !0 },
                                select: { companyId: !0 },
                            },
                        },
                    });
                return y({
                    partners: o.map((e) => {
                        let r = T(e.ctaUrl),
                            a = P(e.visibilityMode),
                            n = (function (e, t) {
                                let r = String(t ?? '').trim();
                                if (!r) return null;
                                let a = r.toLowerCase();
                                if (
                                    a.startsWith('http://') ||
                                    a.startsWith('https://')
                                )
                                    return r;
                                let n = r.startsWith('/') ? r : `/${r}`,
                                    i = e.endsWith('/') ? e.slice(0, -1) : e;
                                return i ? `${i}${n}` : n;
                            })(t, e.logoUrl);
                        return {
                            id: e.id,
                            name: e.name,
                            logoUrl: n,
                            logoKey: e.logoKey ?? null,
                            discountPct: C(e.discountPct, 0, {
                                min: 0,
                                max: 100,
                            }),
                            description: e.description ?? null,
                            rules: e.rules ?? null,
                            ctaUrl: r ?? null,
                            ctaLabel: e.ctaLabel ?? null,
                            isActive: !!e.isActive,
                            visibilityMode: a,
                            sortOrder: C(e.sortOrder, 100, {
                                min: 0,
                                max: 1e5,
                            }),
                            companyIds:
                                'SELECTED' === a
                                    ? e.companies.map((e) => e.companyId)
                                    : [],
                            createdAt: e.createdAt,
                            updatedAt: e.updatedAt,
                        };
                    }),
                });
            } catch (e) {
                return (
                    console.error('[platform partners GET] error:', e),
                    A('Erro ao listar parceiros.', 500)
                );
            }
        }
        async function U(e) {
            let t = await (0, w.requirePlatformForModuleApi)('PARTNERS');
            if (t instanceof R.NextResponse) return t;
            try {
                var r;
                let t,
                    a = await e.json().catch(() => null);
                if (!a) return A('Body inválido.');
                let n =
                    ((r = a.name),
                    (t = String(r ?? '').trim()).length ? t : '');
                if (!n) return A('Nome é obrigatório.');
                let i = S(a.logoUrl);
                if (!i) return A('logoUrl é obrigatório.');
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
                                t.startsWith('/media/') ||
                                t.startsWith('media/') ||
                                t.startsWith('/uploads/') ||
                                t.startsWith('uploads/') ||
                                r.startsWith('http://') ||
                                r.startsWith('https://')
                            )
                        );
                    })(i)
                )
                    return A(
                        'logoUrl inválida. Envie uma imagem (/media ou /uploads) ou forneça uma URL http(s) válida.',
                        400
                    );
                let s = S(a.logoKey),
                    o = C(a.discountPct, 0, { min: 0, max: 100 }),
                    l = S(a.description),
                    u = S(a.rules),
                    d = T(a.ctaUrl);
                if (!d)
                    return A(
                        'ctaUrl inválida. Informe uma URL http(s) (ou começando com www.).',
                        400
                    );
                let c = S(a.ctaLabel) || 'Ativar cashback e ir pra loja',
                    p = 'boolean' != typeof a.isActive || a.isActive,
                    m = P(a.visibilityMode),
                    h = C(a.sortOrder, 100, { min: 0, max: 1e5 }),
                    f = (function (e) {
                        if (!Array.isArray(e)) return [];
                        let t = e
                                .map((e) => String(e ?? '').trim())
                                .filter(Boolean),
                            r = new Set(),
                            a = [];
                        for (let e of t) r.has(e) || (r.add(e), a.push(e));
                        return a;
                    })(a.companyIds);
                if ('SELECTED' === m && 0 === f.length)
                    return A(
                        'visibilityMode=SELECTED exige pelo menos 1 empresa em companyIds.',
                        400
                    );
                let v = await E.prisma.partner.create({
                    data: {
                        name: n,
                        logoUrl: i,
                        logoKey: s,
                        discountPct: o,
                        description: l,
                        rules: u,
                        ctaUrl: d,
                        ctaLabel: c,
                        isActive: p,
                        visibilityMode: m,
                        sortOrder: h,
                        ...('SELECTED' === m
                            ? {
                                  companies: {
                                      create: f.map((e) => ({
                                          companyId: e,
                                          isEnabled: !0,
                                      })),
                                  },
                              }
                            : {}),
                    },
                    select: { id: !0 },
                });
                return y({ id: v.id }, { status: 201 });
            } catch (e) {
                return (
                    console.error('[platform partners POST] error:', e),
                    A('Erro ao criar parceiro.', 500)
                );
            }
        }
        e.s(
            [
                'GET',
                () => N,
                'POST',
                () => U,
                'dynamic',
                0,
                'force-dynamic',
                'revalidate',
                0,
                0,
            ],
            607628
        );
        var O = e.i(607628);
        let L = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/plataform/partners/route',
                    pathname: '/api/plataform/partners',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/plataform/partners/route.ts',
                nextConfigOutput: 'standalone',
                userland: O,
            }),
            {
                workAsyncStorage: M,
                workUnitAsyncStorage: j,
                serverHooks: k,
            } = L;
        function q() {
            return (0, a.patchFetch)({
                workAsyncStorage: M,
                workUnitAsyncStorage: j,
            });
        }
        async function I(e, t, a) {
            L.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let R = '/api/plataform/partners/route';
            R = R.replace(/\/index$/, '') || '/';
            let E = await L.prepare(e, t, {
                srcPage: R,
                multiZoneDraftMode: !1,
            });
            if (!E)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: w,
                    params: y,
                    nextConfig: A,
                    parsedUrl: C,
                    isDraftMode: S,
                    prerenderManifest: b,
                    routerServerContext: T,
                    isOnDemandRevalidate: P,
                    revalidateOnlyGenerated: N,
                    resolvedPathname: U,
                    clientReferenceManifest: O,
                    serverActionsManifest: M,
                } = E,
                j = (0, l.normalizeAppPath)(R),
                k = !!(b.dynamicRoutes[j] || b.routes[U]),
                q = async () => (
                    (null == T ? void 0 : T.render404)
                        ? await T.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (k && !S) {
                let e = !!b.routes[U],
                    t = b.dynamicRoutes[j];
                if (t && !1 === t.fallback && !e) {
                    if (A.experimental.adapterPath) return await q();
                    throw new g.NoFallbackError();
                }
            }
            let I = null;
            !k || L.isDev || S || (I = '/index' === (I = U) ? '/' : I);
            let W = !0 === L.isDev || !k,
                _ = k && !W;
            M &&
                O &&
                (0, s.setReferenceManifestsSingleton)({
                    page: R,
                    clientReferenceManifest: O,
                    serverActionsManifest: M,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: M,
                    }),
                });
            let D = e.method || 'GET',
                H = (0, i.getTracer)(),
                $ = H.getActiveScopeSpan(),
                K = {
                    params: y,
                    prerenderManifest: b,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!A.experimental.authInterrupts,
                        },
                        cacheComponents: !!A.cacheComponents,
                        supportsDynamicResponse: W,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: A.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            L.onRequestError(e, t, a, T),
                    },
                    sharedContext: { buildId: w },
                },
                F = new u.NodeNextRequest(e),
                B = new u.NodeNextResponse(t),
                G = d.NextRequestAdapter.fromNodeNextRequest(
                    F,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        L.handle(G, K).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = H.getRootSpanAttributes();
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
                                let t = `${D} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${D} ${R}`);
                        }),
                    o = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var i, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && P && N && !r)
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
                                    e.fetchMetrics = K.renderOpts.fetchMetrics;
                                    let l = K.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let u = K.renderOpts.collectedTags;
                                    if (!k)
                                        return (
                                            await (0, m.sendResponse)(
                                                F,
                                                B,
                                                i,
                                                K.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (u && (t[v.NEXT_CACHE_TAGS_HEADER] = u),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    K.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    K.renderOpts
                                                        .collectedRevalidate >=
                                                    v.INFINITE_CACHE
                                                ) &&
                                                K.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    K.renderOpts
                                                        .collectedExpire ||
                                                K.renderOpts.collectedExpire >=
                                                    v.INFINITE_CACHE
                                                    ? void 0
                                                    : K.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: x.CachedRouteKind
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
                                            (await L.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: R,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: _,
                                                        isOnDemandRevalidate: P,
                                                    }),
                                                },
                                                T
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await L.handleResponse({
                                req: e,
                                nextConfig: A,
                                cacheKey: I,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: b,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: P,
                                revalidateOnlyGenerated: N,
                                responseGenerator: u,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!k) return null;
                        if (
                            (null == d || null == (i = d.value)
                                ? void 0
                                : i.kind) !== x.CachedRouteKind.APP_ROUTE
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
                                P
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            S &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (o && k) || c.delete(v.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                F,
                                B,
                                new Response(d.value.body, {
                                    headers: c,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                $
                    ? await l($)
                    : await H.withPropagatedContext(e.headers, () =>
                          H.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${D} ${R}`,
                                  kind: i.SpanKind.SERVER,
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
                        (await L.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: j,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: _,
                                isOnDemandRevalidate: P,
                            }),
                        })),
                    k)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        F,
                        B,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => I,
                'patchFetch',
                () => q,
                'routeModule',
                () => L,
                'serverHooks',
                () => k,
                'workAsyncStorage',
                () => M,
                'workUnitAsyncStorage',
                () => j,
            ],
            483355
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b5e35f3e._.js.map
