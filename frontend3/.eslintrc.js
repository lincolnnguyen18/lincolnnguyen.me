module.exports = {
  extends: [
    'plugin:react/recommended',
    'standard',
  ],
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    // 'quotes': 'off',
    // 'no-unused-vars': 'off',
    quotes: ['error', 'single'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'react/prop-types': 'off',
    'spaced-comment': 'off',
    'no-new': 'off',
  },
};
