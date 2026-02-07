module.exports = [
    911843,
    (a) => {
        'use strict';
        var b = a.i(584944),
            c = a.i(107439),
            d = a.i(876841),
            e = a.i(699570),
            f = a.i(786304),
            g = a.i(866718),
            h = a.i(814574),
            i = a.i(263758),
            j = a.i(898062),
            k = a.i(203431);
        let l = (0, k.default)('map-pin', [
                [
                    'path',
                    {
                        d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
                        key: '1r0f0z',
                    },
                ],
                ['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
            ]),
            m = (0, k.default)('hash', [
                [
                    'line',
                    { x1: '4', x2: '20', y1: '9', y2: '9', key: '4lhtct' },
                ],
                [
                    'line',
                    { x1: '4', x2: '20', y1: '15', y2: '15', key: 'vyu0kd' },
                ],
                [
                    'line',
                    { x1: '10', x2: '8', y1: '3', y2: '21', key: '1ggp8o' },
                ],
                [
                    'line',
                    { x1: '16', x2: '14', y1: '3', y2: '21', key: 'weycgp' },
                ],
            ]);
        var n = a.i(198803);
        let o = (0, k.default)('toggle-right', [
            ['circle', { cx: '15', cy: '12', r: '3', key: '1afu0r' }],
            [
                'rect',
                {
                    width: '20',
                    height: '14',
                    x: '2',
                    y: '5',
                    rx: '7',
                    key: 'g7kal2',
                },
            ],
        ]);
        var p = a.i(320091),
            q = a.i(789815),
            r = a.i(190616),
            s = a.i(156916),
            t = a.i(368114),
            u = a.i(580701),
            v = a.i(320146),
            w = a.i(599209),
            x = a.i(773608),
            y = a.i(564092),
            z = a.i(499638),
            A = a.i(587969),
            B = a.i(766153),
            C = a.i(624126);
        let D = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            E = [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado',
            ],
            F = (() => {
                let a = [];
                for (let b = 0; b <= 23; b++)
                    for (let c = 0; c < 60; c += 30)
                        a.push(
                            `${String(b).padStart(2, '0')}:${String(c).padStart(2, '0')}`
                        );
                return a;
            })();
        function G(a) {
            return a &&
                'object' == typeof a &&
                'ok' in a &&
                !1 === a.ok &&
                'string' == typeof a.error
                ? String(a.error)
                : 'internal_error';
        }
        function H(a) {
            return (
                {
                    forbidden_owner_only: 'Somente o dono pode criar exceções.',
                    unit_not_found: 'Não foi possível encontrar essa unidade.',
                    unit_id_required: 'Unidade inválida.',
                    exception_id_required: 'Exceção inválida.',
                    invalid_json: 'Erro ao enviar dados. Tente novamente.',
                    date_required: 'Informe uma data válida.',
                    invalid_time_format:
                        'Informe horário no formato correto (HH:mm).',
                    invalid_time_range:
                        'O horário final deve ser maior que o inicial.',
                    intervals_overlap: 'Os intervalos não podem se sobrepor.',
                    unauthorized:
                        'Você não tem permissão para realizar esta ação.',
                    internal_error: 'Erro interno. Tente novamente.',
                    exception_not_found: 'Exceção não encontrada.',
                }[a] ?? 'Algo deu errado. Tente novamente.'
            );
        }
        function I(a) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(a.trim());
        }
        function J(a) {
            let [b, c] = a.split(':').map(Number);
            return 60 * b + c;
        }
        function K() {
            let a = new Date(),
                b = a.getFullYear(),
                c = String(a.getMonth() + 1).padStart(2, '0'),
                d = String(a.getDate()).padStart(2, '0');
            return `${b}-${c}-${d}`;
        }
        function L(a) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(a)) return null;
            let [b, c, d] = a.split('-').map(Number);
            if (!b || !c || !d) return null;
            let e = new Date(b, c - 1, d).getDay();
            return Number.isFinite(e) ? e : null;
        }
        function M(a) {
            return [...a].sort(
                (a, b) =>
                    J(a.startTime) - J(b.startTime) ||
                    J(a.endTime) - J(b.endTime)
            );
        }
        function N({
            unitId: a,
            weekly: d,
            setWeeklyByUnitId: f,
            onSubmitWeekly: g,
        }) {
            let i,
                j,
                k,
                l = c.useMemo(() => {
                    let a = d || {};
                    return Array.from({ length: 7 }).map((b, c) => {
                        let d = a[c] || {
                            isActive: !1,
                            startTime: '',
                            endTime: '',
                        };
                        return {
                            weekday: c,
                            short: D[c] ?? `Dia ${c}`,
                            full: E[c] ?? `Dia ${c}`,
                            isActive: d.isActive,
                            startTime: d.startTime,
                            endTime: d.endTime,
                        };
                    });
                }, [d]),
                m = c.useMemo(
                    () =>
                        l.some((a) => {
                            if (!a.isActive) return !1;
                            let b = String(a.startTime || '').trim(),
                                c = String(a.endTime || '').trim();
                            return !!I(b) && !!I(c) && J(b) >= J(c);
                        }),
                    [l]
                ),
                [n, o] = c.useState([]),
                [p, q] = c.useState(!0),
                [r, N] = c.useState(null),
                O = c.useRef(null),
                P = c.useCallback(async () => {
                    (q(!0), N(null), O.current && O.current.abort());
                    let b = new AbortController();
                    O.current = b;
                    try {
                        let c = await fetch(
                                `/api/admin/settings/units/${a}/exceptions`,
                                {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    signal: b.signal,
                                }
                            ),
                            d = null;
                        try {
                            d = await c.json();
                        } catch {
                            d = null;
                        }
                        if (!c.ok || !d || !d.ok) {
                            let a = d ? G(d) : 'internal_error',
                                b = H(a);
                            (o([]), N(b));
                            return;
                        }
                        let e = Array.isArray(d.data) ? d.data : [];
                        o(
                            [...e].sort((a, b) =>
                                a.date === b.date ? 0 : a.date < b.date ? 1 : -1
                            )
                        );
                    } catch (a) {
                        if (a?.name === 'AbortError') return;
                        (o([]),
                            N(
                                'Não foi possível carregar as exceções. Verifique sua conexão.'
                            ));
                    } finally {
                        q(!1);
                    }
                }, [a]);
            c.useEffect(
                () => (
                    P(),
                    () => {
                        O.current && O.current.abort();
                    }
                ),
                [P]
            );
            let [Q, R] = c.useState(null);
            async function S(b) {
                if (b) {
                    R(b);
                    try {
                        let c = await fetch(
                                `/api/admin/settings/units/${a}/exceptions/${b}`,
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                }
                            ),
                            d = null;
                        try {
                            d = await c.json();
                        } catch {
                            d = null;
                        }
                        if (!c.ok || !d || !d.ok) {
                            let a = d ? G(d) : 'internal_error';
                            s.toast.error(H(a));
                            return;
                        }
                        (s.toast.success('Exceção removida ✅'), await P());
                    } catch {
                        s.toast.error(
                            'Não foi possível remover a exceção. Verifique a conexão.'
                        );
                    } finally {
                        R(null);
                    }
                }
            }
            let [T, U] = c.useState(!1),
                [V, W] = c.useState(!1),
                [X, Y] = c.useState(!1),
                [Z, $] = c.useState({
                    date: K(),
                    mode: 'INTERVALS',
                    intervals: [{ startTime: '12:00', endTime: '14:00' }],
                }),
                _ = c.useMemo(
                    () =>
                        (function (a) {
                            if (!/^\d{4}-\d{2}-\d{2}$/.test(a)) return null;
                            let [b, c, d] = a.split('-').map(Number);
                            if (!b || !c || !d) return null;
                            let e = new Date(b, c - 1, d);
                            return (0, y.isValid)(e) ? e : null;
                        })(Z.date) ?? new Date(),
                    [Z.date]
                );
            function aa() {
                V || (U(!1), Y(!1));
            }
            function ab(a, b) {
                $((c) => {
                    let d = [...c.intervals];
                    return ((d[a] = { ...d[a], ...b }), { ...c, intervals: d });
                });
            }
            function ac(a) {
                let b = L(a);
                if (null === b) return null;
                let c = d?.[b];
                if (!c?.isActive) return null;
                let e = String(c.startTime || '').trim(),
                    f = String(c.endTime || '').trim();
                if (!I(e) || !I(f)) return null;
                let g = J(e);
                return J(f) <= g ? null : { startTime: e, endTime: f };
            }
            async function ad(b) {
                b.preventDefault();
                let c = String(Z.date || '').trim(),
                    d = Z.mode;
                if (!c || !/^\d{4}-\d{2}-\d{2}$/.test(c))
                    return void s.toast.error('Informe uma data válida.');
                let e = [];
                if ('FULL_DAY' === d) {
                    let a = ac(c);
                    if (!a) {
                        let a = L(c),
                            b = null !== a ? (E[a] ?? `Dia ${a}`) : 'o dia';
                        s.toast.error(
                            `N\xe3o d\xe1 pra bloquear o dia inteiro: ${b} n\xe3o est\xe1 com hor\xe1rio v\xe1lido no padr\xe3o semanal.`
                        );
                        return;
                    }
                    e = [a];
                } else {
                    let a = Z.intervals.map((a) => ({
                        startTime: String(a.startTime || '').trim(),
                        endTime: String(a.endTime || '').trim(),
                    }));
                    for (let b = 0; b < a.length; b++) {
                        let c = a[b];
                        if (!I(c.startTime) || !I(c.endTime))
                            return void s.toast.error(
                                `Intervalo #${b + 1}: hor\xe1rios inv\xe1lidos.`
                            );
                        let d = J(c.startTime);
                        if (J(c.endTime) <= d)
                            return void s.toast.error(
                                `Intervalo #${b + 1}: o hor\xe1rio final deve ser maior que o inicial.`
                            );
                    }
                    if (
                        (function (a) {
                            let b = M(a);
                            for (let a = 1; a < b.length; a++) {
                                let c = J(b[a - 1].endTime);
                                if (J(b[a].startTime) < c) return !0;
                            }
                            return !1;
                        })(a)
                    )
                        return void s.toast.error(
                            'Os intervalos não podem se sobrepor.'
                        );
                    e = M(a);
                }
                W(!0);
                try {
                    let b = await fetch(
                            `/api/admin/settings/units/${a}/exceptions`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    date: c,
                                    mode: d,
                                    intervals: e,
                                }),
                            }
                        ),
                        f = null;
                    try {
                        f = await b.json();
                    } catch {
                        f = null;
                    }
                    if (!b.ok || !f || !f.ok) {
                        let a = f ? G(f) : 'internal_error';
                        s.toast.error(H(a));
                        return;
                    }
                    (s.toast.success(
                        'FULL_DAY' === d
                            ? 'Exceção criada (dia inteiro) ✅'
                            : 'Exceção criada ✅'
                    ),
                        U(!1),
                        await P());
                } catch {
                    s.toast.error(
                        'Não foi possível criar a exceção. Verifique a conexão.'
                    );
                } finally {
                    W(!1);
                }
            }
            return (0, b.jsxs)('div', {
                className:
                    'rounded-2xl border border-border-primary bg-background-secondary p-4 space-y-4',
                children: [
                    (0, b.jsx)(h.Dialog, {
                        open: T,
                        onOpenChange: (a) => (a ? U(!0) : aa()),
                        children: (0, b.jsxs)(h.DialogContent, {
                            variant: 'appointment',
                            overlayVariant: 'blurred',
                            showCloseButton: !0,
                            className: 'sm:max-w-[720px]',
                            children: [
                                (0, b.jsxs)(h.DialogHeader, {
                                    children: [
                                        (0, b.jsx)(h.DialogTitle, {
                                            size: 'modal',
                                            children: 'Criar exceção',
                                        }),
                                        (0, b.jsx)(h.DialogDescription, {
                                            size: 'modal',
                                            children:
                                                'Bloqueie o dia inteiro (com base no padrão semanal) ou crie pausas por intervalos.',
                                        }),
                                    ],
                                }),
                                (0, b.jsxs)('form', {
                                    onSubmit: ad,
                                    className: 'space-y-4',
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className:
                                                'grid gap-4 md:grid-cols-2',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children: 'Data',
                                                        }),
                                                        (0, b.jsxs)(w.Popover, {
                                                            open: X,
                                                            onOpenChange: Y,
                                                            children: [
                                                                (0, b.jsx)(
                                                                    w.PopoverTrigger,
                                                                    {
                                                                        asChild:
                                                                            !0,
                                                                        children:
                                                                            (0,
                                                                            b.jsxs)(
                                                                                e.Button,
                                                                                {
                                                                                    type: 'button',
                                                                                    variant:
                                                                                        'outline',
                                                                                    className:
                                                                                        'w-full justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                                    disabled:
                                                                                        V,
                                                                                    children:
                                                                                        [
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
                                                                                                                A.Calendar,
                                                                                                                {
                                                                                                                    className:
                                                                                                                        'h-4 w-4 text-content-brand',
                                                                                                                }
                                                                                                            ),
                                                                                                            _
                                                                                                                ? (0,
                                                                                                                  x.format)(
                                                                                                                      _,
                                                                                                                      'dd/MM/yyyy',
                                                                                                                      {
                                                                                                                          locale: z.ptBR,
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
                                                                                                }
                                                                                            ),
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                B.ChevronDown,
                                                                                                {
                                                                                                    className:
                                                                                                        'h-4 w-4 opacity-50',
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    w.PopoverContent,
                                                                    {
                                                                        className:
                                                                            'w-auto p-0',
                                                                        children:
                                                                            (0,
                                                                            b.jsx)(
                                                                                v.Calendar,
                                                                                {
                                                                                    mode: 'single',
                                                                                    selected:
                                                                                        _,
                                                                                    onSelect:
                                                                                        (
                                                                                            a
                                                                                        ) => {
                                                                                            a &&
                                                                                                ($(
                                                                                                    (
                                                                                                        b
                                                                                                    ) => ({
                                                                                                        ...b,
                                                                                                        date: (0,
                                                                                                        x.format)(
                                                                                                            a,
                                                                                                            'yyyy-MM-dd'
                                                                                                        ),
                                                                                                    })
                                                                                                ),
                                                                                                Y(
                                                                                                    !1
                                                                                                ));
                                                                                        },
                                                                                    autoFocus:
                                                                                        !0,
                                                                                    locale: z.ptBR,
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        (0, b.jsx)('p', {
                                                            className:
                                                                'text-[11px] text-content-secondary/70',
                                                            children:
                                                                'Selecione uma data para criar o bloqueio.',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children:
                                                                'Tipo de bloqueio',
                                                        }),
                                                        (0, b.jsxs)(u.Select, {
                                                            value: Z.mode,
                                                            onValueChange: (
                                                                a
                                                            ) =>
                                                                $((b) => ({
                                                                    ...b,
                                                                    mode: a,
                                                                })),
                                                            disabled: V,
                                                            children: [
                                                                (0, b.jsx)(
                                                                    u.SelectTrigger,
                                                                    {
                                                                        className:
                                                                            'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
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
                                                                                                C.Clock,
                                                                                                {
                                                                                                    className:
                                                                                                        'h-4 w-4 text-content-brand',
                                                                                                }
                                                                                            ),
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                u.SelectValue,
                                                                                                {
                                                                                                    placeholder:
                                                                                                        'Selecione',
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                (0, b.jsxs)(
                                                                    u.SelectContent,
                                                                    {
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsx)(
                                                                                    u.SelectItem,
                                                                                    {
                                                                                        value: 'FULL_DAY',
                                                                                        children:
                                                                                            'Dia inteiro',
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsx)(
                                                                                    u.SelectItem,
                                                                                    {
                                                                                        value: 'INTERVALS',
                                                                                        children:
                                                                                            'Intervalos',
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        (0, b.jsx)('p', {
                                                            className:
                                                                'text-[11px] text-content-secondary/70',
                                                            children:
                                                                'FULL_DAY' ===
                                                                Z.mode
                                                                    ? 'Vai bloquear o período de atendimento do dia, baseado no padrão semanal.'
                                                                    : 'Você pode adicionar vários intervalos de pausa/bloqueio.',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        'FULL_DAY' === Z.mode
                                            ? (0, b.jsx)('div', {
                                                  className:
                                                      'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-2',
                                                  children:
                                                      ((j =
                                                          null !==
                                                          (i = L(Z.date))
                                                              ? (E[i] ??
                                                                `Dia ${i}`)
                                                              : '—'),
                                                      (k = ac(Z.date)),
                                                      (0, b.jsxs)(b.Fragment, {
                                                          children: [
                                                              (0, b.jsxs)('p', {
                                                                  className:
                                                                      'text-[11px] text-content-secondary',
                                                                  children: [
                                                                      'Dia selecionado:',
                                                                      ' ',
                                                                      (0,
                                                                      b.jsx)(
                                                                          'span',
                                                                          {
                                                                              className:
                                                                                  'text-content-primary font-medium',
                                                                              children:
                                                                                  j,
                                                                          }
                                                                      ),
                                                                  ],
                                                              }),
                                                              k
                                                                  ? (0, b.jsxs)(
                                                                        'p',
                                                                        {
                                                                            className:
                                                                                'text-[11px] text-content-secondary',
                                                                            children:
                                                                                [
                                                                                    'Horário do padrão semanal:',
                                                                                    ' ',
                                                                                    (0,
                                                                                    b.jsxs)(
                                                                                        'span',
                                                                                        {
                                                                                            className:
                                                                                                'text-content-primary',
                                                                                            children:
                                                                                                [
                                                                                                    k.startTime,
                                                                                                    ' às',
                                                                                                    ' ',
                                                                                                    k.endTime,
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    )
                                                                  : (0, b.jsx)(
                                                                        'p',
                                                                        {
                                                                            className:
                                                                                'text-[11px] text-destructive',
                                                                            children:
                                                                                'Esse dia não tem horário válido no padrão semanal (ou está desativado).',
                                                                        }
                                                                    ),
                                                              (0, b.jsx)('p', {
                                                                  className:
                                                                      'text-[11px] text-content-secondary/70',
                                                                  children:
                                                                      'Dica: ajuste o padrão semanal se quiser que “dia inteiro” funcione nesse dia.',
                                                              }),
                                                          ],
                                                      })),
                                              })
                                            : (0, b.jsxs)('div', {
                                                  className: 'space-y-3',
                                                  children: [
                                                      (0, b.jsxs)('div', {
                                                          className:
                                                              'flex items-center justify-between gap-3',
                                                          children: [
                                                              (0, b.jsxs)(
                                                                  'div',
                                                                  {
                                                                      children:
                                                                          [
                                                                              (0,
                                                                              b.jsx)(
                                                                                  'p',
                                                                                  {
                                                                                      className:
                                                                                          'text-label-medium-size text-content-primary',
                                                                                      children:
                                                                                          'Intervalos',
                                                                                  }
                                                                              ),
                                                                              (0,
                                                                              b.jsx)(
                                                                                  'p',
                                                                                  {
                                                                                      className:
                                                                                          'text-[11px] text-content-secondary/70',
                                                                                      children:
                                                                                          'Adicione pausas/bloqueios no dia selecionado.',
                                                                                  }
                                                                              ),
                                                                          ],
                                                                  }
                                                              ),
                                                              (0, b.jsx)(
                                                                  e.Button,
                                                                  {
                                                                      type: 'button',
                                                                      variant:
                                                                          'outline',
                                                                      size: 'sm',
                                                                      onClick:
                                                                          function () {
                                                                              $(
                                                                                  (
                                                                                      a
                                                                                  ) => ({
                                                                                      ...a,
                                                                                      mode: 'INTERVALS',
                                                                                      intervals:
                                                                                          [
                                                                                              ...a.intervals,
                                                                                              {
                                                                                                  startTime:
                                                                                                      '12:00',
                                                                                                  endTime:
                                                                                                      '14:00',
                                                                                              },
                                                                                          ],
                                                                                  })
                                                                              );
                                                                          },
                                                                      disabled:
                                                                          V,
                                                                      children:
                                                                          '+ Adicionar intervalo',
                                                                  }
                                                              ),
                                                          ],
                                                      }),
                                                      (0, b.jsx)('div', {
                                                          className:
                                                              'space-y-2',
                                                          children:
                                                              Z.intervals.map(
                                                                  (a, c) =>
                                                                      (0,
                                                                      b.jsxs)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-3',
                                                                              children:
                                                                                  [
                                                                                      (0,
                                                                                      b.jsxs)(
                                                                                          'div',
                                                                                          {
                                                                                              className:
                                                                                                  'flex items-center justify-between gap-2',
                                                                                              children:
                                                                                                  [
                                                                                                      (0,
                                                                                                      b.jsxs)(
                                                                                                          'p',
                                                                                                          {
                                                                                                              className:
                                                                                                                  'text-[11px] text-content-secondary',
                                                                                                              children:
                                                                                                                  [
                                                                                                                      'Intervalo #',
                                                                                                                      c +
                                                                                                                          1,
                                                                                                                  ],
                                                                                                          }
                                                                                                      ),
                                                                                                      (0,
                                                                                                      b.jsx)(
                                                                                                          e.Button,
                                                                                                          {
                                                                                                              type: 'button',
                                                                                                              variant:
                                                                                                                  'outline',
                                                                                                              size: 'sm',
                                                                                                              onClick:
                                                                                                                  () => {
                                                                                                                      $(
                                                                                                                          (
                                                                                                                              a
                                                                                                                          ) => {
                                                                                                                              let b =
                                                                                                                                  [
                                                                                                                                      ...a.intervals,
                                                                                                                                  ];
                                                                                                                              return (
                                                                                                                                  b.splice(
                                                                                                                                      c,
                                                                                                                                      1
                                                                                                                                  ),
                                                                                                                                  {
                                                                                                                                      ...a,
                                                                                                                                      intervals:
                                                                                                                                          b.length
                                                                                                                                              ? b
                                                                                                                                              : [
                                                                                                                                                    {
                                                                                                                                                        startTime:
                                                                                                                                                            '12:00',
                                                                                                                                                        endTime:
                                                                                                                                                            '14:00',
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                  }
                                                                                                                              );
                                                                                                                          }
                                                                                                                      );
                                                                                                                  },
                                                                                                              disabled:
                                                                                                                  V ||
                                                                                                                  Z
                                                                                                                      .intervals
                                                                                                                      .length <=
                                                                                                                      1,
                                                                                                              children:
                                                                                                                  'Remover',
                                                                                                          }
                                                                                                      ),
                                                                                                  ],
                                                                                          }
                                                                                      ),
                                                                                      (0,
                                                                                      b.jsxs)(
                                                                                          'div',
                                                                                          {
                                                                                              className:
                                                                                                  'grid gap-4 md:grid-cols-2',
                                                                                              children:
                                                                                                  [
                                                                                                      (0,
                                                                                                      b.jsxs)(
                                                                                                          'div',
                                                                                                          {
                                                                                                              className:
                                                                                                                  'space-y-2',
                                                                                                              children:
                                                                                                                  [
                                                                                                                      (0,
                                                                                                                      b.jsx)(
                                                                                                                          'label',
                                                                                                                          {
                                                                                                                              className:
                                                                                                                                  'text-label-medium-size text-content-primary',
                                                                                                                              children:
                                                                                                                                  'Início',
                                                                                                                          }
                                                                                                                      ),
                                                                                                                      (0,
                                                                                                                      b.jsxs)(
                                                                                                                          u.Select,
                                                                                                                          {
                                                                                                                              value:
                                                                                                                                  a.startTime ||
                                                                                                                                  '',
                                                                                                                              onValueChange:
                                                                                                                                  (
                                                                                                                                      a
                                                                                                                                  ) =>
                                                                                                                                      ab(
                                                                                                                                          c,
                                                                                                                                          {
                                                                                                                                              startTime:
                                                                                                                                                  a,
                                                                                                                                          }
                                                                                                                                      ),
                                                                                                                              disabled:
                                                                                                                                  V,
                                                                                                                              children:
                                                                                                                                  [
                                                                                                                                      (0,
                                                                                                                                      b.jsx)(
                                                                                                                                          u.SelectTrigger,
                                                                                                                                          {
                                                                                                                                              className:
                                                                                                                                                  (0,
                                                                                                                                                  t.cn)(
                                                                                                                                                      'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand'
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
                                                                                                                                                                      C.Clock,
                                                                                                                                                                      {
                                                                                                                                                                          className:
                                                                                                                                                                              'h-4 w-4 text-content-brand',
                                                                                                                                                                      }
                                                                                                                                                                  ),
                                                                                                                                                                  (0,
                                                                                                                                                                  b.jsx)(
                                                                                                                                                                      u.SelectValue,
                                                                                                                                                                      {
                                                                                                                                                                          placeholder:
                                                                                                                                                                              '00:00',
                                                                                                                                                                      }
                                                                                                                                                                  ),
                                                                                                                                                              ],
                                                                                                                                                      }
                                                                                                                                                  ),
                                                                                                                                          }
                                                                                                                                      ),
                                                                                                                                      (0,
                                                                                                                                      b.jsx)(
                                                                                                                                          u.SelectContent,
                                                                                                                                          {
                                                                                                                                              children:
                                                                                                                                                  F.map(
                                                                                                                                                      (
                                                                                                                                                          a
                                                                                                                                                      ) =>
                                                                                                                                                          (0,
                                                                                                                                                          b.jsx)(
                                                                                                                                                              u.SelectItem,
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
                                                                                                      (0,
                                                                                                      b.jsxs)(
                                                                                                          'div',
                                                                                                          {
                                                                                                              className:
                                                                                                                  'space-y-2',
                                                                                                              children:
                                                                                                                  [
                                                                                                                      (0,
                                                                                                                      b.jsx)(
                                                                                                                          'label',
                                                                                                                          {
                                                                                                                              className:
                                                                                                                                  'text-label-medium-size text-content-primary',
                                                                                                                              children:
                                                                                                                                  'Fim',
                                                                                                                          }
                                                                                                                      ),
                                                                                                                      (0,
                                                                                                                      b.jsxs)(
                                                                                                                          u.Select,
                                                                                                                          {
                                                                                                                              value:
                                                                                                                                  a.endTime ||
                                                                                                                                  '',
                                                                                                                              onValueChange:
                                                                                                                                  (
                                                                                                                                      a
                                                                                                                                  ) =>
                                                                                                                                      ab(
                                                                                                                                          c,
                                                                                                                                          {
                                                                                                                                              endTime:
                                                                                                                                                  a,
                                                                                                                                          }
                                                                                                                                      ),
                                                                                                                              disabled:
                                                                                                                                  V,
                                                                                                                              children:
                                                                                                                                  [
                                                                                                                                      (0,
                                                                                                                                      b.jsx)(
                                                                                                                                          u.SelectTrigger,
                                                                                                                                          {
                                                                                                                                              className:
                                                                                                                                                  (0,
                                                                                                                                                  t.cn)(
                                                                                                                                                      'h-10 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand'
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
                                                                                                                                                                      C.Clock,
                                                                                                                                                                      {
                                                                                                                                                                          className:
                                                                                                                                                                              'h-4 w-4 text-content-brand',
                                                                                                                                                                      }
                                                                                                                                                                  ),
                                                                                                                                                                  (0,
                                                                                                                                                                  b.jsx)(
                                                                                                                                                                      u.SelectValue,
                                                                                                                                                                      {
                                                                                                                                                                          placeholder:
                                                                                                                                                                              '00:00',
                                                                                                                                                                      }
                                                                                                                                                                  ),
                                                                                                                                                              ],
                                                                                                                                                      }
                                                                                                                                                  ),
                                                                                                                                          }
                                                                                                                                      ),
                                                                                                                                      (0,
                                                                                                                                      b.jsx)(
                                                                                                                                          u.SelectContent,
                                                                                                                                          {
                                                                                                                                              children:
                                                                                                                                                  F.map(
                                                                                                                                                      (
                                                                                                                                                          a
                                                                                                                                                      ) =>
                                                                                                                                                          (0,
                                                                                                                                                          b.jsx)(
                                                                                                                                                              u.SelectItem,
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
                                                                                                  ],
                                                                                          }
                                                                                      ),
                                                                                      (0,
                                                                                      b.jsxs)(
                                                                                          'p',
                                                                                          {
                                                                                              className:
                                                                                                  'text-[11px] text-content-secondary/70',
                                                                                              children:
                                                                                                  [
                                                                                                      'Exemplo: ',
                                                                                                      (0,
                                                                                                      b.jsx)(
                                                                                                          'strong',
                                                                                                          {
                                                                                                              children:
                                                                                                                  '12:00',
                                                                                                          }
                                                                                                      ),
                                                                                                      ' ',
                                                                                                      'até ',
                                                                                                      (0,
                                                                                                      b.jsx)(
                                                                                                          'strong',
                                                                                                          {
                                                                                                              children:
                                                                                                                  '14:00',
                                                                                                          }
                                                                                                      ),
                                                                                                      ' para a pausa do almoço. 🥪',
                                                                                                  ],
                                                                                          }
                                                                                      ),
                                                                                  ],
                                                                          },
                                                                          `${c}-${a.startTime}-${a.endTime}`
                                                                      )
                                                              ),
                                                      }),
                                                  ],
                                              }),
                                        (0, b.jsxs)(h.DialogFooter, {
                                            className: 'gap-2 sm:gap-3',
                                            children: [
                                                (0, b.jsx)(e.Button, {
                                                    type: 'submit',
                                                    variant: 'edit2',
                                                    size: 'sm',
                                                    disabled: V,
                                                    children: V
                                                        ? 'Criando…'
                                                        : 'Criar exceção',
                                                }),
                                                (0, b.jsx)(e.Button, {
                                                    type: 'button',
                                                    variant: 'outline',
                                                    size: 'sm',
                                                    onClick: aa,
                                                    disabled: V,
                                                    children: 'Cancelar',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    (0, b.jsxs)('form', {
                        onSubmit: (b) => g(a, b),
                        className: 'space-y-4',
                        children: [
                            (0, b.jsxs)('div', {
                                className:
                                    'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3',
                                children: [
                                    (0, b.jsxs)('div', {
                                        children: [
                                            (0, b.jsx)('h3', {
                                                className:
                                                    'text-label-small text-content-primary',
                                                children:
                                                    'Disponibilidade da unidade',
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-paragraph-small text-content-secondary',
                                                children:
                                                    'Ajuste o padrão semanal de atendimento desta unidade.',
                                            }),
                                        ],
                                    }),
                                    (0, b.jsxs)('div', {
                                        className:
                                            'flex items-center justify-end gap-2',
                                        children: [
                                            (0, b.jsx)(e.Button, {
                                                type: 'submit',
                                                variant: 'edit2',
                                                size: 'sm',
                                                disabled: m,
                                                title: m
                                                    ? 'Corrija os horários inválidos antes de salvar.'
                                                    : void 0,
                                                children:
                                                    'Salvar padrão semanal',
                                            }),
                                            (0, b.jsx)(e.Button, {
                                                type: 'button',
                                                variant: 'destructive',
                                                size: 'sm',
                                                onClick: function () {
                                                    ($({
                                                        date: K(),
                                                        mode: 'INTERVALS',
                                                        intervals: [
                                                            {
                                                                startTime:
                                                                    '12:00',
                                                                endTime:
                                                                    '14:00',
                                                            },
                                                        ],
                                                    }),
                                                        Y(!1),
                                                        U(!0));
                                                },
                                                children: 'Criar exceção',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, b.jsx)('div', {
                                className:
                                    'grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7',
                                children: l.map((c) => {
                                    let d = I(String(c.startTime || '')),
                                        e = I(String(c.endTime || '')),
                                        g =
                                            c.isActive &&
                                            d &&
                                            e &&
                                            J(c.startTime) >= J(c.endTime);
                                    return (0, b.jsxs)(
                                        'div',
                                        {
                                            className: (0, t.cn)(
                                                'flex flex-col rounded-xl border px-3 py-3 text-paragraph-small-size transition-colors',
                                                c.isActive
                                                    ? 'border-border-brand bg-background-tertiary/80'
                                                    : 'border-border-secondary bg-background-tertiary'
                                            ),
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'mb-2 flex items-center justify-between gap-2',
                                                    children: [
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'flex flex-col',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    'span',
                                                                    {
                                                                        className:
                                                                            'text-content-primary font-medium',
                                                                        children:
                                                                            c.short,
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    'span',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-content-primary',
                                                                        children:
                                                                            c.full,
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        (0, b.jsx)('button', {
                                                            type: 'button',
                                                            onClick: () => {
                                                                let b =
                                                                    !c.isActive;
                                                                f((d) => ({
                                                                    ...d,
                                                                    [a]: {
                                                                        ...(d[
                                                                            a
                                                                        ] ||
                                                                            {}),
                                                                        [c.weekday]:
                                                                            {
                                                                                ...(d[
                                                                                    a
                                                                                ]?.[
                                                                                    c
                                                                                        .weekday
                                                                                ] || {
                                                                                    isActive:
                                                                                        !1,
                                                                                    startTime:
                                                                                        '',
                                                                                    endTime:
                                                                                        '',
                                                                                }),
                                                                                isActive:
                                                                                    b,
                                                                            },
                                                                    },
                                                                }));
                                                            },
                                                            className: (0,
                                                            t.cn)(
                                                                'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors',
                                                                c.isActive
                                                                    ? 'bg-background-brand text-content-on-brand'
                                                                    : 'bg-background-primary text-content-secondary border border-border-secondary'
                                                            ),
                                                            children: c.isActive
                                                                ? 'Sim'
                                                                : 'Não',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'mt-auto space-y-2',
                                                    children: [
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'flex flex-col gap-1',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    'span',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-content-primary',
                                                                        children:
                                                                            'Das',
                                                                    }
                                                                ),
                                                                (0, b.jsxs)(
                                                                    u.Select,
                                                                    {
                                                                        value:
                                                                            c.startTime ||
                                                                            '',
                                                                        onValueChange:
                                                                            (
                                                                                b
                                                                            ) => {
                                                                                f(
                                                                                    (
                                                                                        d
                                                                                    ) => ({
                                                                                        ...d,
                                                                                        [a]: {
                                                                                            ...(d[
                                                                                                a
                                                                                            ] ||
                                                                                                {}),
                                                                                            [c.weekday]:
                                                                                                {
                                                                                                    ...(d[
                                                                                                        a
                                                                                                    ]?.[
                                                                                                        c
                                                                                                            .weekday
                                                                                                    ] || {
                                                                                                        isActive:
                                                                                                            !1,
                                                                                                        startTime:
                                                                                                            '',
                                                                                                        endTime:
                                                                                                            '',
                                                                                                    }),
                                                                                                    startTime:
                                                                                                        b,
                                                                                                },
                                                                                        },
                                                                                    })
                                                                                );
                                                                            },
                                                                        disabled:
                                                                            !c.isActive,
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsx)(
                                                                                    u.SelectTrigger,
                                                                                    {
                                                                                        className:
                                                                                            (0,
                                                                                            t.cn)(
                                                                                                'h-9 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                                                g &&
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
                                                                                                                C.Clock,
                                                                                                                {
                                                                                                                    className:
                                                                                                                        'h-4 w-4 text-content-brand',
                                                                                                                }
                                                                                                            ),
                                                                                                            (0,
                                                                                                            b.jsx)(
                                                                                                                u.SelectValue,
                                                                                                                {
                                                                                                                    placeholder:
                                                                                                                        '00:00',
                                                                                                                }
                                                                                                            ),
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsx)(
                                                                                    u.SelectContent,
                                                                                    {
                                                                                        children:
                                                                                            F.map(
                                                                                                (
                                                                                                    a
                                                                                                ) =>
                                                                                                    (0,
                                                                                                    b.jsx)(
                                                                                                        u.SelectItem,
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
                                                        }),
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'flex flex-col gap-1',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    'span',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-content-primary',
                                                                        children:
                                                                            'Até',
                                                                    }
                                                                ),
                                                                (0, b.jsxs)(
                                                                    u.Select,
                                                                    {
                                                                        value:
                                                                            c.endTime ||
                                                                            '',
                                                                        onValueChange:
                                                                            (
                                                                                b
                                                                            ) => {
                                                                                f(
                                                                                    (
                                                                                        d
                                                                                    ) => ({
                                                                                        ...d,
                                                                                        [a]: {
                                                                                            ...(d[
                                                                                                a
                                                                                            ] ||
                                                                                                {}),
                                                                                            [c.weekday]:
                                                                                                {
                                                                                                    ...(d[
                                                                                                        a
                                                                                                    ]?.[
                                                                                                        c
                                                                                                            .weekday
                                                                                                    ] || {
                                                                                                        isActive:
                                                                                                            !1,
                                                                                                        startTime:
                                                                                                            '',
                                                                                                        endTime:
                                                                                                            '',
                                                                                                    }),
                                                                                                    endTime:
                                                                                                        b,
                                                                                                },
                                                                                        },
                                                                                    })
                                                                                );
                                                                            },
                                                                        disabled:
                                                                            !c.isActive,
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsx)(
                                                                                    u.SelectTrigger,
                                                                                    {
                                                                                        className:
                                                                                            (0,
                                                                                            t.cn)(
                                                                                                'h-9 w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                                                                                                g &&
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
                                                                                                                C.Clock,
                                                                                                                {
                                                                                                                    className:
                                                                                                                        'h-4 w-4 text-content-brand',
                                                                                                                }
                                                                                                            ),
                                                                                                            (0,
                                                                                                            b.jsx)(
                                                                                                                u.SelectValue,
                                                                                                                {
                                                                                                                    placeholder:
                                                                                                                        '00:00',
                                                                                                                }
                                                                                                            ),
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsx)(
                                                                                    u.SelectContent,
                                                                                    {
                                                                                        children:
                                                                                            F.map(
                                                                                                (
                                                                                                    a
                                                                                                ) =>
                                                                                                    (0,
                                                                                                    b.jsx)(
                                                                                                        u.SelectItem,
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
                                                        }),
                                                    ],
                                                }),
                                                g &&
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'mt-2 text-[11px] text-destructive',
                                                        children:
                                                            'Em dias ativos, o horário inicial deve ser menor que o final.',
                                                    }),
                                            ],
                                        },
                                        c.weekday
                                    );
                                }),
                            }),
                            m &&
                                (0, b.jsx)('p', {
                                    className: 'text-[11px] text-destructive',
                                    children:
                                        'Existem dias ativos com horário inválido (início maior/igual ao fim).',
                                }),
                            (0, b.jsxs)('div', {
                                className: 'pt-4 space-y-2',
                                children: [
                                    (0, b.jsxs)('div', {
                                        className:
                                            'flex items-center justify-between gap-3',
                                        children: [
                                            (0, b.jsxs)('div', {
                                                children: [
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-label-small text-content-primary',
                                                        children: 'Exceções',
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-[11px] text-content-secondary',
                                                        children:
                                                            'Pausas/bloqueios em datas específicas.',
                                                    }),
                                                ],
                                            }),
                                            (0, b.jsx)(e.Button, {
                                                type: 'button',
                                                variant: 'outline',
                                                size: 'sm',
                                                onClick: P,
                                                disabled: p,
                                                children: p
                                                    ? 'Atualizando…'
                                                    : 'Atualizar',
                                            }),
                                        ],
                                    }),
                                    r
                                        ? (0, b.jsx)('div', {
                                              className:
                                                  'rounded-xl border border-destructive/40 bg-destructive/5 p-4',
                                              children: (0, b.jsx)('p', {
                                                  className:
                                                      'text-[11px] text-destructive',
                                                  children: r,
                                              }),
                                          })
                                        : p
                                          ? (0, b.jsxs)('div', {
                                                className:
                                                    'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-2',
                                                children: [
                                                    (0, b.jsx)('div', {
                                                        className:
                                                            'h-9 w-full rounded-lg bg-background-secondary/60',
                                                    }),
                                                    (0, b.jsx)('div', {
                                                        className:
                                                            'h-9 w-full rounded-lg bg-background-secondary/60',
                                                    }),
                                                    (0, b.jsx)('p', {
                                                        className:
                                                            'text-[11px] text-content-secondary',
                                                        children:
                                                            'Carregando exceções…',
                                                    }),
                                                ],
                                            })
                                          : 0 === n.length
                                            ? (0, b.jsx)('div', {
                                                  className:
                                                      'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                                  children: (0, b.jsx)('p', {
                                                      className:
                                                          'text-paragraph-small text-content-secondary',
                                                      children:
                                                          'Nenhuma exceção cadastrada ainda.',
                                                  }),
                                              })
                                            : (0, b.jsx)('div', {
                                                  className: 'space-y-2',
                                                  children: n.map((a) => {
                                                      let c = Q === a.id,
                                                          d = Array.isArray(
                                                              a.intervals
                                                          )
                                                              ? a.intervals
                                                              : [];
                                                      return (0, b.jsx)(
                                                          'div',
                                                          {
                                                              className:
                                                                  'rounded-xl border border-border-primary bg-background-tertiary p-4',
                                                              children: (0,
                                                              b.jsxs)('div', {
                                                                  className:
                                                                      'flex items-start justify-between gap-3',
                                                                  children: [
                                                                      (0,
                                                                      b.jsxs)(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'min-w-0',
                                                                              children:
                                                                                  [
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          'p',
                                                                                          {
                                                                                              className:
                                                                                                  'text-paragraph-small text-content-primary font-medium',
                                                                                              children:
                                                                                                  (function (
                                                                                                      a
                                                                                                  ) {
                                                                                                      let [
                                                                                                          b,
                                                                                                          c,
                                                                                                          d,
                                                                                                      ] =
                                                                                                          a
                                                                                                              .split(
                                                                                                                  '-'
                                                                                                              )
                                                                                                              .map(
                                                                                                                  Number
                                                                                                              );
                                                                                                      if (
                                                                                                          !b ||
                                                                                                          !c ||
                                                                                                          !d
                                                                                                      )
                                                                                                          return a;
                                                                                                      try {
                                                                                                          return new Intl.DateTimeFormat(
                                                                                                              'pt-BR',
                                                                                                              {
                                                                                                                  day: '2-digit',
                                                                                                                  month: '2-digit',
                                                                                                                  year: 'numeric',
                                                                                                              }
                                                                                                          ).format(
                                                                                                              new Date(
                                                                                                                  b,
                                                                                                                  c -
                                                                                                                      1,
                                                                                                                  d
                                                                                                              )
                                                                                                          );
                                                                                                      } catch {
                                                                                                          return a;
                                                                                                      }
                                                                                                  })(
                                                                                                      a.date
                                                                                                  ),
                                                                                          }
                                                                                      ),
                                                                                      a.isClosed
                                                                                          ? (0,
                                                                                            b.jsx)(
                                                                                                'p',
                                                                                                {
                                                                                                    className:
                                                                                                        'text-[11px] text-content-secondary mt-1',
                                                                                                    children:
                                                                                                        'Dia fechado (sem atendimento)',
                                                                                                }
                                                                                            )
                                                                                          : d.length
                                                                                            ? (0,
                                                                                              b.jsx)(
                                                                                                  'div',
                                                                                                  {
                                                                                                      className:
                                                                                                          'mt-1 space-y-1',
                                                                                                      children:
                                                                                                          d.map(
                                                                                                              (
                                                                                                                  a
                                                                                                              ) =>
                                                                                                                  (0,
                                                                                                                  b.jsxs)(
                                                                                                                      'p',
                                                                                                                      {
                                                                                                                          className:
                                                                                                                              'text-[11px] text-content-secondary',
                                                                                                                          children:
                                                                                                                              [
                                                                                                                                  'Pausa:',
                                                                                                                                  ' ',
                                                                                                                                  (0,
                                                                                                                                  b.jsxs)(
                                                                                                                                      'span',
                                                                                                                                      {
                                                                                                                                          className:
                                                                                                                                              'text-content-primary',
                                                                                                                                          children:
                                                                                                                                              [
                                                                                                                                                  a.startTime,
                                                                                                                                                  ' ',
                                                                                                                                                  'às',
                                                                                                                                                  ' ',
                                                                                                                                                  a.endTime,
                                                                                                                                              ],
                                                                                                                                      }
                                                                                                                                  ),
                                                                                                                              ],
                                                                                                                      },
                                                                                                                      a.id
                                                                                                                  )
                                                                                                          ),
                                                                                                  }
                                                                                              )
                                                                                            : (0,
                                                                                              b.jsx)(
                                                                                                  'p',
                                                                                                  {
                                                                                                      className:
                                                                                                          'text-[11px] text-content-secondary mt-1',
                                                                                                      children:
                                                                                                          'Exceção sem intervalos (vazia)',
                                                                                                  }
                                                                                              ),
                                                                                  ],
                                                                          }
                                                                      ),
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
                                                                                          'span',
                                                                                          {
                                                                                              className:
                                                                                                  'shrink-0 rounded-full border border-border-primary px-3 py-1 text-[11px] text-content-secondary',
                                                                                              children:
                                                                                                  'Bloqueio',
                                                                                          }
                                                                                      ),
                                                                                      (0,
                                                                                      b.jsx)(
                                                                                          e.Button,
                                                                                          {
                                                                                              type: 'button',
                                                                                              variant:
                                                                                                  'outline',
                                                                                              size: 'sm',
                                                                                              disabled:
                                                                                                  c,
                                                                                              onClick:
                                                                                                  () =>
                                                                                                      S(
                                                                                                          a.id
                                                                                                      ),
                                                                                              children:
                                                                                                  c
                                                                                                      ? 'Removendo…'
                                                                                                      : 'Remover',
                                                                                          }
                                                                                      ),
                                                                                  ],
                                                                          }
                                                                      ),
                                                                  ],
                                                              }),
                                                          },
                                                          a.id
                                                      );
                                                  }),
                                              }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }
        let O = [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
        ];
        function P(a) {
            try {
                return new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(a);
            } catch {
                return a.toISOString();
            }
        }
        function Q(a) {
            return (
                {
                    forbidden_owner_only:
                        'Somente o dono pode editar dados da empresa.',
                    company_not_found: 'Não foi possível encontrar a empresa.',
                    company_name_required: 'Informe o nome da empresa.',
                    invalid_json: 'Erro ao enviar dados. Tente novamente.',
                    internal_error: 'Erro interno. Tente novamente.',
                    forbidden: 'Você não tem permissão para acessar esta área.',
                }[a] ?? 'Algo deu errado. Tente novamente.'
            );
        }
        function R(a) {
            return (
                {
                    forbidden_owner_only: 'Somente o dono pode criar unidades.',
                    unit_name_required: 'Informe o nome da unidade.',
                    invalid_json: 'Erro ao enviar dados. Tente novamente.',
                    internal_error: 'Erro interno. Tente novamente.',
                    forbidden:
                        'Você não tem permissão para gerenciar unidades.',
                    unit_not_found: 'Não foi possível encontrar essa unidade.',
                }[a] ?? 'Algo deu errado. Tente novamente.'
            );
        }
        function S(a) {
            return (
                {
                    forbidden_owner_only:
                        'Somente o dono pode criar/editar administradores.',
                    forbidden_cannot_edit_owner:
                        'Não é possível editar permissões do dono (OWNER).',
                    target_not_found:
                        'Não foi possível encontrar esse administrador.',
                    target_not_admin: 'Esse usuário não é um administrador.',
                    nothing_to_update: 'Nenhuma alteração foi enviada.',
                    invalid_id: 'Administrador inválido.',
                    admin_name_required: 'Informe o nome do administrador.',
                    admin_email_required: 'Informe o e-mail do administrador.',
                    admin_email_invalid: 'Informe um e-mail válido.',
                    admin_phone_invalid: 'Informe um telefone válido.',
                    admin_password_invalid:
                        'A senha deve ter pelo menos 6 caracteres.',
                    email_in_use: 'Este e-mail já está em uso.',
                    missing_unit:
                        'Você precisa ter pelo menos 1 unidade ativa para criar administradores.',
                    invalid_json: 'Erro ao enviar dados. Tente novamente.',
                    internal_error: 'Erro interno. Tente novamente.',
                    forbidden: 'Você não tem permissão para acessar esta área.',
                    unauthorized: 'Sua sessão expirou. Faça login novamente.',
                    admin_not_found:
                        'Não foi possível encontrar esse administrador.',
                }[a] ?? 'Algo deu errado. Tente novamente.'
            );
        }
        function T(a) {
            return a &&
                'object' == typeof a &&
                'ok' in a &&
                !1 === a.ok &&
                'string' == typeof a.error
                ? String(a.error)
                : 'internal_error';
        }
        function U() {
            return Array.from({ length: 7 }).reduce(
                (a, b, c) => (
                    (a[c] =
                        0 === c
                            ? { isActive: !1, startTime: '', endTime: '' }
                            : {
                                  isActive: !0,
                                  startTime: '09:00',
                                  endTime: '18:00',
                              }),
                    a
                ),
                {}
            );
        }
        function V(a) {
            let b = new Date(a.createdAt),
                c =
                    a.address ||
                    [a.street, a.number ? `, ${a.number}` : '']
                        .join('')
                        .trim() ||
                    '—';
            return {
                id: a.id,
                name: a.name,
                phone: a.phone?.trim() ? a.phone : '—',
                address: c || '—',
                isActive: !!a.isActive,
                createdAt: Number.isNaN(b.getTime()) ? new Date() : b,
            };
        }
        function W(a) {
            let b = new Date(a.createdAt);
            return {
                id: a.id,
                name: (a.name ?? '').trim() || '—',
                email: a.email,
                phone: (a.phone ?? '').trim() || '—',
                createdAt: Number.isNaN(b.getTime()) ? new Date() : b,
                isOwner: !!a.isOwner,
                isActive: !!a.isActive,
                permissions: {
                    canAccessDashboard: !!a.permissions?.canAccessDashboard,
                    canAccessReports: !!a.permissions?.canAccessReports,
                    canAccessCheckout: !!a.permissions?.canAccessCheckout,
                    canAccessAppointments:
                        !!a.permissions?.canAccessAppointments,
                    canAccessProfessionals:
                        !!a.permissions?.canAccessProfessionals,
                    canAccessServices: !!a.permissions?.canAccessServices,
                    canAccessReviews: !!a.permissions?.canAccessReviews,
                    canAccessProducts: !!a.permissions?.canAccessProducts,
                    canAccessPartners: !!a.permissions?.canAccessPartners,
                    canAccessClients: !!a.permissions?.canAccessClients,
                    canAccessClientLevels:
                        !!a.permissions?.canAccessClientLevels,
                    canAccessFinance: !!a.permissions?.canAccessFinance,
                    canAccessSettings: !!a.permissions?.canAccessSettings,
                },
            };
        }
        function X(a) {
            return a.replace(/\D/g, '');
        }
        function Y(a) {
            let b = X(a).slice(0, 8);
            return b.length <= 5 ? b : `${b.slice(0, 5)}-${b.slice(5)}`;
        }
        function Z(a) {
            let b = X(a).slice(0, 11);
            if (0 === b.length) return '';
            if (b.length < 3) return `(${b}`;
            let c = b.slice(0, 2),
                d = b.slice(2);
            if (b.length <= 10) {
                let a = d.slice(0, 4),
                    b = d.slice(4, 8);
                return d.length <= 4 ? `(${c}) ${a}` : `(${c}) ${a}-${b}`;
            }
            let e = d.slice(0, 5),
                f = d.slice(5, 9);
            return d.length <= 5 ? `(${c}) ${e}` : `(${c}) ${e}-${f}`;
        }
        function $(a) {
            return 'string' != typeof a ? null : a.trim() || null;
        }
        let _ = {
            canAccessDashboard: 'Dashboard',
            canAccessReports: 'Relatórios',
            canAccessCheckout: 'Checkout',
            canAccessAppointments: 'Agendamentos',
            canAccessProfessionals: 'Profissionais',
            canAccessServices: 'Serviços',
            canAccessReviews: 'Avaliações',
            canAccessProducts: 'Produtos',
            canAccessClients: 'Clientes',
            canAccessClientLevels: 'Níveis do Cliente',
            canAccessFinance: 'Financeiro',
            canAccessSettings: 'Configurações',
        };
        function aa(a) {
            return {
                canAccessDashboard: !!a.canAccessDashboard,
                canAccessReports: !!a.canAccessReports,
                canAccessCheckout: !!a.canAccessCheckout,
                canAccessAppointments: !!a.canAccessAppointments,
                canAccessProfessionals: !!a.canAccessProfessionals,
                canAccessServices: !!a.canAccessServices,
                canAccessReviews: !!a.canAccessReviews,
                canAccessProducts: !!a.canAccessProducts,
                canAccessPartners: !!a.canAccessPartners,
                canAccessClients: !!a.canAccessClients,
                canAccessClientLevels: !!a.canAccessClientLevels,
                canAccessFinance: !!a.canAccessFinance,
                canAccessSettings: !!a.canAccessSettings,
            };
        }
        function ab(a) {
            let { label: c, value: d, disabled: e, onToggle: f } = a,
                g = d
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : 'border-destructive/40 bg-destructive/10',
                h = e ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer';
            return (0, b.jsxs)('button', {
                type: 'button',
                onClick: e ? void 0 : f,
                disabled: e,
                className: `flex items-center justify-between gap-3 rounded-xl border px-3 py-2 transition select-none ${g} ${h}`,
                'aria-pressed': d,
                children: [
                    (0, b.jsx)('span', {
                        className: 'text-[11px] text-content-secondary',
                        children: c,
                    }),
                    (0, b.jsx)('span', {
                        className: `text-[11px] font-medium ${d ? 'text-emerald-500' : 'text-content-secondary'}`,
                        children: d ? 'Liberado' : 'Bloqueado',
                    }),
                ],
            });
        }
        function ac(a) {
            let {
                icon: c,
                iconClassName: d,
                inputClassName: e,
                wrapperClassName: f,
                disabledIcon: h,
                className: i,
                ...j
            } = a;
            return (0, b.jsxs)('div', {
                className: `relative ${f ?? ''}`,
                children: [
                    (0, b.jsx)('div', {
                        className:
                            'absolute left-3 top-1/2 -translate-y-1/2 -mt-px pointer-events-none',
                        children: (0, b.jsx)(c, {
                            width: 20,
                            height: 20,
                            className: `${h ? 'text-content-secondary/50' : 'text-content-brand'} ${d ?? ''}`,
                        }),
                    }),
                    (0, b.jsx)(g.Input, {
                        ...j,
                        className: `pl-10 ${e ?? ''} ${i ?? ''}`,
                    }),
                ],
            });
        }
        function ad() {
            let [a, k] = c.useState({
                    id: '',
                    name: '',
                    segment: 'BARBERSHOP',
                    isActive: !0,
                }),
                [t, u] = c.useState(!0),
                [v, w] = c.useState(!1),
                [x, y] = c.useState(null);
            c.useEffect(() => {
                let a = !0,
                    b = new AbortController();
                return (
                    (async function () {
                        (u(!0), y(null));
                        try {
                            let c = await fetch('/api/admin/settings/company', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    signal: b.signal,
                                }),
                                d = null;
                            try {
                                d = await c.json();
                            } catch {
                                d = null;
                            }
                            if (!a) return;
                            if (!c.ok || !d || !d.ok) {
                                let a = d ? T(d) : 'internal_error';
                                y(Q(a));
                                return;
                            }
                            k({
                                id: d.data.id,
                                name: d.data.name,
                                segment: d.data.segment,
                                isActive: d.data.isActive,
                            });
                        } catch (b) {
                            if (!a || b?.name === 'AbortError') return;
                            y(
                                'Não foi possível carregar a empresa. Verifique sua conexão.'
                            );
                        } finally {
                            if (!a) return;
                            u(!1);
                        }
                    })(),
                    () => {
                        ((a = !1), b.abort());
                    }
                );
            }, []);
            let [z, A] = c.useState([]),
                [B, C] = c.useState(!0),
                [D, E] = c.useState(!1),
                [F, G] = c.useState({}),
                [H, I] = c.useState({}),
                [J, K] = c.useState({});
            c.useEffect(() => {
                let a = !0,
                    b = new AbortController();
                return (
                    (async function () {
                        C(!0);
                        try {
                            let c = await fetch('/api/admin/settings/units', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    signal: b.signal,
                                }),
                                d = null;
                            try {
                                d = await c.json();
                            } catch {
                                d = null;
                            }
                            if (!a) return;
                            if (!c.ok || !d || !d.ok) {
                                let a = d ? T(d) : 'internal_error',
                                    b = R(a);
                                (s.toast.error(b), A([]), G({}));
                                return;
                            }
                            let e = d.data.reduce(
                                (a, b) => ((a[b.id] = b), a),
                                {}
                            );
                            G(e);
                            let f = d.data.map(V);
                            (A(f),
                                I((a) => {
                                    let b = { ...a };
                                    for (let a of f) b[a.id] || (b[a.id] = U());
                                    return b;
                                }));
                        } catch (b) {
                            if (!a || b?.name === 'AbortError') return;
                            (s.toast.error(
                                'Não foi possível carregar as unidades. Verifique sua conexão.'
                            ),
                                A([]),
                                G({}));
                        } finally {
                            if (!a) return;
                            C(!1);
                        }
                    })(),
                    () => {
                        ((a = !1), b.abort());
                    }
                );
            }, []);
            let [L, M] = c.useState([]),
                [ad, ae] = c.useState(!0),
                [af, ag] = c.useState({}),
                [ah, ai] = c.useState({}),
                [aj, ak] = c.useState({}),
                al = c.useCallback(async () => {
                    ae(!0);
                    try {
                        let a = await fetch('/api/admin/settings/admins', {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' },
                            }),
                            b = null;
                        try {
                            b = await a.json();
                        } catch {
                            b = null;
                        }
                        if (!a.ok || !b || !b.ok) {
                            let a = b ? T(b) : 'internal_error';
                            (s.toast.error(S(a)), M([]));
                            return;
                        }
                        let c = (b.data || []).map(W);
                        (c.sort((a, b) =>
                            a.isOwner !== b.isOwner
                                ? a.isOwner
                                    ? -1
                                    : 1
                                : b.createdAt.getTime() - a.createdAt.getTime()
                        ),
                            M(c),
                            ag((a) => {
                                let b = { ...a };
                                for (let a of c)
                                    a.isOwner || (b[a.id] = aa(a.permissions));
                                return b;
                            }),
                            ai((a) => {
                                let b = { ...a };
                                for (let a of c) a.isOwner || (b[a.id] = !1);
                                return b;
                            }));
                    } catch {
                        (s.toast.error(
                            'Não foi possível carregar os administradores. Verifique sua conexão.'
                        ),
                            M([]));
                    } finally {
                        ae(!1);
                    }
                }, []);
            async function am(a) {
                let b = L.find((b) => b.id === a) ?? null;
                if (!b || b.isOwner) return;
                let c = af[a];
                if (c && ah[a]) {
                    ak((b) => ({ ...b, [a]: !0 }));
                    try {
                        let b = await fetch(`/api/admin/settings/admins/${a}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ permissions: c }),
                            }),
                            d = null;
                        try {
                            d = await b.json();
                        } catch {
                            d = null;
                        }
                        if (!b.ok || !d || !d.ok) {
                            let a = d ? T(d) : 'internal_error';
                            s.toast.error(S(a));
                            return;
                        }
                        (s.toast.success('Permissões salvas.'),
                            M((b) =>
                                b.map((b) =>
                                    b.id === a
                                        ? { ...b, permissions: aa(c) }
                                        : b
                                )
                            ),
                            ai((b) => ({ ...b, [a]: !1 })));
                    } catch {
                        s.toast.error(
                            'Não foi possível salvar as permissões. Verifique sua conexão.'
                        );
                    } finally {
                        ak((b) => ({ ...b, [a]: !1 }));
                    }
                }
            }
            c.useEffect(() => {
                let a = !0,
                    b = new AbortController();
                return (
                    (async () => {
                        try {
                            ae(!0);
                            let c = await fetch('/api/admin/settings/admins', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    signal: b.signal,
                                }),
                                d = null;
                            try {
                                d = await c.json();
                            } catch {
                                d = null;
                            }
                            if (!a) return;
                            if (!c.ok || !d || !d.ok) {
                                let a = d ? T(d) : 'internal_error';
                                (s.toast.error(S(a)), M([]));
                                return;
                            }
                            let e = (d.data || []).map(W);
                            (e.sort((a, b) =>
                                a.isOwner !== b.isOwner
                                    ? a.isOwner
                                        ? -1
                                        : 1
                                    : b.createdAt.getTime() -
                                      a.createdAt.getTime()
                            ),
                                M(e),
                                ag((a) => {
                                    let b = { ...a };
                                    for (let a of e)
                                        a.isOwner ||
                                            (b[a.id] = aa(a.permissions));
                                    return b;
                                }),
                                ai((a) => {
                                    let b = { ...a };
                                    for (let a of e)
                                        a.isOwner || (b[a.id] = !1);
                                    return b;
                                }));
                        } catch (b) {
                            if (!a || b?.name === 'AbortError') return;
                            (s.toast.error(
                                'Não foi possível carregar os administradores. Verifique sua conexão.'
                            ),
                                M([]));
                        } finally {
                            if (!a) return;
                            ae(!1);
                        }
                    })(),
                    () => {
                        ((a = !1), b.abort());
                    }
                );
            }, []);
            let [an, ao] = c.useState({
                    name: '',
                    phone: '',
                    cep: '',
                    number: '',
                    complement: '',
                    street: '',
                    neighborhood: '',
                    city: '',
                    state: '',
                }),
                [ap, aq] = c.useState('idle'),
                [ar, as] = c.useState(null),
                at = c.useRef(''),
                au = c.useRef(null);
            c.useEffect(() => {
                let a = X(an.cep).slice(0, 8);
                if (a.length < 8) {
                    (au.current && au.current.abort(),
                        aq('idle'),
                        as(null),
                        (at.current = ''),
                        ao((a) => ({
                            ...a,
                            street: '',
                            neighborhood: '',
                            city: '',
                            state: '',
                        })));
                    return;
                }
                at.current !== a &&
                    (async () => {
                        try {
                            (aq('loading'),
                                as(null),
                                au.current && au.current.abort());
                            let b = new AbortController();
                            au.current = b;
                            let c = await fetch(
                                    `https://viacep.com.br/ws/${a}/json/`,
                                    {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        signal: b.signal,
                                    }
                                ),
                                d = await c.json();
                            if (!c.ok) throw Error('FETCH_FAILED');
                            if ('erro' in d && d.erro) {
                                ((at.current = ''),
                                    aq('error'),
                                    as('CEP não encontrado.'),
                                    ao((a) => ({
                                        ...a,
                                        street: '',
                                        neighborhood: '',
                                        city: '',
                                        state: '',
                                    })),
                                    s.toast.error(
                                        'CEP inválido ou não encontrado.'
                                    ));
                                return;
                            }
                            ((at.current = a),
                                aq('success'),
                                as(null),
                                ao((a) => ({
                                    ...a,
                                    street: d.logradouro || '',
                                    neighborhood: d.bairro || '',
                                    city: d.localidade || '',
                                    state: d.uf || '',
                                })));
                        } catch (a) {
                            if (a?.name === 'AbortError') return;
                            ((at.current = ''),
                                aq('error'),
                                as(
                                    'Não foi possível buscar o CEP. Tente novamente.'
                                ),
                                s.toast.error(
                                    'Não foi possível buscar o endereço pelo CEP.'
                                ));
                        }
                    })();
            }, [an.cep]);
            let [av, aw] = c.useState(!1),
                [ax, ay] = c.useState(null),
                [az, aA] = c.useState(!1),
                [aB, aC] = c.useState({
                    name: '',
                    phone: '',
                    cep: '',
                    number: '',
                    complement: '',
                    street: '',
                    neighborhood: '',
                    city: '',
                    state: '',
                    isActive: !0,
                }),
                [aD, aE] = c.useState('idle'),
                [aF, aG] = c.useState(null),
                aH = c.useRef(''),
                aI = c.useRef(null);
            async function aJ(a) {
                if (F[a]) return F[a];
                try {
                    let b = await fetch(`/api/admin/settings/units/${a}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        }),
                        c = null;
                    try {
                        c = await b.json();
                    } catch {
                        c = null;
                    }
                    if (!b.ok || !c || !c.ok) {
                        let a = c ? T(c) : 'internal_error';
                        return (s.toast.error(R(a)), null);
                    }
                    return (G((b) => ({ ...b, [a]: c.data })), c.data);
                } catch {
                    return (
                        s.toast.error(
                            'Não foi possível carregar a unidade. Verifique a conexão.'
                        ),
                        null
                    );
                }
            }
            async function aK(a) {
                let b = await aJ(a);
                if (!b)
                    return void s.toast.error(
                        'Não foi possível carregar os dados dessa unidade para edição.'
                    );
                let c = X(b.cep || '').slice(0, 8);
                ((aH.current = c || ''),
                    aE(8 === c.length ? 'success' : 'idle'),
                    aG(null),
                    ay(a),
                    aC({
                        name: b.name || '',
                        phone: Z(b.phone || ''),
                        cep: c,
                        number: b.number || '',
                        complement: b.complement || '',
                        street: b.street || '',
                        neighborhood: b.neighborhood || '',
                        city: b.city || '',
                        state: b.state || '',
                        isActive: !!b.isActive,
                    }),
                    aw(!0));
            }
            function aL() {
                (aw(!1),
                    ay(null),
                    aA(!1),
                    aI.current && aI.current.abort(),
                    aE('idle'),
                    aG(null),
                    (aH.current = ''));
            }
            async function aM(a) {
                if ((a.preventDefault(), !ax)) return;
                let b = aB.name.trim();
                if (!b) return void s.toast.error('Informe o nome da unidade.');
                let c = X(aB.phone);
                if (aB.phone.trim() && c.length < 10)
                    return void s.toast.error('Informe um telefone válido.');
                let d = X(aB.cep).slice(0, 8);
                if (aB.cep.trim() && 8 !== d.length)
                    return void s.toast.error('Informe um CEP válido.');
                aA(!0);
                try {
                    let a = await fetch(`/api/admin/settings/units/${ax}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: b,
                                phone: aB.phone.trim() || null,
                                cep: d || null,
                                street: aB.street.trim() || null,
                                number: aB.number.trim() || null,
                                complement: aB.complement.trim() || null,
                                neighborhood: aB.neighborhood.trim() || null,
                                city: aB.city.trim() || null,
                                state: aB.state.trim() || null,
                                isActive: !!aB.isActive,
                            }),
                        }),
                        c = null;
                    try {
                        c = await a.json();
                    } catch {
                        c = null;
                    }
                    if (!a.ok || !c || !c.ok) {
                        let a = c ? T(c) : 'internal_error';
                        s.toast.error(R(a));
                        return;
                    }
                    let e = c.data;
                    (G((a) => ({ ...a, [e.id]: e })),
                        A((a) => a.map((a) => (a.id === e.id ? V(e) : a))),
                        s.toast.success('Unidade atualizada.'),
                        aL());
                } catch {
                    s.toast.error(
                        'Não foi possível salvar a unidade. Verifique sua conexão.'
                    );
                } finally {
                    aA(!1);
                }
            }
            c.useEffect(() => {
                if (!av) return;
                let a = X(aB.cep).slice(0, 8);
                if (a.length < 8) {
                    (aI.current && aI.current.abort(),
                        aE('idle'),
                        aG(null),
                        (aH.current = ''),
                        aC((a) => ({
                            ...a,
                            street: '',
                            neighborhood: '',
                            city: '',
                            state: '',
                        })));
                    return;
                }
                aH.current !== a &&
                    (async () => {
                        try {
                            (aE('loading'),
                                aG(null),
                                aI.current && aI.current.abort());
                            let b = new AbortController();
                            aI.current = b;
                            let c = await fetch(
                                    `https://viacep.com.br/ws/${a}/json/`,
                                    {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        signal: b.signal,
                                    }
                                ),
                                d = await c.json();
                            if (!c.ok) throw Error('FETCH_FAILED');
                            if ('erro' in d && d.erro) {
                                ((aH.current = ''),
                                    aE('error'),
                                    aG('CEP não encontrado.'),
                                    aC((a) => ({
                                        ...a,
                                        street: '',
                                        neighborhood: '',
                                        city: '',
                                        state: '',
                                    })),
                                    s.toast.error(
                                        'CEP inválido ou não encontrado.'
                                    ));
                                return;
                            }
                            ((aH.current = a),
                                aE('success'),
                                aG(null),
                                aC((a) => ({
                                    ...a,
                                    street: d.logradouro || '',
                                    neighborhood: d.bairro || '',
                                    city: d.localidade || '',
                                    state: d.uf || '',
                                })));
                        } catch (a) {
                            if (a?.name === 'AbortError') return;
                            ((aH.current = ''),
                                aE('error'),
                                aG(
                                    'Não foi possível buscar o CEP. Tente novamente.'
                                ),
                                s.toast.error(
                                    'Não foi possível buscar o endereço pelo CEP.'
                                ));
                        }
                    })();
            }, [aB.cep, av]);
            let [aN, aO] = c.useState({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                }),
                [aP, aQ] = c.useState({
                    canAccessDashboard: !0,
                    canAccessReports: !1,
                    canAccessCheckout: !1,
                    canAccessAppointments: !0,
                    canAccessProfessionals: !1,
                    canAccessServices: !1,
                    canAccessReviews: !1,
                    canAccessProducts: !1,
                    canAccessPartners: !1,
                    canAccessClients: !0,
                    canAccessClientLevels: !1,
                    canAccessFinance: !1,
                    canAccessSettings: !1,
                }),
                [aR, aS] = c.useState(!1);
            async function aT(b) {
                (b.preventDefault(), y(null));
                let c = a.name.trim();
                if (!c) return void y('Informe o nome da empresa.');
                w(!0);
                try {
                    let b = await fetch('/api/admin/settings/company', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: c,
                                segment: a.segment,
                                isActive: a.isActive,
                            }),
                        }),
                        d = null;
                    try {
                        d = await b.json();
                    } catch {
                        d = null;
                    }
                    if (!b.ok || !d || !d.ok) {
                        let a = d ? T(d) : 'internal_error',
                            b = Q(a);
                        (y(b), s.toast.error(b));
                        return;
                    }
                    (k({
                        id: d.data.id,
                        name: d.data.name,
                        segment: d.data.segment,
                        isActive: d.data.isActive,
                    }),
                        s.toast.success('Empresa salva.'));
                } catch {
                    let a = 'Não foi possível salvar. Verifique sua conexão.';
                    (y(a), s.toast.error(a));
                } finally {
                    w(!1);
                }
            }
            async function aU(a) {
                a.preventDefault();
                let b = an.name.trim();
                if (!b) return void s.toast.error('Informe o nome da unidade.');
                let c = X(an.phone);
                if (an.phone.trim() && c.length < 10)
                    return void s.toast.error('Informe um telefone válido.');
                let d = X(an.cep).slice(0, 8);
                if (an.cep.trim() && 8 !== d.length)
                    return void s.toast.error('Informe um CEP válido.');
                E(!0);
                try {
                    var e;
                    let a,
                        c,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m,
                        n = await fetch('/api/admin/settings/units', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: b,
                                phone: an.phone.trim() || null,
                                cep: d || null,
                                street: an.street.trim() || null,
                                number: an.number.trim() || null,
                                complement: an.complement.trim() || null,
                                neighborhood: an.neighborhood.trim() || null,
                                city: an.city.trim() || null,
                                state: an.state.trim() || null,
                                address:
                                    ((e = {
                                        street: an.street,
                                        number: an.number,
                                        complement: an.complement,
                                        neighborhood: an.neighborhood,
                                        city: an.city,
                                        state: an.state,
                                        cep: Y(d),
                                    }),
                                    (a = []),
                                    (c = $(e.street)),
                                    (f = $(e.number)),
                                    (g = $(e.neighborhood)),
                                    (h = $(e.city)),
                                    (i = $(e.state)),
                                    (j = $(e.cep)),
                                    (k = $(e.complement)),
                                    (l = [c, f ? `, ${f}` : '']
                                        .join('')
                                        .trim()) && a.push(l),
                                    k && a.push(k),
                                    g && a.push(g),
                                    (m = [h, i].filter(Boolean).join(' - ')) &&
                                        a.push(m),
                                    j && a.push(`CEP ${j}`),
                                    a.join(' • ') || '—'),
                            }),
                        }),
                        o = null;
                    try {
                        o = await n.json();
                    } catch {
                        o = null;
                    }
                    if (!n.ok || !o || !o.ok) {
                        let a = o ? T(o) : 'internal_error',
                            b = R(a);
                        s.toast.error(b);
                        return;
                    }
                    G((a) => ({ ...a, [o.data.id]: o.data }));
                    let p = V(o.data);
                    (A((a) => [p, ...a]),
                        I((a) => ({ ...a, [p.id]: a[p.id] || U() })),
                        ao({
                            name: '',
                            phone: '',
                            cep: '',
                            number: '',
                            complement: '',
                            street: '',
                            neighborhood: '',
                            city: '',
                            state: '',
                        }),
                        aq('idle'),
                        as(null),
                        (at.current = ''),
                        s.toast.success('Unidade criada.'));
                } catch {
                    s.toast.error(
                        'Não foi possível criar a unidade. Verifique sua conexão.'
                    );
                } finally {
                    E(!1);
                }
            }
            async function aV(a) {
                a.preventDefault();
                let b = aN.name.trim(),
                    c = aN.email.trim(),
                    d = aN.phone.trim(),
                    e = aN.password;
                if (!b)
                    return void s.toast.error(
                        'Informe o nome do administrador.'
                    );
                if (!c)
                    return void s.toast.error(
                        'Informe o e-mail do administrador.'
                    );
                if (!e || e.length < 6)
                    return void s.toast.error(
                        'A senha deve ter pelo menos 6 caracteres.'
                    );
                aS(!0);
                try {
                    let a = await fetch('/api/admin/settings/admins', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: b,
                                email: c,
                                phone: d || null,
                                password: e,
                                permissions: aP,
                            }),
                        }),
                        f = null;
                    try {
                        f = await a.json();
                    } catch {
                        f = null;
                    }
                    if (!a.ok || !f || !f.ok) {
                        let a = f ? T(f) : 'internal_error';
                        s.toast.error(S(a));
                        return;
                    }
                    (s.toast.success('Administrador criado.'),
                        aO({ name: '', email: '', phone: '', password: '' }),
                        aQ({
                            canAccessDashboard: !0,
                            canAccessReports: !1,
                            canAccessCheckout: !1,
                            canAccessAppointments: !0,
                            canAccessProfessionals: !1,
                            canAccessServices: !1,
                            canAccessReviews: !1,
                            canAccessProducts: !1,
                            canAccessPartners: !1,
                            canAccessClients: !0,
                            canAccessClientLevels: !1,
                            canAccessFinance: !1,
                            canAccessSettings: !1,
                        }),
                        await al());
                } catch {
                    s.toast.error(
                        'Não foi possível criar o administrador. Verifique sua conexão.'
                    );
                } finally {
                    aS(!1);
                }
            }
            async function aW(a, b) {
                b.preventDefault();
                let c = H[a] ?? U();
                for (let a = 0; a < 7; a++) {
                    let b = c[a] ?? {
                        isActive: !1,
                        startTime: '',
                        endTime: '',
                    };
                    if (!b.isActive) continue;
                    let d = String(b.startTime || '').trim(),
                        e = String(b.endTime || '').trim();
                    if (!d || !e)
                        return void s.toast.error(
                            `Informe hor\xe1rio completo em ${O[a] ?? `Dia ${a}`}.`
                        );
                    if (d >= e)
                        return void s.toast.error(
                            `Hor\xe1rio inv\xe1lido em ${O[a] ?? `Dia ${a}`}: "Das" deve ser menor que "At\xe9".`
                        );
                }
                K((b) => ({ ...b, [a]: !0 }));
                try {
                    let b = {
                            weekly: Array.from({ length: 7 }).map((a, b) => {
                                let d = c[b] ?? {
                                    isActive: !1,
                                    startTime: '',
                                    endTime: '',
                                };
                                return {
                                    weekday: b,
                                    isActive: !!d.isActive,
                                    startTime:
                                        String(d.startTime || '').trim() ||
                                        null,
                                    endTime:
                                        String(d.endTime || '').trim() || null,
                                };
                            }),
                        },
                        d = await fetch(
                            `/api/admin/settings/units/${a}/weekly`,
                            {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(b),
                            }
                        ),
                        e = null;
                    try {
                        e = await d.json();
                    } catch {
                        e = null;
                    }
                    if (!d.ok || !e || !e.ok) {
                        let a = e ? T(e) : 'internal_error';
                        s.toast.error(R(a));
                        return;
                    }
                    s.toast.success('Padrão semanal salvo.');
                } catch {
                    s.toast.error('Não foi possível salvar o padrão semanal.');
                } finally {
                    K((b) => ({ ...b, [a]: !1 }));
                }
            }
            async function aX(a, b) {
                let c = L.find((b) => b.id === a) ?? null;
                if (c) {
                    if (c.isOwner)
                        return void s.toast.error(
                            'Não é possível alterar o status do dono.'
                        );
                    M((c) =>
                        c.map((c) => (c.id === a ? { ...c, isActive: b } : c))
                    );
                    try {
                        let d = await fetch(`/api/admin/settings/admins/${a}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ isActive: b }),
                            }),
                            e = null;
                        try {
                            e = await d.json();
                        } catch {
                            e = null;
                        }
                        if (!d.ok || !e || !e.ok) {
                            let b = e ? T(e) : 'internal_error';
                            (s.toast.error(S(b)),
                                M((b) =>
                                    b.map((b) =>
                                        b.id === a
                                            ? { ...b, isActive: c.isActive }
                                            : b
                                    )
                                ));
                            return;
                        }
                        (s.toast.success(
                            b ? 'Admin ativado.' : 'Admin desativado.'
                        ),
                            await al());
                    } catch {
                        (s.toast.error(
                            'Não foi possível alterar o status do admin.'
                        ),
                            M((b) =>
                                b.map((b) =>
                                    b.id === a
                                        ? { ...b, isActive: c.isActive }
                                        : b
                                )
                            ));
                    }
                }
            }
            let aY = Y(an.cep),
                aZ = Y(aB.cep);
            return (0, b.jsxs)('div', {
                className: 'max-w-7xl mx-auto space-y-6',
                children: [
                    (0, b.jsx)(h.Dialog, {
                        open: av,
                        onOpenChange: (a) => (a ? aw(!0) : aL()),
                        children: (0, b.jsxs)(h.DialogContent, {
                            variant: 'appointment',
                            overlayVariant: 'blurred',
                            showCloseButton: !0,
                            className: 'sm:max-w-[720px]',
                            children: [
                                (0, b.jsxs)(h.DialogHeader, {
                                    children: [
                                        (0, b.jsx)(h.DialogTitle, {
                                            size: 'modal',
                                            children: 'Editar unidade',
                                        }),
                                        (0, b.jsx)(h.DialogDescription, {
                                            size: 'modal',
                                            children:
                                                'Atualize as informações da unidade. O endereço é preenchido pelo CEP.',
                                        }),
                                    ],
                                }),
                                (0, b.jsxs)('form', {
                                    onSubmit: aM,
                                    className: 'space-y-4',
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className: 'space-y-2',
                                            children: [
                                                (0, b.jsx)('label', {
                                                    className:
                                                        'text-label-medium-size text-content-primary',
                                                    children: 'Nome da unidade',
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'relative',
                                                    children: [
                                                        (0, b.jsx)(
                                                            i.Building2,
                                                            {
                                                                className:
                                                                    'absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand',
                                                                size: 20,
                                                            }
                                                        ),
                                                        (0, b.jsx)(g.Input, {
                                                            placeholder: 'Nome',
                                                            value: aB.name,
                                                            onChange: (a) =>
                                                                aC((b) => ({
                                                                    ...b,
                                                                    name: a
                                                                        .target
                                                                        .value,
                                                                })),
                                                            className:
                                                                'pl-10 bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className:
                                                'grid gap-4 md:grid-cols-2',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children:
                                                                'Telefone',
                                                        }),
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'relative',
                                                            children: [
                                                                (0, b.jsx)(
                                                                    j.Phone,
                                                                    {
                                                                        className:
                                                                            'absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand',
                                                                        size: 20,
                                                                    }
                                                                ),
                                                                (0, b.jsx)(
                                                                    g.Input,
                                                                    {
                                                                        placeholder:
                                                                            '(00) 00000-0000',
                                                                        inputMode:
                                                                            'tel',
                                                                        value: aB.phone,
                                                                        onChange:
                                                                            (
                                                                                a
                                                                            ) => {
                                                                                let b =
                                                                                    Z(
                                                                                        a
                                                                                            .target
                                                                                            .value
                                                                                    );
                                                                                aC(
                                                                                    (
                                                                                        a
                                                                                    ) => ({
                                                                                        ...a,
                                                                                        phone: b,
                                                                                    })
                                                                                );
                                                                            },
                                                                        className:
                                                                            'pl-10 bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children: 'CEP',
                                                        }),
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'relative',
                                                            children: [
                                                                (0, b.jsx)(l, {
                                                                    className:
                                                                        'absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand',
                                                                    size: 20,
                                                                }),
                                                                (0, b.jsx)(
                                                                    g.Input,
                                                                    {
                                                                        placeholder:
                                                                            '00000-000',
                                                                        inputMode:
                                                                            'numeric',
                                                                        value: aZ,
                                                                        onChange:
                                                                            (
                                                                                a
                                                                            ) => {
                                                                                let b =
                                                                                    X(
                                                                                        a
                                                                                            .target
                                                                                            .value
                                                                                    ).slice(
                                                                                        0,
                                                                                        8
                                                                                    );
                                                                                (b !==
                                                                                    aH.current &&
                                                                                    (aH.current =
                                                                                        ''),
                                                                                    aC(
                                                                                        (
                                                                                            a
                                                                                        ) => ({
                                                                                            ...a,
                                                                                            cep: b,
                                                                                        })
                                                                                    ));
                                                                            },
                                                                        className:
                                                                            'pl-10 bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        'loading' === aD
                                                            ? (0, b.jsxs)('p', {
                                                                  className:
                                                                      'text-[11px] text-content-secondary flex items-center gap-2',
                                                                  children: [
                                                                      (0,
                                                                      b.jsx)(
                                                                          n.Loader2,
                                                                          {
                                                                              className:
                                                                                  'h-3.5 w-3.5 animate-spin',
                                                                          }
                                                                      ),
                                                                      'Buscando endereço…',
                                                                  ],
                                                              })
                                                            : aF
                                                              ? (0, b.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-destructive',
                                                                        children:
                                                                            aF,
                                                                    }
                                                                )
                                                              : null,
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className:
                                                'grid gap-4 md:grid-cols-3',
                                            children: [
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'space-y-2 md:col-span-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children:
                                                                'Endereço',
                                                        }),
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'relative',
                                                            children: [
                                                                (0, b.jsx)(l, {
                                                                    className:
                                                                        'absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand',
                                                                    size: 20,
                                                                }),
                                                                (0, b.jsx)(
                                                                    g.Input,
                                                                    {
                                                                        placeholder:
                                                                            'Endereço',
                                                                        value: aB.street,
                                                                        disabled:
                                                                            !0,
                                                                        className:
                                                                            'pl-10 bg-background-tertiary border-border-primary text-content-primary disabled:opacity-60',
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children: 'Número',
                                                        }),
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'relative',
                                                            children: [
                                                                (0, b.jsx)(m, {
                                                                    className:
                                                                        'absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand',
                                                                    size: 20,
                                                                }),
                                                                (0, b.jsx)(
                                                                    g.Input,
                                                                    {
                                                                        placeholder:
                                                                            'Número',
                                                                        value: aB.number,
                                                                        onChange:
                                                                            (
                                                                                a
                                                                            ) =>
                                                                                aC(
                                                                                    (
                                                                                        b
                                                                                    ) => ({
                                                                                        ...b,
                                                                                        number: a
                                                                                            .target
                                                                                            .value,
                                                                                    })
                                                                                ),
                                                                        className:
                                                                            'pl-10 bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'space-y-2 md:col-span-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children:
                                                                'Complemento',
                                                        }),
                                                        (0, b.jsx)(g.Input, {
                                                            placeholder:
                                                                'Complemento',
                                                            value: aB.complement,
                                                            onChange: (a) =>
                                                                aC((b) => ({
                                                                    ...b,
                                                                    complement:
                                                                        a.target
                                                                            .value,
                                                                })),
                                                            className:
                                                                'bg-background-tertiary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children: 'Bairro',
                                                        }),
                                                        (0, b.jsx)(g.Input, {
                                                            placeholder:
                                                                'Bairro',
                                                            value: aB.neighborhood,
                                                            disabled: !0,
                                                            className:
                                                                'bg-background-tertiary border-border-primary text-content-primary disabled:opacity-60',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className:
                                                        'space-y-2 md:col-span-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children: 'Cidade',
                                                        }),
                                                        (0, b.jsx)(g.Input, {
                                                            placeholder:
                                                                'Cidade',
                                                            value: aB.city,
                                                            disabled: !0,
                                                            className:
                                                                'bg-background-tertiary border-border-primary text-content-primary disabled:opacity-60',
                                                        }),
                                                    ],
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-2',
                                                    children: [
                                                        (0, b.jsx)('label', {
                                                            className:
                                                                'text-label-medium-size text-content-primary',
                                                            children: 'Estado',
                                                        }),
                                                        (0, b.jsx)(g.Input, {
                                                            placeholder:
                                                                'Estado',
                                                            value: aB.state,
                                                            disabled: !0,
                                                            className:
                                                                'bg-background-tertiary border-border-primary text-content-primary disabled:opacity-60',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)(h.DialogFooter, {
                                            className: 'gap-2 sm:gap-3',
                                            children: [
                                                (0, b.jsxs)(e.Button, {
                                                    type: 'submit',
                                                    variant: 'edit2',
                                                    size: 'sm',
                                                    disabled:
                                                        az ||
                                                        !aB.name.trim() ||
                                                        'loading' === aD,
                                                    children: [
                                                        az &&
                                                            (0, b.jsx)(
                                                                n.Loader2,
                                                                {
                                                                    className:
                                                                        'mr-2 h-4 w-4 animate-spin',
                                                                }
                                                            ),
                                                        'Salvar',
                                                    ],
                                                }),
                                                (0, b.jsx)(e.Button, {
                                                    type: 'button',
                                                    variant: 'outline',
                                                    size: 'sm',
                                                    onClick: aL,
                                                    disabled: az,
                                                    children: 'Cancelar',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    (0, b.jsx)('header', {
                        className: 'flex items-center justify-between gap-4',
                        children: (0, b.jsxs)('div', {
                            children: [
                                (0, b.jsx)('h1', {
                                    className:
                                        'text-title text-content-primary',
                                    children: 'Configurações',
                                }),
                                (0, b.jsx)('p', {
                                    className:
                                        'text-paragraph-medium text-content-secondary',
                                    children:
                                        'Gerencie unidades e controle quais administradores têm acesso a cada módulo do painel.',
                                }),
                            ],
                        }),
                    }),
                    (0, b.jsxs)('section', {
                        className: 'space-y-3',
                        children: [
                            (0, b.jsx)('div', {
                                className:
                                    'flex items-center justify-between gap-3',
                                children: (0, b.jsx)('div', {
                                    children: (0, b.jsx)('h2', {
                                        className:
                                            'text-paragraph-medium font-semibold text-content-primary',
                                        children: 'Empresa',
                                    }),
                                }),
                            }),
                            (0, b.jsx)('div', {
                                className: 'grid gap-3',
                                children: (0, b.jsx)('div', {
                                    className:
                                        'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-3',
                                    children: t
                                        ? (0, b.jsxs)('div', {
                                              className: 'space-y-2',
                                              children: [
                                                  (0, b.jsx)('div', {
                                                      className:
                                                          'h-10 w-full rounded-lg bg-background-secondary/60',
                                                  }),
                                                  (0, b.jsx)('div', {
                                                      className:
                                                          'h-9 w-40 rounded-lg bg-background-secondary/60 ml-auto',
                                                  }),
                                                  (0, b.jsx)('p', {
                                                      className:
                                                          'text-[11px] text-content-secondary',
                                                      children:
                                                          'Carregando empresa…',
                                                  }),
                                              ],
                                          })
                                        : (0, b.jsxs)('form', {
                                              onSubmit: aT,
                                              className: 'space-y-3',
                                              children: [
                                                  (0, b.jsx)('div', {
                                                      className: 'space-y-1',
                                                      children: (0, b.jsx)(ac, {
                                                          icon: i.Building2,
                                                          name: 'companyName',
                                                          value: a.name,
                                                          onChange: (a) => {
                                                              (y(null),
                                                                  k((b) => ({
                                                                      ...b,
                                                                      name: a
                                                                          .target
                                                                          .value,
                                                                  })));
                                                          },
                                                          placeholder:
                                                              'Nome da empresa',
                                                          className:
                                                              'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                      }),
                                                  }),
                                                  x &&
                                                      (0, b.jsx)('div', {
                                                          className:
                                                              'rounded-xl border p-3 border-destructive/40 bg-destructive/5',
                                                          children: (0, b.jsx)(
                                                              'p',
                                                              {
                                                                  className:
                                                                      'text-[11px] text-destructive',
                                                                  children: x,
                                                              }
                                                          ),
                                                      }),
                                                  (0, b.jsx)('div', {
                                                      className:
                                                          'flex items-center justify-end gap-3 flex-wrap',
                                                      children: (0, b.jsx)(
                                                          e.Button,
                                                          {
                                                              type: 'submit',
                                                              variant: 'edit2',
                                                              size: 'sm',
                                                              disabled:
                                                                  v ||
                                                                  t ||
                                                                  !a.name.trim(),
                                                              children: v
                                                                  ? 'Salvando…'
                                                                  : 'Salvar empresa',
                                                          }
                                                      ),
                                                  }),
                                              ],
                                          }),
                                }),
                            }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'space-y-3',
                        children: [
                            (0, b.jsx)('div', {
                                className:
                                    'flex items-center justify-between gap-3',
                                children: (0, b.jsx)('div', {
                                    children: (0, b.jsx)('h2', {
                                        className:
                                            'text-paragraph-medium font-semibold text-content-primary',
                                        children: 'Unidades',
                                    }),
                                }),
                            }),
                            (0, b.jsx)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-3',
                                children: (0, b.jsxs)('form', {
                                    onSubmit: aU,
                                    className: 'space-y-3',
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className:
                                                'grid gap-3 md:grid-cols-3',
                                            children: [
                                                (0, b.jsx)(ac, {
                                                    icon: i.Building2,
                                                    placeholder: 'Nome',
                                                    value: an.name,
                                                    onChange: (a) =>
                                                        ao((b) => ({
                                                            ...b,
                                                            name: a.target
                                                                .value,
                                                        })),
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: j.Phone,
                                                    placeholder:
                                                        'Telefone (00) 00000-0000',
                                                    inputMode: 'tel',
                                                    value: an.phone,
                                                    onChange: (a) => {
                                                        let b = Z(
                                                            a.target.value
                                                        );
                                                        ao((a) => ({
                                                            ...a,
                                                            phone: b,
                                                        }));
                                                    },
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                }),
                                                (0, b.jsxs)('div', {
                                                    className: 'space-y-1',
                                                    children: [
                                                        (0, b.jsx)(ac, {
                                                            icon: l,
                                                            placeholder: 'CEP',
                                                            inputMode:
                                                                'numeric',
                                                            value: aY,
                                                            onChange: (a) => {
                                                                let b = X(
                                                                    a.target
                                                                        .value
                                                                ).slice(0, 8);
                                                                (b !==
                                                                    at.current &&
                                                                    (at.current =
                                                                        ''),
                                                                    ao((a) => ({
                                                                        ...a,
                                                                        cep: b,
                                                                    })));
                                                            },
                                                            className:
                                                                'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                        }),
                                                        'loading' === ap
                                                            ? (0, b.jsxs)('p', {
                                                                  className:
                                                                      'text-[11px] text-content-secondary flex items-center gap-2',
                                                                  children: [
                                                                      (0,
                                                                      b.jsx)(
                                                                          n.Loader2,
                                                                          {
                                                                              className:
                                                                                  'h-3.5 w-3.5 animate-spin',
                                                                          }
                                                                      ),
                                                                      'Buscando endereço…',
                                                                  ],
                                                              })
                                                            : ar
                                                              ? (0, b.jsx)(
                                                                    'p',
                                                                    {
                                                                        className:
                                                                            'text-[11px] text-destructive',
                                                                        children:
                                                                            ar,
                                                                    }
                                                                )
                                                              : null,
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, b.jsxs)('div', {
                                            className:
                                                'grid gap-3 md:grid-cols-3',
                                            children: [
                                                (0, b.jsx)(ac, {
                                                    icon: l,
                                                    placeholder: 'Endereço',
                                                    value: an.street,
                                                    disabled: !0,
                                                    disabledIcon: !0,
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary md:col-span-2 disabled:opacity-70',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: m,
                                                    placeholder: 'Número',
                                                    value: an.number,
                                                    onChange: (a) =>
                                                        ao((b) => ({
                                                            ...b,
                                                            number: a.target
                                                                .value,
                                                        })),
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: o,
                                                    placeholder: 'Complemento',
                                                    value: an.complement,
                                                    onChange: (a) =>
                                                        ao((b) => ({
                                                            ...b,
                                                            complement:
                                                                a.target.value,
                                                        })),
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: l,
                                                    placeholder: 'Bairro',
                                                    value: an.neighborhood,
                                                    disabled: !0,
                                                    disabledIcon: !0,
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary md:col-span-2 disabled:opacity-70',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: l,
                                                    placeholder: 'Cidade',
                                                    value: an.city,
                                                    disabled: !0,
                                                    disabledIcon: !0,
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary md:col-span-2 disabled:opacity-70',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: l,
                                                    placeholder: 'Estado',
                                                    value: an.state,
                                                    disabled: !0,
                                                    disabledIcon: !0,
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary disabled:opacity-70',
                                                }),
                                            ],
                                        }),
                                        (0, b.jsx)('div', {
                                            className:
                                                'flex items-center justify-end gap-3 flex-wrap',
                                            children: (0, b.jsx)(e.Button, {
                                                type: 'submit',
                                                variant: 'edit2',
                                                size: 'sm',
                                                disabled:
                                                    D ||
                                                    !an.name.trim() ||
                                                    'loading' === ap,
                                                children: D
                                                    ? 'Criando…'
                                                    : 'Criar unidade',
                                            }),
                                        }),
                                    ],
                                }),
                            }),
                            B
                                ? (0, b.jsxs)('div', {
                                      className:
                                          'rounded-xl border border-border-primary bg-background-tertiary p-5 space-y-2',
                                      children: [
                                          (0, b.jsx)('div', {
                                              className:
                                                  'h-10 w-full rounded-lg bg-background-secondary/60',
                                          }),
                                          (0, b.jsx)('div', {
                                              className:
                                                  'h-10 w-full rounded-lg bg-background-secondary/60',
                                          }),
                                          (0, b.jsx)('p', {
                                              className:
                                                  'text-[11px] text-content-secondary',
                                              children: 'Carregando unidades…',
                                          }),
                                      ],
                                  })
                                : 0 === z.length
                                  ? (0, b.jsxs)('div', {
                                        className:
                                            'rounded-xl border border-border-primary bg-background-tertiary p-5',
                                        children: [
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-paragraph-medium text-content-primary font-semibold',
                                                children:
                                                    'Você ainda não tem nenhuma unidade cadastrada.',
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-paragraph-small text-content-secondary mt-1',
                                                children:
                                                    'Use o formulário acima para criar a primeira.',
                                            }),
                                        ],
                                    })
                                  : (0, b.jsx)(d.Accordion, {
                                        type: 'single',
                                        collapsible: !0,
                                        className: 'space-y-2',
                                        children: z.map((a) => {
                                            let c = Object.values(
                                                    H[a.id] || {}
                                                ).filter(
                                                    (a) =>
                                                        a.isActive &&
                                                        a.startTime &&
                                                        a.endTime
                                                ).length,
                                                g = !!J[a.id];
                                            return (0, b.jsxs)(
                                                d.AccordionItem,
                                                {
                                                    value: a.id,
                                                    className:
                                                        'border border-border-primary rounded-xl bg-background-tertiary',
                                                    children: [
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'flex items-center justify-between gap-4 px-4 py-3',
                                                            children: [
                                                                (0, b.jsxs)(
                                                                    d.AccordionTrigger,
                                                                    {
                                                                        className:
                                                                            'flex flex-1 items-center gap-6 hover:no-underline px-0 py-0',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'flex flex-col text-left min-w-60 flex-1',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'p',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-paragraph-medium font-semibold text-content-primary',
                                                                                                        children:
                                                                                                            a.name,
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'p',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-xs text-content-secondary truncate max-w-155',
                                                                                                        children:
                                                                                                            [
                                                                                                                'Telefone:',
                                                                                                                ' ',
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary',
                                                                                                                        children:
                                                                                                                            a.phone ||
                                                                                                                            '—',
                                                                                                                    }
                                                                                                                ),
                                                                                                                ' ',
                                                                                                                '• Endereço:',
                                                                                                                ' ',
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary',
                                                                                                                        children:
                                                                                                                            a.address ||
                                                                                                                            '—',
                                                                                                                    }
                                                                                                                ),
                                                                                                                ' ',
                                                                                                                '• Status:',
                                                                                                                ' ',
                                                                                                                (0,
                                                                                                                b.jsx)(
                                                                                                                    'span',
                                                                                                                    {
                                                                                                                        className:
                                                                                                                            'text-content-primary',
                                                                                                                        children:
                                                                                                                            a.isActive
                                                                                                                                ? 'Ativa'
                                                                                                                                : 'Inativa',
                                                                                                                    }
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsxs)(
                                                                                                    'p',
                                                                                                    {
                                                                                                        className:
                                                                                                            'mt-1 text-[11px] text-content-secondary',
                                                                                                        children:
                                                                                                            [
                                                                                                                'Criada em',
                                                                                                                ' ',
                                                                                                                P(
                                                                                                                    a.createdAt
                                                                                                                ),
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'hidden md:flex items-center gap-2',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    f.Badge,
                                                                                                    {
                                                                                                        variant:
                                                                                                            'outline',
                                                                                                        children:
                                                                                                            0 ===
                                                                                                            c
                                                                                                                ? 'Sem horário'
                                                                                                                : 1 ===
                                                                                                                    c
                                                                                                                  ? '1 dia com horário'
                                                                                                                  : `${c} dias com hor\xe1rio`,
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    f.Badge,
                                                                                                    {
                                                                                                        variant:
                                                                                                            'outline',
                                                                                                        children:
                                                                                                            a.isActive
                                                                                                                ? 'Unidade ativa'
                                                                                                                : 'Unidade inativa',
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
                                                                            'pt-2',
                                                                        children:
                                                                            (0,
                                                                            b.jsx)(
                                                                                e.Button,
                                                                                {
                                                                                    type: 'button',
                                                                                    variant:
                                                                                        'edit2',
                                                                                    size: 'sm',
                                                                                    onClick:
                                                                                        () =>
                                                                                            aK(
                                                                                                a.id
                                                                                            ),
                                                                                    children:
                                                                                        'Editar unidade',
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        (0, b.jsx)(
                                                            d.AccordionContent,
                                                            {
                                                                className:
                                                                    'border-t border-border-primary px-4 py-4',
                                                                children: (0,
                                                                b.jsx)(N, {
                                                                    unitId: a.id,
                                                                    weekly:
                                                                        H[
                                                                            a.id
                                                                        ] ??
                                                                        U(),
                                                                    setWeeklyByUnitId:
                                                                        I,
                                                                    onSubmitWeekly:
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) => {
                                                                            if (
                                                                                !g
                                                                            )
                                                                                return aW(
                                                                                    a,
                                                                                    b
                                                                                );
                                                                        },
                                                                    onCreateException:
                                                                        () =>
                                                                            alert(
                                                                                'UI only: criar exceção/folga'
                                                                            ),
                                                                }),
                                                            }
                                                        ),
                                                    ],
                                                },
                                                a.id
                                            );
                                        }),
                                    }),
                        ],
                    }),
                    (0, b.jsxs)('section', {
                        className: 'space-y-3',
                        children: [
                            (0, b.jsx)('div', {
                                className:
                                    'flex items-center justify-between gap-3',
                                children: (0, b.jsx)('div', {
                                    children: (0, b.jsx)('h2', {
                                        className:
                                            'text-paragraph-medium font-semibold text-content-primary',
                                        children: 'Administradores',
                                    }),
                                }),
                            }),
                            (0, b.jsx)('div', {
                                className:
                                    'rounded-xl border border-border-primary bg-background-tertiary p-4 space-y-3',
                                children: (0, b.jsxs)('form', {
                                    onSubmit: aV,
                                    className: 'space-y-3',
                                    children: [
                                        (0, b.jsxs)('div', {
                                            className:
                                                'grid gap-3 md:grid-cols-4',
                                            children: [
                                                (0, b.jsx)(ac, {
                                                    icon: p.User,
                                                    placeholder: 'Nome',
                                                    value: aN.name,
                                                    onChange: (a) =>
                                                        aO((b) => ({
                                                            ...b,
                                                            name: a.target
                                                                .value,
                                                        })),
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: q.Mail,
                                                    placeholder: 'E-mail',
                                                    value: aN.email,
                                                    onChange: (a) =>
                                                        aO((b) => ({
                                                            ...b,
                                                            email: a.target
                                                                .value,
                                                        })),
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: j.Phone,
                                                    placeholder:
                                                        'Telefone (00) 00000-0000',
                                                    inputMode: 'tel',
                                                    value: aN.phone,
                                                    onChange: (a) => {
                                                        let b = Z(
                                                            a.target.value
                                                        );
                                                        aO((a) => ({
                                                            ...a,
                                                            phone: b,
                                                        }));
                                                    },
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                }),
                                                (0, b.jsx)(ac, {
                                                    icon: r.KeyRound,
                                                    placeholder: 'Senha',
                                                    type: 'password',
                                                    value: aN.password,
                                                    onChange: (a) =>
                                                        aO((b) => ({
                                                            ...b,
                                                            password:
                                                                a.target.value,
                                                        })),
                                                    className:
                                                        'bg-background-secondary border-border-primary text-content-primary hover:border-border-secondary focus:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                                                }),
                                            ],
                                        }),
                                        (0, b.jsx)('div', {
                                            className:
                                                'flex items-center justify-end',
                                            children: (0, b.jsx)('p', {
                                                className:
                                                    'text-[11px] text-content-secondary',
                                                children:
                                                    'A senha deve ter pelo menos 6 caracteres.',
                                            }),
                                        }),
                                        (0, b.jsx)('div', {
                                            className:
                                                'flex items-center justify-end gap-3 flex-wrap',
                                            children: (0, b.jsx)(e.Button, {
                                                type: 'submit',
                                                variant: 'edit2',
                                                size: 'sm',
                                                disabled:
                                                    aR ||
                                                    !aN.name.trim() ||
                                                    !aN.email.trim() ||
                                                    aN.password.length < 6,
                                                children: aR
                                                    ? 'Criando…'
                                                    : 'Criar administrador',
                                            }),
                                        }),
                                    ],
                                }),
                            }),
                            ad
                                ? (0, b.jsxs)('div', {
                                      className:
                                          'rounded-xl border border-border-primary bg-background-tertiary p-5 space-y-2',
                                      children: [
                                          (0, b.jsx)('div', {
                                              className:
                                                  'h-10 w-full rounded-lg bg-background-secondary/60',
                                          }),
                                          (0, b.jsx)('div', {
                                              className:
                                                  'h-10 w-full rounded-lg bg-background-secondary/60',
                                          }),
                                          (0, b.jsx)('p', {
                                              className:
                                                  'text-[11px] text-content-secondary',
                                              children:
                                                  'Carregando administradores…',
                                          }),
                                      ],
                                  })
                                : 0 === L.length
                                  ? (0, b.jsxs)('div', {
                                        className:
                                            'rounded-xl border border-border-primary bg-background-tertiary p-5',
                                        children: [
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-paragraph-medium text-content-primary font-semibold',
                                                children:
                                                    'Nenhum administrador cadastrado ainda.',
                                            }),
                                            (0, b.jsx)('p', {
                                                className:
                                                    'text-paragraph-small text-content-secondary mt-1',
                                                children:
                                                    'Crie um admin para delegar acessos do painel.',
                                            }),
                                        ],
                                    })
                                  : (0, b.jsx)(d.Accordion, {
                                        type: 'single',
                                        collapsible: !0,
                                        className: 'space-y-2',
                                        children: L.map((a) => {
                                            let c =
                                                    af[a.id] ??
                                                    aa(a.permissions),
                                                f = !!ah[a.id],
                                                g = !!aj[a.id];
                                            return (0, b.jsxs)(
                                                d.AccordionItem,
                                                {
                                                    value: a.id,
                                                    className:
                                                        'border border-border-primary rounded-xl bg-background-tertiary',
                                                    children: [
                                                        (0, b.jsxs)('div', {
                                                            className:
                                                                'flex items-center justify-between gap-4 px-4 py-3',
                                                            children: [
                                                                (0, b.jsxs)(
                                                                    d.AccordionTrigger,
                                                                    {
                                                                        className:
                                                                            'flex flex-1 items-center gap-6 hover:no-underline px-0 py-0',
                                                                        children:
                                                                            [
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'flex flex-col text-left min-w-60 flex-1',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'p',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-paragraph-medium font-semibold text-content-primary',
                                                                                                        children:
                                                                                                            a.name,
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'p',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-xs text-content-secondary truncate max-w-65',
                                                                                                        children:
                                                                                                            a.email ||
                                                                                                            'Sem e-mail',
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'hidden md:flex flex-col text-left w-35',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'span',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-[11px] text-content-secondary',
                                                                                                        children:
                                                                                                            'Telefone',
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'span',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-xs text-content-primary',
                                                                                                        children:
                                                                                                            a.phone,
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                                (0,
                                                                                b.jsxs)(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'hidden sm:flex flex-col text-left w-45',
                                                                                        children:
                                                                                            [
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'span',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-[11px] text-content-secondary',
                                                                                                        children:
                                                                                                            'Tipo',
                                                                                                    }
                                                                                                ),
                                                                                                (0,
                                                                                                b.jsx)(
                                                                                                    'span',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-xs text-content-primary',
                                                                                                        children:
                                                                                                            a.isOwner
                                                                                                                ? 'Dono (acesso total)'
                                                                                                                : 'Admin configurável',
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                                !a.isOwner &&
                                                                    (0, b.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex items-center gap-2',
                                                                            children:
                                                                                [
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        e.Button,
                                                                                        {
                                                                                            type: 'button',
                                                                                            variant:
                                                                                                'edit2',
                                                                                            size: 'sm',
                                                                                            disabled:
                                                                                                !f ||
                                                                                                g,
                                                                                            onClick:
                                                                                                () =>
                                                                                                    am(
                                                                                                        a.id
                                                                                                    ),
                                                                                            children:
                                                                                                g
                                                                                                    ? 'Salvando…'
                                                                                                    : 'Salvar permissões',
                                                                                        }
                                                                                    ),
                                                                                    (0,
                                                                                    b.jsx)(
                                                                                        e.Button,
                                                                                        {
                                                                                            type: 'button',
                                                                                            variant:
                                                                                                a.isActive
                                                                                                    ? 'destructive'
                                                                                                    : 'active',
                                                                                            size: 'sm',
                                                                                            onClick:
                                                                                                () =>
                                                                                                    aX(
                                                                                                        a.id,
                                                                                                        !a.isActive
                                                                                                    ),
                                                                                            children:
                                                                                                a.isActive
                                                                                                    ? 'Desativar'
                                                                                                    : 'Ativar',
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                            ],
                                                        }),
                                                        (0, b.jsx)(
                                                            d.AccordionContent,
                                                            {
                                                                className:
                                                                    'border-t border-border-primary px-4 py-4',
                                                                children: (0,
                                                                b.jsxs)('div', {
                                                                    className:
                                                                        'grid gap-4 md:grid-cols-2',
                                                                    children: [
                                                                        (0,
                                                                        b.jsxs)(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'rounded-xl border border-border-primary bg-background-secondary p-4 space-y-2',
                                                                                children:
                                                                                    [
                                                                                        (0,
                                                                                        b.jsx)(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'text-label-small text-content-primary',
                                                                                                children:
                                                                                                    'Dados do admin',
                                                                                            }
                                                                                        ),
                                                                                        (0,
                                                                                        b.jsxs)(
                                                                                            'div',
                                                                                            {
                                                                                                className:
                                                                                                    'space-y-1 text-paragraph-small',
                                                                                                children:
                                                                                                    [
                                                                                                        (0,
                                                                                                        b.jsxs)(
                                                                                                            'p',
                                                                                                            {
                                                                                                                children:
                                                                                                                    [
                                                                                                                        (0,
                                                                                                                        b.jsxs)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-secondary',
                                                                                                                                children:
                                                                                                                                    [
                                                                                                                                        'Nome:',
                                                                                                                                        ' ',
                                                                                                                                    ],
                                                                                                                            }
                                                                                                                        ),
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-primary font-medium',
                                                                                                                                children:
                                                                                                                                    a.name,
                                                                                                                            }
                                                                                                                        ),
                                                                                                                    ],
                                                                                                            }
                                                                                                        ),
                                                                                                        (0,
                                                                                                        b.jsxs)(
                                                                                                            'p',
                                                                                                            {
                                                                                                                children:
                                                                                                                    [
                                                                                                                        (0,
                                                                                                                        b.jsxs)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-secondary',
                                                                                                                                children:
                                                                                                                                    [
                                                                                                                                        'E-mail:',
                                                                                                                                        ' ',
                                                                                                                                    ],
                                                                                                                            }
                                                                                                                        ),
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-primary',
                                                                                                                                children:
                                                                                                                                    a.email ||
                                                                                                                                    '—',
                                                                                                                            }
                                                                                                                        ),
                                                                                                                    ],
                                                                                                            }
                                                                                                        ),
                                                                                                        (0,
                                                                                                        b.jsxs)(
                                                                                                            'p',
                                                                                                            {
                                                                                                                children:
                                                                                                                    [
                                                                                                                        (0,
                                                                                                                        b.jsxs)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-secondary',
                                                                                                                                children:
                                                                                                                                    [
                                                                                                                                        'Telefone:',
                                                                                                                                        ' ',
                                                                                                                                    ],
                                                                                                                            }
                                                                                                                        ),
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-primary',
                                                                                                                                children:
                                                                                                                                    a.phone,
                                                                                                                            }
                                                                                                                        ),
                                                                                                                    ],
                                                                                                            }
                                                                                                        ),
                                                                                                        (0,
                                                                                                        b.jsxs)(
                                                                                                            'p',
                                                                                                            {
                                                                                                                children:
                                                                                                                    [
                                                                                                                        (0,
                                                                                                                        b.jsxs)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-secondary',
                                                                                                                                children:
                                                                                                                                    [
                                                                                                                                        'Cadastrado em:',
                                                                                                                                        ' ',
                                                                                                                                    ],
                                                                                                                            }
                                                                                                                        ),
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-primary',
                                                                                                                                children:
                                                                                                                                    P(
                                                                                                                                        a.createdAt
                                                                                                                                    ),
                                                                                                                            }
                                                                                                                        ),
                                                                                                                    ],
                                                                                                            }
                                                                                                        ),
                                                                                                        (0,
                                                                                                        b.jsxs)(
                                                                                                            'p',
                                                                                                            {
                                                                                                                children:
                                                                                                                    [
                                                                                                                        (0,
                                                                                                                        b.jsxs)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-secondary',
                                                                                                                                children:
                                                                                                                                    [
                                                                                                                                        'Status:',
                                                                                                                                        ' ',
                                                                                                                                    ],
                                                                                                                            }
                                                                                                                        ),
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            'span',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-primary font-medium',
                                                                                                                                children:
                                                                                                                                    a.isActive
                                                                                                                                        ? 'Ativo'
                                                                                                                                        : 'Inativo',
                                                                                                                            }
                                                                                                                        ),
                                                                                                                    ],
                                                                                                            }
                                                                                                        ),
                                                                                                    ],
                                                                                            }
                                                                                        ),
                                                                                        !a.isOwner &&
                                                                                            f &&
                                                                                            (0,
                                                                                            b.jsx)(
                                                                                                'div',
                                                                                                {
                                                                                                    className:
                                                                                                        'mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3',
                                                                                                    children:
                                                                                                        (0,
                                                                                                        b.jsxs)(
                                                                                                            'p',
                                                                                                            {
                                                                                                                className:
                                                                                                                    'text-[11px] text-content-secondary',
                                                                                                                children:
                                                                                                                    [
                                                                                                                        'Você tem alterações pendentes. Clique em',
                                                                                                                        ' ',
                                                                                                                        (0,
                                                                                                                        b.jsx)(
                                                                                                                            'strong',
                                                                                                                            {
                                                                                                                                className:
                                                                                                                                    'text-content-primary',
                                                                                                                                children:
                                                                                                                                    '“Salvar permissões”',
                                                                                                                            }
                                                                                                                        ),
                                                                                                                        ' ',
                                                                                                                        'para aplicar.',
                                                                                                                    ],
                                                                                                            }
                                                                                                        ),
                                                                                                }
                                                                                            ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        (0,
                                                                        b.jsxs)(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'rounded-xl border border-border-primary bg-background-secondary p-4 space-y-3',
                                                                                children:
                                                                                    [
                                                                                        (0,
                                                                                        b.jsx)(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'text-label-small text-content-primary',
                                                                                                children:
                                                                                                    'Permissões de acesso',
                                                                                            }
                                                                                        ),
                                                                                        a.isOwner
                                                                                            ? (0,
                                                                                              b.jsxs)(
                                                                                                  'p',
                                                                                                  {
                                                                                                      className:
                                                                                                          'text-paragraph-small text-content-secondary',
                                                                                                      children:
                                                                                                          [
                                                                                                              'Este usuário é o',
                                                                                                              ' ',
                                                                                                              (0,
                                                                                                              b.jsx)(
                                                                                                                  'strong',
                                                                                                                  {
                                                                                                                      children:
                                                                                                                          'dono',
                                                                                                                  }
                                                                                                              ),
                                                                                                              ' do estabelecimento e possui acesso total a todos os módulos.',
                                                                                                          ],
                                                                                                  }
                                                                                              )
                                                                                            : (0,
                                                                                              b.jsxs)(
                                                                                                  b.Fragment,
                                                                                                  {
                                                                                                      children:
                                                                                                          [
                                                                                                              (0,
                                                                                                              b.jsx)(
                                                                                                                  'div',
                                                                                                                  {
                                                                                                                      className:
                                                                                                                          'grid gap-2 sm:grid-cols-2',
                                                                                                                      children:
                                                                                                                          Object.keys(
                                                                                                                              _
                                                                                                                          )
                                                                                                                              .filter(
                                                                                                                                  (
                                                                                                                                      a
                                                                                                                                  ) =>
                                                                                                                                      _[
                                                                                                                                          a
                                                                                                                                      ]
                                                                                                                              )
                                                                                                                              .map(
                                                                                                                                  (
                                                                                                                                      d
                                                                                                                                  ) =>
                                                                                                                                      (0,
                                                                                                                                      b.jsx)(
                                                                                                                                          ab,
                                                                                                                                          {
                                                                                                                                              label: _[
                                                                                                                                                  d
                                                                                                                                              ],
                                                                                                                                              value: !!c[
                                                                                                                                                  d
                                                                                                                                              ],
                                                                                                                                              disabled:
                                                                                                                                                  g,
                                                                                                                                              onToggle:
                                                                                                                                                  () =>
                                                                                                                                                      (function (
                                                                                                                                                          a,
                                                                                                                                                          b
                                                                                                                                                      ) {
                                                                                                                                                          let c =
                                                                                                                                                              L.find(
                                                                                                                                                                  (
                                                                                                                                                                      b
                                                                                                                                                                  ) =>
                                                                                                                                                                      b.id ===
                                                                                                                                                                      a
                                                                                                                                                              ) ??
                                                                                                                                                              null;
                                                                                                                                                          if (
                                                                                                                                                              !c ||
                                                                                                                                                              c.isOwner
                                                                                                                                                          )
                                                                                                                                                              return;
                                                                                                                                                          let d =
                                                                                                                                                                  af[
                                                                                                                                                                      a
                                                                                                                                                                  ]
                                                                                                                                                                      ? aa(
                                                                                                                                                                            af[
                                                                                                                                                                                a
                                                                                                                                                                            ]
                                                                                                                                                                        )
                                                                                                                                                                      : aa(
                                                                                                                                                                            c.permissions
                                                                                                                                                                        ),
                                                                                                                                                              e =
                                                                                                                                                                  {
                                                                                                                                                                      ...d,
                                                                                                                                                                      [b]: !d[
                                                                                                                                                                          b
                                                                                                                                                                      ],
                                                                                                                                                                  };
                                                                                                                                                          ag(
                                                                                                                                                              (
                                                                                                                                                                  b
                                                                                                                                                              ) => ({
                                                                                                                                                                  ...b,
                                                                                                                                                                  [a]: e,
                                                                                                                                                              })
                                                                                                                                                          );
                                                                                                                                                          let f =
                                                                                                                                                              !(function (
                                                                                                                                                                  a,
                                                                                                                                                                  b
                                                                                                                                                              ) {
                                                                                                                                                                  for (let c of Object.keys(
                                                                                                                                                                      _
                                                                                                                                                                  ))
                                                                                                                                                                      if (
                                                                                                                                                                          !!a[
                                                                                                                                                                              c
                                                                                                                                                                          ] !=
                                                                                                                                                                          !!b[
                                                                                                                                                                              c
                                                                                                                                                                          ]
                                                                                                                                                                      )
                                                                                                                                                                          return !1;
                                                                                                                                                                  return !0;
                                                                                                                                                              })(
                                                                                                                                                                  e,
                                                                                                                                                                  c.permissions
                                                                                                                                                              );
                                                                                                                                                          ai(
                                                                                                                                                              (
                                                                                                                                                                  b
                                                                                                                                                              ) => ({
                                                                                                                                                                  ...b,
                                                                                                                                                                  [a]: f,
                                                                                                                                                              })
                                                                                                                                                          );
                                                                                                                                                      })(
                                                                                                                                                          a.id,
                                                                                                                                                          d
                                                                                                                                                      ),
                                                                                                                                          },
                                                                                                                                          d
                                                                                                                                      )
                                                                                                                              ),
                                                                                                                  }
                                                                                                              ),
                                                                                                              (0,
                                                                                                              b.jsx)(
                                                                                                                  'p',
                                                                                                                  {
                                                                                                                      className:
                                                                                                                          'text-[11px] text-content-secondary',
                                                                                                                      children:
                                                                                                                          'Clique nos boxes para liberar/bloquear. Verde = liberado, vermelho = bloqueado.',
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
                                                            }
                                                        ),
                                                    ],
                                                },
                                                a.id
                                            );
                                        }),
                                    }),
                        ],
                    }),
                ],
            });
        }
        a.s(['default', () => ad], 911843);
    },
];

//# sourceMappingURL=src_app_admin_setting_admin-settings-client_tsx_d2fc8cfe._.js.map
