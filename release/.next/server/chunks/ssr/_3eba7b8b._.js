module.exports = [
    556557,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(587969),
            d = a.i(766153),
            e = a.i(779184),
            f = a.i(337850),
            g = a.i(259849),
            h = a.i(107439),
            i = a.i(665791),
            j = a.i(912288),
            k = a.i(773608),
            l = a.i(564092),
            m = a.i(499638),
            n = a.i(699570),
            o = a.i(320146),
            p = a.i(599209),
            q = a.i(335430),
            r = a.i(785259);
        let s = ({ tooltipText: a, onClick: c, children: d }) =>
            (0, b.jsx)(q.TooltipProvider, {
                children: (0, b.jsxs)(r.Tooltip, {
                    children: [
                        (0, b.jsx)(r.TooltipTrigger, {
                            asChild: !0,
                            children: (0, b.jsx)(n.Button, {
                                variant: 'outline',
                                size: 'icon',
                                onClick: c,
                                className:
                                    'h-12 w-9 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                children: d,
                            }),
                        }),
                        (0, b.jsx)(r.TooltipContent, {
                            className: 'bg-background-tertiary',
                            children: (0, b.jsx)('p', { children: a }),
                        }),
                    ],
                }),
            });
        a.s(
            [
                'DatePicker',
                0,
                ({ mode: a = 'date', hideNavigation: q }) => {
                    let r = (0, g.useRouter)(),
                        t = (0, g.usePathname)(),
                        u = (0, g.useSearchParams)(),
                        v = 'month' === a ? 'month' : 'date',
                        w = u.get(v),
                        x = (0, h.useCallback)(() => {
                            if ('month' === a) {
                                if (!w) return new Date();
                                let [a, b] = w.split('-').map(Number),
                                    c = new Date(a, (b ?? 1) - 1, 1);
                                return (0, l.isValid)(c) ? c : new Date();
                            }
                            if (!w) return new Date();
                            let [b, c, d] = w.split('-').map(Number),
                                e = new Date(b, (c ?? 1) - 1, d ?? 1);
                            return (0, l.isValid)(e) ? e : new Date();
                        }, [a, w]),
                        [y, z] = (0, h.useState)(() => x()),
                        [A, B] = (0, h.useState)(!1),
                        C = (0, h.useMemo)(
                            () =>
                                y
                                    ? 'month' === a
                                        ? (0, k.format)(y, 'MM/yyyy', {
                                              locale: m.ptBR,
                                          })
                                        : (0, k.format)(y, 'dd/MM/yyyy', {
                                              locale: m.ptBR,
                                          })
                                    : 'Selecione uma data',
                            [y, a]
                        ),
                        D = (b) => {
                            let c = new URLSearchParams(u.toString());
                            if (
                                ('month' === a
                                    ? c.delete('date')
                                    : c.delete('month'),
                                'month' === a)
                            ) {
                                var d;
                                let a = new Date(
                                    b.getFullYear(),
                                    b.getMonth(),
                                    1
                                );
                                c.set(
                                    'month',
                                    ((d = a),
                                    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
                                );
                            } else
                                c.set('date', (0, k.format)(b, 'yyyy-MM-dd'));
                            let e = c.toString();
                            r.push(e ? `${t}?${e}` : t);
                        },
                        E = (b) => {
                            let c = y ?? new Date(),
                                d =
                                    'month' === a
                                        ? (0, j.addMonths)(c, b)
                                        : (0, i.addDays)(c, b),
                                e =
                                    'month' === a
                                        ? new Date(
                                              d.getFullYear(),
                                              d.getMonth(),
                                              1
                                          )
                                        : d;
                            (z(e), D(e));
                        };
                    (0, h.useEffect)(() => {
                        z(x());
                    }, [x]);
                    let F = 'month' === a ? 'Mês anterior' : 'Dia anterior',
                        G = 'month' === a ? 'Próximo mês' : 'Próximo dia';
                    return (0, b.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            !q &&
                                (0, b.jsx)(s, {
                                    tooltipText: F,
                                    onClick: () => E(-1),
                                    children: (0, b.jsx)(e.ChevronLeft, {
                                        className: 'h-4 w-4',
                                    }),
                                }),
                            (0, b.jsxs)(p.Popover, {
                                open: A,
                                onOpenChange: B,
                                children: [
                                    (0, b.jsx)(p.PopoverTrigger, {
                                        asChild: !0,
                                        children: (0, b.jsxs)(n.Button, {
                                            variant: 'outline',
                                            className:
                                                'min-w-[180px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'flex items-center gap-2',
                                                    children: [
                                                        (0, b.jsx)(c.Calendar, {
                                                            className:
                                                                'h-4 w-4 text-content-brand',
                                                        }),
                                                        (0, b.jsx)('span', {
                                                            children: C,
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)(d.ChevronDown, {
                                                    className:
                                                        'h-4 w-4 opacity-50',
                                                }),
                                            ],
                                        }),
                                    }),
                                    (0, b.jsx)(p.PopoverContent, {
                                        className: 'w-auto p-0',
                                        children: (0, b.jsx)(o.Calendar, {
                                            mode: 'single',
                                            selected: y,
                                            onSelect: (b) => {
                                                if (b) {
                                                    let c =
                                                        'month' === a
                                                            ? new Date(
                                                                  b.getFullYear(),
                                                                  b.getMonth(),
                                                                  1
                                                              )
                                                            : b;
                                                    (z(c), D(c));
                                                }
                                                B(!1);
                                            },
                                            autoFocus: !0,
                                            locale: m.ptBR,
                                        }),
                                    }),
                                ],
                            }),
                            !q &&
                                (0, b.jsx)(s, {
                                    tooltipText: G,
                                    onClick: () => E(1),
                                    children: (0, b.jsx)(f.ChevronRight, {
                                        className: 'h-4 w-4',
                                    }),
                                }),
                        ],
                    });
                },
            ],
            556557
        );
    },
    624126,
    (a) => {
        'use strict';
        let b = (0, a.i(203431).default)('clock', [
            ['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
            ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
        ]);
        a.s(['Clock', () => b], 624126);
    },
    853754,
    (a) => {
        'use strict';
        let b = (0, a.i(203431).default)('scissors', [
            ['circle', { cx: '6', cy: '6', r: '3', key: '1lh9wr' }],
            ['path', { d: 'M8.12 8.12 12 12', key: '1alkpv' }],
            ['path', { d: 'M20 4 8.12 15.88', key: 'xgtan2' }],
            ['circle', { cx: '6', cy: '18', r: '3', key: 'fqmcym' }],
            ['path', { d: 'M14.8 14.8 20 20', key: 'ptml3r' }],
        ]);
        a.s(['Scissors', () => b], 853754);
    },
    300298,
    (a) => {
        'use strict';
        var b = a.i(984927);
        a.s(['X', () => b.default]);
    },
    638446,
    (a) => {
        'use strict';
        var b = a.i(143324);
        a.s(['Check', () => b.default]);
    },
    50900,
    (a) => {
        'use strict';
        let b = (0, a.i(203431).default)('search', [
            ['path', { d: 'm21 21-4.34-4.34', key: '14j7rj' }],
            ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
        ]);
        a.s(['Search', () => b], 50900);
    },
    550516,
    (a) => {
        'use strict';
        var b = a.i(42881);
        function c(a) {
            return (0, b.startOfDay)(Date.now(), a);
        }
        a.s(['startOfToday', () => c]);
    },
    486192,
    794729,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(752993),
            e = a.i(594723),
            f = a.i(921923),
            g = a.i(559653),
            h = a.i(452662),
            i = 'AlertDialog',
            [j, k] = (0, d.createContextScope)(i, [f.createDialogScope]),
            l = (0, f.createDialogScope)(),
            m = (a) => {
                let { __scopeAlertDialog: c, ...d } = a,
                    e = l(c);
                return (0, b.jsx)(f.Root, { ...e, ...d, modal: !0 });
            };
        m.displayName = i;
        var n = c.forwardRef((a, c) => {
            let { __scopeAlertDialog: d, ...e } = a,
                g = l(d);
            return (0, b.jsx)(f.Trigger, { ...g, ...e, ref: c });
        });
        n.displayName = 'AlertDialogTrigger';
        var o = (a) => {
            let { __scopeAlertDialog: c, ...d } = a,
                e = l(c);
            return (0, b.jsx)(f.Portal, { ...e, ...d });
        };
        o.displayName = 'AlertDialogPortal';
        var p = c.forwardRef((a, c) => {
            let { __scopeAlertDialog: d, ...e } = a,
                g = l(d);
            return (0, b.jsx)(f.Overlay, { ...g, ...e, ref: c });
        });
        p.displayName = 'AlertDialogOverlay';
        var q = 'AlertDialogContent',
            [r, s] = j(q),
            t = (0, h.createSlottable)('AlertDialogContent'),
            u = c.forwardRef((a, d) => {
                let { __scopeAlertDialog: h, children: i, ...j } = a,
                    k = l(h),
                    m = c.useRef(null),
                    n = (0, e.useComposedRefs)(d, m),
                    o = c.useRef(null);
                return (0, b.jsx)(f.WarningProvider, {
                    contentName: q,
                    titleName: v,
                    docsSlug: 'alert-dialog',
                    children: (0, b.jsx)(r, {
                        scope: h,
                        cancelRef: o,
                        children: (0, b.jsxs)(f.Content, {
                            role: 'alertdialog',
                            ...k,
                            ...j,
                            ref: n,
                            onOpenAutoFocus: (0, g.composeEventHandlers)(
                                j.onOpenAutoFocus,
                                (a) => {
                                    (a.preventDefault(),
                                        o.current?.focus({
                                            preventScroll: !0,
                                        }));
                                }
                            ),
                            onPointerDownOutside: (a) => a.preventDefault(),
                            onInteractOutside: (a) => a.preventDefault(),
                            children: [
                                (0, b.jsx)(t, { children: i }),
                                (0, b.jsx)(C, { contentRef: m }),
                            ],
                        }),
                    }),
                });
            });
        u.displayName = q;
        var v = 'AlertDialogTitle',
            w = c.forwardRef((a, c) => {
                let { __scopeAlertDialog: d, ...e } = a,
                    g = l(d);
                return (0, b.jsx)(f.Title, { ...g, ...e, ref: c });
            });
        w.displayName = v;
        var x = 'AlertDialogDescription',
            y = c.forwardRef((a, c) => {
                let { __scopeAlertDialog: d, ...e } = a,
                    g = l(d);
                return (0, b.jsx)(f.Description, { ...g, ...e, ref: c });
            });
        y.displayName = x;
        var z = c.forwardRef((a, c) => {
            let { __scopeAlertDialog: d, ...e } = a,
                g = l(d);
            return (0, b.jsx)(f.Close, { ...g, ...e, ref: c });
        });
        z.displayName = 'AlertDialogAction';
        var A = 'AlertDialogCancel',
            B = c.forwardRef((a, c) => {
                let { __scopeAlertDialog: d, ...g } = a,
                    { cancelRef: h } = s(A, d),
                    i = l(d),
                    j = (0, e.useComposedRefs)(c, h);
                return (0, b.jsx)(f.Close, { ...i, ...g, ref: j });
            });
        B.displayName = A;
        var C = ({ contentRef: a }) => {
            let b = `\`${q}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${q}\` by passing a \`${x}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${q}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
            return (
                c.useEffect(() => {
                    document.getElementById(
                        a.current?.getAttribute('aria-describedby')
                    ) || console.warn(b);
                }, [b, a]),
                null
            );
        };
        a.s(
            [
                'Action',
                () => z,
                'Cancel',
                () => B,
                'Content',
                () => u,
                'Description',
                () => y,
                'Overlay',
                () => p,
                'Portal',
                () => o,
                'Root',
                () => m,
                'Title',
                () => w,
                'Trigger',
                () => n,
            ],
            794729
        );
        var D = a.i(368114),
            E = a.i(699570);
        let F = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(p, {
                className: (0, D.cn)(
                    'fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    a
                ),
                ...c,
                ref: d,
            })
        );
        F.displayName = p.displayName;
        let G = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsxs)(o, {
                children: [
                    (0, b.jsx)(F, {}),
                    (0, b.jsx)(u, {
                        ref: d,
                        className: (0, D.cn)(
                            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background-tertiary border-none p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg',
                            a
                        ),
                        ...c,
                    }),
                ],
            })
        );
        G.displayName = u.displayName;
        let H = ({ className: a, ...c }) =>
            (0, b.jsx)('div', {
                className: (0, D.cn)(
                    'flex flex-col space-y-2 text-center sm:text-left',
                    a
                ),
                ...c,
            });
        H.displayName = 'AlertDialogHeader';
        let I = ({ className: a, ...c }) =>
            (0, b.jsx)('div', {
                className: (0, D.cn)(
                    'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
                    a
                ),
                ...c,
            });
        I.displayName = 'AlertDialogFooter';
        let J = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(w, {
                ref: d,
                className: (0, D.cn)(
                    'text-title-modal text-content-primary',
                    a
                ),
                ...c,
            })
        );
        J.displayName = w.displayName;
        let K = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(y, {
                ref: d,
                className: (0, D.cn)(
                    'text-paragraph-medium text-content-secondary',
                    a
                ),
                ...c,
            })
        );
        K.displayName = y.displayName;
        let L = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(z, {
                ref: d,
                className: (0, D.cn)(
                    (0, E.buttonVariants)({ variant: 'destructive' }),
                    'text-label-medium h-10 px-6 rounded-lg',
                    a
                ),
                ...c,
            })
        );
        L.displayName = z.displayName;
        let M = c.forwardRef(({ className: a, ...c }, d) =>
            (0, b.jsx)(B, {
                ref: d,
                className: (0, D.cn)(
                    (0, E.buttonVariants)({ variant: 'outline' }),
                    'text-label-medium h-10 px-6 rounded-lg mt-2 sm:mt-0',
                    a
                ),
                ...c,
            })
        );
        ((M.displayName = B.displayName),
            a.s(
                [
                    'AlertDialog',
                    () => m,
                    'AlertDialogAction',
                    () => L,
                    'AlertDialogCancel',
                    () => M,
                    'AlertDialogContent',
                    () => G,
                    'AlertDialogDescription',
                    () => K,
                    'AlertDialogFooter',
                    () => I,
                    'AlertDialogHeader',
                    () => H,
                    'AlertDialogTitle',
                    () => J,
                    'AlertDialogTrigger',
                    () => n,
                ],
                486192
            ));
    },
    753810,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(259849),
            e = a.i(156916),
            f = a.i(699570),
            g = a.i(978179),
            h = a.i(486192),
            i = a.i(794729),
            j = a.i(368114);
        function k({ status: a }) {
            return (0, b.jsx)('span', {
                className: (0, j.cn)(
                    'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                    'DONE' === a
                        ? 'bg-green-500/15 text-green-600 border-green-500/30'
                        : 'PENDING' === a
                          ? 'bg-amber-500/15 text-amber-700 border-amber-500/30'
                          : 'bg-red-500/15 text-red-600 border-red-500/30'
                ),
                children:
                    'PENDING' === a
                        ? 'Pendente'
                        : 'DONE' === a
                          ? 'Concluído'
                          : 'Cancelado',
            });
        }
        function l({
            appt: a,
            forcedUnitId: j,
            forcedProfessionalId: l,
            units: m,
            clients: n,
            professionals: o,
            services: p,
        }) {
            var q;
            let r,
                s,
                t,
                u = (0, d.useRouter)(),
                [v, w] = c.useState(null),
                x = 'PENDING' === a.status,
                y = null !== v,
                z =
                    ((s = String(
                        (r =
                            (q = a.scheduleAt) instanceof Date
                                ? q
                                : new Date(q)).getHours()
                    ).padStart(2, '0')),
                    (t = String(r.getMinutes()).padStart(2, '0')),
                    `${s}:${t}`),
                A = {
                    id: a.id,
                    unitId: a.unitId,
                    clientId: a.clientId,
                    clientName: a.clientName,
                    phone: a.phone,
                    description: a.description,
                    scheduleAt: a.scheduleAt,
                    status: a.status,
                    professionalId: a.professionalId,
                    serviceId: a.serviceId,
                },
                B = async () => {
                    try {
                        w('done');
                        let b = await fetch(
                                `/api/professional/appointments/${a.id}`,
                                {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ action: 'done' }),
                                }
                            ),
                            c = await b.json().catch(() => ({}));
                        if (!b.ok)
                            return void e.toast.error(
                                c?.error ??
                                    'Não foi possível concluir o agendamento.'
                            );
                        (c?.data?.orderCreated
                            ? e.toast.success(
                                  'Concluído! Pedido criado no checkout.'
                              )
                            : e.toast.success('Agendamento concluído!'),
                            u.refresh());
                    } catch {
                        e.toast.error('Erro ao concluir o agendamento.');
                    } finally {
                        w(null);
                    }
                },
                C = async () => {
                    try {
                        w('cancel');
                        let b = await fetch(
                                `/api/professional/appointments/${a.id}`,
                                {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ action: 'cancel' }),
                                }
                            ),
                            c = await b.json().catch(() => ({}));
                        if (!b.ok)
                            return void e.toast.error(
                                c?.error ??
                                    'Não foi possível cancelar o agendamento.'
                            );
                        (e.toast.success('Agendamento cancelado.'),
                            u.refresh());
                    } catch {
                        e.toast.error('Erro ao cancelar o agendamento.');
                    } finally {
                        w(null);
                    }
                };
            return (0, b.jsxs)('tr', {
                className: 'border-b border-border-primary hover:bg-muted/30',
                children: [
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 font-medium text-content-primary',
                        children: z,
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-content-primary',
                        children: a.clientName,
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-content-secondary',
                        children: a.phone,
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-content-secondary',
                        children: a.description,
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3',
                        children: (0, b.jsx)(k, { status: a.status }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-right',
                        children: x
                            ? (0, b.jsxs)('div', {
                                  className:
                                      'flex items-center justify-end gap-2',
                                  children: [
                                      (0, b.jsx)(g.default, {
                                          appt: A,
                                          apiNamespace: 'professional',
                                          forcedUnitId: j,
                                          forcedProfessionalId: l,
                                          units: m,
                                          clients: n,
                                          professionals: o,
                                          services: p,
                                          children: (0, b.jsx)(f.Button, {
                                              type: 'button',
                                              variant: 'edit2',
                                              size: 'sm',
                                              disabled: y,
                                              children: 'Editar',
                                          }),
                                      }),
                                      (0, b.jsxs)(h.AlertDialog, {
                                          children: [
                                              (0, b.jsx)(h.AlertDialogTrigger, {
                                                  asChild: !0,
                                                  children: (0, b.jsx)(
                                                      f.Button,
                                                      {
                                                          type: 'button',
                                                          variant: 'active',
                                                          size: 'sm',
                                                          disabled: y,
                                                          children: 'Concluir',
                                                      }
                                                  ),
                                              }),
                                              (0, b.jsxs)(
                                                  h.AlertDialogContent,
                                                  {
                                                      children: [
                                                          (0, b.jsxs)(
                                                              h.AlertDialogHeader,
                                                              {
                                                                  children: [
                                                                      (0,
                                                                      b.jsx)(
                                                                          h.AlertDialogTitle,
                                                                          {
                                                                              children:
                                                                                  'Concluir este agendamento?',
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      b.jsxs)(
                                                                          h.AlertDialogDescription,
                                                                          {
                                                                              children:
                                                                                  [
                                                                                      'Você vai marcar como concluído o agendamento de ',
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          'b',
                                                                                          {
                                                                                              children:
                                                                                                  a.clientName,
                                                                                          }
                                                                                      ),
                                                                                      ' ',
                                                                                      'às ',
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          'b',
                                                                                          {
                                                                                              children:
                                                                                                  z,
                                                                                          }
                                                                                      ),
                                                                                      ' (',
                                                                                      a.description,
                                                                                      ').',
                                                                                  ],
                                                                          }
                                                                      ),
                                                                  ],
                                                              }
                                                          ),
                                                          (0, b.jsxs)(
                                                              h.AlertDialogFooter,
                                                              {
                                                                  children: [
                                                                      (0,
                                                                      b.jsx)(
                                                                          i.Cancel,
                                                                          {
                                                                              asChild:
                                                                                  !0,
                                                                              children:
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      f.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'outline',
                                                                                          size: 'sm',
                                                                                          disabled:
                                                                                              'done' ===
                                                                                              v,
                                                                                          children:
                                                                                              'Voltar',
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      b.jsx)(
                                                                          i.Action,
                                                                          {
                                                                              asChild:
                                                                                  !0,
                                                                              children:
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      f.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'active',
                                                                                          size: 'sm',
                                                                                          onClick:
                                                                                              B,
                                                                                          disabled:
                                                                                              'done' ===
                                                                                              v,
                                                                                          children:
                                                                                              'done' ===
                                                                                              v
                                                                                                  ? 'Concluindo...'
                                                                                                  : 'Concluir agendamento',
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                  ],
                                                              }
                                                          ),
                                                      ],
                                                  }
                                              ),
                                          ],
                                      }),
                                      (0, b.jsxs)(h.AlertDialog, {
                                          children: [
                                              (0, b.jsx)(h.AlertDialogTrigger, {
                                                  asChild: !0,
                                                  children: (0, b.jsx)(
                                                      f.Button,
                                                      {
                                                          type: 'button',
                                                          variant:
                                                              'destructive',
                                                          size: 'sm',
                                                          disabled: y,
                                                          children: 'Cancelar',
                                                      }
                                                  ),
                                              }),
                                              (0, b.jsxs)(
                                                  h.AlertDialogContent,
                                                  {
                                                      children: [
                                                          (0, b.jsxs)(
                                                              h.AlertDialogHeader,
                                                              {
                                                                  children: [
                                                                      (0,
                                                                      b.jsx)(
                                                                          h.AlertDialogTitle,
                                                                          {
                                                                              children:
                                                                                  'Cancelar este agendamento?',
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      b.jsxs)(
                                                                          h.AlertDialogDescription,
                                                                          {
                                                                              children:
                                                                                  [
                                                                                      'O agendamento de',
                                                                                      ' ',
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          'b',
                                                                                          {
                                                                                              children:
                                                                                                  a.clientName,
                                                                                          }
                                                                                      ),
                                                                                      ' às',
                                                                                      ' ',
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          'b',
                                                                                          {
                                                                                              children:
                                                                                                  z,
                                                                                          }
                                                                                      ),
                                                                                      ' será cancelado.',
                                                                                  ],
                                                                          }
                                                                      ),
                                                                  ],
                                                              }
                                                          ),
                                                          (0, b.jsxs)(
                                                              h.AlertDialogFooter,
                                                              {
                                                                  children: [
                                                                      (0,
                                                                      b.jsx)(
                                                                          i.Cancel,
                                                                          {
                                                                              asChild:
                                                                                  !0,
                                                                              children:
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      f.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'outline',
                                                                                          size: 'sm',
                                                                                          disabled:
                                                                                              'cancel' ===
                                                                                              v,
                                                                                          children:
                                                                                              'Voltar',
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      b.jsx)(
                                                                          i.Action,
                                                                          {
                                                                              asChild:
                                                                                  !0,
                                                                              children:
                                                                                  (0,
                                                                                  b.jsx)(
                                                                                      f.Button,
                                                                                      {
                                                                                          type: 'button',
                                                                                          variant:
                                                                                              'destructive',
                                                                                          size: 'sm',
                                                                                          onClick:
                                                                                              C,
                                                                                          disabled:
                                                                                              'cancel' ===
                                                                                              v,
                                                                                          children:
                                                                                              'cancel' ===
                                                                                              v
                                                                                                  ? 'Cancelando...'
                                                                                                  : 'Cancelar agendamento',
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                  ],
                                                              }
                                                          ),
                                                      ],
                                                  }
                                              ),
                                          ],
                                      }),
                                  ],
                              })
                            : (0, b.jsx)('span', {
                                  className:
                                      'text-paragraph-small text-content-tertiary',
                                  children: '—',
                              }),
                    }),
                ],
            });
        }
        function m({
            date: a,
            unitId: d,
            professionalId: e,
            units: f,
            professionals: g,
            services: h,
            clients: i,
            appointments: j,
        }) {
            let k = c.useMemo(() => {
                let a = new Map(),
                    b = g.find((a) => a.id === e) ?? null,
                    c = b?.name ?? 'Profissional',
                    d = b?.imageUrl ?? null,
                    f = e || 'no-professional';
                a.set(f, {
                    key: f,
                    professionalId: e || null,
                    professionalName: c,
                    professionalImageUrl: d,
                    appointments: [...j],
                });
                let h = Array.from(a.values());
                for (let a of (h.sort((a, b) =>
                    (function (a, b) {
                        try {
                            return a.localeCompare('pt-BR', void 0, {
                                sensitivity: 'base',
                            });
                        } catch {
                            return a.localeCompare(b);
                        }
                    })(a.professionalName, b.professionalName)
                ),
                h))
                    a.appointments.sort(
                        (a, b) =>
                            new Date(a.scheduleAt).getTime() -
                            new Date(b.scheduleAt).getTime()
                    );
                return h;
            }, [j, g, e]);
            c.useMemo(() => {
                let a = f.find((a) => a.id === d);
                return a?.name ?? null;
            }, [d, f]);
            let m = c.useMemo(
                () => f.map((a) => ({ id: a.id, name: a.name })),
                [f]
            );
            return (0, b.jsx)('div', {
                className: 'space-y-4',
                children:
                    0 === k.length
                        ? (0, b.jsx)('section', {
                              className:
                                  'border border-border-primary rounded-xl overflow-hidden bg-background-tertiary',
                              children: (0, b.jsx)('div', {
                                  className:
                                      'p-6 text-paragraph-small text-content-secondary text-center',
                                  children:
                                      'Nenhum agendamento encontrado para esta data.',
                              }),
                          })
                        : (0, b.jsx)('section', {
                              className: 'space-y-4',
                              children: k.map((a) =>
                                  (0, b.jsxs)(
                                      'div',
                                      {
                                          className:
                                              'border border-border-primary rounded-xl overflow-hidden bg-background-tertiary',
                                          children: [
                                              (0, b.jsx)('div', {
                                                  className:
                                                      'border-b border-border-primary px-4 py-3 bg-muted/40 flex flex-col gap-1 md:flex-row md:items-center md:justify-between',
                                                  children: (0, b.jsxs)('div', {
                                                      className:
                                                          'flex items-center gap-3',
                                                      children: [
                                                          (0, b.jsx)('div', {
                                                              className:
                                                                  'h-9 w-9 rounded-full bg-background-secondary border border-border-primary overflow-hidden flex items-center justify-center text-[11px] font-medium text-content-secondary shrink-0',
                                                              children:
                                                                  a.professionalImageUrl
                                                                      ? (0,
                                                                        b.jsx)(
                                                                            'img',
                                                                            {
                                                                                src: a.professionalImageUrl,
                                                                                alt: a.professionalName,
                                                                                className:
                                                                                    'h-full w-full object-cover',
                                                                            }
                                                                        )
                                                                      : (0,
                                                                        b.jsx)(
                                                                            'span',
                                                                            {
                                                                                children:
                                                                                    String(
                                                                                        a.professionalName ??
                                                                                            ''
                                                                                    )
                                                                                        .trim()
                                                                                        .split(
                                                                                            /\s+/
                                                                                        )
                                                                                        .filter(
                                                                                            Boolean
                                                                                        )
                                                                                        .map(
                                                                                            (
                                                                                                a
                                                                                            ) =>
                                                                                                a[0]
                                                                                        )
                                                                                        .join(
                                                                                            ''
                                                                                        )
                                                                                        .slice(
                                                                                            0,
                                                                                            2
                                                                                        )
                                                                                        .toUpperCase() ||
                                                                                    '?',
                                                                            }
                                                                        ),
                                                          }),
                                                          (0, b.jsxs)('div', {
                                                              className:
                                                                  'flex flex-col',
                                                              children: [
                                                                  (0, b.jsx)(
                                                                      'h2',
                                                                      {
                                                                          className:
                                                                              'text-label-large text-content-primary',
                                                                          children:
                                                                              a.professionalName,
                                                                      }
                                                                  ),
                                                                  (0, b.jsxs)(
                                                                      'p',
                                                                      {
                                                                          className:
                                                                              'text-paragraph-small text-content-secondary',
                                                                          children:
                                                                              [
                                                                                  'Agendamento(s):',
                                                                                  ' ',
                                                                                  a
                                                                                      .appointments
                                                                                      .length,
                                                                              ],
                                                                      }
                                                                  ),
                                                              ],
                                                          }),
                                                      ],
                                                  }),
                                              }),
                                              0 === a.appointments.length
                                                  ? (0, b.jsx)('div', {
                                                        className:
                                                            'p-6 text-paragraph-small text-content-secondary text-center',
                                                        children:
                                                            'Nenhum agendamento para hoje.',
                                                    })
                                                  : (0, b.jsx)('div', {
                                                        className:
                                                            'overflow-x-auto',
                                                        children: (0, b.jsxs)(
                                                            'table',
                                                            {
                                                                className:
                                                                    'min-w-full text-sm',
                                                                children: [
                                                                    (0, b.jsx)(
                                                                        'thead',
                                                                        {
                                                                            children:
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'tr',
                                                                                    {
                                                                                        className:
                                                                                            'border-b border-border-primary text-content-secondary',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'th',
                                                                                                    {
                                                                                                        className:
                                                                                                            'px-4 py-3 text-left font-medium',
                                                                                                        children:
                                                                                                            'Hora',
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'th',
                                                                                                    {
                                                                                                        className:
                                                                                                            'px-4 py-3 text-left font-medium',
                                                                                                        children:
                                                                                                            'Cliente',
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'th',
                                                                                                    {
                                                                                                        className:
                                                                                                            'px-4 py-3 text-left font-medium',
                                                                                                        children:
                                                                                                            'Telefone',
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'th',
                                                                                                    {
                                                                                                        className:
                                                                                                            'px-4 py-3 text-left font-medium',
                                                                                                        children:
                                                                                                            'Serviço',
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'th',
                                                                                                    {
                                                                                                        className:
                                                                                                            'px-4 py-3 text-left font-medium',
                                                                                                        children:
                                                                                                            'Status',
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'th',
                                                                                                    {
                                                                                                        className:
                                                                                                            'px-4 py-3 text-right font-medium',
                                                                                                        children:
                                                                                                            'Ações',
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                    (0, b.jsx)(
                                                                        'tbody',
                                                                        {
                                                                            children:
                                                                                a.appointments.map(
                                                                                    (
                                                                                        a
                                                                                    ) =>
                                                                                        (0,
                                                                                        b.jsx)(
                                                                                            l,
                                                                                            {
                                                                                                appt: a,
                                                                                                forcedUnitId:
                                                                                                    d,
                                                                                                forcedProfessionalId:
                                                                                                    e,
                                                                                                units: m,
                                                                                                clients:
                                                                                                    i,
                                                                                                professionals:
                                                                                                    g,
                                                                                                services:
                                                                                                    h,
                                                                                            },
                                                                                            a.id
                                                                                        )
                                                                                ),
                                                                        }
                                                                    ),
                                                                ],
                                                            }
                                                        ),
                                                    }),
                                          ],
                                      },
                                      a.key
                                  )
                              ),
                          }),
            });
        }
        a.s(['default', () => m]);
    },
];

//# sourceMappingURL=_3eba7b8b._.js.map
