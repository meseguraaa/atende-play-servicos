(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    344420,
    (e) => {
        'use strict';
        var t = e.i(990341),
            r = e.i(245586),
            s = e.i(995403);
        function u({ success: e, error: u }) {
            let c = (0, r.useRouter)(),
                o = (0, r.usePathname)(),
                l = (0, r.useSearchParams)(),
                n = t.useRef('');
            return (
                t.useEffect(() => {
                    if (!e && !u) return;
                    let t = `${o}::${l.toString()}::${e ?? ''}::${u ?? ''}`;
                    if (n.current === t) return;
                    ((n.current = t),
                        e && s.toast.success(e),
                        u && s.toast.error(u));
                    let r = new URLSearchParams(l.toString());
                    (r.delete('success'), r.delete('error'));
                    let a = r.toString();
                    c.replace(a ? `${o}?${a}` : o, { scroll: !1 });
                }, [e, u, o]),
                null
            );
        }
        e.s(['default', () => u]);
    },
]);
