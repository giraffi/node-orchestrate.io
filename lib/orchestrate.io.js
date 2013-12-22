/* 
 * orchestrate.io.js: Wrapper for node-orchestrate.io object
 *
 */

var io = exports;

//
// Export node-orchestrate.io core client APIs
//
io.version      = require('../package.json').version;
io.createClient = require('./orchestrate.io/client').createClient;
io.Io           = require('./orchestrate.io/client').OrchestrateIo;

//
// Export resources for node-orchestrate.io
//
/*
  io.KeyValue = require('./orchestrate.io/key-value').KeyValue;
  io.Search   = require('./orchestrate.io/search').Search;
  io.Event    = require('./orchestrate.io/event').Event;
  io.Graph    = require('./orchestrate.io/event').Graph;
*/
