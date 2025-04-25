import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import dts from 'rollup-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { babel } from '@rollup/plugin-babel';
import pkg from './package.json';

// Banner to add to the top of each file
const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`;

export default [
  // ESM build
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        banner,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.stories.tsx', '**/*.test.tsx'] }),
      postcss({
        plugins: [autoprefixer(), tailwindcss()],
        minimize: true,
        extract: 'styles.css',
        modules: true,
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      }),
      terser(),
      visualizer({
        filename: 'bundle-analysis-esm.html',
        title: 'ECL Bundle Analysis (ESM)',
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        banner,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.stories.tsx', '**/*.test.tsx'] }),
      postcss({
        plugins: [autoprefixer(), tailwindcss()],
        minimize: true,
        extract: false,
        modules: true,
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      }),
      terser(),
      visualizer({
        filename: 'bundle-analysis-cjs.html',
        title: 'ECL Bundle Analysis (CJS)',
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // TypeScript declaration files
  {
    input: 'dist/dts/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
