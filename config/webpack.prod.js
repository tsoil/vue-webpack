const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
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
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
      // threads:3,
      cache: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash].chunk.css",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "dist" }],
      globOptions: {
        ignore: ["**/index.html"],
      },
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    // 将 `.ts` 添加为一个可解析的扩展名。
    extensions: ['vue','.ts','.js']
  },
  mode: "production",
  optimization: {
    splitChunk: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({ parallel: true }),
    ],
  },
};
