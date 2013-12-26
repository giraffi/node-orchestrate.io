var nock = require('nock');

var fakeIo = exports;

exports.createServer = function (options) {
  return new FakeIo(options);
};

var FakeIo = exports.FakeIo = function (options) {
  this.defaults = options;
};

FakeIo.prototype.keyValue = function (options) {
  var server
    , uri = '/' + [ this.defaults.api, options.collection, options.key ].join('/');

  if (options.method == 'GET') {
    server = nock(this.defaults.endpoint)
      .get(uri)
      .replyWithFile(200, __dirname + '/fixtures/sample.json');
  } else if (options.method == 'PUT') {
    server = nock(this.defaults.endpoint)
      .put(uri, options.data)
      .reply(201, {});
  }

  return server;
};

FakeIo.prototype.search = function (options) {
  // write fake request & response
  console.log('call FakeIo.search with ' + options);
};

FakeIo.prototype.event = function (options) {
  // write fake request & response
  console.log('call FakeIo.event with ' + options);
};

FakeIo.prototype.graph = function (options) {
  // write fake request & response
  console.log('call FakeIo.graph with ' + options);
};
