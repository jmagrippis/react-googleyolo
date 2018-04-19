const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/react-googleyolo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: {
    react: 'commonjs react',
    'prop-types': 'commonjs prop-types',
  },
  optimization: {
    minimize: false,
  },
}
