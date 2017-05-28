const _ = require('lodash');

module.exports = (input, key, val) => {
  if(_.isFunction(val)) {
    let scope = {}
    input[key] = scope;
    let Jist = require('../jist');
    let jist = new Jist(scope);

    val.apply(scope, [jist]);
  } else {
    input[key] = val;
  }
  
  return input;
};