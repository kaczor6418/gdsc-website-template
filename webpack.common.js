import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default {
  target: ['web', 'es2020'],
  entry: path.resolve('./src/index.ts'),
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('./index.html'),
      scriptLoading: 'module'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve('./assets'), to: path.resolve('./dist/assets') },
        { from: path.resolve('./style'), to: path.resolve('./dist/style') },
      ],
      options: {
        concurrency: 50
      }
    }),
  ],
};
