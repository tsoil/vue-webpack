const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const isDevelopment = process.env.NODE_ENV == "development";
const getMinimizer = () => {
  return isDevelopment
    ? []
    : [
        new CssMinimizerPlugin({
          parallel: true,
        }),
        new TerserPlugin({ parallel: true }),
      ];
};
const getPlugins = () => {
  let common = [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
      // threads:3,
      cache: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ];
  return isDevelopment
    ? [...common]
    : [
        ...common,
        new CssMinimizerPlugin({
          parallel: true,
        }),
        new TerserPlugin({ parallel: true }),
      ];
};
module.exports = {
  entry: "./src/main.js",
  output: {
    path: isDevelopment ? undefined : path.resolve(__dirname, "../dist"),
    chunkFilename: "out/js/[name].[hash:10].js",
    filename: "out/js/[name].[hash:10].js",
    assetMoudleFilename: "out/images/[hash:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      // 处理css 兼容
      {
        test: /\.css$/,
        use: [
          isDevelopment ? "style-css" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
      // 处理scss/sass
      {
        test: /\.s[ac]ss$/,
        use: [
          isDevelopment ? "style-css" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "sass-loader",
        ],
      },
      // 处理图片
      {
        test: /\.png|jpe?g|gif|svg|webp$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      // js
      {
        test: /\.ttf|woff|woff2$/,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        use: {
          include: path.resolve(__dirname, "../src"),
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
    ],
  },
  // 插件
  plugins: getPlugins(),
  mode: "production",
  devtool: isDevelopment ? "cheap-module-source-map" : null,
  optimization: {
    splitChunk: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    minimizer: getMinimizer(),
  },
};
