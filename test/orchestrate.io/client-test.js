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
          key: 'kurosawa'
        });
      }

      client = helper.io.createClient({ apikey: 'abc' });
      client.getKeyValue({
        collection: 'films',
        key: 'kurosawa'
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
          key: 'kurosawa',
          data: data
        });
      }

      client = helper.io.createClient({ apikey: 'abc' });
      client.putKeyValue({
        collection: 'films',
        key: 'kurosawa',
        data: data
      }, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.empty;
        server && server.done();
      });
    });
  });

  describe('.search', function () {
    it('performs GET Search successfully', function () {
      var queryString = 'Genre:crime';

      if (mock) {
        server = helper.fakeIo.search({
          collection: 'films',
          query: queryString
        })
      }

      client = helper.io.createClient({ apikey: 'abc' });
      client.search({
        collection: 'films',
        query: 'Genre:crime'
      }, function (err, data) {
        expect(err).to.be.null;
        expect(data.results[0].value.Genre).to.equal('Crime, Drama');
        server && server.done();
      });
    });
  });

  describe('.getEvent', function () {
    it('performs GET Events successfully', function () {
      if (mock) {
        server = helper.fakeIo.event({
          method: 'GET',
          collection: 'films',
          key: 'kurosawa',
          type: 'comments',
          start: 1388036932,
          end: 1388040903
        });
      }

      client = helper.io.createClient({ apikey: 'abc' });
      client.getEvent({
        collection: 'films',
        key: 'kurosawa',
        type: 'comments',
        start: 1388036932,
        end: 1388040903
      }, function (err, data) {
        expect(err).to.be.null;
        expect(data.count).to.equal(1);
        server && server.done();
      });
    })
  });

  describe('.putEvent', function () {
    it('performs PUT Events successfully', function () {
      var data = JSON.stringify({ note: "magnifique!" });
      if (mock) {
        server = helper.fakeIo.event({
          method: 'PUT',
          collection: 'films',
          key: 'kurosawa',
          type: 'comments',
          timestamp: 1388036932,
        });
      }

      client = helper.io.createClient({apikey: 'abc'});
      client.putEvent({
        collection: 'films',
        key: 'kurosawa',
        type: 'comments',
        timestamp: 1388036932
      }, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.empty;
        server && server.done();
      });
    });
  });
});
