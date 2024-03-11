import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';

export default merge(commonConfig, {
  mode: 'production',
  output: {
    asyncChunks: true,
    module: true,
    scriptType: 'module',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              target: 'es2020',
              parser: {
                syntax: 'typescript',
                dynamicImport: true,
                decorators: true,
              },
              minify: {
                compress: {
                  comparisons: true,
                  computed_props: true,
                  conditionals: true,
                  dead_code: true,
                  directives: true,
                  ecma: 2020,
                  evaluate: true,
                  if_return: true,
                  join_vars: true,
                  negate_iife: true,
                  sequences: true,
                  switches: true,
                  unused: true,
                  module: true,
                },
                mangle: true,
              },
            },
            module: {
              type: 'es6',
              strict: true,
              strictMode: true,
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
  experiments: {
    outputModule: true,
  },
});
