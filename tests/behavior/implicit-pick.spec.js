const _ = require('lodash');
const should = require('should');
const jist = require('../../index');

describe('Conversion by implicit pick', () => {

  it('should pick and leave the rest from an object', () => {
    let sourceData = {
      arr: [{
        key1: 'foo',
        key2: 'bar'
      }]
    };
    
    let conversion = jist.convert(sourceData, function(jist) {
      jist.rohit(sourceData.arr, 'key1');
      jist.except('arr');
    });

    console.log('TRACE', conversion);

    conversion.rohit.length.should.equal(sourceData.arr.length);
    conversion.should.not.have.property('arr');
    conversion.rohit[0].key1.should.equal('foo');
    conversion.should.not.have.property('key2');
  });
});