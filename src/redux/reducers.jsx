import combineReducers from 'redux/es/combineReducers';

const DEFAULT_STATE = {
  siteStatus: '',
  currencyRates: [{ currencyCode: 'JPY', sellRate: '216.91' }],
  userCartItems: [
    {
      itemId: 123,
      itemCode: '',
      itemName: '',
      itemImg: '',
      itemCategory: '',
      itemQuantity: 1,
      itemPrice: '',
    },
  ],
  orderInfo: {
    orderUser: '5addaefedd8a213de0d0eaf7',
    orderDate: '',
    orderId: '',
    orderName: '',
    orderAddress: '',
    orderPhone: '',
    orderTotalPrice: 0,
    orderPaymentType: '',
    orderItems: [],
    orderStatus: 'Pending',
  },
};
function handleAddCartItem(state, action) {
  const foundIndex = state.findIndex(e => e.itemId === action.addedItem.itemId);
  return foundIndex === -1 ||
    state[foundIndex].itemSize !== action.addedItem.itemSize
    ? [...state, action.addedItem]
    : state.map(
        e =>
          e.itemId === action.addedItem.itemId &&
          e.itemSize === action.addedItem.itemSize
            ? {
                ...e,
                itemQuantity: e.itemQuantity + action.addedItem.itemQuantity,
              }
            : e
      );
}
function handleUpdateCartItem(state, action) {
  return state.map(
    e => (e.itemId === action.itemId ? { ...e, [action.key]: action.val } : e)
  );
}
const siteStatus = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_SITE_STATUS':
      return action.newStatus;
    default:
      return state;
  }
};
const currencyRates = (
  state = [{ currencyCode: 'JPY', sellRate: 216.91 }],
  action
) => {
  switch (action.type) {
    case 'FETCH_CURRENCY_RATE':
      return [...action.currencyRates];
    default:
      return state;
  }
};
const userCartItems = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DATABASE':
      return [...action.fetchedData];
    case 'ADD_CART_ITEM':
      return handleAddCartItem(state, action);
    case 'UPDATE_CART_ITEM':
      return handleUpdateCartItem(state, action);
    case 'REMOVE_CART_ITEM':
      return state.filter(e => e.itemId !== action.itemId);
    case 'CLEAR_CART_ITEM':
      return [];
    default:
      return state;
  }
};
const productList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_LIST':
      return [...action.productList];
    default:
      return state;
  }
};

export default combineReducers({
  siteStatus,
  currencyRates,
  userCartItems,
  productList,
});
