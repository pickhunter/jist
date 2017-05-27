const _ = require('lodash');
const should = require('should');
const jist = require('../../index');

describe('Conversion', () => {

  it('should pick and leave the rest from an object', () => {
    let sourceData = {
      key1: 'foo',
      key2: 'bar'
    };
    
    let conversion = jist.convert(sourceData, function(jist) {
      jist.pick('key1');
    });

    conversion.key1.should.equal('foo');
    conversion.should.not.have.property('key2');
  });

  it('should pick and leave the rest from an array', () => {
    let sourceData = [{
      key1: 'foo',
      key2: 'bar'
    }, {
      key1: 'foo',
      key2: 'bar'
    }];
    
    let conversion = jist.convert(sourceData, (jist) => {
      jist.pick('key1');
    });

    conversion.length.should.equal(sourceData.length);

    conversion.forEach((e) => {
      e.key1.should.equal('foo');
      e.should.not.have.property('key2');
    });

  });
});