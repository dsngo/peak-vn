const csv = require('fast-csv');
const fs = require('fs');
const products = require('../src/ultis/productList.json');

const a = [];
csv
  .fromPath('./worker/priceListEdit.csv', {
    headers: true,
    ignoreEmpty: true,
    trim: true,
  })
  .on('data', data => {
    a.push(data);
  })
  .on('end', () => {
    const merge = products.map(e => {
      const item = a.find(e1 => e1.id === e.productId);
      const b = { ...e, productVnd: item.vnd };
      return b;
    });
    fs.writeFileSync('./src/productList.json', JSON.stringify(merge), 'utf8');
  });
