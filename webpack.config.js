const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "build"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        // `js` and `jsx` files are parsed using `babel`
        // exclude node_modules
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        // `ts` and `tsx` files are parsed using `ts-loader`
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        // styles files
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // to import images and fonts
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3300,
  },
};
