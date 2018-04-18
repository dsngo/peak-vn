import React from 'react';
import { render } from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import App from './components/App';
import store from './redux/store';
import reducers from './redux/reducers'

const renderApp = Component =>
  render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('app')
  );

renderApp(App);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./components/App', () => {
      renderApp(App);
    });
    module.hot.accept('./redux/reducers', () => {
      store.replaceReducer(reducers);
    });
  }
}
