/**
 * @file Defines digitalDelegation functions for Spark
 * @author guillain <guillain@gmail.com>
 * @license GPL-3.0
 */

// Load config
var config = require('./config');

// Prepare Cisco Spark env with the help of Sparky (thanks to him ;)
var Spark = require('node-sparky');
var spark = new Spark({ token: config.token  });

message = function (roomid, message) {
  var newMessage = {
    roomId: roomid,
    text: message
  };
  console.log('>>> message: ' + message);
/*
  spark.messageSend(newMessage)
    .then(function(res) { console.log(res); })
    .catch(function(err) { console.log(err); });
*/
}

messageSum = function (message) {
  tosay  = config.DD.msgintro + '\n';
  tosay += message + '\n';
  tosay += config.DD.msgend + '\n';
  return (tosay);
}

exports.start = function (req, res) {
  console.log('>>> bt.tn name: ' + req.body.name);

  // Open a Spark room with DD team
  room = spark.roomAdd(config.DD.roomtitle + ' ' + req.body.name)
    .then(function(room) {
      console.log('>>> room title: ' + config.DD.roomtitle + ' ' + req.body.name);
      message(room.id, '* Space created '+config.DD.roomtitle);

      memberroom = spark.membershipAdd(room.id, config.DD.emailA, '1')
        .then(function(room) { message(room.id, '* Admin membership added: '+config.DD.emailA); })
        .catch(function(err) { console.log(err); });

      memberroom = spark.membershipAdd(room.id, config.DD.emailB, '0')
        .then(function(room) { message(room.id, '* Membership added: '+config.DD.emailB); })
        .catch(function(err) { console.log(err); });

    })
    .catch(function(err) { console.log(err); });
}

