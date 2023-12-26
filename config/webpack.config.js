const ESLintPlugin = require("eslint-webpack-plugin"); // 规则检查
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // style生成css文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css 文件压缩
const TerserPlugin = require("terser-webpack-plugin"); // webpack 自带的js压缩
const CopyPlugin = require("copy-webpack-plugin"); // 复制插件
const { VueLoaderPlugin } = require("vue-loader"); // 转义vue
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
      title:"vue 脚手架"
    }),
    new VueLoaderPlugin(),
  ];
  return isDevelopment
    ? [...common]
    : [
        ...common,
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:10].css",
          chunkFilename: "css/[name].[contenthash].chunk.css",
        }),
        new CssMinimizerPlugin({
          parallel: true,
        }),
        new TerserPlugin({ parallel: true }),
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname,"../public"),
              to: path.resolve(__dirname,"../dist"),
              globOptions: {
                ignore: ["**/index.html"],
              },
            },
          ],
        }),
      ];
};
module.exports = {
  entry: "./src/main.js",
  output: {
    path: isDevelopment ? undefined : path.resolve(__dirname, "../dist"),
    chunkFilename: "js/[name].[contenthash:10].js",
    filename: "js/[name].[contenthash:10].js",
    assetModuleFilename: "img/[contenthash:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      // 处理css 兼容
      {
        test: /\.css$/,
        use: [
          isDevelopment ? "vue-style-loader" : MiniCssExtractPlugin.loader,
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
          isDevelopment ? "vue-style-loader" : MiniCssExtractPlugin.loader,
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
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "../src"),
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".vue", ".ts", ".js"],
  },
  // 插件
  plugins: getPlugins(),
  mode: isDevelopment?'development':"production",
  devtool: isDevelopment ? "cheap-module-source-map" : false,
  optimization: {
    // 分块
    splitChunks: {
      chunks: "all", // 提取公用模块，包括异步和非异步共享
    },
    //运行时代码包含了webpack在打包过程中需要的一些辅助函数和逻辑，它负责管理模块的加载、解析和执行。
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // 将运行时代码拆分，并修改运行时的名称
    },
    minimizer: getMinimizer(),
  },
};
