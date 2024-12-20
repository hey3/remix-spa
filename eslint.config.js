import js from '@eslint/js'
import configPrettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginUnusedImport from 'eslint-plugin-unused-imports'
import globals from 'globals'

// eslint-disable-next-line import/no-unresolved
import typescriptEslint from 'typescript-eslint'

const configBase = typescriptEslint.config(js.configs.recommended, {
  languageOptions: {
    globals: {
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    import: pluginImport,
    'unused-imports': pluginUnusedImport,
  },
  rules: {
    ...pluginImport.configs.recommended.rules,
    'import/export': 'off',
    'import/newline-after-import': [
      'error',
      {
        considerComments: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/no-unresolved': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
})

const configTypescript = typescriptEslint.config(
  ...typescriptEslint.configs.recommended.map(config => ({
    ...config,
    ignores: ['**/*.js'],
  })),
  {
    files: ['**/*.ts?(x)'],
    settings: {
      ...pluginImport.configs.typescript.settings,
      'import/parsers': {
        '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    rules: {
      ...pluginImport.configs.typescript.rules,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  }
)

const configReact = typescriptEslint.config({
  files: ['**/*.tsx', '**/use*.{ts,tsx}'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: pluginReact,
    'react-hooks': pluginReactHooks,
    'jsx-a11y': pluginJsxA11y,
  },
  rules: {
    ...pluginReact.configs.recommended.rules,
    ...pluginReact.configs['jsx-runtime'].rules,
    ...pluginReactHooks.configs.recommended.rules,
    ...pluginJsxA11y.configs.recommended.rules,
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
  },
})

export default typescriptEslint.config(
  {
    ignores: ['dist'],
  },
  ...configBase,
  ...configTypescript,
  ...configReact,
  configPrettier
)
