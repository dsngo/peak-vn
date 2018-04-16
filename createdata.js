const faker = require('faker');

faker.locale = 'vi';
const data = Array(15)
  .fill()
  .map(() => ({
    date: faker.date.past().toISOString(),
    order: faker.random.number(),
    name: faker.name.findName(),
    address: faker.address.secondaryAddress(),
    phone: faker.phone.phoneNumber(),
    totalPrice: faker.commerce.price(),
    paymentType: faker.finance.transactionType(),
    orderItems: Array(3)
      .fill()
      .map(() => ({
        itemId: faker.random.number(),
        itemCode: faker.commerce.productName(),
        color: faker.commerce.color(),
        quantity: faker.random.number(),
        image: faker.image.imageUrl(),
        price: faker.commerce.price()
      })),
  }));

console.log(JSON.stringify(data));
// console.log(data);
