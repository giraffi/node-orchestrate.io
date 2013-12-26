/*
 * common.js:
 *   Common utils for the Orchestrate.io client
 *
 */

var https = require('https')
  , util = require('util')
  , request = require('request')
  , io = require('../orchestrate.io');

var common = exports;

//
// Fire an HTTP request to the Orchestrate.io API
//
common.perform = function () {
  var args = Array.prototype.slice.call(arguments)
    , success = args.pop()
    , callback = args.pop()
    , responded
    , requestBody
    , auth
    , headers
    , method
    , uri;

  if (typeof args[0] === 'object') {
    uri         = args[0]['uri'];
    method      = args[0]['method'];
    requestBody = args[0]['body'] || null;
    headers     = args[0]['headers'];
    auth        = args[0]['auth'];
    queryString = args[0]['query'] || null;
  } else {
    // Raise error
    throw new Error('FATAL: INVALID OPTIONS');
  }

  function onError (err) {
    if (!responded) {
      responded = true;
      if (callback) { callback(err) }
    }
  }

  var requestOptions = {
    uri: uri,
    method: method,
    headers: headers || {},
    auth: auth
  };

  if (requestBody) {
    requestOptions.body = requestBody;
  }

  if (queryString) {
    requestOptions.qs = queryString;
  }

  // Perform a http request
  try {
    request(requestOptions, function (err, res, body) {
      if (err) { return onError(err) }

      var statusCode = res.statusCode.toString()
        , result = body ? JSON.parse(body) : {};

      if (!statusCode.toString().match(/^20*/)) {
        return onError(new Error('Orchestrate.io (' + statusCode + '): ' + [result.message]));
      }

      success(res, result);
    });
  }
  catch (ex) {
    onError(ex);
  }
};

//
// Merge objects into the first one
//
common.merge = function (options) {
  for (var i = 1; i < arguments.length; i++) {
    for (var opt in arguments[i]) {
      options[opt] = arguments[i][opt];
    }
  }
  return options;
}
