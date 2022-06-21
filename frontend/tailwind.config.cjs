module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    plugins: [require("tailgrids/plugin")],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Lato'],
            },
            colors: {
                primary: '#da3c40',
                secondary: '#f5f5f5',
                primary: '#da3c40',
                red: {
                    500: '#da3c40',
                    600: '#c12d33',
                    700: '#b12e2e',
                },
                black: '#000000',
            },
        },
    },
    darkMode: 'class',
};