const path = require('path');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const version = require('../package.json').version;

const banner = '/*! @arknights/antd-tree v' + version + ' (c) 2020 */';

const builds = {
  'Tree': {
    input: path.resolve(__dirname, '../src/Tree.jsx'),
    output: path.resolve(__dirname, '../dist/Tree.common.js'),
    external: [
      'react',
      'react-redux',
      'antd/lib/spin',
      // 'antd/lib/menu',
      'rc-menu',
    ],
    format: 'cjs',
    banner,
  },
};

function genConfig(opts) {
  const config = {
    input: opts.input,
    output: opts.output,
    external: opts.external,
    format: opts.format,
    banner: opts.banner,
    name: 'Tree',
    plugins: [
      commonjs({ sourceMap: false}),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: ['es2015-rollup', 'stage-0', 'react'],
      }),
    ]
  };

  return config;
}

exports.getBuild = name => genConfig(builds[name]);
exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]));
