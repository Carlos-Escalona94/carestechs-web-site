const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'index': './src/index.js',
    'my-place': './src/MyPlace.js',
  },
  output: {
    filename: 'index_bundle_[name].[contenthash].js',
    path: __dirname + '/dist'
  },
  devtool: 'cheap-source-map',
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
      chunks: ['my-place']
      }),
    new CleanPlugin.CleanWebpackPlugin()
  ]
};