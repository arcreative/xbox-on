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

  var counter = 0,
      id = this.id,
      ip = this.ip,
      socket = dgram.createSocket('udp4');

  var timeId = setInterval(function() {
      Xbox.prototype.sendOn(ip, id, socket, counter, timeId, callback);
      counter++;
    }, 1000);
};

Xbox.prototype.sendOn = function(ip, id, socket, counter, timeId, callback) {

  // Create payload
  var powerPayload = new Buffer('\x00' + String.fromCharCode(id.length) + id + '\x00'),
      powerPayloadLength = new Buffer(String.fromCharCode(powerPayload.length)),
      powerHeader = Buffer.concat([new Buffer('dd0200', 'hex'), powerPayloadLength, new Buffer('0000', 'hex')]),
      powerPacket = Buffer.concat([powerHeader, powerPayload]);

  socket.send(powerPacket, 0, powerPacket.length, PORT, ip, function(err) {
    if(err){
      clearInterval(timeId);
      return callback(err);
    } else if(counter == 5){
      return callback();
    }
  });
};
