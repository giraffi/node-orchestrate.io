var nock = require('nock');

var fakeIo = exports;

exports.createServer = function (options) {
  return new FakeIo(options);
};

var FakeIo = exports.FakeIo = function (options) {
  this.defaults = options;
};

//
// Fake server for Key/Value resource
//
FakeIo.prototype.keyValue = function (options) {
  var server
    , uri = '/' + [ this.defaults.api, options.collection, options.key ].join('/');

  switch (options.method) {
    case "GET":
      server = nock(this.defaults.endpoint)
        .get(uri)
        .replyWithFile(200, __dirname + '/fixtures/key-value-sample.json');
      break;
    case "PUT":
      server = nock(this.defaults.endpoint)
        .put(uri, options.data).reply(201, {});
      break;
    default:
      throw new Error('Inappropriate method');
  }

  return server;
};

//
// Fake server for Search resource
//
FakeIo.prototype.search = function (options) {
  var server
    , uri = '/' + [ this.defaults.api, options.collection ].join('/');

  server = nock(this.defaults.endpoint)
    .get(uri + '?query=' + encodeURIComponent(options.query))
    .replyWithFile(200, __dirname + '/fixtures/search-sample.json');

  return server;
};

//
// Fake server for Events resource
//
FakeIo.prototype.event = function (options) {
  var server
    , uri = '/' + [ this.defaults.api, options.collection, options.key, 'events', options.type ].join('/');

  switch (options.method) {
    case "GET":
      server = nock(this.defaults.endpoint)
        .get(uri + '?start=' + options.start + '&end=' + options.end)
        .replyWithFile(200, __dirname + '/fixtures/events-sample.json');
      break;
    case "PUT":
      server = nock(this.defaults.endpoint)
        .put(uri + '?timestamp=' + options.timestamp, options.data).reply(204, {});
      break;
    default:
      throw new Error('Inappropriate method');
  }

  return server;
};

FakeIo.prototype.graph = function (options) {
  // write fake request & response
  console.log('call FakeIo.graph with ' + options);
};
