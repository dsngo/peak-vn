const csv = require('fast-csv');
const fs = require('fs');

function formatData(productArray) {
  let aIdx = 0;
  const result = productArray.reduce((a, c, i) => {
    const initial = {
      productId: c.productId,
      productCode: c.productCode,
      productGender: c.gender,
      productCategory: c.category,
      productColor: c.color,
      productFeature: [],
      productPrice: c.price,
      productName: c.productName,
      listingDate: Date.now(),
      location: 'hcmc',
      productImg: [],
      productSize: [
        { name: c.gender === 'men' ? 'm' : 's', [c.size]: c.m },
        { name: c.gender === 'men' ? 'l' : 'm', [c.size]: c.l },
        { name: c.gender === 'men' ? 'xl' : 'l', [c.size]: c.xl },
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
  return result;
}

const a = [];
csv
  .fromPath('./men.csv', {
    headers: true,
    ignoreEmpty: true,
    trim: true,
  })
  .on('data', data => {
    a.push(data);
  })
  .on('end', () => {
    csv
      .fromPath('./wome.csv', {
        headers: true,
        ignoreEmpty: true,
        trim: true,
      })
      .on('data', data => {
        a.push(data);
      })
      .on('end', () => {
        console.log(a.length);
        const result = formatData(a);
        result.sort((f, s) => f.productId - s.productId);
        fs.writeFileSync(
          './src/productList.json',
          JSON.stringify(result),
          'utf8'
        );
      });
  });
