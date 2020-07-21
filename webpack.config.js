const path = require('path');
const { HashedModuleIdsPlugin } = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.jsx?/,
        exclude: '/node/modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      { test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      //non static routes to server
    }
  },
}