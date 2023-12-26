const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPugin = require("../myplugin/test.js")
module.exports = {
  mode: "production",
  entry: "./src/loadtest.js",
  output: {
    path: path.resolve(__dirname, "../out"),
    filename: "js/[name].[contenthash:10].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:["./myLoader/test3.js","css-loader"],
        // loader: "./myLoader/babel-test.js",
        // options: {
        //   presets: ["@babel/preset-env"],
        // },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "my loader",
    }),
    new TestPugin({
      author:'dengy'
    })
  ],
};
