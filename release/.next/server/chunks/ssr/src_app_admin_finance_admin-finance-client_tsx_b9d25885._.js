module.exports = [
    522257,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439);
        a.i(217018);
        var d = a.i(7329),
            e = a.i(699570),
            f = a.i(814574),
            g = a.i(866718),
            h = a.i(587969),
            i = a.i(766153),
            j = a.i(773608),
            k = a.i(564092),
            l = a.i(499638),
            m = a.i(599209),
            n = a.i(320146),
            o = a.i(368114);
        function p({ name: a, id: d, defaultValue: f }) {
            let g = c.useMemo(() => {
                    if (!f) return;
                    let a = new Date(f);
                    return (0, k.isValid)(a) ? a : void 0;
                }, [f]),
                [p, q] = c.useState(g),
                [r, s] = c.useState(!1);
            return (0, b.jsxs)(b.Fragment, {
                children: [
                    (0, b.jsx)('input', {
                        type: 'hidden',
                        name: a,
                        value: p ? (0, j.format)(p, 'yyyy-MM-dd') : '',
                    }),
                    (0, b.jsxs)(m.Popover, {
                        open: r,
                        onOpenChange: s,
                        children: [
                            (0, b.jsx)(m.PopoverTrigger, {
                                asChild: !0,
                                children: (0, b.jsxs)(e.Button, {
                                    id: d,
                                    type: 'button',
                                    variant: 'outline',
                                    className: (0, o.cn)(
                                        'w-full justify-between text-left font-normal',
                                        'bg-transparent border-border-primary text-content-primary',
                                        'hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary',
                                        'focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand',
                                        'focus:border-border-brand focus-visible:border-border-brand'
                                    ),
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className:
                                                'flex items-center gap-2',
                                            children: [
                                                (0, b.jsx)(h.Calendar, {
                                                    className:
                                                        'h-4 w-4 text-content-brand',
                                                }),
                                                p
                                                    ? (0, b.jsx)('span', {
                                                          children: (0,
                                                          j.format)(
                                                              p,
                                                              'dd/MM/yyyy',
                                                              { locale: l.ptBR }
                                                          ),
                                                      })
                                                    : (0, b.jsx)('span', {
                                                          className:
                                                              'text-content-secondary',
                                                          children:
                                                              'dd/mm/aaaa',
                                                      }),
                                            ],
                                        }),
                                        (0, b.jsx)(i.ChevronDown, {
                                            className: 'h-4 w-4 opacity-50',
                                        }),
                                    ],
                                }),
                            }),
                            (0, b.jsx)(m.PopoverContent, {
                                className:
                                    'w-auto p-0 rounded-xl border border-border-primary bg-background-secondary',
                                children: (0, b.jsx)(n.Calendar, {
                                    mode: 'single',
                                    selected: p,
                                    onSelect: (a) => {
                                        a && (q(a), s(!1));
                                    },
                                    autoFocus: !0,
                                    locale: l.ptBR,
                                }),
                            }),
                        ],
                    }),
                ],
            });
        }
        var q = a.i(259849);
        function r({
            scopeLabel: a,
            monthLabel: c,
            monthQuery: e,
            summary: f,
            professionalEarnings: g,
            barberEarnings: h,
            expenses: i,
            newExpenseDisabled: j,
        }) {
            let k = Array.isArray(g)
                ? g
                : Array.isArray(h)
                  ? h.map((a) => ({
                        professionalId: a.barberId,
                        name: a.name,
                        servicesEarnings: a.servicesEarnings,
                        productsEarnings: a.productsEarnings,
                        total: a.total,
                    }))
                  : [];
            return (0, b.jsxs)('div', {
                className: 'space-y-6 max-w-7xl',
                children: [
                    (0, b.jsxs)('header', {
                        className:
                            'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
                        children: [
                            (0, b.jsxs)('div', {
                                children: [
                                    (0, b.jsx)('h1', {
                                        className:
                                            'text-title text-content-primary',
                                        children: 'Financeiro',
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children: [
                                            'Mês selecionado:',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className: 'font-medium',
                                                children: c,
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'text-paragraph-small text-content-tertiary',
                                        children: [
                                            'Unidade:',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className: 'font-medium',
                                                children: a,
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsx)('div', {
                                className:
                                    'flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end',
                                children: (0, b.jsx)(d.MonthPicker, {}),
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'grid gap-4 md:grid-cols-3',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children:
                                            'Faturamento líquido (pagos no mês)',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-title text-content-primary',
                                        children: f.netRevenueMonth,
                                    }),
                                    (0, b.jsxs)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children: [
                                            'Serviços (líq.):',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className: 'font-semibold',
                                                children: f.servicesNetMonth,
                                            }),
                                            ' ',
                                            '• Produtos (líq.):',
                                            ' ',
                                            (0, b.jsx)('span', {
                                                className: 'font-semibold',
                                                children: f.productsNetMonth,
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Despesas (mês)',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-title text-content-primary',
                                        children: f.totalExpenses,
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children:
                                            'Todas as despesas cadastradas para este mês.',
                                    }),
                                ],
                            }),
                            (0, b.jsxs)('div', {
                                className:
                                    'space-y-1 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                children: [
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-label-small text-content-secondary',
                                        children: 'Lucro líquido (mês)',
                                    }),
                                    (0, b.jsx)('p', {
                                        className: `text-title ${f.netIncomeIsPositive ? 'text-green-500' : 'text-red-600'}`,
                                        children: f.netIncome,
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children:
                                            'Faturamento líquido menos as despesas do mês.',
                                    }),
                                ],
                            }),
                        ],
                    }),
                    (0, b.jsx)(s, { professionalsEarnings: k }),
                    (0, b.jsxs)('div', {
                        className:
                            'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
                        children: [
                            (0, b.jsxs)('div', {
                                children: [
                                    (0, b.jsx)('h2', {
                                        className:
                                            'text-subtitle text-content-primary',
                                        children: 'Cadastro de despesas (mês)',
                                    }),
                                    (0, b.jsx)('p', {
                                        className:
                                            'text-paragraph-small text-content-secondary',
                                        children:
                                            'Contas cadastradas para este mês, incluindo despesas recorrentes e avulsas.',
                                    }),
                                ],
                            }),
                            (0, b.jsx)(u, { month: e, disabled: j }),
                        ],
                    }),
                    (0, b.jsx)('section', {
                        className:
                            'overflow-x-auto rounded-xl border border-border-primary bg-background-tertiary',
                        children: (0, b.jsxs)('table', {
                            className: 'min-w-full text-sm',
                            children: [
                                (0, b.jsx)('thead', {
                                    children: (0, b.jsxs)('tr', {
                                        className:
                                            'border-b border-border-primary bg-muted/40 text-left text-label-small text-content-secondary',
                                        children: [
                                            (0, b.jsx)('th', {
                                                className: 'px-4 py-2',
                                                children: 'Descrição',
                                            }),
                                            (0, b.jsx)('th', {
                                                className: 'px-4 py-2',
                                                children: 'Vencimento',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-2 text-right',
                                                children: 'Valor',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-2 text-center',
                                                children: 'Recorrente',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-2 text-center',
                                                children: 'Status',
                                            }),
                                            (0, b.jsx)('th', {
                                                className:
                                                    'px-4 py-2 text-right',
                                                children: 'Ações',
                                            }),
                                        ],
                                    }),
                                }),
                                (0, b.jsx)('tbody', {
                                    children:
                                        0 === i.length
                                            ? (0, b.jsx)('tr', {
                                                  children: (0, b.jsx)('td', {
                                                      colSpan: 6,
                                                      className:
                                                          'px-4 py-6 text-center text-paragraph-small text-content-secondary',
                                                      children:
                                                          'Nenhuma despesa cadastrada para este mês.',
                                                  }),
                                              })
                                            : i.map((a) =>
                                                  (0, b.jsx)(
                                                      t,
                                                      { expense: a },
                                                      a.id
                                                  )
                                              ),
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        function s({ professionalsEarnings: a }) {
            let c = Array.isArray(a) ? a : [];
            return (0, b.jsxs)('section', {
                className: 'space-y-3',
                children: [
                    (0, b.jsxs)('div', {
                        children: [
                            (0, b.jsx)('h2', {
                                className: 'text-subtitle text-content-primary',
                                children: 'Faturamento por profissional (mês)',
                            }),
                            (0, b.jsx)('p', {
                                className:
                                    'text-paragraph-small text-content-secondary',
                                children:
                                    'Valores recebidos em serviços e comissões de produtos (pagos no mês).',
                            }),
                        ],
                    }),
                    0 === c.length
                        ? (0, b.jsx)('p', {
                              className:
                                  'text-paragraph-small text-content-secondary',
                              children: 'Nenhum profissional ativo cadastrado.',
                          })
                        : (0, b.jsx)('div', {
                              className:
                                  'grid gap-4 grid-cols-1 sm:grid-cols-2',
                              style: {
                                  gridTemplateColumns:
                                      c.length <= 0
                                          ? void 0
                                          : `repeat(${Math.min(5, c.length)}, minmax(0, 1fr))`,
                              },
                              children: c.map((a) =>
                                  (0, b.jsxs)(
                                      'div',
                                      {
                                          className:
                                              'space-y-2 rounded-xl border border-border-primary bg-background-tertiary px-4 py-3',
                                          children: [
                                              (0, b.jsx)('p', {
                                                  className:
                                                      'text-label-large text-content-primary',
                                                  children: a.name,
                                              }),
                                              (0, b.jsxs)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children: [
                                                      'Serviços:',
                                                      ' ',
                                                      (0, b.jsx)('span', {
                                                          className:
                                                              'font-semibold',
                                                          children:
                                                              a.servicesEarnings,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children: [
                                                      'Produtos:',
                                                      ' ',
                                                      (0, b.jsx)('span', {
                                                          className:
                                                              'font-semibold',
                                                          children:
                                                              a.productsEarnings,
                                                      }),
                                                  ],
                                              }),
                                              (0, b.jsxs)('p', {
                                                  className:
                                                      'text-paragraph-small text-content-secondary',
                                                  children: [
                                                      'Total:',
                                                      ' ',
                                                      (0, b.jsx)('span', {
                                                          className:
                                                              'font-semibold',
                                                          children: a.total,
                                                      }),
                                                  ],
                                              }),
                                          ],
                                      },
                                      a.professionalId
                                  )
                              ),
                          }),
                ],
            });
        }
        function t({ expense: a }) {
            let d = (0, q.useRouter)(),
                g =
                    'success' === a.statusTone ||
                    'pago' === String(a.statusLabel || '').toLowerCase(),
                [h, i] = c.useState(null),
                j = h ?? g,
                k = j ? 'Pago' : 'Em aberto',
                l = j
                    ? 'bg-green-500/15 text-green-600 border-green-500/30'
                    : 'bg-amber-500/15 text-amber-700 border-amber-500/30',
                [m, n] = c.useState(!1),
                [p, r] = c.useState(!1),
                [s, t] = c.useState(null),
                [u, v] = c.useState(!1),
                [w, x] = c.useState(null),
                y = c.useCallback(async () => {
                    (t(null), r(!0));
                    try {
                        let b = await fetch(
                                `/api/admin/finance/expenses/${encodeURIComponent(a.id)}`,
                                { method: 'DELETE' }
                            ),
                            c = await b.json();
                        if (!b.ok || !c.ok) {
                            (t(c.ok ? 'Falha ao excluir.' : c.error), r(!1));
                            return;
                        }
                        (n(!1), d.refresh());
                    } catch {
                        t('Erro de rede. Tente novamente.');
                    } finally {
                        r(!1);
                    }
                }, [a.id, d]),
                z = c.useCallback(async () => {
                    (x(null), v(!0));
                    let b = !j;
                    i(b);
                    try {
                        let c = await fetch(
                                `/api/admin/finance/expenses/${encodeURIComponent(a.id)}/paid`,
                                {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ isPaid: b }),
                                }
                            ),
                            e = await c.json();
                        if (!c.ok || !e.ok) {
                            (i(j),
                                x(
                                    e.ok
                                        ? 'Falha ao atualizar status.'
                                        : e.error
                                ),
                                v(!1));
                            return;
                        }
                        (i(e.data.isPaid), d.refresh());
                    } catch {
                        (i(j), x('Erro de rede. Tente novamente.'));
                    } finally {
                        v(!1);
                    }
                }, [j, a.id, d]);
            return (0, b.jsxs)('tr', {
                className: 'border-b border-border-primary last:border-b-0',
                children: [
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-content-primary',
                        children: a.description,
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-content-secondary',
                        children: a.dueDate,
                    }),
                    (0, b.jsx)('td', {
                        className:
                            'px-4 py-3 text-right text-content-primary font-medium',
                        children: a.amount,
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-center',
                        children: (0, b.jsx)('span', {
                            className: (0, o.cn)(
                                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                                a.isRecurring
                                    ? 'bg-border-brand/10 border-border-brand/30 text-content-primary'
                                    : 'bg-muted/40 border-border-primary text-content-secondary'
                            ),
                            children: a.isRecurring ? 'Sim' : 'Não',
                        }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-center',
                        children: (0, b.jsx)('span', {
                            className: (0, o.cn)(
                                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs',
                                l
                            ),
                            title: w ?? void 0,
                            children: k,
                        }),
                    }),
                    (0, b.jsx)('td', {
                        className: 'px-4 py-3 text-right',
                        children: (0, b.jsxs)('div', {
                            className:
                                'inline-flex flex-wrap justify-end gap-2',
                            children: [
                                (0, b.jsx)(e.Button, {
                                    size: 'sm',
                                    variant: 'edit2',
                                    className: 'h-8',
                                    children: 'Editar',
                                }),
                                (0, b.jsx)(e.Button, {
                                    size: 'sm',
                                    variant: 'outline',
                                    className: (0, o.cn)(
                                        'h-8 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand',
                                        u && 'opacity-70 cursor-wait'
                                    ),
                                    onClick: z,
                                    disabled: u || p,
                                    title: j
                                        ? 'Marcar como pendente'
                                        : 'Marcar como paga',
                                    children: u
                                        ? 'Atualizando...'
                                        : j
                                          ? 'Pendente'
                                          : 'Conta paga',
                                }),
                                (0, b.jsxs)(f.Dialog, {
                                    open: m,
                                    onOpenChange: n,
                                    children: [
                                        (0, b.jsx)(f.DialogTrigger, {
                                            asChild: !0,
                                            children: (0, b.jsx)(e.Button, {
                                                size: 'sm',
                                                variant: 'destructive',
                                                className: 'h-8',
                                                disabled: u,
                                                children: 'Excluir',
                                            }),
                                        }),
                                        (0, b.jsxs)(f.DialogContent, {
                                            className:
                                                'bg-background-secondary border border-border-primary',
                                            children: [
                                                (0, b.jsx)(f.DialogHeader, {
                                                    children: (0, b.jsx)(
                                                        f.DialogTitle,
                                                        {
                                                            className:
                                                                'text-title text-content-primary',
                                                            children:
                                                                'Excluir despesa',
                                                        }
                                                    ),
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-3',
                                                    children: [
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'rounded-xl border border-border-primary bg-background-tertiary px-3 py-2',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-paragraph-small text-content-secondary',
                                                                        children:
                                                                            'Você está prestes a excluir:',
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-label-large text-content-primary',
                                                                        children:
                                                                            a.description,
                                                                    }
                                                                ),
                                                                (0, b.jsxs)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-paragraph-small text-content-secondary',
                                                                        children:
                                                                            [
                                                                                'Vencimento: ',
                                                                                a.dueDate,
                                                                                ' • Valor:',
                                                                                ' ',
                                                                                (0,
                                                                                b.jsx)(
                                                                                    'span',
                                                                                    {
                                                                                        className:
                                                                                            'font-semibold text-content-primary',
                                                                                        children:
                                                                                            a.amount,
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        a.isRecurring
                                                            ? (0, b.jsx)(
                                                                  'div',
                                                                  {
                                                                      className:
                                                                          'rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2',
                                                                      children:
                                                                          (0,
                                                                          b.jsxs)(
                                                                              'p',
                                                                              {
                                                                                  className:
                                                                                      'text-paragraph-small text-amber-700',
                                                                                  children:
                                                                                      [
                                                                                          'Essa despesa é ',
                                                                                          (0,
                                                                                          b.jsx)(
                                                                                              'b',
                                                                                              {
                                                                                                  children:
                                                                                                      'recorrente',
                                                                                              }
                                                                                          ),
                                                                                          '. Ao excluir, o sistema removerá esta despesa e ',
                                                                                          (0,
                                                                                          b.jsx)(
                                                                                              'b',
                                                                                              {
                                                                                                  children:
                                                                                                      'todas as próximas',
                                                                                              }
                                                                                          ),
                                                                                          '(do mês atual em diante).',
                                                                                      ],
                                                                              }
                                                                          ),
                                                                  }
                                                              )
                                                            : (0, b.jsx)('p', {
                                                                  className:
                                                                      'text-paragraph-small text-content-secondary',
                                                                  children:
                                                                      'Essa ação não pode ser desfeita.',
                                                              }),
                                                        s &&
                                                            (0, b.jsx)('div', {
                                                                className:
                                                                    'rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2',
                                                                children: (0,
                                                                b.jsx)('p', {
                                                                    className:
                                                                        'text-paragraph-small text-red-600',
                                                                    children: s,
                                                                }),
                                                            }),
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'flex justify-end gap-2 pt-2',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    e.Button,
                                                                    {
                                                                        type: 'button',
                                                                        variant:
                                                                            'outline',
                                                                        onClick:
                                                                            () =>
                                                                                n(
                                                                                    !1
                                                                                ),
                                                                        disabled:
                                                                            p,
                                                                        className:
                                                                            'bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand',
                                                                        children:
                                                                            'Cancelar',
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    e.Button,
                                                                    {
                                                                        type: 'button',
                                                                        variant:
                                                                            'destructive',
                                                                        onClick:
                                                                            y,
                                                                        disabled:
                                                                            p,
                                                                        children:
                                                                            p
                                                                                ? 'Excluindo...'
                                                                                : 'Excluir',
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            });
        }
        function u({ month: a, disabled: d }) {
            let h = (0, q.useRouter)(),
                i = (0, q.useSearchParams)().get('unit') || null,
                [j, k] = c.useState(!1),
                [l, m] = c.useState(!1),
                [n, o] = c.useState(null),
                r = !!i,
                s = c.useCallback(
                    async (b) => {
                        if ((b.preventDefault(), o(null), !i))
                            return void o(
                                'Selecione uma unidade para cadastrar a despesa.'
                            );
                        let c = b.currentTarget,
                            d = new FormData(c),
                            e = String(d.get('description') ?? '').trim(),
                            f = Number(String(d.get('amount') ?? '').trim()),
                            g = null != d.get('isRecurring'),
                            j = String(d.get('recurringDay') ?? '').trim(),
                            l = j ? Number(j) : void 0,
                            n = String(d.get('dueDate') ?? '').trim() || void 0;
                        if (!e) return void o('Informe a descrição.');
                        if (!Number.isFinite(f) || f <= 0)
                            return void o('Informe um valor válido.');
                        if (g) {
                            if (
                                !Number.isFinite(Number(l)) ||
                                1 > Number(l) ||
                                Number(l) > 31
                            )
                                return void o(
                                    'Informe um dia de vencimento (1 a 31).'
                                );
                        } else if (!n)
                            return void o('Informe a data de vencimento.');
                        m(!0);
                        try {
                            let b = await fetch('/api/admin/finance/expenses', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        month: a,
                                        unitId: i,
                                        category: 'OTHER',
                                        description: e,
                                        amount: f,
                                        isRecurring: g,
                                        recurringDay: g ? Number(l) : void 0,
                                        dueDate: g ? void 0 : n,
                                    }),
                                }),
                                d = await b.json();
                            if (!b.ok || !d.ok) {
                                (o(d.ok ? 'Falha ao salvar.' : d.error), m(!1));
                                return;
                            }
                            (k(!1), c.reset(), h.refresh());
                        } catch {
                            o('Erro de rede. Tente novamente.');
                        } finally {
                            m(!1);
                        }
                    },
                    [a, h, i]
                );
            return d
                ? (0, b.jsx)(e.Button, {
                      variant: 'brand',
                      disabled: !0,
                      title: 'Ação indisponível',
                      children: 'Nova despesa',
                  })
                : (0, b.jsxs)(f.Dialog, {
                      open: j,
                      onOpenChange: k,
                      children: [
                          (0, b.jsx)(f.DialogTrigger, {
                              asChild: !0,
                              children: (0, b.jsx)(e.Button, {
                                  variant: 'brand',
                                  children: 'Nova despesa',
                              }),
                          }),
                          (0, b.jsxs)(f.DialogContent, {
                              className:
                                  'bg-background-secondary border border-border-primary',
                              children: [
                                  (0, b.jsx)(f.DialogHeader, {
                                      children: (0, b.jsx)(f.DialogTitle, {
                                          className:
                                              'text-title text-content-primary',
                                          children: 'Nova despesa',
                                      }),
                                  }),
                                  (0, b.jsxs)('form', {
                                      onSubmit: s,
                                      className: 'space-y-4',
                                      children: [
                                          (0, b.jsx)('input', {
                                              type: 'hidden',
                                              name: 'month',
                                              value: a,
                                          }),
                                          (0, b.jsx)('input', {
                                              type: 'hidden',
                                              name: 'category',
                                              value: 'OTHER',
                                          }),
                                          (0, b.jsx)('input', {
                                              type: 'hidden',
                                              name: 'unitId',
                                              value: i ?? '',
                                          }),
                                          !r &&
                                              (0, b.jsx)('div', {
                                                  className:
                                                      'rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2',
                                                  children: (0, b.jsx)('p', {
                                                      className:
                                                          'text-paragraph-small text-amber-700',
                                                      children:
                                                          'Selecione uma unidade no menu lateral para cadastrar a despesa.',
                                                  }),
                                              }),
                                          (0, b.jsxs)('div', {
                                              className: 'space-y-1',
                                              children: [
                                                  (0, b.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      htmlFor: 'description',
                                                      children: 'Descrição',
                                                  }),
                                                  (0, b.jsx)(g.Input, {
                                                      id: 'description',
                                                      name: 'description',
                                                      required: !0,
                                                      placeholder:
                                                          'Ex: Aluguel, Luz, Internet...',
                                                      className:
                                                          'bg-background-tertiary border-border-primary text-content-primary',
                                                  }),
                                              ],
                                          }),
                                          (0, b.jsxs)('div', {
                                              className: 'space-y-1',
                                              children: [
                                                  (0, b.jsx)('label', {
                                                      className:
                                                          'text-label-small text-content-secondary',
                                                      htmlFor: 'amount',
                                                      children: 'Valor (R$)',
                                                  }),
                                                  (0, b.jsx)(g.Input, {
                                                      id: 'amount',
                                                      name: 'amount',
                                                      type: 'number',
                                                      step: '0.01',
                                                      min: '0',
                                                      required: !0,
                                                      className:
                                                          'bg-background-tertiary border-border-primary text-content-primary',
                                                  }),
                                              ],
                                          }),
                                          (0, b.jsxs)('div', {
                                              className: 'space-y-3',
                                              children: [
                                                  (0, b.jsx)('input', {
                                                      id: 'isRecurring',
                                                      name: 'isRecurring',
                                                      type: 'checkbox',
                                                      className: 'peer sr-only',
                                                  }),
                                                  (0, b.jsxs)('label', {
                                                      htmlFor: 'isRecurring',
                                                      className:
                                                          ' inline-flex items-center gap-2 cursor-pointer peer-checked:[&_.box]:bg-border-brand peer-checked:[&_.box]:border-border-brand peer-checked:[&_.check]:bg-background-primary ',
                                                      children: [
                                                          (0, b.jsx)('span', {
                                                              className:
                                                                  ' box flex h-4 w-4 items-center justify-center rounded border border-border-primary bg-background-tertiary transition-colors ',
                                                              children: (0,
                                                              b.jsx)('span', {
                                                                  className:
                                                                      'check h-2 w-2 rounded-sm bg-transparent transition-colors',
                                                              }),
                                                          }),
                                                          (0, b.jsx)('span', {
                                                              className:
                                                                  'text-label-small text-content-primary',
                                                              children:
                                                                  'Despesa recorrente',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, b.jsxs)('div', {
                                                      className:
                                                          'space-y-1 hidden peer-checked:block',
                                                      children: [
                                                          (0, b.jsx)('label', {
                                                              className:
                                                                  'text-label-small text-content-secondary',
                                                              htmlFor:
                                                                  'recurringDay',
                                                              children:
                                                                  'Dia de vencimento (se recorrente)',
                                                          }),
                                                          (0, b.jsx)(g.Input, {
                                                              id: 'recurringDay',
                                                              name: 'recurringDay',
                                                              type: 'number',
                                                              min: 1,
                                                              max: 31,
                                                              placeholder:
                                                                  'Ex: 10',
                                                              className:
                                                                  'bg-background-tertiary border-border-primary text-content-primary',
                                                          }),
                                                          (0, b.jsx)('p', {
                                                              className:
                                                                  'text-paragraph-small text-content-secondary',
                                                              children:
                                                                  'Para despesas recorrentes, informe apenas o dia de vencimento (se for 31 e o mês não tiver, cai no último dia do mês).',
                                                          }),
                                                      ],
                                                  }),
                                                  (0, b.jsxs)('div', {
                                                      className:
                                                          'space-y-1 peer-checked:hidden',
                                                      children: [
                                                          (0, b.jsx)('label', {
                                                              className:
                                                                  'text-label-small text-content-secondary',
                                                              htmlFor:
                                                                  'dueDate',
                                                              children:
                                                                  'Data de vencimento (se NÃO recorrente)',
                                                          }),
                                                          (0, b.jsx)(p, {
                                                              id: 'dueDate',
                                                              name: 'dueDate',
                                                          }),
                                                          (0, b.jsx)('p', {
                                                              className:
                                                                  'text-paragraph-small text-content-secondary',
                                                              children:
                                                                  'Use este campo para despesas que acontecem em uma data única.',
                                                          }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                          n &&
                                              (0, b.jsx)('div', {
                                                  className:
                                                      'rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2',
                                                  children: (0, b.jsx)('p', {
                                                      className:
                                                          'text-paragraph-small text-red-600',
                                                      children: n,
                                                  }),
                                              }),
                                          (0, b.jsx)('div', {
                                              className:
                                                  'flex justify-end gap-2 pt-2',
                                              children: (0, b.jsx)(e.Button, {
                                                  type: 'submit',
                                                  variant: 'brand',
                                                  disabled: l || !r,
                                                  title: r
                                                      ? void 0
                                                      : 'Selecione uma unidade para salvar',
                                                  children: l
                                                      ? 'Salvando...'
                                                      : 'Salvar',
                                              }),
                                          }),
                                      ],
                                  }),
                              ],
                          }),
                      ],
                  });
        }
        a.s(['default', () => r], 522257);
    },
];

//# sourceMappingURL=src_app_admin_finance_admin-finance-client_tsx_b9d25885._.js.map
