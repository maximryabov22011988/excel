// const OFF = 0
// const WARN = 1
const ERROR = 2

module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'es6': true,
    'browser': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended', 'google',
  ],
  'rules': {
    'max-len': [ERROR, {
      'code': 150,
    }],
    'linebreak-style': [ERROR, 'windows'],
    'semi': 'off',
    'require-jsdoc': 'off',
    'operator-linebreak': [ERROR, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    }],
    'object-curly-spacing': [ERROR, 'always', {
      'objectsInObjects': false,
    }],
  },
}
