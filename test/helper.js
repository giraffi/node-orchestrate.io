var nock = require('nock')
  , io = require('../index');

var helper = exports;

//
// Define the default options
//
var default_options = helper.default_options = {
  endpoint: 'https://api.orchestrate.io',
  api: 'v0'
};

//
// Create a new fake server
//
helper.fakeIo = require('./support/fake-io').createServer(default_options);
helper.io = io;
