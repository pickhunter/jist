const _ = require('lodash');
const should = require('should');
const jist = require('../../index');

describe('Conversion by prop', () => {

  it('should set a property through the set method', () => {
    let sourceData = {
      key1: 'foo',
      key2: 'bar'
    };
    
    let conversion = jist.convert(sourceData, function(jist) {
      jist.set('key3', 'value3');
    });

    conversion.key3.should.equal('value3');
  });

  it('should set an arbit property through the arbit method', () => {
    let sourceData = {
      key1: 'foo',
      key2: 'bar'
    };
    
    let conversion = jist.convert(sourceData, function(jist) {
      jist.key3('value3');
    });

    conversion.key3.should.equal('value3');
  });
});