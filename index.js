'use strict';

const events = require('./lib/events');
const Vendor = require('./lib/vendor');
const Driver = require('./lib/driver');

// set the global event emitter for both vendor and driver
const vendor = new Vendor(events);
const driver = new Driver(events);

// set both vender and driver listeners
vendor.listen();
driver.listen();

// starts with 5 second wait cause good jam takes time
vendor.open();
