const _ = require('lodash');
const should = require('should');
const jist = require('../../../index');

describe('Conversion', () => {
  it('should able to build an object', () => {
    
    let sourceData = {
      key1: 'foo',
      key2: 'bar'
    };
    
    let conversion = jist.convert(sourceData, (jist) => {
      jist.key3(function(jist) {
        jist.insideKey3('insideValue3');
      });
    });


    conversion.should.have.property('key3');
    conversion.key3.should.have.property('insideKey3');
    conversion.key3.insideKey3.should.equal('insideValue3');

  });
});