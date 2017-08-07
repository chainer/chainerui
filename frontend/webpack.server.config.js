const webpack = require('webpack');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const config = require('./webpack.config');

const devServer = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || '8888',
  inline: false,
  hot: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};
const publicPath = `http://${devServer.host}:${devServer.port}/`;

config.devServer = devServer;
config.output.publicPath = publicPath;
config.entry['chainer-ui'].unshift(
  'react-hot-loader/patch',
  `webpack-dev-server/client?${publicPath}`,
  'webpack/hot/dev-server'
);
config.module.rules[1].options.plugins = [
  'react-hot-loader/babel'
];
config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);

// config.plugins[0].definitions['process.env.LOAD_URL'] = JSON.stringify(publicPath);
config.plugins.push(
  new WriteFileWebpackPlugin({
    exitOnErrors: false,
    log: false,
    useHashIndex: false
  })
);

module.exports = config;

