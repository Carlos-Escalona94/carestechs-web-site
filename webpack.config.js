const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'index': './src/index.js',
    'MyPlace': './src/MyPlace.js',
  },
  output: {
    filename: 'index_bundle_[name].js',
    path: __dirname + '/dist'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3 } }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
    filename: 'index.html',
    // Load a custom template (lodash by default)
    template: 'src/html/index.html',
    chunks: ['index']
    }), 
    new HtmlWebpackPlugin({
      filename: 'my-place/my-place.html',
      // Load a custom template (lodash by default)
      template: 'src/html/my-place/index.html',
      chunks: ['MyPlace']
      }),
      new CopyWebpackPlugin(
        [{
          from: 'src/assets',
          to: 'assets'
        }]
      ),
  
    new CleanPlugin.CleanWebpackPlugin()
  ]
};