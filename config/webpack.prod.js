const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = merge(common, {
  entry: `./src/sliderPlugin/index.js`,
  output: {
    filename: '[name].js',
    path: `${PATHS.dist}`,
    clean: true,
  },
  mode: 'production',
  externals: {
    jquery: 'jQuery',
  },
});
