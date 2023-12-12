const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    chunkFilename: "out/js/[name].[hash:10].js",
    filename: "out/js/[name].[hash:10].js",
    assetModuleFilename: "out/images/[hash:10][ext][query]",
  },
  module: {
    rules: [
      // 处理css 兼容
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
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
          "vue-style-loader",
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
    // 将 `.ts` 添加为一个可解析的扩展名。
    extensions: ['.vue','.ts','.js']
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
      // threads:3,
      cache: true,
    }),
    new HtmlWebpackPlugin({
      title: "vue 脚手架",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new VueLoaderPlugin(),
  ],
  mode: "development",
  devtool: "cheap-module-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    hot: true,
  },
};
