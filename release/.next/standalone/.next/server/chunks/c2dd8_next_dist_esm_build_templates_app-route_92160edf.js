module.exports = [
    590728,
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
        var w = e.i(377404),
            v = e.i(738342),
            g = e.i(698043),
            E = e.i(453852);
        function A() {
            return {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, x-company-id',
            };
        }
        function b(e, t) {
            let r = t.toLowerCase();
            for (let [t, n] of e.headers.entries())
                if (t.toLowerCase() === r) {
                    let e = String(n ?? '').trim();
                    return e.length ? e : null;
                }
            return null;
        }
        async function N(e) {
            let t = e.headers.get('authorization') || '',
                r = t.startsWith('Bearer ') ? t.slice(7).trim() : '';
            if (!r) throw Error('missing_token');
            let n = await (0, E.verifyAppJwt)(r),
                i = 'string' == typeof n?.sub ? String(n.sub).trim() : '';
            if (!i) throw Error('invalid_token');
            let a =
                'string' == typeof n?.companyId
                    ? String(n.companyId).trim()
                    : '';
            if (!a) {
                let t = b(e, 'x-company-id');
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
        let C = {
            DIAMANTE: ['DIAMANTE', 'OURO', 'PRATA', 'BRONZE'],
            OURO: ['OURO', 'PRATA', 'BRONZE'],
            PRATA: ['PRATA', 'BRONZE'],
            BRONZE: ['BRONZE'],
        };
        function P(e, t) {
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
        function T(e, t, r) {
            return new Date(
                `${String(e).padStart(4, '0')}-${String(t).padStart(2, '0')}-${String(r).padStart(2, '0')}T00:00:00Z`
            );
        }
        function I(e, t) {
            let r = new Date(e.getTime());
            return (r.setUTCDate(r.getUTCDate() + t), r);
        }
        function O(e) {
            return 'BRONZE' === e ||
                'PRATA' === e ||
                'OURO' === e ||
                'DIAMANTE' === e
                ? e
                : null;
        }
        function x(e) {
            return Number.isFinite(e)
                ? Math.max(0, Math.min(100, Math.floor(e)))
                : 0;
        }
        function S(e) {
            return Math.round((e + Number.EPSILON) * 100) / 100;
        }
        function _(e, t) {
            return S(e * (1 - x(t) / 100));
        }
        async function B(e) {
            let t = e.timeZone ?? 'America/Sao_Paulo',
                r = e.now ?? new Date(),
                n = e.effectiveLevel ?? 'BRONZE',
                i = e.product,
                a = e.clientBirthday,
                o = Number(i.price),
                s = new Map();
            for (let e of i.discounts ?? []) {
                let t = O(e.level),
                    r = x(Number(e.discountPct));
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
                    n = P(r, t),
                    i = P(a, t),
                    o = T(n.year, i.month, i.day),
                    s = I(o, -3),
                    l = I(o, 3);
                ((d = T(n.year, n.month, n.day)),
                    (u = (e = d.getTime()) >= s.getTime() && e <= l.getTime()));
            }
            if (u && i.birthdayBenefitEnabled) {
                let e = l(O(i.birthdayPriceLevel) ?? 'DIAMANTE'),
                    t = _(o, e.discountPct);
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
                p = _(o, c.discountPct);
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
        async function D() {
            return new v.NextResponse(null, { status: 204, headers: A() });
        }
        async function M(e) {
            let t = A();
            try {
                let r = await N(e),
                    n = r.companyId,
                    i = (function (e) {
                        let t = b(e, 'x-forwarded-proto'),
                            r = b(e, 'x-forwarded-host') || b(e, 'host'),
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
                    a = b(e, 'x-company-id');
                if (a && a !== n)
                    return v.NextResponse.json(
                        { error: 'company_id_mismatch' },
                        {
                            status: 400,
                            headers: { ...t, 'Cache-Control': 'no-store' },
                        }
                    );
                let o = 'CLIENT' === r.role ? r.sub : null,
                    s = o
                        ? await g.prisma.user.findFirst({
                              where: {
                                  id: o,
                                  companyMemberships: {
                                      some: { companyId: n, isActive: !0 },
                                  },
                              },
                              select: { id: !0, birthday: !0 },
                          })
                        : null,
                    l = await g.prisma.product.findMany({
                        where: {
                            isActive: !0,
                            isFeatured: !0,
                            unit: { companyId: n, isActive: !0 },
                        },
                        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
                        take: 30,
                        include: { unit: { select: { id: !0, name: !0 } } },
                    }),
                    u = new Map(l.map((e) => [e.id, e])),
                    d = l.map((e) => e.id),
                    c =
                        d.length > 0
                            ? await g.prisma.productDiscountByLevel.findMany({
                                  where: { companyId: n, productId: { in: d } },
                                  select: {
                                      productId: !0,
                                      level: !0,
                                      discountPct: !0,
                                  },
                              })
                            : [],
                    p = new Map();
                for (let e of c) {
                    let t = O(e.level);
                    if (!t) continue;
                    let r = x(Number(e.discountPct)),
                        n = p.get(e.productId) ?? [];
                    (n.push({ level: t, discountPct: r }),
                        p.set(e.productId, n));
                }
                let m = new Map();
                if (o) {
                    let e = Array.from(new Set(l.map((e) => e.unitId))).filter(
                        Boolean
                    );
                    if (e.length > 0)
                        for (let t of await g.prisma.customerLevelState.findMany(
                            {
                                where: {
                                    companyId: n,
                                    userId: o,
                                    unitId: { in: e },
                                },
                                select: { unitId: !0, levelCurrent: !0 },
                            }
                        )) {
                            let e = O(t.levelCurrent);
                            e && m.set(t.unitId, e);
                        }
                }
                let h = l.map((e) => {
                        let t = m.get(e.unitId) ?? 'BRONZE';
                        return {
                            product: {
                                id: e.id,
                                unitId: e.unitId,
                                price: e.price,
                                birthdayBenefitEnabled:
                                    e.birthdayBenefitEnabled ?? !1,
                                birthdayPriceLevel:
                                    e.birthdayPriceLevel ?? null,
                                discounts: p.get(e.id) ?? [],
                            },
                            clientBirthday: s?.birthday ?? null,
                            effectiveLevel: t,
                            timeZone: 'America/Sao_Paulo',
                            now: new Date(),
                        };
                    }),
                    f = await Promise.all(
                        h.map(async (e) => {
                            let t = await B(e),
                                r = Number(t.basePrice),
                                n = Number(t.finalPrice),
                                a =
                                    Number.isFinite(r) &&
                                    Number.isFinite(n) &&
                                    n < r,
                                o = a ? S(Math.max(0, r - n)) : 0,
                                s = x(Number(t.discountPct ?? 0)),
                                l =
                                    'BIRTHDAY' === t.appliedBecause
                                        ? {
                                              type: 'BIRTHDAY',
                                              label: '🎂 Aniversário',
                                          }
                                        : a
                                          ? {
                                                type: 'DISCOUNT',
                                                label: `${s}% OFF`,
                                            }
                                          : null,
                                d = u.get(e.product.id);
                            if (!d) throw Error('product_not_found_in_memory');
                            let c =
                                    'number' == typeof d.stockQuantity
                                        ? d.stockQuantity
                                        : 0,
                                p =
                                    'number' == typeof d.pickupDeadlineDays &&
                                    Number.isFinite(d.pickupDeadlineDays) &&
                                    d.pickupDeadlineDays > 0
                                        ? d.pickupDeadlineDays
                                        : 2,
                                m = (function (e, t) {
                                    let r = String(t ?? '').trim();
                                    if (!r) return null;
                                    let n = r.toLowerCase(),
                                        i = String(e ?? '').trim(),
                                        a = !!i;
                                    if (
                                        n.startsWith('http://') ||
                                        n.startsWith('https://')
                                    ) {
                                        if (!a) return r;
                                        try {
                                            let e = new URL(r),
                                                t =
                                                    e.hostname?.toLowerCase?.() ??
                                                    '';
                                            if (
                                                'localhost' === t ||
                                                '127.0.0.1' === t
                                            ) {
                                                let t = i.endsWith('/')
                                                    ? i.slice(0, -1)
                                                    : i;
                                                return `${t}${e.pathname}${e.search}`;
                                            }
                                        } catch {}
                                        return r;
                                    }
                                    let o = r.startsWith('/') ? r : `/${r}`;
                                    if (!a) return o;
                                    let s = i.endsWith('/')
                                        ? i.slice(0, -1)
                                        : i;
                                    return `${s}${o}`;
                                })(i, d.imageUrl);
                            return {
                                id: d.id,
                                name: d.name,
                                imageUrl: m,
                                description: d.description,
                                category: d.category ?? null,
                                stockQuantity: c,
                                isOutOfStock: c <= 0,
                                pickupDeadlineDays: p,
                                unitId: d.unitId,
                                unitName: d.unit?.name ?? '—',
                                basePrice: r,
                                finalPrice: n,
                                hasDiscount: a,
                                savings: o,
                                discountPct: s,
                                price: n,
                                pricing: {
                                    customerLevel: e.effectiveLevel,
                                    appliedLevel: t.appliedLevel,
                                    appliedBecause: t.appliedBecause,
                                    inBirthdayWindow: t.inBirthdayWindow,
                                    discountPct: s,
                                },
                                badge: l,
                            };
                        })
                    ),
                    y = v.NextResponse.json(
                        { ok: !0, items: f, products: f, count: f.length },
                        {
                            status: 200,
                            headers: { ...t, 'Cache-Control': 'no-store' },
                        }
                    );
                return (y.headers.set('x-company-id', n), y);
            } catch (r) {
                let e = String(r?.message ?? '');
                if (e.includes('missing_token'))
                    return v.NextResponse.json(
                        { error: 'missing_token' },
                        { status: 401, headers: t }
                    );
                if (e.includes('missing_company_id'))
                    return v.NextResponse.json(
                        { error: 'missing_company_id' },
                        { status: 401, headers: t }
                    );
                if (e.includes('forbidden_company'))
                    return v.NextResponse.json(
                        { error: 'forbidden_company' },
                        { status: 403, headers: t }
                    );
                if (
                    e.includes('Invalid token') ||
                    e.includes('JWT') ||
                    e.toLowerCase().includes('token') ||
                    e.includes('invalid_token')
                )
                    return v.NextResponse.json(
                        { error: 'invalid_token' },
                        { status: 401, headers: t }
                    );
                return (
                    console.error('[mobile featured products] error:', r),
                    v.NextResponse.json(
                        { error: 'server_error' },
                        { status: 500, headers: t }
                    )
                );
            }
        }
        e.s(
            [
                'GET',
                () => M,
                'OPTIONS',
                () => D,
                'dynamic',
                0,
                'force-dynamic',
                'revalidate',
                0,
                0,
            ],
            262642
        );
        var k = e.i(262642);
        let L = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/mobile/products/featured/route',
                    pathname: '/api/mobile/products/featured',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/mobile/products/featured/route.ts',
                nextConfigOutput: 'standalone',
                userland: k,
            }),
            {
                workAsyncStorage: U,
                workUnitAsyncStorage: H,
                serverHooks: $,
            } = L;
        function F() {
            return (0, n.patchFetch)({
                workAsyncStorage: U,
                workUnitAsyncStorage: H,
            });
        }
        async function j(e, t, n) {
            L.isDev &&
                (0, i.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let v = '/api/mobile/products/featured/route';
            v = v.replace(/\/index$/, '') || '/';
            let g = await L.prepare(e, t, {
                srcPage: v,
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
                    params: A,
                    nextConfig: b,
                    parsedUrl: N,
                    isDraftMode: C,
                    prerenderManifest: P,
                    routerServerContext: T,
                    isOnDemandRevalidate: I,
                    revalidateOnlyGenerated: O,
                    resolvedPathname: x,
                    clientReferenceManifest: S,
                    serverActionsManifest: _,
                } = g,
                B = (0, l.normalizeAppPath)(v),
                D = !!(P.dynamicRoutes[B] || P.routes[x]),
                M = async () => (
                    (null == T ? void 0 : T.render404)
                        ? await T.render404(e, t, N, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (D && !C) {
                let e = !!P.routes[x],
                    t = P.dynamicRoutes[B];
                if (t && !1 === t.fallback && !e) {
                    if (b.experimental.adapterPath) return await M();
                    throw new R.NoFallbackError();
                }
            }
            let k = null;
            !D || L.isDev || C || (k = '/index' === (k = x) ? '/' : k);
            let U = !0 === L.isDev || !D,
                H = D && !U;
            _ &&
                S &&
                (0, o.setReferenceManifestsSingleton)({
                    page: v,
                    clientReferenceManifest: S,
                    serverActionsManifest: _,
                    serverModuleMap: (0, s.createServerModuleMap)({
                        serverActionsManifest: _,
                    }),
                });
            let $ = e.method || 'GET',
                F = (0, a.getTracer)(),
                j = F.getActiveScopeSpan(),
                q = {
                    params: A,
                    prerenderManifest: P,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!b.experimental.authInterrupts,
                        },
                        cacheComponents: !!b.cacheComponents,
                        supportsDynamicResponse: U,
                        incrementalCache: (0, i.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: b.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            L.onRequestError(e, t, n, T),
                    },
                    sharedContext: { buildId: E },
                },
                W = new u.NodeNextRequest(e),
                Z = new u.NodeNextResponse(t),
                K = d.NextRequestAdapter.fromNodeNextRequest(
                    W,
                    (0, d.signalFromNodeResponse)(t)
                );
            try {
                let o = async (e) =>
                        L.handle(K, q).finally(() => {
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
                            let n = r.get('next.route');
                            if (n) {
                                let t = `${$} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${$} ${v}`);
                        }),
                    s = !!(0, i.getRequestMeta)(e, 'minimalMode'),
                    l = async (i) => {
                        var a, l;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!s && I && O && !r)
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
                                    e.fetchMetrics = q.renderOpts.fetchMetrics;
                                    let l = q.renderOpts.pendingWaitUntil;
                                    l &&
                                        n.waitUntil &&
                                        (n.waitUntil(l), (l = void 0));
                                    let u = q.renderOpts.collectedTags;
                                    if (!D)
                                        return (
                                            await (0, m.sendResponse)(
                                                W,
                                                Z,
                                                a,
                                                q.renderOpts.pendingWaitUntil
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
                                                    q.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    q.renderOpts
                                                        .collectedRevalidate >=
                                                    y.INFINITE_CACHE
                                                ) &&
                                                q.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    q.renderOpts
                                                        .collectedExpire ||
                                                q.renderOpts.collectedExpire >=
                                                    y.INFINITE_CACHE
                                                    ? void 0
                                                    : q.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: w.CachedRouteKind
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
                                            (await L.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: v,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: H,
                                                        isOnDemandRevalidate: I,
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
                                nextConfig: b,
                                cacheKey: k,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: P,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: I,
                                revalidateOnlyGenerated: O,
                                responseGenerator: u,
                                waitUntil: n.waitUntil,
                                isMinimalMode: s,
                            });
                        if (!D) return null;
                        if (
                            (null == d || null == (a = d.value)
                                ? void 0
                                : a.kind) !== w.CachedRouteKind.APP_ROUTE
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
                                I
                                    ? 'REVALIDATED'
                                    : d.isMiss
                                      ? 'MISS'
                                      : d.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            C &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, h.fromNodeOutgoingHttpHeaders)(
                            d.value.headers
                        );
                        return (
                            (s && D) || c.delete(y.NEXT_CACHE_TAGS_HEADER),
                            !d.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, f.getCacheControlHeader)(d.cacheControl)
                                ),
                            await (0, m.sendResponse)(
                                W,
                                Z,
                                new Response(d.value.body, {
                                    headers: c,
                                    status: d.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                j
                    ? await l(j)
                    : await F.withPropagatedContext(e.headers, () =>
                          F.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${$} ${v}`,
                                  kind: a.SpanKind.SERVER,
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
                    (t instanceof R.NoFallbackError ||
                        (await L.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: B,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: H,
                                isOnDemandRevalidate: I,
                            }),
                        })),
                    D)
                )
                    throw t;
                return (
                    await (0, m.sendResponse)(
                        W,
                        Z,
                        new Response(null, { status: 500 })
                    ),
                    null
                );
            }
        }
        e.s(
            [
                'handler',
                () => j,
                'patchFetch',
                () => F,
                'routeModule',
                () => L,
                'serverHooks',
                () => $,
                'workAsyncStorage',
                () => U,
                'workUnitAsyncStorage',
                () => H,
            ],
            590728
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_92160edf.js.map
