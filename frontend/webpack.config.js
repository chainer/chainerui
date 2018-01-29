/* eslint-disable global-require  */

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_PROD = (NODE_ENV === 'production');
const nodeModulePath = path.resolve(__dirname, 'node_modules');

const versionPyPath = path.resolve(path.dirname(__dirname), 'chainerui', '_version.py');
const versionPy = fs.readFileSync(versionPyPath, 'utf8');
const versionMatches = /^__version__\s*=\s*'([^']*)'$/m.exec(versionPy);

if (!versionMatches) {
  throw new Error('version number was not found');
}

const version = versionMatches[1];
const dependencies = require('./package.json').dependencies;
delete dependencies['open-iconic'];

module.exports = {
  entry: {
    chainerui: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/index.jsx'
    ],
    vendor: Object.keys(dependencies).concat([
      'bootstrap/dist/css/bootstrap.css',
      'open-iconic/font/css/open-iconic-bootstrap.css',
      'babel-polyfill'
    ])
  },
  output: {
    path: path.resolve(path.dirname(__dirname), 'chainerui', 'static', 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: nodeModulePath,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: nodeModulePath,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'react'
          ],
          plugins: [
            'transform-object-rest-spread',
            'babel-plugin-lodash'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                parser: 'postcss-scss',
                plugins: [
                  require('autoprefixer')({
                    browsers: ['last 2 versions']
                  })
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|otf|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: NODE_PROD ? false : 'inline-source-map',
  target: 'web',
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.VERSION': JSON.stringify(version)
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new HtmlWebpackPlugin({
      title: 'chainerui'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].js',
      minChunks: Infinity
    }),
    new ExtractTextWebpackPlugin('[name].css', {
      allChunks: true
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  }
};

