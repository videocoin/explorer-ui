/* eslint-disable */
const { useEslintRc, override, enableEslintTypescript } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  enableEslintTypescript(),
);
