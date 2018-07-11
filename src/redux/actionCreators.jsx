import { SERVER_SETTING, saveProductList, saveCurrencyRate } from '../ultis';

export const addCartItem = addedItem => ({ type: 'ADD_CART_ITEM', addedItem });

export const updateCartItem = (itemId, key, val, itemSize) => ({
  type: 'UPDATE_CART_ITEM',
  itemId,
  key,
  val,
  itemSize,
});

export const removeCartItem = (itemId, itemSize) => ({
  type: 'REMOVE_CART_ITEM',
  itemId,
  itemSize,
});
export const clearCartItem = () => ({ type: 'CLEAR_CART_ITEM' });

export const addSiteStatus = statusText => {
  const newStatus = {
    key: Date.now(),
    text: statusText,
    isOpen: true,
  };
  return {
    type: 'ADD_SITE_STATUS',
    newStatus,
  };
};

export const toggleSnackbar = isOpen => ({
  type: 'TOGGLE_SNACKBAR',
  isOpen,
});

// API
export const saveContactToDatabase = contact => dispatch => {
  const { protocol, url } = SERVER_SETTING;
  fetch(`${protocol}${url}/peak-vn/ecsite/contact`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })
    .then(() =>
      dispatch(addSiteStatus('Yêu cầu của bạn đã được gửi thành công'))
    )
    .catch(() =>
      dispatch(addSiteStatus('Lỗi kết nối, xin vui lòng thử lại sau'))
    );
};
export const updateOrderData = (objectId, updatedData) => dispatch => {
  const { protocol, url } = SERVER_SETTING;
  return fetch(`${protocol}${url}/peak-vn/ecsite/order/${objectId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then(rs => rs.json())
    .then(d => {
      dispatch(addSiteStatus(d.message));
    })
    .catch(() =>
      dispatch(addSiteStatus('Lỗi kết nối, xin vui lòng thử lại sau'))
    );
};
export const fetchCurrencyRate = () => (dispatch, getState) => {
  if (getState().currencyRates.length > 1) return;
  dispatch({ type: 'STARTING_FETCH_CURRENCY' });
  const { protocol, url } = SERVER_SETTING;
  fetch(`${protocol}${url}/peak-vn/ecsite/fetch/currency-rate`)
    .then(rs => rs.json())
    .then(rates => {
      dispatch({
        type: 'FETCH_CURRENCY_RATE_SUCCESS',
        rates,
      });
      saveCurrencyRate({ currencyRates: rates });
    })
    .catch(e => {
      dispatch({ type: 'FETCH_CURRENCY_RATE_FAILED' });
      console.log(e);
    });
};
export const fetchProductList = () => (dispatch, getState) => {
  if (getState().productList.length > 0) return;
  dispatch({ type: 'STARTING_FETCH_PRODUCTLIST' });
  const { protocol, url } = SERVER_SETTING;
  fetch(`${protocol}${url}/peak-vn/ecsite/product`)
    .then(rs => rs.json())
    .then(d => {
      const productList = d.data.sort((f, s) => f.productId - s.productId);
      dispatch({ type: 'FETCH_PRODUCT_LIST_SUCCESS', productList });
      saveProductList({ productList });
    })
    .catch(e => {
      dispatch({ type: 'FETCH_PRODUCT_LIST_FAILED' });
      console.log(e);
    });
};

export const saveOrderToDatabase = order => dispatch => {
  const { protocol, url } = SERVER_SETTING;
  fetch(`${protocol}${url}/peak-vn/ecsite/order`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then(() => dispatch(addSiteStatus('Tạo đơn hàng thành công')))
    .catch(() =>
      dispatch(addSiteStatus('Lỗi kết nối, xin vui lòng thử lại sau'))
    );
};
export const saveSurveyToDatabase = survey => dispatch => {
  const { protocol, url } = SERVER_SETTING;
  // console.log(survey)
  fetch(`${protocol}${url}/peak-vn/ecsite/survey-submit`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(survey),
  })
    .then(() =>
      dispatch(addSiteStatus('Cảm ơn bạn đã tham gia khảo sát với chúng tôi'))
    )
    .catch(() =>
      dispatch(addSiteStatus('Lỗi kết nối, xin vui lòng thử lại sau'))
    );
};
