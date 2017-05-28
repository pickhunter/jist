const Jist = require('./jist');

module.exports = {
  convert: (input, strategy) => {
    let jist = new Jist(input);
    strategy.apply(input, [jist]);

    return jist.output;
  }
};