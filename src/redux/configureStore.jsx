import throttle from 'lodash/throttle';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loadLocalState, loadState, saveState } from '../ultis';
import rootReducer from './reducers';
import { fetchProductList } from './actionCreators';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk),
      process.env.NODE_ENV === 'development' &&
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f
    )
  );
  store.subscribe(
    throttle(() => {
      saveState({ userCartItems: store.getState().userCartItems });
    }, 1000)
  );
  return store;
};

export default configureStore;
