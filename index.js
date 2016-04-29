var dgram = require('dgram');

const PORT = 5050
const PING_PAYLOAD = "dd00000a000000000000000400000002"
const POWER_PAYLOAD = "dd02001300000010"

module.exports = Xbox;

function Xbox(ip, id) {
  this.ip = ip;
  this.id = id;
  return this;
}

Xbox.prototype.powerOn = function(callback) {
  callback = callback || function() {};
  
  // Counter some older node compatibility issues with `new Buffer(1).fill(0)`
  var zeroBuffer = new Buffer(1);
  zeroBuffer.write('\u0000');
  
  var message = Buffer.concat([new Buffer(POWER_PAYLOAD, 'hex'), new Buffer(this.id), zeroBuffer]);
  var socket = dgram.createSocket('udp4');
  socket.send(message, 0, message.length, PORT, this.ip, function(err, bytes) {
    if (err) throw err;
    socket.close();
    callback();
  });
}
