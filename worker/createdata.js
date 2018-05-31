const faker = require('faker');
const productList = require('./src/productList.json');
const fs = require('fs');

faker.locale = 'vi';
const fakeOrders = Array(15)
  .fill()
  .map(() => ({
    orderDate: faker.date.past().toISOString(),
    orderId: faker.random.number(),
    orderName: faker.name.findName(),
    orderAddress: faker.address.secondaryAddress(),
    orderPhone: faker.phone.phoneNumber(),
    orderTotalPrice: faker.commerce.price(),
    orderPaymentType: faker.finance.transactionType(),
    orderStatus: Math.random() * 10 > 5 ? 'Pending' : 'Finished',
    orderItems: Array(3)
      .fill()
      .map(() => ({
        itemId: faker.random.number(),
        itemCode: faker.commerce.productAdjective(),
        itemName: faker.commerce.productName(),
        itemCategory: faker.commerce.department(),
        itemColor: faker.commerce.color(),
        itemQuantity: faker.random.number(),
        itemImg: faker.image.imageUrl(),
        itemPrice: faker.commerce.price(),
      })),
  }));

const data = {
  fakeOrders,
  productList,
};
console.log('Create fakeOrders')
fs.writeFileSync('fakeData.json', JSON.stringify(data), 'utf8');
// console.log(JSON.stringify(data));
console.log('Done!');
