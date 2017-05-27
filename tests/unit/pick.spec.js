const _ = require('lodash');
const should = require('should');
const jist = require('../../index');

describe('Conversion', () => {

  it('should convert input json', () => {
    let sourceData = {
      key1: 'foo',
      key2: 'bar'
    };
    
    let conversion = jist.convert((jist) => {
      jist.pick('key1');
    });

    conversion.key1.should.equal('foo');
    conversion.should.not.have.property('key2');
  });
});