(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    17753,
    147259,
    17037,
    209497,
    (e) => {
        'use strict';
        var t = e.i(926991);
        e.s(['ChevronLeftIcon', () => t.default], 17753);
        var a = e.i(859502);
        (e.s(['ChevronRightIcon', () => a.default], 147259),
            Symbol.for('constructDateFrom'));
        let r = {},
            n = {};
        function o(e, t) {
            try {
                let a = (r[e] ||= new Intl.DateTimeFormat('en-US', {
                    timeZone: e,
                    timeZoneName: 'longOffset',
                }).format)(t).split('GMT')[1];
                if (a in n) return n[a];
                return s(a, a.split(':'));
            } catch {
                if (e in n) return n[e];
                let t = e?.match(i);
                if (t) return s(e, t.slice(1));
                return NaN;
            }
        }
        let i = /([+-]\d\d):?(\d\d)?/;
        function s(e, t) {
            let a = +(t[0] || 0),
                r = +(t[1] || 0),
                o = (t[2] || 0) / 60;
            return (n[e] = 60 * a + r > 0 ? 60 * a + r + o : 60 * a - r - o);
        }
        class l extends Date {
            constructor(...e) {
                (super(),
                    e.length > 1 &&
                        'string' == typeof e[e.length - 1] &&
                        (this.timeZone = e.pop()),
                    (this.internal = new Date()),
                    isNaN(o(this.timeZone, this))
                        ? this.setTime(NaN)
                        : e.length
                          ? 'number' == typeof e[0] &&
                            (1 === e.length ||
                                (2 === e.length && 'number' != typeof e[1]))
                              ? this.setTime(e[0])
                              : 'string' == typeof e[0]
                                ? this.setTime(+new Date(e[0]))
                                : e[0] instanceof Date
                                  ? this.setTime(+e[0])
                                  : (this.setTime(+new Date(...e)),
                                    f(this, NaN),
                                    u(this))
                          : this.setTime(Date.now()));
            }
            static tz(e, ...t) {
                return t.length ? new l(...t, e) : new l(Date.now(), e);
            }
            withTimeZone(e) {
                return new l(+this, e);
            }
            getTimezoneOffset() {
                let e = -o(this.timeZone, this);
                return e > 0 ? Math.floor(e) : Math.ceil(e);
            }
            setTime(e) {
                return (
                    Date.prototype.setTime.apply(this, arguments),
                    u(this),
                    +this
                );
            }
            [Symbol.for('constructDateFrom')](e) {
                return new l(+new Date(e), this.timeZone);
            }
        }
        let d = /^(get|set)(?!UTC)/;
        function u(e) {
            (e.internal.setTime(+e),
                e.internal.setUTCSeconds(
                    e.internal.getUTCSeconds() -
                        Math.round(-(60 * o(e.timeZone, e)))
                ));
        }
        function f(e) {
            let t = o(e.timeZone, e),
                a = t > 0 ? Math.floor(t) : Math.ceil(t),
                r = new Date(+e);
            r.setUTCHours(r.getUTCHours() - 1);
            let n = -new Date(+e).getTimezoneOffset(),
                i = n - -new Date(+r).getTimezoneOffset(),
                s =
                    Date.prototype.getHours.apply(e) !==
                    e.internal.getUTCHours();
            i && s && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
            let l = n - a;
            l &&
                Date.prototype.setUTCMinutes.call(
                    e,
                    Date.prototype.getUTCMinutes.call(e) + l
                );
            let d = new Date(+e);
            d.setUTCSeconds(0);
            let u = n > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60,
                f = Math.round(-(60 * o(e.timeZone, e))) % 60;
            (f || u) &&
                (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + f),
                Date.prototype.setUTCSeconds.call(
                    e,
                    Date.prototype.getUTCSeconds.call(e) + f + u
                ));
            let c = o(e.timeZone, e),
                h = c > 0 ? Math.floor(c) : Math.ceil(c),
                m = -new Date(+e).getTimezoneOffset() - h - l;
            if (h !== a && m) {
                Date.prototype.setUTCMinutes.call(
                    e,
                    Date.prototype.getUTCMinutes.call(e) + m
                );
                let t = o(e.timeZone, e),
                    a = h - (t > 0 ? Math.floor(t) : Math.ceil(t));
                a &&
                    (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a),
                    Date.prototype.setUTCMinutes.call(
                        e,
                        Date.prototype.getUTCMinutes.call(e) + a
                    ));
            }
        }
        Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
            if (!d.test(e)) return;
            let t = e.replace(d, '$1UTC');
            l.prototype[t] &&
                (e.startsWith('get')
                    ? (l.prototype[e] = function () {
                          return this.internal[t]();
                      })
                    : ((l.prototype[e] = function () {
                          var e;
                          return (
                              Date.prototype[t].apply(this.internal, arguments),
                              (e = this),
                              Date.prototype.setFullYear.call(
                                  e,
                                  e.internal.getUTCFullYear(),
                                  e.internal.getUTCMonth(),
                                  e.internal.getUTCDate()
                              ),
                              Date.prototype.setHours.call(
                                  e,
                                  e.internal.getUTCHours(),
                                  e.internal.getUTCMinutes(),
                                  e.internal.getUTCSeconds(),
                                  e.internal.getUTCMilliseconds()
                              ),
                              f(e),
                              +this
                          );
                      }),
                      (l.prototype[t] = function () {
                          return (
                              Date.prototype[t].apply(this, arguments),
                              u(this),
                              +this
                          );
                      })));
        });
        class c extends l {
            static tz(e, ...t) {
                return t.length ? new c(...t, e) : new c(Date.now(), e);
            }
            toISOString() {
                let [e, t, a] = this.tzComponents(),
                    r = `${e}${t}:${a}`;
                return this.internal.toISOString().slice(0, -1) + r;
            }
            toString() {
                return `${this.toDateString()} ${this.toTimeString()}`;
            }
            toDateString() {
                let [e, t, a, r] = this.internal.toUTCString().split(' ');
                return `${e?.slice(0, -1)} ${a} ${t} ${r}`;
            }
            toTimeString() {
                let e = this.internal.toUTCString().split(' ')[4],
                    [t, a, r] = this.tzComponents();
                return `${e} GMT${t}${a}${r} (${(function (e, t, a = 'long') {
                    return new Intl.DateTimeFormat('en-US', {
                        hour: 'numeric',
                        timeZone: e,
                        timeZoneName: a,
                    })
                        .format(t)
                        .split(/\s/g)
                        .slice(2)
                        .join(' ');
                })(this.timeZone, this)})`;
            }
            toLocaleString(e, t) {
                return Date.prototype.toLocaleString.call(this, e, {
                    ...t,
                    timeZone: t?.timeZone || this.timeZone,
                });
            }
            toLocaleDateString(e, t) {
                return Date.prototype.toLocaleDateString.call(this, e, {
                    ...t,
                    timeZone: t?.timeZone || this.timeZone,
                });
            }
            toLocaleTimeString(e, t) {
                return Date.prototype.toLocaleTimeString.call(this, e, {
                    ...t,
                    timeZone: t?.timeZone || this.timeZone,
                });
            }
            tzComponents() {
                let e = this.getTimezoneOffset(),
                    t = String(Math.floor(Math.abs(e) / 60)).padStart(2, '0'),
                    a = String(Math.abs(e) % 60).padStart(2, '0');
                return [e > 0 ? '-' : '+', t, a];
            }
            withTimeZone(e) {
                return new c(+this, e);
            }
            [Symbol.for('constructDateFrom')](e) {
                return new c(+new Date(e), this.timeZone);
            }
        }
        (e.s(['TZDate', () => c], 17037), e.s([], 209497));
    },
    598279,
    (e) => {
        'use strict';
        var t = e.i(487122),
            a = e.i(516467);
        function r(e, r, n) {
            let o = (0, a.toDate)(e, n?.in);
            return isNaN(r)
                ? (0, t.constructFrom)(n?.in || e, NaN)
                : (r && o.setDate(o.getDate() + r), o);
        }
        e.s(['addDays', () => r]);
    },
    227766,
    (e) => {
        'use strict';
        var t,
            a,
            r,
            n,
            o,
            i,
            s,
            l,
            d,
            u,
            f = e.i(565750),
            c = e.i(990341),
            h = e.i(599357),
            m = e.i(17753),
            p = e.i(147259);
        e.i(209497);
        var y = e.i(17037),
            b = e.i(598279),
            v = e.i(495794),
            g = e.i(870429),
            D = e.i(539392);
        function k(e, t, a) {
            let [r, n] = (0, D.normalizeDates)(a?.in, e, t);
            return (
                12 * (r.getFullYear() - n.getFullYear()) +
                (r.getMonth() - n.getMonth())
            );
        }
        function w(e, t) {
            let [a, r] = (0, D.normalizeDates)(e, t.start, t.end);
            return { start: a, end: r };
        }
        var M = e.i(487122),
            N = e.i(492421),
            W = e.i(516467);
        function C(e, t) {
            let a = (0, N.getDefaultOptions)(),
                r =
                    t?.weekStartsOn ??
                    t?.locale?.options?.weekStartsOn ??
                    a.weekStartsOn ??
                    a.locale?.options?.weekStartsOn ??
                    0,
                n = (0, W.toDate)(e, t?.in),
                o = n.getDay();
            return (
                n.setDate(n.getDate() + ((o < r ? -7 : 0) + 6 - (o - r))),
                n.setHours(23, 59, 59, 999),
                n
            );
        }
        var O = e.i(230902),
            S = e.i(669352),
            x = e.i(44318),
            T = e.i(966625),
            _ = e.i(738416),
            E = e.i(234867),
            Y = e.i(432286),
            L = e.i(954259),
            I = e.i(921127);
        function F(e, t) {
            let a = t.startOfMonth(e),
                r = a.getDay();
            return 1 === r
                ? a
                : 0 === r
                  ? t.addDays(a, -6)
                  : t.addDays(a, -1 * (r - 1));
        }
        var Z = e.i(244874);
        let B = {
            ...Z.enUS,
            labels: {
                labelDayButton: (e, t, a, r) => {
                    let n = (
                        r && 'function' == typeof r.format
                            ? r.format.bind(r)
                            : (e, t) =>
                                  (0, O.format)(e, t, { locale: Z.enUS, ...a })
                    )(e, 'PPPP');
                    return (
                        t.today && (n = `Today, ${n}`),
                        t.selected && (n = `${n}, selected`),
                        n
                    );
                },
                labelMonthDropdown: 'Choose the Month',
                labelNext: 'Go to the Next Month',
                labelPrevious: 'Go to the Previous Month',
                labelWeekNumber: (e) => `Week ${e}`,
                labelYearDropdown: 'Choose the Year',
                labelGrid: (e, t, a) =>
                    (a && 'function' == typeof a.format
                        ? a.format.bind(a)
                        : (e, a) =>
                              (0, O.format)(e, a, { locale: Z.enUS, ...t }))(
                        e,
                        'LLLL yyyy'
                    ),
                labelGridcell: (e, t, a, r) => {
                    let n = (
                        r && 'function' == typeof r.format
                            ? r.format.bind(r)
                            : (e, t) =>
                                  (0, O.format)(e, t, { locale: Z.enUS, ...a })
                    )(e, 'PPPP');
                    return (t?.today && (n = `Today, ${n}`), n);
                },
                labelNav: 'Navigation bar',
                labelWeekNumberHeader: 'Week Number',
                labelWeekday: (e, t, a) =>
                    (a && 'function' == typeof a.format
                        ? a.format.bind(a)
                        : (e, a) =>
                              (0, O.format)(e, a, { locale: Z.enUS, ...t }))(
                        e,
                        'cccc'
                    ),
            },
        };
        class P {
            constructor(e, t) {
                ((this.Date = Date),
                    (this.today = () =>
                        this.overrides?.today
                            ? this.overrides.today()
                            : this.options.timeZone
                              ? y.TZDate.tz(this.options.timeZone)
                              : new this.Date()),
                    (this.newDate = (e, t, a) =>
                        this.overrides?.newDate
                            ? this.overrides.newDate(e, t, a)
                            : this.options.timeZone
                              ? new y.TZDate(e, t, a, this.options.timeZone)
                              : new Date(e, t, a)),
                    (this.addDays = (e, t) =>
                        this.overrides?.addDays
                            ? this.overrides.addDays(e, t)
                            : (0, b.addDays)(e, t)),
                    (this.addMonths = (e, t) =>
                        this.overrides?.addMonths
                            ? this.overrides.addMonths(e, t)
                            : (0, v.addMonths)(e, t)),
                    (this.addWeeks = (e, t) =>
                        this.overrides?.addWeeks
                            ? this.overrides.addWeeks(e, t)
                            : (0, b.addDays)(e, 7 * t, void 0)),
                    (this.addYears = (e, t) =>
                        this.overrides?.addYears
                            ? this.overrides.addYears(e, t)
                            : (0, v.addMonths)(e, 12 * t, void 0)),
                    (this.differenceInCalendarDays = (e, t) =>
                        this.overrides?.differenceInCalendarDays
                            ? this.overrides.differenceInCalendarDays(e, t)
                            : (0, g.differenceInCalendarDays)(e, t)),
                    (this.differenceInCalendarMonths = (e, t) =>
                        this.overrides?.differenceInCalendarMonths
                            ? this.overrides.differenceInCalendarMonths(e, t)
                            : k(e, t)),
                    (this.eachMonthOfInterval = (e) =>
                        this.overrides?.eachMonthOfInterval
                            ? this.overrides.eachMonthOfInterval(e)
                            : (function (e, t) {
                                  let { start: a, end: r } = w(void 0, e),
                                      n = +a > +r,
                                      o = n ? +a : +r,
                                      i = n ? r : a;
                                  (i.setHours(0, 0, 0, 0), i.setDate(1));
                                  let s = void 0 ?? 1;
                                  if (!s) return [];
                                  s < 0 && ((s = -s), (n = !n));
                                  let l = [];
                                  for (; +i <= o; )
                                      (l.push((0, M.constructFrom)(a, i)),
                                          i.setMonth(i.getMonth() + s));
                                  return n ? l.reverse() : l;
                              })(e)),
                    (this.eachYearOfInterval = (e) => {
                        let t = this.overrides?.eachYearOfInterval
                                ? this.overrides.eachYearOfInterval(e)
                                : (function (e, t) {
                                      let { start: a, end: r } = w(void 0, e),
                                          n = +a > +r,
                                          o = n ? +a : +r,
                                          i = n ? r : a;
                                      (i.setHours(0, 0, 0, 0),
                                          i.setMonth(0, 1));
                                      let s = void 0 ?? 1;
                                      if (!s) return [];
                                      s < 0 && ((s = -s), (n = !n));
                                      let l = [];
                                      for (; +i <= o; )
                                          (l.push((0, M.constructFrom)(a, i)),
                                              i.setFullYear(
                                                  i.getFullYear() + s
                                              ));
                                      return n ? l.reverse() : l;
                                  })(e),
                            a = new Set(t.map((e) => this.getYear(e)));
                        if (a.size === t.length) return t;
                        let r = [];
                        return (
                            a.forEach((e) => {
                                r.push(new Date(e, 0, 1));
                            }),
                            r
                        );
                    }),
                    (this.endOfBroadcastWeek = (e) => {
                        let t, a, r, n, o, i;
                        return this.overrides?.endOfBroadcastWeek
                            ? this.overrides.endOfBroadcastWeek(e)
                            : ((t = F(e, this)),
                              (r =
                                  (a = this.startOfMonth(e)).getDay() > 0
                                      ? a.getDay()
                                      : 7),
                              (n = this.addDays(e, -r + 1)),
                              (o = this.addDays(n, 34)),
                              (i =
                                  this.getMonth(e) === this.getMonth(o)
                                      ? 5
                                      : 4),
                              this.addDays(t, 7 * i - 1));
                    }),
                    (this.endOfISOWeek = (e) =>
                        this.overrides?.endOfISOWeek
                            ? this.overrides.endOfISOWeek(e)
                            : C(e, { ...void 0, weekStartsOn: 1 })),
                    (this.endOfMonth = (e) => {
                        let t, a;
                        return this.overrides?.endOfMonth
                            ? this.overrides.endOfMonth(e)
                            : ((a = (t = (0, W.toDate)(e, void 0)).getMonth()),
                              t.setFullYear(t.getFullYear(), a + 1, 0),
                              t.setHours(23, 59, 59, 999),
                              t);
                    }),
                    (this.endOfWeek = (e, t) =>
                        this.overrides?.endOfWeek
                            ? this.overrides.endOfWeek(e, t)
                            : C(e, this.options)),
                    (this.endOfYear = (e) => {
                        let t, a;
                        return this.overrides?.endOfYear
                            ? this.overrides.endOfYear(e)
                            : ((a = (t = (0, W.toDate)(
                                  e,
                                  void 0
                              )).getFullYear()),
                              t.setFullYear(a + 1, 0, 0),
                              t.setHours(23, 59, 59, 999),
                              t);
                    }),
                    (this.format = (e, t, a) => {
                        let r = this.overrides?.format
                            ? this.overrides.format(e, t, this.options)
                            : (0, O.format)(e, t, this.options);
                        return this.options.numerals &&
                            'latn' !== this.options.numerals
                            ? this.replaceDigits(r)
                            : r;
                    }),
                    (this.getISOWeek = (e) =>
                        this.overrides?.getISOWeek
                            ? this.overrides.getISOWeek(e)
                            : (0, S.getISOWeek)(e)),
                    (this.getMonth = (e, t) => {
                        var a;
                        return this.overrides?.getMonth
                            ? this.overrides.getMonth(e, this.options)
                            : ((a = this.options),
                              (0, W.toDate)(e, a?.in).getMonth());
                    }),
                    (this.getYear = (e, t) => {
                        var a;
                        return this.overrides?.getYear
                            ? this.overrides.getYear(e, this.options)
                            : ((a = this.options),
                              (0, W.toDate)(e, a?.in).getFullYear());
                    }),
                    (this.getWeek = (e, t) =>
                        this.overrides?.getWeek
                            ? this.overrides.getWeek(e, this.options)
                            : (0, x.getWeek)(e, this.options)),
                    (this.isAfter = (e, t) =>
                        this.overrides?.isAfter
                            ? this.overrides.isAfter(e, t)
                            : +(0, W.toDate)(e) > +(0, W.toDate)(t)),
                    (this.isBefore = (e, t) =>
                        this.overrides?.isBefore
                            ? this.overrides.isBefore(e, t)
                            : +(0, W.toDate)(e) < +(0, W.toDate)(t)),
                    (this.isDate = (e) =>
                        this.overrides?.isDate
                            ? this.overrides.isDate(e)
                            : (0, T.isDate)(e)),
                    (this.isSameDay = (e, t) =>
                        this.overrides?.isSameDay
                            ? this.overrides.isSameDay(e, t)
                            : (function (e, t, a) {
                                  let [r, n] = (0, D.normalizeDates)(
                                      void 0,
                                      e,
                                      t
                                  );
                                  return (
                                      +(0, _.startOfDay)(r) ==
                                      +(0, _.startOfDay)(n)
                                  );
                              })(e, t)),
                    (this.isSameMonth = (e, t) =>
                        this.overrides?.isSameMonth
                            ? this.overrides.isSameMonth(e, t)
                            : (function (e, t, a) {
                                  let [r, n] = (0, D.normalizeDates)(
                                      void 0,
                                      e,
                                      t
                                  );
                                  return (
                                      r.getFullYear() === n.getFullYear() &&
                                      r.getMonth() === n.getMonth()
                                  );
                              })(e, t)),
                    (this.isSameYear = (e, t) =>
                        this.overrides?.isSameYear
                            ? this.overrides.isSameYear(e, t)
                            : (function (e, t, a) {
                                  let [r, n] = (0, D.normalizeDates)(
                                      void 0,
                                      e,
                                      t
                                  );
                                  return r.getFullYear() === n.getFullYear();
                              })(e, t)),
                    (this.max = (e) => {
                        let t, a;
                        return this.overrides?.max
                            ? this.overrides.max(e)
                            : ((a = void 0),
                              e.forEach((e) => {
                                  a ||
                                      'object' != typeof e ||
                                      (a = M.constructFrom.bind(null, e));
                                  let r = (0, W.toDate)(e, a);
                                  (!t || t < r || isNaN(+r)) && (t = r);
                              }),
                              (0, M.constructFrom)(a, t || NaN));
                    }),
                    (this.min = (e) => {
                        let t, a;
                        return this.overrides?.min
                            ? this.overrides.min(e)
                            : ((a = void 0),
                              e.forEach((e) => {
                                  a ||
                                      'object' != typeof e ||
                                      (a = M.constructFrom.bind(null, e));
                                  let r = (0, W.toDate)(e, a);
                                  (!t || t > r || isNaN(+r)) && (t = r);
                              }),
                              (0, M.constructFrom)(a, t || NaN));
                    }),
                    (this.setMonth = (e, t) => {
                        let a, r, n, o, i, s, l, d, u;
                        return this.overrides?.setMonth
                            ? this.overrides.setMonth(e, t)
                            : ((r = (a = (0, W.toDate)(
                                  e,
                                  void 0
                              )).getFullYear()),
                              (n = a.getDate()),
                              (o = (0, M.constructFrom)(e, 0)).setFullYear(
                                  r,
                                  t,
                                  15
                              ),
                              o.setHours(0, 0, 0, 0),
                              (s = (i = (0, W.toDate)(
                                  o,
                                  void 0
                              )).getFullYear()),
                              (l = i.getMonth()),
                              (d = (0, M.constructFrom)(i, 0)).setFullYear(
                                  s,
                                  l + 1,
                                  0
                              ),
                              d.setHours(0, 0, 0, 0),
                              (u = d.getDate()),
                              a.setMonth(t, Math.min(n, u)),
                              a);
                    }),
                    (this.setYear = (e, t) => {
                        let a;
                        return this.overrides?.setYear
                            ? this.overrides.setYear(e, t)
                            : isNaN(+(a = (0, W.toDate)(e, void 0)))
                              ? (0, M.constructFrom)(e, NaN)
                              : (a.setFullYear(t), a);
                    }),
                    (this.startOfBroadcastWeek = (e, t) =>
                        this.overrides?.startOfBroadcastWeek
                            ? this.overrides.startOfBroadcastWeek(e, this)
                            : F(e, this)),
                    (this.startOfDay = (e) =>
                        this.overrides?.startOfDay
                            ? this.overrides.startOfDay(e)
                            : (0, _.startOfDay)(e)),
                    (this.startOfISOWeek = (e) =>
                        this.overrides?.startOfISOWeek
                            ? this.overrides.startOfISOWeek(e)
                            : (0, E.startOfISOWeek)(e)),
                    (this.startOfMonth = (e) =>
                        this.overrides?.startOfMonth
                            ? this.overrides.startOfMonth(e)
                            : (0, Y.startOfMonth)(e)),
                    (this.startOfWeek = (e, t) =>
                        this.overrides?.startOfWeek
                            ? this.overrides.startOfWeek(e, this.options)
                            : (0, L.startOfWeek)(e, this.options)),
                    (this.startOfYear = (e) =>
                        this.overrides?.startOfYear
                            ? this.overrides.startOfYear(e)
                            : (0, I.startOfYear)(e)),
                    (this.options = { locale: B, ...e }),
                    (this.overrides = t));
            }
            getDigitMap() {
                let { numerals: e = 'latn' } = this.options,
                    t = new Intl.NumberFormat('en-US', { numberingSystem: e }),
                    a = {};
                for (let e = 0; e < 10; e++) a[e.toString()] = t.format(e);
                return a;
            }
            replaceDigits(e) {
                let t = this.getDigitMap();
                return e.replace(/\d/g, (e) => t[e] || e);
            }
            formatNumber(e) {
                return this.replaceDigits(e.toString());
            }
            getMonthYearOrder() {
                let e = this.options.locale?.code;
                return e && P.yearFirstLocales.has(e)
                    ? 'year-first'
                    : 'month-first';
            }
            formatMonthYear(e) {
                let { locale: t, timeZone: a, numerals: r } = this.options,
                    n = t?.code;
                if (n && P.yearFirstLocales.has(n))
                    try {
                        return new Intl.DateTimeFormat(n, {
                            month: 'long',
                            year: 'numeric',
                            timeZone: a,
                            numberingSystem: r,
                        }).format(e);
                    } catch {}
                let o =
                    'year-first' === this.getMonthYearOrder()
                        ? 'y LLLL'
                        : 'LLLL y';
                return this.format(e, o);
            }
        }
        P.yearFirstLocales = new Set([
            'eu',
            'hu',
            'ja',
            'ja-Hira',
            'ja-JP',
            'ko',
            'ko-KR',
            'lt',
            'lt-LT',
            'lv',
            'lv-LV',
            'mn',
            'mn-MN',
            'zh',
            'zh-CN',
            'zh-HK',
            'zh-TW',
        ]);
        let z = new P();
        function U(e, t, a = !1, r = z) {
            let { from: n, to: o } = e,
                { differenceInCalendarDays: i, isSameDay: s } = r;
            return n && o
                ? (0 > i(o, n) && ([n, o] = [o, n]),
                  i(t, n) >= +!!a && i(o, t) >= +!!a)
                : !a && o
                  ? s(o, t)
                  : !a && !!n && s(n, t);
        }
        function H(e) {
            return !!(
                e &&
                'object' == typeof e &&
                'before' in e &&
                'after' in e
            );
        }
        function j(e) {
            return !!(e && 'object' == typeof e && 'from' in e);
        }
        function A(e) {
            return !!(e && 'object' == typeof e && 'after' in e);
        }
        function $(e) {
            return !!(e && 'object' == typeof e && 'before' in e);
        }
        function G(e) {
            return !!(e && 'object' == typeof e && 'dayOfWeek' in e);
        }
        function R(e, t) {
            return Array.isArray(e) && e.every(t.isDate);
        }
        function q(e, t, a = z) {
            let r = Array.isArray(t) ? t : [t],
                { isSameDay: n, differenceInCalendarDays: o, isAfter: i } = a;
            return r.some((t) => {
                if ('boolean' == typeof t) return t;
                if (a.isDate(t)) return n(e, t);
                if (R(t, a)) return t.some((t) => n(e, t));
                if (j(t)) return U(t, e, !1, a);
                if (G(t))
                    return Array.isArray(t.dayOfWeek)
                        ? t.dayOfWeek.includes(e.getDay())
                        : t.dayOfWeek === e.getDay();
                if (H(t)) {
                    let a = o(t.before, e),
                        r = o(t.after, e),
                        n = a > 0,
                        s = r < 0;
                    return i(t.before, t.after) ? s && n : n || s;
                }
                return A(t)
                    ? o(e, t.after) > 0
                    : $(t)
                      ? o(t.before, e) > 0
                      : 'function' == typeof t && t(e);
            });
        }
        function K(e) {
            return c.default.createElement('button', { ...e });
        }
        function V(e) {
            return c.default.createElement('span', { ...e });
        }
        function J(e) {
            let { size: t = 24, orientation: a = 'left', className: r } = e;
            return c.default.createElement(
                'svg',
                { className: r, width: t, height: t, viewBox: '0 0 24 24' },
                'up' === a &&
                    c.default.createElement('polygon', {
                        points: '6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28',
                    }),
                'down' === a &&
                    c.default.createElement('polygon', {
                        points: '6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72',
                    }),
                'left' === a &&
                    c.default.createElement('polygon', {
                        points: '16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20',
                    }),
                'right' === a &&
                    c.default.createElement('polygon', {
                        points: '8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20',
                    })
            );
        }
        function Q(e) {
            let { day: t, modifiers: a, ...r } = e;
            return c.default.createElement('td', { ...r });
        }
        function X(e) {
            let { day: t, modifiers: a, ...r } = e,
                n = c.default.useRef(null);
            return (
                c.default.useEffect(() => {
                    a.focused && n.current?.focus();
                }, [a.focused]),
                c.default.createElement('button', { ref: n, ...r })
            );
        }
        function ee(e) {
            let {
                    options: t,
                    className: a,
                    components: r,
                    classNames: n,
                    ...o
                } = e,
                s = [n[i.Dropdown], a].join(' '),
                l = t?.find(({ value: e }) => e === o.value);
            return c.default.createElement(
                'span',
                { 'data-disabled': o.disabled, className: n[i.DropdownRoot] },
                c.default.createElement(
                    r.Select,
                    { className: s, ...o },
                    t?.map(({ value: e, label: t, disabled: a }) =>
                        c.default.createElement(
                            r.Option,
                            { key: e, value: e, disabled: a },
                            t
                        )
                    )
                ),
                c.default.createElement(
                    'span',
                    { className: n[i.CaptionLabel], 'aria-hidden': !0 },
                    l?.label,
                    c.default.createElement(r.Chevron, {
                        orientation: 'down',
                        size: 18,
                        className: n[i.Chevron],
                    })
                )
            );
        }
        function et(e) {
            return c.default.createElement('div', { ...e });
        }
        function ea(e) {
            return c.default.createElement('div', { ...e });
        }
        function er(e) {
            let { calendarMonth: t, displayIndex: a, ...r } = e;
            return c.default.createElement('div', { ...r }, e.children);
        }
        function en(e) {
            let { calendarMonth: t, displayIndex: a, ...r } = e;
            return c.default.createElement('div', { ...r });
        }
        function eo(e) {
            return c.default.createElement('table', { ...e });
        }
        function ei(e) {
            return c.default.createElement('div', { ...e });
        }
        (((t = i || (i = {})).Root = 'root'),
            (t.Chevron = 'chevron'),
            (t.Day = 'day'),
            (t.DayButton = 'day_button'),
            (t.CaptionLabel = 'caption_label'),
            (t.Dropdowns = 'dropdowns'),
            (t.Dropdown = 'dropdown'),
            (t.DropdownRoot = 'dropdown_root'),
            (t.Footer = 'footer'),
            (t.MonthGrid = 'month_grid'),
            (t.MonthCaption = 'month_caption'),
            (t.MonthsDropdown = 'months_dropdown'),
            (t.Month = 'month'),
            (t.Months = 'months'),
            (t.Nav = 'nav'),
            (t.NextMonthButton = 'button_next'),
            (t.PreviousMonthButton = 'button_previous'),
            (t.Week = 'week'),
            (t.Weeks = 'weeks'),
            (t.Weekday = 'weekday'),
            (t.Weekdays = 'weekdays'),
            (t.WeekNumber = 'week_number'),
            (t.WeekNumberHeader = 'week_number_header'),
            (t.YearsDropdown = 'years_dropdown'),
            ((a = s || (s = {})).disabled = 'disabled'),
            (a.hidden = 'hidden'),
            (a.outside = 'outside'),
            (a.focused = 'focused'),
            (a.today = 'today'),
            ((r = l || (l = {})).range_end = 'range_end'),
            (r.range_middle = 'range_middle'),
            (r.range_start = 'range_start'),
            (r.selected = 'selected'),
            ((n = d || (d = {})).weeks_before_enter = 'weeks_before_enter'),
            (n.weeks_before_exit = 'weeks_before_exit'),
            (n.weeks_after_enter = 'weeks_after_enter'),
            (n.weeks_after_exit = 'weeks_after_exit'),
            (n.caption_after_enter = 'caption_after_enter'),
            (n.caption_after_exit = 'caption_after_exit'),
            (n.caption_before_enter = 'caption_before_enter'),
            (n.caption_before_exit = 'caption_before_exit'),
            e.s([], 782355),
            e.i(782355),
            e.s(['Button', () => K], 721472),
            e.i(721472),
            e.s(['CaptionLabel', () => V], 129364),
            e.i(129364),
            e.s(['Chevron', () => J], 759099),
            e.i(759099),
            e.s(['Day', () => Q], 439589),
            e.i(439589),
            e.s(['DayButton', () => X], 689147),
            e.i(689147),
            e.s(['Dropdown', () => ee], 351394),
            e.i(351394),
            e.s(['DropdownNav', () => et], 986946),
            e.i(986946),
            e.s(['Footer', () => ea], 506214),
            e.i(506214),
            e.s(['Month', () => er], 568171),
            e.i(568171),
            e.s(['MonthCaption', () => en], 417180),
            e.i(417180),
            e.s(['MonthGrid', () => eo], 809970),
            e.i(809970),
            e.s(['Months', () => ei], 913866),
            e.i(913866));
        let es = (0, c.createContext)(void 0);
        function el() {
            let e = (0, c.useContext)(es);
            if (void 0 === e)
                throw Error(
                    'useDayPicker() must be used within a custom component.'
                );
            return e;
        }
        function ed(e) {
            let { components: t } = el();
            return c.default.createElement(t.Dropdown, { ...e });
        }
        function eu(e) {
            let {
                    onPreviousClick: t,
                    onNextClick: a,
                    previousMonth: r,
                    nextMonth: n,
                    ...o
                } = e,
                {
                    components: s,
                    classNames: l,
                    labels: { labelPrevious: d, labelNext: u },
                } = el(),
                f = (0, c.useCallback)(
                    (e) => {
                        n && a?.(e);
                    },
                    [n, a]
                ),
                h = (0, c.useCallback)(
                    (e) => {
                        r && t?.(e);
                    },
                    [r, t]
                );
            return c.default.createElement(
                'nav',
                { ...o },
                c.default.createElement(
                    s.PreviousMonthButton,
                    {
                        type: 'button',
                        className: l[i.PreviousMonthButton],
                        tabIndex: r ? void 0 : -1,
                        'aria-disabled': !r || void 0,
                        'aria-label': d(r),
                        onClick: h,
                    },
                    c.default.createElement(s.Chevron, {
                        disabled: !r || void 0,
                        className: l[i.Chevron],
                        orientation: 'left',
                    })
                ),
                c.default.createElement(
                    s.NextMonthButton,
                    {
                        type: 'button',
                        className: l[i.NextMonthButton],
                        tabIndex: n ? void 0 : -1,
                        'aria-disabled': !n || void 0,
                        'aria-label': u(n),
                        onClick: f,
                    },
                    c.default.createElement(s.Chevron, {
                        disabled: !n || void 0,
                        orientation: 'right',
                        className: l[i.Chevron],
                    })
                )
            );
        }
        function ef(e) {
            let { components: t } = el();
            return c.default.createElement(t.Button, { ...e });
        }
        function ec(e) {
            return c.default.createElement('option', { ...e });
        }
        function eh(e) {
            let { components: t } = el();
            return c.default.createElement(t.Button, { ...e });
        }
        function em(e) {
            let { rootRef: t, ...a } = e;
            return c.default.createElement('div', { ...a, ref: t });
        }
        function ep(e) {
            return c.default.createElement('select', { ...e });
        }
        function ey(e) {
            let { week: t, ...a } = e;
            return c.default.createElement('tr', { ...a });
        }
        function eb(e) {
            return c.default.createElement('th', { ...e });
        }
        function ev(e) {
            return c.default.createElement(
                'thead',
                { 'aria-hidden': !0 },
                c.default.createElement('tr', { ...e })
            );
        }
        function eg(e) {
            let { week: t, ...a } = e;
            return c.default.createElement('th', { ...a });
        }
        function eD(e) {
            return c.default.createElement('th', { ...e });
        }
        function ek(e) {
            return c.default.createElement('tbody', { ...e });
        }
        function ew(e) {
            let { components: t } = el();
            return c.default.createElement(t.Dropdown, { ...e });
        }
        (e.s(['MonthsDropdown', () => ed], 33755),
            e.i(33755),
            e.s(['Nav', () => eu], 237326),
            e.i(237326),
            e.s(['NextMonthButton', () => ef], 329384),
            e.i(329384),
            e.s(['Option', () => ec], 66038),
            e.i(66038),
            e.s(['PreviousMonthButton', () => eh], 672514),
            e.i(672514),
            e.s(['Root', () => em], 313304),
            e.i(313304),
            e.s(['Select', () => ep], 206958),
            e.i(206958),
            e.s(['Week', () => ey], 647732),
            e.i(647732),
            e.s(['Weekday', () => eb], 856809),
            e.i(856809),
            e.s(['Weekdays', () => ev], 924788),
            e.i(924788),
            e.s(['WeekNumber', () => eg], 507424),
            e.i(507424),
            e.s(['WeekNumberHeader', () => eD], 82222),
            e.i(82222),
            e.s(['Weeks', () => ek], 674078),
            e.i(674078),
            e.s(['YearsDropdown', () => ew], 788905),
            e.i(788905),
            e.s(
                [
                    'Button',
                    () => K,
                    'CaptionLabel',
                    () => V,
                    'Chevron',
                    () => J,
                    'Day',
                    () => Q,
                    'DayButton',
                    () => X,
                    'Dropdown',
                    () => ee,
                    'DropdownNav',
                    () => et,
                    'Footer',
                    () => ea,
                    'Month',
                    () => er,
                    'MonthCaption',
                    () => en,
                    'MonthGrid',
                    () => eo,
                    'Months',
                    () => ei,
                    'MonthsDropdown',
                    () => ed,
                    'Nav',
                    () => eu,
                    'NextMonthButton',
                    () => ef,
                    'Option',
                    () => ec,
                    'PreviousMonthButton',
                    () => eh,
                    'Root',
                    () => em,
                    'Select',
                    () => ep,
                    'Week',
                    () => ey,
                    'WeekNumber',
                    () => eg,
                    'WeekNumberHeader',
                    () => eD,
                    'Weekday',
                    () => eb,
                    'Weekdays',
                    () => ev,
                    'Weeks',
                    () => ek,
                    'YearsDropdown',
                    () => ew,
                ],
                503226
            ));
        var eM = e.i(503226);
        function eN() {
            let e = {};
            for (let t in i) e[i[t]] = `rdp-${i[t]}`;
            for (let t in s) e[s[t]] = `rdp-${s[t]}`;
            for (let t in l) e[l[t]] = `rdp-${l[t]}`;
            for (let t in d) e[d[t]] = `rdp-${d[t]}`;
            return e;
        }
        function eW(e, t, a) {
            return (a ?? new P(t)).formatMonthYear(e);
        }
        function eC(e, t, a) {
            return (a ?? new P(t)).format(e, 'd');
        }
        function eO(e, t = z) {
            return t.format(e, 'LLLL');
        }
        function eS(e, t, a) {
            return (a ?? new P(t)).format(e, 'cccccc');
        }
        function ex(e, t = z) {
            return e < 10
                ? t.formatNumber(`0${e.toLocaleString()}`)
                : t.formatNumber(`${e.toLocaleString()}`);
        }
        function eT() {
            return '';
        }
        function e_(e, t = z) {
            return t.format(e, 'yyyy');
        }
        (e.s([], 665725),
            e.i(665725),
            e.s(
                ['formatCaption', () => eW, 'formatMonthCaption', 0, eW],
                117240
            ),
            e.i(117240),
            e.s(['formatDay', () => eC], 760250),
            e.i(760250),
            e.s(['formatMonthDropdown', () => eO], 581383),
            e.i(581383),
            e.s(['formatWeekdayName', () => eS], 419834),
            e.i(419834),
            e.s(['formatWeekNumber', () => ex], 848954),
            e.i(848954),
            e.s(['formatWeekNumberHeader', () => eT], 100623),
            e.i(100623),
            e.s(
                ['formatYearCaption', 0, e_, 'formatYearDropdown', () => e_],
                93915
            ),
            e.i(93915),
            e.s(
                [
                    'formatCaption',
                    () => eW,
                    'formatDay',
                    () => eC,
                    'formatMonthCaption',
                    0,
                    eW,
                    'formatMonthDropdown',
                    () => eO,
                    'formatWeekNumber',
                    () => ex,
                    'formatWeekNumberHeader',
                    () => eT,
                    'formatWeekdayName',
                    () => eS,
                    'formatYearCaption',
                    0,
                    e_,
                    'formatYearDropdown',
                    () => e_,
                ],
                319914
            ));
        var eE = e.i(319914);
        function eY(e, t, a, r) {
            let n = (r ?? new P(a)).format(e, 'PPPP');
            return (
                t.today && (n = `Today, ${n}`),
                t.selected && (n = `${n}, selected`),
                n
            );
        }
        function eL(e, t, a) {
            return (a ?? new P(t)).formatMonthYear(e);
        }
        function eI(e, t, a, r) {
            let n = (r ?? new P(a)).format(e, 'PPPP');
            return (t?.today && (n = `Today, ${n}`), n);
        }
        function eF(e) {
            return 'Choose the Month';
        }
        function eZ() {
            return '';
        }
        function eB(e, t) {
            return 'Go to the Next Month';
        }
        function eP(e) {
            return 'Go to the Previous Month';
        }
        function ez(e, t, a) {
            return (a ?? new P(t)).format(e, 'cccc');
        }
        function eU(e, t) {
            return `Week ${e}`;
        }
        function eH(e) {
            return 'Week Number';
        }
        function ej(e) {
            return 'Choose the Year';
        }
        (e.s([], 176150),
            e.i(176150),
            e.s(['labelDay', 0, eY, 'labelDayButton', () => eY], 727705),
            e.i(727705),
            e.s(['labelCaption', 0, eL, 'labelGrid', () => eL], 719538),
            e.i(719538),
            e.s(['labelGridcell', () => eI], 613797),
            e.i(613797),
            e.s(['labelMonthDropdown', () => eF], 696459),
            e.i(696459),
            e.s(['labelNav', () => eZ], 488274),
            e.i(488274),
            e.s(['labelNext', () => eB], 622077),
            e.i(622077),
            e.s(['labelPrevious', () => eP], 698813),
            e.i(698813),
            e.s(['labelWeekday', () => ez], 928877),
            e.i(928877),
            e.s(['labelWeekNumber', () => eU], 605350),
            e.i(605350),
            e.s(['labelWeekNumberHeader', () => eH], 292151),
            e.i(292151),
            e.s(['labelYearDropdown', () => ej], 621522),
            e.i(621522),
            e.s(
                [
                    'labelCaption',
                    0,
                    eL,
                    'labelDay',
                    0,
                    eY,
                    'labelDayButton',
                    () => eY,
                    'labelGrid',
                    () => eL,
                    'labelGridcell',
                    () => eI,
                    'labelMonthDropdown',
                    () => eF,
                    'labelNav',
                    () => eZ,
                    'labelNext',
                    () => eB,
                    'labelPrevious',
                    () => eP,
                    'labelWeekNumber',
                    () => eU,
                    'labelWeekNumberHeader',
                    () => eH,
                    'labelWeekday',
                    () => ez,
                    'labelYearDropdown',
                    () => ej,
                ],
                435678
            ));
        var eA = e.i(435678);
        let e$ = (e, t, a) =>
                t || (a ? ('function' == typeof a ? a : (...e) => a) : e),
            eG = (e) => (e instanceof HTMLElement ? e : null),
            eR = (e) => [
                ...(e.querySelectorAll('[data-animated-month]') ?? []),
            ],
            eq = (e) => eG(e.querySelector('[data-animated-caption]')),
            eK = (e) => eG(e.querySelector('[data-animated-weeks]'));
        function eV(e, t, a, r) {
            let {
                    month: n,
                    defaultMonth: o,
                    today: i = r.today(),
                    numberOfMonths: s = 1,
                } = e,
                l = n || o || i,
                {
                    differenceInCalendarMonths: d,
                    addMonths: u,
                    startOfMonth: f,
                } = r;
            return (
                a && d(a, l) < s - 1 && (l = u(a, -1 * (s - 1))),
                t && 0 > d(l, t) && (l = t),
                f(l)
            );
        }
        class eJ {
            constructor(e, t, a = z) {
                ((this.date = e),
                    (this.displayMonth = t),
                    (this.outside = !!(t && !a.isSameMonth(e, t))),
                    (this.dateLib = a),
                    (this.isoDate = a.format(e, 'yyyy-MM-dd')),
                    (this.displayMonthId = a.format(t, 'yyyy-MM')),
                    (this.dateMonthId = a.format(e, 'yyyy-MM')));
            }
            isEqualTo(e) {
                return (
                    this.dateLib.isSameDay(e.date, this.date) &&
                    this.dateLib.isSameMonth(e.displayMonth, this.displayMonth)
                );
            }
        }
        class eQ {
            constructor(e, t) {
                ((this.date = e), (this.weeks = t));
            }
        }
        class eX {
            constructor(e, t) {
                ((this.days = t), (this.weekNumber = e));
            }
        }
        function e0(e, t) {
            let [a, r] = (0, c.useState)(e);
            return [void 0 === t ? a : t, r];
        }
        function e1(e) {
            return !e[s.disabled] && !e[s.hidden] && !e[s.outside];
        }
        function e2(e, t, a = z) {
            return (
                U(e, t.from, !1, a) ||
                U(e, t.to, !1, a) ||
                U(t, e.from, !1, a) ||
                U(t, e.to, !1, a)
            );
        }
        function e7(e, t) {
            return e instanceof y.TZDate && e.timeZone === t
                ? e
                : new y.TZDate(e, t);
        }
        function e9(e, t, a) {
            if (!a) return e7(e, t);
            let r = e7(e, t);
            return new Date(
                new y.TZDate(
                    r.getFullYear(),
                    r.getMonth(),
                    r.getDate(),
                    12,
                    0,
                    0,
                    t
                ).getTime()
            );
        }
        function e5(e, t, a) {
            return 'boolean' == typeof e || 'function' == typeof e
                ? e
                : e instanceof Date
                  ? e9(e, t, a)
                  : Array.isArray(e)
                    ? e.map((e) => (e instanceof Date ? e9(e, t, a) : e))
                    : j(e)
                      ? {
                            ...e,
                            from: e.from ? e7(e.from, t) : e.from,
                            to: e.to ? e7(e.to, t) : e.to,
                        }
                      : H(e)
                        ? {
                              before: e9(e.before, t, a),
                              after: e9(e.after, t, a),
                          }
                        : A(e)
                          ? { after: e9(e.after, t, a) }
                          : $(e)
                            ? { before: e9(e.before, t, a) }
                            : e;
        }
        function e8(e, t, a) {
            return e
                ? Array.isArray(e)
                    ? e.map((e) => e5(e, t, a))
                    : e5(e, t, a)
                : e;
        }
        function e3(e) {
            var t;
            let a,
                r = e,
                n = r.timeZone;
            if (
                n &&
                ((r = { ...e, timeZone: n }).today &&
                    (r.today = e7(r.today, n)),
                r.month && (r.month = e7(r.month, n)),
                r.defaultMonth && (r.defaultMonth = e7(r.defaultMonth, n)),
                r.startMonth && (r.startMonth = e7(r.startMonth, n)),
                r.endMonth && (r.endMonth = e7(r.endMonth, n)),
                'single' === r.mode && r.selected
                    ? (r.selected = e7(r.selected, n))
                    : 'multiple' === r.mode && r.selected
                      ? (r.selected = r.selected?.map((e) => e7(e, n)))
                      : 'range' === r.mode &&
                        r.selected &&
                        (r.selected = {
                            from: r.selected.from
                                ? e7(r.selected.from, n)
                                : r.selected.from,
                            to: r.selected.to
                                ? e7(r.selected.to, n)
                                : r.selected.to,
                        }),
                void 0 !== r.disabled && (r.disabled = e8(r.disabled, n)),
                void 0 !== r.hidden && (r.hidden = e8(r.hidden, n)),
                r.modifiers)
            ) {
                let e = {};
                (Object.keys(r.modifiers).forEach((t) => {
                    e[t] = e8(r.modifiers?.[t], n);
                }),
                    (r.modifiers = e));
            }
            let {
                components: o,
                formatters: f,
                labels: h,
                dateLib: m,
                locale: p,
                classNames: b,
            } = (0, c.useMemo)(() => {
                var e, t, a, n;
                let o,
                    i = { ...B, ...r.locale },
                    s = r.broadcastCalendar ? 1 : r.weekStartsOn,
                    l =
                        r.noonSafe && r.timeZone
                            ? (function (e, t = {}) {
                                  let { weekStartsOn: a, locale: r } = t,
                                      n = a ?? r?.options?.weekStartsOn ?? 0,
                                      o = (t) => {
                                          let a =
                                              'number' == typeof t ||
                                              'string' == typeof t
                                                  ? new Date(t)
                                                  : t;
                                          return new y.TZDate(
                                              a.getFullYear(),
                                              a.getMonth(),
                                              a.getDate(),
                                              12,
                                              0,
                                              0,
                                              e
                                          );
                                      },
                                      i = (e) => {
                                          let t = o(e);
                                          return new Date(
                                              t.getFullYear(),
                                              t.getMonth(),
                                              t.getDate(),
                                              0,
                                              0,
                                              0,
                                              0
                                          );
                                      };
                                  return {
                                      today: () => o(y.TZDate.tz(e)),
                                      newDate: (t, a, r) =>
                                          new y.TZDate(t, a, r, 12, 0, 0, e),
                                      startOfDay: (e) => o(e),
                                      startOfWeek: (e, t) => {
                                          let a = o(e),
                                              r = t?.weekStartsOn ?? n,
                                              i = (a.getDay() - r + 7) % 7;
                                          return (
                                              a.setDate(a.getDate() - i),
                                              a
                                          );
                                      },
                                      startOfISOWeek: (e) => {
                                          let t = o(e),
                                              a = (t.getDay() - 1 + 7) % 7;
                                          return (
                                              t.setDate(t.getDate() - a),
                                              t
                                          );
                                      },
                                      startOfMonth: (e) => {
                                          let t = o(e);
                                          return (t.setDate(1), t);
                                      },
                                      startOfYear: (e) => {
                                          let t = o(e);
                                          return (t.setMonth(0, 1), t);
                                      },
                                      endOfWeek: (e, t) => {
                                          let a = o(e),
                                              r =
                                                  ((((t?.weekStartsOn ?? n) +
                                                      6) %
                                                      7) -
                                                      a.getDay() +
                                                      7) %
                                                  7;
                                          return (
                                              a.setDate(a.getDate() + r),
                                              a
                                          );
                                      },
                                      endOfISOWeek: (e) => {
                                          let t = o(e),
                                              a = (7 - t.getDay()) % 7;
                                          return (
                                              t.setDate(t.getDate() + a),
                                              t
                                          );
                                      },
                                      endOfMonth: (e) => {
                                          let t = o(e);
                                          return (
                                              t.setMonth(t.getMonth() + 1, 0),
                                              t
                                          );
                                      },
                                      endOfYear: (e) => {
                                          let t = o(e);
                                          return (t.setMonth(11, 31), t);
                                      },
                                      eachMonthOfInterval: (t) => {
                                          let a = o(t.start),
                                              r = o(t.end),
                                              n = [],
                                              i = new y.TZDate(
                                                  a.getFullYear(),
                                                  a.getMonth(),
                                                  1,
                                                  12,
                                                  0,
                                                  0,
                                                  e
                                              ),
                                              s =
                                                  12 * r.getFullYear() +
                                                  r.getMonth();
                                          for (
                                              ;
                                              12 * i.getFullYear() +
                                                  i.getMonth() <=
                                              s;
                                          )
                                              (n.push(new y.TZDate(i, e)),
                                                  i.setMonth(
                                                      i.getMonth() + 1,
                                                      1
                                                  ));
                                          return n;
                                      },
                                      addDays: (e, t) => {
                                          let a = o(e);
                                          return (
                                              a.setDate(a.getDate() + t),
                                              a
                                          );
                                      },
                                      addWeeks: (e, t) => {
                                          let a = o(e);
                                          return (
                                              a.setDate(a.getDate() + 7 * t),
                                              a
                                          );
                                      },
                                      addMonths: (e, t) => {
                                          let a = o(e);
                                          return (
                                              a.setMonth(a.getMonth() + t),
                                              a
                                          );
                                      },
                                      addYears: (e, t) => {
                                          let a = o(e);
                                          return (
                                              a.setFullYear(
                                                  a.getFullYear() + t
                                              ),
                                              a
                                          );
                                      },
                                      eachYearOfInterval: (t) => {
                                          let a = o(t.start),
                                              r = o(t.end),
                                              n = [],
                                              i = new y.TZDate(
                                                  a.getFullYear(),
                                                  0,
                                                  1,
                                                  12,
                                                  0,
                                                  0,
                                                  e
                                              );
                                          for (
                                              ;
                                              i.getFullYear() <=
                                              r.getFullYear();
                                          )
                                              (n.push(new y.TZDate(i, e)),
                                                  i.setFullYear(
                                                      i.getFullYear() + 1,
                                                      0,
                                                      1
                                                  ));
                                          return n;
                                      },
                                      getWeek: (e, t) => {
                                          let a = i(e);
                                          return (0, x.getWeek)(a, {
                                              weekStartsOn:
                                                  t?.weekStartsOn ?? n,
                                              firstWeekContainsDate:
                                                  t?.firstWeekContainsDate ??
                                                  r?.options
                                                      ?.firstWeekContainsDate ??
                                                  1,
                                          });
                                      },
                                      getISOWeek: (e) => {
                                          let t = i(e);
                                          return (0, S.getISOWeek)(t);
                                      },
                                      differenceInCalendarDays: (e, t) => {
                                          let a = i(e),
                                              r = i(t);
                                          return (0,
                                          g.differenceInCalendarDays)(a, r);
                                      },
                                      differenceInCalendarMonths: (e, t) =>
                                          k(i(e), i(t)),
                                  };
                              })(r.timeZone, { weekStartsOn: s, locale: i })
                            : void 0,
                    d =
                        r.dateLib && l
                            ? { ...l, ...r.dateLib }
                            : (r.dateLib ?? l),
                    u = new P(
                        {
                            locale: i,
                            weekStartsOn: s,
                            firstWeekContainsDate: r.firstWeekContainsDate,
                            useAdditionalWeekYearTokens:
                                r.useAdditionalWeekYearTokens,
                            useAdditionalDayOfYearTokens:
                                r.useAdditionalDayOfYearTokens,
                            timeZone: r.timeZone,
                            numerals: r.numerals,
                        },
                        d
                    );
                return {
                    dateLib: u,
                    components: ((e = r.components), { ...eM, ...e }),
                    formatters:
                        ((t = r.formatters),
                        t?.formatMonthCaption &&
                            !t.formatCaption &&
                            (t.formatCaption = t.formatMonthCaption),
                        t?.formatYearCaption &&
                            !t.formatYearDropdown &&
                            (t.formatYearDropdown = t.formatYearCaption),
                        { ...eE, ...t }),
                    labels:
                        ((a = r.labels),
                        (n = u.options),
                        (o = n.locale?.labels ?? {}),
                        {
                            ...eA,
                            ...(a ?? {}),
                            labelDayButton: e$(
                                eA.labelDayButton,
                                a?.labelDayButton,
                                o.labelDayButton
                            ),
                            labelMonthDropdown: e$(
                                eA.labelMonthDropdown,
                                a?.labelMonthDropdown,
                                o.labelMonthDropdown
                            ),
                            labelNext: e$(
                                eA.labelNext,
                                a?.labelNext,
                                o.labelNext
                            ),
                            labelPrevious: e$(
                                eA.labelPrevious,
                                a?.labelPrevious,
                                o.labelPrevious
                            ),
                            labelWeekNumber: e$(
                                eA.labelWeekNumber,
                                a?.labelWeekNumber,
                                o.labelWeekNumber
                            ),
                            labelYearDropdown: e$(
                                eA.labelYearDropdown,
                                a?.labelYearDropdown,
                                o.labelYearDropdown
                            ),
                            labelGrid: e$(
                                eA.labelGrid,
                                a?.labelGrid,
                                o.labelGrid
                            ),
                            labelGridcell: e$(
                                eA.labelGridcell,
                                a?.labelGridcell,
                                o.labelGridcell
                            ),
                            labelNav: e$(eA.labelNav, a?.labelNav, o.labelNav),
                            labelWeekNumberHeader: e$(
                                eA.labelWeekNumberHeader,
                                a?.labelWeekNumberHeader,
                                o.labelWeekNumberHeader
                            ),
                            labelWeekday: e$(
                                eA.labelWeekday,
                                a?.labelWeekday,
                                o.labelWeekday
                            ),
                        }),
                    locale: i,
                    classNames: { ...eN(), ...r.classNames },
                };
            }, [
                r.locale,
                r.broadcastCalendar,
                r.weekStartsOn,
                r.firstWeekContainsDate,
                r.useAdditionalWeekYearTokens,
                r.useAdditionalDayOfYearTokens,
                r.timeZone,
                r.numerals,
                r.dateLib,
                r.noonSafe,
                r.components,
                r.formatters,
                r.labels,
                r.classNames,
            ]);
            r.today || (r = { ...r, today: m.today() });
            let {
                    captionLayout: v,
                    mode: D,
                    navLayout: w,
                    numberOfMonths: M = 1,
                    onDayBlur: N,
                    onDayClick: W,
                    onDayFocus: C,
                    onDayKeyDown: O,
                    onDayMouseEnter: T,
                    onDayMouseLeave: _,
                    onNextClick: E,
                    onPrevClick: Y,
                    showWeekNumber: L,
                    styles: I,
                } = r,
                {
                    formatCaption: F,
                    formatDay: Z,
                    formatMonthDropdown: K,
                    formatWeekNumber: V,
                    formatWeekNumberHeader: J,
                    formatWeekdayName: Q,
                    formatYearDropdown: X,
                } = f,
                ee = (function (e, t) {
                    let [a, r] = (function (e, t) {
                            let { startMonth: a, endMonth: r } = e,
                                {
                                    startOfYear: n,
                                    startOfDay: o,
                                    startOfMonth: i,
                                    endOfMonth: s,
                                    addYears: l,
                                    endOfYear: d,
                                    newDate: u,
                                    today: f,
                                } = t,
                                {
                                    fromYear: c,
                                    toYear: h,
                                    fromMonth: m,
                                    toMonth: p,
                                } = e;
                            (!a && m && (a = m),
                                !a && c && (a = t.newDate(c, 0, 1)),
                                !r && p && (r = p),
                                !r && h && (r = u(h, 11, 31)));
                            let y =
                                'dropdown' === e.captionLayout ||
                                'dropdown-years' === e.captionLayout;
                            return (
                                a
                                    ? (a = i(a))
                                    : c
                                      ? (a = u(c, 0, 1))
                                      : !a &&
                                        y &&
                                        (a = n(l(e.today ?? f(), -100))),
                                r
                                    ? (r = s(r))
                                    : h
                                      ? (r = u(h, 11, 31))
                                      : !r && y && (r = d(e.today ?? f())),
                                [a ? o(a) : a, r ? o(r) : r]
                            );
                        })(e, t),
                        { startOfMonth: n, endOfMonth: o } = t,
                        i = eV(e, a, r, t),
                        [s, l] = e0(i, e.month ? i : void 0);
                    (0, c.useEffect)(() => {
                        l(eV(e, a, r, t));
                    }, [e.timeZone]);
                    let {
                            months: d,
                            weeks: u,
                            days: f,
                            previousMonth: h,
                            nextMonth: m,
                        } = (0, c.useMemo)(() => {
                            let n,
                                i = (function (e, t, a, r) {
                                    let { numberOfMonths: n = 1 } = a,
                                        o = [];
                                    for (let a = 0; a < n; a++) {
                                        let n = r.addMonths(e, a);
                                        if (t && n > t) break;
                                        o.push(n);
                                    }
                                    return o;
                                })(
                                    s,
                                    r,
                                    { numberOfMonths: e.numberOfMonths },
                                    t
                                ),
                                l = (function (e, t, a, r) {
                                    let n = e[0],
                                        o = e[e.length - 1],
                                        {
                                            ISOWeek: i,
                                            fixedWeeks: s,
                                            broadcastCalendar: l,
                                        } = a ?? {},
                                        {
                                            addDays: d,
                                            differenceInCalendarDays: u,
                                            differenceInCalendarMonths: f,
                                            endOfBroadcastWeek: c,
                                            endOfISOWeek: h,
                                            endOfMonth: m,
                                            endOfWeek: p,
                                            isAfter: y,
                                            startOfBroadcastWeek: b,
                                            startOfISOWeek: v,
                                            startOfWeek: g,
                                        } = r,
                                        D = l ? b(n, r) : i ? v(n) : g(n),
                                        k = l ? c(o) : i ? h(m(o)) : p(m(o)),
                                        w = t && (l ? c(t) : i ? h(t) : p(t)),
                                        M = u(w && y(k, w) ? w : k, D),
                                        N = f(o, n) + 1,
                                        W = [];
                                    for (let e = 0; e <= M; e++) {
                                        let t = d(D, e);
                                        W.push(t);
                                    }
                                    let C = (l ? 35 : 42) * N;
                                    if (s && W.length < C) {
                                        let e = C - W.length;
                                        for (let t = 0; t < e; t++) {
                                            let e = d(W[W.length - 1], 1);
                                            W.push(e);
                                        }
                                    }
                                    return W;
                                })(
                                    i,
                                    e.endMonth ? o(e.endMonth) : void 0,
                                    {
                                        ISOWeek: e.ISOWeek,
                                        fixedWeeks: e.fixedWeeks,
                                        broadcastCalendar: e.broadcastCalendar,
                                    },
                                    t
                                ),
                                d = (function (e, t, a, r) {
                                    let {
                                            addDays: n,
                                            endOfBroadcastWeek: o,
                                            endOfISOWeek: i,
                                            endOfMonth: s,
                                            endOfWeek: l,
                                            getISOWeek: d,
                                            getWeek: u,
                                            startOfBroadcastWeek: f,
                                            startOfISOWeek: c,
                                            startOfWeek: h,
                                        } = r,
                                        m = e.reduce((e, m) => {
                                            let p = a.broadcastCalendar
                                                    ? f(m, r)
                                                    : a.ISOWeek
                                                      ? c(m)
                                                      : h(m),
                                                y = a.broadcastCalendar
                                                    ? o(m)
                                                    : a.ISOWeek
                                                      ? i(s(m))
                                                      : l(s(m)),
                                                b = t.filter(
                                                    (e) => e >= p && e <= y
                                                ),
                                                v = a.broadcastCalendar
                                                    ? 35
                                                    : 42;
                                            if (a.fixedWeeks && b.length < v) {
                                                let e = t.filter((e) => {
                                                    let t = v - b.length;
                                                    return (
                                                        e > y && e <= n(y, t)
                                                    );
                                                });
                                                b.push(...e);
                                            }
                                            let g = b.reduce((e, t) => {
                                                    let n = a.ISOWeek
                                                            ? d(t)
                                                            : u(t),
                                                        o = e.find(
                                                            (e) =>
                                                                e.weekNumber ===
                                                                n
                                                        ),
                                                        i = new eJ(t, m, r);
                                                    return (
                                                        o
                                                            ? o.days.push(i)
                                                            : e.push(
                                                                  new eX(n, [i])
                                                              ),
                                                        e
                                                    );
                                                }, []),
                                                D = new eQ(m, g);
                                            return (e.push(D), e);
                                        }, []);
                                    return a.reverseMonths ? m.reverse() : m;
                                })(
                                    i,
                                    l,
                                    {
                                        broadcastCalendar: e.broadcastCalendar,
                                        fixedWeeks: e.fixedWeeks,
                                        ISOWeek: e.ISOWeek,
                                        reverseMonths: e.reverseMonths,
                                    },
                                    t
                                ),
                                u = d.reduce(
                                    (e, t) => e.concat(t.weeks.slice()),
                                    []
                                ),
                                f =
                                    ((n = []),
                                    d.reduce((e, t) => {
                                        let a = t.weeks.reduce(
                                            (e, t) => e.concat(t.days.slice()),
                                            n.slice()
                                        );
                                        return e.concat(a.slice());
                                    }, n.slice()));
                            return {
                                months: d,
                                weeks: u,
                                days: f,
                                previousMonth: (function (e, t, a, r) {
                                    if (a.disableNavigation) return;
                                    let {
                                            pagedNavigation: n,
                                            numberOfMonths: o,
                                        } = a,
                                        {
                                            startOfMonth: i,
                                            addMonths: s,
                                            differenceInCalendarMonths: l,
                                        } = r,
                                        d = i(e);
                                    if (!t || !(0 >= l(d, t)))
                                        return s(d, -(n ? (o ?? 1) : 1));
                                })(s, a, e, t),
                                nextMonth: (function (e, t, a, r) {
                                    if (a.disableNavigation) return;
                                    let {
                                            pagedNavigation: n,
                                            numberOfMonths: o = 1,
                                        } = a,
                                        {
                                            startOfMonth: i,
                                            addMonths: s,
                                            differenceInCalendarMonths: l,
                                        } = r,
                                        d = i(e);
                                    if (!t || !(l(t, e) < o))
                                        return s(d, n ? o : 1);
                                })(s, r, e, t),
                            };
                        }, [
                            t,
                            s.getTime(),
                            r?.getTime(),
                            a?.getTime(),
                            e.disableNavigation,
                            e.broadcastCalendar,
                            e.endMonth?.getTime(),
                            e.fixedWeeks,
                            e.ISOWeek,
                            e.numberOfMonths,
                            e.pagedNavigation,
                            e.reverseMonths,
                        ]),
                        { disableNavigation: p, onMonthChange: y } = e,
                        b = (e) => {
                            if (p) return;
                            let t = n(e);
                            (a && t < n(a) && (t = n(a)),
                                r && t > n(r) && (t = n(r)),
                                l(t),
                                y?.(t));
                        };
                    return {
                        months: d,
                        weeks: u,
                        days: f,
                        navStart: a,
                        navEnd: r,
                        previousMonth: h,
                        nextMonth: m,
                        goToMonth: b,
                        goToDay: (e) => {
                            u.some((t) => t.days.some((t) => t.isEqualTo(e))) ||
                                b(e.date);
                        },
                    };
                })(r, m),
                {
                    days: et,
                    months: ea,
                    navStart: er,
                    navEnd: en,
                    previousMonth: eo,
                    nextMonth: ei,
                    goToMonth: el,
                } = ee,
                ed = (function (e, t, a, r, n) {
                    let {
                            disabled: o,
                            hidden: i,
                            modifiers: l,
                            showOutsideDays: d,
                            broadcastCalendar: u,
                            today: f = n.today(),
                        } = t,
                        {
                            isSameDay: c,
                            isSameMonth: h,
                            startOfMonth: m,
                            isBefore: p,
                            endOfMonth: y,
                            isAfter: b,
                        } = n,
                        v = a && m(a),
                        g = r && y(r),
                        D = {
                            [s.focused]: [],
                            [s.outside]: [],
                            [s.disabled]: [],
                            [s.hidden]: [],
                            [s.today]: [],
                        },
                        k = {};
                    for (let t of e) {
                        let { date: e, displayMonth: a } = t,
                            r = !!(a && !h(e, a)),
                            s = !!(v && p(e, v)),
                            m = !!(g && b(e, g)),
                            y = !!(o && q(e, o, n)),
                            w =
                                !!(i && q(e, i, n)) ||
                                s ||
                                m ||
                                (!u && !d && r) ||
                                (u && !1 === d && r),
                            M = c(e, f);
                        (r && D.outside.push(t),
                            y && D.disabled.push(t),
                            w && D.hidden.push(t),
                            M && D.today.push(t),
                            l &&
                                Object.keys(l).forEach((a) => {
                                    let r = l?.[a];
                                    r &&
                                        q(e, r, n) &&
                                        (k[a] ? k[a].push(t) : (k[a] = [t]));
                                }));
                    }
                    return (e) => {
                        let t = {
                                [s.focused]: !1,
                                [s.disabled]: !1,
                                [s.hidden]: !1,
                                [s.outside]: !1,
                                [s.today]: !1,
                            },
                            a = {};
                        for (let a in D) {
                            let r = D[a];
                            t[a] = r.some((t) => t === e);
                        }
                        for (let t in k) a[t] = k[t].some((t) => t === e);
                        return { ...t, ...a };
                    };
                })(et, r, er, en, m),
                {
                    isSelected: eu,
                    select: ef,
                    selected: ec,
                } = (function (e, t) {
                    let a = (function (e, t) {
                            let { selected: a, required: r, onSelect: n } = e,
                                [o, i] = e0(a, n ? a : void 0),
                                s = n ? a : o,
                                { isSameDay: l } = t;
                            return {
                                selected: s,
                                select: (e, t, a) => {
                                    let o = e;
                                    return (
                                        !r && s && s && l(e, s) && (o = void 0),
                                        n || i(o),
                                        n?.(o, e, t, a),
                                        o
                                    );
                                },
                                isSelected: (e) => !!s && l(s, e),
                            };
                        })(e, t),
                        r = (function (e, t) {
                            let { selected: a, required: r, onSelect: n } = e,
                                [o, i] = e0(a, n ? a : void 0),
                                s = n ? a : o,
                                { isSameDay: l } = t,
                                d = (e) => s?.some((t) => l(t, e)) ?? !1,
                                { min: u, max: f } = e;
                            return {
                                selected: s,
                                select: (e, t, a) => {
                                    let o = [...(s ?? [])];
                                    if (d(e)) {
                                        if (
                                            s?.length === u ||
                                            (r && s?.length === 1)
                                        )
                                            return;
                                        o = s?.filter((t) => !l(t, e));
                                    } else
                                        o = s?.length === f ? [e] : [...o, e];
                                    return (n || i(o), n?.(o, e, t, a), o);
                                },
                                isSelected: d,
                            };
                        })(e, t),
                        n = (function (e, t) {
                            let {
                                    disabled: a,
                                    excludeDisabled: r,
                                    selected: n,
                                    required: o,
                                    onSelect: i,
                                } = e,
                                [s, l] = e0(n, i ? n : void 0),
                                d = i ? n : s;
                            return {
                                selected: d,
                                select: (n, s, u) => {
                                    let { min: f, max: c } = e,
                                        h = n
                                            ? (function (
                                                  e,
                                                  t,
                                                  a = 0,
                                                  r = 0,
                                                  n = !1,
                                                  o = z
                                              ) {
                                                  let i,
                                                      { from: s, to: l } =
                                                          t || {},
                                                      {
                                                          isSameDay: d,
                                                          isAfter: u,
                                                          isBefore: f,
                                                      } = o;
                                                  if (s || l) {
                                                      if (s && !l)
                                                          i = d(s, e)
                                                              ? 0 === a
                                                                  ? {
                                                                        from: s,
                                                                        to: e,
                                                                    }
                                                                  : n
                                                                    ? {
                                                                          from: s,
                                                                          to: void 0,
                                                                      }
                                                                    : void 0
                                                              : f(e, s)
                                                                ? {
                                                                      from: e,
                                                                      to: s,
                                                                  }
                                                                : {
                                                                      from: s,
                                                                      to: e,
                                                                  };
                                                      else if (s && l)
                                                          if (
                                                              d(s, e) &&
                                                              d(l, e)
                                                          )
                                                              i = n
                                                                  ? {
                                                                        from: s,
                                                                        to: l,
                                                                    }
                                                                  : void 0;
                                                          else if (d(s, e))
                                                              i = {
                                                                  from: s,
                                                                  to:
                                                                      a > 0
                                                                          ? void 0
                                                                          : e,
                                                              };
                                                          else if (d(l, e))
                                                              i = {
                                                                  from: e,
                                                                  to:
                                                                      a > 0
                                                                          ? void 0
                                                                          : e,
                                                              };
                                                          else if (f(e, s))
                                                              i = {
                                                                  from: e,
                                                                  to: l,
                                                              };
                                                          else if (u(e, s))
                                                              i = {
                                                                  from: s,
                                                                  to: e,
                                                              };
                                                          else if (u(e, l))
                                                              i = {
                                                                  from: s,
                                                                  to: e,
                                                              };
                                                          else
                                                              throw Error(
                                                                  'Invalid range'
                                                              );
                                                  } else
                                                      i = {
                                                          from: e,
                                                          to:
                                                              a > 0
                                                                  ? void 0
                                                                  : e,
                                                      };
                                                  if (i?.from && i?.to) {
                                                      let t =
                                                          o.differenceInCalendarDays(
                                                              i.to,
                                                              i.from
                                                          );
                                                      r > 0 && t > r
                                                          ? (i = {
                                                                from: e,
                                                                to: void 0,
                                                            })
                                                          : a > 1 &&
                                                            t < a &&
                                                            (i = {
                                                                from: e,
                                                                to: void 0,
                                                            });
                                                  }
                                                  return i;
                                              })(n, d, f, c, o, t)
                                            : void 0;
                                    return (
                                        r &&
                                            a &&
                                            h?.from &&
                                            h.to &&
                                            (function (e, t, a = z) {
                                                let r = Array.isArray(t)
                                                    ? t
                                                    : [t];
                                                if (
                                                    r
                                                        .filter(
                                                            (e) =>
                                                                'function' !=
                                                                typeof e
                                                        )
                                                        .some((t) =>
                                                            'boolean' ==
                                                            typeof t
                                                                ? t
                                                                : a.isDate(t)
                                                                  ? U(
                                                                        e,
                                                                        t,
                                                                        !1,
                                                                        a
                                                                    )
                                                                  : R(t, a)
                                                                    ? t.some(
                                                                          (t) =>
                                                                              U(
                                                                                  e,
                                                                                  t,
                                                                                  !1,
                                                                                  a
                                                                              )
                                                                      )
                                                                    : j(t)
                                                                      ? !!t.from &&
                                                                        !!t.to &&
                                                                        e2(
                                                                            e,
                                                                            {
                                                                                from: t.from,
                                                                                to: t.to,
                                                                            },
                                                                            a
                                                                        )
                                                                      : G(t)
                                                                        ? (function (
                                                                              e,
                                                                              t,
                                                                              a = z
                                                                          ) {
                                                                              let r =
                                                                                      Array.isArray(
                                                                                          t
                                                                                      )
                                                                                          ? t
                                                                                          : [
                                                                                                t,
                                                                                            ],
                                                                                  n =
                                                                                      e.from,
                                                                                  o =
                                                                                      Math.min(
                                                                                          a.differenceInCalendarDays(
                                                                                              e.to,
                                                                                              e.from
                                                                                          ),
                                                                                          6
                                                                                      );
                                                                              for (
                                                                                  let e = 0;
                                                                                  e <=
                                                                                  o;
                                                                                  e++
                                                                              ) {
                                                                                  if (
                                                                                      r.includes(
                                                                                          n.getDay()
                                                                                      )
                                                                                  )
                                                                                      return !0;
                                                                                  n =
                                                                                      a.addDays(
                                                                                          n,
                                                                                          1
                                                                                      );
                                                                              }
                                                                              return !1;
                                                                          })(
                                                                              e,
                                                                              t.dayOfWeek,
                                                                              a
                                                                          )
                                                                        : H(t)
                                                                          ? a.isAfter(
                                                                                t.before,
                                                                                t.after
                                                                            )
                                                                              ? e2(
                                                                                    e,
                                                                                    {
                                                                                        from: a.addDays(
                                                                                            t.after,
                                                                                            1
                                                                                        ),
                                                                                        to: a.addDays(
                                                                                            t.before,
                                                                                            -1
                                                                                        ),
                                                                                    },
                                                                                    a
                                                                                )
                                                                              : q(
                                                                                    e.from,
                                                                                    t,
                                                                                    a
                                                                                ) ||
                                                                                q(
                                                                                    e.to,
                                                                                    t,
                                                                                    a
                                                                                )
                                                                          : !!(
                                                                                A(
                                                                                    t
                                                                                ) ||
                                                                                $(
                                                                                    t
                                                                                )
                                                                            ) &&
                                                                            (q(
                                                                                e.from,
                                                                                t,
                                                                                a
                                                                            ) ||
                                                                                q(
                                                                                    e.to,
                                                                                    t,
                                                                                    a
                                                                                ))
                                                        )
                                                )
                                                    return !0;
                                                let n = r.filter(
                                                    (e) =>
                                                        'function' == typeof e
                                                );
                                                if (n.length) {
                                                    let t = e.from,
                                                        r =
                                                            a.differenceInCalendarDays(
                                                                e.to,
                                                                e.from
                                                            );
                                                    for (
                                                        let e = 0;
                                                        e <= r;
                                                        e++
                                                    ) {
                                                        if (n.some((e) => e(t)))
                                                            return !0;
                                                        t = a.addDays(t, 1);
                                                    }
                                                }
                                                return !1;
                                            })(
                                                { from: h.from, to: h.to },
                                                a,
                                                t
                                            ) &&
                                            ((h.from = n), (h.to = void 0)),
                                        i || l(h),
                                        i?.(h, n, s, u),
                                        h
                                    );
                                },
                                isSelected: (e) => d && U(d, e, !1, t),
                            };
                        })(e, t);
                    switch (e.mode) {
                        case 'single':
                            return a;
                        case 'multiple':
                            return r;
                        case 'range':
                            return n;
                        default:
                            return;
                    }
                })(r, m) ?? {},
                {
                    blur: eh,
                    focused: em,
                    isFocusTarget: ep,
                    moveFocus: ey,
                    setFocused: eb,
                } = (function (e, t, a, r, n) {
                    let { autoFocus: o } = e,
                        [i, l] = (0, c.useState)(),
                        d = (function (e, t, a, r) {
                            let n,
                                o = -1;
                            for (let i of e) {
                                let e = t(i);
                                e1(e) &&
                                    (e[s.focused] && o < u.FocusedModifier
                                        ? ((n = i), (o = u.FocusedModifier))
                                        : r?.isEqualTo(i) && o < u.LastFocused
                                          ? ((n = i), (o = u.LastFocused))
                                          : a(i.date) && o < u.Selected
                                            ? ((n = i), (o = u.Selected))
                                            : e[s.today] &&
                                              o < u.Today &&
                                              ((n = i), (o = u.Today)));
                            }
                            return (n || (n = e.find((e) => e1(t(e)))), n);
                        })(t.days, a, r || (() => !1), i),
                        [f, h] = (0, c.useState)(o ? d : void 0);
                    return {
                        isFocusTarget: (e) => !!d?.isEqualTo(e),
                        setFocused: h,
                        focused: f,
                        blur: () => {
                            (l(f), h(void 0));
                        },
                        moveFocus: (a, r) => {
                            if (!f) return;
                            let o = (function e(t, a, r, n, o, i, s, l = 0) {
                                if (l > 365) return;
                                let d = (function (e, t, a, r, n, o, i) {
                                        let {
                                                ISOWeek: s,
                                                broadcastCalendar: l,
                                            } = o,
                                            {
                                                addDays: d,
                                                addMonths: u,
                                                addWeeks: f,
                                                addYears: c,
                                                endOfBroadcastWeek: h,
                                                endOfISOWeek: m,
                                                endOfWeek: p,
                                                max: y,
                                                min: b,
                                                startOfBroadcastWeek: v,
                                                startOfISOWeek: g,
                                                startOfWeek: D,
                                            } = i,
                                            k = {
                                                day: d,
                                                week: f,
                                                month: u,
                                                year: c,
                                                startOfWeek: (e) =>
                                                    l
                                                        ? v(e, i)
                                                        : s
                                                          ? g(e)
                                                          : D(e),
                                                endOfWeek: (e) =>
                                                    l ? h(e) : s ? m(e) : p(e),
                                            }[e](a, 'after' === t ? 1 : -1);
                                        return (
                                            'before' === t && r
                                                ? (k = y([r, k]))
                                                : 'after' === t &&
                                                  n &&
                                                  (k = b([n, k])),
                                            k
                                        );
                                    })(t, a, r.date, n, o, i, s),
                                    u = !!(i.disabled && q(d, i.disabled, s)),
                                    f = !!(i.hidden && q(d, i.hidden, s)),
                                    c = new eJ(d, d, s);
                                return u || f
                                    ? e(t, a, c, n, o, i, s, l + 1)
                                    : c;
                            })(a, r, f, t.navStart, t.navEnd, e, n);
                            if (o) {
                                if (
                                    e.disableNavigation &&
                                    !t.days.some((e) => e.isEqualTo(o))
                                )
                                    return;
                                (t.goToDay(o), h(o));
                            }
                        },
                    };
                })(r, ee, ed, eu ?? (() => !1), m),
                {
                    labelDayButton: ev,
                    labelGridcell: eg,
                    labelGrid: eD,
                    labelMonthDropdown: ek,
                    labelNav: ew,
                    labelPrevious: eW,
                    labelNext: eC,
                    labelWeekday: eO,
                    labelWeekNumber: eS,
                    labelWeekNumberHeader: ex,
                    labelYearDropdown: eT,
                } = h,
                e_ = (0, c.useMemo)(
                    () =>
                        (function (e, t, a, r) {
                            let n = r ?? e.today(),
                                o = a
                                    ? e.startOfBroadcastWeek(n, e)
                                    : t
                                      ? e.startOfISOWeek(n)
                                      : e.startOfWeek(n),
                                i = [];
                            for (let t = 0; t < 7; t++) {
                                let a = e.addDays(o, t);
                                i.push(a);
                            }
                            return i;
                        })(m, r.ISOWeek, r.broadcastCalendar, r.today),
                    [m, r.ISOWeek, r.broadcastCalendar, r.today]
                ),
                eY = void 0 !== D || void 0 !== W,
                eL = (0, c.useCallback)(() => {
                    eo && (el(eo), Y?.(eo));
                }, [eo, el, Y]),
                eI = (0, c.useCallback)(() => {
                    ei && (el(ei), E?.(ei));
                }, [el, ei, E]),
                eF = (0, c.useCallback)(
                    (e, t) => (a) => {
                        (a.preventDefault(),
                            a.stopPropagation(),
                            eb(e),
                            t.disabled ||
                                (ef?.(e.date, t, a), W?.(e.date, t, a)));
                    },
                    [ef, W, eb]
                ),
                eZ = (0, c.useCallback)(
                    (e, t) => (a) => {
                        (eb(e), C?.(e.date, t, a));
                    },
                    [C, eb]
                ),
                eB = (0, c.useCallback)(
                    (e, t) => (a) => {
                        (eh(), N?.(e.date, t, a));
                    },
                    [eh, N]
                ),
                eP = (0, c.useCallback)(
                    (e, t) => (a) => {
                        let n = {
                            ArrowLeft: [
                                a.shiftKey ? 'month' : 'day',
                                'rtl' === r.dir ? 'after' : 'before',
                            ],
                            ArrowRight: [
                                a.shiftKey ? 'month' : 'day',
                                'rtl' === r.dir ? 'before' : 'after',
                            ],
                            ArrowDown: [a.shiftKey ? 'year' : 'week', 'after'],
                            ArrowUp: [a.shiftKey ? 'year' : 'week', 'before'],
                            PageUp: [a.shiftKey ? 'year' : 'month', 'before'],
                            PageDown: [a.shiftKey ? 'year' : 'month', 'after'],
                            Home: ['startOfWeek', 'before'],
                            End: ['endOfWeek', 'after'],
                        };
                        if (n[a.key]) {
                            (a.preventDefault(), a.stopPropagation());
                            let [e, t] = n[a.key];
                            ey(e, t);
                        }
                        O?.(e.date, t, a);
                    },
                    [ey, O, r.dir]
                ),
                ez = (0, c.useCallback)(
                    (e, t) => (a) => {
                        T?.(e.date, t, a);
                    },
                    [T]
                ),
                eU = (0, c.useCallback)(
                    (e, t) => (a) => {
                        _?.(e.date, t, a);
                    },
                    [_]
                ),
                eH = (0, c.useCallback)(
                    (e) => (t) => {
                        let a = Number(t.target.value);
                        el(m.setMonth(m.startOfMonth(e), a));
                    },
                    [m, el]
                ),
                ej = (0, c.useCallback)(
                    (e) => (t) => {
                        let a = Number(t.target.value);
                        el(m.setYear(m.startOfMonth(e), a));
                    },
                    [m, el]
                ),
                { className: e9, style: e5 } = (0, c.useMemo)(
                    () => ({
                        className: [b[i.Root], r.className]
                            .filter(Boolean)
                            .join(' '),
                        style: { ...I?.[i.Root], ...r.style },
                    }),
                    [b, r.className, r.style, I]
                ),
                e3 =
                    ((a = {
                        'data-mode': (t = r).mode ?? void 0,
                        'data-required': 'required' in t ? t.required : void 0,
                        'data-multiple-months':
                            (t.numberOfMonths && t.numberOfMonths > 1) ||
                            void 0,
                        'data-week-numbers': t.showWeekNumber || void 0,
                        'data-broadcast-calendar':
                            t.broadcastCalendar || void 0,
                        'data-nav-layout': t.navLayout || void 0,
                    }),
                    Object.entries(t).forEach(([e, t]) => {
                        e.startsWith('data-') && (a[e] = t);
                    }),
                    a),
                e4 = (0, c.useRef)(null);
            !(function (
                e,
                t,
                { classNames: a, months: r, focused: n, dateLib: o }
            ) {
                let i = (0, c.useRef)(null),
                    s = (0, c.useRef)(r),
                    l = (0, c.useRef)(!1);
                (0, c.useLayoutEffect)(() => {
                    let u = s.current;
                    if (
                        ((s.current = r),
                        !t ||
                            !e.current ||
                            !(e.current instanceof HTMLElement) ||
                            0 === r.length ||
                            0 === u.length ||
                            r.length !== u.length)
                    )
                        return;
                    let f = o.isSameMonth(r[0].date, u[0].date),
                        c = o.isAfter(r[0].date, u[0].date),
                        h = c
                            ? a[d.caption_after_enter]
                            : a[d.caption_before_enter],
                        m = c
                            ? a[d.weeks_after_enter]
                            : a[d.weeks_before_enter],
                        p = i.current,
                        y = e.current.cloneNode(!0);
                    if (
                        (y instanceof HTMLElement
                            ? (eR(y).forEach((e) => {
                                  if (!(e instanceof HTMLElement)) return;
                                  let t = eG(
                                      e.querySelector('[data-animated-month]')
                                  );
                                  t && e.contains(t) && e.removeChild(t);
                                  let a = eq(e);
                                  a && a.classList.remove(h);
                                  let r = eK(e);
                                  r && r.classList.remove(m);
                              }),
                              (i.current = y))
                            : (i.current = null),
                        l.current || f || n)
                    )
                        return;
                    let b = p instanceof HTMLElement ? eR(p) : [],
                        v = eR(e.current);
                    if (
                        v?.every((e) => e instanceof HTMLElement) &&
                        b &&
                        b.every((e) => e instanceof HTMLElement)
                    ) {
                        l.current = !0;
                        let t = [];
                        e.current.style.isolation = 'isolate';
                        let r = eG(
                            e.current.querySelector('[data-animated-nav]')
                        );
                        (r && (r.style.zIndex = '1'),
                            v.forEach((n, o) => {
                                let i = b[o];
                                if (!i) return;
                                ((n.style.position = 'relative'),
                                    (n.style.overflow = 'hidden'));
                                let s = eq(n);
                                s && s.classList.add(h);
                                let u = eK(n);
                                u && u.classList.add(m);
                                let f = () => {
                                    ((l.current = !1),
                                        e.current &&
                                            (e.current.style.isolation = ''),
                                        r && (r.style.zIndex = ''),
                                        s && s.classList.remove(h),
                                        u && u.classList.remove(m),
                                        (n.style.position = ''),
                                        (n.style.overflow = ''),
                                        n.contains(i) && n.removeChild(i));
                                };
                                (t.push(f),
                                    (i.style.pointerEvents = 'none'),
                                    (i.style.position = 'absolute'),
                                    (i.style.overflow = 'hidden'),
                                    i.setAttribute('aria-hidden', 'true'));
                                let p = eG(
                                    i.querySelector('[data-animated-weekdays]')
                                );
                                p && (p.style.opacity = '0');
                                let y = eq(i);
                                y &&
                                    (y.classList.add(
                                        c
                                            ? a[d.caption_before_exit]
                                            : a[d.caption_after_exit]
                                    ),
                                    y.addEventListener('animationend', f));
                                let v = eK(i);
                                (v &&
                                    v.classList.add(
                                        c
                                            ? a[d.weeks_before_exit]
                                            : a[d.weeks_after_exit]
                                    ),
                                    n.insertBefore(i, n.firstChild));
                            }));
                    }
                });
            })(e4, !!r.animate, {
                classNames: b,
                months: ea,
                focused: em,
                dateLib: m,
            });
            let e6 = {
                dayPickerProps: r,
                selected: ec,
                select: ef,
                isSelected: eu,
                months: ea,
                nextMonth: ei,
                previousMonth: eo,
                goToMonth: el,
                getModifiers: ed,
                components: o,
                classNames: b,
                styles: I,
                labels: h,
                formatters: f,
            };
            return c.default.createElement(
                es.Provider,
                { value: e6 },
                c.default.createElement(
                    o.Root,
                    {
                        rootRef: r.animate ? e4 : void 0,
                        className: e9,
                        style: e5,
                        dir: r.dir,
                        id: r.id,
                        lang: r.lang,
                        nonce: r.nonce,
                        title: r.title,
                        role: r.role,
                        'aria-label': r['aria-label'],
                        'aria-labelledby': r['aria-labelledby'],
                        ...e3,
                    },
                    c.default.createElement(
                        o.Months,
                        { className: b[i.Months], style: I?.[i.Months] },
                        !r.hideNavigation &&
                            !w &&
                            c.default.createElement(o.Nav, {
                                'data-animated-nav': r.animate
                                    ? 'true'
                                    : void 0,
                                className: b[i.Nav],
                                style: I?.[i.Nav],
                                'aria-label': ew(),
                                onPreviousClick: eL,
                                onNextClick: eI,
                                previousMonth: eo,
                                nextMonth: ei,
                            }),
                        ea.map((e, t) => {
                            let a, n;
                            return c.default.createElement(
                                o.Month,
                                {
                                    'data-animated-month': r.animate
                                        ? 'true'
                                        : void 0,
                                    className: b[i.Month],
                                    style: I?.[i.Month],
                                    key: t,
                                    displayIndex: t,
                                    calendarMonth: e,
                                },
                                'around' === w &&
                                    !r.hideNavigation &&
                                    0 === t &&
                                    c.default.createElement(
                                        o.PreviousMonthButton,
                                        {
                                            type: 'button',
                                            className: b[i.PreviousMonthButton],
                                            tabIndex: eo ? void 0 : -1,
                                            'aria-disabled': !eo || void 0,
                                            'aria-label': eW(eo),
                                            onClick: eL,
                                            'data-animated-button': r.animate
                                                ? 'true'
                                                : void 0,
                                        },
                                        c.default.createElement(o.Chevron, {
                                            disabled: !eo || void 0,
                                            className: b[i.Chevron],
                                            orientation:
                                                'rtl' === r.dir
                                                    ? 'right'
                                                    : 'left',
                                        })
                                    ),
                                c.default.createElement(
                                    o.MonthCaption,
                                    {
                                        'data-animated-caption': r.animate
                                            ? 'true'
                                            : void 0,
                                        className: b[i.MonthCaption],
                                        style: I?.[i.MonthCaption],
                                        calendarMonth: e,
                                        displayIndex: t,
                                    },
                                    v?.startsWith('dropdown')
                                        ? c.default.createElement(
                                              o.DropdownNav,
                                              {
                                                  className: b[i.Dropdowns],
                                                  style: I?.[i.Dropdowns],
                                              },
                                              ((a =
                                                  'dropdown' === v ||
                                                  'dropdown-months' === v
                                                      ? c.default.createElement(
                                                            o.MonthsDropdown,
                                                            {
                                                                key: 'month',
                                                                className:
                                                                    b[
                                                                        i
                                                                            .MonthsDropdown
                                                                    ],
                                                                'aria-label':
                                                                    ek(),
                                                                classNames: b,
                                                                components: o,
                                                                disabled:
                                                                    !!r.disableNavigation,
                                                                onChange: eH(
                                                                    e.date
                                                                ),
                                                                options:
                                                                    (function (
                                                                        e,
                                                                        t,
                                                                        a,
                                                                        r,
                                                                        n
                                                                    ) {
                                                                        let {
                                                                            startOfMonth:
                                                                                o,
                                                                            startOfYear:
                                                                                i,
                                                                            endOfYear:
                                                                                s,
                                                                            eachMonthOfInterval:
                                                                                l,
                                                                            getMonth:
                                                                                d,
                                                                        } = n;
                                                                        return l(
                                                                            {
                                                                                start: i(
                                                                                    e
                                                                                ),
                                                                                end: s(
                                                                                    e
                                                                                ),
                                                                            }
                                                                        ).map(
                                                                            (
                                                                                e
                                                                            ) => {
                                                                                let i =
                                                                                    r.formatMonthDropdown(
                                                                                        e,
                                                                                        n
                                                                                    );
                                                                                return {
                                                                                    value: d(
                                                                                        e
                                                                                    ),
                                                                                    label: i,
                                                                                    disabled:
                                                                                        (t &&
                                                                                            e <
                                                                                                o(
                                                                                                    t
                                                                                                )) ||
                                                                                        (a &&
                                                                                            e >
                                                                                                o(
                                                                                                    a
                                                                                                )) ||
                                                                                        !1,
                                                                                };
                                                                            }
                                                                        );
                                                                    })(
                                                                        e.date,
                                                                        er,
                                                                        en,
                                                                        f,
                                                                        m
                                                                    ),
                                                                style: I?.[
                                                                    i.Dropdown
                                                                ],
                                                                value: m.getMonth(
                                                                    e.date
                                                                ),
                                                            }
                                                        )
                                                      : c.default.createElement(
                                                            'span',
                                                            { key: 'month' },
                                                            K(e.date, m)
                                                        )),
                                              (n =
                                                  'dropdown' === v ||
                                                  'dropdown-years' === v
                                                      ? c.default.createElement(
                                                            o.YearsDropdown,
                                                            {
                                                                key: 'year',
                                                                className:
                                                                    b[
                                                                        i
                                                                            .YearsDropdown
                                                                    ],
                                                                'aria-label':
                                                                    eT(
                                                                        m.options
                                                                    ),
                                                                classNames: b,
                                                                components: o,
                                                                disabled:
                                                                    !!r.disableNavigation,
                                                                onChange: ej(
                                                                    e.date
                                                                ),
                                                                options:
                                                                    (function (
                                                                        e,
                                                                        t,
                                                                        a,
                                                                        r,
                                                                        n = !1
                                                                    ) {
                                                                        if (
                                                                            !e ||
                                                                            !t
                                                                        )
                                                                            return;
                                                                        let {
                                                                                startOfYear:
                                                                                    o,
                                                                                endOfYear:
                                                                                    i,
                                                                                eachYearOfInterval:
                                                                                    s,
                                                                                getYear:
                                                                                    l,
                                                                            } = r,
                                                                            d =
                                                                                s(
                                                                                    {
                                                                                        start: o(
                                                                                            e
                                                                                        ),
                                                                                        end: i(
                                                                                            t
                                                                                        ),
                                                                                    }
                                                                                );
                                                                        return (
                                                                            n &&
                                                                                d.reverse(),
                                                                            d.map(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    let t =
                                                                                        a.formatYearDropdown(
                                                                                            e,
                                                                                            r
                                                                                        );
                                                                                    return {
                                                                                        value: l(
                                                                                            e
                                                                                        ),
                                                                                        label: t,
                                                                                        disabled:
                                                                                            !1,
                                                                                    };
                                                                                }
                                                                            )
                                                                        );
                                                                    })(
                                                                        er,
                                                                        en,
                                                                        f,
                                                                        m,
                                                                        !!r.reverseYears
                                                                    ),
                                                                style: I?.[
                                                                    i.Dropdown
                                                                ],
                                                                value: m.getYear(
                                                                    e.date
                                                                ),
                                                            }
                                                        )
                                                      : c.default.createElement(
                                                            'span',
                                                            { key: 'year' },
                                                            X(e.date, m)
                                                        )),
                                              'year-first' ===
                                              m.getMonthYearOrder()
                                                  ? [n, a]
                                                  : [a, n]),
                                              c.default.createElement(
                                                  'span',
                                                  {
                                                      role: 'status',
                                                      'aria-live': 'polite',
                                                      style: {
                                                          border: 0,
                                                          clip: 'rect(0 0 0 0)',
                                                          height: '1px',
                                                          margin: '-1px',
                                                          overflow: 'hidden',
                                                          padding: 0,
                                                          position: 'absolute',
                                                          width: '1px',
                                                          whiteSpace: 'nowrap',
                                                          wordWrap: 'normal',
                                                      },
                                                  },
                                                  F(e.date, m.options, m)
                                              )
                                          )
                                        : c.default.createElement(
                                              o.CaptionLabel,
                                              {
                                                  className: b[i.CaptionLabel],
                                                  role: 'status',
                                                  'aria-live': 'polite',
                                              },
                                              F(e.date, m.options, m)
                                          )
                                ),
                                'around' === w &&
                                    !r.hideNavigation &&
                                    t === M - 1 &&
                                    c.default.createElement(
                                        o.NextMonthButton,
                                        {
                                            type: 'button',
                                            className: b[i.NextMonthButton],
                                            tabIndex: ei ? void 0 : -1,
                                            'aria-disabled': !ei || void 0,
                                            'aria-label': eC(ei),
                                            onClick: eI,
                                            'data-animated-button': r.animate
                                                ? 'true'
                                                : void 0,
                                        },
                                        c.default.createElement(o.Chevron, {
                                            disabled: !ei || void 0,
                                            className: b[i.Chevron],
                                            orientation:
                                                'rtl' === r.dir
                                                    ? 'left'
                                                    : 'right',
                                        })
                                    ),
                                t === M - 1 &&
                                    'after' === w &&
                                    !r.hideNavigation &&
                                    c.default.createElement(o.Nav, {
                                        'data-animated-nav': r.animate
                                            ? 'true'
                                            : void 0,
                                        className: b[i.Nav],
                                        style: I?.[i.Nav],
                                        'aria-label': ew(),
                                        onPreviousClick: eL,
                                        onNextClick: eI,
                                        previousMonth: eo,
                                        nextMonth: ei,
                                    }),
                                c.default.createElement(
                                    o.MonthGrid,
                                    {
                                        role: 'grid',
                                        'aria-multiselectable':
                                            'multiple' === D || 'range' === D,
                                        'aria-label':
                                            eD(e.date, m.options, m) || void 0,
                                        className: b[i.MonthGrid],
                                        style: I?.[i.MonthGrid],
                                    },
                                    !r.hideWeekdays &&
                                        c.default.createElement(
                                            o.Weekdays,
                                            {
                                                'data-animated-weekdays':
                                                    r.animate ? 'true' : void 0,
                                                className: b[i.Weekdays],
                                                style: I?.[i.Weekdays],
                                            },
                                            L &&
                                                c.default.createElement(
                                                    o.WeekNumberHeader,
                                                    {
                                                        'aria-label': ex(
                                                            m.options
                                                        ),
                                                        className:
                                                            b[
                                                                i
                                                                    .WeekNumberHeader
                                                            ],
                                                        style: I?.[
                                                            i.WeekNumberHeader
                                                        ],
                                                        scope: 'col',
                                                    },
                                                    J()
                                                ),
                                            e_.map((e) =>
                                                c.default.createElement(
                                                    o.Weekday,
                                                    {
                                                        'aria-label': eO(
                                                            e,
                                                            m.options,
                                                            m
                                                        ),
                                                        className: b[i.Weekday],
                                                        key: String(e),
                                                        style: I?.[i.Weekday],
                                                        scope: 'col',
                                                    },
                                                    Q(e, m.options, m)
                                                )
                                            )
                                        ),
                                    c.default.createElement(
                                        o.Weeks,
                                        {
                                            'data-animated-weeks': r.animate
                                                ? 'true'
                                                : void 0,
                                            className: b[i.Weeks],
                                            style: I?.[i.Weeks],
                                        },
                                        e.weeks.map((e) =>
                                            c.default.createElement(
                                                o.Week,
                                                {
                                                    className: b[i.Week],
                                                    key: e.weekNumber,
                                                    style: I?.[i.Week],
                                                    week: e,
                                                },
                                                L &&
                                                    c.default.createElement(
                                                        o.WeekNumber,
                                                        {
                                                            week: e,
                                                            style: I?.[
                                                                i.WeekNumber
                                                            ],
                                                            'aria-label': eS(
                                                                e.weekNumber,
                                                                { locale: p }
                                                            ),
                                                            className:
                                                                b[i.WeekNumber],
                                                            scope: 'row',
                                                            role: 'rowheader',
                                                        },
                                                        V(e.weekNumber, m)
                                                    ),
                                                e.days.map((e) => {
                                                    let { date: t } = e,
                                                        a = ed(e);
                                                    if (
                                                        ((a[s.focused] =
                                                            !a.hidden &&
                                                            !!em?.isEqualTo(e)),
                                                        (a[l.selected] =
                                                            eu?.(t) ||
                                                            a.selected),
                                                        j(ec))
                                                    ) {
                                                        let { from: e, to: r } =
                                                            ec;
                                                        ((a[l.range_start] = !!(
                                                            e &&
                                                            r &&
                                                            m.isSameDay(t, e)
                                                        )),
                                                            (a[l.range_end] =
                                                                !!(
                                                                    e &&
                                                                    r &&
                                                                    m.isSameDay(
                                                                        t,
                                                                        r
                                                                    )
                                                                )),
                                                            (a[l.range_middle] =
                                                                U(
                                                                    ec,
                                                                    t,
                                                                    !0,
                                                                    m
                                                                )));
                                                    }
                                                    let n = (function (
                                                            e,
                                                            t = {},
                                                            a = {}
                                                        ) {
                                                            let r = {
                                                                ...t?.[i.Day],
                                                            };
                                                            return (
                                                                Object.entries(
                                                                    e
                                                                )
                                                                    .filter(
                                                                        ([
                                                                            ,
                                                                            e,
                                                                        ]) =>
                                                                            !0 ===
                                                                            e
                                                                    )
                                                                    .forEach(
                                                                        ([
                                                                            e,
                                                                        ]) => {
                                                                            r =
                                                                                {
                                                                                    ...r,
                                                                                    ...a?.[
                                                                                        e
                                                                                    ],
                                                                                };
                                                                        }
                                                                    ),
                                                                r
                                                            );
                                                        })(
                                                            a,
                                                            I,
                                                            r.modifiersStyles
                                                        ),
                                                        d = (function (
                                                            e,
                                                            t,
                                                            a = {}
                                                        ) {
                                                            return Object.entries(
                                                                e
                                                            )
                                                                .filter(
                                                                    ([, e]) =>
                                                                        !0 === e
                                                                )
                                                                .reduce(
                                                                    (
                                                                        e,
                                                                        [r]
                                                                    ) => (
                                                                        a[r]
                                                                            ? e.push(
                                                                                  a[
                                                                                      r
                                                                                  ]
                                                                              )
                                                                            : t[
                                                                                    s[
                                                                                        r
                                                                                    ]
                                                                                ]
                                                                              ? e.push(
                                                                                    t[
                                                                                        s[
                                                                                            r
                                                                                        ]
                                                                                    ]
                                                                                )
                                                                              : t[
                                                                                    l[
                                                                                        r
                                                                                    ]
                                                                                ] &&
                                                                                e.push(
                                                                                    t[
                                                                                        l[
                                                                                            r
                                                                                        ]
                                                                                    ]
                                                                                ),
                                                                        e
                                                                    ),
                                                                    [t[i.Day]]
                                                                );
                                                        })(
                                                            a,
                                                            b,
                                                            r.modifiersClassNames
                                                        ),
                                                        u =
                                                            eY || a.hidden
                                                                ? void 0
                                                                : eg(
                                                                      t,
                                                                      a,
                                                                      m.options,
                                                                      m
                                                                  );
                                                    return c.default.createElement(
                                                        o.Day,
                                                        {
                                                            key: `${e.isoDate}_${e.displayMonthId}`,
                                                            day: e,
                                                            modifiers: a,
                                                            className:
                                                                d.join(' '),
                                                            style: n,
                                                            role: 'gridcell',
                                                            'aria-selected':
                                                                a.selected ||
                                                                void 0,
                                                            'aria-label': u,
                                                            'data-day':
                                                                e.isoDate,
                                                            'data-month':
                                                                e.outside
                                                                    ? e.dateMonthId
                                                                    : void 0,
                                                            'data-selected':
                                                                a.selected ||
                                                                void 0,
                                                            'data-disabled':
                                                                a.disabled ||
                                                                void 0,
                                                            'data-hidden':
                                                                a.hidden ||
                                                                void 0,
                                                            'data-outside':
                                                                e.outside ||
                                                                void 0,
                                                            'data-focused':
                                                                a.focused ||
                                                                void 0,
                                                            'data-today':
                                                                a.today ||
                                                                void 0,
                                                        },
                                                        !a.hidden && eY
                                                            ? c.default.createElement(
                                                                  o.DayButton,
                                                                  {
                                                                      className:
                                                                          b[
                                                                              i
                                                                                  .DayButton
                                                                          ],
                                                                      style: I?.[
                                                                          i
                                                                              .DayButton
                                                                      ],
                                                                      type: 'button',
                                                                      day: e,
                                                                      modifiers:
                                                                          a,
                                                                      disabled:
                                                                          (!a.focused &&
                                                                              a.disabled) ||
                                                                          void 0,
                                                                      'aria-disabled':
                                                                          (a.focused &&
                                                                              a.disabled) ||
                                                                          void 0,
                                                                      tabIndex:
                                                                          ep(e)
                                                                              ? 0
                                                                              : -1,
                                                                      'aria-label':
                                                                          ev(
                                                                              t,
                                                                              a,
                                                                              m.options,
                                                                              m
                                                                          ),
                                                                      onClick:
                                                                          eF(
                                                                              e,
                                                                              a
                                                                          ),
                                                                      onBlur: eB(
                                                                          e,
                                                                          a
                                                                      ),
                                                                      onFocus:
                                                                          eZ(
                                                                              e,
                                                                              a
                                                                          ),
                                                                      onKeyDown:
                                                                          eP(
                                                                              e,
                                                                              a
                                                                          ),
                                                                      onMouseEnter:
                                                                          ez(
                                                                              e,
                                                                              a
                                                                          ),
                                                                      onMouseLeave:
                                                                          eU(
                                                                              e,
                                                                              a
                                                                          ),
                                                                  },
                                                                  Z(
                                                                      t,
                                                                      m.options,
                                                                      m
                                                                  )
                                                              )
                                                            : !a.hidden &&
                                                                  Z(
                                                                      e.date,
                                                                      m.options,
                                                                      m
                                                                  )
                                                    );
                                                })
                                            )
                                        )
                                    )
                                )
                            );
                        })
                    ),
                    r.footer &&
                        c.default.createElement(
                            o.Footer,
                            {
                                className: b[i.Footer],
                                style: I?.[i.Footer],
                                role: 'status',
                                'aria-live': 'polite',
                            },
                            r.footer
                        )
                )
            );
        }
        (((o = u || (u = {}))[(o.Today = 0)] = 'Today'),
            (o[(o.Selected = 1)] = 'Selected'),
            (o[(o.LastFocused = 2)] = 'LastFocused'),
            (o[(o.FocusedModifier = 3)] = 'FocusedModifier'));
        var e4 = e.i(975157),
            e6 = e.i(519455);
        function te({
            className: e,
            classNames: t,
            showOutsideDays: a = !0,
            captionLayout: r = 'label',
            buttonVariant: n = 'ghost',
            formatters: o,
            components: i,
            ...s
        }) {
            let l = eN();
            return (0, f.jsx)(e3, {
                showOutsideDays: a,
                className: (0, e4.cn)(
                    'bg-background-tertiary group/calendar p-3 [--cell-size:--spacing(8)]',
                    String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
                    String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
                    e
                ),
                captionLayout: r,
                formatters: {
                    formatMonthDropdown: (e) =>
                        e.toLocaleString('default', { month: 'short' }),
                    ...o,
                },
                classNames: {
                    root: (0, e4.cn)('w-fit', l.root),
                    months: (0, e4.cn)(
                        'flex gap-4 flex-col md:flex-row relative',
                        l.months
                    ),
                    month: (0, e4.cn)('flex flex-col w-full gap-4', l.month),
                    nav: (0, e4.cn)(
                        'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
                        l.nav
                    ),
                    button_previous: (0, e4.cn)(
                        (0, e6.buttonVariants)({ variant: n }),
                        'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
                        l.button_previous
                    ),
                    button_next: (0, e4.cn)(
                        (0, e6.buttonVariants)({ variant: n }),
                        'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
                        l.button_next
                    ),
                    month_caption: (0, e4.cn)(
                        'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
                        l.month_caption
                    ),
                    dropdowns: (0, e4.cn)(
                        'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
                        l.dropdowns
                    ),
                    dropdown_root: (0, e4.cn)(
                        'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
                        l.dropdown_root
                    ),
                    dropdown: (0, e4.cn)(
                        'absolute bg-popover inset-0 opacity-0',
                        l.dropdown
                    ),
                    caption_label: (0, e4.cn)(
                        'select-none font-medium',
                        'label' === r
                            ? 'text-sm'
                            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
                        l.caption_label
                    ),
                    table: 'w-full border-collapse',
                    weekdays: (0, e4.cn)('flex', l.weekdays),
                    weekday: (0, e4.cn)(
                        'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
                        l.weekday
                    ),
                    week: (0, e4.cn)('flex w-full mt-2', l.week),
                    week_number_header: (0, e4.cn)(
                        'select-none w-(--cell-size)',
                        l.week_number_header
                    ),
                    week_number: (0, e4.cn)(
                        'text-[0.8rem] select-none text-muted-foreground',
                        l.week_number
                    ),
                    day: (0, e4.cn)(
                        'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
                        l.day
                    ),
                    range_start: (0, e4.cn)(
                        'rounded-l-md bg-accent',
                        l.range_start
                    ),
                    range_middle: (0, e4.cn)('rounded-none', l.range_middle),
                    range_end: (0, e4.cn)(
                        'rounded-r-md bg-accent',
                        l.range_end
                    ),
                    today: (0, e4.cn)('bg-accent-primary text-white', l.today),
                    outside: (0, e4.cn)(
                        'text-muted-foreground aria-selected:text-muted-foreground',
                        l.outside
                    ),
                    disabled: (0, e4.cn)(
                        'text-muted-foreground opacity-50',
                        l.disabled
                    ),
                    hidden: (0, e4.cn)('invisible', l.hidden),
                    ...t,
                },
                components: {
                    Root: ({ className: e, rootRef: t, ...a }) =>
                        (0, f.jsx)('div', {
                            'data-slot': 'calendar',
                            ref: t,
                            className: (0, e4.cn)(e),
                            ...a,
                        }),
                    Chevron: ({ className: e, orientation: t, ...a }) =>
                        'left' === t
                            ? (0, f.jsx)(m.ChevronLeftIcon, {
                                  className: (0, e4.cn)('size-4', e),
                                  ...a,
                              })
                            : 'right' === t
                              ? (0, f.jsx)(p.ChevronRightIcon, {
                                    className: (0, e4.cn)('size-4', e),
                                    ...a,
                                })
                              : (0, f.jsx)(h.ChevronDownIcon, {
                                    className: (0, e4.cn)('size-4', e),
                                    ...a,
                                }),
                    DayButton: tt,
                    WeekNumber: ({ children: e, ...t }) =>
                        (0, f.jsx)('td', {
                            ...t,
                            children: (0, f.jsx)('div', {
                                className:
                                    'flex size-(--cell-size) items-center justify-center text-center',
                                children: e,
                            }),
                        }),
                    ...i,
                },
                ...s,
            });
        }
        function tt({ className: e, day: t, modifiers: a, ...r }) {
            let n = eN(),
                o = c.useRef(null);
            return (
                c.useEffect(() => {
                    a.focused && o.current?.focus();
                }, [a.focused]),
                (0, f.jsx)(e6.Button, {
                    ref: o,
                    variant: 'ghost',
                    size: 'icon',
                    'data-day': t.date.toLocaleDateString(),
                    'data-selected-single':
                        a.selected &&
                        !a.range_start &&
                        !a.range_end &&
                        !a.range_middle,
                    'data-range-start': a.range_start,
                    'data-range-end': a.range_end,
                    'data-range-middle': a.range_middle,
                    className: (0, e4.cn)(
                        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70',
                        n.day,
                        e
                    ),
                    ...r,
                })
            );
        }
        e.s(['Calendar', () => te], 227766);
    },
]);
