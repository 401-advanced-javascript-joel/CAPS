'use strict';

class Driver {
  constructor(events) {
    this.events = events;
  }

  listen() {
    this.events.on('in-transit', (order) => {
      console.log(`Event: in-transit order ${order.orderID}`);
      this.inTransit(order);
    });

    this.events.on('pickup', (order) => {
      console.log(`Driver: Picked up order ${order.orderID}.`);
      this.events.emit('in-transit', order);
    });
  }

  inTransit(order) {
    setTimeout(() => {
      this.deliver(order);
    }, 3000);
  }

  deliver(order) {
    console.log(`Driver: Delivered order ${order.orderID}`);
    this.events.emit('delivered', order);
  }
}

module.exports = Driver;
