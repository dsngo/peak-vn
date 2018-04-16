// import men from './men.json'
const menU = require('./src/women.json');

const updateData = (a, b, sub) =>
  a[sub] === b[sub] ? a[sub] : b[sub] || a[sub];
let aIdx = 0;
const men1 = menU.reduce((a, c, i) => {
  const initial = {
    productId: c.productId,
    productCode: c.productCode,
    productGender: 'women',
    productCategory: c.category,
    productColor: c.color,
    productFeature: [],
    productPrice: c.price,
    productName: c.productName,
    listingDate: Date.now(),
    location: 'hcmc',
    productImg: [],
    productSize: [
      { name: 's', [c.size]: c.m },
      { name: 'm', [c.size]: c.l },
      { name: 'l', [c.size]: c.xl },
    ],
  };
  if (a.length < 1) {
    a.push(initial);
  }
  if (a[aIdx] && a[aIdx].productId !== c.productId) {
    aIdx += 1;
    a.push(initial);
  }
  if (c.url.length)
    a[aIdx].productImg.push({ type: c.part, url: c.url, id: i });
  if (c.size) {
    a[aIdx].productSize.forEach(e => {
      e[c.size] = c[e.name];
    });
  }
  if (c.feature) a[aIdx].productFeature.push(c.feature);
  return a;
}, []);

console.log(JSON.stringify(men1));
