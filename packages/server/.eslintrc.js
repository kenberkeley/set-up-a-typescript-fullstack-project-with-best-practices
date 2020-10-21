// Reference: https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
module.exports = {
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
    '@typescript-eslint/explicit-function-return-type': 'error', // See https://softwareengineering.stackexchange.com/a/391709
    'import/no-default-export': 'error', // See https://github.com/basarat/typescript-book/blob/8c8028a/docs/tips/defaultIsBad.md
  },
}
