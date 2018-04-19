// const testCartData = [
//   {

//   }
// ]

export const addCartItem = addedItem => ({ type: 'ADD_CART_ITEM', addedItem });

export const updateCartItem = (itemId, key, val) => ({
  type: 'UPDATE_CART_ITEM',
  itemId,
  key,
  val,
});

export const removeCartItem = itemId => ({ type: 'REMOVE_CART_ITEM', itemId });

export const updateSiteStatus = newStatus => ({
  type: 'UPDATE_SITE_STATUS',
  newStatus,
});

export const fetchCurrencyRate = () => dispatch => {
  fetch('https://www.vietcombank.com.vn/ExchangeRates/ExrateXML.aspx', {
    mode: 'no-cors',
  })
    .then(rs => rs.text())
    .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data =>
      dispatch({
        type: 'FETCH_CURRENCY_RATE',
        rate: Array.from(data.getElementsByTagName('Exrate')),
      })
    );
};

export const fetchDatabase = userID => {
  const fetchedData = [];
  const siteStatus = '';
  return {
    type: 'FETCH_DATABASE',
    fetchedData,
    siteStatus,
  };
};
export const saveDatabase = userId => {
  const siteStatus = 'Done';
  return { type: 'SAVE_DATABASE', siteStatus };
};
