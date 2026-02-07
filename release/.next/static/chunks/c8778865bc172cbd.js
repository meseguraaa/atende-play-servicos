(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
    'object' == typeof document ? document.currentScript : void 0,
    530090,
    (e, t, r) => {
        'use strict';
        (Object.defineProperty(r, '__esModule', { value: !0 }),
            Object.defineProperty(r, 'warnOnce', {
                enumerable: !0,
                get: function () {
                    return n;
                },
            }));
        let n = (e) => {};
    },
]);
