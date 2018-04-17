import combineReducers from 'redux/es/combineReducers';

// const DEFAULT_STATE = {
//   siteStatus: '',
//   userCartItems: [
//     {
//       itemId: 123,
//       itemCode: '',
//       itemName: '',
//       itemImg: '',
//       itemCategory: '',
//       itemQuantity: 1,
//       totalPrice: '',
//     },
//   ],
// };
function handleAddCartItem(state, action) {
  return state.findIndex(e => e.itemId === action.addedItem.itemId) === -1
    ? [...state, action.addedItem]
    : state.map(
        e =>
          e.itemId === action.addedItem.itemId
            ? { ...e, quantity: e.quantity + action.addedItem.quantity }
            : e
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
const userCartItems = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DATABASE':
      return [...action.fetchedData];
    case 'ADD_CART_ITEM':
      return handleAddCartItem(state, action);
    case 'UPDATE_CART_ITEM':
      return state.map(
        e =>
          e.itemId === action.itemId ? [...e, ([action.key]: action.value)] : e
      );
    case 'REMOVE_CART_ITEM':
      return state.filter(e => e.itemId !== action.itemId);
    default:
      return state;
  }
};

export default combineReducers({ siteStatus, userCartItems });
