# xbox-on
Xbox One power control from CLI or node app

## Installation

`npm install -g xbox-on` to use as CLI, `npm install xbox-on` to use as module.

## Usage (CLI)

```
$ xbox-on --help

  Usage: cli --ip=<ip_address> --live_device_id=<live_device_id>

  Options:

    -h, --help                             output usage information
    -i, --ip <ip>                          Xbox One IP Address
    -l, --live_device_id <live_device_id>  Xbox One Live Device ID
```

## Usage (Module)
```
var Xbox = require('xbox-on');                // Require module
var xbox = new Xbox(ipAddress, liveDeviceId); // Create new xbox
xbox.powerOn();                               // Issue power on command
```
