const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
  },
});