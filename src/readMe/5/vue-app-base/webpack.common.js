const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function(env, arv) {
  const config = {
    mode: 'production',
    entry: './src/main.js',
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'script/[name].bundle.[hash].js',
    },
    module: {
      rules: [
        { test: /\.vue$/, use: 'vue-loader' },
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/name.[hash].[ext]',
                esModule: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: '一个webpack vue demo',
      }),
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './public/favicon.ico'),
          to: path.resolve(__dirname, './dist/public/favicon.ico'),
        },
      ]),
      new DefinePlugin({
        BASE_URL: JSON.stringify('public/'),
      }),
      new CleanWebpackPlugin(),
    ],
  };
  return config;
};
