const path = require('path');
const Config = require('webpack-chain');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = new Config();

config.mode('production');

config.entry('ns')
  .add('./docs/src/ns/index.jsx')
  .end();

config.entry('simple')
  .add('./docs/src/simple/index.jsx')
  .end();

config.output
  .path(path.resolve('./docs/dist'))
  .filename('[name]-[contenthash:5].js')
  .publicPath('/dist/');

config.resolve.extensions
  .add('.js')
  .add('.jsx')
  .end();

config.module
    .rule('JavaScript')
      .test(/\.(js|jsx)$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('babel')
        .loader('babel-loader');

// config.optimization.set('runtimeChunk', true);
config.optimization.set('splitChunks', {
  chunks: 'async',
  // minSize: 0,
  cacheGroups: {
    react: {
      chunks: 'initial',
      minChunks: 1,
      automaticNamePrefix: 'vendors-react',
      test: /[\\/]node_modules[\\/](axios|react|react-dom)[\\/]/,
      priority: -10,
    },
  }
});
config.optimization.set('minimize', false);

// config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin).init(Plugin => new Plugin());

const conf = config.toConfig();
// console.log(conf);

module.exports = conf;
