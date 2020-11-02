const path = require("path");
const webpack = require('webpack')

module.exports = {
  entry: "./index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
  }),
  ]
};
