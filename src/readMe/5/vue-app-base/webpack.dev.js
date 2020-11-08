const path = require('path');

const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = function(env, args) {
  const config = {
    mode: 'development',
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8000,
      hot: true,
      open: true,
    },
    devtool: 'source-map',
    // watch: {},
  };
  return merge(commonConfig(), config);
};
