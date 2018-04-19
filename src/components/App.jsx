import blueGrey from 'material-ui/colors/blueGrey';
import green from 'material-ui/colors/green';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import React from 'react';
import Router from 'react-router-dom/es/BrowserRouter';
import Route from 'react-router-dom/es/Route';
import Switch from 'react-router-dom/es/Switch';
import Footer from './Footer';
import Landing from './Landing';
// import FoF from "./FoF";
import Navbar from './Navbar';
import ProductDetail from './ProductDetail';
import UserControl from './UserControl';
import Checkout from './Checkout';
import Category from './Category';
import About from './About';
import Contact from './Contact'

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: green,
  },
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 18,
  },
});

const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/items/:productId" component={ProductDetail} />
        <Route exact path="/admin/orderdetail" component={UserControl} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/category/:categoryId" component={Category} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
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
);

export default App;
