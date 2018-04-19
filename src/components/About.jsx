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

const about = {
  imgUrl:
    'https://base-ec2if.akamaized.net/images/user/template/peaks8-official-ec/image-aboutpic_5acb107f7dfbf.jpg',
  info: [
    'Ý nghĩa của thương hiệu Peaks Eight - chuyên sản xuất thời trang thể thao và quần áo trượt tuyết chính là mục tiêu luôn vươn đến vị trí thứ 8 - vị trí cao nhất.',
    'Biểu tượng của Peaks Eight là hình ảnh thiên nhiên với các đỉnh núi cao nhất trên thế giới, nhằm khẳng định mạnh mẽ mục tiêu chinh phục đỉnh cao của mình trong ngành thời trang.',
    'Để đạt được điều đó,Peaks Eight luôn không ngừng nâng cao chất lượng sản phẩm , đáp ứng mọi nhu cầu của khách hàng.',
    'Với kinh nghiệm hơn 20 năm trong lĩnh vực sản xuất quần áo thể thao , chúng tôi xin cam kết mang đến cho khách hàng những sản phẩm chất lượng tốt nhất.',
  ],
};

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

class Category extends Component {
  props: {
    classes: Object,
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
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <img src={resizeImg(about.imgUrl, 1200)} alt="" />
        <div>
          {about.info.map((e, i) => (
            <Typography variant="title" key={i}>
              {e}
            </Typography>
          ))}
        </div>
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
