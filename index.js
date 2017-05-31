const Jist = require('./jist');
const fs = require('fs');
const _ = require('lodash');

let jistModule = {
  convert: (scope, template) => {
    let scopeKeys = _.keys(scope);

    let renderer = Function(...scopeKeys , template).bind(scope);

    let rendered = renderer(...scopeKeys.map(key => scope[key]));

    return rendered;
  },

  render: function() {
    return this.convert(...arguments);
  },

  register: function(expressApp, options){

    expressApp.engine('jist', this.getFileRenderer(options));

    expressApp.set('view engine', 'jist');
  }
};

jistModule.renderFile = function(filePath, scope, callback) {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // scope = _.omit(scope, ['cache', '_locals', 'settings']);
    let scopeKeys = _.keys(scope);

    let renderer = Function(...scopeKeys , content).bind(scope);

    let rendered = renderer(...scopeKeys.map(key => scope[key]));

    return callback(null, rendered);
  });
};

jistModule.getFileRenderer = function(options) {
  let defaultScope = options.defaultScope || {};

  return function(filePath, scope, callback) {
    return jistModule.renderFile(filePath, Object.assign(defaultScope, scope), callback);
  }
};

jistModule._express = jistModule.renderFile;

module.exports = jistModule;