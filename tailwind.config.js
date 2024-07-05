/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/*.{html,js,css}', './src/views/**/*.ejs'],
    theme: {
        extend: {
            boxShadow: {
                key: '0px -4px 2px -3px rgba(0, 0, 0, 0.2) inset',
            },
            fontFamily: {
                heading: 'Inter',
                body: 'Inter',
            },
            fontWeight: {
                normal: '400',
                bold: '700',
            },
        },
    },
    plugins: [],
}
