/**
 * @file Server Main
 * @author guillain <guillain@gmail.com>
 * @license GPL-3.0
 * @features:
 * @@ servicedesk
 */

// Import module
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

// Load config
var config = require('./config');

// My additionnal features
var myCiscoSpark = require('./ciscoSpark.js');

// Digital delegation module
app.post('/bttn', function(req, res) {
  console.log('start digital delegation module');
  myCiscoSpark.start(req, res);
});

// Start expess server
var server = app.listen(config.port, function () {
  console.log('Server listening on port %s', config.port);
});

// Gracefully shutdown (ctrl-c)
process.on('SIGINT', function() {
  console.log('stoppping...');
  server.close();
});

