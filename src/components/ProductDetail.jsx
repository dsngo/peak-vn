import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import { InputAdornment } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { capFirstChar, formatMoney, resizeImg } from '../ultis';
import ProductCard from './ProductCard';
import {
  addCartItem,
  updateCartItem,
  removeCartItem,
} from '../redux/actionCreators';

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
  gridContainer: {
    margin: '15px 0',
  },
  rightIcon: {
    marginLeft: 8,
  },
  cartInfoText: {
    float: 'right',
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
};

class Product extends Component {
  props: {
    match: Object,
    classes: Object,
    addCartItem: Function,
    cartItems: Array,
  };
  state = {
    size: '',
    quantity: 1,
    img: '',
    isDialogOpen: false,
  };
  toggleModal = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  handleAddCartItem = product => () => {
    const item = {
      itemId: product.productId,
      itemCode: product.productCode,
      itemCategory: product.productCategory,
      itemGender: capFirstChar(product.productGender),
      itemImg: product.productImg[0].url,
      itemName: product.productName,
      itemColor: product.productColor,
      itemSize: this.state.size,
      itemQuantity: this.state.quantity,
      itemPrice: product.productPrice,
    };
    this.props.addCartItem(item);
    this.toggleModal('isDialogOpen', true)();
  };
  handleUpdateCartItem = (action, i, q, s) => () => {
    switch (action) {
      case 'decrease':
        this.props.updateCartItem(i, 'itemQuantity', q - 1, s);
        return;
      case 'increase':
        this.props.updateCartItem(i, 'itemQuantity', q + 1, s);
        return;
      case 'remove':
        this.props.removeCartItem(i, s);
        break;
      default:
    }
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
  handleChangeImg = event => this.setState({ img: event.target.src });
  renderDialog = () => {
    const { cartItems, classes, currencyRate } = this.props;
    const { isDialogOpen } = this.state;
    return (
      <Dialog
        open={isDialogOpen}
        keepMounted
        onClose={this.toggleModal('isDialogOpen', false)}
      >
        <DialogTitle> User Cart Items </DialogTitle>
        <DialogContent>
          {cartItems.map(e => (
            <div key={`${e.itemId}-${e.itemSize}`}>
              <img style={{ width: 60 }} src={e.itemImg} alt="" />
              <div className={classes.cartInfoText}>
                <Typography>{`${e.itemGender}'s ${e.itemName}`}</Typography>
                <Typography>
                  {`Màu sắc/Size/Số lượng: ${e.itemColor}/${e.itemSize}/${
                    e.itemQuantity
                  } - Giá tiền: ${formatMoney(
                    e.itemQuantity * currencyRate.sellRate * e.itemPrice
                  )}`}
                  <button
                    onClick={this.handleUpdateCartItem(
                      'decrease',
                      e.itemId,
                      e.itemQuantity,
                      e.itemSize
                    )}
                  >
                    -
                  </button>
                  <button
                    onClick={this.handleUpdateCartItem(
                      'increase',
                      e.itemId,
                      e.itemQuantity,
                      e.itemSize
                    )}
                  >
                    +
                  </button>
                  <button
                    onClick={this.handleUpdateCartItem(
                      'remove',
                      e.itemId,
                      null,
                      e.itemSize
                    )}
                  >
                    X
                  </button>
                </Typography>
              </div>
            </div>
          ))}
          <Typography variant="title" align="right">{`Thành tiền: ${formatMoney(
            cartItems.reduce(
              (a, c) =>
                a + c.itemPrice * currencyRate.sellRate * c.itemQuantity,
              0
            )
          )}`}</Typography>
          <div className={classes.buttonDiv}>
            <Button
              variant="raised"
              color="secondary"
              component={Link}
              to="/category"
              onClick={this.toggleModal('isDialogOpen', false)}
            >
              Tiếp tục mua hàng
            </Button>
            <Button
              variant="raised"
              color="primary"
              component={Link}
              to="/checkout"
              onClick={this.toggleModal('isDialogOpen', false)}
            >
              Thanh toán
            </Button>
            <Button
              color="inherit"
              variant="raised"
              onClick={this.toggleModal('isDialogOpen', false)}
            >
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  render() {
    const { classes, productList } = this.props;
    const { size, quantity, img } = this.state;
    const product = productList.find(
      e => e.productId === this.props.match.params.productId
    );
    const thumbnails = product.productImg.map(e => e.url);
    const bigImg = thumbnails.includes(img) ? img : product.productImg[0].url;
    const options = product.productSize.map(e => e.name.toUpperCase());
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <div className={classes.topPart}>
            <Paper className={classes.carousel}>
              <img className={classes.bigImg} src={bigImg} alt="" />
              <ButtonBase onClick={this.handleChangeImg}>
                <img
                  className={classes.img}
                  src={resizeImg(product.productImg, 900)}
                  alt=""
                />
              </ButtonBase>
              {thumbnails.map(e => (
                <ButtonBase key={e} onClick={this.handleChangeImg}>
                  <img className={classes.img} src={e} alt="" />
                </ButtonBase>
              ))}
            </Paper>
            <Paper className={classes.infoTab}>
              <Typography variant="title">
                {formatMoney(
                  product.productPrice *
                    this.props.currencyRate.sellRate *
                    quantity
                )}
              </Typography>
              <TextField
                select
                label="Vui lòng chọn kích thước"
                value={size}
                onChange={this.handleChangeInfo('size')}
                className={classes.menuItem}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Size</InputAdornment>
                  ),
                }}
              >
                {options.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Vui lòng chọn số lượng"
                value={quantity}
                onChange={this.handleChangeQuantity(99)}
                type="number"
                className={classes.menuItem}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Quantity</InputAdornment>
                  ),
                }}
                margin="normal"
              />
              <div className={classes.margin}>
                {!this.state.size && (
                  <Typography color="error" style={{ margin: '5px 0' }}>
                    Xin vui lòng chọn kích thước
                  </Typography>
                )}
                <Button
                  disabled={!this.state.size}
                  onClick={this.handleAddCartItem(product)}
                  variant="raised"
                  color="primary"
                  size="large"
                >
                  add to cart
                  <AddShoppingCart className={classes.rightIcon} />
                </Button>
              </div>
              <Divider className={classes.margin} />
              <div className={classes.margin}>
                {product.productSize.map(e => {
                  const spec = Object.keys(e).slice(1);
                  return (
                    <React.Fragment key={e.name}>
                      <Typography
                        className={classes.extra}
                        variant="title"
                      >{`Kích thước: ${e.name.toUpperCase()}`}</Typography>
                      <Typography>Đơn vị: cm</Typography>
                      {}
                      <Typography>
                        Số đo: {spec.map(s => `[: ${e[s]}] `)}
                      </Typography>
                    </React.Fragment>
                  );
                })}
              </div>
              <Divider className={classes.margin} />
              <div className={classes.margin}>
                {product.productFeature.map(e => (
                  <Typography key={e} className={classes.extra}>
                    {e}
                  </Typography>
                ))}
              </div>
            </Paper>
          </div>
          <Divider className={classes.margin} />
          <Typography variant="title" align="center">
            RELATED ITEMS
          </Typography>
          <Grid
            container
            className={classes.gridContainer}
            justify="center"
            spacing={8}
          >
            {productList
              .filter(e => e.productCode === product.productCode)
              .slice(0, 3)
              .map(e => (
                <ProductCard key={e.productId} {...{ productItem: e }} />
              ))}
          </Grid>
        </Paper>
        {this.renderDialog()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.userCartItems,
  currencyRate: state.currencyRates.find(e => e.currencyCode === 'JPY'),
  productList: state.productList,
});

const mapDispatchToProps = {
  addCartItem,
  updateCartItem,
  removeCartItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Product)
);
