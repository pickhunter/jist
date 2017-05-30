const Jist = require('./jist');
const fs = require('fs');

module.exports = {
  convert: (input, strategy) => {
    let jist = new Jist(input);
    strategy.apply(input, [jist]);

    return jist.output;
  },

  register: function(expressApp){
    let self = this;

    expressApp.engine('jist', function (filePath, scope, callback) {
      fs.readFile(filePath, function (err, content) {
        if (err) return callback(err);
        let renderer = Function('jist', content);

        let rendered = self.convert(scope, renderer);

        return callback(null, rendered)
      })
    });

    expressApp.set('view engine', 'jist');
  }
};