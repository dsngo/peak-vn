// const testCartData = [
//   {

//   }
// ]
import { SERVER_SETTING, saveLocalState } from '../ultis';

export const addCartItem = addedItem => ({ type: 'ADD_CART_ITEM', addedItem });

export const updateCartItem = (itemId, key, val) => ({
  type: 'UPDATE_CART_ITEM',
  itemId,
  key,
  val,
});

export const removeCartItem = itemId => ({ type: 'REMOVE_CART_ITEM', itemId });
export const clearCartItem = () => ({ type: 'CLEAR_CART_ITEM' });

export const updateSiteStatus = newStatus => ({
  type: 'UPDATE_SITE_STATUS',
  newStatus,
});

export const saveOrderToDatabase = () => {};
export const updateOrderData = (objectId, updatedData) => dispatch => {
  const { protocol, url, port } = SERVER_SETTING;
  return fetch(
    `${protocol}${url}:${port}/peak-vn/ecsite/order/${objectId}/update`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    }
  )
    .then(rs => rs.json())
    .then(d => {
      dispatch({ type: 'UPDATE_ORDER_DATA' });
    })
    .catch(console.log);
};

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
export const fetchProductList = () => async dispatch => {
  try {
    const sessionProductList = sessionStorage.getItem('peakVnProductList');
    if (sessionProductList != null) return;
    const productList = (await (await fetch(
      `${SERVER_SETTING.protocol}${SERVER_SETTING.url}:${
        SERVER_SETTING.port
      }/peak-vn/ecsite/product`
    )).json()).data;
    dispatch({ type: 'FETCH_PRODUCT_LIST', productList });
    saveLocalState({ productList });
    console.log('save local')
  } catch (e) {
    console.log(e);
  }
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
