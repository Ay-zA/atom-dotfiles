const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const SpritePlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
// const isProduction = nodeEnv === 'production';
const isProduction = false;

const jsSourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, './build');
// const imgPath = path.join(__dirname, './source/assets/img');
// const iconPath = path.join(__dirname, './source/assets/icons');
const sourcePath = path.join(__dirname, 'src');

// Common plugins
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].js',
    minChunks(module) {
      const context = module.context;
      return context && context.indexOf('node_modules') >= 0;
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: sourcePath,
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
  new DashboardPlugin()
];

// Common rules
const rules = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ]
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      // Using source maps breaks urls in the CSS loader
      // https://github.com/webpack/css-loader/issues/232
      // This comment solves it, but breaks testing from a local network
      // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
      // 'css-loader?sourceMap',
      'css-loader',
      'postcss-loader',
      'sass-loader?sourceMap',
    ],
  }
];

module.exports = {
  devtool: 'source-map',
  context: jsSourcePath,
  entry: [
    'babel-polyfill',
    './index.js'
  ],
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      jsSourcePath,
    ],
  },
  plugins,
  devServer: {
    contentBase: isProduction ? buildPath : sourcePath,
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: '127.0.0.1',
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
