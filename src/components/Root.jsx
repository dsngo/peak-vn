import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default Root;
