import combineReducers from 'redux/es/combineReducers';

const DEFAULT_STATE = {
  siteStatus: '',
  userCartItems: [
    {
      itemCode: '',
      itemName: '',
      itemImg: '',
      itemCategory: '',
      itemQuantity: 1,
      totalPrice: '',
    },
  ],
};

const siteStatus = () => DEFAULT_STATE.siteStatus;

export default combineReducers({ siteStatus });
