# Lab 16 - Event Driven Applications

Your application must simulate the order and delivery of an item, from seller to customer. The seller (or vendor) should alert the system that a package needs to be delivered, and a delivery driver should alert the system when a package is picked up for delivery. The driver should also alert the system when the package has been delivered. Thus, you should have three major events being communicated:

- pickup - Tells the system when a new order needs to be delivered
- in-transit - Tells the system which order is in the process of being delivered
- delivered - Tells the system when the order has been delivered

Your application should automatically generate random orders every 5 seconds. These random orders hould have a store, id, customer, and address as the order data.

## Author: Joel Watson

### Links and Resources

- [PR Lab 16](https://github.com/401-advanced-javascript-joel/CAPS/pull/1)
- [CI/CD Lab 16](https://github.com/401-advanced-javascript-joel/CAPS/pull/1/checks)

### Setup

- `npm install`

### How to run

- `npm start`

### Tests

- `npm test`

### UML

![UML 16](https://raw.githubusercontent.com/401-advanced-javascript-joel/CAPS/master/assets/lab-16-uml.jpg)
