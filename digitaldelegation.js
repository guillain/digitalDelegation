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
    markdown: message
  };
  console.log('>>> message: ' + message);
  spark.messageSend(newMessage)
    .then(function(res) { console.log(res); })
    .catch(function(err) { console.log(err); });
}

messageSum = function (message) {
  tosay  = config.DD.msgintro + '\n';
  tosay += message + '\n';
  tosay += config.DD.msgend + '\n';
  return (tosay);
}

exports.start = function (req, res) {
  var roomName = config.DD.roomtitle + ' ' + req.body.name;
  console.log('>>> bt.tn name: ' + req.body.name);

  // Open a Spark room with DD team
  room = spark.roomAdd(roomName)
    .then(function(room) {
      console.log('>>> room name:' + roomName);
      msg  = 'Button\'s info \n';
      msg += '* ID: ' + req.body.ID + '\n';
      msg += '* EID: ' + req.body.EID + '\n';
      msg += '* Device ID: ' + req.body.DEVICEID + '\n';
      msg += '* Counter: ' + req.body.counter + '\n';
      msg += '* Date: ' + req.body.date + '\n';
      msg += '* Time: ' + req.body.time + '\n';
      msg += '* Name: ' + req.body.name + '\n';
      msg += '* User: ' + req.body.user + '\n';
      msg += '* Location: ' + req.body.location + '\n';
      msg += '* Email: ' + req.body.emailaddress + '\n';
      message(room.id, msg);

      memberroom = spark.membershipAdd(room.id, config.DD.emailA, '1')
        .then(function(room) { }) //message(room.id, '* Admin membership added: '+config.DD.emailA); })
        .catch(function(err) { console.log('* Issue during Admin membership added: '+config.DD.emailA); });

      memberroom = spark.membershipAdd(room.id, config.DD.emailB, '0')
        .then(function(room) { }) //message(room.id, '* Membership added: '+config.DD.emailB); })
        .catch(function(err) { console.log('Issue during membership added: '+config.DD.emailB); });

    })
    .catch(function(err) { console.log(err); });

}

