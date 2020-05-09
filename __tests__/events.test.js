'use strict';

const events = require('../lib/events');
const Vendor = require('../lib/vendor');
const Driver = require('../lib/driver');

const driver = new Driver(events);
const vendor = new Vendor(events);
driver.listen();
vendor.listen();

let consoleSpy = jest.spyOn(console, 'log');

const order = {
  time: new Date().toLocaleString('en-US'),
  store: "Joel's Jams",
  orderID: 'ad68c0f2-2735-41ef-a80f-0faa8263b29a',
  customer: `Joel Watson`,
  address: `12404 SE 217th CT, Kent, WA`,
};

beforeEach(() => {
  consoleSpy.mockClear();
});

describe('Testing the pickup event handling', () => {
  test('Should log that order was picked up from driver', async () => {
    events.emit('pickup', order);
    expect(consoleSpy).toHaveBeenCalledWith(
      'DRIVER: Picked up order ad68c0f2-2735-41ef-a80f-0faa8263b29a.',
    );
  });
});

describe('Testing the in-transit event handling', () => {
  test('Should log that order is in transit', () => {
    events.emit('in-transit', order);
    expect(consoleSpy).toHaveBeenCalledWith(
      'EVENT: in-transit order ad68c0f2-2735-41ef-a80f-0faa8263b29a',
    );
  });
});

describe('Testing the delivered event handling', () => {
  test('should log thank you from vendor', () => {
    events.emit('delivered', order);
    expect(consoleSpy).toHaveBeenCalledWith(
      'VENDOR: Thank you for delivering order ad68c0f2-2735-41ef-a80f-0faa8263b29a',
    );
  });
});

describe('testing vendor module', () => {
  test('should generate a new order', () => {
    vendor.generateOrder();
    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe('testing Driver module', () => {
  test('should take 3 seconds to handle deliver', (done) => {
    jest.useFakeTimers();
    driver.inTransit(order);
    expect(consoleSpy).not.toHaveBeenCalled();
    setTimeout(() => {
      try {
        expect(consoleSpy).toHaveBeenCalledWith(
          'DRIVER: Delivered order ad68c0f2-2735-41ef-a80f-0faa8263b29a',
        );
        done();
      } catch (e) {
        done.fail(e);
      }
    }, 3000);
    jest.runTimersToTime(3000);
  });
});
