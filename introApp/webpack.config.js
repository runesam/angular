const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const jsonServer = require('json-server');
const ts = require('awesome-typescript-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  cache: true,
  context: cwd,
  performance: {
    hints: false
  },
  devServer: {
    contentBase: cwd,
    compress: true,
    inline: true,
    hot: true,
    port: 4000,
    publicPath: '/build/',
    quiet: true,
    historyApiFallback: true,
    setup: function (app) {
      app.use('/api', jsonServer.router('db.json'));
    },
    stats: {
      chunks: false,
      chunkModules: false
    }
  },
  devtool: 'sourcemap',
  entry: {
    app: [
      'reflect-metadata',
      'ts-helpers',
      'zone.js',
      'main'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/build/',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(cwd, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        include: [
          path.resolve(cwd, 'app')
        ]
      },
      {
        test: /\.html/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: './',
      manifest: require(path.resolve(cwd, 'vendor/vendor-manifest.json'))
    }),
    new ProgressBarPlugin({
      format: `${chalk['magenta'].bold('build')} [${chalk['green'](':bar')}] '${chalk['green'].bold(':percent')} ${chalk['yellow'].bold(':elapsed seconds')} ${chalk['white'](':msg')}`,
      clear: false
    }),
    new ts.CheckerPlugin(),
    new ts.TsConfigPathsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules', cwd]
  }
};
