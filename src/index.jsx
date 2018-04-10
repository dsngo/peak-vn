import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import App from './components/App';

const renderApp = () => render(<App />, document.getElementById('app'));
const renderHot = Component =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
if (process.env.NODE_ENV === 'production') {
  renderApp();
} else {
  renderHot(App);
  if (module.hot) {
    module.hot.accept('./components/App', () =>
      renderHot(import('./components/App'))
    );
  }
}
