const _ = require('lodash');

let pass = (arg) => {
  return arg;
};

let transform = (scope, transformer) => {
  let Jist = require('../jist');
  let jist = new Jist(scope);
  transformer.apply(scope, [jist]);
  return jist.output;
};

let makeArgs = (possiblyVal, possiblyTransformer) => {

  let transformer = pass;

  if(_.isFunction(possiblyTransformer)) {
    transformer = function(input){
      return transform(input, possiblyTransformer);
    };
  }

  else if(_.isString(possiblyTransformer) || _.isArray(possiblyTransformer)) {
    transformer = function(input) {
      return transform(input, function(jist) {
        jist.pick(possiblyTransformer);
      });
    };
  }


  return {
    valueMaker: _.isFunction(possiblyVal) ? function() {
      return transform({}, possiblyVal);
    } : function() {
      return possiblyVal;
    },
    transformer: transformer
  };
};

let func = (input, key, val, transformer) => {

  let args = makeArgs(val, transformer);

  input[key] = args.valueMaker();

  input[key] = args.transformer(input[key]);
  
  return input;

};


func._applicableOnArray = true;

module.exports = func;