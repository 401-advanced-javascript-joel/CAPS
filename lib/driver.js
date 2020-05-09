'use strict';

class Driver {
  constructor(events) {
    this.events = events;
  }

  listen() {
    this.events.on('in-transit', (order) => {
      console.log(`EVENT: in-transit order ${order.orderID}`);
      this.inTransit(order);
    });

    this.events.on('pickup', (order) => {
      console.log(`DRIVER: Picked up order ${order.orderID}.`);
      this.events.emit('in-transit', order);
    });
  }

  async inTransit(order) {
    setTimeout(() => {
      this.deliver(order);
    }, 3000);
  }

  deliver(order) {
    console.log(`DRIVER: Delivered order ${order.orderID}`);
    this.events.emit('delivered', order);
  }
}

module.exports = Driver;

const events = require('./events');
const driver = new Driver(events);
const order = {
  time: new Date().toLocaleString('en-US'),
  store: "Joel's Jams",
  orderID: 'ad68c0f2-2735-41ef-a80f-0faa8263b29a',
  customer: `Joel Watson`,
  address: `12404 SE 217th CT, Kent, WA`,
};
driver.inTransit(order);
