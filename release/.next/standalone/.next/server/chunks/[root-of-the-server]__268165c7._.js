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
    814747,
    (e, t, r) => {
        t.exports = e.x('path', () => require('path'));
    },
    254799,
    (e, t, r) => {
        t.exports = e.x('crypto', () => require('crypto'));
    },
    924868,
    (e, t, r) => {
        t.exports = e.x('fs/promises', () => require('fs/promises'));
    },
    31574,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            a = e.i(493068),
            n = e.i(821498),
            i = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            l = e.i(337047),
            u = e.i(528171),
            d = e.i(367300),
            p = e.i(102610),
            c = e.i(670893),
            f = e.i(902769),
            m = e.i(46094),
            R = e.i(622730),
            g = e.i(811178),
            x = e.i(193695);
        e.i(629399);
        var h = e.i(377404),
            v = e.i(738342),
            S = e.i(924868),
            E = e.i(814747),
            w = e.i(254799),
            C = e.i(212669),
            y = e.i(331751);
        let A =
                process.env.UPLOADS_DIR?.trim() ||
                E.default.join(process.cwd(), 'uploads_data'),
            P = {
                PRODUCTS: 'products',
                PROFESSIONALS: 'professionals',
                PARTNERS: 'partners',
            },
            N = {
                PRODUCTS: 'PRODUCTS',
                PROFESSIONALS: 'PROFESSIONALS',
                PARTNERS: 'SETTINGS',
            };
        function O(e, t = 400) {
            return v.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function T(e) {
            let t = String(e ?? '').trim();
            return t.length ? t : '';
        }
        function b(e, t) {
            if (e && 'function' == typeof e.get) return e.get(t);
        }
        async function I(e) {
            if ('PARTNERS' === e) {
                let e = await (0, y.requirePlatformForModuleApi)('PARTNERS');
                return e instanceof v.NextResponse ? e : { kind: 'global' };
            }
            let t = N[e],
                r = await (0, C.requireAdminForModule)(t),
                a = T(r?.companyId);
            return a
                ? { kind: 'company', companyId: a }
                : O(
                      'Contexto inválido: companyId ausente (multi-tenant).',
                      401
                  );
        }
        async function j(e) {
            (await (0, S.mkdir)(e, { recursive: !0 }), await (0, S.stat)(e));
        }
        async function q(e) {
            try {
                var t, r, a;
                let n,
                    i = await e.formData().catch(() => null);
                if (!i) return O('FormData inválido.', 400);
                let o =
                    ((t = b(i, 'module')),
                    (n = T(t).toUpperCase()),
                    'PRODUCTS' === n
                        ? 'PRODUCTS'
                        : 'PROFESSIONALS' === n
                          ? 'PROFESSIONALS'
                          : 'PARTNERS' === n
                            ? 'PARTNERS'
                            : null);
                if (!o)
                    return O(
                        'Campo "module" é obrigatório e deve ser "PRODUCTS", "PROFESSIONALS" ou "PARTNERS".',
                        400
                    );
                let s = await I(o);
                if (s instanceof v.NextResponse) return s;
                let l = b(i, 'file');
                if (!l || !(l instanceof File))
                    return O('Campo "file" é obrigatório.', 400);
                let u = l.name || 'upload',
                    d = String(l.type || '').toLowerCase();
                if (!d.startsWith('image/'))
                    return O('Apenas arquivos de imagem são permitidos.', 400);
                let p = Number(l.size || 0);
                if (!Number.isFinite(p) || p <= 0)
                    return O('Arquivo inválido (tamanho).', 400);
                if (p > 5242880)
                    return O(
                        `Imagem muito grande. M\xe1ximo: ${Math.floor(5)}MB.`,
                        413
                    );
                let c = (function (e, t) {
                    let r = E.default.extname(e || '').toLowerCase();
                    if (
                        new Set([
                            '.jpg',
                            '.jpeg',
                            '.png',
                            '.webp',
                            '.gif',
                            '.svg',
                            '.avif',
                        ]).has(r)
                    )
                        return r;
                    let a = String(t || '').toLowerCase();
                    return 'image/jpeg' === a
                        ? '.jpg'
                        : 'image/png' === a
                          ? '.png'
                          : 'image/webp' === a
                            ? '.webp'
                            : 'image/gif' === a
                              ? '.gif'
                              : 'image/svg+xml' === a
                                ? '.svg'
                                : 'image/avif' === a
                                  ? '.avif'
                                  : '';
                })(u, d);
                if (!c)
                    return O(
                        'Formato de imagem não suportado. Use JPG, PNG, WEBP, GIF, SVG ou AVIF.',
                        400
                    );
                let f = P[o],
                    m = w.default.randomUUID(),
                    R = `${m}${c}`,
                    g = 'global' === s.kind ? 'global' : s.companyId,
                    x = E.default.join(A, g, f);
                await j(x);
                let h = await l.arrayBuffer(),
                    C = Buffer.from(h),
                    y = E.default.join(x, R);
                return (
                    await (0, S.writeFile)(y, C),
                    (r = {
                        url: `/media/${g}/${f}/${R}`,
                        key: m,
                        mime: d,
                        size: p,
                        originalName: u,
                        module: o,
                        category: f,
                    }),
                    (a = { status: 201 }),
                    v.NextResponse.json({ ok: !0, data: r }, a)
                );
            } catch (r) {
                let e = String(r?.message || r || 'Erro desconhecido'),
                    t = String(r?.code || '');
                if ('EACCES' === t || 'EPERM' === t)
                    return O(
                        `Sem permiss\xe3o para gravar em "${A}". Verifique permiss\xf5es.`,
                        500
                    );
                if ('ENOENT' === t)
                    return O(`Caminho inv\xe1lido para uploads: "${A}".`, 500);
                if ('missing_token' === e || 'unauthorized' === e)
                    return O('Não autenticado.', 401);
                return O(`Falha no upload: ${e}`, 500);
            }
        }
        e.s(
            [
                'POST',
                () => q,
                'dynamic',
                0,
                'force-dynamic',
                'runtime',
                0,
                'nodejs',
            ],
            70676
        );
        var U = e.i(70676);
        let k = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/uploads/route',
                    pathname: '/api/admin/uploads',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/uploads/route.ts',
                nextConfigOutput: 'standalone',
                userland: U,
            }),
            {
                workAsyncStorage: D,
                workUnitAsyncStorage: F,
                serverHooks: _,
            } = k;
        function M() {
            return (0, a.patchFetch)({
                workAsyncStorage: D,
                workUnitAsyncStorage: F,
            });
        }
        async function $(e, t, a) {
            k.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let v = '/api/admin/uploads/route';
            v = v.replace(/\/index$/, '') || '/';
            let S = await k.prepare(e, t, {
                srcPage: v,
                multiZoneDraftMode: !1,
            });
            if (!S)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: E,
                    params: w,
                    nextConfig: C,
                    parsedUrl: y,
                    isDraftMode: A,
                    prerenderManifest: P,
                    routerServerContext: N,
                    isOnDemandRevalidate: O,
                    revalidateOnlyGenerated: T,
                    resolvedPathname: b,
                    clientReferenceManifest: I,
                    serverActionsManifest: j,
                } = S,
                q = (0, l.normalizeAppPath)(v),
                U = !!(P.dynamicRoutes[q] || P.routes[b]),
                D = async () => (
                    (null == N ? void 0 : N.render404)
                        ? await N.render404(e, t, y, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (U && !A) {
                let e = !!P.routes[b],
                    t = P.dynamicRoutes[q];
                if (t && !1 === t.fallback && !e) {
                    if (C.experimental.adapterPath) return await D();
                    throw new x.NoFallbackError();
                }
            }
            let F = null;
            !U || k.isDev || A || (F = '/index' === (F = b) ? '/' : F);
            let _ = !0 === k.isDev || !U,
                M = U && !_;
            j &&
                I &&
                (0, o.setReferenceManifestsSingleton)({
                    page: v,
                    clientReferenceManifest: I,
                    serverActionsManifest: j,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: j,
                    }),
                });
            let $ = e.method || 'GET',
                H = (0, i.getTracer)(),
                L = H.getActiveScopeSpan(),
                B = {
                    params: w,
                    prerenderManifest: P,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!C.experimental.authInterrupts,
                        },
                        cacheComponents: !!C.cacheComponents,
                        supportsDynamicResponse: _,
                        incrementalCache: (0, n.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: C.cacheLife,
                        waitUntil: a.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, a) =>
                            k.onRequestError(e, t, a, N),
                    },
                    sharedContext: { buildId: E },
                },
                G = new u.NodeNextRequest(e),
                K = new u.NodeNextResponse(t),
                V = d.NextRequestAdapter.fromNodeNextRequest(
                    G,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        k.handle(V, B).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = H.getRootSpanAttributes();
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
                                let t = `${$} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${$} ${v}`);
                        }),
                    s = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var i, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && O && T && !r)
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
                                    let i = await o(n);
                                    e.fetchMetrics = B.renderOpts.fetchMetrics;
                                    let l = B.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let u = B.renderOpts.collectedTags;
                                    if (!U)
                                        return (
                                            await (0, f.sendResponse)(
                                                G,
                                                K,
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
                                        (u && (t[g.NEXT_CACHE_TAGS_HEADER] = u),
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
                                                    g.INFINITE_CACHE
                                                ) &&
                                                B.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    B.renderOpts
                                                        .collectedExpire ||
                                                B.renderOpts.collectedExpire >=
                                                    g.INFINITE_CACHE
                                                    ? void 0
                                                    : B.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: h.CachedRouteKind
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
                                            (await k.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: v,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: M,
                                                        isOnDemandRevalidate: O,
                                                    }),
                                                },
                                                N
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await k.handleResponse({
                                req: e,
                                nextConfig: C,
                                cacheKey: F,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: P,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: O,
                                revalidateOnlyGenerated: T,
                                responseGenerator: u,
                                waitUntil: a.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!U) return null;
                        if (
                            (null == d || null == (i = d.value)
                                ? void 0
                                : i.kind) !== h.CachedRouteKind.APP_ROUTE
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
                        (s ||
                            t.setHeader(
                                'x-nextjs-cache',
                                O
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            A &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, m.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (s && U) || p.delete(g.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, R.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, f.sendResponse)(
                                G,
                                K,
                                new Response(d.value.body, {
                                    headers: p,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                L
                    ? await l(L)
                    : await H.withPropagatedContext(e.headers, () =>
                          H.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${$} ${v}`,
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
                    (t instanceof x.NoFallbackError ||
                        (await k.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: q,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: M,
                                isOnDemandRevalidate: O,
                            }),
                        })),
                    U)
                )
                    throw t;
                return (
                    await (0, f.sendResponse)(
                        G,
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
                () => $,
                'patchFetch',
                () => M,
                'routeModule',
                () => k,
                'serverHooks',
                () => _,
                'workAsyncStorage',
                () => D,
                'workUnitAsyncStorage',
                () => F,
            ],
            31574
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__268165c7._.js.map
