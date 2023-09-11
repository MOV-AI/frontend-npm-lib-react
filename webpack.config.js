const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    index: "./src/index.ts",
    Themes: "./src/styles/Themes.jsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "MovaiReact",
    libraryTarget: "umd"
  },
  target: "web",
  devtool: "source-map",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|mjs|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp|svg)$/,
        type: "asset/inline"
      }
    ]
  }
};
