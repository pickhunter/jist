const _ = require('lodash');

let func = (input, args) => {
  return _.pick(input, args);
};

func._applicableOnArray = true;

module.exports = func;