var helper = require('../helper')
  , mock = !!process.env.MOCK
  , expect = require('chai').expect;

describe('orchestrate.io/client', function () {
  var client
    , server;

  beforeEach(function () {
    // init something before each test
  });

  describe('.new', function () {
    it('returns the given apikey', function () {
      client = helper.io.createClient({ apikey: 'abc' });
      expect(client.options.apikey).to.equal('abc');
    });

    it('raises error if apikey not given', function () {
      expect(helper.io.createClient).to.throw(Error, /API key is required/)
    });
  });

  describe('.getKeyValue', function () {
    it('performs GET Key/Value successfully', function () {
      if (mock) {
        server = helper.fakeIo.keyValue({
          method: 'GET',
          collection: 'films',
          key: 'rashomon'
        });
      }

      client = helper.io.createClient({apikey: 'abc'});
      client.getKeyValue({
        collection: 'films',
        key: 'rashomon'
      }, function (err, data) {
        expect(err).to.be.null;
        expect(data.Title).to.equal('Rashomon');
        server && server.done();
      });
    });
  });

  describe('.putKeyValue', function () {
    it('performs PUT Key/Value successfully', function () {
      var data = JSON.stringify({Title: "Rashomon"});

      if (mock) {
        server = helper.fakeIo.keyValue({
          method: 'PUT',
          collection: 'films',
          key: 'rashomon',
          data: data
        });
      }

      client = helper.io.createClient({apikey: 'abc'});
      client.putKeyValue({
        collection: 'films',
        key: 'rashomon',
        data: data
      }, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.empty;
        server && server.done();
      });
    });
  });

});
