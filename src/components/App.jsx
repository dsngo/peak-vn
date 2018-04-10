import React from 'react';
import Route from 'react-router-dom/es/Route';
import Router from 'react-router-dom/es/BrowserRouter';
import Switch from 'react-router-dom/es/Switch';
import Provider from 'react-redux/es/components/Provider';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import store from '../redux/store';
// import FoF from "./FoF";
import Navbar from './Navbar';
import Landing from './Landing';

import Footer from "./Footer";
// import Collection from "./Collection";
// import ProductShow from "./product/Show";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: '#fff',
    },
    secondary: {
      light: '#428e92',
      main: '#006064',
      dark: '#00363a',
      contrastText: '#000',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>

        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route path="/collections" component={Collection} />
              <Route
                path="/products/:id"
                component={props => {
                  console.log(props);
                  return <ProductShow productPermalink={props.match.params.id} />;
                }}
              />
              <Route component={FoF} /> */}
        </Switch>
        <Footer />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default App;
