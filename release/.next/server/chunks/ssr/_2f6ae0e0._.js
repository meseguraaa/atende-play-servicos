module.exports = [
    382865,
    118489,
    208768,
    (a) => {
        'use strict';
        let b = Symbol.for('constructDateFrom');
        function c(a, c) {
            return 'function' == typeof a
                ? a(c)
                : a && 'object' == typeof a && b in a
                  ? a[b](c)
                  : a instanceof Date
                    ? new a.constructor(c)
                    : new Date(c);
        }
        function d(a, b) {
            return c(b || a, a);
        }
        (a.s(
            [
                'constructFromSymbol',
                0,
                b,
                'millisecondsInDay',
                0,
                864e5,
                'millisecondsInHour',
                0,
                36e5,
                'millisecondsInMinute',
                0,
                6e4,
                'millisecondsInSecond',
                0,
                1e3,
                'millisecondsInWeek',
                0,
                6048e5,
            ],
            118489
        ),
            a.s(['constructFrom', () => c], 208768),
            a.s(['toDate', () => d], 382865));
    },
    607957,
    (a) => {
        'use strict';
        var b = a.i(382865);
        function c(a, c) {
            let d = (0, b.toDate)(a, c?.in);
            return (d.setHours(0, 0, 0, 0), d);
        }
        a.s(['startOfDay', () => c]);
    },
    102688,
    280386,
    459611,
    24190,
    341039,
    (a) => {
        'use strict';
        let b = {
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
        function c(a) {
            return (b = {}) => {
                let c = b.width ? String(b.width) : a.defaultWidth;
                return a.formats[c] || a.formats[a.defaultWidth];
            };
        }
        a.s(['buildFormatLongFn', () => c], 280386);
        let d = {
                date: c({
                    formats: {
                        full: 'EEEE, MMMM do, y',
                        long: 'MMMM do, y',
                        medium: 'MMM d, y',
                        short: 'MM/dd/yyyy',
                    },
                    defaultWidth: 'full',
                }),
                time: c({
                    formats: {
                        full: 'h:mm:ss a zzzz',
                        long: 'h:mm:ss a z',
                        medium: 'h:mm:ss a',
                        short: 'h:mm a',
                    },
                    defaultWidth: 'full',
                }),
                dateTime: c({
                    formats: {
                        full: "{{date}} 'at' {{time}}",
                        long: "{{date}} 'at' {{time}}",
                        medium: '{{date}}, {{time}}',
                        short: '{{date}}, {{time}}',
                    },
                    defaultWidth: 'full',
                }),
            },
            e = {
                lastWeek: "'last' eeee 'at' p",
                yesterday: "'yesterday at' p",
                today: "'today at' p",
                tomorrow: "'tomorrow at' p",
                nextWeek: "eeee 'at' p",
                other: 'P',
            };
        function f(a) {
            return (b, c) => {
                let d;
                if (
                    'formatting' ===
                        (c?.context ? String(c.context) : 'standalone') &&
                    a.formattingValues
                ) {
                    let b = a.defaultFormattingWidth || a.defaultWidth,
                        e = c?.width ? String(c.width) : b;
                    d = a.formattingValues[e] || a.formattingValues[b];
                } else {
                    let b = a.defaultWidth,
                        e = c?.width ? String(c.width) : a.defaultWidth;
                    d = a.values[e] || a.values[b];
                }
                return d[a.argumentCallback ? a.argumentCallback(b) : b];
            };
        }
        a.s(['buildLocalizeFn', () => f], 459611);
        let g = {
            ordinalNumber: (a, b) => {
                let c = Number(a),
                    d = c % 100;
                if (d > 20 || d < 10)
                    switch (d % 10) {
                        case 1:
                            return c + 'st';
                        case 2:
                            return c + 'nd';
                        case 3:
                            return c + 'rd';
                    }
                return c + 'th';
            },
            era: f({
                values: {
                    narrow: ['B', 'A'],
                    abbreviated: ['BC', 'AD'],
                    wide: ['Before Christ', 'Anno Domini'],
                },
                defaultWidth: 'wide',
            }),
            quarter: f({
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
                argumentCallback: (a) => a - 1,
            }),
            month: f({
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
            day: f({
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
            dayPeriod: f({
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
        function h(a) {
            return (b, c = {}) => {
                let d,
                    e = c.width,
                    f =
                        (e && a.matchPatterns[e]) ||
                        a.matchPatterns[a.defaultMatchWidth],
                    g = b.match(f);
                if (!g) return null;
                let h = g[0],
                    i =
                        (e && a.parsePatterns[e]) ||
                        a.parsePatterns[a.defaultParseWidth],
                    j = Array.isArray(i)
                        ? (function (a, b) {
                              for (let c = 0; c < a.length; c++)
                                  if (b(a[c])) return c;
                          })(i, (a) => a.test(h))
                        : (function (a, b) {
                              for (let c in a)
                                  if (
                                      Object.prototype.hasOwnProperty.call(
                                          a,
                                          c
                                      ) &&
                                      b(a[c])
                                  )
                                      return c;
                          })(i, (a) => a.test(h));
                return (
                    (d = a.valueCallback ? a.valueCallback(j) : j),
                    {
                        value: (d = c.valueCallback ? c.valueCallback(d) : d),
                        rest: b.slice(h.length),
                    }
                );
            };
        }
        function i(a) {
            return (b, c = {}) => {
                let d = b.match(a.matchPattern);
                if (!d) return null;
                let e = d[0],
                    f = b.match(a.parsePattern);
                if (!f) return null;
                let g = a.valueCallback ? a.valueCallback(f[0]) : f[0];
                return {
                    value: (g = c.valueCallback ? c.valueCallback(g) : g),
                    rest: b.slice(e.length),
                };
            };
        }
        (a.s(['buildMatchFn', () => h], 24190),
            a.s(['buildMatchPatternFn', () => i], 341039));
        let j = {
            ordinalNumber: i({
                matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                parsePattern: /\d+/i,
                valueCallback: (a) => parseInt(a, 10),
            }),
            era: h({
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
            quarter: h({
                matchPatterns: {
                    narrow: /^[1234]/i,
                    abbreviated: /^q[1234]/i,
                    wide: /^[1234](th|st|nd|rd)? quarter/i,
                },
                defaultMatchWidth: 'wide',
                parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
                defaultParseWidth: 'any',
                valueCallback: (a) => a + 1,
            }),
            month: h({
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
            day: h({
                matchPatterns: {
                    narrow: /^[smtwf]/i,
                    short: /^(su|mo|tu|we|th|fr|sa)/i,
                    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
                    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
                },
                defaultMatchWidth: 'wide',
                parsePatterns: {
                    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
                    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
                },
                defaultParseWidth: 'any',
            }),
            dayPeriod: h({
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
        };
        a.s(
            [
                'defaultLocale',
                0,
                {
                    code: 'en-US',
                    formatDistance: (a, c, d) => {
                        let e,
                            f = b[a];
                        if (
                            ((e =
                                'string' == typeof f
                                    ? f
                                    : 1 === c
                                      ? f.one
                                      : f.other.replace(
                                            '{{count}}',
                                            c.toString()
                                        )),
                            d?.addSuffix)
                        )
                            if (d.comparison && d.comparison > 0)
                                return 'in ' + e;
                            else return e + ' ago';
                        return e;
                    },
                    formatLong: d,
                    formatRelative: (a, b, c, d) => e[a],
                    localize: g,
                    match: j,
                    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
                },
            ],
            102688
        );
    },
    26291,
    (a) => {
        'use strict';
        let b = {};
        function c() {
            return b;
        }
        a.s(['getDefaultOptions', () => c]);
    },
    359732,
    (a) => {
        'use strict';
        var b = a.i(382865);
        function c(a) {
            let c = (0, b.toDate)(a),
                d = new Date(
                    Date.UTC(
                        c.getFullYear(),
                        c.getMonth(),
                        c.getDate(),
                        c.getHours(),
                        c.getMinutes(),
                        c.getSeconds(),
                        c.getMilliseconds()
                    )
                );
            return (d.setUTCFullYear(c.getFullYear()), a - d);
        }
        a.s(['getTimezoneOffsetInMilliseconds', () => c]);
    },
    3124,
    (a) => {
        'use strict';
        var b = a.i(26291),
            c = a.i(382865);
        function d(a, d) {
            let e = (0, b.getDefaultOptions)(),
                f =
                    d?.weekStartsOn ??
                    d?.locale?.options?.weekStartsOn ??
                    e.weekStartsOn ??
                    e.locale?.options?.weekStartsOn ??
                    0,
                g = (0, c.toDate)(a, d?.in),
                h = g.getDay();
            return (
                g.setDate(g.getDate() - (7 * (h < f) + h - f)),
                g.setHours(0, 0, 0, 0),
                g
            );
        }
        a.s(['startOfWeek', () => d]);
    },
    137449,
    (a) => {
        'use strict';
        var b = a.i(3124);
        function c(a, c) {
            return (0, b.startOfWeek)(a, { ...c, weekStartsOn: 1 });
        }
        a.s(['startOfISOWeek', () => c]);
    },
    275153,
    925290,
    (a) => {
        'use strict';
        var b = a.i(118489),
            c = a.i(137449),
            d = a.i(208768),
            e = a.i(382865);
        function f(a, b) {
            let f = (0, e.toDate)(a, b?.in),
                g = f.getFullYear(),
                h = (0, d.constructFrom)(f, 0);
            (h.setFullYear(g + 1, 0, 4), h.setHours(0, 0, 0, 0));
            let i = (0, c.startOfISOWeek)(h),
                j = (0, d.constructFrom)(f, 0);
            (j.setFullYear(g, 0, 4), j.setHours(0, 0, 0, 0));
            let k = (0, c.startOfISOWeek)(j);
            return f.getTime() >= i.getTime()
                ? g + 1
                : f.getTime() >= k.getTime()
                  ? g
                  : g - 1;
        }
        function g(a, g) {
            let h,
                i,
                j = (0, e.toDate)(a, g?.in);
            return (
                Math.round(
                    ((0, c.startOfISOWeek)(j) -
                        ((h = f(j, void 0)),
                        (i = (0, d.constructFrom)(j, 0)).setFullYear(h, 0, 4),
                        i.setHours(0, 0, 0, 0),
                        (0, c.startOfISOWeek)(i))) /
                        b.millisecondsInWeek
                ) + 1
            );
        }
        (a.s(['getISOWeekYear', () => f], 925290),
            a.s(['getISOWeek', () => g], 275153));
    },
    221317,
    (a) => {
        'use strict';
        var b = a.i(26291),
            c = a.i(208768),
            d = a.i(3124),
            e = a.i(382865);
        function f(a, f) {
            let g = (0, e.toDate)(a, f?.in),
                h = g.getFullYear(),
                i = (0, b.getDefaultOptions)(),
                j =
                    f?.firstWeekContainsDate ??
                    f?.locale?.options?.firstWeekContainsDate ??
                    i.firstWeekContainsDate ??
                    i.locale?.options?.firstWeekContainsDate ??
                    1,
                k = (0, c.constructFrom)(f?.in || a, 0);
            (k.setFullYear(h + 1, 0, j), k.setHours(0, 0, 0, 0));
            let l = (0, d.startOfWeek)(k, f),
                m = (0, c.constructFrom)(f?.in || a, 0);
            (m.setFullYear(h, 0, j), m.setHours(0, 0, 0, 0));
            let n = (0, d.startOfWeek)(m, f);
            return +g >= +l ? h + 1 : +g >= +n ? h : h - 1;
        }
        a.s(['getWeekYear', () => f]);
    },
    146396,
    (a) => {
        'use strict';
        var b = a.i(118489),
            c = a.i(3124),
            d = a.i(26291),
            e = a.i(208768),
            f = a.i(221317),
            g = a.i(382865);
        function h(a, h) {
            let i,
                j,
                k,
                l,
                m = (0, g.toDate)(a, h?.in);
            return (
                Math.round(
                    ((0, c.startOfWeek)(m, h) -
                        ((i = (0, d.getDefaultOptions)()),
                        (j =
                            h?.firstWeekContainsDate ??
                            h?.locale?.options?.firstWeekContainsDate ??
                            i.firstWeekContainsDate ??
                            i.locale?.options?.firstWeekContainsDate ??
                            1),
                        (k = (0, f.getWeekYear)(m, h)),
                        (l = (0, e.constructFrom)(h?.in || m, 0)).setFullYear(
                            k,
                            0,
                            j
                        ),
                        l.setHours(0, 0, 0, 0),
                        (0, c.startOfWeek)(l, h))) /
                        b.millisecondsInWeek
                ) + 1
            );
        }
        a.s(['getWeek', () => h], 146396);
    },
    988479,
    896609,
    (a) => {
        'use strict';
        let b = (a, b) => {
                switch (a) {
                    case 'P':
                        return b.date({ width: 'short' });
                    case 'PP':
                        return b.date({ width: 'medium' });
                    case 'PPP':
                        return b.date({ width: 'long' });
                    default:
                        return b.date({ width: 'full' });
                }
            },
            c = (a, b) => {
                switch (a) {
                    case 'p':
                        return b.time({ width: 'short' });
                    case 'pp':
                        return b.time({ width: 'medium' });
                    case 'ppp':
                        return b.time({ width: 'long' });
                    default:
                        return b.time({ width: 'full' });
                }
            };
        a.s(
            [
                'longFormatters',
                0,
                {
                    p: c,
                    P: (a, d) => {
                        let e,
                            f = a.match(/(P+)(p+)?/) || [],
                            g = f[1],
                            h = f[2];
                        if (!h) return b(a, d);
                        switch (g) {
                            case 'P':
                                e = d.dateTime({ width: 'short' });
                                break;
                            case 'PP':
                                e = d.dateTime({ width: 'medium' });
                                break;
                            case 'PPP':
                                e = d.dateTime({ width: 'long' });
                                break;
                            default:
                                e = d.dateTime({ width: 'full' });
                        }
                        return e
                            .replace('{{date}}', b(g, d))
                            .replace('{{time}}', c(h, d));
                    },
                },
            ],
            988479
        );
        let d = /^D+$/,
            e = /^Y+$/,
            f = ['D', 'DD', 'YY', 'YYYY'];
        function g(a) {
            return d.test(a);
        }
        function h(a) {
            return e.test(a);
        }
        function i(a, b, c) {
            var d, e, g;
            let h,
                i =
                    ((d = a),
                    (e = b),
                    (g = c),
                    (h = 'Y' === d[0] ? 'years' : 'days of the month'),
                    `Use \`${d.toLowerCase()}\` instead of \`${d}\` (in \`${e}\`) for formatting ${h} to the input \`${g}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);
            if ((console.warn(i), f.includes(a))) throw RangeError(i);
        }
        a.s(
            [
                'isProtectedDayOfYearToken',
                () => g,
                'isProtectedWeekYearToken',
                () => h,
                'warnOrThrowProtectedError',
                () => i,
            ],
            896609
        );
    },
    28792,
    (a) => {
        'use strict';
        a.i(106878);
        var b = a.i(154840);
        a.i(330127);
        var c = a.i(766518),
            d = a.i(126918);
        a.i(110329);
        let e = {
            canAccessDashboard: !0,
            canAccessReports: !0,
            canAccessCheckout: !0,
            canAccessAppointments: !0,
            canAccessProfessionals: !0,
            canAccessServices: !0,
            canAccessReviews: !0,
            canAccessProducts: !0,
            canAccessPartners: !0,
            canAccessClients: !0,
            canAccessClientLevels: !0,
            canAccessFinance: !0,
            canAccessSettings: !0,
        };
        function f(a) {
            switch (a) {
                case 'DASHBOARD':
                    return 'canAccessDashboard';
                case 'REPORTS':
                    return 'canAccessReports';
                case 'CHECKOUT':
                    return 'canAccessCheckout';
                case 'APPOINTMENTS':
                    return 'canAccessAppointments';
                case 'PROFESSIONALS':
                    return 'canAccessProfessionals';
                case 'SERVICES':
                    return 'canAccessServices';
                case 'REVIEWS':
                    return 'canAccessReviews';
                case 'PRODUCTS':
                    return 'canAccessProducts';
                case 'PARTNERS':
                default:
                    return null;
                case 'CLIENTS':
                    return 'canAccessClients';
                case 'CLIENT_LEVELS':
                    return 'canAccessClientLevels';
                case 'FINANCE':
                    return 'canAccessFinance';
                case 'SETTINGS':
                    return 'canAccessSettings';
            }
        }
        async function g() {
            let a = await (0, d.getCurrentPainelUser)();
            if (!a) return { ok: !1, reason: 'no_session' };
            if ('ADMIN' !== a.role) return { ok: !1, reason: 'not_admin' };
            let b = String(a.sub || '').trim(),
                e = String(a.companyId || '').trim();
            if (!b || !e) return { ok: !1, reason: 'invalid_token' };
            let f = await c.prisma.user.findUnique({
                where: { id: b },
                select: { id: !0, name: !0, email: !0, isActive: !0 },
            });
            if (!f?.id || !f.isActive)
                return { ok: !1, reason: 'user_inactive' };
            let g = await c.prisma.companyMember.findFirst({
                where: {
                    userId: b,
                    companyId: e,
                    isActive: !0,
                    role: { in: ['OWNER', 'ADMIN'] },
                },
                select: { role: !0 },
            });
            if (!g?.role) return { ok: !1, reason: 'no_membership' };
            let h = 'OWNER' === g.role;
            if (!h) {
                let a = await c.prisma.adminAccess.findFirst({
                    where: { userId: b, companyId: e },
                    select: { id: !0 },
                });
                if (!a?.id) return { ok: !1, reason: 'no_access' };
            }
            return {
                ok: !0,
                ctx: {
                    id: f.id,
                    name: f.name ?? null,
                    email: f.email,
                    companyId: e,
                    isOwner: h,
                },
            };
        }
        let h = [
            { module: 'APPOINTMENTS', href: '/admin/appointments' },
            { module: 'CHECKOUT', href: '/admin/checkout' },
            { module: 'PROFESSIONALS', href: '/admin/professionals' },
            { module: 'SERVICES', href: '/admin/services' },
            { module: 'PRODUCTS', href: '/admin/products' },
            { module: 'CLIENTS', href: '/admin/clients' },
            { module: 'CLIENT_LEVELS', href: '/admin/client-levels' },
            { module: 'REVIEWS', href: '/admin/review-tags' },
            { module: 'REPORTS', href: '/admin/reports' },
            { module: 'FINANCE', href: '/admin/finance' },
            { module: 'SETTINGS', href: '/admin/setting' },
            { module: 'DASHBOARD', href: '/admin/dashboard' },
        ];
        async function i(a) {
            let d = (function (a) {
                if (!a) return null;
                for (let b of h) {
                    let c = f(b.module);
                    if (c && a[c]) return b.href;
                }
                return null;
            })(
                await c.prisma.adminAccess.findFirst({
                    where: { companyId: a.companyId, userId: a.userId },
                    select: e,
                })
            );
            if (d)
                throw (
                    (0, b.redirect)(`${d}?error=permissao`),
                    Error('unreachable')
                );
            throw (
                (0, b.redirect)('/painel/login?error=permissao'),
                Error('unreachable')
            );
        }
        async function j(a) {
            let d = await g();
            d.ok ||
                (function (a) {
                    switch (a) {
                        case 'no_session':
                            (0, b.redirect)('/painel/login?error=credenciais');
                        case 'not_admin':
                            (0, b.redirect)('/painel/login?error=permissao');
                        default:
                            (0, b.redirect)('/painel/login?error=permissao');
                    }
                })(d.reason);
            let h = d.ctx;
            if (h.isOwner) {
                if ('PARTNERS' === a)
                    throw (
                        await i({ companyId: h.companyId, userId: h.id }),
                        Error('unreachable')
                    );
                return {
                    id: h.id,
                    name: h.name,
                    email: h.email,
                    role: 'ADMIN',
                    isOwner: !0,
                    companyId: h.companyId,
                    unitId: null,
                    canSeeAllUnits: !0,
                };
            }
            let j = f(a);
            if (!j)
                throw (
                    await i({ companyId: h.companyId, userId: h.id }),
                    Error('unreachable')
                );
            let k = await c.prisma.adminAccess.findFirst({
                where: { userId: h.id, companyId: h.companyId },
                select: e,
            });
            if (!k || !k[j])
                throw (
                    await i({ companyId: h.companyId, userId: h.id }),
                    Error('unreachable')
                );
            return {
                id: h.id,
                name: h.name,
                email: h.email,
                role: 'ADMIN',
                isOwner: !1,
                companyId: h.companyId,
                unitId: null,
                canSeeAllUnits: !1,
            };
        }
        a.s(['requireAdminForModule', () => j]);
    },
    638904,
    18351,
    708111,
    (a) => {
        'use strict';
        let b, c, d;
        var e = a.i(623127),
            f = a.i(149919);
        function g(a, b) {
            if ('function' == typeof a) return a(b);
            null != a && (a.current = b);
        }
        var h = Symbol.for('react.lazy'),
            i = f[' use '.trim().toString()];
        function j(a) {
            var b;
            return (
                null != a &&
                'object' == typeof a &&
                '$$typeof' in a &&
                a.$$typeof === h &&
                '_payload' in a &&
                'object' == typeof (b = a._payload) &&
                null !== b &&
                'then' in b
            );
        }
        var k =
                (((d = f.forwardRef((a, b) => {
                    let { children: c, ...d } = a;
                    if (
                        (j(c) && 'function' == typeof i && (c = i(c._payload)),
                        f.isValidElement(c))
                    ) {
                        var e;
                        let a,
                            h,
                            i =
                                ((e = c),
                                (h =
                                    (a = Object.getOwnPropertyDescriptor(
                                        e.props,
                                        'ref'
                                    )?.get) &&
                                    'isReactWarning' in a &&
                                    a.isReactWarning)
                                    ? e.ref
                                    : (h =
                                            (a =
                                                Object.getOwnPropertyDescriptor(
                                                    e,
                                                    'ref'
                                                )?.get) &&
                                            'isReactWarning' in a &&
                                            a.isReactWarning)
                                      ? e.props.ref
                                      : e.props.ref || e.ref),
                            j = (function (a, b) {
                                let c = { ...b };
                                for (let d in b) {
                                    let e = a[d],
                                        f = b[d];
                                    /^on[A-Z]/.test(d)
                                        ? e && f
                                            ? (c[d] = (...a) => {
                                                  let b = f(...a);
                                                  return (e(...a), b);
                                              })
                                            : e && (c[d] = e)
                                        : 'style' === d
                                          ? (c[d] = { ...e, ...f })
                                          : 'className' === d &&
                                            (c[d] = [e, f]
                                                .filter(Boolean)
                                                .join(' '));
                                }
                                return { ...a, ...c };
                            })(d, c.props);
                        return (
                            c.type !== f.Fragment &&
                                (j.ref = b
                                    ? (function (...a) {
                                          return (b) => {
                                              let c = !1,
                                                  d = a.map((a) => {
                                                      let d = g(a, b);
                                                      return (
                                                          c ||
                                                              'function' !=
                                                                  typeof d ||
                                                              (c = !0),
                                                          d
                                                      );
                                                  });
                                              if (c)
                                                  return () => {
                                                      for (
                                                          let b = 0;
                                                          b < d.length;
                                                          b++
                                                      ) {
                                                          let c = d[b];
                                                          'function' == typeof c
                                                              ? c()
                                                              : g(a[b], null);
                                                      }
                                                  };
                                          };
                                      })(b, i)
                                    : i),
                            f.cloneElement(c, j)
                        );
                    }
                    return f.Children.count(c) > 1
                        ? f.Children.only(null)
                        : null;
                })).displayName = 'Slot.SlotClone'),
                (b = d),
                ((c = f.forwardRef((a, c) => {
                    let { children: d, ...g } = a;
                    j(d) && 'function' == typeof i && (d = i(d._payload));
                    let h = f.Children.toArray(d),
                        k = h.find(m);
                    if (k) {
                        let a = k.props.children,
                            d = h.map((b) =>
                                b !== k
                                    ? b
                                    : f.Children.count(a) > 1
                                      ? f.Children.only(null)
                                      : f.isValidElement(a)
                                        ? a.props.children
                                        : null
                            );
                        return (0, e.jsx)(b, {
                            ...g,
                            ref: c,
                            children: f.isValidElement(a)
                                ? f.cloneElement(a, void 0, d)
                                : null,
                        });
                    }
                    return (0, e.jsx)(b, { ...g, ref: c, children: d });
                })).displayName = 'Slot.Slot'),
                c),
            l = Symbol('radix.slottable');
        function m(a) {
            return (
                f.isValidElement(a) &&
                'function' == typeof a.type &&
                '__radixId' in a.type &&
                a.type.__radixId === l
            );
        }
        a.s(['Slot', () => k], 18351);
        var n = a.i(668962);
        let o = (a) => ('boolean' == typeof a ? `${a}` : 0 === a ? '0' : a),
            p = n.clsx,
            q = (a, b) => (c) => {
                var d;
                if ((null == b ? void 0 : b.variants) == null)
                    return p(
                        a,
                        null == c ? void 0 : c.class,
                        null == c ? void 0 : c.className
                    );
                let { variants: e, defaultVariants: f } = b,
                    g = Object.keys(e).map((a) => {
                        let b = null == c ? void 0 : c[a],
                            d = null == f ? void 0 : f[a];
                        if (null === b) return null;
                        let g = o(b) || o(d);
                        return e[a][g];
                    }),
                    h =
                        c &&
                        Object.entries(c).reduce((a, b) => {
                            let [c, d] = b;
                            return (void 0 === d || (a[c] = d), a);
                        }, {});
                return p(
                    a,
                    g,
                    null == b || null == (d = b.compoundVariants)
                        ? void 0
                        : d.reduce((a, b) => {
                              let { class: c, className: d, ...e } = b;
                              return Object.entries(e).every((a) => {
                                  let [b, c] = a;
                                  return Array.isArray(c)
                                      ? c.includes({ ...f, ...h }[b])
                                      : { ...f, ...h }[b] === c;
                              })
                                  ? [...a, c, d]
                                  : a;
                          }, []),
                    null == c ? void 0 : c.class,
                    null == c ? void 0 : c.className
                );
            };
        a.s(['cva', 0, q], 708111);
        var r = a.i(139138);
        let s = q(
            "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring no-underline hover:no-underline",
            {
                variants: {
                    variant: {
                        default:
                            'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                        brand: 'bg-background-brand font-bold text-label-large text-[#050505] hover:bg-background-highlights rounded-lg',
                        outline:
                            'border border-border-primary bg-background-tertiary text-content-primary hover:bg-background-secondary hover:border-border-secondary transition-colors font-medium',
                        destructive:
                            '!bg-red-600 !text-white hover:!bg-red-700 !border-transparent border transition-colors font-medium rounded-lg',
                        active: 'bg-green-600 text-white hover:bg-green-700 transition-colors font-medium',
                        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                        link: 'text-primary underline-offset-4 hover:underline',
                        remove: 'inline-flex items-center gap-2 rounded-md border border-red-500/50 px-3 py-1 text-sm text-red-500 transition-all hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                        edit: 'inline-flex items-center gap-2 rounded-md border border-blue-500/50 px-3 py-1 text-sm text-blue-500 transition-all hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                        edit2: 'bg-background-brand text-label-large text-[#ffffff] hover:bg-background-highlights rounded-lg',
                    },
                    size: {
                        default: 'h-12 px-4 py-3 has-[>svg]:px-3',
                        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                        lg: 'h-12 rounded-md px-6 has-[>svg]:px-4',
                        icon: 'size-9',
                    },
                },
                defaultVariants: { variant: 'default', size: 'default' },
            }
        );
        function t({
            className: a,
            variant: b,
            size: c,
            asChild: d = !1,
            ...f
        }) {
            return (0, e.jsx)(d ? k : 'button', {
                'data-slot': 'button',
                className: (0, r.cn)(s({ variant: b, size: c, className: a })),
                ...f,
            });
        }
        a.s(['Button', () => t, 'buttonVariants', () => s], 638904);
    },
    583376,
    (a, b, c) => {
        let { createClientModuleProxy: d } = a.r(976286);
        a.n(
            d(
                '[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js <module evaluation>'
            )
        );
    },
    777934,
    (a, b, c) => {
        let { createClientModuleProxy: d } = a.r(976286);
        a.n(
            d(
                '[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.28.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js'
            )
        );
    },
    766865,
    (a) => {
        'use strict';
        a.i(583376);
        var b = a.i(777934);
        a.n(b);
    },
    468695,
    (a, b, c) => {
        'use strict';
        Object.defineProperty(c, '__esModule', { value: !0 });
        var d = {
            default: function () {
                return i;
            },
            useLinkStatus: function () {
                return h.useLinkStatus;
            },
        };
        for (var e in d)
            Object.defineProperty(c, e, { enumerable: !0, get: d[e] });
        let f = a.r(254508),
            g = a.r(623127),
            h = f._(a.r(766865));
        function i(a) {
            let b = a.legacyBehavior,
                c =
                    'string' == typeof a.children ||
                    'number' == typeof a.children ||
                    'string' == typeof a.children?.type,
                d =
                    a.children?.type?.$$typeof ===
                    Symbol.for('react.client.reference');
            return (
                !b ||
                    c ||
                    d ||
                    (a.children?.type?.$$typeof === Symbol.for('react.lazy')
                        ? console.error(
                              "Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."
                          )
                        : console.error(
                              "Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag."
                          )),
                (0, g.jsx)(h.default, { ...a })
            );
        }
        ('function' == typeof c.default ||
            ('object' == typeof c.default && null !== c.default)) &&
            void 0 === c.default.__esModule &&
            (Object.defineProperty(c.default, '__esModule', { value: !0 }),
            Object.assign(c.default, c),
            (b.exports = c.default));
    },
];

//# sourceMappingURL=_2f6ae0e0._.js.map
