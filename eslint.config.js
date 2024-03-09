import hyoban from 'eslint-config-hyoban'

export default hyoban(
  {},
  {
    files: ['**/package.json'],
    rules: {
      'package-json/valid-package-def': 'off',
    },
  },
)
