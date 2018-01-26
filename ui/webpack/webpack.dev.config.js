const path = require('path');
const relativeRootPath = '..';

module.exports = {
  entry: path.join(__dirname, relativeRootPath, 'src/index.js'),
  output: {
    path: path.join(__dirname, relativeRootPath, './dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
    // publicPath: path.join(__dirname, relativeRootPath, './dist'),
  },
  devtool: 'inline-source-map',
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
        // cacheDirectory是用来缓存编译结果，下次编译加速
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, relativeRootPath, 'src'),
      },
    ]
  },
  devServer: {
    /*
     * 默认webpack dev server是从项目的根目录提供服务，如果要从不同的目录提供服务，可以通过contentBase来配置
     * 修改配置文件，告诉开发服务器(webpack dev server)，在哪里查找文件
     * URL的根目录。如果不设定的话，默认指向项目根目录
     */
    contentBase: path.join(__dirname, relativeRootPath),
    // historyApiFallback，让所有的404定位到index.html
    historyApiFallback: true,
    // 如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。
    host: '0.0.0.0',
  },
};
