var dgram = require('dgram');

const PORT = 5050;

module.exports = Xbox;

function Xbox(ip, id) {
  this.ip = ip;
  this.id = id;
  return this;
}

Xbox.prototype.powerOn = function(callback) {
  callback = callback || function() {};

  // Open socket
  var socket = dgram.createSocket('udp4');

  // Create payload
  var powerPayload = new Buffer('\x00' + String.fromCharCode(this.id.length) + this.id + '\x00'),
      powerPayloadLength = new Buffer(String.fromCharCode(powerPayload.length)),
      powerHeader = Buffer.concat([new Buffer('dd0200', 'hex'), powerPayloadLength, new Buffer('0000', 'hex')]),
      powerPacket = Buffer.concat([powerHeader, powerPayload]);

  // Send
  socket.send(powerPacket, 0, powerPacket.length, PORT, this.ip, function(err) {
    if (err) return callback(err);
    socket.close();
    callback();
  });
};
