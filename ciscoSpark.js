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

      memberroom = spark.membershipAdd(room.id, config.DD.emailAmin, '1')
        .then(function(room) { }) //message(room.id, '* Admin membership added: '+config.DD.emailAdmin); })
        .catch(function(err) { console.log('* Issue during Admin membership added: '+config.DD.emailAdmin); });

      memberroom = spark.membershipAdd(room.id, config.DD.emailDelegator, '0')
        .then(function(room) { }) //message(room.id, '* Membership added: '+config.DD.emailDelegator); })
        .catch(function(err) { console.log('Issue during membership added: '+config.DD.emailDelegator); });

    })
    .catch(function(err) { console.log(err); });
}

exports.escalation = function (req, res) {
    var roomName = config.DD.roomtitle + ' ' + req.body.name;
  
    // Open a Spark room with DD team
    console.log('>>> room name:' + roomName);
    msg  = 'Escalation requested \n';
    msg += '* Escalation contact: ' + config.DD.emailEscalation + '\n';
    message(room.id, msg);

    memberroom = spark.membershipAdd(room.id, config.DD.emailEscalation, '0')
        .then(function(room) { }) //message(room.id, '* Escalation membership added: '+config.DD.emailEscalation); })
        .catch(function(err) { console.log('Issue during escalation membership added: '+config.DD.emailEscalation); });

}

