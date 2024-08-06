/** @type {import('eslint').FlatConfigArray} */
const config = [
    {
        ignores: ['node_modules/**'], // Ignore node_modules directory
        files: ['*.ts', '**/*.ts', '*.tsx', '**.tsx'], // Apply to TypeScript files
        languageOptions: {
            parser: {
                parse: require('@typescript-eslint/parser').parse,
                parseForESLint: require('@typescript-eslint/parser').parseForESLint,
            },
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            'prettier': require('eslint-plugin-prettier'),
        },
        rules: {
            '@/no-extra-semi': 'error',

        },
    },
];

module.exports = config;


