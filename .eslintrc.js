module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'never'],
    'max-len': [
      'error',
      { code: 120, ignoreStrings: true, ignoreRegExpLiterals: true },
    ],
    'no-useless-escape': 'off',
    'arrow-parens': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
