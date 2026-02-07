module.exports = [
    725749,
    (e) => {
        'use strict';
        var t = e.i(154154),
            r = e.i(140407),
            n = e.i(493068),
            a = e.i(821498),
            i = e.i(161599),
            s = e.i(182716),
            o = e.i(857635),
            d = e.i(337047),
            u = e.i(528171),
            l = e.i(367300),
            c = e.i(102610),
            h = e.i(670893),
            w = e.i(902769),
            p = e.i(46094),
            m = e.i(622730),
            f = e.i(811178),
            y = e.i(193695);
        e.i(629399);
        var g = e.i(377404),
            x = e.i(738342),
            b = e.i(698043),
            v = e.i(212669),
            T = e.i(968763);
        function k(e, t) {
            let r = (0, T.toDate)(e, t?.in),
                n = r.getMonth();
            return (
                r.setFullYear(r.getFullYear(), n + 1, 0),
                r.setHours(23, 59, 59, 999),
                r
            );
        }
        var R = e.i(451305),
            E = e.i(997488),
            D = e.i(231164),
            M = e.i(969386),
            H = e.i(242995),
            I = e.i(231963),
            q = e.i(912150);
        class P {
            subPriority = 0;
            validate(e, t) {
                return !0;
            }
        }
        class N extends P {
            constructor(e, t, r, n, a) {
                (super(),
                    (this.value = e),
                    (this.validateValue = t),
                    (this.setValue = r),
                    (this.priority = n),
                    a && (this.subPriority = a));
            }
            validate(e, t) {
                return this.validateValue(e, this.value, t);
            }
            set(e, t, r) {
                return this.setValue(e, t, this.value, r);
            }
        }
        class O extends P {
            priority = 10;
            subPriority = -1;
            constructor(e, t) {
                (super(),
                    (this.context = e || ((e) => (0, I.constructFrom)(t, e))));
            }
            set(e, t) {
                var r, n;
                let a;
                if (t.timestampIsSet) return e;
                return (0, I.constructFrom)(
                    e,
                    ((a =
                        'function' == typeof (n = r = this.context) &&
                        n.prototype?.constructor === n
                            ? new r(0)
                            : (0, I.constructFrom)(r, 0)).setFullYear(
                        e.getFullYear(),
                        e.getMonth(),
                        e.getDate()
                    ),
                    a.setHours(
                        e.getHours(),
                        e.getMinutes(),
                        e.getSeconds(),
                        e.getMilliseconds()
                    ),
                    a)
                );
            }
        }
        class S {
            run(e, t, r, n) {
                let a = this.parse(e, t, r, n);
                return a
                    ? {
                          setter: new N(
                              a.value,
                              this.validate,
                              this.set,
                              this.priority,
                              this.subPriority
                          ),
                          rest: a.rest,
                      }
                    : null;
            }
            validate(e, t, r) {
                return !0;
            }
        }
        var _ = e.i(192794);
        let A = /^(1[0-2]|0?\d)/,
            C = /^(3[0-1]|[0-2]?\d)/,
            F = /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
            Y = /^(5[0-3]|[0-4]?\d)/,
            L = /^(2[0-3]|[0-1]?\d)/,
            Q = /^(2[0-4]|[0-1]?\d)/,
            U = /^(1[0-1]|0?\d)/,
            B = /^(1[0-2]|0?\d)/,
            W = /^[0-5]?\d/,
            X = /^[0-5]?\d/,
            G = /^\d/,
            $ = /^\d{1,2}/,
            K = /^\d{1,3}/,
            j = /^\d{1,4}/,
            V = /^-?\d+/,
            Z = /^-?\d/,
            z = /^-?\d{1,2}/,
            J = /^-?\d{1,3}/,
            ee = /^-?\d{1,4}/,
            et = /^([+-])(\d{2})(\d{2})?|Z/,
            er = /^([+-])(\d{2})(\d{2})|Z/,
            en = /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
            ea = /^([+-])(\d{2}):(\d{2})|Z/,
            ei = /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/;
        function es(e, t) {
            return e ? { value: t(e.value), rest: e.rest } : e;
        }
        function eo(e, t) {
            let r = t.match(e);
            return r
                ? { value: parseInt(r[0], 10), rest: t.slice(r[0].length) }
                : null;
        }
        function ed(e, t) {
            let r = t.match(e);
            if (!r) return null;
            if ('Z' === r[0]) return { value: 0, rest: t.slice(1) };
            let n = '+' === r[1] ? 1 : -1,
                a = r[2] ? parseInt(r[2], 10) : 0,
                i = r[3] ? parseInt(r[3], 10) : 0,
                s = r[5] ? parseInt(r[5], 10) : 0;
            return {
                value:
                    n *
                    (a * _.millisecondsInHour +
                        i * _.millisecondsInMinute +
                        s * _.millisecondsInSecond),
                rest: t.slice(r[0].length),
            };
        }
        function eu(e, t) {
            switch (e) {
                case 1:
                    return eo(G, t);
                case 2:
                    return eo($, t);
                case 3:
                    return eo(K, t);
                case 4:
                    return eo(j, t);
                default:
                    return eo(RegExp('^\\d{1,' + e + '}'), t);
            }
        }
        function el(e, t) {
            switch (e) {
                case 1:
                    return eo(Z, t);
                case 2:
                    return eo(z, t);
                case 3:
                    return eo(J, t);
                case 4:
                    return eo(ee, t);
                default:
                    return eo(RegExp('^-?\\d{1,' + e + '}'), t);
            }
        }
        function ec(e) {
            switch (e) {
                case 'morning':
                    return 4;
                case 'evening':
                    return 17;
                case 'pm':
                case 'noon':
                case 'afternoon':
                    return 12;
                default:
                    return 0;
            }
        }
        function eh(e, t) {
            let r,
                n = t > 0,
                a = n ? t : 1 - t;
            if (a <= 50) r = e || 100;
            else {
                let t = a + 50;
                r = e + 100 * Math.trunc(t / 100) - 100 * (e >= t % 100);
            }
            return n ? r : 1 - r;
        }
        function ew(e) {
            return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
        }
        var ep = e.i(209694),
            em = e.i(577198),
            ef = e.i(781504),
            ey = e.i(404036),
            eg = e.i(322414);
        let ex = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            eb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var ev = e.i(872266);
        function eT(e, t, r) {
            let n = (0, q.getDefaultOptions)(),
                a =
                    r?.weekStartsOn ??
                    r?.locale?.options?.weekStartsOn ??
                    n.weekStartsOn ??
                    n.locale?.options?.weekStartsOn ??
                    0,
                i = (0, T.toDate)(e, r?.in),
                s = i.getDay(),
                o = 7 - a,
                d =
                    t < 0 || t > 6
                        ? t - ((s + o) % 7)
                        : (((((t % 7) + 7) % 7) + o) % 7) - ((s + o) % 7);
            return (0, ev.addDays)(i, d, r);
        }
        var ek = e.i(803967);
        let eR = {
                G: new (class extends S {
                    priority = 140;
                    parse(e, t, r) {
                        switch (t) {
                            case 'G':
                            case 'GG':
                            case 'GGG':
                                return (
                                    r.era(e, { width: 'abbreviated' }) ||
                                    r.era(e, { width: 'narrow' })
                                );
                            case 'GGGGG':
                                return r.era(e, { width: 'narrow' });
                            default:
                                return (
                                    r.era(e, { width: 'wide' }) ||
                                    r.era(e, { width: 'abbreviated' }) ||
                                    r.era(e, { width: 'narrow' })
                                );
                        }
                    }
                    set(e, t, r) {
                        return (
                            (t.era = r),
                            e.setFullYear(r, 0, 1),
                            e.setHours(0, 0, 0, 0),
                            e
                        );
                    }
                    incompatibleTokens = ['R', 'u', 't', 'T'];
                })(),
                y: new (class extends S {
                    priority = 130;
                    incompatibleTokens = [
                        'Y',
                        'R',
                        'u',
                        'w',
                        'I',
                        'i',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                    parse(e, t, r) {
                        let n = (e) => ({
                            year: e,
                            isTwoDigitYear: 'yy' === t,
                        });
                        switch (t) {
                            case 'y':
                                return es(eu(4, e), n);
                            case 'yo':
                                return es(
                                    r.ordinalNumber(e, { unit: 'year' }),
                                    n
                                );
                            default:
                                return es(eu(t.length, e), n);
                        }
                    }
                    validate(e, t) {
                        return t.isTwoDigitYear || t.year > 0;
                    }
                    set(e, t, r) {
                        let n = e.getFullYear();
                        if (r.isTwoDigitYear) {
                            let t = eh(r.year, n);
                            return (
                                e.setFullYear(t, 0, 1),
                                e.setHours(0, 0, 0, 0),
                                e
                            );
                        }
                        let a = 'era' in t && 1 !== t.era ? 1 - r.year : r.year;
                        return (
                            e.setFullYear(a, 0, 1),
                            e.setHours(0, 0, 0, 0),
                            e
                        );
                    }
                })(),
                Y: new (class extends S {
                    priority = 130;
                    parse(e, t, r) {
                        let n = (e) => ({
                            year: e,
                            isTwoDigitYear: 'YY' === t,
                        });
                        switch (t) {
                            case 'Y':
                                return es(eu(4, e), n);
                            case 'Yo':
                                return es(
                                    r.ordinalNumber(e, { unit: 'year' }),
                                    n
                                );
                            default:
                                return es(eu(t.length, e), n);
                        }
                    }
                    validate(e, t) {
                        return t.isTwoDigitYear || t.year > 0;
                    }
                    set(e, t, r, n) {
                        let a = (0, ep.getWeekYear)(e, n);
                        if (r.isTwoDigitYear) {
                            let t = eh(r.year, a);
                            return (
                                e.setFullYear(t, 0, n.firstWeekContainsDate),
                                e.setHours(0, 0, 0, 0),
                                (0, em.startOfWeek)(e, n)
                            );
                        }
                        let i = 'era' in t && 1 !== t.era ? 1 - r.year : r.year;
                        return (
                            e.setFullYear(i, 0, n.firstWeekContainsDate),
                            e.setHours(0, 0, 0, 0),
                            (0, em.startOfWeek)(e, n)
                        );
                    }
                    incompatibleTokens = [
                        'y',
                        'R',
                        'u',
                        'Q',
                        'q',
                        'M',
                        'L',
                        'I',
                        'd',
                        'D',
                        'i',
                        't',
                        'T',
                    ];
                })(),
                R: new (class extends S {
                    priority = 130;
                    parse(e, t) {
                        return 'R' === t ? el(4, e) : el(t.length, e);
                    }
                    set(e, t, r) {
                        let n = (0, I.constructFrom)(e, 0);
                        return (
                            n.setFullYear(r, 0, 4),
                            n.setHours(0, 0, 0, 0),
                            (0, ef.startOfISOWeek)(n)
                        );
                    }
                    incompatibleTokens = [
                        'G',
                        'y',
                        'Y',
                        'u',
                        'Q',
                        'q',
                        'M',
                        'L',
                        'w',
                        'd',
                        'D',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                u: new (class extends S {
                    priority = 130;
                    parse(e, t) {
                        return 'u' === t ? el(4, e) : el(t.length, e);
                    }
                    set(e, t, r) {
                        return (
                            e.setFullYear(r, 0, 1),
                            e.setHours(0, 0, 0, 0),
                            e
                        );
                    }
                    incompatibleTokens = [
                        'G',
                        'y',
                        'Y',
                        'R',
                        'w',
                        'I',
                        'i',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                Q: new (class extends S {
                    priority = 120;
                    parse(e, t, r) {
                        switch (t) {
                            case 'Q':
                            case 'QQ':
                                return eu(t.length, e);
                            case 'Qo':
                                return r.ordinalNumber(e, { unit: 'quarter' });
                            case 'QQQ':
                                return (
                                    r.quarter(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.quarter(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            case 'QQQQQ':
                                return r.quarter(e, {
                                    width: 'narrow',
                                    context: 'formatting',
                                });
                            default:
                                return (
                                    r.quarter(e, {
                                        width: 'wide',
                                        context: 'formatting',
                                    }) ||
                                    r.quarter(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.quarter(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                        }
                    }
                    validate(e, t) {
                        return t >= 1 && t <= 4;
                    }
                    set(e, t, r) {
                        return (
                            e.setMonth((r - 1) * 3, 1),
                            e.setHours(0, 0, 0, 0),
                            e
                        );
                    }
                    incompatibleTokens = [
                        'Y',
                        'R',
                        'q',
                        'M',
                        'L',
                        'w',
                        'I',
                        'd',
                        'D',
                        'i',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                q: new (class extends S {
                    priority = 120;
                    parse(e, t, r) {
                        switch (t) {
                            case 'q':
                            case 'qq':
                                return eu(t.length, e);
                            case 'qo':
                                return r.ordinalNumber(e, { unit: 'quarter' });
                            case 'qqq':
                                return (
                                    r.quarter(e, {
                                        width: 'abbreviated',
                                        context: 'standalone',
                                    }) ||
                                    r.quarter(e, {
                                        width: 'narrow',
                                        context: 'standalone',
                                    })
                                );
                            case 'qqqqq':
                                return r.quarter(e, {
                                    width: 'narrow',
                                    context: 'standalone',
                                });
                            default:
                                return (
                                    r.quarter(e, {
                                        width: 'wide',
                                        context: 'standalone',
                                    }) ||
                                    r.quarter(e, {
                                        width: 'abbreviated',
                                        context: 'standalone',
                                    }) ||
                                    r.quarter(e, {
                                        width: 'narrow',
                                        context: 'standalone',
                                    })
                                );
                        }
                    }
                    validate(e, t) {
                        return t >= 1 && t <= 4;
                    }
                    set(e, t, r) {
                        return (
                            e.setMonth((r - 1) * 3, 1),
                            e.setHours(0, 0, 0, 0),
                            e
                        );
                    }
                    incompatibleTokens = [
                        'Y',
                        'R',
                        'Q',
                        'M',
                        'L',
                        'w',
                        'I',
                        'd',
                        'D',
                        'i',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                M: new (class extends S {
                    incompatibleTokens = [
                        'Y',
                        'R',
                        'q',
                        'Q',
                        'L',
                        'w',
                        'I',
                        'D',
                        'i',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                    priority = 110;
                    parse(e, t, r) {
                        let n = (e) => e - 1;
                        switch (t) {
                            case 'M':
                                return es(eo(A, e), n);
                            case 'MM':
                                return es(eu(2, e), n);
                            case 'Mo':
                                return es(
                                    r.ordinalNumber(e, { unit: 'month' }),
                                    n
                                );
                            case 'MMM':
                                return (
                                    r.month(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.month(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            case 'MMMMM':
                                return r.month(e, {
                                    width: 'narrow',
                                    context: 'formatting',
                                });
                            default:
                                return (
                                    r.month(e, {
                                        width: 'wide',
                                        context: 'formatting',
                                    }) ||
                                    r.month(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.month(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 11;
                    }
                    set(e, t, r) {
                        return (e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e);
                    }
                })(),
                L: new (class extends S {
                    priority = 110;
                    parse(e, t, r) {
                        let n = (e) => e - 1;
                        switch (t) {
                            case 'L':
                                return es(eo(A, e), n);
                            case 'LL':
                                return es(eu(2, e), n);
                            case 'Lo':
                                return es(
                                    r.ordinalNumber(e, { unit: 'month' }),
                                    n
                                );
                            case 'LLL':
                                return (
                                    r.month(e, {
                                        width: 'abbreviated',
                                        context: 'standalone',
                                    }) ||
                                    r.month(e, {
                                        width: 'narrow',
                                        context: 'standalone',
                                    })
                                );
                            case 'LLLLL':
                                return r.month(e, {
                                    width: 'narrow',
                                    context: 'standalone',
                                });
                            default:
                                return (
                                    r.month(e, {
                                        width: 'wide',
                                        context: 'standalone',
                                    }) ||
                                    r.month(e, {
                                        width: 'abbreviated',
                                        context: 'standalone',
                                    }) ||
                                    r.month(e, {
                                        width: 'narrow',
                                        context: 'standalone',
                                    })
                                );
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 11;
                    }
                    set(e, t, r) {
                        return (e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e);
                    }
                    incompatibleTokens = [
                        'Y',
                        'R',
                        'q',
                        'Q',
                        'M',
                        'w',
                        'I',
                        'D',
                        'i',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                w: new (class extends S {
                    priority = 100;
                    parse(e, t, r) {
                        switch (t) {
                            case 'w':
                                return eo(Y, e);
                            case 'wo':
                                return r.ordinalNumber(e, { unit: 'week' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return t >= 1 && t <= 53;
                    }
                    set(e, t, r, n) {
                        let a, i;
                        return (0, em.startOfWeek)(
                            ((a = (0, T.toDate)(e, n?.in)),
                            (i = (0, ey.getWeek)(a, n) - r),
                            a.setDate(a.getDate() - 7 * i),
                            (0, T.toDate)(a, n?.in)),
                            n
                        );
                    }
                    incompatibleTokens = [
                        'y',
                        'R',
                        'u',
                        'q',
                        'Q',
                        'M',
                        'L',
                        'I',
                        'd',
                        'D',
                        'i',
                        't',
                        'T',
                    ];
                })(),
                I: new (class extends S {
                    priority = 100;
                    parse(e, t, r) {
                        switch (t) {
                            case 'I':
                                return eo(Y, e);
                            case 'Io':
                                return r.ordinalNumber(e, { unit: 'week' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return t >= 1 && t <= 53;
                    }
                    set(e, t, r) {
                        let n, a;
                        return (0, ef.startOfISOWeek)(
                            ((n = (0, T.toDate)(e, void 0)),
                            (a = (0, eg.getISOWeek)(n, void 0) - r),
                            n.setDate(n.getDate() - 7 * a),
                            n)
                        );
                    }
                    incompatibleTokens = [
                        'y',
                        'Y',
                        'u',
                        'q',
                        'Q',
                        'M',
                        'L',
                        'w',
                        'd',
                        'D',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                d: new (class extends S {
                    priority = 90;
                    subPriority = 1;
                    parse(e, t, r) {
                        switch (t) {
                            case 'd':
                                return eo(C, e);
                            case 'do':
                                return r.ordinalNumber(e, { unit: 'date' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        let r = ew(e.getFullYear()),
                            n = e.getMonth();
                        return r ? t >= 1 && t <= eb[n] : t >= 1 && t <= ex[n];
                    }
                    set(e, t, r) {
                        return (e.setDate(r), e.setHours(0, 0, 0, 0), e);
                    }
                    incompatibleTokens = [
                        'Y',
                        'R',
                        'q',
                        'Q',
                        'w',
                        'I',
                        'D',
                        'i',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                D: new (class extends S {
                    priority = 90;
                    subpriority = 1;
                    parse(e, t, r) {
                        switch (t) {
                            case 'D':
                            case 'DD':
                                return eo(F, e);
                            case 'Do':
                                return r.ordinalNumber(e, { unit: 'date' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return ew(e.getFullYear())
                            ? t >= 1 && t <= 366
                            : t >= 1 && t <= 365;
                    }
                    set(e, t, r) {
                        return (e.setMonth(0, r), e.setHours(0, 0, 0, 0), e);
                    }
                    incompatibleTokens = [
                        'Y',
                        'R',
                        'q',
                        'Q',
                        'M',
                        'L',
                        'w',
                        'I',
                        'd',
                        'E',
                        'i',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                E: new (class extends S {
                    priority = 90;
                    parse(e, t, r) {
                        switch (t) {
                            case 'E':
                            case 'EE':
                            case 'EEE':
                                return (
                                    r.day(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'short',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            case 'EEEEE':
                                return r.day(e, {
                                    width: 'narrow',
                                    context: 'formatting',
                                });
                            case 'EEEEEE':
                                return (
                                    r.day(e, {
                                        width: 'short',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            default:
                                return (
                                    r.day(e, {
                                        width: 'wide',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'short',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 6;
                    }
                    set(e, t, r, n) {
                        return ((e = eT(e, r, n)).setHours(0, 0, 0, 0), e);
                    }
                    incompatibleTokens = ['D', 'i', 'e', 'c', 't', 'T'];
                })(),
                e: new (class extends S {
                    priority = 90;
                    parse(e, t, r, n) {
                        let a = (e) => {
                            let t = 7 * Math.floor((e - 1) / 7);
                            return ((e + n.weekStartsOn + 6) % 7) + t;
                        };
                        switch (t) {
                            case 'e':
                            case 'ee':
                                return es(eu(t.length, e), a);
                            case 'eo':
                                return es(
                                    r.ordinalNumber(e, { unit: 'day' }),
                                    a
                                );
                            case 'eee':
                                return (
                                    r.day(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'short',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            case 'eeeee':
                                return r.day(e, {
                                    width: 'narrow',
                                    context: 'formatting',
                                });
                            case 'eeeeee':
                                return (
                                    r.day(e, {
                                        width: 'short',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            default:
                                return (
                                    r.day(e, {
                                        width: 'wide',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'short',
                                        context: 'formatting',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 6;
                    }
                    set(e, t, r, n) {
                        return ((e = eT(e, r, n)).setHours(0, 0, 0, 0), e);
                    }
                    incompatibleTokens = [
                        'y',
                        'R',
                        'u',
                        'q',
                        'Q',
                        'M',
                        'L',
                        'I',
                        'd',
                        'D',
                        'E',
                        'i',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                c: new (class extends S {
                    priority = 90;
                    parse(e, t, r, n) {
                        let a = (e) => {
                            let t = 7 * Math.floor((e - 1) / 7);
                            return ((e + n.weekStartsOn + 6) % 7) + t;
                        };
                        switch (t) {
                            case 'c':
                            case 'cc':
                                return es(eu(t.length, e), a);
                            case 'co':
                                return es(
                                    r.ordinalNumber(e, { unit: 'day' }),
                                    a
                                );
                            case 'ccc':
                                return (
                                    r.day(e, {
                                        width: 'abbreviated',
                                        context: 'standalone',
                                    }) ||
                                    r.day(e, {
                                        width: 'short',
                                        context: 'standalone',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'standalone',
                                    })
                                );
                            case 'ccccc':
                                return r.day(e, {
                                    width: 'narrow',
                                    context: 'standalone',
                                });
                            case 'cccccc':
                                return (
                                    r.day(e, {
                                        width: 'short',
                                        context: 'standalone',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'standalone',
                                    })
                                );
                            default:
                                return (
                                    r.day(e, {
                                        width: 'wide',
                                        context: 'standalone',
                                    }) ||
                                    r.day(e, {
                                        width: 'abbreviated',
                                        context: 'standalone',
                                    }) ||
                                    r.day(e, {
                                        width: 'short',
                                        context: 'standalone',
                                    }) ||
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'standalone',
                                    })
                                );
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 6;
                    }
                    set(e, t, r, n) {
                        return ((e = eT(e, r, n)).setHours(0, 0, 0, 0), e);
                    }
                    incompatibleTokens = [
                        'y',
                        'R',
                        'u',
                        'q',
                        'Q',
                        'M',
                        'L',
                        'I',
                        'd',
                        'D',
                        'E',
                        'i',
                        'e',
                        't',
                        'T',
                    ];
                })(),
                i: new (class extends S {
                    priority = 90;
                    parse(e, t, r) {
                        let n = (e) => (0 === e ? 7 : e);
                        switch (t) {
                            case 'i':
                            case 'ii':
                                return eu(t.length, e);
                            case 'io':
                                return r.ordinalNumber(e, { unit: 'day' });
                            case 'iii':
                                return es(
                                    r.day(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                        r.day(e, {
                                            width: 'short',
                                            context: 'formatting',
                                        }) ||
                                        r.day(e, {
                                            width: 'narrow',
                                            context: 'formatting',
                                        }),
                                    n
                                );
                            case 'iiiii':
                                return es(
                                    r.day(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    }),
                                    n
                                );
                            case 'iiiiii':
                                return es(
                                    r.day(e, {
                                        width: 'short',
                                        context: 'formatting',
                                    }) ||
                                        r.day(e, {
                                            width: 'narrow',
                                            context: 'formatting',
                                        }),
                                    n
                                );
                            default:
                                return es(
                                    r.day(e, {
                                        width: 'wide',
                                        context: 'formatting',
                                    }) ||
                                        r.day(e, {
                                            width: 'abbreviated',
                                            context: 'formatting',
                                        }) ||
                                        r.day(e, {
                                            width: 'short',
                                            context: 'formatting',
                                        }) ||
                                        r.day(e, {
                                            width: 'narrow',
                                            context: 'formatting',
                                        }),
                                    n
                                );
                        }
                    }
                    validate(e, t) {
                        return t >= 1 && t <= 7;
                    }
                    set(e, t, r) {
                        var n, a;
                        let i, s, o;
                        return (
                            (n = e),
                            (i = (0, T.toDate)(n, void 0)),
                            (a = void 0),
                            (o =
                                0 === (s = (0, T.toDate)(i, a?.in).getDay())
                                    ? 7
                                    : s),
                            (e = (0, ev.addDays)(i, r - o, void 0)).setHours(
                                0,
                                0,
                                0,
                                0
                            ),
                            e
                        );
                    }
                    incompatibleTokens = [
                        'y',
                        'Y',
                        'u',
                        'q',
                        'Q',
                        'M',
                        'L',
                        'w',
                        'd',
                        'D',
                        'E',
                        'e',
                        'c',
                        't',
                        'T',
                    ];
                })(),
                a: new (class extends S {
                    priority = 80;
                    parse(e, t, r) {
                        switch (t) {
                            case 'a':
                            case 'aa':
                            case 'aaa':
                                return (
                                    r.dayPeriod(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            case 'aaaaa':
                                return r.dayPeriod(e, {
                                    width: 'narrow',
                                    context: 'formatting',
                                });
                            default:
                                return (
                                    r.dayPeriod(e, {
                                        width: 'wide',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                        }
                    }
                    set(e, t, r) {
                        return (e.setHours(ec(r), 0, 0, 0), e);
                    }
                    incompatibleTokens = ['b', 'B', 'H', 'k', 't', 'T'];
                })(),
                b: new (class extends S {
                    priority = 80;
                    parse(e, t, r) {
                        switch (t) {
                            case 'b':
                            case 'bb':
                            case 'bbb':
                                return (
                                    r.dayPeriod(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            case 'bbbbb':
                                return r.dayPeriod(e, {
                                    width: 'narrow',
                                    context: 'formatting',
                                });
                            default:
                                return (
                                    r.dayPeriod(e, {
                                        width: 'wide',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                        }
                    }
                    set(e, t, r) {
                        return (e.setHours(ec(r), 0, 0, 0), e);
                    }
                    incompatibleTokens = ['a', 'B', 'H', 'k', 't', 'T'];
                })(),
                B: new (class extends S {
                    priority = 80;
                    parse(e, t, r) {
                        switch (t) {
                            case 'B':
                            case 'BB':
                            case 'BBB':
                                return (
                                    r.dayPeriod(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                            case 'BBBBB':
                                return r.dayPeriod(e, {
                                    width: 'narrow',
                                    context: 'formatting',
                                });
                            default:
                                return (
                                    r.dayPeriod(e, {
                                        width: 'wide',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'abbreviated',
                                        context: 'formatting',
                                    }) ||
                                    r.dayPeriod(e, {
                                        width: 'narrow',
                                        context: 'formatting',
                                    })
                                );
                        }
                    }
                    set(e, t, r) {
                        return (e.setHours(ec(r), 0, 0, 0), e);
                    }
                    incompatibleTokens = ['a', 'b', 't', 'T'];
                })(),
                h: new (class extends S {
                    priority = 70;
                    parse(e, t, r) {
                        switch (t) {
                            case 'h':
                                return eo(B, e);
                            case 'ho':
                                return r.ordinalNumber(e, { unit: 'hour' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return t >= 1 && t <= 12;
                    }
                    set(e, t, r) {
                        let n = e.getHours() >= 12;
                        return (
                            n && r < 12
                                ? e.setHours(r + 12, 0, 0, 0)
                                : n || 12 !== r
                                  ? e.setHours(r, 0, 0, 0)
                                  : e.setHours(0, 0, 0, 0),
                            e
                        );
                    }
                    incompatibleTokens = ['H', 'K', 'k', 't', 'T'];
                })(),
                H: new (class extends S {
                    priority = 70;
                    parse(e, t, r) {
                        switch (t) {
                            case 'H':
                                return eo(L, e);
                            case 'Ho':
                                return r.ordinalNumber(e, { unit: 'hour' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 23;
                    }
                    set(e, t, r) {
                        return (e.setHours(r, 0, 0, 0), e);
                    }
                    incompatibleTokens = ['a', 'b', 'h', 'K', 'k', 't', 'T'];
                })(),
                K: new (class extends S {
                    priority = 70;
                    parse(e, t, r) {
                        switch (t) {
                            case 'K':
                                return eo(U, e);
                            case 'Ko':
                                return r.ordinalNumber(e, { unit: 'hour' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 11;
                    }
                    set(e, t, r) {
                        return (
                            e.getHours() >= 12 && r < 12
                                ? e.setHours(r + 12, 0, 0, 0)
                                : e.setHours(r, 0, 0, 0),
                            e
                        );
                    }
                    incompatibleTokens = ['h', 'H', 'k', 't', 'T'];
                })(),
                k: new (class extends S {
                    priority = 70;
                    parse(e, t, r) {
                        switch (t) {
                            case 'k':
                                return eo(Q, e);
                            case 'ko':
                                return r.ordinalNumber(e, { unit: 'hour' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return t >= 1 && t <= 24;
                    }
                    set(e, t, r) {
                        return (e.setHours(r <= 24 ? r % 24 : r, 0, 0, 0), e);
                    }
                    incompatibleTokens = ['a', 'b', 'h', 'H', 'K', 't', 'T'];
                })(),
                m: new (class extends S {
                    priority = 60;
                    parse(e, t, r) {
                        switch (t) {
                            case 'm':
                                return eo(W, e);
                            case 'mo':
                                return r.ordinalNumber(e, { unit: 'minute' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 59;
                    }
                    set(e, t, r) {
                        return (e.setMinutes(r, 0, 0), e);
                    }
                    incompatibleTokens = ['t', 'T'];
                })(),
                s: new (class extends S {
                    priority = 50;
                    parse(e, t, r) {
                        switch (t) {
                            case 's':
                                return eo(X, e);
                            case 'so':
                                return r.ordinalNumber(e, { unit: 'second' });
                            default:
                                return eu(t.length, e);
                        }
                    }
                    validate(e, t) {
                        return t >= 0 && t <= 59;
                    }
                    set(e, t, r) {
                        return (e.setSeconds(r, 0), e);
                    }
                    incompatibleTokens = ['t', 'T'];
                })(),
                S: new (class extends S {
                    priority = 30;
                    parse(e, t) {
                        return es(eu(t.length, e), (e) =>
                            Math.trunc(e * Math.pow(10, -t.length + 3))
                        );
                    }
                    set(e, t, r) {
                        return (e.setMilliseconds(r), e);
                    }
                    incompatibleTokens = ['t', 'T'];
                })(),
                X: new (class extends S {
                    priority = 10;
                    parse(e, t) {
                        switch (t) {
                            case 'X':
                                return ed(et, e);
                            case 'XX':
                                return ed(er, e);
                            case 'XXXX':
                                return ed(en, e);
                            case 'XXXXX':
                                return ed(ei, e);
                            default:
                                return ed(ea, e);
                        }
                    }
                    set(e, t, r) {
                        return t.timestampIsSet
                            ? e
                            : (0, I.constructFrom)(
                                  e,
                                  e.getTime() -
                                      (0, ek.getTimezoneOffsetInMilliseconds)(
                                          e
                                      ) -
                                      r
                              );
                    }
                    incompatibleTokens = ['t', 'T', 'x'];
                })(),
                x: new (class extends S {
                    priority = 10;
                    parse(e, t) {
                        switch (t) {
                            case 'x':
                                return ed(et, e);
                            case 'xx':
                                return ed(er, e);
                            case 'xxxx':
                                return ed(en, e);
                            case 'xxxxx':
                                return ed(ei, e);
                            default:
                                return ed(ea, e);
                        }
                    }
                    set(e, t, r) {
                        return t.timestampIsSet
                            ? e
                            : (0, I.constructFrom)(
                                  e,
                                  e.getTime() -
                                      (0, ek.getTimezoneOffsetInMilliseconds)(
                                          e
                                      ) -
                                      r
                              );
                    }
                    incompatibleTokens = ['t', 'T', 'X'];
                })(),
                t: new (class extends S {
                    priority = 40;
                    parse(e) {
                        return eo(V, e);
                    }
                    set(e, t, r) {
                        return [
                            (0, I.constructFrom)(e, 1e3 * r),
                            { timestampIsSet: !0 },
                        ];
                    }
                    incompatibleTokens = '*';
                })(),
                T: new (class extends S {
                    priority = 20;
                    parse(e) {
                        return eo(V, e);
                    }
                    set(e, t, r) {
                        return [
                            (0, I.constructFrom)(e, r),
                            { timestampIsSet: !0 },
                        ];
                    }
                    incompatibleTokens = '*';
                })(),
            },
            eE = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
            eD = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
            eM = /^'([^]*?)'?$/,
            eH = /''/g,
            eI = /\S/,
            eq = /[a-zA-Z]/;
        function eP(e, t, r, n) {
            let a = () => (0, I.constructFrom)(n?.in || r, NaN),
                i = Object.assign({}, (0, q.getDefaultOptions)()),
                s = n?.locale ?? i.locale ?? D.defaultLocale,
                o =
                    n?.firstWeekContainsDate ??
                    n?.locale?.options?.firstWeekContainsDate ??
                    i.firstWeekContainsDate ??
                    i.locale?.options?.firstWeekContainsDate ??
                    1,
                d =
                    n?.weekStartsOn ??
                    n?.locale?.options?.weekStartsOn ??
                    i.weekStartsOn ??
                    i.locale?.options?.weekStartsOn ??
                    0;
            if (!t) return e ? a() : (0, T.toDate)(r, n?.in);
            let u = { firstWeekContainsDate: o, weekStartsOn: d, locale: s },
                l = [new O(n?.in, r)],
                c = t
                    .match(eD)
                    .map((e) => {
                        let t = e[0];
                        return t in M.longFormatters
                            ? (0, M.longFormatters[t])(e, s.formatLong)
                            : e;
                    })
                    .join('')
                    .match(eE),
                h = [];
            for (let r of c) {
                (!n?.useAdditionalWeekYearTokens &&
                    (0, H.isProtectedWeekYearToken)(r) &&
                    (0, H.warnOrThrowProtectedError)(r, t, e),
                    !n?.useAdditionalDayOfYearTokens &&
                        (0, H.isProtectedDayOfYearToken)(r) &&
                        (0, H.warnOrThrowProtectedError)(r, t, e));
                let i = r[0],
                    o = eR[i];
                if (o) {
                    let { incompatibleTokens: t } = o;
                    if (Array.isArray(t)) {
                        let e = h.find(
                            (e) => t.includes(e.token) || e.token === i
                        );
                        if (e)
                            throw RangeError(
                                `The format string mustn't contain \`${e.fullToken}\` and \`${r}\` at the same time`
                            );
                    } else if ('*' === o.incompatibleTokens && h.length > 0)
                        throw RangeError(
                            `The format string mustn't contain \`${r}\` and any other token at the same time`
                        );
                    h.push({ token: i, fullToken: r });
                    let n = o.run(e, r, s.match, u);
                    if (!n) return a();
                    (l.push(n.setter), (e = n.rest));
                } else {
                    if (i.match(eq))
                        throw RangeError(
                            'Format string contains an unescaped latin alphabet character `' +
                                i +
                                '`'
                        );
                    if (
                        ("''" === r
                            ? (r = "'")
                            : "'" === i &&
                              (r = r.match(eM)[1].replace(eH, "'")),
                        0 !== e.indexOf(r))
                    )
                        return a();
                    e = e.slice(r.length);
                }
            }
            if (e.length > 0 && eI.test(e)) return a();
            let w = l
                    .map((e) => e.priority)
                    .sort((e, t) => t - e)
                    .filter((e, t, r) => r.indexOf(e) === t)
                    .map((e) =>
                        l
                            .filter((t) => t.priority === e)
                            .sort((e, t) => t.subPriority - e.subPriority)
                    )
                    .map((e) => e[0]),
                p = (0, T.toDate)(r, n?.in);
            if (isNaN(+p)) return a();
            let m = {};
            for (let e of w) {
                if (!e.validate(p, u)) return a();
                let t = e.set(p, m, u);
                Array.isArray(t)
                    ? ((p = t[0]), Object.assign(m, t[1]))
                    : (p = t);
            }
            return p;
        }
        function eN(e, t) {
            let r = (0, T.toDate)(e, t?.in);
            return (r.setDate(1), r.setHours(0, 0, 0, 0), r);
        }
        function eO(e, t = 400) {
            return x.NextResponse.json({ ok: !1, error: e }, { status: t });
        }
        function eS(e) {
            let t = eP(e, 'yyyy-MM-dd', new Date());
            return (0, E.isValid)(t) ? t : null;
        }
        async function e_(e) {
            var t;
            let r,
                n,
                a,
                i = await (0, v.requireAdminForModuleApi)('FINANCE');
            if (i instanceof x.NextResponse) return i;
            let s = i?.companyId ?? null;
            if (!s) return eO('missing_company', 403);
            let o = i?.userId ?? null,
                d = null;
            try {
                d = await e.json();
            } catch {
                return eO('invalid_json', 400);
            }
            let u = String(d?.month || '').trim(),
                l = String(d?.unitId || '').trim(),
                c = String(d?.description || '').trim(),
                h = Number(d?.amount),
                w = !!d?.isRecurring,
                p = d?.recurringDay != null ? Number(d.recurringDay) : void 0,
                m = d?.dueDate != null ? String(d.dueDate).trim() : void 0;
            if (!u) return eO('month_required', 400);
            let f =
                ((n = eP(u, 'yyyy-MM', new Date())),
                (0, E.isValid)(n) ? eN(n) : null);
            if (!f) return eO('month_invalid', 400);
            if (!l || 'all' === l) return eO('unit_required', 400);
            if (!c) return eO('description_required', 400);
            if (!Number.isFinite(h) || h <= 0) return eO('amount_invalid', 400);
            let y = h.toFixed(2);
            if (w) {
                if (null == p || !Number.isFinite(p) || p < 1 || p > 31)
                    return eO('recurring_day_invalid', 400);
            } else {
                if (!m) return eO('due_date_required', 400);
                if (!eS(m)) return eO('due_date_invalid', 400);
            }
            if (
                !(await b.prisma.unit.findFirst({
                    where: { id: l, companyId: s, isActive: !0 },
                    select: { id: !0 },
                }))
            )
                return eO('unit_not_found', 404);
            if (!i?.canSeeAllUnits)
                if (o) {
                    let e = await b.prisma.adminUnitAccess.findFirst({
                        where: { companyId: s, userId: o, unitId: l },
                        select: { id: !0 },
                    });
                    if (!e?.id) {
                        let e = i?.unitId ?? null;
                        if (!e) return eO('missing_admin_unit', 403);
                        if (l !== e) return eO('forbidden_unit', 403);
                    }
                } else {
                    let e = i?.unitId ?? null;
                    if (!e) return eO('missing_admin_unit', 403);
                    if (l !== e) return eO('forbidden_unit', 403);
                }
            let g =
                'RENT' ===
                    (a = String(d?.category ?? 'OTHER')
                        .trim()
                        .toUpperCase()) ||
                'UTILITIES' === a ||
                'TAXES' === a ||
                'SUPPLIES' === a ||
                'OTHER' === a
                    ? a
                    : 'OTHER';
            if (w) {
                let e,
                    t = ((e = k(f).getDate()), p <= 1 ? 1 : p >= e ? e : p);
                r = new Date(f.getFullYear(), f.getMonth(), t);
            } else {
                let e = eS(m);
                if (!e) return eO('due_date_invalid', 400);
                let t = eN(f),
                    n = k(f);
                if (e < t || e > n) return eO('due_date_out_of_month', 400);
                r = e;
            }
            try {
                let e = await b.prisma.$transaction(async (e) => {
                    let t = await e.expense.findFirst({
                        where: {
                            companyId: s,
                            unitId: l,
                            description: c,
                            category: g,
                            dueDate: r,
                            isRecurring: w,
                        },
                        select: { id: !0 },
                    });
                    return t?.id
                        ? {
                              expenseId: t.id,
                              monthQuery: (0, R.format)(f, 'yyyy-MM'),
                              created: !1,
                          }
                        : {
                              expenseId: (
                                  await e.expense.create({
                                      data: {
                                          companyId: s,
                                          unitId: l,
                                          description: c,
                                          category: g,
                                          amount: y,
                                          dueDate: r,
                                          isRecurring: w,
                                          isPaid: !1,
                                      },
                                      select: { id: !0 },
                                  })
                              ).id,
                              monthQuery: (0, R.format)(f, 'yyyy-MM'),
                              created: !0,
                          };
                });
                return (
                    (t = { status: e.created ? 201 : 200 }),
                    x.NextResponse.json({ ok: !0, data: e }, t)
                );
            } catch (e) {
                return (
                    console.error(
                        '[POST /api/admin/finance/expenses] internal_error',
                        e
                    ),
                    eO('internal_error', 500)
                );
            }
        }
        e.s(
            [
                'POST',
                () => e_,
                'dynamic',
                0,
                'force-dynamic',
                'revalidate',
                0,
                0,
            ],
            524853
        );
        var eA = e.i(524853);
        let eC = new t.AppRouteRouteModule({
                definition: {
                    kind: r.RouteKind.APP_ROUTE,
                    page: '/api/admin/finance/expenses/route',
                    pathname: '/api/admin/finance/expenses',
                    filename: 'route',
                    bundlePath: '',
                },
                distDir: '.next',
                relativeProjectDir: '',
                resolvedPagePath:
                    '[project]/src/app/api/admin/finance/expenses/route.ts',
                nextConfigOutput: 'standalone',
                userland: eA,
            }),
            {
                workAsyncStorage: eF,
                workUnitAsyncStorage: eY,
                serverHooks: eL,
            } = eC;
        function eQ() {
            return (0, n.patchFetch)({
                workAsyncStorage: eF,
                workUnitAsyncStorage: eY,
            });
        }
        async function eU(e, t, n) {
            eC.isDev &&
                (0, a.addRequestMeta)(
                    e,
                    'devRequestTimingInternalsEnd',
                    process.hrtime.bigint()
                );
            let x = '/api/admin/finance/expenses/route';
            x = x.replace(/\/index$/, '') || '/';
            let b = await eC.prepare(e, t, {
                srcPage: x,
                multiZoneDraftMode: !1,
            });
            if (!b)
                return (
                    (t.statusCode = 400),
                    t.end('Bad Request'),
                    null == n.waitUntil ||
                        n.waitUntil.call(n, Promise.resolve()),
                    null
                );
            let {
                    buildId: v,
                    params: T,
                    nextConfig: k,
                    parsedUrl: R,
                    isDraftMode: E,
                    prerenderManifest: D,
                    routerServerContext: M,
                    isOnDemandRevalidate: H,
                    revalidateOnlyGenerated: I,
                    resolvedPathname: q,
                    clientReferenceManifest: P,
                    serverActionsManifest: N,
                } = b,
                O = (0, d.normalizeAppPath)(x),
                S = !!(D.dynamicRoutes[O] || D.routes[q]),
                _ = async () => (
                    (null == M ? void 0 : M.render404)
                        ? await M.render404(e, t, R, !1)
                        : t.end('This page could not be found'),
                    null
                );
            if (S && !E) {
                let e = !!D.routes[q],
                    t = D.dynamicRoutes[O];
                if (t && !1 === t.fallback && !e) {
                    if (k.experimental.adapterPath) return await _();
                    throw new y.NoFallbackError();
                }
            }
            let A = null;
            !S || eC.isDev || E || (A = '/index' === (A = q) ? '/' : A);
            let C = !0 === eC.isDev || !S,
                F = S && !C;
            N &&
                P &&
                (0, s.setReferenceManifestsSingleton)({
                    page: x,
                    clientReferenceManifest: P,
                    serverActionsManifest: N,
                    serverModuleMap: (0, o.createServerModuleMap)({
                        serverActionsManifest: N,
                    }),
                });
            let Y = e.method || 'GET',
                L = (0, i.getTracer)(),
                Q = L.getActiveScopeSpan(),
                U = {
                    params: T,
                    prerenderManifest: D,
                    renderOpts: {
                        experimental: {
                            authInterrupts: !!k.experimental.authInterrupts,
                        },
                        cacheComponents: !!k.cacheComponents,
                        supportsDynamicResponse: C,
                        incrementalCache: (0, a.getRequestMeta)(
                            e,
                            'incrementalCache'
                        ),
                        cacheLifeProfiles: k.cacheLife,
                        waitUntil: n.waitUntil,
                        onClose: (e) => {
                            t.on('close', e);
                        },
                        onAfterTaskError: void 0,
                        onInstrumentationRequestError: (t, r, n) =>
                            eC.onRequestError(e, t, n, M),
                    },
                    sharedContext: { buildId: v },
                },
                B = new u.NodeNextRequest(e),
                W = new u.NodeNextResponse(t),
                X = l.NextRequestAdapter.fromNodeNextRequest(
                    B,
                    (0, l.signalFromNodeResponse)(t)
                );
            try {
                let s = async (e) =>
                        eC.handle(X, U).finally(() => {
                            if (!e) return;
                            e.setAttributes({
                                'http.status_code': t.statusCode,
                                'next.rsc': !1,
                            });
                            let r = L.getRootSpanAttributes();
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
                                let t = `${Y} ${n}`;
                                (e.setAttributes({
                                    'next.route': n,
                                    'http.route': n,
                                    'next.span_name': t,
                                }),
                                    e.updateName(t));
                            } else e.updateName(`${Y} ${x}`);
                        }),
                    o = !!(0, a.getRequestMeta)(e, 'minimalMode'),
                    d = async (a) => {
                        var i, d;
                        let u = async ({ previousCacheEntry: r }) => {
                                try {
                                    if (!o && H && I && !r)
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
                                    let i = await s(a);
                                    e.fetchMetrics = U.renderOpts.fetchMetrics;
                                    let d = U.renderOpts.pendingWaitUntil;
                                    d &&
                                        n.waitUntil &&
                                        (n.waitUntil(d), (d = void 0));
                                    let u = U.renderOpts.collectedTags;
                                    if (!S)
                                        return (
                                            await (0, w.sendResponse)(
                                                B,
                                                W,
                                                i,
                                                U.renderOpts.pendingWaitUntil
                                            ),
                                            null
                                        );
                                    {
                                        let e = await i.blob(),
                                            t = (0,
                                            p.toNodeOutgoingHttpHeaders)(
                                                i.headers
                                            );
                                        (u && (t[f.NEXT_CACHE_TAGS_HEADER] = u),
                                            !t['content-type'] &&
                                                e.type &&
                                                (t['content-type'] = e.type));
                                        let r =
                                                void 0 !==
                                                    U.renderOpts
                                                        .collectedRevalidate &&
                                                !(
                                                    U.renderOpts
                                                        .collectedRevalidate >=
                                                    f.INFINITE_CACHE
                                                ) &&
                                                U.renderOpts
                                                    .collectedRevalidate,
                                            n =
                                                void 0 ===
                                                    U.renderOpts
                                                        .collectedExpire ||
                                                U.renderOpts.collectedExpire >=
                                                    f.INFINITE_CACHE
                                                    ? void 0
                                                    : U.renderOpts
                                                          .collectedExpire;
                                        return {
                                            value: {
                                                kind: g.CachedRouteKind
                                                    .APP_ROUTE,
                                                status: i.status,
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
                                            (await eC.onRequestError(
                                                e,
                                                t,
                                                {
                                                    routerKind: 'App Router',
                                                    routePath: x,
                                                    routeType: 'route',
                                                    revalidateReason: (0,
                                                    h.getRevalidateReason)({
                                                        isStaticGeneration: F,
                                                        isOnDemandRevalidate: H,
                                                    }),
                                                },
                                                M
                                            )),
                                        t
                                    );
                                }
                            },
                            l = await eC.handleResponse({
                                req: e,
                                nextConfig: k,
                                cacheKey: A,
                                routeKind: r.RouteKind.APP_ROUTE,
                                isFallback: !1,
                                prerenderManifest: D,
                                isRoutePPREnabled: !1,
                                isOnDemandRevalidate: H,
                                revalidateOnlyGenerated: I,
                                responseGenerator: u,
                                waitUntil: n.waitUntil,
                                isMinimalMode: o,
                            });
                        if (!S) return null;
                        if (
                            (null == l || null == (i = l.value)
                                ? void 0
                                : i.kind) !== g.CachedRouteKind.APP_ROUTE
                        )
                            throw Object.defineProperty(
                                Error(
                                    `Invariant: app-route received invalid cache entry ${null == l || null == (d = l.value) ? void 0 : d.kind}`
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
                                H
                                    ? 'REVALIDATED'
                                    : l.isMiss
                                      ? 'MISS'
                                      : l.isStale
                                        ? 'STALE'
                                        : 'HIT'
                            ),
                            E &&
                                t.setHeader(
                                    'Cache-Control',
                                    'private, no-cache, no-store, max-age=0, must-revalidate'
                                ));
                        let c = (0, p.fromNodeOutgoingHttpHeaders)(
                            l.value.headers
                        );
                        return (
                            (o && S) || c.delete(f.NEXT_CACHE_TAGS_HEADER),
                            !l.cacheControl ||
                                t.getHeader('Cache-Control') ||
                                c.get('Cache-Control') ||
                                c.set(
                                    'Cache-Control',
                                    (0, m.getCacheControlHeader)(l.cacheControl)
                                ),
                            await (0, w.sendResponse)(
                                B,
                                W,
                                new Response(l.value.body, {
                                    headers: c,
                                    status: l.value.status || 200,
                                })
                            ),
                            null
                        );
                    };
                Q
                    ? await d(Q)
                    : await L.withPropagatedContext(e.headers, () =>
                          L.trace(
                              c.BaseServerSpan.handleRequest,
                              {
                                  spanName: `${Y} ${x}`,
                                  kind: i.SpanKind.SERVER,
                                  attributes: {
                                      'http.method': Y,
                                      'http.target': e.url,
                                  },
                              },
                              d
                          )
                      );
            } catch (t) {
                if (
                    (t instanceof y.NoFallbackError ||
                        (await eC.onRequestError(e, t, {
                            routerKind: 'App Router',
                            routePath: O,
                            routeType: 'route',
                            revalidateReason: (0, h.getRevalidateReason)({
                                isStaticGeneration: F,
                                isOnDemandRevalidate: H,
                            }),
                        })),
                    S)
                )
                    throw t;
                return (
                    await (0, w.sendResponse)(
                        B,
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
                () => eU,
                'patchFetch',
                () => eQ,
                'routeModule',
                () => eC,
                'serverHooks',
                () => eL,
                'workAsyncStorage',
                () => eF,
                'workUnitAsyncStorage',
                () => eY,
            ],
            725749
        );
    },
];

//# sourceMappingURL=c2dd8_next_dist_esm_build_templates_app-route_ee5cca90.js.map
