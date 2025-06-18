import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'packages/theme/node',
    'packages/test-blog/source/_posts',
  ],
})
