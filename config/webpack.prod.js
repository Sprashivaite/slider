const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  entry: `./src/index.js`,
  mode: 'production',
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: `test.html`,
      scriptLoading: "blocking"
    }),
  ]
});