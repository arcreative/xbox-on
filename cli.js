require('colors');

var assert = require('assert'),
    program = require('commander');

var Xbox = require('./index');

var ip,
    liveId;

program
  .usage('-i <ip_address> -l <live_device_id>')
  .usage('--ip=<ip_address> --live_device_id=<live_device_id>')
  .option('-i, --ip <ip>', 'Xbox One IP Address')
  .option('-l, --live_device_id <live_device_id>', 'Xbox One Live Device ID')
  .parse(process.argv);

assert(program.ip, 'Missing required option <ip_address>'.red);
assert(program.live_device_id, 'Missing required option <live_device_id>'.red);

(new Xbox(program.ip, program.live_device_id)).powerOn(process.exit.bind(null, 0));
