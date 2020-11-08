const path = require('path');

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJs = require('uglifyjs-webpack-plugin');

module.exports = function(env, args) {
  const config = {
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [path.resolve(__dirname, 'src')], // 指定检查的目录
          options: {},
        },
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[hash].css',
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          discardComments: { removeAll: true },
        },
        canPrint: true,
      }),
      new UglifyJs(),
    ],
  };
  return merge(commonConfig(), config);
};
