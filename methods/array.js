const _ = require('lodash');

let func = (input, mapper, mapperWhenKey) => {

  let theMapper = mapper;
  let theInput = input;

  if(_.isString(mapper)) {
    theMapper = mapperWhenKey;
    theInput = input[mapper];
  }

  theInput = theInput.map((el, i) => {
    let Jist = require('../jist');
    let jist = new Jist(el);
    theMapper.apply(el, [el, i, jist]);
    
    return jist.output;
  });

  return theInput;
};

module.exports = func;