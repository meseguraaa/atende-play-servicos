module.exports = [
    414103,
    (e) => {
        'use strict';
        var t = e.i(154154),
            i = e.i(140407),
            n = e.i(493068),
            r = e.i(821498),
            a = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            d = e.i(337047),
            l = e.i(528171),
            u = e.i(367300),
            c = e.i(102610),
            p = e.i(670893),
            f = e.i(902769),
            m = e.i(46094),
            h = e.i(622730),
            v = e.i(811178),
            I = e.i(193695);
        e.i(629399);
        var w = e.i(377404),
            N = e.i(738342),
            A = e.i(698043),
            E = e.i(896407);
        function R(e, t = 400) {
            return N.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function g(e, t = 200) {
            return N.NextResponse.json({ ok: !0, data: e }, { status: t });
        }
        function C(e) {
            return String(e ?? '').trim();
        }
        function P(e) {
            if (null == e) return NaN;
            if ('number' == typeof e) return e;
            if ('string' == typeof e) {
                let t = Number(e.replace(',', '.'));
                return Number.isFinite(t) ? t : NaN;
            }
            if ('object' == typeof e) {
                if ('function' == typeof e.toNumber) {
                    let t = e.toNumber();
                    return Number.isFinite(t) ? t : NaN;
                }
                if ('function' == typeof e.toString) {
                    let t = Number(String(e.toString()).replace(',', '.'));
                    return Number.isFinite(t) ? t : NaN;
                }
            }
            return NaN;
        }
        function y(e) {
            let t = P(e);
            return Number.isFinite(t)
                ? Math.round((t + Number.EPSILON) * 100) / 100
                : 0;
        }
        async function T(e) {
            return !!(await A.prisma.professionalUnit.findFirst({
                where: {
                    companyId: e.companyId,
                    professionalId: e.professionalId,
                    unitId: e.unitId,
                    isActive: !0,
                },
                select: { id: !0 },
            }));
        }
        async function b(e, t) {
            try {
                let i,
                    n,
                    r = await (0, E.requireProfessionalSession)(),
                    a = C(r.companyId),
                    s = C(r.professionalId),
                    o = C(r.userId);
                if (!a || !s || !o)
                    return R('Sessão do profissional inválida.', 401);
                let { appointmentId: d } = await t.params,
                    l = C(d);
                if (!l) return R('appointmentId é obrigatório.', 400);
                let u = await e.json().catch(() => null);
                if (!u) return R('Body inválido.');
                let c = await A.prisma.appointment.findFirst({
                    where: { id: l, companyId: a, professionalId: s },
                    select: {
                        id: !0,
                        unitId: !0,
                        status: !0,
                        clientId: !0,
                        professionalId: !0,
                        serviceId: !0,
                        servicePriceAtTheTime: !0,
                        professionalPercentageAtTheTime: !0,
                        professionalEarningValue: !0,
                        scheduleAt: !0,
                    },
                });
                if (!c) return R('Agendamento não encontrado.', 404);
                if (
                    !(await T({
                        companyId: a,
                        professionalId: s,
                        unitId: c.unitId,
                    }))
                )
                    return R('Sem acesso a esta unidade.', 403);
                let p =
                    ((i = C(u?.action).toLowerCase()),
                    (n = C(u?.status).toUpperCase()),
                    'cancel' === i
                        ? 'CANCELED'
                        : 'done' === i
                          ? 'DONE'
                          : 'PENDING' === n || 'DONE' === n || 'CANCELED' === n
                            ? n
                            : null);
                if (p) {
                    if (c.status === p) {
                        if ('DONE' === p) {
                            let e = await A.prisma.order.findFirst({
                                where: { companyId: a, appointmentId: c.id },
                                select: { id: !0, status: !0, totalAmount: !0 },
                            });
                            return g({
                                id: c.id,
                                status: c.status,
                                order: e
                                    ? {
                                          id: e.id,
                                          status: e.status,
                                          totalAmount: e.totalAmount,
                                      }
                                    : null,
                                orderCreated: !1,
                            });
                        }
                        return g({ id: c.id, status: c.status });
                    }
                    if ('PENDING' !== c.status)
                        return R(
                            'Só é possível concluir/cancelar agendamentos pendentes.',
                            400
                        );
                    if ('CANCELED' === p) {
                        let e = new Date(),
                            t = await A.prisma.appointment.update({
                                where: { id: c.id },
                                data: {
                                    status: 'CANCELED',
                                    cancelledAt: e,
                                    cancelledByRole: 'PROFESSIONAL',
                                    cancelledByUserId: o,
                                },
                                select: { id: !0, status: !0 },
                            });
                        return g({ id: t.id, status: t.status });
                    }
                    if ('DONE' === p) {
                        let e = new Date(),
                            t = await A.prisma.$transaction(async (t) => {
                                let i,
                                    n = c.serviceId
                                        ? await t.service.findFirst({
                                              where: {
                                                  id: c.serviceId,
                                                  companyId: a,
                                              },
                                              select: {
                                                  id: !0,
                                                  name: !0,
                                                  price: !0,
                                                  professionalPercentage: !0,
                                                  isActive: !0,
                                              },
                                          })
                                        : null,
                                    r =
                                        null != c.servicePriceAtTheTime
                                            ? c.servicePriceAtTheTime
                                            : (n?.price ?? null),
                                    s =
                                        null !=
                                        c.professionalPercentageAtTheTime
                                            ? c.professionalPercentageAtTheTime
                                            : (n?.professionalPercentage ??
                                              null),
                                    d = null != r ? y(r) : 0,
                                    l =
                                        null != s
                                            ? ((i = P(s)),
                                              Number.isFinite(i)
                                                  ? Math.max(
                                                        0,
                                                        Math.min(100, i)
                                                    )
                                                  : 0)
                                            : 0,
                                    u =
                                        null != r && null != s
                                            ? y((d * l) / 100)
                                            : null,
                                    p = await t.appointment.update({
                                        where: { id: c.id },
                                        data: {
                                            status: 'DONE',
                                            doneAt: e,
                                            concludedByRole: 'PROFESSIONAL',
                                            concludedByUserId: o,
                                            servicePriceAtTheTime:
                                                null != c.servicePriceAtTheTime
                                                    ? void 0
                                                    : (r ?? void 0),
                                            professionalPercentageAtTheTime:
                                                null !=
                                                c.professionalPercentageAtTheTime
                                                    ? void 0
                                                    : (s ?? void 0),
                                            professionalEarningValue:
                                                null !=
                                                c.professionalEarningValue
                                                    ? void 0
                                                    : (u ?? void 0),
                                        },
                                        select: {
                                            id: !0,
                                            status: !0,
                                            unitId: !0,
                                            clientId: !0,
                                            professionalId: !0,
                                            serviceId: !0,
                                        },
                                    }),
                                    f = await t.order.findFirst({
                                        where: {
                                            companyId: a,
                                            appointmentId: p.id,
                                        },
                                        select: { id: !0 },
                                    }),
                                    m = !1,
                                    h = f?.id
                                        ? f.id
                                        : (
                                              await t.order.create({
                                                  data: {
                                                      companyId: a,
                                                      unitId: p.unitId,
                                                      appointmentId: p.id,
                                                      clientId:
                                                          p.clientId ?? null,
                                                      professionalId:
                                                          p.professionalId ??
                                                          null,
                                                      status: 'PENDING',
                                                      totalAmount: 0,
                                                  },
                                                  select: { id: !0 },
                                              })
                                          ).id;
                                if (
                                    (f?.id || (m = !0),
                                    p.serviceId &&
                                        !(await t.orderItem.findFirst({
                                            where: {
                                                companyId: a,
                                                orderId: h,
                                                serviceId: p.serviceId,
                                            },
                                            select: { id: !0 },
                                        })))
                                ) {
                                    let e = r ?? n?.price;
                                    null != e &&
                                        (await t.orderItem.create({
                                            data: {
                                                companyId: a,
                                                orderId: h,
                                                serviceId: p.serviceId,
                                                quantity: 1,
                                                unitPrice: e,
                                                totalPrice: e,
                                                professionalId:
                                                    p.professionalId ?? null,
                                            },
                                            select: { id: !0 },
                                        }));
                                }
                                let v = await t.orderItem.findMany({
                                        where: { companyId: a, orderId: h },
                                        select: { totalPrice: !0 },
                                    }),
                                    I = y(
                                        (v ?? []).reduce(
                                            (e, t) => e + y(t.totalPrice),
                                            0
                                        )
                                    ),
                                    w = await t.order.update({
                                        where: { id: h },
                                        data: { totalAmount: I },
                                        select: {
                                            id: !0,
                                            status: !0,
                                            totalAmount: !0,
                                        },
                                    });
                                return {
                                    appointment: p,
                                    order: w,
                                    orderCreated: m,
                                };
                            });
                        return g({
                            id: t.appointment.id,
                            status: t.appointment.status,
                            order: t.order,
                            orderCreated: t.orderCreated,
                        });
                    }
                    let e = await A.prisma.appointment.update({
                        where: { id: c.id },
                        data: { status: p },
                        select: { id: !0, status: !0 },
                    });
                    return g({ id: e.id, status: e.status });
                }
                if (
                    !(
                        u &&
                        'object' == typeof u &&
                        'clientId' in u &&
                        'unitId' in u &&
                        'professionalId' in u &&
                        'serviceId' in u &&
                        'scheduleAt' in u
                    )
                )
                    return R(
                        'Body inválido. Use { action: "cancel" | "done" } para status, ou envie dados de edição (clientId, unitId, professionalId, serviceId, scheduleAt...).',
                        400
                    );
                if ('PENDING' !== c.status)
                    return R(
                        'Só é possível editar agendamentos pendentes.',
                        400
                    );
                let f = C(u.clientId),
                    m = C(u.clientName),
                    h = C(u.phone),
                    v = C(u.unitId),
                    I = C(u.serviceId),
                    w = (function (e) {
                        let t = C(e);
                        if (!t) return null;
                        let i = new Date(t);
                        return Number.isNaN(i.getTime()) ? null : i;
                    })(u.scheduleAt);
                if (!w) return R('scheduleAt inválido.', 400);
                if (!f) return R('clientId é obrigatório.', 400);
                if (!m) return R('clientName é obrigatório.', 400);
                if (!h) return R('phone é obrigatório.', 400);
                if (!v) return R('unitId é obrigatório.', 400);
                if (!I) return R('serviceId é obrigatório.', 400);
                if (!(await T({ companyId: a, professionalId: s, unitId: v })))
                    return R('Sem acesso a esta unidade.', 403);
                if (
                    !(await A.prisma.user.findFirst({
                        where: {
                            id: f,
                            isActive: !0,
                            companyMemberships: {
                                some: {
                                    companyId: a,
                                    isActive: !0,
                                    role: 'CLIENT',
                                },
                            },
                        },
                        select: { id: !0 },
                    }))
                )
                    return R('Cliente não encontrado.', 404);
                let N = await A.prisma.service.findFirst({
                    where: { id: I, companyId: a },
                    select: { id: !0, name: !0, isActive: !0, unitId: !0 },
                });
                if (!N) return R('Serviço não encontrado.', 404);
                if (!1 === N.isActive) return R('Serviço inativo.', 400);
                if (N.unitId && N.unitId !== v)
                    return R(
                        'Este serviço não pertence à unidade selecionada.',
                        400
                    );
                if (
                    await A.prisma.appointment.findFirst({
                        where: {
                            companyId: a,
                            id: { not: c.id },
                            status: 'PENDING',
                            professionalId: s,
                            scheduleAt: w,
                        },
                        select: { id: !0 },
                    })
                )
                    return R(
                        'Horário indisponível para este profissional.',
                        400
                    );
                let b = C(u.description) || N.name || 'Atendimento',
                    S = await A.prisma.appointment.update({
                        where: { id: c.id },
                        data: {
                            clientId: f,
                            clientName: m,
                            phone: h,
                            unitId: v,
                            professionalId: s,
                            serviceId: I,
                            description: b,
                            scheduleAt: w,
                        },
                        select: {
                            id: !0,
                            status: !0,
                            unitId: !0,
                            professionalId: !0,
                            serviceId: !0,
                            scheduleAt: !0,
                        },
                    });
                return g(S);
            } catch (e) {
                return R(e?.message ?? 'Erro interno.', 500);
            }
        }
        e.s(['PATCH', () => b], 881370);
        var S = e.i(881370);
        let x = new t.AppRouteRouteModule({
                definition: {
                    kind: i.RouteKind.APP_ROUTE,
                    page: '/api/professional/appointments/[appointmentId]/route',
                    pathname: '/api/professional/appointments/[appointmentId]',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/professional/appointments/[appointmentId]/route.ts',
                nextConfigOutput: 'standalone',
                userland: S,
            }),
            {
                workAsyncStorage: O,
                workUnitAsyncStorage: D,
                serverHooks: F,
            } = x;
        function M() {
            return (0, n.patchFetch)({
                workAsyncStorage: O,
                workUnitAsyncStorage: D,
            });
        }
        async function U(e, t, n) {
            x.isDev &&
                (0, r.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let N = '/api/professional/appointments/[appointmentId]/route';
            N = N.replace(/\/index$/, '') || '/';
            let A = await x.prepare(e, t, {
                srcPage: N,
                multiZoneDraftMode: !1,
            });
            if (!A)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == n.waitUntil ||
                        n.waitUntil.call(n, Promise.resolve()),
                    null
                );
            let {
                    buildId: E,
                    params: R,
                    nextConfig: g,
                    parsedUrl: C,
                    isDraftMode: P,
                    prerenderManifest: y,
                    routerServerContext: T,
                    isOnDemandRevalidate: b,
                    revalidateOnlyGenerated: S,
                    resolvedPathname: O,
                    clientReferenceManifest: D,
                    serverActionsManifest: F,
                } = A,
                M = (0, d.normalizeAppPath)(N),
                U = !!(y.dynamicRoutes[M] || y.routes[O]),
                _ = async () => (
                    (null == T ? void 0 : T.render404)
                        ? await T.render404(e, t, C, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (U && !P) {
                let e = !!y.routes[O],
                    t = y.dynamicRoutes[M];
                if (t && !1 === t.fallback && !e) {
                    if (g.experimental.adapterPath) return await _();
                    throw new I.NoFallbackError();
                }
            }
            let H = null;
            !U || x.isDev || P || (H = '/index' === (H = O) ? '/' : H);
            let q = !0 === x.isDev || !U,
                k = U && !q;
            F &&
                D &&
                (0, s.setReferenceManifestsSingleton)({
                    page: N,
                    clientReferenceManifest: D,
                    serverActionsManifest: F,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: F,
                    }),
                });
            let L = e.method || 'GET',
                j = (0, a.getTracer)(),
                B = j.getActiveScopeSpan(),
                $ = {
                    params: R,
                    prerenderManifest: y,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!g.experimental.authInterrupts,
                        },
                        cacheComponents: !!g.cacheComponents,
                        supportsDynamicResponse: q,
                        incrementalCache: (0, r.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: g.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, i, n) =>
                            x.onRequestError(e, t, n, T),
                    },
                    sharedContext: { buildId: E },
                },
                G = new l.NodeNextRequest(e),
                K = new l.NodeNextResponse(t),
                V = u.NextRequestAdapter.fromNodeNextRequest(
                    G,
                    (0, u.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        x.handle(V, $).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let i = j.getRootSpanAttributes();
                            if (!i) return;
                            if (
                                i.get('next.span_type') !==
                                c.BaseServerSpan.handleRequest
                            )
                                return void console.warn(
                                    `Unexpected root span type '${i.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                                );
                            let n = i.get('next.route');
                            if (n) {
                                let t = `${L} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${L} ${N}`);
                        }),
                    o = !!(0, r.getRequestMeta)(e, 'minimalMode'),
                    d = async (r) => {
                        var a, d;
                        let l = async ({ previousCacheEntry: i }) => {
                                try {
                                    if (!o && b && S && !i)
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
                                    let a = await s(r);
                                    e.fetchMetrics = $.renderOpts.fetchMetrics;
                                    let d = $.renderOpts.pendingWaitUntil;
                                    d &&
                                        n.waitUntil &&
                                        (n.waitUntil(d), (d = void 0));
                                    let l = $.renderOpts.collectedTags;
                                    if (!U)
                                        return (
                                            await (0, f.sendResponse)(
                                                G,
                                                K,
                                                a,
                                                $.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await a.blob(),
                                            t = (0,
                                            m.toNodeOutgoingHttpHeaders)(
                                                a.headers
                                            );
                                        (l && (t[v.NEXT_CACHE_TAGS_HEADER] = l),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let i =
                                                void 0 !==
                                                    $.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    $.renderOpts
                                                        .collectedRevalidate >=
                                                    v.INFINITE_CACHE
                                                ) &&
                                                $.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    $.renderOpts
                                                        .collectedExpire ||
                                                $.renderOpts.collectedExpire >=
                                                    v.INFINITE_CACHE
                                                    ? void 0
                                                    : $.renderOpts
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
                                                revalidate: i,
                                                expire: n,
                                            },
                                        };
                                    }
                                } catch (t) {
                                    throw (
                                        (null == i ? void 0 : i.isStale) &&
                                            (await x.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: N,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    p.getRevalidateReason)({
                                                        isStaticGeneration: k,
                                                        isOnDemandRevalidate: b,
                                                    }),
                                                },
                                                T
                                            )),
                                        t
                                    );
                                }
                            },
                            u = await x.handleResponse({
                                req: e,
                                nextConfig: g,
                                cacheKey: H,
                                routeKind: i.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: y,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: b,
                                revalidateOnlyGenerated: S,
                                responseGenerator: l,
                                waitUntil: n.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!U) return null;
                        if (
                            (null == u || null == (a = u.value)
                                ? void 0
                                : a.kind) !== w.CachedRouteKind.APP_ROUTE
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
                        (o ||
                            t.setHeader(
                                'x-nextjs-cache',
                                b
                                    ? 'REVALIDATED'
                                    : u.isMiss
                                      ? 'MISS'
                                      : u.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            P &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, m.fromNodeOutgoingHttpHeaders)(
                            u.value.headers
                        );
                        return (
                            (o && U) || c.delete(v.NEXT_CACHE_TAGS_HEADER),
                            !u.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, h.getCacheControlHeader)(u.cacheControl)
                                ),
                            await (0, f.sendResponse)(
                                G,
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
                    : await j.withPropagatedContext(e.headers, () =>
                          j.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${L} ${N}`,
                                  kind: a.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': L,
                                      'http.target': e.url,
                                  },
                              },
                              d
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof I.NoFallbackError ||
                        (await x.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: M,
                            routeType: 'route',
                            revalidateReason: (0, p.getRevalidateReason)({
                                isStaticGeneration: k,
                                isOnDemandRevalidate: b,
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
                () => U,
                'patchFetch',
                () => M,
                'routeModule',
                () => x,
                'serverHooks',
                () => F,
                'workAsyncStorage',
                () => O,
                'workUnitAsyncStorage',
                () => D,
            ],
            414103
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_585668cf.js.map
