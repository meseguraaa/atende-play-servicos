module.exports = [
    416385,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(259849),
            e = a.i(773608),
            f = a.i(550516),
            g = a.i(499638),
            h = a.i(207958),
            h = h,
            i = a.i(624126),
            j = a.i(198803),
            k = a.i(156916),
            l = a.i(699570),
            m = a.i(814574),
            n = a.i(320146),
            o = a.i(599209),
            p = a.i(580701),
            q = a.i(368114);
        let r = (() => {
            let a = [];
            for (let b = 0; b <= 23; b++)
                for (let c = 0; c < 60; c += 30)
                    a.push(
                        `${String(b).padStart(2, '0')}:${String(c).padStart(2, '0')}`
                    );
            return a;
        })();
        function s({ professionalId: a, onSubmitUI: s }) {
            let t = (0, d.useRouter)(),
                [u, v] = (0, c.useState)(!1),
                [w, x] = (0, c.useState)(),
                [y, z] = (0, c.useState)('FULL_DAY'),
                [A, B] = (0, c.useState)([
                    { id: '1', startTime: '09:00', endTime: '19:00' },
                ]),
                [C, D] = (0, c.useState)(!1);
            function E() {
                (x(void 0),
                    z('FULL_DAY'),
                    B([{ id: '1', startTime: '09:00', endTime: '19:00' }]));
            }
            function F(a, b, c) {
                B((d) => d.map((d) => (d.id === a ? { ...d, [b]: c } : d)));
            }
            let G = (0, c.useMemo)(
                    () =>
                        'PARTIAL' === y &&
                        A.some(
                            (a) =>
                                !a.startTime ||
                                !a.endTime ||
                                a.startTime >= a.endTime
                        ),
                    [A, y]
                ),
                H = (0, c.useMemo)(
                    () => !!w && ('PARTIAL' !== y || (!!A.length && !G)) && !0,
                    [w, y, A.length, G]
                );
            async function I() {
                if (!H)
                    return void k.toast.error(
                        'Selecione uma data válida para salvar a exceção.'
                    );
                D(!0);
                let b =
                    'FULL_DAY' === y
                        ? {
                              dateISO: (0, e.format)(w, 'yyyy-MM-dd'),
                              mode: 'FULL_DAY',
                              intervals: [],
                          }
                        : {
                              dateISO: (0, e.format)(w, 'yyyy-MM-dd'),
                              mode: 'PARTIAL',
                              intervals: A.map((a) => ({
                                  startTime: a.startTime,
                                  endTime: a.endTime,
                              })),
                          };
                try {
                    let c = await fetch(
                            '/api/professional/availability/exceptions',
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(b),
                            }
                        ),
                        d = await c.json();
                    if (!c.ok || !d?.ok) {
                        let a =
                            (d && 'error' in d && d.error) ||
                            'Erro ao salvar exceção.';
                        k.toast.error(a);
                        return;
                    }
                    (k.toast.success('Exceção criada com sucesso!'),
                        s?.({ professionalId: a, ...b }),
                        E(),
                        v(!1),
                        window.dispatchEvent(
                            new Event('professional-exceptions:changed')
                        ),
                        t.refresh());
                } catch {
                    k.toast.error('Falha ao salvar exceção. Tente novamente.');
                } finally {
                    D(!1);
                }
            }
            return (0, b.jsxs)(m.Dialog, {
                open: u,
                onOpenChange: (a) => {
                    (v(a), a || E());
                },
                children: [
                    (0, b.jsx)(m.DialogTrigger, {
                        asChild: !0,
                        children: (0, b.jsx)(l.Button, {
                            variant: 'destructive',
                            size: 'sm',
                            children: 'Criar exceção',
                        }),
                    }),
                    (0, b.jsxs)(m.DialogContent, {
                        variant: 'appointment',
                        overlayVariant: 'blurred',
                        showCloseButton: !0,
                        children: [
                            (0, b.jsxs)(m.DialogHeader, {
                                children: [
                                    (0, b.jsx)(m.DialogTitle, {
                                        size: 'modal',
                                        children: 'Criar exceção na agenda',
                                    }),
                                    (0, b.jsx)(m.DialogDescription, {
                                        size: 'modal',
                                        children:
                                            'Bloqueie um dia inteiro ou faixas de horário específicas. A agenda vai respeitar essas exceções acima do padrão semanal.',
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className: 'space-y-4',
                                children: [
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsx)('span', {
                                                className:
                                                    'text-label-medium-size text-content-primary',
                                                children: 'Dia da exceção',
                                            }),
                                            (0, b.jsxs)(o.Popover, {
                                                children: [
                                                    (0, b.jsx)(
                                                        o.PopoverTrigger,
                                                        {
                                                            asChild: !0,
                                                            children: (0,
                                                            b.jsx)(l.Button, {
                                                                variant:
                                                                    'outline',
                                                                disabled: C,
                                                                className: (0,
                                                                q.cn)(
                                                                    'w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                    !w &&
                                                                        'text-content-secondary'
                                                                ),
                                                                children: (0,
                                                                b.jsxs)('div', {
                                                                    className:
                                                                        'flex items-center gap-2',
                                                                    children: [
                                                                        (0,
                                                                        b.jsx)(
                                                                            h.default,
                                                                            {
                                                                                className:
                                                                                    'text-content-brand',
                                                                                size: 20,
                                                                            }
                                                                        ),
                                                                        w
                                                                            ? (0,
                                                                              b.jsx)(
                                                                                  'span',
                                                                                  {
                                                                                      children:
                                                                                          (0,
                                                                                          e.format)(
                                                                                              w,
                                                                                              "EEEE, dd 'de' MMMM",
                                                                                              {
                                                                                                  locale: g.ptBR,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              )
                                                                            : (0,
                                                                              b.jsx)(
                                                                                  'span',
                                                                                  {
                                                                                      children:
                                                                                          'Selecione uma data',
                                                                                  }
                                                                              ),
                                                                    ],
                                                                }),
                                                            }),
                                                        }
                                                    ),
                                                    (0, b.jsx)(
                                                        o.PopoverContent,
                                                        {
                                                            className:
                                                                'w-auto p-0',
                                                            align: 'start',
                                                            children: (0,
                                                            b.jsx)(n.Calendar, {
                                                                mode: 'single',
                                                                selected: w,
                                                                onSelect: (a) =>
                                                                    x(
                                                                        a ??
                                                                            void 0
                                                                    ),
                                                                disabled: (a) =>
                                                                    a <
                                                                    (0,
                                                                    f.startOfToday)(),
                                                                locale: g.ptBR,
                                                            }),
                                                        }
                                                    ),
                                                ],
                                            }),
                                            w
                                                ? null
                                                : (0, b.jsx)('p', {
                                                      className:
                                                          'text-[11px] text-content-tertiary',
                                                      children:
                                                          'Selecione uma data para habilitar o salvar.',
                                                  }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                            (0, b.jsx)('span', {
                                                className:
                                                    'text-label-medium-size text-content-primary',
                                                children: 'Tipo de exceção',
                                            }),
                                            (0, b.jsxs)(p.Select, {
                                                value: y,
                                                onValueChange: (a) => z(a),
                                                disabled: C,
                                                children: [
                                                    (0, b.jsx)(
                                                        p.SelectTrigger,
                                                        {
                                                            children: (0,
                                                            b.jsx)(
                                                                p.SelectValue,
                                                                {}
                                                            ),
                                                        }
                                                    ),
                                                    (0, b.jsxs)(
                                                        p.SelectContent,
                                                        {
                                                            children: [
                                                                (0, b.jsx)(
                                                                    p.SelectItem,
                                                                    {
                                                                        value: 'FULL_DAY',
                                                                        children:
                                                                            'Dia inteiro indisponível',
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    p.SelectItem,
                                                                    {
                                                                        value: 'PARTIAL',
                                                                        children:
                                                                            'Disponível em horários específicos',
                                                                    }
                                                                ),
                                                            ],
                                                        }
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                    'PARTIAL' === y &&
                                        (0, b.jsxs)('div', {
                                            className: 'space-y-3',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'flex items-center justify-between',
                                                    children: [
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children:
                                                                'Horários disponíveis',
                                                        }),
                                                        (0, b.jsx)(l.Button, {
                                                            type: 'button',
                                                            variant: 'ghost',
                                                            size: 'sm',
                                                            onClick:
                                                                function () {
                                                                    let a =
                                                                        String(
                                                                            Date.now()
                                                                        );
                                                                    B((b) => [
                                                                        ...b,
                                                                        {
                                                                            id: a,
                                                                            startTime:
                                                                                '09:00',
                                                                            endTime:
                                                                                '18:00',
                                                                        },
                                                                    ]);
                                                                },
                                                            disabled: C,
                                                            children:
                                                                '+ Adicionar intervalo',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)('div', {
                                                    className: 'space-y-2',
                                                    children: A.map((a) => {
                                                        let c =
                                                            !a.startTime ||
                                                            !a.endTime ||
                                                            a.startTime >=
                                                                a.endTime;
                                                        return (0, b.jsxs)(
                                                            'div',
                                                            {
                                                                className:
                                                                    'grid grid-cols-[1fr,1fr,auto] items-center gap-2',
                                                                children: [
                                                                    (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'space-y-1',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-label-small text-content-secondary',
                                                                                            children:
                                                                                                'Início',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    b.jsxs)(
                                                                                        p.Select,
                                                                                        {
                                                                                            value: a.startTime,
                                                                                            onValueChange:
                                                                                                (
                                                                                                    b
                                                                                                ) =>
                                                                                                    F(
                                                                                                        a.id,
                                                                                                        'startTime',
                                                                                                        b
                                                                                                    ),
                                                                                            disabled:
                                                                                                C,
                                                                                            children:
                                                                                                [
                                                                                                    (0,
                                                                                                    b.jsx)(
                                                                                                        p.SelectTrigger,
                                                                                                        {
                                                                                                            className:
                                                                                                                (0,
                                                                                                                q.cn)(
                                                                                                                    c &&
                                                                                                                        'border-destructive focus-visible:ring-destructive/40'
                                                                                                                ),
                                                                                                            children:
                                                                                                                (0,
                                                                                                                b.jsxs)(
                                                                                                                    'div',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'flex items-center gap-2',
                                                                                                                        children:
                                                                                                                            [
                                                                                                                                (0,
                                                                                                                                b.jsx)(
                                                                                                                                    i.Clock,
                                                                                                                                    {
                                                                                                                                        className:
                                                                                                                                            'h-4 w-4 text-content-brand',
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                (0,
                                                                                                                                b.jsx)(
                                                                                                                                    p.SelectValue,
                                                                                                                                    {
                                                                                                                                        placeholder:
                                                                                                                                            'Horário inicial',
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                            ],
                                                                                                                    }
                                                                                                                ),
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    b.jsx)(
                                                                                                        p.SelectContent,
                                                                                                        {
                                                                                                            children:
                                                                                                                r.map(
                                                                                                                    (
                                                                                                                        a
                                                                                                                    ) =>
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            p.SelectItem,
                                                                                                                            {
                                                                                                                                value: a,
                                                                                                                                children:
                                                                                                                                    a,
                                                                                                                            },
                                                                                                                            a
                                                                                                                        )
                                                                                                                ),
                                                                                                        }
                                                                                                    ),
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'space-y-1',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-label-small text-content-secondary',
                                                                                            children:
                                                                                                'Fim',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    b.jsxs)(
                                                                                        p.Select,
                                                                                        {
                                                                                            value: a.endTime,
                                                                                            onValueChange:
                                                                                                (
                                                                                                    b
                                                                                                ) =>
                                                                                                    F(
                                                                                                        a.id,
                                                                                                        'endTime',
                                                                                                        b
                                                                                                    ),
                                                                                            disabled:
                                                                                                C,
                                                                                            children:
                                                                                                [
                                                                                                    (0,
                                                                                                    b.jsx)(
                                                                                                        p.SelectTrigger,
                                                                                                        {
                                                                                                            className:
                                                                                                                (0,
                                                                                                                q.cn)(
                                                                                                                    c &&
                                                                                                                        'border-destructive focus-visible:ring-destructive/40'
                                                                                                                ),
                                                                                                            children:
                                                                                                                (0,
                                                                                                                b.jsxs)(
                                                                                                                    'div',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'flex items-center gap-2',
                                                                                                                        children:
                                                                                                                            [
                                                                                                                                (0,
                                                                                                                                b.jsx)(
                                                                                                                                    i.Clock,
                                                                                                                                    {
                                                                                                                                        className:
                                                                                                                                            'h-4 w-4 text-content-brand',
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                (0,
                                                                                                                                b.jsx)(
                                                                                                                                    p.SelectValue,
                                                                                                                                    {
                                                                                                                                        placeholder:
                                                                                                                                            'Horário final',
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                            ],
                                                                                                                    }
                                                                                                                ),
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    b.jsx)(
                                                                                                        p.SelectContent,
                                                                                                        {
                                                                                                            children:
                                                                                                                r.map(
                                                                                                                    (
                                                                                                                        a
                                                                                                                    ) =>
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            p.SelectItem,
                                                                                                                            {
                                                                                                                                value: a,
                                                                                                                                children:
                                                                                                                                    a,
                                                                                                                            },
                                                                                                                            a
                                                                                                                        )
                                                                                                                ),
                                                                                                        }
                                                                                                    ),
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    (0, b.jsx)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex items-end justify-end pb-0.5',
                                                                            children:
                                                                                A.length >
                                                                                    1 &&
                                                                                (0,
                                                                                b.jsx)(
                                                                                    l.Button,
                                                                                    {
                                                                                        type: 'button',
                                                                                        variant:
                                                                                            'ghost',
                                                                                        size: 'icon',
                                                                                        onClick:
                                                                                            () => {
                                                                                                var b;
                                                                                                return (
                                                                                                    (b =
                                                                                                        a.id),
                                                                                                    void B(
                                                                                                        (
                                                                                                            a
                                                                                                        ) =>
                                                                                                            a.filter(
                                                                                                                (
                                                                                                                    a
                                                                                                                ) =>
                                                                                                                    a.id !==
                                                                                                                    b
                                                                                                            )
                                                                                                    )
                                                                                                );
                                                                                            },
                                                                                        disabled:
                                                                                            C,
                                                                                        children:
                                                                                            '✕',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                ],
                                                            },
                                                            a.id
                                                        );
                                                    }),
                                                }),
                                                (0, b.jsxs)('p', {
                                                    className:
                                                        'text-paragraph-small-size text-content-secondary',
                                                    children: [
                                                        'Esses horários serão ',
                                                        (0, b.jsx)('strong', {
                                                            children:
                                                                'bloqueados',
                                                        }),
                                                        '. O restante do dia ainda poderá receber agendamentos, seguindo o padrão semanal.',
                                                    ],
                                                }),
                                                G
                                                    ? (0, b.jsx)('p', {
                                                          className:
                                                              'text-[11px] text-destructive',
                                                          children:
                                                              'Em cada intervalo, o horário inicial deve ser menor que o final.',
                                                      })
                                                    : null,
                                            ],
                                        }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: [
                                            (0, b.jsx)(l.Button, {
                                                type: 'button',
                                                variant: 'ghost',
                                                disabled: C,
                                                onClick: () => {
                                                    (E(), v(!1));
                                                },
                                                children: 'Cancelar',
                                            }),
                                            (0, b.jsxs)(l.Button, {
                                                type: 'button',
                                                variant: 'brand',
                                                onClick: I,
                                                disabled: C || !H,
                                                children: [
                                                    C &&
                                                        (0, b.jsx)(j.Loader2, {
                                                            className:
                                                                'mr-2 h-4 w-4 animate-spin',
                                                        }),
                                                    'Salvar exceção',
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        a.s(['DailyExceptionModal', () => s], 416385);
    },
    193865,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(259849),
            e = a.i(773608),
            f = a.i(499638),
            g = a.i(156916),
            h = a.i(699570),
            i = a.i(486192);
        function j({ professionalId: a, dateISO: e, onDelete: f }) {
            let j = (0, d.useRouter)(),
                [k, l] = (0, c.useState)(!1),
                m = async () => {
                    try {
                        if ((l(!0), f))
                            return void (await f({
                                professionalId: a,
                                dateISO: e,
                            }));
                        let b = await fetch(
                                `/api/professional/availability/exceptions?dateISO=${encodeURIComponent(e)}`,
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                }
                            ),
                            c = await b.json();
                        if (!b.ok || !c?.ok)
                            return void g.toast.error(
                                c?.error ?? 'Erro ao remover exceção.'
                            );
                        (g.toast.success('Exceção removida com sucesso.'),
                            j.refresh());
                    } catch {
                        g.toast.error(
                            'Falha ao remover exceção. Tente novamente.'
                        );
                    } finally {
                        l(!1);
                    }
                };
            return (0, b.jsxs)(i.AlertDialog, {
                children: [
                    (0, b.jsx)(i.AlertDialogTrigger, {
                        asChild: !0,
                        children: (0, b.jsx)(h.Button, {
                            type: 'button',
                            variant: 'destructive',
                            size: 'sm',
                            disabled: k,
                            children: 'Excluir',
                        }),
                    }),
                    (0, b.jsxs)(i.AlertDialogContent, {
                        children: [
                            (0, b.jsxs)(i.AlertDialogHeader, {
                                children: [
                                    (0, b.jsx)(i.AlertDialogTitle, {
                                        children: 'Remover exceção deste dia?',
                                    }),
                                    (0, b.jsx)(i.AlertDialogDescription, {
                                        children:
                                            'Este dia voltará a seguir apenas o padrão semanal de disponibilidade. Os horários customizados serão apagados.',
                                    }),
                                ],
                            }),
                            (0, b.jsxs)(i.AlertDialogFooter, {
                                children: [
                                    (0, b.jsx)(i.AlertDialogCancel, {
                                        disabled: k,
                                        children: 'Cancelar',
                                    }),
                                    (0, b.jsx)(i.AlertDialogAction, {
                                        asChild: !0,
                                        children: (0, b.jsx)(h.Button, {
                                            onClick: m,
                                            disabled: k,
                                            variant: 'destructive',
                                            type: 'button',
                                            children: k
                                                ? 'Removendo...'
                                                : 'Remover exceção',
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        let k = 'professional-exceptions:changed';
        function l({ professionalId: a }) {
            let h = (0, d.useRouter)(),
                [i, l] = (0, c.useState)([]),
                [m, n] = (0, c.useState)(!0);
            async function o() {
                n(!0);
                try {
                    let a = await fetch(
                            '/api/professional/availability/exceptions',
                            {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' },
                                cache: 'no-store',
                            }
                        ),
                        b = await a.json();
                    if (!a.ok || !b?.ok) {
                        let a =
                            (b && 'error' in b && b.error) ||
                            'Erro ao buscar exceções.';
                        (g.toast.error(a), l([]));
                        return;
                    }
                    let c = (b.data?.exceptions ?? []).map((a) => {
                        var b;
                        let c = ((b = a.dateISO), String(b ?? '').slice(0, 10)),
                            d = (function (a) {
                                let [b, c, d] = a
                                    .split('-')
                                    .map((a) => Number(a));
                                return new Date(b, (c ?? 1) - 1, d ?? 1);
                            })(c);
                        return (
                            console.group('🗓️ DEBUG EXCEPTION'),
                            console.log('RAW dateISO (API):', a.dateISO),
                            console.log('dateKey (yyyy-MM-dd):', c),
                            console.log('Date local:', d),
                            console.log(
                                'Date local formatted:',
                                (0, e.format)(d, 'yyyy-MM-dd')
                            ),
                            console.log(
                                'Timezone offset (min):',
                                d.getTimezoneOffset()
                            ),
                            console.groupEnd(),
                            {
                                id: a.id,
                                dateKey: c,
                                date: d,
                                type: a.type,
                                intervals: (a.intervals ?? []).map((a) => ({
                                    id: a.id,
                                    startTime: a.startTime,
                                    endTime: a.endTime,
                                })),
                            }
                        );
                    });
                    l(c);
                } catch {
                    (g.toast.error(
                        'Falha ao buscar exceções. Tente novamente.'
                    ),
                        l([]));
                } finally {
                    n(!1);
                }
            }
            ((0, c.useEffect)(() => {
                o();
            }, [a]),
                (0, c.useEffect)(() => {
                    let a = () => void o();
                    return (
                        window.addEventListener(k, a),
                        () => window.removeEventListener(k, a)
                    );
                }, []));
            let p = (0, c.useMemo)(
                () =>
                    [...i].sort((a, b) => a.date.getTime() - b.date.getTime()),
                [i]
            );
            async function q(a) {
                l((b) => b.filter((b) => b.dateKey !== a));
                try {
                    let b = await fetch(
                            `/api/professional/availability/exceptions?dateISO=${encodeURIComponent(a)}`,
                            {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                            }
                        ),
                        c = await b.json();
                    if (!b.ok || !c?.ok) {
                        let a = c?.error ?? 'Erro ao remover exceção.';
                        (g.toast.error(a), l(i));
                        return;
                    }
                    (g.toast.success('Exceção removida com sucesso.'),
                        h.refresh());
                } catch {
                    (g.toast.error(
                        'Falha ao remover exceção. Tente novamente.'
                    ),
                        l(i));
                }
            }
            return (0, b.jsxs)('section', {
                className: 'space-y-3',
                children: [
                    (0, b.jsxs)('div', {
                        children: [
                            (0, b.jsx)('h2', {
                                className:
                                    'text-paragraph-large-size text-content-primary font-semibold',
                                children: 'Exceções por dia',
                            }),
                            (0, b.jsx)('p', {
                                className:
                                    'text-paragraph-small-size text-content-secondary',
                                children:
                                    'Veja e gerencie dias com horários diferentes do padrão semanal.',
                            }),
                        ],
                    }),
                    m
                        ? (0, b.jsx)('div', {
                              className:
                                  'mt-2 rounded-lg border border-dashed border-border-secondary px-4 py-6 text-center text-paragraph-small-size text-content-secondary',
                              children: 'Carregando exceções...',
                          })
                        : 0 === p.length
                          ? (0, b.jsxs)('div', {
                                className:
                                    'mt-2 rounded-lg border border-dashed border-border-secondary px-4 py-6 text-center text-paragraph-small-size text-content-secondary',
                                children: [
                                    'Você ainda não possui nenhuma exceção cadastrada. Use o botão ',
                                    (0, b.jsx)('strong', {
                                        children: 'Criar exceção',
                                    }),
                                    ' para bloquear um dia ou alguns horários específicos.',
                                ],
                            })
                          : (0, b.jsx)('div', {
                                className: 'space-y-2',
                                children: p.map((c) => {
                                    let d = (0, e.format)(
                                            c.date,
                                            "EEEE, dd 'de' MMMM",
                                            { locale: f.ptBR }
                                        ),
                                        g = 'DAY_OFF' === c.type;
                                    return (0, b.jsxs)(
                                        'div',
                                        {
                                            className:
                                                'flex items-start justify-between gap-3 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-1',
                                                    children: [
                                                        (0, b.jsx)('p', {
                                                            className:
                                                                'text-paragraph-medium-size text-content-primary font-medium',
                                                            children: d,
                                                        }),
                                                        g
                                                            ? (0, b.jsxs)('p', {
                                                                  className:
                                                                      'text-paragraph-small-size text-content-secondary',
                                                                  children: [
                                                                      (0,
                                                                      b.jsx)(
                                                                          'span',
                                                                          {
                                                                              className:
                                                                                  'font-semibold text-content-destructive',
                                                                              children:
                                                                                  'Dia inteiro indisponível',
                                                                          }
                                                                      ),
                                                                      ' ',
                                                                      '– nenhum horário ficará disponível para agendamento.',
                                                                  ],
                                                              })
                                                            : 0 ===
                                                                c.intervals
                                                                    .length
                                                              ? (0, b.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-paragraph-small-size text-content-secondary',
                                                                        children:
                                                                            'Exceção sem intervalos cadastrados.',
                                                                    }
                                                                )
                                                              : (0, b.jsxs)(
                                                                    'div',
                                                                    {
                                                                        className:
                                                                            'space-y-1 text-paragraph-small-size text-content-secondary',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'p',
                                                                                    {
                                                                                        className:
                                                                                            'font-medium text-content-primary',
                                                                                        children:
                                                                                            'Horários indisponíveis neste dia:',
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'ul',
                                                                                    {
                                                                                        className:
                                                                                            'flex flex-wrap gap-2 text-[12px]',
                                                                                        children:
                                                                                            c.intervals.map(
                                                                                                (
                                                                                                    a
                                                                                                ) =>
                                                                                                    (0,
                                                                                                    b.jsxs)(
                                                                                                        'li',
                                                                                                        {
                                                                                                            className:
                                                                                                                'rounded-full bg-background-secondary px-2 py-0.5',
                                                                                                            children:
                                                                                                                [
                                                                                                                    a.startTime,
                                                                                                                    ' ',
                                                                                                                    '- ',
                                                                                                                    a.endTime,
                                                                                                                ],
                                                                                                        },
                                                                                                        a.id
                                                                                                    )
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                    ],
                                                }),
                                                (0, b.jsx)(j, {
                                                    professionalId: a,
                                                    dateISO: c.dateKey,
                                                    onDelete: ({
                                                        dateISO: a,
                                                    }) => q(a),
                                                }),
                                            ],
                                        },
                                        c.id
                                    );
                                }),
                            }),
                ],
            });
        }
        a.s(['DailyExceptionsList', () => l], 193865);
    },
    620198,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(259849),
            e = a.i(156916),
            f = a.i(699570),
            g = a.i(368114),
            h = a.i(580701),
            i = a.i(624126);
        let j = { active: !1, startTime: '00:00', endTime: '23:30' },
            k = [
                { key: 1, label: 'Segunda-feira', short: 'Seg' },
                { key: 2, label: 'Terça-feira', short: 'Ter' },
                { key: 3, label: 'Quarta-feira', short: 'Qua' },
                { key: 4, label: 'Quinta-feira', short: 'Qui' },
                { key: 5, label: 'Sexta-feira', short: 'Sex' },
                { key: 6, label: 'Sábado', short: 'Sáb' },
                { key: 0, label: 'Domingo', short: 'Dom' },
            ],
            l = (() => {
                let a = [];
                for (let b = 0; b <= 23; b++)
                    for (let c = 0; c < 60; c += 30)
                        a.push(
                            `${String(b).padStart(2, '0')}:${String(c).padStart(2, '0')}`
                        );
                return a;
            })();
        function m({
            initialValue: a,
            onChange: d,
            onSave: e,
            isSaving: m = !1,
            leftAction: n,
        }) {
            let [o, p] = (0, c.useState)(
                a ?? {
                    0: { ...j, active: !1 },
                    1: { ...j, active: !0 },
                    2: { ...j, active: !0 },
                    3: { ...j, active: !0 },
                    4: { ...j, active: !0 },
                    5: { ...j, active: !0 },
                    6: { ...j, active: !0 },
                }
            );
            ((0, c.useEffect)(() => {
                a && p(a);
            }, [a]),
                (0, c.useEffect)(() => {
                    d?.(o);
                }, [o, d]));
            let q = (a, b, c) => {
                    p((d) => ({ ...d, [a]: { ...d[a], [b]: c } }));
                },
                r = async () => {
                    let a = Object.entries(o).map(([a, b]) => ({
                        weekday: Number(a),
                        active: b.active,
                        startTime: b.startTime,
                        endTime: b.endTime,
                    }));
                    await e({ days: a });
                };
            return (0, b.jsxs)('div', {
                className: 'space-y-4',
                children: [
                    (0, b.jsxs)('div', {
                        className:
                            'flex flex-wrap items-center justify-end gap-3',
                        children: [
                            n,
                            (0, b.jsx)(f.Button, {
                                type: 'button',
                                variant: 'edit2',
                                size: 'sm',
                                onClick: r,
                                disabled: m,
                                children: m
                                    ? 'Salvando...'
                                    : 'Salvar padrão semanal',
                            }),
                        ],
                    }),
                    (0, b.jsx)('div', {
                        className:
                            'grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7',
                        children: k.map((a) => {
                            let c = o[a.key],
                                d =
                                    c.active &&
                                    c.startTime &&
                                    c.endTime &&
                                    c.startTime >= c.endTime;
                            return (0, b.jsxs)(
                                'div',
                                {
                                    className: (0, g.cn)(
                                        'flex flex-col rounded-xl border px-3 py-3 text-paragraph-small-size transition-colors',
                                        c.active
                                            ? 'border-border-brand bg-background-tertiary/80'
                                            : 'border-border-secondary bg-background-tertiary'
                                    ),
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className:
                                                'mb-2 flex items-center justify-between gap-2',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className: 'flex flex-col',
                                                    children: [
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-content-primary font-medium',
                                                            children: a.short,
                                                        }),
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-[11px] text-content-primary',
                                                            children: a.label,
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsx)('button', {
                                                    type: 'button',
                                                    onClick: () => {
                                                        var b;
                                                        return (
                                                            (b = a.key),
                                                            void p((a) => ({
                                                                ...a,
                                                                [b]: {
                                                                    ...a[b],
                                                                    active: !a[
                                                                        b
                                                                    ].active,
                                                                },
                                                            }))
                                                        );
                                                    },
                                                    disabled: m,
                                                    className: (0, g.cn)(
                                                        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors',
                                                        c.active
                                                            ? 'bg-background-brand text-content-on-brand'
                                                            : 'bg-background-primary text-content-secondary border border-border-secondary',
                                                        m &&
                                                            'opacity-60 cursor-not-allowed'
                                                    ),
                                                    children: c.active
                                                        ? 'Sim'
                                                        : 'Não',
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className: 'mt-auto space-y-2',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'flex flex-col gap-1',
                                                    children: [
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-[11px] text-content-primary',
                                                            children: 'Das',
                                                        }),
                                                        (0, b.jsxs)(h.Select, {
                                                            value: c.startTime,
                                                            onValueChange: (
                                                                b
                                                            ) =>
                                                                q(
                                                                    a.key,
                                                                    'startTime',
                                                                    b
                                                                ),
                                                            disabled:
                                                                !c.active || m,
                                                            children: [
                                                                (0, b.jsx)(
                                                                    h.SelectTrigger,
                                                                    {
                                                                        className:
                                                                            (0,
                                                                            g.cn)(
                                                                                'h-9 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                                d &&
                                                                                    'border-destructive focus-visible:ring-destructive/40'
                                                                            ),
                                                                        children:
                                                                            (0,
                                                                            b.jsxs)(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'flex items-center gap-2',
                                                                                    children:
                                                                                        [
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                i.Clock,
                                                                                                {
                                                                                                    className:
                                                                                                        'h-4 w-4 text-content-brand',
                                                                                                }
                                                                                            ),
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                h.SelectValue,
                                                                                                {
                                                                                                    placeholder:
                                                                                                        'Horário inicial',
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    h.SelectContent,
                                                                    {
                                                                        children:
                                                                            l.map(
                                                                                (
                                                                                    a
                                                                                ) =>
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        h.SelectItem,
                                                                                        {
                                                                                            value: a,
                                                                                            children:
                                                                                                a,
                                                                                        },
                                                                                        a
                                                                                    )
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'flex flex-col gap-1',
                                                    children: [
                                                        (0, b.jsx)('span', {
                                                            className:
                                                                'text-[11px] text-content-primary',
                                                            children: 'Até',
                                                        }),
                                                        (0, b.jsxs)(h.Select, {
                                                            value: c.endTime,
                                                            onValueChange: (
                                                                b
                                                            ) =>
                                                                q(
                                                                    a.key,
                                                                    'endTime',
                                                                    b
                                                                ),
                                                            disabled:
                                                                !c.active || m,
                                                            children: [
                                                                (0, b.jsx)(
                                                                    h.SelectTrigger,
                                                                    {
                                                                        className:
                                                                            (0,
                                                                            g.cn)(
                                                                                'h-9 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                                d &&
                                                                                    'border-destructive focus-visible:ring-destructive/40'
                                                                            ),
                                                                        children:
                                                                            (0,
                                                                            b.jsxs)(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'flex items-center gap-2',
                                                                                    children:
                                                                                        [
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                i.Clock,
                                                                                                {
                                                                                                    className:
                                                                                                        'h-4 w-4 text-content-brand',
                                                                                                }
                                                                                            ),
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                h.SelectValue,
                                                                                                {
                                                                                                    placeholder:
                                                                                                        'Horário final',
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    h.SelectContent,
                                                                    {
                                                                        children:
                                                                            l.map(
                                                                                (
                                                                                    a
                                                                                ) =>
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        h.SelectItem,
                                                                                        {
                                                                                            value: a,
                                                                                            children:
                                                                                                a,
                                                                                        },
                                                                                        a
                                                                                    )
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                },
                                a.key
                            );
                        }),
                    }),
                    (0, b.jsx)('p', {
                        className: 'text-[11px] text-content-secondary',
                        children:
                            'Marque apenas os dias em que você trabalha e ajuste os horários. As exceções por dia (folgas, eventos, etc.) são configuradas logo abaixo.',
                    }),
                    Object.values(o).some(
                        (a) =>
                            a.active &&
                            a.startTime &&
                            a.endTime &&
                            a.startTime >= a.endTime
                    )
                        ? (0, b.jsx)('p', {
                              className: 'text-[11px] text-destructive',
                              children:
                                  'Em dias ativos, o horário inicial deve ser menor que o final.',
                          })
                        : null,
                ],
            });
        }
        function n({ initialValue: a, leftAction: f }) {
            let g = (0, d.useRouter)(),
                [h, i] = (0, c.useState)(!1);
            async function j(a) {
                i(!0);
                try {
                    let b = await fetch(
                            '/api/professional/availability/weekly',
                            {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(a),
                            }
                        ),
                        c = await b.json();
                    if (!b.ok || !c?.ok) {
                        let a =
                            (c && 'error' in c && c.error) ||
                            'Erro ao salvar disponibilidade.';
                        e.toast.error(a);
                        return;
                    }
                    (e.toast.success(
                        'Disponibilidade semanal salva com sucesso!'
                    ),
                        g.refresh());
                } catch {
                    e.toast.error(
                        'Falha ao salvar disponibilidade. Tente novamente.'
                    );
                } finally {
                    i(!1);
                }
            }
            return (0, b.jsx)(m, {
                initialValue: a,
                onSave: j,
                isSaving: h,
                leftAction: f,
            });
        }
        a.s(['WeeklyAvailabilityClient', () => n], 620198);
    },
];

//# sourceMappingURL=src_components_professional_fd9088b0._.js.map
