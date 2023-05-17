import eslint from '@rollup/plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';


export default {
  input: './src/Tree.jsx',

  external: [
    'react',
    'antd/lib/spin',
    // 'antd/lib/menu',
    'rc-menu',
  ],

  plugins: [
    eslint(),

    commonjs({
      sourceMap: false,
    }),

    resolve({
      browser: true,
      extensions: ['.jsx', '.js'],
    }),

    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
  ],

  output: { file: './dist/Tree.common.js', format: 'cjs', exports: 'default' },
};
