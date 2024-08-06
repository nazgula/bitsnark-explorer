/** @type {import('eslint').FlatConfigArray} */
const config = [
  {
    ignores: ['node_modules/**'], // Ignore node_modules directory
    files: ['*.ts', '**/*.ts'], // Apply to TypeScript files
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




// /** @type {import('eslint').Linter.Config} */
// module.exports = {
//   root: true,
//   parser: '@typescript-eslint/parser',
//   extends: [
//       'eslint:recommended',
//       'plugin:@typescript-eslint/recommended',
//       'plugin:prettier/recommended',
//   ],
//   parserOptions: {
//       ecmaVersion: 2020,
//       sourceType: 'module',
//   },
//   rules: {
//       "@typescript-eslint/no-extra-semi": 'error'
//   },
//   ignorePatterns: ['node_modules/'],
//   overrides: [
//       {
//           files: ['*.ts', '*.tsx'],
//           extends: ['plugin:@typescript-eslint/recommended'],
//       },
//   ],
// };
