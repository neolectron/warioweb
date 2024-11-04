import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHook from 'eslint-plugin-react-hooks';
import pluginRouter from '@tanstack/eslint-plugin-router';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['eslint.config.mjs'],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...pluginRouter.configs['flat/recommended'],
  {
    plugins: { 'react-hooks': pluginReactHook },
    rules: pluginReactHook.configs.recommended.rules,
  },
  {
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/button-has-type': 'error',
      'react/checked-requires-onchange-or-readonly': 'error',
      'react/destructuring-assignment': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-handler-names': 'error',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        allowDefaultProject: 'eslint.config.mjs',
        // eslint-disable-next-line
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
