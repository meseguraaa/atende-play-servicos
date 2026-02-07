module.exports = [
    698043,
    (e) => {
        'use strict';
        var t = e.i(29173);
        let r = globalThis.prisma ?? new t.PrismaClient({ log: ['error'] });
        e.s(['prisma', 0, r]);
    },
    29173,
    (e, t, r) => {
        t.exports = e.x('@prisma/client', () => require('@prisma/client'));
    },
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
    270406,
    (e, t, r) => {
        t.exports = e.x('next/dist/compiled/@opentelemetry/api', () =>
            require('next/dist/compiled/@opentelemetry/api')
        );
    },
    193695,
    (e, t, r) => {
        t.exports = e.x(
            'next/dist/shared/lib/no-fallback-error.external.js',
            () => require('next/dist/shared/lib/no-fallback-error.external.js')
        );
    },
    254799,
    (e, t, r) => {
        t.exports = e.x('crypto', () => require('crypto'));
    },
    666680,
    (e, t, r) => {
        t.exports = e.x('node:crypto', () => require('node:crypto'));
    },
    93048,
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
            p = e.i(102610),
            c = e.i(670893),
            h = e.i(902769),
            m = e.i(46094),
            x = e.i(622730),
            f = e.i(811178),
            w = e.i(193695);
        e.i(629399);
        var v = e.i(377404),
            R = e.i(738342),
            g = e.i(698043),
            y = e.i(735796),
            A = e.i(666680);
        function E() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        function C(e, t = 400, r) {
            return R.NextResponse.json(
                { ok: !1, error: e },
                { status: t, headers: r }
            );
        }
        function T(e) {
            return String(e ?? '').trim();
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
        let k =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\];':",.<>\/?\|]).{6,}$/;
        async function N() {
            return new R.NextResponse(null, { status: 204, headers: E() });
        }
        async function O(e) {
            let t = E();
            try {
                let r = await e.json().catch(() => null);
                if (!r || 'object' != typeof r)
                    return C('Body inválido', 400, t);
                let a = T(r.token),
                    n = T(r.password),
                    i = T(r.companyId),
                    s = b(e, 'x-company-id') || b(e, 'x-companyid') || null,
                    o = i || s || '';
                if (!o) return C('companyId é obrigatório', 400, t);
                if (!a) return C('Token é obrigatório', 400, t);
                if (!k.test(String(n || '')))
                    return C(
                        'A senha deve ter no mínimo 6 caracteres, incluindo 1 letra maiúscula, 1 número e 1 caractere especial.',
                        400,
                        t
                    );
                let l = await g.prisma.company.findUnique({
                    where: { id: o },
                    select: { id: !0, isActive: !0 },
                });
                if (!l || !l.isActive)
                    return C('Empresa inválida ou inativa', 400, t);
                let d = A.default.createHash('sha256').update(a).digest('hex'),
                    u = new Date(),
                    p = await g.prisma.passwordResetToken.findUnique({
                        where: { tokenHash: d },
                        select: {
                            id: !0,
                            companyId: !0,
                            userId: !0,
                            expiresAt: !0,
                            usedAt: !0,
                        },
                    });
                if (!p || p.companyId !== o) return C('Token inválido', 400, t);
                if (p.usedAt) return C('Token já utilizado', 400, t);
                if (p.expiresAt.getTime() <= u.getTime())
                    return C('Token expirado', 400, t);
                let c = await g.prisma.user.findUnique({
                    where: { id: p.userId },
                    select: { id: !0, isActive: !0 },
                });
                if (!c || !c.isActive) return C('Usuário inválido', 400, t);
                let h = await g.prisma.companyMember.findUnique({
                    where: { companyId_userId: { companyId: o, userId: c.id } },
                    select: { id: !0, isActive: !0 },
                });
                if (!h || !h.isActive)
                    return C('Usuário não pertence a esta empresa', 400, t);
                let m = await y.default.hash(n, 10);
                return (
                    await g.prisma.$transaction([
                        g.prisma.user.update({
                            where: { id: c.id },
                            data: { passwordHash: m },
                        }),
                        g.prisma.passwordResetToken.update({
                            where: { id: p.id },
                            data: { usedAt: u },
                        }),
                        g.prisma.passwordResetToken.updateMany({
                            where: {
                                companyId: o,
                                userId: c.id,
                                usedAt: null,
                                expiresAt: { gt: u },
                                NOT: { id: p.id },
                            },
                            data: { usedAt: u },
                        }),
                    ]),
                    (function (e, t = 200, r) {
                        return R.NextResponse.json(
                            { ok: !0, data: e },
                            { status: t, headers: r }
                        );
                    })({ message: 'Senha redefinida com sucesso.' }, 200, t)
                );
            } catch (e) {
                return (
                    console.error('[mobile reset-password]', e),
                    C('Erro inesperado', 500, t)
                );
            }
        }
        e.s(['OPTIONS', () => N, 'POST', () => O], 420609);
        var P = e.i(420609);
        let S = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/auth/reset-password/route',
                    pathname: '/api/mobile/auth/reset-password',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/auth/reset-password/route.ts',
                nextConfigOutput: 'standalone',
                userland: P,
            }),
            {
                workAsyncStorage: q,
                workUnitAsyncStorage: I,
                serverHooks: j,
            } = S;
        function U() {
            return (0, a.patchFetch)({
                workAsyncStorage: q,
                workUnitAsyncStorage: I,
            });
        }
        async function _(e, t, a) {
            S.isDev &&
                (0, n.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let R = '/api/mobile/auth/reset-password/route';
            R = R.replace(/\/index$/, '') || '/';
            let g = await S.prepare(e, t, {
                srcPage: R,
                multiZoneDraftMode: !1,
            });
            if (!g)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == a.waitUntil ||
                        a.waitUntil.call(a, Promise.resolve()),
                    null
                );
            let {
                    buildId: y,
                    params: A,
                    nextConfig: E,
                    parsedUrl: C,
                    isDraftMode: T,
                    prerenderManifest: b,
                    routerServerContext: k,
                    isOnDemandRevalidate: N,
                    revalidateOnlyGenerated: O,
                    resolvedPathname: P,
                    clientReferenceManifest: q,
                    serverActionsManifest: I,
                } = g,
                j = (0, l.normalizeAppPath)(R),
                U = !!(b.dynamicRoutes[j] || b.routes[P]),
                _ = async () => (
                    (null == k ? void 0 : k.render404)
                        ? await k.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (U && !T) {
                let e = !!b.routes[P],
                    t = b.dynamicRoutes[j];
                if (t && !1 === t.fallback && !e) {
                    if (E.experimental.adapterPath) return await _();
                    throw new w.NoFallbackError();
                }
            }
            let H = null;
            !U || S.isDev || T || (H = '/index' === (H = P) ? '/' : H);
            let M = !0 === S.isDev || !U,
                D = U && !M;
            I &&
                q &&
                (0, s.setReferenceManifestsSingleton)({
                    page: R,
                    clientReferenceManifest: q,
                    serverActionsManifest: I,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: I,
                    }),
                });
            let $ = e.method || 'GET',
                F = (0, i.getTracer)(),
                K = F.getActiveScopeSpan(),
                L = {
                    params: A,
                    prerenderManifest: b,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!E.experimental.authInterrupts,
                        },
                        cacheComponents: !!E.cacheComponents,
                        supportsDynamicResponse: M,
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
                            S.onRequestError(e, t, a, k),
                    },
                    sharedContext: { buildId: y },
                },
                B = new d.NodeNextRequest(e),
                z = new d.NodeNextResponse(t),
                G = u.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        S.handle(G, L).finally(() => {
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
                                let t = `${$} ${a}`;
                                (e.setAttributes({
                                    'next.route': a,
                                    'http.route': a,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${$} ${R}`);
                        }),
                    o = !!(0, n.getRequestMeta)(e, 'minimalMode'),
                    l = async (n) => {
                        var i, l;
                        let d = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && N && O && !r)
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
                                    e.fetchMetrics = L.renderOpts.fetchMetrics;
                                    let l = L.renderOpts.pendingWaitUntil;
                                    l &&
                                        a.waitUntil &&
                                        (a.waitUntil(l), (l = void 0));
                                    let d = L.renderOpts.collectedTags;
                                    if (!U)
                                        return (
                                            await (0, h.sendResponse)(
                                                B,
                                                z,
                                                i,
                                                L.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (d && (t[f.NEXT_CACHE_TAGS_HEADER] = d),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    L.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    L.renderOpts
                                                        .collectedRevalidate >=
                                                    f.INFINITE_CACHE
                                                ) &&
                                                L.renderOpts
                                                    .collectedRevalidate,
                                            a =
                                                void 0 ===
                                                    L.renderOpts
                                                        .collectedExpire ||
                                                L.renderOpts.collectedExpire >=
                                                    f.INFINITE_CACHE
                                                    ? void 0
                                                    : L.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: v.CachedRouteKind
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
                                            (await S.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: R,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    c.getRevalidateReason)({
                                                        isStaticGeneration: D,
                                                        isOnDemandRevalidate: N,
                                                    }),
                                                },
                                                k
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await S.handleResponse({
                                req: e,
                                nextConfig: E,
                                cacheKey: H,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: b,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: N,
                                revalidateOnlyGenerated: O,
                                responseGenerator: d,
                                waitUntil: a.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!U) return null;
                        if (
                            (null == u || null == (i = u.value)
                                ? void 0
                                : i.kind) !== v.CachedRouteKind.APP_ROUTE
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
                            T &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let p = (0, m.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && U) || p.delete(f.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                p.get('Cache-Control') ||
                                p.set(
                                    'Cache-Control',
                                    (0, x.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, h.sendResponse)(
                                B,
                                z,
                                new Response(u.value.body, {
                                    headers: p,
                                    status: u.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                K
                    ? await l(K)
                    : await F.withPropagatedContext(e.headers, () =>
                          F.trace(
                              p.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${$} ${R}`,
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
                    (t instanceof w.NoFallbackError ||
                        (await S.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: j,
                            routeType: 'route',
                            revalidateReason: (0, c.getRevalidateReason)({
                                isStaticGeneration: D,
                                isOnDemandRevalidate: N,
                            }),
                        })),
                    U)
                )
                    throw t;
                return (
                    await (0, h.sendResponse)(
                        B,
                        z,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => _,
                'patchFetch',
                () => U,
                'routeModule',
                () => S,
                'serverHooks',
                () => j,
                'workAsyncStorage',
                () => q,
                'workUnitAsyncStorage',
                () => I,
            ],
            93048
        );
    },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f1a1fbe0._.js.map
