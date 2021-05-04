// @ts-check
/**
 * ESLint configuration.
 * Using a JavaScript file because that are cases where we may need to load some
 * values from another files, like `package.json`.
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import('eslint').Linter.Config}
 */
 module.exports = {
  root: true,

  reportUnusedDisableDirectives: true,

  parserOptions: {
    ecmaVersion: 2020,
  },

  env: {
    es6: true,
    node: true,
    jest: true,
  },

  globals: {},

  extends: ['plugin:prettier/recommended'],
  plugins: ['eslint-plugin-import-helpers'],
  // Global rules
  rules: {
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [['module', '/^@[^/]/'], '/^@//', ['parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],

    'no-console': 'off',
    'max-len': 'off',
    'no-bitwise': 'off',

    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: '.',
        // Files with scripts/modules that will be use only in development
        devDependencies: ['test/*', 'jest*', 'configs/**/*', 'tools/**/*'],
      },
    ],
  },

  overrides: [
    /* ==================== Dealing with TypeScript files ==================== */
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.lint.json',
        sourceType: 'module',
        ecmaVersion: 2020,
      },

      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        // https://www.npmjs.com/package/eslint-import-resolver-typescript#configuration
        'import/resolver': {
          typescript: {
            project: './tsconfig.lint.json',
          },
        },
      },

      plugins: ['@typescript-eslint', 'jest'],
      extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
      ],
      rules: {
        /* ==================== overrides Airbnb's rules ==================== */
        'max-len': [
          'error',
          {
            code: 100, // same as `printWidth` from Prettier
            comments: 83,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
          },
        ],
        'no-use-before-define': 'off',
        // 'no-void': 'off',
        'no-bitwise': 'off',
        'class-methods-use-this': 'off',
        'no-useless-constructor': 'off',

        // Overrides https://github.com/airbnb/javascript/blob/b6fc6dc7c3cb76497db0bb81edaa54d8f3427796/packages/eslint-config-airbnb-base/rules/style.js#L257
        // See https://github.com/airbnb/javascript/issues/1271
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],

        'max-classes-per-file': ['error', 2], // Max 2 classes per file

        'no-unused-vars': 'off',

        'no-underscore-dangle': 'off',

        'import/order': 'off',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off', // Let TS handle this
        'import/named': 'off', // and this, due to some resolution error
        'import/extensions': [
          'error',
          {
            json: 'always',
            ts: 'never',
            tsx: 'never',
            js: 'never',
            jsx: 'never',
          },
        ],
        'import/no-extraneous-dependencies': [
          'off', // Let typescript compiler complains about this.
          {
            // In case we want to enable this rule.
            packageDir: '.',
            // Files with scripts/modules that will be use only in development
            devDependencies: ['**/*spec.ts', '**/global.d.ts', '**/*.seed.ts', '**/*.factory.ts'],
          },
        ],

        '@typescript-eslint/no-unused-vars': [
          'warn',
          { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        // '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': [
          'error',
          {
            allowArgumentsExplicitlyTypedAsAny: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowedNames: [],
            allowHigherOrderFunctions: true,
            allowTypedFunctionExpressions: true,
          },
        ],

        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'request.**.expect'],
          },
        ],
      },
    },

    /* ======================= Dealing with edge cases ======================= */
    {
      // Scripts-like files under `src` directory.
      files: ['src/scripts/**/*'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      // Entities/models typescript files under `src` directory.
      files: ['src/**/*.entity.ts'],
      rules: {
        // Allow define relations between database tables, while using JS classes.
        // NOTE: This leave rooms to `undefined` values when using `import` in these
        //       modules.
        'import/no-cycle': 'off',
      },
    },

    /* ======================= Dealing with Jest files ======================= */
    {
      files: ['**/*spec.ts'],
      rules: {
        'max-classes-per-file': 'off',
        'no-multi-assign': 'off',

        'import/no-extraneous-dependencies': 'off',

        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
};
