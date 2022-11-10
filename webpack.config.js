const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    app: "",
  },
  output: {
    path: "",
    filename: "",
    publicPath: "",
  },
  module: {},
  plugins: [],
  optimization: {},
  resolve: {
    fallback: {
      path: false,
      buffer: false,
      crypto: false,
    },
  },
};
