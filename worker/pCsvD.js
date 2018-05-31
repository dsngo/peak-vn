const csv = require('fast-csv'); // eslint-disable-line
const fs = require('fs');

function formatData(data) {
  const result = data.map(e => {
    delete e[''];
    return e;
  });
  return result;
}
const a = [];
csv
  .fromPath('./ccod.csv', {
    headers: true,
    ignoreEmpty: true,
    trim: true,
  })
  .on('data', data => {
    a.push(data);
  })
  .on('end', () => {
    // console.log(a);
    const result = formatData(a);
    // result.sort((f, s) => f.productId - s.productId);
    fs.writeFileSync('./src/codData.json', JSON.stringify(result), 'utf8');
  });
