/**
 * client/.eslintrc.cjs
 *
 * − Move any custom rule entries out of “extends” and into a top‐level “rules” object.
 * − Make sure “react/react‐in‐jsx‐scope” is turned off so you don’t need to import React in every JSX file.
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['@typescript-eslint', 'react'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  rules: {
    // We’re using React 17+ with the “react-jsx” runtime, so we don’t need React in scope.
    'react/react-in-jsx-scope': 'off',

    // Allow “any” for now, but only as a warning:
    '@typescript-eslint/no-explicit-any': 'warn',

    // Warn on unused variables, but allow variables named “React” or args prefixed with “_”
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' },
    ],

    // (You can add more custom rules here if needed.)
  },
};
