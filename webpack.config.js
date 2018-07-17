const path = require('path');

module.exports = {
  entry: {
    'dist/obsix': './src/index.ts',
    'demo/app': './demo/main.ts'
  },
  output: {
    filename: '[name].js',
    library: 'obsix',
    libraryTarget: 'umd',
    path: path.resolve(__dirname),
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devServer: {
    open: true
  },
  devtool: 'source-map'
}
