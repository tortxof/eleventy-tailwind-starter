const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: { styles: "./css/main.css", app: "./js/main.js" },
  output: {
    filename: "[name].js",
    path: `${__dirname}/src/assets`
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          devMode
            ? { loader: "style-loader" }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "/"
                }
              },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  }
};
