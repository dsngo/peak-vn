import React from 'react';
import { render } from 'react-dom';
// import App, { HotApp } from './components/App';
import App from './components/App';

const renderApp = Component =>
  render(<Component />, document.getElementById('app'));

// if (process.env.NODE_ENV === 'development') {
//   renderApp(HotApp);
// } else {
//   renderApp(App);
// }
renderApp(App);
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./components/App', () => {
      renderApp(App);
    });
  }
}
