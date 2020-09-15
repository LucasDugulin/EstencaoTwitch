const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const bundlePath = path.resolve(__dirname, "dist/");

module.exports = (_env, argv) => {
  let entryPoints = {
    Panel: {
      path: "./src/Panel.js",
      outputHtml: "panel.html",
      build: true,
    },
  };

  let entry = {};

  let plugins = [
    new CleanWebpackPlugin(["dist"]),
    new webpack.HotModuleReplacementPlugin(),
  ];

  for (name in entryPoints) {
    if (entryPoints[name].build) {
      entry[name] = entryPoints[name].path;
      if (argv.mode === "production") {
        plugins.push(
          new HtmlWebpackPlugin({
            inject: true,
            chunks: [name],
            template: "./template.html",
            filename: entryPoints[name].outputHtml,
          })
        );
      }
    }
  }

  let config = {
    entry,
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader", // compiles Sass to CSS, using Node Sass by default
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: "file-loader",
          options: {
            name: "img/[name].[ext]",
          },
        },
        {
          test: /.(woff|woff2|eot|ttf)$/,
          use: ["url-loader?limit=100000"],
        },
      ],
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      filename: "[name].bundle.js",
      path: bundlePath,
    },
    plugins,
  };

  if (argv.mode === "development") {
    config.devServer = {
      contentBase: path.join(__dirname, "public"),
      host: "localhost",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      port: 8080,
    };
  }
  if (argv.mode === "production") {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: "all",
          test: /node_modules/,
          name: false,
        },
      },
      name: false,
    };
  }

  return config;
};
