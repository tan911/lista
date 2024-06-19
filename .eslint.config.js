// TODO: this lint doesn't work

module.exports = {
    root: true,
    // env: {
    //     browser: true,
    //     es2021: true,
    // },
    // overrides: [
    //     {
    //         env: {
    //             node: true,
    //         },
    //         files: ['eslint.config.js'],
    //         parserOptions: {
    //             sourceType: 'script',
    //         },
    //     },
    // ],
    // parserOptions: {
    //     ecmaVersion: 'latest',
    //     sourceType: 'module',
    // },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    ignorePatterns: ['dist/*', 'node_modules/*'],
}
