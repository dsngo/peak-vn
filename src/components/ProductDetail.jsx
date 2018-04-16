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
import data, { productList } from '../data';
// import productList from '../productList'
import ProductCard from './ProductCard';

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
  };
  state = {
    size: 'S',
    quantity: 1,
    img: '',
  };
  handleChangeInfo = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleChangeImg = event => this.setState({ img: event.target.src });
  render() {
    const { classes } = this.props;
    const { size, quantity, img } = this.state;
    const product = productList.find(
      e => e.productId === this.props.match.params.productId
    );
    const thumbImg = img || product.productImg[0].url;
    const options = product.productSize.map(e => e.name.toUpperCase());
    return (
      <Paper className={classes.root}>
        <div className={classes.topPart}>
          <Paper className={classes.carousel}>
            <img className={classes.bigImg} src={thumbImg} alt="" />
            <ButtonBase onClick={this.handleChangeImg}>
              <img className={classes.img} src={product.productImg} alt="" />
            </ButtonBase>
            {product.productImg.map((e, i) => (
              <ButtonBase key={i} onClick={this.handleChangeImg}>
                <img className={classes.img} src={e.url} alt="" />
              </ButtonBase>
            ))}
          </Paper>
          <Paper className={classes.infoTab}>
            <Typography variant="title">
              {product.productPrice * quantity}
            </Typography>
            <TextField
              select
              label="Please select your size"
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
              label="Please select your quantity"
              value={quantity}
              onChange={this.handleChangeInfo('quantity')}
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
              <Button variant="raised" color="primary" size="large">
                ADD TO CARD
                <AddShoppingCart />
              </Button>
            </div>
            <Divider className={classes.margin} />
            <div className={classes.margin}>
              {product.productSize.map((e, i) => (
                <React.Fragment key={i}>
                  <Typography
                    className={classes.extra}
                    variant="title"
                  >{`Size: ${e.name.toUpperCase()}`}</Typography>
                  <Typography>Measurement: cm</Typography>
                  <Typography>{`Spec: ${e.spec}`}</Typography>
                </React.Fragment>
              ))}
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
            .filter(e => e.productCategory[0] === product.productCategory[0])
            .slice(0, 3)
            .map(e => (
              <ProductCard key={e.productId} {...{ productItem: e }} />
            ))}
        </Paper>
      </Paper>
    );
  }
}

export default connect()(withStyles(styles)(Product));
