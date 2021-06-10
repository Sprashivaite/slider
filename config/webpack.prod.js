const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

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