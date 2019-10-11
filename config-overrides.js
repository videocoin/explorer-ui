/* eslint-disable */
const path = require('path');
const { useEslintRc, override, enableEslintTypescript, addBabelPlugin, addWebpackAlias } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  enableEslintTypescript(),
  addBabelPlugin('react-hot-loader/babel'),
  addWebpackAlias({
    react: path.resolve('./node_modules/react'),
    'react-dom': '@hot-loader/react-dom',
  })
);
