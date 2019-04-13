var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/images": {
        target: "http://localhost:3001/images",
        pathRewrite: { "^/images": "" },
        secure: false,
        changeOrigin: true
      },
      "/api": {
        target: "http://localhost:3001/api",
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true
      },
      "/auth": {
        target: "http://localhost:3001/auth",
        pathRewrite: { "^/auth": "" },
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
