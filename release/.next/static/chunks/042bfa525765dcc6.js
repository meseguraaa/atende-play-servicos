(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    238153,
    716609,
    649859,
    369796,
    91081,
    244874,
    (e) => {
        'use strict';
        let t = {
            lessThanXSeconds: {
                one: 'less than a second',
                other: 'less than {{count}} seconds',
            },
            xSeconds: { one: '1 second', other: '{{count}} seconds' },
            halfAMinute: 'half a minute',
            lessThanXMinutes: {
                one: 'less than a minute',
                other: 'less than {{count}} minutes',
            },
            xMinutes: { one: '1 minute', other: '{{count}} minutes' },
            aboutXHours: {
                one: 'about 1 hour',
                other: 'about {{count}} hours',
            },
            xHours: { one: '1 hour', other: '{{count}} hours' },
            xDays: { one: '1 day', other: '{{count}} days' },
            aboutXWeeks: {
                one: 'about 1 week',
                other: 'about {{count}} weeks',
            },
            xWeeks: { one: '1 week', other: '{{count}} weeks' },
            aboutXMonths: {
                one: 'about 1 month',
                other: 'about {{count}} months',
            },
            xMonths: { one: '1 month', other: '{{count}} months' },
            aboutXYears: {
                one: 'about 1 year',
                other: 'about {{count}} years',
            },
            xYears: { one: '1 year', other: '{{count}} years' },
            overXYears: { one: 'over 1 year', other: 'over {{count}} years' },
            almostXYears: {
                one: 'almost 1 year',
                other: 'almost {{count}} years',
            },
        };
        function n(e) {
            return (t = {}) => {
                let n = t.width ? String(t.width) : e.defaultWidth;
                return e.formats[n] || e.formats[e.defaultWidth];
            };
        }
        e.s(['buildFormatLongFn', () => n], 716609);
        let a = {
                date: n({
                    formats: {
                        full: 'EEEE, MMMM do, y',
                        long: 'MMMM do, y',
                        medium: 'MMM d, y',
                        short: 'MM/dd/yyyy',
                    },
                    defaultWidth: 'full',
                }),
                time: n({
                    formats: {
                        full: 'h:mm:ss a zzzz',
                        long: 'h:mm:ss a z',
                        medium: 'h:mm:ss a',
                        short: 'h:mm a',
                    },
                    defaultWidth: 'full',
                }),
                dateTime: n({
                    formats: {
                        full: "{{date}} 'at' {{time}}",
                        long: "{{date}} 'at' {{time}}",
                        medium: '{{date}}, {{time}}',
                        short: '{{date}}, {{time}}',
                    },
                    defaultWidth: 'full',
                }),
            },
            r = {
                lastWeek: "'last' eeee 'at' p",
                yesterday: "'yesterday at' p",
                today: "'today at' p",
                tomorrow: "'tomorrow at' p",
                nextWeek: "eeee 'at' p",
                other: 'P',
            };
        function o(e) {
            return (t, n) => {
                let a;
                if (
                    'formatting' ===
                        (n?.context ? String(n.context) : 'standalone') &&
                    e.formattingValues
                ) {
                    let t = e.defaultFormattingWidth || e.defaultWidth,
                        r = n?.width ? String(n.width) : t;
                    a = e.formattingValues[r] || e.formattingValues[t];
                } else {
                    let t = e.defaultWidth,
                        r = n?.width ? String(n.width) : e.defaultWidth;
                    a = e.values[r] || e.values[t];
                }
                return a[e.argumentCallback ? e.argumentCallback(t) : t];
            };
        }
        e.s(['buildLocalizeFn', () => o], 649859);
        let i = {
            ordinalNumber: (e, t) => {
                let n = Number(e),
                    a = n % 100;
                if (a > 20 || a < 10)
                    switch (a % 10) {
                        case 1:
                            return n + 'st';
                        case 2:
                            return n + 'nd';
                        case 3:
                            return n + 'rd';
                    }
                return n + 'th';
            },
            era: o({
                values: {
                    narrow: ['B', 'A'],
                    abbreviated: ['BC', 'AD'],
                    wide: ['Before Christ', 'Anno Domini'],
                },
                defaultWidth: 'wide',
            }),
            quarter: o({
                values: {
                    narrow: ['1', '2', '3', '4'],
                    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
                    wide: [
                        '1st quarter',
                        '2nd quarter',
                        '3rd quarter',
                        '4th quarter',
                    ],
                },
                defaultWidth: 'wide',
                argumentCallback: (e) => e - 1,
            }),
            month: o({
                values: {
                    narrow: [
                        'J',
                        'F',
                        'M',
                        'A',
                        'M',
                        'J',
                        'J',
                        'A',
                        'S',
                        'O',
                        'N',
                        'D',
                    ],
                    abbreviated: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ],
                    wide: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ],
                },
                defaultWidth: 'wide',
            }),
            day: o({
                values: {
                    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    abbreviated: [
                        'Sun',
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat',
                    ],
                    wide: [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                    ],
                },
                defaultWidth: 'wide',
            }),
            dayPeriod: o({
                values: {
                    narrow: {
                        am: 'a',
                        pm: 'p',
                        midnight: 'mi',
                        noon: 'n',
                        morning: 'morning',
                        afternoon: 'afternoon',
                        evening: 'evening',
                        night: 'night',
                    },
                    abbreviated: {
                        am: 'AM',
                        pm: 'PM',
                        midnight: 'midnight',
                        noon: 'noon',
                        morning: 'morning',
                        afternoon: 'afternoon',
                        evening: 'evening',
                        night: 'night',
                    },
                    wide: {
                        am: 'a.m.',
                        pm: 'p.m.',
                        midnight: 'midnight',
                        noon: 'noon',
                        morning: 'morning',
                        afternoon: 'afternoon',
                        evening: 'evening',
                        night: 'night',
                    },
                },
                defaultWidth: 'wide',
                formattingValues: {
                    narrow: {
                        am: 'a',
                        pm: 'p',
                        midnight: 'mi',
                        noon: 'n',
                        morning: 'in the morning',
                        afternoon: 'in the afternoon',
                        evening: 'in the evening',
                        night: 'at night',
                    },
                    abbreviated: {
                        am: 'AM',
                        pm: 'PM',
                        midnight: 'midnight',
                        noon: 'noon',
                        morning: 'in the morning',
                        afternoon: 'in the afternoon',
                        evening: 'in the evening',
                        night: 'at night',
                    },
                    wide: {
                        am: 'a.m.',
                        pm: 'p.m.',
                        midnight: 'midnight',
                        noon: 'noon',
                        morning: 'in the morning',
                        afternoon: 'in the afternoon',
                        evening: 'in the evening',
                        night: 'at night',
                    },
                },
                defaultFormattingWidth: 'wide',
            }),
        };
        function s(e) {
            return (t, n = {}) => {
                let a,
                    r = n.width,
                    o =
                        (r && e.matchPatterns[r]) ||
                        e.matchPatterns[e.defaultMatchWidth],
                    i = t.match(o);
                if (!i) return null;
                let s = i[0],
                    u =
                        (r && e.parsePatterns[r]) ||
                        e.parsePatterns[e.defaultParseWidth],
                    d = Array.isArray(u)
                        ? (function (e, t) {
                              for (let n = 0; n < e.length; n++)
                                  if (t(e[n])) return n;
                          })(u, (e) => e.test(s))
                        : (function (e, t) {
                              for (let n in e)
                                  if (
                                      Object.prototype.hasOwnProperty.call(
                                          e,
                                          n
                                      ) &&
                                      t(e[n])
                                  )
                                      return n;
                          })(u, (e) => e.test(s));
                return (
                    (a = e.valueCallback ? e.valueCallback(d) : d),
                    {
                        value: (a = n.valueCallback ? n.valueCallback(a) : a),
                        rest: t.slice(s.length),
                    }
                );
            };
        }
        function u(e) {
            return (t, n = {}) => {
                let a = t.match(e.matchPattern);
                if (!a) return null;
                let r = a[0],
                    o = t.match(e.parsePattern);
                if (!o) return null;
                let i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
                return {
                    value: (i = n.valueCallback ? n.valueCallback(i) : i),
                    rest: t.slice(r.length),
                };
            };
        }
        (e.s(['buildMatchFn', () => s], 369796),
            e.s(['buildMatchPatternFn', () => u], 91081));
        let d = {
            code: 'en-US',
            formatDistance: (e, n, a) => {
                let r,
                    o = t[e];
                if (
                    ((r =
                        'string' == typeof o
                            ? o
                            : 1 === n
                              ? o.one
                              : o.other.replace('{{count}}', n.toString())),
                    a?.addSuffix)
                )
                    if (a.comparison && a.comparison > 0) return 'in ' + r;
                    else return r + ' ago';
                return r;
            },
            formatLong: a,
            formatRelative: (e, t, n, a) => r[e],
            localize: i,
            match: {
                ordinalNumber: u({
                    matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                    parsePattern: /\d+/i,
                    valueCallback: (e) => parseInt(e, 10),
                }),
                era: s({
                    matchPatterns: {
                        narrow: /^(b|a)/i,
                        abbreviated:
                            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
                        wide: /^(before christ|before common era|anno domini|common era)/i,
                    },
                    defaultMatchWidth: 'wide',
                    parsePatterns: { any: [/^b/i, /^(a|c)/i] },
                    defaultParseWidth: 'any',
                }),
                quarter: s({
                    matchPatterns: {
                        narrow: /^[1234]/i,
                        abbreviated: /^q[1234]/i,
                        wide: /^[1234](th|st|nd|rd)? quarter/i,
                    },
                    defaultMatchWidth: 'wide',
                    parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
                    defaultParseWidth: 'any',
                    valueCallback: (e) => e + 1,
                }),
                month: s({
                    matchPatterns: {
                        narrow: /^[jfmasond]/i,
                        abbreviated:
                            /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
                        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
                    },
                    defaultMatchWidth: 'wide',
                    parsePatterns: {
                        narrow: [
                            /^j/i,
                            /^f/i,
                            /^m/i,
                            /^a/i,
                            /^m/i,
                            /^j/i,
                            /^j/i,
                            /^a/i,
                            /^s/i,
                            /^o/i,
                            /^n/i,
                            /^d/i,
                        ],
                        any: [
                            /^ja/i,
                            /^f/i,
                            /^mar/i,
                            /^ap/i,
                            /^may/i,
                            /^jun/i,
                            /^jul/i,
                            /^au/i,
                            /^s/i,
                            /^o/i,
                            /^n/i,
                            /^d/i,
                        ],
                    },
                    defaultParseWidth: 'any',
                }),
                day: s({
                    matchPatterns: {
                        narrow: /^[smtwf]/i,
                        short: /^(su|mo|tu|we|th|fr|sa)/i,
                        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
                        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
                    },
                    defaultMatchWidth: 'wide',
                    parsePatterns: {
                        narrow: [
                            /^s/i,
                            /^m/i,
                            /^t/i,
                            /^w/i,
                            /^t/i,
                            /^f/i,
                            /^s/i,
                        ],
                        any: [
                            /^su/i,
                            /^m/i,
                            /^tu/i,
                            /^w/i,
                            /^th/i,
                            /^f/i,
                            /^sa/i,
                        ],
                    },
                    defaultParseWidth: 'any',
                }),
                dayPeriod: s({
                    matchPatterns: {
                        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
                        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
                    },
                    defaultMatchWidth: 'any',
                    parsePatterns: {
                        any: {
                            am: /^a/i,
                            pm: /^p/i,
                            midnight: /^mi/i,
                            noon: /^no/i,
                            morning: /morning/i,
                            afternoon: /afternoon/i,
                            evening: /evening/i,
                            night: /night/i,
                        },
                    },
                    defaultParseWidth: 'any',
                }),
            },
            options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
        };
        (e.s(['enUS', 0, d], 244874), e.s(['defaultLocale', 0, d], 238153));
    },
    492421,
    (e) => {
        'use strict';
        let t = {};
        function n() {
            return t;
        }
        e.s(['getDefaultOptions', () => n]);
    },
    516467,
    511518,
    487122,
    (e) => {
        'use strict';
        let t = Symbol.for('constructDateFrom');
        function n(e, n) {
            return 'function' == typeof e
                ? e(n)
                : e && 'object' == typeof e && t in e
                  ? e[t](n)
                  : e instanceof Date
                    ? new e.constructor(n)
                    : new Date(n);
        }
        function a(e, t) {
            return n(t || e, e);
        }
        (e.s(
            [
                'constructFromSymbol',
                0,
                t,
                'millisecondsInDay',
                0,
                864e5,
                'millisecondsInWeek',
                0,
                6048e5,
            ],
            511518
        ),
            e.s(['constructFrom', () => n], 487122),
            e.s(['toDate', () => a], 516467));
    },
    870429,
    539392,
    738416,
    (e) => {
        'use strict';
        var t = e.i(516467);
        function n(e) {
            let n = (0, t.toDate)(e),
                a = new Date(
                    Date.UTC(
                        n.getFullYear(),
                        n.getMonth(),
                        n.getDate(),
                        n.getHours(),
                        n.getMinutes(),
                        n.getSeconds(),
                        n.getMilliseconds()
                    )
                );
            return (a.setUTCFullYear(n.getFullYear()), e - a);
        }
        var a = e.i(487122);
        function r(e, ...t) {
            let n = a.constructFrom.bind(
                null,
                e || t.find((e) => 'object' == typeof e)
            );
            return t.map(n);
        }
        e.s(['normalizeDates', () => r], 539392);
        var o = e.i(511518);
        function i(e, n) {
            let a = (0, t.toDate)(e, n?.in);
            return (a.setHours(0, 0, 0, 0), a);
        }
        function s(e, t, a) {
            let [s, u] = r(a?.in, e, t),
                d = i(s),
                l = i(u);
            return Math.round((d - n(d) - (l - n(l))) / o.millisecondsInDay);
        }
        (e.s(['startOfDay', () => i], 738416),
            e.s(['differenceInCalendarDays', () => s], 870429));
    },
    230902,
    921127,
    954259,
    234867,
    669352,
    44318,
    966625,
    661977,
    (e) => {
        'use strict';
        var t = e.i(238153),
            n = e.i(492421),
            a = e.i(870429),
            r = e.i(516467);
        function o(e, t) {
            let n = (0, r.toDate)(e, t?.in);
            return (
                n.setFullYear(n.getFullYear(), 0, 1),
                n.setHours(0, 0, 0, 0),
                n
            );
        }
        e.s(['startOfYear', () => o], 921127);
        var i = e.i(511518);
        function s(e, t) {
            let a = (0, n.getDefaultOptions)(),
                o =
                    t?.weekStartsOn ??
                    t?.locale?.options?.weekStartsOn ??
                    a.weekStartsOn ??
                    a.locale?.options?.weekStartsOn ??
                    0,
                i = (0, r.toDate)(e, t?.in),
                s = i.getDay();
            return (
                i.setDate(i.getDate() - (7 * (s < o) + s - o)),
                i.setHours(0, 0, 0, 0),
                i
            );
        }
        function u(e, t) {
            return s(e, { ...t, weekStartsOn: 1 });
        }
        (e.s(['startOfWeek', () => s], 954259),
            e.s(['startOfISOWeek', () => u], 234867));
        var d = e.i(487122);
        function l(e, t) {
            let n = (0, r.toDate)(e, t?.in),
                a = n.getFullYear(),
                o = (0, d.constructFrom)(n, 0);
            (o.setFullYear(a + 1, 0, 4), o.setHours(0, 0, 0, 0));
            let i = u(o),
                s = (0, d.constructFrom)(n, 0);
            (s.setFullYear(a, 0, 4), s.setHours(0, 0, 0, 0));
            let l = u(s);
            return n.getTime() >= i.getTime()
                ? a + 1
                : n.getTime() >= l.getTime()
                  ? a
                  : a - 1;
        }
        function c(e, t) {
            let n,
                a,
                o = (0, r.toDate)(e, t?.in);
            return (
                Math.round(
                    (u(o) -
                        ((n = l(o, void 0)),
                        (a = (0, d.constructFrom)(o, 0)).setFullYear(n, 0, 4),
                        a.setHours(0, 0, 0, 0),
                        u(a))) /
                        i.millisecondsInWeek
                ) + 1
            );
        }
        function m(e, t) {
            let a = (0, r.toDate)(e, t?.in),
                o = a.getFullYear(),
                i = (0, n.getDefaultOptions)(),
                u =
                    t?.firstWeekContainsDate ??
                    t?.locale?.options?.firstWeekContainsDate ??
                    i.firstWeekContainsDate ??
                    i.locale?.options?.firstWeekContainsDate ??
                    1,
                l = (0, d.constructFrom)(t?.in || e, 0);
            (l.setFullYear(o + 1, 0, u), l.setHours(0, 0, 0, 0));
            let c = s(l, t),
                m = (0, d.constructFrom)(t?.in || e, 0);
            (m.setFullYear(o, 0, u), m.setHours(0, 0, 0, 0));
            let h = s(m, t);
            return +a >= +c ? o + 1 : +a >= +h ? o : o - 1;
        }
        function h(e, t) {
            let a,
                o,
                u,
                l,
                c = (0, r.toDate)(e, t?.in);
            return (
                Math.round(
                    (s(c, t) -
                        ((a = (0, n.getDefaultOptions)()),
                        (o =
                            t?.firstWeekContainsDate ??
                            t?.locale?.options?.firstWeekContainsDate ??
                            a.firstWeekContainsDate ??
                            a.locale?.options?.firstWeekContainsDate ??
                            1),
                        (u = m(c, t)),
                        (l = (0, d.constructFrom)(t?.in || c, 0)).setFullYear(
                            u,
                            0,
                            o
                        ),
                        l.setHours(0, 0, 0, 0),
                        s(l, t))) /
                        i.millisecondsInWeek
                ) + 1
            );
        }
        function f(e, t) {
            let n = Math.abs(e).toString().padStart(t, '0');
            return (e < 0 ? '-' : '') + n;
        }
        (e.s(['getISOWeek', () => c], 669352),
            e.s(['getWeek', () => h], 44318));
        let g = {
                y(e, t) {
                    let n = e.getFullYear(),
                        a = n > 0 ? n : 1 - n;
                    return f('yy' === t ? a % 100 : a, t.length);
                },
                M(e, t) {
                    let n = e.getMonth();
                    return 'M' === t ? String(n + 1) : f(n + 1, 2);
                },
                d: (e, t) => f(e.getDate(), t.length),
                a(e, t) {
                    let n = e.getHours() / 12 >= 1 ? 'pm' : 'am';
                    switch (t) {
                        case 'a':
                        case 'aa':
                            return n.toUpperCase();
                        case 'aaa':
                            return n;
                        case 'aaaaa':
                            return n[0];
                        default:
                            return 'am' === n ? 'a.m.' : 'p.m.';
                    }
                },
                h: (e, t) => f(e.getHours() % 12 || 12, t.length),
                H: (e, t) => f(e.getHours(), t.length),
                m: (e, t) => f(e.getMinutes(), t.length),
                s: (e, t) => f(e.getSeconds(), t.length),
                S(e, t) {
                    let n = t.length;
                    return f(
                        Math.trunc(e.getMilliseconds() * Math.pow(10, n - 3)),
                        t.length
                    );
                },
            },
            p = {
                G: function (e, t, n) {
                    let a = +(e.getFullYear() > 0);
                    switch (t) {
                        case 'G':
                        case 'GG':
                        case 'GGG':
                            return n.era(a, { width: 'abbreviated' });
                        case 'GGGGG':
                            return n.era(a, { width: 'narrow' });
                        default:
                            return n.era(a, { width: 'wide' });
                    }
                },
                y: function (e, t, n) {
                    if ('yo' === t) {
                        let t = e.getFullYear();
                        return n.ordinalNumber(t > 0 ? t : 1 - t, {
                            unit: 'year',
                        });
                    }
                    return g.y(e, t);
                },
                Y: function (e, t, n, a) {
                    let r = m(e, a),
                        o = r > 0 ? r : 1 - r;
                    return 'YY' === t
                        ? f(o % 100, 2)
                        : 'Yo' === t
                          ? n.ordinalNumber(o, { unit: 'year' })
                          : f(o, t.length);
                },
                R: function (e, t) {
                    return f(l(e), t.length);
                },
                u: function (e, t) {
                    return f(e.getFullYear(), t.length);
                },
                Q: function (e, t, n) {
                    let a = Math.ceil((e.getMonth() + 1) / 3);
                    switch (t) {
                        case 'Q':
                            return String(a);
                        case 'QQ':
                            return f(a, 2);
                        case 'Qo':
                            return n.ordinalNumber(a, { unit: 'quarter' });
                        case 'QQQ':
                            return n.quarter(a, {
                                width: 'abbreviated',
                                context: 'formatting',
                            });
                        case 'QQQQQ':
                            return n.quarter(a, {
                                width: 'narrow',
                                context: 'formatting',
                            });
                        default:
                            return n.quarter(a, {
                                width: 'wide',
                                context: 'formatting',
                            });
                    }
                },
                q: function (e, t, n) {
                    let a = Math.ceil((e.getMonth() + 1) / 3);
                    switch (t) {
                        case 'q':
                            return String(a);
                        case 'qq':
                            return f(a, 2);
                        case 'qo':
                            return n.ordinalNumber(a, { unit: 'quarter' });
                        case 'qqq':
                            return n.quarter(a, {
                                width: 'abbreviated',
                                context: 'standalone',
                            });
                        case 'qqqqq':
                            return n.quarter(a, {
                                width: 'narrow',
                                context: 'standalone',
                            });
                        default:
                            return n.quarter(a, {
                                width: 'wide',
                                context: 'standalone',
                            });
                    }
                },
                M: function (e, t, n) {
                    let a = e.getMonth();
                    switch (t) {
                        case 'M':
                        case 'MM':
                            return g.M(e, t);
                        case 'Mo':
                            return n.ordinalNumber(a + 1, { unit: 'month' });
                        case 'MMM':
                            return n.month(a, {
                                width: 'abbreviated',
                                context: 'formatting',
                            });
                        case 'MMMMM':
                            return n.month(a, {
                                width: 'narrow',
                                context: 'formatting',
                            });
                        default:
                            return n.month(a, {
                                width: 'wide',
                                context: 'formatting',
                            });
                    }
                },
                L: function (e, t, n) {
                    let a = e.getMonth();
                    switch (t) {
                        case 'L':
                            return String(a + 1);
                        case 'LL':
                            return f(a + 1, 2);
                        case 'Lo':
                            return n.ordinalNumber(a + 1, { unit: 'month' });
                        case 'LLL':
                            return n.month(a, {
                                width: 'abbreviated',
                                context: 'standalone',
                            });
                        case 'LLLLL':
                            return n.month(a, {
                                width: 'narrow',
                                context: 'standalone',
                            });
                        default:
                            return n.month(a, {
                                width: 'wide',
                                context: 'standalone',
                            });
                    }
                },
                w: function (e, t, n, a) {
                    let r = h(e, a);
                    return 'wo' === t
                        ? n.ordinalNumber(r, { unit: 'week' })
                        : f(r, t.length);
                },
                I: function (e, t, n) {
                    let a = c(e);
                    return 'Io' === t
                        ? n.ordinalNumber(a, { unit: 'week' })
                        : f(a, t.length);
                },
                d: function (e, t, n) {
                    return 'do' === t
                        ? n.ordinalNumber(e.getDate(), { unit: 'date' })
                        : g.d(e, t);
                },
                D: function (e, t, n) {
                    let i,
                        s =
                            ((i = (0, r.toDate)(e, void 0)),
                            (0, a.differenceInCalendarDays)(i, o(i)) + 1);
                    return 'Do' === t
                        ? n.ordinalNumber(s, { unit: 'dayOfYear' })
                        : f(s, t.length);
                },
                E: function (e, t, n) {
                    let a = e.getDay();
                    switch (t) {
                        case 'E':
                        case 'EE':
                        case 'EEE':
                            return n.day(a, {
                                width: 'abbreviated',
                                context: 'formatting',
                            });
                        case 'EEEEE':
                            return n.day(a, {
                                width: 'narrow',
                                context: 'formatting',
                            });
                        case 'EEEEEE':
                            return n.day(a, {
                                width: 'short',
                                context: 'formatting',
                            });
                        default:
                            return n.day(a, {
                                width: 'wide',
                                context: 'formatting',
                            });
                    }
                },
                e: function (e, t, n, a) {
                    let r = e.getDay(),
                        o = (r - a.weekStartsOn + 8) % 7 || 7;
                    switch (t) {
                        case 'e':
                            return String(o);
                        case 'ee':
                            return f(o, 2);
                        case 'eo':
                            return n.ordinalNumber(o, { unit: 'day' });
                        case 'eee':
                            return n.day(r, {
                                width: 'abbreviated',
                                context: 'formatting',
                            });
                        case 'eeeee':
                            return n.day(r, {
                                width: 'narrow',
                                context: 'formatting',
                            });
                        case 'eeeeee':
                            return n.day(r, {
                                width: 'short',
                                context: 'formatting',
                            });
                        default:
                            return n.day(r, {
                                width: 'wide',
                                context: 'formatting',
                            });
                    }
                },
                c: function (e, t, n, a) {
                    let r = e.getDay(),
                        o = (r - a.weekStartsOn + 8) % 7 || 7;
                    switch (t) {
                        case 'c':
                            return String(o);
                        case 'cc':
                            return f(o, t.length);
                        case 'co':
                            return n.ordinalNumber(o, { unit: 'day' });
                        case 'ccc':
                            return n.day(r, {
                                width: 'abbreviated',
                                context: 'standalone',
                            });
                        case 'ccccc':
                            return n.day(r, {
                                width: 'narrow',
                                context: 'standalone',
                            });
                        case 'cccccc':
                            return n.day(r, {
                                width: 'short',
                                context: 'standalone',
                            });
                        default:
                            return n.day(r, {
                                width: 'wide',
                                context: 'standalone',
                            });
                    }
                },
                i: function (e, t, n) {
                    let a = e.getDay(),
                        r = 0 === a ? 7 : a;
                    switch (t) {
                        case 'i':
                            return String(r);
                        case 'ii':
                            return f(r, t.length);
                        case 'io':
                            return n.ordinalNumber(r, { unit: 'day' });
                        case 'iii':
                            return n.day(a, {
                                width: 'abbreviated',
                                context: 'formatting',
                            });
                        case 'iiiii':
                            return n.day(a, {
                                width: 'narrow',
                                context: 'formatting',
                            });
                        case 'iiiiii':
                            return n.day(a, {
                                width: 'short',
                                context: 'formatting',
                            });
                        default:
                            return n.day(a, {
                                width: 'wide',
                                context: 'formatting',
                            });
                    }
                },
                a: function (e, t, n) {
                    let a = e.getHours() / 12 >= 1 ? 'pm' : 'am';
                    switch (t) {
                        case 'a':
                        case 'aa':
                            return n.dayPeriod(a, {
                                width: 'abbreviated',
                                context: 'formatting',
                            });
                        case 'aaa':
                            return n
                                .dayPeriod(a, {
                                    width: 'abbreviated',
                                    context: 'formatting',
                                })
                                .toLowerCase();
                        case 'aaaaa':
                            return n.dayPeriod(a, {
                                width: 'narrow',
                                context: 'formatting',
                            });
                        default:
                            return n.dayPeriod(a, {
                                width: 'wide',
                                context: 'formatting',
                            });
                    }
                },
                b: function (e, t, n) {
                    let a,
                        r = e.getHours();
                    switch (
                        ((a =
                            12 === r
                                ? 'noon'
                                : 0 === r
                                  ? 'midnight'
                                  : r / 12 >= 1
                                    ? 'pm'
                                    : 'am'),
                        t)
                    ) {
                        case 'b':
                        case 'bb':
                            return n.dayPeriod(a, {
                                width: 'abbreviated',
                                context: 'formatting',
                            });
                        case 'bbb':
                            return n
                                .dayPeriod(a, {
                                    width: 'abbreviated',
                                    context: 'formatting',
                                })
                                .toLowerCase();
                        case 'bbbbb':
                            return n.dayPeriod(a, {
                                width: 'narrow',
                                context: 'formatting',
                            });
                        default:
                            return n.dayPeriod(a, {
                                width: 'wide',
                                context: 'formatting',
                            });
                    }
                },
                B: function (e, t, n) {
                    let a,
                        r = e.getHours();
                    switch (
                        ((a =
                            r >= 17
                                ? 'evening'
                                : r >= 12
                                  ? 'afternoon'
                                  : r >= 4
                                    ? 'morning'
                                    : 'night'),
                        t)
                    ) {
                        case 'B':
                        case 'BB':
                        case 'BBB':
                            return n.dayPeriod(a, {
                                width: 'abbreviated',
                                context: 'formatting',
                            });
                        case 'BBBBB':
                            return n.dayPeriod(a, {
                                width: 'narrow',
                                context: 'formatting',
                            });
                        default:
                            return n.dayPeriod(a, {
                                width: 'wide',
                                context: 'formatting',
                            });
                    }
                },
                h: function (e, t, n) {
                    if ('ho' === t) {
                        let t = e.getHours() % 12;
                        return (
                            0 === t && (t = 12),
                            n.ordinalNumber(t, { unit: 'hour' })
                        );
                    }
                    return g.h(e, t);
                },
                H: function (e, t, n) {
                    return 'Ho' === t
                        ? n.ordinalNumber(e.getHours(), { unit: 'hour' })
                        : g.H(e, t);
                },
                K: function (e, t, n) {
                    let a = e.getHours() % 12;
                    return 'Ko' === t
                        ? n.ordinalNumber(a, { unit: 'hour' })
                        : f(a, t.length);
                },
                k: function (e, t, n) {
                    let a = e.getHours();
                    return (0 === a && (a = 24), 'ko' === t)
                        ? n.ordinalNumber(a, { unit: 'hour' })
                        : f(a, t.length);
                },
                m: function (e, t, n) {
                    return 'mo' === t
                        ? n.ordinalNumber(e.getMinutes(), { unit: 'minute' })
                        : g.m(e, t);
                },
                s: function (e, t, n) {
                    return 'so' === t
                        ? n.ordinalNumber(e.getSeconds(), { unit: 'second' })
                        : g.s(e, t);
                },
                S: function (e, t) {
                    return g.S(e, t);
                },
                X: function (e, t, n) {
                    let a = e.getTimezoneOffset();
                    if (0 === a) return 'Z';
                    switch (t) {
                        case 'X':
                            return w(a);
                        case 'XXXX':
                        case 'XX':
                            return v(a);
                        default:
                            return v(a, ':');
                    }
                },
                x: function (e, t, n) {
                    let a = e.getTimezoneOffset();
                    switch (t) {
                        case 'x':
                            return w(a);
                        case 'xxxx':
                        case 'xx':
                            return v(a);
                        default:
                            return v(a, ':');
                    }
                },
                O: function (e, t, n) {
                    let a = e.getTimezoneOffset();
                    switch (t) {
                        case 'O':
                        case 'OO':
                        case 'OOO':
                            return 'GMT' + b(a, ':');
                        default:
                            return 'GMT' + v(a, ':');
                    }
                },
                z: function (e, t, n) {
                    let a = e.getTimezoneOffset();
                    switch (t) {
                        case 'z':
                        case 'zz':
                        case 'zzz':
                            return 'GMT' + b(a, ':');
                        default:
                            return 'GMT' + v(a, ':');
                    }
                },
                t: function (e, t, n) {
                    return f(Math.trunc(e / 1e3), t.length);
                },
                T: function (e, t, n) {
                    return f(+e, t.length);
                },
            };
        function b(e, t = '') {
            let n = e > 0 ? '-' : '+',
                a = Math.abs(e),
                r = Math.trunc(a / 60),
                o = a % 60;
            return 0 === o ? n + String(r) : n + String(r) + t + f(o, 2);
        }
        function w(e, t) {
            return e % 60 == 0
                ? (e > 0 ? '-' : '+') + f(Math.abs(e) / 60, 2)
                : v(e, t);
        }
        function v(e, t = '') {
            let n = Math.abs(e);
            return (
                (e > 0 ? '-' : '+') +
                f(Math.trunc(n / 60), 2) +
                t +
                f(n % 60, 2)
            );
        }
        let y = (e, t) => {
                switch (e) {
                    case 'P':
                        return t.date({ width: 'short' });
                    case 'PP':
                        return t.date({ width: 'medium' });
                    case 'PPP':
                        return t.date({ width: 'long' });
                    default:
                        return t.date({ width: 'full' });
                }
            },
            M = (e, t) => {
                switch (e) {
                    case 'p':
                        return t.time({ width: 'short' });
                    case 'pp':
                        return t.time({ width: 'medium' });
                    case 'ppp':
                        return t.time({ width: 'long' });
                    default:
                        return t.time({ width: 'full' });
                }
            },
            P = {
                p: M,
                P: (e, t) => {
                    let n,
                        a = e.match(/(P+)(p+)?/) || [],
                        r = a[1],
                        o = a[2];
                    if (!o) return y(e, t);
                    switch (r) {
                        case 'P':
                            n = t.dateTime({ width: 'short' });
                            break;
                        case 'PP':
                            n = t.dateTime({ width: 'medium' });
                            break;
                        case 'PPP':
                            n = t.dateTime({ width: 'long' });
                            break;
                        default:
                            n = t.dateTime({ width: 'full' });
                    }
                    return n
                        .replace('{{date}}', y(r, t))
                        .replace('{{time}}', M(o, t));
                },
            },
            x = /^D+$/,
            k = /^Y+$/,
            D = ['D', 'DD', 'YY', 'YYYY'];
        function W(e) {
            return (
                e instanceof Date ||
                ('object' == typeof e &&
                    '[object Date]' === Object.prototype.toString.call(e))
            );
        }
        function F(e) {
            return !(
                (!W(e) && 'number' != typeof e) ||
                isNaN(+(0, r.toDate)(e))
            );
        }
        (e.s(['isDate', () => W], 966625), e.s(['isValid', () => F], 661977));
        let C = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
            S = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
            j = /^'([^]*?)'?$/,
            O = /''/g,
            T = /[a-zA-Z]/;
        function q(e, a, o) {
            let i = (0, n.getDefaultOptions)(),
                s = o?.locale ?? i.locale ?? t.defaultLocale,
                u =
                    o?.firstWeekContainsDate ??
                    o?.locale?.options?.firstWeekContainsDate ??
                    i.firstWeekContainsDate ??
                    i.locale?.options?.firstWeekContainsDate ??
                    1,
                d =
                    o?.weekStartsOn ??
                    o?.locale?.options?.weekStartsOn ??
                    i.weekStartsOn ??
                    i.locale?.options?.weekStartsOn ??
                    0,
                l = (0, r.toDate)(e, o?.in);
            if (!F(l)) throw RangeError('Invalid time value');
            let c = a
                .match(S)
                .map((e) => {
                    let t = e[0];
                    return 'p' === t || 'P' === t
                        ? (0, P[t])(e, s.formatLong)
                        : e;
                })
                .join('')
                .match(C)
                .map((e) => {
                    if ("''" === e) return { isToken: !1, value: "'" };
                    let t = e[0];
                    if ("'" === t) {
                        var n;
                        let t;
                        return {
                            isToken: !1,
                            value: (t = (n = e).match(j))
                                ? t[1].replace(O, "'")
                                : n,
                        };
                    }
                    if (p[t]) return { isToken: !0, value: e };
                    if (t.match(T))
                        throw RangeError(
                            'Format string contains an unescaped latin alphabet character `' +
                                t +
                                '`'
                        );
                    return { isToken: !1, value: e };
                });
            s.localize.preprocessor && (c = s.localize.preprocessor(l, c));
            let m = { firstWeekContainsDate: u, weekStartsOn: d, locale: s };
            return c
                .map((t) => {
                    if (!t.isToken) return t.value;
                    let n = t.value;
                    return (
                        ((!o?.useAdditionalWeekYearTokens && k.test(n)) ||
                            (!o?.useAdditionalDayOfYearTokens && x.test(n))) &&
                            (function (e, t, n) {
                                var a, r, o;
                                let i,
                                    s =
                                        ((a = e),
                                        (r = t),
                                        (o = n),
                                        (i =
                                            'Y' === a[0]
                                                ? 'years'
                                                : 'days of the month'),
                                        `Use \`${a.toLowerCase()}\` instead of \`${a}\` (in \`${r}\`) for formatting ${i} to the input \`${o}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);
                                if ((console.warn(s), D.includes(e)))
                                    throw RangeError(s);
                            })(n, a, String(e)),
                        (0, p[n[0]])(l, n, s.localize, m)
                    );
                })
                .join('');
        }
        e.s(['format', () => q], 230902);
    },
    67356,
    (e) => {
        'use strict';
        let t = {
            lessThanXSeconds: {
                one: 'menos de um segundo',
                other: 'menos de {{count}} segundos',
            },
            xSeconds: { one: '1 segundo', other: '{{count}} segundos' },
            halfAMinute: 'meio minuto',
            lessThanXMinutes: {
                one: 'menos de um minuto',
                other: 'menos de {{count}} minutos',
            },
            xMinutes: { one: '1 minuto', other: '{{count}} minutos' },
            aboutXHours: {
                one: 'cerca de 1 hora',
                other: 'cerca de {{count}} horas',
            },
            xHours: { one: '1 hora', other: '{{count}} horas' },
            xDays: { one: '1 dia', other: '{{count}} dias' },
            aboutXWeeks: {
                one: 'cerca de 1 semana',
                other: 'cerca de {{count}} semanas',
            },
            xWeeks: { one: '1 semana', other: '{{count}} semanas' },
            aboutXMonths: {
                one: 'cerca de 1 mês',
                other: 'cerca de {{count}} meses',
            },
            xMonths: { one: '1 mês', other: '{{count}} meses' },
            aboutXYears: {
                one: 'cerca de 1 ano',
                other: 'cerca de {{count}} anos',
            },
            xYears: { one: '1 ano', other: '{{count}} anos' },
            overXYears: {
                one: 'mais de 1 ano',
                other: 'mais de {{count}} anos',
            },
            almostXYears: { one: 'quase 1 ano', other: 'quase {{count}} anos' },
        };
        var n = e.i(716609);
        let a = {
                date: (0, n.buildFormatLongFn)({
                    formats: {
                        full: "EEEE, d 'de' MMMM 'de' y",
                        long: "d 'de' MMMM 'de' y",
                        medium: 'd MMM y',
                        short: 'dd/MM/yyyy',
                    },
                    defaultWidth: 'full',
                }),
                time: (0, n.buildFormatLongFn)({
                    formats: {
                        full: 'HH:mm:ss zzzz',
                        long: 'HH:mm:ss z',
                        medium: 'HH:mm:ss',
                        short: 'HH:mm',
                    },
                    defaultWidth: 'full',
                }),
                dateTime: (0, n.buildFormatLongFn)({
                    formats: {
                        full: "{{date}} 'às' {{time}}",
                        long: "{{date}} 'às' {{time}}",
                        medium: '{{date}}, {{time}}',
                        short: '{{date}}, {{time}}',
                    },
                    defaultWidth: 'full',
                }),
            },
            r = {
                lastWeek: (e) => {
                    let t = e.getDay();
                    return (
                        "'" +
                        (0 === t || 6 === t ? 'último' : 'última') +
                        "' eeee 'às' p"
                    );
                },
                yesterday: "'ontem às' p",
                today: "'hoje às' p",
                tomorrow: "'amanhã às' p",
                nextWeek: "eeee 'às' p",
                other: 'P',
            };
        var o = e.i(649859);
        let i = {
            ordinalNumber: (e, t) => {
                let n = Number(e);
                return t?.unit === 'week' ? n + 'ª' : n + 'º';
            },
            era: (0, o.buildLocalizeFn)({
                values: {
                    narrow: ['AC', 'DC'],
                    abbreviated: ['AC', 'DC'],
                    wide: ['antes de cristo', 'depois de cristo'],
                },
                defaultWidth: 'wide',
            }),
            quarter: (0, o.buildLocalizeFn)({
                values: {
                    narrow: ['1', '2', '3', '4'],
                    abbreviated: ['T1', 'T2', 'T3', 'T4'],
                    wide: [
                        '1º trimestre',
                        '2º trimestre',
                        '3º trimestre',
                        '4º trimestre',
                    ],
                },
                defaultWidth: 'wide',
                argumentCallback: (e) => e - 1,
            }),
            month: (0, o.buildLocalizeFn)({
                values: {
                    narrow: [
                        'j',
                        'f',
                        'm',
                        'a',
                        'm',
                        'j',
                        'j',
                        'a',
                        's',
                        'o',
                        'n',
                        'd',
                    ],
                    abbreviated: [
                        'jan',
                        'fev',
                        'mar',
                        'abr',
                        'mai',
                        'jun',
                        'jul',
                        'ago',
                        'set',
                        'out',
                        'nov',
                        'dez',
                    ],
                    wide: [
                        'janeiro',
                        'fevereiro',
                        'março',
                        'abril',
                        'maio',
                        'junho',
                        'julho',
                        'agosto',
                        'setembro',
                        'outubro',
                        'novembro',
                        'dezembro',
                    ],
                },
                defaultWidth: 'wide',
            }),
            day: (0, o.buildLocalizeFn)({
                values: {
                    narrow: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                    short: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
                    abbreviated: [
                        'domingo',
                        'segunda',
                        'terça',
                        'quarta',
                        'quinta',
                        'sexta',
                        'sábado',
                    ],
                    wide: [
                        'domingo',
                        'segunda-feira',
                        'terça-feira',
                        'quarta-feira',
                        'quinta-feira',
                        'sexta-feira',
                        'sábado',
                    ],
                },
                defaultWidth: 'wide',
            }),
            dayPeriod: (0, o.buildLocalizeFn)({
                values: {
                    narrow: {
                        am: 'a',
                        pm: 'p',
                        midnight: 'mn',
                        noon: 'md',
                        morning: 'manhã',
                        afternoon: 'tarde',
                        evening: 'tarde',
                        night: 'noite',
                    },
                    abbreviated: {
                        am: 'AM',
                        pm: 'PM',
                        midnight: 'meia-noite',
                        noon: 'meio-dia',
                        morning: 'manhã',
                        afternoon: 'tarde',
                        evening: 'tarde',
                        night: 'noite',
                    },
                    wide: {
                        am: 'a.m.',
                        pm: 'p.m.',
                        midnight: 'meia-noite',
                        noon: 'meio-dia',
                        morning: 'manhã',
                        afternoon: 'tarde',
                        evening: 'tarde',
                        night: 'noite',
                    },
                },
                defaultWidth: 'wide',
                formattingValues: {
                    narrow: {
                        am: 'a',
                        pm: 'p',
                        midnight: 'mn',
                        noon: 'md',
                        morning: 'da manhã',
                        afternoon: 'da tarde',
                        evening: 'da tarde',
                        night: 'da noite',
                    },
                    abbreviated: {
                        am: 'AM',
                        pm: 'PM',
                        midnight: 'meia-noite',
                        noon: 'meio-dia',
                        morning: 'da manhã',
                        afternoon: 'da tarde',
                        evening: 'da tarde',
                        night: 'da noite',
                    },
                    wide: {
                        am: 'a.m.',
                        pm: 'p.m.',
                        midnight: 'meia-noite',
                        noon: 'meio-dia',
                        morning: 'da manhã',
                        afternoon: 'da tarde',
                        evening: 'da tarde',
                        night: 'da noite',
                    },
                },
                defaultFormattingWidth: 'wide',
            }),
        };
        var s = e.i(369796);
        let u = {
            ordinalNumber: (0, e.i(91081).buildMatchPatternFn)({
                matchPattern: /^(\d+)[ºªo]?/i,
                parsePattern: /\d+/i,
                valueCallback: (e) => parseInt(e, 10),
            }),
            era: (0, s.buildMatchFn)({
                matchPatterns: {
                    narrow: /^(ac|dc|a|d)/i,
                    abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
                    wide: /^(antes de cristo|depois de cristo)/i,
                },
                defaultMatchWidth: 'wide',
                parsePatterns: {
                    any: [/^ac/i, /^dc/i],
                    wide: [/^antes de cristo/i, /^depois de cristo/i],
                },
                defaultParseWidth: 'any',
            }),
            quarter: (0, s.buildMatchFn)({
                matchPatterns: {
                    narrow: /^[1234]/i,
                    abbreviated: /^T[1234]/i,
                    wide: /^[1234](º)? trimestre/i,
                },
                defaultMatchWidth: 'wide',
                parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
                defaultParseWidth: 'any',
                valueCallback: (e) => e + 1,
            }),
            month: (0, s.buildMatchFn)({
                matchPatterns: {
                    narrow: /^[jfmajsond]/i,
                    abbreviated:
                        /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
                    wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i,
                },
                defaultMatchWidth: 'wide',
                parsePatterns: {
                    narrow: [
                        /^j/i,
                        /^f/i,
                        /^m/i,
                        /^a/i,
                        /^m/i,
                        /^j/i,
                        /^j/i,
                        /^a/i,
                        /^s/i,
                        /^o/i,
                        /^n/i,
                        /^d/i,
                    ],
                    any: [
                        /^ja/i,
                        /^fev/i,
                        /^mar/i,
                        /^abr/i,
                        /^mai/i,
                        /^jun/i,
                        /^jul/i,
                        /^ago/i,
                        /^set/i,
                        /^out/i,
                        /^nov/i,
                        /^dez/i,
                    ],
                },
                defaultParseWidth: 'any',
            }),
            day: (0, s.buildMatchFn)({
                matchPatterns: {
                    narrow: /^(dom|[23456]ª?|s[aá]b)/i,
                    short: /^(dom|[23456]ª?|s[aá]b)/i,
                    abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
                    wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i,
                },
                defaultMatchWidth: 'wide',
                parsePatterns: {
                    short: [
                        /^d/i,
                        /^2/i,
                        /^3/i,
                        /^4/i,
                        /^5/i,
                        /^6/i,
                        /^s[aá]/i,
                    ],
                    narrow: [
                        /^d/i,
                        /^2/i,
                        /^3/i,
                        /^4/i,
                        /^5/i,
                        /^6/i,
                        /^s[aá]/i,
                    ],
                    any: [
                        /^d/i,
                        /^seg/i,
                        /^t/i,
                        /^qua/i,
                        /^qui/i,
                        /^sex/i,
                        /^s[aá]b/i,
                    ],
                },
                defaultParseWidth: 'any',
            }),
            dayPeriod: (0, s.buildMatchFn)({
                matchPatterns: {
                    narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
                    any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i,
                },
                defaultMatchWidth: 'any',
                parsePatterns: {
                    any: {
                        am: /^a/i,
                        pm: /^p/i,
                        midnight: /^mn|^meia[-\s]noite/i,
                        noon: /^md|^meio[-\s]dia/i,
                        morning: /manhã/i,
                        afternoon: /tarde/i,
                        evening: /tarde/i,
                        night: /noite/i,
                    },
                },
                defaultParseWidth: 'any',
            }),
        };
        e.s(
            [
                'ptBR',
                0,
                {
                    code: 'pt-BR',
                    formatDistance: (e, n, a) => {
                        let r,
                            o = t[e];
                        if (
                            ((r =
                                'string' == typeof o
                                    ? o
                                    : 1 === n
                                      ? o.one
                                      : o.other.replace(
                                            '{{count}}',
                                            String(n)
                                        )),
                            a?.addSuffix)
                        )
                            if (a.comparison && a.comparison > 0)
                                return 'em ' + r;
                            else return 'há ' + r;
                        return r;
                    },
                    formatLong: a,
                    formatRelative: (e, t, n, a) => {
                        let o = r[e];
                        return 'function' == typeof o ? o(t) : o;
                    },
                    localize: i,
                    match: u,
                    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
                },
            ],
            67356
        );
    },
    98556,
    (e) => {
        'use strict';
        let t = (0, e.i(383206).default)('calendar', [
            ['path', { d: 'M8 2v4', key: '1cmpym' }],
            ['path', { d: 'M16 2v4', key: '4m81vk' }],
            [
                'rect',
                {
                    width: '18',
                    height: '18',
                    x: '3',
                    y: '4',
                    rx: '2',
                    key: '1hopcy',
                },
            ],
            ['path', { d: 'M3 10h18', key: '8toen8' }],
        ]);
        e.s(['default', () => t]);
    },
    926991,
    859502,
    495794,
    432286,
    (e) => {
        'use strict';
        var t = e.i(383206);
        let n = (0, t.default)('chevron-left', [
            ['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }],
        ]);
        e.s(['default', () => n], 926991);
        let a = (0, t.default)('chevron-right', [
            ['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }],
        ]);
        e.s(['default', () => a], 859502);
        var r = e.i(487122),
            o = e.i(516467);
        function i(e, t, n) {
            let a = (0, o.toDate)(e, n?.in);
            if (isNaN(t)) return (0, r.constructFrom)(n?.in || e, NaN);
            if (!t) return a;
            let i = a.getDate(),
                s = (0, r.constructFrom)(n?.in || e, a.getTime());
            return (s.setMonth(a.getMonth() + t + 1, 0), i >= s.getDate())
                ? s
                : (a.setFullYear(s.getFullYear(), s.getMonth(), i), a);
        }
        function s(e, t) {
            let n = (0, o.toDate)(e, t?.in);
            return (n.setDate(1), n.setHours(0, 0, 0, 0), n);
        }
        (e.s(['addMonths', () => i], 495794),
            e.s(['startOfMonth', () => s], 432286));
    },
    337822,
    (e) => {
        'use strict';
        var t = e.i(565750),
            n = e.i(990341),
            a = e.i(291967),
            r = e.i(672687),
            o = e.i(784711),
            i = e.i(846357),
            s = e.i(774621),
            u = e.i(60126),
            d = e.i(910529),
            l = e.i(75355),
            c = e.i(546354),
            m = e.i(861181),
            h = e.i(403078),
            f = e.i(655875),
            g = e.i(695145),
            p = e.i(73772),
            b = e.i(595357),
            w = 'Popover',
            [v, y] = (0, o.createContextScope)(w, [l.createPopperScope]),
            M = (0, l.createPopperScope)(),
            [P, x] = v(w),
            k = (e) => {
                let {
                        __scopePopover: a,
                        children: r,
                        open: o,
                        defaultOpen: i,
                        onOpenChange: s,
                        modal: u = !1,
                    } = e,
                    c = M(a),
                    m = n.useRef(null),
                    [h, f] = n.useState(!1),
                    [p, b] = (0, g.useControllableState)({
                        prop: o,
                        defaultProp: i ?? !1,
                        onChange: s,
                        caller: w,
                    });
                return (0, t.jsx)(l.Root, {
                    ...c,
                    children: (0, t.jsx)(P, {
                        scope: a,
                        contentId: (0, d.useId)(),
                        triggerRef: m,
                        open: p,
                        onOpenChange: b,
                        onOpenToggle: n.useCallback(() => b((e) => !e), [b]),
                        hasCustomAnchor: h,
                        onCustomAnchorAdd: n.useCallback(() => f(!0), []),
                        onCustomAnchorRemove: n.useCallback(() => f(!1), []),
                        modal: u,
                        children: r,
                    }),
                });
            };
        k.displayName = w;
        var D = 'PopoverAnchor';
        n.forwardRef((e, a) => {
            let { __scopePopover: r, ...o } = e,
                i = x(D, r),
                s = M(r),
                { onCustomAnchorAdd: u, onCustomAnchorRemove: d } = i;
            return (
                n.useEffect(() => (u(), () => d()), [u, d]),
                (0, t.jsx)(l.Anchor, { ...s, ...o, ref: a })
            );
        }).displayName = D;
        var W = 'PopoverTrigger',
            F = n.forwardRef((e, n) => {
                let { __scopePopover: o, ...i } = e,
                    s = x(W, o),
                    u = M(o),
                    d = (0, r.useComposedRefs)(n, s.triggerRef),
                    c = (0, t.jsx)(h.Primitive.button, {
                        type: 'button',
                        'aria-haspopup': 'dialog',
                        'aria-expanded': s.open,
                        'aria-controls': s.contentId,
                        'data-state': A(s.open),
                        ...i,
                        ref: d,
                        onClick: (0, a.composeEventHandlers)(
                            e.onClick,
                            s.onOpenToggle
                        ),
                    });
                return s.hasCustomAnchor
                    ? c
                    : (0, t.jsx)(l.Anchor, { asChild: !0, ...u, children: c });
            });
        F.displayName = W;
        var C = 'PopoverPortal',
            [S, j] = v(C, { forceMount: void 0 }),
            O = (e) => {
                let {
                        __scopePopover: n,
                        forceMount: a,
                        children: r,
                        container: o,
                    } = e,
                    i = x(C, n);
                return (0, t.jsx)(S, {
                    scope: n,
                    forceMount: a,
                    children: (0, t.jsx)(m.Presence, {
                        present: a || i.open,
                        children: (0, t.jsx)(c.Portal, {
                            asChild: !0,
                            container: o,
                            children: r,
                        }),
                    }),
                });
            };
        O.displayName = C;
        var T = 'PopoverContent',
            q = n.forwardRef((e, n) => {
                let a = j(T, e.__scopePopover),
                    { forceMount: r = a.forceMount, ...o } = e,
                    i = x(T, e.__scopePopover);
                return (0, t.jsx)(m.Presence, {
                    present: r || i.open,
                    children: i.modal
                        ? (0, t.jsx)(H, { ...o, ref: n })
                        : (0, t.jsx)(z, { ...o, ref: n }),
                });
            });
        q.displayName = T;
        var Y = (0, f.createSlot)('PopoverContent.RemoveScroll'),
            H = n.forwardRef((e, o) => {
                let i = x(T, e.__scopePopover),
                    s = n.useRef(null),
                    u = (0, r.useComposedRefs)(o, s),
                    d = n.useRef(!1);
                return (
                    n.useEffect(() => {
                        let e = s.current;
                        if (e) return (0, p.hideOthers)(e);
                    }, []),
                    (0, t.jsx)(b.RemoveScroll, {
                        as: Y,
                        allowPinchZoom: !0,
                        children: (0, t.jsx)(N, {
                            ...e,
                            ref: u,
                            trapFocus: i.open,
                            disableOutsidePointerEvents: !0,
                            onCloseAutoFocus: (0, a.composeEventHandlers)(
                                e.onCloseAutoFocus,
                                (e) => {
                                    (e.preventDefault(),
                                        d.current ||
                                            i.triggerRef.current?.focus());
                                }
                            ),
                            onPointerDownOutside: (0, a.composeEventHandlers)(
                                e.onPointerDownOutside,
                                (e) => {
                                    let t = e.detail.originalEvent,
                                        n = 0 === t.button && !0 === t.ctrlKey;
                                    d.current = 2 === t.button || n;
                                },
                                { checkForDefaultPrevented: !1 }
                            ),
                            onFocusOutside: (0, a.composeEventHandlers)(
                                e.onFocusOutside,
                                (e) => e.preventDefault(),
                                { checkForDefaultPrevented: !1 }
                            ),
                        }),
                    })
                );
            }),
            z = n.forwardRef((e, a) => {
                let r = x(T, e.__scopePopover),
                    o = n.useRef(!1),
                    i = n.useRef(!1);
                return (0, t.jsx)(N, {
                    ...e,
                    ref: a,
                    trapFocus: !1,
                    disableOutsidePointerEvents: !1,
                    onCloseAutoFocus: (t) => {
                        (e.onCloseAutoFocus?.(t),
                            t.defaultPrevented ||
                                (o.current || r.triggerRef.current?.focus(),
                                t.preventDefault()),
                            (o.current = !1),
                            (i.current = !1));
                    },
                    onInteractOutside: (t) => {
                        (e.onInteractOutside?.(t),
                            t.defaultPrevented ||
                                ((o.current = !0),
                                'pointerdown' === t.detail.originalEvent.type &&
                                    (i.current = !0)));
                        let n = t.target;
                        (r.triggerRef.current?.contains(n) &&
                            t.preventDefault(),
                            'focusin' === t.detail.originalEvent.type &&
                                i.current &&
                                t.preventDefault());
                    },
                });
            }),
            N = n.forwardRef((e, n) => {
                let {
                        __scopePopover: a,
                        trapFocus: r,
                        onOpenAutoFocus: o,
                        onCloseAutoFocus: d,
                        disableOutsidePointerEvents: c,
                        onEscapeKeyDown: m,
                        onPointerDownOutside: h,
                        onFocusOutside: f,
                        onInteractOutside: g,
                        ...p
                    } = e,
                    b = x(T, a),
                    w = M(a);
                return (
                    (0, s.useFocusGuards)(),
                    (0, t.jsx)(u.FocusScope, {
                        asChild: !0,
                        loop: !0,
                        trapped: r,
                        onMountAutoFocus: o,
                        onUnmountAutoFocus: d,
                        children: (0, t.jsx)(i.DismissableLayer, {
                            asChild: !0,
                            disableOutsidePointerEvents: c,
                            onInteractOutside: g,
                            onEscapeKeyDown: m,
                            onPointerDownOutside: h,
                            onFocusOutside: f,
                            onDismiss: () => b.onOpenChange(!1),
                            children: (0, t.jsx)(l.Content, {
                                'data-state': A(b.open),
                                role: 'dialog',
                                id: b.contentId,
                                ...w,
                                ...p,
                                ref: n,
                                style: {
                                    ...p.style,
                                    '--radix-popover-content-transform-origin':
                                        'var(--radix-popper-transform-origin)',
                                    '--radix-popover-content-available-width':
                                        'var(--radix-popper-available-width)',
                                    '--radix-popover-content-available-height':
                                        'var(--radix-popper-available-height)',
                                    '--radix-popover-trigger-width':
                                        'var(--radix-popper-anchor-width)',
                                    '--radix-popover-trigger-height':
                                        'var(--radix-popper-anchor-height)',
                                },
                            }),
                        }),
                    })
                );
            }),
            E = 'PopoverClose';
        function A(e) {
            return e ? 'open' : 'closed';
        }
        ((n.forwardRef((e, n) => {
            let { __scopePopover: r, ...o } = e,
                i = x(E, r);
            return (0, t.jsx)(h.Primitive.button, {
                type: 'button',
                ...o,
                ref: n,
                onClick: (0, a.composeEventHandlers)(e.onClick, () =>
                    i.onOpenChange(!1)
                ),
            });
        }).displayName = E),
            (n.forwardRef((e, n) => {
                let { __scopePopover: a, ...r } = e,
                    o = M(a);
                return (0, t.jsx)(l.Arrow, { ...o, ...r, ref: n });
            }).displayName = 'PopoverArrow'));
        var L = e.i(975157);
        function R({ ...e }) {
            return (0, t.jsx)(k, { 'data-slot': 'popover', ...e });
        }
        function X({ ...e }) {
            return (0, t.jsx)(F, { 'data-slot': 'popover-trigger', ...e });
        }
        function I({
            className: e,
            align: n = 'center',
            sideOffset: a = 4,
            ...r
        }) {
            return (0, t.jsx)(O, {
                children: (0, t.jsx)(q, {
                    'data-slot': 'popover-content',
                    align: n,
                    sideOffset: a,
                    className: (0, L.cn)(
                        'bg-popover text-popover-foreground border border-border-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md p-4 shadow-md outline-hidden',
                        e
                    ),
                    ...r,
                }),
            });
        }
        e.s(
            [
                'Popover',
                () => R,
                'PopoverContent',
                () => I,
                'PopoverTrigger',
                () => X,
            ],
            337822
        );
    },
]);
