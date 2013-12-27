var helper = require('../helper')
  , expect = require('chai').expect;

describe('orchestrate.io/common', function () {
  describe('.merge', function () {
    it('returns a merger object', function () {
      x = { a: 1 };
      y = { b: 2 };
      merged = helper.io.common.merge(x,y)
      expect(merged).to.eql({ a: 1, b: 2 });
    });
  });
});
