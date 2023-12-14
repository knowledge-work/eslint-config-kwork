import { FlatCompat } from '@eslint/eslintrc'
import airbnbBase from 'eslint-config-airbnb-base'
import airbnbTypescriptBase from 'eslint-config-airbnb-typescript/base.js'
import typescript from '@typescript-eslint/eslint-plugin'
import comments from 'eslint-plugin-eslint-comments'
import unusedImports from 'eslint-plugin-unused-imports'

const compat = new FlatCompat()

export default [
  ...compat.config(airbnbBase),
  ...compat.config(airbnbTypescriptBase),

  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:eslint-comments/recommended',
  ),

  {
    plugins: {
      'unused-imports': unusedImports,
      typescript,
      comments,
    },
    rules: {
      /**
       * eslint
       */
      'arrow-body-style': 'off',
      camelcase: [
        'error',
        {
          properties: 'never',
          ignoreDestructuring: false,
          allow: ['^[A-Z].*_[A-Z].*'],
        },
      ],
      'default-case-last': 'error', // 統一したいだけなのでfirstでもいい
      'default-param-last': 'off', // optional paramを最後尾にしたいのでoff
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'max-lines': [
        'error',
        {
          max: 250,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'no-alert': 'error',
      'no-console': 'error',
      'no-promise-executor-return': 'error',
      // NOTE: import/no-relative-parent-importsだと@でのimportもNGになるのでno-restricted-importsで../を禁止する
      'no-restricted-imports': ['error', { patterns: ['..*'] }],
      'no-unused-expressions': 'off', // duplidate @typescript-eslint/no-unused-expressions
      'no-useless-constructor': 'off',
      'no-use-before-define': 'off', // duplidate @typescript-eslint/no-use-before-define
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],

      /**
       * @typescript-eslint
       */
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off', // annoying to force return type
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ], // https://github.com/facebook/create-react-app/issues/8107
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-useless-constructor': ['error'],
      // @typescript-eslint v6でrecommendedからアラートが出なくなったルールを有効化
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',

      /**
       * eslint-comments
       */
      'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
      'eslint-comments/no-unused-disable': 'error',
      'eslint-comments/no-use': [
        'error',
        {
          allow: ['eslint-disable', 'eslint-enable', 'eslint-disable-next-line'],
        },
      ],
      'eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],

      /**
       * import
       */
      'import/extensions': 'off',
      'import/named': 'off',
      'import/no-cycle': 'error',
      'import/no-default-export': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.stories.tsx', '**/*.test.tsx'],
          optionalDependencies: false,
        },
      ],
      'import/no-relative-packages': 'off',
      'import/no-relative-parent-imports': 'off',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [],
        },
      ],
      'import/prefer-default-export': 'off',

      /**
       * unused-imports
       */
      'unused-imports/no-unused-imports': 'error',
    },
  },

  {
    files: ['**/*.test.tsx?', '**/*mock.ts', 'src/mocks/**/*'],
    rules: {
      'max-lines': 'off',
    },
  },
]
