const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
  target: 'electron-renderer',
  output: {
    // this was added for compatibility, see https://webpack.js.org/configuration/output/#outputhashfunction and
    // https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options
    hashFunction: 'xxhash64'
  }
};
