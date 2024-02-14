const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
},
{
  test: /\.(png|svg|jpe?g|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images/',
        publicPath: 'images/'
      }
    }
  ]
}
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
