module.exports = {
  convert: (strategy, input) => {
    return strategy.apply({}, input);
  }
};