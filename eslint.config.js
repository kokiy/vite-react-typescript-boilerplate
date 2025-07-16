import pluginJs from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'
export default [
  // Base configuration for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      eqeqeq: 'error',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },
  // TypeScript-specific configuration
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': pluginReactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // React-specific configuration
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/forbid-dom-props': ['error', { forbid: ['style'] }],
    },
  },
  // Vitest-specific configuration for test files
  {
    files: ['**/*.test.{tsx,ts}'],
    plugins: { vitest },
    rules: vitest.configs.recommended.rules,
  },
  // Accessibility configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...jsxA11y.flatConfigs.recommended,
    plugins: { 'jsx-a11y': jsxA11y },
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  // Ignore specific directories and files
  { ignores: ['**/dist/', '**/public/', '**/client/', '.history', 'history'], },
  // Plugin configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],]
