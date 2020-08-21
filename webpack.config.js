var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: __dirname + '/client/src/render.jsx',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$/,
      threshold: 5000,
      minRatio: 0.8
    })
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/public'
  }
};