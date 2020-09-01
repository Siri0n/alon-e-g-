const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const LevelCompilerPlugin = require('./level-compiler-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [{
        from: './assets', 
        to: './assets',
        globOptions: {
          ignore: ['**/levels-list.json', '**/levels/*.json']
        }
      }],
    }),
    new LevelCompilerPlugin({
      src: './assets/levels-list.json',
      dest: './dist/assets/levels.json'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    writeToDisk: true
  }
};
