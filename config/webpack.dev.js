const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    chunkFilename: "out/js/[name].[hash:10].js",
    filename: "out/js/[name].[hash:10].js",
    assetMoudleFilename: "out/images/[hash:10][ext][query]",
  },
  module: {
    rules: [
      // 处理css 兼容
      {
        test: /\.css$/,
        use: [
          "style loader",
          "css loader",
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
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "sass-loader"
        ],
      },
        // 处理图片 
        {
          test: /\.png|jpe?g|gif|svg|webp$/,
          type:"asset",
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024 // 4kb
            }
          }
        },
        // js
        {
          test: /\.ttf|woff|woff2$/,
          type:"asset/resource"
        },
        {
          test: /\.m?js$/,
          use: {
            include:  path.resolve(__dirname,"../src"),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        },
    ],
  },
  // 插件
  plugins: [new ESLintPlugin({
    context: path.resolve(__dirname,"../src"),
    // threads:3,
    cache:true,
  }),new HtmlWebpackPlugin({
      template: path.resolve(__dirname,"../public/index.html")
  })],
  mode:"development",
  devtool:"cheap-module-source-map",
  optimization:{
    splitChunk:{
       chunks:"all"
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    }
  },
  devServer: {
    port: 8080,
    hot:true,
  }
};
