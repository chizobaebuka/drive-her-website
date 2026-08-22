import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

/**
 * Flat config, consumed directly.
 *
 * eslint-config-next ships native flat-config arrays from v16, so the
 * `FlatCompat` shim (and its `@eslint/eslintrc` dependency) is no longer
 * needed — and no longer works under ESLint 10, which drops the eslintrc
 * bridge these configs used to be normalised through.
 */
const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];

export default config;
