const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development", 
  entry: "./src/js/main.js", 
  output: {
    path: path.resolve(__dirname, "dist"), 
    filename: "bundle.js", 
  },
  devServer: {
    static: path.join(__dirname, "dist"), 
    compress: true, 
    port: 3000, 
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(), 
                  require("cssnano")(), 
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.json$/,
        loader: "json-loader",
        type: "javascript/auto", 
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()], 
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/json/*.json", to: "json/[name][ext]" },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
