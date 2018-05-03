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
// import { productList } from '../data';
// import productList from '../productList'
import ProductCard from './ProductCard';
import { resizeImg, formatMoney, capFirstChar } from '../ultis';
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

class Product extends Component {
  props: {
    match: Object,
    classes: Object,
    addCartItem: Function,
    userCartItem: Array,
  };
  state = {
    size: '',
    quantity: 1,
    img: '',
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
            {thumbnails.map((e, i) => (
              <ButtonBase key={i} onClick={this.handleChangeImg}>
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
                <Typography color="error" style={{margin: "5px 0"}}>
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
                ADD TO CART
                <AddShoppingCart />
              </Button>
            </div>
            <Divider className={classes.margin} />
            <div className={classes.margin}>
              {product.productSize.map((e, i) => {
                const spec = Object.keys(e).slice(1);
                return (
                  <React.Fragment key={i}>
                    <Typography
                      className={classes.extra}
                      variant="title"
                    >{`Kích thước: ${e.name.toUpperCase()}`}</Typography>
                    <Typography>Đơn vị: cm</Typography>
                    {}
                    <Typography>
                      Số đo: {spec.map(s => `[${s}: ${e[s]}] `)}
                    </Typography>
                  </React.Fragment>
                );
              })}
            </div>
            <Divider className={classes.margin} />
            <div className={classes.margin}>
              {product.productFeature.map((e, i) => (
                <Typography key={i} className={classes.extra}>
                  {e}
                </Typography>
              ))}
            </div>
          </Paper>
        </div>
        <Paper className={classes.relatedItems}>
          {productList
            .filter(e => e.productCode === product.productCode)
            .slice(0, 3)
            .map(e => (
              <ProductCard key={e.productId} {...{ productItem: e }} />
            ))}
        </Paper>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  userCartItem: state.userCartItem,
  currencyRate: state.currencyRates[0],
  productList: state.productList,
});

const mapDispatchToProps = {
  addCartItem,
  updateCartItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Product)
);
