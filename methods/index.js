const fs = require('fs');
const _ = require('lodash');

let methods = {};

fs.readdirSync('./methods')
  .filter(item => /[.]js$/.test(item) && item != 'index.js')
  .map(file => file.split('.js')[0])
  .forEach((file) => {
    let name = _.camelCase((file));
    let def = require(`./${file}`);
    
    methods[name] = def;
  });

module.exports = methods;