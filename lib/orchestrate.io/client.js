/*
 * client.js:
 *   Client for accessing to the Orchestrate.Io API
 *
 */

var io = require('../orchestrate.io')
  , common = require('./common')
  , events = require('events')
  , util = require('util')
  , request = require('request')
  , qs = require('querystring');

/*
    // Split the entity into a module per resource:
    //
    KeyValue = require('./key-value').KeyValue,
    Search = require('./search').Search,
    Event = require('./event').Event,
    Graph = require('./graph').Graph;
*/


//
// function createClient (options)
//   Creates a new instance of Orchestrate.io client
//
exports.createClient = function (options) {
  return new OrchestrateIo(options);
};

//
// function OrchestrateIo (options)
//   Initialize the OrchestrateIo object
//
var OrchestrateIo = exports.OrchestrateIo = function (options) {
  events.EventEmitter.call(this)
  var defaults = {
    version: io.version,
    endpoint: 'https://api.orchestrate.io',
    api: 'v0',
    apikey: null,
    headers: {
      'User-Agent': 'Orchestrate.io Node module ' + io.version,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Langage': 'en'
    }
  };

  this.options = common.merge(defaults, options);
  if (!this.options.apikey) throw new Error('options.apikey are required');
};

//
// Inherit from events.EventEmitter
//
util.inherits(OrchestrateIo, events.EventEmitter);

//
// function getKeyValue (params, callback)
// @params {Hash}
// @callback {function}
//
OrchestrateIo.prototype.getKeyValue = function (params, callback) {
  if (typeof callback !== 'function') {
    throw new Error('FATAL: INVALID CALLBACK');
    return this;
  }

  var self = this
    , uri = [ self.options.endpoint, self.options.api, params.collection, params.key ].join('/');

  var requestOptions = {
    uri: uri,
    method: 'GET',
    headers: self.options.headers,
    auth: {
      user: self.options.apikey,
      pass: ""
    }
  };

  common.perform(requestOptions, callback, function (res, body) {
    try {
      self.emit('KeyValue', body);
      if (callback) { callback(null, body) }
    }
    catch (ex) {
      if (callback) {
        callback(new Error('Unspecified error from Orchestrate.io: ' + ex));
      }
    }
  });

  return this;
};


//
// function putKeyValue (params, callback)
// @params {Hash}
// @callback {function}
//
OrchestrateIo.prototype.putKeyValue = function (params, callback) {
  if (typeof callback !== 'function') {
    throw new Error('FATAL: INVALID CALLBACK');
    return this;
  }

  var self = this
    , uri  = [ self.options.endpoint, self.options.api, params.collection, params.key ].join('/')
    , body = (params.data instanceof Object) ? JSON.stringify(params.data) : params.data;

  var requestOptions = {
    uri: uri,
    method: 'PUT',
    headers: self.options.headers,
    auth: {
      user: self.options.apikey,
      pass: ""
    },
    body: body
  };

  common.perform(requestOptions, callback, function (res, body) {
    try {
      self.emit('KeyValue', body);
      if (callback) { callback(null, body) }
    }
    catch (ex) {
      if (callback) {
        callback(new Error('Unspecified error from Orchestrate.io: ' + ex));
      }
    }
  });

  return this;
};
