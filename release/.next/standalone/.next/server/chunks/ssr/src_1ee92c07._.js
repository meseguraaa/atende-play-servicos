module.exports = [
    583638,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call ProfessionalNav() from the server but ProfessionalNav is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/professional/professional-nav/professional-nav.tsx <module evaluation>',
            'ProfessionalNav'
        );
        a.s(['ProfessionalNav', 0, b]);
    },
    22197,
    (a) => {
        'use strict';
        let b = (0, a.i(976286).registerClientReference)(
            function () {
                throw Error(
                    "Attempted to call ProfessionalNav() from the server but ProfessionalNav is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
                );
            },
            '[project]/src/components/professional/professional-nav/professional-nav.tsx',
            'ProfessionalNav'
        );
        a.s(['ProfessionalNav', 0, b]);
    },
    154168,
    (a) => {
        'use strict';
        a.i(583638);
        var b = a.i(22197);
        a.n(b);
    },
    972760,
    (a) => {
        'use strict';
        var b = a.i(623127),
            c = a.i(154168);
        function d({ children: a }) {
            return (0, b.jsxs)('div', {
                className: 'min-h-screen bg-background-primary',
                children: [
                    (0, b.jsx)(c.ProfessionalNav, {}),
                    (0, b.jsx)('main', {
                        className: 'pl-14',
                        children: (0, b.jsx)('div', {
                            className: 'w-full max-w-7xl mx-auto px-4 py-6',
                            children: a,
                        }),
                    }),
                ],
            });
        }
        a.s(['default', () => d, 'dynamic', 0, 'force-dynamic'], 972760);
    },
];

//# sourceMappingURL=src_1ee92c07._.js.map
