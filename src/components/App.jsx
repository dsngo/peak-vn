import React from 'react';
import Route from 'react-router-dom/es/Route';
import Router from 'react-router-dom/es/BrowserRouter';
import Switch from 'react-router-dom/es/Switch';
import Provider from 'react-redux/es/components/Provider';
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from '../redux/store';
// import FoF from "./FoF";
import Navbar from './Navbar';
import Landing from './Landing';
// import Footer from "./Footer";
// import Collection from "./Collection";
// import ProductShow from "./product/Show";

const App = () => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
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
        {/* <Footer /> */}
      </React.Fragment>
    </Router>
  </Provider>
);

export default App;
