const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', ...fontFamily.sans],
            },
            boxShadow: {
                top: '0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
