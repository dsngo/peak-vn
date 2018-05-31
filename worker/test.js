const productList = require('./src/productList.json');
const fetch = require('node-fetch');
const { parseString } = require('xml2js');

const a = cb => {
  fetch('https://www.vietcombank.com.vn/ExchangeRates/ExrateXML.aspx', {
    mode: 'no-cors',
  })
    .then(rs => rs.text())
    .then(str =>
      parseString(str, (e, r) => r.ExrateList.Exrate.map(el => cb(el)))
    );
};

function t() {
  const b = a(el => console.log(el.$));
}

t();
