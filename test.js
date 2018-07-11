const products = require('./src/ultis/productList.json');
const fs = require('fs');

function extract(data) {
  return data.map(e => ({
    id: e.productId,
    name: e.productName,
    price: e.productPrice,
    image: e.productImg[0].url,
  }));
}

const test = extract(products);
const header = Object.keys(test[0]);
const csv = test.map(e => `${e.id},${e.name},${e.price},${e.image}`);
csv.unshift(header.join(','));
const result = csv.join('\r\n');
// console.log(result);
fs.writeFileSync('./priceList.csv', result, 'utf8');
