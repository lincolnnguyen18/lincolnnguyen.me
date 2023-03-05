module.exports = {
  extends: [
    'standard',
  ],
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'react/prop-types': 'off',
    'spaced-comment': 'off',
    'no-new': 'off',
    'eol-last': 'error',
    quotes: ['error', 'single'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  env: {
    'jest': true,
  }
};
