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

export const fetchDatabase = userID => {
  const fetchedData = [];
  const siteStatus = ''
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
