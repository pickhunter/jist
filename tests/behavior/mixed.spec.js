const _ = require('lodash');
const should = require('should');
const jist = require('../../index');

describe('Conversion by except', () => {

  it('should leave and pick the rest from an object', () => {
    let sourceData = {
      key1: 'foo',
      key2: 'bar'
    };
    
    let conversion = jist.convert(sourceData, function(jist) {
      jist.except('key2');
    });

    conversion.key1.should.equal('foo');
  });
  
});