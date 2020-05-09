'use strict';

const faker = require('faker');

class Vendor {
  constructor(events) {
    this.events = events;
  }

  listen() {
    this.events.on('delivered', (order) => {
      console.log(`VENDOR: Thank you for delivering order ${order.orderID}`);
      console.log(`Event: delivered order ${order.orderID}`);
    });
  }

  open() {
    return setInterval(() => {
      this.generateOrder();
    }, 5000);
  }

  generateOrder() {
    const order = {
      time: new Date().toLocaleString('en-US'),
      store: "Joel's Jams",
      orderID: faker.random.uuid(),
      customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
      address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
    };
    console.log(`EVENT: pickup
    - Time: ${order.time}
    - Store: ${order.store}
    - OrderID: ${order.orderID}
    - Customer: ${order.customer}
    - Address: ${order.address}`);
    this.events.emit('pickup', order);
  }
}

module.exports = Vendor;
