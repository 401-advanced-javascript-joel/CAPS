'use strict';

const events = require('../lib/events');
const Vendor = require('../lib/vendor');
const Driver = require('../lib/driver');

let consoleSpy = jest.spyOn(console, 'log');

const order = {
  time: new Date().toLocaleString('en-US'),
  store: "Joel's Jams",
  orderID: 'ad68c0f2-2735-41ef-a80f-0faa8263b29a',
  customer: `Joel Watson`,
  address: `12404 SE 217th CT, Kent, WA`,
};

describe('Testing the pickup event handling', () => {
  test('Should log that order was picked up from driver', () => {
    const driver = new Driver(events);
    driver.listen();
    events.emit('pickup', order);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Driver: Picking up order ad68c0f2-2735-41ef-a80f-0faa8263b29a.',
    );
    consoleSpy.mockClear();
  });
});

describe('Testing the in-transit event handling', () => {
  test('Should log that order is in transit', () => {
    const driver = new Driver(events);
    driver.listen();
    events.emit('in-transit', order);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Event: in-transit - ad68c0f2-2735-41ef-a80f-0faa8263b29a',
    );
    consoleSpy.mockClear();
  });
});

describe('Testing the delivered event handling', () => {
  test('should log thank you from vendor', () => {
    const vendor = new Vendor(events);
    vendor.listen();
    events.emit('delivered', order);
    expect(consoleSpy).toHaveBeenCalledWith(
      'VENDOR: Thank you for delivering order ad68c0f2-2735-41ef-a80f-0faa8263b29a',
    );
    consoleSpy.mockClear();
  });
});

describe('testing vendor module', () => {
  test('should generate a new order', () => {
    const vendor = new Vendor(events);
    vendor.generateOrder();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockClear();
  });
});

describe('testing driver module', () => {
  test('should take 3 seconds to handle deliver', async () => {
    const driver = new Driver(events);
    driver.inTransit(order);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Driver: Driving order ad68c0f2-2735-41ef-a80f-0faa8263b29a to customer.',
    );
    await setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Driver: Driving order ad68c0f2-2735-41ef-a80f-0faa8263b29a to customer.',
        'Event: Delivered - ad68c0f2-2735-41ef-a80f-0faa8263b29a',
      );
    }, 3000);
  });
});
