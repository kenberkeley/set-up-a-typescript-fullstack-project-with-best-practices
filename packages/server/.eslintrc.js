// Reference: https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',

    // Reference: https://github.com/benmosher/eslint-plugin-import/blob/055389d/README.md#typescript
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // Please make sure this is the last item
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn', // See https://softwareengineering.stackexchange.com/a/391709
    'import/no-default-export': 'error', // See https://github.com/basarat/typescript-book/blob/8c8028a/docs/tips/defaultIsBad.md
    'import/order': 'error',
    'import/no-unresolved': 'off', // Even `eslint-import-resolver-typescript` couldn't stop ESLint complaining path alias in `tsconfig.json > compilerOptions.paths`

    // In accord with `tsconfig.json > compilerOptions.allowSyntheticDefaultImports=true`:
    'import/default': 'off', // Allow `import React from 'react'` instead of `import * as React from 'react'`
    'import/no-named-as-default-member': 'off', // Dismiss warnings like [Caution: `React` also has a named export `useState`. Check if you meant to write `import {useState} from 'react'` instead]

    'no-console': [
      'error',
      {
        // Doc: https://eslint.org/docs/rules/no-console#options
        allow: ['warn', 'error'],
      },
    ],
  },
}
