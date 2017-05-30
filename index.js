const Jist = require('./jist');
const fs = require('fs');

let jistModule = {
  convert: (input, strategy) => {
    let jist = new Jist(input);
    strategy.apply(input, [jist]);

    return jist.output;
  },

  register: function(expressApp){

    expressApp.engine('jist', this.renderFile);

    expressApp.set('view engine', 'jist');
  }
};

jistModule.renderFile = function(filePath, scope, callback) {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    let renderer = Function('jist', content);

    let rendered = jistModule.convert(scope, renderer);

    return callback(null, rendered);
  });
};

jistModule._express = jistModule.renderFile;

module.exports = jistModule;