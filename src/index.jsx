import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './redux/configureStore';
import reducers from './redux/reducers';

const store = configureStore();
const renderApp = () =>
  render(<Root store={store} />, document.getElementById('app'));

renderApp();
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./components/Root', renderApp);
    module.hot.accept('./redux/reducers', () => {
      store.replaceReducer(reducers);
    });
  }
}
