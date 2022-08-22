module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  },
  target: 'electron-main',
  output: {
    // this was added for compatibility, see https://webpack.js.org/configuration/output/#outputhashfunction and
    // https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options
    hashFunction: 'xxhash64'
  }
};