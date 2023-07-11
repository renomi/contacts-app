module.exports = {
  // Configuration for JavaScript files
  extends: [
    'universe',
    'universe/shared/typescript-analysis',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['import'],
  rules: {
    // this is for sorting WITHIN an import
    'sort-imports': [
      'error',
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    // this is for sorting imports
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        pathGroups: [
          {
            pattern: '@(react|react-native)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
  env: {
    node: true,
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
