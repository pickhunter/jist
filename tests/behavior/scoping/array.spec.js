const _ = require('lodash');
const should = require('should');
const jist = require('../../../index');

describe('Conversion', () => {
  it('should arbit set per element', () => {
    let sourceData = [{
      key1: 'foo',
      key2: 'bar'
    }, {
      key1: 'foo',
      key2: 'bar'
    }];
    
    let conversion = jist.convert(sourceData, (jist) => {
      jist.array(function(el, i, jist) {
        jist.key3('value3');
      });
    });

    conversion.length.should.equal(sourceData.length);

    conversion.forEach((e) => {
      e.key3.should.equal('value3');
    });

  });

  it('should arbit set per element for a array inside an object', () => {
    let sourceData = {
      array: [{
        key1: 'foo',
        key2: 'bar'
      }, {
        key1: 'foo',
        key2: 'bar'
      }]
    };
    
    let conversion = jist.convert(sourceData, (jist) => {
      jist.array('array', function(el, i, jist) {
        jist.key3('value3');
      });
    });

    conversion.array.length.should.equal(sourceData.array.length);

    conversion.array.forEach((e) => {
      e.key3.should.equal('value3');
    });

  });

  it('should set an array', () => {
    let sourceData = {
      array: [{
        key1: 'foo',
        key2: 'bar'
      }, {
        key1: 'foo',
        key2: 'bar'
      }]
    };
    
    let conversion = jist.convert(sourceData, (jist) => {
      jist.rohit(sourceData.array, function(jist) {
        jist.pick('key1');
        debugger
        jist.yo('!');
      });
    });

    conversion.rohit.length.should.equal(sourceData.array.length);

    conversion.rohit.forEach((e) => {
      e.should.have.property('key1');
      // e.should.have.property('yo');
      // e.yo.should.equal('1');
      e.key1.should.equal('foo');
      e.should.not.have.property('key2');
    });

  });
});