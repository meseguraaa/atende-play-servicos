module.exports = [
    317069,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            i = e.i(821498),
            a = e.i(161599),
            o = e.i(182716),
            s = e.i(857635),
            l = e.i(337047),
            u = e.i(528171),
            d = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            m = e.i(902769),
            h = e.i(46094),
            f = e.i(622730),
            y = e.i(811178),
            R = e.i(193695);
        e.i(629399);
        var v = e.i(377404),
            w = e.i(738342),
            g = e.i(698043),
            E = e.i(453852);
        function b() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        function N(e, t) {
            let r = t.toLowerCase();
            for (let [t, n] of e.headers.entries())
                if (t.toLowerCase() === r) {
                    let e = String(n ?? '').trim();
                    return e.length ? e : null;
                }
            return null;
        }
        function A(e) {
            let t =
                    N(e, 'x-company-id') ||
                    N(e, 'x-companyid') ||
                    N(e, 'X-COMPANY-ID'),
                r = 'string' == typeof t ? t.trim() : '';
            return r.length ? r : null;
        }
        async function P(e) {
            let t = N(e, 'authorization') || '',
                r = t.toLowerCase().startsWith('bearer ')
                    ? t.slice(7).trim()
                    : '';
            if (!r) throw Error('missing_token');
            let n = await (0, E.verifyAppJwt)(r),
                i = 'string' == typeof n?.sub ? String(n.sub).trim() : '';
            if (!i) throw Error('invalid_token');
            let a =
                'string' == typeof n?.companyId
                    ? String(n.companyId).trim()
                    : '';
            if (!a) {
                let t = A(e);
                t && (a = t);
            }
            if (!a) throw Error('missing_company_id');
            if (
                !(await g.prisma.companyMember.findFirst({
                    where: { userId: i, companyId: a, isActive: !0 },
                    select: { id: !0 },
                }))
            )
                throw Error('forbidden_company');
            return { ...n, sub: i, companyId: a };
        }
        async function I() {
            return new w.NextResponse(null, { status: 204, headers: b() });
        }
        let C = {
            DIAMANTE: ['DIAMANTE', 'OURO', 'PRATA', 'BRONZE'],
            OURO: ['OURO', 'PRATA', 'BRONZE'],
            PRATA: ['PRATA', 'BRONZE'],
            BRONZE: ['BRONZE'],
        };
        function T(e, t) {
            let r = new Intl.DateTimeFormat('en-US', {
                    timeZone: t,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).formatToParts(e),
                n = (e) => r.find((t) => t.type === e)?.value;
            return {
                year: Number(n('year')),
                month: Number(n('month')),
                day: Number(n('day')),
            };
        }
        function x(e, t, r) {
            return new Date(
                `${String(e).padStart(4, '0')}-${String(t).padStart(2, '0')}-${String(r).padStart(2, '0')}T00:00:00Z`
            );
        }
        function O(e, t) {
            let r = new Date(e.getTime());
            return (r.setUTCDate(r.getUTCDate() + t), r);
        }
        function _(e) {
            return 'BRONZE' === e ||
                'PRATA' === e ||
                'OURO' === e ||
                'DIAMANTE' === e
                ? e
                : null;
        }
        function S(e) {
            return Number.isFinite(e)
                ? Math.max(0, Math.min(100, Math.floor(e)))
                : 0;
        }
        function D(e) {
            return Math.round((e + Number.EPSILON) * 100) / 100;
        }
        function B(e, t) {
            let r = S(t);
            return D((Number.isFinite(e) ? e : 0) * (1 - r / 100));
        }
        async function L(e) {
            let t = e.timeZone ?? 'America/Sao_Paulo',
                r = e.now ?? new Date(),
                n = e.effectiveLevel ?? 'BRONZE',
                i = e.product,
                a = e.clientBirthday,
                o = Number(i.price),
                s = new Map();
            for (let e of i.discounts ?? []) {
                let t = _(e.level),
                    r = S(Number(e.discountPct));
                t && s.set(t, r);
            }
            function l(e) {
                for (let t of C[e])
                    if (s.has(t)) return { level: t, discountPct: s.get(t) };
                return { level: 'BRONZE', discountPct: 0 };
            }
            let u = !1;
            if (a && i.birthdayBenefitEnabled) {
                var d;
                let e,
                    n = T(r, t),
                    i = T(a, t),
                    o = x(n.year, i.month, i.day),
                    s = O(o, -3),
                    l = O(o, 3);
                ((d = x(n.year, n.month, n.day)),
                    (u = (e = d.getTime()) >= s.getTime() && e <= l.getTime()));
            }
            if (u && i.birthdayBenefitEnabled) {
                let e = l(i.birthdayPriceLevel ?? 'DIAMANTE'),
                    t = B(o, e.discountPct);
                return {
                    unitId: i.unitId,
                    basePrice: o,
                    finalPrice: t,
                    discountPct: e.discountPct,
                    appliedLevel: e.level,
                    appliedBecause: 'BIRTHDAY',
                    inBirthdayWindow: !0,
                };
            }
            let c = l(n),
                p = B(o, c.discountPct);
            return {
                unitId: i.unitId,
                basePrice: o,
                finalPrice: p,
                discountPct: c.discountPct,
                appliedLevel: c.level,
                appliedBecause: c.discountPct > 0 ? 'LEVEL' : 'BASE',
                inBirthdayWindow: !1,
            };
        }
        async function k(e) {
            let t = e.timeZone ?? 'America/Sao_Paulo',
                r = e.now ?? new Date(),
                n = e.effectiveLevel ?? 'BRONZE',
                [i, a] = await Promise.all([
                    g.prisma.product.findFirst({
                        where: {
                            id: e.productId,
                            isActive: !0,
                            unit: { companyId: e.companyId },
                        },
                        select: {
                            id: !0,
                            price: !0,
                            unitId: !0,
                            birthdayBenefitEnabled: !0,
                            birthdayPriceLevel: !0,
                        },
                    }),
                    e.clientId
                        ? g.prisma.user.findFirst({
                              where: { id: e.clientId },
                              select: { id: !0, birthday: !0 },
                          })
                        : Promise.resolve(null),
                ]);
            if (!i) throw Error('Produto não encontrado.');
            let o = (
                await g.prisma.productDiscountByLevel.findMany({
                    where: { productId: i.id, companyId: e.companyId },
                    select: { level: !0, discountPct: !0 },
                })
            ).map((e) => ({ level: e.level, discountPct: e.discountPct }));
            return L({
                product: {
                    id: i.id,
                    unitId: i.unitId,
                    price: i.price,
                    birthdayBenefitEnabled: i.birthdayBenefitEnabled ?? !1,
                    birthdayPriceLevel: i.birthdayPriceLevel ?? null,
                    discounts: o,
                },
                clientBirthday: a?.birthday ?? null,
                effectiveLevel: n,
                timeZone: t,
                now: r,
            });
        }
        async function M(e, t) {
            let r = b();
            try {
                let n = await P(e),
                    i = n.companyId,
                    a = (function (e) {
                        let t = N(e, 'x-forwarded-proto'),
                            r = N(e, 'x-forwarded-host') || N(e, 'host'),
                            n = String(t ?? '')
                                .split(',')[0]
                                .trim()
                                .toLowerCase(),
                            i = String(r ?? '')
                                .split(',')[0]
                                .trim();
                        if (i)
                            return `${'http' === n || 'https' === n ? n : 'https'}://${i}`;
                        try {
                            return new URL(e.url).origin;
                        } catch {
                            return '';
                        }
                    })(e),
                    o = A(e);
                if (o && o !== i)
                    return w.NextResponse.json(
                        { error: 'company_id_mismatch' },
                        { status: 400, headers: r }
                    );
                let { id: s } = await t.params,
                    l = String(s ?? '').trim();
                if (!l)
                    return w.NextResponse.json(
                        { error: 'missing_product_id' },
                        { status: 400, headers: r }
                    );
                let u = await g.prisma.product.findFirst({
                    where: { id: l, isActive: !0, unit: { companyId: i } },
                    select: {
                        id: !0,
                        unitId: !0,
                        name: !0,
                        imageUrl: !0,
                        description: !0,
                        category: !0,
                        stockQuantity: !0,
                        price: !0,
                        pickupDeadlineDays: !0,
                        birthdayBenefitEnabled: !0,
                        birthdayPriceLevel: !0,
                        unit: { select: { id: !0, name: !0 } },
                    },
                });
                if (!u)
                    return w.NextResponse.json(
                        { error: 'not_found' },
                        { status: 404, headers: r }
                    );
                let d =
                        'number' == typeof u.pickupDeadlineDays &&
                        Number.isFinite(u.pickupDeadlineDays) &&
                        u.pickupDeadlineDays > 0
                            ? u.pickupDeadlineDays
                            : 2,
                    c =
                        'number' == typeof u.stockQuantity
                            ? u.stockQuantity
                            : 0,
                    p = 'CLIENT' === n.role ? n.sub : null,
                    m = 'BRONZE';
                if (p) {
                    let e = await g.prisma.customerLevelState.findFirst({
                            where: {
                                companyId: i,
                                userId: p,
                                unitId: u.unitId,
                            },
                            select: { levelCurrent: !0 },
                        }),
                        t = _(e?.levelCurrent);
                    t && (m = t);
                }
                let h = await k({
                    productId: u.id,
                    clientId: p,
                    effectiveLevel: m,
                    timeZone: 'America/Sao_Paulo',
                    now: new Date(),
                    companyId: i,
                });
                if (h.unitId && h.unitId !== u.unitId)
                    return w.NextResponse.json(
                        { error: 'invalid_product_unit' },
                        { status: 400, headers: r }
                    );
                let f = Number(h.basePrice),
                    y = Number(h.finalPrice),
                    R = S(Number(h.discountPct ?? 0)),
                    v =
                        Number.isFinite(f) &&
                        Number.isFinite(y) &&
                        f > 0 &&
                        y < f,
                    E = v ? D(Math.max(0, f - y)) : 0,
                    b =
                        'BIRTHDAY' === h.appliedBecause
                            ? { type: 'BIRTHDAY', label: '🎂 Aniversário' }
                            : v
                              ? { type: 'LEVEL', label: `${R}% OFF` }
                              : null,
                    I = (function (e, t) {
                        let r = String(t ?? '').trim();
                        if (!r) return null;
                        let n = r.toLowerCase();
                        if (n.startsWith('http://') || n.startsWith('https://'))
                            return r;
                        let i = r.startsWith('/') ? r : `/${r}`,
                            a = String(e ?? '').trim();
                        if (!a) return i;
                        let o = a.endsWith('/') ? a.slice(0, -1) : a;
                        return `${o}${i}`;
                    })(a, u.imageUrl),
                    C = {
                        id: u.id,
                        name: u.name,
                        imageUrl: I,
                        description: u.description,
                        category: u.category ?? null,
                        stockQuantity: c,
                        isOutOfStock: c <= 0,
                        pickupDeadlineDays: d,
                        unitId: u.unitId,
                        unitName: u.unit?.name ?? '—',
                        basePrice: f,
                        finalPrice: y,
                        hasDiscount: v,
                        savings: E,
                        discountPct: R,
                        price: y,
                        pricing: {
                            customerLevel: m,
                            appliedLevel: h.appliedLevel,
                            appliedBecause: h.appliedBecause,
                            inBirthdayWindow: h.inBirthdayWindow,
                            discountPct: R,
                        },
                        badge: b,
                    },
                    T = w.NextResponse.json(
                        { ok: !0, product: C, item: C },
                        { status: 200, headers: r }
                    );
                return (T.headers.set('x-company-id', i), T);
            } catch (t) {
                let e = String(t?.message ?? '');
                if (e.includes('missing_token'))
                    return w.NextResponse.json(
                        { error: 'missing_token' },
                        { status: 401, headers: r }
                    );
                if (e.includes('missing_company_id'))
                    return w.NextResponse.json(
                        { error: 'missing_company_id' },
                        { status: 401, headers: r }
                    );
                if (e.includes('forbidden_company'))
                    return w.NextResponse.json(
                        { error: 'forbidden_company' },
                        { status: 403, headers: r }
                    );
                if (
                    e.includes('Invalid token') ||
                    e.includes('JWT') ||
                    e.toLowerCase().includes('token')
                )
                    return w.NextResponse.json(
                        { error: 'invalid_token' },
                        { status: 401, headers: r }
                    );
                if (e.toLowerCase().includes('produto não encontrado'))
                    return w.NextResponse.json(
                        { error: 'not_found' },
                        { status: 404, headers: r }
                    );
                return (
                    console.error('[mobile product detail] error:', t),
                    w.NextResponse.json(
                        { error: 'server_error' },
                        { status: 500, headers: r }
                    )
                );
            }
        }
        e.s(['GET', () => M, 'OPTIONS', () => I], 26148);
        var U = e.i(26148);
        let F = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/products/[id]/route',
                    pathname: '/api/mobile/products/[id]',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/products/[id]/route.ts',
                nextConfigOutput: 'standalone',
                userland: U,
            }),
            {
                workAsyncStorage: H,
                workUnitAsyncStorage: j,
                serverHooks: $,
            } = F;
        function Z() {
            return (0, n.patchFetch)({
                workAsyncStorage: H,
                workUnitAsyncStorage: j,
            });
        }
        async function q(e, t, n) {
            F.isDev &&
                (0, i.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let w = '/api/mobile/products/[id]/route';
            w = w.replace(/\/index$/, '') || '/';
            let g = await F.prepare(e, t, {
                srcPage: w,
                multiZoneDraftMode: !1,
            });
            if (!g)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == n.waitUntil ||
                        n.waitUntil.call(n, Promise.resolve()),
                    null
                );
            let {
                    buildId: E,
                    params: b,
                    nextConfig: N,
                    parsedUrl: A,
                    isDraftMode: P,
                    prerenderManifest: I,
                    routerServerContext: C,
                    isOnDemandRevalidate: T,
                    revalidateOnlyGenerated: x,
                    resolvedPathname: O,
                    clientReferenceManifest: _,
                    serverActionsManifest: S,
                } = g,
                D = (0, l.normalizeAppPath)(w),
                B = !!(I.dynamicRoutes[D] || I.routes[O]),
                L = async () => (
                    (null == C ? void 0 : C.render404)
                        ? await C.render404(e, t, A, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (B && !P) {
                let e = !!I.routes[O],
                    t = I.dynamicRoutes[D];
                if (t && !1 === t.fallback && !e) {
                    if (N.experimental.adapterPath) return await L();
                    throw new R.NoFallbackError();
                }
            }
            let k = null;
            !B || F.isDev || P || (k = '/index' === (k = O) ? '/' : k);
            let M = !0 === F.isDev || !B,
                U = B && !M;
            S &&
                _ &&
                (0, o.setReferenceManifestsSingleton)({
                    page: w,
                    clientReferenceManifest: _,
                    serverActionsManifest: S,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: S,
                    }),
                });
            let H = e.method || 'GET',
                j = (0, a.getTracer)(),
                $ = j.getActiveScopeSpan(),
                Z = {
                    params: b,
                    prerenderManifest: I,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!N.experimental.authInterrupts,
                        },
                        cacheComponents: !!N.cacheComponents,
                        supportsDynamicResponse: M,
                        incrementalCache: (0, i.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: N.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            F.onRequestError(e, t, n, C),
                    },
                    sharedContext: { buildId: E },
                },
                q = new u.NodeNextRequest(e),
                W = new u.NodeNextResponse(t),
                K = d.NextRequestAdapter.fromNodeNextRequest(
                    q,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        F.handle(K, Z).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = j.getRootSpanAttributes();
                            if (!r) return;
                            if (
                                r.get('next.span_type') !==
                                c.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let n = r.get('next.route');
                            if (n) {
                                let t = `${H} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${H} ${w}`);
                        }),
                    s = !!(0, i.getRequestMeta)(e, 'minimalMode'),
                    l = async (i) => {
                        var a, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && T && x && !r)
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
                                    let a = await o(i);
                                    e.fetchMetrics = Z.renderOpts.fetchMetrics;
                                    let l = Z.renderOpts.pendingWaitUntil;
                                    l &&
                                        n.waitUntil &&
                                        (n.waitUntil(l), (l = void 0));
                                    let u = Z.renderOpts.collectedTags;
                                    if (!B)
                                        return (
                                            await (0, m.sendResponse)(
                                                q,
                                                W,
                                                a,
                                                Z.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await a.blob(),
                                            t = (0,
                                            h.toNodeOutgoingHttpHeaders)(
                                                a.headers
                                            );
                                        (u && (t[y.NEXT_CACHE_TAGS_HEADER] = u),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    Z.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    Z.renderOpts
                                                        .collectedRevalidate >=
                                                    y.INFINITE_CACHE
                                                ) &&
                                                Z.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    Z.renderOpts
                                                        .collectedExpire ||
                                                Z.renderOpts.collectedExpire >=
                                                    y.INFINITE_CACHE
                                                    ? void 0
                                                    : Z.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: v.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: a.status,
                                                body: Buffer.from(
                                                    await e.arrayBuffer()
                                                ),
                                                headers: t,
                                            },
                                            cacheControl: {
                                                revalidate: r,
                                                expire: n,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == r ? void 0 : r.isStale) &&
                                            (await F.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: w,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: U,
                                                        isOnDemandRevalidate: T,
                                                    }),
                                                },
                                                C
                                            )),
                                        t
                                    );
                                }
                            },
                            d = await F.handleResponse({
                                req: e,
                                nextConfig: N,
                                cacheKey: k,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: I,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: T,
                                revalidateOnlyGenerated: x,
                                responseGenerator: u,
                                waitUntil: n.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!B) return null;
                        if (
                            (null == d || null == (a = d.value)
                                ? void 0
                                : a.kind) !== v.CachedRouteKind.APP_ROUTE
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
                                T
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            P &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (s && B) || c.delete(y.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                q,
                                W,
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
                    : await j.withPropagatedContext(e.headers, () =>
                          j.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${H} ${w}`,
                                  kind: a.SpanKind.SERVER,
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
                    (t instanceof R.NoFallbackError ||
                        (await F.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: D,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: U,
                                isOnDemandRevalidate: T,
                            }),
                        })),
                    B)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        q,
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
                () => Z,
                'routeModule',
                () => F,
                'serverHooks',
                () => $,
                'workAsyncStorage',
                () => H,
                'workUnitAsyncStorage',
                () => j,
            ],
            317069
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_6e295b80.js.map
