import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      '**/packages/icons/**/*',
      './dist/*',
      '**/docs/demos/**/*',
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'ts/no-use-before-define': 'off',
      'vue/no-reserved-component-names': 'off',
    },
  },
  {
    rules: {
      'style/no-tabs': 'off',
    },
    files: ['**/scripts/**/*'],
  },
)
