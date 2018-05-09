import combineReducers from 'redux/es/combineReducers';

// const DEFAULT_STATE = {
//   siteStatus: { text: '', key: 1231123, isOpen: false },
//   currencyRates: [{ currencyCode: 'JPY', sellRate: '216.91' }],
//   userCartItems: [
//     {
//       itemId: 123,
//       itemCode: '',
//       itemName: '',
//       itemImg: '',
//       itemCategory: '',
//       itemQuantity: 1,
//       itemPrice: '',
//     },
//   ],
//   orderInfo: {
//     orderUser: '5addaefedd8a213de0d0eaf7',
//     orderDate: '',
//     orderId: '',
//     orderName: '',
//     orderAddress: '',
//     orderPhone: '',
//     orderTotalPrice: 0,
//     orderPaymentType: '',
//     orderItems: [],
//     orderStatus: 'Pending',
//   },
// };
function handleAddCartItem(state, action) {
  const foundIndex = state.findIndex(
    e =>
      e.itemId === action.addedItem.itemId &&
      e.itemSize === action.addedItem.itemSize
  );
  return foundIndex === -1
    ? [...state, action.addedItem]
    : state.map(
        (e, i) =>
          i === foundIndex
            ? {
                ...e,
                itemQuantity: e.itemQuantity + action.addedItem.itemQuantity,
              }
            : e
      );
}
function handleUpdateCartItem(state, action) {
  return state.map(
    e =>
      e.itemId === action.itemId && e.itemSize === action.itemSize
        ? { ...e, [action.key]: action.val }
        : e
  );
}
const siteStatus = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SITE_STATUS':
      return { ...action.newStatus };
    case 'TOGGLE_SNACKBAR':
      return { ...state, isOpen: action.isOpen };
    default:
      return state;
  }
};
const currencyRates = (
  state = [
    { currencyName: 'JAPANESE YEN', currencyCode: 'JPY', sellRate: 216.91 },
  ],
  action
) => {
  switch (action.type) {
    case 'FETCH_CURRENCY_RATE_SUCCESS':
      return [...action.rates];
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
      return state.filter(
        e => !(e.itemId === action.itemId && e.itemSize === action.itemSize)
      );
    case 'CLEAR_CART_ITEM':
      return [];
    default:
      return state;
  }
};
const productList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_LIST_SUCCESS':
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
