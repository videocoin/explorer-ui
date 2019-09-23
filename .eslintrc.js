const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true
    }],
    '@typescript-eslint/indent': ['error', 2],
    'prettier/prettier': ['error', { 'singleQuote': true, 'trailingComma': 'es5', 'tabWidth': 2 }],
    'react/prop-types': 0,
  },
  settings: {
    'react': {
      'version': 'latest',
    }
  },
};
