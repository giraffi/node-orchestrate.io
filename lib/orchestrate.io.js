/*
 * orchestrate.io.js:
 *   Wrapper for node-orchestrate.io object
 *
 */

var io = exports;

//
// Export node-orchestrate.io core client APIs
//
io.version      = require('../package.json').version;
io.createClient = require('./orchestrate.io/client').createClient;
io.Io           = require('./orchestrate.io/client').OrchestrateIo;
io.common       = require('./orchestrate.io/common')
