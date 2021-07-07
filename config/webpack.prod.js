const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = merge(common, {
  entry: `${PATHS.src}/slider/index.js`,
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
