#!/usr/bin/env node

require('colors');

var assert = require('assert'),
    program = require('commander');

var Xbox = require('./index');

program
  .usage('-i <ip_address> -l <live_device_id> [-t <tries>] [-d <delay_between_tries>]')
  .option('-i, --ip <ip>', 'Xbox One IP Address')
  .option('-l, --live_device_id <live_device_id>', 'Xbox One Live Device ID')
  .option('-t, --tries <tries>', 'Number of times to send power on packet')
  .option('-d, --delay <delay_between_tries>', 'Delay between power packets')
  .parse(process.argv);

assert(program.ip, 'Missing required option <ip_address>'.red);
assert(program.live_device_id, 'Missing required option <live_device_id>'.red);

(new Xbox(program.ip, program.live_device_id)).powerOn({
  tries: program.tries,
  delay: program.delay,
  waitForCallback: true
}, function(err) {
  process.exit(err ? 1 : 0);
});
