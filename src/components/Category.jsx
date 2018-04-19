import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import Divider from 'material-ui/Divider';
import { InputAdornment } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { productList } from '../data';
// import productList from '../productList'
import ProductCard from './ProductCard';
import { resizeImg, formatMoney } from '../ultis';
import { addCartItem, updateCartItem } from '../redux/actionCreators';

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topPart: {
    display: 'flex',
    flexDirection: 'row',
  },
  carousel: {
    width: '50vw',
    margin: '1vw',
    padding: '1vw',
  },
  infoTab: {
    margin: '1vw',
    width: '45vw',
    padding: '1vw',
  },
  menuItem: {
    marginLeft: 15,
    width: 200,
  },
  margin: {
    margin: 5,
  },
  img: {
    width: 60,
    // display: 'inline',
  },
  bigImg: {
    width: '45vw',
    display: 'block',
  },
  extra: {
    marginTop: 5,
  },
  relatedItems: {
    margin: '1vw',
    padding: '1vw',
    display: 'flex',
    flexDirection: 'row',
  },
};

class Category extends Component {
  props: {
    match: Object,
    classes: Object,
    addCartItem: Function,
    userCartItem: Array,
  };
  state = {
    quantity: 1,
  };
  handleAddCartItem = product => () => {
    const item = {
      itemId: product.productId,
      itemCode: product.productCode,
      itemImg: product.productImg[0].url,
      itemCategory: product.productCategory,
      itemQuantity: this.state.quantity,
      itemPrice: product.productPrice,
    };
    this.props.addCartItem(item);
  };
  handleChangeInfo = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleChangeQuantity = maxQuantity => event => {
    const quantity = Math.min(Math.max(event.target.value, 1), maxQuantity);
    this.setState({ quantity });
  };
  render() {
    const { classes, match } = this.props;
    return (
      <Paper className={classes.root}>
        <Paper className={classes.relatedItems}>
          {productList
            .filter(e => e.productCode.substr(4,3) === match.params.categoryId)
            .map(e => (
              <ProductCard key={e.productId} {...{ productItem: e }} />
            ))}
        </Paper>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  // userCartItem: state.userCartItem,
  // currencyRate: state.currencyRates[0],
});

const mapDispatchToProps = dispatch => ({
  // addCartItem: item => dispatch(addCartItem(item)),
  // updateCartItem: item => dispatch(updateCartItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Category)
);
