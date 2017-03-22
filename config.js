/**
 * @file Cisco Spark Main bot
 * @author guillain <guillain@gmail.com>
 * @license GPL-3.0
 * @features:
 * @@ servicedesk
 */

var config = {};

config.name = 'digitalDelegation';
config.email = 'guillain@gmail.com';
config.debug = '1';

// Flint
config.address = 'dev-collab.tontonserver.com';
config.port = '8084';

// Spark
config.sparkbot = 'digitalDelegation@sparkbot.io';
config.token = 'MzI5ZGY0ZWYtYjRkMy00ZTZjLWIwNjktNWRlNDNmZGI5MjQxMWFhYTA0YTYtOTZl';

// Digital Delegation conf
config.DD = {};
config.DD.emailA = config.email;
config.DD.emailB = 'guillain.sanchez@dimensiondata.com';
config.DD.storage = 'digitalDelegation';
config.DD.msgintro = 'Welcome on the _Digital Delegation_ demo \n';
config.DD.msgend = 'Thanks to have used the _Digital Delegation_ demo \n';
config.DD.roomtitle = 'Digital Delegation \n';
config.DD.roommsg = 'Space creation ongoing, name: '+config.DD.roomtitle+' \n';

// export config
module.exports = config;
