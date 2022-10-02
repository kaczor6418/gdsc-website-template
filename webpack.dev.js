import ESLintPlugin from "eslint-webpack-plugin";
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';

export default merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    host: 'local-ip',
    port: 8080,
    server: 'https',
    static: {
      directory: '/dist',
    }
  },
  plugins: [
    new ESLintPlugin({
      extensions: 'ts',
      threads: true,
    }),
  ]
});
