import webpack from 'webpack';
import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import getHeader from './src/header';
import common from './webpack.common.babel';

export default merge(common, {
  entry: {
    'chelper-custom-parsers.user.js': './src/index.js',
  },
  output: {
    path: __dirname,
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.BannerPlugin({
      banner: getHeader(false) + '\n',
      raw: true,
    }),
  ],
});
