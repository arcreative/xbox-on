var dgram = require('dgram');

const PORT = 5050;

module.exports = Xbox;

function Xbox(ip, id) {
  this.ip = ip;
  this.id = id;
  return this;
}

Xbox.prototype.powerOn = function(options, callback) {
  options = options || {};
  callback = callback || function() {};

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Retry up to options.tries times
  for (var i = 0; i < (options.tries || 5); i++) {
    setTimeout((function(xbox, i) {
      return function() {
        xbox.sendOn();

        // If wait was specified, callback after last try, otherwise, callback after first try
        if (options.waitForCallback && i + 1 === options.tries) {
          callback();
        } else if (!options.waitForCallback && i === 0) {
          callback();
        }
      }
    })(this, i), i * (options.delay || 500));
  }
};

Xbox.prototype.sendOn = function(callback) {
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
