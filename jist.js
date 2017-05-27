const _ = require('lodash');
const methods = require('./methods');

class Jist {
  constructor(input) {
    this._input = input;
    this._output = null;
  }
}

let proxy = new Proxy(Jist, {

  construct: function(target, argumentsList, newTarget) {
    var h = {
      get: function(target, prop, receiver) {
        if(_.includes(_.keys(methods), prop)) {
          return function() {
            let method = methods[prop];
            let output = null;
            if(_.isArray(target._input) && method._applicableOnArray) {
              output = target._input.map(e => method.apply(target, [e, ...arguments]));
            }
            else {
              output = method.apply(target, [target._input, ...arguments]);
            }

            target._output = output;
          }
        } else if(!target[prop]) {
          return function(val) {
            let input = target._output || target._input;

            input[prop] = val;

            target._output = input;
          };
        } else {
          return target[prop];
        }
      }
    };


    var classInstance = new Jist(...argumentsList);
    
    var proxy = new Proxy(classInstance, h);
    return proxy;
  }
  
});

_.forEach(methods, (method, name) => {
  Jist.prototype[name] = method;
});

module.exports = proxy;