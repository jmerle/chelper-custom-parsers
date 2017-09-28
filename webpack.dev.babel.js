import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import StringEntryPlugin from 'string-entry-webpack-plugin';
import getHeader from './src/header';
import common from './webpack.common.babel';

export default merge(common, {
  entry: {
    'main.js': './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dev/'),
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new StringEntryPlugin({
      'chelper-custom-parsers-dev.user.js': getHeader(true),
    }),
  ],
});
