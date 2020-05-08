'use strict';

class Driver {
  constructor(events) {
    this.events = events;
  }

  listen() {
    this.events.on('in-transit', (order) => {
      console.log(`Event: in-transit - ${order.orderID}`);
      this.inTransit(order);
    });

    this.events.on('pickup', (order) => {
      console.log(`Driver: Picking up order ${order.orderID}.`);
      this.events.emit('in-transit', order);
    });
  }

  inTransit(order) {
    console.log(`Driver: Driving order ${order.orderID} to customer.`);
    setTimeout(() => {
      this.deliver(order);
    }, 3000);
  }

  deliver(order) {
    console.log(`Event: Delivered - ${order.orderID}`);
    this.events.emit('delivered', order);
  }
}

module.exports = Driver;
