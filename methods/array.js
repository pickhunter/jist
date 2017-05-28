const _ = require('lodash');

let func = (input, mapper) => {
  return input.map((el, i) => {
    let Jist = require('../jist');
    let jist = new Jist(el);
    mapper.apply(el, [el, i, jist]);

    return jist.output;
  });
};

module.exports = func;