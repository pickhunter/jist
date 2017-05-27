const _ = require('lodash');

module.exports = (input, key, val) => {
  input[key] = val;
  return input;
};