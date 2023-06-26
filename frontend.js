module.exports = {
  parserOptions: {
    jsx: true,
  },
  env: {
    browser: true,
  },
  plugins: [
    // jsxでfalsyな値の誤出力制御のために利用
    'jsx-expressions',
    // テストが壊れる new Date() を禁止するために利用
    'date',
    // 依存関係管理のために利用（自社パッケージ）
    'strict-dependencies',
    // Result型利用時に型の未参照を防止するために利用（自社パッケージ）
    'return-type',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'next/core-web-vitals',
    'kwork/base',
    // NOTE(hori-ryota): prettierは全設定の最後に記述する必要があるため、ここでは設定せずextendsする側でそれぞれ設定する
  ],
  rules: {
    /**
     * import
     */
    'import/order': [
      'error',
      // NOTE(hori-ryota): pathGroupsだけ記述して上書きしたいがobjectごとreplaceされてしまうので不可。全て記述する。 (cf. https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files )
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
        pathGroups: [
          // internal
          { pattern: '@/libs/**', group: 'internal', position: 'before' },
          { pattern: '@/generated/**', group: 'internal', position: 'before' },
          { pattern: '@/utils/**', group: 'internal', position: 'before' },
          { pattern: '@/services/**', group: 'internal', position: 'before' },
          { pattern: '@/mocks/**', group: 'internal', position: 'before' },
          { pattern: '@/pageHocs/**', group: 'internal', position: 'before' },
          { pattern: '@/pages/**', group: 'internal', position: 'before' },
          {
            pattern: '@/globalStates/**',
            group: 'internal',
            position: 'before',
          },
          { pattern: '@/models/**', group: 'internal', position: 'before' },
          { pattern: '@/usecases/**', group: 'internal', position: 'before' },
          {
            pattern: '@/repositories/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/page',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/context/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/functional/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/model/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/ui/**',
            group: 'internal',
            position: 'before',
          },

          // styles
          // 最後尾にしたいのでindex扱い
          { pattern: '@/styles/**', group: 'index', position: 'before' },
          { pattern: './**.module.css', group: 'index', position: 'before' },
        ],
      },
    ],

    /**
     * date
     */
    'date/no-new-date-without-args': 'error',

    /**
     * react
     */
    'react/display-name': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-curly-newline': 'off', // prettierと競合する
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-indent': 'off',
    'react/jsx-key': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: false,
        assignment: false,
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/state-in-constructor': ['error', 'never'],

    /**
     * react-hooks
     */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      { additionalHooks: 'useUpdateEffect|useAsync|useAsyncFn|useRecoilCallback' },
    ],

    /**
     * jsx-a11y
     */
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/no-autofocus': 'off',

    /**
     * jsx-expressions
     */
    'jsx-expressions/strict-logical-expressions': 'error',

    /**
     * @next
     */
    '@next/next/no-img-element': 'off', // Vercel課金回避

    /**
     * strict-dependencies
     */
    'strict-dependencies/strict-dependencies': [
      'error',
      [
        {
          module: 'src/generated',
          allowReferenceFrom: ['src/models/*/type.ts'],
          allowSameModule: true,
        },
        // strict-dependencies TODO: stateとmutatorで依存ルールが異なるのでディレクトリかファイルを分ける
        // {
        //   "module": "src/globalStates",
        //   "allowReferenceFrom": ["src/usecases"],
        //   "allowSameModule": true
        // },
        {
          module: 'src/globalStates',
          allowReferenceFrom: [
            'src/usecases',
            'src/repositories/*/repository.ts',
            'src/repositories/*/*Repository.ts',
            'src/components',
            'src/pageHocs',
            'src/utils/hooks',
          ],
          allowSameModule: true,
        },
        {
          module: 'src/usecases',
          allowReferenceFrom: [
            'src/components/page',
            'src/components/model',
            'src/repositories/*/repository.ts',
            'src/repositories/*/activityRepository.ts',
            'src/mocks/*/repository.ts',
          ],
          allowSameModule: true,
        },
        {
          module: 'src/models',
          allowReferenceFrom: [
            'src/components/model',
            'src/components/page',
            'src/globalStates',
            'src/mocks',
            'src/models',
            'src/repositories',
            'src/services',
            'src/usecases',
          ],
          allowSameModule: true,
        },
        {
          module: 'src/repositories/*',
          allowReferenceFrom: [
            'src/usecases/*/usecase.ts',
            'src/usecases/*/reader.ts',
            'src/mocks/*/repository.ts',
          ],
          allowSameModule: false,
        },
        {
          module: 'src/repositories/*/converter',
          allowReferenceFrom: [
            'src/repositories/*/repository.ts',
            'src/repositories/*/converter.ts',
          ],
          allowSameModule: true,
        },
        {
          module: 'src/pageHocs',
          // NOTE: pageHocs、authとswtichMobileで依存元の層がバラけるのが気持ち悪い。pageHocsとしてまとめないほうがいいかも。
          allowReferenceFrom: ['src/pages', 'src/components/page/*/index.ts'],
          allowSameModule: false,
        },
        {
          module: 'src/components/page',
          allowReferenceFrom: ['src/pages'],
          allowSameModule: false,
        },
        {
          module: 'src/components/model',
          allowReferenceFrom: ['src/components/page'],
          allowSameModule: true,
        },
        {
          module: 'src/components/**/_mobile/**',
          allowReferenceFrom: ['src/components/page/*/*.mobile.tsx'],
          allowSameModule: true,
        },
        {
          module: 'src/components/ui',
          allowReferenceFrom: ['src/components'],
          allowSameModule: true,
        },
        {
          module: 'src/components/functional',
          allowReferenceFrom: ['src/components'],
          allowSameModule: true,
        },
        {
          module: 'src/libs/logReporter',
          allowReferenceFrom: [
            'src/usecase',
            'src/repositories/*/repository.ts',
            'src/repositories/*/activityRepository.ts',
            'src/components/functional/ErrorBoundary',
          ],
          allowSameModule: false,
        },
        {
          module: 'next/router',
          allowReferenceFrom: ['src/libs/router.ts'],
          allowSameModule: false,
        },
        {
          module: 'src/mocks',
          allowReferenceFrom: ['src/**/*.stories.tsx', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
          allowSameModule: true,
        },
      ],
    ],

    /**
     * return-type
     */
    'return-type/enforce-access': [
      'error',
      { typeNames: ['Err<\\w*Error>', 'Promise<.*?Err<\\w*Error>.*?>'] },
    ],
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        'storybook/prefer-pascal-case': 'error',
        'import/no-default-export': 'off',
        'import/no-anonymous-default-export': 'off',
        'react/display-name': 'off',
        'react-hooks/rules-of-hooks': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: 'import', next: 'type' },
          { blankLine: 'always', prev: 'type', next: 'export' },
          { blankLine: 'always', prev: 'export', next: 'export' },
        ],
      },
    },
    {
      files: ['.storybook/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-import-module-exports': 'off',
        'strict-dependencies/strict-dependencies': 'off',
      },
    },
    {
      files: ['src/pages/**/*', '*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    },
    {
      files: ['*.test.ts'],
      rules: {
        'return-type/enforce-access': 'off',
      },
    },
  ],
}
