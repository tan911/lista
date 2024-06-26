/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/*.{html,js,css}', './src/views/**/*.ejs'],
    theme: {
        extend: {
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
