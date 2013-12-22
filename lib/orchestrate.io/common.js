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

common._request = function () {
  var args = Array.prototype.slice.call(arguments)
    , success = args.pop()
    , callback = args.pop()
    , requestBody
    , headers
    , method
    , uri;

  // under development ..
  if (typeof args[0] === 'object') {
    uri         = args[0]['uri'];
    method      = args[0]['method'];
    requestBody = args[0]['body'] || {};
    headers     = args[0]['headers'];
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
    headers: headers || {}
  };

  if (requestBody) {
    requestOptions.body = requestBody;
  }

  try {
    request(requestOptions, function (err, res, body) {
      if (err) {
        return onError(err);
      }
      var statusCode = res.statusCode.toString();
      if (Object.keys(failCodes).indexOf(statusCode) !== -1) {
        return onError((new Error('Orchestrate.io Error(' + statusCode + '): ' + failCodes[statusCode])));
      }
      success(res, body);
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
