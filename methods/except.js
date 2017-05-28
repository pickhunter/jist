const _ = require('lodash');

let func = (input, args) => {
 return _.omit(input, args);
};

func._applicableOnArray = true;

module.exports = func;