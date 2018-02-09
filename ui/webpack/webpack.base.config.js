const path = require('path');
const relativeRootPath = '..';

module.exports = {
  entry: path.join(__dirname, relativeRootPath, 'src/index.js'),
  output: {
    path: path.join(__dirname, relativeRootPath, './dist/'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, relativeRootPath, 'src/common'),
      '@containers': path.resolve(__dirname, relativeRootPath, 'src/containers'),
      '@components': path.resolve(__dirname, relativeRootPath, 'src/components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, relativeRootPath, 'src'),
      },
    ]
  },
};
