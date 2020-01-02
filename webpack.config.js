const path = require("path");
var nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve("./"),
    filename: "dist/index.js",
    library: "Movai",
    libraryTarget: "umd"
  },
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-syntax-import-meta",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-json-strings",
              [
                "@babel/plugin-transform-runtime",
                { corejs: 3, useESModules: true, helpers: true }
              ]
            ]
          }
        }
      }
    ]
  }
};
