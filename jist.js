const _ = require('lodash');
const methods = require('./methods');

class Jist {
  constructor(input) {
    this._input = input;
  }

  get output() {
    return this._output;
  }
}

let proxy = new Proxy(Jist, {

  construct: function(target, argumentsList, newTarget) {
    let h = {
      get: function(target, prop, receiver) {
        let input = target.output || target._input;

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
          return function() {
            let method = methods.set;
            output = method.apply(target, [target._input, prop, ...arguments]);

            target._output = output;
          };
        } else {
          return target[prop];
        }
      }
    };


    let classInstance = new Jist(...argumentsList);
    
    let proxy = new Proxy(classInstance, h);
    return proxy;
  }
  
});

_.forEach(methods, (method, name) => {
  Jist.prototype[name] = method;
});

module.exports = proxy;