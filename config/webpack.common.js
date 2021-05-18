const webpack = require('webpack')
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ghpages = require('gh-pages');

ghpages.publish('dist', (err) => {});

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // library: {
    //   name: 'sliderPlugin',
    //   type: 'umd',
    // },
  },
//   externals: {
//     jquery: 'jQuery',
//   },
//   optimization: {
//     minimize: true,
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all',
//         },
//       },
//     },
//   },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        exclude: /(node_modules)/,
        loader: "babel-loader",
        test: /\.[tj]sx?$/,
      },
      {
        enforce: "post",
        exclude: /(node_modules|\.test\.[tj]sx?$)/,
        test: /\.[tj]s$/,
        use: {
          loader: "istanbul-instrumenter-loader",
          options: { esModules: true },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: `index.html`,
      scriptLoading: "blocking"
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ]
};
